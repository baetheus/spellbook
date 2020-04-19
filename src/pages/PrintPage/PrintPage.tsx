import "./PrintPage.scss";

import { h, FunctionComponent } from "preact";
import { useStore, selectBook, selectSpells } from "~/store";
import { SpellCard } from "~/components/SpellCard";
import { chunk } from "~/libraries/arrays";

export const PrintPage: FunctionComponent<{}> = () => {
  const [spells] = useStore(selectSpells);
  const [book] = useStore(selectBook);

  const show = spells.filter((s) => book.has(s.name));

  return (
    <main>
      {chunk(show, 4).map((chunk) => (
        <section class="print-page">
          {chunk.map((spell) => (
            <SpellCard spell={spell} />
          ))}
        </section>
      ))}
    </main>
  );
};
