document.addEventListener("DOMContentLoaded", function () {
  buscaMunicipio();
});

async function buscaMunicipio() {
  const h1 = document.createElement("h1");
  const urlSearchParams = new URLSearchParams(location.search);
  const UF = urlSearchParams.get("nome");
  const header = document.querySelector("header");
  const ul = document.querySelector("ul");

  try {
    console.log(UF);
    const data = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`
    );
    const jsonData = await data.json();
    h1.textContent = `Pagina do ${UF}`;
    console.log(h1);
    header.appendChild(h1);

    for (let i = 0; i < jsonData.length; i++) {
      let a = document.createElement("a");
      let li = document.createElement("li");
      const botao = document.createElement("button");
      botao.textContent = "Favoritar";
      botao.addEventListener("click", salvaFavorito(jsonData[i]));
      a.textContent = jsonData[i].nome;
      a.setAttribute("href", `./municipios/index.html?nome=${jsonData[i].id}`);
      a.appendChild(botao);
      li.appendChild(a);
      ul.appendChild(li);
    }
  } catch (error) {
    console.error(error);
  }
}

function salvaFavorito(id) {
  localStorage.setItem("favoritos", JSON.stringify(id));
}
