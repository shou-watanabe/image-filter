<template>
  <v-text-field readonly :label="label" :value="selectedFilePath">
    <template #prepend>
      <SelectFileField
        :file-ext-type="fileExtType"
        icon="mdi-file-plus"
        :dialog-title="dialogTitle"
        :custom-ext-filter="customExtFilter"
        :dialog-extensions="dialogExtensions"
        @emit-file-path="emitFilePath"
      />
    </template>
  </v-text-field>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import SelectFileField from "@/components/atoms/SelectFileField.vue";

export default Vue.extend({
  name: "InputFile",
  components: {
    SelectFileField,
  },
  props: {
    label: {
      type: String,
      default: "",
      required: true,
    },
    selectedFilePath: {
      type: String,
      default: "",
      required: true,
    },
    fileExtType: {
      type: String,
      default: "image",
      required: true,
      validator(fileExtType: string) {
        const typeList = ["image", "custom"];
        return typeList.includes(fileExtType);
      },
    },
    dialogTitle: {
      type: String,
      default: "ファイル選択",
      required: false,
    },
    customExtFilter: {
      type: Array as PropType<string[]>,
      default: (): string[] => [],
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
  methods: {
    emitFilePath(path: string): void {
      this.$emit("emit-file-path", path);
    },
  },
});
</script>
