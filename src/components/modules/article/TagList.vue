<template>
  <ul class="tag-list">
    <li
      class="tag-default tag-pill tag-outline"
      v-for="(value, index) in tagList"
      :key="index"
    >
      {{ value }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tagList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
