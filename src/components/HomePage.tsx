import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "./Image";
import { getSectionsWithImages } from "../services";
import { SectionTree } from "../types";

export const HomePage = () => {
  const [sectionsWithImages, setSectionsWithImages] = useState(
    [] as SectionTree[]
  );

  useEffect(() => {
    getSectionsWithImages().then((result) =>
      setSectionsWithImages([...result].reverse())
    );
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
            <Link to={`/${section.path}`}>{section.title}</Link>
            <br />
            <br />

            {images.map((image) => (
              <Image image={image} />
            ))}

            {section.text && <p>{section.text}</p>}
            <br />
            <br />
          </div>
        ))}
      </nav>
    </>
  );
};
