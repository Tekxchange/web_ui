export type Some<T> = {
  readonly value: T;
  readonly isSome: true;
};

export type None = {
  readonly isSome: false;
};

export type Option<T> = Some<T> | None;

export function none(): None {
  return {
    isSome: false,
  };
}

export function some<T>(value: T): Some<T> {
  return {
    isSome: true,
    value,
  };
}
