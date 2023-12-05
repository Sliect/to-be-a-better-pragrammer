(self.webpackChunk_szzj_template_lib_react = self.webpackChunk_szzj_template_lib_react || []).push([
  [678],
  {
    48526: function (N, C, p) {
      'use strict';
      var x = p(22647),
        o = p(77630),
        y = p(80447);
      function k(i, f) {
        return P(i) || I(i, f) || h(i, f) || T();
      }
      function T() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function h(i, f) {
        if (!!i) {
          if (typeof i == 'string') return A(i, f);
          var l = Object.prototype.toString.call(i).slice(8, -1);
          if (
            (l === 'Object' && i.constructor && (l = i.constructor.name),
            l === 'Map' || l === 'Set')
          )
            return Array.from(i);
          if (l === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l))
            return A(i, f);
        }
      }
      function A(i, f) {
        (f == null || f > i.length) && (f = i.length);
        for (var l = 0, v = new Array(f); l < f; l++) v[l] = i[l];
        return v;
      }
      function I(i, f) {
        var l =
          i == null
            ? null
            : (typeof Symbol != 'undefined' && i[Symbol.iterator]) || i['@@iterator'];
        if (l != null) {
          var v = [],
            e = !0,
            r = !1,
            n,
            a;
          try {
            for (
              l = l.call(i);
              !(e = (n = l.next()).done) && (v.push(n.value), !(f && v.length === f));
              e = !0
            );
          } catch (u) {
            (r = !0), (a = u);
          } finally {
            try {
              !e && l.return != null && l.return();
            } finally {
              if (r) throw a;
            }
          }
          return v;
        }
      }
      function P(i) {
        if (Array.isArray(i)) return i;
      }
      var w = function (f) {
        var l,
          v = f.id,
          e = (0, x.cc)(),
          r = e.components,
          n = r == null ? void 0 : r[v],
          a = (0, x.YB)();
        return o.createElement(
          'div',
          { className: 'markdown' },
          o.createElement(
            y.Z,
            null,
            o.createElement(
              'thead',
              null,
              o.createElement(
                'tr',
                null,
                o.createElement('th', null, a.formatMessage({ id: 'api.component.name' })),
                o.createElement('th', null, a.formatMessage({ id: 'api.component.description' })),
                o.createElement('th', null, a.formatMessage({ id: 'api.component.type' })),
                o.createElement('th', null, a.formatMessage({ id: 'api.component.default' })),
              ),
            ),
            o.createElement(
              'tbody',
              null,
              n && (l = n.propsConfig) !== null && l !== void 0 && l.properties
                ? Object.entries(n.propsConfig.properties).map(function (u) {
                    var d,
                      S = k(u, 2),
                      E = S[0],
                      t = S[1];
                    return o.createElement(
                      'tr',
                      { key: E },
                      o.createElement('td', null, E),
                      o.createElement('td', null, t.description || '--'),
                      o.createElement('td', null, o.createElement('code', null, t.type)),
                      o.createElement(
                        'td',
                        null,
                        o.createElement(
                          'code',
                          null,
                          (d = n.propsConfig.required) !== null && d !== void 0 && d.includes(E)
                            ? a.formatMessage({ id: 'api.component.required' })
                            : t.default || '--',
                        ),
                      ),
                    );
                  })
                : o.createElement(
                    'tr',
                    null,
                    o.createElement(
                      'td',
                      { colSpan: 4 },
                      a.formatMessage(
                        { id: 'api.component.'.concat(r ? 'not.found' : 'loading') },
                        { id: v },
                      ),
                    ),
                  ),
            ),
          ),
        );
      };
      C.Z = w;
    },
    43878: function (N, C, p) {
      'use strict';
      var x = p(77630);
      function o() {
        return (
          (o = Object.assign
            ? Object.assign.bind()
            : function (T) {
                for (var h = 1; h < arguments.length; h++) {
                  var A = arguments[h];
                  for (var I in A) Object.prototype.hasOwnProperty.call(A, I) && (T[I] = A[I]);
                }
                return T;
              }),
          o.apply(this, arguments)
        );
      }
      var y = function (h) {
          return React.createElement('span', o({ className: 'dumi-default-badge' }, h));
        },
        k = null;
    },
    80447: function (N, C, p) {
      'use strict';
      p.d(C, {
        Z: function () {
          return v;
        },
      });
      var x = p(23510),
        o = p.n(x),
        y = p(77630),
        k = ['children'];
      function T(e, r) {
        return w(e) || P(e, r) || A(e, r) || h();
      }
      function h() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function A(e, r) {
        if (!!e) {
          if (typeof e == 'string') return I(e, r);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          if (
            (n === 'Object' && e.constructor && (n = e.constructor.name),
            n === 'Map' || n === 'Set')
          )
            return Array.from(e);
          if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return I(e, r);
        }
      }
      function I(e, r) {
        (r == null || r > e.length) && (r = e.length);
        for (var n = 0, a = new Array(r); n < r; n++) a[n] = e[n];
        return a;
      }
      function P(e, r) {
        var n =
          e == null
            ? null
            : (typeof Symbol != 'undefined' && e[Symbol.iterator]) || e['@@iterator'];
        if (n != null) {
          var a = [],
            u = !0,
            d = !1,
            S,
            E;
          try {
            for (
              n = n.call(e);
              !(u = (S = n.next()).done) && (a.push(S.value), !(r && a.length === r));
              u = !0
            );
          } catch (t) {
            (d = !0), (E = t);
          } finally {
            try {
              !u && n.return != null && n.return();
            } finally {
              if (d) throw E;
            }
          }
          return a;
        }
      }
      function w(e) {
        if (Array.isArray(e)) return e;
      }
      function i(e, r) {
        if (e == null) return {};
        var n = f(e, r),
          a,
          u;
        if (Object.getOwnPropertySymbols) {
          var d = Object.getOwnPropertySymbols(e);
          for (u = 0; u < d.length; u++)
            (a = d[u]),
              !(r.indexOf(a) >= 0) &&
                (!Object.prototype.propertyIsEnumerable.call(e, a) || (n[a] = e[a]));
        }
        return n;
      }
      function f(e, r) {
        if (e == null) return {};
        var n = {},
          a = Object.keys(e),
          u,
          d;
        for (d = 0; d < a.length; d++) (u = a[d]), !(r.indexOf(u) >= 0) && (n[u] = e[u]);
        return n;
      }
      var l = function (r) {
          var n = r.children,
            a = i(r, k),
            u = (0, y.useRef)(null),
            d = (0, y.useState)(!1),
            S = T(d, 2),
            E = S[0],
            t = S[1],
            c = (0, y.useState)(!1),
            m = T(c, 2),
            b = m[0],
            O = m[1];
          return (
            (0, y.useEffect)(function () {
              var g = u.current;
              if (g) {
                var _ = o()(function () {
                  t(g.scrollLeft > 0), O(g.scrollLeft < g.scrollWidth - g.offsetWidth);
                }, 100);
                return (
                  _(),
                  g.addEventListener('scroll', _),
                  window.addEventListener('resize', _),
                  function () {
                    g.removeEventListener('scroll', _), window.removeEventListener('resize', _);
                  }
                );
              }
            }, []),
            y.createElement(
              'div',
              { className: 'dumi-default-table' },
              y.createElement(
                'div',
                {
                  className: 'dumi-default-table-content',
                  ref: u,
                  'data-left-folded': E || void 0,
                  'data-right-folded': b || void 0,
                },
                y.createElement('table', a, n),
              ),
            )
          );
        },
        v = l;
    },
    23510: function (N, C, p) {
      var x = 'Expected a function',
        o = NaN,
        y = '[object Symbol]',
        k = /^\s+|\s+$/g,
        T = /^[-+]0x[0-9a-f]+$/i,
        h = /^0b[01]+$/i,
        A = /^0o[0-7]+$/i,
        I = parseInt,
        P = typeof p.g == 'object' && p.g && p.g.Object === Object && p.g,
        w = typeof self == 'object' && self && self.Object === Object && self,
        i = P || w || Function('return this')(),
        f = Object.prototype,
        l = f.toString,
        v = Math.max,
        e = Math.min,
        r = function () {
          return i.Date.now();
        };
      function n(t, c, m) {
        var b,
          O,
          g,
          _,
          j,
          M,
          W = 0,
          U = !1,
          B = !1,
          D = !0;
        if (typeof t != 'function') throw new TypeError(x);
        (c = E(c) || 0),
          u(m) &&
            ((U = !!m.leading),
            (B = 'maxWait' in m),
            (g = B ? v(E(m.maxWait) || 0, c) : g),
            (D = 'trailing' in m ? !!m.trailing : D));
        function F(s) {
          var L = b,
            R = O;
          return (b = O = void 0), (W = s), (_ = t.apply(R, L)), _;
        }
        function G(s) {
          return (W = s), (j = setTimeout($, c)), U ? F(s) : _;
        }
        function X(s) {
          var L = s - M,
            R = s - W,
            Z = c - L;
          return B ? e(Z, g - R) : Z;
        }
        function H(s) {
          var L = s - M,
            R = s - W;
          return M === void 0 || L >= c || L < 0 || (B && R >= g);
        }
        function $() {
          var s = r();
          if (H(s)) return K(s);
          j = setTimeout($, X(s));
        }
        function K(s) {
          return (j = void 0), D && b ? F(s) : ((b = O = void 0), _);
        }
        function Y() {
          j !== void 0 && clearTimeout(j), (W = 0), (b = M = O = j = void 0);
        }
        function J() {
          return j === void 0 ? _ : K(r());
        }
        function z() {
          var s = r(),
            L = H(s);
          if (((b = arguments), (O = this), (M = s), L)) {
            if (j === void 0) return G(M);
            if (B) return (j = setTimeout($, c)), F(M);
          }
          return j === void 0 && (j = setTimeout($, c)), _;
        }
        return (z.cancel = Y), (z.flush = J), z;
      }
      function a(t, c, m) {
        var b = !0,
          O = !0;
        if (typeof t != 'function') throw new TypeError(x);
        return (
          u(m) &&
            ((b = 'leading' in m ? !!m.leading : b), (O = 'trailing' in m ? !!m.trailing : O)),
          n(t, c, { leading: b, maxWait: c, trailing: O })
        );
      }
      function u(t) {
        var c = typeof t;
        return !!t && (c == 'object' || c == 'function');
      }
      function d(t) {
        return !!t && typeof t == 'object';
      }
      function S(t) {
        return typeof t == 'symbol' || (d(t) && l.call(t) == y);
      }
      function E(t) {
        if (typeof t == 'number') return t;
        if (S(t)) return o;
        if (u(t)) {
          var c = typeof t.valueOf == 'function' ? t.valueOf() : t;
          t = u(c) ? c + '' : c;
        }
        if (typeof t != 'string') return t === 0 ? t : +t;
        t = t.replace(k, '');
        var m = h.test(t);
        return m || A.test(t) ? I(t.slice(2), m ? 2 : 8) : T.test(t) ? o : +t;
      }
      N.exports = a;
    },
  },
]);
