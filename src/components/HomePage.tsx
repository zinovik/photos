import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "./Image";
import { getSectionsWithImages } from "../services";
import { SectionWithImages } from "../types";

export const HomePage = () => {
  const [sectionsWithImages, setSectionsWithImages] = useState(
    [] as SectionWithImages[]
  );

  useEffect(() => {
    getSectionsWithImages().then((result) => setSectionsWithImages(result));
  }, []);

  return (
    <>
      <main>
        <p>gallery</p>
      </main>

      <nav>
        {!sectionsWithImages.length && <>Loading</>}

        {sectionsWithImages.map(({ section, images }) => (
          <div>
            <h2>
              <Link to={`/${section.path}`}>{section.title}</Link>
            </h2>

            {images.map((image) => (
              <Image image={image} />
            ))}

            {section.text && <p>{section.text}</p>}
            <br />
          </div>
        ))}
      </nav>
    </>
  );
};
