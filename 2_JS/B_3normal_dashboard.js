// to laod icons from svgIcons.js file
// if script is loaded with defer  you can simply do:
loadIcons();
// else if script is loaded without defer, you can do:
// document.addEventListener("DOMContentLoaded", () => {
//     loadIcons();
// });
// eliminate the need to remember calling loadIcons() 
// on every page by having icons.js do it automatically:
window.addEventListener("DOMContentLoaded", () => {
    window.loadIcons();
});