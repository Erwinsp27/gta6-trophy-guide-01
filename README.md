# Neon Vice — GTA VI Trophy Guide & Tracker

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/Erwinsp27/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/Erwinsp27/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

Built for the [make.fun bounty](https://make.fun/bounty/gta6-trophy-guide-01) — Build the best GTA 6 trophy guide ($250 in USDC).

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

## How to use

Open the app and you get the full list of 55 trophies, each with its name,
description, and grade. Tap a trophy's checkbox once you have earned it —
your progress is saved in the browser, so it is still there when you come
back. Narrow the list down with the grade and earned-status filters, the
search box, or the missable-only filter, and flip the spoiler toggle if you
want hidden story trophies kept out of sight until you earn them. The
roadmap tab lays out the road to platinum in order: the story run takes
roughly 60–80 hours, reaching 100% adds up to around 100 hours total, and
the final cleanup of whatever is left takes about 10 more hours. If you
switch devices or want a fresh start, export your progress to a file,
import it back later, or reset everything with one click.

## Trophy breakdown

The set adds up to 55 trophies: one Platinum, “Vice Got a Price!”, two
Gold, six Silver, and 46 Bronze — and every one of them is earned in
single-player, with no online trophies at all. Twelve of them are story
trophies tied to the campaign, 28 are hidden until unlocked, and there is
exactly one missable trophy in the whole list: “Positive Mental Attitude”,
which asks you to meditate at the Chapter 1 balcony spot right after the
“Down to Earth” mission, before you move past Chapter 1. The platinum is
rated around 4 out of 10 in difficulty and fits in a single playthrough —
just remember that turning on cheats disables trophies, so keep them off
while you hunt.

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
