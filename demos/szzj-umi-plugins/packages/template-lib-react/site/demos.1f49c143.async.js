'use strict';
(self.webpackChunk_szzj_template_lib_react = self.webpackChunk_szzj_template_lib_react || []).push([
  [433],
  {
    74955: function (i, e, _) {
      _.r(e),
        _.d(e, {
          default: function () {
            return t;
          },
        });
      var u = _(21163),
        d = _(77630),
        n = _(41498);
      function t() {
        return (0, n.jsx)('div', { children: (0, n.jsx)(u.Z, { defaultValue: 'defaultValue' }) });
      }
    },
    63413: function (i, e, _) {
      _.r(e),
        _.d(e, {
          default: function () {
            return t;
          },
        });
      var u = _(21163),
        d = _(77630),
        n = _(41498);
      function t() {
        return (0, n.jsx)('div', { children: (0, n.jsx)(u.Z, { value: 'value' }) });
      }
    },
    21163: function (i, e, _) {
      var u = _(87720),
        d = _.n(u),
        n = _(77630),
        t = _(41498),
        E = function (s) {
          var a = s.value,
            v = s.defaultValue,
            l = s.onChange,
            f = (0, n.useState)(a !== void 0 ? a : v),
            m = d()(f, 2),
            D = m[0],
            c = m[1];
          (0, n.useEffect)(
            function () {
              c(a);
            },
            [a],
          );
          var M = (0, n.useCallback)(
            function (r) {
              var o;
              l == null ||
                l(r == null || (o = r.target) === null || o === void 0 ? void 0 : o.value);
            },
            [l],
          );
          return (0, t.jsx)('div', {
            className: '',
            children: (0, t.jsx)('input', { value: D, onChange: M }),
          });
        };
      e.Z = E;
    },
  },
]);
