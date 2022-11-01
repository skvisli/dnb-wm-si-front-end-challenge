import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { useDebouncedCallback } from "use-debounce";

interface Props<T> {
  list: T[];
  filterKeys: string[];
}

function useFilteredList<T>({ list, filterKeys }: Props<T>) {
  const [filteredList, setFilteredList] = useState(list);
  const [searchString, setSearchString] = useState("");
  const debouncedSetSearchString = useDebouncedCallback((value) => {
    setSearchString(value);
  }, 200);

  useEffect(() => {
    if (!searchString) {
      setFilteredList(list);
      return;
    }
    const fuse = new Fuse(list, { keys: filterKeys, threshold: 0.3 });
    setFilteredList(fuse.search(searchString).map((result) => result.item));
  }, [list, filterKeys, searchString]);

  return [filteredList, debouncedSetSearchString] as const;
}

export default useFilteredList;
