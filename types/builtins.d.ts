declare module "@starbeam/reactive" {
  export type ReactiveArray<T> = T[];
  export type ReactiveObject<
    R extends Record<string, unknown> = Record<string, unknown>
  > = R;

  export function State<
    R extends Record<string, unknown> = Record<string, unknown>
  >(record: R): ReactiveObject<R>;
}
