"use strict"


settings.title = "The Adventures of Koww the Magician (QuestJS port)"
settings.author = "Brian the Great"
settings.version = "0.2.4"
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
  const statusEl = document.createElement('div')
  statusEl.id = 'status-bar'
  statusEl.innerHTML = `<div id="location-bar">Koww's Chasm</div>`
  document.querySelector('#inner').prepend(statusEl)
  lang.go_successful = false
  document.getElementById('panes').style.right = ((window.innerWidth - 770)/2) + 'px'
  window.addEventListener('resize', function(event) {document.getElementById('panes').style.right = ((window.innerWidth - 770)/2) + 'px';}, true)
}

settings.afterLoad = function(){
   msg(`<div id="status-bar"><div id="location-bar">{hereName}</div></div>`)
  document.getElementById('panes').style.right = ((window.innerWidth - 770)/2) + 'px'
  window.addEventListener('resize', function(event) {document.getElementById('panes').style.right = ((window.innerWidth - 770)/2) + 'px';}, true)
}

settings.statusPane = false

settings.panes = "right"
settings.panesCollapseAt = 958
settings.hintInvisiClues = true
settings.inventoryPane = [
  {name:'Items Held', alt:'itemsHeld', test:settings.isHeldNotWorn, getLoc:function() { return player.name; } },
  {name:'Places and Objects Here', alt:'itemsHere', test:settings.isHere, getLoc:function() { return player.loc; } },
]

settings.roomTemplate = [
  "You are in {color:red:{hereName}}.",
  "{hereDesc}"
]

settings.oxfordComma = true

settings.libraries.push('item-links')
