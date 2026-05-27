/**
 * @typedef {object} BrandingOptions
 * @property {string} smallLogoImage URL to the image to use as the applications logo.
 * This logo will appear on every screen and when clicked will launch the about dialog.
 * @property {string} aboutHtml Custom content for the about screen. When defined the
 * supplied content will be inserted at the start of the about dialog, and the default
 * Open MCT splash logo will be suppressed.
 */
/**
 * Set branding options for the application. These will override certain visual elements
 * of the application and allow for customization of the application.
 * @param {BrandingOptions} options
 */
export default function Branding(options: BrandingOptions, ...args: any[]): {};
export type BrandingOptions = {
    /**
     * URL to the image to use as the applications logo.
     * This logo will appear on every screen and when clicked will launch the about dialog.
     */
    smallLogoImage: string;
    /**
     * Custom content for the about screen. When defined the
     * supplied content will be inserted at the start of the about dialog, and the default
     * Open MCT splash logo will be suppressed.
     */
    aboutHtml: string;
};
//# sourceMappingURL=Branding.d.ts.map