import Cookies from 'js-cookie'
const TokenKey = 'loginToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token,expires) {
  return Cookies.set(TokenKey, token,{ expires: 0.1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
