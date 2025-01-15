import assert from "node:assert/strict";
import test, { suite } from "node:test";

import fromEvent from "../from-event.js";

suite("async/generators/from-event", () => {
  test("from event", async () => {
    const target = new EventTarget();
    const listener = fromEvent("foo", target);
    const iter = listener[Symbol.asyncIterator]();
    const fooEvents = [new Event("foo"), new Event("foo")];

    target.dispatchEvent(fooEvents[0]);
    target.dispatchEvent(fooEvents[1]);

    assert.deepEqual(await iter.next(), { value: fooEvents[0], done: false });
    assert.deepEqual(await iter.next(), { value: fooEvents[1], done: false });
  });

  test("ok on empty buffer", async () => {
    const target = new EventTarget();
    const listener = fromEvent("foo", target);
    const iter = listener[Symbol.asyncIterator]();
    const fooEvents = [new Event("foo"), new Event("foo"), new Event("foo")];

    globalThis.setTimeout(() => {
      target.dispatchEvent(fooEvents[0]);
      target.dispatchEvent(fooEvents[1]);
    }, 50);

    assert.deepEqual(await iter.next(), { value: fooEvents[0], done: false });
    assert.deepEqual(await iter.next(), { value: fooEvents[1], done: false });

    globalThis.setTimeout(() => {
      target.dispatchEvent(fooEvents[2]);
    }, 50);

    assert.deepEqual(await iter.next(), { value: fooEvents[2], done: false });
  });

  test("`.return` removes the listener", async () => {
    const target = new EventTarget();
    const listener = fromEvent("foo", target);
    const iter = listener[Symbol.asyncIterator]();

    const fooEvents = [new Event("foo"), new Event("foo"), new Event("foo")];

    target.dispatchEvent(fooEvents[0]);
    target.dispatchEvent(fooEvents[1]);

    assert.deepEqual(await iter.next(), { value: fooEvents[0], done: false });
    assert.deepEqual(await iter.next(), { value: fooEvents[1], done: false });

    listener.return();

    target.dispatchEvent(fooEvents[2]);

    assert.equal((await iter.next()).done, true);
  });

  test("`.throw` removes the listener", async () => {
    const target = new EventTarget();
    const listener = fromEvent("foo", target);
    const iter = listener[Symbol.asyncIterator]();

    const fooEvents = [new Event("foo"), new Event("foo"), new Event("foo")];

    target.dispatchEvent(fooEvents[0]);
    target.dispatchEvent(fooEvents[1]);

    assert.deepEqual(await iter.next(), { value: fooEvents[0], done: false });
    assert.deepEqual(await iter.next(), { value: fooEvents[1], done: false });

    await assert.rejects(() => listener.throw(new Error("error")));

    target.dispatchEvent(fooEvents[2]);

    assert.equal((await iter.next()).done, true);
  });
});
