export function formatQuantity(number) {
  const lastOne = Number(number.toString().slice(-1));
  if (number > 4 && number < 21) return 'товаров';
  if ([2, 3, 4].indexOf(lastOne) >= 0) return 'товара';
  if (lastOne === 1) return 'товар';
  return 'товаров';
}
