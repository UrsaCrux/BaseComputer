export = ApplicationRouter;
declare class ApplicationRouter {
    /**
       * events
       * change:params -> notify listeners w/ new, old, and changed.
       * change:path -> notify listeners w/ new, old paths.
       *
       * methods:
       * update(path, params) -> updates path and params at the same time.  Only
       *   updates specified params, other params are not modified.
       * updateParams(newParams) -> update only specified params, leaving rest
       *      intact.  Does not modify path.
       * updatePath(path);
  
       * route(path, handler);
       * start(); Start routing.
       */
    constructor(openmct: any);
    locationBar: any;
    openmct: any;
    routes: any[];
    started: boolean;
    /**
     * @private
     * Set new hash for url
     *
     * @param {string} hash new hash for url
     */
    private setHash;
    destroy(): void;
    /**
     * Delete a given query parameter from current url
     *
     * @param {string} paramName name of searchParam to delete from current url searchParams
     */
    deleteSearchParam(paramName: string): void;
    /**
     * object for accessing all current search parameters
     *
     * @returns {URLSearchParams} A {@link https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/entries|URLSearchParams}
     */
    getAllSearchParams(): URLSearchParams;
    /**
     * Uniquely identifies a domain object.
     *
     * @typedef CurrentLocation
     * @property {URL} url current url location
     * @property {string} path current url location pathname
     * @property {string} getQueryString a function which returns url search query
     * @property {object} params object representing url searchParams
     */
    /**
     * object for accessing current url location and search params
     *
     * @returns {CurrentLocation} A {@link CurrentLocation}
     */
    getCurrentLocation(): {
        /**
         * current url location
         */
        url: URL;
        /**
         * current url location pathname
         */
        path: string;
        /**
         * a function which returns url search query
         */
        getQueryString: string;
        /**
         * object representing url searchParams
         */
        params: object;
    };
    /**
     * Get current location URL Object
     *
     * @returns {URL} current url location
     */
    getHashRelativeURL(): URL;
    /**
     * Get current location URL Object searchParams
     *
     * @returns {object} object representing current url searchParams
     */
    getParams(): object;
    /**
     * Get a value of given param from current url searchParams
     *
     * @returns {string} value of paramName from current url searchParams
     */
    getSearchParam(paramName: any): string;
    /**
     * Navigate to given hash, update current location object, and notify listeners about location change
     *
     * @param {string} hash The URL hash to navigate to in the form of "#/browse/mine/{keyString}/{keyString}".
     * Should not include any params.
     */
    navigate(hash: string): void;
    /**
     * Check if a given object and current location object are same
     *
     * @param {Array<Object>} objectPath Object path of a given Domain Object
     *
     * @returns {Boolean}
     */
    isNavigatedObject(objectPath: Array<Object>): boolean;
    /**
     * Add routes listeners
     *
     * @param {string} matcher Regex to match value in url
     * @param {@function} callback function called when found match in url
     */
    route(matcher: string, callback: any): void;
    /**
     * Set url hash using path and queryString
     *
     * @param {string} path path for url
     * @param {string} queryString queryString for url
     */
    set(path: string, queryString: string): void;
    /**
     * Will replace all current search parameters with the ones defined in urlSearchParams
     */
    setAllSearchParams(): void;
    /**
     * To force update url based on value in currentLocation object
     */
    setLocationFromUrl(): void;
    /**
     * Set url hash using path
     *
     * @param {string} path path for url
     */
    setPath(path: string): void;
    /**
     * Update param value from current url searchParams
     *
     * @param {string} paramName param name from current url searchParams
     * @param {string} paramValue param value from current url searchParams
     */
    setSearchParam(paramName: string, paramValue: string): void;
    /**
     * start application routing, should be done after handlers are registered.
     */
    start(): void;
    /**
     * Set url hash using path and searchParams object
     *
     * @param {string} path path for url
     * @param {string} params oject representing searchParams key/value
     */
    update(path: string, params: string): void;
    /**
     * Update route params. Takes an object of updates.  New parameters
     */
    updateParams(updateParams: any): void;
    /**
     * To force update url based on value in currentLocation object
     */
    updateTimeSettings(): void;
    /**
     * @private
     * Create currentLocation object
     *
     * @param {string} pathString USVString representing relative URL.
     *
     * @returns {CurrentLocation} A {@link CurrentLocation}
     */
    private createLocation;
    /**
     * @private
     * Compare new and old path and on change emit event 'change:path'
     *
     * @param {string} newPath new path of url
     * @param {string} oldPath old path of url
     */
    private doPathChange;
    /**
     * @private
     * Compare new and old params and on change emit event 'change:params'
     *
     * @param {object} newParams new params of url
     * @param {object} oldParams old params of url
     */
    private doParamsChange;
    /**
     * @private
     * On location change, update currentLocation object and emit appropriate events
     *
     * @param {string} pathString USVString representing relative URL.
     */
    private handleLocationChange;
    currentLocation: {
        /**
         * current url location
         */
        url: URL;
        /**
         * current url location pathname
         */
        path: string;
        /**
         * a function which returns url search query
         */
        getQueryString: string;
        /**
         * object representing url searchParams
         */
        params: object;
    } | undefined;
    /**
     * @private
     * On hash changed, update currentLocation object and emit appropriate events
     *
     * @param {string} hash new hash for url
     */
    private hashChanged;
    /**
     * @private
     * Set queryString part of current url
     *
     * @param {string} queryString queryString part of url
     */
    private setQueryString;
}
//# sourceMappingURL=ApplicationRouter.d.ts.map