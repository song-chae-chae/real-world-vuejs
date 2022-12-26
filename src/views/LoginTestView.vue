<template>
  <div>
    <div>{{ code }}</div>
    <div>정보</div>
    <div>{{ json }}</div>
    <button @click="doLogout()">로그아웃</button>
  </div>
</template>

<script>
import {doSocialLogin} from "../api/index";
export default {
  data() {
    return {
      code: "",
      json: "",
    };
  },
  created() {
    this.code = this.$route.query.code;
    doSocialLogin(this.code).then((result) => {
      this.json = result.data;
    });
  },
  methods: {
    doLogout() {
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.VUE_APP_KAKAO_CLIENT_KEY}&logout_redirect_uri=${process.env.VUE_APP_KAKAO_LOGOUT_REDIRECT_URI}`;
    },
  },
};
</script>

<style></style>
