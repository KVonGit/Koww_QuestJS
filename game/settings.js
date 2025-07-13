"use strict"


settings.title = "The Adventures of Koww the Magician (QuestJS port)"
settings.author = "Brian the Great"
settings.version = "0.1.8"
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
  msg(`<div id="status" style="display: block; height: 30px; position: fixed; top: 0px; margin-left: auto; margin-right: auto; font-size: 1.25em; padding:2px; color: #e1ebf2; background: black; min-width: 600px; z-index:100;"><div id="location" style="padding-left:4px;padding-top:4px; font-family:Antonio, sans-serif;">Koww's Chasm</div></div>`)
  lang.go_successful = false
}

settings.statusPane = false

settings.panes = "right"
settings.panesCollapseAt = 953
settings.hintInvisiClues = true
settings.inventoryPane = [
  {name:'Items Held', alt:'itemsHeld', test:settings.isHeldNotWorn, getLoc:function() { return player.name; } },
  {name:'Places and Objects Here', alt:'itemsHere', test:settings.isHere, getLoc:function() { return player.loc; } },
]

settings.roomTemplate = [
  "You are in {color:red:{hereName}}.",
  "{hereDesc}"
]

settings.libraries.push('item-links')
