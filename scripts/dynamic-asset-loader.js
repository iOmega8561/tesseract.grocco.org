function updateAssetsForTheme(theme) {

    const assets = document.querySelectorAll('[data-theme-asset]');

    assets.forEach(asset => {
        const filename = asset.getAttribute('data-theme-asset');
        const newPath = `../assets/${theme}/${filename}`;
        asset.setAttribute('src', newPath);
    });
}

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    updateAssetsForTheme(event.matches ? 'dark-mode' : 'light-mode');
});

window.onload = function() {
    updateAssetsForTheme(isDarkMode ? 'dark-mode' : 'light-mode');
}