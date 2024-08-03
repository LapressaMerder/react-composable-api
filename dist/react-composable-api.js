/**
 * React composable api
 * (c) 2024 Leto (Mikhail)
 * @license MIT
 * @link https://react-composable.com
 **/
import { useRef as i, useEffect as a, useState as v, useMemo as m } from "react";
/**
 * React composable api
 * (c) 2024 Leto (Mikhail)
 * @license MIT
 * @link https://react-composable.com
 **/
function w(n) {
  const e = new CustomEvent(n.name, {
    detail: {
      payload: n.payload
    }
  }), t = () => document.dispatchEvent(e);
  return {
    name: n.name,
    event: e,
    dispatch: t
  };
}
function A(n, e) {
  const t = typeof n, u = {
    set(r, o, c) {
      return o === "value" ? (r[o] = c, e(r.value), !0) : !1;
    }
  }, f = {
    set(r, o, c) {
      return r[o] = c, e(Array.isArray(r) ? [...r] : { ...r }), !0;
    },
    deleteProperty(r, o) {
      return delete r[o], e(Array.isArray(r) ? [...r] : { ...r }), !0;
    }
  }, d = {
    apply(r, o, c) {
      return r.apply(o, c);
    }
  };
  if (t === "string" || t === "boolean" || t === "symbol") {
    const r = { value: n };
    return new Proxy(r, u);
  } else if (t === "number") {
    const r = { value: n };
    return new Proxy(r, {
      ...u,
      set(o, c, l) {
        return c === "value" ? typeof l == "number" ? (o[c] = l, e(o.value), !0) : (console.warn("New value must be a number"), !1) : !1;
      }
    });
  } else {
    if (Array.isArray(n))
      return new Proxy(n, f);
    if (t === "object" && n !== null)
      return new Proxy(n, f);
    if (t === "function")
      return new Proxy(n, d);
    throw new Error("Unsupported data type");
  }
}
function E(n) {
  const [e, t] = v(n);
  return m(() => A(e, t), [e]);
}
function O(n, e) {
  Array.isArray(n) || (n = [n]);
  const t = i(!1);
  a(() => {
    if (!t.current) {
      t.current = !0;
      return;
    }
    e();
  }, n);
}
function P(n) {
  const e = i(!1);
  a(() => {
    e.current || (n(), e.current = !0);
  }, [n]);
}
function h(n) {
  const e = i(!1), t = i(!1);
  a(() => {
    if (!e.current) {
      e.current = !0;
      return;
    }
    t.current || (n(), t.current = !0);
  }, [n]);
}
function x(n) {
  a(() => {
    n();
  });
}
function M(n) {
  const e = i(!1);
  a(() => () => {
    e.current ? n() : e.current = !0;
  }, []);
}
function U(n, e) {
  const t = (u) => e(u.detail.payload);
  a(() => (document.addEventListener(n, t), () => {
    document.removeEventListener(n, t);
  }), []);
}
function s(n) {
  if (n === null || typeof n != "object")
    return n;
  if (Array.isArray(n)) {
    const t = [];
    for (let u = 0; u < n.length; u++)
      t[u] = s(n[u]);
    return t;
  }
  const e = {};
  for (const t in n)
    Object.prototype.hasOwnProperty.call(n, t) && (e[t] = s(n[t]));
  return e;
}
function b(n) {
  const e = s(n);
  return y(e), E(e);
}
function y(n) {
  if (typeof n == "object" && n !== null)
    for (let e in n)
      Object.prototype.hasOwnProperty.call(n, e) && (typeof n[e] == "object" && n[e] !== null ? y(n[e]) : n[e] = p(n[e]));
}
const p = b, R = O, g = P, B = h, C = x, I = M, L = U, N = {
  ref: p,
  createEvent: w,
  onEvent: L,
  watch: R,
  onBeforeMount: g,
  onMounted: B,
  onUpdate: C,
  onUnmount: I
};
export {
  w as createEvent,
  N as default,
  g as onBeforeMount,
  L as onEvent,
  B as onMounted,
  I as onUnmount,
  C as onUpdate,
  p as ref,
  R as watch
};
