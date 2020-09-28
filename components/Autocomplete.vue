<template>
  <div class="c-autocomplete">
    <label class="c-autocomplete__label" for="comic-search">{{ name }}: </label>
    <input
      id="comic-search"
      v-model="label"
      class="c-autocomplete__input"
      type="text"
      @keyup="manualChange"
    />
    <div
      :class="{
        'c-autocomplete__option-container': true,
        'c-autocomplete__option-container--empty':
          !labelChanged && options.length === 0,
        'c-autocomplete__option-container--loading': labelChanged,
      }"
    >
      <button
        v-for="option in optionList"
        :key="'comic_option_' + option.value"
        class="c-autocomplete__option"
        type="button"
        @click.prevent="selectOption(option.label, option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Autocomplete',
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      value: null,
      label: '',
      timeout: null,
      labelChanged: false,
    };
  },
  computed: {
    optionList() {
      return this.options;
    },
  },
  watch: {
    loading(val) {
      if (!val) {
        this.labelChanged = false;
      }
    },
  },
  methods: {
    manualChange() {
      clearTimeout(this.timeout);
      this.labelChanged = true;
      this.value = null;
      this.timeout = setTimeout(this.emitChange, 1000);
    },
    selectOption(label, value) {
      this.label = label;
      this.value = value;
      this.options = [];
      this.$emit('select', this.value);
    },
    emitChange() {
      if (this.label.length === 0) {
        this.options = [];
        this.labelChanged = false;
        return;
      }
      this.$emit('change', this.label);
    },
  },
};
</script>

<style lang="scss">
.c-autocomplete {
  position: relative;
  &__label {
  }

  &__input {
    margin-bottom: 0;
  }

  &__option {
    &-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      z-index: 1;
      border: 1px solid $grey;

      &--empty {
        border: none;
      }

      &--loading {
        min-height: 6rem;
        @extend %loading;
      }
    }

    background-color: white;
    border-top: 1px solid $grey;
    border-radius: 0;
    margin-bottom: 0;
    color: black;

    &:first-child {
      border-top: none;
    }
  }
}
</style>
