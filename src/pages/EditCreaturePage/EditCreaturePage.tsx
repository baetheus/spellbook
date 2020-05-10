import { h, FunctionalComponent } from "preact";
import { DefaultLayout } from "~/components/Layouts";
import {
  useCreatureStore,
  selectCreature,
  Creature,
  useCreatureDispatch,
  putCreature,
} from "~/store/creatures";
import { squash } from "@nll/datum/DatumEither";
import { LoadingCard } from "~/components/LoadingCard";
import { ErrorCard } from "~/components/ErrorCard";
import { CreatureForm } from "~/components/CreatureForm";
import { useCallback } from "preact/hooks";

interface EditCreaturePageProps {
  id?: string;
}

export const EditCreaturePage: FunctionalComponent<EditCreaturePageProps> = ({ id = "none" }) => {
  const selectCreatureById = useCallback(selectCreature(id), [id]);
  const [creature] = useCreatureStore(selectCreatureById);
  const [handleEditCreature] = useCreatureDispatch(putCreature.pending);

  return (
    <DefaultLayout width={1}>
      <h2>Edit Creature</h2>
      {squash(
        () => <LoadingCard title="Loading Creature..." />,
        (e: Error) => <ErrorCard title="Error Loading Creature!" error={e} />,
        (c: Creature) => <CreatureForm creature={c} onSubmit={handleEditCreature} />
      )(creature)}
    </DefaultLayout>
  );
};
