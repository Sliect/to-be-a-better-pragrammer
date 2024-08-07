(function () {
  var tt = {
      43238: function (b) {
        b.exports = (function (p) {
          var l = {};
          function _(w) {
            if (l[w]) return l[w].exports;
            var v = (l[w] = { exports: {}, id: w, loaded: !1 });
            return p[w].call(v.exports, v, v.exports, _), (v.loaded = !0), v.exports;
          }
          return (_.m = p), (_.c = l), (_.p = ''), _(0);
        })([
          function (p, l, _) {
            p.exports = _(1);
          },
          function (p, l, _) {
            'use strict';
            Object.defineProperty(l, '__esModule', { value: !0 });
            var w = _(2);
            Object.defineProperty(l, 'combineChunks', {
              enumerable: !0,
              get: function () {
                return w.combineChunks;
              },
            }),
              Object.defineProperty(l, 'fillInChunks', {
                enumerable: !0,
                get: function () {
                  return w.fillInChunks;
                },
              }),
              Object.defineProperty(l, 'findAll', {
                enumerable: !0,
                get: function () {
                  return w.findAll;
                },
              }),
              Object.defineProperty(l, 'findChunks', {
                enumerable: !0,
                get: function () {
                  return w.findChunks;
                },
              });
          },
          function (p, l) {
            'use strict';
            Object.defineProperty(l, '__esModule', { value: !0 });
            var _ = (l.findAll = function (f) {
                var x = f.autoEscape,
                  g = f.caseSensitive,
                  O = g === void 0 ? !1 : g,
                  m = f.findChunks,
                  k = m === void 0 ? v : m,
                  T = f.sanitize,
                  j = f.searchWords,
                  y = f.textToHighlight;
                return Y({
                  chunksToHighlight: w({
                    chunks: k({
                      autoEscape: x,
                      caseSensitive: O,
                      sanitize: T,
                      searchWords: j,
                      textToHighlight: y,
                    }),
                  }),
                  totalLength: y ? y.length : 0,
                });
              }),
              w = (l.combineChunks = function (f) {
                var x = f.chunks;
                return (
                  (x = x
                    .sort(function (g, O) {
                      return g.start - O.start;
                    })
                    .reduce(function (g, O) {
                      if (g.length === 0) return [O];
                      var m = g.pop();
                      if (O.start <= m.end) {
                        var k = Math.max(m.end, O.end);
                        g.push({ highlight: !1, start: m.start, end: k });
                      } else g.push(m, O);
                      return g;
                    }, [])),
                  x
                );
              }),
              v = function (f) {
                var x = f.autoEscape,
                  g = f.caseSensitive,
                  O = f.sanitize,
                  m = O === void 0 ? Q : O,
                  k = f.searchWords,
                  T = f.textToHighlight;
                return (
                  (T = m(T)),
                  k
                    .filter(function (j) {
                      return j;
                    })
                    .reduce(function (j, y) {
                      (y = m(y)), x && (y = G(y));
                      for (var R = new RegExp(y, g ? 'g' : 'gi'), A = void 0; (A = R.exec(T)); ) {
                        var K = A.index,
                          L = R.lastIndex;
                        L > K && j.push({ highlight: !1, start: K, end: L }),
                          A.index === R.lastIndex && R.lastIndex++;
                      }
                      return j;
                    }, [])
                );
              };
            l.findChunks = v;
            var Y = (l.fillInChunks = function (f) {
              var x = f.chunksToHighlight,
                g = f.totalLength,
                O = [],
                m = function (j, y, R) {
                  y - j > 0 && O.push({ start: j, end: y, highlight: R });
                };
              if (x.length === 0) m(0, g, !1);
              else {
                var k = 0;
                x.forEach(function (T) {
                  m(k, T.start, !1), m(T.start, T.end, !0), (k = T.end);
                }),
                  m(k, g, !1);
              }
              return O;
            });
            function Q(I) {
              return I;
            }
            function G(I) {
              return I.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            }
          },
        ]);
      },
    },
    N = {};
  function C(b) {
    var p = N[b];
    if (p !== void 0) return p.exports;
    var l = (N[b] = { exports: {} });
    return tt[b](l, l.exports, C), l.exports;
  }
  (function () {
    C.n = function (b) {
      var p =
        b && b.__esModule
          ? function () {
              return b.default;
            }
          : function () {
              return b;
            };
      return C.d(p, { a: p }), p;
    };
  })(),
    (function () {
      C.d = function (b, p) {
        for (var l in p)
          C.o(p, l) && !C.o(b, l) && Object.defineProperty(b, l, { enumerable: !0, get: p[l] });
      };
    })(),
    (function () {
      C.o = function (b, p) {
        return Object.prototype.hasOwnProperty.call(b, p);
      };
    })();
  var at = {};
  (function () {
    'use strict';
    var b = C(43238),
      p = C.n(b);
    function l(t, n) {
      var e = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var u = Object.getOwnPropertySymbols(t);
        n &&
          (u = u.filter(function (c) {
            return Object.getOwnPropertyDescriptor(t, c).enumerable;
          })),
          e.push.apply(e, u);
      }
      return e;
    }
    function _(t) {
      for (var n = 1; n < arguments.length; n++) {
        var e = arguments[n] != null ? arguments[n] : {};
        n % 2
          ? l(Object(e), !0).forEach(function (u) {
              w(t, u, e[u]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e))
          : l(Object(e)).forEach(function (u) {
              Object.defineProperty(t, u, Object.getOwnPropertyDescriptor(e, u));
            });
      }
      return t;
    }
    function w(t, n, e) {
      return (
        n in t
          ? Object.defineProperty(t, n, {
              value: e,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[n] = e),
        t
      );
    }
    function v(t, n) {
      return G(t) || Q(t, n) || g(t, n) || Y();
    }
    function Y() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function Q(t, n) {
      var e =
        t == null ? null : (typeof Symbol != 'undefined' && t[Symbol.iterator]) || t['@@iterator'];
      if (e != null) {
        var u = [],
          c = !0,
          r = !1,
          o,
          a;
        try {
          for (
            e = e.call(t);
            !(c = (o = e.next()).done) && (u.push(o.value), !(n && u.length === n));
            c = !0
          );
        } catch (i) {
          (r = !0), (a = i);
        } finally {
          try {
            !c && e.return != null && e.return();
          } finally {
            if (r) throw a;
          }
        }
        return u;
      }
    }
    function G(t) {
      if (Array.isArray(t)) return t;
    }
    function I(t, n) {
      var e = (typeof Symbol != 'undefined' && t[Symbol.iterator]) || t['@@iterator'];
      if (!e) {
        if (Array.isArray(t) || (e = g(t)) || (n && t && typeof t.length == 'number')) {
          e && (t = e);
          var u = 0,
            c = function () {};
          return {
            s: c,
            n: function () {
              return u >= t.length ? { done: !0 } : { done: !1, value: t[u++] };
            },
            e: function (d) {
              throw d;
            },
            f: c,
          };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var r = !0,
        o = !1,
        a;
      return {
        s: function () {
          e = e.call(t);
        },
        n: function () {
          var d = e.next();
          return (r = d.done), d;
        },
        e: function (d) {
          (o = !0), (a = d);
        },
        f: function () {
          try {
            !r && e.return != null && e.return();
          } finally {
            if (o) throw a;
          }
        },
      };
    }
    function f(t) {
      return m(t) || O(t) || g(t) || x();
    }
    function x() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function g(t, n) {
      if (!!t) {
        if (typeof t == 'string') return k(t, n);
        var e = Object.prototype.toString.call(t).slice(8, -1);
        if (
          (e === 'Object' && t.constructor && (e = t.constructor.name), e === 'Map' || e === 'Set')
        )
          return Array.from(t);
        if (e === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return k(t, n);
      }
    }
    function O(t) {
      if ((typeof Symbol != 'undefined' && t[Symbol.iterator] != null) || t['@@iterator'] != null)
        return Array.from(t);
    }
    function m(t) {
      if (Array.isArray(t)) return k(t);
    }
    function k(t, n) {
      (n == null || n > t.length) && (n = t.length);
      for (var e = 0, u = new Array(n); e < n; e++) u[e] = t[e];
      return u;
    }
    var T = 'tab';
    function j(t, n, e, u, c) {
      var r = c !== void 0,
        o = u
          .reduce(function (a, i) {
            return i.tocIndex === c && (a[i.paraId] = (a[i.paraId] || '').concat(i.value)), a;
          }, [])
          .filter(Boolean);
      return Boolean(o.length) || r
        ? {
            rawTitle: t,
            title: n,
            link: e,
            paragraphs: u
              .reduce(function (a, i) {
                if (i.tocIndex === c) {
                  var d, E;
                  ((E = a[(d = i.paraId)]) !== null && E !== void 0) || (a[d] = ''),
                    (a[i.paraId] += i.value);
                }
                return a;
              }, [])
              .filter(Boolean),
          }
        : null;
    }
    function y(t) {
      return [t.title, t.subtitle].filter(Boolean).join(' ');
    }
    function R(t, n, e) {
      var u = [],
        c = Object.values(n).reduce(function (r, o) {
          if (o.asset) {
            var a, i;
            ((i = r[(a = o.routeId)]) !== null && i !== void 0) || (r[a] = []),
              r[o.routeId].push(o);
          }
          return r;
        }, {});
      return (
        Object.values(t).forEach(function (r) {
          if ('meta' in r && !('isLayout' in r)) {
            var o,
              a = r.meta,
              i = r.path.replace(/^([^/])/, '/$1') || '/',
              d = e.find(function (h) {
                return i === h.link || i.startsWith(''.concat(h.activePath, '/'));
              }),
              E = (c[r.id] || []).map(function (h) {
                var s;
                return (s = h.asset) === null || s === void 0 ? void 0 : s.id;
              }),
              B = j('', y(a.frontmatter), i, a.texts),
              W = a.toc.reduce(function (h, s, S) {
                return (
                  !E.includes(s.id) &&
                    s.depth > 1 &&
                    h.push(
                      j(
                        s.title,
                        ''.concat(y(a.frontmatter), ' - ').concat(s.title),
                        ''.concat(i, '#').concat(s.id),
                        a.texts,
                        S,
                      ),
                    ),
                  h
                );
              }, []),
              U = (a.tabs || []).reduce(function (h, s) {
                var S = s.key,
                  P = s.meta,
                  D = j(
                    '',
                    ''.concat(y(a.frontmatter), ' - ').concat(P.frontmatter.title),
                    ''.concat(i, '?').concat(T, '=').concat(S),
                    P.texts,
                  );
                return (
                  D && h.push(D),
                  h.push.apply(
                    h,
                    f(
                      P.toc.map(function (z, H) {
                        return j(
                          z.title,
                          ''
                            .concat(y(a.frontmatter), ' - ')
                            .concat(P.frontmatter.title, ' - ')
                            .concat(z.title),
                          ''.concat(i, '?').concat(T, '=').concat(S, '#').concat(z.id),
                          P.texts,
                          H,
                        );
                      }),
                    ),
                  ),
                  h
                );
              }, []);
            u.push({
              navTitle: d == null ? void 0 : d.title,
              navOrder: d ? e.indexOf(d) : 1 / 0,
              title: y(a.frontmatter),
              link: i,
              sections: [].concat(f(B ? [B] : []), f(W), f(U)),
              demos:
                ((o = c[r.id]) === null || o === void 0
                  ? void 0
                  : o.map(function (h) {
                      return {
                        link: ''.concat(i, '#').concat(h.asset.id),
                        rawTitle: h.asset.title || '',
                        title: h.asset.title || y(a.frontmatter),
                        description: h.asset.description || '',
                        keywords: h.asset.keywords || [],
                      };
                    })) || [],
            });
          }
        }),
        u
      );
    }
    function A() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '',
        n = arguments.length > 1 ? arguments[1] : void 0,
        e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1,
        u = (0, b.findAll)({ textToHighlight: t, searchWords: n, autoEscape: !0 }),
        c = {};
      return [
        u.map(function (r, o) {
          var a = r.start,
            i = r.end,
            d = r.highlight,
            E = { text: t.slice(a, i) };
          return (
            o === 0 &&
              !d &&
              u.length > 1 &&
              E.text.length > 20 &&
              (E.text = '...'.concat(E.text.slice(-20))),
            d &&
              ((E.highlighted = !0),
              (c[
                n.find(function (B) {
                  return E.text.includes(B);
                })
              ] = e)),
            E
          );
        }),
        c,
      ];
    }
    function K(t, n) {
      var e = n.split(' '),
        u = new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(' ', '|'), 'gi'),
        c = {};
      return (
        t.forEach(function (r) {
          var o = [];
          if (
            (r.sections.forEach(function (s) {
              var S = I(s.paragraphs),
                P;
              try {
                for (S.s(); !(P = S.n()).done; ) {
                  var D = P.value;
                  if (u.test(D)) {
                    var z = A(s.title, e, 10),
                      H = v(z, 2),
                      M = H[0],
                      J = H[1],
                      V = A(D, e),
                      q = v(V, 2),
                      X = q[0],
                      et = q[1];
                    o.push({
                      type: 'content',
                      link: s.link,
                      priority: Object.values(_(_({}, et), J)).reduce(function (F, Z) {
                        return F + Z;
                      }, 0),
                      highlightTitleTexts: M,
                      highlightTexts: X,
                    });
                    return;
                  }
                }
              } catch (F) {
                S.e(F);
              } finally {
                S.f();
              }
              if (u.test(s.rawTitle)) {
                var nt = A(s.title, e, 10),
                  $ = v(nt, 2),
                  rt = $[0],
                  it = $[1];
                o.push({
                  type: 'title',
                  link: s.link,
                  priority: Object.values(it).reduce(function (F, Z) {
                    return F + Z;
                  }, 0),
                  highlightTitleTexts: rt,
                  highlightTexts: A(s.paragraphs[0] || '', e)[0],
                });
              }
            }),
            r.demos.forEach(function (s) {
              if (u.test(s.rawTitle) || u.test(s.description)) {
                var S = A(s.title, e, 10),
                  P = v(S, 2),
                  D = P[0],
                  z = P[1],
                  H = A(s.description, e),
                  M = v(H, 2),
                  J = M[0],
                  V = M[1];
                o.push({
                  type: 'demo',
                  link: s.link,
                  priority: Object.values(_(_({}, V), z)).reduce(function (q, X) {
                    return q + X;
                  }, 0),
                  highlightTitleTexts: D,
                  highlightTexts: J,
                });
              }
            }),
            u.test(r.title))
          ) {
            var a,
              i = A(r.title, e, 100),
              d = v(i, 2),
              E = d[0],
              B = d[1];
            o.push({
              type: 'page',
              link: r.link,
              priority: Object.values(B).reduce(function (s, S) {
                return s + S;
              }, 0),
              highlightTitleTexts: E,
              highlightTexts: A(
                ((a = r.sections[0]) === null || a === void 0 ? void 0 : a.paragraphs[0]) || '',
                e,
              )[0],
            });
          }
          if (o.length) {
            var W,
              U,
              h = r.navTitle || '$ROOT';
            ((W = c[h]) !== null && W !== void 0) ||
              (c[h] = { title: r.navTitle, priority: r.navOrder * 1e3, hints: [] }),
              (U = c[h].hints).push.apply(U, o);
          }
        }),
        Object.values(c).forEach(function (r) {
          var o = r.hints;
          o.sort(function (a, i) {
            return i.priority - a.priority;
          });
        }),
        Object.values(c).sort(function (r, o) {
          return o.priority - r.priority;
        })
      );
    }
    var L;
    self.onmessage = function (t) {
      var n = t.data;
      switch (n.action) {
        case 'generate-metadata':
          L = R(n.args.routes, n.args.demos, n.args.nav);
          break;
        case 'get-search-result':
          self.postMessage(K(L, n.args.keywords));
          break;
        default:
      }
    };
  })();
})();
