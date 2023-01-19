<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ articleInfo.title }}</h1>
        <p class="description">
          {{ articleInfo.description }}
        </p>
        <div class="article-meta">
          <a href=""><img :src="articleInfo.author.image" /></a>
          <div class="info">
            <router-link :to="`/profile/${articleInfo.author.id}`">{{
              articleInfo.author.name
            }}</router-link>
            <span class="date">{{
              articleInfo.author.createdAt.split(" ")[0]
            }}</span>
          </div>
          <follow-button
            v-if="articleInfo.author.id != loginUser.id && isReady"
            :id="articleInfo.author.id"
            :value="articleInfo.author.following"
          ></follow-button>
          <favorite-button
            v-if="isReady"
            :id="articleInfo.id"
            :value="articleInfo.favorite"
            :count="articleInfo.favoritesCount"
          ></favorite-button>
          <div
            class="article-manage"
            v-if="articleInfo.author.id == loginUser.id"
          >
            <router-link
              :to="`/article/write/${articleInfo.id}`"
              class="btn btn-outline-secondary btn-sm"
            >
              <i class="ion-edit"></i> Edit Article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i> Delete Article
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p class="p-description"></p>
          <p class="p-content">{{ articleInfo.content }}</p>
          <tag-list :tagList="articleInfo.tags"></tag-list>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <div v-if="loginUser.id != null">
            <form class="card comment-form">
              <div class="card-block">
                <textarea
                  class="form-control"
                  placeholder="Write a comment..."
                  rows="3"
                  v-model="commentContent"
                ></textarea>
              </div>
              <div class="card-footer">
                <img :src="loginUser.image" class="comment-author-img" />
                <button class="btn btn-sm btn-primary" @click="postComment">
                  Post Comment
                </button>
              </div>
            </form>
          </div>
          <div v-else>
            <router-link to="/login">Sign Up / Sign In</router-link>을 클릭해
            로그인 후 코멘트를 남겨보세요.
          </div>

          <div v-for="(value, index) in commentList" :key="index">
            <div class="card">
              <div class="card-block">
                <p class="card-text">
                  {{ value.content }}
                </p>
                <div v-if="openCommentEditor && editCommentId == value.id">
                  <textarea
                    class="form-control"
                    placeholder="Write a comment..."
                    rows="3"
                    v-model="editCommentContent"
                  ></textarea>
                  <div class="card-footer">
                    <img :src="loginUser.image" class="comment-author-img" />
                    <button
                      class="btn btn-sm btn-primary"
                      @click="edit(value.content)"
                    >
                      Edit Comment
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <a href="" class="comment-author">
                  <img :src="value.author.image" class="comment-author-img" />
                </a>
                &nbsp;
                <router-link :to="`/profile/${value.author.id}`"></router-link>
                <a href="" class="comment-author">{{ value.author.name }}</a>
                <span class="date-posted">{{
                  value.author.createdAt.split(" ")[0]
                }}</span>
                <span
                  class="mod-options"
                  v-if="loginUser.id == value.author.id"
                >
                  <i
                    class="ion-edit"
                    @click="editComment(value.id, value.content)"
                  ></i>
                  <i class="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticle,
  getComments,
  createComment,
  updateComment,
  deleteArticle,
} from "@/api/article";
import FollowButton from "@/components/modules/article/FollowButton.vue";
import FavoriteButton from "@/components/modules/article/FavoriteButton.vue";
import TagList from "@/components/modules/article/TagList.vue";
export default {
  components: {
    FollowButton,
    FavoriteButton,
    TagList,
  },
  data() {
    return {
      articleInfo: {},
      commentList: [],
      isReady: false,
      isFollowed: false,
      commentContent: "",
      openCommentEditor: false,
      editCommentId: 0,
      editCommentContent: "",
    };
  },
  computed: {
    loginUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    postComment() {
      let createCommentData = {
        content: this.commentContent,
      };
      createComment(this.articleInfo.id, createCommentData)
        .then((result) => {
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCommentList() {
      getComments(this.$route.params.id)
        .then((result) => {
          this.commentList = result.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editComment(commentId, content) {
      this.editCommentId = commentId;
      this.editCommentContent = content;
      this.openCommentEditor = !this.openCommentEditor;
    },
    edit() {
      let editCommentData = {
        content: this.editCommentContent,
      };
      updateComment(this.articleInfo.id, this.editCommentId, editCommentData)
        .then((result) => {
          this.openCommentEditor = false;
          this.getCommentList();
        })
        .catch((error) => {
          console.log("edit error", error);
        });
    },
    deleteArticle() {
      deleteArticle(this.articleInfo.id)
        .then((result) => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    getArticle(this.$route.params.id).then((result) => {
      this.articleInfo = result.data;
      this.isFollowed = this.articleInfo.following;
      this.isReady = true;
    });
    this.getCommentList();
  },

  watch: {
    isFollowed(value) {
      getArticle(this.articleInfo.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.description {
  margin-top: 1rem;
  color: lightgrey;
  font-size: 14px !important;
}
.card-footer {
  text-align: left;
}
.article-content {
  text-align: left;
}
.article-manage {
  display: inline;
}
.p-content {
  white-space: pre-line;
}
</style>
