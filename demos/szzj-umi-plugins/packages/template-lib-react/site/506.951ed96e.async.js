(self.webpackChunk_szzj_template_lib_react = self.webpackChunk_szzj_template_lib_react || []).push([
  [506],
  {
    37933: function (n, f, t) {
      'use strict';
      t.r(f),
        t.d(f, {
          default: function () {
            return R;
          },
        });
      var e = t(77630),
        s = Object.defineProperty,
        l = Object.getOwnPropertySymbols,
        y = Object.prototype.hasOwnProperty,
        g = Object.prototype.propertyIsEnumerable,
        T = (A, h, M) =>
          h in A
            ? s(A, h, { enumerable: !0, configurable: !0, writable: !0, value: M })
            : (A[h] = M),
        j = (A, h) => {
          for (var M in h || (h = {})) y.call(h, M) && T(A, M, h[M]);
          if (l) for (var M of l(h)) g.call(h, M) && T(A, M, h[M]);
          return A;
        };
      const w = (A) =>
        e.createElement(
          'svg',
          j({ viewBox: '64 64 896 896' }, A),
          e.createElement('path', {
            d: 'M120 230h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm0 424h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm784 140H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-424H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z',
          }),
        );
      var L =
          'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSI2NCA2NCA4OTYgODk2Ij48cGF0aCBkPSJNMTIwIDIzMGg0OTZjNC40IDAgOC0zLjYgOC04di01NmMwLTQuNC0zLjYtOC04LThIMTIwYy00LjQgMC04IDMuNi04IDh2NTZjMCA0LjQgMy42IDggOCA4em0wIDQyNGg0OTZjNC40IDAgOC0zLjYgOC04di01NmMwLTQuNC0zLjYtOC04LThIMTIwYy00LjQgMC04IDMuNi04IDh2NTZjMCA0LjQgMy42IDggOCA4em03ODQgMTQwSDEyMGMtNC40IDAtOCAzLjYtOCA4djU2YzAgNC40IDMuNiA4IDggOGg3ODRjNC40IDAgOC0zLjYgOC04di01NmMwLTQuNC0zLjYtOC04LTh6bTAtNDI0SDEyMGMtNC40IDAtOCAzLjYtOCA4djU2YzAgNC40IDMuNiA4IDggOGg3ODRjNC40IDAgOC0zLjYgOC04di01NmMwLTQuNC0zLjYtOC04LTh6Ii8+PC9zdmc+',
        E = t(22647),
        P = t(34421),
        S = t(76790),
        x = t(67598),
        b = t(62213),
        Q = t(47682),
        W = t(106),
        G = t(86613);
      function _(A, h) {
        return d(A) || N(A, h) || q(A, h) || K();
      }
      function K() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function q(A, h) {
        if (!!A) {
          if (typeof A == 'string') return p(A, h);
          var M = Object.prototype.toString.call(A).slice(8, -1);
          if (
            (M === 'Object' && A.constructor && (M = A.constructor.name),
            M === 'Map' || M === 'Set')
          )
            return Array.from(A);
          if (M === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(M))
            return p(A, h);
        }
      }
      function p(A, h) {
        (h == null || h > A.length) && (h = A.length);
        for (var M = 0, Z = new Array(h); M < h; M++) Z[M] = A[M];
        return Z;
      }
      function N(A, h) {
        var M =
          A == null
            ? null
            : (typeof Symbol != 'undefined' && A[Symbol.iterator]) || A['@@iterator'];
        if (M != null) {
          var Z = [],
            J = !0,
            ee = !1,
            v,
            m;
          try {
            for (
              M = M.call(A);
              !(J = (v = M.next()).done) && (Z.push(v.value), !(h && Z.length === h));
              J = !0
            );
          } catch (r) {
            (ee = !0), (m = r);
          } finally {
            try {
              !J && M.return != null && M.return();
            } finally {
              if (ee) throw m;
            }
          }
          return Z;
        }
      }
      function d(A) {
        if (Array.isArray(A)) return A;
      }
      var H = function () {
          var h = (0, E.YB)(),
            M = (0, E.pC)(),
            Z = (0, E.tx)(),
            J = (0, e.useState)(!1),
            ee = _(J, 2),
            v = ee[0],
            m = ee[1],
            r = (0, E.eL)(),
            i = r.frontmatter;
          return e.createElement(
            'div',
            {
              className: 'dumi-default-doc-layout',
              'data-mobile-sidebar-active': v || void 0,
              onClick: function () {
                return m(!1);
              },
            },
            e.createElement(
              E.ql,
              null,
              e.createElement('html', { lang: h.locale.replace(/-.+$/, '') }),
              i.title && e.createElement('title', null, i.title),
              i.title && e.createElement('meta', { property: 'og:title', content: i.title }),
              i.description &&
                e.createElement('meta', { name: 'description', content: i.description }),
              i.description &&
                e.createElement('meta', { property: 'og:description', content: i.description }),
              i.keywords &&
                e.createElement('meta', { name: 'keywords', content: i.keywords.join(',') }),
              i.keywords &&
                e.createElement('meta', { property: 'og:keywords', content: i.keywords.join(',') }),
            ),
            e.createElement(b.Z, null),
            e.createElement(Q.Z, null),
            e.createElement(S.Z, null),
            Z &&
              e.createElement(
                'div',
                { className: 'dumi-default-doc-layout-mobile-bar' },
                e.createElement(
                  'button',
                  {
                    type: 'button',
                    className: 'dumi-default-sidebar-btn',
                    onClick: function (I) {
                      I.stopPropagation(),
                        m(function (O) {
                          return !O;
                        });
                    },
                  },
                  e.createElement(w, null),
                  h.formatMessage({ id: 'layout.sidebar.btn' }),
                ),
              ),
            e.createElement(
              'main',
              null,
              e.createElement(W.Z, null),
              e.createElement(P.Z, null, M, e.createElement(x.Z, null)),
              i.toc === 'content' &&
                e.createElement(
                  'div',
                  { className: 'dumi-default-doc-layout-toc-wrapper' },
                  e.createElement('h4', null, 'TABLE OF CONTENTS'),
                  e.createElement(G.Z, null),
                ),
            ),
          );
        },
        R = H;
    },
    87011: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return y;
        },
      });
      var e = t(22647),
        s = t(77630),
        l = function (T) {
          var j = (0, e.tx)();
          return s.createElement(
            'div',
            { className: 'dumi-default-content', 'data-no-sidebar': !j || void 0 },
            T.children,
          );
        },
        y = l;
    },
    65324: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return y;
        },
      });
      var e = t(22647),
        s = t(77630),
        l = function () {
          var T,
            j = (0, e.eL)(),
            w = j.frontmatter;
          return Boolean((T = w.features) === null || T === void 0 ? void 0 : T.length)
            ? s.createElement(
                'div',
                {
                  className: 'dumi-default-features',
                  'data-cols':
                    [3, 2].find(function (L) {
                      return w.features.length % L === 0;
                    }) || 3,
                },
                w.features.map(function (L) {
                  var E = L.title,
                    P = L.description,
                    S = L.emoji;
                  return s.createElement(
                    'div',
                    { key: E, className: 'dumi-default-features-item' },
                    S && s.createElement('i', null, S),
                    E && s.createElement('h3', null, E),
                    P && s.createElement('p', { dangerouslySetInnerHTML: { __html: P } }),
                  );
                }),
              )
            : null;
        },
        y = l;
    },
    40585: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return y;
        },
      });
      var e = t(22647),
        s = t(77630),
        l = function () {
          var T = (0, e.WF)(),
            j = T.themeConfig;
          return j.footer
            ? s.createElement('div', {
                className: 'dumi-default-footer',
                dangerouslySetInnerHTML: { __html: j.footer },
              })
            : null;
        },
        y = l;
    },
    14222: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return ee;
        },
      });
      var e = t(77630),
        s = Object.defineProperty,
        l = Object.getOwnPropertySymbols,
        y = Object.prototype.hasOwnProperty,
        g = Object.prototype.propertyIsEnumerable,
        T = (v, m, r) =>
          m in v
            ? s(v, m, { enumerable: !0, configurable: !0, writable: !0, value: r })
            : (v[m] = r),
        j = (v, m) => {
          for (var r in m || (m = {})) y.call(m, r) && T(v, r, m[r]);
          if (l) for (var r of l(m)) g.call(m, r) && T(v, r, m[r]);
          return v;
        };
      const w = (v) =>
        e.createElement(
          'svg',
          j({ viewBox: '64 64 896 896' }, v),
          e.createElement('path', {
            d: 'm563.8 512 262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z',
          }),
        );
      var L =
          'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSI2NCA2NCA4OTYgODk2Ij48cGF0aCBkPSJtNTYzLjggNTEyIDI2Mi41LTMxMi45YzQuNC01LjIuNy0xMy4xLTYuMS0xMy4xaC03OS44Yy00LjcgMC05LjIgMi4xLTEyLjMgNS43TDUxMS42IDQ0OS44IDI5NS4xIDE5MS43Yy0zLTMuNi03LjUtNS43LTEyLjMtNS43SDIwM2MtNi44IDAtMTAuNSA3LjktNi4xIDEzLjFMNDU5LjQgNTEyIDE5Ni45IDgyNC45QTcuOTUgNy45NSAwIDAgMCAyMDMgODM4aDc5LjhjNC43IDAgOS4yLTIuMSAxMi4zLTUuN2wyMTYuNS0yNTguMSAyMTYuNSAyNTguMWMzIDMuNiA3LjUgNS43IDEyLjMgNS43aDc5LjhjNi44IDAgMTAuNS03LjkgNi4xLTEzLjFMNTYzLjggNTEyeiIvPjwvc3ZnPg==',
        E = Object.defineProperty,
        P = Object.getOwnPropertySymbols,
        S = Object.prototype.hasOwnProperty,
        x = Object.prototype.propertyIsEnumerable,
        b = (v, m, r) =>
          m in v
            ? E(v, m, { enumerable: !0, configurable: !0, writable: !0, value: r })
            : (v[m] = r),
        Q = (v, m) => {
          for (var r in m || (m = {})) S.call(m, r) && b(v, r, m[r]);
          if (P) for (var r of P(m)) x.call(m, r) && b(v, r, m[r]);
          return v;
        };
      const W = (v) =>
        e.createElement(
          'svg',
          Q({ viewBox: '64 64 896 896' }, v),
          e.createElement('path', {
            d: 'M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z',
          }),
        );
      var G =
          'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSI2NCA2NCA4OTYgODk2Ij48cGF0aCBkPSJNOTA0IDE2MEgxMjBjLTQuNCAwLTggMy42LTggOHY2NGMwIDQuNCAzLjYgOCA4IDhoNzg0YzQuNCAwIDgtMy42IDgtOHYtNjRjMC00LjQtMy42LTgtOC04em0wIDYyNEgxMjBjLTQuNCAwLTggMy42LTggOHY2NGMwIDQuNCAzLjYgOCA4IDhoNzg0YzQuNCAwIDgtMy42IDgtOHYtNjRjMC00LjQtMy42LTgtOC04em0wLTMxMkgxMjBjLTQuNCAwLTggMy42LTggOHY2NGMwIDQuNCAzLjYgOCA4IDhoNzg0YzQuNCAwIDgtMy42IDgtOHYtNjRjMC00LjQtMy42LTgtOC04eiIvPjwvc3ZnPg==',
        _ = t(22647),
        K = t(6512),
        q = t(16992),
        p = t(57419),
        N = t(96734),
        d = t(97853);
      function H(v, m) {
        return Z(v) || M(v, m) || A(v, m) || R();
      }
      function R() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function A(v, m) {
        if (!!v) {
          if (typeof v == 'string') return h(v, m);
          var r = Object.prototype.toString.call(v).slice(8, -1);
          if (
            (r === 'Object' && v.constructor && (r = v.constructor.name),
            r === 'Map' || r === 'Set')
          )
            return Array.from(v);
          if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
            return h(v, m);
        }
      }
      function h(v, m) {
        (m == null || m > v.length) && (m = v.length);
        for (var r = 0, i = new Array(m); r < m; r++) i[r] = v[r];
        return i;
      }
      function M(v, m) {
        var r =
          v == null
            ? null
            : (typeof Symbol != 'undefined' && v[Symbol.iterator]) || v['@@iterator'];
        if (r != null) {
          var i = [],
            c = !0,
            I = !1,
            O,
            U;
          try {
            for (
              r = r.call(v);
              !(c = (O = r.next()).done) && (i.push(O.value), !(m && i.length === m));
              c = !0
            );
          } catch (D) {
            (I = !0), (U = D);
          } finally {
            try {
              !c && r.return != null && r.return();
            } finally {
              if (I) throw U;
            }
          }
          return i;
        }
      }
      function Z(v) {
        if (Array.isArray(v)) return v;
      }
      var J = function () {
          var m = (0, _.eL)(),
            r = m.frontmatter,
            i = (0, e.useState)(!1),
            c = H(i, 2),
            I = c[0],
            O = c[1];
          return e.createElement(
            'div',
            {
              className: 'dumi-default-header',
              'data-static': Boolean(r.hero) || void 0,
              'data-mobile-active': I || void 0,
              onClick: function () {
                return O(!1);
              },
            },
            e.createElement(
              'div',
              { className: 'dumi-default-header-content' },
              e.createElement(
                'section',
                { className: 'dumi-default-header-left' },
                e.createElement(q.Z, null),
              ),
              e.createElement(
                'section',
                { className: 'dumi-default-header-right' },
                e.createElement(p.Z, null),
                e.createElement(
                  'div',
                  { className: 'dumi-default-header-right-aside' },
                  e.createElement(d.Z, null),
                  e.createElement(K.Z, null),
                  e.createElement(N.Z, null),
                ),
              ),
              e.createElement(
                'button',
                {
                  type: 'button',
                  className: 'dumi-default-header-menu-btn',
                  onClick: function (D) {
                    D.stopPropagation(),
                      O(function ($) {
                        return !$;
                      });
                  },
                },
                I ? e.createElement(w, null) : e.createElement(W, null),
              ),
            ),
          );
        },
        ee = J;
    },
    51866: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return l;
        },
      });
      var e = t(77630),
        s = function (g) {
          return e.createElement(
            'h1',
            { className: 'dumi-default-hero-title' },
            e.createElement('span', null, g.children),
          );
        },
        l = s;
    },
    58460: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return g;
        },
      });
      var e = t(22647),
        s = t(44648),
        l = t(77630),
        y = function () {
          var j,
            w = (0, e.eL)(),
            L = w.frontmatter;
          return 'hero' in L
            ? l.createElement(
                'div',
                { className: 'dumi-default-hero' },
                L.hero.title && l.createElement(s.Z, null, L.hero.title),
                L.hero.description &&
                  l.createElement('p', { dangerouslySetInnerHTML: { __html: L.hero.description } }),
                Boolean((j = L.hero.actions) === null || j === void 0 ? void 0 : j.length) &&
                  l.createElement(
                    'div',
                    { className: 'dumi-default-hero-actions' },
                    L.hero.actions.map(function (E) {
                      var P = E.text,
                        S = E.link;
                      return /^(\w+:)\/\/|^(mailto|tel):/.test(S)
                        ? l.createElement(
                            'a',
                            { href: S, target: '_blank', rel: 'noreferrer', key: P },
                            P,
                          )
                        : l.createElement(e.rU, { key: P, to: S }, P);
                    }),
                  ),
              )
            : null;
        },
        g = y;
    },
    41467: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return q;
        },
      });
      var e = t(77630),
        s = Object.defineProperty,
        l = Object.getOwnPropertySymbols,
        y = Object.prototype.hasOwnProperty,
        g = Object.prototype.propertyIsEnumerable,
        T = (p, N, d) =>
          N in p
            ? s(p, N, { enumerable: !0, configurable: !0, writable: !0, value: d })
            : (p[N] = d),
        j = (p, N) => {
          for (var d in N || (N = {})) y.call(N, d) && T(p, d, N[d]);
          if (l) for (var d of l(N)) g.call(N, d) && T(p, d, N[d]);
          return p;
        };
      const w = (p) =>
        e.createElement(
          'svg',
          j({ viewBox: '64 64 896 896' }, p),
          e.createElement('path', {
            d: 'M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z',
          }),
        );
      var L =
          'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSI2NCA2NCA4OTYgODk2Ij48cGF0aCBkPSJNODg0IDI1NmgtNzVjLTUuMSAwLTkuOSAyLjUtMTIuOSA2LjZMNTEyIDY1NC4yIDIyNy45IDI2Mi42Yy0zLTQuMS03LjgtNi42LTEyLjktNi42aC03NWMtNi41IDAtMTAuMyA3LjQtNi41IDEyLjdsMzUyLjYgNDg2LjFjMTIuOCAxNy42IDM5IDE3LjYgNTEuNyAwbDM1Mi42LTQ4Ni4xYzMuOS01LjMuMS0xMi43LTYuNC0xMi43eiIvPjwvc3ZnPg==',
        E = t(22647);
      function P(p, N) {
        return W(p) || Q(p, N) || x(p, N) || S();
      }
      function S() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function x(p, N) {
        if (!!p) {
          if (typeof p == 'string') return b(p, N);
          var d = Object.prototype.toString.call(p).slice(8, -1);
          if (
            (d === 'Object' && p.constructor && (d = p.constructor.name),
            d === 'Map' || d === 'Set')
          )
            return Array.from(p);
          if (d === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(d))
            return b(p, N);
        }
      }
      function b(p, N) {
        (N == null || N > p.length) && (N = p.length);
        for (var d = 0, H = new Array(N); d < N; d++) H[d] = p[d];
        return H;
      }
      function Q(p, N) {
        var d =
          p == null
            ? null
            : (typeof Symbol != 'undefined' && p[Symbol.iterator]) || p['@@iterator'];
        if (d != null) {
          var H = [],
            R = !0,
            A = !1,
            h,
            M;
          try {
            for (
              d = d.call(p);
              !(R = (h = d.next()).done) && (H.push(h.value), !(N && H.length === N));
              R = !0
            );
          } catch (Z) {
            (A = !0), (M = Z);
          } finally {
            try {
              !R && d.return != null && d.return();
            } finally {
              if (A) throw M;
            }
          }
          return H;
        }
      }
      function W(p) {
        if (Array.isArray(p)) return p;
      }
      function G(p) {
        var N = p.pathname,
          d = p.current,
          H = p.target,
          R =
            'base' in d
              ? N.replace(d.base.replace(/\/$/, ''), '')
              : N.replace(new RegExp(''.concat(d.suffix, '$')), '');
        return 'base' in H
          ? ''.concat(H.base).concat(R).replace(/^\/\//, '/')
          : ''.concat(R).concat(H.suffix);
      }
      var _ = function (N) {
          var d = N.locale,
            H = N.current,
            R = (0, E.TH)(),
            A = R.pathname,
            h = (0, e.useState)(function () {
              return G({ pathname: A, current: H, target: d });
            }),
            M = P(h, 2),
            Z = M[0],
            J = M[1];
          return (
            (0, e.useEffect)(
              function () {
                J(G({ pathname: A, current: H, target: d }));
              },
              [A, H.id, d.id],
            ),
            e.createElement(E.rU, { className: 'dumi-default-lang-switch', to: Z }, d.name)
          );
        },
        K = function () {
          var N = (0, E.WF)(),
            d = N.locales,
            H = (0, E.YB)(),
            R = H.locale,
            A = (0, E.bU)();
          return d.length <= 1
            ? null
            : d.length > 2
            ? e.createElement(
                'div',
                { className: 'dumi-default-lang-select' },
                e.createElement(
                  'select',
                  {
                    defaultValue: R,
                    onChange: function (M) {
                      E.m8.push(
                        G({
                          pathname: E.m8.location.pathname,
                          current: A,
                          target: d.find(function (Z) {
                            var J = Z.id;
                            return J === M.target.value;
                          }),
                        }),
                      );
                    },
                  },
                  d.map(function (h) {
                    return e.createElement('option', { key: h.id, value: h.id }, h.name);
                  }),
                ),
                e.createElement(w, null),
              )
            : e.createElement(_, {
                locale: d.find(function (h) {
                  var M = h.id;
                  return M !== R;
                }),
                current: A,
              });
        },
        q = K;
    },
    24118: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return y;
        },
      });
      var e = t(22647),
        s = t(77630),
        l = function () {
          var T = (0, e.WF)(),
            j = T.themeConfig,
            w = (0, e.bU)();
          return s.createElement(
            e.rU,
            { className: 'dumi-default-logo', to: 'base' in w ? w.base : '/' },
            s.createElement('img', {
              src:
                j.logo ||
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACCCAMAAACww5CIAAACf1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8YkP8AAAACCxMamv/6+voaGhoXi/YYjv8aoP8cq/8dr/8bo/8cqP8bpv8Ykv8drv8BAwUcrP8Zlf8Xjf/s7OzLy8scp/8anP8ZmP/d3d0BBArg4ODT09O7u7sEGCsKCgoanf8YlP/8/Pz09PTIyMgMTIV1dXUGKEVEREQ0NDQODg4GBgYdsv8dsf8Zl//m5uYVgOXj4+MWgtfW1tYTc87BwcERbLWzs7Ovr6+np6cQX6OgoKCTk5MMSXlwcHBra2tiYmIVFRUetf/39/fp6ekWhOkXi+QVfNvY2NjPz88TdcUSb7u6urq3t7cPYK0NUJGQkJCLi4ttbW0JO2cINFtVVVVRUVEHMFEHLEs6OjoEHDEiIiIcHBwXj/vx8fEWh+4Sb8gRbL+rq6upqakOVZiWlpaJiYmGhoYMSIF9fX15eXkKPnQLRHJMTExHR0c9PT0FHzkqKiomJiYEFyUBBw8bovfu7u4Wht4UedsUeMrFxcW9vb0RZrOkpKSampoPXZqAgIALQmtlZWUJOGJZWVkIMFcFIUExMTEwMDAtLS0DEh8Zl/v4+PgXj/QWhvEWhvAYku8YjuwUfNcUfNAVfc0RaLkSaKsRZ6kPWqENUYlbW1sCEBhkSPCkAAAAOHRSTlMA87y4BeKrltbFnUDo0MCup6D67t7ayZKGemtmWS8rEwLNso1wVEpFGaR+UDUlHwmBYls5i1oN/DMym4YAAAfTSURBVHjaxNndS1NxHMfxX5s6t1Kz1KzsuazMnqjgyxv03ovtQrYxUBEfLkREVBQf0AsFBRUUQvEiSVFQ0YsuiiIiqKC/oH+o31lzjtPZg55zttfVNnbx5ffw+X53pmx5UFl2+XLZ4zpVOPWlJFTntYyiBwF/VbX39Sv9upYU9/QHjbXe6qqayrrnylXXi0kov3GVuFiMuNqbHhIu3FcuuohZZ+jDh7mdXkwqlGtKMGmOSFzrGiYe5ZL4+vdsd/SHFyYxtIQlIdiD4ftCa39osTlxRtzwHO1tUOLm0XYk6T3asMRtdKHdUs6qv+L1l/vKgak2SYjqN+1yYg2G5NgR4Pd5/F7fk9sO3YhSkoYkaW40KCk2Rj9KUoikqmtOn8YpydE6J7xFyq5yUhxIjvZJcUfZ5EOb6oxGQmPdtEQlR4Mxupc6IoOdzWiVypabaF1BiesIS876OiSufRXtvO0DcSi2dAN+ZcclYFZsCaOps3nYUOKprDTiSWzqAioCnpIX9ep03pxkw7jYtMWx0pdn7Jb2i1jixN3cM6OGFCti0zgpyopOsw6xiZHoyHIPLIhNHdD7bWR+c7znFD3+PNp+vxhmRkNi28BoWAzBPbQHKhdlQLe4ogsoVTl4ijYjrmiKATdUdvfjh9Ely8DVHFvWe3HJMBBQ2QWAd+KSeeBxjtuxKC7ZzG07Ht0DusQlfwDfs2wZ4b2EYVBcESHO81BlcIWESXHFV7Qss5aXY1FxRSj7L7QAhv3tsaVBMVn8Ou1MFUtjW3sYKjL0jO6QWJiA7iZxysBbtDplpRT4KZbQWkUbHRMnGFUUKwuNaH1iaRJ+Tf8bDbqcWJH2HuCV+l9DpkuxtdsuGlpYHNAJ1FqNMjnE9QocOXJCPwJ309zPT9la8e5yUJwwC/jTBNWQ5EkIqEyzHROSJzvWSeFDW5M8OUArsdgMq2EmanOyGB4WSyMYAhZp2TwkJouw2mZvmusUSwtraA//m7DXZ8SsBxiQM5tGSxNuv3+ZU/NmIpfN9qDXxp1sO4LDNrE202J6cHE1TVq2f1uNiA39K9/7JJ0JwGe6nvOSZ4OA1/R0bFbyrBWoMUX2nOTZAOA3pcSXjFW7UOJnU17VAYeZv98pTvsB1KsTRVXAtqQVA/rFWSNo11SKiuRYZeknEBRn7WJ4rZKuX8pcROvBj6g4rLUZQ8NJYBo2Jb/ax2KkhKYf6I1I3oWngKqUhfgkBTCL1pics1elICaS/5Y9jk+XBdEBeJKhHZGCCLZAWTIkBqQgNlr+NbGi2wHgS1tTAbQNAxW3i1R58WWgd725ANZ7gXPFNaqagrvwt1t7aW0qiOIAPlErPqJCq6JWrW8r1ar1xf0n4NxnnpCELEKyCNmkJZSQRSCbQltooS4sVApiC10U2kWhFRUEEdGF4vuNH8g7c9NQ2pjepPcB/r5ADjlnzp2ZM+QMXHeYb+1WfO5hi5QfveYe33XJ4+d8a3MNQHbI75KhMt9z9wF4FRNcIi3wO94bAHJiQHCHNgmgh3QD8D1MCK6I+KeNCUgbgFFRcEX8Qwhov014o/juUlEoxeqrgpsA7oWp4AZprnpv1ANgShFcoU4a+36jMgOuVGYmnuJ1Wb0hKWqCC8QCgI4dqyfRbNCFoqDBX7Xz6C0AS660K3UKQCdhuqAbdqFT+B8mAXQTbhtbpM7ng4Yn1oytOwFMu5AP9QGAa4Qz8lFwvFWIH6G7Qjijc8/LDueDyvd4z151EYBvwOF+lRFTAK6TGi+ACWdLk0ozANqvkpojAFJKRnCSlFt3m8pLc9bJTylVn64ty9rJfEl1cpVKbH3uJ2v1QleUqOCI2h9xeeP0aVqLCA4JSLk6s7hu6CbkqOAIGpyB7iRZ5xLvFWlHEkITyjK/41/v9h0AC3lngpCz0PXWf0yDUcmBhFDt0T/flx8CkNL8VLAZjUhvAHSQek5AtyALdqP5e9BdbPCkZsbuFRKVvlRHs/W1AfC902yNgoriWwCeqw1fSL+J2VkWNBF8vckr6mPQ3ZcjtkVBA/3z4Ju6Bs5ANzck2BQFpUMTxlVZQ4ege95vUxRUHoPOe5s01OWBbryf2hEFDX4Fc4Vs4gaYZ3ZEQeXBJPgMcFPnwYzJVmeE6jGsGCNAE/rAlPIBamkMQv9YCLpzxJRjYMr5BLXyg5EvgTlKTOoEkw2LUct6dTz4ojqCNO04mMm4ZE150mhMuQ+jHppwAUxqUM5QK9qkPLIE5jhpygkvmHJYiW45FaL8IwmdZy9pUtc2MK9HtvgloZngJyMVp3tJ846ASb7Q1NYrg1JN+ukDs4e05LwHTO5bUKG0tRBEeXAKzJ3rpEXdB8C9fBIWKW0hhOBIBdy2K6R11zvALY6EFYE21yHF4OdKEkz7ObIlXXvAhV4OquoApaYbpCo9qayA29lLturibhimSgOSFjG1ILRwYnwShn09xArnT8PwdnHML6n+hl+2gD8Wjj+rLMOwq49Y5dZpVKUWS++VcCwdCdT5/Uhck5SH45VpVO3qJFbq2Y5Vvly2VBgQY5KqKWI6HY+n06KiqVJMSQyP/37wB6v29xGrnThyEDWh5dyr+fJscbQw/OjRcGG0OFvO3n+QSqKm7exlYgsvNgolkyFs1HGV2OQgTGsjNjnVBtO8Owj3nwbhgWnttgWxy2PaoWaC+AuAXqWYKHupMgAAAABJRU5ErkJggg==',
              alt: j.name,
            }),
            j.name,
          );
        },
        y = l;
    },
    4045: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return g;
        },
      });
      var e = t(22647),
        s = t(77630);
      function l() {
        return (
          (l = Object.assign
            ? Object.assign.bind()
            : function (T) {
                for (var j = 1; j < arguments.length; j++) {
                  var w = arguments[j];
                  for (var L in w) Object.prototype.hasOwnProperty.call(w, L) && (T[L] = w[L]);
                }
                return T;
              }),
          l.apply(this, arguments)
        );
      }
      var y = function () {
          var j = (0, e.OK)(),
            w = (0, e.TH)(),
            L = w.pathname;
          return s.createElement(
            'ul',
            { className: 'dumi-default-navbar' },
            j.map(function (E) {
              return s.createElement(
                'li',
                { key: E.link },
                /^(\w+:)\/\/|^(mailto|tel):/.test(E.link)
                  ? s.createElement(
                      'a',
                      { href: E.link, target: '_blank', rel: 'noreferrer' },
                      E.title,
                    )
                  : s.createElement(
                      e.rU,
                      l(
                        { to: E.link },
                        L.startsWith(E.activePath || E.link) ? { className: 'active' } : {},
                      ),
                      E.title,
                    ),
              );
            }),
          );
        },
        g = y;
    },
    23807: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return P;
        },
      });
      var e = t(22647),
        s = t(77630);
      function l(S, x) {
        return w(S) || j(S, x) || g(S, x) || y();
      }
      function y() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function g(S, x) {
        if (!!S) {
          if (typeof S == 'string') return T(S, x);
          var b = Object.prototype.toString.call(S).slice(8, -1);
          if (
            (b === 'Object' && S.constructor && (b = S.constructor.name),
            b === 'Map' || b === 'Set')
          )
            return Array.from(S);
          if (b === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b))
            return T(S, x);
        }
      }
      function T(S, x) {
        (x == null || x > S.length) && (x = S.length);
        for (var b = 0, Q = new Array(x); b < x; b++) Q[b] = S[b];
        return Q;
      }
      function j(S, x) {
        var b =
          S == null
            ? null
            : (typeof Symbol != 'undefined' && S[Symbol.iterator]) || S['@@iterator'];
        if (b != null) {
          var Q = [],
            W = !0,
            G = !1,
            _,
            K;
          try {
            for (
              b = b.call(S);
              !(W = (_ = b.next()).done) && (Q.push(_.value), !(x && Q.length === x));
              W = !0
            );
          } catch (q) {
            (G = !0), (K = q);
          } finally {
            try {
              !W && b.return != null && b.return();
            } finally {
              if (G) throw K;
            }
          }
          return Q;
        }
      }
      function w(S) {
        if (Array.isArray(S)) return S;
      }
      var L = 'dumi:rtl',
        E = function () {
          var x = (0, s.useState)(!1),
            b = l(x, 2),
            Q = b[0],
            W = b[1],
            G = (0, e.WF)(),
            _ = G.themeConfig;
          return (
            (0, s.useEffect)(function () {
              localStorage.getItem(L) &&
                (W(!0), document.documentElement.setAttribute('data-direction', 'rtl'));
            }, []),
            _.rtl
              ? s.createElement(
                  'span',
                  {
                    className: 'dumi-default-lang-switch',
                    onClick: function () {
                      Q
                        ? (document.documentElement.removeAttribute('data-direction'),
                          localStorage.removeItem(L))
                        : (document.documentElement.setAttribute('data-direction', 'rtl'),
                          localStorage.setItem(L, '1')),
                        W(!Q);
                    },
                  },
                  Q ? 'LTR' : 'RTL',
                )
              : null
          );
        },
        P = E;
    },
    55116: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return ue;
        },
      });
      var e = t(77630),
        s = Object.defineProperty,
        l = Object.getOwnPropertySymbols,
        y = Object.prototype.hasOwnProperty,
        g = Object.prototype.propertyIsEnumerable,
        T = (o, u, a) =>
          u in o
            ? s(o, u, { enumerable: !0, configurable: !0, writable: !0, value: a })
            : (o[u] = a),
        j = (o, u) => {
          for (var a in u || (u = {})) y.call(u, a) && T(o, a, u[a]);
          if (l) for (var a of l(u)) g.call(u, a) && T(o, a, u[a]);
          return o;
        };
      const w = (o) =>
        e.createElement(
          'svg',
          j({ viewBox: '64 64 896 896' }, o),
          e.createElement('path', {
            d: 'M909.6 854.5 649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z',
          }),
        );
      var L =
          'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSI2NCA2NCA4OTYgODk2Ij48cGF0aCBkPSJNOTA5LjYgODU0LjUgNjQ5LjkgNTk0LjhDNjkwLjIgNTQyLjcgNzEyIDQ3OSA3MTIgNDEyYzAtODAuMi0zMS4zLTE1NS40LTg3LjktMjEyLjEtNTYuNi01Ni43LTEzMi04Ny45LTIxMi4xLTg3LjlzLTE1NS41IDMxLjMtMjEyLjEgODcuOUMxNDMuMiAyNTYuNSAxMTIgMzMxLjggMTEyIDQxMmMwIDgwLjEgMzEuMyAxNTUuNSA4Ny45IDIxMi4xQzI1Ni41IDY4MC44IDMzMS44IDcxMiA0MTIgNzEyYzY3IDAgMTMwLjYtMjEuOCAxODIuNy02MmwyNTkuNyAyNTkuNmE4LjIgOC4yIDAgMCAwIDExLjYgMGw0My42LTQzLjVhOC4yIDguMiAwIDAgMCAwLTExLjZ6TTU3MC40IDU3MC40QzUyOCA2MTIuNyA0NzEuOCA2MzYgNDEyIDYzNnMtMTE2LTIzLjMtMTU4LjQtNjUuNkMyMTEuMyA1MjggMTg4IDQ3MS44IDE4OCA0MTJzMjMuMy0xMTYuMSA2NS42LTE1OC40QzI5NiAyMTEuMyAzNTIuMiAxODggNDEyIDE4OHMxMTYuMSAyMy4yIDE1OC40IDY1LjZTNjM2IDM1Mi4yIDYzNiA0MTJzLTIzLjMgMTE2LjEtNjUuNiAxNTguNHoiLz48L3N2Zz4=',
        E = t(22647),
        P = Object.defineProperty,
        S = Object.getOwnPropertySymbols,
        x = Object.prototype.hasOwnProperty,
        b = Object.prototype.propertyIsEnumerable,
        Q = (o, u, a) =>
          u in o
            ? P(o, u, { enumerable: !0, configurable: !0, writable: !0, value: a })
            : (o[u] = a),
        W = (o, u) => {
          for (var a in u || (u = {})) x.call(u, a) && Q(o, a, u[a]);
          if (S) for (var a of S(u)) b.call(u, a) && Q(o, a, u[a]);
          return o;
        };
      const G = (o) =>
        e.createElement(
          'svg',
          W({ viewBox: '0 0 1024 1024' }, o),
          e.createElement('path', {
            d: 'm885.2 446.3-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0 0 60.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z',
          }),
        );
      var _ =
        'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0Ij48cGF0aCBkPSJtODg1LjIgNDQ2LjMtLjItLjgtMTEyLjItMjg1LjFjLTUtMTYuMS0xOS45LTI3LjItMzYuOC0yNy4ySDI4MS4yYy0xNyAwLTMyLjEgMTEuMy0zNi45IDI3LjZMMTM5LjQgNDQzbC0uMy43LS4yLjhjLTEuMyA0LjktMS43IDkuOS0xIDE0LjgtLjEgMS42LS4yIDMuMi0uMiA0LjhWODMwYTYwLjkgNjAuOSAwIDAgMCA2MC44IDYwLjhoNjI3LjJjMzMuNSAwIDYwLjgtMjcuMyA2MC45LTYwLjhWNDY0LjFjMC0xLjMgMC0yLjYtLjEtMy43LjQtNC45IDAtOS42LTEuMy0xNC4xem0tMjk1LjgtNDMtLjMgMTUuN2MtLjggNDQuOS0zMS44IDc1LjEtNzcuMSA3NS4xLTIyLjEgMC00MS4xLTcuMS01NC44LTIwLjZTNDM2IDQ0MS4yIDQzNS42IDQxOWwtLjMtMTUuN0gyMjkuNUwzMDkgMjEwaDM5OS4ybDgxLjcgMTkzLjNINTg5LjR6bS0zNzUgNzYuOGgxNTcuM2MyNC4zIDU3LjEgNzYgOTAuOCAxNDAuNCA5MC44IDMzLjcgMCA2NS05LjQgOTAuMy0yNy4yIDIyLjItMTUuNiAzOS41LTM3LjQgNTAuNy02My42aDE1Ni41VjgxNEgyMTQuNFY0ODAuMXoiLz48L3N2Zz4=';
      function K(o, u) {
        return H(o) || d(o, u) || p(o, u) || q();
      }
      function q() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function p(o, u) {
        if (!!o) {
          if (typeof o == 'string') return N(o, u);
          var a = Object.prototype.toString.call(o).slice(8, -1);
          if (
            (a === 'Object' && o.constructor && (a = o.constructor.name),
            a === 'Map' || a === 'Set')
          )
            return Array.from(o);
          if (a === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))
            return N(o, u);
        }
      }
      function N(o, u) {
        (u == null || u > o.length) && (u = o.length);
        for (var a = 0, C = new Array(u); a < u; a++) C[a] = o[a];
        return C;
      }
      function d(o, u) {
        var a =
          o == null
            ? null
            : (typeof Symbol != 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
        if (a != null) {
          var C = [],
            Y = !0,
            z = !1,
            k,
            B;
          try {
            for (
              a = a.call(o);
              !(Y = (k = a.next()).done) && (C.push(k.value), !(u && C.length === u));
              Y = !0
            );
          } catch (V) {
            (z = !0), (B = V);
          } finally {
            try {
              !Y && a.return != null && a.return();
            } finally {
              if (z) throw B;
            }
          }
          return C;
        }
      }
      function H(o) {
        if (Array.isArray(o)) return o;
      }
      var R = function () {
          return e.createElement(
            'svg',
            { viewBox: '0 0 32 32', xmlns: 'http://www.w3.org/2000/svg' },
            e.createElement('path', {
              d: 'M5.333 10.667h21.334c.889 0 1.333.444 1.333 1.333s-.444 1.333-1.333 1.333H5.333C4.444 13.333 4 12.89 4 12s.444-1.333 1.333-1.333Z',
            }),
            e.createElement('path', {
              d: 'M13.207 2.667h.126a1.206 1.206 0 0 1 1.2 1.326l-2.413 24.14a1.333 1.333 0 0 1-1.327 1.2h-.126a1.206 1.206 0 0 1-1.2-1.326l2.413-24.14c.068-.682.642-1.2 1.327-1.2Zm8 0h.126a1.206 1.206 0 0 1 1.2 1.326l-2.413 24.14a1.333 1.333 0 0 1-1.327 1.2h-.126a1.206 1.206 0 0 1-1.2-1.326l2.413-24.14c.068-.682.642-1.2 1.327-1.2Z',
            }),
            e.createElement('path', {
              d: 'M5.333 18.667h21.334c.889 0 1.333.444 1.333 1.333s-.444 1.333-1.333 1.333H5.333C4.444 21.333 4 20.89 4 20s.444-1.333 1.333-1.333Z',
            }),
          );
        },
        A = function () {
          return e.createElement(
            'svg',
            { viewBox: '0 0 32 32', xmlns: 'http://www.w3.org/2000/svg' },
            e.createElement('path', {
              d: 'M9.402 0h14.78L30 6.16V24.5c0 1.933-1.71 3.5-3.589 3.5H9.401C7.524 28 6 26.433 6 24.5v-21C6 1.567 7.523 0 9.402 0ZM23 2v4.183c0 .451.366.817.817.817H28l-5-5Zm3.333 24c.92 0 1.667-.768 1.667-1.714V8.857h-5c-.92 0-1.667-.767-1.667-1.714V2H9.667C8.747 2 8 2.768 8 3.714v20.572C8 25.232 8.746 26 9.667 26h16.666Z',
            }),
          );
        },
        h = function () {
          return e.createElement(
            'svg',
            { viewBox: '0 0 32 32', xmlns: 'http://www.w3.org/2000/svg' },
            e.createElement('path', {
              d: 'M6.12 14.589h6.628l1.52 4.004h2.485l-5.938-15.19H8.053L2.115 18.732H4.6l1.52-4.143ZM8.88 6.855c.139-.414.277-.828.415-1.38h.138c0 .138.138.414.414 1.104 0 .138.138.276.138.276 0 .138.829 2.072 2.21 5.938H6.672c1.519-3.866 2.21-5.8 2.21-5.938Zm8.148 2.348h12.705v1.933H17.029V9.203ZM2.115 20.665h27.619v1.933H2.114v-1.933Zm14.914-5.662h12.705v1.933H17.029v-1.933ZM2.115 26.327h27.619v1.933H2.114v-1.933ZM17.029 3.54h12.705v1.934H17.029V3.54Z',
            }),
          );
        },
        M = function () {
          return e.createElement(
            'svg',
            { viewBox: '0 0 32 32', xmlns: 'http://www.w3.org/2000/svg' },
            e.createElement('path', {
              d: 'M28 6h-5a5 5 0 0 0-10 0H8a2 2 0 0 0-2 2v5a5 5 0 0 0 0 10v5a2 2 0 0 0 2 2h7v-2a3 3 0 0 1 6 0v2h7a2 2 0 0 0 2-2v-7h-2a3 3 0 0 1 0-6h2V8a2 2 0 0 0-2-2Zm-5 12a5 5 0 0 0 5 5v5h-5a5 5 0 0 0-10 0H8v-7H6a3 3 0 0 1 0-6h2V8h7V6a3 3 0 0 1 6 0v2h7v5a5 5 0 0 0-5 5Z',
            }),
          );
        },
        Z = { title: R, page: A, content: h, demo: M },
        J = function (u) {
          return e.createElement(
            e.Fragment,
            null,
            u.texts.map(function (a, C) {
              return e.createElement(
                e.Fragment,
                { key: C },
                a.highlighted ? e.createElement('mark', null, a.text) : a.text,
              );
            }),
          );
        },
        ee = function (u) {
          var a = (0, e.useCallback)(
              function () {
                var B = 0,
                  V = [];
                return (
                  u.forEach(function (X) {
                    X.title && V.push({ type: 'title', value: { title: X.title } }),
                      X.hints.forEach(function (F) {
                        V.push({ type: 'hint', activeIndex: B++, value: F });
                      });
                  }),
                  [V, B]
                );
              },
              [u],
            ),
            C = (0, e.useState)(a),
            Y = K(C, 2),
            z = Y[0],
            k = Y[1];
          return (
            (0, e.useEffect)(
              function () {
                k(a);
              },
              [u],
            ),
            z
          );
        },
        v = function (u) {
          var a = ee(u.data),
            C = K(a, 2),
            Y = C[0],
            z = C[1],
            k = (0, e.useState)(-1),
            B = K(k, 2),
            V = B[0],
            X = B[1];
          return (
            (0, e.useEffect)(function () {
              var F = function (re) {
                if (re.key === 'ArrowDown') X((V + 1) % z);
                else if (re.key === 'ArrowUp') X((V + z - 1) % z);
                else if (re.key === 'Enter' && V >= 0) {
                  var ce = Y.find(function (le) {
                    return le.type === 'hint' && le.activeIndex === V;
                  }).value;
                  E.m8.push(ce.link), document.activeElement.blur();
                }
                ['Escape', 'Enter'].includes(re.key) && X(-1);
              };
              return (
                document.addEventListener('keydown', F),
                function () {
                  return document.removeEventListener('keydown', F);
                }
              );
            }),
            e.createElement(
              'div',
              {
                className: 'dumi-default-search-result',
                onMouseEnter: function () {
                  return X(-1);
                },
                onMouseDownCapture: function (ne) {
                  return ne.preventDefault();
                },
                onMouseUpCapture: function () {
                  document.activeElement.blur();
                },
              },
              Boolean(u.data.length || u.loading)
                ? e.createElement(
                    'dl',
                    null,
                    Y.map(function (F, ne) {
                      return F.type === 'title'
                        ? e.createElement('dt', { key: String(ne) }, F.value.title)
                        : e.createElement(
                            'dd',
                            { key: String(ne) },
                            e.createElement(
                              E.rU,
                              { to: F.value.link, 'data-active': V === F.activeIndex || void 0 },
                              e.createElement(Z[F.value.type]),
                              e.createElement(
                                'h4',
                                null,
                                e.createElement(J, { texts: F.value.highlightTitleTexts }),
                              ),
                              e.createElement(
                                'p',
                                null,
                                e.createElement(J, { texts: F.value.highlightTexts }),
                              ),
                            ),
                          );
                    }),
                  )
                : e.createElement(
                    'div',
                    { className: 'dumi-default-search-empty' },
                    e.createElement(G, null),
                    e.createElement(E._H, { id: 'search.not.found' }),
                  ),
            )
          );
        },
        m = v,
        r;
      function i(o, u) {
        return D(o) || U(o, u) || I(o, u) || c();
      }
      function c() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function I(o, u) {
        if (!!o) {
          if (typeof o == 'string') return O(o, u);
          var a = Object.prototype.toString.call(o).slice(8, -1);
          if (
            (a === 'Object' && o.constructor && (a = o.constructor.name),
            a === 'Map' || a === 'Set')
          )
            return Array.from(o);
          if (a === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))
            return O(o, u);
        }
      }
      function O(o, u) {
        (u == null || u > o.length) && (u = o.length);
        for (var a = 0, C = new Array(u); a < u; a++) C[a] = o[a];
        return C;
      }
      function U(o, u) {
        var a =
          o == null
            ? null
            : (typeof Symbol != 'undefined' && o[Symbol.iterator]) || o['@@iterator'];
        if (a != null) {
          var C = [],
            Y = !0,
            z = !1,
            k,
            B;
          try {
            for (
              a = a.call(o);
              !(Y = (k = a.next()).done) && (C.push(k.value), !(u && C.length === u));
              Y = !0
            );
          } catch (V) {
            (z = !0), (B = V);
          } finally {
            try {
              !Y && a.return != null && a.return();
            } finally {
              if (z) throw B;
            }
          }
          return C;
        }
      }
      function D(o) {
        if (Array.isArray(o)) return o;
      }
      var $ = /(mac|iphone|ipod|ipad)/i.test(
          typeof navigator != 'undefined'
            ? (r = navigator) === null || r === void 0
              ? void 0
              : r.platform
            : '',
        ),
        te = function () {
          var u = (0, E.YB)(),
            a = (0, e.useRef)(!1),
            C = (0, e.useState)(!1),
            Y = i(C, 2),
            z = Y[0],
            k = Y[1],
            B = (0, e.useRef)(null),
            V = (0, e.useState)('\u2318'),
            X = i(V, 2),
            F = X[0],
            ne = X[1],
            re = (0, E.OO)(),
            ce = re.keywords,
            le = re.setKeywords,
            fe = re.result,
            ve = re.loading;
          return (
            (0, e.useEffect)(function () {
              $ || ne('Ctrl');
              var oe = function (ie) {
                if (($ ? ie.metaKey : ie.ctrlKey) && ie.key === 'k') {
                  var se;
                  (se = B.current) === null || se === void 0 || se.focus(), ie.preventDefault();
                }
              };
              return (
                document.addEventListener('keydown', oe),
                function () {
                  return document.removeEventListener('keydown', oe);
                }
              );
            }, []),
            e.createElement(
              'div',
              { className: 'dumi-default-search-bar' },
              e.createElement(w, null),
              e.createElement('input', {
                onCompositionStart: function () {
                  return (a.current = !0);
                },
                onCompositionEnd: function (ae) {
                  (a.current = !1), le(ae.currentTarget.value);
                },
                onFocus: function () {
                  return k(!0);
                },
                onBlur: function () {
                  setTimeout(function () {
                    k(!1);
                  }, 1);
                },
                onKeyDown: function (ae) {
                  ['ArrowDown', 'ArrowUp'].includes(ae.key) && ae.preventDefault(),
                    ae.key === 'Escape' && !a.current && ae.currentTarget.blur();
                },
                onChange: function (ae) {
                  setTimeout(function () {
                    a.current || le(ae.target.value);
                  }, 1);
                },
                placeholder: u.formatMessage({ id: 'header.search.placeholder' }),
                ref: B,
              }),
              e.createElement('span', { className: 'dumi-default-search-shortcut' }, F, ' K'),
              ce.trim() &&
                z &&
                (fe.length || !ve) &&
                e.createElement(
                  'div',
                  { className: 'dumi-default-search-popover' },
                  e.createElement('section', null, e.createElement(m, { data: fe, loading: ve })),
                ),
            )
          );
        },
        ue = te;
    },
    78319: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return g;
        },
      });
      var e = t(22647),
        s = t(86613),
        l = t(77630),
        y = function () {
          var j = (0, e.TH)(),
            w = j.pathname,
            L = (0, e.eL)(),
            E = (0, e.tx)();
          return E
            ? l.createElement(
                'div',
                { className: 'dumi-default-sidebar' },
                E.map(function (P, S) {
                  return l.createElement(
                    'dl',
                    { className: 'dumi-default-sidebar-group', key: String(S) },
                    P.title && l.createElement('dt', null, P.title),
                    P.children.map(function (x) {
                      return l.createElement(
                        'dd',
                        { key: x.link },
                        l.createElement(e.OL, { to: x.link, title: x.title, end: !0 }, x.title),
                        x.link === w && L.frontmatter.toc === 'menu' && l.createElement(s.Z, null),
                      );
                    }),
                  );
                }),
              )
            : null;
        },
        g = y;
    },
    88099: function (n, f, t) {
      'use strict';
      t.d(f, {
        Z: function () {
          return m;
        },
      });
      var e = t(83412),
        s = t.n(e),
        l = t(87720),
        y = t.n(l),
        g = t(77630),
        T = t(25778),
        j = t.n(T),
        w = t(58115),
        L = t.n(w),
        E = t(95673),
        P = t.n(E),
        S = t(44744),
        x = t.n(S),
        b = t(8691),
        Q = t.n(b),
        W = t(77007),
        G = t.n(W),
        _ = L()(function r() {
          j()(this, r);
        }),
        K = (function (r) {
          x()(c, r);
          var i = Q()(c);
          function c(I) {
            var O;
            return j()(this, c), (O = i.call(this)), G()(P()(O), 'el', void 0), (O.el = I), O;
          }
          return (
            L()(
              c,
              [
                {
                  key: 'top',
                  get: function () {
                    return this.el.getBoundingClientRect().top;
                  },
                },
                {
                  key: 'outerHeight',
                  get: function () {
                    return this.el.getBoundingClientRect().height;
                  },
                },
                {
                  key: 'scrollTop',
                  get: function () {
                    return this.el.scrollTop;
                  },
                },
                {
                  key: 'scrollHeight',
                  get: function () {
                    return this.el.scrollHeight;
                  },
                },
                {
                  key: 'isScrolledToBottom',
                  value: function () {
                    return this.scrollTop + this.outerHeight >= this.scrollHeight;
                  },
                },
                {
                  key: 'registerScrollEvent',
                  value: function (O) {
                    this.el.addEventListener('scroll', O);
                  },
                },
                {
                  key: 'unregisterScrollEvent',
                  value: function (O) {
                    this.el.removeEventListener('scroll', O);
                  },
                },
              ],
              [
                {
                  key: 'create',
                  value: function (O) {
                    var U = document.querySelector(O);
                    if (!U) throw new Error('element is not found.');
                    return new c(U);
                  },
                },
              ],
            ),
            c
          );
        })(_),
        q = (function (r) {
          x()(c, r);
          var i = Q()(c);
          function c() {
            return j()(this, c), i.apply(this, arguments);
          }
          return (
            L()(
              c,
              [
                {
                  key: 'outerHeight',
                  get: function () {
                    return window.innerHeight;
                  },
                },
                {
                  key: 'scrollTop',
                  get: function () {
                    return document.documentElement.scrollTop;
                  },
                },
                {
                  key: 'scrollHeight',
                  get: function () {
                    return document.documentElement.scrollHeight;
                  },
                },
                {
                  key: 'isScrolledToBottom',
                  value: function () {
                    return this.scrollTop + this.outerHeight >= this.scrollHeight;
                  },
                },
                {
                  key: 'registerScrollEvent',
                  value: function (O) {
                    document.addEventListener('scroll', O);
                  },
                },
                {
                  key: 'unregisterScrollEvent',
                  value: function (O) {
                    document.removeEventListener('scroll', O);
                  },
                },
              ],
              [
                {
                  key: 'create',
                  value: function () {
                    return new c();
                  },
                },
              ],
            ),
            c
          );
        })(_),
        p = (function () {
          function r() {
            j()(this, r);
          }
          return (
            L()(r, null, [
              {
                key: 'create',
                value: function (c) {
                  return c ? K.create(c) : q.create();
                },
              },
            ]),
            r
          );
        })(),
        N = function (i) {
          var c = i.sectionRefs,
            I = i.rootSelector,
            O = i.offset,
            U = O === void 0 ? 0 : O,
            D = (0, g.useRef)(null);
          (0, g.useEffect)(
            function () {
              D.current = p.create(I);
            },
            [I],
          );
          var $ = (0, g.useCallback)(
              function () {
                return D.current ? D.current.isScrolledToBottom() : !1;
              },
              [D],
            ),
            te = (0, g.useCallback)(
              function (k) {
                if (!D.current) return !1;
                var B = D.current.scrollTop,
                  V = B + D.current.outerHeight,
                  X = k.getBoundingClientRect(),
                  F = D.current instanceof K ? B + X.top - D.current.top + U : B + X.top + U,
                  ne = F + X.height;
                return [F < V, ne > B].every(function (re) {
                  return re;
                });
              },
              [D, U],
            ),
            ue = (0, g.useCallback)(
              function () {
                return c.map(function (k) {
                  return k.current ? te(k.current) : !1;
                });
              },
              [te, c],
            ),
            o = (0, g.useState)([]),
            u = y()(o, 2),
            a = u[0],
            C = u[1],
            Y = (0, g.useMemo)(
              function () {
                return a.findIndex(function (k) {
                  return k;
                });
              },
              [a],
            ),
            z = (0, g.useCallback)(
              function () {
                var k = $()
                  ? [].concat(
                      s()(
                        new Array(c.length - 1).fill(!1).map(function (B) {
                          return B;
                        }),
                      ),
                      [!0],
                    )
                  : ue();
                C(k);
              },
              [ue, $, c],
            );
          return (
            (0, g.useEffect)(
              function () {
                return (
                  z(),
                  D.current && D.current.registerScrollEvent(z),
                  function () {
                    D.current && D.current.unregisterScrollEvent(z);
                  }
                );
              },
              [z],
            ),
            { elementsStatusInViewport: a, currentElementIndexInViewport: Y }
          );
        },
        d = function (i) {
          var c = i.children,
            I = i.sectionRefs,
            O = i.rootSelector,
            U = i.offset,
            D = N({ sectionRefs: I, rootSelector: O, offset: U }),
            $ = D.elementsStatusInViewport,
            te = D.currentElementIndexInViewport;
          return c({ elementsStatusInViewport: $, currentElementIndexInViewport: te });
        },
        H = t(22647);
      function R() {
        return (
          (R = Object.assign
            ? Object.assign.bind()
            : function (r) {
                for (var i = 1; i < arguments.length; i++) {
                  var c = arguments[i];
                  for (var I in c) Object.prototype.hasOwnProperty.call(c, I) && (r[I] = c[I]);
                }
                return r;
              }),
          R.apply(this, arguments)
        );
      }
      function A(r, i) {
        return ee(r) || J(r, i) || M(r, i) || h();
      }
      function h() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function M(r, i) {
        if (!!r) {
          if (typeof r == 'string') return Z(r, i);
          var c = Object.prototype.toString.call(r).slice(8, -1);
          if (
            (c === 'Object' && r.constructor && (c = r.constructor.name),
            c === 'Map' || c === 'Set')
          )
            return Array.from(r);
          if (c === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c))
            return Z(r, i);
        }
      }
      function Z(r, i) {
        (i == null || i > r.length) && (i = r.length);
        for (var c = 0, I = new Array(i); c < i; c++) I[c] = r[c];
        return I;
      }
      function J(r, i) {
        var c =
          r == null
            ? null
            : (typeof Symbol != 'undefined' && r[Symbol.iterator]) || r['@@iterator'];
        if (c != null) {
          var I = [],
            O = !0,
            U = !1,
            D,
            $;
          try {
            for (
              c = c.call(r);
              !(O = (D = c.next()).done) && (I.push(D.value), !(i && I.length === i));
              O = !0
            );
          } catch (te) {
            (U = !0), ($ = te);
          } finally {
            try {
              !O && c.return != null && c.return();
            } finally {
              if (U) throw $;
            }
          }
          return I;
        }
      }
      function ee(r) {
        if (Array.isArray(r)) return r;
      }
      var v = function () {
          var i = (0, H.TH)(),
            c = i.pathname,
            I = (0, H.eL)(),
            O = (0, H.WF)(),
            U = O.loading,
            D = (0, g.useRef)(0),
            $ = (0, g.useState)([]),
            te = A($, 2),
            ue = te[0],
            o = te[1],
            u = I.toc.filter(function (a) {
              var C = a.depth;
              return C > 1 && C < 4;
            });
          return (
            (0, g.useEffect)(
              function () {
                if (!U) {
                  var a = u.map(function (C) {
                    var Y = C.id;
                    return { current: document.getElementById(Y) };
                  });
                  o(a);
                }
              },
              [c, U],
            ),
            ue.length
              ? g.createElement(d, { sectionRefs: ue }, function (a) {
                  var C = a.currentElementIndexInViewport;
                  return (
                    C > -1 && (D.current = C),
                    g.createElement(
                      'ul',
                      { className: 'dumi-default-toc' },
                      u
                        .filter(function (Y) {
                          var z = Y.depth;
                          return z > 1 && z < 4;
                        })
                        .map(function (Y, z) {
                          var k = '#'.concat(encodeURIComponent(Y.id)),
                            B = C > -1 ? C : D.current;
                          return g.createElement(
                            'li',
                            { key: Y.id, 'data-depth': Y.depth },
                            g.createElement(
                              'a',
                              R(
                                { href: k, title: Y.title },
                                B === z ? { className: 'active' } : {},
                              ),
                              Y.title,
                            ),
                          );
                        }),
                    )
                  );
                })
              : null
          );
        },
        m = v;
    },
    49995: function (n, f, t) {
      var e = t(14419);
      function s(l) {
        if (Array.isArray(l)) return e(l);
      }
      (n.exports = s), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    95673: function (n) {
      function f(t) {
        if (t === void 0)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }
      (n.exports = f), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    25778: function (n) {
      function f(t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
      }
      (n.exports = f), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    58115: function (n) {
      function f(e, s) {
        for (var l = 0; l < s.length; l++) {
          var y = s[l];
          (y.enumerable = y.enumerable || !1),
            (y.configurable = !0),
            'value' in y && (y.writable = !0),
            Object.defineProperty(e, y.key, y);
        }
      }
      function t(e, s, l) {
        return (
          s && f(e.prototype, s),
          l && f(e, l),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          e
        );
      }
      (n.exports = t), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    8691: function (n, f, t) {
      var e = t(52416),
        s = t(52342),
        l = t(69485);
      function y(g) {
        var T = s();
        return function () {
          var w = e(g),
            L;
          if (T) {
            var E = e(this).constructor;
            L = Reflect.construct(w, arguments, E);
          } else L = w.apply(this, arguments);
          return l(this, L);
        };
      }
      (n.exports = y), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    52416: function (n) {
      function f(t) {
        return (
          (n.exports = f =
            Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (s) {
                  return s.__proto__ || Object.getPrototypeOf(s);
                }),
          (n.exports.__esModule = !0),
          (n.exports.default = n.exports),
          f(t)
        );
      }
      (n.exports = f), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    44744: function (n, f, t) {
      var e = t(27432);
      function s(l, y) {
        if (typeof y != 'function' && y !== null)
          throw new TypeError('Super expression must either be null or a function');
        (l.prototype = Object.create(y && y.prototype, {
          constructor: { value: l, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(l, 'prototype', { writable: !1 }),
          y && e(l, y);
      }
      (n.exports = s), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    52342: function (n) {
      function f() {
        if (typeof Reflect == 'undefined' || !Reflect.construct || Reflect.construct.sham)
          return !1;
        if (typeof Proxy == 'function') return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
        } catch (t) {
          return !1;
        }
      }
      (n.exports = f), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    481: function (n) {
      function f(t) {
        if ((typeof Symbol != 'undefined' && t[Symbol.iterator] != null) || t['@@iterator'] != null)
          return Array.from(t);
      }
      (n.exports = f), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    38110: function (n) {
      function f() {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      (n.exports = f), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    69485: function (n, f, t) {
      var e = t(93381).default,
        s = t(95673);
      function l(y, g) {
        if (g && (e(g) === 'object' || typeof g == 'function')) return g;
        if (g !== void 0)
          throw new TypeError('Derived constructors may only return object or undefined');
        return s(y);
      }
      (n.exports = l), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    27432: function (n) {
      function f(t, e) {
        return (
          (n.exports = f =
            Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (l, y) {
                  return (l.__proto__ = y), l;
                }),
          (n.exports.__esModule = !0),
          (n.exports.default = n.exports),
          f(t, e)
        );
      }
      (n.exports = f), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
    83412: function (n, f, t) {
      var e = t(49995),
        s = t(481),
        l = t(65537),
        y = t(38110);
      function g(T) {
        return e(T) || s(T) || l(T) || y();
      }
      (n.exports = g), (n.exports.__esModule = !0), (n.exports.default = n.exports);
    },
  },
]);
