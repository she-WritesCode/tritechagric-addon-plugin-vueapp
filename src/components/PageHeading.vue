<template>
  <div class="page-heading mb-4">
    <h1 class="text-3xl">{{ title }}</h1>
    <div class="text-gray-600">{{ subtitle }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHeading',
  props: ['title', 'subtitle']
});
</script>

<style scoped>
</style>
