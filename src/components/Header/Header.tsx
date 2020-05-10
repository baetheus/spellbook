import "./Header.scss";

import { h } from "preact";
import { Link } from "preact-router/match";
import { MdHelp, MdAdd } from "react-icons/md";
import { squash } from "@nll/datum/DatumEither";

import { useAuthStore, useAuthDispatch, loginWithRedirect, logout, selectUser } from "~/store/auth";

const LoginLink = () => {
  const [user] = useAuthStore(selectUser);
  const [handleLogin, handleLogout] = useAuthDispatch(loginWithRedirect.pending, logout.pending);

  return squash(
    () => <span>Loading...</span>,
    () => (
      <a href="#" onClick={() => handleLogin({})}>
        Login
      </a>
    ),
    () => (
      <a href="#" onClick={() => handleLogout(window.location.origin)}>
        Logout
      </a>
    )
  )(user);
};

export const Header = () => {
  return (
    <header class="fld-col flg-2 ai-stc vhmn-3 mwb-4">
      <section class="fld-row flg-4 ai-ctr jc-spb">
        <h1>Spellbook</h1>
        <section class="fld-row flg-3 ai-ctr pwx-4">
          <LoginLink />
          <Link href="/about" aria-label="Help and About page link" class="sq-32 bra-1 fs-u4 ta-c">
            <MdHelp />
          </Link>
        </section>
      </section>

      <nav class="fld-row flg-3 ai-ctr fs-u1">
        <Link
          href="/"
          aria-label="Spells Page"
          class="pwx-3 pwy-2 ct-link"
          activeClassName="ct-link-reverse"
        >
          Spells
        </Link>
        <Link
          href="/creatures"
          aria-label="Creatures Page"
          class="pwx-3 pwy-2 ct-link"
          activeClassName="ct-link-reverse"
        >
          Creatures
        </Link>
        <Link
          href="/creatures/create"
          aria-label="Create Creature"
          class="fld-row flg-4 pwx-3 pwy-2 ct-link"
          activeClassName="ct-link-reverse"
        >
          <MdAdd />
        </Link>
      </nav>
    </header>
  );
};
