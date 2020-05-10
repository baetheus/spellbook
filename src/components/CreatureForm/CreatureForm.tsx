import "./CreatureForm.scss";

import { h, FunctionalComponent } from "preact";

import { DEFAULT_CREATURE, Creature } from "~/store/creatures";
import { CreatureCard } from "~/components/CreatureCard";
import { Input, Textarea } from "~/components/Form";
import { useFormik } from "formik";

interface CreatureFormProps {
  pending?: boolean;
  creature?: Creature;
  onSubmit: (c: Creature) => void;
}

export const CreatureForm: FunctionalComponent<CreatureFormProps> = ({
  pending = false,
  creature = DEFAULT_CREATURE,
  onSubmit,
}) => {
  const { handleSubmit: hSubmit, handleChange: hChange, values: v } = useFormik({
    initialValues: creature,
    onSubmit,
  });

  return (
    <section class="fld-col fld-sm-row flg-4 ">
      <form class="fls-1-1 flb-p50 creature-form" onSubmit={hSubmit}>
        <Input name="name" label="Name" onChange={hChange} value={v.name} />
        <Input name="type" label="Type" onChange={hChange} value={v.type} />
        <Input name="ac" label="AC" type="number" onChange={hChange} value={v.ac} />
        <Input name="hp" label="HP" type="number" onChange={hChange} value={v.hp} />
        <Input name="speed" label="Speed" onChange={hChange} value={v.speed} />

        <Input name="str" label="STR" type="number" onChange={hChange} value={v.str} />
        <Input name="dex" label="DEX" type="number" onChange={hChange} value={v.dex} />
        <Input name="con" label="CON" type="number" onChange={hChange} value={v.con} />
        <Input name="int" label="INT" type="number" onChange={hChange} value={v.int} />
        <Input name="wis" label="WIS" type="number" onChange={hChange} value={v.wis} />
        <Input name="cha" label="CHA" type="number" onChange={hChange} value={v.cha} />
        <Textarea name="features" label="Features" onChange={hChange} value={v.features} />
        <Textarea name="traits" label="Traits" onChange={hChange} value={v.traits} />
        <Textarea name="actions" label="Actions" onChange={hChange} value={v.actions} />
        <Textarea name="reactions" label="Reactions" onChange={hChange} value={v.reactions} />

        <Input name="rating" label="CR" type="number" onChange={hChange} value={v.rating} />
        <Input name="experience" label="XP" type="number" onChange={hChange} value={v.experience} />
        <Input name="source" label="Source" onChange={hChange} value={v.source} />
        <Input name="page" label="Page" type="number" onChange={hChange} value={v.page} />

        <button type="submit" class="ct-primary bra-1 pwx-4 pwy-3 fs-d1" disabled={pending}>
          Submit
        </button>
      </form>

      <CreatureCard className="fls-1-1 flb-p50 as-str" creature={v} />
    </section>
  );
};
