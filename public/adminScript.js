async function cargarEmpresas() {
  try {
    const res = await fetch('/api/empresas');
    const empresas = await res.json();

    const tbody = document.querySelector('#tablaEmpresas tbody');
    tbody.innerHTML = '';

    empresas.forEach(e => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-id-empresa', e.id);
      tr.innerHTML = `
        <td>${e.nombre}</td>
        <td>${e.cif}</td>
        <td>${e.sector}</td>
        <td>
          <button onclick="verTrabajadoresDeEmpresa(${e.id})">
            Ver trabajadores
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    const selector = document.getElementById('empresaTrabajador');
    selector.innerHTML = '<option value="">-- Selecciona una empresa --</option>';
    empresas.forEach(e => {
      const opt = document.createElement('option');
      opt.value = e.id;
      opt.textContent = e.nombre;
      selector.appendChild(opt);
    });

  } catch (err) {
    console.error('Error al cargar empresas:', err);
  }
}

document.getElementById('formEmpresaForm')
  .addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      nombre: document.getElementById('nombre').value,
      cif: document.getElementById('cif').value,
      sector: document.getElementById('sector').value
    };
    try {
      await fetch('/api/empresas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      e.target.reset();
      cargarEmpresas();
      alert('Empresa creada correctamente');
    } catch (err) {
      console.error('Error al crear empresa:', err);
      alert('No se pudo crear empresa.\n' + err.message);
    }
  });


document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("seccionEmpresas");
  cargarEmpresas();

});

// Mostrar sección trabajadores
function mostrarSeccionTrabajadores() {
  document.getElementById('seccionEmpresas').style.display = 'none';
  document.getElementById('seccionTrabajadores').style.display = 'block';
  cargarTrabajadores();
}
cargarTrabajadores();
// Cargar trabajadores
async function cargarTrabajadores() {
  try {
    const res = await fetch('/api/trabajadores');
    const trabajadores = await res.json();

    const lista = document.getElementById('listaTrabajadores');
    lista.innerHTML = ''; // Limpiar lista
    trabajadores.forEach(t => {
      const li = document.createElement('li');
      li.textContent = `${t.nombre} ${t.apellidos} - ${t.profesion} (Empresa: ${t.empresa?.nombre || 'Sin empresa'})`;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Error al cargar trabajadores:', error);
  }
}

// Crear trabajador
document.getElementById('formTrabajadorForm').addEventListener('submit', async (e) => {
  e.preventDefault();

   const datosCompletos = {
    nombre_usuario: document.getElementById('nombreUsuario').value,
    contraseña: document.getElementById('passwordUsuario').value,
    rol: 'trabajador',
    nombre: document.getElementById('nombreTrabajador').value,
    apellidos: document.getElementById('apellidosTrabajador').value,
    profesion: document.getElementById('profesionTrabajador').value,
    id_empresa: parseInt(document.getElementById('empresaTrabajador').value)
  };

  try {
    const res = await fetch('/api/trabajadores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosCompletos)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detalles || 'Error desconocido');
    }

    const data = await res.json();
    console.log('Trabajador creado:', data);
    alert('Trabajador creado correctamente');
    document.getElementById('formTrabajadorForm').reset();
    cargarTrabajadores();
  } catch (error) {
    console.error('Error al crear trabajador:', error);
    alert('No se pudo crear el trabajador.\n' + error.message);
  }
});

async function cargarViviendas() {
  try {
    const res = await fetch('/api/viviendas');
    const viviendas = await res.json();
    const lista = document.getElementById('listaViviendas');
    lista.innerHTML = '';
    viviendas.forEach(v => {
      const item = document.createElement('li');
      item.textContent = `${v.direccion} ${v.escalera} ${v.piso} ${v.letra} | descripción: ${v.observaciones}`;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error('Error al cargar viviendas:', error);
  }
}

document.getElementById('formVivienda').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    direccion: document.getElementById('direccion').value,
    escalera: document.getElementById('escalera').value,
    piso: document.getElementById('piso').value,
    letra: document.getElementById('letra').value,
    habitaciones: document.getElementById('habitaciones').value,
    metros_cuadrados: document.getElementById('metros_cuadrados').value,
    observaciones: document.getElementById('observaciones').value,
  };

  try {
    await fetch('/api/viviendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    e.target.reset();
    cargarViviendas();
    alert('Vivienda creada correctamente');
  } catch (error) {
    console.error('Error al crear vivienda:', error);
    alert('No se pudo crear la vivienda.\n' + error.message);
  }
});
// Crear inquilino
document.getElementById('formInquilinoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const datosCompletos = {
    nombre_usuario: document.getElementById('nombreUsuarioInquilino').value,
    contraseña: document.getElementById('passwordUsuarioInquilino').value,
    rol: 'inquilino',

    nombre: document.getElementById('nombreInquilino').value,
    apellidos: document.getElementById('apellidosInquilino').value,
    fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
    dni: document.getElementById('dni').value
  };

  try {
    const res = await fetch('/api/inquilinos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosCompletos)
    });

    if (!res.ok) throw new Error('Error al crear inquilino');

    const data = await res.json();
    console.log('Inquilino creado:', data);
    alert('Inquilino creado correctamente');
    document.getElementById('formInquilinoForm').reset();
    cargarInquilinos();
  } catch (error) {
    console.error('Error al crear inquilino:', error);
    alert('No se pudo crear el inquilino.\n' + error.message);
  }
});
async function cargarInquilinos() {
  try {
    const res = await fetch('/api/inquilinos');
    const inquilinos = await res.json();
    const lista = document.getElementById('listaInquilinos');
    lista.innerHTML = '';
    inquilinos.forEach(e => {
      const item = document.createElement('li');
      item.textContent = `${e.nombre} ${e.apellidos}`;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error('Error al cargar inquilinos:', error);
  }
}
    function mostrarSeccion(id) {
      document.querySelectorAll("#main section").forEach(seccion => {
        seccion.style.display = "none";
      });
      const objetivo = document.getElementById(id);
      if (objetivo) objetivo.style.display = "block";
      objetivo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelectorAll("#nav ul li a").forEach(link => {
        link.classList.remove("active");
      });
      const enlaceActivo = document.querySelector(`#nav ul li a[onclick*="${id}"]`);
      if (enlaceActivo) enlaceActivo.classList.add("active");
    }

    function mostrarSubseccion(id) {
      const contenedores = [
        'listadoEmpresas', 'formEmpresa',
        'listadoTrabajadores', 'formTrabajador',
        'listadoViviendas', 'formVivienda',
        'listadoInquilinos', 'formInquilino'
      ];
      contenedores.forEach(divId => {
        const div = document.getElementById(divId);
        if (div) div.style.display = 'none';
      });

      const mostrar = document.getElementById(id);
      if (mostrar) mostrar.style.display = 'block';
    }

    document.addEventListener("DOMContentLoaded", function () {
      mostrarSeccion("seccionEmpresas");
    });
    
    function mostrarFormulario(id) {
     const form = document.getElementById(id);
  if (!form) return;
  form.style.display = (form.style.display === 'block') ? 'none' : 'block';
}

async function verTrabajadoresDeEmpresa(idEmpresa) {
  const filaEmpresa = document.querySelector(`tr[data-id-empresa="${idEmpresa}"]`);
  if (!filaEmpresa) return;

  const siguiente = filaEmpresa.nextElementSibling;
  if (siguiente && siguiente.classList.contains('subrow')) {
    siguiente.remove();
    return;
  }

  try {
 
    const res = await fetch(`/api/trabajadores?empresa=${idEmpresa}`);
    const trabajadores = await res.json();

    const subFila = document.createElement('tr');
    subFila.classList.add('subrow');

    const celda = document.createElement('td');
    celda.setAttribute('colspan', 4); // 4 columnas: Nombre, CIF, Sector, Acción

    let html = `
      <table class="inner-table">
        <thead>
          <tr>
            <th>Nombre</th><th>Apellidos</th><th>Profesión</th>
          </tr>
        </thead>
        <tbody>
    `;
    trabajadores.forEach(t => {
      html += `
        <tr>
          <td>${t.nombre}</td>
          <td>${t.apellidos}</td>
          <td>${t.profesion || '-'}</td>
        </tr>
      `;
    });
    html += `</tbody></table>`;

    celda.innerHTML = html;
    subFila.appendChild(celda);

    filaEmpresa.parentNode.insertBefore(subFila, filaEmpresa.nextSibling);

  } catch (error) {
    console.error('Error al obtener trabajadores:', error);
  }
}


cargarInquilinos();
cargarEmpresas();
cargarViviendas();
