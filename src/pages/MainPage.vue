<template>
  <MainTemplate
    :original-image-path="originalImagePath"
    :result-image-path="resultImagePath"
    :hist-graph-path="histGraphPath"
    @exec-filter="execFilter"
    @update-original-file-path="updateOriginalFilePath"
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
      originalImagePath: "",
      resultImagePath: "",
      histGraphPath: "",
    };
  },
  methods: {
    execFilter(): void {
      const pythonMainPath = path.resolve(pythonPath, "main.py");
      const filter_name = "laplacian";
      const outputDirPath = path.resolve(pythonPath, "output");
      // const imagePath = path.resolve(
      //   pythonPath,
      //   "sample_image",
      //   "fullcolor_sample_gray1.png"
      // );
      if (!this.originalImagePath) {
        console.log("error");
        return;
      }
      const pythonProcess = spawn("python", [
        pythonMainPath,
        filter_name,
        this.originalImagePath,
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
        const fileName: string = path.basename(this.originalImagePath);
        const fileExt: string = path.extname(fileName);
        const fileBaseName: string = path.basename(
          this.originalImagePath,
          fileExt
        );
        this.resultImagePath = path.resolve(outputDirPath, fileName);
        this.histGraphPath = path.resolve(
          outputDirPath,
          `${fileBaseName}_plt.png`
        );
        return;
      });
    },
    updateOriginalFilePath(path: string): void {
      this.originalImagePath = path;
    },
  },
});
</script>

<style scoped></style>
