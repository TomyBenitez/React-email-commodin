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
            padding: '24px',
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

function BlockToEmail({ block }) {
  const { type, props } = block;

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
            margin: '0 0 16px',
            padding: props.padding ? String(props.padding) + 'px' : '0',
            backgroundColor:
              props.backgroundColor === 'transparent' ? undefined : props.backgroundColor,
          }}
        >
          {props.content}
        </Text>
      );

    case 'image': {
      const imgEl = props.src ? (
        <Img
          src={props.src}
          alt={props.alt}
          width={props.width}
          style={{ display: 'block', margin: '0 auto 16px' }}
        />
      ) : null;
      if (!imgEl) return null;
      if (props.linkUrl) {
        return (
          <div style={{ textAlign: props.align || 'center', marginBottom: 16 }}>
            <a href={props.linkUrl} style={{ display: 'inline-block' }}>
              {imgEl}
            </a>
          </div>
        );
      }
      return (
        <div style={{ textAlign: props.align || 'center', marginBottom: 16 }}>
          {imgEl}
        </div>
      );
    }

    case 'button':
      return (
        <div style={{ textAlign: props.align, margin: '0 0 16px' }}>
          <Button
            href={props.href}
            style={{
              backgroundColor: props.backgroundColor,
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
        <Hr
          style={{
            borderColor: props.borderColor,
            borderStyle: props.borderStyle ?? 'solid',
            borderTopWidth: props.borderWidth ?? 1,
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
            fontSize: 0,
            lineHeight: 0,
            backgroundColor:
              props.backgroundColor === 'transparent' ? undefined : props.backgroundColor,
          }}
        >
          &nbsp;
        </div>
      );

    case 'html':
      return (
        <div
          dangerouslySetInnerHTML={{ __html: props.code }}
          style={{ marginBottom: 16 }}
        />
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
          style={{ marginBottom: 16 }}
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
      const { columns, gap, backgroundColor, padding } = props;
      const colCount = columns.length;
      if (colCount === 0) return null;
      const colPct = Math.floor(100 / colCount);
      return (
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{
            marginBottom: 16,
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
                    verticalAlign: props.verticalAlign === 'center' ? 'middle' : props.verticalAlign === 'bottom' ? 'bottom' : 'top',
                    paddingLeft: i > 0 ? Math.floor((gap ?? 16) / 2) : (padding ?? 0),
                    paddingRight: i < colCount - 1 ? Math.floor((gap ?? 16) / 2) : (padding ?? 0),
                    paddingTop: padding ?? 0,
                    paddingBottom: padding ?? 0,
                  }}
                >
                  {col.blocks.map((subBlock) => (
                    <BlockToEmail key={subBlock.id} block={subBlock} />
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
