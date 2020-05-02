import { FunctionalComponent} from 'preact';
import { FromFn } from './types';

export type Fc<T> = FromFn<FunctionalComponent<T>>;