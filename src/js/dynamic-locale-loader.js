async function detectLocale() {
    return navigator.language || "en-US";
}

async function fetchLocalization(locale) {
    const fallbackLocale = "en-US";

    try {
        const response = await fetch(`./locale/${locale}.json`);
        if (!response.ok) throw new Error(`Localization for ${locale} not found`);
        return await response.json();
        
    } catch (error) {
        console.warn(`${error.message}. Falling back to ${fallbackLocale}`);
        const fallbackResponse = await fetch(`./locale/${fallbackLocale}.json`);
        return await fallbackResponse.json();
    }
}

function localizeContent(localizationData) {
    const elements = document.querySelectorAll("[data-localize]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-localize");
        const keys = key.split(".");
        let value = localizationData;

        keys.forEach((k) => {
            value = value[k];
        });

        if (value) {
            element.innerHTML = value;
        } else {
            console.warn(`Missing localization key: ${key}`);
        }
    });
}

async function localizePage() {
    const userLocale = await detectLocale();
    const localizationData = await fetchLocalization(userLocale);

    localizeContent(localizationData);
}

document.addEventListener("DOMContentLoaded", localizePage);