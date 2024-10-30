<template>
<div id="modal-00" class="modal modal--shown dashboard-modal" role="dialog" aria-labelledby="modal-heading" tabindex="-1">
  <div v-on:click="hideModal" class="modal__overlay modal__trigger" data-id="modal-00"></div>
  <div class="modal__window">
    <button v-on:click="hideModal" class="modal__close modal__trigger" data-id="modal-00"></button>
    <div class="modal__content">
      <h3 id="modal-heading">{{ cardData.infoLabel }}</h3>

      <p v-if="!cardData.modalDescription">{{ cardData.description }}</p>
      <p else v-html="cardData.modalDescription"></p>

      <hr class="separator-light">

      <div v-for="stats in cardData.stats" :key="stats.iconName">
        <div class="dashboard-modal__groups">
          <div class="dashboard-modal__group">
            <div class="dashboard-modal__stat">
              <span><MaterialIcon :iconName='stats.iconName' /></span>
              <span>{{ stats.label }}</span>
              <span class="dashboard-modal__stat-value-placeholder">{{ stats.value }}</span>
            </div>
          </div>

          <div class="dashboard-modal__group">
            <h4 class="dashboard-modal__subtitle">This means</h4>
            <p v-html="stats.modalMeaning"></p>
            <h4 class="dashboard-modal__subtitle">This is useful because</h4>
            <p v-html="stats.modalReason"></p>
          </div>
        </div>

        <hr class="separator-light">
      </div>

    </div>
  </div>
</div>
</template>

<script>
import MaterialIcon from '../../generic/MaterialIcon'

export default {
  name: 'BaseModal',
  components: {
    MaterialIcon,
  },
  methods: {
    hideModal() {
      this.$emit('hideModalEvent');
    },
  },
  props: {
    modalState: String,
    cardData: {},
  },
}
</script>

