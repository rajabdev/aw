import { useDispatch } from 'react-redux';

import type { store } from '~store/store';

export type TAppDispatch = typeof store.dispatch;
export const useTypedDispatch: () => TAppDispatch = useDispatch;
