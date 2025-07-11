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
      msg("Waste of a good turn.");
    }
    return true;
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
        msg("On top of the mountain, you find a bunch of purple paint, which you take.  After descending again, you ditch your grappling hook.")
        w.grapplingHook.loc = false
        w.purplePaint.moveToFrom({char:player, item:w.purplePaint}, "char", "possitems")
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
      return currentLocation.climb_up.use(player, currentLocation.climb_up) ? world.SUCCESS : world.FAILURE
    }
    if (currentLocation.hasExit('climb_down')) {
      return currentLocation.climb_down.use(player, currentLocation.climb_down) ? world.SUCCESS : world.FAILURE
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
       msg("You fly up and over the chasm!<br/><br/><br/>Congratulations, you have found out that you were better off where you started anyway.  The grass here is brown and crackly.  Too bad!  And... OH NO!  Now you're trapped here, alone with the NecroYaks!  Stay tuned for \"The Adventures of Koww the Magician II -- Escape from the NecroYaks!\"<br/><br/>")
       w.flyScroll.loc = false
       io.finish()
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
    return world.SUCCESS
  }
}))

commands.unshift(new Cmd('No',{
  regex:/^no$/,
  script:function(){
    msg("You sound rather negative.")
    return world.SUCCESS
  }
}))