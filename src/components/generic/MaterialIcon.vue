<template>
  <div class="icon" :style="`${color==='orange' ? '--icon-color: var(--color-orange)' : ''}`">
    <span v-if="overlaidText" class="icon__overlaid-text">{{ overlaidText }}</span>
    <i v-else class="material-icons icon__mat-icon">{{ iconName }}</i>
  </div>
</template>

<script>
export default {
  name: 'MaterialIcon',
  props: {
    overlaidText: null,
    iconName: null,
    color: null,
  }
}
</script>
