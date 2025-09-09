export class Display {
    container;
    hiddenDiv;
    printButton;
    formContainer;
    constructor(container, hiddenDiv, printButton) {
        this.container = container;
        this.hiddenDiv = hiddenDiv;
        this.printButton = printButton;
        this.formContainer = document.getElementById("form-container");
    }
    render(docObject, docType) {
        const htmlString = docObject.htmlFormat();
        this.container.innerHTML = htmlString;
        if (docType === "invoice") {
            this.printButton.innerHTML = "Imprimer la facture";
        }
        else {
            this.printButton.innerHTML = "imprimer le devis";
        }
        this.hiddenDiv.classList.remove("invisible");
        this.formContainer.innerHTML = "";
    }
}
