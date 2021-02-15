const navBar = document.getElementById("navbar__list");

const navBarTabs = [];

let lastTab = null;

let lastSection = null;

function createNavList() {
  const fragment = document.createDocumentFragment();

  const sectionsList = Object.values(document.getElementsByTagName("section"));

  for (const i of sectionsList.reverse()) {
    const tab = createNavLink(i);
    navBarTabs.push(tab);
    console.log(navBarTabs);
    window.addEventListener("scroll", () => isElementSelected(i, tab));
    fragment.appendChild(tab);
  }

  navBar.appendChild(fragment);
}

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

function createNavLink(section) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.className = "menu__link";
  a.innerText = section.dataset.nav;
  li.appendChild(a);
  li.addEventListener("click", () => goToSection(section));
  return li;
}

function goToSection(section) {
  section.scrollIntoView();
}

createNavList();
