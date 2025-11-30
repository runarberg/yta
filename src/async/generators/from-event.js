/**
 * Add an iterator by attaching an event listener. Will iterate over
 * every event that fire.
 *
 * Call `.return()` on the returned iterable to remove the listener and
 * return from any running iterators.
 *
 * ```js
 * import { pipe } from "yta";
 * import { filter, forEach, fromEvent, map } from "yta/async";
 *
 * const inputEvents = fromEvent("input", numberField);
 *
 * stopButton.addEventListener("click", () => {
 *   // Stops the stream and removes the listener.
 *   inputEvents.return();
 * });
 *
 * pipe(
 *  inputEvents,
 *  map((event) => event.target.valueAsNumber),
 *  filter((n) => !Number.isNaN(n)),
 *  forEach((n) => console.log(n)),
 * );
 * // Logs every number after an `input` event.
 * ```
 *
 * **Note:** Because of limitations with async iterators, each
 * iteration happens in the next tick. This might not be ideal if
 * event needs to be handle in the same loop. Look into Observable
 * for a better event driven structure.
 *
 * @template {EventTarget} Target
 * @template {Event} Ev
 * @template {string} Key
 * @param {Key} type
 * @param {Target} target
 * @returns {AsyncGenerator<Ev, void, void>}
 */
export default function fromEvent(type, target) {
  /** @type {Ev[]} */
  const buffer = [];
  let isListening = true;

  /**
   * @param {Ev} event
   */
  function handler(event) {
    buffer.push(event);
  }

  /**
   *
   */
  function cleanUp() {
    isListening = false;
    target.removeEventListener(type, /** @type {EventListener} */ (handler));
  }

  target.addEventListener(type, /** @type {EventListener} */ (handler));

  return {
    return() {
      cleanUp();

      return Promise.resolve({ value: undefined, done: true });
    },

    throw(error) {
      cleanUp();

      return Promise.reject(error);
    },

    async next() {
      // eslint-disable-next-line no-unmodified-loop-condition
      while (buffer.length === 0 && isListening) {
        await new Promise((resolve) => globalThis.setTimeout(resolve));
      }

      if (!isListening) {
        return { value: undefined, done: true };
      }

      const value = /** @type {Ev} */ (buffer.shift());
      return { value, done: false };
    },

    [Symbol.asyncIterator]() {
      return this;
    },

    async [Symbol.asyncDispose]() {
      cleanUp();
    },
  };
}
