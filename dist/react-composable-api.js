/**
 * React composable api
 * (c) 2024 Leto (Mikhail)
 * @license MIT
 * @link https://react-composable.com
 **/
import { useRef as a, useEffect as c, useState as d, useMemo as v } from "react";
/**
 * React composable api
 * (c) 2024 Leto (Mikhail)
 * @license MIT
 * @link https://react-composable.com
 **/
function m(n) {
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
function w(n, e) {
  const t = typeof n, s = {
    set(r, u, o) {
      return u === "value" ? (r[u] = o, e(r.value), !0) : !1;
    }
  }, i = {
    set(r, u, o) {
      return r[u] = o, e(Array.isArray(r) ? [...r] : { ...r }), !0;
    },
    deleteProperty(r, u) {
      return delete r[u], e(Array.isArray(r) ? [...r] : { ...r }), !0;
    }
  }, p = {
    apply(r, u, o) {
      return r.apply(u, o);
    }
  };
  if (t === "string" || t === "boolean" || t === "symbol") {
    const r = { value: n };
    return new Proxy(r, s);
  } else if (t === "number") {
    const r = { value: n };
    return new Proxy(r, {
      ...s,
      set(u, o, f) {
        return o === "value" ? typeof f == "number" ? (u[o] = f, e(u.value), !0) : (console.warn("New value must be a number"), !1) : !1;
      }
    });
  } else {
    if (Array.isArray(n))
      return new Proxy(n, i);
    if (t === "object" && n !== null)
      return new Proxy(n, i);
    if (t === "function")
      return new Proxy(n, p);
    throw new Error("Unsupported data type");
  }
}
function b(n) {
  const [e, t] = d(n);
  return v(() => w(e, t), [e]);
}
function A(n, e) {
  Array.isArray(n) || (n = [n]);
  const t = a(!1);
  c(() => {
    if (!t.current) {
      t.current = !0;
      return;
    }
    e();
  }, n);
}
function E(n) {
  const e = a(!1);
  c(() => {
    e.current || (n(), e.current = !0);
  }, [n]);
}
function P(n) {
  const e = a(!1), t = a(!1);
  c(() => {
    if (!e.current) {
      e.current = !0;
      return;
    }
    t.current || (n(), t.current = !0);
  }, [n]);
}
function h(n) {
  c(() => {
    n();
  });
}
function x(n) {
  const e = a(!1);
  c(() => () => {
    e.current ? n() : e.current = !0;
  }, []);
}
function O(n, e) {
  const t = (s) => e(s.detail.payload);
  c(() => (document.addEventListener(n, t), () => {
    document.removeEventListener(n, t);
  }), []);
}
function M(n) {
  return l(n), b(n);
}
function l(n) {
  if (typeof n == "object" && n !== null)
    for (let e in n)
      n.hasOwnProperty(e) && (typeof n[e] == "object" && n[e] !== null ? l(n[e]) : n[e] = y(n[e]));
}
const y = M, U = A, R = E, j = P, B = h, I = x, L = O, C = {
  ref: y,
  createEvent: m,
  onEvent: L,
  watch: U,
  onBeforeMount: R,
  onMounted: j,
  onUpdate: B,
  onUnmount: I
};
export {
  m as createEvent,
  C as default,
  R as onBeforeMount,
  L as onEvent,
  j as onMounted,
  I as onUnmount,
  B as onUpdate,
  y as ref,
  U as watch
};
