/**
 * Loads an image, returns a promise indicating when the image loads or errors.
 * @param imageUrl The URL of the image to load.
 * @return Promise that resolves when the image loads. Rejects on error.
 */
function loadImage(imageUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image), {once: true});
    image.addEventListener('error', () => reject(image), {once: true});
    image.src = imageUrl;
  });
}

export {loadImage};
