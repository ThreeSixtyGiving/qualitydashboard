<template>
  <div>
    <h4>Sort:</h4>
    <div class="sort-filters" style="display: grid; grid-template-columns: 2fr 2fr">
      <v-select :options="filter.options" :clearable=false :reduce="(option) => option.code" :value="sortMode" @input="sortChange" :placeholder="filter.label">
      </v-select>
    </div>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';

export default {
  name: "SearchSortFilter",
  props: {
    sortMode: {}
  },
  data() {
    return {
      filter: {
        id: 'sort',
        label: "Please select a sorting option",
        activeDefault: true,
        options: [{code: 'alphabeticallyAsc', label: 'Alphabetically (ascending)'}, { code: 'alphabeticallyDesc', label: 'Alphabetically (descending)'}],
      }
    }
  },
  methods: {
    sortChange(changed) {
      const query = { ...this.$route.query, sort: changed };
      this.$router.replace({ query });
      this.$emit('sortChange', changed);
    }
  }
}
</script>
