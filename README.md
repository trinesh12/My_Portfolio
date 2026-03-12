# Modern Developer Portfolio

A responsive, polished developer portfolio website built from scratch using HTML5, CSS3, and JavaScript (ES6+). It avoids heavy frameworks in favor of leaning on robust fundamental web functionality, producing a fast and lightweight final product.

## Folder Structure setup

The project structure assumes the following shape:

\`\`\`
portfolio/
│
├── index.html              # Main HTML entry point. Includes semantics and layout.
├── README.md               # You are here! Includes instructions below.
│
├── css/
│   └── style.css           # Modern stylesheet with variables, animations, flexbox and grid.
│
├── js/
│   └── script.js           # Functionality for observers, mock form, mobile navbar, JSON fetch.
│
├── images/
│   └── (store all images here) # Place images here. Project cards will detect image names based on the json.
│
└── projects/
    └── project-data.json   # This JSON populates the projects grid asynchronously on load.
\`\`\`

## Features

- **Modern Aesthetics:** Built with a glass-morphic navigation bar, subtle drop shadows, and a clean user-centric typography system using `Inter`.
- **Responsive Layout:** Entire layout adapts flexibly from large desktop monitors down to mobile screens, powered by CSS Grid and Flexbox.
- **Scroll Animations:** An `IntersectionObserver` smoothly fades in elements (skills, about me, project cards) as the user scrolls them into view.
- **Dynamic Content fetching:** Projects are queried automatically via the standard JavaScript `fetch` API against the local `project-data.json` file. Empty or broken image states gracefully default to SVG placeholders.
- **Contact Form Validation:** Fully stubbed out Javascript form submission mimicking real-world behaviors without relying on external packages.

## How to Run the Project

**Important Disclaimer about Local Data Loading (`fetch` CORS restrictions)**
By default, modern browsers enforcing secure CORS policies will block Javascript from using `fetch` on files directly over the filesystem (i.e., dragging and dropping `index.html` into Chrome with the `file:///` protocol).

To see the Projects section properly populate from the JSON file:
1. Open this `portfolio/` folder via **Visual Studio Code**.
2. Install the **[Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**.
3. Open `index.html` and click the **"Go Live"** button in your VS Code footer (or right-click and select "Open with Live Server").
4. The site should now serve successfully at `http://127.0.0.1:5500` and `projects/project-data.json` will be fetched successfully!

## Customization

- To change the color scheme, edit the CSS variables located inside the `:root` pseudo-class at the very top of `css/style.css`.
- Update your projects by exclusively editing the array in `projects/project-data.json`.
- Customize personal info easily in `index.html`.
