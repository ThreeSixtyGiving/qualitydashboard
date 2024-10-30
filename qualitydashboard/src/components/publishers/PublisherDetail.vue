<template>
<div>
  <div v-if="!dataDownloaded">
    <Spinner :key="dataDownloaded" />
  </div>
  <div v-if="dataDownloaded" class="dashboard-publisher-result-wrapper">
    <div class="dashboard-publisher-result__head">
      <div class="dashboard-publisher-result__left-side">
        <div class="dashboard-publisher-result__title">
          <h1>{{ publisher.name}}</h1>
        </div>
      </div>

      <div class="dashboard-publisher-result__right-side">
        <div class="dashboard-publisher-result__date">
          Last update: <time :datetime="publisher.last_published">{{ publisher.last_published }}</time>
        </div>
      </div>
    </div>

    <template v-if="publisher.quality">
    <h3>This data includes these features</h3>
    <span v-for="(badge, index) in this.badges.available" :key="index" class="dashboard-publisher-result__badge">
      <IconBadge :badge="badge" />
    </span>
    <a href="#" v-on:click.prevent="showUnavailableFeatures = !showUnavailableFeatures" v-if="badges.unavailable.length" title="Show not included features">{{badges.unavailable.length}} features are not included</a>
    <template v-if="showUnavailableFeatures">
      <h3>This data does not include these features</h3>
      <span v-for="(badge, index) in this.badges.unavailable" :key="index" class="dashboard-publisher-result__badge">
        <IconBadge :badge="badge" />
      </span>
    </template>
    </template>

    <hr class="separator-light">

    <div class="spacer-1"></div>

    <div class="dashboard-publisher-result-wrapper__external-buttons align-right">
      <a :href="`https://grantnav.threesixtygiving.org/publisher/${publisher.prefix}`" target="_blank" class="button">See in GrantNav</a>
      <!-- <a :href="`https://insights.threesixtygiving.org/data?funder=${publisher.prefix}`" target="_blank" class="button">See in Insights</a> -->
    </div>

    <div class="spacer-3"></div>

    <div class="dashboard-publisher-result" v-if="publisher.aggregate">
      <h4 class="dashboard-publisher-result__title">Total grants published</h4>
      <p>The number of grants published by award year for the past 10 years, with the total grants published that were awarded 11 or more years ago.</p>
      <YearsChart :chart="chart" />
    </div>
    <div class="dashboard-publisher-result" v-else>
      <h4>There are currently problems accessing all of this publisher's data</h4>
      <p>This may be due file access issues, or changes that may mean the files do not currently conform to the <a href="https://www.threesixtygiving.org/standard/">360Giving data standard</a>.</p>
    </div>

    <div class="dashboard-publisher-result">
      <h4 class="dashboard-publisher-result__title">Datasets</h4>
      <p>{{ publisher.files_description }}</p>
      <hr class="separator-light">
      <FileSummary v-for="(file, index) in publisher.files" :key="`files-${index}`" :prefix="publisher.prefix" :file="file" />
    </div>
  </div>
</div>
</template>

<script>
import Spinner from '../generic/Spinner.vue';
import YearsChart from "../generic/YearsChart";
import FileSummary from './parts/FileSummary.vue';
import IconBadge from './parts/IconBadge';
import getBadges from './data/badges';
import getAwardYearsArray from '../generic/awardYears';

export default {
  name: "PublisherDetail",
  components: {
    YearsChart,
    FileSummary,
    IconBadge,
    Spinner,
  },
  props: {
    id: {},
  },
  data() {
    return {
      publisher: {},
      dataDownloaded: {},
      badges: {},
      chart: {},
      showUnavailableFeatures: false,
    }
  },
  methods: {
    searchFunction(searchTerm = null) {
      this.dataDownloaded = false;
      const query = searchTerm === null ? '' : [`&search=${searchTerm}`].join("&");
      fetch(`${process.env.VUE_APP_DATASTORE_API}/publisher/${this.id}?format=json${query}`)
        .then((response) => response.json())
        .then((json) => {
          this.publisher = json;
          this.badges = getBadges(json);
          try {
            this.chart = getAwardYearsArray(this.publisher.aggregate.awardYears);
          } catch (error) {
            console.warn("No aggregate information for this publisher")
            console.warn(this.publisher);
          }
          this.dataDownloaded = true;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
  created() {
    this.searchFunction();
  },
};
</script>
