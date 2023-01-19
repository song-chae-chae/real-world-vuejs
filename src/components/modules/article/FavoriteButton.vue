<template>
  <button
    class="btn btn-outline-primary btn-sm pull-xs-right"
    @click="favoriteArticle"
  >
    <i class="ion-heart"></i> {{ favoriteCount }}
  </button>
</template>

<script>
import {createFavorite, deleteFavorite} from "@/api/article";
export default {
  props: {
    value: {
      type: Boolean,
    },
    id: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
    },
  },
  data() {
    return {
      favoriteCount: 0,
      isFavorited: false,
    };
  },
  methods: {
    favoriteArticle() {
      if (this.isFavorited) {
        deleteFavorite(this.id).then((result) => {
          this.isFavorited = false;
          this.$emit("input", --this.favoriteCount);
        });
      } else {
        createFavorite(this.id).then((result) => {
          this.isFavorited = true;
          this.$emit("input", ++this.favoriteCount);
        });
      }
    },
  },
  created() {
    this.favoriteCount = this.count;
    this.isFavorited = this.value;
  },
};
</script>

<style></style>
