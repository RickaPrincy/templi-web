export const toSnakeCase = (value: string) =>
  value.toLowerCase().replace(/\s+/g, '-');
