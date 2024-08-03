/**
 * React composable api
 * (c) 2024 Leto (Mikhail)
 * @license MIT
 * @link https://react-composable.com
 **/
import { useRef as c, useEffect as s, useState as d, useMemo as p } from "react";
function v(e) {
  const n = new CustomEvent(e.name, {
    detail: {
      payload: e.payload
    }
  }), r = () => document.dispatchEvent(n);
  return {
    name: e.name,
    event: n,
    dispatch: r
  };
}
function w(e, n) {
  const r = typeof e, f = {
    set(t, u, o) {
      return u === "value" ? (t[u] = o, n(t.value), !0) : !1;
    }
  }, i = {
    set(t, u, o) {
      return t[u] = o, n(Array.isArray(t) ? [...t] : { ...t }), !0;
    },
    deleteProperty(t, u) {
      return delete t[u], n(Array.isArray(t) ? [...t] : { ...t }), !0;
    }
  }, m = {
    apply(t, u, o) {
      return t.apply(u, o);
    }
  };
  if (r === "string" || r === "boolean" || r === "symbol") {
    const t = { value: e };
    return new Proxy(t, f);
  } else if (r === "number") {
    const t = { value: e };
    return new Proxy(t, {
      ...f,
      set(u, o, l) {
        return o === "value" ? typeof l == "number" ? (u[o] = l, n(u.value), !0) : (console.warn("New value must be a number"), !1) : !1;
      }
    });
  } else {
    if (Array.isArray(e))
      return new Proxy(e, i);
    if (r === "object" && e !== null)
      return new Proxy(e, i);
    if (r === "function")
      return new Proxy(e, m);
    throw new Error("Unsupported data type");
  }
}
function h(e) {
  const [n, r] = d(e);
  return p(() => w(n, r), [n]);
}
function M(e, n) {
  Array.isArray(e) || (e = [e]);
  const r = c(!1);
  s(() => {
    if (!r.current) {
      r.current = !0;
      return;
    }
    n();
  }, e);
}
function x(e) {
  const n = c(!1);
  s(() => {
    n.current || (e(), n.current = !0);
  }, [e]);
}
function E(e) {
  const n = c(!1), r = c(!1);
  s(() => {
    if (!n.current) {
      n.current = !0;
      return;
    }
    r.current || (e(), r.current = !0);
  }, [e]);
}
function A(e) {
  s(() => {
    e();
  });
}
function P(e) {
  const n = c(!1);
  s(() => () => {
    n.current ? e() : n.current = !0;
  }, []);
}
function U(e, n) {
  const r = (f) => n(f.detail.payload);
  s(() => (document.addEventListener(e, r), () => {
    document.removeEventListener(e, r);
  }), []);
}
function H(e) {
  return a(e), h(e);
}
function a(e) {
  if (typeof e == "object" && e !== null)
    for (let n in e)
      e.hasOwnProperty(n) && (typeof e[n] == "object" && e[n] !== null ? a(e[n]) : e[n] = y(e[n]));
}
const y = H, R = M, b = x, B = E, C = A, I = P, L = U, O = {
  ref: y,
  createEvent: v,
  onEvent: L,
  watch: R,
  onBeforeMount: b,
  onMounted: B,
  onUpdate: C,
  onUnmount: I
};
export {
  v as createEvent,
  O as default,
  b as onBeforeMount,
  L as onEvent,
  B as onMounted,
  I as onUnmount,
  C as onUpdate,
  y as ref,
  R as watch
};
