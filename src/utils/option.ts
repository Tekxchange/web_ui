type Utils<T = never> = {
  /**
   * For use in converting an `Option<T>` to `T | undefined`
   */
  readonly raw: T | undefined;
};

export type Some<T> = {
  readonly value: T;
  readonly isSome: true;
} & Utils<T>;

export type None = {
  readonly isSome: false;
} & Utils;

export type Option<T> = Some<T> | None;

function createUtils<T = never>(value?: T): Utils<T> {
  return {
    raw: value,
  };
}

export function none(): None {
  return {
    isSome: false,
    ...createUtils(),
  };
}

export function some<T>(value: T): Some<T> {
  return {
    isSome: true,
    value,
    ...createUtils(value),
  };
}

export function option<T = never>(value?: T): Option<T> {
  if (value) {
    return some(value);
  }
  return none();
}
