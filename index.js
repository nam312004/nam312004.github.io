const NAV_BAR = document.getElementById("navBar");
const NAV_LIST = document.getElementById("navList");
const HERO_HEADER = document.getElementById("home");
const HAMBURGER_BTN = document.getElementById("hamburgerBtn");
const NAV_LINKS = Array.from(document.querySelectorAll(".nav-list-link"));
const SERVICE_BOXES = document.querySelectorAll(".service-card-box");
const ACTIVE_LINK_CLASS = "active";
const BREAKPOINT = 576;

let currentServiceBG = null;
let currentActiveLink = document.querySelector(".nav-list-link.active");

// Remove the active state once the breakpoint is reached
const resetActiveState = () => {
  NAV_LIST.classList.remove("nav--active");
  Object.assign(NAV_LIST.style, {
    height: null,
  });
  Object.assign(document.body.style, {
    overflowY: null,
  });
};

//Add padding to the header to make it visible because navbar has a fixed position.
const addPaddingToHomeFn = () => {
  const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height;
  const HEIGHT_IN_REM = NAV_BAR_HEIGHT / 10;

  // If hamburger button is active, do not add padding
  if (NAV_LIST.classList.contains("nav--active")) {
    return;
  }
  Object.assign(HERO_HEADER.style, {
    paddingTop: HEIGHT_IN_REM + "rem",
  });
};
addPaddingToHomeFn();
window.addEventListener("resize", () => {
  addPaddingToHomeFn();

  // When the navbar is active and the window is being resized, remove the active state once the breakpoint is reached
  if (window.innerWidth >= BREAKPOINT) {
    addPaddingToHomeFn();
    resetActiveState();
  }
});

// Shows & hide navbar on smaller screen
HAMBURGER_BTN.addEventListener("click", () => {
  NAV_LIST.classList.toggle("nav--active");
  if (NAV_LIST.classList.contains("nav--active")) {
    Object.assign(document.body.style, {
      overflowY: "hidden",
    });
    Object.assign(NAV_LIST.style, {
      height: "100vh",
    });
    return;
  }
  Object.assign(NAV_LIST.style, {
    height: 0,
  });
  Object.assign(document.body.style, {
    overflowY: null,
  });
});

const scrollHandler = (hash) => {
  const OFFSET = NAV_BAR.getBoundingClientRect().height;
    const SECTION = document.querySelector(hash);
    const TOP = SECTION.offsetTop - OFFSET;
    window.scrollTo({
      top: TOP,
      behavior: "smooth",
    });

    // Add the hash to the url
    window.history.pushState(null, null, hash);
};

// When navbar link is clicked, reset the active state and active the clicked link
NAV_LINKS.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    resetActiveState();
    link.blur();

    // Active the clicked link
    currentActiveLink.classList.remove(ACTIVE_LINK_CLASS);

    // If the clicked link is the same as the current active link, do not add the active class
    if (currentActiveLink === link) {
      return;
    }

    currentActiveLink = link;
    currentActiveLink.classList.add(ACTIVE_LINK_CLASS);

    const HASH = link.getAttribute("href");
    scrollHandler(HASH);
  });
});

// when clicking on the a hash link, scroll to the section with the same hash
const HASH_LINKS = Array.from(document.querySelectorAll('a[href^="#"]'));
HASH_LINKS.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const HASH = link.getAttribute("href");
    scrollHandler(HASH);

    // Active the link
    currentActiveLink.classList.remove(ACTIVE_LINK_CLASS);

    // find the link with the same hash and active it
    const LINK = document.querySelector(`.nav-list-link[href="${HASH}"]`);
    LINK.classList.add(ACTIVE_LINK_CLASS);
    currentActiveLink = LINK;
  });
});

// get hash from the url and active the link with the same hash
const hash = window.location.hash;

if (hash) {
  const LINK = document.querySelector(`.nav-list-link[href="${hash}"]`);
  if (LINK) {
    LINK.classList.add(ACTIVE_LINK_CLASS);
    currentActiveLink = LINK;
    scrollHandler(hash);
  }
} else {
  // active the first link
  NAV_LINKS[0].classList.add(ACTIVE_LINK_CLASS);
  currentActiveLink = NAV_LINKS[0];
}

