var inflationCheck = false
var betaId = ""
var prefix = betaId + "ds"
var savePrefix = prefix + "AM_"
var presetPrefix = prefix + "AM_ST_"
var metaSaveId = betaId + "AD_aarexModifications"
var notifyId = 0
function onLoad(noOffline) {
  tmp.ngp3=player.masterystudies!==undefined
  tmp.qu=player.quantum
  happyHalloween=false
  if (player.totalmoney === undefined || isNaN(player.totalmoney)) player.totalmoney = player.money;
  if (player.tickspeed === undefined) player.tickspeed = new Decimal(1000)
  if (player.options === undefined) {
      player.options = {
          scientific: false,
          animationOn: true
      }
  }
  if (player.options.invert === true) player.options.theme = "Inverted"; player.options.invert = undefined;
  if (player.options.notation === undefined) player.options.notation = "Standard"
  if (player.options.challConf === undefined) player.options.challConf = false
  if (player.options.scientific === undefined || typeof(player.options.scientific) == "boolean") player.options.scientific={significantDigits:undefined}
  if (player.options.logarithm === undefined) player.options.logarithm={base:10}
  if (player.options.tetration === undefined) player.options.tetration={base:2}
  if (player.options.spazzy === undefined) player.options.spazzy={subNotation:"Scientific"}
  if (player.options.aas === undefined) player.options.aas={useHyphen: false, useDe: false}
  if (player.options.newsHidden === undefined) player.options.newsHidden = false;
  if (player.options.sacrificeConfirmation === undefined) player.options.sacrificeConfirmation = true;
  if (player.options.retryChallenge === undefined) player.options.retryChallenge = false;
  if (player.options.bulkOn === undefined) player.options.bulkOn = true
  if (player.options.cloud === undefined) player.options.cloud = true
  if (player.options.hotkeys === undefined) player.options.hotkeys = true
  if (player.options.eternityconfirm === undefined) player.options.eternityconfirm = true
  if (player.options.themes === undefined) player.options.themes = "Normal"
  if (player.options.secretThemeKey === undefined) player.options.secretThemeKey = 0
  if (player.achievements === undefined) player.achievements = [];
  if (player.sacrificed === undefined) player.sacrificed = new Decimal(0);
  if (player.infinityUpgrades === undefined) player.infinityUpgrades = [];
  if (player.infinityPoints === undefined) player.infinityPoints = new Decimal(0);
  if (player.infinitied === undefined) player.infinitied = 0;
  if (player.totalTimePlayed === undefined) player.totalTimePlayed = 0;
  if (player.bestInfinityTime === undefined) player.bestInfinityTime = 9999999999;
  if (player.thisInfinityTime === undefined) player.thisInfinityTime = 9999999999;
  if (player.galaxies === undefined) player.galaxies = 0;
  if (player.lastUpdate === undefined) player.lastUpdate = new Date().getTime();
  if (player.achPow === undefined) player.achPow = 1;
  if (player.newsArray === undefined) player.newsArray = [];
  if (player.chall2Pow === undefined) player.chall2Pow = 1;
  if (player.chall3Pow === undefined) player.chall3Pow = 0.01;
  if (player.challenges === undefined) player.challenges = []
  if (player.currentChallenge === undefined) player.currentChallenge = ""
  if (player.infinitied > 0 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1")
  if (player.matter === undefined) player.matter = new Decimal(0)
  if (player.autobuyers === undefined) player.autobuyers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  if (player.costMultipliers === undefined) player.costMultipliers = [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
  if (player.tickspeedMultiplier === undefined) player.tickspeedMultiplier = new Decimal(10)
  if (player.partInfinityPoint === undefined) player.partInfinityPoint = 0
  if (player.challengeTimes === undefined) player.challengeTimes = [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31]
  if (player.infchallengeTimes === undefined) player.infchallengeTimes = [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31]
  if (player.lastTenRuns === undefined) player.lastTenRuns = [[600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1]]
  if (player.infMult === undefined) player.infMult = new Decimal(1)
  if (player.infMultCost === undefined) player.infMultCost = new Decimal(100)
  if (player.tickSpeedMultDecrease === undefined) player.tickSpeedMultDecrease = 10
  if (player.tickSpeedMultDecreaseCost === undefined) player.tickSpeedMultDecreaseCost = 3e6
  if (player.dimensionMultDecrease === undefined) player.dimensionMultDecrease = 10
  if (player.dimensionMultDecreaseCost === undefined) player.dimensionMultDecreaseCost = 1e8
  if (player.overXGalaxies === undefined) player.overXGalaxies = 10;
  if (player.partInfinitied === undefined) player.partInfinitied = 0
  if (player.spreadingCancer === undefined) player.spreadingCancer = 0
  if (player.postC4Tier === undefined) player.postC4Tier = 0
  if (player.postC3Reward === undefined) player.postC3Reward = new Decimal(1)
  if (player.postC8Mult === undefined) player.postC8Mult = new Decimal(1)
  if (player.offlineProd === undefined) player.offlineProd = 0
  if (player.offlineProdCost === undefined) player.offlineProdCost = 1e7
  if (player.autoSacrifice === undefined) player.autoSacrifice = 1
  if (player.postChallUnlocked === undefined) player.postChallUnlocked = 0
  if (player.infMultBuyer === undefined) player.infMultBuyer = false
  if (player.autoCrunchMode === undefined) player.autoCrunchMode = "amount"
  if (player.challengeTarget === undefined) {
      player.challengeTarget = 0
      if (player.currentChallenge != "") player.challengeTarget = Number.MAX_VALUE
  }
  if (player.lastTenEternities === undefined) player.lastTenEternities = [[600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1]]
  if (player.respec === undefined) player.respec = false
  if (player.options.commas === undefined) player.options.commas = true
  if (player.eternityChalls === undefined) player.eternityChalls = {}
  if (player.eternityChallGoal === undefined) player.eternityChallGoal = new Decimal(Number.MAX_VALUE)
  if (player.currentEternityChall === undefined) player.currentEternityChall = ""
  if (player.eternityChallUnlocked === undefined) player.eternityChallUnlocked = 0
  if (player.options.chart === undefined) player.options.chart = {}
  if (player.options.chart.updateRate === undefined) player.options.chart.updateRate = 1000
  if (player.options.chart.duration === undefined) player.options.chart.duration = 10
  if (player.options.chart.warning === undefined) player.options.chart.warning = 0
  if (player.options.chart.on === undefined) player.options.chart.on = false
  if (player.options.chart.dips === undefined) player.options.chart.dips = true
  if (player.etercreq === undefined) player.etercreq = 0
  if (player.options.updateRate === undefined) player.options.updateRate = 50
  if (player.eterc8ids === undefined) player.eterc8ids = 50
  if (player.eterc8repl === undefined) player.eterc8repl = 40
  if (player.infinitiedBank === undefined) player.infinitiedBank = 0
  if (player.dimlife === undefined) player.dimlife = false
  if (player.dead === undefined) player.dead = false
  if (player.dilation === undefined) player.dilation = {}
  if (player.dilation.studies === undefined) player.dilation.studies = []
  if (player.dilation.active === undefined) player.dilation.active = false
  if (player.dilation.tachyonParticles === undefined) player.dilation.tachyonParticles = new Decimal(0)
  if (player.dilation.dilatedTime === undefined) player.dilation.dilatedTime = new Decimal(0)
  if (player.dilation.totalTachyonParticles === undefined) player.dilation.totalTachyonParticles = new Decimal(0)
  if (player.dilation.nextThreshold === undefined) player.dilation.nextThreshold = new Decimal(1000)
  if (player.dilation.freeGalaxies === undefined) player.dilation.freeGalaxies = 0
  if (player.dilation.upgrades === undefined) player.dilation.upgrades = []
  if (player.dilation.rebuyables === undefined) player.dilation.rebuyables =  { 1: 0, 2: 0, 3: 0 }
  if (player.timeDimension5 === undefined) player.timeDimension5 = {cost: new Decimal("1e2350"), amount: new Decimal(0), power: new Decimal(1), bought: 0 }
  if (player.timeDimension6 === undefined) player.timeDimension6 = {cost: new Decimal("1e2650"), amount: new Decimal(0), power: new Decimal(1), bought: 0 }
  if (player.timeDimension7 === undefined) player.timeDimension7 = {cost: new Decimal("1e3000"), amount: new Decimal(0), power: new Decimal(1), bought: 0 }
  if (player.timeDimension8 === undefined) player.timeDimension8 = {cost: new Decimal("1e3350"), amount: new Decimal(0), power: new Decimal(1), bought: 0 }
  if (player.why === undefined) player.why = 0
  if (player.options.animations === undefined) player.options.animations = {floatingText: true, bigCrunch: true, eternity: true, tachyonParticles: true}
  setTheme(player.options.theme);

  sliderText.textContent = "Update rate: " + player.options.updateRate + "ms";
  slider.value = player.options.updateRate;

  if (player.secondAmount !== 0) {
      document.getElementById("tickSpeed").style.visibility = "visible";
      document.getElementById("tickSpeedMax").style.visibility = "visible";
      document.getElementById("tickLabel").style.visibility = "visible";
      document.getElementById("tickSpeedAmount").style.visibility = "visible";
  }
  if (player.options.notation == "Mixed") player.options.notation = "Mixed scientific"

  if (player.infinityPower === undefined) {
      player.infinityPower = new Decimal(1)
      player.infinityDimension1 = {
          cost: new Decimal(1e8),
          amount: new Decimal(0),
          bought: 0,
          power: new Decimal(1),
          baseAmount: 0
      }
      player.infinityDimension2 = {
          cost: new Decimal(1e9),
          amount: new Decimal(0),
          bought: 0,
          power: new Decimal(1),
          baseAmount: 0
      }
      player.infinityDimension3 = {
          cost: new Decimal(1e10),
          amount: new Decimal(0),
          bought: 0,
          power: new Decimal(1),
          baseAmount: 0
      }
      player.infinityDimension4 = {
          cost: new Decimal(1e20),
          amount: new Decimal(0),
          bought: 0,
          power: new Decimal(1),
          baseAmount: 0
      }
      player.infDimensionsUnlocked = [false, false, false, false]
  }

  if (player.timeShards === undefined) {
      player.timeShards = new Decimal(0)
      player.eternityPoints = new Decimal(0)
      player.tickThreshold = new Decimal(1)
      player.totalTickGained = 0
      player.eternities = 0
      player.timeDimension1 = {
          cost: new Decimal(1),
          amount: new Decimal(0),
          power: new Decimal(1),
          bought: 0
      }
      player.timeDimension2 = {
          cost: new Decimal(5),
          amount: new Decimal(0),
          power: new Decimal(1),
          bought: 0
      }
      player.timeDimension3 = {
          cost: new Decimal(100),
          amount: new Decimal(0),
          power: new Decimal(1),
          bought: 0
      }
      player.timeDimension4 = {
          cost: new Decimal(1000),
          amount: new Decimal(0),
          power: new Decimal(1),
          bought: 0
      }
  }

  if (player.infinityDimension1.baseAmount === undefined) {
      player.infinityDimension1.baseAmount = 0;
      player.infinityDimension2.baseAmount = 0;
      player.infinityDimension3.baseAmount = 0;
      player.infinityDimension4.baseAmount = 0;

      player.infinityDimension1.baseAmount = new Decimal(player.infinityDimension1.power).log(50).times(10).toNumber()
      player.infinityDimension2.baseAmount = new Decimal(player.infinityDimension2.power).log(30).times(10).toNumber()
      player.infinityDimension3.baseAmount = new Decimal(player.infinityDimension3.power).log(10).times(10).toNumber()
      player.infinityDimension4.baseAmount = new Decimal(player.infinityDimension4.power).log(5).times(10).toNumber()


  }
  if (player.autoIP === undefined) player.autoIP = new Decimal(0)
  if (player.autoTime === undefined) player.autoTime = 1e300;

  if (player.matter === null) player.matter = new Decimal(0)
  for (var i=0; i<12; i++) {
      if (player.autobuyers[i]%1 !== 0 && player.autobuyers[i].tier === undefined) {
          player.autobuyers[i].tier = i+1
      }
      if (player.autobuyers[i]%1 !== 0 && player.autobuyers[i].target%1 !== 0) {
          player.autobuyers[i].target = i+1
          if (i == 8) player.autobuyers[i].target = 1
      }

      if (player.autobuyers[i]%1 !== 0 && (player.autobuyers[i].bulk === undefined || isNaN(player.autobuyers[i].bulk) || player.autobuyers[i].bulk === null)) {
          player.autobuyers[i].bulk = 1
      }
  }
  if (player.autobuyers[8].tier == 10) player.autobuyers[8].tier = 9

  document.getElementById("totaltickgained").textContent = "You've gained "+getFullExpansion(player.totalTickGained)+" tickspeed upgrades."

  GPminpeak = new Decimal(0)
  IPminpeak = new Decimal(0)
  EPminpeakType = 'normal'
  EPminpeak = new Decimal(0)
  QKminpeak = new Decimal(0)
  QKminpeakValue = new Decimal(0)
  GHPminpeak = new Decimal(0)
  GHPminpeakValue = new Decimal(0)
  if (player.peakSpent) player.peakSpent = 0

  if (typeof player.autobuyers[9].bulk !== "number") {
      player.autobuyers[9].bulk = 1
  }

  if (player.version === undefined) { // value will need to be adjusted when update goes live
      for (var i = 0; i < player.autobuyers.length; i++) {
          if (player.autobuyers[i]%1 !== 0) player.infinityPoints = player.infinityPoints + player.autobuyers[i].cost - 1
      }
      player.autobuyers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      player.version = 1
  }
  if (player.version == 1) {
      if (player.dimensionMultDecrease != 10) {
          if (player.dimensionMultDecrease == 9) {
              player.dimensionMultDecrease = 10
              player.dimensionMultDecreaseCost = 1e8
              player.infinityPoints = player.infinityPoints.plus(1e8)
          }
          if (player.dimensionMultDecrease == 8) {
              player.dimensionMultDecrease = 10
              player.dimensionMultDecreaseCost = 1e8
              player.infinityPoints = player.infinityPoints.plus(2.1e9)
          }
          if (player.dimensionMultDecrease == 7) {
              player.dimensionMultDecrease = 10
              player.dimensionMultDecreaseCost = 1e8
              player.infinityPoints = player.infinityPoints.plus(4.21e10)
          }
      }
      player.version = 2
  }
if (player.version < 5) {
  player.newsArray = []
  player.version = 5
  }

  if (player.infinityDimension5 === undefined) {
      player.infDimensionsUnlocked.push(false)
      player.infDimensionsUnlocked.push(false)
      player.infinityDimension5 = {
          cost: new Decimal(1e140),
          amount: new Decimal(0),
          bought: 0,
          power: new Decimal(1),
          baseAmount: 0
      }
      player.infinityDimension6 = {
          cost: new Decimal(1e200),
          amount: new Decimal(0),
          bought: 0,
          power: new Decimal(1),
          baseAmount: 0
      }
      player.version = 6
  }

  if (player.infinityDimension7 == undefined) {
      player.infDimensionsUnlocked.push(false)
      player.infDimensionsUnlocked.push(false)
      player.infinityDimension7 = {
          cost: new Decimal(1e250),
          amount: new Decimal(0),
          bought: 0,
          power: new Decimal(1),
          baseAmount: 0
      }
      player.infinityDimension8 = {
          cost: new Decimal(1e280),
          amount: new Decimal(0),
          bought: 0,
          power: new Decimal(1),
          baseAmount: 0
      }
  }

  if (player.replicanti === undefined) {
      player.replicanti = {
          amount: new Decimal(0),
          unl: false,
          chance: 0.01,
          chanceCost: new Decimal(1e150),
          interval: 1000,
          intervalCost: new Decimal(1e140),
          gal: 0,
          galaxies: 0,
          galCost: new Decimal(1e170)
      }
  }
  if (player.bestEternity === undefined) {
      player.bestEternity = 9999999999
      player.thisEternity = player.totalTimePlayed
  }
  if (player.timestudy === undefined) {
      player.timestudy = {
          theorem: 0,
          amcost: new Decimal("1e20000"),
          ipcost: new Decimal(1),
          epcost: new Decimal(1),
          studies: [],
      }
  }



  if (getEternitied() == 0) {
      document.getElementById("eternityPoints2").style.display = "none";
      document.getElementById("eternitystorebtn").style.display = "none";
      document.getElementById("tdtabbtn").style.display = "none";
  }

  if (player.eternityUpgrades === undefined) player.eternityUpgrades = []

  if (player.infDimBuyers === undefined) player.infDimBuyers = [false, false, false, false, false, false, false, false]

  if (player.replicanti.auto === undefined) player.replicanti.auto = [false, false, false]
  if (player.eternityBuyer === undefined) {
      player.eternityBuyer = {
          limit: new Decimal(0),
          isOn: false
      }
  }
  
  if (typeof(player.options.commas) !== "string") {
      if (player.options.commas) player.options.commas = "Commas"
      else player.options.commas = player.options.notation
  }
  if (player.shameLevel === undefined) player.shameLevel = 0;
    
  if (player.aarexModifications === undefined) {
      player.aarexModifications = {
          breakInfinity: false
      }
      break_infinity_js = false
  }
  if (break_infinity_js!=player.aarexModifications.breakInfinity) {
      save_game(true)
      document.location.reload(true)
      return
  }
  if (player.aarexModifications.dilationConf === undefined) {
      player.aarexModifications.dilationConf = true
  }
  if (player.aarexModifications.offlineProgress === undefined) {
      player.aarexModifications.offlineProgress = true
  }
  if (player.aarexModifications.autoSave === undefined) {
      player.aarexModifications.autoSave = true
  }
  if (player.aarexModifications.progressBar === undefined) {
      player.aarexModifications.progressBar = true
  }
  if (player.aarexModifications.logRateChange === undefined) {
      player.aarexModifications.logRateChange = false
  }
  if (player.aarexModifications.hideProductionTab === undefined) {
      player.aarexModifications.hideProductionTab = !(!player.boughtDims) && player.aarexModifications.ersVersion === undefined
  }
  if (player.aarexModifications.eternityChallRecords === undefined) player.aarexModifications.eternityChallRecords = {}
  if (player.aarexModifications.popUpId === undefined) {
      player.aarexModifications.popUpId = 0
  }
  if (player.aarexModifications.tabsSave === undefined) player.aarexModifications.tabsSave = {on: false}
  if (player.aarexModifications.performanceTicks === undefined) player.aarexModifications.performanceTicks = false
  if (player.aarexModifications.noFooter == undefined) player.aarexModifications.noFooter = player.options.theme == "Aarex's Modifications" || player.options.theme == "Aarex's Mods II"
  if (player.masterystudies !== undefined && player.aarexModifications.newGame3PlusVersion === undefined) {
	  forceHardReset = true
	  reset_game()
	  forceHardReset = false
	  return
  }
  if (player.aarexModifications.newGamePlusPlusVersion == undefined && player.aarexModifications.newGame3PlusVersion != undefined) {
      delete player.masterystudies
      delete player.aarexModifications.newGame3PlusVersion
  }
  if (player.aarexModifications.newGame3PlusVersion>=2.2) tmp.bl=player.ghostify.bl
  slider.min=player.aarexModifications.performanceTicks?0:33
  transformSaveToDecimal();
  updateTickSpeed();
  updateAchievements();
  updateCheckBoxes();
  toggleChallengeRetry()
  toggleChallengeRetry()
  toggleBulk()
  toggleBulk()
 
  document.getElementById("rename").innerHTML = "<p style='font-size:15px'>Rename</p>Name: "+(player.aarexModifications.save_name?player.aarexModifications.save_name:"Save #" + savePlacement)
  document.getElementById("offlineProgress").textContent = "Offline progress: O"+(player.aarexModifications.offlineProgress?"N":"FF")
  document.getElementById("autoSave").textContent = "Auto save: O"+(player.aarexModifications.autoSave?"N":"FF")
  document.getElementById("autoSaveInterval").textContent = "Auto-save interval: " + getAutoSaveInterval() + "s"
  document.getElementById("autoSaveIntervalSlider").value = getAutoSaveInterval()

  if (!player.replicanti.auto[0]) document.getElementById("replauto1").textContent = "Auto: OFF"
  if (!player.replicanti.auto[1]) document.getElementById("replauto2").textContent = "Auto: OFF"
  if (!player.replicanti.auto[2]) document.getElementById("replauto3").textContent = "Auto: OFF"

  document.getElementById("automation_ng"+(player.aarexModifications.ngmX>3?"m4":"")+"_placement").appendChild(document.getElementById("autobuyers"))
  if (player.aarexModifications.ngmX>3) document.getElementById("autobuyers").style.display="none"
  document.getElementById("autobuyers").className=(player.aarexModifications.ngmX>3?"":"inf")+"tab"
  document.getElementById("autobuyersbtn").style.display=player.aarexModifications.ngmX>3?"none":""
  loadAutoBuyerSettings();
  var updatedLTR = []
  for (lastRun=0; lastRun<10 ; lastRun++) {
      if (typeof(player.lastTenRuns[lastRun]) !== "number") if (player.lastTenRuns[lastRun][0] != 26784000 || player.lastTenRuns[lastRun][1].neq(1)) updatedLTR.push(player.lastTenRuns[lastRun])
      if (player.lastTenEternities[lastRun][0] == 26784000 && player.lastTenEternities[lastRun][1].eq(1)) player.lastTenEternities[lastRun] = [26784000, new Decimal(0)]
  }
  for (a=updatedLTR.length;a<10;a++) updatedLTR.push([26784000, new Decimal(0)])
  player.lastTenRuns = updatedLTR
  updateLastTenRuns()
  updateLastTenEternities()

  updateInfCosts()


  if (player.replicanti.unl == true) {
      document.getElementById("replicantidiv").style.display="inline-block"
      document.getElementById("replicantiunlock").style.display="none"
  } else {
      document.getElementById("replicantidiv").style.display="none"
      document.getElementById("replicantiunlock").style.display="inline-block"
  }

  document.getElementById("break").textContent = (player.break ? "FIX" : "BREAK") + " INFINITY"

  updateNotationOption()

  document.getElementById("floatingTextAnimBtn").textContent = "Floating text: " + ((player.options.animations.floatingText) ? "ON" : "OFF")
  document.getElementById("bigCrunchAnimBtn").textContent = "Big crunch: " + (player.options.animations.bigCrunch === "always" ? "ALWAYS" : player.options.animations.bigCrunch ? "ON" : "OFF")
  document.getElementById("tachyonParticleAnimBtn").textContent = "Tachyon particles: " + ((player.options.animations.tachyonParticles) ? "ON" : "OFF")

  if (player.infinitied == 0 && getEternitied() == 0) document.getElementById("infinityPoints2").style.display = "none"

  var inERS=!(!player.boughtDims)

  if (player.eternityChallUnlocked === null) player.eternityChallUnlocked = 0
  if (player.eternityChallUnlocked !== 0) document.getElementById("eterc"+player.eternityChallUnlocked+"div").style.display = "inline-block"

  if (getEternitied()<1) document.getElementById("infmultbuyer").textContent="Max buy IP mult"
  else document.getElementById("infmultbuyer").textContent="Autobuy IP mult O"+(player.infMultBuyer?"N":"FF")

  if (player.epmult === undefined || player.epmult == 0) {
      player.epmult = new Decimal(1)
      player.epmultCost = new Decimal(500)
  }

  clearOldAchieves()

  document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"

  updateBoughtTimeStudies()
  performedTS = false

  if (player.version > 7 && inERS && !player.aarexModifications.ersVersion) {
	  player.version = 7
  }
  if (player.version < 9) {
      player.version = 9
      let achs = []
      if (player.achievements.includes("r22")) {
          achs.push("r35")
          player.achievements.splice(player.achievements.indexOf("r22"), 1)
      }
      if (player.achievements.includes("r35")) {
          achs.push("r76")
          player.achievements.splice(player.achievements.indexOf("r35"), 1)
      }
      if (player.achievements.includes("r41")) {
          achs.push("r22")
          player.achievements.splice(player.achievements.indexOf("r41"), 1)
      }
      if (player.achievements.includes("r76")) {
          achs.push("r41")
          player.achievements.splice(player.achievements.indexOf("r76"), 1)
      }

      for (var i=0; i<achs.length;i++) player.achievements.push(achs[i])
      updateAchievements()
      if (!inERS) player.replicanti.intervalCost = player.replicanti.intervalCost.dividedBy(1e20)
  }
  document.getElementById(inERS?"r22":"r35").appendChild(document.getElementById("Don't you dare to sleep"))
  document.getElementById(inERS?"r35":"r76").appendChild(document.getElementById("One for each dimension"))
  document.getElementById(inERS?"r41":"r22").appendChild(document.getElementById("Fake News"))
  document.getElementById(inERS?"r76":"r41").appendChild(document.getElementById("Spreading Cancer"))
  document.getElementById("Universal harmony").style["background-image"]="url(images/"+(player.masterystudies==undefined?104:"104-ngp3")+".png)"
  document.getElementById("Infinite time").style["background-image"]="url(images/"+(inERS?79:69)+".png)"

  document.getElementById("ec12Mult").style.display = player.pSac !== undefined ? "" : "none"

  if (player.version < 9.5) {
      player.version = 9.5
      if (player.timestudy.studies.includes(191)) player.timestudy.theorem += 100
  }

  if (player.version < 10) {
      player.version = 10
      if (player.timestudy.studies.includes(72)) {
          for (i=4; i<8; i++) {
              player["infinityDimension"+i].amount = player["infinityDimension"+i].amount.div(calcTotalSacrificeBoost().pow(0.02))
          }
      }
  }

  if (player.aarexModifications.newGameMinusVersion === undefined && !player.boughtDims) {
      if (checkNGM() > 0) {
          player.aarexModifications.newGameMinusVersion = (player.aarexModifications.newGameMinusUpdate !== undefined ? player.aarexModifications.newGameMinusUpdate : player.newGameMinusUpdate === undefined ? checkNGM() : 1.1)
          delete player.aarexModifications.newGameMinusUpdate
          delete player.newGameMinusUpdate
      }
  }
  if (player.aarexModifications.newGameMinusVersion < 1.1) {
      player.totalTimePlayed+=1728000
      player.timestudy.theorem+=1
      player.timestudy.ipcost=Decimal.div(player.timestudy.ipcost,2)
      if (player.eternityChalls.eterc1==undefined) player.eternityChalls.eterc1=-6
      else player.eternityChalls.eterc1-=6
      if (player.eternityChalls.eterc11==undefined) player.eternityChalls.eterc11=1
      else if (player.eternityChalls.eterc11<5) player.eternityChalls.eterc11+=1
      player.aarexModifications.newGameMinusVersion = 1.1
  }
  if (player.aarexModifications.newGameMinusVersion < 2) {
      if (player.eternities == -20) {
          player.infinitied += 991
          player.offlineProdCost = Decimal.times(player.offlineProdCost, 5e4)
      } player.infinitiedBank -= 996
      player.spreadingCancer -= 9000
      player.timeDimension1.power = player.timeDimension1.power.mul(2)
      player.timestudy.theorem--
      player.timestudy.ipcost = player.timestudy.ipcost.div(5e11)
      player.dilation.nextThreshold.e = 6
      player.dilation.totalTachyonParticles = new Decimal(500)
      player.dilation.rebuyables[2] = 1
      player.timeDimension5.power.e = -3
      player.timeDimension6.power = new Decimal(0.0004)
      player.timeDimension7.power.e = -4
      player.timeDimension8.power = new Decimal(0.00004)
  }
  if (player.aarexModifications.newGameMinusVersion < 2.1) {
      player.timeDimension1.power = player.timeDimension1.power.mul(8)
      player.timeDimension4.power = player.timeDimension4.power.mul(4)
      player.timestudy.theorem--
      player.dilation.totalTachyonParticles = player.dilation.totalTachyonParticles.add(1500)
  }
  if (player.aarexModifications.newGameMinusVersion < 2.2) {
      player.timestudy.theorem += 3;
      const pow_div = [0,160,5/3,1,3,100,80,100/3,20];
      for (i=1;i<=8;i++) player["timeDimension"+i].power = player["timeDimension"+i].power.div(pow_div[i]);
      if (player.eternityChalls.eterc11 == 1) delete player.eternityChalls.eterc11
      else player.eternityChalls.eterc11--
      $.notify('Your NG- save has been updated due to few balancing issues.', 'info')
  }
  if (player.aarexModifications.newGamePlusVersion === undefined) if (player.eternities < 20 && ECTimesCompleted("eterc1") > 0) player.aarexModifications.newGamePlusVersion = 1
  if (player.aarexModifications.newGamePlusPlusVersion === undefined && !player.masterystudies) { 
      if (player.dilation.rebuyables[4] !== undefined) {
          var migratedUpgrades = []
          var v2_1check=player.version>13
          for (id=5;id<(v2_1check?18:14);id++) if (player.dilation.upgrades.includes(id)) migratedUpgrades.push(id>16?10:(id>12&&v2_1check)?("ngpp"+(id-10)):(id%4<1)?("ngpp"+(id/4-1)):Math.floor(id/4)*3+id%4)
          if (player.meta) {
              for (dim=1;dim<9;dim++) {
                  player.meta[dim].bought += player.meta[dim].tensBought * 10
                  delete player.meta[dim].tensBought
              }
              if (player.autoEterMode) player.aarexModifications.newGamePlusPlusVersion = 2.2
              else if (v2_1check) {
                  player.version = 12.1
                  player.aarexModifications.newGamePlusPlusVersion = 2.1
              } else if (player.meta) player.aarexModifications.newGamePlusPlusVersion = 2
          } else player.aarexModifications.newGamePlusPlusVersion = 1
          var newAchievements=[]
          var v2_3check=player.ep5xAutobuyer!==undefined
          for (id=0;id<player.achievements.length;id++) {
              r=player.achievements[id].split("r")[1]
              newAchievements.push(r>138?"ngpp"+(r-130):player.achievements[id])
              if (r>138) v2_3check=true
          }
          if (v2_3check) {
              player.aarexModifications.newGamePlusVersion = 1
              player.aarexModifications.newGamePlusPlusVersion = 2.3
              player.autoEterOptions = {epmult:player.ep5xAutobuyer}
              for (dim=1;dim<9;dim++) player.autoEterOptions["td"+dim] = player.timeDimensionAutobuyer
              player.achievements=newAchievements
              updateAchievements()
              delete player.timeDimensionAutobuyer
              delete player.ep5xAutobuyer
          }
          tmp.qu=player.quantum
          if (tmp.qu) {
              player.aarexModifications.newGamePlusPlusVersion = 2.901
              tmp.qu.time = player.totalTimePlayed
              tmp.qu.best = 9999999999
              tmp.qu.last10 = [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]]
              player.aarexModifications.quantumConf = true
          }
          player.aarexModifications.newGamePlusVersion = 1
          if (confirm("Do you want to migrate your NG++ save into new NG+++ mode?")) {
              player.aarexModifications.newGame3PlusVersion = 2.205
              player.respecMastery=false
              player.dbPower = 1
              player.dilation.times = 0
              player.peakSpent = 0
              player.masterystudies = []
              tmp.qu.reached = false
              player.meta.bestOverQuantums = player.meta.bestAntimatter
              player.options.animations.quarks = true
              tmp.qu.usedQuarks = {
                  r: 0,
                  g: 0,
                  b: 0
              }
              tmp.qu.colorPowers = {
                  r: 0,
                  g: 0,
                  b: 0
              }
              tmp.qu.gluons = {
                  rg: 0,
                  gb: 0,
                  br: 0
              }
              player.eternityBuyer.dilationMode = false
              player.eternityBuyer.statBeforeDilation = 0
              player.eternityBuyer.dilationPerAmount = 10
              player.eternityBuyer.dilMode = "amount"
              player.eternityBuyer.tpUpgraded = false
              player.eternityBuyer.slowStop = false
              player.eternityBuyer.slowStopped = false
              player.eternityBuyer.ifAD = false
              tmp.qu.autobuyer = {
                  enabled: false,
                  limit: 1,
                  mode: "amount",
                  peakTime: 0
              }
              tmp.qu.electrons = {
                  amount: 0,
                  sacGals: 0,
                  mult: 2,
                  rebuyables: [0,0,0,0]
              }
              tmp.qu.disabledRewards = {}
              tmp.qu.metaAutobuyerWait = 0
              tmp.qu.multPower = {rg:0,gb:0,br:0,total:0}
              tmp.qu.challenge = []
              tmp.qu.challenges = {}
              tmp.qu.nonMAGoalReached = []
              tmp.qu.challengeRecords = {}
              tmp.qu.pairedChallenges = {
                  order: {},
                  current: 0,
                  completed: 0,
                  completions: {},
                  fastest: {},
                  pc68best: 0,
                  respec: false
              }
              tmp.qu.qcsNoDil = {}
              tmp.qu.qcsMods = {current:[]}
              player.dilation.bestTP = 0
              player.old = false
              tmp.qu.autoOptions = {}
              tmp.qu.replicants = {
                  amount: 0,
                  requirement: "1e3000000",
                  quarks: 0,
                  quantumFood: 0,
                  quantumFoodCost: 2e46,
                  limit: 1,
                  limitDim: 1,
                  limitCost: 1e49,
                  eggonProgress: 0,
                  eggons: 0,
                  hatchSpeed: 20,
                  hatchSpeedCost: 1e49,
                  babyProgress: 0,
                  babies: 0,
                  ageProgress: 0
              }
              tmp.qu.emperorDimensions = {}
              for (d=1;d<9;d++) tmp.qu.emperorDimensions[d] = {workers: 0, progress: 0, perm: 0}
              tmp.qu.nanofield = {
                 charge: 0,
                 energy: 0,
                 antienergy: 0,
                 power: 0,
                 powerThreshold: 50,
                 rewards: 0,
                 producingCharge: false
              }
              tmp.qu.reachedInfQK = false
              tmp.qu.assignAllRatios = {
                  r: 1,
                  g: 1,
                  b: 1
              }
              tmp.qu.notrelative = false
              tmp.qu.wasted = false
              tmp.qu.tod = {
                  r: {
                      quarks: 0,
                      spin: 0,
                      upgrades: {}
                  },
                  g: {
                      quarks: 0,
                      spin: 0,
                      upgrades: {}
                  },
                  b: {
                      quarks: 0,
                      spin: 0,
                      upgrades: {}
                  },
                  upgrades: {}
              }
              tmp.qu.bigRip = {
                  active: false,
                  conf: true,
                  times: 0,
                  bestThisRun: 0,
                  totalAntimatter: 0,
                  bestGals: 0,
                  savedAutobuyersNoBR: {},
                  savedAutobuyersBR: {},
                  spaceShards: 0,
                  upgrades: []
              }
              tmp.qu.breakEternity = {
                  unlocked: false,
                  break: false,
                  eternalMatter: 0,
                  upgrades: [],
                  epMultPower: 0
              }
              player.ghostify = {
                  reached: false,
                  times: 0,
                  time: player.totalTimePlayed,
                  best: 9999999999,
                  last10: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
                  milestones: 0,
                  disabledRewards: {},
                  ghostParticles: 0,
                  multPower: 1,
                  neutrinos: {
                      electron: 0,
                      mu: 0,
                      tau: 0,
                      generationGain: 1,
                      multPower: 1,
                      upgrades: []
                  },
                  automatorGhosts: setupAutomaticGhostsData(),
                  ghostlyPhotons: {
                      unl: false,
                      amount: 0,
                      ghostlyRays: 0,
                      darkMatter: 0,
                      lights: [0,0,0,0,0,0,0,0],
                      maxRed: 0,
                      enpowerments: 0
                  },
                  bl: {
                      watt: 0,
                      speed: 1,
                      ticks: 0,
                      am: 0,
                      typeToExtract: 1,
                      extracting: false,
                      extractProgress: 0,
                      autoExtract: 0,
                      glyphs: [],
                      enchants: {},
                      usedEnchants: [],
                      upgrades: [],
                      battery: 0,
                      odSpeed: 1
                  },
                  wzb: {
                      unl: false,
                      dP: 0,
                      dPUse: 0,
                      wQkUp: true,
                      wQkProgress: 0,
                      zNeGen: 1,
                      zNeProgress: 1,
                      zNeReq: 1,
                      wpb: 0,
                      wnb: 0,
                      wb: 0
                  }
              }
              tmp.bl=player.ghostify.bl
              for (var g=1;g<br.names.length;g++) tmp.bl.glyphs.push(0)
              player.options.animations.ghostify = true
              player.aarexModifications.ghostifyConf = true
          }
          player.dilation.upgrades=migratedUpgrades
          resetDilationGalaxies()
      }
  } else if (player.dilation.rebuyables[4] == null) {
      delete player.aarexModifications.meta
      delete player.aarexModifications.autoEterMode
      delete player.aarexModifications.autoEterOptions
      delete tmp.qu

  }
  if (player.aarexModifications.newGamePlusPlusVersion < 2) {
      for (dim=1;dim<5;dim++) {
          var dim = player["timeDimension" + dim]
          if (Decimal.gte(dim.cost, "1e20000")) dim.cost = Decimal.pow(timeDimCostMults[dim]*2.2, dim.bought).times(timeDimStartCosts[dim]).times(Decimal.pow(new Decimal('1e1000'),Math.pow(dim.cost.log(10) / 1000 - 20, 2)))
      }

      player.meta = {resets: 0, antimatter: 10, bestAntimatter: 10}
      for (dim=1;dim<9;dim++) player.meta[dim] = {amount: 0, bought: 0, cost: initCost[dim]}
  }
  if (player.aarexModifications.newGamePlusPlusVersion < 2.2) {
      for (dim=1;dim<5;dim++) {
          var dim = player["timeDimension" + dim]
          if (Decimal.gte(dim.cost, "1e100000")) dim.cost = Decimal.pow(timeDimCostMults[dim]*100, dim.bought).times(timeDimStartCosts[dim]).times(Decimal.pow(new Decimal('1e1000'),Math.pow(dim.cost.log(10) / 1000 - 100, 2)))
      }

      player.autoEterMode == "amount"
      player.aarexModifications.newGamePlusPlusVersion = 2.2
  }
  if (player.aarexModifications.newGamePlusPlusVersion < 2.3) {
      var autoEterOptions={epmult:player.autoEterOptions?player.autoEterOptions.epMult===true:false}
      for (dim=1;dim<9;dim++) if (player.autoEterOptions===undefined?true:player.autoEterOptions["td"+dim]) autoEterOptions["td"+dim]=false
      player.autoEterOptions=autoEterOptions
      player.aarexModifications.newGamePlusPlusVersion = 2.3
  }
  if (player.aarexModifications.newGamePlusPlusVersion < 2.301) {
      var metaAchCheck = player.dilation.studies.includes(6)
      var noD9AchCheck = player.meta[8].bought > 0 || player.meta.resets > 4
      var metaBoostCheck = player.meta.resets > 9
      if (metaBoostCheck) giveAchievement("And still no ninth dimension...")
      if (noD9AchCheck||metaBoostCheck) giveAchievement("Meta-boosting to the max")
      if (metaAchCheck||noD9AchCheck||metaBoostCheck) giveAchievement("I'm so meta")
      player.galaxyMaxBulk = false
  }
  var quantumRestore = player.aarexModifications.newGamePlusPlusVersion < 2.9 || (!tmp.qu && player.aarexModifications.newGamePlusPlusVersion > 2.4)
  if (quantumRestore) {
      player.quantum={
          times: 0,
          quarks: 0,
          producedGluons: 0,
          realGluons: 0,
          bosons: {
              'w+': 0,
              'w-': 0,
              'z0': 0
          },
          neutronstar: {
              quarks: 0,
              metaAntimatter: 0,
              dilatedTime: 0
          },
          rebuyables: {
              1: 0,
              2: 0
          },
          upgrades: []
      }
      tmp.qu=player.quantum
  }
  if (quantumRestore || player.aarexModifications.newGamePlusPlusVersion < 2.901) {
      tmp.qu.time = player.totalTimePlayed
      tmp.qu.best = 9999999999
      tmp.qu.last10 = [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]]
  }
  if (player.aarexModifications.newGamePlusPlusVersion < 2.901) {
      player.aarexModifications.quantumConf = true
      $.notify('NG++ was updated to include quantum reset.', 'info')
  }
  if (player.aarexModifications.newGamePlusPlusVersion < 2.9011 && player.autoEterOptions === undefined) {
      player.autoEterOptions = {epmult:false}
      for (dim=1;dim<9;dim++) player.autoEterOptions["td"+dim] = false
  }
  if (player.aarexModifications.newGamePlusPlusVersion < 2.9013) if (player.aarexModifications.quantumConf===undefined||tmp.qu.times<1) player.aarexModifications.quantumConf=true
  if (player.aarexModifications.newGamePlusPlusVersion < 2.90142) player.aarexModifications.newGamePlusPlusVersion = 2.90142
  if (player.aarexModifications.newGame3PlusVersion < 1.01) player.aarexModifications.dbPower = new Decimal(getDimensionBoostPower())
  if ((player.aarexModifications.newGame3PlusVersion && !player.masterystudies) || player.aarexModifications.newGame3PlusVersion < 1.02) player.masterystudies = []
  if (player.aarexModifications.newGame3PlusVersion < 1.21) player.replicanti.chanceCost = Decimal.pow(1e15, player.replicanti.chance * 100 + 9)
  if ((quantumRestore && player.masterystudies) || player.aarexModifications.newGame3PlusVersion < 1.5) {
      tmp.qu.usedQuarks = {
          r: 0,
          g: 0,
          b: 0
      }
      tmp.qu.colorPowers = {
          r: 0,
          g: 0,
          b: 0
      }
  }
  if ((quantumRestore && player.masterystudies) || player.aarexModifications.newGame3PlusVersion < 1.51) {
      tmp.qu.gluons = {
          rg: 0,
          gb: 0,
          br: 0
      }
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.511) if (player.autoEterMode !== undefined) player.autoEterMode = "amount"
  if ((tmp.qu ? !tmp.qu.electrons : false) && player.masterystudies) {
      tmp.qu.electrons = {
          amount: 0,
          sacGals: 0,
          mult: 2,
          rebuyables: [0,0,0,0]
      }
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.8) {
      player.eternityBuyer.dilationMode = false
      player.eternityBuyer.statBeforeDilation = 0
      player.eternityBuyer.dilationPerAmount = 10
      tmp.qu.autobuyer = {
          enabled: false,
          limit: 1,
          mode: "amount"
      }
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.9) {
      player.replicanti.intervalCost = Decimal.pow(1e10, Math.round(Math.log10(1000/player.replicanti.interval)/-Math.log10(0.9))+14)
      tmp.qu.disabledRewards={}
      tmp.qu.electrons.mult=2
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.901 && !tmp.qu.electrons.rebuyables) tmp.qu.electrons.rebuyables=[0,0,0,0]
  if (player.aarexModifications.newGame3PlusVersion < 1.95) {
      tmp.qu.multPower=0
      tmp.qu.challenge=0
      tmp.qu.challenges=0
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.99) {
      tmp.qu.challenge=tmp.qu.challenge>0?[tmp.qu.challenge]:[]
      var newChallenges={}
      for (c=1;c<=tmp.qu.challenges;c++) newChallenges[c]=1
      tmp.qu.challenges=newChallenges
      tmp.qu.metaAutobuyerWait=0
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.997) {
      tmp.qu.pairedChallenges = {
          order: {},
          current: 0,
          completed: 0,
          respec: false
      }
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.9975&&!tmp.qu.challenge) tmp.qu.challenge=[]
  if (player.aarexModifications.newGame3PlusVersion < 1.9979) {
      player.dilation.bestTP=player.achievements.includes("ng3p18")?player.dilation.tachyonParticles:new Decimal(0)
      player.old=false
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.99795) player.options.animations.quarks = true
  if (player.aarexModifications.newGame3PlusVersion < 1.99799) player.respecOptions={time:player.respec,mastery:player.respec}
  if (player.aarexModifications.newGame3PlusVersion < 1.998) {
      var respecedMS=[]
      for (id=0;id<player.masterystudies.length;id++) {
          if (player.masterystudies[id]=="t322") respecedMS.push("t323")
          else respecedMS.push(player.masterystudies[id])
      }
      player.masterystudies=respecedMS
      tmp.qu.autoOptions = {}
      tmp.qu.replicants = {
          amount: 0,
          requirement: "1e3000000",
          quarks: 0,
          quantumFood: 0,
          quantumFoodCost: 1e46,
          workerProgress: 0,
          workers: 0,
          limit: 1,
          limitCost: 1e49,
          eggonProgress: 0,
          eggons: 0,
          hatchSpeed: 20,
          hatchSpeedCost: 1e49,
          babyProgress: 0,
          babies: 0,
          ageProgress: 0
      }
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.9985)  tmp.qu.multPower = {rg:Math.ceil(tmp.qu.multPower/3),gb:Math.ceil((tmp.qu.multPower-1)/3),br:Math.floor(tmp.qu.multPower/3),total:tmp.qu.multPower}
  if (player.aarexModifications.newGame3PlusVersion < 1.9986) {
      player.respec=player.respecOptions.time
      player.respecMastery=player.respecOptions.mastery
      updateRespecButtons()
      delete player.respecOptions
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.998621) {
      if (getCurrentQCData().length<2) tmp.qu.pairedChallenges.current=0
      if (tmp.qu.pairedChallenges.completed>4) tmp.qu.pairedChallenges.completed=0
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.9987) player.eternitiesBank=0
  if (player.aarexModifications.newGame3PlusVersion < 1.99871) {
      tmp.qu.replicants.limit=Math.min(tmp.qu.replicants.limit,10)
      tmp.qu.replicants.limitCost=Math.pow(200,tmp.qu.replicants.limit-1)*1e49
      tmp.qu.replicants.workers=Decimal.min(tmp.qu.replicants.workers,10)
      if (tmp.qu.replicants.workers.eq(10)) tmp.qu.replicants.workerProgress=0
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.998711) {
      tmp.qu.quantumFood=0
      tmp.qu.quantumFoodCost=1e46*Math.pow(5,Math.round(new Decimal(tmp.qu.replicants.workers).toNumber()*3+new Decimal(tmp.qu.replicants.workerProgress).toNumber()))
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.99873) {
      tmp.qu.pairedChallenges.completions = {}
      for (c=1;c<=tmp.qu.pairedChallenges.completed;c++) {
          var c1 = tmp.qu.pairedChallenges.order[c][0]
          var c2 = tmp.qu.pairedChallenges.order[c][1]
          tmp.qu.pairedChallenges.completions[Math.min(c1, c2) * 10 + Math.max(c1, c2)] = c
      }
  }
  var forceToQuantumAndRemove=false
  if (player.masterystudies ? player.aarexModifications.newGame3PlusVersion < 1.999 || (tmp.qu.emperorDimensions ? tmp.qu.emperorDimensions[1] == undefined : false) : false) { //temp
      var oldLength=player.masterystudies.length
      var newMS=[]
      for (var m=0;m<player.masterystudies.length;m++) {
          var t=player.masterystudies[m].split("t")
          if (t[1]==undefined) newMS.push(player.masterystudies[m])
          else {
              t=parseInt(t[1])
              if (t!=322&&t<330) newMS.push(player.masterystudies[m])
          }
      }
      player.masterystudies=newMS
      if (oldLength > newMS.length) forceToQuantumAndRemove=true
      tmp.qu.replicants.quantumFoodCost = Decimal.times(tmp.qu.replicants.quantumFoodCost, 2)
      tmp.qu.replicants.limitDim=1
      tmp.qu.emperorDimensions = {}
      tmp.qu.emperorDimensions[1] = {workers: tmp.qu.replicants.workers, progress: tmp.qu.replicants.workerProgress, perm: Math.round(parseFloat(tmp.qu.replicants.workers))}
      for (d=2;d<9;d++) tmp.qu.emperorDimensions[d] = {workers: 0, progress: 0, perm: 0}
      player.dontWant = false
      delete tmp.qu.replicants.workers
      delete tmp.qu.replicants.workerProgress
  }
  if (player.aarexModifications.newGame3PlusVersion < 1.9995) {
      if (tmp.qu.emperorDimensions[1].perm === undefined) {
          tmp.qu.replicants.quantumFood = 0
          tmp.qu.replicants.quantumFoodCost = 1e46
          for (d=1;d<9;d++) tmp.qu.emperorDimensions[d] = {workers: 0, progress: 0, perm: 0}
      }
      player.meta.bestOverQuantums = player.meta.bestAntimatter
      tmp.qu.autobuyer.peakTime = 0
      tmp.qu.nanofield = {
          charge: 0,
          energy: 0,
          antienergy: 0,
          power: 0,
          powerThreshold: 50,
          rewards: 0,
          producingCharge: false
      }
      tmp.qu.reachedInfQK = false
      tmp.qu.assignAllRatios = {
          r: 1,
          g: 1,
          b: 1
      }
      tmp.qu.notrelative = false
      tmp.qu.wasted = false
  }
  var setTTAfterQuantum=0
  if (player.aarexModifications.newGame3PlusVersion < 1.9997) {
      player.dilation.times = 0
      tmp.qu.tod = {
          r: {
              quarks: 0,
              spin: 0,
              upgrades: {}
          },
          g: {
              quarks: 0,
              spin: 0,
              upgrades: {}
          },
          b: {
              quarks: 0,
              spin: 0,
              upgrades: {}
          },
          upgrades: {}
      }
      if (tmp.qu.nanofield.rewards>16) {
          var newMS=[]
          for (var m=0;m<player.masterystudies.length;m++) {
              var d=player.masterystudies[m].split("d")
              if (d[1]!==undefined) {
                  newMS.push(player.masterystudies[m])
              }
          }
          player.masterystudies=newMS
          tmp.qu.nanofield.rewards=16
          forceToQuantumAndRemove=true
          setTTAfterQuantum=2e94
      }
  }
  if (player.aarexModifications.newGame3PlusVersion < 2) {
      player.eternityBuyer.dilMode = "amount"
      player.eternityBuyer.tpUpgraded = false
      player.eternityBuyer.slowStop = false
      player.eternityBuyer.slowStopped = false
      player.eternityBuyer.ifAD = false
      tmp.qu.reached = tmp.qu.times > 0
      tmp.qu.nonMAGoalReached = {}
      tmp.qu.pairedChallenges.fastest = {}
      tmp.qu.qcsNoDil = {}
      tmp.qu.pairedChallenges.pc68best = 0
      tmp.qu.bigRip = {
          active: false,
          conf: true,
          times: 0,
          bestThisRun: 0,
          totalAntimatter: 0,
          savedAutobuyersNoBR: {},
          savedAutobuyersBR: {},
          spaceShards: 0,
          upgrades: []
      }
      tmp.qu.breakEternity = {
          unlocked: false,
          break: false,
          eternalMatter: 0,
          upgrades: [],
          epMultPower: 0
      }
      player.ghostify = {
          reached: false,
          times: 0,
          time: player.totalTimePlayed,
          best: 9999999999,
          last10: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
          milestones: 0,
          disabledRewards: {},
          ghostParticles: 0,
          multPower: 1,
          neutrinos: {
              electron: 0,
              mu: 0,
              tau: 0,
              generationGain: 1,
              boosts: 1,
              multPower: 1,
              upgrades: []
          },
          automatorGhosts: setupAutomaticGhostsData()
      }
      player.options.animations.ghostify = true
      player.aarexModifications.ghostifyConf = true
  }
  if (player.aarexModifications.newGamePlusVersion < 2) {
        if (player.masterystudies!==undefined?!tmp.qu.reached&&!player.ghostify.reached:true) {
            player.money=Decimal.max(player.money,1e25)
            player.infinitiedBank=nMx(player.infinitiedBank,1e6)
            var filter=["timeMult","dimMult","timeMult2","unspentBonus","27Mult","18Mult","36Mult","resetMult","passiveGen","45Mult","resetBoost","galaxyBoost"]
            for (var u=0;u<filter.length;u++) if (!player.infinityUpgrades.includes(filter[u])) player.infinityUpgrades.push(filter[u])
            if (!player.achievements.includes("r85")) player.infMult=Decimal.times(player.infMult,4)
            if (!player.achievements.includes("r93")) player.infMult=Decimal.times(player.infMult,4)
            player.dimensionMultDecrease=2
            player.tickSpeedMultDecrease=1.65
            player.eternities=nMx(player.eternities,100)
            for (var c=2;c<(player.tickspeedBoosts!==undefined?16:player.galacticSacrifice!==undefined?15:13);c++) if (!player.challenges.includes("challenge"+c)) player.challenges.push("challenge"+c)
            player.replicanti.unl=true
            player.replicanti.amount=Decimal.max(player.replicanti.amount,1)
            if (!player.dilation.studies.includes(1)) player.dilation.studies.push(1)
        }
        if (!player.achievements.includes("r77")) player.achievements.push("r77")
        if (!player.achievements.includes("r78")) player.achievements.push("r78")
        if (!player.achievements.includes("r85")) player.achievements.push("r85")
        if (!player.achievements.includes("r93")) player.achievements.push("r93")
        if (!player.achievements.includes("r95")) player.achievements.push("r95")
        if (!player.achievements.includes("r102")) player.achievements.push("r102")
        if (!player.achievements.includes("r131")) player.achievements.push("r131")
        player.aarexModifications.newGamePlusVersion=2
  }
  if (player.aarexModifications.newGame3PlusVersion < 2.1) {
      player.ghostify.ghostlyPhotons = {
          unl: false,
          amount: 0,
          ghostlyRays: 0,
          darkMatter: 0,
          lights: [0,0,0,0,0,0,0,0],
          maxRed: 0,
          enpowerments: 0
      }
  }
  if (player.aarexModifications.newGame3PlusVersion < 2.101) {
	  var newAchievements=[]
      for (var a=0;a<player.achievements.length;a++) if (player.achievements[a]!="ng3p67") newAchievements.push(player.achievements[a])
	  player.achievements=newAchievements
  }
  if (player.aarexModifications.newGame3PlusVersion < 2.2) {
      player.ghostify.bl = {
          watt: 0,
          ticks: 0,
          speed: 1,
          am: 0,
          typeToExtract: 1,
          extracting: false,
          extractProgress: 0,
          autoExtract: 0,
          glyphs: [],
          enchants: {},
          usedEnchants: [],
          upgrades: [],
          battery: 0,
          odSpeed: 1
      }
      player.ghostify.wzb = {
          unl: false,
          dP: 0,
          dPUse: 0,
          wQkUp: true,
          wQkProgress: 0,
          zNeGen: 1,
          zNeProgress: 1,
          zNeReq: 1,
          wpb: 0,
          wnb: 0,
          wb: 0
      }
      tmp.bl=player.ghostify.bl
      for (var g=1;g<br.names.length;g++) tmp.bl.glyphs.push(0)
  }
  if (player.aarexModifications.newGame3PlusVersion < 2.205) player.aarexModifications.newGame3PlusVersion = 2.205
  if (player.masterystudies) {
	  if (player.eternityBuyer.presets === undefined) player.eternityBuyer.presets = {on: false, autoDil: false, selected: -1, selectNext: 0, left: 1, order: []}
      if (player.meta.bestOverQuantums === undefined) player.meta.bestOverQuantums = player.meta.bestAntimatter
      document.getElementById('prioritydil').value=player.eternityBuyer.dilationPerAmount
      if (player.achievements.includes("ng3p52")) document.getElementById("autoDilValue").value=player.eternityBuyer.dilationPerAmount
      document.getElementById("eggonsCell").style.display = player.ghostify.neutrinos.upgrades.includes(2) ? "none" : ""
      document.getElementById("workerReplWhat").textContent = player.ghostify.neutrinos.upgrades.includes(2) ? "babies" : "eggons"
      updateQuantumWorth()
      if (tmp.qu.autoOptions === undefined) tmp.qu.autoOptions = {}
      if (tmp.qu.nonMAGoalReached === undefined || !tmp.qu.nonMAGoalReached.length) tmp.qu.nonMAGoalReached = []
      if (tmp.qu.qcsMods === undefined) tmp.qu.qcsMods = {current:[]}
      if (tmp.qu.challengeRecords === undefined) tmp.qu.challengeRecords = {}
      if (tmp.qu.pairedChallenges.completions === undefined) tmp.qu.pairedChallenges.completions = {}
      if (tmp.qu["10ofield"] !== undefined) {
          tmp.qu.nanofield = tmp.qu["10ofield"]
          delete tmp.qu["10ofield"]
      }
      if (tmp.qu.nanofield.powerThreshold === undefined) {
          tmp.qu.nanofield.powerThreshold = 50
          tmp.qu.nanofield.producingCharge = false
      }
      if (tmp.qu.autobuyer.peakTime === undefined) tmp.qu.autobuyer.peakTime = 0
      if (tmp.qu.nanofield.rewards>17&&tmp.qu.tod.upgrades[1]==undefined&&!player.ghostify.reached&&!player.aarexModifications.ngp4V) {
          var newMS=[]
          for (var m=0;m<player.masterystudies.length;m++) {
              var d=player.masterystudies[m].split("d")
              if (d[1]!==undefined) {
                  newMS.push(player.masterystudies[m])
             }
          }
          player.masterystudies=newMS
          tmp.qu.nanofield.rewards=16
          forceToQuantumAndRemove=true
          setTTAfterQuantum=2e94
      }
      if (tmp.qu.bigRip.bestGals==undefined) tmp.qu.bigRip.bestGals=0
      if (player.ghostify.neutrinos.boosts==undefined) player.ghostify.neutrinos.boosts=1
      if (player.ghostify.ghostlyPhotons.maxRed==undefined) player.ghostify.ghostlyPhotons.maxRed=0
      if (player.ghostify.wzb.unl) giveAchievement("Even Ghostlier than before")
      if (!tmp.bl.usedEnchants.length) tmp.bl.usedEnchants=[]
      if (player.ghostify.wzb.dPUse===undefined) {
          player.ghostify.wzb.dPUse=0
          player.ghostify.wzb.wQkUp=true
          player.ghostify.wzb.zNeGen=1
      }
      tmp.bl.odSpeed=Math.max(tmp.bl.odSpeed,1)
      if (Decimal.eq(player.ghostify.wzb.zNeReq,0)) player.ghostify.wzb.zNeReq=1
      updateAutoGhosts(true)
  }
  if (player.aarexModifications.newGame3PlusVersion!=undefined) {
      updateColorPowers()
      eds=tmp.qu.emperorDimensions
      tmp.be=tmp.qu.bigRip.active&&tmp.qu.breakEternity.break
  }
  if (player.aarexModifications.newGameMinusMinusVersion === undefined && !player.meta) {
      if (player.exdilation == undefined && player.version == 13) player.version = 12
      if (player.galacticSacrifice) {
          player.galacticSacrifice.time = (player.lastUpdate - player.galacticSacrifice.last) / 100
          player.aarexModifications.newGameMinusMinusVersion = 1.29
          delete player.galacticSacrifice.last
	  } else if (player.galaxyPoints) player.aarexModifications.newGameMinusMinusVersion = 1.1
      else if ((Decimal.gt(player.postC3Reward, 1) && player.infinitied < 1 && player.eternities < 1) || (Math.round(new Decimal(player.achPow).log(5) * 100) % 100 < 1 && Decimal.gt(player.achPow, 1))) player.aarexModifications.newGameMinusMinusVersion = 1
      if (player.firstTotalBought != undefined) {
          player.totalBoughtDims = {}
          for (d=1;d<9;d++) {
              var name = TIER_NAMES[d]
              player.totalBoughtDims[name] = player[name + "TotalBought"]
              delete player[name + "TotalBought"]
          }
          player.aarexModifications.newGameMinusMinusVersion = 1.295
      }
      if (player.tickBoughtThisInf) {
          var haveAutoSacrifice = player.autobuyers[12] % 1 !== 0
          player.autoSacrifice = haveAutoSacrifice ? player.autobuyers[12] : 1
          if (haveAutoSacrifice) {
              player.autoSacrifice.priority = new Decimal(player.autoSacrifice.priority)
              document.getElementById("prioritySac").value = player.autoSacrifice.priority
              document.getElementById("13ison").checked = player.autoSacrifice.isOn
          }
          var popThis = player.autobuyers.pop()
          var haveAutoGalSacrifice = popThis % 1 !== 0
          player.autobuyers[12] = haveAutoGalSacrifice ? popThis : 13
          if (haveAutoGalSacrifice) {
              player.autobuyers[12].priority = new Decimal(player.autobuyers[12].priority)
              document.getElementById("priority14").value = player.autobuyers[12].priority
              document.getElementById("14ison").checked = player.autobuyers[12].isOn
          }
          player.aarexModifications.newGameMinusMinusVersion = 1.301
          updateAutobuyers()
      }
      if (player.dimPowerIncreaseCost) {
          if (player.challengeTimes[12]) player.aarexModifications.newGameMinusMinusVersion = 1.41
          else player.aarexModifications.newGameMinusMinusVersion = 1.4
      }
      if (player.infchallengeTimes[8]) {
          player.currentChallenge=renameIC(player.currentChallenge)
          for (c=0;c<player.challenges.length;c++) player.challenges[c]=renameIC(player.challenges[c])
          player.postC4Tier=player.postC6Tier
          delete player.postC6Tier
          player.aarexModifications.newGameMinusMinusVersion = 1.5
          updateChallenges()
      }
      if (Decimal.pow(1e15, player.replicanti.chance*100).times(1e135).div(player.replicanti.chanceCost).gte(1e59)) player.aarexModifications.newGameMinusMinusVersion = 2
      if (player.aarexModifications.newGameMinusMinusVersion) updateAchievements()
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.1) player.galaxyPoints = 0
  if (player.aarexModifications.newGameMinusMinusVersion < 1.2) {
      player.galacticSacrifice = {}
      player.galacticSacrifice = resetGalacticSacrifice()
      player.galacticSacrifice.galaxyPoints = player.galaxyPoints
      $.notify('Your NG-- save has been updated because dan-simon made upgrades for Galactic Sacrifice.', 'info')
      player.aarexModifications.newGameMinusMinusVersion = 1.2
      delete player.galaxyPoints
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.21) {
      if (player.galacticSacrifice.upgrades.includes(11)) for (d=1;d<8;d++) {
          var name = TIER_NAMES[d]
          player[name+"Cost"] = Decimal.div(player[name+"Cost"], 10)
	  }
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.22) {
      if (player.galacticSacrifice.upgrades.includes(11)) for (d=1;d<8;d++) {
          var name = TIER_NAMES[d]
          player[name+"Cost"] = Decimal.div(player[name+"Cost"], 10)
	  }
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.24) {
      if (ECTimesCompleted("eterc6")>0) {
          forceHardReset=true
          inflationCheck=true
          reset_game()
          forceHardReset=false
          return
	  }
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.26) {
      if (player.galacticSacrifice.upgrades.includes(11)) for (d=1;d<8;d++) {
          var name = TIER_NAMES[d]
          player[name+"Cost"] = Decimal.times(player[name+"Cost"], 100)
      }
      reduceDimCosts()
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.295) player.totalBoughtDims = {}
  if (player.aarexModifications.newGameMinusMinusVersion < 1.3) {
      player.options.gSacrificeConfirmation = player.options.sacrificeConfirmation
      player.tickBoughtThisInf = resetTickBoughtThisInf()
      player.autobuyers.push(13)
      updateAutobuyers()
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.3005) {
      // fixing autobuyers
      if (player.autobuyers[10].interval) {
        player.autobuyers[10].interval = Math.max(player.autobuyers[10].interval / 2.5, 100);
      }
      if (player.autobuyers[11].interval) {
        player.autobuyers[11].interval = Math.max(player.autobuyers[11].interval / 5, 100);
      }
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.301) {
      if (player.currentChallenge=="challenge14") if (player.tickBoughtThisInf.pastResets.length<1) player.tickBoughtThisInf.pastResets.push({resets:player.resets,bought:player.tickBoughtThisInf.current-new Decimal(player.tickSpeedCost).e+3})
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.4) {
      if (player.autobuyers.length>14) {
          var haveAutoSacrifice = player.autobuyers[12] % 1 !== 0
          player.autoSacrifice = haveAutoSacrifice ? player.autobuyers[12] : 1
          if (haveAutoSacrifice) {
              player.autoSacrifice.priority = new Decimal(player.autoSacrifice.priority)
              document.getElementById("prioritySac").value = player.autoSacrifice.priority
              document.getElementById("13ison").checked = player.autoSacrifice.isOn
          }
          var popThis = player.autobuyers.pop()
          var haveAutoGalSacrifice = popThis % 1 !== 0
          player.autobuyers[12] = haveAutoGalSacrifice ? popThis : 13
          if (haveAutoGalSacrifice) {
              player.autobuyers[12].priority = new Decimal(player.autobuyers[12].priority)
              document.getElementById("priority14").value = player.autobuyers[12].priority
              document.getElementById("14ison").checked = player.autobuyers[12].isOn
          }
      } else if (player.autoSacrifice === 0) player.autoSacrifice = 1
      player.extraDimPowerIncrease = 0
      player.dimPowerIncreaseCost = 1e3
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.41) {
      if (player.version == 13) player.version = 12
      player.challengeTimes.push(600*60*24*31)
      player.challengeTimes.push(600*60*24*31)
      player.aarexModifications.newGameMinusMinusVersion = 1.41
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.5) {
      player.infchallengeTimes.push(600*60*24*31)
      player.infchallengeTimes.push(600*60*24*31)
      player.aarexModifications.newGameMinusMinusVersion = 1.5
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.9) {
      player.replicanti.chanceCost=player.replicanti.chanceCost.div(1e60)
      player.replicanti.intervalCost=player.replicanti.intervalCost.div(1e60)
      player.replicanti.galCost=player.replicanti.galCost.div(1e60)
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 1.91) {
      for (tier=1;tier<9;tier++) {
          let dim = player["infinityDimension"+tier]
          dim.cost = Decimal.pow(getIDCostMult(tier),dim.baseAmount/10).times(infBaseCost[tier])
      }
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 2) {
      for (tier=1;tier<9;tier++) {
          let dim = player["infinityDimension"+tier]
          dim.power = Decimal.pow(getInfBuy10Mult(tier), dim.baseAmount/10)
      }
  }
  if (player.aarexModifications.newGameMinusMinusVersion < 2.41) player.aarexModifications.newGameMinusMinusVersion = 2.41
  if (player.aarexModifications.newGame3MinusVersion < 2.1) {
      player.autobuyers[13]=14
      player.overXGalaxiesTickspeedBoost=1
      player.challengeTimes.push(600*60*24*31)
  }
  if (player.aarexModifications.newGame3MinusVersion < 2.2) {
      player.dimPowerIncreaseCost*=300
      var newChallRecords = []
      for (c=0;c<2;c++) newChallRecords.push(player.infchallengeTimes[c])
      newChallRecords.push(600*60*24*31)
      newChallRecords.push(600*60*24*31)
      for (c=2;c<10;c++) newChallRecords.push(player.infchallengeTimes[c])
      player.infchallengeTimes=newChallRecords
  }
  if (player.aarexModifications.newGame3MinusVersion < 3) {
      var newUpgs=[]
      for (var u=0;u<player.galacticSacrifice.upgrades.length;u++) if (player.galacticSacrifice.upgrades[u]!=34) newUpgs.push(player.galacticSacrifice.upgrades[u])
      player.galacticSacrifice.upgrades=newUpgs
      player.aarexModifications.newGame3MinusVersion = 3
      player.aarexModifications.ngmX=player.aarexModifications.newGame4MinusVersion?4:3
      if (player.aarexModifications.ngmX>3) reduceDimCosts()
  } else if (!player.aarexModifications.ngmX && player.tickspeedBoosts !== undefined) {
      player.aarexModifications.newGame4MinusVersion = 1
      player.aarexModifications.ngmX=4
      reduceDimCosts()
  }
  if (player.aarexModifications.newGame3MinusVersion < 3.201) {
      player.infchallengeTimes.push(600*60*24*31)
      player.infchallengeTimes.push(600*60*24*31)
      player.aarexModifications.newGame3MinusVersion = 3.201
  }
  if (player.aarexModifications.ersVersion === undefined && player.timestudy.studies.length>0 && typeof(player.timestudy.studies[0])!=="number") {
      newAchievements=[]
      for (id=0;id<player.achievements.length;id++) {
          var r=player.achievements[id].split("r")[1]
          newAchievements.push(r==105?"r117":player.achievements[id])
      }
      player.achievements=newAchievements
      player.dimlife=true
      player.dead=true
      for (d=1;d<9;d++) {
          var name = TIER_NAMES[d]
          if (costMults[d].lt(player.costMultipliers[d-1])) player[name+"Bought"] += (Math.round(Decimal.div(player.costMultipliers[d-1],costMults[d]).log(player.dimensionMultDecrease))+Math.ceil(Decimal.div(Number.MAX_VALUE,initCost[d]).log(costMults[d]))-1)*10
          else player[name+"Bought"] += Decimal.div(player[name+"Cost"],initCost[d]).log(costMults[d])*10
          if (player[name+"Bought"]>0) {
              if (d>1) player.dead=false
              if (d<8) player.dimlife=false
          }
      }
      player.boughtDims=[]
      player.timestudy.ers_studies=[null]
      for (s=1;s<7;s++) player.timestudy.ers_studies[s]=player.timestudy.studies[s]?player.timestudy.studies[s]:0
      player.timestudy.studies=[]
      if (player.eternityChallenges) {
          player.currentEternityChall=player.eternityChallenges.current?"eterc"+player.eternityChallenges.current:""
          player.eternityChallUnlocked=player.eternityChallenges.unlocked?"eterc"+player.eternityChallenges.unlocked:0
          player.eternityChalls={}
          for (c in player.eternityChallenges.done) player.eternityChalls["eterc"+c]=player.eternityChallenges.done[parseInt(c)]
      }
      player.tickspeed=player.tickspeed.div(Decimal.pow(getTickSpeedMultiplier(),player.totalTickGained))
      player.totalTickGained=0
      player.tickThreshold=new Decimal(1)
      if (player.darkMatter) {
          player.eterc8repl=player.ec8PurchasesMade.repl
          player.eterc8ids=player.ec8PurchasesMade.ids
      }
      player.aarexModifications.ersVersion=1
      delete player.eternityChallenges
  }
  if (player.aarexModifications.ersVersion<1.02) {
      if (player.achievements.includes("r85")) player.infMult=player.infMult.times(4)
      if (player.achievements.includes("r93")) player.infMult=player.infMult.times(4)
      player.aarexModifications.ersVersion=1.02
  }
  if (player.aarexModifications.newGameExpVersion === undefined && !player.masterystudies && Decimal.gt(player.infMultCost,10) && Math.round(Decimal.div(player.infMultCost,10).log(4)*1e3)%1e3<1) player.aarexModifications.newGameExpVersion = 1
  if (player.aarexModifications.newGameExpVersion < 1.11) player.aarexModifications.newGameExpVersion = 1.11
  if (player.aarexModifications.newGameUpdateVersion === undefined && player.exdilation != undefined) {
      player.aarexModifications.newGameUpdateVersion=1.01
      player.options.animations.blackHole=true
      player.aarexModifications.dilationConf=player.options.dilationconfirm
      var newAchievements=[]
      for (id=0;id<player.achievements.length;id++) {
            r=player.achievements[id].split("r")[1]
            newAchievements.push(r==148?"ngpp13":r==146?"ngpp18":r>140?"ngud"+(r-130):player.achievements[id])
            if (r>138) v2_3check=true
      }
      player.achievements=newAchievements
      delete player.options.dilationconfirm
      updateAchievements()
      if (player.version==13) {
          player.version=12
          var newDilUpgs=[]
          for (var u=0;u<player.dilation.upgrades.length;u++) {
              var id=player.dilation.upgrades[u]
              if (id>10) id="ngud"+(id-10)
              newDilUpgs.push(id)
          }
          player.dilation.upgrades=newDilUpgs
          player.aarexModifications.newGameUpdateVersion=1.1
      }
  }
  if (player.aarexModifications.newGameUpdateVersion<1.01) player.blackholeDimension4.cost=Decimal.min(player.blackholeDimension4.cost,"1e20000")
  if (player.aarexModifications.newGameUpdateVersion<1.1) {
      player.version = 12
      player.aarexModifications.newGameUpdateVersion=1.1
  }
  if (player.exdilation !== undefined) {
      if (player.options.exdilationconfirm === undefined) player.options.exdilationconfirm = true
      if (player.options.exdilationConfirm !== undefined) {
          player.options.exdilationconfirm = player.options.exdilationConfirm
          delete player.options.exdilationConfirm
      }
      if (player.meta !== undefined && player.exdilation.spent[4] === undefined) player.exdilation.spent[4] = 0
  }
  if (player.aarexModifications.irsVersion < 1.1) {
      player.singularity = {
          unlocked: false,
          sacrificed: 0,
          upgraded: 0,
          singularityPower: 0,
          darkMatter: 0
      }
  }
  if (player.aarexModifications.irsVersion < 1.2) {
      player.dimtechs = {
          unlocked: false,
          discounts: 0,
          tickUpgrades: 0,
          respec: false
      }
      for (dim=1;dim<9;dim++) player.dimtechs["dim"+dim+"Upgrades"] = 0
      player.aarexModifications.irsVersion = 1.2
  }
  if (player.aarexModifications.ngudpV < 1.12) player.aarexModifications.ngudpV = 1.12
  if (player.aarexModifications.nguepV < 1.03) player.aarexModifications.nguepV = 1.03
  if (player.aarexModifications.newGame4MinusVersion<2) {
      player.tdBoosts=0
      resetTDs()
  }
  if (player.aarexModifications.newGame4MinusVersion<2.1) {
      if ((player.galacticSacrifice.times > 0 || player.infinitied > 0 || player.eternities != 0 || (tmp.qu !== undefined && tmp.qu.times > 0) || (player.ghostify !== undefined && player.ghostify.times > 0)) && !player.challenges.includes("challenge1")) player.challenges.push("challenge1")
      player.autobuyers.push(15)
      player.challengeTimes.push(600*60*24*31)
  }
  if (player.aarexModifications.newGame4MinusVersion<2.111) player.aarexModifications.newGame4MinusVersion=2.111
  if (player.aarexModifications.ngm5V<0.1) player.aarexModifications.ngm5V=0.1
  if (player.aarexModifications.ngm5V<0.5) {
      player.infDimensionsUnlocked[0]=true
      resetIDs_ngm5()
      resetPDs(true)
  }
  if (player.aarexModifications.ngm5V<0.52) player.aarexModifications.ngm5V=0.52
  if (player.aarexModifications.nguspV !== undefined) {
      if (player.blackholeDimension5 === undefined) for (var d=5;d<9;d++) player["blackholeDimension"+d] = {
          cost: blackholeDimStartCosts[d],
          amount: 0,
          power: 1,
          bought: 0
      }
      if (player.dilation.autoUpgrades === undefined) player.dilation.autoUpgrades = []
  }
  ipMultPower=2
  if (player.masterystudies) if (player.masterystudies.includes("t241")) ipMultPower=2.2
  if (GUBought("gb3")) ipMultPower=2.3
  if (player.aarexModifications.newGameExpVersion !== undefined) ipMultCostIncrease=4
  else ipMultCostIncrease=10
  document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by "+ipMultPower+"<br>currently: "+shortenDimensions(getIPMult()) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"

  //updates TD costs to harsher scaling
  if (player.version < 12) {
      player.version = 12
      for (i=1; i<5; i++) {
        if (player["timeDimension"+i].cost.gte("1e1300")) {
            player["timeDimension"+i].cost = Decimal.pow(timeDimCostMults[i]*2.2, player["timeDimension"+i].bought).times(timeDimStartCosts[i])
          }
      }
      if (player.bestEternity <= 0.01 || player.bestInfinityTime <= 0.01) giveAchievement("Less than or equal to 0.001");
  }

  if (player.version < 12.1) {
    player.version = 12.1
    if (player.achievements.includes("s36")) {
        player.achievements.splice(player.achievements.indexOf("s36"), 1)
        updateAchievements();
    }
  }
  if (player.version < 12.2) {
    player.version = 12.2
    player.sixthCost = Decimal.times(player.sixthCost, 10)
    if (player.meta) player.meta[6].cost = Decimal.times(player.meta[6].cost, 10)
  }

  // player.version is currently 12.1
  if (player.options.commas == "Default") {
      player.options.commas == "AF2019";
      updateNotationOption();
  }
  if (player.options.notation == "Default") {
      player.options.notation = typeof(player.options.commas) === "boolean" ? "AF2019" : "Brackets";
      updateNotationOption();
  }

  for (s=0;s<(player.boughtDims?4:3);s++) toggleCrunchMode(true)
  updateAutoEterMode()

  ghostified = false
  if (player.masterystudies !== undefined) ghostified = player.ghostify.times > 0
  quantumed = ghostified
  if (player.meta !== undefined && !quantumed) quantumed = tmp.qu.times > 0
  document.getElementById("confirmations").style.display = (player.resets > 4 || player.galaxies > 0 || (player.galacticSacrifice ? player.galacticSacrifice.times > 0 : false) || player.infinitied !== 0 || player.eternities !== 0 || quantumed) ? "inline-block" : "none"
  document.getElementById("confirmation").style.display = (player.resets > 4 || player.infinitied > 0 || player.eternities !== 0 || quantumed) ? "inline-block" : "none"
  document.getElementById("sacrifice").style.display = (player.resets > 4 || player.infinitied > 0 || player.eternities !== 0 || quantumed) ? "inline-block" : "none"
  document.getElementById("sacConfirmBtn").style.display = (player.resets > 4 || player.galaxies > 0 || (player.galacticSacrifice ? player.galacticSacrifice.times > 0 : false) || player.infinitied > 0 || player.eternities !== 0 || quantumed) ? "inline-block" : "none"
  var gSacDisplay = !player.galacticSacrifice ? "none" : player.galaxies > 0 || player.galacticSacrifice.times > 0 || player.infinitied > 0 || player.eternities !== 0 || quantumed ? "inline-block" : "none"
  document.getElementById("gConfirmation").style.display = gSacDisplay
  document.getElementById("gSacrifice").style.display = gSacDisplay
  document.getElementById("gSacConfirmBtn").style.display = gSacDisplay
  document.getElementById("challengeconfirmation").style.display = (player.challenges.includes("challenge1") || player.infinitied !== 0 || player.eternities !== 0 || quantumed) ? "inline-block" : "none"
  document.getElementById("eternityconf").style.display = (player.eternities !== 0 || quantumed) ? "inline-block" : "none"
  document.getElementById("dilationConfirmBtn").style.display = (player.dilation.studies.includes(1) || quantumed) ? "inline-block" : "none"
  document.getElementById("quantumConfirmBtn").style.display = quantumed ? "inline-block" : "none"
  document.getElementById("bigRipConfirmBtn").style.display = (player.masterystudies === undefined ? false : tmp.qu.bigRip.times) ? "inline-block" : "none"
  document.getElementById("ghostifyConfirmBtn").style.display = ghostified ? "inline-block" : "none"
  document.getElementById("leConfirmBtn").style.display = ghostified && player.ghostify.ghostlyPhotons.enpowerments ? "inline-block" : "none"

  document.getElementById("confirmation").checked = !player.options.sacrificeConfirmation
  document.getElementById("sacConfirmBtn").textContent = "Sacrifice confirmation: O" + (player.options.sacrificeConfirmation ? "N" : "FF")
  document.getElementById("gConfirmation").checked = !player.options.gSacrificeConfirmation
  document.getElementById("gSacConfirmBtn").textContent = "Galactic sacrifice confirmation: O" + (player.options.gSacrificeConfirmation ? "N" : "FF")
  document.getElementById("challengeconfirmation").textContent = "Challenge confirmation: O" + (player.options.challConf ? "N" : "FF")
  document.getElementById("eternityconf").textContent = "Eternity confirmation: O" + (player.options.eternityconfirm ? "N" : "FF")
  document.getElementById("dilationConfirmBtn").textContent = "Dilation confirmation: O" + (player.aarexModifications.dilationConf ? "N" : "FF")
  document.getElementById("exdilationConfirmBtn").textContent = "Reverse dilation confirmation: O" + (player.options.exdilationconfirm ? "N" : "FF")
  document.getElementById("quantumConfirmBtn").textContent = "Quantum confirmation: O" + (player.aarexModifications.quantumConf ? "N" : "FF")
  document.getElementById("bigRipConfirmBtn").textContent = "Big Rip confirmation: O" + ((player.masterystudies === undefined ? false : tmp.qu.bigRip.conf) ? "N" : "FF")
  document.getElementById("ghostifyConfirmBtn").textContent = "Ghostify confirmation: O" + (player.aarexModifications.ghostifyConf ? "N" : "FF")
  document.getElementById("leConfirmBtn").textContent = "Light Empowerment confirmation: O" + (player.aarexModifications.leNoConf ? "FF" : "N")

  document.getElementById("progressBarBtn").textContent = (player.aarexModifications.progressBar?"Hide":"Show")+" progress bar"
  document.getElementById("toggleLogRateChange").textContent = "Logarithm rate: O"+(player.aarexModifications.logRateChange?"N":"FF")
  document.getElementById("tabsSave").textContent = "Saved tabs: O"+(player.aarexModifications.tabsSave.on?"N":"FF")
  document.getElementById("performanceTicks").textContent = "Performance ticks: O"+(player.aarexModifications.performanceTicks?"N":"FF")
  dimDescEnd = (player.aarexModifications.logRateChange?" OoM":"%")+"/s)"

  document.getElementById("maxHighestTD").parentElement.parentElement.style.display = player.aarexModifications.ngmX > 3 ? "" : "none"
  document.getElementById("maxHighestTD").textContent = "Max only highest Time Dimensions: O"+(player.aarexModifications.maxHighestTD?"N":"FF")

  document.getElementById("quickMReset").style.display = pSacrificed() ? "" : "none"
  document.getElementById("quickMReset").textContent = "Quick matter reset: O"+(player.aarexModifications.quickReset?"N":"FF")

  document.getElementById("quantumtabbtn").style.display = quantumed ? "" : "none"
  document.getElementById("ghostifytabbtn").style.display = ghostified ? "" : "none"

  document.getElementById("chartDurationInput").value = player.options.chart.duration;
  document.getElementById("chartUpdateRateInput").value = player.options.chart.updateRate;
  if (player.options.chart.on) document.getElementById("chartOnOff").checked = true
  else document.getElementById("chartOnOff").checked = false
  if (player.options.chart.dips) document.getElementById("chartDipsOnOff").checked = true
  else document.getElementById("chartDipsOnOff").checked = false
 
  if (player.options.theme == "Dark" || player.options.theme == "Dark Metro") {
    Chart.defaults.global.defaultFontColor = '#888';
    normalDimChart.data.datasets[0].borderColor = '#888'
  } else {
    Chart.defaults.global.defaultFontColor = 'black';
    normalDimChart.data.datasets[0].borderColor = '#000'
  }

  document.getElementById("infmultbuyer").style.display = getEternitied()>0||player.masterystudies?"inline-block":"none"
  if (!player.options.hotkeys) document.getElementById("hotkeys").textContent = "Enable hotkeys"

  document.getElementsByClassName("hideInMorse").display = player.options.notation == "Morse code" ? "none" : ""

  document.getElementById("decimalMode").textContent = "Big numbers library: "+(break_infinity_js?"break_infinity (slow)":"logarithmica_numerus (fast)")
  document.getElementById("decimalMode").style.visibility = Decimal.gt(player.totalmoney,"1e9000000000000000") ? "hidden" : ""
  document.getElementById("hideProductionTab").textContent = (player.aarexModifications.hideProductionTab?"Show":"Hide")+" production tab"
  document.getElementById("hideRepresentation").textContent=(player.aarexModifications.hideRepresentation?"Show":"Hide")+" antimatter representation"
  document.getElementById("showAchRowNums").textContent=(player.aarexModifications.showAchRowNums?"Hide":"Show")+" achievement row info"
  document.getElementById("hideCompletedAchs").textContent=(player.aarexModifications.hideCompletedAchs?"Show":"Hide")+" completed achievement rows"
  document.getElementById("hideSecretAchs").textContent=(player.aarexModifications.hideSecretAchs?"Show":"Hide")+" secret achievements"

  updateHotkeys()

  document.getElementById("secretstudy").style.opacity = 0
  document.getElementById("secretstudy").style.cursor = "pointer"
  
  document.getElementById("bestAntimatterType").textContent = player.masterystudies && quantumed ? "Your best meta-antimatter for this quantum" : "Your best-ever meta-antimatter"

  document.getElementById("masterystudyunlock").style.display = player.dilation.upgrades.includes("ngpp6") && player.masterystudies ? "" : "none"
  document.getElementById("respecMastery").style.display = player.dilation.upgrades.includes("ngpp6") && player.masterystudies ? "block" : "none"
  document.getElementById("respecMastery2").style.display = player.dilation.upgrades.includes("ngpp6") && player.masterystudies ? "block" : "none"

  if (player.galacticSacrifice) {
      document.getElementById("galaxy11").innerHTML = "Normal"+(player.aarexModifications.ngmX>3?" and Time D":" d")+"imensions are "+(player.infinitied>0||getEternitied()!==0||quantumed?"cheaper based on your infinitied stat.<br>Currently: <span id='galspan11'></span>x":"99% cheaper.")+"<br>Cost: 1 GP"
      document.getElementById("galaxy15").innerHTML = "Normal and Time Dimensions produce "+(player.infinitied>0||getEternitied()!==0||quantumed?"faster based on your infinitied stat.<br>Currently: <span id='galspan15'></span>x":"100x faster")+".<br>Cost: 1 GP"
  } else {
      document.getElementById("infi21").innerHTML = "Increase the multiplier for buying 10 Dimensions<br>"+(player.aarexModifications.newGameExpVersion?"20x -> 24x":"2x -> 2.2x")+"<br>Cost: 1 IP"
      document.getElementById("infi33").innerHTML = "Increase Dimension Boost multiplier<br>2x -> 2.5x<br>Cost: 7 IP"
  }
  var resetSkipCosts=[20,40,80]
  for (u=1;u<4;u++) document.getElementById("infi4"+u).innerHTML="You start with the "+(u+4)+"th dimension unlocked"+(player.tickspeedBoosts==undefined?"":" and "+(u*4)+" tickspeed boosts")+"<br>Cost: "+resetSkipCosts[u-1]+" IP"
  document.getElementById("infi44").innerHTML="You start with the 8th dimension unlocked"+(player.tickspeedBoosts==undefined?"":", 16 tickspeed boosts")+", and a Galaxy<br>Cost: 500 IP"
  var showMoreBreak = player.galacticSacrifice ? "" : "none"
  for (i=1;i<5;i++) document.getElementById("postinfi0"+i).parentElement.style.display=showMoreBreak
  document.getElementById("d1AutoChallengeDesc").textContent=(player.aarexModifications.ngmX>3?"Galactic Sacrifice":"Reach infinity")+" for the first time."
  document.getElementById("d5AutoChallengeDesc").textContent=player.galacticSacrifice?"Tickspeed upgrades"+(player.tickspeedBoosts==undefined?"":" and Tickspeed Boosts")+(player.aarexModifications.ngmX>3?" are weaker":" start out useless")+", but galaxies make them stronger.":"Tickspeed starts at 7%."
  document.getElementById("tbAutoChallengeDesc").textContent=player.tickspeedBoosts==undefined?"Whenever you buy 10 of a dimension or tickspeed, everything else of equal cost will increase to its next cost step.":"You can't get Tickspeed Boosts and Antimatter Galaxies are 25% weaker."
  document.getElementById("autoDBChallengeDesc").textContent="There are only 6 dimensions, with dimension boost"+(player.tickspeedBoosts==undefined?"":", tickspeed boost,")+" and antimatter galaxy costs modified."
  document.getElementById("autoCrunchChallengeDesc").textContent="Each dimension produces the dimension 2 below it; first dimensions produce reduced antimatter. "+(player.galacticSacrifice?"Galaxies are far more powerful.":"")
  document.getElementById("autoDSChallengeDesc").textContent=player.tickspeedBoosts==undefined?"Per-ten multiplier is always 1x, but product of dimensions bought multiplies all dimensions.":"There is the product of amount instead of the product of bought."
  document.getElementById("autoGSChallengeDesc").textContent=player.aarexModifications.ngmX>3?"You can hold up to 10 total Dimension Boosts, Time Dimension Boosts, Tickspeed Boosts, and Galaxies.":(player.aarexModifications.ngmX>2?"All galaxy upgrades from the third column are disabled and Tickspeed Boosts give 20 free tickspeed purchases each instead.":"You can only get 308 tickspeed upgrades. This count does not reset on resets")
  document.getElementById("autoTBChallengeDesc").textContent=player.aarexModifications.ngmX>3?"Dimension Boosts and Time Dimension Boosts divide Tickspeed Multiplier instead.":"Dimension Boosts and Galaxies only boost Galaxy point gain and Tickspeed Boosts are nerfed, but Galaxy points boost Tickspeed Boosts."
  document.getElementById("infPowEffectPowerDiv").innerHTML=player.galacticSacrifice&&player.pSac==undefined?"Raised to the power of <span id='infPowEffectPower' style='font-size:35px; color: black'></span>, t":"T"
  document.getElementById("ngmmchalls").style.display=player.galacticSacrifice?"":"none"
  document.getElementById("ngmmmchalls").style.display=player.tickspeedBoosts==undefined?"none":""
  document.getElementById("ngm4chall").style.display=player.aarexModifications.ngmX>3?"":"none"
  document.getElementById("irschalls").style.display=player.infinityUpgradesRespecced==undefined?"none":""
  if (player.galacticSacrifice) {
      order=['postcngmm_1','postcngmm_2','postcngmm_3','postc1','postc2','postc4','postc5','postc6','postc7','postc8']
      document.getElementById("icngmm_row").style.display=""
      document.getElementById("icngmm_3div").style.display=""
      document.getElementById("ic2div").style.display="none"
      document.getElementById("icngmm_4div").style.display=""
      document.getElementById("ic3div").style.display="none"
      document.getElementById("icngmm_4div").appendChild(document.getElementById("postc2").parentElement.parentElement)
  } else {
      order=['postc1','postc2','postc3','postc4','postc5','postc6','postc7','postc8']
      document.getElementById("icngmm_row").style.display="none"
      document.getElementById("icngmm_3div").style.display="none"
      document.getElementById("ic2div").style.display=""
      document.getElementById("icngmm_4div").style.display="none"
      document.getElementById("ic3div").style.display=""
      document.getElementById("ic2div").appendChild(document.getElementById("postc2").parentElement.parentElement)
  }
  document.getElementById("postc2reward").textContent = "Reward: "+(player.galacticSacrifice?"M":"Sacrifice autobuyer and m")+"ore powerful sacrifice"
  if (player.tickspeedBoosts == undefined) {
      document.getElementById("icngm3_row").style.display="none"
      document.getElementById("icngm3_row2").style.display="none"
      document.getElementById("icngm3_div1").style.display="none"
	  galCosts[31]=2
	  galCosts[12]=3
	  galCosts[32]=8
	  galCosts[13]=20
	  galCosts[33]=1e3
      document.getElementById("ic4div").appendChild(document.getElementById("postc4").parentElement.parentElement)
      document.getElementById("ic4div").style.display=""
  } else {
      document.getElementById("icngm3_row").style.display=""
      document.getElementById("icngm3_row2").style.display=""
      document.getElementById("icngm3_div1").style.display=""
      order=['postcngmm_1','postcngmm_2','postcngm3_1','postcngm3_2','postcngmm_3','postc1','postc2','postcngm3_3','postc4','postcngm3_4','postc5','postc6','postc7','postc8']
	  galCosts[31]=5
	  galCosts[12]=5
	  galCosts[32]=20
	  galCosts[13]=50
	  galCosts[33]=1e15
      document.getElementById("icngm3_div2").appendChild(document.getElementById("postc4").parentElement.parentElement)
      document.getElementById("ic4div").style.display="none"
  }
  document.getElementById("galaxy21").innerHTML=(player.tickspeedBoosts!=undefined?"Reduce the dimension boost cost multiplier to "+(player.aarexModifications.ngmX>3?10:5):"Dimension boost scaling starts 2 later and increases the cost by 5 each")+".<br>Cost: 1 GP"
  document.getElementById("galaxy12").innerHTML="Normal "+(player.aarexModifications.ngmX>3?"and Time D":"d")+"mensions gain a multiplier based on time since last galactic sacrifice.<br>Currently: <span id='galspan12'>x</span>x<br>Cost: "+galCosts[12]+" GP"
  document.getElementById("galBuff22").textContent=player.aarexModifications.ngmX>3?2:5
  document.getElementById("galaxy13").innerHTML="Normal "+(player.aarexModifications.ngmX>3?"and Time D":"d")+"imensions gain a multiplier based on your galaxy points.<br>Currently: <span id='galspan13'>x</span>x<br>Cost: "+galCosts[13]+" GP"
  document.getElementById("galDesc23").textContent="Dimension "+(player.aarexModifications.ngmX>3?" Boosta and Time Dimension B":"b")+"oosts are stronger based on your galaxy points."
  document.getElementById("galcost31").textContent=galCosts[31]
  document.getElementById("galcost32").textContent=galCosts[32]
  document.getElementById("preinfupgrades").style.display=player.infinityUpgradesRespecced?"none":""
  document.getElementById("infi1div").style.display=player.infinityUpgradesRespecced==undefined?"none":""
  document.getElementById("infi3div").style.display=player.infinityUpgradesRespecced==undefined?"none":""
  document.getElementById("postinfbtn").style.display=player.infinityUpgradesRespecced?"none":""
  updateSingularity()
  updateDimTechs()
  if (player.infinityUpgradesRespecced != undefined) order = []
  document.getElementById("ic1desc").textContent="All previous challenges (except tickspeed challenge"+(player.galacticSacrifice?',':" and")+" automatic big crunch challenge"+(player.galacticSacrifice?", and automatic galactic sacrifice challenge":"")+") at once."
  document.getElementById("ic1reward").textContent="Reward: "+(player.galacticSacrifice?2:1.3)+"x on all Infinity Dimensions for each Infinity Challenge completed"
  document.getElementById("ic2desc").textContent=(player.tickspeedBoosts==undefined?"":"Infinity Dimensions do nothing. Sacrifice is way stronger. ")+"Automatically sacrifice every 8 ticks once you have 8th Dimension."
  document.getElementById("ic4desc").textContent=player.tickspeedBoosts==undefined?"Only latest bought dimension production is normal, all other dimensions produce less.":"All Normal Dimension multipliers are squared root without dilation penalty."
  document.getElementById("ic5desc").textContent=player.tickspeedBoosts==undefined?"When buying dimensions 1-4, everything with costs smaller or equal increases. When buying dimensions 5-8, everything with costs bigger or equal increases. When buying tickspeed, everything with the same cost increases.":"You can't get tickspeed upgrades and galaxies. Tickspeed Boosts boost tickspeed instead."
  document.getElementById("ic7desc").textContent="You can't get Antimatter Galaxies, but dimensional boost multiplier "+(player.galacticSacrifice?"is cubed":"2.5x -> 10x")
  document.getElementById("ic7reward").textContent="Reward: Dimensional boost multiplier "+(player.galacticSacrifice?"is squared":"2.5x -> 4x")
  document.getElementById("replicantitabbtn").style.display=player.infinityUpgradesRespecced?"none":""
  document.getElementById("replicantiresettoggle").textContent="Auto galaxy "+(player.replicanti.galaxybuyer?"ON":"OFF")+(player.timestudy.studies.includes(131)&&speedrunMilestonesReached<20?" (disabled)":"")
  document.getElementById("41").innerHTML="Each galaxy gives a 1."+(player.aarexModifications.newGameExpVersion?5:2)+"x multiplier on IP gained. <span>Cost: 4 Time Theorems"
  document.getElementById("42").innerHTML=(player.galacticSacrifice?"Galaxy cost multiplier is reduced by "+(player.aarexModifications.newGameExpVersion?12:13)+"/15x":"Galaxy requirement goes up "+(player.aarexModifications.newGameExpVersion?48:52)+" 8ths instead of 60")+".<span>Cost: 6 Time Theorems"
  document.getElementById("61").innerHTML="You gain 10"+(player.aarexModifications.newGameExpVersion?0:"")+"x more EP<span>Cost: 3 Time Theorems"
  document.getElementById("62").innerHTML="You gain replicanti "+(player.aarexModifications.newGameExpVersion?4:3)+" times faster<span>Cost: 3 Time Theorems"
  document.getElementById("81").innerHTML="Dimensional boost power "+(player.galacticSacrifice?"is cubed":"becomes 10x")+"<span>Cost: 4 Time Theorems"
  document.getElementById("221").style["font-size"] = player.masterystudies !== undefined ? "0.45rem" : "0.55rem"
  document.getElementById("221desc").textContent = ""
  document.getElementById("227desc").textContent = ""
  document.getElementById("231").style["font-size"] = player.masterystudies !== undefined ? "0.55rem" : "0.65rem"
  document.getElementById("231desc").textContent = ""
  document.getElementById("232desc").textContent = ""
  document.getElementById('replicantigalaxypowerdiv').style.display=player.achievements.includes("r106")&&player.boughtDims?"":"none"
  document.getElementById("dilationeterupgrow").style.display="none"
  document.getElementById("blackHoleAnimBtn").style.display="none"
  if (player.exdilation != undefined) {
      if (player.dilation.studies.includes(1)) document.getElementById("dilationeterupgrow").style.display="table-row"
      document.getElementById("blackHoleAnimBtn").textContent = "Black hole: " + ((player.options.animations.blackHole) ? "ON" : "OFF")
      document.getElementById("blackholeMax").style.display = player.aarexModifications.ngudpV || player.aarexModifications.nguspV ? "" : "none"
      document.getElementById("blackholeauto").style.display = player.aarexModifications.ngudpV && player.achievements.includes("ngpp17") ? "" : "none"
      document.getElementById('blackholeauto').textContent="Auto: O"+(player.aarexModifications.ngudpV&&player.autoEterOptions.blackhole?"N":"FF")
      if (player.blackhole.unl == true) {
          document.getElementById("blackholediv").style.display="inline-block"
          document.getElementById("blackholeunlock").style.display="none"
          document.getElementById("blackHoleAnimBtn").style.display="inline-block"
      } else {
          document.getElementById("blackholediv").style.display="none"
          document.getElementById("blackholeunlock").style.display="inline-block"
      }
  }
  var suffix="NG"+(player.meta!=undefined?"pp":"ud")
  document.getElementById("uhDiv"+suffix).appendChild(document.getElementById("Universal harmony"))
  document.getElementById("feDiv"+suffix).appendChild(document.getElementById("In the grim darkness of the far endgame"))
  document.getElementById("dil11effect").textContent=player.aarexModifications.nguspV?"You gain even more tachyon particles from the previous upgrade.":"Tachyon particle formula is better."
  document.getElementById("dil15").style["font-size"]=player.masterystudies==undefined||player.aarexModifications.nguspV!==undefined?"10px":"9px"
  document.getElementById("dil15formula").style.display=player.masterystudies==undefined||player.aarexModifications.nguspV!==undefined?"none":""
  document.getElementById("exDilationDesc").innerHTML = player.aarexModifications.nguspV ? 'making galaxies <span id="exDilationBenefit" style="font-size:25px; color: black">0</span>% stronger in dilation.' : 'making dilation <span id="exDilationBenefit" style="font-size:25px; color: black">0</span>% less severe.'
  document.getElementById("metaAntimatterEffectType").textContent=inQC(3)?"multiplier on all Infinity Dimensions":"extra multiplier per dimension boost"
  if (player.meta) {
      document.getElementById('epmultauto').textContent="Auto: O"+(player.autoEterOptions.epmult?"N":"FF")
      for (i=1;i<9;i++) document.getElementById("td"+i+'auto').textContent="Auto: O"+(player.autoEterOptions["td"+i]?"N":"FF")
  }
  document.getElementById('replicantibulkmodetoggle').textContent="Mode: "+(player.galaxyMaxBulk?"Max":"Singles")
  document.getElementById('sacrificeAuto').style.display=speedrunMilestonesReached>24?"":"none"
  document.getElementById('toggleautoquantummode').style.display=(player.masterystudies?tmp.qu.reachedInfQK||player.achievements.includes("ng3p25"):false)?"":"none"
  document.getElementById('assignAll').style.display=(player.masterystudies?tmp.qu.reachedInfQK||ghostified:false)?"":"none"
  document.getElementById('autoReset').style.display=player.achievements.includes("ng3p47")?"":"none"
  document.getElementById('aftereternity').style.display=player.achievements.includes("ng3p52")?"":"none"
  transformSaveToDecimal()
  if (player.pSac !== undefined) {
      updateParadoxUpgrades()
      updatePUCosts()
  }
  if (player.masterystudies) {
      updateMasteryStudyCosts()
      if (quantumed) giveAchievement("Sub-atomic")
      if (tmp.qu.best<=10) giveAchievement("Quantum doesn't take so long")
      if (ghostified) giveAchievement("Kee-hee-hee!")
      document.getElementById('reward3disable').textContent="6 hours reward: O"+(tmp.qu.disabledRewards[3]?"FF":"N")
      document.getElementById('reward4disable').textContent="4.5 hours reward: O"+(tmp.qu.disabledRewards[4]?"FF":"N")
      document.getElementById('reward11disable').textContent="33.3 mins reward: O"+(tmp.qu.disabledRewards[11]?"FF":"N")
      document.getElementById('reward27disable').textContent="10 seconds reward: O"+(tmp.qu.disabledRewards[27]?"FF":"N")
      document.getElementById('rebuyupgauto').textContent="Rebuyable upgrade auto: O"+(player.autoEterOptions.rebuyupg?"N":"FF")
      document.getElementById('dilUpgsauto').textContent="Auto-buy dilation upgrades: O"+(player.autoEterOptions.dilUpgs?"N":"FF")
      document.getElementById('metaboostauto').textContent="Meta-boost auto: O"+(player.autoEterOptions.metaboost?"N":"FF")
      document.getElementById('priorityquantum').value=formatValue("Scientific", new Decimal(tmp.qu.autobuyer.limit), 2, 0)
      document.getElementById('rg4toggle').style.display=(inQC(1)||QCIntensity(1))?"none":""
      document.getElementById('rg4toggle').textContent="Toggle: O"+(tmp.qu.rg4?"N":"FF")
      document.getElementById("respecPC").className=tmp.qu.pairedChallenges.respec?"quantumbtn":"storebtn"
      document.getElementById('sacrificeAuto').textContent="Auto: O"+(tmp.qu.autoOptions.sacrifice?"N":"FF")
      document.getElementById("produceQuarkCharge").innerHTML="S" + (tmp.qu.nanofield.producingCharge ? "top" : "tart") + " production of preon charge." + (tmp.qu.nanofield.producingCharge ? "" : "<br>(You will not get preons when you do this.)")
      document.getElementById("ratio_r").value = tmp.qu.assignAllRatios.r
      document.getElementById("ratio_g").value = tmp.qu.assignAllRatios.g
      document.getElementById("ratio_b").value = tmp.qu.assignAllRatios.b
      document.getElementById('autoAssign').textContent="Auto: O"+(tmp.qu.autoOptions.assignQK?"N":"FF")
      document.getElementById('autoAssignRotate').textContent="Rotation: "+(tmp.qu.autoOptions.assignQKRotate>1?"Left":tmp.qu.autoOptions.assignQKRotate?"Right":"None")
      document.getElementById('autoReset').textContent="Auto: O"+(tmp.qu.autoOptions.replicantiReset?"N":"FF")
      document.getElementById("quantumstudies").style.display=quantumed&&player.masterystudies?"":"none"
      document.getElementById("replicantsstudies").style.display=player.masterystudies.includes("d10")||ghostified?"":"none"
      document.getElementById("timestudy322").style.display=player.masterystudies.includes("d10")||ghostified?"":"none"
      document.getElementById("empstudies").style.display=player.masterystudies.includes("d11")||ghostified?"":"none"
      document.getElementById("timestudy361").style.display=player.masterystudies.includes("d11")||ghostified?"":"none"
      document.getElementById("timestudy362").style.display=player.masterystudies.includes("d11")||ghostified?"":"none"
      document.getElementById("timestudy362").style["font-size"] = player.masterystudies !== undefined ? "10px" : "0.65rem"
      document.getElementById("362desc").textContent="Reduce the softcap for preon boost"+(player.aarexModifications.ngumuV?" and preons reduce green power effect.":".")
      document.getElementById("nfstudies").style.display=player.masterystudies.includes("d12")||ghostified?"":"none"
      document.getElementById("todstudies").style.display=player.masterystudies.includes("d13")||ghostified?"":"none"
      document.getElementById("nanofieldtabbtn").style.display=player.masterystudies.includes("d12")?"":"none"
      document.getElementById("ghostifyAnimBtn").textContent="Ghostify: O"+(player.options.animations.ghostify?"N":"FF")
      for (var u=5;u<13;u++) {
          if (u%3==1) document.getElementById("neutrinoUpg"+u).parentElement.parentElement.style.display=u>player.ghostify.times+2?"none":""
          else document.getElementById("neutrinoUpg"+u).style.display=u>player.ghostify.times+2?"none":""
      }
      document.getElementById("gphUnl").textContent="To unlock Ghostly Photons, you need to get "+shortenCosts(Decimal.pow(10,6e9))+" antimatter while your universe is Big Ripped first."
      document.getElementById("blUnl").textContent="To unlock Bosonic Lab, you need to get "+shortenCosts(Decimal.pow(10,1e10))+" ghostly unstable quarks first."
      document.getElementById("bpc68").textContent=shortenMoney(tmp.qu.pairedChallenges.pc68best)
      document.getElementById("odSlider").value=Math.round((tmp.bl.odSpeed-1)/4*50)
      for (var g=1;g<br.names.length;g++) document.getElementById("typeToExtract"+g).className=tmp.bl.typeToExtract==g?"chosenbtn":"storebtn"
      updateColoredQuarksProduction()
      updateElectrons()
      updateAutoQuantumMode()
      updateColorCharge()
      updateGluons()
      updateReplicants()
      updateTODStuff()
      updateBraveMilestones()
      updateNeutrinoBoosts()
      updateGPHUnlocks()
      updateBLUnlocks()
      updateBosonicStuffCosts()
  }
  hideDimensions()
  updateChallenges()
  updateNCVisuals()
  updateChallengeTimes()
  checkForEndMe()
  updateAutobuyers()
  updatePriorities()
  updateMilestones()
  loadInfAutoBuyers()
  updateEternityUpgrades()
  updateTheoremButtons()
  updateTimeStudyButtons()
  updateRespecButtons()
  updateEternityChallenges()
  updateEterChallengeTimes()
  updateDilationUpgradeCosts()
  updateExdilation()
  updateLastTenQuantums()
  updateSpeedruns()
  updateBankedEter()
  updateQuantumChallenges()
  updateQCTimes()
  updatePCCompletions()
  maybeShowFillAll()
  updateBreakEternity()
  updateLastTenGhostifies()
  onNotationChangeNeutrinos()
  setAchieveTooltip()
  if (player.boughtDims) {
      if (document.getElementById("timestudies").style.display=="block") showEternityTab("ers_timestudies",true)
      updateGalaxyControl()
  } else if (document.getElementById("ers_timestudies").style.display=="block") showEternityTab("timestudies",true)
  poData=metaSave["presetsOrder"+(player.boughtDims?"_ers":"")]
  setAndMaybeShow('bestTP',player.achievements.includes("ng3p18") || player.achievements.includes("ng3p37"),'"Your best"+(ghostified ? "" : " ever")+" Tachyon particles"+(ghostified ? " in this Ghostify" : "")+" was "+shorten(player.dilation.bestTP)+"."')
  setAndMaybeShow('bestTPOverGhostifies',(player.achievements.includes("ng3p18") || player.achievements.includes("ng3p37")) && ghostified,'"Your best-ever Tachyon particles was "+shorten(player.dilation.bestTPOverGhostifies)+"."')
  document.getElementById('dilationmode').style.display=speedrunMilestonesReached>4?"":"none"
  document.getElementById('rebuyupgmax').style.display=speedrunMilestonesReached<26&&player.masterystudies?"":"none"
  document.getElementById('rebuyupgauto').style.display=speedrunMilestonesReached>6?"":"none"
  document.getElementById('toggleallmetadims').style.display=speedrunMilestonesReached>7?"":"none"
  document.getElementById('metaboostauto').style.display=speedrunMilestonesReached>14?"":"none"
  document.getElementById("autoBuyerQuantum").style.display=speedrunMilestonesReached>22?"":"none"
  document.getElementById("quarksAnimBtn").style.display=quantumed&&player.masterystudies?"inline-block":"none"
  document.getElementById("quarksAnimBtn").textContent="Quarks: O"+(player.options.animations.quarks?"N":"FF")
  document.getElementById("maxTimeDimensions").style.display=removeMaxTD?"none":""
  document.getElementById("metaMaxAllDiv").style.display=removeMaxMD?"none":""
  document.getElementById("edtabbtn").style.display=!player.masterystudies?"none":player.masterystudies.includes("d11")?"":"none"
  document.getElementById("ghostifyAnimBtn").style.display=ghostified?"inline-block":"none"
  var removeMaxTD=false
  var removeMaxMD=false
  if (player.achievements.includes("ngpp17")) {
      for (d=1;d<9;d++) {
          if (player.autoEterOptions["td"+d]) {
              if (d>7) removeMaxTD=true
          } else break
      }
  }
  if (speedrunMilestonesReached > 27) {
      for (d=1;d<9;d++) {
          if (player.autoEterOptions["md"+d]) {
              if (d>7) removeMaxMD=true
          } else break
      }
  }
  notifyId=speedrunMilestonesReached
  notifyId2=player.masterystudies===undefined?0:player.ghostify.milestones
  showHideFooter()
  document.getElementById("newsbtn").textContent=(player.options.newsHidden?"Show":"Hide")+" news ticker"
  document.getElementById("game").style.display=player.options.newsHidden?"none":"block"
  var tabsSave = player.aarexModifications.tabsSave
  showDimTab((tabsSave.on && tabsSave.tabDims) || 'antimatterdimensions')
  showStatsTab((tabsSave.on && tabsSave.tabStats) || 'stats')
  showAchTab((tabsSave.on && (tabsSave.tabAchs == 'normalachievements' || tabsSave.tabAchs == 'secretachievements') && tabsSave.tabAchs) || 'normalachievements')
  showChallengesTab((tabsSave.on && tabsSave.tabChalls) || 'normalchallenges')
  showInfTab((tabsSave.on && tabsSave.tabInfinity) || 'preinf')
  showEternityTab((tabsSave.on && tabsSave.tabEternity) || 'timestudies', true)
  showQuantumTab((tabsSave.on && tabsSave.tabQuantum) || 'uquarks')
  showNFTab((tabsSave.on && tabsSave.tabNF) || 'nanoverse')
  showBranchTab((tabsSave.on && tabsSave.tabBranch) || 'red')
  showGhostifyTab((tabsSave.on && tabsSave.tabGhostify) || 'neutrinos')
  showBLTab((tabsSave.on && tabsSave.tabBL) || 'bextab')
  if (!player.options.newsHidden) scrollNextMessage()
  document.getElementById("secretoptionsbtn").style.display=player.options.secrets?"":"none"
  document.getElementById("ghostlynewsbtn").textContent=((player.options.secrets!==undefined?player.options.secrets.ghostlyNews:false)?"Hide":"Show")+" ghostly news ticker"
  resetUP()
  if (player.aarexModifications.offlineProgress && !noOffline) {
      let diff = new Date().getTime() - player.lastUpdate
      if (diff > 1000*1000) {
          simulateTime(diff/1000)
      }
  } else player.lastUpdate = new Date().getTime()
  if (player.totalTimePlayed < 1 || inflationCheck || forceToQuantumAndRemove) {
      ngModeMessages=[]
      if (player.aarexModifications.newGameMult) ngModeMessages.push("Welcome to NG Multiplied mode, made by Despacit and Soul147! This mode adds too many overpowerful buffs! This mode may be broken.")
      if (player.aarexModifications.newGameExpVersion) ngModeMessages.push("Welcome to NG^ mode, made by Naruyoko! This mode adds way many buffs that this mode may be broken!")
      if (player.meta!==undefined||player.exdilation!==undefined) {
          if (!player.aarexModifications.newGamePlusVersion) ngModeMessages.push("WARNING! You are disabling NG+ features on NG++! Standard NG++ have all of NG++ features and I recommend you to create a new save with NG+ and NG++ modes on.")
          if (player.aarexModifications.ngp4V) ngModeMessages.push("Welcome to NG++++ mode by Aarex! This is a NG+ version of NG+3 which makes you start with more stuff! It is recommended to not use this mode to progress in NG+3.")
          if (player.exdilation!==undefined) {
              if (player.aarexModifications.nguspV) ngModeMessages.push("Welcome to NG Update Semiprime mode made by Aarex! This is like NGUd', but it is really a combination of NG+3 and NGUd. This mode is more balanced too. Good luck! :)")
              if (player.aarexModifications.ngumuV||player.aarexModifications.nguepV) {
                  if (player.aarexModifications.ngumuV) ngModeMessages.push("Welcome to NG Update Multiplied Prime mode, made by Aarex! This is a NG*-like mod of NGUd'. This mod is very easy to beat, but you can't break this mod. :'(")
                  if (player.aarexModifications.nguepV) ngModeMessages.push("Welcome to NG Update Exponential Prime mode made by pg132! NGUd^' is like NGUd', but non-Black Hole nerfs are removed to make NGUd^' a NG^-like mod of NGUd'. This mod is very easy to beat, but you can't break this mod. :'(")
              } else if (player.aarexModifications.nguspV) {}
              else if (player.aarexModifications.ngudpV) ngModeMessages.push("Welcome to NG Update Prime mode made by pg132! NGUd' is like NGUd+, but you can't reverse dilation. Good luck for beating this mod. >:)")
              else if (player.meta!==undefined) ngModeMessages.push("Welcome to NG Update+ mode, a combination made by Soul147 (Sigma)! This is a combination of dan-simon's NG Update and Aarex's NG+++. I think in this mode, you can break the game...")
              else ngModeMessages.push("Welcome to NG Update mode, an another dan-simon's end-game mod! In this mode, there are black hole and ex-dilation.")
          } else if (player.masterystudies&&!player.aarexModifications.ngp4V) ngModeMessages.push("Welcome to NG+++ mode, the extension of dan-simon's NG++ made by Aarex! There are a lot of content that are added. Good luck for beating this mode!")
          else if (!player.aarexModifications.ngp4V) ngModeMessages.push("Welcome to NG++ mode, made by dan-simon! In this mode, more dilation upgrades and meta-dimensions are added to push the end-game further.")
      } else if (player.aarexModifications.newGamePlusVersion) ngModeMessages.push("Welcome to NG+ mode, made by earthernsence! Right now, you start with all Eternity Challenges completed and 1 infinitied.")
      if (player.infinityUpgradesRespecced) ngModeMessages.push('Welcome to Infinity Respecced, created by Aarex! In this mode, all of infinity upgrades are replaced with new upgrades except 2x IP mult. Oh, break infinity is removed.')
      if (player.boughtDims) ngModeMessages.push('Welcome to Eternity Respecced created by dan-simon! NOTE: This is broken right now. I will fix it in later time, like after months.')
      if (player.galacticSacrifice) {
          if (player.aarexModifications.ngmX>4) ngModeMessages.push('Welcome to NG-5 mode, a more hardcore mode than NG-4! This is very hardcore because you are stuck in more challenges. You are also stuck in Automated Big Crunches Challenge which is a big impact on this mod. Good luck! This mode is made by Aarex.')
          else if (player.aarexModifications.ngmX>3) ngModeMessages.push('Welcome to NG-4 mode, the nerfed version of NG--- mode! This mode features even more changes from NG--- and is very hardcore. WIP by Nyan Cat and edited by Aarex.')
          else if (player.aarexModifications.newGame3MinusVersion) ngModeMessages.push('Welcome to NG--- mode, the nerfed version of NG-- mode! This mode reduces tickspeed multiplier multiplier and nerfs galaxies, but have a new feature called \"Tickspeed Boosts\" and 1 achievement buff.')
          else ngModeMessages.push('Welcome to NG-- mode created by Nyan cat! Dilation is always locked but have more balancing, IC3 trap, and a new feature called "Galactic Sacrifice".')
      }
      if (player.aarexModifications.newGameMinusVersion) ngModeMessages.push("Welcome to NG- mode! Everything are nerfed by the creator slabdrill, making the end-game harder to reach.")
      if (player.aarexModifications.newGameMinusVersion&&player.galacticSacrifice&&player.meta&&player.masterystudies){
          ngModeMessages = []
          if (!player.aarexModifications.newGamePlusVersion) ngModeMessages.push("WARNING! You are disabling NG+ features on NG+-+-+! Standard NG+-+-+ have all of NG++ features and I recommend you to create a new save with NG-, NG--, NG+ and NG+++ modes on.")
          if (player.tickspeedBoosts !== undefined) ngModeMessages.push("Welcome to NG+-+-+- mode! This combines NG--, NG-, and NG+3 features. Good luck!")
          else ngModeMessages.push("Welcome to NG+-+-+ mode, created by earthernsence! This mode combines NG--, NG-, and NG+++ features. Good luck!")
      }
      if (inflationCheck) ngModeMessages = ["I'm terribly sorry. But your save was appeared that there is an inflation, which it defeats the rule of incremental games. Your save was forced to reset everything."]
      if (infiniteCheck) ngModeMessages = ["I'm terribly sorry, but there has been an Infinite bug detected within your save file, which is why said save file will get reset. Luckily, you can export your save before this reset. Thanks! :)"]
      if (forceToQuantumAndRemove) {
          quantum(false, true, 0)
          ngModeMessages = ["Due to balancing changes, you are forced to quantum, lose your TT, and lose your best TP, but you now have "+shorten(setTTAfterQuantum)+" TT for free."]
          player.timestudy.theorem = setTTAfterQuantum
          player.dilation.bestTP = new Decimal(0)
          document.getElementById('bestTP').textContent = "Your best ever Tachyon particles was 0."
      }
      inflationCheck = false
      infiniteCheck = false
      closeToolTip()
      showNextModeMessage()
  } else if (player.aarexModifications.popUpId!="STD") showNextModeMessage()
  document.getElementById("ghostlyNewsTicker").style.height=((player.options.secrets!==undefined?player.options.secrets.ghostlyNews:false)?24:0)+"px"
  document.getElementById("ghostlyNewsTickerBlock").style.height=((player.options.secrets!==undefined?player.options.secrets.ghostlyNews:false)?16:0)+"px"
}

