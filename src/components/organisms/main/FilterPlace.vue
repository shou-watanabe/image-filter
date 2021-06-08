<template>
  <BaseCard :height="displayHeight" :width="displayWidth" class="mt-3 ml-3">
    <template #mainContents>
      <center>
        <v-col class="pa-0" :style="{ height: windowHeight, width: '400px' }">
          <ImageDisplayer
            headerText="元画像"
            :useHeader="true"
            :image-path="originalImagePath"
            :height="canvasHeight"
            :width="350"
          />
          <v-btn icon x-large @click="execFilter">
            <v-icon x-large>mdi-arrow-down-bold</v-icon>
          </v-btn>
          <ImageDisplayer
            headerText="処理画像"
            :useHeader="true"
            :image-path="resultImagePath"
            :height="canvasHeight"
            :width="350"
          />
        </v-col>
      </center>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import Vue from "vue";
import ImageDisplayer from "@/components/molecules/ImageDisplayer.vue";
import BaseCard from "@/components/molecules/base/BaseCard.vue";
import {
  ARROW_HEIGHT,
  HEADER_HEIGHT,
  SETTING_DISPLAYER_WIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "@/config/constantParams";

export default Vue.extend({
  name: "FilterPlace",
  components: {
    ImageDisplayer,
    BaseCard,
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
  computed: {
    windowHeight(): number {
      return WINDOW_HEIGHT;
    },
    displayWidth(): number {
      return WINDOW_WIDTH - SETTING_DISPLAYER_WIDTH;
    },
    displayHeight(): number {
      return WINDOW_HEIGHT - HEADER_HEIGHT;
    },
    canvasHeight(): number {
      return (this.displayHeight - ARROW_HEIGHT) / 2;
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
