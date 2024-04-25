async function buscaEstados() {
  try {
    const data = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    );
    const jsonData = await data.json();
    const ul = document.querySelector("ul");

    for (let i = 0; i < jsonData.length; i++) {
      let a = document.createElement("a");
      let li = document.createElement("li");
      a.textContent = jsonData[i].nome;
      a.setAttribute("href", `./municipios/index.html?nome=${jsonData[i].id}`);
      li.appendChild(a);
      ul.appendChild(li);
    }

    console.log(ul);
  } catch (error) {
    https: console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  buscaEstados();
});
