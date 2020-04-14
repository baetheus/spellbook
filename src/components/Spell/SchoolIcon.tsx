import { h, FunctionalComponent } from "preact";
import {
  GiMagicHat,
  GiCrownedSkull,
  GiFireball,
  GiTemplarShield,
  GiFeather,
  GiCrystalBall,
  GiComa,
  GiInvisible,
} from "react-icons/gi";

import { School } from "~/store";

interface SchoolIconProps {
  school: School;
}

export const SchoolIcon: FunctionalComponent<SchoolIconProps> = ({ school }) => {
  switch (school) {
    case "Abjuration":
      return <GiTemplarShield />;
    case "Conjuration":
      return <GiMagicHat />;
    case "Divination":
      return <GiCrystalBall />;
    case "Enchantment":
      return <GiComa />;
    case "Evocation":
      return <GiFireball />;
    case "Illusion":
      return <GiInvisible />;
    case "Necromancy":
      return <GiCrownedSkull />;
    default:
    case "Transmutation":
      return <GiFeather />;
  }
};
