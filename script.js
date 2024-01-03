let hexFormat = [];
let hexCode = "#";

let arrayHC = [];
let arrayHF = [];
let arrayRGBC = [];
let arrayRGBF = [];

let currentCardIndex = 0;
let latestCardIndex = 0;


const hexTextElement = document.getElementById("hexText");
const rgbValuesElement = document.getElementById("rgbText");
const generateButtonElement = document.getElementById("generateButton");
const messageElement = document.getElementById("message");

const leftElement = document.getElementById("leftSide");
const rightElement = document.getElementById("rightSide");

generateColor();

generateButtonElement.addEventListener("click", function () {
    generateColor();
});

function generateColor() {

    generateHex();
    generateRGB(arrayHF[latestCardIndex]);
    setColor(arrayHC[latestCardIndex], arrayRGBF[latestCardIndex], arrayRGBC[latestCardIndex]);

    for (let i = 0; i < arrayHC.length; i++) {
        console.log(arrayHC[i], " ", arrayRGBF[i]);

    }

    latestCardIndex++;
    currentCardIndex = latestCardIndex - 1;

    console.log("latestCardIndex = ", latestCardIndex);
    console.log("currentCardIndex = ", currentCardIndex);
}



function generateHex() {
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

    arrayHC.push(hexCode);
    arrayHF.push(hexFormat);
}


function generateRGB(hexFormat) {
    rgbCode = "";
    rgbFormat = [];

    rgbFormat[0] = hexFormat[0] * 16 + hexFormat[1];
    rgbFormat[1] = hexFormat[2] * 16 + hexFormat[3];
    rgbFormat[2] = hexFormat[4] * 16 + hexFormat[5];

    rgbCode = rgbFormat[0].toString() + ", " + rgbFormat[1].toString() + ", " + rgbFormat[2].toString();

    arrayRGBC.push(rgbCode);
    arrayRGBF.push(rgbFormat);


}


function setColor(hexCode, rgbFormat, rgbCode) {

    document.body.style.backgroundColor = hexCode;

    let lumoColor = 0.2126 * Math.pow((rgbFormat[0] / 255), 2.2) + 0.7152 * Math.pow((rgbFormat[1] / 255), 2.2) + 0.0722 * Math.pow((rgbFormat[2] / 255), 2.2);
    let lumoBlack = 0;
    let lumoWhite = 0.2126 + 0.7152 + 0.0722;

    contrastRatioWithBlack = (lumoColor + 0.05) / (lumoBlack + 0.05);
    contrastRatioWithWhite = (lumoWhite + 0.05) / (lumoColor + 0.05);

    textColor = "";

    if (contrastRatioWithBlack > contrastRatioWithWhite) {
        textColor = "#000000";
    }
    else {
        textColor = "#FFFFFF";
    }

    hexTextElement.style.color = textColor;
    hexTextElement.innerHTML = hexCode;

    rgbValuesElement.style.color = textColor;
    rgbValuesElement.innerHTML = rgbCode;

    generateButtonElement.style.color = textColor;
    generateButtonElement.style.backgroundColor = textColor + "22";
}

leftElement.addEventListener("click", function () {
    console.log("left");
    currentCardIndex = currentCardIndex - 1;
    if (currentCardIndex >= 0) {
        setColor(arrayHC[currentCardIndex], arrayRGBF[currentCardIndex], arrayRGBC[currentCardIndex]);
        console.log("latestCardIndex = ", latestCardIndex);
        console.log("currentCardIndex = ", currentCardIndex);
    }
    else {
        currentCardIndex++;
    }


});

rightElement.addEventListener("click", function () {
    console.log("right");
    currentCardIndex = currentCardIndex + 1;
    if (currentCardIndex < arrayHC.length) {
        setColor(arrayHC[currentCardIndex], arrayRGBF[currentCardIndex], arrayRGBC[currentCardIndex]);

        console.log("latestCardIndex = ", latestCardIndex);
        console.log("currentCardIndex = ", currentCardIndex);
    }
    else {
        currentCardIndex--;
    }
});





document.addEventListener('keydown', function (event) {
    if (event.key === " " || event.key === "Enter") {
        generateColor();
    }
})


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

