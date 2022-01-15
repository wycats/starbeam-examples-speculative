import { Hook, onDestroy, State } from "starbeam";
import { useState } from "react";

// Implementing a hook using starbeam
const useInterval = Hook(
  (callback: () => void, delay: number): object => {
    let token = setInterval(callback, delay);
    return onDestroy(() => clearInterval(token))
  }
);

// You can use starbeam in your app's React component
function CounterStarbeam() {
  let state = State({ count: 0 });

  useInterval(() => {
    state.count++;
  }, 1000);

  return <h1>{state.count}</h1>;
}

// But you're also free to use normal React here
function CounterHooks() {
  let [count, setCount] = useState(0);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
}
