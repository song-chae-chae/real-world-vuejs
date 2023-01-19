<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="userImage"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  disabled
                  v-model="userName"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="userEmail"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateUserInfo"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {getProfile} from "@/api/profile";
import {updateUser} from "@/api/user";
import Constant from "@/store/constant";
export default {
  data() {
    return {
      userImage: "",
      userEmail: "",
      userName: "",
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getCurrentUser;
    },
  },
  created() {
    this.userImage = this.userInfo.image;
    this.userEmail = this.userInfo.email;
    this.userName = this.userInfo.username;
  },
  methods: {
    updateUserInfo() {
      const updateUserData = {
        id: this.userInfo.id,
        email: this.userEmail,
        image: this.userImage,
      };

      updateUser(updateUserData).then((result) => {
        this.$store.dispatch(Constant.GET_USER);
      });
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.VUE_APP_KAKAO_CLIENT_KEY}&logout_redirect_uri=${process.env.VUE_APP_KAKAO_LOGOUT_REDIRECT_URI}`;
    },
  },
  watch: {
    userInfo(val) {
      this.userImage = val.image;
      this.userEmail = val.email;
      this.userName = val.username;
    },
  },
};
</script>

<style></style>
