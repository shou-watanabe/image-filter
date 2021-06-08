export interface ValidateExtResult {
  isValid: boolean;
  imageList: string[];
}

export interface Image {
  path: string;
  width: number;
  height: number;
}
