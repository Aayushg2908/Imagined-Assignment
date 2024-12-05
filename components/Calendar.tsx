import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const Calendar = ({ selectedDate, onDateSelect }: CalendarProps) => {
  const startDate = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  const getAnimationDirection = (newIndex: number) => {
    if (previousIndex === null) return 0;
    return newIndex > previousIndex ? 20 : -20;
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center justify-between w-full max-w-sm mb-4">
        {weekDays.map((date, index) => {
          const isSelected = isSameDay(date, selectedDate);
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

          return (
            <motion.button
              key={index}
              onClick={() => {
                onDateSelect(date);
                setPreviousIndex(
                  weekDays.findIndex((d) => isSameDay(d, selectedDate))
                );
              }}
              className={`relative flex flex-col items-center p-2 rounded-lg min-w-[3rem] ${
                isPast ? "text-gray-400" : "hover:bg-gray-100"
              } ${isSelected ? "text-white" : ""}`}
            >
              {isSelected && (
                <motion.div
                  layoutId="selectedDate"
                  className="absolute inset-0 bg-black rounded-lg"
                  initial={{ x: getAnimationDirection(index) }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 text-xs uppercase">
                {format(date, "EEE").charAt(0)}
              </span>
              <span className="relative z-10 text-lg font-medium">
                {format(date, "d")}
              </span>
            </motion.button>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-2 w-full max-w-sm"></div>
    </div>
  );
};
