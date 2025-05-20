import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  currentCategory: number;
  setCurrentCategory: (index: number) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [currentCategory, setCurrentCategory] = useState(99);
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [selectedSort, setSelectedSort] = useState("Mới nhất");

  return (
    <FilterContext.Provider
      value={{
        currentCategory,
        setCurrentCategory,
        selectedFilter,
        setSelectedFilter,
        selectedSort,
        setSelectedSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
