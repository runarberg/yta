import test from "ava";

import fromEvent from "../from-event.js";

test("from event", async (t) => {
  const target = new EventTarget();
  const listener = fromEvent("foo", target);
  const iter = listener[Symbol.asyncIterator]();
  const fooEvents = [new Event("foo"), new Event("foo")];

  target.dispatchEvent(fooEvents[0]);
  target.dispatchEvent(fooEvents[1]);

  t.deepEqual(await iter.next(), { value: fooEvents[0], done: false });
  t.deepEqual(await iter.next(), { value: fooEvents[1], done: false });
});

test("ok on empty buffer", async (t) => {
  const target = new EventTarget();
  const listener = fromEvent("foo", target);
  const iter = listener[Symbol.asyncIterator]();
  const fooEvents = [new Event("foo"), new Event("foo"), new Event("foo")];

  globalThis.setTimeout(() => {
    target.dispatchEvent(fooEvents[0]);
    target.dispatchEvent(fooEvents[1]);
  }, 50);

  t.deepEqual(await iter.next(), { value: fooEvents[0], done: false });
  t.deepEqual(await iter.next(), { value: fooEvents[1], done: false });

  globalThis.setTimeout(() => {
    target.dispatchEvent(fooEvents[2]);
  }, 50);

  t.deepEqual(await iter.next(), { value: fooEvents[2], done: false });
});

test("`.return` removes the listener", async (t) => {
  const target = new EventTarget();
  const listener = fromEvent("foo", target);
  const iter = listener[Symbol.asyncIterator]();

  const fooEvents = [new Event("foo"), new Event("foo"), new Event("foo")];

  target.dispatchEvent(fooEvents[0]);
  target.dispatchEvent(fooEvents[1]);

  t.deepEqual(await iter.next(), { value: fooEvents[0], done: false });
  t.deepEqual(await iter.next(), { value: fooEvents[1], done: false });

  listener.return();

  target.dispatchEvent(fooEvents[2]);

  t.is((await iter.next()).done, true);
});

test("`.throw` removes the listener", async (t) => {
  const target = new EventTarget();
  const listener = fromEvent("foo", target);
  const iter = listener[Symbol.asyncIterator]();

  const fooEvents = [new Event("foo"), new Event("foo"), new Event("foo")];

  target.dispatchEvent(fooEvents[0]);
  target.dispatchEvent(fooEvents[1]);

  t.deepEqual(await iter.next(), { value: fooEvents[0], done: false });
  t.deepEqual(await iter.next(), { value: fooEvents[1], done: false });

  await t.throwsAsync(() => listener.throw(new Error("error")));

  target.dispatchEvent(fooEvents[2]);

  t.is((await iter.next()).done, true);
});
