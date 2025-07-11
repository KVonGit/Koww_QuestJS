"use strict"


settings.title = "The Adventures of Koww the Magician (QuestJS port)"
settings.author = "Brian the Great"
settings.version = "0.1.2 beta"
settings.thanks = ["Brian the Great","AlexWarren","cellarderecho","ThePix","DavyB","Pertex"]
settings.warnings = "Puns, Mild Profanity"
settings.playMode = "play"

settings.favicon = "favicon-32x32.png"

settings.textInput = true

settings.setup = function() {
  for (const key in w) {
    const o = w[key]
    if (o.dests) {
      for (const ex of o.dests) {
        const dest = w[ex.name]
        if (!dest) log('Warning: ' + ex + ' in the destinations for ' + key + ' is not a location.')
        ex.origin = o
        ex.dir = 'to ' + (ex.dirAlias ? ex.dirAlias : dest.alias)
      }
    }
  }
  lang.go_successful = false
}

settings.statusPane = false

settings.panes = "right"

settings.inventoryPane = [
  {name:'Items Held', alt:'itemsHeld', test:settings.isHeldNotWorn, getLoc:function() { return player.name; } },
  {name:'Places and Objects Here', alt:'itemsHere', test:settings.isHere, getLoc:function() { return player.loc; } },
]

settings.roomTemplate = [
  "You are in {color:red:{hereName}}.",
  "{hereDesc}"
]

settings.libraries.push('item-links')
