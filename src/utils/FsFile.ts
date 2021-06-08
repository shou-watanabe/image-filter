import path from "path";
import { remote } from "electron";
import { ValidateExtResult } from "@/types/image";

export const validateExtension = (
  extList: string[],
  prependDots: boolean,
  files: string[]
): ValidateExtResult => {
  const testArray: string[] = [];
  if (prependDots) extList.forEach((ext) => testArray.push(`.${ext}`));
  else testArray.push(...extList);

  const imageList = files.filter((file) =>
    testArray.includes(path.extname(file).toLowerCase())
  );

  if (!imageList.length)
    return { isValid: false, imageList } as ValidateExtResult;

  return { isValid: true, imageList } as ValidateExtResult;
};

export const selectFile = async (
  title: string,
  allowedExtensions: string[],
  dialogExtensions?: { name: string; extensions: string[] }[]
): Promise<string> => {
  const result = await remote.dialog
    .showOpenDialog({
      title,
      defaultPath: ".",
      filters: dialogExtensions,
      properties: ["openFile"],
    })
    .catch((error) => {
      throw new Error(error);
    });

  if (result.canceled) return "canceled";

  if (!result.filePaths?.length) throw new Error("file selection was failed");

  const { isValid } = validateExtension(allowedExtensions, false, [
    result.filePaths[0],
  ]);

  if (!isValid) throw new Error("invalid type file selected");

  return result.filePaths[0];
};
