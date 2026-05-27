export default class InterceptorRegistry {
    interceptors: any[];
    /**
     * @interface InterceptorDef
     * @property {function} appliesTo function that determines if this interceptor should be called for the given identifier/object
     * @property {function} invoke function that transforms the provided domain object and returns the transformed domain object
     * @property {function} priority the priority for this interceptor. A higher number returned has more weight than a lower number
     * @memberof module:openmct InterceptorRegistry#
     */
    /**
     * Register a new object interceptor.
     *
     * @param {module:openmct.InterceptorDef} interceptorDef the interceptor to add
     * @method addInterceptor
     * @memberof module:openmct.InterceptorRegistry#
     */
    addInterceptor(interceptorDef: any): void;
    /**
     * Retrieve all interceptors applicable to a domain object.
     * @method getInterceptors
     * @returns [module:openmct.InterceptorDef] the registered interceptors for this identifier/object
     * @memberof module:openmct.InterceptorRegistry#
     */
    getInterceptors(identifier: any, object: any): any[];
}
//# sourceMappingURL=InterceptorRegistry.d.ts.map