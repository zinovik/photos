import React from "react";
import { Link } from "react-router-dom";
import { Image } from "./Image";
import { SectionTree } from "../types";

interface Props {
  sectionTree: SectionTree;
  path: string;
}

export const Section = ({ sectionTree, path }: Props) => {
  const { section, images, children } = sectionTree;

  return (
    <>
      <main>
        <h3>
          {section.path === path && section.title}
          {section.path !== path && (
            <Link to={`/${section.path}`}>{section.title}</Link>
          )}
        </h3>

        {section.text && <p>{section.text}</p>}

        {images.map((image) => (
          <Image image={image} />
        ))}

        <p>
          {children.map((child) => (
            <Section sectionTree={child} path={path} />
          ))}
        </p>
      </main>
    </>
  );
};
