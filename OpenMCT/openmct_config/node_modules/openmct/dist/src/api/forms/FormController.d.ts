export const DEFAULT_CONTROLS_MAP: {
    autocomplete: any;
    checkbox: any;
    composite: any;
    datetime: any;
    'file-input': any;
    locator: any;
    numberfield: any;
    select: any;
    textarea: any;
    textfield: any;
    toggleSwitch: any;
};
export default class FormControl {
    constructor(openmct: any);
    openmct: any;
    controls: {};
    addControl(controlName: any, controlViewProvider: any): void;
    getControl(controlName: any): any;
    /**
     * @private
     */
    private _addDefaultFormControls;
    /**
     * @private
     */
    private _getControlViewProvider;
}
//# sourceMappingURL=FormController.d.ts.map