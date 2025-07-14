new Cmd('SearchLocation', {
  regex:/^search$/,
  script:function() {
    // w is the game object, and player.loc is the name of the current room
    // So w[player.loc] is the current room
    // Check if it has a 'searchable' attribute and if it is set to true
    if (typeof w[player.loc].searchable !== 'undefined' && w[player.loc].searchable){
      // The room has the searchable attribute set to true.
      // Run its search script attribute.
      w[player.loc].search();
    }
    else{
      msg("Your search reveals nothing.");
    }
    return world.SUCCESS;
  },
})

commands.unshift(new Cmd('GoTo', {
  npcCmd:true,
  regex:/^(?:go to|go|enter) (.+)$/,
  objects:[
    {scope:parser.isHere}
  ],
  script:function(objects) {
    const entrance = objects[0][0]
    if (typeof entrance.otherSide == 'undefined') return failedmsg("{pv:item:be:true} not an entrance.", {item:entrance})
    for (const ex of currentLocation.dests) {
      log(ex.name)
      if (entrance.otherSide === ex.name) {
        return ex.use(player, ex) ? world.SUCCESS : world.FAILED
      }
    }
    return failedmsg("{pv:item:be:true} not an entrance you can get to from here.", {item:entrance})
  },
}))

commands.unshift(new Cmd('ClimbVerb', {
  regex:/^(?:climb up|climb|go up|ascend) (.+)$/,
  objects:[
    {scope:parser.isHere},
  ],
  defmsg:"{pv:item:'be:true} not something you can climb.",
}))

commands.unshift(new Cmd('Climb', {
  objects:[
  ],
  script:function() {
    if (player.loc == "phoenixMountainPass"){
      if (w.grapplingHook.loc == "player"){
        return climbThem()
      }
      else{
        msg("Those particular mountains are too steep.")
      }
      return world.SUCCESS
    }
    if (player.loc == "goblinTrail"){
      msg ("After a difficult climb, you reach the top.  You're very pleased with yourself.  Unfortunately, the ledge crumbles beneath you, and you plummet back to the ground.")
      return world.SUCCESS
    }
    if (currentLocation.hasExit('climb_up') && currentLocation.hasExit('climb_down')) return failedmsg(lang.climb_ambiguity)
    if (currentLocation.hasExit('climb_up')) {
      return currentLocation.climb_up.use(player, currentLocation.climb_up) ? world.SUCCESS : world.FAILED
    }
    if (currentLocation.hasExit('climb_down')) {
      return currentLocation.climb_down.use(player, currentLocation.climb_down) ? world.SUCCESS : world.FAILED
    }
    return failedmsg(lang.cannot_climb)
  },
  defmsg:lang.cannot_climb,
}))

commands.unshift(new Cmd('Fly', {
  regex:/^fly$/,
  script:function(){
    if(w.flyScroll.loc == "player"){
      if (player.loc === "kowwsChasm"){
       return playerWin()
      }
      else{
        msg ("Not here, not now.")
      }
    }
    else {
      msg("That's not a spell you know.  But perhaps if you could find a scroll -- like the ones owned by the Great Phoenix -- you could do so.")
    }
    return world.SUCCESS
  }
}))

commands.unshift(new Cmd('SplashMilkOnZeke', {
  regex:/^splash milk on zeke$/,
  script:function(){
    if (player.loc !== w.Zeke.loc){
      msg ("You can't see him here.")
      return world.SUCCESS
    }
    if (w.milk.loc !== "player"){
      msg ("You already gave all the milk you had to Zeke.")
      return world.SUCCESS
    }
    msg("\"Well, gee,\" says Farmer Zeke, \"I shore do like ya a lot, but I guess there's a limit!\"<br/><br/>So saying, Zeke stabs you with his pitchfork.<br/><br/><br/>Idiot.  You die.  HA HA HA HA HA!")
    io.finish()
  }
}))

findCmd('Hit').script = function(objects){
  const item = objects[0][0]
  if (item == w.Zeke){
    msg(w.Zeke.attack)
    return world.SUCCESS
  }
  msg("Violence isn't the answer.")
  return world.SUCCESS
};

