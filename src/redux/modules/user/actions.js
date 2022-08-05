import { createAction } from 'redux-actions'
import * as CONSTANTS from './constants'

export const getUser = createAction(CONSTANTS.GET_USER)
export const getUsers = createAction(CONSTANTS.GET_USERS)
export const createUser = createAction(CONSTANTS.CREATE_USER)
export const updateUser = createAction(CONSTANTS.UPDATE_USER)
export const deleteUser = createAction(CONSTANTS.DELETE_USER)
export const getUserReport = createAction(CONSTANTS.GET_USER_REPORT)
