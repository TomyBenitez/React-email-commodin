const DEFAULT_PROPS = {
  heading: {
    content: 'Título del email',
    fontSize: 28,
    color: '#111111',
    textAlign: 'left',
    fontWeight: 'bold',
    lineHeight: 1.4,
    padding: 0,
    backgroundColor: 'transparent',
    fontFamily: 'Arial, sans-serif',
  },
  text: {
    content: 'Escribe tu mensaje aquí.',
    fontSize: 16,
    color: '#333333',
    textAlign: 'left',
    fontWeight: 'normal',
    lineHeight: 1.6,
    padding: 0,
    backgroundColor: 'transparent',
    fontFamily: 'Arial, sans-serif',
  },
  image: {
    src: '',
    alt: 'Imagen',
    width: '100%',
    align: 'center',
    linkUrl: '',
    borderRadius: 0,
    objectFit: 'fill',
  },
  button: {
    text: 'Hacer click aquí',
    href: '#',
    backgroundColor: '#0066cc',
    color: '#ffffff',
    borderRadius: 6,
    align: 'center',
    paddingH: 24,
    paddingV: 12,
    fontSize: 16,
    borderWidth: 0,
    borderColor: '#0066cc',
    borderStyle: 'solid',
  },
  divider: {
    borderColor: '#dddddd',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  spacer: {
    height: 32,
    backgroundColor: 'transparent',
  },
  social: {
    platforms: [
      { name: 'Facebook', url: '#', active: true },
      { name: 'Instagram', url: '#', active: true },
      { name: 'Twitter', url: '#', active: false },
      { name: 'LinkedIn', url: '#', active: false },
      { name: 'YouTube', url: '#', active: false },
      { name: 'WhatsApp', url: '#', active: false },
    ],
    align: 'center',
    size: 36,
    iconBg: '#333333',
    iconColor: '#ffffff',
    gap: 8,
    borderRadius: 6,
  },
  columns: {
    columnCount: 2,
    gap: 16,
    backgroundColor: 'transparent',
    padding: 0,
    verticalAlign: 'top',
    columns: [],
  },
};

// ── Template config factories (called fresh each time to get unique IDs) ──

function sub(type, customProps = {}) {
  return {
    id: crypto.randomUUID(),
    type,
    props: { ...DEFAULT_PROPS[type], ...customProps },
  };
}

function makeHeroConfig() {
  return {
    columnCount: 2,
    gap: 24,
    columns: [
      {
        blocks: [
          sub('heading', { content: 'Título Principal', fontSize: 26 }),
          sub('text', { content: 'Agrega tu descripción aquí. Este es el texto de ejemplo para el bloque hero.' }),
          sub('button', { text: 'Ver más', href: '#' }),
        ],
      },
      {
        blocks: [
          sub('image', { src: '', alt: 'Imagen hero', width: '100%' }),
        ],
      },
    ],
  };
}

function makeCardsConfig() {
  return {
    columnCount: 3,
    gap: 16,
    columns: [
      {
        blocks: [
          sub('heading', { content: 'Característica 1', fontSize: 18 }),
          sub('text', { content: 'Descripción de la primera característica.', fontSize: 14 }),
        ],
      },
      {
        blocks: [
          sub('heading', { content: 'Característica 2', fontSize: 18 }),
          sub('text', { content: 'Descripción de la segunda característica.', fontSize: 14 }),
        ],
      },
      {
        blocks: [
          sub('heading', { content: 'Característica 3', fontSize: 18 }),
          sub('text', { content: 'Descripción de la tercera característica.', fontSize: 14 }),
        ],
      },
    ],
  };
}

function makeGalleryConfig() {
  return {
    columnCount: 3,
    gap: 12,
    columns: [
      {
        blocks: [
          sub('image', { src: '', alt: 'Imagen 1', width: '100%' }),
          sub('text', { content: 'Descripción 1', fontSize: 13, textAlign: 'center' }),
        ],
      },
      {
        blocks: [
          sub('image', { src: '', alt: 'Imagen 2', width: '100%' }),
          sub('text', { content: 'Descripción 2', fontSize: 13, textAlign: 'center' }),
        ],
      },
      {
        blocks: [
          sub('image', { src: '', alt: 'Imagen 3', width: '100%' }),
          sub('text', { content: 'Descripción 3', fontSize: 13, textAlign: 'center' }),
        ],
      },
    ],
  };
}

function makeImgTextConfig() {
  return {
    columnCount: 2,
    gap: 24,
    columns: [
      {
        blocks: [
          sub('image', { src: '', alt: 'Imagen', width: '100%' }),
        ],
      },
      {
        blocks: [
          sub('heading', { content: 'Título de sección', fontSize: 22 }),
          sub('text', { content: 'Descripción de contenido. Escribe aquí el texto que acompaña a la imagen.' }),
          sub('button', { text: 'Leer más', href: '#', align: 'left' }),
        ],
      },
    ],
  };
}

// ── Exported block categories for sidebar ──

export const BLOCK_CATEGORIES = [
  {
    label: 'Básico',
    blocks: [
      { id: 'heading', type: 'heading', label: 'Título', icon: 'heading' },
      { id: 'text', type: 'text', label: 'Texto', icon: 'text' },
      { id: 'image', type: 'image', label: 'Imagen', icon: 'image' },
      { id: 'button', type: 'button', label: 'Botón', icon: 'button' },
      { id: 'divider', type: 'divider', label: 'Separador', icon: 'divider' },
      { id: 'spacer', type: 'spacer', label: 'Espacio', icon: 'spacer' },
      { id: 'social', type: 'social', label: 'Redes', icon: 'social' },
    ],
  },
  {
    label: 'Columnas',
    blocks: [
      { id: 'columns2', type: 'columns', label: '2 Columnas', icon: 'columns2', config: { columnCount: 2 } },
      { id: 'columns3', type: 'columns', label: '3 Columnas', icon: 'columns3', config: { columnCount: 3 } },
    ],
  },
  {
    label: 'Plantillas',
    blocks: [
      { id: 'tpl-hero', type: 'columns', label: 'Hero', icon: 'tpl-hero', makeConfig: makeHeroConfig },
      { id: 'tpl-cards', type: 'columns', label: 'Tarjetas', icon: 'tpl-cards', makeConfig: makeCardsConfig },
      { id: 'tpl-gallery', type: 'columns', label: 'Galería', icon: 'tpl-gallery', makeConfig: makeGalleryConfig },
      { id: 'tpl-imgtext', type: 'columns', label: 'Img + Texto', icon: 'tpl-imgtext', makeConfig: makeImgTextConfig },
    ],
  },
];

// Flat list (used by other components)
export const BLOCK_TYPES = BLOCK_CATEGORIES.flatMap((c) => c.blocks);

// Types allowed as sub-blocks inside columns
export const SUB_BLOCK_TYPES = [
  { type: 'heading', label: 'Título' },
  { type: 'text', label: 'Texto' },
  { type: 'image', label: 'Imagen' },
  { type: 'button', label: 'Botón' },
  { type: 'divider', label: 'Separador' },
  { type: 'spacer', label: 'Espacio' },
];

export function createBlock(type, config = {}) {
  let props;
  if (type === 'columns') {
    const count = config.columnCount ?? DEFAULT_PROPS.columns.columnCount;
    const cols =
      config.columns && config.columns.length === count
        ? config.columns
        : Array.from(
            { length: count },
            (_, i) => config.columns?.[i] || { blocks: [] }
          );
    props = { ...DEFAULT_PROPS.columns, ...config, columnCount: count, columns: cols };
  } else {
    props = { ...DEFAULT_PROPS[type], ...config };
  }
  return { id: crypto.randomUUID(), type, props };
}

export function createSubBlock(type) {
  return { id: crypto.randomUUID(), type, props: { ...DEFAULT_PROPS[type] } };
}
