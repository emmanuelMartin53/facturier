import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";
import { HasRender } from "../interfaces/HasRender.js";

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
      if (docType === "invoice") {
        this.printButton.innerHTML = "Imprimer la facture";
      } else {
        this.printButton.innerHTML = "imprimer le devis";
      }


      this.hiddenDiv.classList.remove("invisible")
      this.formContainer.innerHTML = "";
  }
}
