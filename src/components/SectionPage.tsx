import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSectionsWithImages } from "../services";
import { SectionTree } from "../types";

export default function SectionPage() {
  const { topLevelSection, "*": restPath = "" } = useParams();

  const fullPath = `${topLevelSection}${restPath}`;

  const [sectionsWithImages, setSectionWithImages] = useState(
    [] as SectionTree[]
  );

  useEffect(() => {
    getSectionsWithImages(fullPath).then((result) =>
      setSectionWithImages(result)
    );
  }, []);

  const [sectionWithImages] = sectionsWithImages;

  console.log(1, sectionsWithImages);

  if (!sectionWithImages) return null;

  return (
    <>
      <main>
        <h2>{sectionWithImages.section.title}</h2>
        <p>{sectionWithImages.sections.map(({ section }) => section.title)}</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
