import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { AppDispatch, RootState } from './createStore';

export const useDispatch = useReduxDispatch.withTypes<AppDispatch>();
export const useSelector = useReduxSelector.withTypes<RootState>();
