<template>
  <div v-if="pagesCount > 1" class="c-pagination">
    <div class="c-pagination__back">
      <nuxt-link
        v-if="firstPage !== false"
        :to="pageConfig(firstPage)"
        class="c-pagination__link"
      >
        first
      </nuxt-link>
      <nuxt-link
        v-if="previousPage !== false"
        :to="pageConfig(previousPage)"
        class="c-pagination__link"
      >
        previous
      </nuxt-link>
    </div>
    <div class="c-pagination__numbered">
      <nuxt-link
        v-for="page in pageButtons"
        :key="page"
        :to="pageConfig(page)"
        :disable="page == currentPage"
        :class="{
          'c-pagination__link': true,
          'c-pagination__link--active': page == currentPage,
        }"
      >
        {{ page }}
      </nuxt-link>
    </div>
    <div class="c-pagination__forward">
      <nuxt-link
        v-if="nextPage !== false"
        :to="pageConfig(nextPage)"
        class="c-pagination__link"
      >
        next
      </nuxt-link>
      <nuxt-link
        v-if="lastPage !== false"
        :to="pageConfig(lastPage)"
        class="c-pagination__link"
      >
        last
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentPage() {
      return parseInt(this.$route.params.page);
    },
    pagesCount() {
      return this.$store.getters.pageCount;
    },
    amountOfButtons() {
      return Math.min(this.pagesCount, 5);
    },
    pageButtons() {
      const start = Math.min(
        Math.max(1, this.pagesCount - 4),
        Math.max(1, this.currentPage - 2)
      );
      const array = [];
      for (let i = start; i < start + this.amountOfButtons; i++) {
        array.push(i);
      }
      return array;
    },
    firstPage() {
      if (this.currentPage <= 2) return false;

      return 1;
    },
    previousPage() {
      if (this.currentPage === 1) return false;

      return this.currentPage - 1;
    },
    nextPage() {
      if (this.currentPage === this.pagesCount) return false;

      return this.currentPage + 1;
    },
    lastPage() {
      if (this.currentPage >= this.pagesCount - 1) return false;

      return this.pagesCount;
    },
  },
  methods: {
    pageConfig(newPageNumber) {
      return {
        path: '/characters/' + newPageNumber,
        query: this.$route.query,
      };
    },
  },
};
</script>

<style lang="scss">
.c-pagination {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid $purple;

  &__link {
    font-size: 1.8rem;
    padding: 0.5rem;

    &--active {
      color: $grey;
    }
  }
}
</style>
