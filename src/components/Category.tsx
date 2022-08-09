import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { getCategories } from '../services/categories';
import { getPhotos } from '../services/photos';
import { Category } from '../types/Category';
import { Photo } from '../types/Photo';

export default function CategoryPage() {
  const { category } = useParams();

  if (!category) {
    return null;
  }

  const [categories, setCategories] = useState(null as Category[] | null);
  const [photos, setPhotos] = useState(null as Photo[] | null);

  useEffect(() => {
    getCategories(category).then((result) => setCategories(result));
    getPhotos(category).then((result) => setPhotos(result));
  }, []);

  return (
    <>
      <main>
        <h2>{category}</h2>
        <p>
          {categories && categories.map(c => c.title)}

          {photos && photos.map(c => c.url)}
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
