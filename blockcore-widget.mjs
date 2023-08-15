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
  
    static get observedAttributes() {
      return ["disabled", "chain"];
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
      return this.hasAttribute("chain");
    }
  
    set chain(val) {
      console.log("CHAIN VAL:", val);
      if (val) {
        this.setAttribute("chain", val);
      } else {
        this.removeAttribute("chain");
      }
    }
  
    connectedCallback() {
      // ...
      console.log("connectedCallback");
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