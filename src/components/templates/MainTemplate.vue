<template>
  <BaseCard
    :height="windowHeight"
    :width="windowWidth"
    :useHeader="true"
    headerText="画像処理アプリ"
  >
    <template #mainContents>
      <v-row>
        <FilterPlace
          :original-image-path="originalImagePath"
          :result-image-path="resultImagePath"
          @exec-filter="execFilter"
        />
        <BaseCard
          :height="windowHeight - headerHeight"
          :width="settingDisplayerWidth"
          class="mr-3 mt-3"
        >
          <template #mainContents>
            <SettingDisplayer
              :original-image-path="originalImagePath"
              :height="canvasHeight"
              :width="settingDisplayerWidth"
              :filter-name="filterName"
              @emit-file-path="emitFilePath"
              @emit-filter-name="emitFilterName"
            />
            <ImageDisplayer
              headerText="ヒストグラム"
              :useHeader="true"
              :image-path="histGraphPath"
              :height="canvasHeight"
              :width="settingDisplayerWidth"
            />
          </template>
        </BaseCard>
      </v-row>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import Vue from "vue";
import FilterPlace from "@/components/organisms/main/FilterPlace.vue";
import BaseCard from "@/components/molecules/base/BaseCard.vue";
import ImageDisplayer from "@/components/molecules/ImageDisplayer.vue";
import SettingDisplayer from "@/components/organisms/main/SettingDisplayer.vue";
import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  HEADER_HEIGHT,
  SETTING_DISPLAYER_WIDTH,
} from "@/config/constantParams";

export default Vue.extend({
  name: "MainTemplate",
  components: {
    FilterPlace,
    BaseCard,
    ImageDisplayer,
    SettingDisplayer,
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
    histGraphPath: {
      type: String,
      default: "",
      required: true,
    },
    filterName: {
      type: String,
      default: "",
      required: true,
    },
  },
  computed: {
    windowHeight(): number {
      return WINDOW_HEIGHT;
    },
    windowWidth(): number {
      return WINDOW_WIDTH;
    },
    headerHeight(): number {
      return HEADER_HEIGHT;
    },
    canvasHeight(): number {
      return (WINDOW_HEIGHT - HEADER_HEIGHT) / 2;
    },
    settingDisplayerWidth(): number {
      return SETTING_DISPLAYER_WIDTH;
    },
  },
  methods: {
    execFilter(): void {
      this.$emit("exec-filter");
    },
    emitFilePath(path: string): void {
      this.$emit("update-original-file-path", path);
    },
    emitFilterName(name: string): void {
      this.$emit("update-filter-name", name);
    },
  },
});
</script>

<style scoped></style>
