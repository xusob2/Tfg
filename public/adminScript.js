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

cargarEmpresas();


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

  const nuevo = {
    nombre: document.getElementById('nombreTrabajador').value,
    apellidos: document.getElementById('apellidosTrabajador').value,
    profesion: document.getElementById('profesionTrabajador').value,
    id_empresa: parseInt(document.getElementById('empresaTrabajador').value)
  };

  try {
    const res = await fetch('/api/trabajadores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo)
    });

    if (!res.ok) throw new Error('Error al crear trabajador');

    document.getElementById('formTrabajador').reset();
    cargarTrabajadores();
  } catch (error) {
    console.error('Error al crear trabajador:', error);
  }
});
