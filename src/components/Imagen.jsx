import React from 'react';
import PropTypes from 'prop-types';

const Imagen = ({imagen}) => {
    // extraer imagenes
    const { largeImageURL, likes, previewURL, tags, views } = imagen;
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card">
                <img src={previewURL} alt="tags" className="card-img-top"/>
                <div className="card-body">
                    <div className="card-text">{likes} Me gusta</div>
                    <div className="card-text">{views} Vistas</div>

                </div>
                <div className="card-footer">
                    <a href={largeImageURL}
                    target="blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-block"
                    >Ver Imagen</a>

                </div>
            </div>

        </div>
    );
}

Imagen.propTypes={
    imagen: PropTypes.object.isRequired
}
export default Imagen;