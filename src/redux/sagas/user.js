import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import * as CONSTANTS from 'redux/modules/user/constants'
import apiCall from '../api/apiCall'

const doGetUser = apiCall({
  type: CONSTANTS.GET_USER,
  method: 'get',
  path: ({ payload }) => `/users/${payload.id}`,
})

const doGetUsers = apiCall({
  type: CONSTANTS.GET_USERS,
  method: 'get',
  path: () => `/users/`,
  payloadOnSuccess: (res, { payload }) => ({
    ...res,
    ...pick(get(payload, 'params', {}), ['page', 'page_size']),
  }),
})

const doCreateUser = apiCall({
  type: CONSTANTS.CREATE_USER,
  method: 'post',
  path: () => `/users/`,
})

const doUpdateUser = apiCall({
  type: CONSTANTS.UPDATE_USER,
  method: 'put',
  path: ({ payload }) => `/users/${payload.id}`,
})

const doDeleteUser = apiCall({
  type: CONSTANTS.DELETE_USER,
  method: 'delete',
  path: ({ payload }) => `/users/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
})

const doGetUserReport = apiCall({
  type: CONSTANTS.GET_USER.REPORT,
  method: 'get',
  path: ({ payload }) => `/users/${payload.id}/report`,
})

export default function* rootSaga() {
  yield takeLatest(CONSTANTS.GET_USER, doGetUser)
  yield takeLatest(CONSTANTS.GET_USERS, doGetUsers)
  yield takeLatest(CONSTANTS.CREATE_USER, doCreateUser)
  yield takeLatest(CONSTANTS.UPDATE_USER, doUpdateUser)
  yield takeLatest(CONSTANTS.DELETE_USER, doDeleteUser)
  yield takeLatest(CONSTANTS.GET_USER_REPORT, doGetUserReport)
}
