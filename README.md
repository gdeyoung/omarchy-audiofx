# Audio FX

An Omarchy bar widget for full audio control on PipeWire: volume, output and
input device pickers, a per-app mixer, and one-tap audio effects — 3D,
Bass, Night, and Movie — applied without touching config files.

## Features

- **Volume + device switching** — output and input volume sliders with live
  meters, plus one-click switching between sinks and sources.
- **Per-app mixer** — set volume for individual streams, and choose whether
  effects apply to *everything* or *all except* selected apps.
- **Audio effects** — 3D (with strength slider), Bass, Night, and Movie
  presets built on PipeWire filter-chain, toggled from the panel.
- **Bar widget** — speaker icon with live output level; click to open.

## Requirements

- Omarchy 4.x (Quickshell)
- PipeWire + WirePlumber
- `pw-dump`, `wpctl` (shipped with PipeWire/WirePlumber)

## Install

From a plugin marketplace, or manually:

```sh
git clone https://github.com/gdeyoung/omarchy-audiofx ~/.config/omarchy/plugins/gdeyoung.audiofx
omarchy restart shell
```

Then enable **Audio FX** in the Omarchy plugin settings and add it to your bar.

## License

MIT — see [LICENSE](LICENSE).
