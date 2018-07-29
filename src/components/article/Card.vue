<template>
  <div class="article_card_container" @click="gotoArticleDetail">
    <div class="article_card_wrapper">
      <div class="article_album">
        <img class="article_album_image" src="https://static.dei2.com/live/images/article.jpeg">
      </div>
      <div class="author_info_container">
        <div class="author_container">
          <svg>
            <use xlink:href="#author"></use>
          </svg>
          <span v-text="article.zpm_user.nickname"></span>
        </div>
        <div class="publish_time">{{article.updateTime | publishTime}}</div>
      </div>
      <div class="article_tag_container">
        <div class="member_level_container" :style="{height: calcToRealPx(40) + 'px'}" v-if="filterTags(article.tag).trim() !== ''">
          <div class="member_level_tag" v-for="(t, i) in filterTags(article.tag).split(';')" :key="i" v-text="t"></div>
        </div>
      </div>
      <div class="article_info_container">
        <div class="article_title_container" v-text="article.title"></div>
        <div class="article_content_container" v-ellipsis:100="article.content"></div>
      </div>
      <div class="bottom_operation_container">
        <div class="bottom_item"></div>
        <div class="bottom_item comment_container">
          <svg>
            <use xlink:href="#comment"></use>
          </svg>
          <span>{{comments}}</span>
        </div>
        <div class="bottom_item like_container">
          <svg>
            <use xlink:href="#like"></use>
          </svg>
          <span>{{article.like}}</span>
        </div>
      </div>
      <div class="avatar_container">
        <img class="avatar_image" :src="article.zpm_user.headIcon || (loginInfo.gender == 1 ? assets.maleAvatar : assets.femaleAvatar)">
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  .article_card_container {
    width: 100%;
    padding: 15px 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .article_card_wrapper {
    position: relative;
    width: 100%;
    min-height: 50px;
    padding: 10px 10px 0 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #FFFFFF;
  }
  .article_album {
    width: 100%;
  }
  .article_album_image {
    width: 100%;
  }
  .avatar_container {
    position: absolute;
    top: -19px;
    width: 60px;
    height: 60px;
    background-color: #FFFFFF;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar_image {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  .author_info_container {
    width: 100%;
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .author_container {
    font-size: 14px;
    color: #888;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  }
  .author_container svg {
    margin-right: 4px;
    width: 14px;
    height: 14px;
    fill: #888888;
  }
  .publish_time {
    font-size: 14px;
    color: #888;
  }
  .article_info_container {
    width: 100%;
  }
  .article_title_container {
    margin-top: 8px;
    font-size: 18px;
    line-height: 40px;
    font-weight: bolder;
  }
  .article_content_container {
    font-size: 14px;
    color: #666666;
    padding-bottom: 8px;
    border-bottom: 1px solid #f8f8f8;
  }

  .article_tag_container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
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

  .bottom_operation_container {
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .bottom_item {
    width: 33%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #888888;
  }
  .bottom_item svg {
    width: 20px;
    height: 20px;
    fill: #888888;
  }
  .bottom_item span {
    /*height: 16px;*/
    margin-left: 4px;
  }
</style>
<script>
import { StorageUtil } from '../../utils/index'
export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      default () {
        return {}
      }
    },
    allTags: {
      type: Object,
      default () {
        return {}
      }
    },
    comments: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      assets: this.$store.state.assets,
      localStorageKeys: this.$store.state.localStorageKeys
    }
  },
  computed: {
    loginInfo () {
      return this.$store.state.loginInfo
    }
  },
  methods: {
    filterTags (tags) {
      const that = this
      return tags.replace(/(([a-zA-Z0-9]+)(;?))/g, function (item, item2, item3, item4) {
        return (that.allTags[item3] ? that.allTags[item3].text : item3) + item4
      })
    },
    async gotoArticleDetail () {
      await StorageUtil.setItem(this.localStorageKeys.currentArticleContent, this.article)
      this.$router.push({
        name: 'ArticleDetail',
        params: {
          aid: this.article.uuid.replace(/^([a-zA-Z0-9]*).*/, '$1')
        }
      })
    }
  },
  filters: {
    publishTime (text) {
      let outStr = ''
      let now = new Date().getTime()
      let _d = Number(text)
      let _date = new Date(_d)
      let _dist = now - _d
      if (_dist >= 3 * 24 * 60 * 60 * 1000) {
        outStr = _date.getFullYear() + '-' + (_date.getMonth() + 1 < 10 ? '0' + (_date.getMonth() + 1) : _date.getMonth() + 1) + '-' + (_date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate()) + ' ' + (_date.getHours() < 10 ? '0' + _date.getHours() : _date.getHours()) + ':' + (_date.getMinutes() < 10 ? '0' + _date.getMinutes() : _date.getMinutes())
      } else if (_dist > 2 * 24 * 60 * 60 * 1000) {
        outStr = '2天前'
      } else if (_dist >= 24 * 60 * 60 * 1000) {
        outStr = '1天前'
      } else if (_dist >= 60 * 60 * 1000) {
        outStr = Math.floor(_dist / (60 * 60 * 1000)) + '小时前'
      } else if (_dist >= 30 * 60 * 1000) {
        outStr = '半小时前'
      } else if (_dist > 1 * 60 * 1000) {
        outStr = Math.floor(_dist / (60 * 1000)) + '分钟前'
      } else {
        outStr = '刚刚'
      }
      return outStr
    }
  },
  components: {}
}
</script>
