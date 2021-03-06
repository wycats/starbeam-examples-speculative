declare module "starbeam" {
  export function State<R extends AnyRecord>(record: R): R;

  export interface Reactive<T> {
    readonly current: T;
  }

  export type IntoReactive<T> = T | Reactive<T>;

  export type AnyRecord = {
    [P in keyof any]: unknown;
  };

  export type AnyTuple = readonly unknown[];

  export type ReactiveRecord<R extends AnyRecord> = {
    readonly [P in keyof R]: IntoReactive<R[P]>;
  };

  export type ReactiveTuple<R extends AnyTuple> = {
    readonly [P in keyof R]: IntoReactive<R[P]>;
  };

  export interface Hook<Args extends AnyTuple, State> {
    create(...args: Args): State;
  }

  export interface UseHook<Args extends AnyTuple, State> {
    (...args: ReactiveTuple<Args>): State;
  }

  export class Resource {
    constructor(...args: AnyTuple);
  }

  export type ArgsFor<R extends Resource> = R extends {
    new (...args: infer A): any;
  }
    ? A
    : never;

  export function Hook<Args extends AnyTuple, State>(
    create: (...args: Args) => State
  ): UseHook<Args, State>;
  export function Hook<Args extends AnyTuple, State>(
    hook: Hook<Args, State>
  ): UseHook<Args, State>;
  export function Hook<R extends { new (...args: AnyTuple): unknown }>(
    resource: R
  ): UseHook<ConstructorParameters<R>, InstanceType<R>>;

  export function onTeardown<T extends object>(
    value: T,
    callback: (value: T) => void
  ): void;

  export function onDestroy(callback: () => void): object;

  export function reactive(target: object, name: string): void;
}
