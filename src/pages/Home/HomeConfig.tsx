import { ColumnConfig } from "~/components/Table";
import { h } from "preact";
import { FilterConfig } from "~/components/FilterList";
import {
  Spell,
  Class,
  Classes,
  Source,
  Sources,
  School,
  Schools,
  Level,
  Levels,
} from "~/store/spells";
import { ordinal, toComparison } from "~/libraries/numbers";

export const spellTableColumns: ColumnConfig<Spell>[] = [
  {
    key: "name",
    heading: <span class="fs-u1 fw-u2">Name</span>,
    format: (s) => <span>{s.name}</span>,
    sort: (a, b) => toComparison(a.name.localeCompare(b.name)),
  },
  {
    key: "level",
    heading: <span class="fs-u1 fw-u2">Level</span>,
    format: (s) => {
      if (s.level === 0) {
        return (
          <span>
            <span class="ds-no ds-sm-in">0</span>
            <span class="ds-in ds-sm-no">Cantrip</span>
          </span>
        );
      }
      return (
        <span>
          <span class="ds-in ds-sm-no fw-u2">Level </span> {s.level}
        </span>
      );
    },
    sort: (a, b) => toComparison(a.level - b.level),
  },
  {
    key: "class",
    heading: <span class="fs-u1 fw-u2">Classes</span>,
    format: (s) => (
      <span>
        <span class="ds-in ds-sm-no fw-u2">Classes: </span> {s.class.sort().join(", ")}
      </span>
    ),
  },
  {
    key: "school",
    heading: <span class="fs-u1 fw-u2">School</span>,
    format: (s) => (
      <span>
        <span class="ds-in ds-sm-no fw-u2">School: </span> {s.school}
      </span>
    ),
  },
];

export const classFilterConfig: FilterConfig<Class>[] = Classes.map((value) => ({
  value,
  label: value,
}));
export const sourceFilterConfig: FilterConfig<Source>[] = Sources.map((value) => ({
  value,
  label: value,
}));
export const schoolFilterConfig: FilterConfig<School>[] = Schools.map((value) => ({
  value,
  label: value,
}));
export const levelFilterConfig: FilterConfig<Level>[] = Levels.map((value) => ({
  value,
  label: value === 0 ? "Cantrip" : `${ordinal(value)} Level`,
}));
