<template>
  <div
    :class="{
      'c-filters': true,
    }"
  >
    <div v-if="show" class="c-filters__content">
      <div class="c-filters__name">
        <label>
          Name:
          <input v-model="characterName" type="text" />
        </label>
      </div>
    </div>
    <div class="c-filters__toggle">
      <button class="button button-clear" @click="toggleShow">
        {{ show ? 'Hide filters' : 'Show filters' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  data() {
    return {
      characterName: this.$route.query['character-name']
        ? this.$route.query['character-name']
        : '',
      nameTimeout: null,
      show: false,
    };
  },
  computed: {
    filterObject() {
      return {
        'character-name': this.characterName,
      };
    },
  },
  watch: {
    characterName() {
      clearTimeout(this.nameTimeout);
      this.nameTimeout = setTimeout(this.updateQuery, 1000);
    },
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    updateQuery() {
      const newQuery = Object.assign({}, this.$route.query, this.filterObject);

      console.log(newQuery);

      this.$router.push({
        path: '/characters/1',
        query: newQuery,
      });
    },
  },
};
</script>

<style lang="scss">
.c-filters {
  padding: 1rem;
  border: 1px solid $purple;
  &__toggle {
    text-align: center;
    button {
      margin-bottom: 0;
    }
  }
}
</style>
