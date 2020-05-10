import { h, FunctionalComponent, Fragment } from "preact";
import { DefaultLayout } from "~/components/Layouts";
import { squash } from "@nll/datum/DatumEither";
import { ErrorCard } from "~/components/ErrorCard";
import {
  Creature,
  useCreatureDispatch,
  createCreatureL,
  useCreatureStore,
  postCreature,
  clearCreateCreature,
} from "~/store/creatures";
import { CreatureForm } from "~/components/CreatureForm";
import { Redirect } from "~/components/Redirect";

interface CreateCreaturePageProps {}

export const CreateCreaturePage: FunctionalComponent<CreateCreaturePageProps> = () => {
  const [creature] = useCreatureStore(createCreatureL.get);
  const [handleCreateCreature, handleReset] = useCreatureDispatch(
    postCreature.pending,
    clearCreateCreature
  );

  return (
    <DefaultLayout width={1}>
      <h2>Create Creature</h2>
      {squash(
        (pending) => <CreatureForm onSubmit={handleCreateCreature} pending={pending} />,
        (error, pending) => {
          return (
            <Fragment>
              <ErrorCard error={error}></ErrorCard>
              <CreatureForm onSubmit={handleCreateCreature} pending={pending} />
            </Fragment>
          );
        },
        ({ id }: Creature) => <Redirect to={`/creatures/${id}`} and={handleReset} />
      )(creature)}
    </DefaultLayout>
  );
};
