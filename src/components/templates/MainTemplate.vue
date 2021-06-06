<template>
  <FilterPlace />
</template>

<script lang="ts">
import Vue from "vue";
import FilterPlace from "@/components/organisms/main/FilterPlace.vue";

export default Vue.extend({
  name: "MainTemplate",
  components: {
    FilterPlace,
  },
});
</script>

<style scoped></style>
