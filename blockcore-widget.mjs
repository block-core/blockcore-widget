const styles = new CSSStyleSheet();

styles.replaceSync(`
  :host {
    --default-foreground: black;
    --default-background: white;
    --default-accent: #DFAB3C;

    --default-radius: 20px;
    --default-depth: 15px;

    display: inline-block;
    padding: 2em 1.5em 1.2em 1.5em;
    contain: content;
    color: var(--foreground, var(--default-foreground));
    background: var(--background, var(--default-background));
    border-radius: var(--radius, var(--default-radius));

    box-shadow: 0 0 var(--depth, var(--default-depth)) rgba(0,0,0,.5);
    margin: 1em;
  }

  .blockcore-widget-amount {
    color: var(--foreground, var(--default-color));;
  }

  .blockcore-widget-pay-button {
      margin-bottom: 0.4em;
      margin-top: 0.4em;
      font-size: 1.2em;
      border-radius: 5px;
      border: 0;
      padding: 1em;
      margin-bottom: 1em;
      background-color: var(--accent, var(--default-accent));
      width: 100%;
      cursor: pointer;
    }

  .blockcore-widget-pay-button:hover {
    opacity: 0.8;
  }

  .blockcore-widget-label {
    font-size: 1.4em;
    font-weight: 700;
  }

  .blockcore-widget-message {
  margin-top: 0.6em;
  margin-bottom: 0.6em;
  }

  .blockcore-widget-amount {
    font-size: 1.6em;
    font-weight: 700;
    margin-top: 0.4em;
    margin-bottom: 0.4em;
  }

  .blockcore-widget-id {
    margin-top: 1em;
  }

  .blockcore-widget-network {
    margin-top: 1em;
  }

  .blockcore-widget-data {
    margin-bottom: 1em;
  }

  .blockcore-widget-data {
    margin-bottom: 1em;
  }

  .blockcore-widget-footer {
    font-size: 0.8em;
    opacity: 0.8;
    text-align: center;
  }

`);

class BlockcoreWidget extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    // this.shadowRoot.innerHTML = `HELLO WORLD <slot></slot>`;

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      styles,
    ];
  }

  async request(args) {
    const blockcore = globalThis.blockcore;

    if (!blockcore) {
      throw Error(
        "The Blockcore provider is not available. Unable to continue."
      );
    }

    let result;

    try {
      result = await blockcore.request(args);
    } catch (err) {
      console.error(err);
      result = "Error: " + err.message;
    }

    return result;
  }

  async openPayment() {
    try {
      var result = await this.request({
        method: "payment",
        params: [
          {
            network: this.network,
            amount: this.amount,
            address: this.address,
            label: this.label,
            message: this.message,
            data: this.data,
            id: this.reference,
          },
        ],
      });

      console.log("Result:", result);
    } catch (err) {
      console.error(err);
    }
  }

  #networkElement;
  #styleElement;
  #labelElement;
  #messageElement;
  #dataElement;
  #addressElement;
  #addressElementLink;
  #referenceElement;
  #amountElement;
  #payButtonElement;
  #paymentLink;

  build() {
    if (!this.#labelElement) {
      this.#labelElement = document.createElement("div");
      this.#labelElement.className = "blockcore-widget-label";
      this.shadowRoot.appendChild(this.#labelElement);
    }

    this.#labelElement.innerText = this.label;

    if (!this.#messageElement) {
      this.#messageElement = document.createElement("div");
      this.#messageElement.className = "blockcore-widget-message";
      this.shadowRoot.appendChild(this.#messageElement);
    }

    this.#messageElement.innerText = this.message;

    if (!this.#networkElement) {
      this.#networkElement = document.createElement("div");
      this.#networkElement.className = "blockcore-widget-network";
      this.shadowRoot.appendChild(this.#networkElement);
    }

    this.#networkElement.innerText = `Network: ${this.network}`;

    if (!this.#addressElement) {
      this.#addressElement = document.createElement("div");
      this.#addressElement.className = "blockcore-widget-address";
      this.shadowRoot.appendChild(this.#addressElement);

      this.#addressElement.innerText = "Address:";

      this.#addressElementLink = document.createElement("a");
      this.#addressElementLink.setAttribute("target", "_blank");
      this.#addressElement.appendChild(this.#addressElementLink);
    }

    this.#addressElementLink.setAttribute(
      "href",
      `https://explorer.blockcore.net/${this.network}/explorer/address/${this.address}`
    );

    this.#addressElementLink.innerText = this.address;
    // this.#addressElement.innerText = `Receiver: ${this.address}`;

    if (!this.#referenceElement) {
      this.#referenceElement = document.createElement("div");
      this.#referenceElement.className = "blockcore-widget-id";
      this.shadowRoot.appendChild(this.#referenceElement);
    }

    this.#referenceElement.innerText = `ID: #${this.reference}`;

    if (!this.#dataElement) {
      this.#dataElement = document.createElement("div");
      this.#dataElement.className = "blockcore-widget-data";
      this.shadowRoot.appendChild(this.#dataElement);
    }

    this.#dataElement.innerText = `Data: ${this.data}`;

    if (!this.#amountElement) {
      this.#amountElement = document.createElement("div");
      this.#amountElement.className = "blockcore-widget-amount";
      this.shadowRoot.appendChild(this.#amountElement);
    }

    this.#amountElement.innerText = `Amount: ${this.amount}`;

    if (!this.#payButtonElement) {
      this.#payButtonElement = document.createElement("button");
      this.#payButtonElement.type = "button";
      this.#payButtonElement.innerText = "Pay now";
      this.#payButtonElement.className = "blockcore-widget-pay-button";

      this.#payButtonElement.addEventListener("click", (e) => {
        if (this.disabled) {
          return;
        }

        this.openPayment();
      });

      this.shadowRoot.appendChild(this.#payButtonElement);
    }

    if (!this.#paymentLink) {
      this.#paymentLink = document.createElement("div");
      this.#paymentLink.className = "blockcore-widget-footer";
      this.#paymentLink.innerHTML =
        'Payment securely processed using <a href="https://www.blockcore.net/wallet" target="_blank">Blockcore Wallet extension</a>.';
      this.shadowRoot.appendChild(this.#paymentLink);
    }
  }

  static get observedAttributes() {
    return [
      "disabled",
      "network",
      "amount",
      "address",
      "message",
      "data",
      "id",
      "readonly",
      "color",
    ];
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

  get label() {
    return this.getAttribute("label");
  }

  set label(val) {
    if (val) {
      this.setAttribute("label", val);
    } else {
      this.removeAttribute("label");
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
    this.build();
  }

  disconnectedCallback() {}

  attributeChangedCallback(attrName, oldVal, newVal) {
    // When the drawer is disabled, update keyboard/screen reader behavior.
    if (this.disabled) {
      this.setAttribute("tabindex", "-1");
      this.setAttribute("aria-disabled", "true");
    } else {
      this.setAttribute("tabindex", "0");
      this.setAttribute("aria-disabled", "false");
    }

    this.build();
  }

  update() {}
}

customElements.define("blockcore-widget", BlockcoreWidget);

customElements.whenDefined("blockcore-widget").then(() => {});
