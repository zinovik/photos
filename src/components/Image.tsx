import React from "react";
import { useSearchParams } from "react-router-dom";
import { ImageInterface } from "../types";

interface Props {
  image: ImageInterface;
}

export const Image = ({ image }: Props) => {
  const { url, description } = image;
  const [filename] = url.split("/").slice(-1);

  const [searchParams, setSearchParams] = useSearchParams();

  const isFullScreen = filename === searchParams.get("image");

  const handleImageClick = (): void => {
    setSearchParams(isFullScreen ? {} : { image: filename });
  };

  return (
    <>
      <img
        src={url}
        width={isFullScreen ? 800 : 400}
        height={isFullScreen ? 600 : 300}
        onClick={handleImageClick}
      />
      <p>{description}</p>
    </>
  );
};
