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
