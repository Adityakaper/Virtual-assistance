document.addEventListener('DOMContentLoaded', function () {
    let btn = document.querySelector("#btn");
    let content = document.querySelector("#content");
    let voice = document.querySelector("#voice");

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.volume = 1;
        //text_speak.lang="hi-GB"
        window.speechSynthesis.speak(text_speak);
    }

    function wishme() {
        let day = new Date();
        let hours = day.getHours();
        if (hours >= 0 && hours < 12) {
            speak("good morning sir");
        } else if (hours >= 12 && hours < 16) {
            speak("good afternoon sir");
        } else {
            speak("good evening sir");
        }
    }

    window.addEventListener('load', () => {
        wishme();
    });

    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new speechRecognition();

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takecommand(transcript.toLowerCase());
    };

    btn.addEventListener("click", () => {
        recognition.start();
        btn.style.display = "none";
        voice.style.display = "block";
    });

    function takecommand(message) {
        btn.style.display = "flex";
        voice.style.display = "none";

        if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
            speak("hello sir, what can I help you with?");
        } else if (message.includes("who are you")) {
            speak("I am a virtual ai assistant, created by Aditya sir");
        }
         else if (message.includes("open youtube")) {
            speak("opening YouTube...");
            window.open("https://www.youtube.com", "_blank");
        }
         else if (message.includes("open google")) {
            speak("opening Google...");
            window.open("https://www.google.com", "_blank");
        }
         else if (message.includes("open facebook")) {
            speak("opening Facebook...");
            window.open("https://www.facebook.com", "_blank");
        }
         else if (message.includes("open jiocinema")) {
            speak("opening JioCinema...");
            window.open("https://www.jiocinema.com", "_blank");
        }
         else if (message.includes("open instagram")) {
            speak("opening Instagram...");
            window.open("https://www.instagram.com", "_blank");
        }
        else if (message.includes("open chatgpt")) {
            speak("opening opening...");
            window.open("https://www.chatgpt.com", "_blank");
        }
         else if (message.includes("open calculator")) {
            speak("opening calculator...");
            window.open("calculator://");
        }
         else if (message.includes("open whatsapp")) {
            speak("opening WhatsApp...");
            window.open("whatsapp://");
        } 
        
        else if (message.includes("what is the time")) {
            let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
            speak(time);
        }
         else if (message.includes("what is the date")) {
            let date = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short" });
            speak(date);
        }
         else {
            let finalText = "this is what I found on the internet regarding " + message.replace("david", "").replace("darvid", "");
            speak(finalText);
            window.open(`https://www.google.com/search?q=${message.replace("darvid", "")}`, "_blank");
        }
    }
});
