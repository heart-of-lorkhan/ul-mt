import "./vendor";
import VenoBox from "venobox/src/venobox.esm";
import { heroSlider } from "./components/hero-slider";
import { employeeSlider } from "./components/employee-slider";
import { repertoireSlider } from "./components/repertoire-slider";

function transliterateToLatin(input) {
  const cyrillicToLatinMap = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  const result = input
    .split("")
    .map((char) =>
      cyrillicToLatinMap[char.toLowerCase()] !== undefined
        ? cyrillicToLatinMap[char.toLowerCase()]
        : char.toLowerCase()
    )
    .join("")
    .replace(/ /g, "_");
  return result;
}

window.addEventListener(
  "load",
  () => {
    heroSlider.init();
    repertoireSlider.init();
    document.querySelector("body").classList.add("page-loaded");

    new VenoBox({
      selector: ".my-image-links",
      navigation: true,
      numeration: true,
      navSpeed: 0,
      onPostOpen: function (obj) {
        if (obj.getAttribute("data-gall") === "employees") {
          employeeSlider.init();
        }
        if (
          obj.getAttribute("data-gall") === "repertoire" ||
          obj.getAttribute("data-gall") === "repertoire-archive"
        ) {
          repertoireSlider.init();
        }
      },
      onNavComplete: function (obj) {
        if (obj.getAttribute("data-gall") === "employees") {
          employeeSlider.init();
        }
        if (
          obj.getAttribute("data-gall") === "repertoire" ||
          obj.getAttribute("data-gall") === "repertoire-archive"
        ) {
          repertoireSlider.init();
        }
      },
    });

    const renderEvents = (data) => {
      if (!data) {
        return;
      }

      const posterContainerList = document.querySelector(
        ".section-tickets__posters"
      );

      if (posterContainerList === null) {
        return;
      }

      const getDayOfWeek = (timestamp) => {
        const days = [
          "Воскр.",
          "Пон.",
          "Втор.",
          "Сред.",
          "Четв.",
          "Пятн.",
          "Субб.",
        ];
        const date = new Date(timestamp * 1000);
        const dayIndex = date.getDay();
        return days[dayIndex];
      };

      function getMonthName(dateString) {
        const date = new Date(dateString);

        const monthIndex = date.getMonth();

        const monthNames = [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ];

        return monthNames[monthIndex];
      }

      let events = [];

      data.forEach((item) => {
        item.events.forEach((event) => {
          event.short_info = item.short_info;
          event.is_pushkin = item.is_pushkin;
          event.show_categories = item.show_categories;

          events.push(event);
        });
      });

      events.sort((a, b) => a.timestamp - b.timestamp);

      let currentMonth = "";

      events.forEach((event) => {
        const eventMonth = getMonthName(event.date);
        if (currentMonth !== eventMonth) {
          currentMonth = eventMonth;

          const sectionTicketsTitleWrap = document.createElement("div");
          sectionTicketsTitleWrap.classList.add("section-tickets-title-wrap");

          const sectionTicketsTitle = document.createElement("h3");
          sectionTicketsTitle.classList.add("section-tickets__title");

          sectionTicketsTitle.textContent = currentMonth;
          sectionTicketsTitleWrap.append(sectionTicketsTitle);
          posterContainerList.append(sectionTicketsTitleWrap);
        }

        const eventPoster = document.createElement("div");
        eventPoster.classList.add("section-tickets__poster");

        const whiteBackground = document.createElement("div");
        whiteBackground.classList.add("section-tickets__white-background");

        const whiteContainer = document.createElement("div");
        whiteContainer.classList.add("section-tickets__white-container");

        const dateWrap = document.createElement("div");
        dateWrap.classList.add("section-tickets__date-wrap");

        const dateElement = document.createElement("p");
        dateElement.classList.add("section-tickets__date");
        dateElement.textContent = event.date.slice(8, 10);

        const dayElement = document.createElement("p");
        dayElement.classList.add("section-tickets__day");
        dayElement.textContent = getDayOfWeek(event.timestamp);

        const timeElement = document.createElement("p");
        timeElement.classList.add("section-tickets__time");
        timeElement.textContent = event.date.substring(11, 16);

        dateWrap.appendChild(dateElement);
        dateWrap.appendChild(dayElement);
        dateWrap.appendChild(timeElement);

        const eventImageElement = document.createElement("img");
        eventImageElement.classList.add("section-tickets__image");
        eventImageElement.setAttribute("src", event.image);
        whiteBackground.appendChild(eventImageElement);

        const buyLinkElement = document.createElement("a");
        buyLinkElement.classList.add("section-tickets__buy");
        buyLinkElement.setAttribute(
          "href",
          `https://www.afisha.ru/wl/571/api#/place/${event.id}`
        );
        buyLinkElement.setAttribute("target", "_blank");
        buyLinkElement.textContent = "Купить билет";

        whiteContainer.appendChild(dateWrap);
        whiteContainer.appendChild(eventImageElement);

        whiteBackground.appendChild(whiteContainer);

        const blueBackground = document.createElement("div");
        blueBackground.classList.add("section-tickets__blue-background");

        const showElement = document.createElement("div");
        showElement.classList.add("section-tickets__show");

        const showElementName = document.createElement("div");
        showElementName.textContent = event.name;

        const showElementInfo = document.createElement("div");
        showElementInfo.classList.add("section-tickets__show-info");
        showElementInfo.textContent = event.short_info;

        const showElementMore = document.createElement("a");
        showElementMore.classList.add("section-tickets__show-more");

        showElementMore.textContent = "Подробнее";
        showElementMore.setAttribute(
          "href",
          `repertoire#${transliterateToLatin(event.name)}`
        );

        showElement.append(showElementName);
        showElement.append(showElementInfo);
        showElement.append(showElementMore);

        const genreElement = document.createElement("div");
        genreElement.classList.add("section-tickets__genre");

        const ageLimitElement = document.createElement("div");
        ageLimitElement.classList.add("section-tickets__age-limit");
        ageLimitElement.textContent = `${event.age_limit}+`;

        blueBackground.appendChild(showElement);
        blueBackground.appendChild(buyLinkElement);

        const pushkinCardElement = document.createElement("img");
        pushkinCardElement.classList.add("section-tickets__pushkin-card");
        if (event.is_pushkin) {
          pushkinCardElement.setAttribute(
            "src",
            "/wp-content/themes/molodezh_teatr/images/pushkin_card.png"
          );
        }
        blueBackground.appendChild(pushkinCardElement);

        const specialViewElement = document.createElement("img");
        specialViewElement.classList.add("section-tickets__special-view");
        if (event?.show_categories[0]?.id === 1051) {
          specialViewElement.setAttribute(
            "src",
            "/wp-content/themes/molodezh_teatr/images/osobyi-vzglyad.jpg"
          );
        }
        blueBackground.appendChild(specialViewElement);

        blueBackground.appendChild(genreElement);
        blueBackground.appendChild(ageLimitElement);

        eventPoster.appendChild(whiteBackground);
        eventPoster.appendChild(blueBackground);

        posterContainerList.append(eventPoster);
      });
    };

    async function fetchEvents() {
      try {
        const response = await fetch(
          "https://api.codetabs.com/v1/proxy?quest=https://www.afisha.ru/wl/571/api/shows"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function getEvents() {
      const data = await fetchEvents();
      renderEvents(data.shows);
    }

    getEvents();
  },
  false
);
