
import { computed, reactive } from 'vue';

const THEME_STORAGE_KEY = 'jr-skyflow-dark-mode';

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
