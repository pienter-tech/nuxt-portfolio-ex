<template>
  <div>Test123</div>
</template>

<script>
export default {
  computed: {
    characters() {
      return this.$store.state.characters;
    },
  },
  created() {
    this.$store.dispatch('getCharacters');
  },
};
</script>

<style></style>
