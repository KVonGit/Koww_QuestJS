"use strict"
createItem("player", PLAYER(), {
  examine:function() {
    msg ("You are Koww the Magician!")
  },
  loc:"kowwsChasm",
})

createItem("milk", {
  loc:"player",
  examine:"Your magic milk, Zeke's favorite!",
  defArticle:"your",
  indefArticle:"your",
  synonyms:["my milk"],
  drop:"Why would you do that?  Awful waste of milk."
})

createRoom("possitems")

createItem("pitchfork", {
  loc:"possitems",
  examine:"A sharp looking tool!",
  use:function(){
    if (player.loc === "zekesFarm"){
      msg("You stab the pitchfork into the haystack.  Lo and behold, the haystack falls down into a hole in the ground, along with the pitchfork!  Inside the hole is a jade statuette, which you take.")
      w.pitchfork.loc = false
      w.jadeStatuette.moveToFrom({char:player, item:w.jadeStatuette}, "char", "possitems")
      return true
    }
    return false
  },
  useWith:function(char,obj){
    if (obj === w.haystack){
      msg("You stab the pitchfork into the haystack.  Lo and behold, the haystack falls down into a hole in the ground, along with the pitchfork!  Inside the hole is a jade statuette, which you take.")
      w.pitchfork.loc = false
      w.jadeStatuette.moveToFrom({char:player, item:w.jadeStatuette}, "char", "possitems")
      return true
    }
    return false
  }
})

createItem("kowwNothing", {
  loc:"possitems",
  alias:"nothing",
  examine:"You see nothing.",
  getDisplayName:function(){return "nothing"}
})

createItem("jadeStatuette", {
  alias:"jade statuette",
  loc:"possitems",
  examine:"An ugly statuette, made of jade."
})

createItem("something", {
  loc:"possitems",
  examine:"About what you'd expect something to look like in this game.",
  getDisplayName:function(){return "something"},
  use:function(){
    if (player.loc === "zekesFarm"){
      msg("You throw the something into the pond.  The ducks swarm around it in curiosity.  You take the opportunity to grab a duck turd without being noticed!")
      w.something.loc = false
      w.duckTurd.moveToFrom({char:player, item:w.duckTurd}, "char", "possitems")
      return true
    }
    return false
  },
  useWith:function(char,obj){
    if (obj === w.pond){
      msg("You throw the something into the pond.  The ducks swarm around it in curiosity.  You take the opportunity to grab a duck turd without being noticed!")
      w.something.loc = false
      w.duckTurd.moveToFrom({char:player, item:w.duckTurd}, "char", "possitems")
      return true
    }
    return false
  }
})

createItem("duckTurd", {
  loc:"possitems",
  alias:"duck turd",
  examine:"A foul dropping."
})

createItem("goblinSpit", {
  loc:"possitems",
  alias:"goblin spit",
  examine:"Yuck... It's chunky!"
})

createItem("grapplingHook", {
  loc:"possitems",
  alias:"grappling hook",
  examine:"It looks strong enough to support a cow!",
  use:function(){
    if (player.loc === "phoenixMountainPass"){
      msg("On top of the mountain, you find a bunch of purple paint, which you take.  After descending again, you ditch your grappling hook.")
      w.grapplingHook.loc = false
      w.purplePaint.moveToFrom({char:player, item:w.purplePaint}, "char", "possitems")
      return true
    }
    return false
  },
  useWith:function(char,obj){
    if (obj === w.mountains){
      msg("On top of the mountain, you find a bunch of purple paint, which you take.  After descending again, you ditch your grappling hook.")
      w.grapplingHook.loc = false
      w.purplePaint.moveToFrom({char:player, item:w.purplePaint}, "char", "possitems")
      return true
    }
    return false
  }
})

createItem("wingFeather", {
  loc:"possitems",
  alias:"wing feather",
  examine:"A wing feather from a Phoenix."
})

