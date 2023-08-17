// const render = (x) => `
//   <div part="header" class="header">
//     <h3 part="greeting">${x.network.toUpperCase()}</h3>
//     <h4 part="message">my name is</h4>
//   </div>

//   <div>
//     Network: <span id="network"></span>
//   </div>

//   <div part="body" class="body">
//     <slot></slot>
//   </div>

//   <div part="footer" class="footer"></div>
// `;

const styles = new CSSStyleSheet();

styles.replaceSync(`
  :host {
    --default-foreground: black;
    --default-background: white;
    --default-radius: 20px;
    --default-depth: 15px;

    display: inline-block;
    padding: 1em;
    contain: content;
    color: var(--foreground, var(--default-foreground));
    background: var(--background, var(--default-background));
    border-radius: var(--radius, var(--default-radius));

    min-width: 325px;
    box-shadow: 0 0 var(--depth, var(--default-depth)) rgba(0,0,0,.5);
  }

  .blockcore-widget-amount {
    color: var(--foreground, var(--default-color));;
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
            id: this.id,
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
  #idElement;
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
      this.shadowRoot.appendChild(this.#networkElement);
    }

    this.#networkElement.innerText = `Network: ${this.network}`;

    if (!this.#addressElement) {
      this.#addressElement = document.createElement("div");
      this.shadowRoot.appendChild(this.#addressElement);
    }

    this.#addressElement.innerText = `Receiver: ${this.address}`;

    if (!this.#idElement) {
      this.#idElement = document.createElement("div");
      this.shadowRoot.appendChild(this.#idElement);
    }

    this.#idElement.innerText = `Reference number: #${this.id}`;

    if (!this.#dataElement) {
      this.#dataElement = document.createElement("div");
      this.shadowRoot.appendChild(this.#dataElement);
    }

    this.#dataElement.innerText = `Data (blockchain): ${this.data}`;

    if (!this.#amountElement) {
      this.#amountElement = document.createElement("div");
      this.#amountElement.className = "blockcore-widget-amount";
      this.shadowRoot.appendChild(this.#amountElement);
    }

    if (!this.#amountElement) {
      this.#amountElement = document.createElement("div");
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

  get color() {
    return this.getAttribute("color");
  }

  set color(val) {
    if (val) {
      this.setAttribute("color", val);
    } else {
      this.removeAttribute("color");
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

    // this.shadowRoot.innerHTML = render(this);
    this.build();
  }

  update() {}
}

customElements.define("blockcore-widget", BlockcoreWidget);

customElements.whenDefined("blockcore-widget").then(() => {});
