import { useState } from "react";
import InputRadio from "./InputRadio";
import { selectFilter, selectSort } from "../../constants";
import { useFilter } from "../../context/FilterContext";
import ic_filter from "../../assets/svgs/ic_filter.svg";
import { assetsSvg } from "../../constants/assets";

export default function FilterUi() {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const { selectedFilter, setSelectedFilter, selectedSort, setSelectedSort } =
    useFilter();

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
    setShowSortDropdown(false);
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
    setShowFilterDropdown(false);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setShowFilterDropdown(false);
  };

  const handleSortSelect = (sort: string) => {
    setSelectedSort(sort);
    setShowSortDropdown(false);
  };

  return (
    <div className="flex justify-between items-center bg-white p-3 text-h5 relative z-10">
      {/* Filter Section */}
      <div
        className="text-text flex items-center gap-1 cursor-pointer"
        onClick={toggleFilterDropdown}
      >
        <img className="h-4 w-4" src={ic_filter} alt="ic_filter" /> Hiển thị:{" "}
        <span className="font-medium">{selectedFilter}</span>
        {showFilterDropdown && (
          <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-md rounded-md z-20 py-1">
            <ul>
              {selectFilter.map((item, index) => (
                <InputRadio
                  key={index}
                  title={item.title}
                  selected={selectedFilter}
                  handleSelect={() => handleFilterSelect(item.title)}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sort Section */}
      <div
        className="flex text-text items-center gap-1 cursor-pointer"
        onClick={toggleSortDropdown}
      >
        Sắp xếp:<span className="font-medium">{selectedSort}</span>
        <img
          className="h-4 w-4 p-[3px]"
          src={assetsSvg.ic_double_arows}
          alt="ic_filter"
        />
        {showSortDropdown && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-md rounded-md z-20 py-1">
            <ul>
              {selectSort.map((item, index) => (
                <InputRadio
                  key={index}
                  title={item.title}
                  selected={selectedSort}
                  handleSelect={() => handleSortSelect(item.title)}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
