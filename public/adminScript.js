// Cargar empresas al inicio
async function cargarEmpresas() {
  try {
    const res = await fetch('/api/empresas');
    const empresas = await res.json();
    const lista = document.getElementById('listaEmpresas');
    lista.innerHTML = '';
    empresas.forEach(e => {
      const item = document.createElement('li');
      item.textContent = `${e.nombre} | CIF: ${e.cif} | Sector: ${e.sector}`;
      lista.appendChild(item);
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

// Cargar trabajadores
async function cargarTrabajadores() {
  try {
    const res = await fetch('/api/trabajadores');
    const trabajadores = await res.json();

    const lista = document.getElementById('listaTrabajadores');
    lista.innerHTML = ''; // Limpiar lista
    trabajadores.forEach(t => {
      const li = document.createElement('li');
      li.textContent = `${t.nombre} ${t.apellidos} - ${t.profesion} (Empresa ID: ${t.id_empresa})`;
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

cargarInquilinos();
cargarEmpresas();
cargarViviendas();
