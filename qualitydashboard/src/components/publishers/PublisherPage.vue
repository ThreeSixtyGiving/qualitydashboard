<template>
  <main class="layout__content">
    <div class="layout__content-inner">
      <SortFilter :sortMode="sortMode" :publisherList="publishers" :filteredPublishers="filteredPublishers" :key="dataDownloaded" v-on:sortChange="sortChange($event)" v-on:filterChange="filterChange($event)" />
      <div class="spacer-4"></div>
      <div v-if="!dataDownloaded">
        <Spinner :key="dataDownloaded" />
      </div>
      <template v-if="dataDownloaded" id="publisher-list-wrapper">
        <PublisherResult v-for="publisher in publisherResults" :key="publisher.prefix" :publisher="publisher" />
        <div class="spacer-1"></div>
      </template>
    </div>
  </main>
</template>

<script>
import PublisherResult from "./parts/PublisherResult";
import SortFilter from './parts/SortFilter';
import Spinner from '../generic/Spinner'

export default {
  name: "PublisherPage",
  components: {
    PublisherResult,
    SortFilter,
    Spinner,
  },
  methods: {
    sortPublisherAlpa(){
      this.publisherResults.sort((publisherA, publisherB)=> {
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
      this.sortPublisherAlpa();
    },
    filterChange(selectedPublishers) {
      this.filteredPublishers = selectedPublishers;
      if (selectedPublishers.length) {
        this.publisherResults = this.publishers.filter(publisher => selectedPublishers.includes(publisher.prefix));
      } else {
        this.publisherResults = this.publishers;
      }
    }
  },
  data() {
    return {
      publishers: [],
      filteredPublishers: [],
      publisherResults: [],
      dataDownloaded: false,
      sortMode: "alphabeticallyAsc",
    }
  },
  created() {
    this.dataDownloaded = false;
    fetch(`${process.env.VUE_APP_DATASTORE_API}/publishers?format=json`)
      .then((response) => response.json())
      .then((json) => {
        this.publishers = json;
        this.publisherResults = this.publishers;
        this.sortPublisherAlpa();
        this.dataDownloaded = true;
        const publisherParams = this.$route.query.publishers;
        if (publisherParams) {
          this.filterChange(publisherParams);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },
};
</script>
