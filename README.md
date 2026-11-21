# Neon Vice — GTA VI Trophy Guide & Tracker

A fan-made, offline static web app that guides and tracks all 55 PlayStation 5
trophies of Grand Theft Auto VI: a checklist with progress saved in the browser,
filters by grade, kind, earned state, search text and missable-only, a spoiler
toggle that hides story trophies until earned, a detail view for every trophy,
a three-step platinum roadmap, and export / import / reset for your progress.

## The trophy list

55 trophies: 1 Platinum (Vice Got a Price!), 2 Gold, 6 Silver, 46 Bronze.
All single-player, no online trophies. Only one trophy is missable:
Positive Mental Attitude — meditate at all 18 spots, including the Chapter 1
balcony meditation after Down to Earth, before leaving Chapter 1.

Grades follow PowerPyx (6 Silver including Maximum Withdrawal). Push Square
counts Maximum Withdrawal as Bronze (5 Silver, 47 Bronze); the app says so
in a footnote. One name is printed exactly as the trophy trackers publish it,
in censored form: “T**s Ass Drug Money”.

## Run it locally

```sh
node serve.ts --port 8080
# open http://127.0.0.1:8080/
```

## Hand it in

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
# writes out/app/, out/screenshots/ and out/dossier.json
```

## Screenshot staging

The app reads query parameters on load: `view=roadmap`, `view=trophy&id=…`,
`grade=silver`, `demo=1` (seeds 13 of 55 earned), `spoilers=on|off`.

The four screenshots are real renders of the running app: the checklist with
demo progress, the roadmap, the missable trophy's detail view, and the
checklist filtered to silver.

## Sources

PowerPyx, Push Square (18 Nov 2026), GTA BOOM, KeenGamer and Insider Gaming.
The list is as reported from the released game by those outlets; Rockstar,
Sony and Microsoft have not published the list themselves, and a few cryptic
trophies still have unconfirmed methods, which the app marks as unconfirmed
rather than guessing.

## License

MIT — see LICENSE. Unofficial fan work; Grand Theft Auto is a trademark of
Rockstar Games / Take-Two Interactive. No official artwork or logos are used.
