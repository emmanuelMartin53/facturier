import { HasHtmlFormat } from "../interfaces/HasHtmlFormat";
import { HasRender } from "../interfaces/HasRender";
import { Storage } from "./Storage";

export class Display implements HasRender {

  formContainer: HTMLDivElement;

  constructor (
      private container: HTMLDivElement,
      private hiddenDiv: HTMLDivElement,
      private printButton: HTMLButtonElement

  ) {
    this.formContainer =  document.getElementById("form-container") as HTMLDivElement;

  }

  render (docObject: HasHtmlFormat, docType: string) {
      const htmlString: string = docObject.htmlFormat();
      this.container.innerHTML = htmlString;


      new Storage(docType, htmlString)


      if (docType === "invoice") {
        this.printButton.innerHTML = "Imprimer la facture";
      } else {
        this.printButton.innerHTML = "imprimer le devis";
      }


      this.hiddenDiv.classList.remove("invisible")
      this.formContainer.innerHTML = "";
  }
}
