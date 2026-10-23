
import { computed, reactive } from 'vue';

const THEME_STORAGE_KEY = 'jr-skyflow-dark-mode';


const COLOR_STORAGE_KEY = 'jr-skyflow-colors';

export const themeColors = {
    sky: '#0284c7',
    red: '#dc2626',
    yellow: '#ca8a04',
    purple: '#9333ea',
    green: '#16a34a',
    orange: '#ea580c',
    pink: '#db2777',
    teal: '#0d9488'
};

const defaultColorTheme = {
    mode: 'single',
    primary: 'sky',
    secondary: 'purple'
};

function getSavedColorTheme() {
    if (typeof window === 'undefined') {
        return { ...defaultColorTheme };
    }

    try {
        const saved = JSON.parse(
            window.localStorage.getItem(COLOR_STORAGE_KEY) || '{}'
        );

        return {
            mode: ['single', 'gradient'].includes(saved.mode)
                ? saved.mode
                : defaultColorTheme.mode,
            primary: Object.hasOwn(themeColors, saved.primary)
                ? saved.primary
                : defaultColorTheme.primary,
            secondary: Object.hasOwn(themeColors, saved.secondary)
                ? saved.secondary
                : defaultColorTheme.secondary
        };
    } catch {
        return { ...defaultColorTheme };
    }
}

export const colorTheme = reactive(getSavedColorTheme());

export function setColorTheme(settings) {
    const next = { ...colorTheme, ...settings };

    if (!['single', 'gradient'].includes(next.mode)) {
        return;
    }

    if (
        !Object.hasOwn(themeColors, next.primary) ||
        !Object.hasOwn(themeColors, next.secondary)
    ) {
        return;
    }

    Object.assign(colorTheme, next);

    if (typeof window !== 'undefined') {
        window.localStorage.setItem(
            COLOR_STORAGE_KEY,
            JSON.stringify(colorTheme)
        );
    }
}


function getSavedDarkMode() {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'true';
}

const layoutConfig = reactive({
    preset: 'Aura',
    primary: 'sky',
    surface: null,
    darkTheme: getSavedDarkMode(),
    menuMode: 'static'
});

const layoutState = reactive({
    staticMenuInactive: false,
    overlayMenuActive: false,
    mobileMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    sidebarExpanded: false,
    menuHoverActive: false,
    activeMenuItem: null,
    activePath: null
});

function applyDarkMode(enabled) {
    layoutConfig.darkTheme = enabled;

    if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('app-dark', enabled);
        document.documentElement.classList.toggle('dark', enabled);
    }

    if (typeof window !== 'undefined') {
        window.localStorage.setItem(
            THEME_STORAGE_KEY,
            String(enabled)
        );
    }
}

export function initializeTheme() {
    applyDarkMode(layoutConfig.darkTheme);
}

export function useLayout() {
    const toggleDarkMode = () => {
        applyDarkMode(!layoutConfig.darkTheme);
    };

    const toggleMenu = () => {
        if (isDesktop()) {
            if (layoutConfig.menuMode === 'static') {
                layoutState.staticMenuInactive =
                    !layoutState.staticMenuInactive;
            }

            if (layoutConfig.menuMode === 'overlay') {
                layoutState.overlayMenuActive =
                    !layoutState.overlayMenuActive;
            }
        } else {
            layoutState.mobileMenuActive =
                !layoutState.mobileMenuActive;
        }
    };

    const toggleConfigSidebar = () => {
        layoutState.configSidebarVisible =
            !layoutState.configSidebarVisible;
    };

    const hideMobileMenu = () => {
        layoutState.mobileMenuActive = false;
    };

    const changeMenuMode = (event) => {
        layoutConfig.menuMode = event.value;
        layoutState.staticMenuInactive = false;
        layoutState.mobileMenuActive = false;
        layoutState.sidebarExpanded = false;
        layoutState.menuHoverActive = false;
    };

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    const isDesktop = () =>
        typeof window !== 'undefined' && window.innerWidth > 991;

    const hasOpenOverlay = computed(
        () => layoutState.overlayMenuActive
    );

    return {
        layoutConfig,
        layoutState,
        isDarkTheme,
        toggleDarkMode,
        toggleConfigSidebar,
        toggleMenu,
        hideMobileMenu,
        changeMenuMode,
        isDesktop,
        hasOpenOverlay
    };
}
