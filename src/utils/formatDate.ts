import moment from "moment";

const formatDate = (date: string) => {
  const dateFormated = moment(date).format("YYYY-MM-DD HH:mm:ss");
  return dateFormated;
};

export { formatDate };
