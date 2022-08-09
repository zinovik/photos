import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getCategories } from '../services/categories';
import { Category } from '../types/Category';

function HomePage() {
  const [categories, setCategories] = useState(null as Category[] | null);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <>
      <main>
        Main Page
      </main>
      <nav>
        {!categories && <>Loading</>}

        {categories && categories.map(category => <div><Link to={`/${category.slug}`}>{category.title}</Link></div>)}
      </nav>
    </>
  );
}

export default HomePage
