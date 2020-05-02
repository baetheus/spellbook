import { h, FunctionalComponent } from "preact";
import { squash } from "@nll/datum/DatumEither";

import { DefaultLayout } from "~/components/Layouts";
import { SearchSpells } from "~/components/SearchSpells";
import {
  Spells,
  useStore,
  selectSpells,
  selectBook,
  useDispatch,
  toggleSpell,
} from "~/store/spells";
import { SpellTable } from "~/components/SpellTable/SpellTable";
import { ErrorCard } from "~/components/ErrorCard";
import { LoadingCard } from "~/components/LoadingCard";

export const SpellPage: FunctionalComponent<{}> = () => {
  const [spells] = useStore(selectSpells);
  const [book] = useStore(selectBook);
  const [handleToggle] = useDispatch(toggleSpell);

  return (
    <DefaultLayout width={1}>
      <SearchSpells />
      {squash(
        () => <LoadingCard title="Loading Spells..." />,
        (e: Error) => <ErrorCard title="Error Loading Spells!" error={e} />,
        (s: Spells) => <SpellTable spells={s} book={book} toggleSpell={handleToggle} />
      )(spells)}
    </DefaultLayout>
  );
};
