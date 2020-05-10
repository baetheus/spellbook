import { h, FunctionalComponent, JSX } from "preact";

interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: FunctionalComponent<InputProps> = ({ name, label, ...rest }) => {
  return (
    <div name={name} class="ct-light bra-1 fld-row ai-stc vw-p100">
      <label class="ct-light brl-1 pwl-4 pwr-2 pwy-3 fs-d2 fw-u2 fld-row ai-ctr">{label}</label>
      <input
        name={name}
        size={1}
        {...rest}
        class="ct-light fls-1-1 brr-1 pwl-2 pwr-4 pwy-3 fs-d1"
      />
    </div>
  );
};
