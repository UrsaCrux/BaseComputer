export default ActionCollection;
declare class ActionCollection {
    constructor(applicableActions: any, objectPath: any, view: any, openmct: any, skipEnvironmentObservers: any);
    applicableActions: any;
    openmct: any;
    objectPath: any;
    view: any;
    skipEnvironmentObservers: any;
    objectUnsubscribes: any[];
    _updateActions(): void;
    _update(): void;
    disable(actionKeys: any): void;
    enable(actionKeys: any): void;
    hide(actionKeys: any): void;
    show(actionKeys: any): void;
    destroy(): void;
    getVisibleActions(): any[];
    getStatusBarActions(): any[];
    getActionsObject(): any;
    _observeObjectPath(): void;
    _mergeOldAndNewActions(oldActions: any, newActions: any): {};
}
//# sourceMappingURL=ActionCollection.d.ts.map