function countSyllables(word) {
    let syllableCount = word.match(/[аеёиоуыэюя]/gi);
    return (syllableCount === null) ? 1 : syllableCount.length;
}

function flashReadabilityIndex(text) {
    const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.trim().length > 0);
    
    const totalWords = words.length;
    const totalSentences = sentences.length;
    const totalSyllables = words.reduce((count, word) => count + countSyllables(word), 0);
    
    const ASL = totalWords / totalSentences;
    const ASW = totalSyllables / totalWords;
    
    return 206.835 - (1.1 * ASL) - (50.1 * ASW);
}

function fleschKincaidGradeLevel(totalWords, totalSentences, totalSyllables) {
    const ASL = totalWords / totalSentences;
    const ASW = totalSyllables / totalWords;
    return (0.45 * ASL) + (6.0 * ASW) - 15.59;
}

function gunningFogIndex(totalWords, totalSentences, words) {
    const complexWords = words.filter(word => countSyllables(word) >= 5).length;
    const percentageOfComplexWords = complexWords / totalWords;
    const ASL = totalWords / totalSentences;
    return 0.4 * (ASL + (percentageOfComplexWords * 100));
}

function interpretFlashIndex(index) {
    if (index > 80) return "Текст очень легкий";
    if (index > 60) return "Текст легкий";
    if (index > 40) return "Текст средней сложности";
    if (index > 20) return "Текст сложный";
    return "Текст очень сложный";
}

function interpretFKGL(index) {
    if (index <= 1) return "1 класс";
    if (index <= 2) return "2 класс";
    if (index <= 3) return "3 класс";
    if (index <= 4) return "4 класс";
    if (index <= 5) return "5 класс";
    if (index <= 6) return "6 класс";
    if (index <= 7) return "7 класс";
    if (index <= 8) return "8 класс";
    if (index <= 9) return "9 класс";
    if (index <= 10) return "10 класс";
    if (index <= 11) return "11 класс";
    if (index <= 12) return "12 класс";
    if (index <= 13) return "колледж";
    // и так далее для каждого класса...
    if (index >= 14) return "Студенты университета или выше";
    return `Примерно ${Math.round(index)} класс`;
}

function interpretGFI(index) {
    if (index <= 8) return "Очень легкий";
    if (index <= 12) return "Легкий";
    if (index <= 16) return "Средний";
    if (index <= 20) return "Сложный";
    return "Очень сложный";
}

function calculateReadability() {
    const text = document.getElementById('textInput').value;
    const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.trim().length > 0);
    
    const totalWords = words.length;
    const totalSentences = sentences.length;
    const totalSyllables = words.reduce((count, word) => count + countSyllables(word), 0);
    
    const flashIndex = flashReadabilityIndex(text);
    const fkgl = fleschKincaidGradeLevel(totalWords, totalSentences, totalSyllables);
    const gfi = gunningFogIndex(totalWords, totalSentences, words);
    
    const flashInterpretation = interpretFlashIndex(flashIndex);
    const fkglInterpretation = interpretFKGL(fkgl);
    const gfiInterpretation = interpretGFI(gfi);
    
    document.getElementById('result').innerHTML = `
    
       <li> Индекс Флеша — это метрика, предназначенная для оценки уровня сложности текста. Он основан на среднем числе слов в предложении и среднем числе слогов в слове:<br><hr><srtong> ${flashIndex.toFixed(2)} - ${flashInterpretation}</srtong><hr><br> 
        <li>Уровень образования по Флешу-Кинкейду- это одна из метрик удобочитаемости, которая показывает, какой уровень образования необходим читателю для комфортного восприятия текста:<br><hr> <srtong>${fkgl.toFixed(2)} - ${fkglInterpretation}</srtong><hr><br></li>
        <li>Индекс туманности Ганнинга - индекс туманности измеряет уровень образования, необходимый читателю для понимания проанализированного текста при первом прочтении:<br><hr> <srtong>${gfi.toFixed(2)} - ${gfiInterpretation}</srtong> <hr></li>
    `;
}