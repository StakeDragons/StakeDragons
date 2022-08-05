import { handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'
import * as CONSTANTS from './constants'

const getInitialState = () => {
  let authRestore = JSON.parse(localStorage.getItem('auth_data') || null)
  return authRestore
    ? {
        token: authRestore.token,
        me: authRestore.info,
        status: 'INIT',
        error: null,
      }
    : {
        token: null,
        me: null,
        status: 'INIT',
        error: null,
      }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(
  {
    [requestSuccess(CONSTANTS.AUTH_LOGIN)]: (state, { payload }) => ({
      ...state,
      token: payload.token,
      status: requestSuccess(CONSTANTS.AUTH_LOGIN),
      me: payload.info,
    }),

    [requestFail(CONSTANTS.AUTH_LOGIN)]: (state, { payload }) => ({
      ...state,
      token: null,
      status: requestFail(CONSTANTS.AUTH_LOGIN),
      me: null,
      error: payload,
    }),

    [CONSTANTS.AUTH_LOGOUT]: (state, { payload }) => ({
      ...state,
      token: null,
      status: CONSTANTS.AUTH_LOGOUT,
      me: null,
      error: null,
    }),

    [requestSuccess(CONSTANTS.AUTH_SIGNUP)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(CONSTANTS.AUTH_SIGNUP),
      error: null,
    }),

    [requestFail(CONSTANTS.AUTH_SIGNUP)]: (state, { payload }) => ({
      ...state,
      token: null,
      status: requestFail(CONSTANTS.AUTH_SIGNUP),
      me: null,
      error: payload,
    }),

    [requestSuccess(CONSTANTS.SAVE_PROFILE)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(CONSTANTS.SAVE_PROFILE),
      me: payload,
      error: null,
    }),
  },
  getInitialState(),
)
