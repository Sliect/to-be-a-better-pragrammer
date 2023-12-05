import { useState, useCallback } from 'react';

const doc: any = document;
const { documentElement } = document;

const requestFullscreen = (elem) => {
  const method =
    documentElement.requestFullscreen || // W3C
    // @ts-ignore
    documentElement.webkitRequestFullscreen || // Chrome等
    // @ts-ignore
    documentElement.mozRequestFullScreen || // FireFox
    // @ts-ignore
    documentElement.msRequestFullscreen; // IE11

  method?.call(elem);
};

const exitFullscreen = () => {
  const method =
    doc.exitFullscreen || // W3C
    doc.mozCancelFullScreen || // firefox
    doc.webkitExitFullscreen || // Chrome等
    doc.msExitFullscreen; // IE11

  method?.call(doc);
};

/**
 * 全屏切换
 * @returns
 */
export default function useFullScreen(): [boolean, (elem?: HTMLElement) => void] {
  const [isFullScreen, setIsFullScreen] = useState(false);
  /**
   * 切换全屏展示
   */
  const toggle = useCallback(
    (elem?: HTMLElement) => {
      if (isFullScreen) {
        exitFullscreen();
        setIsFullScreen(false);
      } else {
        requestFullscreen(elem);
        setIsFullScreen(true);
      }
    },
    [isFullScreen],
  );

  return [isFullScreen, toggle];
}
