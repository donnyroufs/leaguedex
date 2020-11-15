import { useState, useEffect } from "react";
import { API } from "../api";

export function useMeQuery() {
  const [me, setMe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.fetchMe()
      .then((res) => res.json())
      .then((data) => setMe(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return {
    me,
    error,
    loading,
    setMe,
  };
}
