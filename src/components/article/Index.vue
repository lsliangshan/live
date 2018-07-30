<template>
  <div class="article_list_container" :style="{opacity: initialized ? 1 : 0}">
    <div class="article_header_container">
      <search position="absolute"
              v-model="searchText"
              @on-submit="doSearch"
              @on-change="getResults"
              @on-result-click="setSearchText"
              @on-cancel="cancelSearch"
              @on-clear="cancelSearch"
              class="search_container"
              :results="searchResults"
              auto-scroll-to-top
      >
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
          <article-card v-for="(article, index) in articles" :key="article.uuid" :all-tags="allTags" :comments="article.zpm_comments.length" :article="article"></article-card>
          <!--<div class="article_item" v-for="(article, index) in articles" :key="article.uuid">-->
            <!--<div class="article_item_left" :style="{width: calcToRealPx(150) + 'px', height: '100%'}">-->
              <!--<div class="article_item_left_avatar_container" :style="{width: calcToRealPx(120) + 'px', height: calcToRealPx(120) + 'px'}">-->
                <!--<img class="avatar_img" :src="article.zpm_user.headIcon || (loginInfo.gender == 1 ? assets.maleAvatar : assets.femaleAvatar)">-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="article_item_right" :style="{width: calcToRealPx(580) + 'px'}">-->
              <!--<div class="article_item_right_top_container">-->
                <!--<div class="username_container" v-text="article.zpm_user.nickname" :style="{height: calcToRealPx(50) + 'px'}"></div>-->
                <!--<div class="member_level_container" :style="{height: calcToRealPx(40) + 'px'}" v-if="filterTags(article.tag).trim() !== ''">-->
                  <!--<div class="member_level_tag" v-for="(t, i) in filterTags(article.tag).split(';')" :key="i" v-text="t"></div>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="article_item_right_bottom_container">-->
                <!--<div class="article_item_main_container" :data-article-id="article.uuid.replace(/^([a-zA-Z0-9]*).*/, '$1')" :data-index="index" @click="gotoArticleDetail">-->
                  <!--<div class="article_item_title pen" v-text="article.title"></div>-->
                  <!--<div class="article_item_content pen" v-ellipsis:50="article.content">-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </ls-scroll>
    </div>
  </div>
