<template>
  <div>
    <button class="button button--teal" v-bind:style="activePublishersStyle" v-on:click="setOverviewMode('publishers')" style="margin-right: 5px">By Publisher</button>
    <button class="button button--orange" v-bind:style="activeGrantsStyle" v-on:click="setOverviewMode('grants')">By Grant</button>
  </div>
</template>

<script>
export default {
  name: "RadioButtons",
  data: function() {
    return {
      radioOptions: [{ name: "Publishers", value: "publishers", default: true }, { name: "Grants", value: "grants" }],
    }
  },
  computed: {
    activeGrantsStyle: function(){
      if (this.overviewMode === 'grants') {
        return {
            'background-color': 'var(--color-orange)',
            'color': 'var(--colors-white)',
            'border-color' : 'var(--color-orange)'
          };
        }
        return {};
      },
    activePublishersStyle: function(){
      if (this.overviewMode === 'publishers') {
        return {
            'background-color': 'var(--color-teal)',
            'color': 'var(--colors-white)',
            'border-color' : 'var(--color-teal)'
          };
        }
        return {};
      }
  },
  props: {
    overviewMode: String,
  },
  methods: {
    setOverviewMode(value) {
      this.$emit('setOverviewMode', value)
    }
  }
};
</script>
