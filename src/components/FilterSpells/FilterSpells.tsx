import "./FilterSpells.scss";

import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
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
} from "~/store";
import { ClassIcon } from "../SpellCard";
import { isIn } from "~/libraries/fns";
import { ordinal } from "~/libraries/numbers";
import { toSpellLevel } from "~/libraries/spells";

const Filters = () => {
  const [filters] = useStore(filtersL.get);
  const [handleSource, handleClass, handleLevel] = useDispatch(
    toggleSource,
    toggleClass,
    toggleLevel
  );

  return (
    <section class="pwa-3 fld-col flg-3 ai-end">
      <section class="filter-list">
        {Classes.map((c) => (
          <button
            class={`pwa-3 bra-1 fld-row flg-3 ai-ctr jc-ctr ${
              isIn(filters.class)(c) ? "ct-primary" : "ct-light"
            }`}
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
            class={`pwy-3 pwx-4 bra-1 fld-row flg-3 ai-ctr jc-ctr ${
              isIn(filters.level)(l) ? "ct-primary" : "ct-light"
            }`}
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
            class={`pwa-3 bra-1 fld-row ai-ctr jc-ctr ${
              isIn(filters.source)(src) ? "ct-primary" : "ct-light"
            }`}
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

export const FilterSpells = () => {
  const [show, setShow] = useState(false);
  const toggleShow = useCallback(() => setShow((s) => !s), []);

  return (
    <section class="fld-col flg-4 ai-stc">
      <section class="fld-row flg-4 jc-end fs-d1 pwx-4">
        <a href="#" onClick={toggleShow}>
          {show ? "Hide Filters" : "Show Filters"}
        </a>
      </section>
      {show ? <Filters /> : null}
    </section>
  );
};
