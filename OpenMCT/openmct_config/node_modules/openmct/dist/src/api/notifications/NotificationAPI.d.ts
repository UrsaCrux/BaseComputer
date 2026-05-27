/**
 * The notification service is responsible for informing the user of
 * events via the use of banner notifications.
 */
export default class NotificationAPI extends EventEmitter {
    /** @type {Notification[]} */
    notifications: Notification[];
    /** @type {{severity: "info" | "alert" | "error"}} */
    highest: {
        severity: "info" | "alert" | "error";
    };
    /**
     * A context in which to hold the active notification and a
     * handle to its timeout.
     * @type {Notification | undefined}
     */
    activeNotification: Notification | undefined;
    /**
     * Info notifications are low priority informational messages for the user. They will be auto-destroy after a brief
     * period of time.
     * @param {string} message The message to display to the user
     * @param {NotificationOptions} [options] The notification options
     * @returns {Notification}
     */
    info(message: string, options?: NotificationOptions | undefined): Notification;
    /**
     * Present an alert to the user.
     * @param {string} message The message to display to the user.
     * @param {NotificationOptions} [options] object with following properties
     *      autoDismissTimeout: {number} in milliseconds to automatically dismisses notification
     *      link: {Object} Add a link to notifications for navigation
     *              onClick: callback function
     *              cssClass: css class name to add style on link
     *              text: text to display for link
     * @returns {Notification}
     */
    alert(message: string, options?: NotificationOptions | undefined): Notification;
    /**
     * Present an error message to the user
     * @param {string} message
     * @param {Object} [options] object with following properties
     *      autoDismissTimeout: {number} in milliseconds to automatically dismisses notification
     *      link: {Object} Add a link to notifications for navigation
     *              onClick: callback function
     *              cssClass: css class name to add style on link
     *              text: text to display for link
     * @returns {Notification}
     */
    error(message: string, options?: Object | undefined): Notification;
    /**
     * Create a new progress notification. These notifications will contain a progress bar.
     * @param {string} message
     * @param {number | 'unknown'} progressPerc A value between 0 and 100, or the string 'unknown'.
     * @param {string} [progressText] Text description of progress (eg. "10 of 20 objects copied").
     */
    progress(message: string, progressPerc: number | 'unknown', progressText?: string | undefined): Notification;
    dismissAllNotifications(): void;
    /**
     * Minimize a notification. The notification will still be available
     * from the notification list. Typically notifications with a
     * severity of 'info' should not be minimized, but rather
     * dismissed.
     *
     * @private
     * @param {Notification | undefined} notification
     */
    private _minimize;
    /**
     * Completely removes a notification. This will dismiss it from the
     * message banner and remove it from the list of notifications.
     * Typically only notifications with a severity of info should be
     * dismissed. If you're not sure whether to dismiss or minimize a
     * notification, use {@link Notification#dismissOrMinimize}.
     * dismiss
     *
     * @private
     * @param {Notification | undefined} notification
     */
    private _dismiss;
    /**
     * Depending on the severity of the notification will selectively
     * dismiss or minimize where appropriate.
     *
     * @private
     * @param {Notification | undefined} notification
     */
    private _dismissOrMinimize;
    /**
     * @private
     */
    private _setHighestSeverity;
    /**
     * Notifies the user of an event. If there is a banner notification
     * already active, then it will be dismissed or minimized automatically,
     * and the provided notification displayed in its place.
     *
     * @param {NotificationModel} notificationModel The notification to
     * display
     * @returns {Notification} the provided notification decorated with
     * functions to {@link Notification#dismiss} or {@link Notification#minimize}
     */
    _notify(notificationModel: NotificationModel): Notification;
    activeTimeout: NodeJS.Timeout | undefined;
    /**
     * @private
     * @param {NotificationModel} notificationModel
     * @returns {Notification}
     */
    private _createNotification;
    /**
     * @private
     * @param {Notification | undefined} notification
     */
    private _setActiveNotification;
    /**
     * Used internally by the NotificationService
     *
     * @private
     */
    private _selectNextNotification;
}
export type NotificationProperties = {
    /**
     * Dismiss the notification
     */
    dismiss: Function;
    /**
     * The Notification model
     */
    model: NotificationModel;
    /**
     * Update the progress of the notification
     */
    progress?: ((progressPerc: number, progressText: string) => void) | undefined;
};
export type Notification = EventEmitter & NotificationProperties;
export type NotificationLink = {
    /**
     * The function to be called when the link is clicked
     */
    onClick: Function;
    /**
     * A CSS class name to style the link
     */
    cssClass: string;
    /**
     * The text to be displayed for the link
     */
    text: string;
};
export type NotificationOptions = {
    /**
     * Milliseconds to wait before automatically dismissing the notification
     */
    autoDismissTimeout?: number | undefined;
    /**
     * Allows for a notification to be minimized into the indicator by default
     */
    minimized?: boolean | undefined;
    /**
     * A link for the notification
     */
    link?: NotificationLink | undefined;
};
/**
 * A representation of a banner notification. Banner notifications
 * are used to inform users of events in a non-intrusive way. As
 * much as possible, notifications share a model with blocking
 * dialogs so that the same information can be provided in a dialog
 * and then minimized to a banner notification if needed, or vice-versa.
 */
export type NotificationModel = {
    /**
     * The message to be displayed by the notification
     */
    message: string;
    /**
     * The progress of some ongoing task. Should be a number between 0 and 100, or
     * with the string literal 'unknown'.
     */
    progress?: number | "unknown" | undefined;
    /**
     * A message conveying progress of some ongoing task.
     */
    progressText?: string | undefined;
    /**
     * The severity of the notification. Should be one of 'info', 'alert', or 'error'.
     */
    severity?: string | undefined;
    /**
     * The time at which the notification was created. Should be a string in ISO 8601 format.
     */
    timestamp?: string | undefined;
    /**
     * Whether or not the notification has been minimized
     */
    minimized?: boolean | undefined;
    /**
     * Whether the notification should be automatically dismissed after a short period of time.
     */
    autoDismiss?: boolean | undefined;
    /**
     * The notification options
     */
    options: NotificationOptions;
};
import EventEmitter from 'eventemitter3';
//# sourceMappingURL=NotificationAPI.d.ts.map