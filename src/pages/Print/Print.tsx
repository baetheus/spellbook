import "./Print.scss";

import { h, FunctionalComponent, FunctionComponent } from "preact";
import { useSpells, selectBook } from "~/store/spells";

export const Print: FunctionComponent<{}> = () => {
  let [spells] = useSpells(selectBook);

  return (
    <main>
      <ul>
        {spells.map((s) => (
          <li>{s.name}</li>
        ))}
      </ul>
    </main>
  );
};
