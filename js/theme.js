/* Общее переключение светлой и тёмной темы для всех страниц сайта. */
const THEME_STORAGE_KEY = "family-budget-theme";

(function applySavedTheme() {
    try {
        if (localStorage.getItem(THEME_STORAGE_KEY) === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    } catch (error) {
        // localStorage может быть недоступен — оставляем светлую тему.
    }
})();

function isDarkTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark";
}

function updateThemeButton(themeToggle) {
    if (!themeToggle) {
        return;
    }

    const dark = isDarkTheme();

    themeToggle.setAttribute(
        "aria-label",
        dark ? "Включить светлую тему" : "Включить тёмную тему"
    );
    themeToggle.title = dark ? "Светлая тема" : "Тёмная тема";
}

function setTheme(theme, themeToggle) {
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
        theme = "light";
    }

    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
        // Если хранилище недоступно, тема всё равно меняется до перезагрузки.
    }

    updateThemeButton(themeToggle);
}

document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener("click", function() {
        setTheme(isDarkTheme() ? "light" : "dark", themeToggle);
    });

    updateThemeButton(themeToggle);
});
