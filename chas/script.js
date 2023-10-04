let chart;

function createChart(labels, data) {
    const ctx = document.getElementById('wordChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Частота слов',
                data: data,
                backgroundColor: '#007BFF',
                borderColor: '#0056b3',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function analyzeText() {
    const text = document.getElementById('textInput').value;
    const words = text.toLowerCase().split(/\s+/).filter(Boolean);

    const wordMap = {};

    words.forEach(word => {
        if (!wordMap[word]) {
            wordMap[word] = 1;
        } else {
            wordMap[word]++;
        }
    });

    const wordArray = Object.entries(wordMap);
    const totalWords = words.length;

    // Добавление списка
    let outputHtml = '<ul>';
    wordArray.forEach(([word, count]) => {
        let percentage = ((count / totalWords) * 100).toFixed(2); // Вычисление процента
        outputHtml += `<li>${word}: ${count} (${percentage}%)</li>`;
    });
    outputHtml += '</ul>';
    document.getElementById('output').innerHTML = outputHtml;

    // Добавление диаграммы
    const labels = wordArray.map(item => item[0]);
    const data = wordArray.map(item => item[1]);
    createChart(labels, data);

    // Отображение общего количества слов
    document.getElementById('totalWords').querySelector('span').textContent = totalWords + " (100%)";
}