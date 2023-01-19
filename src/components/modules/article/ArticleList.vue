<template>
  <div class="">
    <div v-for="(value, index) in articleList" :key="index">
      <div class="article-preview">
        <div class="article-meta">
          <router-link :to="`/profile/${value.author.id}`">
            <img :src="value.author.image" />
            <div class="info">
              <span class="author">{{ value.author.name }}</span>
              <span class="date">{{
                value.author.createdAt.split(" ")[0]
              }}</span>
            </div>
          </router-link>
          <favorite-button
            :id="value.id"
            :value="value.favorite"
            :count="value.favoritesCount"
          ></favorite-button>
        </div>
        <router-link :to="`/article/detail/${value.id}`" class="preview-link">
          <h1>{{ value.title }}</h1>
          <p>{{ value.description }}</p>
          <span>Read more...</span>
        </router-link>
        <tag-list :tagList="value.tags"></tag-list>
      </div>
    </div>
    <page-button-group
      v-model="activePage"
      :totalCount="totalCount"
      :size="3"
    ></page-button-group>
  </div>
</template>

<script>
import FavoriteButton from "@/components/modules/article/FavoriteButton.vue";
import PageButtonGroup from "./PageButtonGroup.vue";
import TagList from "./TagList.vue";
export default {
  components: {
    FavoriteButton,
    PageButtonGroup,
    TagList,
  },
  data() {
    return {
      activePage: 1,
    };
  },
  props: {
    articleList: {
      type: Array,
      default: () => [],
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  created() {
    this.activePage = this.value;
  },
  watch: {
    activePage(value) {
      this.$emit("input", value);
    },
    value(value) {
      console.log("바귐");
      this.activePage = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.article-preview {
  text-align: left;
}
.tag-list {
  float: right;
}
</style>
