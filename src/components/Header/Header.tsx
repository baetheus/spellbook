import "./Header.scss";

import { h } from "preact";
import { Link } from "preact-router";

import { MdHelp } from "react-icons/md";

export const Header = () => (
  <header class="fld-row flg-4 ai-ctr jc-spb vhmn-3">
    <h1>
      <Link href="/#" class="bra-1">
        Spellbook
      </Link>
    </h1>
    <nav class="fld-row flg-3 ai-ctr pwx-4">
      <Link href="/about" aria-label="Help and About page link" class="about-icon bra-1 fs-u4 ta-c">
        <MdHelp />
      </Link>
    </nav>
  </header>
);
