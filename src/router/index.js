import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/main/HomeView.vue";

Vue.use(VueRouter);

const getPreviousUrl = () => (to, from, next) => {
  if (to.query.requireAuth != undefined) {
    to.query.previous = to.query.requireAuth;
  } else {
    to.query.previous = from.fullPath;
  }
  return next(to.query);
};

const requireAuth = () => (to, from, next) => {
  if (localStorage.token != null || localStorage.token != undefined) {
    return next();
  }
  return next({path: "/login", query: {requireAuth: to.fullPath}});
};

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
    beforeEnter: getPreviousUrl(),
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
        path: "detail/:id",
        name: "articleDetail",
        component: () => import("../views/article/ArticleDetailView.vue"),
      },
      {
        path: "write/:id?",
        name: "articleWrite",
        component: () => import("../views/article/ArticleWriteView.vue"),
        beforeEnter: requireAuth(),
      },
    ],
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/settings/SettingView.vue"),
    beforeEnter: requireAuth(),
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
