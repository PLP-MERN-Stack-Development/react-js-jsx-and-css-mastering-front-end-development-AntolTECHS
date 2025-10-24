import { useState, useEffect } from "react";
import API from "../services/api";

export function useApi(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    API.get(endpoint)
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
