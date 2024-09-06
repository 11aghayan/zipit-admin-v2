import { useState } from "react";

export default function useScreen() {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const screen = width > 1000 ? 'lg' : width > 600 ? 'md' : 'sm';
  
  window.onresize = (e) => {
    const target = e.target as Window;
    const { innerWidth, innerHeight } = target;
    setWidth(innerWidth);
    setHeight(innerHeight);
  }

  return {screen, width, height} as { screen: 'lg' | 'md' | 'sm'; width: number; height: number };
}