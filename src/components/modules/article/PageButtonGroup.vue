<template>
  <div class="ng-isolate-scope">
    <nav>
      <ul class="pagination">
        <li class="page-item ng-scope">
          <div class="page-link ng-binding" @click="previousPage">&lt;</div>
        </li>
        <li
          class="page-item ng-scope"
          :class="{active: activePage == value}"
          v-for="(value, index) in pageGroup"
          :key="index"
        >
          <div class="page-link ng-binding" @click="changePage(value)">
            {{ value }}
          </div>
        </li>
        <li class="page-item ng-scope">
          <div class="page-link ng-binding" @click="nextPage">&gt;</div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    startPage: {
      type: Number,
      default: 1,
    },
    pageButtonNum: {
      type: Number,
      default: 5,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 10,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      activePage: 1,
      pageNum: 0,
      start: 0,
      pageGroup: [],
    };
  },
  methods: {
    changePage(page) {
      this.activePage = page;
      this.$emit("input", page);
      console.log("Adg", this.activePage);
    },
    previousPage() {
      if (this.start > 1) {
        this.start -= this.pageButtonNum;
      }
      this.getPageGroup();
      this.changePage(this.pageGroup[0]);
    },
    nextPage() {
      if (this.start + this.pageButtonNum <= this.totalPage) {
        this.start += this.pageButtonNum;
      }
      this.getPageGroup();
      this.changePage(this.pageGroup[0]);
    },
    getPageGroup() {
      let pageGroup = [];
      for (let i = 0; i < this.pageButtonNum; i++) {
        if (this.start + i > this.totalPage) {
          break;
        }
        pageGroup.push(this.start + i);
      }
      this.pageGroup = pageGroup;
      console.log(">>", this.totalCount, "pageGroup", this.pageGroup);
    },
    setInitialPageGroup() {
      this.start = this.startPage;
      this.totalPage = Math.ceil(this.totalCount / this.size);
      this.getPageGroup();
    },
  },
  created() {
    this.activePage = this.value;
    this.setInitialPageGroup();
  },
  watch: {
    totalCount(value) {
      this.setInitialPageGroup();
      this.changePage(1);
    },

    value(value) {
      this.activePage = value;
      this.start =
        this.pageButtonNum * parseInt(this.activePage / this.pageButtonNum) + 1;
      this.getPageGroup();
    },
  },
};
</script>

<style></style>
