import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA
//
"cap-surface","cap-color","bruises","odor","gill-attachment","gill-spacing","stalk-color-below-ring","ring-number","spore-print-color"
const csvFile = "./data/mushrooms.csv"
const trainingLabel = "class"
const ignored = ["class","cap-shape","gill-size","gill-color","stalk-shape",
    "stalk-root","stalk-surface-above-ring","stalk-surface-below-ring","stalk-color-above-ring","veil-type","veil-color",
    "ring-type","population","habitat"]

// "class","cap-shape","cap-surface","cap-color","bruises","odor","gill-attachment","gill-spacing","gill-size","gill-color","stalk-shape",
//     "stalk-root","stalk-surface-above-ring","stalk-surface-below-ring","stalk-color-above-ring","stalk-color-below-ring","veil-type","veil-color",
//     "ring-number","ring-type","spore-print-color","population","habitat"

const accuracy = document.getElementById("accuracy");
const trueTrue = document.getElementById("1");
const falseTrue = document.getElementById("2");
const trueFalse = document.getElementById("3");
const falseFalse = document.getElementById("4");

//
// laad csv data als json
//

function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)   // gebruik deze data om te trainen
    })
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    // todo : splits data in traindata en testdata
    data.sort(() => (Math.random() - 0.5));

    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    // maak het algoritme aan
    let decisionTree = new DecisionTree({
        // hier kan je aangeven welke kolommen genegeerd moeten worden
        ignoredAttributes: ignored,
        trainingSet: trainData,
        // dit is het label dat je wil gaan voorspellen
        categoryAttr: trainingLabel,
        maxTreeDepth: 6
    })

        // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
        let visual = new VegaTree('#view', 800, 400, decisionTree.toJSON())

        let paddenstoel = testData[0]
        let paddenstoelPrediction = decisionTree.predict(paddenstoel)
        console.log(`de paddenstoel is ${paddenstoelPrediction}`)

        function accuracy(data, tree, label) {
        let correct = 0;
        for(const row of data) {
            if (row.class === tree.predict(row)) {
                correct++
            }
        }
        let element = document.getElementById("accuracy")
            element.innerText = `accuracy: ${label} : ${correct / data.length}`
            console.log(`accuracy: ${label} : ${correct / data.length}`)
        }

        accuracy(trainData, decisionTree, "train")
        accuracy(testData, decisionTree, "test")

        let edibleButNot = 0;
        let edibleTrue = 0;
        let poisonousButNot = 0;
        let poisonousTrue = 0;

        for(const row of data) {
            if (row.class === "e" && decisionTree.predict(row) === "e") {
                edibleTrue++
            }
            if (row.class === "p" && decisionTree.predict(row) === "e") {
                edibleButNot++
            }
            if (row.class === "p" && decisionTree.predict(row) === "p") {
                poisonousTrue++
            }
            if (row.class === "e" && decisionTree.predict(row) === "p") {
                poisonousButNot++
            }
        }

        trueTrue.innerText = `${poisonousTrue}`
        trueFalse.innerText = `${poisonousButNot}`
        falseFalse.innerText = `${edibleTrue}`
        falseTrue.innerText = `${edibleButNot}`

    let json = decisionTree.stringify()
    console.log(`JSON ${json}`)
}






loadData()
