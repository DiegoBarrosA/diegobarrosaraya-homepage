{
  description = "Diego Barros Araya - Personal Homepage";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      mkDevShell =
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        pkgs.mkShell {
          packages = [
            pkgs.nodejs_20
            pkgs.pnpm
            pkgs.pandoc
            pkgs.texliveFull
          ];

          shellHook = ''
            echo "Diego's Homepage Dev Environment"
            echo "Run: pnpm dev"
            echo "Open: http://localhost:5173"
          '';
        };
    in
    {
      devShells.x86_64-linux.default = mkDevShell "x86_64-linux";
      devShells.aarch64-linux.default = mkDevShell "aarch64-linux";
    };
}
