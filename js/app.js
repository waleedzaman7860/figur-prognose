// Variables
const checkboxes = document.querySelectorAll('input[data-group="gender"]');
const formSubmitBtn = document.querySelector("#form-submit-btn");
const formDataContainer = document.querySelector(".form__data-container");
const formChooseCotainer = document.querySelector(".form__choose-cotainer");
const formChooseBackBtn = document.querySelector(".form__choose--back-btn");
const formDataPagination = document.querySelector(".form__data--pagination");
const formChoosePagination = document.querySelector(".form__choose--pagination");
const motivatedBtns = document.querySelectorAll(".motivated-btns");
const sportsBtns = document.querySelectorAll(".sports-btns");
const formChooseSubmitBtn = document.querySelector(".form__choose--submit-btn");
const mainContainer = document.querySelector(".main-container");
const result = document.querySelector("#result");
const maleCheckbox = document.querySelector('input[value="male"]');
const femaleCheckbox = document.querySelector('input[value="female"]');

/**
 * @see https://cdnjs.com/libraries/dayjs
 * @see https://day.js.org/docs/en/i18n/i18n
 */
dayjs.locale("de");

// Define variables
let gender = "";
let age = 0;
let height = 0;
let targetWeight = 0;
let currentWeight = 0;
let estimatedDays = 0;
let currentDate = null;
let targetDate = null;

// Define DOM elements
const currentWeightTspanSvg = document.querySelector("#current-weight-tspan-svg");
const targetWeightTspanSvg = document.querySelector("#target-weight-tspan-svg");
const estimateDaysTspan = document.querySelector("#estimate-days-tspan");
const formElement = document.querySelector("#form-element");
const currentWeightInput = document.querySelector("#current-weight");
const targetWeightInput = document.querySelector("#target-weight");
const heightInput = document.querySelector("#height");
const ageInput = document.querySelector("#age");
const resultSection = document.querySelector("#result");
const targetWeightSpan = document.querySelector("#target-weight-span");
const currentDateSpan = document.querySelector("#current-date-span");
const targetDateSpan = document.querySelector("#target-date-span");
const estimatedDaysSpan = document.querySelector("#estimated-days");
const currentDateInChart = document.querySelector("#current-date-in-chart");
const targetDateInChart = document.querySelector("#target-date-in-chart");
const weightDifferencesSpan = document.querySelector("#weight-difference");
const gummiesProductImg = document.querySelector(".gummies-product-img");
const startWeight = document.querySelector("#start-weight");
const endWeight = document.querySelector("#end-weight");
const bodyUpdateTextToSpan = document.querySelector(".body__update--text-to span");
const bodyProductAdMainprice = document.querySelector(".body__product-ad-mainprice");
const gummiesProductTitle = document.querySelector("#gummies-product-title");
const gummiesProductQunatity = document.querySelector("#gummies-product-qunatity");
const gummiesProductDescription = document.querySelector("#gummies-product-description");
const bodyProductAd = document.querySelector(".body__product-ad-p");
const loader = document.querySelector(".loader");
const formChooseSection = document.getElementById("form-choose-section");

if (checkboxes) {
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      checkboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
        }
      });
    });
  });
}

// Add a click event listener to each checkbox
if (motivatedBtns) {
  motivatedBtns.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      // If this checkbox is checked, uncheck all other checkboxes
      if (checkbox.checked) {
        motivatedBtns.forEach((otherCheckbox) => {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });
}

// Add a click event listener to each checkbox
if (sportsBtns) {
  sportsBtns.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      // If this checkbox is checked, uncheck all other checkboxes
      if (checkbox.checked) {
        sportsBtns.forEach((otherCheckbox) => {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });
}

if (formChooseBackBtn) {
  formChooseBackBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formDataContainer.style.display = "block";
    formChooseCotainer.style.display = "none";
    formDataPagination.style.display = "flex";
    formChoosePagination.style.display = "none";
  });
}

