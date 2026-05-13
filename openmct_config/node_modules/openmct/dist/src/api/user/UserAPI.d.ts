export default UserAPI;
export type Role = string;
export type OpenMCT = Object;
export type UserAPIConfiguration = {
    statusStyles: {
        [x: string]: StatusStyleDefinition;
    };
};
export type StatusStyleDefinition = {
    /**
     * The icon class to apply to the status indicator when this status is active "icon-circle-slash",
     */
    iconClass: string;
    /**
     * The icon class to apply to the poll question indicator when this style is active eg. "icon-status-poll-question-mark"
     */
    iconClassPoll: string;
    /**
     * The class to apply to the indicator when this status is active eg. "s-status-error"
     */
    statusClass: string;
    /**
     * The background color to apply in the status summary section of the poll question popup for this status eg."#9900cc"
     */
    statusBgColor: string;
    /**
     * The foreground color to apply in the status summary section of the poll question popup for this status eg. "#fff"
     */
    statusFgColor: string;
};
declare class UserAPI {
    /**
     * @param {OpenMCT} openmct
     * @param {UserAPIConfiguration} config
     */
    constructor(openmct: OpenMCT, config: UserAPIConfiguration);
    _openmct: Object;
    _provider: any;
    User: typeof User;
    status: StatusAPI;
    /**
     * Set the user provider for the user API. This allows you
     *  to specifiy ONE user provider to be used with Open MCT.
     * @method setProvider
     * @memberof module:openmct.UserAPI#
     * @param {module:openmct.UserAPI~UserProvider} provider the new
     *        user provider
     */
    setProvider(provider: any): void;
    getProvider(): any;
    /**
     * Return true if the user provider has been set.
     *
     * @memberof module:openmct.UserAPI#
     * @returns {boolean} true if the user provider exists
     */
    hasProvider(): boolean;
    /**
     * If a user provider is set, it will return a copy of a user object from
     * the provider. If the user is not logged in, it will return undefined;
     *
     * @memberof module:openmct.UserAPI#
     * @returns {Function|Promise} user provider 'getCurrentUser' method
     * @throws Will throw an error if no user provider is set
     */
    getCurrentUser(): Function | Promise<any>;
    /**
     * If a user provider is set, it will return the user provider's
     * 'isLoggedIn' method
     *
     * @memberof module:openmct.UserAPI#
     * @returns {Function|Boolean} user provider 'isLoggedIn' method
     * @throws Will throw an error if no user provider is set
     */
    isLoggedIn(): Function | boolean;
    /**
     * If a user provider is set, it will return a call to it's
     * 'hasRole' method
     *
     * @memberof module:openmct.UserAPI#
     * @returns {Function|Boolean} user provider 'isLoggedIn' method
     * @param {string} roleId id of role to check for
     * @throws Will throw an error if no user provider is set
     */
    hasRole(roleId: string): Function | boolean;
    /**
     * Checks if a provider is set and if not, will throw error
     *
     * @private
     * @throws Will throw an error if no user provider is set
     */
    private noProviderCheck;
    /**
     * Utility function for throwing errors
     *
     * @private
     * @param {string} error description of error
     * @throws Will throw error passed in
     */
    private error;
}
import User from './User';
import StatusAPI from './StatusAPI';
//# sourceMappingURL=UserAPI.d.ts.map