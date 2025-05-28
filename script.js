document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  const searchBox = document.getElementById("search-box");
  if (q && searchBox) {
    searchBox.value = q;
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
    });
  }
});
