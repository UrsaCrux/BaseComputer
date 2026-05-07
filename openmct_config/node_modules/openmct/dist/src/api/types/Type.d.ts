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
 * A Type describes a kind of domain object that may appear or be
 * created within Open MCT.
 *
 * @param {module:opemct.TypeRegistry~TypeDefinition} definition
 * @class Type
 * @memberof module:openmct
 */
export default class Type {
    /**
     * Create a type definition from a legacy definition.
     */
    static definitionFromLegacyDefinition(legacyDefinition: any): {
        name: any;
        cssClass: any;
        description: any;
        form: any;
        telemetry: {
            values: never[];
        };
        initialize(model: any): void;
        creatable: boolean;
    };
    constructor(definition: any);
    definition: any;
    key: any;
    /**
     * Check if a domain object is an instance of this type.
     * @param domainObject
     * @returns {boolean} true if the domain object is of this type
     * @memberof module:openmct.Type#
     * @method check
     */
    check(domainObject: any): boolean;
    /**
     * Get a definition for this type that can be registered using the
     * legacy bundle format.
     * @private
     */
    private toLegacyDefinition;
}
//# sourceMappingURL=Type.d.ts.map