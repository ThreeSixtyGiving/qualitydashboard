<template>
  <div class="dashboard-publisher-result">
    <div class="dashboard-publisher-result__head">
      <div class="dashboard-publisher-result__left-side">
        <a class="dashboard-publisher-result__title">
          {{ publisher.name }}
        </a>
      </div>

      <div class="dashboard-publisher-result__right-side">
        <div class="dashboard-publisher-result__date">
          Last update: <time :datetime="publisher.last_published">{{ publisher.last_published }}</time>
        </div>
      </div>
    </div>

    <template v-if="publisher.aggregate && publisher.quality">

    <span v-for="(badge, index) in badges.available" :key="index" class="dashboard-publisher-result__badge">
      <IconBadge :badge="badge" />
    </span>

    <hr class="separator-light">

    <div>
      <h5>Total grants published</h5>
      <div>
        <YearsChart :chart="chart" />
      </div>
    <hr class="separator-light">
    </div>

    </template>

    <template v-else>
      <p>There are currently problems accessing all of this publisher's data.</p>
    </template>
    <div>
      <a class="button" v-bind:title="`See more information about ${publisher.name}'s data`" :href="$router.resolve({name: 'publisher', params: { id: publisher.prefix, publisher: this.publisher }}).href">See More</a>
    </div>

  </div>
</template>

<script>
import YearsChart from "../../generic/YearsChart";
import IconBadge from "./IconBadge";
import getBadges from '../data/badges';
import getAwardYearsArray from '../../generic/awardYears';

export default {
  name: "PublisherResult",
  components: {
    YearsChart,
    IconBadge,
  },
  props: {
    publisher: {
      type: Object,
      required: true,
    }
  },
  data: function () {
    let chart = [];
    let badges = [];

    try {
      chart = getAwardYearsArray(this.publisher.aggregate.awardYears);
      badges = getBadges(this.publisher);
    } catch (error) {
      console.warn(this.publisher);
      console.warn(error);
    }

    return {
      chart: chart,
      badges: badges,
    }
  }
}
</script>
