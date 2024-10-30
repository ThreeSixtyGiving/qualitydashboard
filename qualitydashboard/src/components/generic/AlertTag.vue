<template>
  <a class="alert-tag alert-tag--anchor" href="#" v-on:click.prevent="showModal(modalRef)">
    <span class="alert-tag__icon"><img src="@/assets/images/icons/info.svg" style="vertical-align: top" alt=""/></span>
    <span class="alert-tag__content">{{ label }}</span>
  </a>
</template>

<script>
export default {
  name: "AlertTag",
  props: {
    modalRef: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    showModal() {
      this.$emit('showModalEvent', this.modalRef);
    }
  }
};
</script>
