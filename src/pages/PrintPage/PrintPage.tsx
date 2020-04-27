import "./PrintPage.scss";

import { h, FunctionComponent, Fragment } from "preact";
import { squash } from "@nll/datum/DatumEither";

import { useStore, selectBook, selectSpells, Spells } from "~/store/spells";
import { SpellCard } from "~/components/SpellCard";
import { chunk } from "~/libraries/arrays";
import { LoadingCard } from "~/components/LoadingCard";
import { ErrorCard } from "~/components/ErrorCard";

export const PrintPage: FunctionComponent<{}> = () => {
  const [spells] = useStore(selectSpells);
  const [book] = useStore(selectBook);

  return (
    <main>
      {squash(
        () => <LoadingCard title="Loading Spells" />,
        (e: Error) => <ErrorCard title="Error Loading Spells!" error={e} />,
        (s: Spells) => (
          <Fragment>
            {chunk(
              s.filter((spell) => book.has(spell.name)),
              4
            ).map((chunk) => (
              <section class="print-page">
                {chunk.map((spell) => (
                  <SpellCard spell={spell} />
                ))}
              </section>
            ))}
          </Fragment>
        )
      )(spells)}
    </main>
  );
};
