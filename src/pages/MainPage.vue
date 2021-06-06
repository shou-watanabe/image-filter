<template>
  <MainTemplate
    :result-image-path="resultImagePath"
    @exec-filter="execFilter"
  />
</template>

<script lang="ts">
import Vue from "vue";
import MainTemplate from "@/components/templates/MainTemplate.vue";
import path from "path";
import { spawn } from "child_process";
import { pythonPath } from "@/config/index";

export default Vue.extend({
  name: "MainPage",
  components: {
    MainTemplate,
  },
  data() {
    return {
      resultImagePath: "",
    };
  },
  methods: {
    execFilter(): void {
      const pythonMainPath = path.resolve(pythonPath, "main.py");
      const filter_name = "laplacian";
      const outputDirPath = path.resolve(pythonPath, "output");
      const imagePath = path.resolve(
        pythonPath,
        "sample_image",
        "fullcolor_sample_gray1.png"
      );
      const pythonProcess = spawn("python", [
        pythonMainPath,
        filter_name,
        imagePath,
        outputDirPath,
      ]);
      pythonProcess.stdout.on("data", (data) => {
        console.log(data.toString());
      });
      pythonProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });
      pythonProcess.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        if (code !== 0) {
          throw new Error();
        }
        this.resultImagePath = path.resolve(
          outputDirPath,
          "fullcolor_sample_gray1_laplacian4.png"
        );
        return;
      });
    },
  },
});
</script>

<style scoped></style>
