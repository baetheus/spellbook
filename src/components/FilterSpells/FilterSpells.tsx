import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import {
  useStore,
  filtersL,
  useDispatch,
  toggleSource,
  toggleClass,
  toggleSchool,
  toggleLevel,
  Schools,
  Sources,
  Levels,
  Classes,
} from "~/store";
import { SchoolIcon, ClassIcon } from "../SpellCard";
import { isIn } from "~/libraries/fns";
import { split } from "~/libraries/arrays";
import { ordinal } from "~/libraries/numbers";

const [front, back] = split(Classes);

const Filters = () => {
  const [filters] = useStore(filtersL.get);
  const [handleSource, handleClass, handleSchool, handleLevel] = useDispatch(
    toggleSource,
    toggleClass,
    toggleSchool,
    toggleLevel
  );

  return (
    <section class="pwa-3 fld-col flg-3 ai-end">
      <section class="fld-row flg-3 fs-u1">
        {front.map((c) => (
          <button
            class={`pwa-3 bra-1 fld-row ai-ctr jc-ctr ${
              isIn(filters.class)(c) ? "ct-primary" : "ct-light"
            }`}
            title={`Toggle ${c} Filter`}
            onClick={() => handleClass(c)}
          >
            <ClassIcon cls={c} />
          </button>
        ))}
      </section>
      <section class="fld-row flg-3 fs-u1">
        {back.map((c) => (
          <button
            class={`pwa-3 bra-1 fld-row ai-ctr jc-ctr ${
              isIn(filters.class)(c) ? "ct-primary" : "ct-light"
            }`}
            title={`Toggle ${c} Filter`}
            onClick={() => handleClass(c)}
          >
            <ClassIcon cls={c} />
          </button>
        ))}
      </section>
      <section class="fld-row flg-3 fs-u1">
        {Schools.map((s) => (
          <button
            class={`pwa-3 bra-1 fld-row ai-ctr jc-ctr ${
              isIn(filters.school)(s) ? "ct-primary" : "ct-light"
            }`}
            title={`Toggle ${s} Filter`}
            onClick={() => handleSchool(s)}
          >
            <SchoolIcon school={s} />
          </button>
        ))}
      </section>
      <section class="fld-row flg-3">
        {Levels.map((l) => (
          <button
            class={`pwy-3 pwx-4 bra-1 fld-row ai-ctr jc-ctr ${
              isIn(filters.level)(l) ? "ct-primary" : "ct-light"
            }`}
            title={`Toggle ${ordinal(l)} Level Filter`}
            onClick={() => handleLevel(l)}
          >
            {String(l)}
          </button>
        ))}
      </section>
      <section class="fld-row flg-3">
        {Sources.map((s) => (
          <button
            class={`pwa-3 bra-1 fld-row ai-ctr jc-ctr ${
              isIn(filters.source)(s) ? "ct-primary" : "ct-light"
            }`}
            title={`Toggle ${s} Sourcebook Filter`}
            onClick={() => handleSource(s)}
          >
            {s}
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
