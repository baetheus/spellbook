import { h, FunctionalComponent } from "preact";
import { DefaultLayout } from "~/components/Layouts";
import { CreatureCard } from "~/components/CreatureCard";

interface CreaturePageProps {}

export const CreaturePage: FunctionalComponent<CreaturePageProps> = () => {
  return (
    <DefaultLayout width={1}>
      <CreatureCard />
    </DefaultLayout>
  );
};
