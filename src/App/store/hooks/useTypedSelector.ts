import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

import type { store } from '~store/store';

export type TRootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;