createItem("flyScroll", {
  loc:"possitems",
  alias:"Fly Scroll",
  examine:"Try using it (when in the proper location).",
  indefArticle:"the",
  defArticle:"the",
  use:function(){
    if (player.loc === "kowwsChasm"){
      msg("You fly up and over the chasm!<br/><br/><br/>Congratulations, you have found out that you were better off where you started anyway.  The grass here is brown and crackly.  Too bad!  And... OH NO!  Now you're trapped here, alone with the NecroYaks!  Stay tuned for \"The Adventures of Koww the Magician II -- Escape from the NecroYaks!\"<br/><br/>")
      w.flyScroll.loc = false
      io.finish()
      return true
    }
    return false
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
      return true
    }
    return false
  }
})

createRoom("kowwsChasm", {
  alias: "Koww's Chasm",
  east: new Exit("zekesFarm"),
  desc:"You are outside in a pasture of pure, pure green.  Green as far as the eye can see.{once:  But you, Koww the Magician, are not satisfied.  The grass may be even greener on the other side of the {nm:chasm}... you must know!  Also in the area is}{notfirst:<br/><br/>You can see the {object:chasm} and} a very undramatic {nm:sign}.<br/><br/>You can go {exitsHere:{exits}}."
})

createItem("chasm", TAKEABLE(), {
  loc:"kowwsChasm",
  examine:"That's the chasm you simply MUST cross!  Surely the only way to cross it is to FLY!",
  take:"Don't worry, the men in the white coats will soon be here to deal with you."
})

createItem("sign", TAKEABLE(), {
  examine:"It reads: \"{i:Got milk?  Come to Farmer Zeke's mag-NIFicent silo!}\"",
  read:"It reads: \"{i:Got milk?  Come to Farmer Zeke's mag-NIFicent silo!}\"",
  take:"You yank the sign out of the ground and try to fit it in your Koww-pack.  But it just doesn't fit.  Frustrated, you put it back.",
  loc:"kowwsChasm"
})

createRoom("zekesFarm", {
  usedefaultprefix:false,
  alias:"Zeke's Farm",
  desc:"You stand outside of a small {nm:zekesFarmhouseEntrance} with a {nm:zekesSiloEntrance} beside it.<br/><br/>There is a {nm:haystack} and a {nm:pond} here.<br/><br/>You can go {exitsHere:{exits}}.",
  south:new Exit("goblinTrail"),
  west: new Exit("kowwsChasm"),
  north:new Exit("landOfTheNecroYaks"),
  east:new Exit("phoenixMountainPass"),
  dests:[
    new Exit("zekesFarmhouse"),
    new Exit("zekesSilo")
  ],
  in:new MultiExit(["zekesFarmhouse", "zekesSilo"])
})

createItem("haystack", TAKEABLE(),  {
  loc:"zekesFarm",
  examine:"About what you'd expect from a haystack.  It's made of... HAY!  You munch on it for a while.",
  take:"You take a bite of the haystack.  Yummy... tastes just like chicken!",
  eat:"You take a bite of the haystack.  Yummy... tastes just like chicken!"
})

createItem("pond", TAKEABLE(),  {
  loc:"zekesFarm",
  examine:"A nice, placid pond full of little tiny duckies.  Ooo, how cute!  If you were carnivorous, they'd make you hungry.",
  take:"You sip the water from the pond.  Just what you need to wash down a bit of grazing.",
  drink:"You sip the water from the pond.  Just what you need to wash down a bit of grazing."
})


createItem("zekesFarmhouseEntrance", {
  loc:"zekesFarm",
  alias:"farmhouse",
  listAlias:"Zeke's Farmhouse (place)",
  examine:"It's the entrance to the farmhouse.",
  otherSide:"zekesFarmhouse",
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Go to")
  }
})

createItem("zekesSiloEntrance", {
  loc:"zekesFarm",
  alias:"silo",
  listAlias:"Zeke's Silo (place)",
  examine:"It's the entrance to the silo.",
  otherSide:"zekesSilo",
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Go to")
  }
})

createRoom("zekesFarmhouse", {
  alias:"Zeke's Farmhouse",
  desc:"You're inside Farmer Zeke's rather cramped home.  No one's here at the moment.  Perhaps you should go away.{ifIs:table:loc:zekesFarmhouse:<br/><br/>There is a {nm:table} here.}<br/><br/>You can go {exitsHere:{exits}}.",
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
      return world.SUCCESS
    }
  }
})