/* Thanks to cellardecho! */
/*
https://github.com/ThePix/QuestJS/discussions/131#discussioncomment-13726658
*/
class MultiExit extends Exit {
  constructor(rooms, hash) {
    super("_", hash)
    this.simpleUse = function(char) {
      const thisExit = this
      if (char.name === "player") {
        showMenuWithNumbers(`Which place would you like to enter?`, rooms.map(roomString => w[roomString]), function(dest) {
          return util.defaultSimpleExitUse(char, new Exit(dest, thisExit))
        })
      }
    }
  }  
}

commands.unshift(new Cmd('Yes',{
  regex:/^y$|^yes$/,
  script:function(){
    msg("You sound very positive!")
    return world.SUCCESS_NO_TURNSCRIPTS
  }
}))

commands.unshift(new Cmd('No',{
  regex:/^no$/,
  script:function(){
    msg("You sound rather negative.")
    return world.SUCCESS_NO_TURNSCRIPTS
  }
}))

commands.unshift(new Cmd('KowwMap', {
  regex:/^map$|^show|view|display map$/,
  script:function(){
    msg ("<pre style=\"font-size:1em;line-height:1.2em;\"><code>=======<br/>&#124;  N  &#124;<br/>&#124; W&#124;E &#124;<br/>&#124;  S  &#124;<br/>=======<br/><br/> {ifNot:zekesFarm.visited:0:{ifNot:landOfTheNecroYaks.visited:0: [{ifNot:ambushPoint.visited:0:Deep in NecroYak Territory:????????????????????????}]<br/>              &#124;}<br/>    [{ifNot:landOfTheNecroYaks.visited:0:Land of the NecroYaks:?????????????????????}]<br/>              &#124;}<br/>[Chasm*]-[{ifNot:zekesFarm.visited:0:Zeke's Farm:??????????}]{ifNot:zekesFarm.visited:0:-[{ifNot:phoenixMountainPass.visited:0:Phoenix Mountain Pass:?????????????????????}]{ifNot:phoenixMountainPass.visited:0:-[{ifNot:phoenixPeak.visited:0:Phoenix Peak:????????????}]}}<br/>{ifNot:zekesFarm.visited:0:        /     &#124;       \\<br/>    [{ifNot:zekesSilo.visited:0:Silo:????}]    &#124;    [{ifNot:zekesFarmhouse.visited:0:Farmhouse:?????????}]<br/>              &#124;<br/>        [{ifNot:goblinTrail.visited:0:Goblin Trail:????????????}]<br/> {ifNot:goblinTrail.visited:0:             &#124;            <br/>        [{ifNot:goblinLair.visited:0:Goblin Lair:???????????}]<br/> {ifNot:goblinLair.visited:0:             &#124;<br/>   [{ifNot:insideTheGoblinLair.visited:0:Inside the Goblin Lair:??????????????????????}]}}}<br/><br/><br/>(* Starting location)<br/></code><br/>    </pre>")
    return world.SUCCESS_NO_TURNSCRIPTS
  }
}))

tp.text_processors.exit = function(arr,params){
  if(arr.length === 1){
    if (typeof itemLinks == 'undefined') return arr[0]
    return '<span class="exit-link" onclick="runCmd(\'' +
        arr[0] +
        "')\">" +
        arr[0] +
        "</span>"
  }
  else{
    if (typeof itemLinks == 'undefined') return arr[1]
    return '<span class="exit-link" onclick="runCmd(\'' +
        arr[0] +
        "')\">" +
        arr[1] +
        "</span>"
  }
}

world.enterRoom = function(exit) {
  if (currentLocation.beforeEnter === undefined) {
    return errormsg("This room, " + currentLocation.name + ", has no 'beforeEnter` function defined.  This is probably because it is not actually a room (it was not created with 'createRoom' and has not got the DEFAULT_ROOM template), but is an item. It is not clear what state the game will continue in.")
  }
  // Modified to disable all exit links when changing locations
  if (typeof itemLinks != 'undefined') itemLinks.disableAllLinks("exit-link");
  // End of mod
  settings.beforeEnter(exit)
  if (currentLocation.visited === 0) {
    if (currentLocation.roomSet) {
      currentLocation.roomSetOrder = 1
      for (const el of settings.roomSetList[currentLocation.roomSet]) {
        if (el.visited) currentLocation.roomSetOrder++
        if (el.name === currentLocation.name) el.visited = true
      }
    }
    currentLocation.beforeFirstEnter(exit)
  }
  currentLocation.beforeEnter(exit)
  world.enterRoomAfterScripts(exit);
}

