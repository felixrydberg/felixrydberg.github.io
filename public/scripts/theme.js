const changeTheme = () => {
  const element = document.documentElement;
  const theme = element.classList.contains("dark") ? "light" : "dark";

  if (theme === "dark") {
    element.classList.add("dark");
    element.classList.remove("light");
  } else {
    element.classList.add("light");
    element.classList.remove("dark");
  }
  localStorage.theme = theme;
}

const preloadTheme = () => {
  const theme = (() => {
    const userTheme = localStorage.theme;
    if (userTheme === "light" || userTheme === "dark") {
      return userTheme;
    } else {
      return "dark";
    }
  })()

  const element = document.documentElement;
  if (theme === "dark") {
    element.classList.add("dark");
    element.classList.remove("light");
  } else {
    element.classList.add("light");
    element.classList.remove("dark");
  }
  localStorage.theme = theme;
}

const initializeThemeButtons = () => {
  const themeButtons = document.querySelectorAll(".theme-button");
  themeButtons.forEach((button) => {
    button.addEventListener("click", changeTheme);
  });

  const navigationButtons = document.querySelectorAll(".navigation-drawer-button");
  navigationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("clicked");
      const drawer = document.querySelector("#navigation-drawer");
      drawer?.classList.toggle("translate-x-0");
    });
  });
  if (navigationButtons.length > 0) {
    document.addEventListener("click", (event) => {
      const drawer = document.querySelector("#navigation-drawer");
      if (
        drawer?.classList.contains("translate-x-0") &&
        !drawer?.contains(event.target) &&
        !(
          event.target.classList.contains('navigation-drawer-button') ||
          event.target.parentNode.classList.contains('navigation-drawer-button')
        )
      ) {
        drawer?.classList.remove("translate-x-0");
      }
    });
  }

}

window.onload = async () => {
  document.addEventListener("astro:after-swap", initializeThemeButtons);
  initializeThemeButtons();
}
document.addEventListener("astro:after-swap", preloadTheme);
preloadTheme();
