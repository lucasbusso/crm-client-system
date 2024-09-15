import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface FilterContext {
  filter: string | null;
  setFilter: Dispatch<SetStateAction<string | null>>;
}

const FilterContext = createContext<FilterContext | null>(null);

export const FilterProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [filter, setFilter] = useState<string | null>(null);

  const value: FilterContext = {
    filter,
    setFilter,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("No filters context");
  } else {
    return context;
  }
};
