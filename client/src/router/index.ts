import { createRouter, createWebHistory } from "vue-router";
import Cookie from "js-cookie";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "default",
      path: "/",
      component: () => import("../layouts/DefaultLayout.vue"),
      children: [
        {
          name: `default-home`,
          path: "",
          component: () => import("../views/HomeView.vue"),
        },
      ],
      // beforeEnter(to, from, next) {
      //   if (Cookie.get("token")) {
      //     next();
      //   } else {
      //     window.location.href = "/auth";
      //   }
      // },
    },
    {
      name: "auth",
      path: "/auth",
      component: () => import("../layouts/AuthLayout.vue"),
      // beforeEnter(to, from, next) {
      //   if (!Cookie.get("token")) {
      //     next();
      //   } else {
      //     window.location.href = "/";
      //   }
      // },
    },
  ],
});

export default router;
