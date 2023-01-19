<template>
  <div></div>
</template>

<script>
import {loginUser} from "@/api/user";
import Constant from "@/store/constant";
export default {
  data() {
    return {
      code: "",
    };
  },
  created() {
    this.code = this.$route.query.code;

    if (this.code != null) {
      loginUser(this.code)
        .then((result) => {
          localStorage.token = result.data.token;
          localStorage.refreshToken = result.data.refreshToken;

          this.get();
          this.$router.push(this.$route.query.state);
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  },
  methods: {
    get() {
      this.$store.dispatch(Constant.GET_USER);
    },
  },
};
</script>

<style></style>
