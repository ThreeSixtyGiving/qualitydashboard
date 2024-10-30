<template>
  <div class="layout">
    <BaseNav />
    <hr class="separator-light">
    <main>
      <div class="layout__content dashboard-page">
        <TopStats />
        <div class="grid grid--one-column">
          <BaseTabs />
        </div>
        <div :class="$route.name !== 'publishers' && 'grid grid--one-column'">
          <router-view />
        </div>
      </div>
    </main>
    <BaseFooter />
  </div>
</template>

<script>
import BaseNav from "./parts/BaseNav";
import TopStats from "./parts/TopStats";
import BaseFooter from "./parts/BaseFooter";
import BaseTabs from "./parts/BaseTabs";

export default {
  name: "HomePage",
  components: {
    BaseNav,
    TopStats,
    BaseFooter,
    BaseTabs,
  },
};
</script>

<style lang="css" scoped>
@import "../../assets/styles/main.css";
</style>
