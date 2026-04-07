import { render } from '@react-email/render';
import { createElement } from 'react';
import EmailTemplate from '../components/EmailTemplate';

export async function renderEmailHTML(blocks) {
  return await render(createElement(EmailTemplate, { blocks }));
}
