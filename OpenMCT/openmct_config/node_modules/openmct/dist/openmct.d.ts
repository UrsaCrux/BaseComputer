export = openmct;
/** @type {OpenMCT} */
declare const openmct: OpenMCT;
declare namespace openmct {
    export { BuildInfo, OpenMCT };
}
type OpenMCT = {
    buildInfo: BuildInfo;
    selection: any;
    time: import('./src/api/time/TimeAPI').default;
    composition: import('./src/api/composition/CompositionAPI').default;
    objectViews: any;
    inspectorViews: any;
    propertyEditors: any;
    toolbars: any;
    types: any;
    objects: import('./src/api/objects/ObjectAPI').default;
    telemetry: import('./src/api/telemetry/TelemetryAPI').default;
    indicators: import('./src/api/indicators/IndicatorAPI').default;
    user: import('./src/api/user/UserAPI').default;
    notifications: import('./src/api/notifications/NotificationAPI').default;
    editor: import('./src/api/Editor').default;
    overlays: typeof import("./src/api/overlays/OverlayAPI");
    menus: import('./src/api/menu/MenuAPI').default;
    actions: import('./src/api/actions/ActionsAPI').default;
    status: import('./src/api/status/StatusAPI').default;
    priority: any;
    router: import('./src/ui/router/ApplicationRouter');
    faults: import('./src/api/faultmanagement/FaultManagementAPI').default;
    forms: import('./src/api/forms/FormsAPI').default;
    branding: typeof import("./src/api/Branding").default;
    annotation: import('./src/api/annotation/AnnotationAPI').default;
    install: (plugin: OpenMCTPlugin) => void;
    getAssetPath: {
        (): string;
    };
    start: (domElement: HTMLElement, isHeadlessMode: boolean) => void;
    startHeadless: {
        (): void;
    };
    destroy: {
        (): void;
    };
    plugins: OpenMCTPlugin[];
    components: OpenMCTComponent[];
};
type BuildInfo = {
    version: string;
    buildDate: string;
    revision: string;
    branch: string;
};
//# sourceMappingURL=openmct.d.ts.map