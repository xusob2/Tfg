async function getVivienda() {
    let id_inquilino = getCookie('id_usuario');
    const inquilino = await getInquilino(id_inquilino);
    try {
        const res = await fetch(`/api/vivienda/${encodeURIComponent(inquilino.vivienda_id)}`);
        if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);
        const vivienda = await res.json();

        const viviendaInput = document.getElementById("vivienda");
        const viviendaIdInput = document.getElementById("id_vivienda");

        if (viviendaInput && viviendaIdInput) {
            viviendaInput.value = vivienda.direccion;
            viviendaIdInput.value = vivienda.id;
        }

        console.log("La vivienda:", vivienda);
    } catch (error) {
        console.error("Error al obtener la vivienda:", error.message);
        return null;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function getInquilino(id_inquilino) {
    try {
        const res = await fetch(`/api/inquilino/${encodeURIComponent(id_inquilino)}`);
        if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("Error al obtener el inquilino:", error.message);
        return null;
    }
}

document.getElementById("formIncidencia").addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        
        const id_vivienda = document.getElementById("id_vivienda").value;
        const descripcion = document.getElementById("descripcion").value;

        const incidenciaData = {
            id_vivienda,
            descripcion
        };

        // Realizar la solicitud con fetch
        const res = await fetch("/api/incidencias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(incidenciaData)
        });

        // Manejo de la respuesta
        if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);

        const data = await res.json();
        console.log("Incidencia creada:", data);

        // Opcional: Mensaje de éxito
        alert("Incidencia creada correctamente!");

        // Opcional: Redirigir o limpiar el formulario
        document.getElementById("formIncidencia").reset();

    } catch (error) {
        console.error("Error al enviar la incidencia:", error.message);
        alert("Hubo un error al crear la incidencia.");
    }
});

getVivienda();