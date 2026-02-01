export const sanitize = (str) => {
  if (!str) return '';
  
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

// Sanitize multiple fields in an object
export const sanitizeObject = (obj, fields) => {
  const sanitized = { ...obj };
  
  fields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = sanitize(sanitized[field]);
    }
  });
  
  return sanitized;
};