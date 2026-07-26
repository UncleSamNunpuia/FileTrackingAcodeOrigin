// icons.js

// window.Icons = function () {
window.Icons = {

    arrowIcon: `
    <svg
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2.5"
    >
        <path stroke-linecap="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>`,

    fileIcon: `
        <svg
            width="26"
            height="26"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            stroke-width="1.8"
        >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2z"
            />

            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14 3v5h5"
            />

            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 12h6M10 16h6"
            />
        </svg>`,

    bulletListIcon: `
        <svg
              width="26"
              height="26"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 6h13M8 12h13M8 18h13"
              />
              <circle cx="4" cy="6" r="1" />
              <circle cx="4" cy="12" r="1" />
              <circle cx="4" cy="18" r="1" />
            </svg>`,
            
    user: `
        <svg
            width="26"
            height="26"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            stroke-width="1.8"
        >
            <path
                stroke-linecap="round"
                d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
            />
            <circle cx="9" cy="7" r="4" />
            <path stroke-linecap="round" d="M19 8v6M22 11h-6" />
        </svg>
    `,

    folder: `
        <!-- Folder SVG -->
    `,

    logout: `
        <!-- Logout SVG -->
    `};

// Automatically insert icons into elements with data-icon=""
window.loadIcons = function () {

    document.querySelectorAll("[data-icon]").forEach(element => {
    const iconName = element.dataset.icon;
        if (window.Icons[iconName]) {
            element.innerHTML = window.Icons[iconName];
        }

    });

};