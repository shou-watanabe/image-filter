<template>
  <BaseCard
    :useHeader="useHeader"
    :headerText="headerText"
    :height="useHeader ? height + 56 : height"
    :width="width"
  >
    <template #mainContents>
      <v-img :src="src" :height="height" :width="width"></v-img>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCard from "@/components/molecules/base/BaseCard.vue";

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
  },
});
</script>

<style scoped></style>
