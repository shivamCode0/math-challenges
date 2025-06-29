import React, { useState } from "react";

const Tex = ({ tex, inline = true }: { tex: string; inline?: boolean }) => {
  const [html, setHtml] = useState("");
  import("katex").then((v) => setHtml(v.default.renderToString(tex, { errorColor: "#F00", displayMode: !inline })));
  return <span dangerouslySetInnerHTML={{ __html: html }} data-tex={tex} />;
};

export default React.memo(Tex, (prev, next) => prev.tex === next.tex && prev.inline === next.inline);
