let _Desmos: typeof Desmos;

export default async function GetDesmos() {
  if (_Desmos) return _Desmos;

  if (typeof window !== "undefined")
    return await import("./desmos-1.7.0").then((Desmos) => {
      _Desmos = Desmos;
      return _Desmos;
    });
  else throw new Error("Desmos not available");
}
