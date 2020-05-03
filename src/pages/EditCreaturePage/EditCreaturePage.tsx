import { h, FunctionalComponent } from "preact";
import { DefaultLayout } from "~/components/Layouts";
import { useCreatureStore, selectCreature, Creature } from "~/store/creatures";
import { squash } from "@nll/datum/DatumEither";
import { LoadingCard } from "~/components/LoadingCard";
import { ErrorCard } from "~/components/ErrorCard";
import { CreatureCard } from "~/components/CreatureCard";

interface EditCreaturePageProps {
  id?: string;
}

export const EditCreaturePage: FunctionalComponent<EditCreaturePageProps> = ({ id = "none" }) => {
  const [creature] = useCreatureStore(selectCreature(id));

  return (
    <DefaultLayout>
      {squash(
        () => <LoadingCard title="Loading Creature..." />,
        (e: Error) => <ErrorCard title="Error Loading Creature!" error={e} />,
        (c: Creature) => <CreatureCard creature={c} />
      )(creature)}
    </DefaultLayout>
  );
};
