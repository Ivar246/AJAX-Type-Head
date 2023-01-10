const endpoint =
  "https://gist.githubusercontent.com/Ivar246/96f16abd2aec9d81104287835b23ff41/raw/420afd381990c61f08538800d9de3b6b151382e4/cities.json";

const cities = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordTomatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordTomatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);

  if (matchArray.length === 0) {
    suggestions.innerHTML = `<li class="none">Not Found</li>`;
    return;
  }

  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
    <li>
    <span class="name">${cityName}, ${stateName}</span>
    <span class="popualation">${numberWithCommas(place.population)}</span>
    </li>
    `;
    })
    .join("");

  suggestions.innerHTML = html;
}

const searchInput = document.querySelector("#search-box");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
