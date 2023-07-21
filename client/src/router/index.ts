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
        {
          name: "default-dashboard",
          path: "dashboard/:id",
          component: () => import("../views/DashboardView.vue"),
        },
        {
          name: "default-settings",
          path: "settings",
          component: () => import("../views/SettingsView.vue")
        },
        {
          name: "default-notifications",
          path: "notifications",
          component: () => import("../views/NotificationsView.vue")
        }
      ],
      beforeEnter(to, from, next) {
        if (Cookie.get("token")) {
          next();
        } else {
          window.location.href = "/auth";
        }
      },
    },
    {
      name: "auth",
      path: "/auth",
      component: () => import("../layouts/AuthLayout.vue"),
      beforeEnter(to, from, next) {
        if (!Cookie.get("token")) {
          next();
        } else {
          window.location.href = "/";
        }
      },
    },
  ],
});

export default router;
