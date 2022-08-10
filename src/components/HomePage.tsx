import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSectionsWithImages } from "../services";
import { SectionTree } from "../types";

function HomePage() {
  const [sectionsWithImages, setSectionsWithImages] = useState(
    [] as SectionTree[]
  );

  useEffect(() => {
    getSectionsWithImages().then((result) => setSectionsWithImages(result));
  }, []);

  console.log(123, sectionsWithImages);

  return (
    <>
      <main>Home Page</main>
      <nav>
        {!sectionsWithImages.length && <>Loading</>}

        {sectionsWithImages &&
          sectionsWithImages.map(({ section, images }) => (
            <div>
              <Link to={`/${section.path}`}>{section.title}</Link>
              {images[0] && <div>{images[0].url}</div>}
            </div>
          ))}
      </nav>
    </>
  );
}

export default HomePage;
