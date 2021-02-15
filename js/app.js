/**
 * Define Global Variables
 *
 */

//nav bar element
const navBar = document.getElementById("navbar__list");

//last selected tab
let lastTab = null;

//last selected section
let lastSection = null;

/**
 * End Global Variables
 * Begin Main Functions
 */

// build the nav
function createNavList() {
  const fragment = document.createDocumentFragment();

  const sectionsList = Object.values(document.getElementsByTagName("section"));

  for (const i of sectionsList.reverse()) {
    const tab = createNavLink(i);
    window.addEventListener("scroll", () => isElementSelected(i, tab));
    fragment.appendChild(tab);
  }

  navBar.appendChild(fragment);
}

// build tabs
function createNavLink(section) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.className = "menu__link";
  a.innerText = section.dataset.nav;
  li.appendChild(a);
  li.addEventListener("click", () => goToSection(section));
  return li;
}

/**
 * End Main Functions
 * Begin Events
 */

// Scroll to anchor section using scrollIntoView event
function goToSection(section) {
  section.scrollIntoView();
}

// Toggle active section and tab function
function isElementSelected(section, tab) {
  if (
    window.scrollY >= section.offsetTop - window.innerHeight * 0.5 &&
    window.scrollY <=
      section.offsetTop + section.clientHeight - window.innerHeight * 0.5
  ) {
    if (lastTab != tab) {
      if (lastTab != null) {
        lastTab.getElementsByTagName("a")[0].classList.toggle("active");
        lastSection.classList.toggle("your-active-class");
      }

      tab.getElementsByTagName("a")[0].classList.toggle("active");
      section.classList.toggle("your-active-class");

      lastSection = section;
      lastTab = tab;
    }
  }
}

// Build menu
createNavList();
