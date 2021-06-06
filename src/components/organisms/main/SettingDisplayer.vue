<template>
  <BaseCard :height="height" :width="width">
    <template #mainContents>
      <InputFile
        label="処理画像"
        file-ext-type="image"
        :selected-file-path="originalImagePath"
        @emit-file-path="emitFilePath"
      />
    </template>
  </BaseCard>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCard from "@/components/molecules/base/BaseCard.vue";
import InputFile from "@/components/molecules/InputFile.vue";

export default Vue.extend({
  name: "SettingDisplayer",
  components: {
    BaseCard,
    InputFile,
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
  },
  methods: {
    emitFilePath(path: string): void {
      this.$emit("emit-file-path", path);
    },
  },
});
</script>

<style scoped></style>
