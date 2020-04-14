import { h } from "preact";

import { useStore, searchL, search } from "~/store";
import { useCallback } from "preact/hooks";

export const SearchSpells = () => {
  const [phrase, dispatch] = useStore(searchL.get);
  const setPhrase = useCallback<h.JSX.GenericEventHandler<HTMLInputElement>>(
    (e) => dispatch(search(e.currentTarget.value)),
    []
  );

  return (
    <input
      value={phrase}
      onInput={setPhrase}
      placeholder="Search"
      class="vh-2 ct-light pwx-5 bwa-0 fs-u1"
    />
  );
};
