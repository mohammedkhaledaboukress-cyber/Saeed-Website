import { Fragment } from "react";

/** Renders `*word*` in content strings as the accent voice: an italic serif
 *  in English, the accent colour in Arabic (Arabic has no italic, and a Latin
 *  serif would break the script). One device, used sparingly, in headlines. */
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className="voice">
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
