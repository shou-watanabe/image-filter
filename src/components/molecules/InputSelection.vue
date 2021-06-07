<template>
  <div class="d-flex align-center">
    <v-btn icon large v-if="iconName">
      <v-icon>
        {{ iconName }}
      </v-icon>
    </v-btn>
    <p v-if="label" :class="labelClass">{{ label }}</p>
    <SelectionField
      :width="width"
      :items="items"
      :value="value"
      @emit-value="emitValue"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import SelectionField from "@/components/atoms/SelectionField.vue";

export default Vue.extend({
  name: "InputSelection",
  components: {
    SelectionField,
  },
  props: {
    label: {
      type: String,
      default: "",
      required: false,
    },
    labelClass: {
      type: String,
      default: "",
      required: false,
    },
    iconName: {
      type: String,
      default: "",
      required: false,
    },
    width: {
      type: Number,
      default: 200,
      required: true,
      validator(width: number) {
        return width > 100 && width < 600;
      },
    },
    items: {
      type: Array as PropType<
        | string[]
        | number[]
        | {
            text: string | number;
            value: string | number | Array<string> | boolean;
          }[]
      >,
      default: (): string[] | number[] | Array<string> | boolean => [],
      required: true,
    },
    value: {
      type: [String, Number, Array, Boolean],
      default: "",
      required: true,
    },
  },
  methods: {
    emitValue(value: string | number | Array<string> | boolean): void {
      this.$emit("emit-value", value);
    },
  },
});
</script>
