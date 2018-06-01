/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2017/7/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions: actions.actions,
  mutations: mutations.mutations,
  getters: getters.getters,
  state: {
    username: 'ls',
    author: '智愚',
    appName: 'RQQ WX',
    fullAppName: 'RQQ',
    shortAppName: 'R',
    appSettings: {
      bg: '/static/images/bg.jpeg'
    },
    tabbars: [
      {
        name: 'edit',
        text: '发布',
        pathName: 'PublishIndex',
        path: '/publish/index'
      },
      {
        name: 'viewList',
        text: '经验',
        pathName: 'ArticleIndex',
        path: '/article/index'
      },
      {
        name: 'account',
        text: '我的',
        pathName: 'ProfileIndex',
        path: '/profile/index'
      }
    ],
    assets: {
      maleAvatar: '/static/images/avatar_male_1.jpg',
      femaleAvatar: '/static/images/avatar_female_1.jpg'
    },
    article: {
      comments: {}
    },
    allArticleTags: [],
    events: {
      frontArticleCloseCommentList: 'front-article-close-comment-list'
    },
    allUsers: [],
    requestInfo: {
      baseUrl: 'http://192.168.189.89:3000',
      login: '/Zpm/user/login',
      registry: '/Zpm/user/register',
      queryUsers: '/Zpm/user/queryUsers', // 查询用户列表，模糊查询。不需要管理员权限
      updateUserInfo: '/Zpm/user/updateUserInfo', // 更新个人信息
      getAllArticle: '/Zpm/article/getAll', // 获取文章列表，不需要登录状态
      viewArticle: '/Zpm/article/content', // 根据文章id查询文章内容
      getAllComments: '/Zpm/comment/list', // 分页获取评论
      sendComment: '/Zpm/comment/comment', // 发表评论
      searchArticle: '/Zpm/article/search', // 按title或content搜索文章
      getAllTags: '/Zpm/tag/getAll', // 获取 所有 tag
      createArticle: '/Zpm/article/create', // 新建文章
      saveArticle: '/Zpm/article/save' // 保存文章内容
    },
    localStorageKeys: {
      userInfo: 'user-info'
    },
    isLoading: false, // 页面是否在加载中
    loginInfo: {},
    needlessLogin: ['Login', 'Register', 'Forget', 'ActivityPreview', 'ArticleList', 'ArticleView'] // 不需要登录的页面
  }
})

export default store

global.store = store
