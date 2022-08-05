import { get } from 'lodash'

export const authStateSelector = (state) => get(state, 'auth')
export const profileSelector = (state) => get(state, 'auth.me', null)
