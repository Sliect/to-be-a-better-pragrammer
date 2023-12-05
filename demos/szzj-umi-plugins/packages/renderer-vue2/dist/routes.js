function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["id", "path", "redirect"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
export function createClientRoutes(opts) {
  var routesById = opts.routesById,
    parentId = opts.parentId,
    routeComponents = opts.routeComponents;
  return Object.keys(routesById).filter(function (id) {
    return routesById[id].parentId === parentId;
  }).map(function (id) {
    var route = createClientRoute({
      route: routesById[id],
      routeComponent: routeComponents[id],
      parentId: parentId
    });
    var children = createClientRoutes({
      routesById: routesById,
      routeComponents: routeComponents,
      parentId: route.id
    });
    if (children.length > 0) {
      // @ts-ignore
      route.children = children;
    }
    delete route.id;
    return route;
  });
}
export function createClientRoute(opts) {
  var route = opts.route;
  var id = route.id,
    path = route.path,
    redirect = route.redirect,
    other = _objectWithoutProperties(route, _excluded);
  if (redirect) {
    return _objectSpread(_objectSpread({}, other), {}, {
      id: id,
      path: path,
      redirect: redirect
    });
  }
  var item = _objectSpread(_objectSpread({}, other), {}, {
    id: id,
    component: opts.routeComponent,
    path: path
  });
  if (route.parentId === undefined && path && !path.startsWith('/')) {
    // fix Uncaught (in promise) Error: Route paths should start with a "/": "users" should be "/users".
    item.path = "/".concat(path);
  }
  return item;
}