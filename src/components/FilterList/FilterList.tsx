import { h, VNode } from "preact";
import { useCallback } from "preact/hooks";
import { isIn } from "~/libraries/fns";

export interface FilterConfig<T> {
  label: string | VNode;
  value: T;
}

interface FilterListProps<T> {
  select: (t: T) => void;
  selected: T[];
  config: FilterConfig<T>[];
}

interface FilterItemProps<T> {
  select: (t: T) => void;
  selected: boolean;
  config: FilterConfig<T>;
}

const FilterItem = <T, _ = never>({ select, selected, config }: FilterItemProps<T>) => {
  const className = selected ? "ct-primary" : "ct-base";
  const handleClick = useCallback(() => select(config.value), [select, config]);
  return (
    <li class={className}>
      <a href="#" onClick={handleClick}>
        {config.label}
      </a>
    </li>
  );
};

export const FilterList = <T, _ = never>({ select, selected, config }: FilterListProps<T>) => {
  return (
    <ul>
      {config.map((config) =>
        FilterItem({ select, selected: isIn(selected)(config.value), config })
      )}
    </ul>
  );
};
