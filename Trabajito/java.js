document.addEventListener("DOMContentLoaded", async () => {
    let res = await axios.get("./lugares.json");
    console.log(res);
    let lugares = res.data;
    let tarjetasContenedor = document.querySelector(".tarjetas");
    lugares.forEach(lugar => {
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = `   
            <h2>${lugar.nombre}</h2>
            <p> Ubicado en ${lugar.pais}</p>
            <p>${lugar.descripcion}</p>
            <img src="${lugar.url_imagen}" >
        `;
        tarjetasContenedor.appendChild(tarjeta);
    });
});