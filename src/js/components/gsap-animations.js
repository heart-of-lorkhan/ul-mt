import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function animateBackground() {
  const timeline = gsap.timeline();

  timeline.fromTo(
    ".hero",
    {
      "background-size": "150%",
      "background-position": "100% 20%",
    },
    {
      "background-size": "120%",
      "background-position": "20% 100%",
      duration: 2,
    }
  );

  return timeline;
}

function animateTitle() {
  const timeline = gsap.timeline({ delay: 2 });
  timeline.fromTo(
    ".hero__title",
    {
      x: "-100%",
    },
    {
      x: 0,
      duration: 1,
    }
  );
}

function animateText() {
  const timeline = gsap.timeline({ delay: 2 });
  timeline.fromTo(
    ".hero__text",
    {
      x: "-100%",
    },
    {
      x: 0,
      duration: 1,
    }
  );
}

function animateScrollTo() {
  const timeline = gsap.timeline({ delay: 2 });
  timeline.fromTo(
    ".hero__scroll-to",
    {
      opacity: 0,
    },
    {
      opacity: 1,
    }
  );
}

function animateLine() {
  const timeline = gsap.timeline({ delay: 2 });
  timeline.fromTo(
    ".line",
    {
      y: "-100%",
    },
    {
      y: 0,
      ease: "expo.inOut",
      duration: 1.5,
    }
  );
}

const master = gsap.timeline();

// nest and call functions with timelines
// add labels for better master timeline control
master
  .add(animateBackground())
  .add(animateTitle())
  .add(animateText())
  .add(animateScrollTo())
  .add(animateLine());