function checkNGM(imported) {
	var temp = (imported) ? imported : player
	var td1PowerDiv = Decimal.pow(2, player.timeDimension1.bought).div(player.timeDimension1.power).toNumber()
	if (Math.round(td1PowerDiv) == 100) return 2.2
	if (Math.round(td1PowerDiv*8) == 5) return 2.1
	if (Math.round(td1PowerDiv) == 5) return 2
	if (Math.round(new Decimal(temp.timestudy.ipcost).mantissa) != 1) return 1.1
	if (Math.round(td1PowerDiv) == 10) return 1
	return 0
}

var savePlacement
function load_game(noOffline, init) {
	if (!metaSave.saveOrder.includes(metaSave.current)) metaSave.current=metaSave.saveOrder[0]
	var dimensionSave=get_save(metaSave.current)
	infiniteDetected=false
	if (dimensionSave!=null) {
		if (dimensionSave.quantum !== undefined) if (dimensionSave.quantum.timeFluxPower !== undefined) dimensionSave = get_save(metaSave.current + "_af2019")
		player=dimensionSave
		if (detectInfinite()) infiniteCheck=true
	}
	savePlacement=1
	while (metaSave.saveOrder[savePlacement-1]!=metaSave.current) savePlacement++
	if (break_infinity_js==null) {
		if (player.aarexModifications) break_infinity_js=player.aarexModifications.breakInfinity
		if (break_infinity_js) Decimal = Decimal_BI
		initCost = [null, new Decimal(10), new Decimal(1e2), new Decimal(1e4), new Decimal(1e6), new Decimal(1e9), new Decimal(1e13), new Decimal(1e18), new Decimal(1e24)]
		costMults = [null, new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
		nextAt = {postc1:new Decimal("1e2000"),postc1_ngmm:new Decimal("1e3000"),postc1_ngm3:new Decimal("1e3760"),postc2:new Decimal("1e5000"),postc3:new Decimal("1e12000"),postc4:new Decimal("1e14000"),postc5:new Decimal("1e18000"),postc5_ngm3:new Decimal("1e21500"),postc6:new Decimal("1e20000"),postc6_ngm3:new Decimal("1e23000"),postc7:new Decimal("1e23000"),postc7_ngm3:new Decimal("1e26000"),postc8:new Decimal("1e28000"),postcngmm_1:new Decimal("1e750"),postcngmm_1_ngm3:new Decimal("1e1080"),postcngmm_2:new Decimal("1e1350"),postcngmm_3:new Decimal("1e2000"),postcngmm_3_ngm3:new Decimal("1e2650"),postcngm3_1:new Decimal("1e1560"),postcngm3_2:new Decimal("1e2085"),postcngm3_3:new Decimal("1e8140"),postcngm3_4:new Decimal("1e17000")}
		goals = {postc1:new Decimal("1e850"),postc1_ngmm:new Decimal("1e650"),postc1_ngm3:new Decimal("1e375"),postc2:new Decimal("1e10500"),postc2_ngm3:new Decimal("1e4250"),postc3:new Decimal("1e5000"),postc4:new Decimal("1e13000"),postc4_ngm3:new Decimal("1e4210"),postc5:new Decimal("1e11111"),postc5_ngm3:new Decimal("7.77e7777"),postc6:new Decimal("2e22222"),postc7:new Decimal("1e10000"),postc7_ngmm:new Decimal("1e15000"),postc7_ngm3:new Decimal(1/0),postc8:new Decimal("1e27000"),postc8_ngm3:new Decimal(1/0),postcngmm_1:new Decimal("1e550"),postcngmm_1_ngm3:new Decimal("1e650"),postcngmm_2:new Decimal("1e950"),postcngmm_2_ngm3:new Decimal("1e1090"),postcngmm_3:new Decimal("1e1200"),postcngmm_3_ngm3:new Decimal("1e1230"),postcngm3_1:new Decimal("1e550"),postcngm3_2:new Decimal("1e610"),postcngm3_3:new Decimal("8.8888e888"),postcngm3_4:new Decimal("1e12345")}
		setUnlocks = [Decimal.pow(Number.MAX_VALUE, 2.9)]
	}
	if (infiniteCheck) exportInfiniteSave()
	if (infiniteCheck || infiniteCheck2) {
		updateNewPlayer(true)
		infiniteCheck2 = false
	}
	onLoad(noOffline)
	startInterval()
}

function reload() {
	clearInterval(gameLoopIntervalId)
	updateNewPlayer()
	closeToolTip()
	load_game(true)
}

var noSave=false
function save_game(silent) {
  isInfiniteDetected()
  if (!game_loaded || noSave || infiniteDetected) return
  set_save(metaSave.current, player);
  $.notify("Game saved", "info")
}

function toggleAutoSave() {
	player.aarexModifications.autoSave = !player.aarexModifications.autoSave
	document.getElementById("autoSave").textContent = "Auto save: O"+(player.aarexModifications.autoSave?"N":"FF")
	autoSaveSeconds = 0
}

function changeAutoSaveInterval() {
	player.aarexModifications.autoSaveInterval = document.getElementById("autoSaveIntervalSlider").value
	document.getElementById("autoSaveInterval").textContent = "Auto-save interval: " + player.aarexModifications.autoSaveInterval + "s"
	autoSaveSeconds = 0
}

function getAutoSaveInterval() {
	return player.aarexModifications.autoSaveInterval || 30
}

function overwrite_save(id) {
	if (id==metaSave.current) {
		save_game()
		return
	}
	var placement=1
	while (metaSave.saveOrder[placement-1]!=id) placement++
	if (!confirm("Are you really sure you want to overwrite save #"+placement+"? You might lose your progress!")) return
	set_save(id, player)
	$.notify("Save overwritten", "info")
}

function change_save(id) {
	if (!game_loaded) {
		metaSave.current=id
		localStorage.setItem(metaSaveId, btoa(JSON.stringify(metaSave)))
		document.location.reload(true)
		return
	}
	save_game(true)
	clearInterval(gameLoopIntervalId)
	var oldId=metaSave.current
	metaSave.current=id
	changeSaveDesc(oldId, savePlacement)
	updateNewPlayer()
	infiniteCheck2 = false
	closeToolTip()
	load_game(shiftDown)
	savePlacement=1
	while (metaSave.saveOrder[savePlacement-1]!=id) savePlacement++
	changeSaveDesc(metaSave.current, savePlacement)

	$.notify("Save #"+savePlacement+" loaded", "info")
	localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
}

function rename_save(id) {
	if (metaSave.current != id && id !== undefined) {
		var placement=1
		while (metaSave.saveOrder[placement-1]!=id) placement++
	}
	var save_name = prompt("Input a new name of "+((metaSave.current == id || id === undefined) ? "your current save" : "save #" + placement)+". It is necessary to rename it into related names! Leave blank to reset the save's name.")
	if (save_name === null) return
	if (metaSave.current == id || id === undefined) {
		player.aarexModifications.save_name = save_name
		document.getElementById("rename").innerHTML = "<p style='font-size:15px'>Rename</p>Name: "+(player.aarexModifications.save_name?player.aarexModifications.save_name:"Save #" + savePlacement)
	} else {
		var temp_save = get_save(id)
		if (!temp_save.aarexModifications) temp_save.aarexModifications={
			dilationConf: false,
			offlineProgress: true,
			autoSave: true,
			progressBar: true,
			logRateChange: false,
			hideProductionTab: true,
			eternityChallRecords: {},
			popUpId: 0,
			tabsSave: {on: false},
			breakInfinity: false
        }
		temp_save.aarexModifications.save_name = save_name
	}
	set_save(id, temp_save)
	placement=1
	while (metaSave.saveOrder[placement-1]!=id) placement++
	changeSaveDesc(id, placement)
	$.notify("Save #"+placement+" renamed", "info")
}

function export_save(id) {
	var placement=1
	if (!id) id=metaSave.current
	while (metaSave.saveOrder[placement-1]!=id) placement++

	let output = document.getElementById('output')
	let parent = output.parentElement

	parent.style.display = ""
	if (id == metaSave.current) output.value = btoa(JSON.stringify(player, function(k, v) { return (v === Infinity) ? "Infinity" : v }))
	else output.value = localStorage.getItem(btoa(savePrefix+id))

	output.onblur = function() {
		parent.style.display = "none"
	}

	output.focus()
	output.select()

	try {
		if (document.execCommand('copy')) {
			$.notify("Exported save #"+placement+" to clipboard", "info")
			output.blur()
			output.onblur()
		}
	} catch(ex) {
		// well, we tried.
	}
}

function move(id,offset) {
	placement=0
	while (metaSave.saveOrder[placement]!=id) placement++
	if (offset<0) {
		if (placement<-offset) return
	} else if (placement>metaSave.saveOrder.length-offset-1) return
	var temp=metaSave.saveOrder[placement]
	if (temp==metaSave.current) savePlacement+=offset
	if (metaSave.saveOrder[placement+offset]==metaSave.current) savePlacement-=offset
	metaSave.saveOrder[placement]=metaSave.saveOrder[placement+offset]
	metaSave.saveOrder[placement+offset]=temp
	document.getElementById("saves").rows[placement].innerHTML=getSaveLayout(metaSave.saveOrder[placement])
	document.getElementById("saves").rows[placement+offset].innerHTML=getSaveLayout(id)
	changeSaveDesc(metaSave.saveOrder[placement], placement+1)
	changeSaveDesc(id, placement+offset+1)
	localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
}

function delete_save(saveId) {
	if (metaSave.saveOrder.length<2) {
		reset_game()
		return
	} else if (!confirm("Do you really want to erase this save? You will lose access if you do that!")) return
	var alreadyDeleted=false
	var newSaveOrder=[]
	for (orderId=0;orderId<metaSave.saveOrder.length;orderId++) {
		if (alreadyDeleted) changeSaveDesc(metaSave.saveOrder[orderId], orderId)
		if (metaSave.saveOrder[orderId]==saveId) {
			localStorage.removeItem(btoa(savePrefix+saveId))
			alreadyDeleted=true
			document.getElementById("saves").deleteRow(orderId)
			if (savePlacement>orderId+1) savePlacement--
			loadedSaves--
		} else newSaveOrder.push(metaSave.saveOrder[orderId])
	}
	metaSave.saveOrder=newSaveOrder
	if (metaSave.current==saveId) {
		change_save(metaSave.saveOrder[0])
		document.getElementById("loadmenu").style.display="block"
	} else localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
	$.notify("Save deleted", "info")
}

var ngModeMessages=[]
function new_game(id) {
	if (modes.arrows > 1 || modes.ngud > 3 || modes.nguep > 1 || modes.ngmu > 1 || modes.ngumu > 1) {
		alert("Coming soon...")
		return
	}
	save_game(true)
	clearInterval(gameLoopIntervalId)
	updateNewPlayer()
	infiniteCheck2 = false
	var oldId=metaSave.current
	metaSave.current=1
	while (metaSave.saveOrder.includes(metaSave.current)) metaSave.current++
	metaSave.saveOrder.push(metaSave.current)
	localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
	changeSaveDesc(oldId, savePlacement)
	latestRow=document.getElementById("saves").insertRow(loadedSaves)
	latestRow.innerHTML=getSaveLayout(metaSave.current)
	loadedSaves++
	changeSaveDesc(metaSave.current, loadedSaves)
	savePlacement=loadedSaves
	closeToolTip()
	onLoad()
	startInterval()
	
	$.notify("Save created", "info")
	localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
	closeToolTip()
	showDimTab('antimatterdimensions')
	showStatsTab('stats')
	showAchTab('normalachievements')
	showChallengesTab('normalchallenges')
	showInfTab('preinf')
	showEternityTab('timestudies', true)
	showQuantumTab('uquarks')
	showBranchTab('red')
	showGhostifyTab('neutrinos')
	showBLTab('bextab')
}

function transformSaveToDecimal() {

  player.infinityPoints = new Decimal(player.infinityPoints)
  document.getElementById("eternitybtn").style.display = ((player.infinityPoints.gte(Number.MAX_VALUE) && player.infDimensionsUnlocked[7]) || getEternitied() > 0) ? "inline-block" : "none"

  player.money = new Decimal(player.money)
  player.tickSpeedCost = new Decimal(player.tickSpeedCost)
  player.tickspeed = new Decimal(player.tickspeed)
  player.firstCost = new Decimal(player.firstCost)
  player.secondCost = new Decimal(player.secondCost)
  player.thirdCost = new Decimal(player.thirdCost)
  player.fourthCost = new Decimal(player.fourthCost)
  player.fifthCost = new Decimal(player.fifthCost)
  player.sixthCost = new Decimal(player.sixthCost)
  player.seventhCost = new Decimal(player.seventhCost)
  player.eightCost = new Decimal(player.eightCost)
  player.firstAmount = new Decimal(player.firstAmount)
  player.secondAmount = new Decimal(player.secondAmount)
  player.thirdAmount = new Decimal(player.thirdAmount)
  player.fourthAmount = new Decimal(player.fourthAmount)
  player.fifthAmount = new Decimal(player.fifthAmount)
  player.sixthAmount = new Decimal(player.sixthAmount)
  player.seventhAmount = new Decimal(player.seventhAmount)
  player.eightAmount = new Decimal(player.eightAmount)
  player.firstPow = new Decimal(player.firstPow)
  player.secondPow = new Decimal(player.secondPow)
  player.thirdPow = new Decimal(player.thirdPow)
  player.fourthPow = new Decimal(player.fourthPow)
  player.fifthPow = new Decimal(player.fifthPow)
  player.sixthPow = new Decimal(player.sixthPow)
  player.seventhPow = new Decimal(player.seventhPow)
  player.eightPow = new Decimal(player.eightPow)
  player.sacrificed = new Decimal(player.sacrificed)
  player.totalmoney = new Decimal(player.totalmoney)
  player.infinitied = nP(player.infinitied)
  player.infinitiedBank = nP(player.infinitiedBank)
  player.chall3Pow = new Decimal(player.chall3Pow)
  player.chall11Pow = new Decimal(player.chall11Pow)
  if (player.galacticSacrifice !== undefined) {
      player.galacticSacrifice.galaxyPoints = Decimal.round(player.galacticSacrifice.galaxyPoints)
      if (player.dimPowerIncreaseCost !== undefined) player.dimPowerIncreaseCost = new Decimal(player.dimPowerIncreaseCost)
  }
  if (player.pSac !== undefined) {
      player.pSac.px = new Decimal(player.pSac.px)
      for (var d=1;d<9;d++) player["infinityDimension"+d].costAM = new Decimal(player["infinityDimension"+d].costAM)
      if (player.pSac.dims !== undefined) {
          player.pSac.dims.power = new Decimal(player.pSac.dims.power)
          for (var d=1;d<9;d++) {
              player.pSac.dims[d].cost = new Decimal(player.pSac.dims[d].cost)
              player.pSac.dims[d].amount = new Decimal(player.pSac.dims[d].amount)
              player.pSac.dims[d].power = new Decimal(player.pSac.dims[d].power)
          }
      }
  }
  player.costMultipliers = [new Decimal(player.costMultipliers[0]), new Decimal(player.costMultipliers[1]), new Decimal(player.costMultipliers[2]), new Decimal(player.costMultipliers[3]), new Decimal(player.costMultipliers[4]), new Decimal(player.costMultipliers[5]), new Decimal(player.costMultipliers[6]), new Decimal(player.costMultipliers[7])]
  player.tickspeedMultiplier = new Decimal(player.tickspeedMultiplier)
  player.matter = new Decimal(player.matter)
 
  if (player.singularity != undefined) {
      player.singularity.sacrificed = new Decimal(player.singularity.sacrificed)
      player.singularity.singularityPower = new Decimal(player.singularity.singularityPower)
      player.singularity.darkMatter = new Decimal(player.singularity.darkMatter)
  }
  player.infinityPower = new Decimal(player.infinityPower)
  player.infinityDimension1.amount = new Decimal(player.infinityDimension1.amount)
  player.infinityDimension2.amount = new Decimal(player.infinityDimension2.amount)
  player.infinityDimension3.amount = new Decimal(player.infinityDimension3.amount)
  player.infinityDimension4.amount = new Decimal(player.infinityDimension4.amount)
  player.infinityDimension5.amount = new Decimal(player.infinityDimension5.amount)
  player.infinityDimension6.amount = new Decimal(player.infinityDimension6.amount)
  player.infinityDimension7.amount = new Decimal(player.infinityDimension7.amount)
  player.infinityDimension8.amount = new Decimal(player.infinityDimension8.amount)

  player.eternities = nP(player.eternities)
  if (player.eternitiesBank !== undefined) player.eternitiesBank = nP(player.eternitiesBank)
  player.timeDimension1.amount = new Decimal(player.timeDimension1.amount)
  player.timeDimension2.amount = new Decimal(player.timeDimension2.amount)
  player.timeDimension3.amount = new Decimal(player.timeDimension3.amount)
  player.timeDimension4.amount = new Decimal(player.timeDimension4.amount)
  player.timeDimension5.amount = new Decimal(player.timeDimension5.amount)
  player.timeDimension6.amount = new Decimal(player.timeDimension6.amount)
  player.timeDimension7.amount = new Decimal(player.timeDimension7.amount)
  player.timeDimension8.amount = new Decimal(player.timeDimension8.amount)
  player.timeDimension1.cost = new Decimal(player.timeDimension1.cost)
  player.timeDimension2.cost = new Decimal(player.timeDimension2.cost)
  player.timeDimension3.cost = new Decimal(player.timeDimension3.cost)
  player.timeDimension4.cost = new Decimal(player.timeDimension4.cost)
  player.timeDimension5.cost = new Decimal(player.timeDimension5.cost)
  player.timeDimension6.cost = new Decimal(player.timeDimension6.cost)
  player.timeDimension7.cost = new Decimal(player.timeDimension7.cost)
  player.timeDimension8.cost = new Decimal(player.timeDimension8.cost)
  player.timeDimension1.power = new Decimal(player.timeDimension1.power)
  player.timeDimension2.power = new Decimal(player.timeDimension2.power)
  player.timeDimension3.power = new Decimal(player.timeDimension3.power)
  player.timeDimension4.power = new Decimal(player.timeDimension4.power)
  player.timeDimension5.power = new Decimal(player.timeDimension5.power)
  player.timeDimension6.power = new Decimal(player.timeDimension6.power)
  player.timeDimension7.power = new Decimal(player.timeDimension7.power)
  player.timeDimension8.power = new Decimal(player.timeDimension8.power)

  if (player.exdilation !== undefined) {
      player.blackhole.power = new Decimal(player.blackhole.power)

      for (var d=1;d<9;d++) {
          var dim=player["blackholeDimension"+d]
          if (dim!==undefined) {
              dim.amount = new Decimal(dim.amount)
              dim.cost = new Decimal(dim.cost)
              dim.power = new Decimal(dim.power)
          }
      }

      player.exdilation.unspent = new Decimal(player.exdilation.unspent)
      player.exdilation.spent[1] = new Decimal(player.exdilation.spent[1])
      player.exdilation.spent[2] = new Decimal(player.exdilation.spent[2])
      player.exdilation.spent[3] = new Decimal(player.exdilation.spent[3])
      if (player.exdilation.spent[4] !== undefined) player.exdilation.spent[4] = new Decimal(player.exdilation.spent[4])
  }

  if (player.meta !== undefined) {
      player.meta.antimatter = new Decimal(player.meta.antimatter);
      player.meta.bestAntimatter = new Decimal(player.meta.bestAntimatter);
      for (let i = 1; i <= 8; i++) {
          player.meta[i].amount = new Decimal(player.meta[i].amount);
          player.meta[i].cost = new Decimal(player.meta[i].cost);
      }
      if (tmp.qu) {
          if (tmp.qu.last10) for (i=0;i<10;i++) tmp.qu.last10[i][1] = new Decimal(tmp.qu.last10[i][1])
          tmp.qu.quarks = new Decimal(tmp.qu.quarks);
          if (!player.masterystudies) tmp.qu.gluons = (tmp.qu.gluons ? tmp.qu.gluons.rg !== null : true) ? new Decimal(0) : new Decimal(tmp.qu.gluons);
          tmp.qu.neutronstar.quarks = new Decimal(tmp.qu.neutronstar.quarks);
          tmp.qu.neutronstar.metaAntimatter = new Decimal(tmp.qu.neutronstar.metaAntimatter);
          tmp.qu.neutronstar.dilatedTime = new Decimal(tmp.qu.neutronstar.dilatedTime);
      }
  }
  player.timeShards = new Decimal(player.timeShards)
  player.eternityPoints = new Decimal(player.eternityPoints)
  player.tickThreshold = new Decimal(player.tickThreshold)
  player.postC3Reward = new Decimal(player.postC3Reward)
  player.postC8Mult = new Decimal(player.postC8Mult)

  for (var i=0; i<10; i++) {
      player.lastTenRuns[i][0] = parseFloat(player.lastTenRuns[i][0])
      player.lastTenRuns[i][1] = new Decimal(player.lastTenRuns[i][1])
      player.lastTenEternities[i][1] = new Decimal(player.lastTenEternities[i][1])
  }
  player.replicanti.chanceCost = new Decimal(player.replicanti.chanceCost)
  player.replicanti.intervalCost = new Decimal(player.replicanti.intervalCost)
  player.replicanti.galCost = new Decimal(player.replicanti.galCost)

  for (var i=1; i<=8; i++) {
      player["infinityDimension"+i].cost = new Decimal(player["infinityDimension"+i].cost)
      player["infinityDimension"+i].power = new Decimal(player["infinityDimension"+i].power)
  }

  player.infMultCost = new Decimal(player.infMultCost)
  player.infMult = new Decimal(player.infMult)
  player.timestudy.amcost = new Decimal(player.timestudy.amcost)
  player.timestudy.ipcost = new Decimal(player.timestudy.ipcost)
  player.timestudy.epcost = new Decimal(player.timestudy.epcost)

  player.autoIP = new Decimal(player.autoIP)

  if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autobuyers[11].priority !== "undefined" && player.autobuyers[11].priority.toString().toLowerCase()!="max") player.autobuyers[11].priority = new Decimal(player.autobuyers[11].priority)

  player.epmultCost = new Decimal(player.epmultCost)
  player.epmult = new Decimal(player.epmult)
  player.eternityBuyer.limit = new Decimal(player.eternityBuyer.limit)
  player.eternityChallGoal = new Decimal(player.eternityChallGoal)
  player.replicanti.amount = new Decimal(player.replicanti.amount)
  if (player.boughtDims) {
      player.replicanti.limit = new Decimal(player.replicanti.limit)
      player.replicanti.newLimit = new Decimal(player.replicanti.newLimit)
      if (player.darkMatter) player.darkMatter = new Decimal(player.darkMatter)
  }

  player.dilation.tachyonParticles = new Decimal(player.dilation.tachyonParticles)
  player.dilation.dilatedTime = new Decimal(player.dilation.dilatedTime)
  player.dilation.totalTachyonParticles = new Decimal(player.dilation.totalTachyonParticles)
  player.dilation.nextThreshold = new Decimal(player.dilation.nextThreshold)

  if (player.masterystudies) {
      player.dbPower = new Decimal(player.dbPower)
      if (player.meta.bestOverQuantums != undefined) player.meta.bestOverQuantums = new Decimal(player.meta.bestOverQuantums)
      if (tmp.qu ? tmp.qu.usedQuarks : false) {
          tmp.qu.usedQuarks.r = new Decimal(tmp.qu.usedQuarks.r)
          tmp.qu.usedQuarks.g = new Decimal(tmp.qu.usedQuarks.g)
          tmp.qu.usedQuarks.b = new Decimal(tmp.qu.usedQuarks.b)
          tmp.qu.colorPowers.r = new Decimal(tmp.qu.colorPowers.r)
          tmp.qu.colorPowers.g = new Decimal(tmp.qu.colorPowers.g)
          tmp.qu.colorPowers.b = new Decimal(tmp.qu.colorPowers.b)
      }
      if (tmp.qu ? player.aarexModifications.newGame3PlusVersion > 1.5 : false) {
          tmp.qu.gluons.rg = new Decimal(tmp.qu.gluons.rg)
          tmp.qu.gluons.gb = new Decimal(tmp.qu.gluons.gb)
          tmp.qu.gluons.br = new Decimal(tmp.qu.gluons.br)
      }
      if (tmp.qu ? tmp.qu.autobuyer : false) tmp.qu.autobuyer.limit = new Decimal(tmp.qu.autobuyer.limit)
      if (tmp.qu ? tmp.qu.electrons : false) if (typeof(tmp.qu.electrons.amount)=="string") tmp.qu.electrons.amount = Math.round(parseFloat(tmp.qu.electrons.amount)*4)/4
      if (player.dilation.bestTP == undefined) player.dilation.bestTP = player.achievements.includes("ng3p18") || player.achievements.includes("ng3p37") ? player.dilation.tachyonParticles : 0
      player.dilation.bestTP = new Decimal(player.dilation.bestTP)
      if (tmp.qu ? tmp.qu.replicants : false) {
          tmp.qu.replicants.amount = new Decimal(tmp.qu.replicants.amount)
          tmp.qu.replicants.requirement = new Decimal(tmp.qu.replicants.requirement)
          tmp.qu.replicants.quarks = new Decimal(tmp.qu.replicants.quarks)
          tmp.qu.replicants.quantumFoodCost = new Decimal(tmp.qu.replicants.quantumFoodCost)
          tmp.qu.replicants.limitCost = new Decimal(tmp.qu.replicants.limitCost)
          tmp.qu.replicants.eggonProgress = new Decimal(tmp.qu.replicants.eggonProgress)
          tmp.qu.replicants.eggons = new Decimal(tmp.qu.replicants.eggons)
          tmp.qu.replicants.hatchSpeedCost = new Decimal(tmp.qu.replicants.hatchSpeedCost)
          tmp.qu.replicants.babyProgress = new Decimal(tmp.qu.replicants.babyProgress)
          tmp.qu.replicants.babies = new Decimal(tmp.qu.replicants.babies)
          tmp.qu.replicants.ageProgress = new Decimal(tmp.qu.replicants.ageProgress)
      }
      if (tmp.qu ? (tmp.qu.emperorDimensions ? tmp.qu.emperorDimensions[1] : false) : false) for (d=1;d<9;d++) {
          tmp.qu.emperorDimensions[d].workers = Decimal.round(tmp.qu.emperorDimensions[d].workers)
          tmp.qu.emperorDimensions[d].progress = Decimal.round(tmp.qu.emperorDimensions[d].progress)
      }
      if (tmp.qu ? tmp.qu.nanofield : false) {
          tmp.qu.nanofield.charge = new Decimal(tmp.qu.nanofield.charge)
          tmp.qu.nanofield.energy = new Decimal(tmp.qu.nanofield.energy)
          tmp.qu.nanofield.antienergy = new Decimal(tmp.qu.nanofield.antienergy)
          tmp.qu.nanofield.powerThreshold = new Decimal(tmp.qu.nanofield.powerThreshold)
      }
      if (tmp.qu ? tmp.qu.tod : false) {
          tmp.qu.tod.r.quarks = new Decimal(tmp.qu.tod.r.quarks)
          tmp.qu.tod.r.spin = new Decimal(tmp.qu.tod.r.spin)
          tmp.qu.tod.g.quarks = new Decimal(tmp.qu.tod.g.quarks)
          tmp.qu.tod.g.spin = new Decimal(tmp.qu.tod.g.spin)
          tmp.qu.tod.b.quarks = new Decimal(tmp.qu.tod.b.quarks)
          tmp.qu.tod.b.spin = new Decimal(tmp.qu.tod.b.spin)
      }
  }
  if (player.ghostify) {
      player.dilation.bestTPOverGhostifies = Decimal.max(player.dilation.bestTPOverGhostifies, player.dilation.bestTP)
      player.meta.bestOverGhostifies = Decimal.max(player.meta.bestOverGhostifies, player.meta.bestOverQuantums)
      tmp.qu.pairedChallenges.pc68best = new Decimal(tmp.qu.pairedChallenges.pc68best)
      tmp.qu.bigRip.bestThisRun = new Decimal(tmp.qu.bigRip.bestThisRun)
      tmp.qu.bigRip.totalAntimatter = new Decimal(tmp.qu.bigRip.totalAntimatter)
      tmp.qu.bigRip.spaceShards = new Decimal(tmp.qu.bigRip.spaceShards)
      tmp.qu.breakEternity.eternalMatter = new Decimal(tmp.qu.breakEternity.eternalMatter)
      player.ghostify.times = nP(player.ghostify.times)
      player.ghostify.ghostParticles = new Decimal(player.ghostify.ghostParticles)
      for (var r=0;r<10;r++) player.ghostify.last10[r][1] = new Decimal(player.ghostify.last10[r][1])
      player.ghostify.neutrinos.electron = new Decimal(player.ghostify.neutrinos.electron)
      player.ghostify.neutrinos.mu = new Decimal(player.ghostify.neutrinos.mu)
      player.ghostify.neutrinos.tau = new Decimal(player.ghostify.neutrinos.tau)
      if (player.ghostify.automatorGhosts!==undefined) player.ghostify.automatorGhosts[15].a=new Decimal(player.ghostify.automatorGhosts[15].a)
      if (player.ghostify.ghostlyPhotons) {
          player.ghostify.ghostlyPhotons.amount=new Decimal(player.ghostify.ghostlyPhotons.amount)
          player.ghostify.ghostlyPhotons.ghostlyRays=new Decimal(player.ghostify.ghostlyPhotons.ghostlyRays)
          player.ghostify.ghostlyPhotons.darkMatter=new Decimal(player.ghostify.ghostlyPhotons.darkMatter)
      }
      if (tmp.bl && player.ghostify.wzb) {
          tmp.bl.ticks=new Decimal(tmp.bl.ticks)
          tmp.bl.am=new Decimal(tmp.bl.am)
          tmp.bl.extractProgress=new Decimal(tmp.bl.extractProgress)
          tmp.bl.autoExtract=new Decimal(tmp.bl.autoExtract)
          for (var t=0;t<br.names.length-1;t++) tmp.bl.glyphs[t]=new Decimal(tmp.bl.glyphs[t]||0)
          tmp.bl.battery=new Decimal(tmp.bl.battery)
          for (var g2=2;g2<br.names.length;g2++) for (var g1=1;g1<g2;g1++) if (tmp.bl.enchants[g1*10+g2]!==undefined) tmp.bl.enchants[g1*10+g2]=new Decimal(tmp.bl.enchants[g1*10+g2])

          player.ghostify.wzb.dP=new Decimal(player.ghostify.wzb.dP)
          player.ghostify.wzb.wQkProgress=new Decimal(player.ghostify.wzb.wQkProgress)
          player.ghostify.wzb.zNeProgress=new Decimal(player.ghostify.wzb.zNeProgress)
          player.ghostify.wzb.zNeReq=new Decimal(player.ghostify.wzb.zNeReq)
          player.ghostify.wzb.wpb=new Decimal(player.ghostify.wzb.wpb)
          player.ghostify.wzb.wnb=new Decimal(player.ghostify.wzb.wnb)
          player.ghostify.wzb.zb=new Decimal(player.ghostify.wzb.zb)
      }
  }
}


