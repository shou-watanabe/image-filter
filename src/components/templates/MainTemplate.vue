<template>
  <FilterPlace :result-image-path="resultImagePath" @exec-filter="execFilter" />
</template>

<script lang="ts">
import Vue from "vue";
import FilterPlace from "@/components/organisms/main/FilterPlace.vue";

export default Vue.extend({
  name: "MainTemplate",
  components: {
    FilterPlace,
  },
  props: {
    resultImagePath: {
      type: String,
      default: "",
      required: true,
    },
  },
  methods: {
    execFilter(): void {
      this.$emit("exec-filter");
    },
  },
});
</script>

<style scoped></style>
