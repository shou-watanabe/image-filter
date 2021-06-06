<template>
  <MainTemplate />
</template>

<script lang="ts">
import Vue from "vue";
import MainTemplate from "@/components/templates/MainTemplate.vue";

export default Vue.extend({
  name: "MainPage",
  components: {
    MainTemplate,
  },
});
</script>

<style scoped></style>
