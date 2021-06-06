<template>
  <v-card :width="width" :height="height" :elevation="1">
    <v-app-bar v-if="useHeader" :elevation="1">
      <p class="subtitle-1 font-weight-bold ma-auto">
        {{ headerText }}
      </p>
      <slot name="headerContents"></slot>
    </v-app-bar>
    <slot name="mainContents"></slot>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BaseCard",
  props: {
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
});
</script>

<style scoped></style>
