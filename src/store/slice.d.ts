import { StateCreator, StoreMutatorIdentifier } from 'zustand';

import { Store } from './index';

type DevToolsStateCreator<
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
> = StateCreator<T, [...Mps, ['zustand/devtools', never]], Mcs>;

type MyAppStateCreator = DevToolsStateCreator<Store>;

// Defines the type of a function used to create a slice of the store. The
// slice has access to all the store's actions and state, but only returns
// the actions and state necessary for the slice.
type SliceCreator<TSlice extends keyof Store> = (
  ...params: Parameters<MyAppStateCreator>
) => Pick<ReturnType<MyAppStateCreator>, TSlice>;
