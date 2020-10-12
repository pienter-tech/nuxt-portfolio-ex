<template>
  <div
    :class="{
      'c-character': true,
    }"
  >
    <div class="c-character__thumbnail">
      <img :src="thumbnailSrc" :alt="curCharacter.name" />
    </div>
    <div class="c-character__info">
      <h2>{{ curCharacter.name }}</h2>
      <p>{{ curCharacter.description || 'No description found' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Character',
  props: { character: { type: Object, required: true } },
  computed: {
    curCharacter() {
      return this.character;
    },
    thumbnailSrc() {
      return (
        this.curCharacter.thumbnail.path +
        '.' +
        this.curCharacter.thumbnail.extension
      );
    },
  },
};
</script>

<style lang="scss">
.c-character {
  display: flex;
  flex-wrap: wrap;
  &__thumbnail {
    width: 20rem;
    flex-shrink: 0;
  }
  &__info {
    padding-left: 2rem;
    @include s() {
      padding-left: 0;
      width: 100%;
    }
  }
}
</style>
