
import { watch } from 'vue';
import { palette, updatePrimaryPalette } from '@primeuix/themes';

import { colorTheme, themeColors } from './layout';

let initialized = false;

function applyColorTheme() {
    const primary = themeColors[colorTheme.primary] || themeColors.sky;
    const secondary = themeColors[colorTheme.secondary] || themeColors.purple;
    const isGradient = colorTheme.mode === 'gradient';
    const primaryPalette = palette(primary);
    const secondaryPalette = palette(secondary);

    const root = document.documentElement;

    // Shared CSS variables for custom JR SkyFlow elements
    root.style.setProperty('--jr-primary', primary);
    root.style.setProperty('--jr-secondary', secondary);

    root.style.setProperty(
        '--jr-accent-background',
        isGradient
            ? `linear-gradient(135deg, ${primary}, ${secondary})`
            : primary
    );

    root.style.setProperty('--jr-accent-solid', primary);
    root.style.setProperty('--jr-button-background', isGradient
        ? `linear-gradient(135deg, color-mix(in srgb, ${primary} 75%, black), color-mix(in srgb, ${secondary} 75%, black))`
        : colorTheme.primary === 'sky' ? `color-mix(in srgb, ${primary} 90%, black)` : primary);
    root.style.setProperty('--jr-text-background', `linear-gradient(135deg, ${primaryPalette[800]}, ${secondaryPalette[800]})`);
    root.style.setProperty('--jr-text-background-dark', `linear-gradient(135deg, ${primaryPalette[300]}, ${secondaryPalette[300]})`);
    root.style.setProperty('--jr-accent-text', primaryPalette[800]);
    root.style.setProperty('--jr-accent-text-dark', primaryPalette[300]);
    root.style.setProperty('--jr-accent-contrast', ['yellow', 'green', 'orange', 'teal'].includes(colorTheme.primary) && !isGradient ? '#0f172a' : '#ffffff');

    root.dataset.jrColorMode = colorTheme.mode;

    // Update PrimeVue's semantic primary palette.
    // Gradient mode still uses a solid primary for controls.
    updatePrimaryPalette(primaryPalette);
}

export function initializeColorTheme() {
    if (initialized) return;

    initialized = true;

    watch(
        colorTheme,
        applyColorTheme,
        { deep: true, immediate: true, flush: 'sync' }
    );
}
