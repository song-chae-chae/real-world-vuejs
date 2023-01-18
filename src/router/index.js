import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/main/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/LoginView.vue"),
    children: [],
  },
  {
    path: "/login/detail",
    name: "loginDetail",
    component: () => import("../views/login/LoginDetailView.vue"),
  },
  {
    path: "/article",
    name: "article",
    component: () => import("../views/article/ArticleView.vue"),
    children: [
      {
        path: "",
        name: "articleList",
        component: () => import("../views/article/ArticleListView.vue"),
      },
      {
        path: "detail/:id",
        name: "articleDetail",
        component: () => import("../views/article/ArticleDetailView.vue"),
      },
      {
        path: "write/:id?",
        name: "articleWrite",
        component: () => import("../views/article/ArticleWriteView.vue"),
      },
    ],
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/settings/SettingView.vue"),
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: () => import("../views/profile/ProfileView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
