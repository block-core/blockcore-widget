# Blockcore Widget

Interactive payment widget for Blockcore chains.

![Widget screenshot](blockcore-widget-screenshot.png "Widget screenshot")

## Usage

You can either manually add attributes needed for the widget, or render using a serverside or clientside runtime.

```html
<script src="https://unpkg.com/@blockcore/widget/blockcore-widget.mjs"></script>

<blockcore-widget></blockcore-widget>
```

The above is the initial setup, but you need to configure network, amount, etc. There are no default values.

```
    <blockcore-widget
      network="CITY"
      amount="10.5"
      address="Ccoquhaae7u6ASqQ5BiYueASz8EavUXrKn"
      message="Invoice Number 5"
      label="Your Royal Highness"
      data="MzExMzUzNDIzNDY"
      reference="4324"
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

### Styling

You can override the default styling by either creating classes that overrides the built-in classes (e.g. `.blockcore-widget-amount`), or you can use CSS variables.

```css
html {
  --foreground: black;
  --background: white;
  --accent: #dfab3c;

  --radius: 20px;
  --depth: 15px;
}
```

These can also be applied directly on the widget, if you want it to have separate color schemes than rest of website.

## Example usage

Blockcore is hosting an pay link service that utilizes the widget, check it out here:

[https://pay.blockcore.net/...](https://pay.blockcore.net/?network=CITY&amount=100.59&address=CJsbsaQPmb65cpnpghxrz3ccz8fPC1nohE&label=Invoice%2055&message=Here%20is%20your%20invoice%20and%20we%20hope%20you%20can%20pay%20it%20as%20soon%20as%20possible.%20Thanks!&reference=55&data=23-55)
