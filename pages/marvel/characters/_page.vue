'
<template>
  <main class="p-characters-list">
    <h1>Characters</h1>
    <Filters />
    <div>
      <button @click="toggleSort">Sort</button>
    </div>
    <Pagination root-path="/marvel/characters/" />
    <CharacterList :characters="sortedCharacters" />
    <Pagination root-path="/marvel/characters/" />
  </main>
</template>

<script>
import CharacterList from '~/components/CharacterList';
import Pagination from '~/components/Pagination';
import Filters from '~/components/Filters';

export default {
  name: 'CharactersPage',
  components: {
    CharacterList,
    Pagination,
    Filters,
  },
  data() {
    return {
      sortAsc: true,
    };
  },
  computed: {
    fetchingCharacters() {
      return this.$store.state.fetchingCharacters;
    },
    characters() {
      return this.$store.state.characters;
    },
    sortedCharacters() {
      if (this.sortAsc) {
        return this.characters;
      }
      const tempCharacters = JSON.parse(JSON.stringify(this.characters));
      return tempCharacters.reverse();
    },
    currentPage() {
      return parseInt(this.$route.params.page);
    },
    filters() {
      return {
        page: this.currentPage,
        filters: this.$route.query,
      };
    },
  },
  methods: {
    toggleSort() {
      this.sortAsc = !this.sortAsc;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.$store.dispatch('fetchCharacters', this.filters);
      },
    },
  },
};
</script>

<style lang="scss">
.p-characters-list {
  display: grid;
  gap: 2rem;

  h1 {
    margin: 0;
  }
}
</style>
