{
  description = "Diego Barros Araya - Personal Homepage";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = [
          pkgs.nodejs_20
          pkgs.pnpm
        ];

        shellHook = ''
          echo "Diego's Homepage Dev Environment"
          echo "Run: pnpm dev"
          echo "Open: http://localhost:5173"
        '';
      };
    };
}
