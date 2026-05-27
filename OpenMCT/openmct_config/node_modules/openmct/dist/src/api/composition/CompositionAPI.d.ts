/**
 * @typedef {import('./CompositionProvider').default} CompositionProvider
 */
/**
 * @typedef {import('../objects/ObjectAPI').DomainObject} DomainObject
 */
/**
 * @typedef {import('../../../openmct').OpenMCT} OpenMCT
 */
/**
 * An interface for interacting with the composition of domain objects.
 * The composition of a domain object is the list of other domain objects
 * it "contains" (for instance, that should be displayed beneath it
 * in the tree.)
 * @constructor
 */
export default class CompositionAPI {
    /**
     * @param {OpenMCT} publicAPI
     */
    constructor(publicAPI: OpenMCT);
    /** @type {CompositionProvider[]} */
    registry: CompositionProvider[];
    /** @type {CompositionPolicy[]} */
    policies: ((containingObject: DomainObject, containedObject: DomainObject) => boolean)[];
    /** @type {OpenMCT} */
    publicAPI: OpenMCT;
    /**
     * Add a composition provider.
     *
     * Plugins can add new composition providers to change the loading
     * behavior for certain domain objects.
     *
     * @method addProvider
     * @param {CompositionProvider} provider the provider to add
     */
    addProvider(provider: CompositionProvider): void;
    /**
     * Retrieve the composition (if any) of this domain object.
     *
     * @method get
     * @param {DomainObject} domainObject
     * @returns {CompositionCollection}
     */
    get(domainObject: DomainObject): CompositionCollection;
    /**
     * A composition policy is a function which either allows or disallows
     * placing one object in another's composition.
     *
     * Open MCT's policy model requires consensus, so any one policy may
     * reject composition by returning false. As such, policies should
     * generally be written to return true in the default case.
     *
     * @callback CompositionPolicy
     * @param {DomainObject} containingObject the object which
     *        would act as a container
     * @param {DomainObject} containedObject the object which
     *        would be contained
     * @returns {boolean} false if this composition should be disallowed
     */
    /**
     * Add a composition policy. Composition policies may disallow domain
     * objects from containing other domain objects.
     *
     * @method addPolicy
     * @param {CompositionPolicy} policy
     *        the policy to add
     */
    addPolicy(policy: (containingObject: DomainObject, containedObject: DomainObject) => boolean): void;
    /**
     * Check whether or not a domain object is allowed to contain another
     * domain object.
     *
     * @private
     * @method checkPolicy
     * @param {DomainObject} container the object which
     *        would act as a container
     * @param {DomainObject} containee the object which
     *        would be contained
     * @returns {boolean} false if this composition should be disallowed
     * @param {CompositionPolicy} policy
     *        the policy to add
     */
    private checkPolicy;
    /**
     * Check whether or not a domainObject supports composition
     *
     * @param {DomainObject} domainObject
     * @returns {boolean} true if the domainObject supports composition
     */
    supportsComposition(domainObject: DomainObject): boolean;
}
export type CompositionProvider = import('./CompositionProvider').default;
export type DomainObject = import('../objects/ObjectAPI').DomainObject;
export type OpenMCT = import('../../../openmct').OpenMCT;
import CompositionCollection from './CompositionCollection';
//# sourceMappingURL=CompositionAPI.d.ts.map