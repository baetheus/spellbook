import { h, FunctionalComponent } from "preact";
import {
  GiHammerNails,
  GiBattleAxe,
  GiPanFlute,
  GiHolyHandGrenade,
  GiWolfHead,
  GiSwordsEmblem,
  GiFist,
  GiHolyWater,
  GiCrossbow,
  GiDaggers,
  GiPointyHat,
  GiGooeyDaemon,
  GiWizardStaff,
} from "react-icons/gi";

import { Class } from "~/store";

interface ClassIconProps {
  cls: Class;
}

export const ClassIcon: FunctionalComponent<ClassIconProps> = ({ cls }) => {
  switch (cls) {
    case "Barbarian":
      return <GiBattleAxe />;
    case "Bard":
      return <GiPanFlute />;
    case "Cleric":
      return <GiHolyWater />;
    case "Druid":
      return <GiWolfHead />;
    case "Fighter":
      return <GiSwordsEmblem />;
    case "Monk":
      return <GiFist />;
    case "Paladin":
      return <GiHolyHandGrenade />;
    case "Ranger":
      return <GiCrossbow />;
    case "Rogue":
      return <GiDaggers />;
    case "Sorcerer":
      return <GiPointyHat />;
    case "Warlock":
      return <GiGooeyDaemon />;
    case "Wizard":
      return <GiWizardStaff />;
    default:
    case "Artificer":
      return <GiHammerNails />;
  }
};
