<template>
  <ul class="years-chart">
    <li
      v-for="(item, index) in chart"
      :key="`item-${index}`"
      class="years-chart__item"
      :style="`--opacity: ${calculateOpacity(item.value)};`"
    >
      <div
        class="years-chart__block"
        :aria-label="item.detail"
        :title="item.detail"
      >
        <span>{{ item.value_text }}</span>
      </div>
      <div class="years-chart__label">{{ item.label }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "YearsChart",
  props: {
    chart: {},
  },
  data: function() {
    return {
      grantBandings: [0, 25, 50, 100, 250, 500, 1000, 5000],
    };
  },
  methods: {
    calculateOpacity(value){
      const bandingsLength = this.grantBandings.length;

      for (let i = 0; i < bandingsLength; i++) {
        if (!value) {
          return 0;
        } else if (value < this.grantBandings[i]) {
          return (i / bandingsLength);
        }
      }
      return 1;
    },
  },
}
</script>
