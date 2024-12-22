import { DateRange } from "../types/dateTypes";

export  const predefinedRanges: DateRange[] = [
    {
      label: "Last 7 Days",
      range: [
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(),
      ],
    },
    {
      label: "Last 30 Days",
      range: [
        new Date(new Date().setDate(new Date().getDate() - 30)),
        new Date(),
      ],
    },
  ];