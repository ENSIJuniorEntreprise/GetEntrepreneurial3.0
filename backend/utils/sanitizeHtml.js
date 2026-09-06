const sanitizeHtml = require('sanitize-html');

const OPTIONS = {
  allowedTags: ['b', 'strong', 'i', 'em', 'br', 'p', 'span', 'ul', 'ol', 'li', 'a'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    span: ['class'],
  },
};

module.exports = function sanitize(html) {
  if (!html) return '';
  return sanitizeHtml(html, OPTIONS);
};
