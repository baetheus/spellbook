import { h, FunctionalComponent } from "preact";
import { FaGithub } from "react-icons/fa";

interface FooterProps {
  className?: string;
}

export const Footer: FunctionalComponent<FooterProps> = ({ className }) => (
  <footer class={`${className} vw-vw100 vhmn-2 fld-row flg-4 ai-ctr jc-ctr ct-light`}>
    <span class="fs-u2 trns-d2">
      <a
        href="https://github.com/baetheus/spellbook"
        target="_blank"
        title="Link to source code on github"
        class="ct-light"
      >
        <FaGithub />
      </a>
    </span>
    <span>
      Designed by{" "}
      <a
        href="https://blaylock.dev"
        target="_blank"
        title="Link to Brandon Blaylock's personal website"
        class="ct-light cf-link"
      >
        Brandon Blaylock
      </a>
    </span>
  </footer>
);
