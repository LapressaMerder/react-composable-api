/**
 * React composable api
 * (c) 2024 Leto (Mikhail)
 * @license MIT
 * @link https://react-composable.com
 **/
import { useRef as c, useEffect as s, useState as m, useMemo as w } from "react";
function A(e) {
  const n = new CustomEvent(e.name, {
    detail: {
      payload: e.payload
    }
  }), t = () => document.dispatchEvent(n);
  return {
    name: e.name,
    event: n,
    dispatch: t
  };
}
function E(e, n) {
  const t = typeof e, i = {
    set(r, o, u) {
      return o === "value" ? (r[o] = u, n(r.value), !0) : !1;
    }
  }, d = {
    set(r, o, u) {
      return r[o] = u, n(Array.isArray(r) ? [...r] : { ...r }), !0;
    },
    deleteProperty(r, o) {
      return delete r[o], n(Array.isArray(r) ? [...r] : { ...r }), !0;
    }
  }, p = {
    apply(r, o, u) {
      return r.apply(o, u);
    }
  };
  if (["string", "boolean", "symbol"].includes(t))
    return new Proxy({ value: e }, i);
  if (t === "number")
    return new Proxy({ value: e }, {
      ...i,
      set(r, o, u) {
        return o === "value" && typeof u == "number" ? (r[o] = u, n(r.value), !0) : (console.warn("New value must be a number"), !1);
      }
    });
  if (Array.isArray(e) || t === "object" && e !== null)
    return new Proxy(e, d);
  if (t === "function")
    return new Proxy(e, p);
  throw new Error("Unsupported data type");
}
function a(e) {
  const [n, t] = m(e);
  return w(() => E(n, t), [n]);
}
function O(e, n) {
  Array.isArray(e) || (e = [e]);
  const t = c(!1);
  s(() => {
    t.current ? n() : t.current = !0;
  }, e);
}
function M(e) {
  const n = c(!1);
  s(() => {
    n.current || (e(), n.current = !0);
  }, [e]);
}
function P(e) {
  const n = c(!1), t = c(!1);
  s(() => {
    n.current && !t.current ? (e(), t.current = !0) : n.current = !0;
  }, [e]);
}
function h(e) {
  s(() => {
    e();
  });
}
function x(e) {
  const n = c(!1);
  s(() => () => {
    n.current ? e() : n.current = !0;
  }, []);
}
function R(e, n) {
  const t = (i) => n(i.detail.payload);
  s(() => (document.addEventListener(e, t), () => {
    document.removeEventListener(e, t);
  }), [e, n]);
}
function f(e) {
  if (e === null || typeof e != "object")
    return e;
  if (Array.isArray(e))
    return e.map(f);
  const n = {};
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (n[t] = f(e[t]));
  return n;
}
function U(e) {
  const n = f(e);
  return a(n);
}
function v(e) {
  const n = f(e);
  return l(n), a(n);
}
function l(e) {
  if (typeof e == "object" && e !== null)
    for (let n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (typeof e[n] == "object" && e[n] !== null ? l(e[n]) : e[n] = y(e[n]));
}
const y = U, H = v, b = O, I = M, B = P, L = h, S = x, T = R, W = {
  ref: y,
  deepRef: H,
  createEvent: A,
  onEvent: T,
  watch: b,
  onBeforeMount: I,
  onMounted: B,
  onUpdate: L,
  onUnmount: S
};
export {
  A as createEvent,
  H as deepRef,
  W as default,
  I as onBeforeMount,
  T as onEvent,
  B as onMounted,
  S as onUnmount,
  L as onUpdate,
  y as ref,
  b as watch
};
