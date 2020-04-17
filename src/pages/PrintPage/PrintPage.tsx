import "./PrintPage.scss";

import { h, FunctionComponent } from "preact";
import { useStore, selectBook } from "~/store";
import { SpellCard } from "~/components/SpellCard";
import { chunk } from "~/libraries/arrays";

export const PrintPage: FunctionComponent<{}> = () => {
  const [book] = useStore(selectBook);

  return (
    <main>
      {chunk(book, 4).map((chunk) => (
        <section class="print-page">
          {chunk.map((spell) => (
            <SpellCard spell={spell} />
          ))}
        </section>
      ))}
    </main>
  );
};
