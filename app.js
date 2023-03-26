import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

const display = document.getElementById("display");
const testbtn = document.querySelector("#test");

testbtn.addEventListener("click", () => loadSavedModel() && console.log("loading model"));

function loadSavedModel() {
    fetch("./model/model.json")
        .then((response) => response.json())
        .then((model) => modelLoaded())
}

function modelLoaded(model) {
    let decisionTree = new DecisionTree(model)

    let capSurfaceValue = document.getElementById('CapSurface').value;
    let capColorValue = document.getElementById('CapColor').value;
    let bruisesValue = document.getElementById('Bruises').value;
    let odorValue = document.getElementById('Odor').value;
    let gillAttachmentValue = document.getElementById('GillAttachment').value;
    let gillSpacingValue = document.getElementById('GillSpacing').value;
    let stalkColorBelowRingValue = document.getElementById('StalkColorBelowRing').value;
    let ringNumberValue = document.getElementById('RingNumber').value;
    let sporePrintColorValue = document.getElementById('SporePrintColor').value;

    //test tijd
    let data = {CapSurface: capSurfaceValue, CapColor: capColorValue, Bruises: bruisesValue, Odor: odorValue,
        GillAttachment: gillAttachmentValue, GillSpacing: gillSpacingValue, StalkColorBelowRing: stalkColorBelowRingValue,
        RingNumber: ringNumberValue, SporePrintColor: sporePrintColorValue}

    let prediction = decisionTree.predict(data)
    console.log("predected:" + data)

    if (prediction === e) {
        display.innerText = `deze paddenstoel is lekker`
    } else {
        display.innerText = `deze paddenstoel moe je nie eten`
    }
}