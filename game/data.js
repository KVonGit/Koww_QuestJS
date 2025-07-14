"use strict"
createItem("player", PLAYER(), {
  examine:function() {
    msg ("You are Koww the Magician!")
  },
  loc:"kowwsChasm",
  score:0,
  maxScore: 420
})

createItem("milk", {
  loc:"player",
  examine:"Your magic milk, Zeke's favorite!",
  defArticle:"your",
  indefArticle:"your",
  synonyms:["my milk"],
  drop:"Why would you do that?  Awful waste of milk.",
    verbFunction:function(list) {
    list.splice("Examine")
    list.push("Give")
  }
})

createRoom("possitems")

createItem("pitchfork", {
  loc:"possitems",
  examine:"A sharp looking tool!",
  use:function(){
    return pitchproc()
  },
  useWith:function(char,obj){
    return pitchproc()
  },
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Use")
  }
})

createItem("kowwNothing", {
  loc:"possitems",
  alias:"nothing",
  examine:"You see nothing.",
  getDisplayName:function(){return "nothing"},
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Give")
  }
})

createItem("jadeStatuette", {
  alias:"jade statuette",
  loc:"possitems",
  examine:"An ugly statuette, made of jade.",
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Give")
  }
})

createItem("something", TAKEABLE(), {
  loc:"possitems",
  examine:"About what you'd expect something to look like in this game.",
  getDisplayName:function(){return "something"},
  use:function(){
    if (player.loc === "zekesFarm"){
      return getDuckTurd()
    }
    msg ("Not here, not now.")
    return world.FAILED
  },
  useWith:function(char,obj){
    if (obj === w.pond) {
      return getDuckTurd()
    }
    msg ("No obvious way to use it.", {}, 'parser')
    return world.FAILED
  },
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Use")
  },
  drop: "You can't drop it."
})

createItem("duckTurd", {
  loc:"possitems",
  alias:"duck turd",
  examine:"A foul dropping.",
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Give")
  }
})

createItem("goblinSpit", {
  loc:"possitems",
  alias:"goblin spit",
  examine:"Yuck... It's chunky!",
  verbFunction:function(list) {
    list.splice("Examine")
  }
})

createItem("grapplingHook", {
  loc:"possitems",
  alias:"grappling hook",
  examine:"It looks strong enough to support a cow!",
  use:function(){
    if (player.loc === "phoenixMountainPass"){
      return climbThem()
    }
    msg ("Not here, not now.")
    return world.FAILED
  },
  useWith:function(char,obj){
    if (obj === w.mountains){
      return climbThem()
    }
    msg ("No obvious way to use it.", {}, 'parser')
    return world.FAILED
  },
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Use")
  }
})

createItem("wingFeather", {
  loc:"possitems",
  alias:"wing feather",
  examine:"A wing feather from a Phoenix.",
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Give")
  }
})

createItem("flyScroll", {
  loc:"possitems",
  alias:"Fly Scroll",
  examine:"Try using it (when in the proper location).",
  indefArticle:"the",
  defArticle:"the",
  use:function(){
    if (player.loc === "kowwsChasm"){
      return playerWin()
    }
    msg ("Not here, not now.")
    return world.FAILED
  },
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Use")
  }
})

createItem("purplePaint", {
  loc:"possitems",
  alias:"purple paint",
  examine:"It's paint, and it's purple. (You'll have to find a good place to use it!)",
  use:function(){
    if (player.loc === "zekesSilo"){
      msg("You spread the purple paint on yourself.  Suddenly Farmer Zeke bursts into song!<br/><br/>\"{i:I never saw a purple cow, and I never hope to see one; but I can tell you anyhow, I'd rather see than be one!}\"<br/><br/>Wonderful!  You have just activated the scenario's secret feature!  That's it.  Return to your home.  There's nothing more to do here.")
      w.purplePaint.loc = false
      player.score += 1
       msg ("Your score has increased by 1.", {}, 'parser')
      return world.SUCCESS
    }
    msg ("Not here, not now.")
    return world.FAILED
  },
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Use")
  }
})

createRoom("kowwsChasm", {
  alias: "Koww's Chasm",
  east: new Exit("zekesFarm"),
  desc:"You are outside in a pasture of pure, pure green.  Green as far as the eye can see.{once:  But you, Koww the Magician, are not satisfied.  The grass may be even greener on the other side of the {nm:chasm}... you must know!  Also in the area is}{notfirst:<br/><br/>You can see the {object:chasm} and} a very undramatic {nm:sign}.<br/><br/>You can go {exit:east}."
})

