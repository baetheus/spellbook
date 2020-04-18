import { h, FunctionalComponent } from "preact";
import {
  GiHammerNails,
  GiPanFlute,
  GiHolyHandGrenade,
  GiWolfHead,
  GiHolyWater,
  GiCrossbow,
  GiPointyHat,
  GiGooeyDaemon,
  GiFireball,
} from "react-icons/gi";

import { Class } from "~/store";

interface ClassIconProps {
  cls: Class;
}

export const ClassIcon: FunctionalComponent<ClassIconProps> = ({ cls }) => {
  switch (cls) {
    case "Bard":
      return <GiPanFlute />;
    case "Cleric":
      return <GiHolyWater />;
    case "Druid":
      return <GiWolfHead />;
    case "Paladin":
      return <GiHolyHandGrenade />;
    case "Ranger":
      return <GiCrossbow />;
    case "Sorcerer":
      return <GiFireball />;
    case "Warlock":
      return <GiGooeyDaemon />;
    case "Wizard":
      return <GiPointyHat />;
    default:
    case "Artificer":
      return <GiHammerNails />;
  }
};
