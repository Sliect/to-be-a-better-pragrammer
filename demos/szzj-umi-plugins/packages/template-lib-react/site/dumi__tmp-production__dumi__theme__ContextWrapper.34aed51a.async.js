'use strict';
(self.webpackChunk_szzj_template_lib_react = self.webpackChunk_szzj_template_lib_react || []).push([
  [923],
  {
    91943: function (g, n, _) {
      _.r(n),
        _.d(n, {
          default: function () {
            return E;
          },
        });
      var i = _(87720),
        l = _.n(i),
        e = _(77630),
        t = _(22647),
        u = _(59035),
        o = _(60295),
        d = _(22655),
        c = _(41498);
      function E() {
        var f = (0, t.pC)(),
          p = (0, e.useState)(!0),
          r = l()(p, 2),
          D = r[0],
          m = r[1],
          s = (0, e.useRef)(t.m8.location.pathname);
        return (
          (0, e.useEffect)(function () {
            return t.m8.listen(function (a) {
              m(!0),
                a.location.pathname !== s.current &&
                  ((s.current = a.location.pathname), document.documentElement.scrollTo(0, 0));
            });
          }, []),
          (0, c.jsx)(u.D.Provider, {
            value: {
              pkg: { name: '@szzj/template-lib-react', version: '0.1.0' },
              demos: o.DE,
              components: o.wx,
              locales: d.k,
              loading: D,
              setLoading: m,
              themeConfig: {
                footer:
                  'Copyright \xA9 2022 | Powered by <a href="https://d.umijs.org" target="_blank" rel="noreferrer">dumi</a>',
                name: 'ii',
              },
            },
            children: f,
          })
        );
      }
    },
  },
]);
