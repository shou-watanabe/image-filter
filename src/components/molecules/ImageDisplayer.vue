<template>
  <div>
    <v-img :src="src" height="200" width="300"></v-img>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ImageDisplayer",
  props: {
    imagePath: {
      type: String,
      default: "",
      required: true,
    },
  },
  computed: {
    src(): string {
      return "file://" + this.imagePath;
    },
  },
});
</script>

<style scoped></style>
