"use strict"


settings.title = "The Adventures of Koww the Magician (QuestJS port)"
settings.author = "Brian the Great"
settings.version = "0.3"
settings.ifid = "BBD5D89-78A2-4278-A85E-BC291A41FFE8"
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
    document.addEventListener("click", function (e) {
      // If click is not inside any .dropdown-content or a dropdown trigger
      const isDropdown = e.target.closest(".dropdown-content");
      const isTrigger = e.target.closest(".dropdown");

      if (!isDropdown && !isTrigger) {
        for (const el of document.querySelectorAll(".dropdown-content")) {
          el.style.display = "none";
        }
      }
    });
  }
  const statusEl = document.createElement('div')
  statusEl.id = 'status-bar'
  statusEl.innerHTML = `<div id="location-bar">Koww's Chasm</div>`
  document.querySelector('#inner').prepend(statusEl)
  lang.go_successful = false
  document.getElementById('panes').style.right = ((window.innerWidth - 770)/2) + 'px'
  window.addEventListener('resize', function(event) {document.getElementById('panes').style.right = ((window.innerWidth - 770)/2) + 'px';}, true)
  document.querySelector('#exit-Help').children[0].className = document.querySelector('#exit-Help').children[0].className.replace('info','question')
}

settings.afterLoad = function(){
   msg(`<div id="status-bar"><div id="location-bar">{hereName}</div></div>`)
  document.getElementById('panes').style.right = ((window.innerWidth - 770)/2) + 'px'
  window.addEventListener('resize', function(event) {document.getElementById('panes').style.right = ((window.innerWidth - 770)/2) + 'px';}, true)
  document.querySelector('#exit-Help').children[0].className = document.querySelector('#exit-Help').children[0].className.replace('info','question')  
}

settings.statusWidthLeft = 120,    // How wide the left column is in the status pane
settings.statusWidthRight = 40,    // How wide the right column is in the status pane
settings.status =[
  function() { return "<td>Moves:</td><td>" + game.turnCount + "</td>"; },
  function() { return "<td>Score:</td><td>" + player.score + "</td>"; }
]

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
