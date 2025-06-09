document.addEventListener("DOMContentLoaded", function () {
    mostrarSeccion('seccionIncidencias');
    const id_trabajador = getCookie('id_usuario');

    let incidenciasGlobal = [];
    let formularioAbierto = null;

    fetch(`/api/incidencias?id_trabajador=${encodeURIComponent(id_trabajador)}`)
        .then(res => res.json())
        .then(data => {
            incidenciasGlobal = data;

            const lista = document.getElementById('listaIncidencias');
            lista.innerHTML = '';

            data.forEach(v => {
                const li = document.createElement('li');
                li.style.cursor = 'pointer';

                li.addEventListener('mouseenter', () => {
                    li.style.textDecoration = 'underline';
                    li.style.backgroundColor = '#f0f0f0';
                });

                li.addEventListener('mouseleave', () => {
                    li.style.textDecoration = 'none';
                    li.style.backgroundColor = 'transparent';
                });

                li.dataset.id = v.id;

                const fecha = new Date(v.fecha_visita);
                const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
                const fechaStr = fecha.toLocaleDateString('es-ES', opcionesFecha);
                const horaStr = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
                const fechaFormateada = `${fechaStr} ${horaStr}`;

                li.innerHTML = `${v.vivienda.direccion} ${v.vivienda.escalera} ${v.vivienda.piso} ${v.vivienda.letra} <b> ||  Fecha visita:</b> ${fechaFormateada}`;

                li.addEventListener('click', () => {
                    if (formularioAbierto) {
                        formularioAbierto.remove();
                        formularioAbierto = null;
                    }

                    const form = crearFormularioIncidencia(v);
                    li.appendChild(form);
                    formularioAbierto = form;
                });

                lista.appendChild(li);
            });

        })
        .catch(error => {
            console.error('Error al cargar incidencias:', error);
        });
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function formatearFechaParaInput(fechaISO) {
    if (!fechaISO) return '';
    const d = new Date(fechaISO);
    const pad = n => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function crearFormularioIncidencia(incidencia) {
    const form = document.createElement('form');
    form.style.border = '1px solid #ccc';
    form.style.padding = '10px';
    form.style.marginTop = '5px';
    form.style.backgroundColor = '#f9f9f9';

    const labelDescripcion = document.createElement('label');
    labelDescripcion.textContent = 'Descripción:';
    const textarea = document.createElement('textarea');
    textarea.name = 'descripcion';
    textarea.rows = 3;
    textarea.value = incidencia.descripcion || '';
    labelDescripcion.appendChild(document.createElement('br'));
    labelDescripcion.appendChild(textarea);
    form.appendChild(labelDescripcion);
    form.appendChild(document.createElement('br'));

    const labelFecha = document.createElement('label');
    labelFecha.textContent = 'Fecha Visita:';
    const inputFecha = document.createElement('input');
    inputFecha.type = 'datetime-local';
    inputFecha.name = 'fecha_visita';
    inputFecha.value = formatearFechaParaInput(incidencia.fecha_visita);
    labelFecha.appendChild(document.createElement('br'));
    labelFecha.appendChild(inputFecha);
    form.appendChild(labelFecha);
    form.appendChild(document.createElement('br'));

    const labelSolucionada = document.createElement('label');
    labelSolucionada.textContent = 'Solucionada: ';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'solucionada';
    checkbox.checked = incidencia.solucionada === true;
    checkbox.style.width = '16px';
    checkbox.style.height = '16px';
    checkbox.style.appearance = 'auto';
    checkbox.style.opacity = '1';
    checkbox.style.position = 'static';
    checkbox.style.marginLeft = '5px';
    labelSolucionada.appendChild(checkbox);
    form.appendChild(labelSolucionada);
    form.appendChild(document.createElement('br'));

    const boton = document.createElement('button');
    boton.type = 'submit';
    boton.textContent = 'Actualizar';
    form.appendChild(boton);

    form.addEventListener('click', e => e.stopPropagation());

    // Evento submit del formulario
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // prevenir recarga

        const datos = {
            descripcion: textarea.value,
            fecha_visita: inputFecha.value,
            solucionada: checkbox.checked
        };

        fetch(`/api/incidencias/${incidencia.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(res => {
                if (!res.ok) throw new Error('Error al actualizar');
                return res.json();
            })
            .then(data => {
                alert('Incidencia actualizada correctamente.');
                // Opcional: cerrar el formulario o actualizar UI
            })
            .catch(error => {
                console.error('Error al enviar:', error);
                alert('Hubo un error al actualizar la incidencia.');
            });
    });

    return form;
}