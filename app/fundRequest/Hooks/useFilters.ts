import { useState } from 'react';

type FilterOptions = {
  fromDate?: string;
  toDate?: string;
  name?: string; // future use
};

// T must have createdAt
export const useFilters = <T extends { createdAt: string }>(data: T[]) => {
  const [filteredData, setFilteredData] = useState<T[]>(data);

  console.log(filteredData);

  const applyFilters = ({ fromDate, toDate }: FilterOptions) => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const result = data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const matchDate = (!from || itemDate >= from) && (!to || itemDate <= to);
      return matchDate;
    });

    setFilteredData(result);
  };

  console.log(filteredData);
  return { filteredData, applyFilters };
};
