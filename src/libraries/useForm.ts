import { h } from "preact";
import { useState, useCallback } from "preact/hooks";

type InputEvent = h.JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>;
type SubmitEvent = h.JSX.TargetedEvent<HTMLFormElement, Event>;

interface UserFormProps<A> {
  initialValues: A;
  onSubmit: (a: A) => void;
}

interface UseForm<A> {
  values: A;
  handleChange: (e: InputEvent) => void;
  handleSubmit: (e: SubmitEvent) => void;
}

export function useForm<A extends Record<string, any>>({
  initialValues,
  onSubmit,
}: UserFormProps<A>): UseForm<A> {
  const [values, setValues] = useState(initialValues);
  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      onSubmit(values);
      return false;
    },
    [values, onSubmit]
  );
  const handleChange = useCallback(
    (e: InputEvent) => {
      const value = e.currentTarget.value;
      const name = e.currentTarget.name;
      setValues((v) => (v.hasOwnProperty(name) ? { ...v, [name]: value } : v));
    },
    [setValues]
  );

  return { values, handleSubmit, handleChange };
}
