import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth.js';

export default function({ store, req }) {
  if (process.server && !req) return;

  const loggedUser = process.server
    ? getUserFromCookie(req)
    : getUserFromLocalStorage();

  store.commit('SET_USER', loggedUser);
}
