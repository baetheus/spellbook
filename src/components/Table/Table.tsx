import "./Table.scss";

import { h, VNode } from "preact";
import { useCallback } from "preact/hooks";
import { nil } from "~/libraries/fns";

/**
 * Types
 */
type Comparison = -1 | 0 | 1;
type Sort<T> = (a: T, b: T) => Comparison;

export interface ColumnConfig<T> {
  readonly key: keyof T;
  readonly heading: string | VNode;
  readonly format?: (t: T) => string | VNode;
  readonly sort?: Sort<T>;
}

/**
 * Helper Components
 */
interface RowProps<T> {
  select: (item: T) => void;
  columns: ColumnConfig<T>[];
}

const Row = <T, _ = never>({ select, columns }: RowProps<T>) => (item: T) => {
  const handler = useCallback(() => select(item), [select, item]);
  return (
    <section
      onClick={handler}
      class="table-row ct-light ct-secondary-on-hover pwx-4 bwa-1 bra-1 crsr-pointer"
    >
      {columns.map((c) => (
        <section class="table-data">{c.format ? c.format(item) : String(item[c.key])}</section>
      ))}
    </section>
  );
};

const reverseSort = <T, _ = never>(s?: Sort<T>): undefined | Sort<T> => {
  if (nil(s)) {
    return;
  }
  return (a: T, b: T): Comparison => (-1 * s(a, b)) as Comparison;
};

const SortButtons = <T, _ = never>({
  config,
  setSort,
}: {
  config: ColumnConfig<T>;
  setSort: (s?: Sort<T>) => void;
}) => {
  const handleAscendingSort = useCallback(() => setSort(config.sort), [config.sort]);
  const handleDescendingSort = useCallback(() => setSort(reverseSort(config.sort)), [config.sort]);

  if (nil(config.sort)) {
    return null;
  }

  return (
    <span class="fld-row flg-2 fs-d2">
      <button class="ds-in pwa-0 pwx-4" onClick={handleAscendingSort}>
        &#9650;
      </button>
      <button class="ds-in pwa-0 pwx-4" onClick={handleDescendingSort}>
        &#9660;
      </button>
    </span>
  );
};

const Header = <T, _ = never>({
  columns,
  setSort,
}: {
  columns: ColumnConfig<T>[];
  setSort: (s?: Sort<T>) => void;
}) => (
  <section class="table-header">
    {columns.map((c) => (
      <section class="table-data">
        <span class="fld-row flg-4">
          <span>{c.heading}</span>
          <SortButtons<T> config={c} setSort={setSort}></SortButtons>
        </span>
      </section>
    ))}
  </section>
);

/**
 * Primary Export
 */
interface TableProps<T> {
  select: (item: T) => void;
  setSort: (s?: Sort<T>) => void;
  columns: ColumnConfig<T>[];
  items: T[];
}

export const Table = <T, _ = never>({ select, columns, items, setSort }: TableProps<T>) => {
  if (items.length) {
    return (
      <article class="table ovx-auto fs-d2 vw-p100">
        <Header columns={columns} setSort={setSort}></Header>
        {items.map(Row({ columns, select }))}
      </article>
    );
  }
  return null;
};
