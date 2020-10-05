<template>
  <div ref="c-autocomplete" class="c-autocomplete">
    <label class="c-autocomplete__label" for="comic-search">{{ name }}: </label>
    <input aria-label="comic id" :name="name" type="hidden" :value="curValue" />
    <input
      id="comic-search"
      v-model="label"
      :name="name + '-label'"
      class="c-autocomplete__input"
      :disabled="isDisabled"
      type="text"
      @blur="blur"
      @keyup="manualChange"
    />
    <div class="c-autocomplete__batch-container">
      <button class="c-autocomplete__batch">Spiderman</button>
    </div>
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
        @keyup.enter="selectOption(option.label, option.value)"
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
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: null,
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
    initLabel: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      label: '',
      timeout: null,
      labelChanged: false,
    };
  },
  computed: {
    optionList() {
      return this.options;
    },
    curValue() {
      return this.value;
    },
    isDisabled() {
      return this.disabled;
    },
  },
  watch: {
    loading(val) {
      if (!val) {
        this.labelChanged = false;
      }
    },
    initLabel: {
      immediate: true,
      handler(label) {
        if (label) {
          this.label = label;
        }
      },
    },
  },
  methods: {
    manualChange() {
      clearTimeout(this.timeout);
      this.labelChanged = true;

      this.$emit('select', null);
      this.timeout = setTimeout(this.emitChange, 1000);
    },
    blur(event) {
      if (this.$refs['c-autocomplete'].contains(event.relatedTarget)) {
        return;
      }

      this.$emit('select', null);
    },
    selectOption(label, value) {
      this.label = label;
      this.$emit('select', value);
    },
    emitChange() {
      if (this.label.length === 0) {
        this.labelChanged = false;
        this.$emit('select', null);
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
    &:disabled {
      background-color: lighten($grey, 50%);
    }
  }

  &__batch {
    &-container {
      padding-top: 1rem;
      display: flex;
      flex-wrap: wrap;
    }

    position: relative;
    height: auto;
    line-height: 1;
    border-radius: 1.3rem;
    padding: 0.7rem 2.5rem 0.7rem 1.3rem;
    font-size: 1.2rem;

    $crossWidth: 0.2rem;
    $crossHeight: 1rem;
    $crossColor: white;
    $crossPosRight: 1.2rem;
    $crossPosTop: 50%;

    &:before {
      content: '';
      display: block;
      position: absolute;
      background-color: $crossColor;
      width: $crossWidth;
      height: $crossHeight;
      right: $crossPosRight;
      top: calc(#{$crossPosTop} - #{$crossHeight/2});
      transform: rotate(45deg);
      transform-origin: center center;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      background-color: $crossColor;
      width: $crossWidth;
      height: $crossHeight;
      right: $crossPosRight;
      top: calc(#{$crossPosTop} - #{$crossHeight/2});
      transform: rotate(-45deg);
      transform-origin: center center;
    }
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
