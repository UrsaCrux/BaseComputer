export default IndependentTimeContext;
/**
 * The IndependentTimeContext handles getting and setting time of the openmct application in general.
 * Views will use the GlobalTimeContext unless they specify an alternate/independent time context here.
 */
declare class IndependentTimeContext extends TimeContext {
    constructor(openmct: any, globalTimeContext: any, objectPath: any);
    openmct: any;
    unlisteners: any[];
    globalTimeContext: any;
    upstreamTimeContext: any;
    objectPath: any;
    /**
     * Refresh the time context, following any upstream time contexts as necessary
     */
    refreshContext(viewKey: any): void;
    resetContext(): void;
    /**
     * Set the time context of a view to follow any upstream time contexts as necessary (defaulting to the global context)
     * This needs to be separate from refreshContext
     */
    removeIndependentContext(viewKey: any): void;
    bounds(newBounds: any, ...args: any[]): any;
    tick(timestamp: any, ...args: any[]): any;
    clockOffsets(offsets: any, ...args: any[]): any;
    timeOfInterest(newTOI: any, ...args: any[]): any;
    timeSystem(timeSystemOrKey: any, bounds: any, ...args: any[]): any;
    /**
     * Set the active clock. Tick source will be immediately subscribed to
     * and ticking will begin. Offsets from 'now' must also be provided. A clock
     * can be unset by calling {@link stopClock}.
     *
     * @param {Clock || string} keyOrClock The clock to activate, or its key
     * @param {ClockOffsets} offsets on each tick these will be used to calculate
     * the start and end bounds. This maintains a sliding time window of a fixed
     * width that automatically updates.
     * @fires module:openmct.TimeAPI~clock
     * @return {Clock} the currently active clock;
     */
    clock(keyOrClock: any, offsets: ClockOffsets, ...args: any[]): Clock;
    /**
     * Causes this time context to follow another time context (either the global context, or another upstream time context)
     * This allows views to have their own time context which points to the appropriate upstream context as necessary, achieving nesting.
     */
    followTimeContext(): void;
    /**
     * Stops following any upstream time context
     */
    stopFollowingTimeContext(): void;
    hasOwnContext(): boolean;
    getUpstreamContext(): any;
}
import TimeContext from './TimeContext';
//# sourceMappingURL=IndependentTimeContext.d.ts.map