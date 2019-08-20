export default function({ $axios, redirect, app, store }) {
  $axios.onRequest((config) => {
    if (store.getters.loggedUser) {
      const { token } = store.getters.loggedUser;

      // auto set Bearer token.
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  $axios.onError((error) => {
    const {
      response: {
        status, // http状态码.
        data: { message }
      }
    } = error;

    const { $toast } = app;

    $toast.global.my_error();
    $toast.error(message);

    if (
      error.request.responseURL.includes('/auth/test') > -1 &&
      status === 401
    ) {
      localStorage.setItem('user', null);
      store.commit('SET_USER', null);
    } else if (status !== 404) {
      // handle this error, will not redirect to error page..
      return {};
    }
  });
}
