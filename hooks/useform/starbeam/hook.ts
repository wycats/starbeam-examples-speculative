import { State } from "@starbeam/reactive";
import { FormEvent, SyntheticEvent } from "react";
import { Hook, Resource } from "starbeam";

class Form extends Resource {
  readonly #callback: () => void;
  readonly values = State({ email: null, password: null });

  constructor(callback: () => void) {
    super();
    this.#callback = callback;
  }

  onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    this.#callback();
  };

  onChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    // you don't need to do this anymore, but you could, and this would work.
    event.persist();

    this.values[event.currentTarget.name] = event.currentTarget.value;
  };
}

export default Hook(Form);
