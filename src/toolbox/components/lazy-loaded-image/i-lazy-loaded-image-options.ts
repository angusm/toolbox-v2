interface ILazyLoadedImageOptions {
  getLoadedCssClass?: (
    imageElement: HTMLImageElement | HTMLElement,
    imageUrl: string
  ) => string;
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
