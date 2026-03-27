const SOCIAL_ICONS = {
  Facebook: 'f',
  Instagram: '◉',
  Twitter: '✗',
  LinkedIn: 'in',
  YouTube: '▶',
  WhatsApp: '✆',
};

export default function BlockRenderer({ block }) {
  const { type, props } = block;

  switch (type) {
    case 'heading':
    case 'text':
      return (
        <p
          style={{
            fontSize: props.fontSize,
            color: props.color,
            textAlign: props.textAlign,
            fontWeight: props.fontWeight,
            fontFamily: props.fontFamily,
            lineHeight: props.lineHeight,
            margin: 0,
            padding: props.padding || 0,
            backgroundColor:
              props.backgroundColor === 'transparent' ? undefined : props.backgroundColor,
            whiteSpace: 'pre-wrap',
          }}
        >
          {props.content || (type === 'heading' ? 'Título...' : 'Texto...')}
        </p>
      );

    case 'image': {
      const imgEl = props.src ? (
        <img
          src={props.src}
          alt={props.alt}
          style={{ display: 'block', width: props.width, maxWidth: '100%' }}
        />
      ) : (
        <div className="image-placeholder">
          <span>Añade una URL de imagen en las propiedades</span>
        </div>
      );
      return (
        <div style={{ textAlign: props.align || 'center' }}>
          {props.linkUrl ? (
            <a href={props.linkUrl} style={{ display: 'inline-block' }}>
              {imgEl}
            </a>
          ) : (
            imgEl
          )}
        </div>
      );
    }

    case 'button':
      return (
        <div style={{ textAlign: props.align }}>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: props.backgroundColor,
              color: props.color,
              borderRadius: props.borderRadius,
              padding: `${props.paddingV ?? 12}px ${props.paddingH ?? 24}px`,
              fontSize: props.fontSize ?? 16,
              fontWeight: 'bold',
              cursor: 'default',
              border: props.borderWidth
                ? `${props.borderWidth}px ${props.borderStyle} ${props.borderColor}`
                : 'none',
            }}
          >
            {props.text || 'Botón'}
          </span>
        </div>
      );

    case 'divider':
      return (
        <hr
          style={{
            border: 'none',
            borderTop: `${props.borderWidth ?? 1}px ${props.borderStyle ?? 'solid'} ${props.borderColor}`,
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
          }}
        />
      );

    case 'spacer':
      return (
        <div
          style={{
            height: props.height,
            backgroundColor:
              props.backgroundColor === 'transparent' ? undefined : props.backgroundColor,
          }}
        />
      );

    case 'social': {
      const active = props.platforms.filter((p) => p.active);
      return (
        <div
          style={{
            textAlign: props.align,
            display: 'flex',
            justifyContent:
              props.align === 'center'
                ? 'center'
                : props.align === 'right'
                ? 'flex-end'
                : 'flex-start',
            gap: props.gap,
            flexWrap: 'wrap',
          }}
        >
          {active.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              title={platform.name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: props.size,
                height: props.size,
                backgroundColor: props.iconBg,
                color: props.iconColor,
                borderRadius: props.borderRadius,
                fontSize: Math.floor(props.size * 0.4),
                fontWeight: 'bold',
                textDecoration: 'none',
                userSelect: 'none',
                flexShrink: 0,
              }}
            >
              {SOCIAL_ICONS[platform.name] || platform.name[0]}
            </a>
          ))}
          {active.length === 0 && (
            <span style={{ color: '#aaa', fontSize: 13 }}>
              Activá plataformas en las propiedades
            </span>
          )}
        </div>
      );
    }

    case 'columns': {
      const { columns, gap, backgroundColor, verticalAlign, padding } = props;
      return (
        <div
          style={{
            display: 'flex',
            gap,
            backgroundColor:
              backgroundColor === 'transparent' ? undefined : backgroundColor,
            padding: padding || 0,
            alignItems:
              verticalAlign === 'center'
                ? 'center'
                : verticalAlign === 'bottom'
                ? 'flex-end'
                : 'flex-start',
          }}
        >
          {columns.map((col, i) => (
            <div key={i} style={{ flex: 1, minWidth: 0 }}>
              {col.blocks.length === 0 ? (
                <div className="column-empty-placeholder">
                  <span>Columna {i + 1} vacía</span>
                </div>
              ) : (
                col.blocks.map((subBlock) => (
                  <div key={subBlock.id} style={{ marginBottom: 8 }}>
                    <BlockRenderer block={subBlock} />
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}
