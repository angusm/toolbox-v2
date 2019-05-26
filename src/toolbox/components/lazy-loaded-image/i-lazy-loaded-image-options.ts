interface ILazyLoadedImageOptions {
  getLoadedCssClass?: (
    imageElement: HTMLImageElement,
    imageUrl: string
  ) => string;
  getLoadDistance?: (
    imageElement: HTMLImageElement,
    imageUrl: string
  ) => number;
  callbacks?: ((imageElement: HTMLImageElement, imageUrl: string) => void)[];
}

export { ILazyLoadedImageOptions };
