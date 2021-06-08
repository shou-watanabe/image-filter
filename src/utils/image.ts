import sizeOf from "image-size";
import { Image } from "@/types/image";

export const getImageDetail = (imagePath: string): Image | undefined => {
  // imagePathがデフォルトの場合undefinedとする
  if (imagePath === "") return undefined;

  // imagePathの画像のwidthとheightを取得
  try {
    const { width, height } = sizeOf(imagePath);
    // 取得できなかった場合はundefinedとする
    if (!height || !width) throw "could not get the size properly";

    const image: Image = {
      path: imagePath,
      width: width,
      height: height,
    };

    return image;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const calcImageScale = (
  image: Image | undefined,
  canvas: { width: number; height: number }
): number | undefined => {
  if (image === undefined) return undefined;
  const canvasAspect = canvas.width / canvas.height;
  const imageAspect = image.width / image.height;

  if (imageAspect >= canvasAspect) return canvas.width / image.width;
  else return canvas.height / image.height;
};
