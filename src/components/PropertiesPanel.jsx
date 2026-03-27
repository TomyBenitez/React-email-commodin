import { useState } from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { SUB_BLOCK_TYPES, createSubBlock } from '../utils/blockDefaults';
import GalleryModal from './GalleryModal';

const BLOCK_LABELS = {
  heading: 'Título',
  text: 'Texto',
  image: 'Imagen',
  button: 'Botón',
  divider: 'Separador',
  spacer: 'Espacio',
  social: 'Redes sociales',
  columns: 'Columnas',
};

const FONT_FAMILIES = [
  'Arial, sans-serif',
  'Georgia, serif',
  'Tahoma, sans-serif',
  'Verdana, sans-serif',
  'Trebuchet MS, sans-serif',
  'Times New Roman, serif',
  'Courier New, monospace',
];

export default function PropertiesPanel({ block, onChange }) {
  if (!block) {
    return (
      <aside className="properties-panel properties-empty">
        <p>Seleccioná un bloque para editar sus propiedades</p>
      </aside>
    );
  }

  return (
    <aside className="properties-panel">
      <p className="props-title">{BLOCK_LABELS[block.type] || block.type}</p>
      <PropsForm block={block} onChange={onChange} />
    </aside>
  );
}

function Field({ label, children }) {
  return (
    <div className="prop-field">
      <label className="prop-label">{label}</label>
      {children}
    </div>
  );
}

function BgField({ value, onChange }) {
  return (
    <Field label="Color de fondo del bloque">
      <div className="prop-color-row">
        <input
          type="color"
          className="prop-color"
          value={value === 'transparent' ? '#ffffff' : value}
          onChange={(e) => onChange({ backgroundColor: e.target.value })}
        />
        <button
          className="prop-btn-clear"
          onClick={() => onChange({ backgroundColor: 'transparent' })}
        >
          Sin fondo
        </button>
      </div>
    </Field>
  );
}

