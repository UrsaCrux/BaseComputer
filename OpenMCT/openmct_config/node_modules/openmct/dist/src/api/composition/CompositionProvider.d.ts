/**
 * @typedef {import('../objects/ObjectAPI').DomainObject} DomainObject
 */
/**
 * @typedef {import('../objects/ObjectAPI').Identifier} Identifier
 */
/**
 * @typedef {import('./CompositionAPI').default} CompositionAPI
 */
/**
 * @typedef {import('../../../openmct').OpenMCT} OpenMCT
 */
/**
 * A CompositionProvider provides the underlying implementation of
 * composition-related behavior for certain types of domain object.
 *
 * By default, a composition provider will not support composition
 * modification.  You can add support for mutation of composition by
 * defining `add` and/or `remove` methods.
 *
 * If the composition of an object can change over time-- perhaps via
 * server updates or mutation via the add/remove methods, then one must
 * trigger events as necessary.
 *
 */
export default class CompositionProvider {
    /**
     * @param {OpenMCT} publicAPI
     * @param {CompositionAPI} compositionAPI
     */
    constructor(publicAPI: OpenMCT, compositionAPI: CompositionAPI);
    get listeningTo(): {};
    get establishTopicListener(): () => void;
    get publicAPI(): import("../../../openmct").OpenMCT;
    /**
     * Check if this provider should be used to load composition for a
     * particular domain object.
     * @method appliesTo
     * @param {import('../objects/ObjectAPI').DomainObject} domainObject the domain object
     *        to check
     * @returns {boolean} true if this provider can provide composition for a given domain object
     */
    appliesTo(domainObject: import('../objects/ObjectAPI').DomainObject): boolean;
    /**
     * Load any domain objects contained in the composition of this domain
     * object.
     * @param {DomainObject} domainObject the domain object
     *        for which to load composition
     * @returns {Promise<Identifier[]>} a promise for
     *          the Identifiers in this composition
     * @method load
     */
    load(domainObject: DomainObject): Promise<Identifier[]>;
    /**
     * Attach listeners for changes to the composition of a given domain object.
     * Supports `add` and `remove` events.
     *
     * @param {DomainObject} domainObject to listen to
     * @param {string} event the event to bind to, either `add` or `remove`.
     * @param {Function} callback callback to invoke when event is triggered.
     * @param {any} [context] to use when invoking callback.
     */
    on(domainObject: DomainObject, event: string, callback: Function, context?: any): void;
    /**
     * Remove a listener that was previously added for a given domain object.
     * event name, callback, and context must be the same as when the listener
     * was originally attached.
     *
     * @param {DomainObject} domainObject to remove listener for
     * @param {string} event event to stop listening to: `add` or `remove`.
     * @param {Function} callback callback to remove.
     * @param {any} context of callback to remove.
     */
    off(domainObject: DomainObject, event: string, callback: Function, context: any): void;
    /**
     * Remove a domain object from another domain object's composition.
     *
     * This method is optional; if not present, adding to a domain object's
     * composition using this provider will be disallowed.
     *
     * @param {DomainObject} domainObject the domain object
     *        which should have its composition modified
     * @param {Identifier} childId the domain object to remove
     * @method remove
     */
    remove(domainObject: DomainObject, childId: Identifier): void;
    /**
     * Add a domain object to another domain object's composition.
     *
     * This method is optional; if not present, adding to a domain object's
     * composition using this provider will be disallowed.
     *
     * @param {DomainObject} parent the domain object
     *        which should have its composition modified
     * @param {Identifier} childId the domain object to add
     * @method add
     */
    add(parent: DomainObject, childId: Identifier): void;
    /**
     * @param {DomainObject} parent
     * @param {Identifier} childId
     * @returns {boolean}
     */
    includes(parent: DomainObject, childId: Identifier): boolean;
    /**
     * @param {DomainObject} domainObject
     * @param {number} oldIndex
     * @param {number} newIndex
     * @returns
     */
    reorder(domainObject: DomainObject, oldIndex: number, newIndex: number): void;
    topicListener: (() => void) | undefined;
    #private;
}
export type DomainObject = import('../objects/ObjectAPI').DomainObject;
export type Identifier = import('../objects/ObjectAPI').Identifier;
export type CompositionAPI = import('./CompositionAPI').default;
export type OpenMCT = import('../../../openmct').OpenMCT;
//# sourceMappingURL=CompositionProvider.d.ts.map