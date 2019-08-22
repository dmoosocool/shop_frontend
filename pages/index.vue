<template>
  <div id="admin-index">
    <h1>hello ~</h1>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',

  data() {
    return {
      title: '后台首页'
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