function loadAutoBuyerSettings() {
  for (var i=0; i<9; i++) {
      document.getElementById("priority" + (i+1)).selectedIndex = player.autobuyers[i].priority-1
      if (i == 8 && player.autobuyers[i].target == 10) document.getElementById("toggleBtnTickSpeed").textContent = "Buys max"
      else if (i == 8 && player.autobuyers[i].target !== 10) document.getElementById("toggleBtnTickSpeed").textContent = "Buys singles"
      else if (player.autobuyers[i].target > 10) document.getElementById("toggleBtn" + (i+1)).textContent = "Buys until 10"
      else document.getElementById("toggleBtn" + (i+1)).textContent = "Buys singles"

  }
  document.getElementById("priority10").value = player.autobuyers[9].priority
  document.getElementById("priority11").value = player.autobuyers[10].priority
  document.getElementById("priority12").value = player.autoCrunchMode == "amount" ? formatValue("Scientific", player.autobuyers[11].priority, 2, 0) : player.autobuyers[11].priority
  document.getElementById("overGalaxies").value = player.overXGalaxies
  document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
  document.getElementById("prioritySac").value = player.autoSacrifice.priority
  document.getElementById("bulkgalaxy").value = player.autobuyers[10].bulk
  document.getElementById("priority13").value = formatValue("Scientific", new Decimal(player.eternityBuyer.limit), 2, 0)
  if (player.achievements.includes("ng3p52") && player.eternityBuyer.presets !== undefined) {
      document.getElementById("autoEterIfAD").textContent = "Auto-eternity only if able to auto-dilate: O" + (player.eternityBuyer.ifAD ? "N" : "FF")
      document.getElementById("autoEterValue").value = formatValue("Scientific", new Decimal(player.eternityBuyer.limit), 2, 0)
      document.getElementById("autodilatemode").textContent = "Mode: " + (player.eternityBuyer.dilMode == "upgrades" ? "Upgrades" : "Amount of eternities")
      document.getElementById("slowstop").textContent = "Stop auto-dilate if a little bit of TP is gained: O" + (player.eternityBuyer.slowStop ? "N" : "FF")
      document.getElementById("toggleAP").textContent = player.eternityBuyer.presets.on ? "Disable" : "Enable"
      document.getElementById("eternitiesLeft").textContent = getFullExpansion(player.eternityBuyer.presets.left)
      apLoaded = false
      clearInterval(apInterval)
      if (document.getElementById("eternitystore").style.display === "block" && document.getElementById("autoEternity").style.display === "block") loadAP()
  }
  if (player.eternityBuyer.dilationPerAmount !== undefined) {
      document.getElementById('prioritydil').value=player.eternityBuyer.dilationPerAmount
      if (player.achievements.includes("ng3p52")) document.getElementById("autoDilValue").value=player.eternityBuyer.dilationPerAmount
  }
  if (player.autobuyers[12] !== undefined) document.getElementById("priority14").value = formatValue("Scientific", new Decimal(player.autobuyers[12].priority), 2, 0)
  if (player.autobuyers[13] !== undefined) {
      document.getElementById("priority15").value = player.autobuyers[13].priority
      document.getElementById("overGalaxiesTickspeedBoost").value = player.overXGalaxiesTickspeedBoost
      document.getElementById("bulkTickBoost").value = player.autobuyers[13].bulk
  }
  if (player.autobuyers[14] !== undefined) {
      document.getElementById("priority16").value = player.autobuyers[14].priority
      document.getElementById("overGalaxiesTDBoost").value = player.autobuyers[14].overXGals
      document.getElementById("bulkTickBoost").value = player.autobuyers[14].bulk
  }
  if (player.boughtDims) {
      document.getElementById("maxReplicantiCrunchSwitch").checked = player.autobuyers[11].requireMaxReplicanti;
      document.getElementById("requireIPPeak").checked = player.autobuyers[11].requireIPPeak;
  }
  if (player.masterystudies) {
      document.getElementById("prioritydil").value = player.eternityBuyer.dilationPerAmount
      if (tmp.qu) if (tmp.qu.autobuyer) {
          if (isNaN(break_infinity_js ? tmp.qu.autobuyer.limit : tmp.qu.autobuyer.limit.l)) tmp.qu.autobuyer.limit = new Decimal(1)
          document.getElementById("priorityquantum").value = tmp.qu.autobuyer.mode == "amount" || tmp.qu.autobuyer.mode == "relative" ? formatValue("Scientific", tmp.qu.autobuyer.limit, 2, 0) : tmp.qu.autobuyer.limit
      }
  }
}

