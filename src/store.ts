import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl : "https://xuntasb2dc.execute-api.us-east-1.amazonaws.com/api/",
    token: "",
  },
  mutations: {
    storeToken(state,data){
      state.token = data
    },
  },
  actions: {

  },
});
