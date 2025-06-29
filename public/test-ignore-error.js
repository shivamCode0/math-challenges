if (typeof window !== "undefined") {
  let err = console.error;
  window["console"]["error"] = (...args) => {
    let a = args.map((v) => `${v}`).join("");
    if (a.includes(`did not match.`) || a.includes(`app`) || a.includes(`dark`) || a.includes(`dark-on`)) return;

    err(...args);
  };
}