var usingPronoun = false

parser.findInScope = function(s, scopes, cmdParams) {
  parser.msg("Now matching: " + s)
  // First handle IT etc.
  for (const key in lang.pronouns) {
    if (s === lang.pronouns[key].objective && parser.pronouns[lang.pronouns[key].objective]) {
      // Modified to check scope
      if (!window.usingPronoun) msg("(" + lang.getName(parser.pronouns[lang.pronouns[key].objective], {noLink:true, article:DEFINITE}) + ")", {}, 'parser')
      window.usingPronoun = true
      s = lang.getName(parser.pronouns[lang.pronouns[key].objective], {noLink:true}).toLowerCase()
      // End of mod
    }
  }
      
  for (let i = 0; i < scopes.length; i++) {
    parser.msg("..Looking for a match for: " + s + " (scope " + (i + 1) + ")")
    const objList = this.findInList(s, scopes[i], cmdParams);
    if (objList.length > 0) {
      return [objList, scopes.length - i];
    }
  }
  return [[], 0];
}

lang.object_unknown_msg =function(name) {
  for (const key in lang.pronouns) {
    if (name === lang.pronouns[key].objective && parser.pronouns[lang.pronouns[key].objective]) {
      name = lang.getName(parser.pronouns[lang.pronouns[key].objective])
    }
  }
  return "There doesn't seem to be anything you might call '" + name + "' here.";
  //return "You can't see that here."
}

DEFAULT_ROOM.examine = function() {
  return '{hereDesc}'
}

/* FIX SCROLLING ON MOBILE */

io.scrollToEnd = function() {
  if (settings.autoscroll) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
}

// This should be called after each turn to ensure we are at the end of the page and the text box has the focus
function endTurnUI(update) {
  if (!currentLocation) return errormsg("currentLocation not set (" + (player ? 'but player is' : 'nor is player') + ")")
  if (settings.panes !== 'none' && update) {
    // set the lang.exit_list
    for (let exit of lang.exit_list) {
      const el = document.querySelector('#exit-' + exit.name)
      if (!el) continue
      if (currentLocation.hasExit(exit.name, {excludeScenery:true}) || exit.type === 'nocmd') {
        el.style.display = 'block'
      }
      else {
        el.style.display = 'none'
      }
    }
    io.updateStatus()
  }
  for (let o of io.modulesToUpdate) {
    o.update(update)
  }
  io.updateUIItems()
  if (settings.updateCustomUI) settings.updateCustomUI()

  io.scrollToEnd()
  // give focus to command bar
  // Modified this last line to add the setTimeout for mobile browsers
  if (settings.textInput) { setTimeout(function(){document.querySelector('#textbox').focus();},150) }
}

io.outputFromQueue = function() {
  if (io.outputSuspended) return
  if (io.outputQueue.length === 0) {
    if (!io.disableTextFunction) io.enable()
    return
  }
  
  //if (settings.textInput) document.querySelector('#input').style.display = 'block'
  const data = io.outputQueue.shift()
  if (data.action === 'wait' && (!settings.disableWaitInDevMode || settings.playMode !== 'dev')) {
    io.disable()
    io.outputSuspended = true
    //if (settings.textInput) document.querySelector('#input').style.display = 'none'
    data.tag = 'p'
    data.onclick="io.unpause()"
    if (!data.text) data.text = lang.click_to_continue
    io.print(data)
  }
  if (data.action === 'delay' && (!settings.disableWaitInDevMode || settings.playMode !== 'dev')) {
    log('here')
    io.disable()
    io.outputSuspended = true
    if (data.text) {
      data.tag = 'p'
      io.print(data)
    }
    setTimeout(io.unpause, data.delay * 1000)
  }
  if (data.action === 'output') {
    const html = io.print(data)
    io.speak(data.text);
    saveLoad.transcriptAppend(data);
    io.outputFromQueue()
  }
  if (data.action === 'func') {
    if (data.func()) io.outputFromQueue()
  }
  if (data.action === 'effect') {
    io.disable()
    // need a way to handle spoken and transcript here
    data.effect(data)
  }
  if (data.action === 'clear') {
    document.querySelector('#output').textContent = "";
    io.outputFromQueue()
  }
  if (data.action === 'sound') {
    if (!settings.silent) {
      const el = document.getElementById(data.name)
      el.currentTime = 0
      el.play()
    }
  }
  if (data.action === 'ambient') {
    for (let el of document.getElementsByTagName('audio')) el.pause()
    if (!settings.silent && data.name) {
      const el = document.getElementById(data.name)
      el.currentTime = 0
      el.loop = true
      el.play()
      if (data.volume) el.volume = data.volume / 10
    }
  }
  
  io.scrollToEnd()
  // Modified this last line to add the setTimeout for mobile browsers
  if (settings.textInput) { setTimeout(function(){document.querySelector('#textbox').focus();},150) }
}

