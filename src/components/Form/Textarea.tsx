import { h, FunctionalComponent, JSX } from "preact";

interface TextareaProps extends JSX.HTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: FunctionalComponent<TextareaProps> = ({ name, label, ...rest }) => {
  return (
    <div name={name} class="ct-light bra-1 fld-col ai-stc vw-p100">
      <label class="ct-light brt-1 pwx-4 pwy-3 fs-d2 fw-u2 fld-row ai-ctr">{label}</label>
      <textarea name={name} {...rest} class="ct-light fls-1-1 brb-1 pwx-4 pwy-3 fs-d1" />
    </div>
  );
};
