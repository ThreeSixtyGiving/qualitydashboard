<template>
  <div class="cards-section" v-if="stats">
    <section v-if="!dataDownloaded" class="grid grid--one-column">
      <BaseSpinner />
    </section>
    <section v-else class="grid grid--three-columns" :key="`ready-${dataDownloaded}`">
      <div class="base-card base-card--teal grid__1">
        <div class="base-card__content">
          
          <h2 v-if="dataDownloaded" class="base-card__title">{{ (stats.publishers).toLocaleString() }}</h2>
          <p class="base-card__text">Publishers</p>
        </div>
      </div>

     <div class="base-card base-card--black grid__1">
        <div class="base-card__content">
          <h2 v-if="dataDownloaded" class="base-card__title">{{ (stats.funders).toLocaleString() }}</h2>
          <p class="base-card__text">Funders</p>
        </div>
      </div>

      <div class="base-card base-card--yellow grid__1">
        <div class="base-card__content">
          <h2 v-if="dataDownloaded" class="base-card__title">{{ (stats.grants).toLocaleString() }}</h2>
          <p class="base-card__text">Grants</p>
        </div>
      </div>

     <div class="base-card base-card--orange grid__1">
        <div class="base-card__content">
          <h2 v-if="dataDownloaded" class="base-card__title">{{ (stats.recipientOrganisations).toLocaleString() }}</h2>
          <p class="base-card__text">Recipient Org IDs</p>
        </div>
      </div>

     <div class="base-card base-card--orange grid__1">
        <div class="base-card__content">
          <h2 v-if="dataDownloaded" class="base-card__title">{{ (stats.recipientIndividuals).toLocaleString() }}</h2>
          <p class="base-card__text">Recipient Individuals</p>
        </div>
      </div>

      <div class="base-card base-card--red grid__1">
        <div class="base-card__content">
          <h2 v-if="dataDownloaded" class="base-card__title">£{{ stats.GBP|numeral("0.00a")}}</h2>
          <p class="base-card__text">Total amount</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BaseSpinner from '../../generic/BaseSpinner'

export default {
  name: "TopStats",
  components: {
    BaseSpinner
  },
  data() {
    return {
      stats: {
        grants: null,
        recipients: null,
        GBP: null,
      },
      dataDownloaded: false,
    }
  },
  methods: {
    getData() {
      this.dataDownloaded = false;
      const endpoint = this.$router.currentRoute.name === 'publisher' ? `/publisher/${this.$router.currentRoute.params.id}` : `/overview?mode=publishers`;
      fetch(`${process.env.VUE_APP_DATASTORE_API}${endpoint}`)
        .then((response) => response.json())
        .then((json) => {
          this.stats = json.aggregate.total;
          this.dataDownloaded = true
        })
        .catch(error => {
          console.error('Error:', error);
          this.dataDownloaded = true
          this.stats = null;
        });
    },
  },
  created() {
    this.getData();
  }
};
</script>
