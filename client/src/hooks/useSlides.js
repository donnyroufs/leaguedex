import { useEffect, useRef, useState } from "react";

export function Slide({ title, body, src }) {
  this.title = title;
  this.body = body;
  this.src = src;
}

export function useSlides(slides = [], { speed }) {
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(true);

  const SPEED = speed * 1000;
  const timeId = useRef(null);

  const currentSlide = slides[slide];

  function handleNext() {
    if (slide === slides.length - 1) {
      setSlide(0);
      return;
    }

    setSlide((curr) => curr + 1);
  }

  function handlePrev() {
    if (slide === 0) {
      setSlide(slides.length - 1);
      return;
    }

    setSlide((curr) => curr - 1);
  }

  function start() {
    if (playing) return;
    setPlaying(true);
  }

  function stop() {
    setPlaying(false);
  }

  function handleNextAndStop() {
    handleNext();
    setPlaying(false);
  }

  function handlePrevAndStop() {
    handlePrev();
    setPlaying(false);
  }

  useEffect(() => {
    if (slides.length > 0 && playing) {
      timeId.current = setInterval(() => {
        handleNext();
      }, SPEED);
    }

    return () => {
      clearInterval(timeId.current);
    };
  }, [slides, slide, playing, SPEED]);

  return {
    currentSlide,
    handleNext: handleNextAndStop,
    handlePrev: handlePrevAndStop,
    start,
    stop,
  };
}
