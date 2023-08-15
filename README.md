# Blockcore Widget

Interactive payment widget for Blockcore chains.

## Usage

You can either manually add attributes needed for the widget, or render using a serverside or clientside runtime.

```html
<script src="https://unpkg.com/@blockcore/widget/blockcore-widget.mjs"></script>

<blockcore-widget></blockcore-widget>
```

The above is the initial setup, but you need to configure network, amount, etc. There are no default values.

```
    <blockcore-widget
      color="DFAB3C"
      network="CITY"
      amount="10.5"
      address="Ccoquhaae7u6ASqQ5BiYueASz8EavUXrKn"
      message="Invoice Number 5"
      label="Your Royal Highness"
      data="MzExMzUzNDIzNDY"
      id="4324"
    ></blockcore-widget>
```

You can change the attribute on-the-fly using JavaScript:

```
<script>
const widget = document.querySelector("blockcore-widget");
const urlParams = new URLSearchParams(window.location.search);
widget.amount = urlParams.get("amount") ?? "0";
</script>
```
