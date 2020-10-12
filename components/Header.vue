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
    <div>
      <button ref="hamburger" class="c-header__nav-hamburger">
        <span></span><span></span><span></span>
      </button>
      <nav
        :class="{ 'c-header__nav': true, 'c-header__nav--open': hamburgerOpen }"
      >
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
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      hamburgerOpen: false,
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
      if (this.hamburgerOpen) {
        return true;
      }

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
    document.addEventListener('click', this.toggleHamburger);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.checkScroll);
    document.removeEventListener('click', this.toggleHamburger);
  },
  methods: {
    toggleHamburger(event) {
      if (this.$refs.hamburger && this.$refs.hamburger.contains(event.target)) {
        this.hamburgerOpen = !this.hamburgerOpen;
      } else if (this.hamburgerOpen) {
        this.hamburgerOpen = false;
      }
    },
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
  box-shadow: $box-shadow;

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

    @include s() {
      display: none;
    }

    &--open {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 0;
      right: 0;
      background-color: #fff;
      box-shadow: $box-shadow;

      .c-header__nav-item--has-submenu {
        & > a {
          padding-right: 2rem;
        }
        &:hover {
          background-color: transparent;
          & > a {
            color: $red;

            &:after {
              border-top-color: $red;
              transform: unset;
            }
          }
        }
      }
      .c-header__nav-sub {
        position: static;
        transform: scaleY(1);
        box-shadow: none;
        background-color: rgba($red, 0.1);

        a {
          font-size: 1.4rem;
        }
      }
    }

    &-hamburger {
      display: none;
      height: $header-height;
      width: $header-height;
      background-color: transparent;
      border-radius: 0;
      border: none;
      padding: 1.2rem;
      margin: 0;
      flex-direction: column;
      justify-content: space-around;

      @include s() {
        display: flex;
      }

      &:hover,
      &:focus {
        background-color: $red;

        span {
          background-color: #fff;
        }
      }

      span {
        background-color: $red;
        width: 100%;
        height: 0.2rem;
        border-radius: 0.1rem;
      }
    }

    &-sub {
      transform-origin: top;
      transform: scaleY(0);
      position: absolute;
      top: 100%;
      background-color: #fff;
      box-shadow: $box-shadow;
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
