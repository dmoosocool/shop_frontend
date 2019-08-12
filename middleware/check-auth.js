import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'

export default function({ isServer, store, req }) {
  if (isServer && !req) return

  const loggedUser = isServer
    ? getUserFromCookie(req)
    : getUserFromLocalStorage()

  store.commit('SET_USER', loggedUser)
}
