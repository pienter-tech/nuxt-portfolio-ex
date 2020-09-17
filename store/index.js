export const state = () => ({
  characters: [],
});

export const mutations = {
  setCharacters(state, characters) {
    state.characters = characters;
  },
};

export const actions = {
  async getCharacters({ commit }) {
    try {
      const characters = await this.$axios.$get(
        'https://swapi.dev/api/people/'
      );
      commit('setCharacters', characters.results);
    } catch (error) {
      console.error(error);
    }
  },
};
