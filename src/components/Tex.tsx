import React, { useEffect, useState } from "react";

let katex: typeof import("katex");

async function getKatex() {
  if (!katex) katex = (await import("katex")).default;
  return katex;
}

const Tex = ({ tex, inline = true }: { tex: string; inline?: boolean }) => {
  const [html, setHtml] = useState("");
  useEffect(() => {
    getKatex().then((v) => setHtml(v.renderToString(tex, { errorColor: "#F00", displayMode: !inline })));
  }, [tex, inline]);

  return <span dangerouslySetInnerHTML={{ __html: html }} data-tex={tex} />;
};

// eslint-disable-next-line react/display-name
export default React.memo(Tex, (prev, next) => prev.tex === next.tex && prev.inline === next.inline);
