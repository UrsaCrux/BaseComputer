export default Overlay;
declare class Overlay {
    constructor({ buttons, autoHide, dismissable, element, onDestroy, onDismiss, size }?: {
        buttons: any;
        autoHide?: boolean | undefined;
        dismissable?: boolean | undefined;
        element: any;
        onDestroy: any;
        onDismiss: any;
        size: any;
    });
    container: HTMLDivElement;
    autoHide: boolean;
    dismissable: boolean;
    component: import("vue/types/vue").CombinedVueInstance<Vue, object, object, object, Record<never, any>>;
    dismiss(): void;
    notifyAndDismiss(): void;
    /**
     * @private
     **/
    private show;
}
import Vue from 'vue';
//# sourceMappingURL=Overlay.d.ts.map