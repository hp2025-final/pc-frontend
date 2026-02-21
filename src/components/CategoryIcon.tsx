/**
 * CategoryIcon — pixel-art SVG icons for each category slug
 * All icons are 32×32 grid-aligned pixel style
 */

interface CategoryIconProps {
    slug: string;
    size?: number;
    color?: string;
}

export default function CategoryIcon({ slug, size = 32, color = '#000' }: CategoryIconProps) {
    const icons: Record<string, React.ReactElement> = {

        'pc-cases': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="16" height="24" rx="0" stroke={color} strokeWidth="2" fill="none" />
                <rect x="10" y="8" width="4" height="4" fill={color} />
                <rect x="10" y="14" width="8" height="1" fill={color} />
                <rect x="10" y="17" width="8" height="1" fill={color} />
                <circle cx="19" cy="24" r="1.5" fill={color} />
                <rect x="6" y="4" width="16" height="3" fill={color} />
            </svg>
        ),

        'motherboards': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="5" width="26" height="22" stroke={color} strokeWidth="2" fill="none" />
                <rect x="7" y="9" width="6" height="6" stroke={color} strokeWidth="1.5" fill="none" />
                <rect x="16" y="9" width="4" height="4" fill={color} />
                <rect x="22" y="9" width="4" height="4" fill={color} />
                <rect x="7" y="18" width="18" height="2" fill={color} />
                <rect x="7" y="22" width="18" height="2" fill={color} />
                <rect x="9" y="15" width="2" height="3" fill={color} />
                <rect x="13" y="15" width="2" height="3" fill={color} />
            </svg>
        ),

        'gpus': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="9" width="24" height="14" stroke={color} strokeWidth="2" fill="none" />
                <rect x="6" y="13" width="8" height="6" stroke={color} strokeWidth="1.5" fill="none" />
                <rect x="17" y="12" width="4" height="4" fill={color} />
                <rect x="17" y="17" width="4" height="2" fill={color} />
                <rect x="8" y="23" width="2" height="4" fill={color} />
                <rect x="12" y="23" width="2" height="4" fill={color} />
                <rect x="16" y="23" width="2" height="4" fill={color} />
                <rect x="26" y="12" width="4" height="3" fill={color} />
                <rect x="26" y="17" width="4" height="3" fill={color} />
            </svg>
        ),

        'graphics-cards': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="9" width="24" height="14" stroke={color} strokeWidth="2" fill="none" />
                <rect x="6" y="13" width="8" height="6" stroke={color} strokeWidth="1.5" fill="none" />
                <rect x="17" y="12" width="4" height="4" fill={color} />
                <rect x="17" y="17" width="4" height="2" fill={color} />
                <rect x="8" y="23" width="2" height="4" fill={color} />
                <rect x="12" y="23" width="2" height="4" fill={color} />
                <rect x="16" y="23" width="2" height="4" fill={color} />
                <rect x="26" y="12" width="4" height="3" fill={color} />
                <rect x="26" y="17" width="4" height="3" fill={color} />
            </svg>
        ),

        'cpus': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="9" width="14" height="14" stroke={color} strokeWidth="2" fill="none" />
                <rect x="12" y="12" width="8" height="8" fill={color} />
                <rect x="5" y="11" width="4" height="2" fill={color} />
                <rect x="5" y="15" width="4" height="2" fill={color} />
                <rect x="5" y="19" width="4" height="2" fill={color} />
                <rect x="23" y="11" width="4" height="2" fill={color} />
                <rect x="23" y="15" width="4" height="2" fill={color} />
                <rect x="23" y="19" width="4" height="2" fill={color} />
                <rect x="11" y="5" width="2" height="4" fill={color} />
                <rect x="15" y="5" width="2" height="4" fill={color} />
                <rect x="19" y="5" width="2" height="4" fill={color} />
                <rect x="11" y="23" width="2" height="4" fill={color} />
                <rect x="15" y="23" width="2" height="4" fill={color} />
                <rect x="19" y="23" width="2" height="4" fill={color} />
            </svg>
        ),

        'ram': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="10" width="24" height="12" stroke={color} strokeWidth="2" fill="none" />
                <rect x="7" y="13" width="3" height="6" fill={color} />
                <rect x="12" y="13" width="3" height="6" fill={color} />
                <rect x="17" y="13" width="3" height="6" fill={color} />
                <rect x="22" y="13" width="3" height="6" fill={color} />
                <rect x="4" y="10" width="24" height="3" fill={color} />
            </svg>
        ),

        'storage': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="24" height="7" stroke={color} strokeWidth="2" fill="none" />
                <rect x="4" y="17" width="24" height="7" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="25" cy="11.5" r="2" fill={color} />
                <circle cx="25" cy="20.5" r="2" fill={color} />
                <rect x="7" y="10" width="12" height="3" fill={color} />
                <rect x="7" y="19" width="12" height="3" fill={color} />
            </svg>
        ),

        'power-supplies': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="24" height="16" stroke={color} strokeWidth="2" fill="none" />
                <rect x="8" y="12" width="8" height="8" stroke={color} strokeWidth="1.5" fill="none" />
                <rect x="19" y="12" width="4" height="3" fill={color} />
                <rect x="19" y="17" width="4" height="3" fill={color} />
                <rect x="10" y="26" width="2" height="3" fill={color} />
                <rect x="14" y="26" width="2" height="3" fill={color} />
                <rect x="18" y="26" width="2" height="3" fill={color} />
            </svg>
        ),

        'cpu-coolers': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="12" height="12" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="16" cy="16" r="3" fill={color} />
                <rect x="14" y="4" width="4" height="6" fill={color} />
                <rect x="14" y="22" width="4" height="6" fill={color} />
                <rect x="4" y="14" width="6" height="4" fill={color} />
                <rect x="22" y="14" width="6" height="4" fill={color} />
            </svg>
        ),

        'case-fans': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="16" cy="16" r="3" fill={color} />
                <path d="M16 4 L18 10 L14 10 Z" fill={color} />
                <path d="M28 16 L22 14 L22 18 Z" fill={color} />
                <path d="M16 28 L14 22 L18 22 Z" fill={color} />
                <path d="M4 16 L10 18 L10 14 Z" fill={color} />
            </svg>
        ),

        'laptops': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="7" width="22" height="15" rx="0" stroke={color} strokeWidth="2" fill="none" />
                <rect x="7" y="9" width="18" height="11" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" />
                <rect x="2" y="22" width="28" height="3" fill={color} />
                <rect x="12" y="22" width="8" height="1" fill="white" />
            </svg>
        ),

        'monitors': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="26" height="18" stroke={color} strokeWidth="2" fill="none" />
                <rect x="5" y="6" width="22" height="14" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" />
                <rect x="14" y="22" width="4" height="4" fill={color} />
                <rect x="10" y="26" width="12" height="2" fill={color} />
                <circle cx="16" cy="20" r="1" fill={color} />
            </svg>
        ),

        'prebuilt-pcs': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="14" height="22" stroke={color} strokeWidth="2" fill="none" />
                <rect x="8" y="7" width="4" height="4" fill={color} />
                <rect x="8" y="13" width="10" height="1" fill={color} />
                <rect x="8" y="16" width="10" height="1" fill={color} />
                <circle cx="17" cy="23" r="1.5" fill={color} />
                <rect x="6" y="4" width="14" height="3" fill={color} />
                <rect x="22" y="16" width="6" height="10" stroke={color} strokeWidth="2" fill="none" />
            </svg>
        ),

        'custom-pcs': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="14" height="22" stroke={color} strokeWidth="2" fill="none" />
                <rect x="8" y="7" width="4" height="4" stroke={color} strokeWidth="1.5" fill="none" />
                <rect x="8" y="13" width="10" height="1" fill={color} />
                <rect x="8" y="16" width="10" height="1" fill={color} />
                <rect x="22" y="8" width="5" height="3" fill={color} />
                <rect x="22" y="13" width="5" height="3" fill={color} />
                <rect x="22" y="18" width="5" height="3" fill={color} />
                <path d="M20 9.5 L22 9.5" stroke={color} strokeWidth="1.5" />
                <path d="M20 14.5 L22 14.5" stroke={color} strokeWidth="1.5" />
                <path d="M20 19.5 L22 19.5" stroke={color} strokeWidth="1.5" />
            </svg>
        ),

        'peripherals': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="14" width="22" height="10" rx="2" stroke={color} strokeWidth="2" fill="none" />
                <rect x="8" y="17" width="3" height="3" fill={color} />
                <rect x="13" y="17" width="3" height="3" fill={color} />
                <rect x="18" y="17" width="3" height="3" fill={color} />
                <rect x="23" y="17" width="3" height="3" fill={color} />
                <rect x="4" y="8" width="24" height="6" stroke={color} strokeWidth="2" fill="none" />
                <rect x="6" y="10" width="20" height="2" fill={color} />
            </svg>
        ),

        'printers': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="12" width="22" height="12" stroke={color} strokeWidth="2" fill="none" />
                <rect x="9" y="8" width="14" height="4" fill={color} />
                <rect x="9" y="24" width="14" height="5" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="23" cy="18" r="2" fill={color} />
                <rect x="9" y="17" width="10" height="2" fill={color} />
            </svg>
        ),

        'networking': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="18" width="24" height="8" stroke={color} strokeWidth="2" fill="none" />
                <rect x="7" y="20" width="2" height="4" fill={color} />
                <rect x="11" y="20" width="2" height="4" fill={color} />
                <rect x="15" y="20" width="2" height="4" fill={color} />
                <rect x="19" y="20" width="2" height="4" fill={color} />
                <rect x="23" y="20" width="2" height="4" fill={color} />
                <path d="M16 6 Q6 12 6 18" stroke={color} strokeWidth="2" fill="none" />
                <path d="M16 6 Q26 12 26 18" stroke={color} strokeWidth="2" fill="none" />
                <path d="M16 9 Q10 13 10 18" stroke={color} strokeWidth="2" fill="none" />
                <path d="M16 9 Q22 13 22 18" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="16" cy="6" r="2" fill={color} />
            </svg>
        ),

        'accessories': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="8" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="16" cy="16" r="3" fill={color} />
                <rect x="15" y="4" width="2" height="4" fill={color} />
                <rect x="15" y="24" width="2" height="4" fill={color} />
                <rect x="4" y="15" width="4" height="2" fill={color} />
                <rect x="24" y="15" width="4" height="2" fill={color} />
            </svg>
        ),
    };

    const icon = icons[slug] || (
        // Default fallback: a simple pixel monitor
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="24" height="16" stroke={color} strokeWidth="2" fill="none" />
            <rect x="13" y="22" width="6" height="4" fill={color} />
            <rect x="9" y="26" width="14" height="2" fill={color} />
            <rect x="8" y="10" width="16" height="8" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
        </svg>
    );

    return icon;
}
