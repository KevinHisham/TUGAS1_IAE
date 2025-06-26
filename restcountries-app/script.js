const countries = ['indonesia', 'malaysia', 'vietnam'];
let currentIndex = 0;

const title = document.getElementById('title');
const infoDiv = document.getElementById('country-info');

function loadCountry(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(res => res.json())
    .then(data => {
      const country = data[0];
      title.textContent = `Informasi Negara: ${country.name.common}`;
      infoDiv.innerHTML = `
        <p><strong>Nama Resmi:</strong> ${country.name.common}</p>
        <p><strong>Ibu Kota:</strong> ${country.capital[0]}</p>
        <p><strong>Wilayah:</strong> ${country.region}</p>
        <p><strong>Populasi:</strong> ${country.population.toLocaleString()}</p>
        <img src="${country.flags.png}" alt="Bendera ${country.name.common}">
      `;
    })
    .catch(err => {
      infoDiv.innerHTML = "<p>Gagal mengambil data negara.</p>";
      console.error(err);
    });
}

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % countries.length;
  loadCountry(countries[currentIndex]);
});

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + countries.length) % countries.length;
  loadCountry(countries[currentIndex]);
});

// Load pertama
loadCountry(countries[currentIndex]);
