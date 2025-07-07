import { useState, useEffect } from 'react';

interface DateFilterOptions<T> {
  filteredData: T[];
  fromDate: string;
  toDate: string;
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
  applyFilters: () => void;
}

export const useDateFilter = <T extends { createdAt: string }>(data: T[]): DateFilterOptions<T> => {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // useEffect(() => {
  //   setFilteredData(data);
  // }, [data]);

  const applyFilters = () => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const result = data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      return (!from || itemDate >= from) && (!to || itemDate <= to);
    });

    setFilteredData(result);
  };

  return {
    filteredData,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    applyFilters,
  };
};