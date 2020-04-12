import { ColumnConfig } from "~/components/Table";
import { h } from "preact";
import { FilterConfig } from "~/components/FilterList";
import { Spell, Class, Classes } from "~/store/spells";

export const spellTableColumns: ColumnConfig<Spell>[] = [
  { key: "level", heading: <span class="fs-u1 fw-u2">Level</span> },
  { key: "name", heading: <span class="fs-u1 fw-u2">Name</span> },
  {
    key: "class",
    heading: <span class="fs-u1 fw-u2">Classes</span>,
    format: (s) => s.class.sort().join(", "),
  },
  {
    key: "school",
    heading: <span class="fs-u1 fw-u2">School</span>,
  },
];

export const classFilterConfig: FilterConfig<Class>[] = Classes.map((value) => ({
  value,
  label: value,
}));
