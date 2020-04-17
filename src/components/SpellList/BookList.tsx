import { h, FunctionalComponent } from "preact";
import { useStore, useDispatch, toggleSpell, selectBook } from "~/store";

import { SpellItem } from "./SpellItem";

interface BookListProps {}

export const BookList: FunctionalComponent<BookListProps> = () => {
  const [spells] = useStore(selectBook);
  const [toggle] = useDispatch(toggleSpell);

  return (
    <section class="fls-1-1 fld-col flg-4 vw-sm-p50">
      <header class="fld-row flg-4 ai-ctr jc-spb">
        <h4>
          <span>Selected Spells</span>
          <span class="mwl-4 fs-d4">
            {spells.length} Spell{spells.length === 1 ? "" : "s"}
          </span>
        </h4>
        <a href="/print" target="_blank" class="fs-d1 pwx-4">
          Print
        </a>
      </header>
      <ul class="fld-col flg-4 pwa-2 ai-stc vhmx-vh40 vhmx-sm-vh75 ova-au">
        {spells.length === 0 ? <h6>No Spells To Show!</h6> : null}
        {spells.map((spell) => (
          <SpellItem spell={spell} onClick={toggle} />
        ))}
      </ul>
    </section>
  );
};
