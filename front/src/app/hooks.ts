import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { type AppDispatch, type Rootstate } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;
