import "./PrintPage.scss";

import { h, FunctionComponent, Fragment } from "preact";
import { squash, datumEither } from "@nll/datum/DatumEither";
import { sequenceT } from "fp-ts/es6/Apply";

import { useStore, selectBook, selectSpells, Spells } from "~/store/spells";
import { SpellCard } from "~/components/SpellCard";
import { chunk } from "~/libraries/arrays";
import { LoadingCard } from "~/components/LoadingCard";
import { ErrorCard } from "~/components/ErrorCard";
import { useCreatureStore, creaturesL, selectedL, Creatures } from "~/store/creatures";
import { CreatureCard } from "~/components/CreatureCard";

const sequenceDE = sequenceT(datumEither);

export const PrintPage: FunctionComponent<{}> = () => {
  const [spells] = useStore(selectSpells);
  const [book] = useStore(selectBook);
  const [creatures] = useCreatureStore(creaturesL.get);
  const [selectedCreatures] = useCreatureStore(selectedL.get);

  const data = sequenceDE(spells, creatures);
  return (
    <main>
      {squash(
        () => <LoadingCard title="Loading Spells" />,
        (e: Error) => <ErrorCard title="Error Loading Spells!" error={e} />,
        ([ss, cs]: [Spells, Creatures]) => (
          <Fragment>
            {chunk(
              ss.filter((spell) => book.has(spell.name)),
              4
            ).map((chunk) => (
              <section class="print-page">
                {chunk.map((spell) => (
                  <SpellCard spell={spell} />
                ))}
              </section>
            ))}

            {chunk(
              cs.filter((c) => selectedCreatures.has(c.name)),
              4
            ).map((chunk) => (
              <section class="print-page">
                {chunk.map((creature) => (
                  <CreatureCard creature={creature} fixed={true} />
                ))}
              </section>
            ))}
          </Fragment>
        )
      )(data)}
    </main>
  );
};
