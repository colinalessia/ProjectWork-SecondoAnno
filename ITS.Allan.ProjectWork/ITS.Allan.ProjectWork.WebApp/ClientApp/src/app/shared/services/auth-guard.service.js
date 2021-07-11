"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardService = void 0;
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        if (!this.authService.isUserLoggedIn()) {
            alert('You are not allowed to view this page. You are redirected to login Page');
            this.router.navigate(["login"], { queryParams: { retUrl: route.url } });
            return false;
            //var urlTree = this.router.createUrlTree(['login']);
            //return urlTree;
        }
        return true;
    };
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;
//# sourceMappingURL=auth-guard.service.js.map