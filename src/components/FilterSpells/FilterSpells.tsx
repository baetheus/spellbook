import "./FilterSpells.scss";

import { h } from "preact";
import {
  useStore,
  filtersL,
  useDispatch,
  toggleSource,
  toggleClass,
  toggleLevel,
  Sources,
  Levels,
  Classes,
  resetFilters,
  SpellCounts,
  setSpellCount,
  showSpellCountL,
  SpellSorts,
  sortL,
  setSpellSort,
} from "~/store/spells";
import { ClassIcon } from "../SpellCard";
import { isIn } from "~/libraries/fns";
import { ordinal } from "~/libraries/numbers";
import { toSpellLevel } from "~/libraries/spells";
import { SortIcon } from "./SortIcon";

export const FiltersSpells = () => {
  const [filters] = useStore(filtersL.get);
  const [currentSort] = useStore(sortL.get);
  const [currentCount] = useStore(showSpellCountL.get);
  const [
    handleSource,
    handleClass,
    handleLevel,
    handleCount,
    handleSort,
    handleReset,
  ] = useDispatch(
    toggleSource,
    toggleClass,
    toggleLevel,
    setSpellCount,
    setSpellSort,
    resetFilters
  );

  return (
    <section class="fld-col flg-3 ai-stc">
      <button
        class="vh-1 pwy-3 pwx-4 bra-1 fld-row flg-3 ai-ctr jc-ctr ct-primary"
        aria-label="Show Everything"
        title="Show Everything"
        onClick={handleReset}
      >
        Show Everything
      </button>
      <section class="filter-list">
        {Classes.map((c) => (
          <button
            class={`vh-1 pwa-3 bra-1 fld-row flg-3 ai-ctr jc-ctr ${
              isIn(filters.class)(c) ? "ct-primary" : "ct-light"
            }`}
            aria-label={`Toggle ${c} Filter`}
            title={`Toggle ${c} Filter`}
            onClick={() => handleClass(c)}
          >
            <ClassIcon cls={c} />
            <span>{c}</span>
          </button>
        ))}
      </section>
      <section class="filter-list">
        {Levels.map((l) => (
          <button
            class={`vh-1 pwy-3 pwx-4 bra-1 fld-row flg-3 ai-ctr jc-ctr ${
              isIn(filters.level)(l) ? "ct-primary" : "ct-light"
            }`}
            aria-label={`Toggle ${ordinal(l)} Level Filter`}
            title={`Toggle ${ordinal(l)} Level Filter`}
            onClick={() => handleLevel(l)}
          >
            {toSpellLevel(l)}
          </button>
        ))}
      </section>
      <section class="filter-list">
        {Sources.map((src) => (
          <button
            class={`vh-1 pwa-3 bra-1 fld-row ai-ctr jc-ctr ${
              isIn(filters.source)(src) ? "ct-primary" : "ct-light"
            }`}
            aria-label={`Toggle ${src} Sourcebook Filter`}
            title={`Toggle ${src} Sourcebook Filter`}
            onClick={() => handleSource(src)}
          >
            {src}
          </button>
        ))}
      </section>
      <section class="filter-list">
        {SpellSorts.map((sort) => (
          <button
            class={`vh-1 pwa-3 bra-1 fld-row flg-3 ai-ctr jc-ctr ${
              sort === currentSort ? "ct-primary" : "ct-light"
            }`}
            aria-label={`Sort By ${sort}`}
            title={`Sort By ${sort}`}
            onClick={() => handleSort(sort)}
          >
            <SortIcon sort={sort} />
            <span>{sort}</span>
          </button>
        ))}
      </section>
      <section class="filter-list">
        {SpellCounts.map((count) => (
          <button
            class={`vh-1 pwa-3 bra-1 fld-row ai-ctr jc-ctr ${
              count === currentCount ? "ct-primary" : "ct-light"
            }`}
            aria-label={`Show ${count} Cards`}
            title={`Show ${count} Cards`}
            onClick={() => handleCount(count)}
          >
            Show {count}
          </button>
        ))}
      </section>
    </section>
  );
};