function set_save(id, value) {
	localStorage.setItem(btoa(savePrefix+id), btoa(JSON.stringify(value, function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
}

function get_save(id) {
    try {
        var dimensionSave = localStorage.getItem(btoa(savePrefix+id))
        if (dimensionSave !== null) dimensionSave = JSON.parse(atob(dimensionSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
        return dimensionSave
    } catch(e) { }
}

function initiateMetaSave() {
	metaSave = localStorage.getItem(metaSaveId)
	if (metaSave == null) metaSave = {presetsOrder: [], version: 2.02}
	else metaSave = JSON.parse(atob(metaSave))
	if (metaSave.current == undefined) {
		metaSave.current = 1
		metaSave.saveOrder = [1]
	}
	if (!metaSave.current) {
		metaSave.current = 1
		metaSave.alert = true
	}
}

function migrateOldSaves() {
	if (metaSave.newGameMinus!=undefined) {
		metaSave.saveOrder = []
		var ngSave = localStorage.getItem('dimensionSave_aarexModifications')
		if (ngSave != null) {
			ngSave = JSON.parse(atob(ngSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
			if (ngSave.saves != null) {
				for (id=0;id<3;id++) {
					if (ngSave.saves[id] != null) {
						metaSave.saveOrder.push(1+id)
						localStorage.setItem(btoa('dsAM_'+(1+id)), btoa(JSON.stringify(ngSave.saves[id], function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
					}
				}
				if (!metaSave.newGameMinus) metaSave.current=1+ngSave.currentSave
			} else {
				if (!metaSave.newGameMinus) metaSave.current=1
				metaSave.saveOrder.push(1)
				localStorage.setItem(btoa('dsAM_1'), btoa(JSON.stringify(ngSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
			}
		}
		localStorage.removeItem('dimensionSave_aarexModifications')
		var ngmSave = localStorage.getItem('dimensionSave_NGM')
		if (ngmSave != null) {
			ngmSave = JSON.parse(atob(ngmSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
			if (ngmSave.saves != null) {
				for (id=0;id<3;id++) {
					if (ngmSave.saves[id] != null) {
						metaSave.saveOrder.push(4+id)
						localStorage.setItem(btoa('dsAM_'+(4+id)), btoa(JSON.stringify(ngmSave.saves[id], function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
					}
				}
				if (metaSave.newGameMinus) metaSave.current=4+ngmSave.currentSave
			} else {
				if (metaSave.newGameMinus) metaSave.current=4
				metaSave.saveOrder.push(4)
				localStorage.setItem(btoa('dsAM_4'), btoa(JSON.stringify(ngmSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
			}
		}
		localStorage.removeItem('dimensionSave_NGM')
		delete metaSave.newGameMinus
	}
	if (metaSave.version == undefined) {
		metaSave.presetsOrder=[]
		for (id=1;id<4;id++) {
			var studyTreePreset=localStorage.getItem("studyTree"+id)
			if (studyTreePreset !== null) {
				metaSave.presetsOrder.push(id)
				localStorage.setItem(btoa("dsAM_ST_"+id),btoa(JSON.stringify({preset:studyTreePreset})))
				localStorage.removeItem("studyTree"+id)
			}
		}
	}
	if (metaSave.version < 2.01) metaSave.presetsOrder_ers=[]
	metaSave.version=2.02
}
