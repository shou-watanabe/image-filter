<template>
  <BaseCard :height="900" :width="1200">
    <template #mainContents>
      <v-row>
        <FilterPlace
          :original-image-path="originalImagePath"
          :result-image-path="resultImagePath"
          @exec-filter="execFilter"
        />
        <!-- <RightSide :hist-graph-path="histGraphPath" :ori /> -->
        <v-layout justify-end>
          <BaseCard :height="900" :width="480">
            <template #mainContents>
              <v-row>
                <SettingDisplayer
                  :original-image-path="originalImagePath"
                  :height="360"
                  :width="480"
                  @emit-file-path="emitFilePath"
                />
                <ImageDisplayer
                  headerText="ヒストグラム"
                  :useHeader="true"
                  :image-path="histGraphPath"
                  :height="360"
                  :width="480"
                />
              </v-row>
            </template>
          </BaseCard>
        </v-layout>
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
  },
  methods: {
    execFilter(): void {
      this.$emit("exec-filter");
    },
    emitFilePath(path: string): void {
      this.$emit("update-original-file-path", path);
    },
  },
});
</script>

<style scoped></style>
