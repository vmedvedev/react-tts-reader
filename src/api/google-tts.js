class TtsApi {
    constructor() {
        this.apiUrl = 'https://texttospeech.googleapis.com';
        this.apiKey = 'AIzaSyBUrG7YyqBHH-TcgwACamVt3mlNU2u5dR4';
    }

    async getVoicesList(languageCode) {
        const response = await fetch(`${this.apiUrl}/v1/voices?languageCode=${languageCode}&key=${this.apiKey}`);
    
        const data = await response.json();
    
        return new Promise(resolve => {
            resolve(data.voices);
        });
    }

    async synthesizeSpeech(text, voiceName, speakingRate) {
        // Construct the request
        const request = {
            input: {text: text},
            // Select the language and SSML voice gender (optional)
            voice: {languageCode: 'en-US', name: voiceName, ssmlGender: 'NEUTRAL'},
            // select the type of audio encoding
            audioConfig: {audioEncoding: 'MP3', speakingRate: speakingRate},
        };
    
    
        const response = await fetch(this.apiUrl + '/v1/text:synthesize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Goog-Api-Key': this.apiKey
            },
            body: JSON.stringify(request)
        });
      
        const result = await response.json();
        
        return new Promise(resolve => {
            resolve(result.audioContent);
        });
    }
};

export default TtsApi;