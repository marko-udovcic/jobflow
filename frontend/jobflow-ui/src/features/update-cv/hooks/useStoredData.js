import { useEffect, useRef } from "react";

export const useStoredData = (localStorageKey, storedData, setList) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (
      !initializedRef.current &&
      storedData &&
      (Array.isArray(storedData) ? storedData.length > 0 : !!storedData)
    ) {
      const savedData =
        JSON.parse(localStorage.getItem(localStorageKey)) || (Array.isArray(storedData) ? [] : {});

      if (Array.isArray(savedData) ? savedData.length === 0 : Object.keys(savedData).length === 0) {
        setList(storedData);
        localStorage.setItem(localStorageKey, JSON.stringify(storedData));
      }

      initializedRef.current = true;
    }
  }, [localStorageKey, storedData, setList]);
};
