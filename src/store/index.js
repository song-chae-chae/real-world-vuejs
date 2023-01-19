import {getUser} from "@/api/user";
import Vue from "vue";
import Vuex from "vuex";
import Constant from "./constant";

Vue.use(Vuex);

const initialState = {
  user: {},
};
export default new Vuex.Store({
  state: {
    ...initialState,
  },
  getters: {
    getCurrentUser: function (state) {
      return state.user;
    },
  },
  mutations: {
    [Constant.SET_USER]: (state, data) => {
      state.user = data;
    },
  },
  actions: {
    [Constant.GET_USER]: function () {
      return getUser().then((result) => {
        this.commit(Constant.SET_USER, result.data);
      });
    },
  },
  modules: {},
});
