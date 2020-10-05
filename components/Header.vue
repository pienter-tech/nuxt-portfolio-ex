<template>
  <header
    :class="{
      'c-header': true,
      'c-header--fixed': headerFixed,
      'c-header--shown': headerShown,
      'c-header--animate': animate,
    }"
  >
    <div class="c-header__logo">
      <img src="~/assets/images/marvel.jpg" alt="logo" />
    </div>
    <nav class="c-header__nav">
      <div
        v-for="navItem in navItems"
        :key="'nav_' + navItem.label"
        :class="{
          'c-header__nav-item': true,
          'c-header__nav-item--active': $route.path === navItem.path,
          'c-header__nav-item--has-submenu': navItem.subMenu.length,
        }"
      >
        <nuxt-link :to="navItem.path">
          {{ navItem.label }}
        </nuxt-link>
        <div v-if="navItem.subMenu.length" class="c-header__nav-sub">
          <div
            v-for="subNavItem in navItem.subMenu"
            :key="'subnav_' + subNavItem.label"
            :class="{
              'c-header__nav-item': true,
              'c-header__nav-item--active': $route.path === navItem.path,
            }"
          >
            <nuxt-link :to="subNavItem.path">
              {{ subNavItem.label }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      previousScrollY: 0,
      scrollDirectionChangePoss: 0,
      goingUp: false,
      navItems: [
        {
          label: 'home',
          path: '/',
          subMenu: [],
        },
        {
          label: 'about',
          path: '/about/',
          subMenu: [],
        },
        {
          label: 'marvel',
          path: '/marvel/',
          subMenu: [
            {
              label: 'characters',
              path: '/marvel/characters/1',
            },
            {
              label: 'comics',
              path: '/marvel/comics/1',
            },
            {
              label: 'stories',
              path: '/marvel/stories/1',
            },
          ],
        },
        {
          label: 'contact',
          path: '/contact/',
          subMenu: [],
        },
      ],
    };
  },
  computed: {
    headerFixed() {
      if (this.goingUp) {
        return this.previousScrollY > 0;
      }
      return this.previousScrollY >= 50;
    },

    headerShown() {
      if (this.goingUp) {
        return this.scrollDirectionChangePoss - this.previousScrollY > 75;
      }

      return false;
    },

    animate() {
      return this.previousScrollY >= 100 || this.goingUp;
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.checkScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkScroll);
  },
  methods: {
    checkScroll() {
      const goingUp = this.previousScrollY > window.scrollY;

      if (this.goingUp !== goingUp) {
        this.scrollDirectionChangePoss = window.scrollY;
        this.goingUp = goingUp;
      }

      this.previousScrollY = window.scrollY;
    },
  },
};
</script>

<style lang="scss">
.c-header {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 1;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &--fixed {
    position: fixed;
    top: -$header-height;
  }

  &--animate {
    transition: top 300ms linear;
  }

  &--shown {
    top: 0;
  }

  &__logo {
    img {
      height: $header-height;
      display: block;
    }
  }

  &__nav {
    position: relative;
    display: flex;

    &-sub {
      transform-origin: top;
      transform: scaleY(0);
      position: absolute;
      top: 100%;
      background-color: #fff;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      transition: transform 100ms ease-in-out;
    }

    &-item {
      transition: background-color 200ms linear;
      & > a {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: $header-height;
        box-sizing: border-box;
        padding: 1rem 2rem;
        font-size: 1.6rem;
        color: $red;
        text-transform: uppercase;
        font-weight: bold;
        transition: color 200ms linear;
      }

      &--has-submenu {
        & > a {
          padding-right: 4rem;

          &:after {
            display: block;
            content: '';
            height: 0;
            width: 0;
            position: absolute;
            right: 1.5rem;
            top: 50%;
            margin-top: -0.5rem;
            border-left: 0.65rem solid transparent;
            border-right: 0.65rem solid transparent;
            border-top: 1rem solid $red;
            transition: border-top-color 400ms linear,
              transform 200ms ease-in-out;
          }
        }
      }

      &:last-child {
        .c-header__nav-sub {
          right: 0;
        }
      }

      &--active,
      &:hover {
        background-color: $red;
        & > a {
          color: #fff;
          &:after {
            border-top-color: #fff;
            transform: rotate(180deg);
          }
        }
      }

      &:hover {
        .c-header__nav-sub {
          transform: scaleY(1);
        }
      }
    }
  }
}
</style>
