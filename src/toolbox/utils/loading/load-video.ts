/**
 * Loads a video, returns a promise indicating when the video loads or errors.
 * @param videoUrl The URL of the video to load.
 * @return Promise that resolves when the video loads. Rejects on error.
 */
function loadVideo(videoUrl: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.addEventListener('canplay', () => resolve(video), { once: true });
    video.addEventListener('error', () => reject(video), { once: true });
    video.src = videoUrl;
  });
}

export { loadVideo };
