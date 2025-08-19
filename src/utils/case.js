const toCamel = (s) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

function keysToCamel(input) {
  if (Array.isArray(input)) return input.map(keysToCamel);
  if (input && typeof input === 'object') {
    return Object.fromEntries(
      Object.entries(input).map(([k, v]) => [toCamel(k), keysToCamel(v)])
    );
  }
  return input;
}

module.exports = { keysToCamel };
