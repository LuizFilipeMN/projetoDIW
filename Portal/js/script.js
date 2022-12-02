onload = () => {
    lancamento();
    plataformas();
    detalhes();
  
    document.querySelector("#btn-0").onclick = () => lancamento();
    document.querySelector("#btn-1").onclick = () => plataformas();
    document.querySelector("#btn-2").onclick = () => detalhes();
  };
  
  
  var urlGames =
    "https://api.rawg.io/api/games?page=1&page_size=10&key=94c5a1e940c241df9bcd8b95677d1bad";
  async function lancamento() {
    let str = "";
    let data = await fetch(urlGames).then((res) => res.json());
    let result = data.results;
    for (let index = 0; index < result.length; index++) {
      const lancamento = result[index];
      str += `
      <div class="col-12 col-sm-3 col-md-4 col-lg-3">
      <div class="card border border-0">
          <h5 class="card-title fw-bold text-truncate">${lancamento.name}</h5>
          <div class="ratio" style="--bs-aspect-ratio: 50%;">
          <img src="${lancamento.background_image}" class="img-fluid" alt="imagem card">
          </div>
          <h5 class="fs-6">Avaliação: <span class="float-end">${lancamento.rating}</span></h5>
          <h5 class="fs-6">Lançamento: <span class="float-end">${lancamento.released}</span></h5>
          <a href="detalhes.html?id=${lancamento.id}"><button type="button" class="btn btn-secondary">Mais detalhes</button></a>
          </div>
      </div>
      </div>`;
    }
    urlGames = data.next;
    document.getElementById("lancamento").insertAdjacentHTML("beforeend", str);
  }
  
  var urlPlataforma = `https://api.rawg.io/api/platforms?page=1&page_size=3&key=94c5a1e940c241df9bcd8b95677d1bad`;
  async function plataformas() {
    let data = await fetch(urlPlataforma).then((res) => res.json());
    let str = "";
    for (let index = 0; index < data.results.length; index++) {
      const plataforma = data.results[index];
      str += ` <div class="col-12 col-sm-4 col-md-4">
      <div class="card border border-0">
          <h5 class="card-title fw-bold">${plataforma.name}</h5>
          <div class="formimg" style="background-image: url('${plataforma.image_background}')">
          </div>
          <div class="card-body">
              <p class="card-text">
                  <b>Principais jogos</b>
              <ul class="lista">`;
              for (let i = 0; i < 3; i++) {
                str += `<li>${plataforma.games[i].name}</li>`;
              }
      str += `</ul>
              </p>
              <p class="card-text text-end">Mais detalhes</p>
          </div>
      </div>
     </div>`;
    }
    urlPlataforma = data.next;
    document.getElementById("plataformas").insertAdjacentHTML("beforeend", str);
  }
  var urlDetalhes = `https://api.rawg.io/api/games?key=94c5a1e940c241df9bcd8b95677d1bad`;
  async function detalhes() {
    let data = await fetch(urlDetalhes).then((res) => res.json());
    if(idGame != -1){
      // const detalhe = data.results[index]
      str += `  <div class="col-12 col-lg-6 col-sm-12 float-start" style="clear: both;">
                  <div class="ratio ratio-16x9">
                    <img src="${detalhe.background_image}" class="img-fluid" alt="imagem card">
                  </div>
                </div>
                <div class=" col-12 col-lg-6 col-sm-12 float-end ps-4" id="nopading">
                  <article class="descricao">
                    <h1 class="card-title fw-bold">${detalhe.name}</h1>
                    <p><b>Sobre:</b>${detalhe.description}</p>
                    <p><b>Lançamento:</b> ${detalhe.released}</p>
                    <p><b>Plataformas:</b> ${detalhe.platform}</p>
                    <p><b>Gênero:</b> ${detalhe.genres}</p>
                    <p><b>Avaliação: </b><b class="text-danger">${detalhe.ratings}</b></p>
                  </article>
                </div>`;
    urlDetalhes = data.next;
    document.getElementById("detalhe").insertAdjacentHTML("beforeend", str);

    }
  }
  
  
  