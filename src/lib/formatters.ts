import { format } from 'date-fns';
import type { Shoe } from './types';

export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function parseCurrency(value: string): number | null {
  if (!value) return null;
  const number = Number(value.replace(/[^0-9.-]+/g, ''));
  return isNaN(number) ? null : number;
}

export function formatCollectionForSpreadsheet(shoes: Shoe[]): string {
  // Headers
  const headers = [
    'Name',
    'Brand',
    'Model',
    'Colors',
    'Nickname',
    'Purchase Date',
    'Purchase Price',
    'Last Worn',
    'Last Cleaned',
    'Wear Count'
  ].join('\t');

  // Format each shoe as a tab-separated row
  const rows = shoes.map(shoe => [
    shoe.name,
    shoe.brand,
    shoe.model,
    shoe.colors.join(' / '),
    shoe.nickname || '',
    shoe.purchase_date ? format(new Date(shoe.purchase_date), 'yyyy-MM-dd') : '',
    shoe.purchase_price ? formatCurrency(shoe.purchase_price) : '',
    shoe.last_worn ? format(new Date(shoe.last_worn), 'yyyy-MM-dd HH:mm') : '',
    shoe.last_cleaned ? format(new Date(shoe.last_cleaned), 'yyyy-MM-dd HH:mm') : '',
    shoe.wear_count
  ].join('\t'));

  return [headers, ...rows].join('\n');
}