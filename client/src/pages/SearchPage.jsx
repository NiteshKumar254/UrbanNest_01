

import React from 'react';
import Filter from '../components/Search/Filter';
import ProductList from '../components/Search/ProductList';
import { useSearch } from '../context/Search';

const SearchPage = () => {
  const [search] = useSearch();

  return (
    <div className="flex justify-between ml-[9rem] mr-[9rem] mt-[5rem]">
      <Filter />
      <ProductList products={search.results} />
    </div>
  );
};

export default SearchPage;

