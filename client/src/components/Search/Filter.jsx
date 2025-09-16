


import React, { useState } from "react";

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    gender: "",
    minPrice: "",
    maxPrice: "",
    amenities: [],
    isAvailable: undefined,
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    let updated = [...filters.amenities];
    if (checked) {
      updated.push(value);
    } else {
      updated = updated.filter((a) => a !== value);
    }
    const newFilters = { ...filters, amenities: updated };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleAvailability = (e) => {
    const value = e.target.value;
    const newFilters = {
      ...filters,
      isAvailable: value === "" ? undefined : value === "true",
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className=" p-4 border rounded-lg shadow-md h-fit">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Gender */}
      <label className="block mb-2">Gender</label>
      <select
        name="gender"
        value={filters.gender}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-4"
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="unisex">Unisex</option>
      </select>

      {/* State */}
      <label className="block mb-2">State</label>
      <input
        type="text"
        name="state"
        value={filters.state}
        onChange={handleChange}
        placeholder="Enter state"
        className="w-full border rounded p-2 mb-4"
      />

      {/* City */}
      <label className="block mb-2">City</label>
      <input
        type="text"
        name="city"
        value={filters.city}
        onChange={handleChange}
        placeholder="Enter city"
        className="w-full border rounded p-2 mb-4"
      />

      {/* Price */}
      <label className="block mb-2">Price Range</label>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min"
          className="w-1/2 border rounded p-2"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max"
          className="w-1/2 border rounded p-2"
        />
      </div>

      {/* Facilities */}
      <label className="block mb-2">Facilities</label>
      <div className="flex flex-col gap-1 mb-4">
        {["wifi", "laundry", "food", "ac"].map((f) => (
          <label key={f}>
            <input
              type="checkbox"
              value={f}
              checked={filters.amenities.includes(f)}
              onChange={handleAmenityChange}
            />{" "}
            {f}
          </label>
        ))}
      </div>

      {/* Availability */}
      <label className="block mb-2">Availability</label>
      <select
        value={filters.isAvailable === undefined ? "" : filters.isAvailable}
        onChange={handleAvailability}
        className="w-full border rounded p-2"
      >
        <option value="">All</option>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>
    </div>
  );
};

export default Filter;
