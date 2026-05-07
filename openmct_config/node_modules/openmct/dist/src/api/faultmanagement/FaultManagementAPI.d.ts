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
export default class FaultManagementAPI {
    /**
     * @param {import("openmct").OpenMCT} openmct
     */
    constructor(openmct: import("openmct").OpenMCT);
    openmct: import("openmct").OpenMCT;
    /**
     * @param {*} provider
     */
    addProvider(provider: any): void;
    provider: any;
    /**
     * @returns {boolean}
     */
    supportsActions(): boolean;
    /**
     * @param {import("../objects/ObjectAPI").DomainObject} domainObject
     * @returns {Promise.<FaultAPIResponse[]>}
     */
    request(domainObject: import("../objects/ObjectAPI").DomainObject): Promise<FaultAPIResponse[]>;
    /**
     * @param {import("../objects/ObjectAPI").DomainObject} domainObject
     * @param {Function} callback
     * @returns {Function} unsubscribe
     */
    subscribe(domainObject: import("../objects/ObjectAPI").DomainObject, callback: Function): Function;
    /**
     * @param {Fault} fault
     * @param {*} ackData
     */
    acknowledgeFault(fault: Fault, ackData: any): any;
    /**
     * @param {Fault} fault
     * @param {*} shelveData
     * @returns {Promise.<T>}
     */
    shelveFault(fault: Fault, shelveData: any): Promise<T>;
}
export type TriggerValueInfo = {
    value: number;
    rangeCondition: string;
    monitoringResult: string;
};
export type CurrentValueInfo = {
    value: number;
    rangeCondition: string;
    monitoringResult: string;
};
export type Fault = {
    acknowledged: boolean;
    currentValueInfo: CurrentValueInfo;
    id: string;
    name: string;
    namespace: string;
    seqNum: number;
    severity: string;
    shelved: boolean;
    shortDescription: string;
    triggerTime: string;
    triggerValueInfo: TriggerValueInfo;
};
export type FaultAPIResponse = {
    type: string;
    fault: Fault;
};
//# sourceMappingURL=FaultManagementAPI.d.ts.map