function PropsForm({ block, onChange }) {
  const { type, props } = block;

  switch (type) {
    case 'heading':
    case 'text':
      return (
        <>
          <Field label="Contenido">
            <textarea
              className="prop-textarea"
              value={props.content}
              onChange={(e) => onChange({ content: e.target.value })}
              rows={4}
            />
          </Field>
          <Field label="Tamaño de fuente (px)">
            <input
              type="number"
              className="prop-input"
              value={props.fontSize}
              onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
              min={8}
              max={96}
            />
          </Field>
          <Field label="Color de texto">
            <input
              type="color"
              className="prop-color"
              value={props.color}
              onChange={(e) => onChange({ color: e.target.value })}
            />
          </Field>
          <BgField value={props.backgroundColor} onChange={onChange} />
          <Field label="Alineación">
            <select
              className="prop-select"
              value={props.textAlign}
              onChange={(e) => onChange({ textAlign: e.target.value })}
            >
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </Field>
          <Field label="Peso de fuente">
            <select
              className="prop-select"
              value={props.fontWeight}
              onChange={(e) => onChange({ fontWeight: e.target.value })}
            >
              <option value="normal">Normal</option>
              <option value="bold">Negrita</option>
            </select>
          </Field>
          <Field label="Fuente">
            <select
              className="prop-select"
              value={props.fontFamily}
              onChange={(e) => onChange({ fontFamily: e.target.value })}
            >
              {FONT_FAMILIES.map((f) => (
                <option key={f} value={f}>{f.split(',')[0]}</option>
              ))}
            </select>
          </Field>
          <Field label="Interlineado">
            <input
              type="number"
              className="prop-input"
              value={props.lineHeight}
              onChange={(e) => onChange({ lineHeight: Number(e.target.value) })}
              min={0.8}
              max={3}
              step={0.1}
            />
          </Field>
          <Field label="Padding (px)">
            <input
              type="number"
              className="prop-input"
              value={props.padding ?? 0}
              onChange={(e) => onChange({ padding: Number(e.target.value) })}
              min={0}
              max={80}
            />
          </Field>
        </>
      );

    case 'image':
      return <ImageForm props={props} onChange={onChange} />;

    case 'button':
      return (
        <>
          <Field label="Texto del botón">
            <input
              type="text"
              className="prop-input"
              value={props.text}
              onChange={(e) => onChange({ text: e.target.value })}
            />
          </Field>
          <Field label="URL (href)">
            <input
              type="text"
              className="prop-input"
              value={props.href}
              onChange={(e) => onChange({ href: e.target.value })}
            />
          </Field>
          <Field label="Color del botón">
            <input
              type="color"
              className="prop-color"
              value={props.buttonColor ?? '#0066cc'}
              onChange={(e) => onChange({ buttonColor: e.target.value })}
            />
          </Field>
          <Field label="Color de texto">
            <input
              type="color"
              className="prop-color"
              value={props.color}
              onChange={(e) => onChange({ color: e.target.value })}
            />
          </Field>
          <Field label="Alineación">
            <select
              className="prop-select"
              value={props.align}
              onChange={(e) => onChange({ align: e.target.value })}
            >
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </Field>
          <Field label="Border radius (px)">
            <input
              type="number"
              className="prop-input"
              value={props.borderRadius}
              onChange={(e) => onChange({ borderRadius: Number(e.target.value) })}
              min={0}
              max={50}
            />
          </Field>
          <Field label="Tamaño de fuente (px)">
            <input
              type="number"
              className="prop-input"
              value={props.fontSize ?? 16}
              onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
              min={8}
              max={48}
            />
          </Field>
          <Field label="Padding horizontal (px)">
            <input
              type="number"
              className="prop-input"
              value={props.paddingH ?? 24}
              onChange={(e) => onChange({ paddingH: Number(e.target.value) })}
              min={0}
              max={80}
            />
          </Field>
          <Field label="Padding vertical (px)">
            <input
              type="number"
              className="prop-input"
              value={props.paddingV ?? 12}
              onChange={(e) => onChange({ paddingV: Number(e.target.value) })}
              min={0}
              max={60}
            />
          </Field>
          <Field label="Borde (px)">
            <input
              type="number"
              className="prop-input"
              value={props.borderWidth ?? 0}
              onChange={(e) => onChange({ borderWidth: Number(e.target.value) })}
              min={0}
              max={8}
            />
          </Field>
          {(props.borderWidth ?? 0) > 0 && (
            <>
              <Field label="Color de borde">
                <input
                  type="color"
                  className="prop-color"
                  value={props.borderColor ?? '#0066cc'}
                  onChange={(e) => onChange({ borderColor: e.target.value })}
                />
              </Field>
              <Field label="Estilo de borde">
                <select
                  className="prop-select"
                  value={props.borderStyle ?? 'solid'}
                  onChange={(e) => onChange({ borderStyle: e.target.value })}
                >
                  <option value="solid">Sólido</option>
                  <option value="dashed">Guiones</option>
                  <option value="dotted">Puntos</option>
                </select>
              </Field>
            </>
          )}
          <BgField value={props.backgroundColor ?? 'transparent'} onChange={onChange} />
        </>
      );

    case 'divider':
      return (
        <>
          <Field label="Color del separador">
            <input
              type="color"
              className="prop-color"
              value={props.borderColor}
              onChange={(e) => onChange({ borderColor: e.target.value })}
            />
          </Field>
          <Field label="Grosor (px)">
            <input
              type="number"
              className="prop-input"
              value={props.borderWidth ?? 1}
              onChange={(e) => onChange({ borderWidth: Number(e.target.value) })}
              min={1}
              max={12}
            />
          </Field>
          <Field label="Estilo">
            <select
              className="prop-select"
              value={props.borderStyle ?? 'solid'}
              onChange={(e) => onChange({ borderStyle: e.target.value })}
            >
              <option value="solid">Sólido</option>
              <option value="dashed">Guiones</option>
              <option value="dotted">Puntos</option>
            </select>
          </Field>
          <Field label="Margen superior (px)">
            <input
              type="number"
              className="prop-input"
              value={props.marginTop}
              onChange={(e) => onChange({ marginTop: Number(e.target.value) })}
              min={0}
              max={80}
            />
          </Field>
          <Field label="Margen inferior (px)">
            <input
              type="number"
              className="prop-input"
              value={props.marginBottom}
              onChange={(e) => onChange({ marginBottom: Number(e.target.value) })}
              min={0}
              max={80}
            />
          </Field>
          <BgField value={props.backgroundColor ?? 'transparent'} onChange={onChange} />
        </>
      );

    case 'spacer':
      return (
        <>
          <Field label="Alto (px)">
            <input
              type="number"
              className="prop-input"
              value={props.height}
              onChange={(e) => onChange({ height: Number(e.target.value) })}
              min={4}
              max={400}
            />
          </Field>
          <BgField value={props.backgroundColor ?? 'transparent'} onChange={onChange} />
        </>
      );

    case 'social':
      return <SocialForm props={props} onChange={onChange} />;

    case 'columns':
      return <ColumnsForm block={{ type, props }} onChange={onChange} />;

    default:
      return null;
  }
}

