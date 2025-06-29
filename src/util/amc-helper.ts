export const titleCleanup = (string) => decodeURIComponent(string).replace(/_/g, " ").replace("Problems/Problem ", "#");
export const formatLatex = (string) =>
  string
    .replaceAll(/&#160;/g, " ")
    .replaceAll(/&#39;/g, "'")
    .replaceAll(/&amp;/g, "&")
    .replaceAll(/&nbsp;/g, "\\hspace{2.5em}")
    .replaceAll(/&quot;/g, '"')
    .replaceAll(/^\$|\$$|\\\[|\\\]/g, "")
    .replaceAll(/&lt;/g, "\\lt ")
    .replaceAll(/&gt;/g, "\\gt ")
    .replaceAll(/\$/g, "\\$$")
    .replaceAll(/align\*/g, "aligned")
    .replaceAll(/eqnarray\*/g, "aligned")
    .replaceAll(/{tabular}(\[\w\])*/g, "{array}")
    .replaceAll(/\\bold{/g, "\\mathbf{")
    .replaceAll(/\\congruent/g, "\\cong")
    .replaceAll(/\\overarc/g, "\\overgroup")
    .replaceAll(/\\overparen/g, "\\overgroup")
    .replaceAll(/\\underarc/g, "\\undergroup")
    .replaceAll(/\\underparen/g, "\\undergroup")
    .replaceAll(/\\mathdollar/g, "\\$")
    .replaceAll(/\\textdollar/g, "\\$");
