export default MutableDomainObject;
/**
 * Wraps a domain object to keep its model synchronized with other instances of the same object.
 *
 * Creating a MutableDomainObject will automatically register listeners to keep its model in sync. As such, developers
 * should be careful to destroy MutableDomainObject in order to avoid memory leaks.
 *
 * All Open MCT API functions that provide objects will provide MutableDomainObjects where possible, except
 * `openmct.objects.get()`, and will manage that object's lifecycle for you. Calling `openmct.objects.getMutable()`
 * will result in the creation of a new MutableDomainObject and you will be responsible for destroying it
 * (via openmct.objects.destroy) when you're done with it.
 */
export type MutableDomainObject = any;
/**
 * Wraps a domain object to keep its model synchronized with other instances of the same object.
 *
 * Creating a MutableDomainObject will automatically register listeners to keep its model in sync. As such, developers
 * should be careful to destroy MutableDomainObject in order to avoid memory leaks.
 *
 * All Open MCT API functions that provide objects will provide MutableDomainObjects where possible, except
 * `openmct.objects.get()`, and will manage that object's lifecycle for you. Calling `openmct.objects.getMutable()`
 * will result in the creation of a new MutableDomainObject and you will be responsible for destroying it
 * (via openmct.objects.destroy) when you're done with it.
 *
 * @typedef MutableDomainObject
 * @memberof module:openmct
 */
declare class MutableDomainObject {
    static createMutable(object: any, mutationTopic: any): any;
    static mutateObject(object: any, path: any, value: any): void;
    constructor(eventEmitter: any);
    $observe(path: any, callback: any): any;
    $set(path: any, value: any): void;
    $refresh(model: any): void;
    $on(event: any, callback: any): () => any;
    $destroy(): void;
}
//# sourceMappingURL=MutableDomainObject.d.ts.map