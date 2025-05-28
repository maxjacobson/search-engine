document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  const searchBox = document.getElementById("search-box");
  const spinnerContainer = document.getElementById("spinner-container");
  const zeroResults = document.getElementById("zero-results");
  let spinnerTimeout = null;

  function showSpinner() {
    if (spinnerContainer) {
      spinnerContainer.style.display = "block";
    }
    if (zeroResults) {
      zeroResults.style.display = "none";
    }
    if (spinnerTimeout) {
      clearTimeout(spinnerTimeout);
    }
    spinnerTimeout = setTimeout(() => {
      if (spinnerContainer) spinnerContainer.style.display = "none";
      if (zeroResults) zeroResults.style.display = "block";
    }, 2000);
  }

  function hideSpinnerAndResults() {
    if (spinnerContainer) spinnerContainer.style.display = "none";
    if (zeroResults) zeroResults.style.display = "none";
    if (spinnerTimeout) {
      clearTimeout(spinnerTimeout);
      spinnerTimeout = null;
    }
  }

  if (q && searchBox) {
    searchBox.value = q;
    showSpinner();
  } else {
    hideSpinnerAndResults();
  }

  const form = document.getElementById("search-form");
  if (form && searchBox) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const newQ = searchBox.value;
      const newParams = new URLSearchParams(window.location.search);
      if (newQ) {
        newParams.set("q", newQ);
      } else {
        newParams.delete("q");
      }
      const newUrl =
        window.location.pathname +
        (newParams.toString() ? "?" + newParams.toString() : "");
      window.history.replaceState({}, "", newUrl);
      showSpinner();
    });
  }
});
