/**
 * @typedef TypeDefinition
 * @memberof module:openmct.TypeRegistry~
 * @property {string} label the name for this type of object
 * @property {string} description a longer-form description of this type
 * @property {function (object)} [initialize] a function which initializes
 *           the model for new domain objects of this type
 * @property {boolean} [creatable] true if users should be allowed to
 *           create this type (default: false)
 * @property {string} [cssClass] the CSS class to apply for icons
 */
/**
 * A TypeRegistry maintains the definitions for different types
 * that domain objects may have.
 * @interface TypeRegistry
 * @memberof module:openmct
 */
export default class TypeRegistry {
    types: {};
    /**
     * Register a new object type.
     *
     * @param {string} typeKey a string identifier for this type
     * @param {module:openmct.Type} type the type to add
     * @method addType
     * @memberof module:openmct.TypeRegistry#
     */
    addType(typeKey: string, typeDef: any): void;
    /**
     * Takes a typeDef, standardizes it, and logs warnings about unsupported
     * usage.
     * @private
     */
    private standardizeType;
    /**
     * List keys for all registered types.
     * @method listKeys
     * @memberof module:openmct.TypeRegistry#
     * @returns {string[]} all registered type keys
     */
    listKeys(): string[];
    /**
     * Retrieve a registered type by its key.
     * @method get
     * @param {string} typeKey the key for this type
     * @memberof module:openmct.TypeRegistry#
     * @returns {module:openmct.Type} the registered type
     */
    get(typeKey: string): any;
    importLegacyTypes(types: any): void;
}
export type TypeDefinition = any;
//# sourceMappingURL=TypeRegistry.d.ts.map