createItem("chasm", TAKEABLE(), {
  loc:"kowwsChasm",
  examine:"That's the chasm you simply MUST cross!  Surely the only way to cross it is to {exit:fly:FLY}!",
  take:"Don't worry, the men in the white coats will soon be here to deal with you."
})

createItem("sign", TAKEABLE(), {
  examine:"It reads: \"{i:Got milk?  Come to Farmer Zeke's mag-NIFicent silo!}\"",
  read:"It reads: \"{i:Got milk?  Come to Farmer Zeke's mag-NIFicent silo!}\"",
  take:"You yank the sign out of the ground and try to fit it in your Koww-pack.  But it just doesn't fit.  Frustrated, you put it back.",
  loc:"kowwsChasm",
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Read")
  }
})

createRoom("zekesFarm", {
  usedefaultprefix:false,
  alias:"Zeke's Farm",
  desc:"You stand outside of a small {exit:go to farmhouse:farmhouse} with a {exit:go to silo:silo} beside it.<br/><br/>There is a {nm:haystack} and a {nm:pond} here.<br/><br/>You can go {exit:west}, {exit:north}, {exit:east}, or {exit:south}.",
  south:new Exit("goblinTrail"),
  west: new Exit("kowwsChasm"),
  north:new Exit("landOfTheNecroYaks"),
  east:new Exit("phoenixMountainPass"),
  dests:[
    new Exit("zekesFarmhouse"),
    new Exit("zekesSilo")
  ],
  in:new MultiExit(["zekesFarmhouse", "zekesSilo"], {scenery:true})
})

createItem("haystack", TAKEABLE(),  {
  loc:"zekesFarm",
  examine:"About what you'd expect from a haystack.  It's made of... HAY!  You munch on it for a while.",
  take:"You take a bite of the haystack.  Yummy... tastes just like chicken!",
  eat:"You take a bite of the haystack.  Yummy... tastes just like chicken!"
})

createItem("pond", TAKEABLE(), {
  loc:"zekesFarm",
  examine:"A nice, placid pond full of little tiny duckies.  Ooo, how cute!  If you were carnivorous, they'd make you hungry.",
  take:"You sip the water from the pond.  Just what you need to wash down a bit of grazing.",
  drink:"You sip the water from the pond.  Just what you need to wash down a bit of grazing.",
  testDropIn(options){
    if (options.item === w.something){
      w.something.use()
    }
    else {
      msg ("That would be a waste.")
    }
    return false
  }
})


createItem("zekesFarmhouseEntrance", {
  loc:"zekesFarm",
  alias:"Zeke's farmhouse",
  listAlias:"<img src=\"assets/icons/houseicon.png\"> Zeke's Farmhouse",
  examine:"It's the entrance to the farmhouse.",
  otherSide:"zekesFarmhouse",
  excludeFromAll:true,
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Go to")
  }
})

createItem("zekesSiloEntrance", {
  loc:"zekesFarm",
  alias:"Zeke's silo",
  listAlias:"<img src=\"assets/icons/houseicon.png\"> Zeke's Silo",
  examine:"It's the entrance to the silo.",
  otherSide:"zekesSilo",
  excludeFromAll:true,
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Go to")
  }
})

createRoom("zekesFarmhouse", {
  alias:"Zeke's Farmhouse",
  desc:"You're inside Farmer Zeke's rather cramped home.  No one's here at the moment.  Perhaps you should go away.{ifIs:table:loc:zekesFarmhouse:<br/><br/>There is a {nm:table} here.}<br/><br/>You can go {exit:out}.",
  out:new Exit("zekesFarm")
})

createItem("table", SURFACE(), {
  loc:"zekesFarmhouse",
  examine:"Hmmm, what's a table doing here?{once:  Cool! It has a {nm:treasureChest} on it!}",
  take:"Farmer Zeke took the wise precaution of bolting his table to the floor."
})

createItem("treasureChest", CONTAINER(true), {
  alias:"treasure chest",
  loc:"table",
  take:"It's too big. You could open it instead...",
  listContents:function(){return false},
  openMsg:function(){return ""},
  afterOpen:function(){
    if(w.kowwNothing.loc === "possitems"){
      msg("Ooooo!  There's nothing inside!  Told ya you should have gone away.")
      w.kowwNothing.moveToFrom({char:player, item:w.kowwNothing}, "char", "possitems")
      w.treasureChest.loc = false
      w.table.loc = false
      player.score += 40
      msg ("Your score has increased by 40.", {}, 'parser')
      return world.SUCCESS
    }
  }
})

