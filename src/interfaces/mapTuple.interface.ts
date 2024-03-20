export type MapToTuple<T> = [keyof T, keyof any][];
export type MapTuple<T, Y> = [keyof T, keyof Y][];
export type MapFromTuble<T> = [keyof any, keyof T][];
