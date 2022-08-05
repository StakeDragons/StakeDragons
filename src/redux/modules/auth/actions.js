import { createAction } from 'redux-actions'
import * as CONSTANTS from './constants'

export const login = createAction(CONSTANTS.AUTH_LOGIN)
export const logout = createAction(CONSTANTS.AUTH_LOGOUT)
export const signup = createAction(CONSTANTS.AUTH_SIGNUP)
export const getProfile = createAction(CONSTANTS.GET_PROFILE)
export const saveProfile = createAction(CONSTANTS.SAVE_PROFILE)
