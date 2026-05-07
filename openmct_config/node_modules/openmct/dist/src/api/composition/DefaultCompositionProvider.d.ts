/**
 * @typedef {import('../objects/ObjectAPI').DomainObject} DomainObject
 */
/**
 * @typedef {import('../objects/ObjectAPI').Identifier} Identifier
 */
/**
 * @typedef {import('./CompositionAPI').default} CompositionAPI
 */
/**
 * @typedef {import('../../../openmct').OpenMCT} OpenMCT
 */
/**
 * A CompositionProvider provides the underlying implementation of
 * composition-related behavior for certain types of domain object.
 *
 * By default, a composition provider will not support composition
 * modification.  You can add support for mutation of composition by
 * defining `add` and/or `remove` methods.
 *
 * If the composition of an object can change over time-- perhaps via
 * server updates or mutation via the add/remove methods, then one must
 * trigger events as necessary.
 * @extends CompositionProvider
 */
export default class DefaultCompositionProvider extends CompositionProvider {
}
export type DomainObject = import('../objects/ObjectAPI').DomainObject;
export type Identifier = import('../objects/ObjectAPI').Identifier;
export type CompositionAPI = import('./CompositionAPI').default;
export type OpenMCT = import('../../../openmct').OpenMCT;
import CompositionProvider from './CompositionProvider';
//# sourceMappingURL=DefaultCompositionProvider.d.ts.map