<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up / Sign in</h1>
          <div class="login-btn" @click="login">
            <img src="@/assets/images/login_button.png" alt="login_button" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      let previousUrl = this.$route.query.previous;
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.VUE_APP_KAKAO_CLIENT_KEY}&redirect_uri=${process.env.VUE_APP_KAKAO_LOGIN_REDIRECT_URI}&response_type=code&state=${previousUrl}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.login-btn {
  margin-top: 60px;
}
</style>
