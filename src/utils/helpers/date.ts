import { format } from "date-fns";
import { pt } from "date-fns/locale";
import Holidays from "date-holidays";

const holidays = new Holidays("BR");
const currentYear = new Date().getFullYear();

const holidayDates = holidays
  .getHolidays(currentYear)
  .map((holiday) => new Date(holiday.date));

const isBusinessDay = (date: Date) => {
  const day = date.getDay();
  return (
    day !== 0 &&
    !holidayDates.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getFullYear() === date.getFullYear()
    )
  );
};

const addBusinessDaysWithHolidays = (date: Date, daysToAdd: number) => {
  let currentDate = date;
  let daysAdded = 0;

  while (daysAdded < daysToAdd) {
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    if (isBusinessDay(currentDate)) {
      daysAdded++;
    }
  }

  return currentDate;
};

export const getDeliveryDate = () => {
  const deliveryDate = addBusinessDaysWithHolidays(new Date(), 3);
  return format(deliveryDate, "PPP", { locale: pt });
};
