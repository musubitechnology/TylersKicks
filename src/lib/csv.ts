import { Shoe } from './types';
import { parseCurrency } from './formatters';

export const CSV_HEADERS = [
  'Name',
  'Model',
  'Colors (separated by /)',
  'Category',
  'Nickname (optional)',
  'Purchase Date (YYYY-MM-DD)',
  'Purchase Price (optional)',
];

export function generateEmptyCSV(): string {
  return CSV_HEADERS.join(',') + '\n';
}

export async function parseCSVFile(file: File): Promise<Partial<Shoe>[]> {
  const text = await file.text();
  const lines = text.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    return {
      name: values[0],
      model: values[1],
      colors: values[2].split('/').map(c => c.trim()),
      category: values[3] as Shoe['category'],
      nickname: values[4] || null,
      purchase_date: values[5] || null,
      purchase_price: values[6] ? parseCurrency(values[6]) : null,
    };
  });
}