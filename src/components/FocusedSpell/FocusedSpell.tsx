import { h } from "preact";

import { useStore, focusL } from "~/store/spells";
import { nil } from "~/libraries/fns";

export const FocusedSpell = () => {
  const [focus] = useStore(focusL.get);

  if (nil(focus)) {
    return <h3>No Spell Focused</h3>;
  }

  return (
    <section>
      <header>
        <h3>{focus.name}</h3>
        <p dangerouslySetInnerHTML={{ __html: focus.description }} />
      </header>
    </section>
  );
};
