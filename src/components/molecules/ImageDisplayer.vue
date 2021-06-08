<template>
  <BaseCard
    :useHeader="useHeader"
    :headerText="headerText"
    :height="height"
    :width="width"
  >
    <template #mainContents>
      <center>
        <v-img
          :src="src"
          :height="
            imageDetail ? imageDetail.height * imageScale : canvasSize.height
          "
          :width="
            imageDetail ? imageDetail.width * imageScale : canvasSize.width
          "
        />
      </center>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCard from "@/components/molecules/base/BaseCard.vue";
import { Image } from "@/types/image";
import { getImageDetail, calcImageScale } from "@/utils/image";
import { HEADER_HEIGHT } from "@/config/constantParams";

export default Vue.extend({
  name: "ImageDisplayer",
  components: {
    BaseCard,
  },
  props: {
    imagePath: {
      type: String,
      default: "",
      required: true,
    },
    height: {
      type: Number,
      default: 200,
      required: false,
    },
    width: {
      type: Number,
      default: 300,
      required: false,
    },
    useHeader: {
      type: Boolean,
      default: false,
      required: false,
    },
    headerText: {
      type: String,
      default: "",
      required: false,
    },
  },
  computed: {
    src(): string {
      // キャッシュ対策で時間をつける
      return `file://${this.imagePath}?${new Date().getTime()}`;
    },
    imageDetail(): Image | undefined {
      return getImageDetail(this.imagePath);
    },
    canvasSize(): { width: number; height: number } {
      if (this.useHeader)
        return {
          width: this.width,
          height: this.height - HEADER_HEIGHT,
        };
      else
        return {
          width: this.width,
          height: this.height,
        };
    },
    imageScale(): number | undefined {
      return calcImageScale(this.imageDetail, {
        height: this.canvasSize.height,
        width: this.canvasSize.width,
      });
    },
  },
});
</script>

<style scoped>
#image {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
