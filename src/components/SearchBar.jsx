import { MapPin, Search } from "lucide-react";
import React from "react";
import { useJobs } from "../context/JobContext";

const JOB_TYPES = [
  { value: "all", label: "All Types" },
  { value: "full-time", label: "Full Time" },
  { value: "contract", label: "Contract" },
  { value: "part-time", label: "Part Time" },
];

const SearchBar = () => {
  const { filters, setFilters } = useJobs();

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleLocationChange = (e) => {
    setFilters((prev) => ({ ...prev, location: e.target.value }));
  };

  const handleTypeChange = (e) => {
    setFilters((prev) => ({ ...prev, type: e.target.value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={20}
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label="Search jobs or companies"
          />
        </div>

        <div className="relative">
          <MapPin
            className="absolute left-3 top-3 text-gray-400"
            size={20}
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Location..."
            value={filters.location}
            onChange={handleLocationChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label="Filter by location"
          />
        </div>

        <select
          value={filters.type}
          onChange={handleTypeChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Filter by job type"
        >
          {JOB_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
