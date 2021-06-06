<template>
  <div>
    <v-btn v-if="icon" icon large @click="selectFile">
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <v-btn v-else @click="selectFile">{{ btnText }}</v-btn>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { remote } from "electron";
import { selectFile } from "@/utils/FsFile";

export default Vue.extend({
  name: "SelectFileBtn",
  props: {
    fileExtType: {
      type: String,
      default: "image",
      required: true,
      validator(fileExtType: string) {
        const typeList = ["image", "custom"];
        return typeList.includes(fileExtType);
      },
    },
    icon: {
      type: String,
      default: "",
      required: false,
      validator(icon: string) {
        return icon === "" || icon.includes("mdi");
      },
    },
    btnText: {
      type: String,
      default: "ファイル選択",
      required: false,
    },
    dialogTitle: {
      type: String,
      default: "ファイル選択",
      required: true,
    },
    customExtFilter: {
      type: Array as PropType<string[]>,
      default: (): string[] => [],
      required: false,
    },
    validator: {
      type: Boolean,
      default: false,
      required: false,
    },
    isValid: {
      type: Boolean,
      default: true,
      required: false,
    },
    errorMessage: {
      type: String,
      default: "",
      required: false,
    },
    dialogExtensions: {
      type: Array as PropType<Array<{ name: string; extensions: string[] }>>,
      required: false,
      default: () => [
        {
          name: "all",
          extensions: ["*"],
        },
      ],
    },
  },
  computed: {
    extensions(): string[] {
      const extensions: string[] = [];

      switch (this.fileExtType) {
        case "image":
          extensions.push(
            ".png",
            ".jpg",
            ".jpeg",
            ".bmp",
            ".tif",
            ".tiff",
            ".gif"
          );
          break;
        case "custom":
          extensions.push(...this.customExtFilter);
          break;
      }

      return extensions;
    },
  },
  methods: {
    async selectFile(): Promise<void> {
      let result = "";
      if (this.validator && !this.isValid)
        remote.dialog.showErrorBox("エラー", this.errorMessage);

      result = await selectFile(
        this.dialogTitle,
        this.extensions,
        this.dialogExtensions
      );

      if (result === "canceled") return console.log("選択中止");

      this.$emit("emit-file-path", result);
    },
  },
});
</script>
