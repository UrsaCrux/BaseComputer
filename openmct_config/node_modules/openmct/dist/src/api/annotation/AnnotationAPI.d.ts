/**
 * @typedef {Object} Tag
 * @property {String} key a unique identifier for the tag
 * @property {String} backgroundColor eg. "#cc0000"
 * @property {String} foregroundColor eg. "#ffffff"
 */
/**
 * @typedef {import('../objects/ObjectAPI').DomainObject} DomainObject
 */
/**
 * @typedef {import('../objects/ObjectAPI').Identifier} Identifier
 */
/**
 * @typedef {import('../../../openmct').OpenMCT} OpenMCT
 */
/**
 * An interface for interacting with annotations of domain objects.
 * An annotation of a domain object is an operator created object for the purposes
 * of further describing data in plots, notebooks, maps, etc. For example, an annotation
 * could be a tag on a plot notating an interesting set of points labeled SCIENCE. It could
 * also be set of notebook entries the operator has tagged DRIVING when a robot monitored by OpenMCT
 * about rationals behind why the robot has taken a certain path.
 * Annotations are discoverable using search, and are typically rendered in OpenMCT views to bring attention
 * to other users.
 * @constructor
 */
export default class AnnotationAPI {
    /**
     * @param {OpenMCT} openmct
     */
    constructor(openmct: OpenMCT);
    openmct: import("../../../openmct").OpenMCT;
    availableTags: {};
    namespaceToSaveAnnotations: string;
    ANNOTATION_TYPES: Readonly<{
        NOTEBOOK: "NOTEBOOK";
        GEOSPATIAL: "GEOSPATIAL";
        PIXEL_SPATIAL: "PIXEL_SPATIAL";
        TEMPORAL: "TEMPORAL";
        PLOT_SPATIAL: "PLOT_SPATIAL";
    }>;
    ANNOTATION_TYPE: string;
    ANNOTATION_LAST_CREATED: string;
    /**
     * Creates an annotation on a given domain object (e.g., a plot) and a set of targets (e.g., telemetry objects)
     * @typedef {Object} CreateAnnotationOptions
     * @property {String} name a name for the new annotation (e.g., "Plot annnotation")
     * @property {DomainObject} domainObject the domain object this annotation was created with
     * @property {ANNOTATION_TYPES} annotationType the type of annotation to create (e.g., PLOT_SPATIAL)
     * @property {Tag[]} tags tags to add to the annotation, e.g., SCIENCE for science related annotations
     * @property {String} contentText Some text to add to the annotation, e.g. ("This annotation is about science")
     * @property {Object<string, Object>} targets The targets ID keystrings and their specific properties.
     * For plots, this will be a bounding box, e.g.: {maxY: 100, minY: 0, maxX: 100, minX: 0}
     * For notebooks, this will be an entry ID, e.g.: {entryId: "entry-ecb158f5-d23c-45e1-a704-649b382622ba"}
     * @property {DomainObject>} targetDomainObjects the targets ID keystrings and the domain objects this annotation points to (e.g., telemetry objects for a plot)
     */
    /**
     * @method create
     * @param {CreateAnnotationOptions} options
     * @returns {Promise<DomainObject>} a promise which will resolve when the domain object
     *          has been created, or be rejected if it cannot be saved
     */
    create({ name, domainObject, annotationType, tags, contentText, targets, targetDomainObjects }: {
        /**
         * a name for the new annotation (e.g., "Plot annnotation")
         */
        name: string;
        /**
         * the domain object this annotation was created with
         */
        domainObject: DomainObject;
        /**
         * the type of annotation to create (e.g., PLOT_SPATIAL)
         */
        annotationType: ANNOTATION_TYPES;
        /**
         * tags to add to the annotation, e.g., SCIENCE for science related annotations
         */
        tags: Tag[];
        /**
         * Some text to add to the annotation, e.g. ("This annotation is about science")
         */
        contentText: string;
        /**
         * The targets ID keystrings and their specific properties.
         * For plots, this will be a bounding box, e.g.: {maxY: 100, minY: 0, maxX: 100, minX: 0}
         * For notebooks, this will be an entry ID, e.g.: {entryId: "entry-ecb158f5-d23c-45e1-a704-649b382622ba"}
         */
        targets: {
            [x: string]: Object;
        };
        /**
         * >} targetDomainObjects the targets ID keystrings and the domain objects this annotation points to (e.g., telemetry objects for a plot)
         */
        "": DomainObject;
    }): Promise<DomainObject>;
    /**
     * @method defineTag
     * @param {String} key a unique identifier for the tag
     * @param {Tag} tagsDefinition the definition of the tag to add
     */
    defineTag(tagKey: any, tagsDefinition: Tag): void;
    /**
     * @method setNamespaceToSaveAnnotations
     * @param {String} namespace the namespace to save new annotations to
     */
    setNamespaceToSaveAnnotations(namespace: string): void;
    /**
     * @method isAnnotation
     * @param {DomainObject} domainObject the domainObject in question
     * @returns {Boolean} Returns true if the domain object is an annotation
     */
    isAnnotation(domainObject: DomainObject): boolean;
    /**
     * @method getAvailableTags
     * @returns {Tag[]} Returns an array of the available tags that have been loaded
     */
    getAvailableTags(): Tag[];
    /**
     * @method getAnnotations
     * @param {Identifier} domainObjectIdentifier - The domain object identifier to use to search for annotations. For example, a telemetry object identifier.
     * @returns {DomainObject[]} Returns an array of annotations that match the search query
     */
    getAnnotations(domainObjectIdentifier: Identifier): DomainObject[];
    /**
     * @method deleteAnnotations
     * @param {DomainObject[]} existingAnnotation - An array of annotations to delete (set _deleted to true)
     */
    deleteAnnotations(annotations: any): void;
    /**
     * @method deleteAnnotations
     * @param {DomainObject} annotation - An annotation to undelete (set _deleted to false)
     */
    unDeleteAnnotation(annotation: DomainObject): void;
    getTagsFromAnnotations(annotations: any, filterDuplicates?: boolean): any;
    /**
     * @method searchForTags
     * @param {String} query A query to match against tags. E.g., "dr" will match the tags "drilling" and "driving"
     * @param {Object} [abortController] An optional abort method to stop the query
     * @returns {Promise} returns a model of matching tags with their target domain objects attached
     */
    searchForTags(query: string, abortController?: Object | undefined): Promise<any>;
    #private;
}
export type Tag = {
    /**
     * a unique identifier for the tag
     */
    key: string;
    /**
     * eg. "#cc0000"
     */
    backgroundColor: string;
    /**
     * eg. "#ffffff"
     */
    foregroundColor: string;
};
export type DomainObject = import('../objects/ObjectAPI').DomainObject;
export type Identifier = import('../objects/ObjectAPI').Identifier;
export type OpenMCT = import('../../../openmct').OpenMCT;
/**
 * AnnotationType
 */
type ANNOTATION_TYPES = string;
/**
 * @readonly
 * @enum {String} AnnotationType
 * @property {String} NOTEBOOK The notebook annotation type
 * @property {String} GEOSPATIAL The geospatial annotation type
 * @property {String} PIXEL_SPATIAL The pixel-spatial annotation type
 * @property {String} TEMPORAL The temporal annotation type
 * @property {String} PLOT_SPATIAL The plot-spatial annotation type
 */
declare const ANNOTATION_TYPES: Readonly<{
    NOTEBOOK: "NOTEBOOK";
    GEOSPATIAL: "GEOSPATIAL";
    PIXEL_SPATIAL: "PIXEL_SPATIAL";
    TEMPORAL: "TEMPORAL";
    PLOT_SPATIAL: "PLOT_SPATIAL";
}>;
export {};
//# sourceMappingURL=AnnotationAPI.d.ts.map