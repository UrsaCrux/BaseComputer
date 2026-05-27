export default InMemorySearchProvider;
declare class InMemorySearchProvider {
    /**
     * A search service which searches through domain objects in
     * the filetree without using external search implementations.
     *
     * @constructor
     * @param {Object} openmct
     */
    constructor(openmct: Object);
    /**
     * Maximum number of concurrent index requests to allow.
     */
    MAX_CONCURRENT_REQUESTS: number;
    /**
     * If max results is not specified in query, use this as default.
     */
    DEFAULT_MAX_RESULTS: number;
    openmct: Object;
    indexedIds: {};
    indexedCompositions: {};
    idsToIndex: any[];
    pendingIndex: {};
    pendingRequests: number;
    worker: SharedWorker | null;
    /**
     * If we don't have SharedWorkers available (e.g., iOS)
     */
    localIndexedDomainObjects: {};
    localIndexedAnnotationsByDomainObject: {};
    localIndexedAnnotationsByTag: {};
    pendingQueries: {};
    /**
     * Handle messages from the worker.
     * @private
     */
    private onWorkerMessage;
    /**
     * Handle error messages from the worker.
     * @private
     */
    private onWorkerMessageError;
    /**
     * A local version of the same SharedWorker function
     * if we don't have SharedWorkers available (e.g., iOS)
     *
     * Gets search results from the indexedItems based on provided search
     * input. Returns matching results from indexedItems
     */
    localSearchForObjects(queryId: any, searchInput: any, maxResults: any): void;
    /**
     * A local version of the same SharedWorker function
     * if we don't have SharedWorkers available (e.g., iOS)
     */
    localSearchForAnnotations(queryId: any, searchInput: any, maxResults: any): void;
    /**
     * A local version of the same SharedWorker function
     * if we don't have SharedWorkers available (e.g., iOS)
     */
    localSearchForTags(queryId: any, matchingTagKeys: any, maxResults: any): void;
    onAnnotationCreation(annotationObject: any): void;
    onCompositionAdded(newDomainObjectToIndex: any): void;
    onCompositionRemoved(domainObjectToRemoveIdentifier: any): void;
    onerror: (event: any) => void;
    startIndexing(): void;
    searchTypes: any;
    supportedSearchTypes: any[] | undefined;
    indexAnnotations(): void;
    /**
     * @private
     */
    private getIntermediateResponse;
    search(query: any, searchType: any): Promise<any>;
    supportsSearchType(searchType: any): boolean;
    /**
     * Handle errors from the worker.
     * @private
     */
    private onWorkerError;
    /**
     * @private
     */
    private startSharedWorker;
    /**
     * Schedule an id to be indexed at a later date.  If there are less
     * pending requests than the maximum allowed, this will kick off an indexing request.
     * This is done only when indexing first begins and we need to index a lot of objects.
     *
     * @private
     * @param {identifier} id to be indexed.
     */
    private scheduleForIndexing;
    /**
     * If there are less pending requests than concurrent requests, keep
     * firing requests.
     *
     * @private
     */
    private keepIndexing;
    onNameMutation(domainObject: any, name: any): void;
    /**
     * Pass a domainObject to the worker to be indexed.
     * If the object has composition, schedule those ids for later indexing.
     * Watch for object changes and re-index object and children if so
     *
     * @private
     * @param domainObject a domainObject
     */
    private index;
    /**
     * Pulls an id from the indexing queue, loads it from the model service,
     * and indexes it.  Upon completion, tells the provider to keep
     * indexing.
     *
     * @private
     */
    private beginIndexRequest;
    localIndexTags(keyString: any, objectToIndex: any, model: any): void;
    localIndexAnnotation(objectToIndex: any, model: any): void;
    /**
     * A local version of the same SharedWorker function
     * if we don't have SharedWorkers available (e.g., iOS)
     */
    localIndexItem(keyString: any, model: any): void;
    destroyObservers(observers: any): void;
    #private;
}
//# sourceMappingURL=InMemorySearchProvider.d.ts.map