import { h, FunctionalComponent } from "preact";
import { FaSortAlphaDown, FaSortNumericDown } from "react-icons/fa";

import { SpellSort } from "~/store/spells";

interface SortIconProps {
  sort: SpellSort;
}

export const SortIcon: FunctionalComponent<SortIconProps> = ({ sort }) => {
  switch (sort) {
    case "Level":
      return <FaSortNumericDown />;
    default:
    case "Name":
      return <FaSortAlphaDown />;
  }
};
