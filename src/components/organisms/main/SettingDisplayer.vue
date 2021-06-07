<template>
  <BaseCard :height="height" :width="width" :useHeader="true" headerText="設定">
    <template #mainContents>
      <InputFile
        label="処理画像"
        file-ext-type="image"
        :selected-file-path="originalImageName"
        :dialog-extensions="[
          {
            name: '写真',
            extensions: ['png', 'jpg', 'jpeg', 'bmp', 'tif', 'tiff', 'gif'],
          },
        ]"
        @emit-file-path="emitFilePath"
      />
      <InputSelection
        icon-name="mdi-image-filter-black-white"
        :value="filterName"
        :items="filterList"
        :width="300"
        @emit-value="emitFilterName"
      />
    </template>
  </BaseCard>
</template>

<script lang="ts">
import Vue from "vue";
import path from "path";
import BaseCard from "@/components/molecules/base/BaseCard.vue";
import InputFile from "@/components/molecules/InputFile.vue";
import InputSelection from "@/components/molecules/InputSelection.vue";
import { filterList } from "@/types/filter";

export default Vue.extend({
  name: "SettingDisplayer",
  components: {
    BaseCard,
    InputFile,
    InputSelection,
  },
  props: {
    originalImagePath: {
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
    filterName: {
      type: String,
      default: "",
      required: true,
    },
  },
  computed: {
    originalImageName(): string {
      return path.basename(this.originalImagePath);
    },
    filterList(): { text: string; value: string }[] {
      return filterList;
    },
  },
  methods: {
    emitFilePath(path: string): void {
      this.$emit("emit-file-path", path);
    },
    emitFilterName(value: string): void {
      this.$emit("emit-filter-name", value);
    },
  },
});
</script>

<style scoped></style>
