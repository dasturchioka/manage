<script setup lang="ts">
import { useDashboard } from "@/stores/dashboard";
import TheHorizontalScroll from "@/components/TheHorizontalScroll.vue";
import TheDashboardTitleColumn from "@/components/TheDashboardTitleColumn.vue";
import Cookies from "js-cookie";

const dashboardsLength = Cookies.get("dashboardsLength");

const dashboardStore = useDashboard();
</script>

<template>
  <main
    class="overview-page sm:px-4 px-2 h-screen w-full overflow-x-scroll custom-scroll overflow-y-hidden custom-scroll-h py-6"
  >
    <TheHorizontalScroll>
      <template #titles></template>
      <template #content>
        <div
          v-for="(dashboard, index) in dashboardStore.dashboards.list"
          :key="index"
          class="card h-auto flex-shrink-0 w-72 overflow-y-scroll custom-scroll space-y-8"
        >
          <TheDashboardTitleColumn
            :title="(dashboard.name as string)"
          ></TheDashboardTitleColumn>
        </div>
      </template>
    </TheHorizontalScroll>
  </main>
</template>

<style scoped>
.overview-page {
  justify-self: start;
}
</style>
