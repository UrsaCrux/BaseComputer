export default ProgressDialog;
declare class ProgressDialog extends Overlay {
    constructor({ progressPerc, progressText, iconClass, message, title, hint, timestamp, ...options }: {
        [x: string]: any;
        progressPerc: any;
        progressText: any;
        iconClass: any;
        message: any;
        title: any;
        hint: any;
        timestamp: any;
    });
    updateProgress(progressPerc: any, progressText: any): void;
}
import Overlay from './Overlay';
//# sourceMappingURL=ProgressDialog.d.ts.map