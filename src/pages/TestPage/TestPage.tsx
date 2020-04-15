import { h } from "preact";
import { useStore, selectBook } from "~/store";
import { SpellCard } from "~/components/SpellCard";

export const TestPage = () => {
  const [book] = useStore(selectBook);

  return <SpellCard spell={book[0]} />;
};
