import "./FilterList.scss";

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
  const className = selected ? "ct-primary ct-secondary-on-hover" : "ct-light ct-primary-on-hover";
  const handleClick = useCallback(() => select(config.value), [select, config]);
  return (
    <li>
      <button class={`${className} bwa-0 pwy-2 pwx-3 bra-1 ta-c`} onClick={handleClick}>
        {config.label}
      </button>
    </li>
  );
};

export const FilterList = <T, _ = never>({ select, selected, config }: FilterListProps<T>) => {
  return (
    <ul class="filter-list fs-d1">
      {config.map((config) =>
        FilterItem({ select, selected: isIn(selected)(config.value), config })
      )}
    </ul>
  );
};
