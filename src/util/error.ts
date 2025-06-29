export {};

if (typeof window !== "undefined") {
  let err = console.error;
  window["console"]["error"] = (...args: any[]) => {
    for (let a of args) {
      if (`${a}`.includes(`Prop \`className\` did not match. Server: "app" Client: "app dark-on"`)) return;
    }
    err(...args);
  };
}
