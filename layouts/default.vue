<template>
  <div class="default-layout">
    <Header />
    <Nuxt class="default-page" />
  </div>
</template>

<script>
import Header from '../components/Header';
export default {
  name: 'DefaultLayout',
  components: { Header },
};
</script>
<style lang="scss">
.default-layout {
  padding-top: $header-height;
}

.default-page {
  padding: 2rem 2rem;
  max-width: 960px;
  margin: 0 auto;
}
</style>
