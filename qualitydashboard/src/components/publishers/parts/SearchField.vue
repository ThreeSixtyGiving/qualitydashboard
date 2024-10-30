<template>
  <div>
    <input
      placeholder="Search for publishers"
      type="text"
      id="publisher-search-input"
      v-model="searchTerm"
    />
    <button
      id="publisher-search-submit"
      class="button"
      v-on:click="searchFunction(searchTerm)"
    >
      Search
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchField",
  props: {
    searchFunction: { type: Function },
  },
  data: function () {
    return {
      searchTerm: "",
    };
  },
};
</script>
