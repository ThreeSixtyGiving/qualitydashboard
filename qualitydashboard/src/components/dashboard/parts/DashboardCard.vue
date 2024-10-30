<template>
  <div :class="`dashboard-stats-card ${overviewMode==='grants' ? 'dashboard-stats-card--grant' : ''}`">
    <div class="dashboard-stats-card__head">
      <div class="dashboard-stats-card__left-side">
        <h3 class="dashboard-stats-card__title">{{ cardData.title }}</h3>
        <p class="dashboard-stats-card__description">{{ cardData.description }}</p>
      </div>

      <div v-if="cardData.infoLabel" class="dashboard-stats-card__right-side">
        <AlertTag v-on="$listeners" :label="cardData.infoLabel" :modalRef="cardData.modalRef" />
      </div>
    </div>

    <div class="dashboard-stats-card__groups">
      <div v-for="(stats, index) in cardData.stats" :key="index" class="dashboard-stats-card__group">
        <MaterialIcon :iconName="stats.iconName" :color="overviewMode === 'publishers' ? 'teal' : 'orange'" />
        <span :id="`stat-${index}`">{{ stats.label }}</span>
        <span :aria-labelledby="`stat-${index}`" class="dashboard-stats-card__value">{{ stats.value }}</span>
      </div>
    </div>

    <div class="spacer-2"></div>

    <div v-if="cardData.graph">
      <hr class="separator-light">

      <Plotly
        :data="cardData.graph.data"
        :layout="cardData.graph.layout"
        :displaylogo="false"
        :modeBarButtonsToRemove="[ 'zoom2d', 'select2d', 'pan2d', 'lasso2d', 'autoScale2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian']"
        :toImageButtonOptions='{ filename: "360Giving-"+cardData.title}'
      />
      <!-- not in use <div class="graph-label">{{ cardData.graphDescription }}</div> -->
    </div>
  </div>
</template>

<script>
import AlertTag from "../../generic/AlertTag";
import MaterialIcon from "../../generic/MaterialIcon";
import { Plotly } from "vue-plotly";

export default {
  name: "DashboardCard",
  components: {
    AlertTag,
    MaterialIcon,
    Plotly,
  },
  props: {
    overviewMode: String,
    cardData: {
      title: "",
      description: "",
      infoLabel: "",
      stats: [
        {
          label: "",
          values: "",
          iconName: "",
        }
      ],
    }
  },
};
</script>
