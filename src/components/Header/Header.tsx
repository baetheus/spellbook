import "./Header.scss";

import { h } from "preact";
import { Link } from "preact-router";
import { MdHelp } from "react-icons/md";
import { refreshFold } from "@nll/datum/DatumEither";

import { useAuthStore, useAuthDispatch, loginWithRedirect, logout, selectUser } from "~/store/auth";

const LoginLink = () => {
  const [user] = useAuthStore(selectUser);
  const [handleLogin, handleLogout] = useAuthDispatch(loginWithRedirect.pending, logout.pending);

  return refreshFold(
    () => (
      <a href="#" onClick={() => handleLogin({})}>
        Login
      </a>
    ),
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
    <header class="fld-row flg-4 ai-ctr jc-spb vhmn-3">
      <h1>
        <Link href="/#" class="bra-1">
          Spellbook
        </Link>
      </h1>
      <nav class="fld-row flg-3 ai-ctr pwx-4">
        <LoginLink />
        <Link
          href="/about"
          aria-label="Help and About page link"
          class="about-icon bra-1 fs-u4 ta-c"
        >
          <MdHelp />
        </Link>
      </nav>
    </header>
  );
};
