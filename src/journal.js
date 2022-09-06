import { saveAs } from 'file-saver';

const getFormattedList = (items) => {
    let list = ""
    for (let i = 0; i < items.length; i++) {
        list += `${i + 1}. ${items[i]}\n`
    }
    return list
}

export const saveJournal = ({
    date, 
    dayOfTheWeek, 
    score, 
    gratitudes, 
    forgives, 
    curiosities, 
    entry
}) => {
    const formattedEntry = 
`${dayOfTheWeek}
${score}/10

===============
3 x Gratitude
3 x Forgiveness
3 x Curiosity

the 3 and 3
===============

GRATITUDE
${getFormattedList(gratitudes)}
FORGIVENESS
${getFormattedList(forgives)}
CURIOSITY
${getFormattedList(curiosities)}
===============

${entry}`        
    const blob = new Blob([formattedEntry], {type : "text/txt"}); // the blob
    saveAs(blob, `${date}.txt`);
}
