export default OverlayAPI;
/**
 * The OverlayAPI is responsible for pre-pending templates to
 * the body of the document, which is useful for displaying templates
 * which need to block the full screen.
 *
 * @memberof api/overlays
 * @constructor
 */
declare class OverlayAPI {
    activeOverlays: any[];
    /**
     * private
     */
    dismissLastOverlay(): void;
    /**
     * private
     */
    showOverlay(overlay: any): void;
    /**
     * A description of option properties that can be passed into the overlay
     * @typedef options
     * @property {object} element DOMElement that is to be inserted/shown on the overlay
     * @property {string} size preferred size of the overlay (large, small, fit)
     * @property {array} buttons optional button objects with label and callback properties
     * @property {function} onDestroy callback to be called when overlay is destroyed
     * @property {boolean} dismissable allow user to dismiss overlay by using esc, and clicking away
     * from overlay. Unless set to false, all overlays will be dismissable by default.
     */
    overlay(options: any): Overlay;
    /**
     * Displays a blocking (modal) dialog. This dialog can be used for
     * displaying messages that require the user's
     * immediate attention.
     * @param {model} options defines options for the dialog
     * @returns {object} with an object with a dismiss function that can be called from the calling code
     * to dismiss/destroy the dialog
     *
     * A description of the model options that may be passed to the
     * dialog method. Note that the DialogModel described
     * here is shared with the Notifications framework.
     * @see NotificationService
     *
     * @typedef options
     * @property {string} title the title to use for the dialog
     * @property {string} iconClass class to apply to icon that is shown on dialog
     * @property {string} message text that indicates a current message,
     * @property {buttons[]} buttons a list of buttons with title and callback properties that will
     * be added to the dialog.
     */
    dialog(options: model): object;
    /**
     * Displays a blocking (modal) progress dialog. This dialog can be used for
     * displaying messages that require the user's attention, and show progress
     * @param {model} options defines options for the dialog
     * @returns {object} with an object with a dismiss function that can be called from the calling code
     * to dismiss/destroy the dialog and an updateProgress function that takes progressPercentage(Number 0-100)
     * and progressText (string)
     *
     * A description of the model options that may be passed to the
     * dialog method. Note that the DialogModel described
     * here is shared with the Notifications framework.
     * @see NotificationService
     *
     * @typedef options
     * @property {number} progressPerc the initial progress value (0-100) or {string} 'unknown' for anonymous progress
     * @property {string} progressText the initial text to be shown under the progress bar
     * @property {buttons[]} buttons a list of buttons with title and callback properties that will
     * be added to the dialog.
     */
    progressDialog(options: model): object;
}
import Overlay from './Overlay';
//# sourceMappingURL=OverlayAPI.d.ts.map