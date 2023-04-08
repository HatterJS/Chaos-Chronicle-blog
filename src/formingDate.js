export function formingDate(date) {
  const formatedDate = new Date(date);
  const month = {
    0: "січня",
    1: "лютого",
    2: "березня",
    3: "квітня",
    4: "травня",
    5: "червня",
    6: "липня",
    7: "серпня",
    8: "вересня",
    9: "жовтня",
    10: "листопада",
    11: "грудня",
  };
  return (
    formatedDate.getDate() +
    " " +
    month[formatedDate.getMonth()] +
    " " +
    formatedDate.getFullYear()
  );
}
