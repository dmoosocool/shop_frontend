<template>
  <div id="admin-index">
    <h1>hello ~ {{ loggedUser.name }}</h1>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',

  data() {
    return {
      title: '后台首页',
      loggedUser: this.$store.state.user
    };
  },
  async asyncData({ $axios }) {
    await $axios.get('/auth/test');
  },

  head() {
    return {
      title: this.title
    };
  }
};
</script>
