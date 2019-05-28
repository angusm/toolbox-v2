interface ILazyLoadedImageOptions {
  getLoadedCssClass?: (imageElement: HTMLImageElement | HTMLElement) => string;
  getLoadDistance?: (
    imageElement: HTMLImageElement | HTMLElement,
    imageUrl: string
  ) => number;
  callbacks?: ((
    imageElement: HTMLImageElement | HTMLElement,
    imageUrl: string
  ) => void)[];
}

export { ILazyLoadedImageOptions };
