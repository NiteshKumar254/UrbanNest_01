
import React, { useState, useEffect } from "react";
import Filter from "../components/Search/Filter";
import ProductList from "../components/Search/ProductList";
import { useSearch } from "../context/Search";

const SearchPage = () => {
  const [search] = useSearch();
  const [filtered, setFiltered] = useState(search.results);

  const handleFilter = (filters) => {
    // console.log("🟢 Applied Filters:", filters);
    let results = [...search.results];

    // Gender filter
    if (filters.gender) {
      results = results.filter(
        (p) => p.gender?.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    // Price filter
    if (filters.minPrice) {
      results = results.filter(
        (p) => Number(p.price) >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      results = results.filter(
        (p) => Number(p.price) <= Number(filters.maxPrice)
      );
    }

    // Facilities filter (case-insensitive)
    if (filters.amenities.length > 0) {
      results = results.filter((p) =>
        filters.amenities.every((a) =>
          p.facilities?.map((f) => f.toLowerCase()).includes(a.toLowerCase())
        )
      );
    }

    // Availability filter
    if (filters.isAvailable !== undefined) {
      results = results.filter((p) => p.isAvailable === filters.isAvailable);
    }

    // State filter
    if (filters.state) {
      results = results.filter((p) =>
        p.state?.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    // City filter
    if (filters.city) {
      results = results.filter((p) =>
        p.city?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    
    setFiltered(results);
  };

  // reset when new results come
  useEffect(() => {
    setFiltered(search.results);
  }, [search.results]);

  return (
    <div className="flex justify-between ml-[4rem] mr-[4rem] mt-[1rem]">
      <Filter onFilter={handleFilter} />
      <ProductList products={filtered} />
    </div>
  );
};

export default SearchPage;
