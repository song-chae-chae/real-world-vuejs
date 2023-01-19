<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userInfo.image" class="user-img" />
            <h4>{{ userInfo.name }}</h4>
            <p>{{ userInfo.email }}</p>
            <div v-if="isReady">
              <div v-if="loginUser.id != userInfo.id">
                <follow-button
                  v-model="userInfo.following"
                  :id="userInfo.id"
                ></follow-button>
              </div>
              <div v-else>
                <router-link
                  class="btn btn-sm btn-outline-secondary action-btn"
                  to="/settings"
                  >Edit Profile Settings
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <div
                  class="nav-link"
                  :class="{active: isUserArticleActive}"
                  @click="getUserArticles"
                >
                  My Articles
                </div>
              </li>
              <li class="nav-item">
                <div
                  class="nav-link"
                  :class="{active: !isUserArticleActive}"
                  @click="getFavoriteArticles"
                >
                  Favorited Articles
                </div>
              </li>
            </ul>
          </div>
          <article-list
            :articleList="articleList"
            :totalCount="totalCount"
            v-model="activePage"
          ></article-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getProfile} from "@/api/profile";
import {getArticles} from "@/api/article";
import FollowButton from "@/components/modules/article/FollowButton.vue";
import ArticleList from "@/components/modules/article/ArticleList.vue";
export default {
  components: {FollowButton, ArticleList},
  data() {
    return {
      userInfo: {},
      isReady: false,
      articleData: {},
      articleList: [],
      articleSearchData: {size: 3},
      isUserArticleActive: true,
      totalCount: 0,
      activePage: 1,
      category: "feed",
    };
  },
  computed: {
    loginUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    getUserArticles() {
      this.category = "feed";
      this.isUserArticleActive = true;
      this.articleSearchData.page = this.activePage;
      this.articleSearchData.author = this.userInfo.id;
      getArticles(this.articleSearchData).then((result) => {
        this.articleList = result.data.articles;
        this.totalCount = result.data.totalCount;
      });
      this.articleSearchData.author = null;
    },
    getFavoriteArticles() {
      this.category = "favorite";
      this.isUserArticleActive = false;
      this.articleSearchData.page = this.activePage;
      this.articleSearchData.favorite = this.userInfo.id;
      getArticles(this.articleSearchData).then((result) => {
        this.articleList = result.data.articles;
        this.totalCount = result.data.totalCount;
      });
      this.articleSearchData.favorite = null;
    },
  },
  created() {
    getProfile(this.$route.params.id)
      .then((result) => {
        this.userInfo = result.data;
        console.log("tqlkf", this.userInfo);
        this.isReady = true;
        this.getUserArticles();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  watch: {
    $route(to, from) {
      getProfile(to.params.id).then((result) => {
        this.userInfo = result.data;
        this.getUserArticles();
      });
    },
    activePage(value) {
      if (this.category == "feed") {
        this.getUserArticles();
      } else {
        this.getFavoriteArticles();
      }
    },
  },
};
</script>

<style></style>