createRoom("zekesSilo", {
  alias:"Zeke's Silo",
  desc:"Gee, this place smells just like rotting feed.  Standing in the silo, grinning like the idiot that he is, is Farmer {nm:Zeke}.<br/><br/>You can go {exit:out}.",
  out:new Exit("zekesFarm")
})

createItem("Zeke", NPC(false), {
  properName:true,
  loc:"zekesSilo",
  listAlias:"Zeke (character)",
  examine:"He's wearing a straw hat and at least one of his teeth is rotting away, but he seems pleased as punch that you've arrived.",
  talkto:"\"Hey there, good buddy!{ifIs:milk:loc:player: Say, bein' a wizard an' all, couldja find it in yer heart to gimme some magic milk?  I'm all out!}\"",
  attack:"You may be an evil sorcerer, but at least you're an ETHICAL evil sorcerer.  No killing allowed!  Especially not of idiots.  They don't know they're idiots.",
  receiveItems:[
    {
      item:w.milk,
      script:function(){
        msg("\"Well, thanks a lot, good buddy!  Well, tell ya what, why don't I give ya this here pitchfork ta comp'n'sate ya fer yer milk.\"")
        w.milk.loc = false
        w.pitchfork.moveToFrom({char:player, item:w.pitchfork}, "char", "possitems")
        player.score += 40
        msg ("Your score has increased by 40.", {}, 'parser')
        return world.SUCCESS
      }
    },
    {
      msg:"Zeke couldn't care less about your damn item.",
      failed:true,
    },
  ],
  verbFunction:function(list) {
    list.push("Speak to")
  },
})



createRoom("goblinTrail", {
  alias:"Goblin Trail",
  desc:"The stench of goblins permeates this place.{once:  Goblins are small, annoying creatures who like to fight anyone who looks weak.  Fortunately, you don't look weak.}<br/><br/>The {nm:road} leads {exit:north} or {exit:south}.",
  north:new Exit("zekesFarm"),
  south:new Exit("goblinLair")
})

createItem("road", TAKEABLE(), {
  indefArticle:"the",
  loc:"goblinTrail",
  examine:"It's made of dirt.  Concrete hasn't been invented yet.",
  take:"But you're already taking the road!  You're taking it either north or south!  Har har har!  Hey, I saw a car transform the other day!  Yeah, it turned into a driveway!"
})

createRoom("goblinLair", {
  alias:"Goblin Lair",
  desc:"About twenty goblins patrol the front of {once:a}{notfirst:this} massive cave complex.{once:  They eye you for a moment, then decide not to attack.  You return the favor and don't kill them.}<br/><br/>There is a {nm:cliff} here.<br/><br/>A {nm:goblinGuard} is nearby.<br/><br/>You can go {exit:in:Inside the Goblin Lair}.<br/><br/>You can go {exit:north}.",
  north:new Exit("goblinTrail"),
  in:new Exit("insideTheGoblinLair", {scenery:true}),
  dests:[
    new Exit("insideTheGoblinLair")
  ],
  up:new Exit('goblinLair', {scenery:true, simpleUse:function(char) {
    msg (w.cliff.climbverb)
    return world.FAILED
  }})
})

createItem("goblinGuard", NPC(false), {
  loc:"goblinLair",
  alias:"Goblin guard",
  listAlias:"Goblin guard",
  defArticle:"the",
  indefArticle:"the",
  examine:"It's very ugly, like most of its kind.  Don't get too close; you could faint from the smell.",
  talkto:"\"Yu wan go cave?  No try no funny bizniss -- I can tell.{ifIs:w:something:loc:possitems:  Me so grate! Me giv yu sumthin win yu have nuthin!}\"",
  receiveItems:[
    {
      item:w.kowwNothing,
      script:function(){
        msg("\"Ooooo!  Nuthing!  Jus wut I all ways want'd!  Inn ex chaynge, I giv yu summ thing!\"")
        w.kowwNothing.loc = false
        w.something.moveToFrom({char:player, item:w.something}, "char", "possitems")
        player.score += 40
        msg ("Your score has increased by 40.", {}, 'parser')
        return world.SUCCESS
      }
    },
    {
      msg:"The Goblin guard couldn't care less about your damn item.",
      failed:true,
    },
  ],
  verbFunction:function(list) {
    list.push("Speak to")
  },
  pronouns:lang.pronouns.thirdperson
})

