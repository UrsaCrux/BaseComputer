/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2023, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/**
 * @typedef {import('../objects/ObjectAPI').DomainObject} DomainObject
 */
/**
 * @typedef {import('./CompositionAPI').default} CompositionAPI
 */
/**
 * @typedef {import('../../../openmct').OpenMCT} OpenMCT
 */
/**
 * @typedef {object} ListenerMap
 * @property {Array.<any>} add
 * @property {Array.<any>} remove
 * @property {Array.<any>} load
 * @property {Array.<any>} reorder
 */
/**
 * A CompositionCollection represents the list of domain objects contained
 * by another domain object. It provides methods for loading this
 * list asynchronously, modifying this list, and listening for changes to
 * this list.
 *
 * Usage:
 * ```javascript
 *  var myViewComposition = MCT.composition.get(myViewObject);
 *  myViewComposition.on('add', addObjectToView);
 *  myViewComposition.on('remove', removeObjectFromView);
 *  myViewComposition.load(); // will trigger `add` for all loaded objects.
 *  ```
 */
export default class CompositionCollection {
    /**
     * @constructor
     * @param {DomainObject} domainObject the domain object
     *        whose composition will be contained
     * @param {import('./CompositionProvider').default} provider the provider
     *        to use to retrieve other domain objects
     * @param {OpenMCT} publicAPI the composition API, for
     *        policy checks
     */
    constructor(domainObject: DomainObject, provider: import('./CompositionProvider').default, publicAPI: OpenMCT);
    domainObject: import("../objects/ObjectAPI").DomainObject;
    onProviderAdd: (childId: import('../objects/ObjectAPI').Identifier) => DomainObject;
    onProviderRemove: (child: DomainObject) => void;
    returnMutables: boolean | undefined;
    /**
     * Listen for changes to this composition.  Supports 'add', 'remove', and
     * 'load' events.
     *
     * @param {string} event event to listen for, either 'add', 'remove' or 'load'.
     * @param {(...args: any[]) => void} callback to trigger when event occurs.
     * @param {any} [context] to use when invoking callback, optional.
     */
    on(event: string, callback: (...args: any[]) => void, context?: any): void;
    /**
     * Remove a listener.  Must be called with same exact parameters as
     * `off`.
     *
     * @param {string} event
     * @param {(...args: any[]) => void} callback
     * @param {any} [context]
     */
    off(event: string, callback: (...args: any[]) => void, context?: any): void;
    /**
     * Add a domain object to this composition.
     *
     * A call to [load]{@link module:openmct.CompositionCollection#load}
     * must have resolved before using this method.
     *
     * **TODO:** Remove `skipMutate` parameter.
     *
     * @param {DomainObject} child the domain object to add
     * @param {boolean} skipMutate
     * **Intended for internal use ONLY.**
     * true if the underlying provider should not be updated.
     */
    add(child: DomainObject, skipMutate: boolean): void;
    /**
     * Load the domain objects in this composition.
     *
     * @param {AbortSignal} abortSignal
     * @returns {Promise.<Array.<DomainObject>>} a promise for
     *          the domain objects in this composition
     * @memberof {module:openmct.CompositionCollection#}
     * @name load
     */
    load(abortSignal: AbortSignal): Promise<Array<DomainObject>>;
    /**
     * Remove a domain object from this composition.
     *
     * A call to [load]{@link module:openmct.CompositionCollection#load}
     * must have resolved before using this method.
     *
     * **TODO:** Remove `skipMutate` parameter.
     *
     * @param {DomainObject} child the domain object to remove
     * @param {boolean} skipMutate
     * **Intended for internal use ONLY.**
     * true if the underlying provider should not be updated.
     * @name remove
     */
    remove(child: DomainObject, skipMutate: boolean): void;
    /**
     * Reorder the domain objects in this composition.
     *
     * A call to [load]{@link module:openmct.CompositionCollection#load}
     * must have resolved before using this method.
     *
     * @param {number} oldIndex
     * @param {number} newIndex
     * @name remove
     */
    reorder(oldIndex: number, newIndex: number, _skipMutate: any): void;
    /**
     * Destroy mutationListener
     */
    _destroy(): void;
    #private;
}
export type DomainObject = import('../objects/ObjectAPI').DomainObject;
export type CompositionAPI = import('./CompositionAPI').default;
export type OpenMCT = import('../../../openmct').OpenMCT;
export type ListenerMap = {
    add: Array<any>;
    remove: Array<any>;
    load: Array<any>;
    reorder: Array<any>;
};
//# sourceMappingURL=CompositionCollection.d.ts.map