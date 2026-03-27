import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import EmailTemplate from '../components/EmailTemplate';

export function renderEmailHTML(blocks) {
  const markup = renderToStaticMarkup(
    createElement(EmailTemplate, { blocks })
  );
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n${markup}`;
}
