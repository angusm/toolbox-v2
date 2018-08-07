/**
 * Created by angusm on 07/08/18.
 */
function isVideoReady(video: HTMLMediaElement): boolean {
  return !isNaN(video.duration);
}

export {isVideoReady};
