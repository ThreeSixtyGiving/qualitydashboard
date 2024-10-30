<template>
  <span class="icon-badge">
    <MaterialIcon :iconName="badge.iconName"/>
    {{ badge.label }}
  </span>
</template>

<script>
import MaterialIcon from '../../generic/MaterialIcon.vue';

export default {
  name: 'IconBadge',
  components: {
    MaterialIcon,
  },
  props: {
    badge: {}
  }
}
</script>
