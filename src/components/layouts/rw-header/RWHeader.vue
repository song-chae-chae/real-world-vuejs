<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/article/write">
            New Article
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/settings">Settings</router-link>
        </li>
        <li class="nav-item">
          <div v-if="!isLogin">
            <router-link class="nav-link" to="/login">
              Sign Up / Sign In
            </router-link>
          </div>
          <div v-else>
            <router-link class="nav-link" :to="`/profile/${userInfo.id}`">{{
              userInfo.username
            }}</router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Constant from "@/store/constant";
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getCurrentUser;
    },
  },
  mounted() {
    if (this.checkLogin()) {
      this.setUser();
      return;
    }

    this.isLogin = false;
  },
  methods: {
    checkLogin() {
      return localStorage.token != null && localStorage.refreshToken != null;
    },
    async setUser() {
      if (Object.keys(this.userInfo).length == 0) {
        await this.$store.dispatch(Constant.GET_USER);
      }
      this.isLogin = true;
    },
  },
  watch: {
    userInfo(val) {
      if (Object.keys(val).length > 0) {
        this.isLogin = true;
      }
    },
  },
};
</script>

<style lang="scss">
.router-link-exact-active {
  color: rgba(0, 0, 0) !important;
}
.navbar-brand {
  font-family: titillium web, sans-serif;
  font-size: 1.5rem !important;
  padding-top: 0 !important;
  margin-right: 2rem !important;
  color: #5cb85c !important;
}
</style>
