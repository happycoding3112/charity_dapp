import moment from "moment";
import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  createModal: "scale-0",
  updateModal: "scale-0",
  deleteModal: "scale-0",
  fundModal: "scale-0",
  registerModal: "scale-100",
  loginModal: "scale-100",
  connectedAccount: "",
  contract: "",
  campaigns: [],
  campaign: null,
  stats: null,
  donors: [],
});

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars);
    let end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};

const daysRemaining = (days) => {
  const todaysdate = moment();
  days = Number((days + "000").slice(0));
  days = moment(days).format("YYYY-MM-DD");
  days = moment(days);
  days = days.diff(todaysdate, "days");
  return days == 1 ? "1 day" : days + " days";
};

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  truncate,
  daysRemaining,
};
