// Argv-safe clipboard writes: text rides stdin as one base64 line and never
// appears in a process argument (ps/journald-safe).
.pragma library

function argv() {
  return ["sh", "-c",
    'IFS= read -r b64; printf "%s" "$b64" | base64 -d | exec wl-copy -t text/plain;charset=utf-8',
    "sh"]
}

function run(proc, text) {
  if (text === undefined || text === "") return
  proc.command = argv()
  proc.stdinData = Qt.btoa(unescape(encodeURIComponent(text))) + "\n"
  proc.running = true
}
