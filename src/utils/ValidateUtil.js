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
 * Created by liangshan on 2018/7/24.
 */
const ValidateUtil = (function () {
  const _validatePhonenum = function (val) {
    let _val = val || ''
    if (!_val || (_val.trim() === '')) {
      return {
        valid: false,
        msg: '手机号不能为空'
      }
    } else if (!/^1[345678]\d{9}$/.test(_val)) {
      return {
        valid: false,
        msg: '手机号格式不正确'
      }
    } else {
      return {
        valid: true
      }
    }
  }
  const _validatePassword = function (val) {
    let _val = val || ''
    if (!_val || (_val.trim() === '')) {
      return {
        valid: false,
        msg: '密码不能为空'
      }
    } else if (_val.trim().length < 6) {
      return {
        valid: false,
        msg: '密码最少为6位'
      }
    } else {
      return {
        valid: true
      }
    }
  }
  return {
    validatePhonenum: _validatePhonenum,
    validatePassword: _validatePassword
  }
})()

export default ValidateUtil
