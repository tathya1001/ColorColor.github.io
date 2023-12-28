let hexFormat = [];
let hexCode = "#";

const hexTextElement = document.getElementById("hexText");
const rgbValuesElement = document.getElementById("rgbText");
const generateButtonElement = document.getElementById("generateButton");
const messageElement = document.getElementById("message");

// for hexcode generation

for (let i = 0; i < 6; i++) {
    hexFormat[i] = Math.floor(Math.random() * 16);
    if (hexFormat[i] > 9) {
        hexCode = hexCode + String.fromCharCode(hexFormat[i] + 55);
    }
    else {
        hexCode = hexCode + String.fromCharCode(hexFormat[i] + 48);
    }
}

document.body.style.backgroundColor = hexCode;

// for rgb values generation

let rgbFormat = [];

rgbFormat[0] = hexFormat[0] * 16 + hexFormat[1];
rgbFormat[1] = hexFormat[2] * 16 + hexFormat[3];
rgbFormat[2] = hexFormat[4] * 16 + hexFormat[5];

let rgbCode = rgbFormat[0].toString() + ", " + rgbFormat[1].toString() + ", " + rgbFormat[2].toString();

// for contrast ratio generation

let lumoColor = 0.2126 * Math.pow((rgbFormat[0] / 255), 2.2) + 0.7152 * Math.pow((rgbFormat[1] / 255), 2.2) + 0.0722 * Math.pow((rgbFormat[2] / 255), 2.2);
let lumoBlack = 0;
let lumoWhite = 0.2126 + 0.7152 + 0.0722;

let contrastRatioWithBlack = (lumoColor + 0.05) / (lumoBlack + 0.05);
let contrastRatioWithWhite = (lumoWhite + 0.05) / (lumoColor + 0.05);

let textColor = "";

if (contrastRatioWithBlack > contrastRatioWithWhite) {
    textColor = "#000000";
}
else {
    textColor = "#FFFFFF";
}

// assigning colors

hexTextElement.style.color = textColor;
hexTextElement.innerHTML = hexCode;

rgbValuesElement.style.color = textColor;
rgbValuesElement.innerHTML = rgbCode;


generateButtonElement.style.color = textColor;
generateButtonElement.style.backgroundColor = textColor + "22";
// for generation on Space and Enter key

document.addEventListener('keydown', function (event) {
    if (event.key === " " || event.key === "Enter") {
        generateColor();
    }
})

// color generate function

function generateColor() {

    // for hexcode generation

    hexCode = "#";

    for (let i = 0; i < 6; i++) {
        hexFormat[i] = Math.floor(Math.random() * 16);
        if (hexFormat[i] > 9) {
            hexCode = hexCode + String.fromCharCode(hexFormat[i] + 55);
        }
        else {
            hexCode = hexCode + String.fromCharCode(hexFormat[i] + 48);
        }
    }

    document.body.style.backgroundColor = hexCode;

    // for rbg values generation

    rgbCode = "";
    rgbFormat = [];

    rgbFormat[0] = hexFormat[0] * 16 + hexFormat[1];
    rgbFormat[1] = hexFormat[2] * 16 + hexFormat[3];
    rgbFormat[2] = hexFormat[4] * 16 + hexFormat[5];

    rgbCode = rgbFormat[0].toString() + ", " + rgbFormat[1].toString() + ", " + rgbFormat[2].toString();

    // for contrast ratio generation

    lumoColor = 0.2126 * Math.pow((rgbFormat[0] / 255), 2.2) + 0.7152 * Math.pow((rgbFormat[1] / 255), 2.2) + 0.0722 * Math.pow((rgbFormat[2] / 255), 2.2);
    lumoBlack = 0;
    lumoWhite = 0.2126 + 0.7152 + 0.0722;

    contrastRatioWithBlack = (lumoColor + 0.05) / (lumoBlack + 0.05);
    contrastRatioWithWhite = (lumoWhite + 0.05) / (lumoColor + 0.05);

    textColor = "";

    if (contrastRatioWithBlack > contrastRatioWithWhite) {
        textColor = "#000000";
    }
    else {
        textColor = "#FFFFFF";
    }

    // assigning colors

    hexTextElement.style.color = textColor;
    hexTextElement.innerHTML = hexCode;

    rgbValuesElement.style.color = textColor;
    rgbValuesElement.innerHTML = rgbCode;

    // generateButtonElement.style.color = hexCode;
    // generateButtonElement.style.backgroundColor = textColor;

    generateButtonElement.style.color = textColor;
    generateButtonElement.style.backgroundColor = textColor + "22";
}

hexTextElement.addEventListener('click', function () {

    const colorHeading = hexTextElement.innerHTML;
    const tempInput = document.createElement('input');

    tempInput.value = colorHeading;
    document.body.appendChild(tempInput);

    tempInput.select();

    document.execCommand('copy');
    document.body.removeChild(tempInput);

    messageElement.style.visibility = "visible";
    messageElement.style.transitionTimingFunction = "easeIn";


    messageElement.style.color = textColor;
    messageElement.style.backgroundColor = textColor + "15";

    setTimeout(function () {
        messageElement.style.visibility = "hidden";
    }, 1000);

});

// for hover on Hex Code Text

hexTextElement.addEventListener("mouseover", function () {
    hexTextElement.style.backgroundColor = textColor + "15";
});

hexTextElement.addEventListener("mouseout", function () {
    hexTextElement.style.backgroundColor = "transparent";
});

hexTextElement.addEventListener("touchstart", function () {
    hexTextElement.style.backgroundColor = textColor + "15";
    hexTextElement.dispatchEvent(new Event("mouseover"));
});

hexTextElement.addEventListener("touchend", function () {
    hexTextElement.style.backgroundColor = "transparent";
});
