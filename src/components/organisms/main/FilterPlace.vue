<template>
  <div>
    <v-col
      :style="{ height: '900px', width: '400px' }"
      justify="center"
      align-content="center"
    >
      <ImageDisplayer
        :image-path="originalImagePath"
        :height="300"
        :width="400"
      />
      <v-btn icon x-large @click="execFilter">
        <v-icon x-large>mdi-arrow-down-bold</v-icon>
      </v-btn>
      <ImageDisplayer
        :image-path="resultImagePath"
        :height="300"
        :width="400"
      />
    </v-col>
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
  props: {
    originalImagePath: {
      type: String,
      default: "",
      required: true,
    },
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
