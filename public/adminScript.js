// Cargar empresas al inicio
async function cargarEmpresas() {
  try {
    const res = await fetch('/api/empresas');
    const empresas = await res.json();

    // Lista de empresas
    const lista = document.getElementById('listaEmpresas');
    lista.innerHTML = '';
  empresas.forEach(e => {
  const item = document.createElement('li');
   item.setAttribute('data-id-empresa', e.id);
  item.innerHTML = `
    ${e.nombre} | CIF: ${e.cif} | Sector: ${e.sector}
    <button onclick="verTrabajadoresDeEmpresa(${e.id})">Ver trabajadores</button>
  `;

  lista.appendChild(item);
});

    const selector = document.getElementById('empresaTrabajador');
    selector.innerHTML = '<option value="">-- Selecciona una empresa --</option>';
    empresas.forEach(e => {
      const option = document.createElement('option');
      option.value = e.id;
      option.textContent = e.nombre;
      selector.appendChild(option);
    });

  } catch (error) {
    console.error('Error al cargar empresas:', error);
  }
}


// Envío del formulario
document.getElementById('formEmpresa').addEventListener('submit', async (e) => {
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
  } catch (error) {
    console.error('Error al crear empresa:', error);
  }
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
document.getElementById('formTrabajador').addEventListener('submit', async (e) => {
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

    if (!res.ok) throw new Error('Error al crear trabajador');

    const data = await res.json();
    console.log('Trabajador creado:', data);
    document.getElementById('formTrabajador').reset();
    cargarTrabajadores();
  } catch (error) {
    console.error('Error al crear trabajador:', error);
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
  } catch (error) {
    console.error('Error al crear vivienda:', error);
  }
});

// Crear inquilino
document.getElementById('formInquilino').addEventListener('submit', async (e) => {
  e.preventDefault();

  const datosCompletos = {
    nombre_usuario: document.getElementById('nombreUsuario').value,
    contraseña: document.getElementById('passwordUsuario').value,
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
    document.getElementById('formInquilino').reset();
    cargarInquilinos();
  } catch (error) {
    console.error('Error al crear inquilino:', error);
  }
});

async function cargarInquilinos() {
  try {
    const res = await fetch('/api/inquilinos');
    const empresas = await res.json();
    const lista = document.getElementById('listaInquilinos');
    lista.innerHTML = '';
    empresas.forEach(e => {
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
  // Buscar el <li> correspondiente a esta empresa
  const empresaLi = document.querySelector(`li[data-id-empresa="${idEmpresa}"]`);

let subLista = document.getElementById(`sublista-${idEmpresa}`);
const btn = empresaLi.querySelector('button');

if (subLista) {
  subLista.remove();
  btn.textContent = 'Ver trabajadores'; // Cambia texto al ocultar
  return;
}
  try {
    // Pedimos los trabajadores filtrando por id_empresa
    const res = await fetch(`/api/trabajadores?empresa=${idEmpresa}`);
    const trabajadores = await res.json();

    // Creamos una sublista y la llenamos
    subLista = document.createElement('ul');
    subLista.id = `sublista-${idEmpresa}`;
    subLista.style.marginLeft = '20px'; // Sangría visual

    trabajadores.forEach(t => {
      const li = document.createElement('li');
      li.textContent = `${t.nombre} ${t.apellidos} - ${t.profesion}`;
      subLista.appendChild(li);
    });

    // La insertamos justo debajo de la empresa
    empresaLi.appendChild(subLista);
  } catch (error) {
    console.error('Error al obtener trabajadores:', error);
  }
}


cargarInquilinos();
cargarEmpresas();
cargarViviendas();
