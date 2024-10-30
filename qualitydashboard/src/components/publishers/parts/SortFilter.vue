<template>
  <div>
    <h4>Sort:</h4>
    <div class="sort-filters">
      <v-select :options="filters[0].options" :clearable=false :reduce="(option) => option.code" :value="sortMode" @input="sortChange" :placeholder="filters[0].label">
      </v-select>
      <v-select :options="filters[1].options" label="name" :reduce="(publisher) => publisher.prefix" :value="filteredPublishers" @input="filterChange" :placeholder="filters[1].label" multiple>
      </v-select>
      <button class="clear-all" @click="clearFilters">Clear all</button>
    </div>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';

export default {
  name: "SortFilter",
  props: {
    publisherList: {},
    sortMode: {},
    filteredPublishers: {},
  },
  data() {
    return {
      filters: [
        {
          id: 'sort',
          label: "Please select a sorting option",
          activeDefault: true,
          options: [{code: 'alphabeticallyAsc', label: 'Alphabetically (ascending)'}, { code: 'alphabeticallyDesc', label: 'Alphabetically (descending)'}],
        },
        {
          id: 'publisher',
          label: "Select publisher(s)",
          options: this.publisherList,
        },/*
        {
          id: 'feature',
          label: "Filter by data feature",
          active: false,
          options: {metadata: 'Include metadata', externalIds: 'Include external org IDs', locationCode: 'Include location codes'},
        },
        {
          id: 'file',
          label: "Filter by data file",
          active: false,
          options: {csv: 'CSV', json: 'JSON', xlsx: 'XLSX', ods: 'ODS'},
        },*/
      ],
    }
  },
  methods: {
    sortChange(changed) {
      this.sortMode = changed;
      this.$emit('sortChange', this.sortMode);
    },
    filterChange(changed) {
      const query = { ...this.$route.query, publishers: changed };
      this.$router.replace({ query });
      this.$emit('filterChange', changed);
    },
    clearFilters() {
      this.filterChange([]);
    }
  },
}
</script>