createItem("cliff", TAKEABLE(), {
  loc:"goblinLair",
  examine:"It's a cliff; you could {command:climb it}, but it might be a difficult climb.",
  take:"If you want to {command:climb the cliff}, say so!",
  climbverb:"After a difficult climb, you reach the top.  You're very pleased with yourself.  Unfortunately, the ledge crumbles beneath you, and you plummet back to the ground.",
  pronouns:lang.pronouns.plural,
  verbFunction:function(list) {
    list.push("Climb")
  },
})

createItem("insideTheGoblinLairEntrance", {
  loc:"goblinLair",
  alias:"Inside the Goblin Lair",
  listAlias:"<img src=\"assets/icons/houseicon.png\"> Inside the Goblin Lair",
  examine:"It's the entrance to the goblin lair.",
  otherSide:"insideTheGoblinLair",
  excludeFromAll:true,
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Go to")
  }
})

createRoom("insideTheGoblinLair", {
  alias:"Inside the Goblin Lair",
  desc:"You are escorted to the Goblin King's throne room, a large chamber ornamented with statues of nude female goblins.{once:  You try hard to avoid puking.}The {nm:goblinKing} is here.<br/><br/>You can go {exit:out}.",
  out:new Exit("goblinLair")
})

createItem("goblinKing", NPC(false), {
  loc:"insideTheGoblinLair",
  alias:"Goblin King",
  listAlias:"Goblin King",
  defArticle:"the",
  indefArticle:"the",
  examine:"An officious-looking, double-chinned goblin monarch sits royally atop a throne of deer hide.",
  talkto:"\"Hoo hoo hoo!  Goblinz{ifIs:goblinSpit:parent:possitems: so grate, our spit is assid}!{ifIs:w:goblinSpit:loc:possitems:  We spit on yu if yu make us angree!}{ifIs:jadeStatuette:loc:possitems:  If yu hav tiny statyoo of jade, we giv yu nice thing!}\"",
  receiveItems:[
    {
      item:w.jadeStatuette,
      script:function(){
        msg("\"Ooooo!  You find goblinn lost statyoo!  We giv yu wun jar of spit!\"")
        w.jadeStatuette.loc = false
        w.goblinSpit.moveToFrom({char:player, item:w.goblinSpit}, "char", "possitems")
        player.score += 40
        msg ("Your score has increased by 40.", {}, 'parser')
        return world.SUCCESS
      }
    },
    {
      item:w.duckTurd,
      script:function(){
        msg("\"Ooooo!  GIMME GIMME GIMME!  Duck turd favorite goblin food!  We giv yu grapple hook!\"")
        w.duckTurd.loc = false
        w.grapplingHook.moveToFrom({char:player, item:w.grapplingHook}, "char", "possitems")
        player.score += 40
        msg ("Your score has increased by 40.", {}, 'parser')
        return world.SUCCESS
      }
    },
    {
      msg:"The Goblin King couldn't care less about your damn item.",
      failed:true,
    },
  ],
  verbFunction:function(list) {
    list.push("Speak to")
  },
})

createItem("statues", TAKEABLE(), {
  loc:"insideTheGoblinLair",
  scenery:true,
  examine:"Apparently, the goblin idea of beauty is the same as the bovine idea of putridity.  You'd prefer not to look at these statues.",
  take:"That would be difficult, considering the statues are about seven feet tall, are made of stone, weigh about a ton, and are guarded by some mean-looking goblins.",
  pronouns:lang.pronouns.plural
})

createRoom("landOfTheNecroYaks", {
  alias:"Land of the NecroYaks",
  desc:"The greenness of the farmland dissolves into gray bleakness as you pass into the land of the NecroYaks.{once:  Yaks are the sworn enemies of cows -- you'd better stay on your toes!}<br/><br/>There is a {nm:sign1} here.<br/><br/>You can go {exit:north} or {exit:south}.",
  south:new Exit("zekesFarm"),
  north:new Exit("ambushPoint")
})

createItem("sign1", TAKEABLE(), {
  alias:"sign",
  loc:'landOfTheNecroYaks',
  examine:"It reads: \"Unless you own a vial of acid that you can give to the NecroYaks for their sinister experiments, do not proceed on pain of Death!\"",
  read:"It reads: \"Unless you own a vial of acid that you can give to the NecroYaks for their sinister experiments, do not proceed on pain of Death!\"",
  take:"Oh, THAT'S original."
})

