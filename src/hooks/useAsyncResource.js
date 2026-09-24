import { useCallback, useEffect, useState } from 'react';

export function useAsyncResource(load, dependencies = []) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  const refresh = useCallback(async (force = true) => {
    setState((current) => ({ ...current, error: null, loading: true }));
    try {
      const data = await load({ force });
      setState({ data, error: null, loading: false });
    } catch (error) {
      setState((current) => ({ ...current, error, loading: false }));
    }
  // load is supplied by a stable hook callback, so i can safely ignore it in the deps array. eslint-disable-next-line react-hooks/exhaustive-deps. 
  }, dependencies);

  useEffect(() => { refresh(false); }, [refresh]);
  return { ...state, refresh };
}
