document.addEventListener("DOMContentLoaded", async () => {
    let res = await axios.get("./lugares.json");
    let lugares = res.data;
    let tarjetasContenedor = document.querySelector(".tarjetas");

    lugares.forEach(lugar => {
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `   
            <h2>${lugar.nombre}</h2>
            <p>Ubicado en ${lugar.ciudad} - ${lugar.pais}</p>
            <p>${lugar.descripcion}</p>
            <img src="${lugar.url_imagen}" alt="${lugar.nombre}">
            <div class="vermas">
                <a href="#" data-id="${lugar.id}">Ver más</a>
            </div>
        `;

      
        tarjeta.querySelector(".vermas a").addEventListener("click", (e) => {
            e.preventDefault();
            mostrarDetallesLugar(lugar);
        });

        tarjetasContenedor.appendChild(tarjeta);
    });
});

function mostrarDetallesLugar(lugar) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.8)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";

    const contenido = document.createElement("div");
    contenido.style.background = `linear-gradient(135deg, ${lugar.categoria.colorPrimario}, ${lugar.categoria.colorSecundario})`;
    contenido.style.padding = "30px";
    contenido.style.borderRadius = "10px";
    contenido.style.maxWidth = "700px";
    contenido.style.width = "90%";
    contenido.style.maxHeight = "90%";
    contenido.style.overflowY = "auto";
    contenido.style.color = "#000";
    contenido.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";

   contenido.innerHTML = `
    <h2>${lugar.nombre}</h2>
    <p><strong>Ubicación:</strong> ${lugar.ciudad}, ${lugar.pais}</p>
    <p><strong>Descripción:</strong> ${lugar.descripcion}</p>
    <img src="${lugar.url_imagen}" alt="${lugar.nombre}" style="width: 100%; border-radius: 8px; margin: 15px 0;">
    <p><strong>Coordenadas:</strong> Lat ${lugar.coordenadas.latitud}, Lng ${lugar.coordenadas.longitud}</p>

    <div style="margin: 20px 0;">
        <h3>Ubicación en el mapa:</h3>
        <iframe 
            width="100%" 
            height="300" 
            style="border:0; border-radius: 8px;" 
            loading="lazy" 
            allowfullscreen 
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=${lugar.coordenadas.latitud},${lugar.coordenadas.longitud}&output=embed">
        </iframe>
    </div>

    <h3>Datos interesantes:</h3>
    <ul>
        ${lugar.datosInteresantes.map(dato => `<li><strong>${dato.titulo}:</strong> ${dato.valor}</li>`).join('')}
    </ul>
    <h3>Actividades recomendadas:</h3>
    <ul>
        ${lugar.actividadesRecomendadas.map(act => `<li>${act}</li>`).join('')}
    </ul>
    <button id="cerrarModal" style="
        margin-top: 20px;
        background-color: #a36e4f;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    ">
        Cerrar
    </button>
`;


    modal.appendChild(contenido);
    document.body.appendChild(modal);

  
    document.getElementById("cerrarModal").addEventListener("click", () => {
        modal.remove();
    });
}   
