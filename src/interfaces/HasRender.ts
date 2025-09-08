import { HasHtmlFormat } from "./HasHtmlFormat.js";


// Création de l'interface HasRender



export interface HasRender {
    render(docObject: HasHtmlFormat,  docType: string): void;
}
