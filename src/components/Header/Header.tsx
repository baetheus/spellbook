import { h } from "preact";
import { Link } from "preact-router";

import { MdHelp } from "react-icons/md";

export const Header = () => (
  <header class="fld-row flg-4 ai-ctr jc-spb vhmn-3 ovx-au pwr-5">
    <h1>
      <Link href="/" class="pwx-3 bra-1">
        Spellbook
      </Link>
    </h1>
    <nav class="fld-row flg-3 ai-ctr">
      <Link href="/about" activeClassName="ct-link-reverse" class="bra-1 fs-u3 trns-d3">
        <MdHelp />
      </Link>
    </nav>
  </header>
);
