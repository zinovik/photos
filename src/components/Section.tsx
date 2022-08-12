import React from "react";
import { Link } from "react-router-dom";
import { Image } from "./Image";
import { getImageFilename } from "../services/helper";
import { SectionWithImages } from "../types";

interface Props {
  sectionWithImages: SectionWithImages;
  path: string;
  imagesNames: string[];
}

export const Section = ({ sectionWithImages, path, imagesNames }: Props) => {
  const { section, level, images } = sectionWithImages;

  return (
    <>
      <main>
        {level === 1 && <h2>{section.path === path && section.title}</h2>}
        {level === 2 && <h3>{section.path === path && section.title}</h3>}
        {level > 2 && <h4>{section.path === path && section.title}</h4>}

        {section.path !== path && level === 1 && (
          <h2>
            <Link to={`/${section.path}`}>{section.title}</Link>
          </h2>
        )}
        {section.path !== path && level === 2 && (
          <h3>
            <Link to={`/${section.path}`}>{section.title}</Link>
          </h3>
        )}
        {section.path !== path && level > 2 && (
          <h4>
            <Link to={`/${section.path}`}>{section.title}</Link>
          </h4>
        )}

        {section.text && <p>{section.text}</p>}

        {images.map((image) => {
          const currentIndex = imagesNames.indexOf(getImageFilename(image.url));
          const nextImageFilename =
            currentIndex < imagesNames.length - 1
              ? imagesNames[currentIndex + 1]
              : null;
          const previousImageFilename =
            currentIndex > 0 ? imagesNames[currentIndex - 1] : null;

          return (
            <Image
              image={image}
              nextImageFilename={nextImageFilename}
              previousImageFilename={previousImageFilename}
            />
          );
        })}
      </main>
    </>
  );
};
