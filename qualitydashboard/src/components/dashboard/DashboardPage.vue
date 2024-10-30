<template>
  <div>
    <div class="dashboard-page__section-radios">
      <RadioButtons :overviewMode="overviewMode" v-on:setOverviewMode="setOverviewMode($event)" />
    </div>
    <div class="spacer-2 clearfix"></div>
    <div v-if="!dataDownloaded">
      <Spinner :key="dataDownloaded" />
    </div>
    <div v-if="dataDownloaded">
      <DashboardCard v-for="(cardData, index) in cards" :key="`card-${index}`" :overviewMode="overviewMode" :cardData="cardData" v-on:showModalEvent="controlModal(true, $event)" />
      <Modal v-if="modalState" :key="this.modalRef" :cardData="this.cards.find(card => card.modalRef===modalRef)" v-on:hideModalEvent="controlModal(false)" />
    </div>
    <div class="spacer-2 clearfix"></div>
  </div>
</template>

<script>
import DashboardCard from "./parts/DashboardCard";
import RadioButtons from "./parts/RadioButtons";
import Spinner from '../generic/Spinner.vue';
import Modal from './parts/Modal';
import { getPublisherCards, getGrantsCards } from './data/cards';

export default {
  name: "DashboardPage",
  components: {
    DashboardCard,
    RadioButtons,
    Modal,
    Spinner,
  },
  props: {
    publishers: {},
  },
  methods: {
    controlModal(modalState, modalRef="") {
      this.modalState = modalState;
      this.modalRef = modalRef;
    },
    setOverviewMode(value) {
      window.location.hash = value;
      this.overviewMode = value;
    },
    searchFunction(mode=null) {
      this.dataDownloaded = false;
      const query = mode === null ? '' : [`?mode=${mode}`];
      fetch(`${process.env.VUE_APP_DATASTORE_API}/overview${query}`)
        .then((response) => response.json())
        .then((json) => {
          this.cards = mode === 'publishers' ? getPublisherCards(json) : getGrantsCards(json);
          this.dataDownloaded = true;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
  created() {
    if (window.location.hash == "#publishers"){
      this.overviewMode = "publishers";
    }

    if (window.location.hash == "#grants"){
      this.overviewMode = "grants";
    }

    this.searchFunction(this.overviewMode);
  },
  watch: {
    overviewMode: function() {
      this.searchFunction(this.overviewMode)
    }
  },
  data() {
    return {
      modalState: false,
      modalRef: "",
      overviewMode: 'publishers',
      cards: [],
      dataDownloaded: false,
    };
  },
};
</script>
