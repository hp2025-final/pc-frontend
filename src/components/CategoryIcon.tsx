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

        /* ── MAIN CATEGORIES ── */

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

        /* ── COMPONENTS SECTION ── */

        'pc-cooling-systems': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="12" height="12" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="16" cy="16" r="3" fill={color} />
                <rect x="14" y="4" width="4" height="6" fill={color} />
                <rect x="14" y="22" width="4" height="6" fill={color} />
                <rect x="4" y="14" width="6" height="4" fill={color} />
                <rect x="22" y="14" width="6" height="4" fill={color} />
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

        'gaming-keyboards': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="10" width="26" height="14" rx="1" stroke={color} strokeWidth="2" fill="none" />
                <rect x="6" y="13" width="3" height="3" fill={color} />
                <rect x="11" y="13" width="3" height="3" fill={color} />
                <rect x="16" y="13" width="3" height="3" fill={color} />
                <rect x="21" y="13" width="3" height="3" fill={color} />
                <rect x="8" y="18" width="14" height="3" fill={color} />
            </svg>
        ),

        'gaming-mouse': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="4" width="12" height="22" rx="6" stroke={color} strokeWidth="2" fill="none" />
                <rect x="15" y="8" width="2" height="6" fill={color} />
                <rect x="10" y="14" width="12" height="2" fill={color} />
                <circle cx="16" cy="20" r="2" fill={color} />
            </svg>
        ),

        'mousepads': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="10" width="26" height="14" rx="2" stroke={color} strokeWidth="2" fill="none" />
                <rect x="6" y="13" width="20" height="8" fill={color} fillOpacity="0.12" />
                <rect x="6" y="19" width="20" height="2" fill={color} fillOpacity="0.25" />
            </svg>
        ),

        'headsets': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 18 Q8 8 16 8 Q24 8 24 18" stroke={color} strokeWidth="2" fill="none" />
                <rect x="5" y="17" width="5" height="8" rx="1" fill={color} />
                <rect x="22" y="17" width="5" height="8" rx="1" fill={color} />
                <rect x="12" y="26" width="8" height="2" fill={color} />
            </svg>
        ),

        'webcams': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="14" r="8" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="16" cy="14" r="4" fill={color} />
                <rect x="12" y="22" width="8" height="4" fill={color} />
                <rect x="8" y="26" width="16" height="2" fill={color} />
            </svg>
        ),

        /* ── OTHERS SECTION ── */

        'switches': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="12" width="24" height="10" stroke={color} strokeWidth="2" fill="none" />
                <rect x="7" y="14" width="3" height="6" fill={color} />
                <rect x="12" y="14" width="3" height="6" fill={color} />
                <rect x="17" y="14" width="3" height="6" fill={color} />
                <rect x="22" y="14" width="3" height="6" fill={color} />
                <rect x="7" y="8" width="3" height="4" fill={color} />
                <rect x="7" y="22" width="3" height="4" fill={color} />
            </svg>
        ),

        'wifi-routers': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="18" width="24" height="8" stroke={color} strokeWidth="2" fill="none" />
                <rect x="7" y="20" width="2" height="4" fill={color} />
                <rect x="11" y="20" width="2" height="4" fill={color} />
                <rect x="15" y="20" width="2" height="4" fill={color} />
                <path d="M16 6 Q6 12 6 18" stroke={color} strokeWidth="2" fill="none" />
                <path d="M16 6 Q26 12 26 18" stroke={color} strokeWidth="2" fill="none" />
                <path d="M16 9 Q10 13 10 18" stroke={color} strokeWidth="2" fill="none" />
                <path d="M16 9 Q22 13 22 18" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="16" cy="6" r="2" fill={color} />
            </svg>
        ),

        'wifi-cards': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="10" width="22" height="14" stroke={color} strokeWidth="2" fill="none" />
                <rect x="9" y="14" width="6" height="6" fill={color} />
                <path d="M22 12 Q26 12 26 8" stroke={color} strokeWidth="2" fill="none" />
                <path d="M22 12 Q28 12 28 6" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="22" cy="12" r="1.5" fill={color} />
            </svg>
        ),

        'cables': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="12" width="8" height="8" stroke={color} strokeWidth="2" fill="none" />
                <rect x="20" y="12" width="8" height="8" stroke={color} strokeWidth="2" fill="none" />
                <rect x="12" y="15" width="8" height="2" fill={color} />
                <rect x="6" y="14" width="4" height="4" fill={color} />
                <rect x="22" y="14" width="4" height="4" fill={color} />
            </svg>
        ),

        'chairs': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="4" width="14" height="14" rx="1" stroke={color} strokeWidth="2" fill="none" />
                <rect x="9" y="18" width="14" height="4" fill={color} />
                <rect x="9" y="22" width="2" height="6" fill={color} />
                <rect x="21" y="22" width="2" height="6" fill={color} />
                <rect x="7" y="26" width="6" height="2" fill={color} />
                <rect x="19" y="26" width="6" height="2" fill={color} />
            </svg>
        ),

        'desks': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="12" width="26" height="3" fill={color} />
                <rect x="5" y="15" width="3" height="12" fill={color} />
                <rect x="24" y="15" width="3" height="12" fill={color} />
                <rect x="3" y="27" width="26" height="1" fill={color} />
                <rect x="10" y="8" width="12" height="4" stroke={color} strokeWidth="1.5" fill="none" />
            </svg>
        ),

        'gaming-controllers': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12 Q4 12 4 18 Q4 24 8 24 L12 18 L20 18 L24 24 Q28 24 28 18 Q28 12 24 12 Z" stroke={color} strokeWidth="2" fill="none" />
                <rect x="8" y="14" width="2" height="6" fill={color} />
                <rect x="6" y="16" width="6" height="2" fill={color} />
                <circle cx="23" cy="15" r="1.5" fill={color} />
                <circle cx="25" cy="17" r="1.5" fill={color} />
            </svg>
        ),

        'laptop-bags': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="10" width="22" height="16" rx="1" stroke={color} strokeWidth="2" fill="none" />
                <rect x="9" y="14" width="14" height="8" stroke={color} strokeWidth="1.5" fill="none" />
                <path d="M12 10 Q12 6 16 6 Q20 6 20 10" stroke={color} strokeWidth="2" fill="none" />
            </svg>
        ),

        'printers-scanners': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="12" width="22" height="12" stroke={color} strokeWidth="2" fill="none" />
                <rect x="9" y="8" width="14" height="4" fill={color} />
                <rect x="9" y="24" width="14" height="5" stroke={color} strokeWidth="2" fill="none" />
                <circle cx="23" cy="18" r="2" fill={color} />
                <rect x="9" y="17" width="10" height="2" fill={color} />
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

        /* ── APPLE PRODUCTS SECTION ── */

        'macbook': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="7" width="22" height="15" rx="1" stroke={color} strokeWidth="2" fill="none" />
                <rect x="7" y="9" width="18" height="11" fill={color} fillOpacity="0.08" />
                <rect x="2" y="22" width="28" height="2" rx="1" fill={color} />
                <circle cx="16" cy="12" r="2" stroke={color} strokeWidth="1.5" fill="none" />
            </svg>
        ),

        'imac': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="26" height="17" rx="1" stroke={color} strokeWidth="2" fill="none" />
                <rect x="5" y="6" width="22" height="13" fill={color} fillOpacity="0.08" />
                <rect x="14" y="21" width="4" height="5" fill={color} />
                <rect x="8" y="26" width="16" height="2" rx="1" fill={color} />
            </svg>
        ),

        'ipad': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="3" width="16" height="26" rx="1" stroke={color} strokeWidth="2" fill="none" />
                <rect x="10" y="6" width="12" height="18" fill={color} fillOpacity="0.08" />
                <circle cx="16" cy="27" r="1" fill={color} />
            </svg>
        ),

        'apple-accessories': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6 Q20 6 20 10 Q20 14 16 16 Q12 14 12 10 Q12 6 16 6 Z" fill={color} />
                <rect x="15" y="3" width="2" height="4" fill={color} />
                <rect x="6" y="20" width="20" height="6" rx="3" stroke={color} strokeWidth="2" fill="none" />
                <rect x="10" y="22" width="4" height="2" fill={color} />
                <rect x="18" y="22" width="4" height="2" fill={color} />
            </svg>
        ),

        /* ── SYSTEM SECTION ── */

        'branded-pcs': (
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

        'all-in-one': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="24" height="17" rx="1" stroke={color} strokeWidth="2" fill="none" />
                <rect x="6" y="6" width="20" height="13" fill={color} fillOpacity="0.08" />
                <rect x="13" y="21" width="6" height="4" fill={color} />
                <rect x="9" y="25" width="14" height="2" fill={color} />
                <rect x="10" y="9" width="4" height="4" fill={color} />
            </svg>
        ),

        'servers': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="20" height="8" stroke={color} strokeWidth="2" fill="none" />
                <rect x="6" y="12" width="20" height="8" stroke={color} strokeWidth="2" fill="none" />
                <rect x="6" y="20" width="20" height="8" stroke={color} strokeWidth="2" fill="none" />
                <rect x="9" y="6" width="8" height="2" fill={color} />
                <rect x="9" y="14" width="8" height="2" fill={color} />
                <rect x="9" y="22" width="8" height="2" fill={color} />
                <circle cx="22" cy="7" r="1.5" fill={color} />
                <circle cx="22" cy="15" r="1.5" fill={color} />
                <circle cx="22" cy="23" r="1.5" fill={color} />
            </svg>
        ),

        'custom-builds': (
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

        'laptops': (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="7" width="22" height="15" rx="0" stroke={color} strokeWidth="2" fill="none" />
                <rect x="7" y="9" width="18" height="11" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" />
                <rect x="2" y="22" width="28" height="3" fill={color} />
                <rect x="12" y="22" width="8" height="1" fill="white" />
            </svg>
        ),
    };

    const icon = icons[slug] || (
        // Default fallback: a simple pixel box
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="24" height="20" stroke={color} strokeWidth="2" fill="none" />
            <rect x="8" y="10" width="16" height="12" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
        </svg>
    );

    return icon;
}
