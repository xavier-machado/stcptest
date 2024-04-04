const stops = {
    "BOLHAO": ["MERCADO DO BOLHÃO", "PR. D. JOAO I", "PR.FILIPA DE LENCASTRE", "GUIL. G. FERNANDES", "CARMO", "HOSP. ST. ANTONIO", "PALACIO", "PR. DA GALIZA", "JUNTA MASSARELOS", "GOLGOTA", "PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO", "PRT2"],
    "MERCADO DO BOLHAO": ["PR. D. JOAO I", "PR.FILIPA DE LENCASTRE", "GUIL. G. FERNANDES", "CARMO", "HOSP. ST. ANTONIO", "PALACIO", "PR. DA GALIZA", "JUNTA MASSARELOS", "GOLGOTA", "PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO"],
    "PR. D. JOAO I": ["PR.FILIPA DE LENCASTRE", "GUIL. G. FERNANDES", "CARMO", "HOSP. ST. ANTONIO", "PALACIO", "PR. DA GALIZA", "JUNTA MASSARELOS", "GOLGOTA", "PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO"],
    "PR.FILIPA DE LENCASTRE": ["GUIL. G. FERNANDES", "CARMO", "HOSP. ST. ANTONIO", "PALACIO", "PR. DA GALIZA", "JUNTA MASSARELOS", "GOLGOTA", "PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO"],
    "GUIL. G. FERNANDES": ["CARMO", "HOSP. ST. ANTONIO", "PALACIO", "PR. DA GALIZA", "JUNTA MASSARELOS", "GOLGOTA", "PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO", "PRT2"],
    "CARMO": ["HOSP. ST. ANTONIO", "PALACIO", "PR. DA GALIZA", "JUNTA MASSARELOS", "GOLGOTA", "PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO", "PRT2"],
    "HOSP. ST. ANTONIO": ["PALACIO", "PR. DA GALIZA", "JUNTA MASSARELOS", "GOLGOTA", "PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO", "PRT2"],
    "PALACIO": ["PR. DA GALIZA", "JUNTA MASSARELOS", "GOLGOTA", "PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO", "PRT2"],
    "PR. DA GALIZA": ["JUNTA MASSARELOS", "GOLGOTA", "PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO"],
    "JUNTA MASSARELOS": ["GOLGOTA", "PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO", "PRT2"],
    "GOLGOTA": ["PLANETARIO", "FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO"],
    "PLANETARIO": ["FACULDADE DE CIENCIAS", "JARDIM BOTANICO", "LORDELO"],
    "FACULDADE DE CIENCIAS": ["JARDIM BOTANICO", "LORDELO"],
    "JARDIM BOTANICO": ["LORDELO"],
};

const busStopsSelect = document.getElementById('busStops');
const nextStopDiv = document.getElementById('nextStop');
const brailleTextDiv = document.getElementById('brailleText');
const convertToBrailleButton = document.getElementById('convertToBraille');
const speakButton = document.getElementById('speak');

busStopsSelect.addEventListener('change', function() {
    const selectedStop = this.value;
    const nextStop = getNextStop(selectedStop);
    nextStopDiv.textContent = `Próxima paragem: ${nextStop}`;
});

convertToBrailleButton.addEventListener('click', function() {
    const selectedStop = busStopsSelect.value;
    const brailleText = convertToBraille(selectedStop);
    brailleTextDiv.textContent = `Texto em Braille: ${brailleText}`;
});

speakButton.addEventListener('click', function() {
    const selectedStop = busStopsSelect.value;
    speak(selectedStop);
});

function getNextStop(currentStop) {
    const stopsArray = stops[currentStop];
    if (stopsArray && stopsArray.length > 0) {
        return stopsArray[0];
    } else {
        return "Fim da linha";
    }
}

convertToBrailleButton.addEventListener('click', function() {
    const selectedStop = busStopsSelect.value;
    const nextStop = getNextStop(selectedStop);
    const brailleText = convertToBraille(nextStop);
    brailleTextDiv.textContent = `Próxima paragem em Braille: ${brailleText}`;
});

function convertToBraille(text) {
    // Mapa de conversão de caracteres para Braille
    const brailleMap = {
        'A': '⠁', 'B': '⠃', 'C': '⠉', 'D': '⠙', 'E': '⠑', 'F': '⠋', 'G': '⠛', 'H': '⠓', 'I': '⠊', 'J': '⠚',
        'K': '⠅', 'L': '⠇', 'M': '⠍', 'N': '⠝', 'O': '⠕', 'P': '⠏', 'Q': '⠟', 'R': '⠗', 'S': '⠎', 'T': '⠞',
        'U': '⠥', 'V': '⠧', 'W': '⠺', 'X': '⠭', 'Y': '⠽', 'Z': '⠵', 'Ç': '⠯', ' ': '⠲'
        // Adicione outros caracteres conforme necessário
    };

    // Converter texto para Braille
    let brailleText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();
        brailleText += brailleMap[char] ? brailleMap[char] : char;
    }
    return brailleText;
}


function speak(selectedStop) {
    // Verifica se o navegador suporta a API de síntese de voz
    if ('speechSynthesis' in window) {
        // Cria um novo objeto de síntese de voz
        const speech = new SpeechSynthesisUtterance();
        speech.lang = 'pt-PT'; // Define o idioma da fala (Português de Portugal)

        // Obtém a próxima paragem com base na paragem atual selecionada
        const nextStop = getNextStop(selectedStop);

        if (nextStop === "Fim da linha") {
            // Se for a última paragem, fala "Fim da linha"
            speech.text = "Fim da linha";
        } else {
            // Caso contrário, fala apenas a próxima paragem
            speech.text = `Próxima paragem: ${nextStop}`;
        }

        // Fala o texto
        speechSynthesis.speak(speech);
    } else {
        // Se o navegador não suporta a API de síntese de voz, mostra uma mensagem alternativa
        alert('Desculpe, o seu navegador não suporta a síntese de voz.');
    }
}
