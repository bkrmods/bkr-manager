#!/usr/bin/env python3
"""Contraste WCAG entre deux couleurs de la charte BKR.

Sur fond noir, l'œil surestime systématiquement la lisibilité d'une couleur
saturée : le Vert Racing paraît lisible et ne donne que 2,4:1. D'où ce calcul.

    python3 contraste.py "#F3F3F1" "#0E0E0E"
    python3 contraste.py --charte        # toutes les paires de la charte
"""

import sys

CHARTE = {
    "noir": "#0E0E0E",
    "noir-adouci": "#121212",
    "noir-relief": "#171717",
    "blanc": "#F3F3F1",
    "vert": "#1C5A4B",
    "vert-clair": "#2E8F76",
    "vert-sombre": "#123A31",
}

PAIRES_DE_REFERENCE = [
    ("texte / fond", "blanc", "noir"),
    ("texte / carte", "blanc", "noir-relief"),
    ("libelle / bouton vert", "blanc", "vert"),
    ("accent texte / fond", "vert-clair", "noir"),
    ("surface bouton / fond", "vert", "noir"),
]


def _canal(v: int) -> float:
    c = v / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hexa: str) -> float:
    h = hexa.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) not in (6, 8):
        raise ValueError(f"couleur invalide : {hexa}")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _canal(r) + 0.7152 * _canal(g) + 0.0722 * _canal(b)


def contraste(a: str, b: str) -> float:
    la, lb = luminance(a), luminance(b)
    haut, bas = max(la, lb), min(la, lb)
    return round((haut + 0.05) / (bas + 0.05), 2)


def verdict(ratio: float) -> str:
    if ratio >= 7:
        return "AAA — confortable partout"
    if ratio >= 4.5:
        return "AA — texte courant autorise"
    if ratio >= 3:
        return "AA large seulement — titres >=24px, contours de composants"
    return "INSUFFISANT — changer la couleur"


def resoudre(nom_ou_hex: str) -> str:
    return CHARTE.get(nom_ou_hex.lower(), nom_ou_hex)


def main() -> int:
    args = sys.argv[1:]

    if not args or args[0] in ("-h", "--help"):
        print(__doc__)
        return 0

    if args[0] == "--charte":
        largeur = max(len(n) for n, _, _ in PAIRES_DE_REFERENCE)
        for nom, a, b in PAIRES_DE_REFERENCE:
            r = contraste(CHARTE[a], CHARTE[b])
            print(f"{nom:<{largeur}}  {r:>6}:1  {verdict(r)}")
        return 0

    if len(args) != 2:
        print("Usage : contraste.py <texte> <fond>   (hex ou nom de la charte)")
        return 2

    avant, arriere = resoudre(args[0]), resoudre(args[1])
    r = contraste(avant, arriere)
    print(f"{avant} sur {arriere} : {r}:1 — {verdict(r)}")
    return 0 if r >= 4.5 else 1


if __name__ == "__main__":
    raise SystemExit(main())