createRoom("zekesSilo", {
  alias:"Zeke's Silo",
  desc:"Gee, this place smells just like rotting feed.  Standing in the silo, grinning like the idiot that he is, is Farmer {nm:Zeke}.<br/><br/>You can go {exitsHere:{exits}}.",
  out:new Exit("zekesFarm")
})

createItem("Zeke", NPC(false), {
  properName:true,
  loc:"zekesSilo",
  listAlias:"Zeke (character)",
  examine:"He's wearing a straw hat and at least one of his teeth is rotting away, but he seems pleased as punch that you've arrived.",
  talkto:"\"Hey there, good buddy! Say, bein' a wizard an' all, couldja find it in yer heart to gimme some magic milk?  I'm all out!\"",
  attack:"You may be an evil sorcerer, but at least you're an ETHICAL evil sorcerer.  No killing allowed!  Especially not of idiots.  They don't know they're idiots.",
  receiveItems:[
    {
      item:w.milk,
      script:function(){
        msg("\"Well, thanks a lot, good buddy!  Well, tell ya what, why don't I give ya this here pitchfork ta comp'n'sate ya fer yer milk.\"")
        w.milk.loc = false
        w.pitchfork.moveToFrom({char:player, item:w.pitchfork}, "char", "possitems")
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
  desc:"The stench of goblins permeates this place.{once:  Goblins are small, annoying creatures who like to fight anyone who looks weak.  Fortunately, you don't look weak.}<br/><br/>The {nm:road} leads {exitsHere:{exits}}.",
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
  desc:"About twenty goblins patrol the front of {once:a}{notfirst:this} massive cave complex.{once:  They eye you for a moment, then decide not to attack.  You return the favor and don't kill them.}<br/><br/>There is a {nm:cliff} here.<br/><br/>A {nm:goblinGuard} is nearby.<br/><br/>You can go <span class=\"exit-link\" onclick=\"runCmd('in')\">Inside the Goblin Lair</span>.<br/><br/>You can go <span class=\"exit-link\" onclick=\"runCmd('north')\">north</span>.",
  north:new Exit("goblinTrail"),
  in:new Exit("insideTheGoblinLair"),
  dests:[
    new Exit("insideTheGoblinLair")
  ]
})

createItem("goblinGuard", NPC(false), {
  loc:"goblinLair",
  alias:"Goblin guard",
  listAlias:"Goblin guard (character)",
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
  climbverb:"After a difficult climb, you reach the top.  You're very pleased with yourself.  Unfortunately, the ledge crumbles beneath you, and you plummet back to the ground."
})

createItem("insideTheGoblinLairEntrance", {
  loc:"goblinLair",
  alias:"Inside the Goblin Lair",
  listAlias:"Inside the Goblin Lair (place)",
  examine:"It's the entrance to the goblin lair.",
  otherSide:"insideTheGoblinLair",
  verbFunction:function(list) {
    list.splice("Examine")
    list.push("Go to")
  }
})

createRoom("insideTheGoblinLair", {
  alias:"Inside the Goblin Lair",
  desc:"You are escorted to the Goblin King's throne room, a large chamber ornamented with statues of nude female goblins.{once:  You try hard to avoid puking.}The {nm:goblinKing} is here.<br/><br/>You can go {exitsHere:{exits}}.",
  out:new Exit("goblinLair")
})

createItem("goblinKing", NPC(false), {
  loc:"insideTheGoblinLair",
  alias:"Goblin King",
  listAlias:"Goblin King (character)",
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
        return world.SUCCESS
      }
    },
    {
      item:w.duckTurd,
      script:function(){
        msg("\"Ooooo!  GIMME GIMME GIMME!  Duck turd favorite goblin food!  We giv yu grapple hook!\"")
        w.duckTurd.loc = false
        w.grapplingHook.moveToFrom({char:player, item:w.grapplingHook}, "char", "possitems")
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
  desc:"The greenness of the farmland dissolves into gray bleakness as you pass into the land of the NecroYaks.{once:  Yaks are the sworn enemies of cows -- you'd better stay on your toes!}<br/><br/>There is a {nm:sign1} here.<br/><br/>You can go {exitsHere:{exits}}.",
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
  desc:"A cliff face blocks your way here.  It's steep -- you can't climb.  If you want to continue, you'll have to search the face.<br/><br/>You can go {exitsHere:{exits}}.",
  south:new Exit("landOfTheNecroYaks"),
  searchable:true,
  search:function(){
    if (w.goblinSpit.loc === "player"){
      msg("The NecroYaks jump out and search you for acid.  They find your goblin spit, take it, and run off.  But one of them drops a phoenix feather, and you scoop it up unnoticed.  By the way, there's no way to go farther this way unless you're a yak.")
      w.goblinSpit.loc = false
      w.wingFeather.moveToFrom({char:player, item:w.wingFeather}, "char", "possitems")
      return true
    }
    else{
      msg("The NecroYaks recognize you as a cow, then jump out and kill you.<br/><br/>Idiot.  You die.  HA HA HA HA HA!<br/>")
      io.finish()
      return true
    }
  }
})

createRoom("phoenixMountainPass", {
  alias:"Phoenix Mountain Pass",
  desc:"The towering {nm:mountains} surround you on all sides but back to your west.  Passage farther east is remotely possible, should you be brave or foolhardy enough to try it.<br/><br/>You can go {exitsHere:{exits}}.",
  west:new Exit("zekesFarm"),
  east:new Exit("phoenixPeak")
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
    }
    else{
      msg("Those particular mountains are too steep.")
    }
    return world.SUCCESS
  },
  pronouns:lang.pronouns.plural
})

createRoom("phoenixPeak", {
  alias:"Phoenix Peak",
  desc:"After hard hours of climbing, you finally reach the summit of Phoenix Peak.  Here, in all its glory, sits the {nm:resplendentMagnificentPhoenix}.<br/><br/>You can go {exitsHere:{exits}}.",
  west:new Exit("phoenixMountainPass")
})

createItem("resplendentMagnificentPhoenix", NPC(false), {
  loc:"phoenixPeak",
  alias:"Resplendent Magnificent Phoenix",
  listAlias:"Resplendent Magnificent Phoenix (character)",
  defArticle:"the",
  indefArticle:"the",
  examine:"The Resplendent Magnificent Phoenix's visage is so brilliant that it hurts to look at it.",
  talkto:function(){
    msg("\"The Resplendent Magnificent Phoenix demands to know {i:why} such a weakling as you has come here!  If you do not have my wing feather with you, I'm afraid I must ask you to leave {i:immediately!}  Now, do you have my wing feather or not -- Yes or No?\""),
    showMenu("", ["Yes","No"], function(result){
      if (result === "Yes"){
        if (w.wingFeather.loc == "player"){
          msg("\"Thank you; you have found my wing feather.  In the wrong hands, that could have been very dangerous.  I will give you this 'fly' scroll to compensate you for your hard work.  Use the scroll to fly, but it will only work once.\"")
          w.wingFeather.loc = false
          w.flyScroll.moveToFrom({char:player, item:w.flyScroll}, "char", "possitems")
        }
        else{
          msg ("\"Then give it to me quickly!  What..... You don't have my wing feather at all, do you?  You shammer.  I was going to dismiss you without hurting you, but I'm afraid now I'll have to kill you.\"")
          msg ("The Resplendent Magnificent Phoenix bats you with one claw.  You roll back down the mountainside, finally coming to a complete stop looking very much like a well-done steak.")
          msg("<br/><br/>Idiot.  You die.  HA HA HA HA HA!")
          io.finish()
        }
      }
      else if (result === "No"){
        msg ("\"Then leave me immediately, as I do not appreciate company.\"")
      }
      else {
        msg ("Something went wrong!")
      }
    })},
  receiveItems:[
    {
      item:w.wingFeather,
      script:function(){
        msg("\"Thank you; you have found my wing feather.  In the wrong hands, that could have been very dangerous.  I will give you this 'fly' scroll to compensate you for your hard work.  Use the scroll to fly, but it will only work once.\"")
        w.wingFeather.loc = false
        w.flyScroll.moveToFrom({char:player, item:w.flyScroll}, "char", "possitems")
        return world.SUCCESS
      }
    }
  ],
  verbFunction:function(list) {
    list.push("Speak to")
  },
})

createItem("event0", 
  {
    eventPeriod:1,
    eventActive:true,
    eventScript:function() { 
      document.querySelector('#location').innerHTML = processText('{hereName}')
     }
  }
)