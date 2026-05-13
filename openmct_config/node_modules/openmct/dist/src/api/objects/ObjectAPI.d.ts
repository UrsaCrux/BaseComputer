/**
 * Uniquely identifies a domain object.
 *
 * @typedef {object} Identifier
 * @property {string} namespace the namespace to/from which this domain
 *           object should be loaded/stored.
 * @property {string} key a unique identifier for the domain object
 *           within that namespace
 * @memberof module:openmct.ObjectAPI~
 */
/**
 * A domain object is an entity of relevance to a user's workflow, that
 * should appear as a distinct and meaningful object within the user
 * interface. Examples of domain objects are folders, telemetry sensors,
 * and so forth.
 *
 * A few common properties are defined for domain objects. Beyond these,
 * individual types of domain objects may add more as they see fit.
 *
 * @typedef {object} DomainObject
 * @property {Identifier} identifier a key/namespace pair which
 *           uniquely identifies this domain object
 * @property {string} type the type of domain object
 * @property {string} name the human-readable name for this domain object
 * @property {string} [creator] the user name of the creator of this domain
 *           object
 * @property {number} [modified] the time, in milliseconds since the UNIX
 *           epoch, at which this domain object was last modified
 * @property {Identifier[]} [composition] if
 *           present, this will be used by the default composition provider
 *           to load domain objects
 * @property {Object.<string, any>} [configuration] A key-value map containing configuration
 *           settings for this domain object.
 * @memberof module:openmct.ObjectAPI~
 */
/**
 * @readonly
 * @enum {string} SEARCH_TYPES
 * @property {string} OBJECTS Search for objects
 * @property {string} ANNOTATIONS Search for annotations
 * @property {string} TAGS Search for tags
 */
/**
 * Utilities for loading, saving, and manipulating domain objects.
 * @interface ObjectAPI
 * @memberof module:openmct
 */
