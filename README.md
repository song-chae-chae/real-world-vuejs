# real-world-vuejs

리얼 월드 프론트 코드를 위한 저장소

## 개발 환경

- vue2
- vue-router
- vuex
- axios

---

## Real World demo

- https://demo.realworld.io/#/

---

## Real World 구조

## ![realworld](https://user-images.githubusercontent.com/113492037/215315343-828c38e5-9445-4a31-9c4d-725e9893f827.png)

## 주요 구현

- axios interceptor

  - Http 요청, 응답마다 직접 헤더에 토큰을 추가하지 않고 Axios interceptor를 이용해서 공통된 동작을 한번에 정의한다.
  - 요청할 때는 헤더에 토큰을 추가해주고, 응답 헤더에 토큰이 있는 경우는 재발급이라고 간주하고 localStorage에 토큰을 재설정해준다.

  ```javascript
  function setInterceptors(instance) {
    instance.interceptors.request.use(
      function (config) {
        if (localStorage.token != null || localStorage.token != undefined) {
          config.headers.Authorization = localStorage.token;
          config.headers.Refresh = localStorage.refreshToken;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      function (response) {
        if (
          response.Authorization != null ||
          response.Authorization != undefined
        ) {
          localStorage.token = response.Authorization;
          localStorage.refreshToken = response.Refresh;
        }
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    return instance;
  }

  export {setInterceptors};
  ```

- vue-router Navigation Guard
  _ 인증이 필요한 페이지에 권한이 있는 사용자만 접근할 수 있도록 Navigation guard를 사용했다.
  _ BeforeEnter API를 사용하여 route 진입 전에 토큰으로 인증 여부를 판단하고, 인증이 되어 있지 않으면 로그인 후 다시 진입할 수 있도록 한다.

  ```javascript
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
      path: "/login",
      name: "login",
      component: () => import("../views/login/LoginView.vue"),
      children: [],
      beforeEnter: getPreviousUrl(),
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
  ];

  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

  export default router;
  ```

- article list module
  - 글 목록, 페이지네이션 버튼 그룹 모듈화
  - 글 목록 필터 변경되더라도 화면 새로고침 없이 글 목록과 페이지네이션 버튼 그룹만 변경되도록 `watch` 활용
  - 구조
    ![realworld front page structure](https://user-images.githubusercontent.com/113492037/215321977-764d41d3-fcfc-4e8c-92a5-abecce9566bc.png)
