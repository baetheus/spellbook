import { h, FunctionalComponent } from "preact";
import { notNil } from "~/libraries/fns";

interface ErrorCardProps {
  title?: string;
  error?: any;
}

const formatError = (error?: any): string | undefined => {
  try {
    return JSON.stringify(error);
  } catch {
    return;
  }
};

export const ErrorCard: FunctionalComponent<ErrorCardProps> = ({
  title = "An Error Occurred",
  error,
}) => {
  const formattedError = formatError(error);

  return (
    <article class="pwa-4 bra-1 ct-error">
      <h2 class="ta-c">{title}</h2>
      {notNil(formattedError) ? <p>{formattedError}</p> : null}
    </article>
  );
};
