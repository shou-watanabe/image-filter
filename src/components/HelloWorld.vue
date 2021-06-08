<template>
  <v-container>
    <v-btn @click="a">aaa</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import path from "path";
import { spawn } from "child_process";
import { pythonPath } from "@/config/index";

export default Vue.extend({
  name: "HelloWorld",
  methods: {
    a() {
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
        return;
      });
    },
  },
});
</script>
