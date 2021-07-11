"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/of");
require("rxjs/add/operator/map");
var rxjs_1 = require("rxjs");
var AuthService = /** @class */ (function () {
    function AuthService(userService) {
        this.userService = userService;
        this.isloggedIn = false;
    }
    AuthService.prototype.login = function (userEmail, userPassword) {
        var _this = this;
        this.userService.getAll().subscribe(function (data) {
            _this.users = data;
            console.log(_this.users);
            for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                var user = _a[_i];
                if (user.userEmail == userEmail && user.userPassword == userPassword) {
                    _this.isloggedIn = true;
                    _this.userRole = user.userRole;
                    return rxjs_1.of(_this.isloggedIn);
                }
            }
        });
    };
    AuthService.prototype.isUserLoggedIn = function () {
        return this.isloggedIn;
    };
    AuthService.prototype.isAdminUser = function () {
        if (this.userRole == 'admin') {
            return true;
        }
        return false;
    };
    AuthService.prototype.logoutUser = function () {
        this.isloggedIn = false;
    };
    return AuthService;
}());
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map