function updateAssetsForTheme(theme) {

    const assets = document.querySelectorAll('[data-theme-asset]');

    assets.forEach(asset => {
        const filename = asset.getAttribute('data-theme-asset');
        const newPath = `./assets/${theme}/${filename}`;
        asset.setAttribute('src', newPath);
    });
}

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
updateAssetsForTheme(isDarkMode ? 'dark' : 'light');

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    updateAssetsForTheme(event.matches ? 'dark' : 'light');
});