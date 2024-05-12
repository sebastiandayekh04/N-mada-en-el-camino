console.log("prueba");

fetch("podcast.xml")
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");

    const posts = xml.querySelectorAll("post");

    let tarjetas = "";
    for (let i = 0; i < posts.length; i++) {
      let post = posts[i];
      let titulo = post.getAttribute("titulo");
      let fecha = post.getAttribute("fecha");
      let introduccion = post.querySelector("introduccion").textContent;
      let autor = post.querySelector("autor");
      let nombre = autor.querySelector("nombre").textContent;
      let avatar = autor.querySelector("avatar").textContent;
      //let autorNombre = post.querySelector("autor nombre").textContent;
      let tiempoLectura = post.querySelector("tiempo_lectura").textContent;
      let numVisualizaciones = post.querySelector(
        "num_visualizaciones"
      ).textContent;
      let numComentarios = post.querySelector("num_comentarios").textContent;
      let numMegusta = post.querySelector("num_megusta").textContent;
      let imagen = post.querySelector("imagen").textContent;

      const tarjeta = `
            <div class="sub-cuadros">
                <img class="imagen-cuadro" src="imagenes/${imagen}" alt="${titulo}" />
                <div class="cuadros-cont">
                    <div class="cuadros-fecha">
                        <div class="perfil"><img src="imagenes/${avatar}"/></div>
                        <div>
                            <div>${nombre}</div>
                            <div>${fecha} · ${tiempoLectura} min</div>
                        </div>
                        <div class="botones-verticales"><i class="fa-solid fa-ellipsis-vertical"></i></div>
                    </div>
                    <div class="subtitulo">${titulo}</div>
                    <div class="subtexto">
                        <p>${introduccion}</p>
                    </div>
                    <div class="vistas">
                        <div style="width: 50%;">${numVisualizaciones} visualizaciones · ${numComentarios} comentarios</div>
                        <div class="corazon-alineacion">${numMegusta}<i class="fa-regular fa-heart corazon"></i></div>
                    </div>
                </div>
            </div>
        `;

      tarjetas += tarjeta;
    }

    document.querySelector(".cuadros").innerHTML = tarjetas;
  });
