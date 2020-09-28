<template>
  <div
    :class="{
      'c-character-list': true,
      'c-character-list--loading': fetchingCharacters,
    }"
  >
    <Character
      v-for="character in characters"
      :key="character.id"
      :character="character"
    >
      {{ character.name }}
    </Character>

    <div v-if="characters.length === 0" class="c-character-list__empty">
      No characters found...
    </div>
  </div>
</template>

<script>
import Character from '~/components/Character';

export default {
  name: 'CharacterList',
  components: { Character },
  computed: {
    fetchingCharacters() {
      return this.$store.state.fetchingCharacters;
    },
    characters() {
      return this.$store.state.characters;
    },
  },
};
</script>

<style lang="scss">
.c-character-list {
  min-height: 10rem;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
  border: 1px solid $purple;

  &__empty {
    text-align: center;
    font-size: 2rem;
    align-self: center;
    grid-column: span 2;
  }

  &--loading {
    @extend %loading;
  }
}
</style>
