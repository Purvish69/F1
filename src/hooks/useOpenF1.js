import { useCallback } from 'react';
import { useAsyncResource } from './useAsyncResource.js';
import * as openF1 from '../api/openf1.js';

export function useOpenF1(loader, dependencies = []) {
  const load = useCallback((options) => loader(options), [loader, ...dependencies]);
  return useAsyncResource(load, [load]);
}

export { openF1 };
