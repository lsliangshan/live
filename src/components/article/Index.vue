<template>
  <div class="article_list_container">
    <div class="article_header_container">
      <search position="absolute"
              v-model="searchText"
              @on-submit="doSearch"
              @on-change="getResults"
              @on-result-click="setSearchText"
              class="search_container"
              :results="searchResults"
              auto-scroll-to-top>
      </search>
    </div>
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
        <div class="gap_12" style="background-color: #f8f8f8;"></div>
        <div class="article_body">
          <div class="article_item" v-for="(article, index) in articles" :key="index" v-if="article.zpm_user.nickname && (article.zpm_user.nickname.indexOf(searchText.replace(/^@/, '')) > -1)">
            <div class="article_item_left" :style="{width: calcToRealPx(150) + 'px', height: '100%'}">
              <div class="article_item_left_avatar_container" :style="{width: calcToRealPx(150) + 'px', height: calcToRealPx(150) + 'px'}">
                <img class="avatar_img" :src="article.zpm_user.headIcon || (loginInfo.gender == 1 ? assets.maleAvatar : assets.femaleAvatar)">
              </div>
            </div>
            <div class="article_item_right" :style="{width: calcToRealPx(580) + 'px'}">
              <div class="article_item_right_top_container" :style="{height: calcToRealPx(100) + 'px'}">
                <div class="username_container" v-text="article.zpm_user.nickname"></div>
                <div class="member_level_container">Vue使用者</div>
              </div>
              <div class="article_item_right_bottom_container">
                <div class="article_item_main_container" :data-article-id="article.uuid.replace(/^([a-zA-Z0-9]*).*/, '$1')" @click="gotoArticleDetail">
                  <div class="article_item_title pen" v-text="article.title"></div>
                  <div class="article_item_content pen" v-ellipsis:50="article.content">
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    height: 53px;
    background-color: #FFFFFF;
  }
  .search_container {
    width: 100%;
    height: 53px;
  }
  .article_content_container {
    width: 100%;
    height: calc(100% - 53px);
    background-color: #ffffff;
  }
  .article_item_body_wrapper {
    position: fixed;
    width: 100%;
    background-color: #F8F8F8;
    height: calc(100% - 53px - 53px);
    /*overflow: hidden;*/
  }
  .article_item {
    width: 100%;
    /*min-height: 200px;*/
    padding: 8px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #ffffff;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .article_item_left {
    display: inline-flex;
    align-items: flex-start;
    justify-content: center;
  }
  .article_item_left_avatar_container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .avatar_img {
    width: 90%;
    height: 90%;
    border-radius: 50%;
    overflow: hidden;
  }
  .article_item_right {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .article_item_right_top_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .username_container {
    width: 100%;
    height: 50%;
    font-size: 14px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }
  .member_level_container {
    width: 100%;
    height: 40%;
    font-size: 12px;
    color: #999999;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .article_item_right_bottom_container {
    width: 100%;
  }
  .article_item_main_container {
    width: calc(100% - 20px);
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #F8F8F8;
  }
  .article_item_title {
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
  }
  .article_item_content {
    font-size: 13px;
    color: #999999;
  }
</style>
<script>
  import * as types from '../../store/mutation-types'
  import { Search } from 'vux'
  export default {
    name: 'ArticleIndex',
    data () {
      return {
        requestInfo: this.$store.state.requestInfo,
        assets: this.$store.state.assets,
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
              noMore: '<p>这就到底了？</p><p>文章太少，我<a href="/publish/index">去写</a>一个</p>'
            }
          }
        },
        searchText: '',
        searchResults: [],
        allUsers: []
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

      if (this.$store.state.allUsers.length > 0) {
        this.allUsers = this.$store.state.allUsers
      } else {
        this.allUsers = await this.getAllUsers()
      }
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
      },
      gotoArticleDetail (e) {
        this.$router.push({
          name: 'ArticleDetail',
          params: {
            aid: e.target.dataset.articleId
          }
        })
      },
      doSearch () {
        this.$refs.search.setBlur()
      },
      async getAllUsers (username) {
        let _queryData = await this.$store.dispatch(types.AJAX, {
          url: this.requestInfo.queryUsers,
          data: {
            queryUsername: username || ''
          }
        })
        if (_queryData.status === 200) {
          this.$store.commit(types.CACHE_ALL_USERS, {
            users: _queryData.data.list
          })
          return _queryData.data.list
        } else {
          this.$store.commit(types.CACHE_ALL_USERS, {
            users: []
          })
          return []
        }
      },
      formatUsersForSearch () {
        let _allUsers = Object.assign([], this.allUsers)
        let outUsers = []
        for (let i = 0; i < _allUsers.length; i++) {
          if (_allUsers[i].nickname.indexOf(this.searchText.replace(/^@/, '')) > -1) {
            outUsers.push({
              title: '@' + (_allUsers[i].nickname || _allUsers[i].username),
              value: _allUsers[i].phonenum
            })
          }
        }
        return outUsers
      },
      getResults () {
        let _searchText = this.searchText
        if (_searchText.trim() === '') {
          this.searchResults = []
          return
        }
        switch (_searchText.trim().substring(0, 1)) {
          case '@':
            this.searchResults = this.formatUsersForSearch()
            break
          default:
            this.searchResults = []
            break
        }
      },
      setSearchText (item) {
        this.searchText = item.title
      }
    },
    components: {
      Search,
      LsScroll: () => import('../plugins/LsScroll/LsScroll.vue')
    }
  }
</script>