export default class ObjectAPI {
    constructor(typeRegistry: any, openmct: any);
    openmct: any;
    typeRegistry: any;
    SEARCH_TYPES: Readonly<{
        OBJECTS: "OBJECTS";
        ANNOTATIONS: "ANNOTATIONS";
        TAGS: "TAGS";
    }>;
    eventEmitter: any;
    providers: {};
    rootRegistry: RootRegistry;
    inMemorySearchProvider: InMemorySearchProvider;
    rootProvider: any;
    cache: {};
    interceptorRegistry: InterceptorRegistry;
    SYNCHRONIZED_OBJECT_TYPES: string[];
    errors: {
        Conflict: typeof ConflictError;
    };
    /**
     * Retrieve the provider for a given identifier.
     */
    getProvider(identifier: any): any;
    /**
     * Get an active transaction instance
     * @returns {Transaction} a transaction object
     */
    getActiveTransaction(): Transaction;
    /**
     * Get the root-level object.
     * @returns {Promise.<DomainObject>} a promise for the root object
     */
    getRoot(): Promise<DomainObject>;
    /**
     * Register a new object provider for a particular namespace.
     *
     * @param {string} namespace the namespace for which to provide objects
     * @param {module:openmct.ObjectProvider} provider the provider which
     *        will handle loading domain objects from this namespace
     * @memberof {module:openmct.ObjectAPI#}
     * @name addProvider
     */
    addProvider(namespace: string, provider: any): void;
    /**
     * Provides the ability to read, write, and delete domain objects.
     *
     * When registering a new object provider, all methods on this interface
     * are optional.
     *
     * @interface ObjectProvider
     * @memberof module:openmct
     */
    /**
     * Create the given domain object in the corresponding persistence store
     *
     * @method create
     * @memberof module:openmct.ObjectProvider#
     * @param {module:openmct.DomainObject} domainObject the domain object to
     *        create
     * @returns {Promise} a promise which will resolve when the domain object
     *          has been created, or be rejected if it cannot be saved
     */
    /**
     * Update this domain object in its persistence store
     *
     * @method update
     * @memberof module:openmct.ObjectProvider#
     * @param {module:openmct.DomainObject} domainObject the domain object to
     *        update
     * @returns {Promise} a promise which will resolve when the domain object
     *          has been updated, or be rejected if it cannot be saved
     */
    /**
     * Delete this domain object.
     *
     * @method delete
     * @memberof module:openmct.ObjectProvider#
     * @param {module:openmct.DomainObject} domainObject the domain object to
     *        delete
     * @returns {Promise} a promise which will resolve when the domain object
     *          has been deleted, or be rejected if it cannot be deleted
     */
    /**
     * Get a domain object.
     *
     * @param {string} key the key for the domain object to load
     * @param {AbortSignal} abortSignal (optional) signal to abort fetch requests
     * @param {boolean} [forceRemote=false] defaults to false. If true, will skip cached and
     *          dirty/in-transaction objects use and the provider.get method
     * @returns {Promise<DomainObject>} a promise which will resolve when the domain object
     *          has been saved, or be rejected if it cannot be saved
     */
    get(identifier: any, abortSignal: AbortSignal, forceRemote?: boolean | undefined): Promise<DomainObject>;
    /**
     * Search for domain objects.
     *
     * Object providersSearches and combines results of each object provider search.
     * Objects without search provided will have been indexed
     * and will be searched using the fallback in-memory search.
     * Search results are asynchronous and resolve in parallel.
     *
     * @method search
     * @memberof module:openmct.ObjectAPI#
     * @param {string} query the term to search for
     * @param {AbortController.signal} abortSignal (optional) signal to cancel downstream fetch requests
     * @param {string} searchType the type of search as defined by SEARCH_TYPES
     * @returns {Array.<Promise.<module:openmct.DomainObject>>}
     *          an array of promises returned from each object provider's search function
     *          each resolving to domain objects matching provided search query and options.
     */
    search(query: string, abortSignal: AbortController.signal, searchType?: string): Array<Promise<NodeModule>>;
    /**
     * Will fetch object for the given identifier, returning a version of the object that will automatically keep
     * itself updated as it is mutated. Before using this function, you should ask yourself whether you really need it.
     * The platform will provide mutable objects to views automatically if the underlying object can be mutated. The
     * platform will manage the lifecycle of any mutable objects that it provides. If you use `getMutable` you are
     * committing to managing that lifecycle yourself. `.destroy` should be called when the object is no longer needed.
     *
     * @memberof {module:openmct.ObjectAPI#}
     * @returns {Promise.<MutableDomainObject>} a promise that will resolve with a MutableDomainObject if
     * the object can be mutated.
     */
    getMutable(identifier: any): Promise<MutableDomainObject>;
    /**
     * This function is for cleaning up a mutable domain object when you're done with it.
     * You only need to use this if you retrieved the object using `getMutable()`. If the object was provided by the
     * platform (eg. passed into a `view()` function) then the platform is responsible for its lifecycle.
     * @param {MutableDomainObject} domainObject
     */
    destroyMutable(domainObject: MutableDomainObject): void;
    delete(): void;
    isPersistable(idOrKeyString: any): boolean;
    isMissing(domainObject: any): boolean;
    /**
     * Save this domain object in its current state.
     *
     * @memberof module:openmct.ObjectAPI#
     * @param {module:openmct.DomainObject} domainObject the domain object to
     *        save
     * @returns {Promise} a promise which will resolve when the domain object
     *          has been saved, or be rejected if it cannot be saved
     */
    save(domainObject: any): Promise<any>;
    /**
     * After entering into edit mode, creates a new instance of Transaction to keep track of changes in Objects
     *
     * @returns {Transaction} a new Transaction that was just created
     */
    startTransaction(): Transaction;
    transaction: Transaction | null | undefined;
    /**
     * Clear instance of Transaction
     */
    endTransaction(): void;
    /**
     * Add a root-level object.
     * @param {module:openmct.ObjectAPI~Identifier|array|function} identifier an identifier or
     *        an array of identifiers for root level objects, or a function that returns a
     *        promise for an identifier or an array of root level objects.
     * @param {module:openmct.PriorityAPI~priority|Number} priority a number representing
     *        this item(s) position in the root object's composition (example: order in object tree).
     *        For arrays, they are treated as blocks.
     * @method addRoot
     * @memberof module:openmct.ObjectAPI#
     */
    addRoot(identifier: any, priority: any): void;
    /**
     * Register an object interceptor that transforms a domain object requested via module:openmct.ObjectAPI.get
     * The domain object will be transformed after it is retrieved from the persistence store
     * The domain object will be transformed only if the interceptor is applicable to that domain object as defined by the InterceptorDef
     *
     * @param {module:openmct.InterceptorDef} interceptorDef the interceptor definition to add
     * @method addGetInterceptor
     * @memberof module:openmct.InterceptorRegistry#
     */
    addGetInterceptor(interceptorDef: any): void;
    /**
     * Inovke interceptors if applicable for a given domain object.
     * @private
     */
    private applyGetInterceptors;
    /**
     * Return relative url path from a given object path
     * eg: #/browse/mine/cb56f6bf-c900-43b7-b923-2e3b64b412db/6e89e858-77ce-46e4-a1ad-749240286497/....
     * @param {Array} objectPath
     * @returns {string} relative url for object
     */
    getRelativePath(objectPath: any[]): string;
    /**
     * Modify a domain object and save.
     * @param {module:openmct.DomainObject} object the object to mutate
     * @param {string} path the property to modify
     * @param {*} value the new value for this property
     * @method mutate
     * @memberof module:openmct.ObjectAPI#
     */
    mutate(domainObject: any, path: string, value: any): void;
    /**
     * Create a mutable domain object from an existing domain object
     * @param {module:openmct.DomainObject} domainObject the object to make mutable
     * @returns {MutableDomainObject} a mutable domain object that will automatically sync
     * @method toMutable
     * @memberof module:openmct.ObjectAPI#
     */
    toMutable(domainObject: any): MutableDomainObject;
    /**
     * Updates a domain object based on its latest persisted state. Note that this will mutate the provided object.
     * @param {module:openmct.DomainObject} domainObject an object to refresh from its persistence store
     * @returns {Promise} the provided object, updated to reflect the latest persisted state of the object.
     */
    refresh(domainObject: any): Promise<any>;
    /**
     * @param module:openmct.ObjectAPI~Identifier identifier An object identifier
     * @returns {boolean} true if the object can be mutated, otherwise returns false
     */
    supportsMutation(identifier: any): boolean;
    /**
     * Observe changes to a domain object.
     * @param {module:openmct.DomainObject} object the object to observe
     * @param {string} path the property to observe
     * @param {Function} callback a callback to invoke when new values for
     *        this property are observed.
     * @method observe
     * @memberof module:openmct.ObjectAPI#
     */
    observe(domainObject: any, path: string, callback: Function): any;
    /**
     * @param {module:openmct.ObjectAPI~Identifier} identifier
     * @returns {string} A string representation of the given identifier, including namespace and key
     */
    makeKeyString(identifier: any): string;
    /**
     * @param {string} keyString A string representation of the given identifier, that is, a namespace and key separated by a colon.
     * @returns {module:openmct.ObjectAPI~Identifier} An identifier object
     */
    parseKeyString(keyString: string): any;
    /**
     * Given any number of identifiers, will return true if they are all equal, otherwise false.
     * @param {module:openmct.ObjectAPI~Identifier[]} identifiers
     */
    areIdsEqual(...identifiers: any): any;
    /**
     * Given an original path check if the path is reachable via root
     * @param {Array<Object>} originalPath an array of path objects to check
     * @returns {boolean} whether the domain object is reachable
     */
    isReachable(originalPath: Array<Object>): boolean;
    /**
     * Given an identifier, constructs the original path by walking up its parents
     * @param {module:openmct.ObjectAPI~Identifier} identifier
     * @param {Array<module:openmct.DomainObject>} path an array of path objects
     * @returns {Promise<Array<module:openmct.DomainObject>>} a promise containing an array of domain objects
     */
    getOriginalPath(identifier: any, path?: any[]): Promise<Array<NodeModule>>;
    /**
     * Parse and construct an `objectPath` from a `navigationPath`.
     *
     * A `navigationPath` is a string of the form `"/browse/<keyString>/<keyString>/..."` that is used
     * by the Open MCT router to navigate to a specific object.
     *
     * Throws an error if the `navigationPath` is malformed.
     *
     * @param {string} navigationPath
     * @returns {DomainObject[]} objectPath
     */
    getRelativeObjectPath(navigationPath: string): DomainObject[];
    isObjectPathToALink(domainObject: any, objectPath: any): boolean;
    isTransactionActive(): boolean;
    #private;
}
/**
 * Uniquely identifies a domain object.
 */
