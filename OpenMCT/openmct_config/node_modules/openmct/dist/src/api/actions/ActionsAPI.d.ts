export default ActionsAPI;
declare class ActionsAPI {
    constructor(openmct: any);
    _allActions: {};
    _actionCollections: WeakMap<object, any>;
    _openmct: any;
    _groupOrder: string[];
    register(actionDefinition: any): void;
    getActionsCollection(objectPath: any, view: any): any;
    _applicableActions(objectPath: any, view: any): {};
    _updateCachedActionCollections(key: any): void;
    getAction(key: any): any;
    updateGroupOrder(groupArray: any): void;
    _getCachedActionCollection(objectPath: any, view: any): any;
    _newActionCollection(objectPath: any, view: any, skipEnvironmentObservers: any): ActionCollection;
    _cacheActionCollection(view: any, actionCollection: any): void;
    _groupAndSortActions(actionsArray?: any[]): any[];
}
import ActionCollection from './ActionCollection';
//# sourceMappingURL=ActionsAPI.d.ts.map