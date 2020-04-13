import { h, FunctionalComponent } from "preact";
import { useMemo } from "preact/hooks";

interface StackProps {
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  direction?: "row" | "col";
  className?: string;
}

const gapToClass = (gap: StackProps["gap"]): string => {
  switch (gap) {
    case 0:
      return "flg-0";
    case 1:
      return "flg-1";
    case 2:
      return "flg-2";
    case 3:
      return "flg-3";
    default:
    case 4:
      return "flg-4";
    case 5:
      return "flg-5";
    case 6:
      return "flg-6";
  }
};

const directionToDir = (direction: StackProps["direction"]): string => {
  if (direction === "row") {
    return "fld-row";
  }
  return "fld-col";
};

export const Stack: FunctionalComponent<StackProps> = ({ direction, children, gap, className }) => {
  const classes = useMemo(
    () => [directionToDir(direction), gapToClass(gap), String(className)].join(" "),
    [gap, className]
  );
  return <section class={classes}>{children}</section>;
};
