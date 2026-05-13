export const TIME_CONTEXT_EVENTS: string[];
export default TimeContext;
export type Bounds = {
    start: number;
    end: number;
};
declare class TimeContext {
    timeSystems: Map<any, any>;
    system: any;
    clocks: Map<any, any>;
    boundsVal: {
        start: undefined;
        end: undefined;
    };
    activeClock: any;
    offsets: {
        /**
         * A time span relative to the current value of the
         * ticking clock, from which start bounds will be calculated. This value must
         * be < 0. When a clock is active, bounds will be calculated automatically
         * based on the value provided by the clock, and the defined clock offsets.
         */
        start: number;
        /**
         * A time span relative to the current value of the
         * ticking clock, from which end bounds will be calculated. This value must
         * be >= 0.
         */
        end: number;
    } | undefined;
    /**
     * Update bounds based on provided time and current offsets
     * @param {number} timestamp A time from which bounds will be calculated
     * using current offsets.
     */
    tick(timestamp: number): void;
    /**
     * Get or set the time system of the TimeAPI.
     * @param {TimeSystem | string} timeSystemOrKey
     * @param {module:openmct.TimeAPI~TimeConductorBounds} bounds
     * @fires module:openmct.TimeAPI~timeSystem
     * @returns {TimeSystem} The currently applied time system
     * @memberof module:openmct.TimeAPI#
     * @method timeSystem
     */
    timeSystem(timeSystemOrKey: TimeSystem | string, bounds: any, ...args: any[]): TimeSystem;
    /**
     * Clock offsets are used to calculate temporal bounds when the system is
     * ticking on a clock source.
     *
     * @typedef {object} ValidationResult
     * @property {boolean} valid Result of the validation - true or false.
     * @property {string} message An error message if valid is false.
     */
    /**
     * Validate the given bounds. This can be used for pre-validation of bounds,
     * for example by views validating user inputs.
     * @param {TimeBounds} bounds The start and end time of the conductor.
     * @returns {ValidationResult} A validation error, or true if valid
     * @memberof module:openmct.TimeAPI#
     * @method validateBounds
     */
    validateBounds(bounds: {
        /**
         * The start time displayed by the time conductor
         * in ms since epoch. Epoch determined by currently active time system
         */
        start: number;
        /**
         * The end time displayed by the time conductor in ms
         * since epoch.
         */
        end: number;
    }): {
        /**
         * Result of the validation - true or false.
         */
        valid: boolean;
        /**
         * An error message if valid is false.
         */
        message: string;
    };
    /**
     * Get or set the start and end time of the time conductor. Basic validation
     * of bounds is performed.
     *
     * @param {module:openmct.TimeAPI~TimeConductorBounds} newBounds
     * @throws {Error} Validation error
     * @fires module:openmct.TimeAPI~bounds
     * @returns {module:openmct.TimeAPI~TimeConductorBounds}
     * @memberof module:openmct.TimeAPI#
     * @method bounds
     */
    bounds(newBounds: any, ...args: any[]): any;
    /**
     * Validate the given offsets. This can be used for pre-validation of
     * offsets, for example by views validating user inputs.
     * @param {ClockOffsets} offsets The start and end offsets from a 'now' value.
     * @returns { ValidationResult } A validation error, and true/false if valid or not
     * @memberof module:openmct.TimeAPI#
     * @method validateOffsets
     */
    validateOffsets(offsets: {
        /**
         * A time span relative to the current value of the
         * ticking clock, from which start bounds will be calculated. This value must
         * be < 0. When a clock is active, bounds will be calculated automatically
         * based on the value provided by the clock, and the defined clock offsets.
         */
        start: number;
        /**
         * A time span relative to the current value of the
         * ticking clock, from which end bounds will be calculated. This value must
         * be >= 0.
         */
        end: number;
    }): {
        /**
         * Result of the validation - true or false.
         */
        valid: boolean;
        /**
         * An error message if valid is false.
         */
        message: string;
    };
    /**
     * @typedef {Object} TimeBounds
     * @property {number} start The start time displayed by the time conductor
     * in ms since epoch. Epoch determined by currently active time system
     * @property {number} end The end time displayed by the time conductor in ms
     * since epoch.
     * @memberof module:openmct.TimeAPI~
     */
    /**
     * Clock offsets are used to calculate temporal bounds when the system is
     * ticking on a clock source.
     *
     * @typedef {object} ClockOffsets
     * @property {number} start A time span relative to the current value of the
     * ticking clock, from which start bounds will be calculated. This value must
     * be < 0. When a clock is active, bounds will be calculated automatically
     * based on the value provided by the clock, and the defined clock offsets.
     * @property {number} end A time span relative to the current value of the
     * ticking clock, from which end bounds will be calculated. This value must
     * be >= 0.
     */
    /**
     * Get or set the currently applied clock offsets. If no parameter is provided,
     * the current value will be returned. If provided, the new value will be
     * used as the new clock offsets.
     * @param {ClockOffsets} offsets
     * @returns {ClockOffsets}
     */
    clockOffsets(offsets: {
        /**
         * A time span relative to the current value of the
         * ticking clock, from which start bounds will be calculated. This value must
         * be < 0. When a clock is active, bounds will be calculated automatically
         * based on the value provided by the clock, and the defined clock offsets.
         */
        start: number;
        /**
         * A time span relative to the current value of the
         * ticking clock, from which end bounds will be calculated. This value must
         * be >= 0.
         */
        end: number;
    }, ...args: any[]): {
        /**
         * A time span relative to the current value of the
         * ticking clock, from which start bounds will be calculated. This value must
         * be < 0. When a clock is active, bounds will be calculated automatically
         * based on the value provided by the clock, and the defined clock offsets.
         */
        start: number;
        /**
         * A time span relative to the current value of the
         * ticking clock, from which end bounds will be calculated. This value must
         * be >= 0.
         */
        end: number;
    };
    /**
     * Stop the currently active clock from ticking, and unset it. This will
     * revert all views to showing a static time frame defined by the current
     * bounds.
     */
    stopClock(): void;
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
    clock(keyOrClock: any, offsets: {
        /**
         * A time span relative to the current value of the
         * ticking clock, from which start bounds will be calculated. This value must
         * be < 0. When a clock is active, bounds will be calculated automatically
         * based on the value provided by the clock, and the defined clock offsets.
         */
        start: number;
        /**
         * A time span relative to the current value of the
         * ticking clock, from which end bounds will be calculated. This value must
         * be >= 0.
         */
        end: number;
    }, ...args: any[]): Clock;
    /**
     * Checks if this time context is in real-time mode or not.
     * @returns {boolean} true if this context is in real-time mode, false if not
     */
    isRealTime(): boolean;
}
//# sourceMappingURL=TimeContext.d.ts.map