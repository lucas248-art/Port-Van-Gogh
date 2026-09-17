/* =========================================================
   LUCAS.DEV — VAN GOGH
   SCRIPT.JS
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const body = document.body;

const header = document.querySelector(".header");

const nav = document.querySelector(".nav");

const navLinks = document.querySelectorAll(".nav-link");

const menuToggle = document.querySelector(".menu-toggle");

const themeToggle = document.querySelector(".theme-toggle");

const sections = document.querySelectorAll("section[id]");

const projectCards = document.querySelectorAll(".project-card");

const hero = document.querySelector(".hero");

const heroArt = document.querySelector(".hero-art");


/* =========================================================
   MENU MOBILE
========================================================= */

if (menuToggle) {

  menuToggle.addEventListener("click", () => {

    header.classList.toggle("menu-open");

  });

}


/* =========================================================
   FECHAR MENU AO CLICAR EM UM LINK
========================================================= */

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    header.classList.remove("menu-open");

  });

});


/* =========================================================
   HEADER AO ROLAR
========================================================= */

function updateHeader() {

  if (window.scrollY > 30) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   NAVEGAÇÃO ATIVA
========================================================= */

function updateActiveSection() {

  const scrollPosition =
    window.scrollY + window.innerHeight * 0.35;

  sections.forEach(section => {

    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {

      navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${sectionId}`) {

          link.classList.add("active");

        }

      });

    }

  });

}

window.addEventListener("scroll", updateActiveSection);

updateActiveSection();


/* =========================================================
   CORREÇÃO DO LINK HABILIDADES
========================================================= */

navLinks.forEach(link => {

  if (link.getAttribute("href") === "#habilidades") {

    link.setAttribute("href", "#skills");

  }

});


/* =========================================================
   TEMA CLARO / ESCURO
========================================================= */

const savedTheme = localStorage.getItem("lucas-theme");

if (savedTheme === "light") {

  body.classList.add("light-mode");

}


if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-mode");

    const isLight =
      body.classList.contains("light-mode");

    localStorage.setItem(
      "lucas-theme",
      isLight ? "light" : "dark"
    );

  });

}


/* =========================================================
   PARALLAX DO HERO
========================================================= */

if (hero && heroArt) {

  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;


  window.addEventListener("mousemove", event => {

    const x =
      event.clientX / window.innerWidth - 0.5;

    const y =
      event.clientY / window.innerHeight - 0.5;

    mouseX = x;
    mouseY = y;

  });


  function animateParallax() {

    currentX +=
      (mouseX - currentX) * 0.035;

    currentY +=
      (mouseY - currentY) * 0.035;


    heroArt.style.transform = `
      translate(
        ${currentX * 18}px,
        ${currentY * 18}px
      )
      scale(1.04)
    `;


    requestAnimationFrame(animateParallax);

  }


  animateParallax();

}


/* =========================================================
   TILT DOS CARDS
========================================================= */

projectCards.forEach(card => {

  card.addEventListener("mousemove", event => {

    if (window.innerWidth <= 760) {
      return;
    }


    const rect =
      card.getBoundingClientRect();


    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;


    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;


    const rotateX =
      ((y - centerY) / centerY) * -3;


    const rotateY =
      ((x - centerX) / centerX) * 3;


    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
    `;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});


/* =========================================================
   REVEAL AO ENTRAR NA TELA
========================================================= */

const revealElements = document.querySelectorAll(
  ".project-card, .skill-card, .about-content, .about-art, .contact-content"
);


revealElements.forEach(element => {

  element.style.opacity = "0";

  element.style.transform =
    "translateY(25px)";


  element.style.transition =
    "opacity .8s ease, transform .8s ease";

});


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }


        entry.target.style.opacity = "1";

        entry.target.style.transform =
          "translateY(0)";


        revealObserver.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================================================
   ATRASO DOS CARDS
========================================================= */

document
  .querySelectorAll(".project-card")
  .forEach((card, index) => {

    card.style.transitionDelay =
      `${index * 80}ms`;

  });


document
  .querySelectorAll(".skill-card")
  .forEach((card, index) => {

    card.style.transitionDelay =
      `${index * 60}ms`;

  });


/* =========================================================
   SUAVIDADE NOS LINKS INTERNOS
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");


      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }


      const target =
        document.querySelector(targetId);


      if (!target) {
        return;
      }


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


/* =========================================================
   EFEITO DE PINTURA NO MOUSE
========================================================= */

if (hero) {

  hero.addEventListener("mousemove", event => {

    const rect =
      hero.getBoundingClientRect();


    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;


    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;


    hero.style.setProperty(
      "--mouse-x",
      `${x}%`
    );


    hero.style.setProperty(
      "--mouse-y",
      `${y}%`
    );

  });

}


/* =========================================================
   TECLADO — ESC FECHA MENU
========================================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    header.classList.remove("menu-open");

  }

});


/* =========================================================
   PREVENIR LINKS VAZIOS
========================================================= */

document
  .querySelectorAll('a[href="#"]')
  .forEach(link => {

    link.addEventListener("click", event => {

      event.preventDefault();

    });

  });


/* =========================================================
   CONSOLE
========================================================= */

console.log(
  "%cLucas.Dev 🌻",
  "font-size: 22px; font-weight: bold;"
);

console.log(
  "%cSonhe, programe, conquiste.",
  "font-size: 13px;"
);
