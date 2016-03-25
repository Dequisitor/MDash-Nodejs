import {bootstrap} from 'angular2/platform/browser'
import {HomeRouterComponent} from './home.router.component'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_BINDINGS} from 'angular2/http'

bootstrap(HomeRouterComponent, [ROUTER_PROVIDERS, HTTP_BINDINGS])
