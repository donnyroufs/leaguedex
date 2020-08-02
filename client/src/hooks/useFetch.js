import { useState, useEffect } from "react";

const useFetch = (endpoint, initialState = []) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [endpoint]);

  return { data, error, loading };
};

export default useFetch;
