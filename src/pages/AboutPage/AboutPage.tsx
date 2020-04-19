import "./AboutPage.scss";

import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";

import { DefaultLayout } from "~/components/Layouts";

export const AboutPage: FunctionalComponent<{}> = () => {
  return (
    <DefaultLayout>
      <article class="about-content fld-col flg-5 mwb-6">
        <h2>Usage</h2>
        <p>
          The <Link href="/">Search</Link> page is useful for both browsing spells and building a
          spellbook.
        </p>
        <p>
          <strong>Browsing.</strong> If it's your first time to the site, finding a spell is a
          simple as typing part of its name into the search box. The spell list will filter to only
          show spells that include your search term in the spell name. If you've already used the
          filters to hide some spells, you may need to remove some filters to find your spell. To
          this end there is a "Show Everything" button in the filters list that will disable all
          filters. In order to improve browsing performance, not all spells are shown in the list.
          If you get to the end of the list and are informed that you need to see more spells, try
          adding a filter. If this becomes a hinderance for you, use the contact link below and send
          me a message.
        </p>
        <p>
          <strong>Selecting.</strong> To select a spell to add to your spell list you can click
          anywhere on the spellcard you want. If the spell card border is blue, then that spell is
          in your printable spell list, if it is black, then it is not. To unselect the spell,
          simply click the spell card again. Selected spells will not be filtered out of the shown
          list, so you can select your cantrips, then filter cantrips out to start selecting your
          first level spells, etc. To clear your selections, there is a <em>Clear Selections</em>{" "}
          button above the spell list that will do so.
        </p>
        <p>
          <strong>Printing.</strong> Once you've selected the spells you wish to print, you can
          click the print button right below the search bar. Doing so will navigate you to a page
          that is printable on A4 paper in portrait orientation.
        </p>
        <p>
          <strong>Filtering.</strong> To the right of the search box is an icon shaped like a gear.
          Clicking this will show all of the available filters for spellbook, clicking it again will
          hide the filters. If a filter button is blue, then spells that match that filter will show
          up in the list. There are filters for <em>Class</em>, <em>Spell Level</em>, and{" "}
          <em>Source Book</em>. Within the source book filters <strong>PHB</strong> stands for{" "}
          <a
            href="https://dnd.wizards.com/products/tabletop-games/rpg-products/rpg_playershandbook"
            target="_blank"
            rel="noreferrer"
          >
            Player's Handbook
          </a>
          , <strong>XAN</strong> stands for{" "}
          <a
            href="https://dnd.wizards.com/products/tabletop-games/rpg-products/xanathars-guide-everything"
            target="_blank"
            rel="noreferrer"
          >
            Xanathar's Guide to Everything
          </a>
          , and <strong>WLD</strong> stands for{" "}
          <a href="https://dnd.wizards.com/products/wildemount" target="_blank" rel="noreferrer">
            Explorer's Guide to Wildemount
          </a>
          .
        </p>

        <h2>History</h2>
        <p>
          <Link href="/">Spellbook</Link> started as a weekend project to provide a more complete
          spell list with a better ui than{" "}
          <a href="https://colinmarc.com/dndspells/" target="_blank" rel="noreferrer">
            this site by Colin Marc
          </a>
          . The specific goals were to make a mobile friendly D&D5e spellbook that is quick enough
          to use during a session, to make building a spell list for your character easy, and to
          provide printable spell cards that contain the full text of the spell (without having two
          cards for some spells). In addition to the technical goals, I also wanted to make a site
          that had no ads, tracking, or other nonsense. I think this project has achieved these
          goals.
        </p>
        <p>
          Given the raison d'etre, that doesn't mean that the project is going to languish without
          improvement. In particular, I have the following stretch goals:
        </p>
        <ul class="about-list">
          <li>The ability to add homebrew spell cards that are printable and shareable.</li>
          <li>Shareable links to premade spell books.</li>
          <li>
            Useful pdfs: Character Sheets, Hex Maps, Name Sheets, Session Note Templates, and Hint
            Sheets.
          </li>
          <li>Additional compendiums for weapons, monsters, etc.</li>
          <li>Shared dice rollers.</li>
        </ul>
        <p>
          That said, if you find any bugs, spelling errors, or have other issues feel free to file a
          bug on the site github or to contact me at{" "}
          <a href="mailto:brandon@ignoble.dev">brandon@ignoble.dev</a>.
        </p>
      </article>
    </DefaultLayout>
  );
};
