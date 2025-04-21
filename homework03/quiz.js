window.addEventListener("load", () => {
    const pitanjeBrojDiv = document.querySelector(".pitanje-broj");
    const pitanjeDiv = document.querySelector(".pitanje");
    const odgovoriDiv = document.querySelector(".odgovori");
    const nextButton = document.getElementById("next-button");

    let pitanja = JSON.parse(localStorage.getItem("pitanja")) || [];
    let trenutnoPitanjeIndex = parseInt(localStorage.getItem("trenutnoPitanjeIndex")) || 0;
    let tocniOdgovori = parseInt(localStorage.getItem("tocniOdgovori")) || 0;
    let odabraniOdgovor = localStorage.getItem("odabraniOdgovor") || null;
    let isAnswerChecked = false;

    async function dohvatiPitanja() {
        if (pitanja.length === 0) {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=15&type=multiple");
                const data = await response.json();
                pitanja = data.results;
                localStorage.setItem("pitanja", JSON.stringify(pitanja));
            } catch (error) {
                console.error("Error:", error);
            }
        }
        prikaziPitanje();
    }

    function decodeHTMLEntities(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    function prikaziPitanje() {
        isAnswerChecked = false;
        nextButton.style.display = "none";
        
        if (trenutnoPitanjeIndex >= pitanja.length) {
            return prikaziRezultat();
        }

        const trenutnoPitanje = pitanja[trenutnoPitanjeIndex];
        pitanjeBrojDiv.textContent = `Question ${trenutnoPitanjeIndex + 1}`;
        pitanjeDiv.innerHTML = decodeHTMLEntities(trenutnoPitanje.question);

        const sviOdgovori = [
            ...trenutnoPitanje.incorrect_answers.map(a => decodeHTMLEntities(a)),
            decodeHTMLEntities(trenutnoPitanje.correct_answer)
        ].sort(() => Math.random() - 0.5);

        odgovoriDiv.innerHTML = "";
        sviOdgovori.forEach(odgovor => {
            const button = document.createElement("button");
            button.textContent = odgovor;
            button.className = "odgovor-btn";
            
            button.style.backgroundColor = "";
            button.style.border = "";
            button.style.color = "";
            
            button.addEventListener("click", () => {
                if (!isAnswerChecked) {
                    odaberiOdgovor(button, odgovor);
                }
            });

            odgovoriDiv.appendChild(button);
        });
    }

    function odaberiOdgovor(button, odgovor) {
        const sviGumbi = document.querySelectorAll(".odgovor-btn");
        sviGumbi.forEach(btn => {
            btn.classList.remove("odabran");
            // Reset style
            btn.style.backgroundColor = "";
            btn.style.border = "";
            btn.style.color = "";
        });

        button.classList.add("odabran");
        odabraniOdgovor = odgovor;
        localStorage.setItem("odabraniOdgovor", odabraniOdgovor);

        provjeriOdgovor();
    }

    function provjeriOdgovor() {
        isAnswerChecked = true;
        const trenutnoPitanje = pitanja[trenutnoPitanjeIndex];
        const tocniOdgovor = decodeHTMLEntities(trenutnoPitanje.correct_answer);
        const sviGumbi = document.querySelectorAll(".odgovor-btn");

        sviGumbi.forEach(button => {
            const buttonText = button.textContent;
            
            if (buttonText === tocniOdgovor) {
                button.style.backgroundColor = "#4CAF50";
                button.style.border = "2px solid #2E7D32";
                button.style.color = "white";
            } else if (button.classList.contains("odabran") && buttonText !== tocniOdgovor) {
                button.style.backgroundColor = "#F44336";
                button.style.border = "2px solid #C62828";
                button.style.color = "white";
            }
        });

        if (decodeHTMLEntities(odabraniOdgovor) === tocniOdgovor) {
            tocniOdgovori++;
        }

        nextButton.style.display = "block";
    }

    nextButton.addEventListener("click", () => {
        trenutnoPitanjeIndex++;
        odabraniOdgovor = null;
        localStorage.setItem("trenutnoPitanjeIndex", trenutnoPitanjeIndex);
        localStorage.setItem("tocniOdgovori", tocniOdgovori);
        localStorage.removeItem("odabraniOdgovor");

        prikaziPitanje();
    });

    function prikaziRezultat() {
        pitanjeBrojDiv.textContent = "Quiz is over!";
        pitanjeDiv.innerHTML = `Correct answers: ${tocniOdgovori} / ${pitanja.length}`;
        odgovoriDiv.innerHTML = "";

        const poruka = document.createElement("div");
        poruka.className = "poruka";

        const emoji = document.createElement("i");
        emoji.className = "bi";
   
        if(tocniOdgovori >= 14) {
            poruka.textContent = "Good job! ";
            emoji.classList.add("bi-emoji-sunglasses");
        } else if(tocniOdgovori >= 10) {
            poruka.textContent = "Not bad ";
            emoji.classList.add("bi-emoji-smile");
        } else if(tocniOdgovori >= 7) {
            poruka.textContent = "You can do better ";
            emoji.classList.add("bi-emoji-smile-upside-down");
        } else if(tocniOdgovori >=4 ) {
            poruka.textContent = "Quizes are not really your thing ";
            emoji.classList.add("bi-emoji-frown");
        } else {
            poruka.textContent = "Maybe stick to coding... ";
            emoji.classList.add("bi-emoji-grimace");
        }

        poruka.append(emoji);
        pitanjeDiv.appendChild(poruka);

        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart quiz";
        restartButton.classList.add("home-button");
        restartButton.addEventListener("click", () => {
            localStorage.clear(); 
            window.location.reload(); 
        });

        const homeButton = document.createElement("button");
        homeButton.textContent = "Homepage";
        homeButton.className = "home-button";
        homeButton.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "index.html";
        });

        odgovoriDiv.appendChild(restartButton);
        odgovoriDiv.appendChild(homeButton);
        nextButton.style.display = "none";
    }

    dohvatiPitanja();
});