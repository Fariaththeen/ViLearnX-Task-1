const synth = window.speechSynthesis;
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const pitchInput = document.getElementById('pitch');
const rateInput = document.getElementById('rate');
const speakButton = document.getElementById('speak-button');

let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

function speak() {
    if (synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    const utterance = new SpeechSynthesisUtterance(textInput.value);
    const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
    utterance.voice = selectedVoice;
    utterance.pitch = pitchInput.value;
    utterance.rate = rateInput.value;

    synth.speak(utterance);
}

synth.onvoiceschanged = populateVoiceList;

speakButton.addEventListener('click', speak);
