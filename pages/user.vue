<template>
  <div id="admin-users">
    用户管理
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'authenticated',
  data() {
    return {
      title: '管理后台-用户管理',
      loggedUser: this.$store.state.user
    };
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>

<style lang="scss"></style>
