/**
 * Created by liangshan on 2017/12/6.
 */

function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function getUUID (prefix) {
  return ((prefix || '') + S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

const _getItem = function (name) {
  let _value = localStorage.getItem(name) || ''
  try {
    _value = JSON.parse(_value)
  } catch (err) {
  }
  return _value
}

const _setItem = function (name, value) {
  let _value = value
  if (typeof value !== 'string') {
    _value = JSON.stringify(value)
  }
  localStorage.setItem(name, _value)
}

const _removeItem = function (name) {
  if (localStorage.hasOwnProperty(name)) {
    localStorage.removeItem(name)
  }
}

const _clear = function () {
  localStorage.clear()
}

const _storage = {
  getItem: _getItem,
  setItem: _setItem,
  removeItem: _removeItem,
  clear: _clear
}

const _isEmptyObj = function (obj) {
  let t
  for (t in obj) {
    return !1
  }
  return !0
}

let kit = {}
kit.title = function (title) {
  window.document.title = (title || '智愚')
}

const _func = (function () {
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

export default {
  storage: _storage,
  isEmptyObj: _isEmptyObj,
  getUUID: getUUID,
  kit: kit,
  func: _func
}
