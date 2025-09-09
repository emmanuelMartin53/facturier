export class Print {
    element;
    constructor(element) {
        this.element = element;
    }
    print() {
        document.body.innerHTML = this.element.innerHTML;
        window.print();
        document.location.reload();
    }
}
