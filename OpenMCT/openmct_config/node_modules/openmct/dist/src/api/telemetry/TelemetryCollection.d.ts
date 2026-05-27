/** Class representing a Telemetry Collection. */
export default class TelemetryCollection {
    /**
     * Creates a Telemetry Collection
     *
     * @param  {OpenMCT} openmct - Open MCT
     * @param  {module:openmct.DomainObject} domainObject - Domain Object to use for telemetry collection
     * @param  {object} options - Any options passed in for request/subscribe
     */
    constructor(openmct: OpenMCT, domainObject: any, options: object);
    loaded: boolean;
    openmct: OpenMCT;
    domainObject: any;
    boundedTelemetry: any[];
    futureBuffer: any[];
    parseTime: ((datum: any) => any) | undefined;
    metadata: any;
    unsubscribe: any;
    options: object;
    pageState: any;
    lastBounds: any;
    requestAbort: AbortController | undefined;
    isStrategyLatest: boolean;
    dataOutsideTimeBounds: boolean;
    /**
     * This will start the requests for historical and realtime data,
     * as well as setting up initial values and watchers
     */
    load(): void;
    /**
     * can/should be called by the requester of the telemetry collection
     * to remove any listeners
     */
    destroy(): void;
    /**
     * This will start the requests for historical and realtime data,
     * as well as setting up initial values and watchers
     */
    getAll(): any[];
    /**
     * If a historical provider exists, then historical requests will be made
     * @private
     */
    private _requestHistoricalTelemetry;
    /**
     * This uses the built in subscription function from Telemetry API
     * @private
     */
    private _initiateSubscriptionTelemetry;
    /**
     * Filter any new telemetry (add/page, historical, subscription) based on
     * time bounds and dupes
     *
     * @param  {(Object|Object[])} telemetryData - telemetry data object or
     * array of telemetry data objects
     * @private
     */
    private _processNewTelemetry;
    /**
     * Finds the correct insertion point for the given telemetry datum.
     * Leverages lodash's `sortedIndexBy` function which implements a binary search.
     * @private
     */
    private _sortedIndex;
    /**
     * when the start time, end time, or both have been updated.
     * data could be added OR removed here we update the current
     * bounded telemetry
     *
     * @param  {TimeConductorBounds} bounds The newly updated bounds
     * @param  {boolean} [tick] `true` if the bounds update was due to
     * a "tick" event (ie. was an automatic update), false otherwise.
     * @private
     */
    private _bounds;
    _handleDataInsideBounds(): void;
    _handleDataOutsideBounds(): void;
    /**
     * whenever the time system is updated need to update related values in
     * the Telemetry Collection and reset the telemetry collection
     *
     * @param  {TimeSystem} timeSystem - the value of the currently applied
     * Time System
     * @private
     */
    private _setTimeSystem;
    timeKey: any;
    _setTimeSystemAndFetchData(timeSystem: any): void;
    /**
     * Reset the telemetry data of the collection, and re-request
     * historical telemetry
     * @private
     *
     * @todo handle subscriptions more granually
     */
    private _reset;
    /**
     * adds the _bounds callback to the 'bounds' timeAPI listener
     * @private
     */
    private _watchBounds;
    /**
     * removes the _bounds callback from the 'bounds' timeAPI listener
     * @private
     */
    private _unwatchBounds;
    /**
     * adds the _setTimeSystemAndFetchData callback to the 'timeSystem' timeAPI listener
     * @private
     */
    private _watchTimeSystem;
    /**
     * removes the _setTimeSystemAndFetchData callback from the 'timeSystem' timeAPI listener
     * @private
     */
    private _unwatchTimeSystem;
    /**
     * will throw a new Error, for passed in message
     * @param  {string} message Message describing the error
     * @private
     */
    private _error;
    _warn(message: any): void;
}
//# sourceMappingURL=TelemetryCollection.d.ts.map