function pitchproc(){
  msg("You stab the pitchfork into the haystack.  Lo and behold, the haystack falls down into a hole in the ground, along with the pitchfork!  Inside the hole is a jade statuette, which you take.")
  w.pitchfork.loc = false
  w.jadeStatuette.moveToFrom({char:player, item:w.jadeStatuette}, "char", "possitems")
  player.score += 40
  msg ("Your score has increased by 40.", {}, 'parser')
  return world.SUCCESS
}

function getDuckTurd(){
  if (player.loc == 'zekesFarm'){
    msg("You throw the something into the pond.  The ducks swarm around it in curiosity.  You take the opportunity to grab a duck turd without being noticed!")
    w.something.loc = false
    w.duckTurd.moveToFrom({char:player, item:w.duckTurd}, "char", "possitems")
    player.score += 40
    msg ("Your score has increased by 40.", {}, 'parser')
    return world.SUCCESS
  }
  msg ("Not here, not now.")
  return world.FAILED
}

function climbThem(){
  msg("On top of the mountain, you find a bunch of purple paint, which you take.  After descending again, you ditch your grappling hook.")
  w.grapplingHook.loc = false
  w.purplePaint.moveToFrom({char:player, item:w.purplePaint}, "char", "possitems")
  player.score += 40
  msg ("Your score has increased by 40.", {}, 'parser')
  return world.SUCCESS
}

function playerWin(){
  msg("You fucking fly up and over the chasm!<br/><br/><br/>Congratulations, you have found out that you were better off where you started anyway.  The grass here is brown and crackly.  Too bad!  And... OH NO!  Now you're trapped here, alone with the NecroYaks!  Stay tuned for \"The Adventures of Koww the Magician II -- Escape from the NecroYaks!\"<br/><br/>")
  w.flyScroll.loc = false
  player.score += 19
  msg ("Your score has increased by 19.", {}, 'parser')
  let rank
  if (player.score < 100) {
    rank = "BABY KOWW"
  }
  else if (player.score < 200) {
    rank = "HALF-FAST KALF"
  }
  else if (player.score < 300) {
    rank = "MOO-STLY HARMLESS"
  }
  else if (player.score < 420) {
    rank = "MAGICIAN"
  }
  else {
    rank = "GRAND MOO-STER WIZARD"
  }
  msg("<br/><br/>In that game, you scored {show:player:score} of a possible {show:player:maxScore}, in {show:game:turnCount} turn{ifIs:game:turnCount:1::s}, granting you the rank: {b:" + rank + "}.", {game:game})
  io.finish()
  return world.SUCCESS
}

function phoenixProc(){
  msg("\"Thank you; you have found my wing feather.  In the wrong hands, that could have been very dangerous.  I will give you this 'fly' scroll to compensate you for your hard work.  Use the scroll to fly, but it will only work once.\"")
  w.wingFeather.loc = false
  w.flyScroll.moveToFrom({char:player, item:w.flyScroll}, "char", "possitems")
  player.score += 40
  msg ("Your score has increased by 40.", {}, 'parser')
  return world.SUCCESS
}

function phoenixKill(){
  msg ("\"Then give it to me quickly!  What..... You don't have my wing feather at all, do you?  You shammer.  I was going to dismiss you without hurting you, but I'm afraid now I'll have to kill you.\"")
  msg ("The Resplendent Magnificent Phoenix bats you with one claw.  You roll back down the mountainside, finally coming to a complete stop looking very much like a well-done steak.")
  msg("<br/><br/>Idiot.  You die.  HA HA HA HA HA!")
  io.finish()
  return world.SUCCESS
}

