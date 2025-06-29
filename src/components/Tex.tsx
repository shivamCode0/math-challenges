import React from "react";
import katex from "katex";

const Tex = ({ tex, inline = true }: { tex: string; inline?: boolean }) => <span dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { errorColor: "#F00", displayMode: !inline }) }} />;

export default Tex;
