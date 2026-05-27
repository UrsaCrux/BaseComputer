export default MenuAPI;
/**
 * Popup Menu options
 */
export type MenuOptions = {
    /**
     * Class for popup menu
     */
    menuClass: string;
    /**
     * Placement for menu relative to click
     */
    placement: {
        TOP: string;
        TOP_LEFT: string;
        TOP_RIGHT: string;
        BOTTOM: string;
        BOTTOM_LEFT: string;
        BOTTOM_RIGHT: string;
        LEFT: string;
        RIGHT: string;
    };
    /**
     * callback function: invoked when menu is destroyed
     */
    onDestroy: Function;
};
/**
 * Popup Menu Item/action
 */
export type Action = {
    /**
     * Class for menu item
     */
    cssClass: string;
    /**
     * adds disable class if true
     */
    isDisabled: boolean;
    /**
     * Menu item text
     */
    name: string;
    /**
     * Menu item description
     */
    description: string;
    /**
     * callback function: invoked when item is clicked
     */
    onItemClicked: Function;
};
/**
 * Popup Menu options
 * @typedef {Object} MenuOptions
 * @property {String} menuClass Class for popup menu
 * @property {MENU_PLACEMENT} placement Placement for menu relative to click
 * @property {Function} onDestroy callback function: invoked when menu is destroyed
 */
/**
 * Popup Menu Item/action
 * @typedef {Object} Action
 * @property {String} cssClass Class for menu item
 * @property {Boolean} isDisabled adds disable class if true
 * @property {String} name Menu item text
 * @property {String} description Menu item description
 * @property {Function} onItemClicked callback function: invoked when item is clicked
 */
/**
 * The MenuAPI allows the addition of new context menu actions, and for the context menu to be launched from
 * custom HTML elements.
 * @interface MenuAPI
 * @memberof module:openmct
 */
declare class MenuAPI {
    constructor(openmct: any);
    openmct: any;
    menuPlacement: {
        TOP: string;
        TOP_LEFT: string;
        TOP_RIGHT: string;
        BOTTOM: string;
        BOTTOM_LEFT: string;
        BOTTOM_RIGHT: string;
        LEFT: string;
        RIGHT: string;
    };
    /**
     * Show popup menu
     * @param {number} x x-coordinates for popup
     * @param {number} y x-coordinates for popup
     * @param {Array.<Action>|Array.<Array.<Action>>} actions collection of actions{@link Action} or collection of groups of actions {@link Action}
     * @param {MenuOptions} [menuOptions] [Optional] The {@link MenuOptions} options for Menu
     */
    showMenu(x: number, y: number, items: any, menuOptions?: MenuOptions | undefined): void;
    /**
     * Show popup menu with description of item on hover
     * @param {number} x x-coordinates for popup
     * @param {number} y x-coordinates for popup
     * @param {Array.<Action>|Array.<Array.<Action>>} actions collection of actions {@link Action} or collection of groups of actions {@link Action}
     * @param {MenuOptions} [menuOptions] [Optional] The {@link MenuOptions} options for Menu
     */
    showSuperMenu(x: number, y: number, actions: Array<Action> | Array<Array<Action>>, menuOptions?: MenuOptions | undefined): void;
    _clearMenuComponent(): void;
    _showObjectMenu(objectPath: any, x: any, y: any, actionsToBeIncluded: any): void;
    actionsToMenuItems(actions: any, objectPath: any, view: any): any;
    menuComponent: Menu | undefined;
    _createMenuComponent(x: any, y: any, actions: any, menuOptions?: {}): void;
}
import Menu from './menu.js';
//# sourceMappingURL=MenuAPI.d.ts.map