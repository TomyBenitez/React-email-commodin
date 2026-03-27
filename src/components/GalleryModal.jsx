import { useEffect, useState } from 'react';
import { X, Loader2, Images } from 'lucide-react';

const GALLERY_API = import.meta.env.VITE_GALLERY_API;
const communityId = new URLSearchParams(window.location.search).get('communityId') ?? '';

export default function GalleryModal({ onSelect, onClose }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${GALLERY_API}/aGetBibliotecaTemplateBuilder.aspx?${communityId}`)
      .then((r) => r.text())
      .then((text) => {
        const data = JSON.parse(text);
        setImages(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('No se pudo cargar la galería.'))
      .finally(() => setLoading(false));
  }, []);

  function handleSelect(url) {
    onSelect(url.trim());
    onClose();
  }

  return (
    <div className="gallery-overlay" onClick={onClose}>
      <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-modal-header">
          <span className="gallery-modal-title">
            <Images size={16} /> Galería de imágenes
          </span>
          <button className="gallery-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="gallery-modal-body">
          {loading && (
            <div className="gallery-loading">
              <Loader2 size={28} className="gallery-spinner" />
              <span>Cargando imágenes...</span>
            </div>
          )}

          {error && <p className="gallery-error">{error}</p>}

          {!loading && !error && images.length === 0 && (
            <p className="gallery-empty">No hay imágenes en la galería.</p>
          )}

          {!loading && !error && images.length > 0 && (
            <div className="gallery-grid">
              {images.map((img, i) => (
                <div
                  key={img.EveId ?? i}
                  className="gallery-item"
                  onClick={() => handleSelect(img.Url)}
                >
                  <img src={img.Url.trim()} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
