import "./SearchSpells.scss";

import { h, Fragment } from "preact";
import { useCallback, useState } from "preact/hooks";
import { route } from "preact-router";
import { MdSettings, MdClose } from "react-icons/md";

import { useStore, searchL, search, useDispatch, clearBook, bookL } from "~/store/spells";
import { FiltersSpells } from "../FilterSpells";

export const SearchSpells = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [phrase] = useStore(searchL.get);
  const [book] = useStore(bookL.get);
  const [handleClearBook, setPhrase] = useDispatch(clearBook, search);

  const handleInput = useCallback<h.JSX.GenericEventHandler<HTMLInputElement>>(
    (e) => setPhrase(e.currentTarget.value),
    [setPhrase]
  );
  const handleClearPhrase = useCallback(() => setPhrase(""), [setPhrase]);
  const handleToggleSettings = useCallback(() => setShowConfig((show) => !show), [setShowConfig]);

  return (
    <Fragment>
      <section class="fld-row flg-2 ai-ctr ct-light bra-1">
        <input
          value={phrase}
          onInput={handleInput}
          aria-label="Filter spells by search string"
          placeholder="Search"
          class="vh-2 vwmn-p50 fls-1-1 ct-light brl-1 pwx-5 bwa-0 fs-u1"
        />
        <button
          type="button"
          aria-label="Clear search string"
          class={`search-button fs-u4 fld-row ai-ctr jc-ctr ct-light ${
            phrase.length === 0 ? "cf-disabled" : ""
          }`}
          disabled={phrase.length === 0}
          onClick={handleClearPhrase}
        >
          <MdClose />
        </button>
        <button
          type="button"
          aria-label={`${showConfig ? "Hide" : "Show"} settings menu`}
          class={`search-button fs-u4 fld-row ai-ctr jc-ctr  brr-1 ${
            showConfig ? "ct-primary" : "ct-light"
          }`}
          onClick={handleToggleSettings}
        >
          <MdSettings />
        </button>
      </section>
      {showConfig ? <FiltersSpells /> : null}
      <section class="fld-row flg-3 ai-ctr">
        <button
          aria-label="Clear selected spells"
          class="ct-light fls-3-1 vh-1 fs-u1 bra-1 fld-row ai-ctr jc-ctr"
          disabled={book.size === 0}
          onClick={handleClearBook}
        >
          Clear ({book.size}) Selections
        </button>
        <button
          aria-label="Go to print spells page"
          class="ct-primary fls-1-1 vh-1 fs-u1 bra-1 fld-row ai-ctr jc-ctr"
          onClick={() => route("/print")}
        >
          Print
        </button>
      </section>
    </Fragment>
  );
};
