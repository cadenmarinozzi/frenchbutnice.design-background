Hello. \
If you are looking at this you either stumbled upon this randomly, or you saw frenchbutnice.design on Awwards.com and are in love with the 3d background used on the page, and can't find the source code. \
If you are in the second category, you are in luck, because this is the only place on the entire internet where you will find the source code.

# Acknowledgements

I did not make the 3d background, the code was presumably made by [Timothée Roussilhe](https://twitter.com/TimRoussilhe) or by frenchbutnice himself. I just de-attached it from webpack and rewrote the code so that it is easier to understand.

# Original Site

The original site can be found [here](https://frenchbutnice.design/).

# How to use

## Testing Locally

Due to CORS, you can't just open the index.html file in your browser. You need to run a local server. \
If you are on vscode you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

## Adding to your website

Take the code from `script.js` and add it to your website. Then replace the querySelector for the canvas with however you want to select the canvas. (On react you would want to use refs). That's it.

