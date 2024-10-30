<template>
  <div>
    <div class="tabs" v-if="$router.currentRoute.name !== 'publisher'">
      <span :class="`tab tab${$router.currentRoute.name === 'overview' ? '--active' : '--inactive'}`">
        <a class="tab__inner" href="/alldata">All Data</a>
      </span>

      <span :class="`tab tab${$router.currentRoute.name === 'publishers' ? '--active' : '--inactive'}`">
        <a class="tab__inner" href="/publishers">Publishers</a>
      </span>
      <span class="tabs-empty-bar" />
    </div>

    <div v-if="$router.currentRoute.name === 'publisher'">
      <a href="/publishers" class="dashboard-page__back-link">
        <MaterialIcon :iconName="'arrow_back'" />
        Back to All Publishers
      </a>
    </div>
  </div>
</template>

<script>
import MaterialIcon from '../../generic/MaterialIcon'

export default {
  name: "BaseTabs",
  components: {
    MaterialIcon,
  }
};
</script>
