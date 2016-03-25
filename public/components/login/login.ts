import {bootstrap} from 'angular2/platform/browser'
import {LoginRouterComponent} from './login.router.component'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_BINDINGS} from 'angular2/http'

bootstrap(LoginRouterComponent, [ROUTER_PROVIDERS, HTTP_BINDINGS])
