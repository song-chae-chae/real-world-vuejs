<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="articleTitle"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="articleDescription"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="articleContent"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keyup.enter="enterTag"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill ng-binding ng-scope"
                    v-for="(value, index) in tagList"
                    :key="index"
                  >
                    <i class="ion-close-round" @click="removeTag(value)"></i>
                    {{ value }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publish"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createArticle, updateArticle, getArticle} from "@/api/article";
export default {
  data() {
    return {
      articleTitle: "",
      articleDescription: "",
      articleContent: "",
      tagList: [],
    };
  },
  methods: {
    enterTag(event) {
      this.tagList.push(event.target.value);
      event.target.value = null;
    },
    removeTag(tag) {
      this.tagList.splice(this.tagList.indexOf(tag), 1);
    },
    publish() {
      let articleData = {
        title: this.articleTitle,
        description: this.articleDescription,
        content: this.articleContent,
        tags: this.tagList,
      };

      if (this.$route.params.id != null) {
        this.editArticle(articleData);
      } else {
        this.createArticle(articleData);
      }
    },
    editArticle(articleData) {
      updateArticle(this.$route.params.id, articleData).then((result) => {
        this.$router.push({
          name: "articleDetail",
          params: {id: this.$route.params.id},
        });
      });
    },
    createArticle(articleData) {
      createArticle(articleData).then((result) => {
        this.$router.push({name: "articleDetail", params: {id: result.data}});
      });
    },
    publishArticle() {},
  },
  mounted() {
    if (this.$route.params.id != null) {
      getArticle(this.$route.params.id).then((result) => {
        const articleData = result.data;

        this.articleTitle = articleData.title;
        this.articleDescription = articleData.description;
        this.articleContent = articleData.content;
        this.tagList = articleData.tags;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.tag-list {
  text-align: left;
}
</style>
