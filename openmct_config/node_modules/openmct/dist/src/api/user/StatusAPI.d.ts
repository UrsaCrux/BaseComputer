export default class StatusAPI {
    constructor(userAPI: any, openmct: any);
    /**
     * @private
     */
    private onProviderStatusChange;
    /**
     * @private
     */
    private onProviderPollQuestionChange;
    /**
     * Private internal function that cannot be made #private because it needs to be registered as a callback to the user provider
     * @private
     */
    private listenToStatusEvents;
    /**
     * Fetch the currently defined operator status poll question. When presented with a status poll question, all operators will reply with their current status.
     * @returns {Promise<PollQuestion>}
     */
    getPollQuestion(): Promise<PollQuestion>;
    /**
     * Set a poll question for operators to respond to. When presented with a status poll question, all operators will reply with their current status.
     * @param {String} questionText - The text of the question
     * @returns {Promise<Boolean>} true if operation was successful, otherwise false.
     */
    setPollQuestion(questionText: string): Promise<boolean>;
    /**
     * Can the currently logged in user set the operator status poll question.
     * @returns {Promise<Boolean>}
     */
    canSetPollQuestion(): Promise<boolean>;
    /**
     * @returns {Promise<Array<Status>>} the complete list of possible states that an operator can reply to a poll question with.
     */
    getPossibleStatuses(): Promise<Array<Status>>;
    /**
     * @param {import("./UserAPI").Role} role The role to fetch the current status for.
     * @returns {Promise<Status>} the current status of the provided role
     */
    getStatusForRole(role: import("./UserAPI").Role): Promise<Status>;
    /**
     * @param {import("./UserAPI").Role} role
     * @returns {Promise<Boolean>} true if the configured UserProvider can provide status for the given role
     * @see StatusUserProvider
     */
    canProvideStatusForRole(role: import("./UserAPI").Role): Promise<boolean>;
    /**
     * @param {import("./UserAPI").Role} role The role to set the status for.
     * @param {Status} status The status to set for the provided role
     * @returns {Promise<Boolean>} true if operation was successful, otherwise false.
     */
    setStatusForRole(role: import("./UserAPI").Role, status: Status): Promise<boolean>;
    /**
     * Resets the status of the provided role back to its default status.
     * @param {import("./UserAPI").Role} role The role to set the status for.
     * @returns {Promise<Boolean>} true if operation was successful, otherwise false.
     */
    resetStatusForRole(role: import("./UserAPI").Role): Promise<boolean>;
    /**
     * Resets the status of all operators to their default status
     * @returns {Promise<Boolean>} true if operation was successful, otherwise false.
     */
    resetAllStatuses(): Promise<boolean>;
    /**
     * The default status. This is the status that will be used before the user has selected any status.
     * @param {import("./UserAPI").Role} role
     * @returns {Promise<Status>} the default operator status if no other has been set.
     */
    getDefaultStatusForRole(role: import("./UserAPI").Role): Promise<Status>;
    /**
     * All possible status roles. A status role is a user role that can provide status. In some systems
     * this may be all user roles, but there may be cases where some users are not are not polled
     * for status if they do not have a real-time operational role.
     *
     * @returns {Promise<Array<import("./UserAPI").Role>>} the default operator status if no other has been set.
     */
    getAllStatusRoles(): Promise<Array<import("./UserAPI").Role>>;
    /**
     * The status role of the current user. A user may have multiple roles, but will only have one role
     * that provides status at any time.
     * @returns {Promise<import("./UserAPI").Role>} the role for which the current user can provide status.
     */
    getStatusRoleForCurrentUser(): Promise<import("./UserAPI").Role>;
    /**
     * @returns {Promise<Boolean>} true if the configured UserProvider can provide status for the currently logged in user, false otherwise.
     * @see StatusUserProvider
     */
    canProvideStatusForCurrentUser(): Promise<boolean>;
    #private;
}
export type UserProvider = typeof import("./UserProvider");
export type StatusUserProvider = typeof import("./StatusUserProvider");
/**
 * The PollQuestion type
 */
export type PollQuestion = {
    /**
     * - The question to be presented to users
     */
    question: string;
    /**
     * - The time that the poll question was set.
     */
    timestamp: number;
};
/**
 * The Status type
 */
export type Status = {
    /**
     * - A unique identifier for this status
     */
    key: string;
    /**
     * - A human readable label for this status
     */
    label: string;
    /**
     * - The time that the status was set.
     */
    timestamp: number;
};
//# sourceMappingURL=StatusAPI.d.ts.map