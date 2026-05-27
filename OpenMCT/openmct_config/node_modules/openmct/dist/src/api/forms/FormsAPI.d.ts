export default class FormsAPI {
    constructor(openmct: any);
    openmct: any;
    formController: FormController;
    /**
     * Control View Provider definition for a form control
     * @typedef ControlViewProvider
     * @property {function} show a function renders view in place of given element
     *   This function accepts element, model and onChange function
     *   element - html element (place holder) to render a row view
     *   model - row data for rendering name, value etc for given row type
     *   onChange - an onChange event callback funtion to keep track of any change in value
     * @property {function} destroy a callback function when a vue component gets destroyed
     */
    /**
     * Create a new form control definition with a formControlViewProvider
     *      this formControlViewProvider is used inside form overlay to show/render a form row
     *
     * @public
     * @param {String} controlName a form structure, array of section
     * @param {ControlViewProvider} controlViewProvider
     */
    public addNewFormControl(controlName: string, controlViewProvider: {
        /**
         * a function renders view in place of given element
         * This function accepts element, model and onChange function
         * element - html element (place holder) to render a row view
         * model - row data for rendering name, value etc for given row type
         * onChange - an onChange event callback funtion to keep track of any change in value
         */
        show: Function;
        /**
         * a callback function when a vue component gets destroyed
         */
        destroy: Function;
    }): void;
    /**
     * Get a ControlViewProvider for a given/stored form controlName
     *
     * @public
     * @param {String} controlName a form structure, array of section
     * @return {ControlViewProvider}
     */
    public getFormControl(controlName: string): {
        /**
         * a function renders view in place of given element
         * This function accepts element, model and onChange function
         * element - html element (place holder) to render a row view
         * model - row data for rendering name, value etc for given row type
         * onChange - an onChange event callback funtion to keep track of any change in value
         */
        show: Function;
        /**
         * a callback function when a vue component gets destroyed
         */
        destroy: Function;
    };
    /**
     * Section definition for formStructure
     * @typedef Section
     * @property {object} name Name of the section to display on Form
     * @property {string} cssClass class name for styling section
     * @property {array<Row>} rows collection of rows inside a section
     */
    /**
     * Row definition for Section
     * @typedef Row
     * @property {string} control represents type of row to render
     *     eg:autocomplete,composite,datetime,file-input,locator,numberfield,select,textarea,textfield
     * @property {string} cssClass class name for styling this row
     * @property {module:openmct.DomainObject} domainObject object to be used by row
     * @property {string} key id for this row
     * @property {string} name Name of the row to display on Form
     * @property {module:openmct.DomainObject} parent parent object to be used by row
     * @property {boolean} required is this row mandatory
     * @property {function} validate a function to validate this row on any changes
     */
    /**
     * Show form inside an Overlay dialog with given form structure
     * @public
     * @param {Array<Section>} formStructure a form structure, array of section
     * @param {Object} options
     *      @property {function} onChange a callback function when any changes detected
     */
    public showForm(formStructure: {
        /**
         * Name of the section to display on Form
         */
        name: object;
        /**
         * class name for styling section
         */
        cssClass: string;
        /**
         * collection of rows inside a section
         */
        rows: array<{
            /**
             * represents type of row to render
             * eg:autocomplete,composite,datetime,file-input,locator,numberfield,select,textarea,textfield
             */
            control: string;
            /**
             * class name for styling this row
             */
            cssClass: string;
            /**
             * object to be used by row
             */
            domainObject: any;
            /**
             * id for this row
             */
            key: string;
            /**
             * Name of the row to display on Form
             */
            name: string;
            /**
             * parent object to be used by row
             */
            parent: any;
            /**
             * is this row mandatory
             */
            required: boolean;
            /**
             * a function to validate this row on any changes
             */
            validate: Function;
        }>;
    }[], { onChange }?: Object): Promise<any>;
    /**
     * Show form as a child of the element provided with given form structure
     *
     * @public
     * @param {Array<Section>} formStructure a form structure, array of section
     * @param {Object} options
     *      @property {HTMLElement} element Parent Element to render a Form
     *      @property {function} onChange a callback function when any changes detected
     */
    public showCustomForm(formStructure: {
        /**
         * Name of the section to display on Form
         */
        name: object;
        /**
         * class name for styling section
         */
        cssClass: string;
        /**
         * collection of rows inside a section
         */
        rows: array<{
            /**
             * represents type of row to render
             * eg:autocomplete,composite,datetime,file-input,locator,numberfield,select,textarea,textfield
             */
            control: string;
            /**
             * class name for styling this row
             */
            cssClass: string;
            /**
             * object to be used by row
             */
            domainObject: any;
            /**
             * id for this row
             */
            key: string;
            /**
             * Name of the row to display on Form
             */
            name: string;
            /**
             * parent object to be used by row
             */
            parent: any;
            /**
             * is this row mandatory
             */
            required: boolean;
            /**
             * a function to validate this row on any changes
             */
            validate: Function;
        }>;
    }[], { element, onChange }?: Object): Promise<any>;
}
import FormController from './FormController';
//# sourceMappingURL=FormsAPI.d.ts.map