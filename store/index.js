export const state = () => ({
  totalCharacters: 0,
  fetchingCharacters: false,
  characters: [],
  limit: 20,
});

export const getters = {
  pageCount(state) {
    return Math.ceil(state.totalCharacters / state.limit);
  },
};

export const mutations = {
  SET_CHARACTERS(state, characters) {
    state.characters = characters;
  },
  SET_TOTAL_CHARACTERS(state, totalCharacters) {
    state.totalCharacters = totalCharacters;
  },
  START_FETCHING_CHARACTERS(state) {
    state.fetchingCharacters = true;
  },
  FINISH_FETCHING_CHARACTERS(state) {
    state.fetchingCharacters = false;
  },
};

export const actions = {
  async fetchCharacters({ commit, state }, { page, filters }) {
    const params = {
      apikey: '73d1f9264e33cfeed75510d126300b53',
      limit: 20,
      offset: 20 * (page - 1),
    };

    if (filters['character-name']) {
      params.nameStartsWith = filters['character-name'];
    }

    commit('START_FETCHING_CHARACTERS');

    try {
      const characters = await this.$axios({
        method: 'GET',
        url: 'https://gateway.marvel.com:443/v1/public/characters',
        params,
      });

      commit('SET_CHARACTERS', characters.data.data.results);
      commit('SET_TOTAL_CHARACTERS', characters.data.data.total);
    } catch (error) {
      console.error(error);
    }

    commit('FINISH_FETCHING_CHARACTERS');
  },
};
