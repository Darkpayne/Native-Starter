export const formatCurrencyNaira = (amount) => {
  return (
    "₦" +
    // @ts-ignore
    parseFloat(amount)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
  );
};
