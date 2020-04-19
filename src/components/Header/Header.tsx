import { h } from "preact";
import { Link } from "preact-router";

export const Header = () => (
  <header class="fld-row flg-4 ai-ctr jc-ctr vhmn-3 mwx-4 ovx-au">
    <h2>
      <Link href="/" class="pwx-3 bra-1">
        Spellbook
      </Link>
    </h2>
    <nav class="fld-row flg-3 ai-ctr">
      <Link href="/" activeClassName="ct-link-reverse" class="pwx-3 bra-1">
        About
      </Link>
    </nav>
  </header>
);
