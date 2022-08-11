import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Section } from "./Section";
import { getSectionsWithImages } from "../services";
import { getLinks } from "../services/helper";
import { SectionTree } from "../types";

export const SectionPage = () => {
  const { section, "*": sections = "" } = useParams();

  const path = `${section}/${sections}`.replace(/\/+$/, "");

  const [sectionsWithImages, setSectionWithImages] = useState(
    [] as SectionTree[]
  );

  useEffect(() => {
    getSectionsWithImages(path).then((result) => setSectionWithImages(result));
  }, [path]);

  const [sectionWithImages] = sectionsWithImages;

  if (!sectionWithImages) return null;

  const links = getLinks(path);

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
        <Section sectionTree={sectionWithImages} path={path} />
      </main>
    </>
  );
};
