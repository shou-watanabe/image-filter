<template>
  <MainTemplate
    :original-image-path="originalImagePath"
    :result-image-path="resultImagePath"
    :hist-graph-path="histGraphPath"
    :filter-name="selectedFilterName"
    @exec-filter="execFilter"
    @update-original-file-path="updateOriginalFilePath"
    @update-filter-name="updateFilterName"
  />
</template>

<script lang="ts">
import Vue from "vue";
import MainTemplate from "@/components/templates/MainTemplate.vue";
import path from "path";
import { remote } from "electron";
import { spawn } from "child_process";
import { pythonPath } from "@/config/index";
import { E_MESSAGE_000, E_MESSAGE_001 } from "@/config/constantMessages";

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
      selectedFilterName: "laplacian",
    };
  },
  methods: {
    execFilter(): void {
      const pythonMainPath = path.resolve(pythonPath, "main.py");
      const outputDirPath = path.resolve(pythonPath, "output");

      if (!this.originalImagePath) {
        remote.dialog.showErrorBox(E_MESSAGE_000, E_MESSAGE_001);
        return;
      }
      // キャッシュ対策
      this.resultImagePath = "";
      this.histGraphPath = "";

      const pythonProcess = spawn("python", [
        pythonMainPath,
        this.selectedFilterName,
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
        // python側にエラーがあった場合、後続処理を行わない
        if (code !== 0) {
          throw new Error();
        }
        // ファイル名(拡張子付き)を取得
        const fileName: string = path.basename(this.originalImagePath);
        const fileExt: string = path.extname(fileName);
        // ファイル名のみ取得
        const fileBaseName: string = path.basename(
          this.originalImagePath,
          fileExt
        );
        // 処理後の画像を更新して表示
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
      // 元画像が切り替わるので初期化
      this.resultImagePath = "";
      this.histGraphPath = "";
    },
    updateFilterName(name: string): void {
      this.selectedFilterName = name;
      console.log(this.selectedFilterName);
    },
  },
});
</script>

<style scoped></style>
