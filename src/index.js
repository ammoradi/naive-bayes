import cleaner, { mergeMultipleNewLines } from './lib/cleaner'
import bayes from './lib/naive_bayes'
import tokenizer from './lib/tokenizer'
import fs from 'fs'

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8')
};

let ferdowsiRawData = require('./files/ferdowsi.txt')
ferdowsiRawData = mergeMultipleNewLines(ferdowsiRawData).split("\n")
let ferdowsiTrainData = ferdowsiRawData.filter((beyt, index) => {
    if (index % 5 === 0) { return beyt }
})
ferdowsiTrainData = ferdowsiTrainData.join("\n")
let ferdowsiTestData = ferdowsiRawData.filter((beyt, index) => {
    if (index % 5 !== 0) { return beyt }
})
ferdowsiTestData = ferdowsiTestData.join("\n")


let naserRawData = require('./files/naserkhosrow.txt')
naserRawData = mergeMultipleNewLines(naserRawData).split("\n")
let naserTrainData = naserRawData.filter((beyt, index) => {
    if (index % 5 === 0) { return beyt }
})
naserTrainData = naserTrainData.join("\n")
let naserTestData = naserRawData.filter((beyt, index) => {
    if (index % 5 !== 0) { return beyt }
})
naserTestData = naserTestData.join("\n")

let ferdowsiTestCleaned = cleaner(ferdowsiTestData)
let ferdowsiTrainCleaned = cleaner(ferdowsiTrainData)
let naserTestCleaned = cleaner(naserTestData)
let naserTrainCleaned = cleaner(naserTrainData)

let classifier = bayes({ tokenizer })

classifier.learn(ferdowsiTrainCleaned, 'ferdowsi')
classifier.learn(naserTrainCleaned, 'naserkhosrow')

console.log(classifier.categorize(naserTrainData))

let stateJson = classifier.toJson()

let revivedClassifier = bayes.fromJson(stateJson)
