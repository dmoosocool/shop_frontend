<template>
  <div>
    <h1 class="title">Hello</h1>
    <h2 class="subtitle">World</h2>
  </div>
</template>
<script>
export default {
  middleware: 'authenticated',
  async asyncData({ $axios }) {
    await $axios.get('/auth/test');
  }
};
</script>
