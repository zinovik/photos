import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Section } from "./Section";
import { getSectionsWithImages } from "../services";
import { getLinks, getImagesFilenames } from "../services/helper";
import { SectionWithImages } from "../types";

export const SectionPage = () => {
  const { section, "*": sections = "" } = useParams();

  const path = `${section}/${sections}`.replace(/\/+$/, "");

  const [sectionsWithImages, setSectionWithImages] = useState(
    [] as SectionWithImages[]
  );

  useEffect(() => {
    getSectionsWithImages(path).then((result) => setSectionWithImages(result));
  }, [path]);

  const links = getLinks(path);

  const imagesNames = getImagesFilenames(sectionsWithImages);

  return (
    <>
      <nav>
        <br />
        <Link to="/">gallery</Link>
        {links.map((link) => (
          <>
            {" / "}
            <Link to={link.url}>{link.text}</Link>
          </>
        ))}
      </nav>

      <main>
        {sectionsWithImages.map((sectionWithImages) => (
          <Section
            sectionWithImages={sectionWithImages}
            path={path}
            imagesNames={imagesNames}
          />
        ))}
      </main>
    </>
  );
};
