/**
 * React composable api
 * (c) 2024 Leto (Mikhail)
 * @license MIT
 * @link https://react-composable.com
 **/
import { useRef as f, useEffect as s, useState as d, useMemo as p } from "react";
function m({ name: e, payload: t }) {
  const n = new CustomEvent(e, { detail: { payload: t } });
  return { name: e, event: n, dispatch: () => document.dispatchEvent(n) };
}
function i(e, t) {
  const n = typeof e, c = {
    set(r, o, u) {
      return o === "value" ? (r[o] = u, t(r.value), !0) : !1;
    }
  }, l = {
    set(r, o, u) {
      return r[o] = u, t(Array.isArray(r) ? [...r] : { ...r }), !0;
    },
    deleteProperty(r, o) {
      return delete r[o], t(Array.isArray(r) ? [...r] : { ...r }), !0;
    }
  }, y = {
    apply(r, o, u) {
      return r.apply(o, u);
    }
  };
  if (n === "string" || n === "boolean" || n === "symbol")
    return new Proxy({ value: e }, c);
  if (n === "number")
    return new Proxy({ value: e }, {
      ...c,
      set(r, o, u) {
        return o === "value" && typeof u == "number" ? (r[o] = u, t(r.value), !0) : (console.warn("New value must be a number"), !1);
      }
    });
  if (Array.isArray(e) || n === "object" && e !== null)
    return new Proxy(e, l);
  if (n === "function")
    return new Proxy(e, y);
  throw new Error("Unsupported data type");
}
function E(e) {
  const [t, n] = d(e);
  return p(() => i(t, n), [t]);
}
function w(e, t) {
  Array.isArray(e) || (e = [e]);
  const n = f(!1);
  s(() => {
    if (!n.current) {
      n.current = !0;
      return;
    }
    t();
  }, e);
}
function b(e) {
  const t = f(!1);
  s(() => {
    t.current || (e(), t.current = !0);
  }, [e]);
}
function h(e) {
  const t = f(!1), n = f(!1);
  s(() => {
    if (!t.current) {
      t.current = !0;
      return;
    }
    n.current || (e(), n.current = !0);
  }, [e]);
}
function A(e) {
  s(() => {
    e();
  });
}
function M(e) {
  const t = f(!1);
  s(() => () => {
    t.current ? e() : t.current = !0;
  }, []);
}
function P(e, t) {
  s(() => {
    const n = (c) => t(c.detail.payload);
    return document.addEventListener(e, n), () => {
      document.removeEventListener(e, n);
    };
  }, []);
}
function v(e) {
  return a(e), E(e);
}
function a(e) {
  if (typeof e == "object" && e !== null)
    for (const t in e)
      e.hasOwnProperty(t) && (typeof e[t] == "object" && e[t] !== null ? a(e[t]) : e[t] = i(e[t]));
}
const x = v, U = w, j = b, H = h, R = A, S = M, B = P, O = {
  ref: x,
  createEvent: m,
  onEvent: B,
  watch: U,
  onBeforeMount: j,
  onMounted: H,
  onUpdate: R,
  onUnmount: S
};
export {
  m as createEvent,
  O as default,
  j as onBeforeMount,
  B as onEvent,
  H as onMounted,
  S as onUnmount,
  R as onUpdate,
  x as ref,
  U as watch
};
