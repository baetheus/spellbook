import { h, FunctionalComponent } from "preact";
import { DefaultLayout } from "~/components/Layouts";
import {
  useCreatureStore,
  useCreatureDispatch,
  toggleCreature,
  Creatures,
} from "~/store/creatures";
import { squash } from "@nll/datum/DatumEither";
import { LoadingCard } from "~/components/LoadingCard";
import { ErrorCard } from "~/components/ErrorCard";
import { CreatureTable } from "~/components/CreatureTable";

interface CreaturePageProps {}

export const CreaturePage: FunctionalComponent<CreaturePageProps> = () => {
  const [{ creatures, selected }] = useCreatureStore((s) => s);
  const [handleToggle] = useCreatureDispatch(toggleCreature);

  return (
    <DefaultLayout width={1}>
      {squash(
        () => <LoadingCard title="Loading Creatures..." />,
        (e: Error) => <ErrorCard title="Error Loading Creatures!" error={e} />,
        (cs: Creatures) => (
          <CreatureTable creatures={cs} selected={selected} toggleCreature={handleToggle} />
        )
      )(creatures)}
    </DefaultLayout>
  );
};
