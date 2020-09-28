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
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      background-color: rgba(white, 0.9);
    }

    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -32px;
      margin-left: -32px;
      content: '';
      display: block;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 6px solid #fff;
      border-color: #000 transparent #000 transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
  }
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
