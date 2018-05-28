<template>
  <div class="article_feedback_container">
    <div class="feedback_mobile" v-if="!isPc">
      <!--<div class="bottom_comment_placement" v-if="!commentShown">-->
        <!--<div type="text" class="comment_input_placement" :ref="writeCommentRef" @click="showComment" v-if="loginInfo.token">写评论...</div>-->
        <!--<div type="text" class="comment_input_placement disabled" v-else>写评论...</div>-->
        <!--<div class="send_comment_btn disabled">发布</div>-->
        <!--<div class="disable_placement" v-if="!loginInfo.token"><a href="javascript: void(0)" @click="gotoLogin">登录</a>后才可以评论</div>-->
      <!--</div>-->

      <div class="comment_wrapper" ref="commentWrapper" :class="{clickable: showFeedbackBg}" @click.self="hideComment">
        <div class="bottom_comment_container" ref="bottomCommentContainer">
          <div class="bottom_comment_inner">
            <x-textarea :placeholder="placeholder || '写评论...'"
                        :autosize="true"
                        :rows="1"
                        :height="textareaHeight"
                        v-model="comment"
                        :ref="commentRef"
                        @on-blur="hideComment"
                        @on-focus="focusTextarea"
                        class="comment_input"
            ></x-textarea>
            <!--<Input type="textarea"-->
            <!--:autosize="{minRows: 1, maxRows: 4}"-->
            <!--:ref="commentRef"-->
            <!--class="comment_input"-->
            <!--v-model="comment"-->
            <!--:placeholder="placeholder || '写评论...'"-->
            <!--@on-blur="hideComment"-->
            <!--/>-->
            <!--<textarea wrap="soft" :ref="commentRef" autocomplete="off" spellcheck="false" placeholder="写评论..." rows="2" class="ivu-input" style="height: 31px; min-height: 31px; max-height: 94px;"></textarea>-->
            <!--<div class="send_comment_btn" :class="{active: comment.trim().length > 0}" @click="sendComment">发布</div>-->
            <x-button type="primary" class="send_comment_btn" text="发布" @click.native="sendComment" :disabled="comment.trim().length == 0"></x-button>
          </div>
          <div class="textarea_blank_container" v-if="textareaFocused"></div>
          <div class="disable_placement" v-if="!loginInfo.token"><a href="javascript: void(0)" @click="gotoLogin">登录</a>后才可以评论</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .article_feedback_container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .feedback_mobile {
    width: 100%;
    height: 100%;
  }
  .bottom_comment_placement {
    position: absolute;
    width: 100%;
    height: 48px;
    bottom: 0;
    left: 0;
    z-index: 999;
    padding: 5px 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #ffffff;
    border-top: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .comment_input_placement.disabled {
    opacity: .3;
  }
  .disable_placement {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 48px;
    font-size: 13px;
    background-color: rgba(255, 255, 255, .8);
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .comment_input_placement {
    width: calc(100% - 50px);
    height: 30px;
    border: none;
    border-radius: 4px;
    padding-left: 8px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    background-color: #f5f5f5;
    color: #888;
    font-size: 14px;
  }

  .comment_wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: transparent;
    /*-webkit-transform: translate(0, 100%);*/
    /*-moz-transform: translate(0, 100%);*/
    /*-ms-transform: translate(0, 100%);*/
    /*-o-transform: translate(0, 100%);*/
    /*transform: translate(0, 100%);*/
    /*-webkit-transition: all .2s ease-in-out;*/
    /*-moz-transition: all .2s ease-in-out;*/
    /*-ms-transition: all .2s ease-in-out;*/
    /*-o-transition: all .2s ease-in-out;*/
    /*transition: all .2s ease-in-out;*/
    /*transition-delay: 0.1s;*/
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .comment_wrapper.clickable {
    pointer-events: auto;
  }
  .comment_wrapper.shown {
    -webkit-transform: translate(0, 0%);
    -moz-transform: translate(0, 0%);
    -ms-transform: translate(0, 0%);
    -o-transform: translate(0, 0%);
    transform: translate(0, 0%);
  }
  .bottom_comment_container {
    position: absolute;
    width: 100%;
    min-height: 48px;
    pointer-events: auto;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    border-top: 1px solid #f5f5f5;
  }
  .bottom_comment_inner {
    width: 100%;
    min-height: 48px;
    padding: 5px 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .textarea_blank_container {
    width: 100%;
    background-color: #ffffff;
    height: 80px;
  }
  .bottom_comment_container.active {
    /*bottom: 80px;*/
    /*background-color: #c8c8c8;*/
  }
  .bottom_comment_container.active .send_comment_btn {
    font-size: 16px;
    line-height: 30px;
  }
  .comment_input {
    width: calc(100% - 80px);
    /*height: 30px;*/
    border: none;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    background-color: #f5f5f5;
    color: #888888;
    font-size: 14px;
    padding: 0 0 0 8px;
  }
  /*.comment_input textarea {*/
    /*resize: none;*/
    /*height: 30px;*/
    /*-webkit-tap-highlight-color: transparent;*/
    /*outline: none;*/
    /*border: none;*/
  /*}*/
  .send_comment_btn {
    width: 60px;
    height: 36px;
    border: none;
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
</style>
<script>
  import * as types from '../../store/mutation-types'
  import { XTextarea, XButton } from 'vux'
  export default {
    name: 'Feedback',
    props: {
      aid: {
        type: String,
        default: ''
      },
      pid: {
        type: String,
        default: ''
      },
      rid: {
        type: String,
        default: ''
      },
      focus: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '写评论...'
      }
    },
    data () {
      return {
        commentShown: false,
        isPc: !navigator.userAgent.match(/(iphone)|(android)/i),
        requestInfo: this.$store.state.requestInfo,
        comment: '',
        commentRef: 'comment-ref',
        writeCommentRef: 'write-comment-ref',
        commentFocus: false,
        eventHub: this.$store.state.eventHub,
        events: this.$store.state.events,
        showFeedbackBg: false,
        textareaHeight: 36,
        textareaFocused: false
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      }
    },
    created () {
      const that = this
      window.onresize = function () {
        that.isPc = !navigator.userAgent.match(/(iphone)|(android)/i)
      }
    },
    methods: {
      hideComment () {
        this.textareaFocused = false
        this.showFeedbackBg = false
        this.commentShown = false
        this.$emit('end-input')
        this.$refs[this.commentRef].$refs.textarea.style.height = '36px'
        setTimeout(() => {
          if (this.rid !== '') {
            this.comment = ''
          }
        }, 10)
      },
      gotoLogin () {
        this.$router.push({
          name: 'Login'
        })
      },
      async sendComment () {
        if (this.comment.trim() === '') {
          return
        }
        let articleId = this.aid
        let _commentObj = {
          aid: articleId,
          content: this.comment.trim().replace(/([\n\r]){2,}/g, '$1'),
          nickname: this.loginInfo.nickname || '',
          headIcon: this.loginInfo.headIcon || '',
          pid: this.pid || '',
          rid: this.rid || ''
        }
        let commentData = await this.$store.dispatch(types.AJAX, {
          url: this.requestInfo.sendComment,
          data: _commentObj
        })
        if (commentData.status === 200) {
          this.$vux.toast.show({
            type: 'text',
            text: '评论成功'
          })
          this.comment = ''
          this.$emit('feedback', commentData.data)
          this.hideComment()
        }
      },
      focusTextarea () {
        this.showFeedbackBg = true
        this.textareaFocused = true
//        this.$refs[this.commentRef].$refs.textarea.style.bottom = '100px'
        this.$vux.toast.show({
          type: 'text',
          text: 'focus'
        })
      }
    },
    components: {
      XTextarea,
      XButton
    }
  }
</script>
