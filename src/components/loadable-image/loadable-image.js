import React, { useEffect, useRef, useState } from "react";
import "./loadable-image.scss";

const useOnScreen = (ref, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);
  const current = ref.current;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [rootMargin, current]);
  return isIntersecting;
};

const LoadableImage = (props) => {
  const { src, alt = "", onLoad = () => {} } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const isVisible = useOnScreen(containerRef);

  useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }
    if (imageRef.current) {
      return (imageRef.current.onload = () => {
        setIsLoaded(true);
        onLoad();
      });
    }
  }, [isVisible, onLoad, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={isLoaded ? "containerLoadedImg" : "containerImg"}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          className={isLoaded ? "imageLoaded" : "image"}
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};

export default LoadableImage;
