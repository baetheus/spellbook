import "./Table.scss";

import { h, VNode } from "preact";
import { useCallback } from "preact/hooks";

/**
 * Types
 */
type Comparison = -1 | 0 | 1;

export interface ColumnConfig<T> {
  readonly key: keyof T;
  readonly heading: string | VNode;
  readonly format?: (t: T) => string;
  readonly sort?: (a: T, b: T) => Comparison;
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
    <section onClick={handler} class="table-row ct-light-on-hover">
      {columns.map((c) => (
        <section class="table-data">{c.format ? c.format(item) : String(item[c.key])}</section>
      ))}
    </section>
  );
};

const Header = <T, _ = never>({ columns }: { columns: ColumnConfig<T>[] }) => (
  <section class="table-header">
    {columns.map((c) => (
      <section class="table-data">{c.heading}</section>
    ))}
  </section>
);

/**
 * Primary Export
 */
interface TableProps<T> {
  select: (item: T) => void;
  columns: ColumnConfig<T>[];
  items: T[];
}

export const Table = <T, _ = never>({ select, columns, items }: TableProps<T>) => {
  if (items.length) {
    return (
      <article class="table ovx-auto fs-d2 vw-p100">
        <Header columns={columns}></Header>
        {items.map(Row({ columns, select }))}
      </article>
    );
  }
  return null;
};
