<template>
  <div>
    <!-- <ImageDisplayer :image-path="imagePath" /> -->
    <v-row style="height: 450px" justify="center" align-content="center">
      <ImageDisplayer :image-path="imagePath" />
      <v-btn>aaa</v-btn>
      <ImageDisplayer :image-path="imagePath" />
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ImageDisplayer from "@/components/molecules/ImageDisplayer.vue";

export default Vue.extend({
  name: "FilterPlace",
  components: {
    ImageDisplayer,
  },
  data() {
    return {
      imagePath:
        "/Users/watanabeshou/Desktop/image-filter-python/sample_image/fullcolor_sample_gray1.png",
    };
  },
});
</script>

<style scoped></style>
