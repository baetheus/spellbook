import { h } from "preact";
import debounce from "lodash/debounce";

import { useStore, searchL, search } from "~/store";
import { useCallback } from "preact/hooks";

export const SearchSpells = () => {
  const [phrase, dispatch] = useStore(searchL.get);
  const setPhrase = useCallback(
    debounce((s: string) => dispatch(search(s))),
    []
  );
  const handleInput = useCallback<h.JSX.GenericEventHandler<HTMLInputElement>>(
    (e) => setPhrase(e.currentTarget.value),
    []
  );

  return (
    <input
      value={phrase}
      onInput={handleInput}
      placeholder="Search"
      class="vh-2 ct-light pwx-5 bwa-0 fs-u1"
    />
  );
};
