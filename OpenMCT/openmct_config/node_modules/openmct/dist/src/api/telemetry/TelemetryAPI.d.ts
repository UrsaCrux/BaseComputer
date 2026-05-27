export default class TelemetryAPI {
    constructor(openmct: any);
    openmct: any;
    formatMapCache: WeakMap<object, any>;
    formatters: Map<any, any>;
    limitProviders: any[];
    stalenessProviders: any[];
    metadataCache: WeakMap<object, any>;
    metadataProviders: any[];
    noRequestProviderForAllObjects: boolean;
    requestAbortControllers: Set<any>;
    requestProviders: any[];
    subscriptionProviders: any[];
    valueFormatterCache: WeakMap<object, any>;
    requestInterceptorRegistry: TelemetryRequestInterceptorRegistry;
    abortAllRequests(): void;
    /**
     * Return Custom String Formatter
     *
     * @param {Object} valueMetadata valueMetadata for given telemetry object
     * @param {string} format custom formatter string (eg: %.4f, &lts etc.)
     * @returns {CustomStringFormatter}
     */
    customStringFormatter(valueMetadata: Object, format: string): CustomStringFormatter;
    /**
     * Return true if the given domainObject is a telemetry object.  A telemetry
     * object is any object which has telemetry metadata-- regardless of whether
     * the telemetry object has an available telemetry provider.
     *
     * @param {module:openmct.DomainObject} domainObject
     * @returns {boolean} true if the object is a telemetry object.
     */
    isTelemetryObject(domainObject: any): boolean;
    /**
     * Check if this provider can supply telemetry data associated with
     * this domain object.
     *
     * @method canProvideTelemetry
     * @param {module:openmct.DomainObject} domainObject the object for
     *        which telemetry would be provided
     * @returns {boolean} true if telemetry can be provided
     * @memberof module:openmct.TelemetryAPI~TelemetryProvider#
     */
    canProvideTelemetry(domainObject: any): boolean;
    /**
     * Register a telemetry provider with the telemetry service. This
     * allows you to connect alternative telemetry sources.
     * @method addProvider
     * @memberof module:openmct.TelemetryAPI#
     * @param {module:openmct.TelemetryAPI~TelemetryProvider} provider the new
     *        telemetry provider
     */
    addProvider(provider: any): void;
    /**
     * Returns a telemetry subscription provider that supports
     * a given domain object and options.
     */
    findSubscriptionProvider(...args: any[]): any;
    /**
     * Returns a telemetry request provider that supports
     * a given domain object and options.
     */
    findRequestProvider(...args: any[]): any;
    /**
     * @private
     * Though used in TelemetryCollection as well
     */
    private standardizeRequestOptions;
    /**
     * Register a request interceptor that transforms a request via module:openmct.TelemetryAPI.request
     * The request will be modifyed when it is received and will be returned in it's modified state
     * The request will be transformed only if the interceptor is applicable to that domain object as defined by the RequestInterceptorDef
     *
     * @param {module:openmct.RequestInterceptorDef} requestInterceptorDef the request interceptor definition to add
     * @method addRequestInterceptor
     * @memberof module:openmct.TelemetryRequestInterceptorRegistry#
     */
    addRequestInterceptor(requestInterceptorDef: any): void;
    /**
     * Invoke interceptors if applicable for a given domain object.
     */
    applyRequestInterceptors(domainObject: any, request: any): Promise<any>;
    /**
     * Get or set greedy LAD. For stategy "latest" telemetry in
     * realtime mode the start bound will be ignored if true and
     * there is no new data to replace the existing data.
     * defaults to true
     *
     * To turn off greedy LAD:
     * openmct.telemetry.greedyLAD(false);
     *
     * @method greedyLAD
     * @returns {boolean} if greedyLAD is active or not
     * @memberof module:openmct.TelemetryAPI#
     */
    greedyLAD(isGreedy: any, ...args: any[]): boolean;
    /**
     * Request telemetry collection for a domain object.
     * The `options` argument allows you to specify filters
     * (start, end, etc.), sort order, and strategies for retrieving
     * telemetry (aggregation, latest available, etc.).
     *
     * @method requestCollection
     * @memberof module:openmct.TelemetryAPI~TelemetryProvider#
     * @param {module:openmct.DomainObject} domainObject the object
     *        which has associated telemetry
     * @param {module:openmct.TelemetryAPI~TelemetryRequest} options
     *        options for this telemetry collection request
     * @returns {TelemetryCollection} a TelemetryCollection instance
     */
    requestCollection(domainObject: any, options?: any): TelemetryCollection;
    /**
     * Request historical telemetry for a domain object.
     * The `options` argument allows you to specify filters
     * (start, end, etc.), sort order, time context, and strategies for retrieving
     * telemetry (aggregation, latest available, etc.).
     *
     * @method request
     * @memberof module:openmct.TelemetryAPI~TelemetryProvider#
     * @param {module:openmct.DomainObject} domainObject the object
     *        which has associated telemetry
     * @param {module:openmct.TelemetryAPI~TelemetryRequest} options
     *        options for this historical request
     * @returns {Promise.<object[]>} a promise for an array of
     *          telemetry data
     */
    request(domainObject: any, ...args: any[]): Promise<object[]>;
    /**
     * Subscribe to realtime telemetry for a specific domain object.
     * The callback will be called whenever data is received from a
     * realtime provider.
     *
     * @method subscribe
     * @memberof module:openmct.TelemetryAPI~TelemetryProvider#
     * @param {module:openmct.DomainObject} domainObject the object
     *        which has associated telemetry
     * @param {Function} callback the callback to invoke with new data, as
     *        it becomes available
     * @returns {Function} a function which may be called to terminate
     *          the subscription
     */
    subscribe(domainObject: any, callback: Function, options: any): Function;
    subscribeCache: {} | undefined;
    /**
     * Subscribe to staleness updates for a specific domain object.
     * The callback will be called whenever staleness changes.
     *
     * @method subscribeToStaleness
     * @memberof module:openmct.TelemetryAPI~StalenessProvider#
     * @param {module:openmct.DomainObject} domainObject the object
     *          to watch for staleness updates
     * @param {Function} callback the callback to invoke with staleness data,
     *  as it is received: ex.
     *  {
     *      isStale: <Boolean>,
     *      timestamp: <timestamp>
     *  }
     * @returns {Function} a function which may be called to terminate
     *          the subscription to staleness updates
     */
    subscribeToStaleness(domainObject: any, callback: Function): Function;
    stalenessSubscriberCache: {} | undefined;
    /**
     * Request telemetry staleness for a domain object.
     *
     * @method isStale
     * @memberof module:openmct.TelemetryAPI~StalenessProvider#
     * @param {module:openmct.DomainObject} domainObject the object
     *        which has associated telemetry staleness
     * @returns {Promise.<StalenessResponseObject>} a promise for a StalenessResponseObject
     *        or undefined if no provider exists
     */
    isStale(domainObject: any): Promise<StalenessResponseObject>;
    /**
     * Get telemetry metadata for a given domain object.  Returns a telemetry
     * metadata manager which provides methods for interrogating telemetry
     * metadata.
     *
     * @returns {TelemetryMetadataManager}
     */
    getMetadata(domainObject: any): TelemetryMetadataManager;
    /**
     * Get a value formatter for a given valueMetadata.
     *
     * @returns {TelemetryValueFormatter}
     */
    getValueFormatter(valueMetadata: any): TelemetryValueFormatter;
    /**
     * Get a value formatter for a given key.
     * @param {string} key
     *
     * @returns {Format}
     */
    getFormatter(key: string): Format;
    /**
     * Get a format map of all value formatters for a given piece of telemetry
     * metadata.
     *
     * @returns {Object<String, {TelemetryValueFormatter}>}
     */
    getFormatMap(metadata: any): any;
    /**
     * Register a new telemetry data formatter.
     * @param {Format} format the
     */
    addFormat(format: Format): void;
    /**
     * Get a limit evaluator for this domain object.
     * Limit Evaluators help you evaluate limit and alarm status of individual
     * telemetry datums for display purposes without having to interact directly
     * with the Limit API.
     *
     * This method is optional.
     * If a provider does not implement this method, it is presumed
     * that no limits are defined for this domain object's telemetry.
     *
     * @param {module:openmct.DomainObject} domainObject the domain
     *        object for which to evaluate limits
     * @returns {module:openmct.TelemetryAPI~LimitEvaluator}
     * @method limitEvaluator
     * @memberof module:openmct.TelemetryAPI~TelemetryProvider#
     */
    limitEvaluator(domainObject: any): any;
    /**
     * Get a limits for this domain object.
     * Limits help you display limits and alarms of
     * telemetry for display purposes without having to interact directly
     * with the Limit API.
     *
     * This method is optional.
     * If a provider does not implement this method, it is presumed
     * that no limits are defined for this domain object's telemetry.
     *
     * @param {module:openmct.DomainObject} domainObject the domain
     *        object for which to get limits
     * @returns {module:openmct.TelemetryAPI~LimitEvaluator}
     * @method limits
     * @memberof module:openmct.TelemetryAPI~TelemetryProvider#
     */
    limitDefinition(domainObject: any): any;
    /**
     * Get a limit evaluator for this domain object.
     * Limit Evaluators help you evaluate limit and alarm status of individual
     * telemetry datums for display purposes without having to interact directly
     * with the Limit API.
     *
     * This method is optional.
     * If a provider does not implement this method, it is presumed
     * that no limits are defined for this domain object's telemetry.
     *
     * @param {module:openmct.DomainObject} domainObject the domain
     *        object for which to evaluate limits
     * @returns {module:openmct.TelemetryAPI~LimitEvaluator}
     * @method limitEvaluator
     * @memberof module:openmct.TelemetryAPI~TelemetryProvider#
     */
    getLimitEvaluator(domainObject: any): any;
    /**
     * Get a limit definitions for this domain object.
     * Limit Definitions help you indicate limits and alarms of
     * telemetry for display purposes without having to interact directly
     * with the Limit API.
     *
     * This method is optional.
     * If a provider does not implement this method, it is presumed
     * that no limits are defined for this domain object's telemetry.
     *
     * @param {module:openmct.DomainObject} domainObject the domain
     *        object for which to display limits
     * @returns {module:openmct.TelemetryAPI~LimitEvaluator}
     * @method limits returns a limits object of
     * type {
     *          level1: {
     *              low: { key1: value1, key2: value2, color: <supportedColor> },
     *              high: { key1: value1, key2: value2, color: <supportedColor> }
     *          },
     *          level2: {
     *              low: { key1: value1, key2: value2 },
     *              high: { key1: value1, key2: value2 }
     *          }
     *       }
     *  supported colors are purple, red, orange, yellow and cyan
     * @memberof module:openmct.TelemetryAPI~TelemetryProvider#
     */
    getLimits(domainObject: any): any;
    #private;
}
/**
 * A violation of limits defined for a telemetry property.
 */
export type LimitViolation = any;
/**
 * Describes a property which would be found in a datum of telemetry
 * associated with a particular domain object.
 */
export type TelemetryProperty = any;
/**
 * Describes and bounds requests for telemetry data.
 */
export type TelemetryRequest = any;
export type StalenessResponseObject = {
    /**
     * boolean representing the staleness state
     */
    isStale: boolean;
    /**
     * Unix timestamp in milliseconds
     */
    timestamp: number;
};
import TelemetryRequestInterceptorRegistry from './TelemetryRequestInterceptor';
import CustomStringFormatter from '../../plugins/displayLayout/CustomStringFormatter';
import TelemetryCollection from './TelemetryCollection';
//# sourceMappingURL=TelemetryAPI.d.ts.map