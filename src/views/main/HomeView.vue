<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" @click="getArticleList('feed')">
                <div :class="['nav-link', category == 'feed' ? 'active' : '']">
                  Your Feed
                </div>
              </li>
              <li class="nav-item" @click="getArticleList('global')">
                <div
                  :class="['nav-link', category == 'global' ? 'active' : '']"
                >
                  Global Feed
                </div>
              </li>
              <li class="nav-item" v-if="category == 'tag'">
                <div :class="['nav-link', category == 'tag' ? 'active' : '']">
                  #{{ searchTag }}
                </div>
              </li>
            </ul>
          </div>
          <article-list
            v-if="isReady"
            :articleList="articleList"
            :totalCount="totalArticleCount"
            v-model="activePage"
          ></article-list>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <div
                class="tag-pill tag-default"
                @click="searchByTag(value)"
                v-for="(value, index) in tagList"
                :key="index"
              >
                {{ value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getArticles, getFeed} from "@/api/article";
import {getTags} from "@/api/tag";
import ArticleList from "@/components/modules/article/ArticleList.vue";
export default {
  components: {ArticleList},
  data() {
    return {
      searchTag: "",
      category: "feed",
      articleList: [],
      totalArticleCount: 0,
      tagList: [],
      activePage: 1,
      size: 3,
      isReady: false,
    };
  },
  computed: {
    loginUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    getArticleList(category) {
      if (category == "feed") {
        this.activePage = this.category != "feed" ? 1 : this.activePage;
        this.category = "feed";
        this.getMyFeed();
      } else if (category == "global") {
        this.activePage = this.category != "global" ? 1 : this.activePage;
        this.category = "global";
        this.getGlobalFeed();
      } else {
        this.category = "tag";
      }
    },
    getMyFeed() {
      let articleSearchData = {
        size: this.size,
        page: this.activePage,
      };
      getFeed(articleSearchData)
        .then((result) => {
          this.articleList = result.data.articles;
          this.totalArticleCount = result.data.totalCount;
          this.isReady = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGlobalFeed() {
      let articleSearchData = {
        size: this.size,
        page: this.activePage,
      };
      getArticles(articleSearchData)
        .then((result) => {
          this.articleList = result.data.articles;
          this.totalArticleCount = result.data.totalCount;
          this.isReady = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTags() {
      getTags()
        .then((result) => {
          this.tagList = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchByTag(tagName) {
      this.searchTag = tagName;

      if (this.category != "tag") {
        this.category = "tag";
        this.activePage = 1;
      }

      let articleSearchData = {
        size: this.size,
        page: this.activePage,
        tag: tagName,
      };
      getArticles(articleSearchData).then((result) => {
        this.articleList = result.data.articles;
        this.totalArticleCount = result.data.totalCount;
        this.isReady = true;
      });
    },
  },
  created() {
    if (this.loginUser.id != null) {
      this.getMyFeed();
    }
    this.getTags();
  },
  watch: {
    activePage(value) {
      this.getArticleList(this.category);
    },
    loginUser(value) {
      if (value.id != null) {
        this.getMyFeed();
      }
    },
  },
};
</script>

<style></style>
