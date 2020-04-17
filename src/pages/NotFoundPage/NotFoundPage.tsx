import { FunctionalComponent, h } from "preact";

export interface NotFoundProps {}

/**
 * @name NotFoundPage
 * @example
 * <NotFound />
 */
export const NotFoundPage: FunctionalComponent<NotFoundProps> = () => {
  return (
    <main class="vw-p100 vhmn-vh100 fld-col flg-4 ai-ctr jc-ctr pwa-5">
      <h1>Page Not Found</h1>
      <a href="/">Try going home..</a>
    </main>
  );
};
