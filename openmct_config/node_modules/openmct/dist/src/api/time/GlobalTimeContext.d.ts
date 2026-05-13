export default GlobalTimeContext;
/**
 * The GlobalContext handles getting and setting time of the openmct application in general.
 * Views will use this context unless they specify an alternate/independent time context
 */
declare class GlobalTimeContext extends TimeContext {
    toi: any;
    /**
     * Update bounds based on provided time and current offsets
     * @private
     * @param {number} timestamp A time from which bounds will be calculated
     * using current offsets.
     */
    private tick;
    /**
     * Get or set the Time of Interest. The Time of Interest is a single point
     * in time, and constitutes the temporal focus of application views. It can
     * be manipulated by the user from the time conductor or from other views.
     * The time of interest can effectively be unset by assigning a value of
     * 'undefined'.
     * @fires module:openmct.TimeAPI~timeOfInterest
     * @param newTOI
     * @returns {number} the current time of interest
     * @memberof module:openmct.TimeAPI#
     * @method timeOfInterest
     */
    timeOfInterest(newTOI: any, ...args: any[]): number;
}
import TimeContext from './TimeContext';
//# sourceMappingURL=GlobalTimeContext.d.ts.map