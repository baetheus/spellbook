import { h, FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";
import { Link } from "preact-router";

import * as S from "~/store/spells";
import { Table } from "~/components/Table";
import { FilterList } from "~/components/FilterList";
import { Heading } from "~/components/Heading";
import { Stack } from "~/components/Stack";

import {
  classFilterConfig,
  spellTableColumns,
  sourceFilterConfig,
  levelFilterConfig,
  schoolFilterConfig,
} from "./HomeConfig";

type InputEvent = h.JSX.TargetedEvent<HTMLInputElement, Event>;

export interface HomeProps {}

/**
 * @name Home
 * @example
 * <Home />
 */
export const Home: FunctionalComponent<HomeProps> = () => {
  const [spells, dispatch] = S.useSpells(S.selectSpells);
  const [book] = S.useSpells(S.selectBook);
  const [classes] = S.useSpells(S.classL.get);
  const [sources] = S.useSpells(S.sourceL.get);
  const [levels] = S.useSpells(S.levelL.get);
  const [schools] = S.useSpells(S.schoolL.get);
  const [search] = S.useSpells(S.searchL.get);

  const handleSpellClick = useCallback((s: S.Spell) => dispatch(S.toggleSpell(s)), [dispatch]);
  const handleClassClick = useCallback((c: S.Class) => dispatch(S.toggleClass(c)), [dispatch]);
  const handleSourceClick = useCallback((c: S.Source) => dispatch(S.toggleSource(c)), [dispatch]);
  const handleLevelClick = useCallback((c: S.Level) => dispatch(S.toggleLevel(c)), [dispatch]);
  const handleSchoolClick = useCallback((c: S.School) => dispatch(S.toggleSchool(c)), [dispatch]);
  const handleResetFiltersClick = useCallback(() => dispatch(S.resetFilters(null)), [dispatch]);
  const handleSearchUpdate = useCallback(
    (e: InputEvent) => dispatch(S.search(e.currentTarget.value)),
    [dispatch]
  );
  const handleSpellSort = useCallback((s?: S.Sort<S.Spell>) => dispatch(S.sortSpells(s)), [
    dispatch,
  ]);
  const handleBookSort = useCallback((s?: S.Sort<S.Spell>) => dispatch(S.sortBook(s)), [dispatch]);

  return (
    <Stack gap={6} className="pwa-4">
      <Heading>
        <h1 class="fld-row flg-4 ai-ctr">
          <span>Spellbook</span>
          <Link href="/print" class="ct-link fs-d5 bra-1 pwx-3 pwy-2">
            Print
          </Link>
        </h1>
      </Heading>

      <Stack>
        <Heading>
          <h4>Selected Spells</h4>
        </Heading>
        {book.length === 0 && <h5>No Spells Selected!</h5>}
        <Table<S.Spell>
          select={handleSpellClick}
          columns={spellTableColumns}
          items={book}
          setSort={handleBookSort}
        ></Table>
      </Stack>

      <Stack>
        <Heading>
          <h4 class="fld-row flg-4">
            <span>Filters</span>
            <small class="fld-row flg-4 ai-ctr fs-d5">
              <button onClick={handleResetFiltersClick}>Reset</button>
            </small>
          </h4>
        </Heading>
        <FilterList<S.Class>
          select={handleClassClick}
          config={classFilterConfig}
          selected={classes}
        ></FilterList>
        <FilterList<S.Source>
          select={handleSourceClick}
          config={sourceFilterConfig}
          selected={sources}
        ></FilterList>
        <FilterList<S.Level>
          select={handleLevelClick}
          config={levelFilterConfig}
          selected={levels}
        ></FilterList>
        <FilterList<S.School>
          select={handleSchoolClick}
          config={schoolFilterConfig}
          selected={schools}
        ></FilterList>
      </Stack>

      <Stack>
        <Heading>
          <h4 class="fld-row flg-4 ai-ctr">
            <span>Available Spells</span>
            <input
              class="ct-light bwa-1 bra-1 pwx-3 ta-c"
              placeholder="Search"
              onInput={handleSearchUpdate}
              value={search}
            ></input>
            <small class="fs-d2">
              {spells.length} Result{spells.length === 1 ? "" : "s"}
            </small>
          </h4>
        </Heading>
        {spells.length === 0 && <h5>No Spells Available!</h5>}
        <Table<S.Spell>
          select={handleSpellClick}
          setSort={handleSpellSort}
          columns={spellTableColumns}
          items={spells}
        ></Table>
      </Stack>
    </Stack>
  );
};
