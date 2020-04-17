import { h } from "preact";
import { FaGithub } from "react-icons/fa";

export const Footer = () => (
  <footer class="js-end vw-vw100 vhmn-2 fld-row flg-4 ai-ctr jc-ctr ct-light">
    <span class="fs-u2 mwbr-3">
      <a href="https://github.com/baetheus/spellbook" target="_blank" class="ct-light">
        <FaGithub />
      </a>
    </span>
    <span>
      Designed by{" "}
      <a href="https://blaylock.dev" target="_blank" class="ct-light cf-link">
        Brandon Blaylock
      </a>
    </span>
  </footer>
);
