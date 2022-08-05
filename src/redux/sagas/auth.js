import { takeLatest } from 'redux-saga/effects'
import * as CONSTANTS from 'redux/modules/auth/constants'
import apiCall from '../api/apiCall'

const doLogin = apiCall({
  type: CONSTANTS.AUTH_LOGIN,
  method: 'post',
  path: () => '/auth/login/',
  success: (res, action) => {
    localStorage.setItem('auth_data', JSON.stringify(res.data))
  },
})

const doSignUp = apiCall({
  type: CONSTANTS.AUTH_SIGNUP,
  method: 'post',
  path: () => '/auth/signup',
  success: () => {
    localStorage.removeItem('auth_data')
  },
  fail: () => {
    localStorage.removeItem('auth_data')
  },
})

const doGetProfile = apiCall({
  type: CONSTANTS.GET_PROFILE,
  method: 'get',
  path: () => '/users/profile/',
})

const doSaveProfile = apiCall({
  type: CONSTANTS.SAVE_PROFILE,
  method: 'put',
  path: () => '/users/profile/',
  success: (res, action) => {
    localStorage.setItem(
      'auth_data',
      JSON.stringify({
        info: res.data,
        token: JSON.parse(localStorage.getItem('auth_data')).token,
      }),
    )
  },
})

export default function* rootSaga() {
  yield takeLatest(CONSTANTS.AUTH_LOGIN, doLogin)
  yield takeLatest(CONSTANTS.AUTH_SIGNUP, doSignUp)
  yield takeLatest(CONSTANTS.GET_PROFILE, doGetProfile)
  yield takeLatest(CONSTANTS.SAVE_PROFILE, doSaveProfile)
}
