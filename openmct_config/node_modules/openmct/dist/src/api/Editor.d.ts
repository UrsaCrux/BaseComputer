export default class Editor {
    constructor(openmct: any);
    editing: boolean;
    openmct: any;
    /**
     * Initiate an editing session. This will start a transaction during
     * which any persist operations will be deferred until either save()
     * or finish() are called.
     */
    edit(): void;
    /**
     * @returns {boolean} true if the application is in edit mode, false otherwise.
     */
    isEditing(): boolean;
    /**
     * Save any unsaved changes from this editing session. This will
     * end the current transaction.
     */
    save(): Promise<void>;
    /**
     * End the currently active transaction and discard unsaved changes.
     */
    cancel(): Promise<any>;
}
//# sourceMappingURL=Editor.d.ts.map