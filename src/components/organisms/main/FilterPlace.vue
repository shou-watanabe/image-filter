<template>
  <div>
    <v-row
      :style="{ height: '450px', width: '800px' }"
      justify="center"
      align-content="center"
    >
      <ImageDisplayer :image-path="imagePath" />
      <v-btn icon x-large @click="execFilter">
        <v-icon x-large>mdi-play-outline</v-icon>
      </v-btn>
      <ImageDisplayer :image-path="resultImagePath" />
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
