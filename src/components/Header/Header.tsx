import "./Header.scss";

import { h } from "preact";
import { Link } from "preact-router";
import { MdHelp } from "react-icons/md";

import { useAuthStore, useAuthDispatch, loginWithPop, logout } from "~/store/auth";
import { isSuccess } from "@nll/datum/DatumEither";

export const Header = () => {
  const [user] = useAuthStore((s) => s.user);
  const [handleLogin, handleLogout] = useAuthDispatch(loginWithPop.pending, logout.pending);

  return (
    <header class="fld-row flg-4 ai-ctr jc-spb vhmn-3">
      <h1>
        <Link href="/#" class="bra-1">
          Spellbook
        </Link>
      </h1>
      <nav class="fld-row flg-3 ai-ctr pwx-4">
        {isSuccess(user) ? (
          <a href="#" onClick={handleLogout}>
            Logout {user.value.right.name}
          </a>
        ) : (
          <a href="#" onClick={() => handleLogin({})}>
            Login
          </a>
        )}
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
