<template>
  <div class="article_list_container">
    <div class="article_header_container"></div>
    <div class="article_content_container">
      <ls-scroll class="article_item_body_wrapper"
                 :ref="scrollRef"
                 :data="articles"
                 :options="scrollOptions"
                 :pullDownRefresh="true"
                 :pullUpLoad="true"
                 @pullingDown="onPullingDown"
                 @pullingUp="onPullingUp"
      >
        <div class="article_body">
          <div class="article_item"></div>
          <div class="article_item"></div>
          <div class="article_item"></div>
          <div class="article_item"></div>
          <div class="article_item"></div>
          <div class="article_item"></div>
          <div class="article_item"></div>
          <div class="article_item"></div>
          <div class="article_item"></div>
          <div class="article_item"></div>
          <div class="article_item"></div>
          <div class="article_item"></div>
        </div>
      </ls-scroll>
    </div>
  </div>
</template>
<style scoped>
  .article_list_container {
    width: 100%;
    height: 100%;
  }
  .article_header_container {
    width: 100%;
    height: 44px;
    background-color: #FFFFFF;
  }
  .article_content_container {
    width: 100%;
    height: calc(100% - 44px);
    background-color: #ffffff;
  }
  .article_item_body_wrapper {
    position: fixed;
    width: 100%;
    height: calc(100% - 44px - 53px);
    /*overflow: hidden;*/
  }
  .article_item {
    width: 100%;
    height: 200px;
    background-color: #f5f5f5;
    margin-bottom: 20px;
  }
</style>
<script>
  import * as types from '../../store/mutation-types'
  export default {
    name: 'ArticleIndex',
    data () {
      return {
        requestInfo: this.$store.state.requestInfo,
        articles: [],
        pageIndex: 1,
        pageSize: 20,
        totalCounts: 0,
        totalPages: 1,
        scrollRef: 'scroll-ref',
        scrollOptions: {
          pullUpLoad: {
            threshold: 0,
            txt: {
              more: '加载更多',
              noMore: '<p>这就到底了？</p><p>文章太少，我<a href="http://192.168.189.89">去写</a>一个</p><p>asf</p><p>as0000</p>'
            }
          }
        }
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      }
    },
    async created () {
      await this.getAllArticle({
        isInit: true
      })
    },
    methods: {
      async getAllArticle (args) {
        if (args && args.isInit) {
          this.pageIndex = 1
        }
        let _searchCondition = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        if (args && args.hasOwnProperty('author') && args.author.trim() !== '') {
          _searchCondition.author = args.author
        }
        let listData = await this.$store.dispatch(types.AJAX2, {
          url: this.requestInfo.getAllArticle,
          data: _searchCondition
        })
        if (listData.status === 200) {
          if (args && args.isInit) {
            this.articles = listData.data.list
          } else {
            this.articles = this.articles.concat(listData.data.list)
          }
          this.totalCounts = listData.data.totalCounts
          this.totalPages = listData.data.total
        }
      },
      onPullingDown () {
        setTimeout(async () => {
          await this.getAllArticle({
            isInit: true
          })
        }, 800)
      },
      onPullingUp () {
        setTimeout(async () => {
          await this.loadNextPage()
        }, 800)
      },
      async loadNextPage () {
        if (this.pageIndex < this.totalPages) {
          // 加载下一页
          this.pageIndex += 1
          await this.list({
            isInit: false
          })
        } else {
          this.$refs[this.scrollRef].forceUpdate()
        }
      }
    },
    components: {
      LsScroll: () => import('../plugins/LsScroll/LsScroll.vue')
    }
  }
</script>
