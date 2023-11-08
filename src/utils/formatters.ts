import moment from "moment";

const formatDate = (date: string): string => {
  const formatedDate = moment(date).format("DD-MM-YYYY HH:mm");
  return formatedDate;
};

const formatPrice = (price: string): string => {
  const currency = Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const formatedPrice = currency.format(Number(price));
  return formatedPrice;
};

export { formatDate, formatPrice };
