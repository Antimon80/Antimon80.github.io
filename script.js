document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    /* Lädt die Willkommensseite */
    function loadWelcomePage() {
        fetch(`willkommen.html`)
            .then(response => {
                if (!response.ok) throw new Error("Willkommensseite nicht gefunden.");
                return response.text();
            })
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => {
                console.error("Fehler beim Laden der Willkommensseite: ", error);
                content.innerHTML = `<p>Die Willkommensseite konnte nicht geladen werden.</p>`;
            })
    }

    /* Lädt ein Thema */
    function loadTopic(topic) {
        fetch(`Themen/${topic}.html`)
            .then(response => {
                if (!response.ok) throw new Error(`Thema "${topic}" nicht gefunden.`);
                return response.text();
            })
            .then(data => {
                content.innerHTML = data;
                addExperimentListeners(); // Links zu den Experimenten aktivieren
            })
            .catch(error => {
                console.error(`Fehler beim Laden des Themas "${topic}":`, error);
                content.innerHTML = `<p>Das Thema konnte nicht geladen werden.</p>`;
            });
    }

    /* Lädt ein Experiment */
    function loadExperiment(experiment) {
        fetch(experiment)
            .then(response => {
                if (!response.ok) throw new Error(`Experiment "${experiment}" nicht gefunden.`);
                return response.text();
            })
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => {
                console.error(`Fehler beim Laden des Experiments "${experiment}":`, error);
                content.innerHTML = `<p>Das Experiment konnte nicht geladen werden.</p>`;
            });
    }

    /* Aktiviert die Links zu den Themen */
    function addTopicListeners() {
        const topicLinks = document.querySelectorAll("aside a");
        topicLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault(); // verhindert das Neuladen der Seite
                const topic = link.getAttribute("href").substring(1); // entfernt das # aus href
                loadTopic(topic);
            });
        });
    }

    /* Aktiviert die Links zu den Experimenten */
    function addExperimentListeners() {
        const experimentLinks = document.querySelectorAll(".experiment-link");
        experimentLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault(); // verhindert das Neuladen der Seite
                const experiment = link.getAttribute("href");
                loadExperiment(experiment);
            });
        });
    }

    /* Seite initialisieren. Klick auf die Überschrift bringt zurück zur Wilkommensseite. */
    function initializePage() {
        addTopicListeners();    // Themen-Liste aktivieren
        loadWelcomePage();      // Willkommensseite laden

        const headerTitle = document.querySelector("header h1");
        headerTitle.addEventListener("click", (e) => {
            e.preventDefault();
            loadWelcomePage();
        });
    }

    initializePage();           // Initialisierung aufrufen
});