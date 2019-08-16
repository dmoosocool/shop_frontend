export default function({ $axios, redirect, app, store }) {
  // $axios.onResponse((response) => {
  //   if (response.status === 200) {
  //     return Promise.resolve(response);
  //   } else {
  //     console.log(response);
  //   }
  // });

  $axios.onRequest((config) => {
    const { token } = store.getters.loggedUser;
    // $axios.setToken(token, 'Bearer');

    config.headers.Authorization = `Bearer ${token}`;
    console.log(config, token);
    return config;
  });

  $axios.onError((error) => {
    // const code = parseInt(error.response && error.response.status);

    console.log(error);
    const {
      response: {
        data: { message, status }
      }
    } = error;

    const { $toast } = app;

    $toast.global.my_error();
    $toast.error(message);

    if (status !== 404) {
      // handle this error, will not redirect to error page..
      return {};
    }
  });
}
