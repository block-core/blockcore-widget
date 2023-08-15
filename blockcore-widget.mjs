class BlockcoreWidget extends HTMLElement {
  constructor() {
    super();
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

  render() {
    if (!this.#styleElement) {
      this.#styleElement = document.createElement("style");

      this.#styleElement.innerHTML = `.blockcore-widget-pay-button {
              padding: 2rem;
              margin-bottom: 0.4em; 
              margin-top: 0.4em; 
              font-size: 1.2em; 
              border-radius: 5px; 
              border: 0; 
              padding: 1em; 
              background-color:  ${this.color};
              cursor: pointer;
           }
  
           .blockcore-widget-pay-button:hover {
              opacity: 0.8;
           }
           
           .blockcore-widget-label {
              font-size: 1.4em;
           }
           
           .blockcore-widget-amount {
              font-size: 2em;
              margin-top: 0.4em;
              margin-bottom: 0.4em;
           }`;

      this.appendChild(this.#styleElement);
    }

    if (!this.#labelElement) {
      this.#labelElement = document.createElement("div");
      this.#labelElement.className = "blockcore-widget-label";
      this.appendChild(this.#labelElement);
    }

    this.#labelElement.innerHTML = `<strong>${this.label}</strong>`;

    if (!this.#messageElement) {
      this.#messageElement = document.createElement("div");
      this.appendChild(this.#messageElement);
    }

    this.#messageElement.innerHTML = `<p>${this.message}</p>`;

    if (!this.#networkElement) {
      this.#networkElement = document.createElement("div");
      this.appendChild(this.#networkElement);
    }

    this.#networkElement.innerHTML = `Network: ${this.network}`;

    if (!this.#addressElement) {
      this.#addressElement = document.createElement("div");
      this.appendChild(this.#addressElement);
    }

    this.#addressElement.innerHTML = `Receiver: ${this.address}`;

    if (!this.#idElement) {
      this.#idElement = document.createElement("div");
      this.appendChild(this.#idElement);
    }

    this.#idElement.innerHTML = `Reference number: #${this.id}`;

    if (!this.#dataElement) {
      this.#dataElement = document.createElement("div");
      this.appendChild(this.#dataElement);
    }

    this.#dataElement.innerText = `Data (blockchain): ${this.data}`;

    if (!this.#amountElement) {
      this.#amountElement = document.createElement("div");
      this.#amountElement.className = "blockcore-widget-amount";
      this.appendChild(this.#amountElement);
    }

    if (!this.#amountElement) {
      this.#amountElement = document.createElement("div");
      this.appendChild(this.#amountElement);
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

      this.appendChild(this.#payButtonElement);
    }

    if (!this.#paymentLink) {
      this.#paymentLink = document.createElement("div");
      this.#paymentLink.innerHTML =
        'Payment securely processed using <a href="https://www.blockcore.net/wallet" target="_blank">Blockcore Wallet extension</a>.';
      this.appendChild(this.#paymentLink);
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
    this.render();
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

    this.render();
  }
}

customElements.define("blockcore-widget", BlockcoreWidget);

customElements.whenDefined("blockcore-widget").then(() => {});