// Add event listener to the male checkbox
if (maleCheckbox) {
  maleCheckbox.addEventListener("change", function () {
    if (this.checked) {
      gender = "male";
      femaleCheckbox.checked = false; // Uncheck the female checkbox
    }
  });
}

// Add event listener to the female checkbox
if (femaleCheckbox) {
  femaleCheckbox.addEventListener("change", function () {
    if (this.checked) {
      gender = "female";
      maleCheckbox.checked = false; // Uncheck the male checkbox
    }
  });
}

formSubmitBtn.addEventListener("click", function () {
  formChooseSection.classList.toggle("visible");

  if (formChooseSection.classList.contains("visible")) {
    const sectionTop = formChooseSection.getBoundingClientRect().top + window.pageYOffset;
    const scrollPosition = sectionTop - 50;
    const viewportHeight = window.innerHeight;
    const sectionHeight = formChooseSection.offsetHeight;

    if (sectionTop <= viewportHeight - sectionHeight / 2) {
      // section is fully or half visible
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    } else {
      // section is not visible or only partially visible
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }
});

// Initialize result section
function initResultSection() {
  resultSection.style.display = "block";
  targetWeightSpan.textContent = targetWeight;
  estimatedDaysSpan.textContent = estimatedDays;
  targetWeightTspanSvg.textContent = targetWeight;
  currentWeightTspanSvg.textContent = currentWeight;
  startWeight.textContent = currentWeight;
  endWeight.textContent = targetWeight;

  let weightDifference = Math.abs(targetWeight - currentWeight);
  weightDifferencesSpan.textContent = weightDifference;

  currentDateSpan.textContent = currentDate.format("DD MMMM YYYY");
  targetDateSpan.textContent = targetDate.format("DD MMMM YYYY");

  targetDateInChart.textContent = targetDate.format("DD MMMM YYYY");
  currentDateInChart.textContent = currentDate.format("DD MMMM YYYY");

  if (weightDifferencesSpan.innerText < 8) {
    gummiesProductImg.setAttribute("src", "./img/package-1.png");
    bodyProductAdMainprice.textContent = "49,95 €";
    gummiesProductTitle.textContent = "Für Einsteiger";
    gummiesProductQunatity.textContent = "1 Packung";
    gummiesProductDescription.textContent = "Mit einer einmonatigen Anwendung können Sie kleine Fettpölsterchen los werden.";
    bodyProductAd.textContent = "Gesamtpreis 54,90 €";
  }

  if (weightDifferencesSpan.innerText >= 8) {
    gummiesProductImg.setAttribute("src", "./img/package-2.png");
    bodyProductAdMainprice.textContent = "39,97 €";
    gummiesProductTitle.textContent = "Verkaufshit";
    gummiesProductQunatity.textContent = "2 Packungen";
    gummiesProductDescription.textContent = 'Dieses Paket wird von vielen auch "das neue Kleiderschrank- Paket" gennant, denn viele Anwender(innen) passen nach der erfolgreichen Einnahme nicht mehr in ihre alten Klamotten und müssen zu kleineren Größen greifen.';
    bodyProductAd.textContent = "Gesamtpreis 79,95 €";
  }

  if (weightDifferencesSpan.innerText > 12) {
    gummiesProductImg.setAttribute("src", "./img/package-3.png");
    bodyProductAdMainprice.textContent = "36,65 €";
    gummiesProductTitle.textContent = "Großer Wert";
    gummiesProductQunatity.textContent = "3 Packungen";
    gummiesProductDescription.textContent = "Dieses Paket ist nur für Anwender(innen) gedacht, die wirklich ihr Leben verändern möchten.";
    bodyProductAd.textContent = "Gesamtpreis 109,95 €";
  }
}

const checkBoxesMotivated = document.querySelectorAll(".motivated-btns");
const motivatedError = document.querySelector("#motivated-error");
const checkBoxesSports = document.querySelectorAll(".sports-btns");
const sportError = document.querySelector("#sport-error");

// Handle form submission
const currentWeightError = document.querySelector("#current-weight-error");
const targetWeightError = document.querySelector("#target-weight-error");
const heightError = document.querySelector("#height-error");
const ageError = document.querySelector("#age-error");

function handleSubmit(event) {
  event.preventDefault();

  let hasErrors = false;

  age = ageInput.value;
  height = heightInput.value;
  targetWeight = targetWeightInput.value;
  currentWeight = currentWeightInput.value;

  if (!age) {
    hasErrors = true;
    ageError.style.display = "flex";
  } else {
    ageError.style.display = "none";
  }

  if (!height || height <= 0) {
    hasErrors = true;
    heightError.style.display = "flex";
  } else {
    heightError.style.display = "none";
  }

  if (!targetWeight || targetWeight <= 0) {
    hasErrors = true;
    targetWeightError.style.display = "flex";
  } else {
    targetWeightError.style.display = "none";
  }

  if (!currentWeight || currentWeight <= 0) {
    hasErrors = true;
    currentWeightError.style.display = "flex";
  } else {
    currentWeightError.style.display = "none";
  }

  if (!hasErrors) {
    // Calculate estimated days to lose weight
    estimatedDays = daysToLoseWeight(currentWeight, targetWeight, height, age, gender);

    currentDate = dayjs();
    targetDate = currentDate.add(estimatedDays, "day");
    estimateDaysTspan.textContent = estimatedDays;

    formDataContainer.style.display = "none";
    formChooseCotainer.style.display = "block";
    formDataPagination.style.display = "none";
    formChoosePagination.style.display = "flex";

    if (formChooseSubmitBtn) {
      formChooseSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault();

        let atLeastOneMotivatedChecked = false;
        let atLeastOneSportsChecked = false;
        let bothChecked = false;

        for (let i = 0; i < checkBoxesMotivated.length; i++) {
          if (checkBoxesMotivated[i].checked) {
            atLeastOneMotivatedChecked = true;
            break;
          }
        }

        for (let i = 0; i < checkBoxesSports.length; i++) {
          if (checkBoxesSports[i].checked) {
            atLeastOneSportsChecked = true;
            break;
          }
        }

        if (!atLeastOneMotivatedChecked && !atLeastOneSportsChecked) {
          hasErrors = true;
          motivatedError.style.display = "flex";
          sportError.style.display = "flex";
        } else if (!atLeastOneMotivatedChecked) {
          hasErrors = true;
          motivatedError.style.display = "flex";
          sportError.style.display = "none";
        } else if (!atLeastOneSportsChecked) {
          hasErrors = true;
          motivatedError.style.display = "none";
          sportError.style.display = "flex";
        } else {
          bothChecked = true;
          motivatedError.style.display = "none";
          sportError.style.display = "none";
        }

        if (bothChecked) {
          loader.style.display = "block";
          mainContainer.style.display = "none";

          setTimeout(() => {
            loader.style.display = "none";
            result.style.display = "block";
            initResultSection();
          }, 3000);
        }
      });
    }
  }
}

formElement.addEventListener("submit", handleSubmit);

function daysToLoseWeight(_currentWeight, _targetWeight, _height, _age, _gender) {
  const weight = _currentWeight; // current weight in kg
  const targetWeight = _targetWeight; // target weight in kg
  const height = _height; // height in cm
  const age = _age; // age in years
  const gender = _gender; // "male" or "female"

  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const dailyCalorieIntake = bmr * 1.2 - 500;
  const weightLossRate = 0.5; // losing 0.5 kg per week is a safe and healthy rate
  const weeksToLoseWeight = (weight - targetWeight) / weightLossRate;
  const timeToLoseWeight = weeksToLoseWeight * 7; // converting weeks to days

  return Math.round(timeToLoseWeight);
}
