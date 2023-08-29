import { DeepPartial } from './deep_partial.type';

export type EntityCondition<T> = {
  [key in keyof DeepPartial<T>]: number | string | EntityCondition<T>;
};