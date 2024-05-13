const FormatDateTime = (date) => {
  const time = new Date(date);
  //format date
  const formattedDate = time.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  //format Time
  let hours = time.getHours();
  const minutes = time.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
  return { formattedDate, formattedTime };
};

export default FormatDateTime;
