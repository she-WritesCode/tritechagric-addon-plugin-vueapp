<template>
  <PrimeButton v-if="loading">
    <ProgressSpinner class="w-8 -ml-2 absolute"/> <span class="ml-8">{{loadingLabel}}</span>
  </PrimeButton>
  <PrimeButton v-else :icon="icon" :label="label" />
</template>

<script>
import {defineComponent} from "vue";
import PrimeButton from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  props: {
    loading: Boolean,
    loadingLabel: String,
    label: String,
    icon: String,
  },
  components: {PrimeButton, ProgressSpinner },
  name: "Button"
});
</script>

<style scoped>

</style>