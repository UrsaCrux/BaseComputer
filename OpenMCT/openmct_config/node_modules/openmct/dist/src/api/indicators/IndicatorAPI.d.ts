export default IndicatorAPI;
declare class IndicatorAPI {
    constructor(openmct: any);
    openmct: any;
    indicatorObjects: any[];
    getIndicatorObjectsByPriority(): any[];
    simpleIndicator(): SimpleIndicator;
    /**
     * Accepts an indicator object, which is a simple object
     * with a two attributes: 'element' which has an HTMLElement
     * as its value, and 'priority' with an integer that specifies its order in the layout.
     * The lower the priority, the further to the right the element is placed.
     * If undefined, the priority will be assigned -1.
     *
     * We provide .simpleIndicator() as a convenience function
     * which will create a default Open MCT indicator that can
     * be passed to .add(indicator). This indicator also exposes
     * functions for changing its appearance to support customization
     * and dynamic behavior.
     *
     * Eg.
     * const myIndicator = openmct.indicators.simpleIndicator();
     * openmct.indicators.add(myIndicator);
     *
     * myIndicator.text("Hello World!");
     * myIndicator.iconClass("icon-info");
     *
     */
    add(indicator: any): void;
}
import SimpleIndicator from './SimpleIndicator';
//# sourceMappingURL=IndicatorAPI.d.ts.map