// ── Image form ───────────────────────────────────────────────────────────────

const ALIGN_OPTIONS = [
  { value: 'left',   Icon: AlignLeft },
  { value: 'center', Icon: AlignCenter },
  { value: 'right',  Icon: AlignRight },
];

function ImageForm({ props, onChange }) {
  const [galleryOpen, setGalleryOpen] = useState(false);

  const widthPercent = (() => {
    const w = String(props.width ?? '100%');
    if (w.endsWith('%')) return parseInt(w, 10) || 100;
    return 100;
  })();

  return (
    <>
      <Field label="URL de imagen">
        <input
          type="text"
          className="prop-input"
          value={props.src}
          onChange={(e) => onChange({ src: e.target.value })}
          placeholder="https://..."
        />
      </Field>
      <button className="btn-gallery" onClick={() => setGalleryOpen(true)}>
        Elegir de galería
      </button>

      <Field label={`Tamaño — ${widthPercent}%`}>
        <input
          type="range"
          className="prop-range"
          min="10"
          max="100"
          value={widthPercent}
          onChange={(e) => onChange({ width: e.target.value + '%' })}
        />
      </Field>

      <Field label="Alineación">
        <div className="align-buttons">
          {ALIGN_OPTIONS.map(({ value, Icon }) => (
            <button
              key={value}
              className={`align-btn ${props.align === value ? 'align-btn-active' : ''}`}
              onClick={() => onChange({ align: value })}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </Field>

      <Field label={`Borde redondeado — ${props.borderRadius ?? 0}px`}>
        <input
          type="range"
          className="prop-range"
          min="0"
          max="50"
          value={props.borderRadius ?? 0}
          onChange={(e) => onChange({ borderRadius: Number(e.target.value) })}
        />
      </Field>

      <Field label="Modo de ajuste">
        <div className="fit-buttons">
          {[
            { value: 'fill',       label: 'Rellenar' },
            { value: 'contain',    label: 'Contener' },
            { value: 'cover',      label: 'Cubrir' },
            { value: 'scale-down', label: 'Reducir' },
          ].map(({ value, label }) => (
            <button
              key={value}
              className={`fit-btn ${(props.objectFit ?? 'fill') === value ? 'fit-btn-active' : ''}`}
              onClick={() => onChange({ objectFit: value })}
            >
              {label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="URL de enlace (opcional)">
        <input
          type="text"
          className="prop-input"
          value={props.linkUrl}
          onChange={(e) => onChange({ linkUrl: e.target.value })}
          placeholder="https://..."
        />
      </Field>
      <Field label="Texto alternativo">
        <input
          type="text"
          className="prop-input"
          value={props.alt}
          onChange={(e) => onChange({ alt: e.target.value })}
        />
      </Field>

      <BgField value={props.backgroundColor ?? 'transparent'} onChange={onChange} />

      {galleryOpen && (
        <GalleryModal
          onSelect={(url) => onChange({ src: url })}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
}

// ── Social form ──────────────────────────────────────────────────────────────

function SocialForm({ props, onChange }) {
  function updatePlatform(name, field, value) {
    const updated = props.platforms.map((p) =>
      p.name === name ? { ...p, [field]: value } : p
    );
    onChange({ platforms: updated });
  }

  return (
    <>
      <p className="prop-section-title">Plataformas</p>
      {props.platforms.map((p) => (
        <div key={p.name} className="social-platform-row">
          <label className="social-platform-check">
            <input
              type="checkbox"
              checked={p.active}
              onChange={(e) => updatePlatform(p.name, 'active', e.target.checked)}
            />
            <span>{p.name}</span>
          </label>
          {p.active && (
            <input
              type="text"
              className="prop-input prop-input-url"
              value={p.url}
              onChange={(e) => updatePlatform(p.name, 'url', e.target.value)}
              placeholder="https://..."
            />
          )}
        </div>
      ))}

      <p className="prop-section-title" style={{ marginTop: 12 }}>Estilo</p>
      <Field label="Alineación">
        <select
          className="prop-select"
          value={props.align}
          onChange={(e) => onChange({ align: e.target.value })}
        >
          <option value="left">Izquierda</option>
          <option value="center">Centro</option>
          <option value="right">Derecha</option>
        </select>
      </Field>
      <Field label="Tamaño de íconos (px)">
        <input
          type="number"
          className="prop-input"
          value={props.size}
          onChange={(e) => onChange({ size: Number(e.target.value) })}
          min={16}
          max={80}
        />
      </Field>
      <Field label="Color de fondo ícono">
        <input
          type="color"
          className="prop-color"
          value={props.iconBg}
          onChange={(e) => onChange({ iconBg: e.target.value })}
        />
      </Field>
      <Field label="Color de texto ícono">
        <input
          type="color"
          className="prop-color"
          value={props.iconColor}
          onChange={(e) => onChange({ iconColor: e.target.value })}
        />
      </Field>
      <Field label="Border radius (px)">
        <input
          type="number"
          className="prop-input"
          value={props.borderRadius}
          onChange={(e) => onChange({ borderRadius: Number(e.target.value) })}
          min={0}
          max={50}
        />
      </Field>
      <Field label="Separación (px)">
        <input
          type="number"
          className="prop-input"
          value={props.gap}
          onChange={(e) => onChange({ gap: Number(e.target.value) })}
          min={0}
          max={40}
        />
      </Field>
      <BgField value={props.backgroundColor ?? 'transparent'} onChange={onChange} />
    </>
  );
}

// ── Columns form ─────────────────────────────────────────────────────────────

function ColumnsForm({ block, onChange }) {
  const { props } = block;
  const [selectedSub, setSelectedSub] = useState(null); // { colIdx, subBlockId }
  const [addingToCol, setAddingToCol] = useState(null); // colIdx
  const [newBlockType, setNewBlockType] = useState('text');

  function updateColCount(count) {
    const current = props.columns;
    let newCols;
    if (count > current.length) {
      newCols = [
        ...current,
        ...Array.from({ length: count - current.length }, () => ({ blocks: [] })),
      ];
    } else {
      newCols = current.slice(0, count);
    }
    if (
      selectedSub &&
      (selectedSub.colIdx >= count ||
        !newCols[selectedSub.colIdx]?.blocks.find((b) => b.id === selectedSub.subBlockId))
    ) {
      setSelectedSub(null);
    }
    onChange({ columnCount: count, columns: newCols });
  }

  function updateSubBlock(colIdx, subBlockId, newProps) {
    const newColumns = props.columns.map((col, i) => {
      if (i !== colIdx) return col;
      return {
        ...col,
        blocks: col.blocks.map((b) =>
          b.id === subBlockId ? { ...b, props: { ...b.props, ...newProps } } : b
        ),
      };
    });
    onChange({ columns: newColumns });
  }

  function deleteSubBlock(colIdx, subBlockId) {
    const newColumns = props.columns.map((col, i) => {
      if (i !== colIdx) return col;
      return { ...col, blocks: col.blocks.filter((b) => b.id !== subBlockId) };
    });
    onChange({ columns: newColumns });
    if (selectedSub?.colIdx === colIdx && selectedSub?.subBlockId === subBlockId) {
      setSelectedSub(null);
    }
  }

  function addSubBlock(colIdx) {
    const newBlock = createSubBlock(newBlockType);
    const newColumns = props.columns.map((col, i) => {
      if (i !== colIdx) return col;
      return { ...col, blocks: [...col.blocks, newBlock] };
    });
    onChange({ columns: newColumns });
    setSelectedSub({ colIdx, subBlockId: newBlock.id });
    setAddingToCol(null);
  }

  const selectedSubBlock =
    selectedSub != null
      ? props.columns[selectedSub.colIdx]?.blocks.find(
          (b) => b.id === selectedSub.subBlockId
        )
      : null;

  return (
    <>
      {/* Column layout settings */}
      <Field label="Número de columnas">
        <select
          className="prop-select"
          value={props.columnCount}
          onChange={(e) => updateColCount(Number(e.target.value))}
        >
          <option value={2}>2 columnas</option>
          <option value={3}>3 columnas</option>
          <option value={4}>4 columnas</option>
        </select>
      </Field>
      <Field label="Separación entre columnas (px)">
        <input
          type="number"
          className="prop-input"
          value={props.gap}
          onChange={(e) => onChange({ gap: Number(e.target.value) })}
          min={0}
          max={80}
        />
      </Field>
      <Field label="Alineación vertical">
        <select
          className="prop-select"
          value={props.verticalAlign}
          onChange={(e) => onChange({ verticalAlign: e.target.value })}
        >
          <option value="top">Arriba</option>
          <option value="center">Centro</option>
          <option value="bottom">Abajo</option>
        </select>
      </Field>
      <Field label="Color de fondo">
        <div className="prop-color-row">
          <input
            type="color"
            className="prop-color"
            value={props.backgroundColor === 'transparent' ? '#ffffff' : props.backgroundColor}
            onChange={(e) => onChange({ backgroundColor: e.target.value })}
          />
          <button
            className="prop-btn-clear"
            onClick={() => onChange({ backgroundColor: 'transparent' })}
          >
            Sin fondo
          </button>
        </div>
      </Field>
      <Field label="Padding (px)">
        <input
          type="number"
          className="prop-input"
          value={props.padding ?? 0}
          onChange={(e) => onChange({ padding: Number(e.target.value) })}
          min={0}
          max={80}
        />
      </Field>

      <div className="prop-section-divider" />
      <p className="prop-section-title">Contenido de columnas</p>

      {props.columns.map((col, colIdx) => (
        <div key={colIdx} className="col-editor">
          <p className="col-editor-title">Columna {colIdx + 1}</p>

          {col.blocks.map((sb) => (
            <div
              key={sb.id}
              className={`col-subblock ${
                selectedSub?.subBlockId === sb.id ? 'col-subblock-selected' : ''
              }`}
              onClick={() => setSelectedSub({ colIdx, subBlockId: sb.id })}
            >
              <span className="col-subblock-label">{BLOCK_LABELS[sb.type] || sb.type}</span>
              <button
                className="col-subblock-delete"
                title="Eliminar"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSubBlock(colIdx, sb.id);
                }}
              >
                ✕
              </button>
            </div>
          ))}

          {addingToCol === colIdx ? (
            <div className="col-add-row">
              <select
                className="prop-select"
                value={newBlockType}
                onChange={(e) => setNewBlockType(e.target.value)}
              >
                {SUB_BLOCK_TYPES.map((t) => (
                  <option key={t.type} value={t.type}>
                    {t.label}
                  </option>
                ))}
              </select>
              <div className="col-add-actions">
                <button className="col-add-confirm" onClick={() => addSubBlock(colIdx)}>
                  Agregar
                </button>
                <button className="col-add-cancel" onClick={() => setAddingToCol(null)}>
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button className="col-add-btn" onClick={() => setAddingToCol(colIdx)}>
              + Agregar bloque
            </button>
          )}
        </div>
      ))}

      {selectedSubBlock && (
        <>
          <div className="prop-section-divider" />
          <p className="prop-section-title">
            Editando: {BLOCK_LABELS[selectedSubBlock.type]}
          </p>
          <PropsForm
            block={selectedSubBlock}
            onChange={(newProps) =>
              updateSubBlock(selectedSub.colIdx, selectedSub.subBlockId, newProps)
            }
          />
        </>
      )}
    </>
  );
}
