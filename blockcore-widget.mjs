class BlockcoreWidget extends HTMLElement {
    constructor() {
        super();
        // this.innerHTML = '123';
        // this.innerText = "gdfdh ";

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener("click", (e) => {
            // Don't toggle the drawer if it's disabled.
            if (this.disabled) {
                return;
            }
            this.openPayment();
        });
    }

    openPayment() {
        console.log("OPEN PAYMENT:", this.getAttribute("chain"));
    }

    render () {
        
    }

    static get observedAttributes() {
        return ["disabled", "chain", "network", "amount", "address", "message", "data", "id", "readonly"];
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    set disabled(val) {
        if (val) {
            this.setAttribute("disabled", "");
        } else {
            this.removeAttribute("disabled");
        }
    }

    get chain() {
        return this.getAttribute("chain");
    }

    set chain(val) {
        console.log("CHAIN VAL:", val);
        if (val) {
            this.setAttribute("chain", val);
        } else {
            this.removeAttribute("chain");
        }
    }

    get network() {
        return this.getAttribute("network");
    }

    set network(val) {
        if (val) {
            this.setAttribute("network", val);
        } else {
            this.removeAttribute("network");
        }
    }

    get amount() {
        return this.getAttribute("amount");
    }

    set amount(val) {
        if (val) {
            this.setAttribute("amount", val);
        } else {
            this.removeAttribute("amount");
        }
    }

    get address() {
        return this.getAttribute("address");
    }

    set address(val) {

        if (val) {
            this.setAttribute("address", val);
        } else {
            this.removeAttribute("address");
        }
    }

    get message() {
        return this.getAttribute("message");
    }

    set message(val) {
        if (val) {
            this.setAttribute("message", val);
        } else {
            this.removeAttribute("message");
        }
    }

    get data() {
        return this.getAttribute("data");
    }

    set data(val) {
        if (val) {
            this.setAttribute("data", val);
        } else {
            this.removeAttribute("data");
        }
    }

    get id() {
        return this.getAttribute("id");
    }

    set id(val) {
        if (val) {
            this.setAttribute("id", val);
        } else {
            this.removeAttribute("id");
        }
    }

    get readonly() {
        return this.hasAttribute("disabled");
    }

    set readonly(val) {
        if (val) {
            this.setAttribute("disabled", "");
        } else {
            this.removeAttribute("disabled");
        }
    }


    connectedCallback() {
        // ...
        console.log("connectedCallback");
        this.innerHTML = "<div>Indian Wedding</div>"
    }

    disconnectedCallback() {
        // ...
        console.log("disconnectedCallback");
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        // ...
        console.log("attributeChangedCallback");

        // When the drawer is disabled, update keyboard/screen reader behavior.
        if (this.disabled) {
            this.setAttribute("tabindex", "-1");
            this.setAttribute("aria-disabled", "true");
        } else {
            this.setAttribute("tabindex", "0");
            this.setAttribute("aria-disabled", "false");
        }

        console.log("attrName:", attrName);
        console.log(oldVal);
        console.log(newVal);

        if (this.chain) {
            console.log("The selected widget chain is: ", this.chain);
        }

        // TODO: also react to the open attribute changing.
    }
}

customElements.define("blockcore-widget", BlockcoreWidget);

customElements.whenDefined("blockcore-widget").then(() => {
    console.log("blockcore-widget defined");
});