</template>
<style scoped lang="less">
  .article_list_container {
    width: 100%;
    height: calc(~"100% - 53px");
    -webkit-transition: opacity .3s ease-in-out;
    -moz-transition: opacity .3s ease-in-out;
    -ms-transition: opacity .3s ease-in-out;
    -o-transition: opacity .3s ease-in-out;
    transition: opacity .3s ease-in-out;
  }
  .article_header_container {
    width: 100%;
    height: 53px;
    border-bottom: 1px solid #F8F8F8;
    background-color: #FFFFFF;
    padding: 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .article_header_container input {
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
  }
  .article_header_container input::placeholder {
    text-align: center;
  }
  .search_container {
    width: 100%;
    height: 53px;
  }
  .article_content_container {
    width: 100%;
    height: calc(~"100% - 53px");
    background-color: #ffffff;
  }
  .article_item_body_wrapper {
    position: fixed;
    width: 100%;
    background-color: #F8F8F8;
    height: calc(~"100% - 53px - 53px");
    /*overflow: hidden;*/
  }
  .article_item {
    width: 100%;
    /*min-height: 200px;*/
    padding: 15px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #ffffff;
    margin-bottom: 15px;
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
    border: 2px solid #f5f5f5;
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
    height: 22px;
    font-size: 12px;
    color: #999999;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .member_level_tag {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    margin: 0 4px 0 0;
    padding: 0 8px;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    background-color: @tab-bar-active-color;
    color: #ffffff;
    overflow: hidden;
  }
  .article_item_right_bottom_container {
    width: 100%;
    margin-top: 6px;
  }
  .article_item_main_container {
    width: calc(~"100% - 20px");
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
  import { StorageUtil } from '../../utils/index'
  export default {
    name: 'ArticleIndex',
    data () {
      return {
        requestInfo: this.$store.state.requestInfo,
        assets: this.$store.state.assets,
        localStorageKeys: this.$store.state.localStorageKeys,
        articles: [],
        pageIndex: 1,
        pageSize: 20,
        offsetCount: 0,
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
        allTags: {},
        allTagsArr: [],
        searchText: '',
        searchValue: '',
        searchResults: [],
        allUsers: [],
        initialized: false
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      }
    },
    created () {
      this.init()
    },
    methods: {
      async init () {
        await this.getAllTags()
        await this.getAllArticle({
          isInit: true
        })

        if (this.$store.state.allUsers.length > 0) {
          this.allUsers = this.$store.state.allUsers
        } else {
          this.allUsers = await this.getAllUsers()
        }
        this.initialized = true
      },
      filterTags (tags) {
        const that = this
        return tags.replace(/(([a-zA-Z0-9]+)(;?))/g, function (item, item2, item3, item4) {
          return (that.allTags[item3] ? that.allTags[item3].text : item3) + item4
        })
      },
      async getAllTags () {
        /**
         * 获取所有标签
         */
        let allTags = await this.$store.dispatch(types.AJAX2, {
          url: this.requestInfo.getAllTags
        })
        if (allTags.status === 200) {
          this.allTagsArr = Object.assign([], allTags.data.list)
          this.allTags = this.formatTags(allTags.data.list)
          this.$store.commit(types.CACHE_ALL_ARTICLE_TAGS, {
            tags: this.allTagsArr
          })
        }
      },
      formatTags (tags) {
        let outTags = {}
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].parent !== '0') {
            outTags[tags[i].value] = tags[i]
          }
        }
        return outTags
      },
      async getAllArticle (args) {
        if (args && args.isInit) {
          this.pageIndex = 1
        }
        let listData = {}
        if (this.searchText && this.searchText.trim() !== '') {
          switch (this.searchText.trim().substring(0, 1)) {
            case '@':
              listData = await this.searchArticle({
                searchType: 'author',
                searchValue: this.searchValue.trim()
              })
              break
            case '#':
              // 按 文章标签 搜索
              listData = await this.searchArticle({
                searchType: 'tag',
                searchValue: this.searchValue.trim()
              })
              break
            case ':':
              // 按 文章内容 关键词搜索
              listData = await this.searchArticle({
                searchType: 'content',
                searchValue: this.searchText.trim().substring(1)
              })
              break
            default:
              // 按 标题 关键词搜索
              listData = await this.searchArticle({
                searchType: 'title',
                searchValue: this.searchText.trim()
              })
              break
          }
        } else {
          listData = await this.searchArticle({
            searchType: 'title',
            searchValue: ''
          })
        }
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
          await this.getAllArticle({
            isInit: false
          })
        } else {
          this.$refs[this.scrollRef].forceUpdate()
        }
      },
      async gotoArticleDetail (e) {
        let _index = Number(e.target.dataset.index)
        await StorageUtil.setItem(this.localStorageKeys.currentArticleContent, this.articles[_index])
        this.$router.push({
          name: 'ArticleDetail',
          params: {
            aid: e.target.dataset.articleId
          }
        })
      },
      async doSearch () {
        let articlesData = {}
        switch (this.searchText.trim().substring(0, 1)) {
          case '@':
            articlesData = await this.searchArticle({
              searchType: 'author',
              searchValue: this.searchValue
            })
            if (articlesData.status === 200) {
              this.articles = articlesData.data.list
            }
            break
          case '#':
            articlesData = await this.searchArticle({
              searchType: 'tag',
              searchValue: this.searchValue
            })
            if (articlesData.status === 200) {
              this.articles = articlesData.data.list
            }
            break
          case ':':
            // 按 文章内容 关键词搜索
            articlesData = await this.searchArticle({
              searchType: 'content',
              searchValue: this.searchText.trim().substring(1)
            })
            if (articlesData.status === 200) {
              this.articles = articlesData.data.list
            }
            break
          default:
            // 按 标题 关键词搜索
            articlesData = await this.searchArticle({
              searchType: 'title',
              searchValue: this.searchText.trim()
            })
            if (articlesData.status === 200) {
              this.articles = articlesData.data.list
            }
            break
        }
      },
      async searchArticle (args) {
        let searchData = await this.$store.dispatch(types.AJAX2, {
          url: this.requestInfo.searchArticle,
          data: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            offsetCount: this.offsetCount,
            searchType: args.searchType,
            searchValue: args.searchValue
          }
        })
        return searchData
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
      formatTagsForSearch () {
        let _allTags = Object.assign([], this.allTagsArr)
        let outTags = []
        for (let i = 0; i < _allTags.length; i++) {
          if (_allTags[i].text.indexOf(this.searchText.replace(/^#/, '')) > -1 && (_allTags[i].parent !== '0')) {
            outTags.push({
              title: '#' + _allTags[i].text,
              value: _allTags[i].value
            })
          }
        }
        return outTags
      },
      getResults () {
        let _searchText = this.searchText
        if (_searchText.trim() === '') {
          this.searchResults = []
          return
        }
        switch (_searchText.trim().substring(0, 1)) {
          case '@':
            // 按用户昵称搜索
            this.searchResults = this.formatUsersForSearch()
            break
          case '#':
            // 按文章标签搜索
            this.searchResults = this.formatTagsForSearch()
            break
          default:
            this.searchResults = []
            break
        }
      },
      cancelSearch () {
        this.searchText = ''
        this.searchValue = ''
        this.doSearch()
      },
      setSearchText (item) {
        this.searchText = item.title
        this.searchValue = item.value
        this.doSearch()
      }
    },
    components: {
      Search,
      LsScroll: () => import('../plugins/LsScroll/LsScroll.vue'),
      ArticleCard: () => import('./Card.vue')
    }
  }
</script>
