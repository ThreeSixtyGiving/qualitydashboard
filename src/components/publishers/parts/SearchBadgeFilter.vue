<template>
  <div class="filter-list filter-list--with-checkboxes">
  <details class="filter-list__accordion" open>
    <summary class="filter-list__label">
      <div>Data Features <button v-if="filteredBadges.length" class="button button--small button--unstyled" @click="clearFilters"> <small>(clear)</small></button></div>
      <svg class="accordion-toggle-icon" width="18" stroke="#153634" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line class="accordion-toggle-icon__horizontal-line" x1="16.4131" y1="8.65356" x2="1.09657" y2="8.65356"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <line class="accordion-toggle-icon__vertical-line" x1="8.7561" y1="0.995239" x2="8.7561" y2="16.3118"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </summary>
    <div class="filter-list__contents-wrapper facet-multiselect">
      <div class="filter-list__form">
          <div class="filter-list__form--radios radio">
            <div class="filter-list__form--radio-item">
              <input class="screen-reader-only" type="radio" id="badge-include" name="badge-exclude" value="include" v-model="selection" @click="selectionTypeChange" checked>
              <label for="badge-include">Include selected</label>
            </div>
            <div class="filter-list__form--radio-item">
              <input class="screen-reader-only" type="radio" id="badge-exclude" name="badge-exclude" value="exclude" v-model="selection" @click="selectionTypeChange">
              <label for="badge-exclude">Exclude selected</label>
            </div>
          </div>

        <div class="search-box-wrapper padding-left:05 padding-right:05 padding-top:05 padding-bottom:05">
          <v-select :options="filter.options" label="label" :reduce="(badge) => badge.qualityMetric" :value="filteredBadges" @input="badgeChange" :placeholder="filter.label" multiple>
            <template v-slot:option="option">
              <span :title="option.label">
                {{ option.label }}
              </span>
            </template>
          </v-select>
        </div>

      </div>
    </div>
  </details>
</div>
</template>

<script>
import 'vue-select/dist/vue-select.css';

export default {
  name: "SearchBadgeFilter",
  props: {
    badgesList: {},
    filteredBadges: {}
  },
  data() {
    return {
      filter: {
        id: 'feature',
        label: "Select data feature(s)",
        options: this.badgesList
      },
      selection: 'include'
    }
  },
  methods: {
    badgeChange(changed) {
      const query = { ...this.$route.query, badges: changed, badgeSelection: this.selection };
      this.$router.replace({ query });
      this.$emit('updateFilters');
    },
    selectionTypeChange(event) {
      if (this.selection !== event.target.value) {
        this.selection = event.target.value
        this.badgeChange(this.$route.query.badges);
      }
    },
    clearFilters() {
      if (this.$route.query.badges.length) {
        this.badgeChange([]);
      }
    }
  },
  created() {
    this.selection = this.$route.query.badgeSelection || 'include'
  }
}
</script>
