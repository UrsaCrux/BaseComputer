export default class RootRegistry {
    constructor(openmct: any);
    _rootItems: any[];
    _openmct: any;
    getRoots(): Promise<any[]>;
    addRoot(rootItem: any, priority: any): void;
    _isValid(rootItem: any): boolean;
}
//# sourceMappingURL=RootRegistry.d.ts.map