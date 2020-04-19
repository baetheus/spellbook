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
} from "~/store";
import { ClassIcon } from "../SpellCard";
import { isIn } from "~/libraries/fns";
import { ordinal } from "~/libraries/numbers";
import { toSpellLevel } from "~/libraries/spells";

export const FiltersSpells = () => {
  const [filters] = useStore(filtersL.get);
  const [handleSource, handleClass, handleLevel, handleReset] = useDispatch(
    toggleSource,
    toggleClass,
    toggleLevel,
    resetFilters
  );

  return (
    <section class="fld-col flg-3 ai-stc">
      <button
        class="vh-1 pwy-3 pwx-4 bra-1 fld-row flg-3 ai-ctr jc-ctr ct-primary"
        label="Show Everything"
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
            label={`Toggle ${c} Filter`}
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
            label={`Toggle ${ordinal(l)} Level Filter`}
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
            label={`Toggle ${src} Sourcebook Filter`}
            title={`Toggle ${src} Sourcebook Filter`}
            onClick={() => handleSource(src)}
          >
            {src}
          </button>
        ))}
      </section>
    </section>
  );
};
