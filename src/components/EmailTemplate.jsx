import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Img,
  Button,
  Hr,
  Preview,
} from '@react-email/components';

const SOCIAL_ICONS = {
  Facebook: 'f',
  Instagram: '◉',
  Twitter: '✗',
  LinkedIn: 'in',
  YouTube: '▶',
  WhatsApp: '✆',
};


export default function EmailTemplate({ blocks }) {
  return (
    <Html>
      <Head />
      <Preview>Email</Preview>
      <Body
        style={{
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f5f5f5',
          margin: 0,
          padding: '20px 0',
        }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            maxWidth: '600px',
            margin: '0 auto',
            padding: 0,
          }}
        >
          {blocks.map((block) => (
            <BlockToEmail key={block.id} block={block} />
          ))}
        </Container>
      </Body>
    </Html>
  );
}

function BlockToEmail({ block, insideColumn = false }) {
  const { type, props } = block;
  const bg =
    props.backgroundColor && props.backgroundColor !== 'transparent'
      ? props.backgroundColor
      : undefined;

  const content = renderBlockContent(type, props, insideColumn);

  // Skip blocks with no content AND no background
  if (!content && !bg) return null;

  return (
    <div style={{ backgroundColor: bg || undefined, width: '100%' }}>
      {content}
    </div>
  );
}

function renderBlockContent(type, props, insideColumn = false) {
  const hPad = insideColumn ? 0 : 24;
  const vPad = insideColumn ? 4 : 10;
  const blockPadding = `${vPad}px ${hPad}px`;

  switch (type) {
    case 'heading':
    case 'text':
      return (
        <Text
          style={{
            fontSize: props.fontSize,
            color: props.color,
            textAlign: props.textAlign,
            fontWeight: props.fontWeight,
            fontFamily: props.fontFamily || 'Arial, sans-serif',
            lineHeight: String(props.lineHeight ?? 1.6),
            margin: 0,
            padding: props.padding ? `${props.padding}px ${hPad}px` : blockPadding,
          }}
        >
          {props.content}
        </Text>
      );

    case 'image': {
      if (!props.src) return null;
      const align = props.align || 'center';
      const tableAlign = align === 'right' ? 'right' : align === 'center' ? 'center' : 'left';
      const imgEl = (
        <Img
          src={props.src}
          alt={props.alt}
          width={insideColumn ? '100%' : props.width}
          style={{
            display: 'block',
            maxWidth: '100%',
            borderRadius: props.borderRadius ? `${props.borderRadius}px` : undefined,
          }}
        />
      );
      return (
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ padding: blockPadding }}>
          <tbody>
            <tr>
              <td align={tableAlign}>
                {props.linkUrl ? (
                  <a href={props.linkUrl} style={{ display: 'inline-block' }}>
                    {imgEl}
                  </a>
                ) : (
                  imgEl
                )}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    case 'button':
      return (
        <div style={{ textAlign: props.align, padding: blockPadding }}>
          <Button
            href={props.href}
            style={{
              backgroundColor: props.buttonColor,
              color: props.color,
              borderRadius: props.borderRadius,
              padding: `${props.paddingV ?? 12}px ${props.paddingH ?? 24}px`,
              fontSize: props.fontSize ?? 16,
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-block',
              border: props.borderWidth
                ? `${props.borderWidth}px ${props.borderStyle} ${props.borderColor}`
                : 'none',
            }}
          >
            {props.text}
          </Button>
        </div>
      );

    case 'divider':
      return (
        <div style={{ padding: `${props.marginTop ?? 16}px 0 ${props.marginBottom ?? 16}px` }}>
          <Hr
            style={{
              border: 'none',
              borderTop: `${props.borderWidth ?? 1}px ${props.borderStyle ?? 'solid'} ${props.borderColor}`,
              margin: 0,
            }}
          />
        </div>
      );

    case 'spacer':
      return (
        <div
          style={{
            height: props.height,
            fontSize: 0,
            lineHeight: 0,
          }}
        >
          &nbsp;
        </div>
      );

    case 'social': {
      const active = props.platforms.filter((p) => p.active);
      if (active.length === 0) return null;
      const iconSize = props.size ?? 36;
      return (
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ padding: blockPadding }}
        >
          <tbody>
            <tr>
              <td align={props.align || 'center'}>
                <table cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      {active.map((platform, i) => (
                        <td
                          key={platform.name}
                          style={{ paddingLeft: i > 0 ? props.gap ?? 8 : 0 }}
                        >
                          <a
                            href={platform.url}
                            title={platform.name}
                            style={{
                              display: 'inline-block',
                              width: iconSize,
                              height: iconSize,
                              backgroundColor: props.iconBg,
                              color: props.iconColor,
                              borderRadius: props.borderRadius ?? 6,
                              fontSize: Math.floor(iconSize * 0.4),
                              fontWeight: 'bold',
                              textDecoration: 'none',
                              textAlign: 'center',
                              lineHeight: `${iconSize}px`,
                              fontFamily: 'Arial, sans-serif',
                            }}
                          >
                            {SOCIAL_ICONS[platform.name] || platform.name[0]}
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    case 'columns': {
      const { columns, gap, backgroundColor, padding, verticalAlign } = props;
      const colCount = columns.length;
      if (colCount === 0) return null;
      const colPct = Math.floor(100 / colCount);
      return (
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{
            backgroundColor:
              backgroundColor === 'transparent' ? undefined : backgroundColor,
          }}
        >
          <tbody>
            <tr>
              {columns.map((col, i) => (
                <td
                  key={i}
                  width={`${colPct}%`}
                  style={{
                    verticalAlign:
                      verticalAlign === 'center'
                        ? 'middle'
                        : verticalAlign === 'bottom'
                        ? 'bottom'
                        : 'top',
                    paddingLeft: i === 0 ? (padding ?? 16) : Math.floor((gap ?? 16) / 2),
                    paddingRight: i === colCount - 1 ? (padding ?? 16) : Math.floor((gap ?? 16) / 2),
                    paddingTop: padding ?? 8,
                    paddingBottom: padding ?? 8,
                  }}
                >
                  {col.blocks.map((subBlock) => (
                    <BlockToEmail key={subBlock.id} block={subBlock} insideColumn />
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      );
    }

    default:
      return null;
  }
}
