import { get } from 'lodash'

export const userStateSelector = (state) => get(state, 'user')
export const userDetailSelector = (state) => get(state, 'user.user', {})
export const usersListSelector = (state) => get(state, 'user.users', [])
export const userReportSelector = (state) => get(state, 'user.report', {})
export const usersParamsSelector = (state) => get(state, 'user.params', {})
