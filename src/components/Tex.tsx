import React, { useState } from "react";

const Tex = ({ tex, inline = true }: { tex: string; inline?: boolean }) => {
  const [html, setHtml] = useState("");
  import("katex").then((v) => setHtml(v.renderToString(tex, { errorColor: "#F00", displayMode: !inline })));
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Tex;
