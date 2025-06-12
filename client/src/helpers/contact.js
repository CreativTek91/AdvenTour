const defaultHours = {
  start: { startHour: 8, startMin: 0 },
  end: { endHour: 16, endMin: 0 },
};

const allDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday ",
  "Saturday",
];
const initialOfficeHours = allDays.map((day) => ({
  day: "",
  start: defaultHours.start,
  end: defaultHours.end,
}));

export { defaultHours, allDays, initialOfficeHours };
