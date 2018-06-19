import { normalize } from 'persian-text';

const supp = [' و ', ' ات ', ' اتی ', ' ی ', ' که ', ' از ', ' با ', ' را ', ' در ', ' به ', ' بر ', ' برای ', ' این ', ' اند ', ' است ', ' کرد ', 'ها '];

export function cleanMulSpace(text) {
    return text.replace(/\s\s+/g, ' ');
}

export function removeSupps(text) {
    let text_copy = text;
    supp.map( s => {
        text_copy = text_copy.replace(new RegExp(s, 'g'), ' ');
});
    return text_copy;
}

export function mergeMultipleNewLines(text) {
    return text.replace(/\n\s*\n/g, '\n')
}

export default function cleaner(text) {
    console.log(text)
    let primary = normalize(text);  //  cleaned by persian-text module
    let suppCleaned = removeSupps(primary);
    return cleanMulSpace(suppCleaned)
}
