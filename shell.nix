with import <nixpkgs> { };
mkShell {
  nativeBuildInputs = [
    zola
  ];
}
