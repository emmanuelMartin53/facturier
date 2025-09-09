import { Datas } from "../classes/Datas.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";
export class FormInput {
    form;
    type;
    firstName;
    lastName;
    address;
    country;
    town;
    zip;
    product;
    price;
    quantity;
    tva;
    docContainer;
    hiddenDiv;
    printButton;
    reloadButton;
    constructor() {
        this.form = document.querySelector("#form");
        this.type = document.querySelector("#type");
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lastName");
        this.address = document.getElementById("address");
        this.country = document.getElementById("country");
        this.town = document.getElementById("town");
        this.zip = document.getElementById("zip");
        this.product = document.getElementById("product");
        this.price = document.getElementById("price");
        this.quantity = document.getElementById("quantity");
        this.tva = document.getElementById("tva");
        this.docContainer = document.getElementById("document-container");
        this.hiddenDiv = document.getElementById("hiddenDiv");
        this.printButton = document.getElementById("print");
        this.reloadButton = document.getElementById("reload");
        // Listener
        this.submitFormListener();
        this.printListener(this.printButton, this.docContainer);
        this.reloadListener(this.reloadButton);
    }
    // Listeners
    submitFormListener() {
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }
    printListener(printButton, docContainer) {
        printButton.addEventListener("click", () => {
            let availableDoc;
            availableDoc = new Print(docContainer);
            availableDoc.print();
        });
    }
    reloadListener(reloadButton) {
        reloadButton.addEventListener("click", () => {
            document.location.reload();
            window.scrollTo(0, 0);
        });
    }
    handleFormSubmit(event) {
        event.preventDefault();
        const inputs = this.inputDatas(); // => Renvoie soit un Array, soit Undefined
        if (Array.isArray(inputs)) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
            console.log(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva);
            let docData;
            let date = new Date();
            docData = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);
            let template;
            template = new Display(this.docContainer, this.hiddenDiv, this.printButton);
            template.render(docData, type);
        }
    }
    inputDatas() {
        const type = this.type.value;
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber;
        const product = this.product.value;
        const price = this.price.valueAsNumber;
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        }
        alert("les valeurs numériques doivent etre > 0 !");
        return;
    }
}
