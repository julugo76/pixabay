import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {
  // state de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);


  useEffect(() => {
    const consultarApi = async () => {
      if (busqueda === '') return;
      const imagenesPorPagina = 30;
      const key = '20339764-f344c83d32a5aa686e41a3818';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      //console.log(resultado);
      guardarImagenes(resultado.hits);
      //calcular numeros de paginas
      const calcularTotalPaginas = Math.ceil(parseInt(resultado.totalHits) / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);
      //mover pantalla al inicio
      const jumbotron =document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'})
    }
    consultarApi();
  }, [busqueda, paginaactual])
  const paginaAnterior = () => {
    const paginaNvaAnterior = paginaactual - 1;
    if (paginaNvaAnterior === 0) return;
    guardarPaginaActual(paginaNvaAnterior);
  };
  const paginaSiguiente = () => {
    const paginaNvaSiguiente = paginaactual + 1;
    if (paginaNvaSiguiente > totalpaginas) return;
    guardarPaginaActual(paginaNvaSiguiente);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        {paginaactual === 1 ? null :
          (<button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>&laquo; Anterior </button>)
        }
        {paginaactual === totalpaginas ? null :
          (<button type="button" className="btn btn-info mr-1" onClick={paginaSiguiente}>Siguiente &raquo;</button>)
        }

      </div>
    </div>
  );
}

export default App;