findCmd('MetaScore').script = function(){
  let rank
  if (player.score < 100) {
    rank = "BABY KOWW"
  }
  else if (player.score < 200) {
    rank = "HALF-FAST KALF"
  }
  else if (player.score < 300) {
    rank = "MOO-STLY HARMLESS"
  }
  else if (player.score < 420) {
    rank = "MAGICIAN"
  }
  else {
    rank = "GRAND MOO-STER WIZARD"
  }
  msg ("Your score is {show:player:score} of a possible {show:player:maxScore}, in {show:game:turnCount} turn{ifIs:game:turnCount:1::s}, granting you the rank: {b:" + rank + "}.", {game:game})
}

function phoenixSpeak(){
  msg("\"The Resplendent Magnificent Phoenix demands to know {i:why} such a weakling as you has come here!  If you do not have my wing feather with you, I'm afraid I must ask you to leave {i:immediately!}  Now, do you have my wing feather or not -- {b:Yes} or {b:No}?\"")
  askText("", function(result) {
    if (result.match(lang.yes_regex)) {
      if (w.wingFeather.loc == "player"){
        return phoenixProc()
      }
      else{
        return phoenixKill()
      }
    }
    else if (result.match(lang.no_regex)){
      msg ("\"Then leave me immediately, as I do not appreciate company.\"")
      return world.SUCCESS
    }
    else {
      setTimeout(function(){phoenixDemands()},1)
    }
  })
}

lang.no_regex = /^no|n$/i;

function phoenixDemands(){
  msg("\"I asked you a question!!!  Please answer {b:Yes} or {b:No} or so help me, I will not let you leave here alive!\"")
  askText("", function(result) {
    console.log('demands:',result)
    if (result.match(lang.yes_regex)) {
      if (w.wingFeather.loc == "player"){
        return phoenixProc()
      }
      else{
        return phoenixKill()
      }
    }
    else if (result.match(lang.no_regex)){
      msg ("\"Then leave me immediately, as I do not appreciate company.\"")
      return world.SUCCESS
    }
    else {
      setTimeout(function(){phoenixDemands()},100)
    }
  })
}

findCmd('PutIn').script = function(objects) {
  console.log(objects)
  if (objects[0][0] == w.something) {
    return w.something.use()
  }
  return handleInOutContainer(player, objects, "drop", handleSingleDropInContainer)
}

findCmd('MetaOops').regexes = [ /^(?:oops (.+))$/ ]
findCmd('MetaOops').script = function(objects) {
  console.log('MetaOopsy!')
  return io.againOrOops(false,objects)
}
findCmd('MetaOops').objects = [
  {special:'text'},
]

io.againOrOops = function(isAgain,objects) {
  if (io.savedCommands.length === 0) {
    metamsg(lang.again_not_available)
    return world.FAILED
  }
  io.savedCommands.pop() // do not save AGAIN/OOPS
  if (isAgain) {
    parser.parse(io.savedCommands[io.savedCommands.length - 1])
    return world.SUCCESS_NO_TURNSCRIPTS;
  }
  else {
    if (typeof game.unrecognizedObjects == 'undefined' || game.unrecognizedObjects.length == 0){
      msg ("There is nothing to correct.", {}, 'parser')
      return world.SUCCESS_NO_TURNSCRIPTS;
    }
    let toCorrect = io.savedCommands[io.savedCommands.length - 1]
    let corrected = toCorrect.replace(game.unrecognizedObjects[game.unrecognizedObjects.length-1], objects[0])
    //document.querySelector('#textbox').value = corrected
    game.unrecognizedObjects = []
    
    const s = corrected
    log(s)
    msg ("(" + s + ")", {}, 'parser')
    if (s) {
      if (io.savedCommands[io.savedCommands.length - 1] !== s && !io.doNotSaveInput) {
        io.savedCommands.push(s)
      }
      io.savedCommandsPos = io.savedCommands.length;
      parser.parse(s);
      if (io.doNotEraseLastCommand) {
        io.doNotEraseLastCommand = false
      } else {
        document.querySelector('#textbox').value = ''
      }
    }
  }
}