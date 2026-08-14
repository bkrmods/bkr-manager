#!/usr/bin/env python3
"""Compacte un gabarit JSON du thème et donne sa taille exacte.

Les gabarits sont versionnés ici en clair, pour être relus, mais envoyés
compactés à Shopify : l'API n'accepte pas de correctif partiel, il faut
retransmettre le fichier entier à chaque modification, et `index.json` a
perdu 43 % de son poids en passant à cette forme.

    python3 horizon/compacter.py horizon/templates/index.json

Le nombre d'octets affiché est celui que doit renvoyer le champ `size` de
`themeFilesUpsert` une fois l'écriture faite. S'il diffère, le contenu
transmis n'est pas celui du fichier local : relire, ne pas supposer.
"""

import json
import sys
from pathlib import Path


def charger(chemin: Path) -> dict:
    """Lit un gabarit en ignorant l'en-tête de commentaire que Shopify ajoute."""
    texte = chemin.read_text(encoding="utf-8")
    if texte.lstrip().startswith("/*"):
        texte = texte[texte.index("*/") + 2 :]
    return json.loads(texte)


def compacter(donnees: dict) -> str:
    return json.dumps(donnees, ensure_ascii=False, separators=(",", ":"))


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage : compacter.py <gabarit.json>")
        return 2

    chemin = Path(sys.argv[1])
    if not chemin.is_file():
        print(f"introuvable : {chemin}")
        return 2

    try:
        donnees = charger(chemin)
    except json.JSONDecodeError as erreur:
        print(f"JSON invalide : {erreur}")
        return 1

    compact = compacter(donnees)
    octets = len(compact.encode("utf-8"))
    lisible = len(json.dumps(donnees, ensure_ascii=False, indent=2).encode("utf-8"))

    sortie = chemin.with_suffix(".min.json")
    sortie.write_text(compact, encoding="utf-8")

    print(f"{sortie}")
    print(f"compact : {octets} octets   (lisible : {lisible})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
