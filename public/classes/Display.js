export class Display {
    container;
    hiddenDiv;
    formContainer;
    constructor(container, hiddenDiv) {
        this.container = container;
        this.hiddenDiv = hiddenDiv;
        this.formContainer = document.getElementById("form-container");
    }
    render(docObject, docType) {
        const htmlString = docObject.htmlFormat();
        this.container.innerHTML = htmlString;
        this.hiddenDiv.classList.remove("invisible");
        this.formContainer.innerHTML = "";
    }
}
