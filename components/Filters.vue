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
      <Autocomplete
        name="Comics"
        :loading="fetchingComics"
        :options="comicOptions"
        @change="searchComics"
        @select="updateComicId"
      />
    </div>
    <div class="c-filters__toggle">
      <button class="button button-clear" @click="toggleShow">
        {{ show ? 'Hide filters' : 'Show filters' }}
      </button>
    </div>
  </div>
</template>

<script>
import Autocomplete from '~/components/Autocomplete';

export default {
  name: 'Filters',
  components: {
    Autocomplete,
  },
  data() {
    return {
      characterName: this.$route.query['character-name']
        ? this.$route.query['character-name']
        : '',
      nameTimeout: null,
      comicId: null,
      comicOptions: [],
      fetchingComics: false,
      show: true,
    };
  },
  computed: {
    filterObject() {
      const query = {};

      if (this.characterName) {
        query['character-name'] = this.characterName;
      }

      if (this.comicId) {
        query['comic-id'] = this.comicId;
      }

      return query;
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
    async searchComics(comicTitle) {
      if (comicTitle.length === 0) {
        return;
      }

      const params = {
        apikey: this.$store.state.apiKey,
        limit: 10,
        titleStartsWith: comicTitle,
      };

      try {
        this.fetchingComics = true;
        const response = await this.$axios({
          method: 'GET',
          url: 'https://gateway.marvel.com:443/v1/public/comics',
          params,
        });

        this.comicOptions = response.data.data.results.map(function (comic) {
          return {
            value: comic.id,
            label: comic.title,
          };
        });
      } catch (error) {
        console.error(error);
      }
      this.fetchingComics = false;
    },
    updateComicId(comicId) {
      this.comicId = comicId;
      this.updateQuery();
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
