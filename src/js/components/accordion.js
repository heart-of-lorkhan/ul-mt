export const accordion = (() => {
  const init = () => {
    const accordionList = document.querySelectorAll(".accordion-list");

    if (!accordionList.length) {
      return;
    }

    const toggleAccordion = (event) => {
      const accordionItem = event.target.closest(".accordion");
      const accordionContent = accordionItem.querySelector(
        ".accordion__content"
      );
      accordionItem.classList.toggle("active");
      // const isExpanded =
      //   accordionButton.getAttribute("aria-expanded") === "true";
      // const target = accordionButton.parentElement.nextElementSibling;
      // accordionButton.setAttribute("aria-expanded", !isExpanded);

      if (accordionItem.classList.contains("active")) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      } else {
        accordionContent.style.maxHeight = "0";
      }
    };

    accordionList.forEach((accordion) => {
      accordion.addEventListener("click", toggleAccordion);
    });
  };

  return {
    init,
  };
})();