export type Identifier = {
    /**
     * the namespace to/from which this domain
     * object should be loaded/stored.
     */
    namespace: string;
    /**
     * a unique identifier for the domain object
     * within that namespace
     */
    key: string;
};
/**
 * A domain object is an entity of relevance to a user's workflow, that
 * should appear as a distinct and meaningful object within the user
 * interface. Examples of domain objects are folders, telemetry sensors,
 * and so forth.
 *
 * A few common properties are defined for domain objects. Beyond these,
 * individual types of domain objects may add more as they see fit.
 */
export type DomainObject = {
    /**
     * a key/namespace pair which
     * uniquely identifies this domain object
     */
    identifier: Identifier;
    /**
     * the type of domain object
     */
    type: string;
    /**
     * the human-readable name for this domain object
     */
    name: string;
    /**
     * the user name of the creator of this domain
     * object
     */
    creator?: string | undefined;
    /**
     * the time, in milliseconds since the UNIX
     * epoch, at which this domain object was last modified
     */
    modified?: number | undefined;
    /**
     * if
     * present, this will be used by the default composition provider
     * to load domain objects
     */
    composition?: Identifier[] | undefined;
    /**
     * A key-value map containing configuration
     * settings for this domain object.
     */
    configuration?: {
        [x: string]: any;
    } | undefined;
};
/**
 * SEARCH_TYPES
 */
export type ObjectAPI = string;
import RootRegistry from './RootRegistry';
import InMemorySearchProvider from './InMemorySearchProvider';
import InterceptorRegistry from './InterceptorRegistry';
import ConflictError from './ConflictError';
import Transaction from './Transaction';
import MutableDomainObject from './MutableDomainObject';
//# sourceMappingURL=ObjectAPI.d.ts.map