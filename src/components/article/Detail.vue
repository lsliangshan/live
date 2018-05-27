<template>
  <div class="article_detail_container">
    <ls-scroll :data="article" class="article_detail_scroll"
               @initialed="scrollInitialed"
               :style="{height: (isPc ? '100%' : 'calc(100% - 48px)')}"
               :scroll-to-ele="scrollToElement"
    >
      <h3 class="article_item_title">
        <span>{{article.title}}</span>
      </h3>
      <small class="article_item_sub_title">
        {{article.updateTime | timeFormat('YYYY年MM月DD日 hh时mm分ss秒')}}，{{article['zpm_user'].nickname}}
      </small>
      <small class="article_item_sub_title" style="display: block;" v-if="article.totalViews && article.totalViews > 0">
        阅读 {{article.totalViews}} 次，今日 {{article.todayViews}} 次
      </small>
      <div class="copy_right_container">
        <p style="word-wrap: break-word;">by <span v-text="article['zpm_user'].nickname"></span> from {{location}}</p>
        <p>本文可全文转载，但需得到原作者许可，同时保留原作者和出处。</p>
      </div>
      <div class="article_content_container markdown-body" v-md="article.content"></div>
      <p style="font-weight: bold; margin-top: 15px;">（全文完）</p>

      <div class="article_comments_container" :ref="commentListRef">
        <div class="article_comments_header">全部评论（{{comments ? comments.length : 0}}）</div>
        <comment v-for="(comment, index) in comments" :key="comment.uuid" :root-comment="true" :author="article.author" :comments="comments" :comment="comment" @view="openCommentList"></comment>
      </div>

      <div class="gap_30"></div>
    </ls-scroll>

    <div class="bottom_feedback" :style="{height: '48px'}">
      <feedback :aid="article.uuid" :pid="''" :rid="''" :focus="false" @feedback="addComment"></feedback>
    </div>
    <div class="comment_detail_list_container" :class="{shown: showCommentList}">
      <comment-list :author="article.author" :comment="currentComment" @close="closeCommentList"></comment-list>
      <!--<comment-list :author="article.author" :comments="comments" :comment="currentComment"></comment-list>-->
    </div>
  </div>
</template>
<style scoped>
  .article_detail_container {
    width: 100%;
    height: 100%;
  }
  .article_detail_scroll {
    padding: 0 15px;
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    box-sizing: content-box;
    height: 100%;
    overflow: hidden;
  }
  .article_item_title {
    font-size: 24px;
    margin-top: 10px;
    word-wrap: break-word;
  }
  .article_item_sub_title {
    color: #777;
    font-size: 75%;
    line-height: 1.5;
  }

  .copy_right_container {
    background: #f5f5f5;
    background-color: rgba(0,0,0,.05);
    border-left: 5px solid #ccc;
    font-size: 14px;
    padding: 8px;
    margin: 15px 0;
  }

  .article_comments_container {
    margin-top: 40px;
  }
  .article_comments_container .article_comments_header {
    font-size: 15px;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bottom_feedback {
    width: 100%;
  }

  .comment_detail_list_container {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    -webkit-transform: translate(0, 100%);
    -moz-transform: translate(0, 100%);
    -ms-transform: translate(0, 100%);
    -o-transform: translate(0, 100%);
    transform: translate(0, 100%);
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -ms-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .comment_detail_list_container.shown {
    -webkit-transform: translate(0, 0%);
    -moz-transform: translate(0, 0%);
    -ms-transform: translate(0, 0%);
    -o-transform: translate(0, 0%);
    transform: translate(0, 0%);
  }
</style>
<script>
  import * as types from '../../store/mutation-types'
  export default {
    name: 'ArticleDetail',
    data () {
      return {
        requestInfo: this.$store.state.requestInfo,
        eventHub: this.$store.state.eventHub,
        events: this.$store.state.events,
        isPc: !navigator.userAgent.match(/(iphone)|(android)/i),
        comment: '',
        scrollToElement: '',
        commentShown: false,
        pageIndex: 1,
        pageSize: 30,
        totalCounts: 0,
        totalPages: 1,
        location: location.href,
        commentRef: 'comment-ref',
        commentListRef: 'comment-list-ref',
        currentComment: {},
        showCommentList: false,
        article: {
          'zpm_user': {}
        },
        detailScroll: null
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      },
      comments () {
        return this.$store.state.article.comments[this.article.uuid]
      }
    },
    async created () {
      const that = this
      await this.getContent()
      this.$nextTick(() => {
        setTimeout(() => {
          this.setTitle()
          // this.initPageScroller()
        }, 500)
      })
      window.onresize = function () {
        that.isPc = !navigator.userAgent.match(/(iphone)|(android)/i)
      }
      // this.eventHub.$on(this.events.frontArticleCloseCommentList, this.closeCommentList)
    },
    methods: {
      async getContent () {
        let _articleId = this.$route.params.aid
        let articleData = await this.$store.dispatch(types.AJAX2, {
          url: this.requestInfo.viewArticle,
          data: {
            uuid: _articleId
          }
        })
        if (articleData.status === 200) {
          this.article = articleData.data
          await this.listComments({
            isInit: true
          })
        } else {
          this.article = {
            'zpm_user': {}
          }
        }
      },
      async listComments (args) {
        if (args && args.isInit) {
          this.pageIndex = 1
        }
        let _searchCondition = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          aid: this.article.uuid
        }
        let commentsData = await this.$store.dispatch(types.AJAX2, {
          url: this.requestInfo.getAllComments,
          data: _searchCondition
        })
        let comments = []
        if (commentsData.status === 200) {
          if (args && args.isInit) {
            comments = commentsData.data.list
          } else {
            comments = this.comments.concat(commentsData.data.list)
          }
          this.cacheArticleComments(comments)
          this.totalCounts = commentsData.data.totalCounts
          this.totalPages = commentsData.data.total
        }
      },
      setTitle () {
        if (this.article.title) {
          document.title = this.article.title
        }
      },
      openCommentList (data) {
        this.currentComment = data
        this.showCommentList = true
      },
      closeCommentList () {
        this.currentComment = {}
        this.showCommentList = false
      },
      scrollInitialed (scroll) {
        this.detailScroll = scroll
        this.detailScroll.refresh()
      },
      addComment (data) {
        this.comments.unshift(data)
        console.log(this.comments[0], data)
        this.cacheArticleComments(this.comments)
        this.scrollToElement = this.$refs[this.commentListRef]
        setTimeout(() => {
          this.scrollToElement = null
        }, 10)
      },
      cacheArticleComments (comments) {
        let _articleComments = {}
        _articleComments[this.article.uuid] = Object.assign([], comments)
        this.$store.commit(types.SET_COMMENTS, _articleComments)
      }
    },
    watch: {
      '$route': function (val) {
        this.setTitle()
      }
    },
    components: {
      Comment: () => import('./Comment.vue'),
      LsScroll: () => import('../plugins/LsScroll/LsScroll.vue'),
      Feedback: () => import('./Feedback.vue'),
      CommentList: () => import('./CommentList.vue')
    }
  }
</script>
