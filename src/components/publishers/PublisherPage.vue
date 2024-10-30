<template>
<main class="layout__content sidebar-container">
  <div class="grantnav-search__wrapper">
    <div class="grantnav-search__sidebar">
      <h2 class="grantnav-search__sidebar--heading">Refine your search</h2>

      <div class="grantnav-search__sidebar--filters">
        <SearchPublisherFilter :publisherList="unsortedPublishers" :filteredPublishers="filteredPublishers" :key="dataDownloaded" @updateFilters="updateFilters($event)" />
        <br>
        <SearchBadgeFilter :badgesList="badges" :filteredBadges="filteredBadges" @updateFilters="updateFilters($event)" />
      </div>
    </div>
    <div class="grid grid--one-column">
      <div class="sidebar-adjacent-content">
        <SearchSortFilter :sortMode="sortMode" @sortChange="sortChange($event)" />
        <div class="spacer-2"></div>
        <b v-if="publishers.length !== publisherResults.length">Showing {{ publisherResults.length }} {{ publisherResults.length === 1 ? 'result' : 'results' }}</b>
        <div class="spacer-2"></div>
        <div v-if="!dataDownloaded">
          <BaseSpinner :key="dataDownloaded" />
        </div>
        <template v-if="dataDownloaded">
          <PublisherResult v-for="publisher in publisherResults" :key="publisher.prefix" :publisher="publisher" />
          <div class="spacer-1"></div>
        </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import PublisherResult from "./parts/PublisherResult";
import SearchPublisherFilter from './parts/SearchPublisherFilter';
import SearchBadgeFilter from './parts/SearchBadgeFilter';
import SearchSortFilter from './parts/SearchSortFilter';
import BaseSpinner from '../generic/BaseSpinner'
import { badges, getBadges } from './data/badges';

export default {
  name: "PublisherPage",
  components: {
    PublisherResult,
    SearchBadgeFilter,
    SearchPublisherFilter,
    SearchSortFilter,
    BaseSpinner,
  },
  methods: {
    sortPublisherAlpha(publisherList){

      publisherList.sort((publisherA, publisherB)=> {
        let a = publisherA.name.toLowerCase();
        let b = publisherB.name.toLowerCase();

        if (a.indexOf("the ") == 0){
          a = a.substr(4);
        }

        if (b.indexOf("the ") == 0){
          b = b.substr(4);
        }

        if (a > b){
          if (this.sortMode == "alphabeticallyDesc"){
            return -1;
          }
          return 1;
        }

        if (a < b){
          if (this.sortMode == "alphabeticallyDesc"){
            return 1;
          }
          return -1;
        }

        return 0;
      });
    },
    sortChange(sortMode) {
      this.sortMode = sortMode;
      this.sortPublisherAlpha(this.publisherResults);
    },
    badgeChange(selectedBadges, selectionType) {
      const selectedBadgesArray = new Array(selectedBadges).flat();
      
      if (selectedBadgesArray.length) {
        this.publisherResults = this.publisherResults.filter(publisher => {
          const publisherBadges = getBadges(publisher)
          const availableBadges = Object.values(publisherBadges.available)
          
          if (selectionType === 'include') {
            return selectedBadgesArray.every(item => {
              return availableBadges.some(badge => badge.qualityMetric === item)
            })
          } else {
            return selectedBadgesArray.every(item => {
              return availableBadges.every(badge => badge.qualityMetric !== item)
            })
          }
        });
      } else {
        this.publisherResults = this.publishers;
      }
    },
    publisherChange(selectedPublishers, selectionType) {
      if (selectedPublishers.length) {
        if (selectionType === 'include') {
          this.publisherResults = this.publishers.filter(publisher => selectedPublishers.includes(publisher.prefix));
        } else {
          this.publisherResults = this.publishers.filter(publisher => !selectedPublishers.includes(publisher.prefix));
        }
      } else {
        this.publisherResults = this.publishers;
      }
    },
    updateFilters () {
      this.publisherResults = this.publishers

      const publisherParams = this.$route.query.publishers || [];
      const publisherSelection = this.$route.query.publisherSelection || 'include';
      const badgeParams = this.$route.query.badges || [];
      const badgeSelection = this.$route.query.badgeSelection || 'include';

      this.filteredPublishers = publisherParams || null;
      this.filteredBadges = badgeParams || null;
      
      if (publisherParams.length) {
        this.publisherChange(publisherParams, publisherSelection);
      } 
      
      if (badgeParams.length) {
        this.badgeChange(badgeParams, badgeSelection);
      }

    }
  },
  data() {
    return {
      badges,
      publishers: [],
      filteredBadges: [],
      filteredPublishers: [],
      publisherResults: [],
      unsortedPublishers: [],
      dataDownloaded: false,
      sortMode: this.$route.query.sort || "alphabeticallyAsc",
    }
  },
  created() {
    this.dataDownloaded = false;
    this.badgeUpdated = false;
    this.publisherUpdated = false;
    fetch(`${process.env.VUE_APP_DATASTORE_API}/publishers?format=json`)
      .then((response) => response.json())
      .then((json) => {
        this.publishers = json;
        this.unsortedPublishers = [...this.publishers];
        this.publisherResults = this.publishers;
        this.sortPublisherAlpha(this.publisherResults);
        this.dataDownloaded = true;
        this.updateFilters({})
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
};
</script>
