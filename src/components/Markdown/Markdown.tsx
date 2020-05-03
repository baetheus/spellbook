import { h, FunctionalComponent } from "preact";
import { Marked } from "@ts-stack/markdown";

interface MarkdownProps {
  markdown: string;
  className?: string;
}

export const Markdown: FunctionalComponent<MarkdownProps> = ({ markdown, className = "" }) => (
  <section class={className} dangerouslySetInnerHTML={{ __html: Marked.parse(markdown) }}></section>
);