createRoom("ambushPoint", {
  alias:"Deep in NecroYak Territory",
  desc:"A cliff face blocks your way here.  It's steep -- you can't climb.  If you want to continue, you'll have to {exit:search} the face.<br/><br/>You can go {exit:south}.",
  south:new Exit("landOfTheNecroYaks"),
  searchable:true,
  search:function(){
    if (w.goblinSpit.loc === "player"){
      msg("The NecroYaks jump out and search you for acid.  They find your goblin spit, take it, and run off.  But one of them drops a phoenix feather, and you scoop it up unnoticed.  By the way, there's no way to go farther this way unless you're a yak.")
      w.goblinSpit.loc = false
      w.wingFeather.moveToFrom({char:player, item:w.wingFeather}, "char", "possitems")
      player.score += 40
      msg ("Your score has increased by 40.", {}, 'parser')
      return world.SUCCESS
    }
    else{
      msg("The NecroYaks recognize you as a cow, then jump out and kill you.<br/><br/>Idiot.  You die.  HA HA HA HA HA!<br/>")
      io.finish()
      return world.SUCCESS
    }
  }
})

createItem('cliffFace', {
  loc:"ambushPoint",
  alias:'cliff face',
  scenery:true,
  take:"Nope, but you could try searching it instead.",
  climbverb:"It's steep -- you can't climb.",
  search:function(){return findCmd('SearchLocation').script()},
  examine:"It's steep -- you can't climb."
})

createRoom("phoenixMountainPass", {
  alias:"Phoenix Mountain Pass",
  desc:"The towering {nm:mountains} surround you on all sides but back to your {exit:west}.  Passage farther {exit:east} is remotely possible, should you be brave or foolhardy enough to try it.",
  west:new Exit("zekesFarm"),
  east:new Exit("phoenixPeak"),
  up:new Exit('phoenixMountainPass', {scenery:true, simpleUse:function(char) {
    w.mountains.climbverb()
    return world.FAILED
  }})
})

createItem("mountains", TAKEABLE(), {
  loc:"phoenixMountainPass",
  examine:"They tower up almost as high as the Great Auk Mountains far, far to the north.",
  take:"After several hours of effort, you manage to chip a piece off of the mountain you're standing on.  But you accidentally let go and it plummets into the valley below.",
  climbverb:function(){
    if (w.grapplingHook.loc == "player"){
      msg("On top of the mountain, you find a bunch of purple paint, which you take.  After descending again, you ditch your grappling hook.")
      w.grapplingHook.loc = false
      w.purplePaint.moveToFrom({char:player, item:w.purplePaint}, "char", "possitems")
      player.score += 40
      msg ("Your score has increased by 40.", {}, 'parser')
    }
    else{
      msg("Those particular mountains are too steep.")
    }
    return world.SUCCESS
  },
  pronouns:lang.pronouns.plural,
    verbFunction:function(list) {
    list.push("Climb")
  },
})

createRoom("phoenixPeak", {
  alias:"Phoenix Peak",
  desc:"After hard hours of climbing, you finally reach the summit of Phoenix Peak.  Here, in all its glory, sits the {nm:resplendentMagnificentPhoenix}.<br/><br/>You can go {exit:west}.",
  west:new Exit("phoenixMountainPass")
})

createItem("resplendentMagnificentPhoenix", NPC(false), {
  loc:"phoenixPeak",
  alias:"Resplendent Magnificent Phoenix",
  listAlias:"Resplendent Magnificent Phoenix",
  defArticle:"the",
  indefArticle:"the",
  examine:"The Resplendent Magnificent Phoenix's visage is so brilliant that it hurts to look at it.",
  talkto:function(){
    return phoenixSpeak()
  },
  receiveItems:[
    {
      item:w.wingFeather,
      script:function(){
        return phoenixProc()
      }
    }
  ],
  verbFunction:function(list) {
    list.push("Speak to")
  },
})

createItem("locationBarTurnscript", 
  {
    eventPeriod:1,
    eventActive:true,
    eventScript:function() { 
      document.querySelector('#location-bar').innerHTML = processText('{hereName}')
     }
  }
)

createItem("resetUsingPronounTurnscript", 
  {
    eventPeriod:1,
    eventActive:true,
    eventScript:function() { 
      window.usingPronoun = false
     }
  }
)
