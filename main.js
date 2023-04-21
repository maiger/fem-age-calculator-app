// Inputs
D_InEl = document.querySelector(".date__day input");
M_InEl = document.querySelector(".date__month input");
Y_InEl = document.querySelector(".date__year input");

// Labels
D_LabelEl = document.querySelector(".date__day label");
M_LabelEl = document.querySelector(".date__month label");
Y_LabelEl = document.querySelector(".date__year label");

// Errors
D_ErrorEl = document.querySelector(".date__day .error");
M_ErrorEl = document.querySelector(".date__month .error");
Y_ErrorEl = document.querySelector(".date__year .error");

// Output
D_El = document.querySelector(".age__days span");
M_El = document.querySelector(".age__months span");
Y_El = document.querySelector(".age__years span");

// Form
formEl = document.querySelector(".date__form-wrapper");

// Store elements
const dayData = {
  input: D_InEl,
  label: D_LabelEl,
  error: D_ErrorEl,
  output: D_El,
};

const monthData = {
  input: M_InEl,
  label: M_LabelEl,
  error: M_ErrorEl,
  output: M_El,
};

const yearData = {
  input: Y_InEl,
  label: Y_LabelEl,
  error: Y_ErrorEl,
  output: Y_El,
};

// Events
formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  let day = dayData.input.value.trim();
  let month = monthData.input.value.trim();
  let year = yearData.input.value.trim();

  let dValid = false;
  let mValid = false;
  let yValid = false;

  // Reset errors
  resetErrors(dayData.label, dayData.input, dayData.error);
  resetErrors(monthData.label, monthData.input, monthData.error);
  resetErrors(yearData.label, yearData.input, yearData.error);

  if (year) {
    if (validateYear(year)) {
      // Given input was valid
      yValid = true;
    } else {
      errorInvalid(
        yearData.label,
        yearData.input,
        yearData.error,
        "Must be in the past"
      );
    }
  } else {
    errorInvalid(
      yearData.label,
      yearData.input,
      yearData.error,
      "This field is required"
    );
  }

  if (month) {
    if (validateMonth(month)) {
      // Given input was valid
      mValid = true;
    } else {
      errorInvalid(
        monthData.label,
        monthData.input,
        monthData.error,
        "Must be a valid month"
      );
    }
  } else {
    errorInvalid(
      monthData.label,
      monthData.input,
      monthData.error,
      "This field is required"
    );
  }

  if (day) {
    if (validateDay(year, month, day)) {
      // Given input was valid
      dValid = true;
    } else {
      errorInvalid(
        dayData.label,
        dayData.input,
        dayData.error,
        "Must be a valid day"
      );
    }
  } else {
    errorInvalid(
      dayData.label,
      dayData.input,
      dayData.error,
      "This field is required"
    );
  }

  // Output
  if (dValid && mValid && yValid) {
    const startDate = new Date(year, month, day);
    const age = getAge(startDate);
    yearData.output.textContent = age.y;
    monthData.output.textContent = age.m;
    dayData.output.textContent = age.d;
  }
});

// Validation
function validateYear(year) {
  return year <= new Date().getFullYear();
}

function validateMonth(month) {
  return month > 0 && month < 13;
}

function validateDay(year, month, day) {
  let valid = true;
  // Check limits
  if (day < 0 || day > 31) {
    valid = false;
  }
  // New date gives wrong day if day is invalid as it skips to next month
  const presumedDate = new Date(year, month - 1, day);
  if (presumedDate.getDate() != day) {
    valid = false;
  }

  return valid;
}

function resetErrors(label, input, error) {
  // Clear colors
  label.classList.remove("error-color");
  input.classList.remove("error-input");
  // Hide error message
  error.classList.add("hidden");
}

function errorInvalid(label, input, error, msg) {
  // Color label and input
  label.classList.add("error-color");
  input.classList.add("error-input");
  // Show error message
  error.textContent = msg;
  error.classList.remove("hidden");
}

function getAge(startDate) {
  const today = new Date();
  var year = today.getFullYear() - startDate.getFullYear();
  var month = today.getMonth() - startDate.getMonth() + 1; // JS months go 0 - 11..
  var day = today.getDate() - startDate.getDate();

  if (month < 1) {
    year--;
    month = 12 + month;
  }

  if (day < 1) {
    month--;
    day = 31 + day;
  }

  return { y: year, m: month, d: day };
}
