export const numberFormat = (number: number): string => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
}).format(number)
