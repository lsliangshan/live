<template>
  <div class="publish_container">
    <div class="publish_inner" :class="{unlogin: !loginInfo.token}">
      <div class="new_article_card">
        <group gutter="0px" label-width="50px">
          <x-input title="标题" placeholder="请输入文章标题" v-model="newArticleData.title"></x-input>
          <popup-picker title="标签" placeholder="请选择标签" v-model="newArticleData.tag" :options="allTags"></popup-picker>
          <!--<selector title="标签" placeholder="请选择标签" v-model="newArticleData.tag" :options="allTags"></selector>-->
          <x-button type="primary" class="create_btn" text="新增"></x-button>
        </group>
      </div>
    </div>

    <transition name="fade">
      <div class="unlogin_mask_container" v-if="pageLoaded && !loginInfo.token">
        <p>未登录不能发布新文章</p>
        <div class="btns">
          <a class="goto_login_btn" href="javascript: void(0)" @click="gotoLogin">登录</a>
          <a class="goto_registry_btn" href="javascript: void(0)" @click="gotoRegistry">注册</a>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped lang="less">
  .publish_container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .publish_inner {
    width: 100%;
    height: 100%;
    background-color: rgba(4, 190, 2, .1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .new_article_card {
    width: 90%;
    /*min-height: 200px;*/
    background-color: #ffffff;
    border-radius: 5px;
    padding: 15px 10px;
    box-sizing: border-box;
  }

  .publish_inner.unlogin {
    filter: blur(2px);
  }

  .unlogin_mask_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #f5f5f5;
    transition-delay: .4s;
  }
  .btns {
    margin-top: 15px;
  }
  .goto_registry_btn, .goto_login_btn {
    color: @tabbar-text-active-color;
    margin: 0 10px;
  }

  .create_btn {
    margin-top: 20px;
  }
</style>
<script>
  import { Group, XInput, XButton, Selector, PopupPicker } from 'vux'
  import * as types from '../../store/mutation-types'
  export default {
    name: 'PublishIndex',
    data () {
      return {
        pageLoaded: false,
        requestInfo: this.$store.state.requestInfo,
        allTagsArr: [],
        allTags: [],
        newArticleData: {
          title: '',
          tag: ''
        }
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      }
    },
    async created () {
      await this.getAllTags()
      this.$nextTick(() => {
        this.pageLoaded = true
      })
    },
    methods: {
      async getAllTags () {
        /**
         * 获取所有标签
         */
        let allTags = await this.$store.dispatch(types.AJAX2, {
          url: this.requestInfo.getAllTags
        })
        if (allTags.status === 200) {
          this.allTagsArr = Object.assign([], allTags.data.list)
          this.allTags = this.formatAllTags(allTags.data.list)
          this.$store.commit(types.CACHE_ALL_ARTICLE_TAGS, {
            tags: this.allTagsArr
          })
        }
      },
      formatAllTags (tags) {
        let outTags = []
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].parent !== '0') {
            outTags.push({
              key: tags[i].value,
              value: tags[i].text
            })
          }
        }
        return outTags
      },
      gotoLogin () {
        this.pageLoaded = false
        this.$router.push({
          name: 'Login'
        })
      },
      gotoRegistry () {
        this.pageLoaded = false
        this.$router.push({
          name: 'Login',
          query: {
            t: 'r'
          }
        })
      }
    },
    watch: {
      '$route' (val) {
        if (val.name === 'PublishIndex') {
          this.pageLoaded = true
        }
      }
    },
    components: {
      Group,
      XInput,
      XButton,
      Selector,
      PopupPicker
    }
  }
</script>
