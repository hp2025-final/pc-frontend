export const MAIN_CATEGORIES = [
    { name: 'PC Cases', slug: 'pc-cases' },
    { name: 'Graphics', slug: 'gpus' },
    { name: 'Motherboards', slug: 'motherboards' },
    { name: 'Processors', slug: 'cpus' },

];

export const MEGA_SECTIONS = [
    {
        title: 'Components',
        items: [
            { name: 'PC Cooling', slug: 'pc-cooling-systems' },
            { name: 'PSU', slug: 'power-supplies' },
            { name: 'Storage', slug: 'storage' },
            { name: 'PC RAM', slug: 'ram' },
            { name: 'Gaming Keyboard', slug: 'gaming-keyboards' },
            { name: 'Gaming Mouse', slug: 'gaming-mouse' },
            { name: 'Mousepads', slug: 'mousepads' },
            { name: 'Headsets', slug: 'headsets' },
            { name: 'Webcams', slug: 'webcams' },
        ],
    },
    {
        title: 'Others',
        items: [
            { name: 'Switches', slug: 'switches' },
            { name: 'Wi-Fi Routers', slug: 'wifi-routers' },
            { name: 'Wifi Cards', slug: 'wifi-cards' },
            { name: 'Cables', slug: 'cables' },
            { name: 'Chairs', slug: 'chairs' },
            { name: 'Desks', slug: 'desks' },
            { name: 'Gaming Controllers', slug: 'gaming-controllers' },
            { name: 'Laptop Bags', slug: 'laptop-bags' },
            { name: 'Printers and Scanners', slug: 'printers-scanners' },
            { name: 'Monitors', slug: 'monitors' },
        ],
    },
    {
        title: 'Apple Products',
        items: [
            { name: 'Macbook', slug: 'macbook' },
            { name: 'iMac', slug: 'imac' },
            { name: 'iPad', slug: 'ipad' },
            { name: 'Apple Accessories', slug: 'apple-accessories' },
        ],
    },
    {
        title: 'System',
        items: [
            { name: 'Branded PCs', slug: 'branded-pcs' },
            { name: 'All in One', slug: 'all-in-one' },
            { name: 'Servers', slug: 'servers' },
            { name: 'PCWO Custom Builds', slug: 'custom-builds' },
            { name: 'Laptop', slug: 'laptops' },
        ],
    },
];

export const ALL_HOME_CATEGORIES = [
    ...MAIN_CATEGORIES,
    ...MEGA_SECTIONS.flatMap(s => s.items)
];
