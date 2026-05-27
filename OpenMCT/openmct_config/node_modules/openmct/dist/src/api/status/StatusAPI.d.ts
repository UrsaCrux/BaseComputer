export default class StatusAPI {
    constructor(openmct: any);
    _openmct: any;
    _statusCache: {};
    get(identifier: any): any;
    set(identifier: any, value: any): void;
    observe(identifier: any, callback: any): () => void;
    delete(identifier: any): void;
}
//# sourceMappingURL=StatusAPI.d.ts.map