export default function({ $axios, redirect, app, store }) {
  // $axios.onResponse((response) => {
  //   if (response.status === 200) {
  //     return Promise.resolve(response);
  //   } else {
  //     console.log(response);
  //   }
  // });

  $axios.onError((error) => {
    // const code = parseInt(error.response && error.response.status);
    console.log(error.response.data.message);
  });
}
