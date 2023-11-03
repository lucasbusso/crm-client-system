import moment from "moment";

const formatDate = (date: string) => {
  const dateFormated = moment(date).format("DD-MM-YYYY HH:mm");
  return dateFormated;
};

export { formatDate };
