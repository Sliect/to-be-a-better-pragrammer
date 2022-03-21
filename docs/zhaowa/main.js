class BaseRouter {
  constructor() {
    this.routes = {}
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh)
    window.addEventListener('hashchange', this.refresh)
  }

  route(path, cb) {
    this.routes[path] = cb || function() {}
  }

  refresh() {
    const path = `/${window.location.hash.slice(1) || ''}`
    this.routes[path]()
  }
}