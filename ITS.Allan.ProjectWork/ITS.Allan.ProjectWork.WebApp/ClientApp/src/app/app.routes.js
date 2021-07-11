"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
var display_class_data_component_1 = require("./display-class-data/display-class-data.component");
var add_class_data_form_component_1 = require("./add-class-data-form/add-class-data-form.component");
var display_schedule_read_only_component_1 = require("./display-schedule-read-only/display-schedule-read-only.component");
var login_component_1 = require("./login/login.component");
var auth_guard_service_1 = require("./shared/services/auth-guard.service");
exports.appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'display-schedule-read-only', component: display_schedule_read_only_component_1.DisplayScheduleReadOnly },
    { path: 'display-class-data', component: display_class_data_component_1.DisplayClassDataComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: 'add-class-data-form', component: add_class_data_form_component_1.AddClassDataFormComponent, canActivate: [auth_guard_service_1.AuthGuardService] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
//# sourceMappingURL=app.routes.js.map