// Handles the hover animation on services section
SERVICE_BOXES.forEach((service) => {
  const moveBG = (x, y) => {
    Object.assign(currentServiceBG.style, {
      left: x + "px",
      top: y + "px",
    });
  };
  service.addEventListener("mouseenter", (e) => {
    if (currentServiceBG === null) {
      currentServiceBG = service.querySelector(".service-card-bg");
    }
    moveBG(e.clientX, e.clientY);
  });
  service.addEventListener("mousemove", (e) => {
    const LEFT = e.clientX - service.getBoundingClientRect().left;
    const TOP = e.clientY - service.getBoundingClientRect().top;
    moveBG(LEFT, TOP);
  });
  service.addEventListener("mouseleave", () => {
    const IMG_POS = service.querySelector(".service-card-illustration");
    const LEFT =
      IMG_POS.offsetLeft + currentServiceBG.getBoundingClientRect().width;
    const TOP =
      IMG_POS.offsetTop + currentServiceBG.getBoundingClientRect().height;

    moveBG(LEFT, TOP);
    currentServiceBG = null;
  });
});

// Works 
const WORK_FILTERS = document.querySelectorAll(".work-filter-btn");
const WORK_ITEMS = document.querySelectorAll(".work");

WORK_FILTERS.forEach((filter) => {
  filter.addEventListener("click", () => {
    const FILTER = filter.getAttribute("data-filter");
    WORK_FILTERS.forEach((f) => {
      f.classList.remove("active");
    });

    filter.classList.add("active");

    WORK_ITEMS.forEach((item) => {
      const CATEGORY = item.getAttribute("data-category");
      if (CATEGORY === FILTER || FILTER === "all") {
        item.style.display = "block";
        return;
      }
      item.style.display = "none";
    });
  });
});

// testimonials
const TESTIMONIALS = document.querySelectorAll(".testimonial-box");
const NEXT = document.getElementById("next");
const PREV = document.getElementById("prev");
const BULLETS = document.querySelectorAll(".bullet");

let currentTestimonial = 0;

const changeTestimonial = (index) => {
  TESTIMONIALS[currentTestimonial].classList.remove("active");
  BULLETS[currentTestimonial].classList.remove("active");

  TESTIMONIALS[index].classList.add("active");
  BULLETS[index].classList.add("active");
  currentTestimonial = index;
}

NEXT.addEventListener("click", () => {
  if (currentTestimonial === TESTIMONIALS.length - 1) {
    changeTestimonial(0);
    return;
  }

  changeTestimonial(currentTestimonial + 1);
});

PREV.addEventListener("click", () => {
  if (currentTestimonial === 0) {
    changeTestimonial(TESTIMONIALS.length - 1);
    return;
  }
  changeTestimonial(currentTestimonial - 1);
});

BULLETS.forEach((bullet, index) => {
  bullet.addEventListener("click", () => {
    changeTestimonial(index);
  });
});

// auto change testimonial
let autoChange = setInterval(() => {
  if (currentTestimonial === TESTIMONIALS.length - 1) {
    changeTestimonial(0);
    return;
  }

  changeTestimonial(currentTestimonial + 1);
}, 2000);


// Contact form
const FORM = document.getElementById("contactForm");
const NAME = document.getElementById("contactNameTxt");
const MESSAGE = document.getElementById("contactDescriptionTxt");

FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  const NAME_VALUE = NAME.value.trim();
  const MESSAGE_VALUE = MESSAGE.value.trim();

  const setError = (input, message) => {
    const FORM_CONTROL = input.parentElement;
    const ERROR_MESSAGE = FORM_CONTROL.querySelector(".error-msg");

    ERROR_MESSAGE.innerText = message;
    input.classList.add("error");
  }

  const setSuccess = (input) => {
    const FORM_CONTROL = input.parentElement;
    const ERROR_MESSAGE = FORM_CONTROL.querySelector(".error-msg");

    ERROR_MESSAGE.innerText = "";
    input.classList.remove("error");
  }

  if (NAME_VALUE === "") {
    setError(NAME, "Name cannot be empty");
  } else {
    setSuccess(NAME);
  }

  if (MESSAGE_VALUE === "") {
    setError(MESSAGE, "Message cannot be empty");
  } else {
    setSuccess(MESSAGE);
  }

  if (NAME_VALUE !== "" && MESSAGE_VALUE !== "") {
    FORM.reset();
    alert("Message sent successfully");
  }
});
