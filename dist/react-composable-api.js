import { useState as y, useMemo as m, useRef as c, useEffect as s } from "react";
function d(e) {
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
function p(e, n) {
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
  }, a = {
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
      return new Proxy(e, a);
    throw new Error("Unsupported data type");
  }
}
function v(e) {
  const [n, r] = y(e);
  return m(() => p(n, r), [n]);
}
function w(e, n) {
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
function M(e) {
  const n = c(!1);
  s(() => {
    n.current || (e(), n.current = !0);
  }, [e]);
}
function b(e) {
  const n = c(!1), r = c(!1);
  s(() => {
    if (!n.current) {
      n.current = !0;
      return;
    }
    r.current || (e(), r.current = !0);
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
function E(e, n) {
  const r = (f) => n(f.detail.payload);
  s(() => (document.addEventListener(e, r), () => {
    document.removeEventListener(e, r);
  }), []);
}
const A = v, P = w, U = M, j = b, H = h, B = x, C = E, R = {
  ref: A,
  createEvent: d,
  onEvent: C,
  watch: P,
  onBeforeMount: U,
  onMounted: j,
  onUpdate: H,
  onUnmount: B
};
export {
  d as createEvent,
  R as default,
  U as onBeforeMount,
  C as onEvent,
  j as onMounted,
  B as onUnmount,
  H as onUpdate,
  A as ref,
  P as watch
};
