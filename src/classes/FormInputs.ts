import { HasHtmlFormat } from "../interfaces/HasHtmlFormat";
import { Datas } from "../classes/Datas"
import { HasRender } from "../interfaces/HasRender";
import { Display } from "./Display";
import { HasPrint } from "../interfaces/HasPrint";
import { Print } from "./Print";
import { bind } from "../decorators/Bind";

export class FormInput {

  form: HTMLFormElement;
  type: HTMLSelectElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  address: HTMLInputElement;
  country: HTMLInputElement;
  town: HTMLInputElement;
  zip: HTMLInputElement;
  product: HTMLInputElement;
  price: HTMLInputElement;
  quantity: HTMLInputElement;
  tva: HTMLInputElement;
  docContainer: HTMLDivElement;
  storedData: HTMLDivElement;
  hiddenDiv: HTMLDivElement;
  printButton: HTMLButtonElement;
  reloadButton: HTMLButtonElement;
  invoiceButton: HTMLButtonElement;
  estimateButton: HTMLButtonElement;





  constructor () {
    this.form = document.querySelector("#form") as HTMLFormElement;
    this.type = document.querySelector("#type") as HTMLSelectElement;
    this.firstName = document.getElementById("firstName") as HTMLInputElement;
    this.lastName = document.getElementById("lastName") as HTMLInputElement;
    this.address = document.getElementById("address") as HTMLInputElement;
    this.country = document.getElementById("country") as HTMLInputElement;
    this.town = document.getElementById("town") as HTMLInputElement;
    this.zip = document.getElementById("zip") as HTMLInputElement;
    this.product = document.getElementById("product") as HTMLInputElement;
    this.price = document.getElementById("price") as HTMLInputElement;
    this.quantity = document.getElementById("quantity") as HTMLInputElement;
    this.tva = document.getElementById("tva") as HTMLInputElement;
    this.storedData = document.getElementById("stored-data") as HTMLDivElement;


    this.docContainer = document.getElementById("document-container") as HTMLDivElement;
    this.hiddenDiv = document.getElementById("hiddenDiv") as HTMLDivElement;
    this.printButton = document.getElementById("print") as HTMLButtonElement;
    this.reloadButton = document.getElementById("reload") as HTMLButtonElement;
    this.invoiceButton = document.getElementById("stored-invoices") as HTMLButtonElement;
    this.estimateButton = document.getElementById("stored-estimates") as HTMLButtonElement;



    // Listener
    this.submitFormListener();
    this.printListener(this.printButton, this.docContainer);
    this.reloadListener(this.reloadButton);
    this.getStoreDocsListener()

  }

  // Listeners

  private submitFormListener (): void {
    this.form.addEventListener("submit", this.handleFormSubmit)
  }

  private printListener (printButton: HTMLButtonElement, docContainer: HTMLDivElement): void {
    printButton.addEventListener("click", () => {
      let availableDoc: HasPrint;
      availableDoc = new Print(docContainer);
      availableDoc.print();
    })
  }

  private reloadListener (reloadButton: HTMLButtonElement): void {
    reloadButton.addEventListener("click", () => {
      document.location.reload();
      window.scrollTo(0,0)
    })
  }

  private getStoreDocsListener(): void {
    this.invoiceButton.addEventListener("click", () => this.getItems('invoice'))
    this.estimateButton.addEventListener("click", () => this.getItems('estimate'))
  }

  private getItems (docType: string) {

    console.log(this)
    if (this.storedData.hasChildNodes()) {
        this.storedData.innerHTML = ""
    }

    if (localStorage.getItem(docType)) {
      let array: string | null;
      array = localStorage.getItem(docType);

      if (array !== null && array.length > 2) {
        let arrayData: string[];
        arrayData = JSON.parse(array)

        arrayData.map((doc: string): void => {
          let card: HTMLDivElement = document.createElement("div");
          let cardBody: HTMLDivElement = document.createElement("div");
          let cardClasses: string[] = ['card', 'mt-5']
          let cardBodyClasses: string = "card-body"
          card.classList.add(...cardClasses);
          cardBody.classList.add(cardBodyClasses)

          cardBody.innerHTML = doc;
          card.append(cardBody)

          this.storedData.append(card);
        })

      } else {
        this.storedData.innerHTML = `<div class="p-5"> Aucune Data disponible </div>`
      }
    }
  }

  @bind
  private handleFormSubmit (event: Event) {
    event.preventDefault();
    console.log(this) // => donne accès à l'objet instancié de la classe => FormInput
    const inputs = this.inputDatas() // => Renvoie soit un Array, soit Undefined

    if (Array.isArray(inputs)) {
      const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
      console.log(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva);

      let docData: HasHtmlFormat;
      let date: Date = new Date();

      docData =  new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);
      let template: HasRender;
      template = new Display(this.docContainer, this.hiddenDiv, this.printButton);
      template.render(docData, type)

    }

  }

  private inputDatas (): [string, string, string, string, string, string, number, string, number, number, number] | void {
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

    if ( zip > 0 && price > 0 && quantity > 0 && tva > 0 )  {
      return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva]
    }
    alert("les valeurs numériques doivent etre > 0 !")
    return;
  }

}
