export default class StatusUserProvider extends UserProvider {
    /**
     * @param {('statusChange'|'pollQuestionChange')} event the name of the event to listen to
     * @param {Function} callback a function to invoke when this event occurs
     */
    on(event: ('statusChange' | 'pollQuestionChange'), callback: Function): void;
    /**
     * @param {('statusChange'|'pollQuestionChange')} event the name of the event to stop listen to
     * @param {Function} callback the callback function used to register the listener
     */
    off(event: ('statusChange' | 'pollQuestionChange'), callback: Function): void;
    /**
     * @returns {import("./StatusAPI").PollQuestion} the current status poll question
     */
    getPollQuestion(): import("./StatusAPI").PollQuestion;
    /**
     * @param {import("./StatusAPI").PollQuestion} pollQuestion a new poll question to set
     * @returns {Promise<Boolean>} true if operation was successful, otherwise false
     */
    setPollQuestion(pollQuestion: import("./StatusAPI").PollQuestion): Promise<boolean>;
    /**
     * @returns {Promise<Boolean>} true if the current user can set the poll question, otherwise false
     */
    canSetPollQuestion(): Promise<boolean>;
    /**
     * @returns {Promise<Array<import("./StatusAPI").Status>>} a list of the possible statuses that an operator can be in
     */
    getPossibleStatuses(): Promise<Array<import("./StatusAPI").Status>>;
    /**
     * @param {import("./UserAPI").Role} role
     * @returns {Promise<import("./StatusAPI").Status}
     */
    getStatusForRole(role: import("./UserAPI").Role): Promise<import("./StatusAPI").Status>;
    /**
     * @param {import("./UserAPI").Role} role
     * @returns {Promise<import("./StatusAPI").Status}
     */
    getDefaultStatusForRole(role: import("./UserAPI").Role): Promise<import("./StatusAPI").Status>;
    /**
     * @param {import("./UserAPI").Role} role
     * @param {*} status
     * @returns {Promise<Boolean>} true if operation was successful, otherwise false.
     */
    setStatusForRole(role: import("./UserAPI").Role, status: any): Promise<boolean>;
    /**
     * @param {import("./UserAPI").Role} role
     * @returns {Promise<Boolean} true if the user provider can provide status for the given role
     */
    canProvideStatusForRole(role: import("./UserAPI").Role): Promise<boolean>;
    /**
     * @returns {Promise<Array<import("./UserAPI").Role>>} a list of all available status roles, if user permissions allow it.
     */
    getAllStatusRoles(): Promise<Array<import("./UserAPI").Role>>;
    /**
     * @returns {Promise<import("./UserAPI").Role>} the active status role for the currently logged in user
     */
    getStatusRoleForCurrentUser(): Promise<import("./UserAPI").Role>;
}
import UserProvider from './UserProvider';
//# sourceMappingURL=StatusUserProvider.d.ts.map