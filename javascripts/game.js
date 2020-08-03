//test
var gameLoopIntervalId;
var Marathon = 0;
var Marathon2 = 0;
var auto = false;
var autoS = true;
var shiftDown = false;
var controlDown = false;
var justImported = false;
var saved = 0;
var painTimer = 0;
var keySequence = 0;
var keySequence2 = 0;
var failureCount = 0;
var implosionCheck = 0;
var TIER_NAMES = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
var DISPLAY_NAMES = [ null, "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth" ];
var break_infinity_js
var forceHardReset = false;
var player
var metaSave = null
var modes = {}

function setupHTMLAndData() {
	var pu=document.getElementById("pUpgs")
	for (r=1;r<=puSizes.y;r++) {
		row=pu.insertRow(r-1)
		for (c=1;c<=puSizes.x;c++) {
			var col=row.insertCell(c-1)
			var id=(r*10+c)
			col.innerHTML="<button id='pu"+id+"' class='infinistorebtn1' onclick='buyPU("+id+","+(r<2)+")'>"+(typeof(puDescs[id])=="function"?"<span id='pud"+id+"'></span>":puDescs[id]||"???")+(puMults[id]?"<br>Currently: <span id='pue"+id+"'></span>":"")+"<br><span id='puc"+id+"'></span></button>"
		}
	}
	var iut=document.getElementById("preinfupgrades")
	for (r=1;r<5;r++) {
		row=iut.insertRow(r-1)
		for (c=1;c<5;c++) {
			var col=row.insertCell(c-1)
			col.innerHTML="<button id='infi"+(c*10+r)+"' class='infinistorebtn"+c+"'></button>"
		}
	}
	document.getElementById("infi14").innerHTML="Decrease the number of Dimensions needed for Dimensional Boosts and galaxies by 9<br>Cost: 1 IP"
	document.getElementById("infi24").innerHTML="Antimatter Galaxies are twice as effective<br>Cost: 2 IP"
	document.getElementById("infi11").onclick = function () {
		buyInfinityUpgrade("timeMult",1);
	}
	document.getElementById("infi21").onclick = function () {
		buyInfinityUpgrade("dimMult",1);
	}
	document.getElementById("infi12").onclick = function () {
		if (player.infinityUpgrades.includes("timeMult")) buyInfinityUpgrade("18Mult",1);
	}
	document.getElementById("infi22").onclick = function () {
		if (player.infinityUpgrades.includes("dimMult")) buyInfinityUpgrade("27Mult",1);
	}
	document.getElementById("infi13").onclick = function () {
		if (player.infinityUpgrades.includes("18Mult")) buyInfinityUpgrade("36Mult",1);
	}
	document.getElementById("infi23").onclick = function () {
		if (player.infinityUpgrades.includes("27Mult")) buyInfinityUpgrade("45Mult",1);
	}
	document.getElementById("infi14").onclick = function () {
		if (player.infinityUpgrades.includes("36Mult")) buyInfinityUpgrade("resetBoost",1);
	}
	document.getElementById("infi24").onclick = function () {
		if (player.infinityUpgrades.includes("45Mult")) buyInfinityUpgrade("galaxyBoost",2);
	}
	document.getElementById("infi31").onclick = function() {
		buyInfinityUpgrade("timeMult2",3);
	}
	document.getElementById("infi32").onclick = function() {
		if (player.infinityUpgrades.includes("timeMult2")) buyInfinityUpgrade("unspentBonus",5);
	}
	document.getElementById("infi33").onclick = function() {
		if (player.infinityUpgrades.includes("unspentBonus")) buyInfinityUpgrade("resetMult",7);
	}
	document.getElementById("infi34").onclick = function() {
		if (player.infinityUpgrades.includes("resetMult")) buyInfinityUpgrade("passiveGen",10);
	}
	document.getElementById("infi41").onclick = function() {
		buyInfinityUpgrade("skipReset1",20);
	}
	document.getElementById("infi42").onclick = function() {
		if (player.infinityUpgrades.includes("skipReset1")) buyInfinityUpgrade("skipReset2", 40)
	}
	document.getElementById("infi43").onclick = function() {
		if (player.infinityUpgrades.includes("skipReset2")) buyInfinityUpgrade("skipReset3", 80)
	}
	document.getElementById("infi44").onclick = function() {
		if (player.infinityUpgrades.includes("skipReset3")) buyInfinityUpgrade("skipResetGalaxy", 500)
	}
	setupDilationUpgradeList()
	setupMasteryStudiesHTML()
	var pcct = document.getElementById("pccompletionstable")
	var row = pcct.insertRow(0)
	for (c=0;c<9;c++) {
		var col = row.insertCell(c)
		if (c>0) col.textContent = "#" + c
	}
	for (r=1;r<9;r++) {
		row = pcct.insertRow(r)
		for (c=0;c<9;c++) {
			var col = row.insertCell(c)
			if (c<1) col.textContent = "#" + r
			else if (c==r) {
				col.id = "qcC" + r
			} else col.id = "pc" + r + c
		}
	}
	var ndsDiv = document.getElementById("parent")
	var pdsDiv = document.getElementById("pdTable")
	var edsDiv = document.getElementById("empDimTable")
	for (d=1;d<9;d++) {
		var row=ndsDiv.insertRow(d-1)
		row.id=d+"Row"
		row.style["font-size"]="15px"
		var html='<td class="rel" id="D'+d+'" align="right" width="32%"> </td>'
		html+='<td id="A'+d+'"></td>'
		html+='<td align="right" width="10%"><button id="B'+d+'" style="color:black; height: 25px; font-size: 10px; width: 135px" class="storebtn" onclick="buyOneDimension('+d+')"></button></td>'
		html+='<td align="right" width="10%"><button id="M'+d+'" style="color:black; width:210px; height: 25px; font-size: 10px" class="storebtn" onclick="buyManyDimension('+d+')"></button></td>'
		row.innerHTML=html
		
		var row=pdsDiv.insertRow(d-1)
		row.id="pR"+d
		row.style["font-size"]="16px"
		var html='<td id="pD'+d+'" width="41%">'+DISPLAY_NAMES[d]+' Paradox Dimension x1</td>'
		html+='<td id="pA'+d+'">0 (0)</td>'
		html+='<td align="right" width="10%"><button id="pB'+d+'" style="color:black; width:195px; height:30px" class="storebtn" align="right" onclick="buyPD('+d+')">Cost: ??? Px</button></td></tr>'
		row.innerHTML=html
		
		var row=edsDiv.insertRow(d-1)
		row.id="empRow"+d
		row.style["font-size"]="15px"
		var html='<td id="empD'+d+'" width="41%">'+DISPLAY_NAMES[d]+' Emperor Dimension x1</td>'
		html+='<td id="empAmount'+d+'"></td>'
		html+='<td><span class="empQuarks" id="empQuarks'+d+'">0</span> preons/s</td>'
		html+='<td align="right" width="2.5%"><button id="empFeedMax'+d+'" style="color:black; width:70px; font-size:10px" class="storebtn" align="right" onclick="feedReplicant('+d+', true)">Max</button></td>'
		html+='<td align="right" width="7.5%"><button id="empFeed'+d+'" style="color:black; width:195px; height:25px; font-size:10px" class="storebtn" align="right" onclick="feedReplicant('+d+')">Feed (0%)</button></td>'
		row.innerHTML=html
	}
	for (var c=0;c<3;c++) {
		var color=(["red","green","blue"])[c]
		var shorthand=(["r","g","b"])[c]
		var branchUpgrades=["Gain <span id='"+color+"UpgPow1'></span>x "+color+" quark spins, but "+color+" quarks decay <span id='"+color+"UpgSpeed1'></span>x faster.","The gain of "+color+" <span id='"+color+"UpgName2'></span> quarks is multiplied by x and then raised to the power of x.",(["Red","Green","Blue"])[c]+" <span id='"+color+"UpgName3'></span> quarks decay 4x slower."]

		var html='You have <span class="'+color+'" id="'+color+'QuarksToD" style="font-size: 35px">0</span> '+color+' quarks.<br>'
		html+='<button class="storebtn" id="'+color+'UnstableGain" style="width: 240px; height: 80px" onclick="unstableQuarks(\''+shorthand+'\')"></button><br>'
		html+='You have <span class="'+color+'" id="'+color+'QuarkSpin" style="font-size: 35px">0.0</span> '+color+' quark spin.'
		html+='<span class="'+color+'" id="'+color+'QuarkSpinProduction" style="font-size: 25px">+0/s</span><br>'
		html+="You have <span class='"+color+"' id='"+color+"UnstableQuarks' style='font-size: 35px'>0</span> "+color+" <span id='"+shorthand+"UQName'></span> quarks.<br>"
		html+="<span id='"+color+"QuarksDecayRate'></span>.<br>"
		html+="They will last <span id='"+color+"QuarksDecayTime'></span>."
		document.getElementById("todRow").insertCell(c).innerHTML=html
		document.getElementById("todRow").cells[c].className=shorthand+"qC"
		
		html="<table class='table' align='center' style='margin: auto'><tr>"
		for (var u=1;u<4;u++) html+="<td style='vertical-align: 0'><button class='gluonupgrade unavailablebtn' id='"+color+"upg"+u+"' onclick='buyBranchUpg(\""+shorthand+"\", "+u+")'"+(u<3?" style='font-size:10px'":"")+">"+branchUpgrades[u-1]+"<br>Currently: <span id='"+color+"upg"+u+"current'>1</span>x<br>Cost: <span id='"+color+"upg"+u+"cost'>?</span> "+color+" quark spin</button>"+(u==2?"<br><button class='storebtn' style='width: 190px' onclick='maxBranchUpg(\""+shorthand+"\")'>Max all upgrades</button><br><button class='storebtn' style='width: 190px; font-size:10px' onclick='maxBranchUpg(\""+shorthand+"\", true)'>Max 2nd and 3rd upgrades</button>":"")+"</td>"
		html+="</tr></tr><td></td><td><button class='gluonupgrade unavailablebtn' id='"+shorthand+"RadioactiveDecay' style='font-size:10px' onclick='radioactiveDecay(\""+shorthand+"\")'>Reset to make 1st upgrades stronger, but nerf this branch.<br><span id='"+shorthand+"RDReq'></span><br>Radioactive Decays: <span id='"+shorthand+"RDLvl'></span></button></td><td></td>"
		html+="</tr></table>"
		document.getElementById(color+"Branch").innerHTML=html
	}
	//Nanofield
	var nfRewards=document.getElementById("nfRewards")
	var row=0
	for (var r=1;r<=8;r+=2) {
		nfRewards.insertRow(row).innerHTML = 
			"<td id='nfRewardHeader"+r+"' class='milestoneText'></td>" +
			"<td id='nfRewardHeader"+(r+1)+"' class='milestoneText'></td>"
		row++
		nfRewards.insertRow(row).innerHTML = 
			"<td id='nfRewardTier"+r+"' class='milestoneTextSmall'></td>" +
			"<td id='nfRewardTier"+(r+1)+"' class='milestoneTextSmall'></td>"
		row++
		nfRewards.insertRow(row).innerHTML = 
			"<td><button class='nfRewardlocked' id='nfReward"+r+"'></button></td>" +
			"<td><button class='nfRewardlocked' id='nfReward"+(r+1)+"'></button></td>"
		row++
	}
	document.getElementById("nfReward7").style["font-size"]="10px"
	document.getElementById("nfReward8").style["font-size"]="10px"
	//Quantum Challenge modifiers
	var modDiv=""
	for (var m=0;m<qcm.modifiers.length;m++) {
		var id=qcm.modifiers[m]
		modDiv+=' <button id="qcm_'+id+'" onclick="toggleQCModifier(\''+id+'\')">'+(qcm.names[id]||"???")+'</button>'
	}
	document.getElementById("modifiers").innerHTML=modDiv
	var modDiv='<button class="storebtn" id="qcms_normal" onclick="showQCModifierStats(\'\')">Normal</button>'
	for (var m=0;m<qcm.modifiers.length;m++) {
		var id=qcm.modifiers[m]
		modDiv+=' <button class="storebtn" id="qcms_'+id+'" onclick="showQCModifierStats(\''+id+'\')">'+(qcm.names[id]||"???")+'</button>'
	}
	document.getElementById("modifiersStats").innerHTML=modDiv
	//Brave Milestones
	for (var m=1;m<17;m++) document.getElementById("braveMilestone"+m).textContent=getFullExpansion(tmp.bm[m-1])+"x quantumed"
	//Bosonic Extractor
	var ben=document.getElementById("enchants")
	for (var g2=2;g2<=br.limit;g2++) {
		var row=ben.insertRow(g2-2)
		row.id="bEnRow"+(g2-1)
		for (var g1=1;g1<g2;g1++) {
			var col=row.insertCell(g1-1)
			var id=(g1*10+g2)
			col.innerHTML="<button id='bEn"+id+"' class='gluonupgrade unavailablebtn' style='font-size: 9px' onclick='takeEnchantAction("+id+")'>"+(bEn.descs[id]||"???")+"<br>"+
			"Currently: <span id='bEnEffect"+id+"'>???</span><br>"+
			"<span id='bEnLvl"+id+"'></span><br>"+
			"<span id='bEnOn"+id+"'></span><br>"+
			"Cost: <span id='bEnG1Cost"+id+"'></span> <div class='bRune' type='"+g1+"'></div> & <span id='bEnG2Cost"+id+"'></span> <div class='bRune' type='"+g2+"'></div></button><br>"
		}
	}
	var toeDiv=""
	for (var g=1;g<=br.limit;g++) toeDiv+=' <button id="typeToExtract'+g+'" class="storebtn" onclick="changeTypeToExtract('+g+')" style="width: 25px; font-size: 12px"><div class="bRune" type="'+g+'"></div></button>'
	document.getElementById("typeToExtract").innerHTML=toeDiv
	//Bosonic Upgrades
	setupBosonicUpgReqData()
	var buTable=document.getElementById("bUpgs")
	for (r=1;r<=bu.rows;r++) {
		var row=buTable.insertRow(r-1)
		row.id="bUpgRow"+r
		for (c=1;c<6;c++) {
			var col=row.insertCell(c-1)
			var id=(r*10+c)
			col.innerHTML="<button id='bUpg"+id+"' class='gluonupgrade unavailablebtn' style='font-size: 9px' onclick='buyBosonicUpgrade("+id+")'>"+(bu.descs[id]||"???")+"<br>"+
			(bu.effects[id]!==undefined?"Currently: <span id='bUpgEffect"+id+"'>0</span><br>":"")+
			"Cost: <span id='bUpgCost"+id+"'></span> Bosonic Antimatter<br>"+
			"Requires: <span id='bUpgG1Req"+id+"'></span> <div class='bRune' type='"+bu.reqData[id][2]+"'></div> & <span id='bUpgG2Req"+id+"'></span> <div class='bRune' type='"+bu.reqData[id][4]+"'></div></button>"
		}
	}
	//Bosonic Runes
	var brTable=document.getElementById("bRunes")
	for (var g=1;g<=br.limit;g++) {
		var width=100/br.limit
		var col=brTable.rows[0].insertCell(g-1)
		col.id="bRuneCol"+g
		col.innerHTML='<div class="bRune" type="'+g+'"></div>: <span id="bRune'+g+'"></span>'
		col.style="min-width:"+width+"%;width:"+width+"%;max-width:"+width+"%"
	}
	var glyphs=document.getElementsByClassName("bRune")
	for (var g=0;g<glyphs.length;g++) {
		var glyph=glyphs[g]
		var type=glyph.getAttribute("type")
		if (type>0&&type<=br.limit) {
			glyph.className="bRune "+br.names[type]
			glyph.setAttribute("ach-tooltip",br.names[type]+" Bosonic Rune")
		}
	}
}

function updateNewPlayer(reseted) {
	if (reseted) {
		var modesChosen = {
			ngm: player.aarexModifications.newGameMinusVersion !== undefined,
			ngp: player.aarexModifications.ngp4V !== undefined ? 2 : player.aarexModifications.newGamePlusVersion !== undefined ? 1 : 0,
			arrows: player.aarexModifications.newGameExpVersion !== undefined,
			ngpp: player.meta == undefined ? false : player.aarexModifications.ngp3lV ? 3 : tmp.ngp3 ? 2 : 1,
			ngmm: player.aarexModifications.ngmX ? player.aarexModifications.ngmX - 1 : player.galacticSacrifice !== undefined ? 1 : 0,
			rs: player.infinityUpgradesRespecced != undefined ? 2 : player.boughtDims !== undefined,
			ngud: player.aarexModifications.nguspV !== undefined ? 3 : player.aarexModifications.ngudpV !== undefined ? 2 : player.exdilation !== undefined ? 1 : 0,
			nguep: player.aarexModifications.nguepV !== undefined,
			ngmu: player.aarexModifications.newGameMult === 1,
			ngumu: player.aarexModifications.ngumuV !== undefined,
			ngex: player.aarexModifications.ngexV !== undefined,
			aau: player.aarexModifications.aau !== undefined
		}
	} 
	else var modesChosen = modes
	player = {
		money: new Decimal(modesChosen.ngmm>2?200:modesChosen.ngp>1?20:10),
		tickSpeedCost: new Decimal(1000),
		tickspeed: new Decimal(modesChosen.ngp>1?500:1000),
		firstCost: new Decimal(10),
		secondCost: new Decimal(100),
		thirdCost: new Decimal(10000),
		fourthCost: new Decimal(1000000),
		fifthCost: new Decimal(1e9),
		sixthCost: new Decimal(1e13),
		seventhCost: new Decimal(1e18),
		eightCost: new Decimal(1e24),
		firstAmount: new Decimal(0),
		secondAmount: new Decimal(0),
		thirdAmount: new Decimal(0),
		fourthAmount: new Decimal(0),
		firstBought: modesChosen.ngm ? 5 : 0,
		secondBought: 0,
		thirdBought: 0,
		fourthBought: 0,
		fifthAmount: new Decimal(0),
		sixthAmount: new Decimal(0),
		seventhAmount: new Decimal(0),
		eightAmount: new Decimal(0),
		fifthBought: 0,
		sixthBought: 0,
		seventhBought: 0,
		eightBought: 0,
		firstPow: new Decimal(modesChosen.ngm ? 0.1 : 1),
		secondPow: new Decimal(1),
		thirdPow: new Decimal(1),
		fourthPow: new Decimal(1),
		fifthPow: new Decimal(1),
		sixthPow: new Decimal(1),
		seventhPow: new Decimal(1),
		eightPow: new Decimal(1),
		sacrificed: new Decimal(0),
		achievements: [],
		infinityUpgrades: [],
		challenges: [],
		currentChallenge: "",
		infinityPoints: new Decimal(0),
		infinitied: modesChosen.ngm ? 990 : modesChosen.ngp%2>0 ? 1 : 0,
		infinitiedBank: modesChosen.ngm ? -1000 : 0,
		totalTimePlayed: 0,
		bestInfinityTime: 9999999999,
		thisInfinityTime: 0,
		resets: 0,
		galaxies: modesChosen.ngm ? -1 : 0,
		totalmoney: new Decimal(0),
		achPow: 1,
		newsArray: [],
		interval: null,
		lastUpdate: new Date().getTime(),
		autobuyers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
		tickspeedMultiplier: new Decimal(10),
		chall2Pow: 1,
		chall3Pow: new Decimal(0.01),
		matter: new Decimal(0),
		chall11Pow: new Decimal(1),
		partInfinityPoint: modesChosen.ngm ? -1e300 : 0,
		partInfinitied: modesChosen.ngm ? -1e8 : 0,
		break: false,
		challengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
		infchallengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
		lastTenRuns: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
		lastTenEternities: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
		infMult: new Decimal(modesChosen.ngm ? 0.5 : 1),
		infMultCost: new Decimal(modesChosen.ngm ? 30 : 10),
		tickSpeedMultDecrease: 10,
		tickSpeedMultDecreaseCost: 3e6,
		dimensionMultDecrease: modesChosen.ngm ? 11 : 10,
		dimensionMultDecreaseCost: 1e8,
		overXGalaxies: 10,
		version: 10,
		infDimensionsUnlocked: [],
		infinityPower: new Decimal(1),
		spreadingCancer: modesChosen.ngm ? -9990 : 0,
		postChallUnlocked: 0,
		postC4Tier: 0,
		postC3Reward: new Decimal(1),
		postC8Mult: new Decimal(1),
		eternityPoints: new Decimal(0),
		eternities: modesChosen.ngm ? -20 : 0,
		thisEternity: 0,
		bestEternity: 9999999999,
		eternityUpgrades: [],
		epmult: new Decimal(1),
		epmultCost: new Decimal(500),
		infinityDimension1 : {
			cost: new Decimal(1e8),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		},
		infinityDimension2 : {
			cost: new Decimal(1e9),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		},
		infinityDimension3 : {
			cost: new Decimal(1e10),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		},
		infinityDimension4 : {
			cost: new Decimal(1e20),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(modesChosen.ngm ? 0.0000125 : 1),
			baseAmount: 0
		},
		infinityDimension5 : {
			cost: new Decimal(1e140),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(modesChosen.ngm ? 0.01 : 1),
			baseAmount: 0
		},
		infinityDimension6 : {
			cost: new Decimal(1e200),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(modesChosen.ngm ? 0.015 : 1),
			baseAmount: 0
		},
		infinityDimension7 : {
			cost: new Decimal(1e250),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(modesChosen.ngm ? 0.01 : 1),
			baseAmount: 0
		},
		infinityDimension8 : {
			cost: new Decimal(1e280),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(modesChosen.ngm ? 0.01 : 1),
			baseAmount: 0
		},
		infDimBuyers: [false, false, false, false, false, false, false, false],
		timeShards: new Decimal(0),
		tickThreshold: new Decimal(1),
		totalTickGained: 0,
		timeDimension1: {
			cost: new Decimal(1),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm ? 0.01 : 1),
			bought: 0
		},
		timeDimension2: {
			cost: new Decimal(5),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm ? 0.03 : 1),
			bought: 0
		},
		timeDimension3: {
			cost: new Decimal(100),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm ? 0.025 : 1),
			bought: 0
		},
		timeDimension4: {
			cost: new Decimal(1000),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm ? 0.02 : 1),
			bought: 0
		},
		timeDimension5: {
			cost: new Decimal("1e2350"),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm ? 1e-5 : 1),
			bought: 0
		},
		timeDimension6: {
			cost: new Decimal("1e2650"),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm ? 5e-6 : 1),
			bought: 0
		},
		timeDimension7: {
			cost: new Decimal("1e3000"),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm ? 3e-6 : 1),
			bought: 0
		},
		timeDimension8: {
			cost: new Decimal("1e3350"),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm ? 2e-6 : 1),
			bought: 0
		},
		offlineProd: 0,
		offlineProdCost: modesChosen.ngm ? 5e11 : 1e7,
		challengeTarget: 0,
		autoSacrifice: 1,
		replicanti: {
			amount: new Decimal(0),
			unl: false,
			chance: 0.01,
			chanceCost: new Decimal(modesChosen.ngmm?1e90:1e150),
			interval: modesChosen.ngm ? 5000 : 1000,
			intervalCost: new Decimal(modesChosen.ngmm?1e80:modesChosen.rs==1?1e150:1e140),
			gal: 0,
			galaxies: 0,
			galCost: new Decimal(modesChosen.ngmm?1e110:1e170),
			auto: [false, false, false]
		},
		timestudy: {
			theorem: modesChosen.ngm ? -6 : 0,
			amcost: new Decimal("1e20000"),
			ipcost: new Decimal(modesChosen.ngm ? 1e-13 : 1),
			epcost: new Decimal(1),
			studies: [],
		},
		eternityChalls: modesChosen.ngm ? {eterc1:-6} : {},
		eternityChallGoal: new Decimal(Number.MAX_VALUE),
		currentEternityChall: "",
		eternityChallUnlocked: 0,
		etercreq: 0,
		autoIP: new Decimal(0),
		autoTime: 1e300,
		infMultBuyer: false,
		autoCrunchMode: "amount",
		respec: false,
		eternityBuyer: {
				limit: new Decimal(0),
				isOn: false
		},
		eterc8ids: 50,
		eterc8repl: 40,
		dimlife: true,
		dead: true,
		dilation: {
			studies: [],
			active: false,
			tachyonParticles: new Decimal(0),
			dilatedTime: new Decimal(0),
			totalTachyonParticles: new Decimal(modesChosen.ngm ? 2000 :0),
			nextThreshold: new Decimal(1000),
			freeGalaxies: 0,
			upgrades: [],
			rebuyables: {
				1: 0,
				2: modesChosen.ngm ? 1 : 0,
				3: 0,
			}
		},
		why: 0,
		shameLevel: 0,
		options: {
			newsHidden: true,
			notation: "Scientific",
			scientific: false,
			challConf: true,
			sacrificeConfirmation: true,
			retryChallenge: false,
			bulkOn: true,
			cloud: true,
			hotkeys: true,
			theme: undefined,
			secretThemeKey: 0,
			eternityconfirm: true,
			commas: "Commas",
			updateRate: 50,
			hideProductionTab: false,
			chart: {
					updateRate: 1000,
					duration: 10,
					warning: 0,
			},
			animations: {
				floatingText: true,
				bigCrunch: true,
				eternity: true,
				tachyonParticles: true,
			}
		},
		aarexModifications: {
			dilationConf: false,
			offlineProgress: true,
			autoSave: true,
			progressBar: true,
			logRateChange: false,
			hideProductionTab: false,
			eternityChallRecords: {},
			popUpId: 0,
			tabsSave: {on: false},
			breakInfinity: false
		}
	}
	if (modesChosen.ngm) doNGMinusNewPlayer()
	if (modesChosen.ngp) doNGPlusOneNewPlayer()
	if (modesChosen.ngpp) doNGPlusTwoNewPlayer()
	if (modesChosen.ngmm) doNGMinusTwoNewPlayer()
	if (modesChosen.ngpp>1) doNGPlusThreeNewPlayer()
	if (modesChosen.rs==1) doEternityRespeccedNewPlayer()
	if (modesChosen.ngmm>1) doNGMinusThreeNewPlayer()
	if (modesChosen.arrows) doNGEXPNewPlayer()
	if (modesChosen.ngud) doNGUDNewPlayer()
	if (modesChosen.rs==2) doInfinityRespeccedNewPlayer()
	if (modesChosen.ngp>1) doNGPlusFourPlayer()
	if (modesChosen.ngud==2) player.aarexModifications.ngudpV=1.12
	if (modesChosen.ngud==3) doNGUDSemiprimePlayer()
	if (modesChosen.nguep) player.aarexModifications.nguepV=1.03
	if (modesChosen.ngmm>2) doNGMinusFourPlayer()
	if (modesChosen.ngmm>3) doNGMinusFivePlayer()
	if (modesChosen.ngmu) doNGMultipliedPlayer()
	if (modesChosen.ngumu) player.aarexModifications.ngumuV=1.03
	if (modesChosen.ngpp==3) player.aarexModifications.ngp3lV=1
	if (modesChosen.ngex) player.aarexModifications.ngexV=0.1
	if (modesChosen.aau) {
		player.aarexModifications.aau=1
		dev.giveAllAchievements(true)
	}
	player.infDimensionsUnlocked=resetInfDimUnlocked()
}

function doNGMinusNewPlayer(){
	player.achievements.push("r22")
        player.achievements.push("r85")
        player.aarexModifications.newGameMinusVersion = 2.2
}

function doNGPlusOneNewPlayer(){
	player.money=new Decimal(1e25)
        player.infinitiedBank=1e6
        player.infinityUpgrades=["timeMult", "dimMult", "timeMult2", "unspentBonus", "27Mult", "18Mult", "36Mult", "resetMult", "passiveGen", "45Mult", "resetBoost", "galaxyBoost"]
        player.infMult=16
        player.dimensionMultDecrease=2
        player.tickSpeedMultDecrease=1.65
        player.eternities=100
        player.challenges=challengesCompletedOnEternity()
        player.replicanti.unl=true
        player.replicanti.amount=new Decimal(1)
        for (ec=1;ec<13;ec++) player.eternityChalls['eterc'+ec]=5
        player.eternityChalls.eterc1=1
        player.eternityChalls.eterc4=1
        player.eternityChalls.eterc10=1
        player.dilation.studies=[1]
        player.achievements.push("r77")
        player.achievements.push("r78")
        player.achievements.push("r85")
        player.achievements.push("r93")
        player.achievements.push("r95")
        player.achievements.push("r102")
        player.achievements.push("r131")
        player.aarexModifications.newGamePlusVersion=2
}

function doNGPlusTwoNewPlayer(){
	player.aarexModifications.newGamePlusPlusVersion = 2.90142
        player.autoEterMode = "amount"
        player.dilation.rebuyables[4] = 0
        player.meta = {resets: 0, antimatter: 10, bestAntimatter: 10}
        for (dim=1;dim<9;dim++) player.meta[dim] = {amount: 0, bought: 0, cost: initCost[dim]}
        player.autoEterOptions = {epmult:false}
        for (dim=1;dim<9;dim++) player.autoEterOptions["td"+dim] = false
        player.galaxyMaxBulk = false
        player.quantum = {
		times: 0,
		time: 0,
		best: 9999999999,
		last10: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
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
        player.aarexModifications.quantumConf = true
        tmp.qu=player.quantum
}

function doNGMinusTwoNewPlayer(){
	player.aarexModifications.newGameMinusMinusVersion = 2.41
        player.galacticSacrifice = {}
        player.galacticSacrifice = resetGalacticSacrifice()
        player.totalBoughtDims = {}
        player.tickBoughtThisInf = resetTickBoughtThisInf()
        player.challengeTimes.push(600*60*24*31)
        player.challengeTimes.push(600*60*24*31)
        player.autobuyers[12]=13
        player.extraDimPowerIncrease = 0
        player.dimPowerIncreaseCost = player.tickspeedBoosts==undefined?1e3:3e5
        player.infchallengeTimes.push(600*60*24*31)
        player.infchallengeTimes.push(600*60*24*31)
        player.options.gSacrificeConfirmation = true
}

function doNGPlusThreeNewPlayer(){
	player.aarexModifications.newGame3PlusVersion = 2.21 //Keep that line forever due to NG+3.1 / NG+3L compatibility
	document.getElementById("quantumison").checked = false
        player.respecMastery=false
        player.dbPower = 1
        player.dilation.times = 0
        player.peakSpent = 0
        player.masterystudies = []
        tmp.qu.reached = false
        player.options.animations.quarks = true
        player.meta.bestOverQuantums = 0
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
        player.eternityBuyer.presets = {on: false, autoDil: false, selected: -1, selectNext: 0, left: 1, order: []}
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
        player.eternitiesBank = 0
        tmp.qu.challenge = []
        tmp.qu.challenges = {}
        tmp.qu.nonMAGoalReached = []
        tmp.qu.challengeRecords = {}
        tmp.qu.pairedChallenges = {
		order: {},
		current: 0,
		completed: 0,
		fastest: {},
		pc68best: 0,
		respec: false
        }
        tmp.qu.qcsNoDil = {}
        tmp.qu.qcsMods = {current:[]}
        player.dilation.bestTP = 0
        player.old = true
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
        player.dontWant = false
        tmp.qu.nanofield = {
		charge: 0,
		energy: 0,
		antienergy: 0,
		power: 0,
		powerThreshold: 50,
		rewards: 0,
		producingCharge: false
        }
        tmp.qu.autoAssign = false
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
        player.dilation.bestTPOverGhostifies = 0
        player.meta.bestOverGhostifies = 0
        player.ghostify = {
            	reached: false,
            	times: 0,
            	time: 0,
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
                	boosts: 0,
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
                	zNeProgress: 0,
                	zNeReq: 1,
                	wpb: 0,
                	wnb: 0,
                	zb: 0
		}
	}
        tmp.bl=player.ghostify.bl
        for (var g=1;g<br.names.length;g++) tmp.bl.glyphs.push(0)
        player.options.animations.ghostify = true
        player.aarexModifications.ghostifyConf = true
}

function doEternityRespeccedNewPlayer(){
	player.aarexModifications.ersVersion = 1.02
        player.boughtDims = []
        player.replicanti.limit = Number.MAX_VALUE
        player.replicanti.newLimit = Number.MAX_VALUE
        player.timestudy.ers_studies = [null, 0, 0, 0, 0, 0, 0]
        player.timestudy.studyGroupsUnlocked = 0
}

function doNGMinusThreeNewPlayer(){
	player.aarexModifications.newGame3MinusVersion = 3.201
        player.aarexModifications.ngmX=3
        player.tickspeedBoosts = 0
        player.autobuyers[13]=14
        player.challengeTimes.push(600*60*24*31)
        player.infchallengeTimes.push(600*60*24*31)
        player.infchallengeTimes.push(600*60*24*31)
        player.infchallengeTimes.push(600*60*24*31)
        player.infchallengeTimes.push(600*60*24*31)
        player.overXGalaxiesTickspeedBoost=10
}

function doNGEXPNewPlayer(){
	player.aarexModifications.newGameExpVersion = 1.11
        for (u=1;u<5;u++) player.infinityUpgrades.push("skipReset"+(u>3?"Galaxy":u))
        player.resets=4
}

function doNGUDNewPlayer(){
	player.aarexModifications.newGameUpdateVersion = 1.1
        player.exdilation = {
            	unspent: 0,
            	spent: {
                	1: 0,
                	2: 0,
                	3: 0
            	},
            	times: 0
        }
        player.blackhole = {
            	unl: false,
            	upgrades: {dilatedTime: 0, bankedInfinities: 0, replicanti: 0, total: 0},
            	power: 0
        }
        for (var d=1;d<5;d++) player["blackholeDimension"+d] = {
            	cost: blackholeDimStartCosts[d],
            	amount: 0,
            	power: 1,
            	bought: 0
        }
        player.options.animations.blackHole = true
        player.options.exdilationconfirm = true
}

function doInfinityRespeccedNewPlayer(){
	player.aarexModifications.irsVersion = 1.1
        player.infinityUpgradesRespecced = {1: 0, 3: 0, 4: 0, 5: 0, 6: 0}
        player.singularity = {
            	unlocked: false,
            	upgraded: 0,
            	sacrificed: 0,
            	singularityPower: 0,
            	darkMatter: 0
        }
        player.dimtechs = {
            	unlocked: false,
            	discounts: 0,
            	tickUpgrades: 0,
            	respec: false
        }
        for (dim=1;dim<9;dim++) player.dimtechs["dim"+dim+"Upgrades"] = 0
        player.setsUnlocked = 0
        player.infMultCost = 1
}

function doNGPlusFourPlayer(){
	player.eternities=1e13
        for (var c=13;c<15;c++) player.eternityChalls["eterc"+c]=5
        player.dilation.studies=[1,2,3,4,5,6]
        player.dilation.dilatedTime=1e100
        for (var u=4;u<11;u++) player.dilation.upgrades.push(u)
        for (var u=1;u<7;u++) player.dilation.upgrades.push("ngpp"+u)
        player.meta.antimatter=1e25
        player.meta.resets=4
        player.quantum.times=1
        player.quantum.best=10
        for (var d=7;d<14;d++) player.masterystudies.push("d"+d)
        player.quantum.electrons.mult=6
        for (var c=1;c<9;c++) player.quantum.challenges[c]=2
        player.quantum.pairedChallenges.completed=4
        player.quantum.nanofield.rewards=19
        player.quantum.reachedInfQK=true
        player.quantum.tod.r.spin=1e25
        player.quantum.tod.g.spin=1e25
        player.quantum.tod.b.spin=1e25
        player.ghostify.milestones=1
        player.achievements.push("ng3p18")
        player.achievements.push("ng3p28")
        player.achievements.push("ng3p37")
        player.achievements.push("ng3p47")
        player.aarexModifications.ngp4V=1
}

function doNGUDSemiprimePlayer(){
	for (var d=5;d<9;d++) player["blackholeDimension"+d] = {
            	cost: blackholeDimStartCosts[d],
            	amount: 0,
            	power: 1,
            	bought: 0
        }
        player.aarexModifications.nguspV=1
}

function doNGMinusFourPlayer(){
	player.aarexModifications.newGame4MinusVersion=2.111
        player.aarexModifications.ngmX=4
        player.tdBoosts=0
        player.challengeTimes.push(600*60*24*31)
        player.autobuyers.push(15)
        resetTDs()
        reduceDimCosts()
}

function doNGMinusFivePlayer(){
	player.aarexModifications.ngm5V=0.52
        player.aarexModifications.ngmX=5
        resetPSac()
        resetIDs_ngm5()
}

function doNGMultipliedPlayer(){
	player.aarexModifications.newGameMult=1
	player.infMult=256
	player.eternities=100
	player.replicanti.unl=true
	player.replicanti.amount=new Decimal(1)
}

if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }


  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, fromIndex) {

        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }

        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          // c. Increase k by 1.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          }
          k++;
        }

        // 8. Return false
        return false;
      }
    });
  }

    if (!Math.log10) {
        Math.log10 = Math.log10 || function(x) {
            return Math.log(x) * Math.LOG10E;
        };
    }

    if (!Math.log2) {
        Math.log2 = Math.log2 || function(x) {
            return Math.log(x) * Math.LOG2E;
        };
    }

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
          value: function(predicate) {
           // 1. Let O be ? ToObject(this value).
            if (this == null) {
              throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
              throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
              // a. Let Pk be ! ToString(k).
              // b. Let kValue be ? Get(O, Pk).
              // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
              // d. If testResult is true, return kValue.
              var kValue = o[k];
              if (predicate.call(thisArg, kValue, k, o)) {
                return kValue;
              }
              // e. Increase k by 1.
              k++;
            }

            // 7. Return undefined.
            return undefined;
          }
        });
      }


Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

Object.invert = function(obj) {
    var result = {};
    var keys = Object.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
};

function sortNumber(a,b) {
    return a - b;
}

function toString(x) {
	if (typeof(x) == "number") x = x.toString()
	return x
}

function wordizeList(list, caseFirst) {
	let length = list.length
	if (caseFirst && length > 0) {
		let split0 = [list[0][0], list[0].slice(1)]
		list[0] = split0[0].toUpperCase()
		if (split0[1]) list[0] += split0[1]
	}
	let ret = ""
	for (var i=0; i<length; i++) {
		if (i > 0 && length > 2) {
			ret += ", "
			if (i == length - 1) ret += "and "
		} else if (i > 0) ret += " and "
		ret += list[i]
	}
	return ret
}

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontFamily = 'Typewriter';
var ctx2 = document.getElementById("normalDimChart").getContext('2d');
var normalDimChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: ['Exponents of antimatter per second'],
            data: [],
            backgroundColor: [
                'rgba(0,0,0,1)'
            ],
            borderColor: [
                'rgba(0,0,0,1)'
            ],
            fill: false,
            lineTension: 0.1,
            borderWidth: 3,
            pointRadius: 0,
            pointBorderWidth: 0,
            pointHoverRadius: 0
        }]
    },
    options: {
        tooltips: {enabled: false},
        hover: {mode: null},
        legend: {
            display: false,
            labels: {
                boxWidth: 0
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    max: 100000000,
                    min: 1
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                    drawTicks: false
                },
                ticks: {
                    fontSize: 0
                }
            }]
        },
        layout: {
            padding: {
            top: 10
            }
        }
    }
});

function updateChartValues() {
	player.options.chart.duration = Math.min(Math.max(parseInt(document.getElementById("chartDurationInput").value), 1), 300);
	document.getElementById("chartDurationInput").value = player.options.chart.duration;
	player.options.chart.updateRate = Math.min(Math.max(parseInt(document.getElementById("chartUpdateRateInput").value), 50), 10000);
	document.getElementById("chartUpdateRateInput").value = player.options.chart.updateRate;
	if (Number.isInteger(player.options.chart.updateRate) === false) {
		player.options.chart.updateRate = 1000;
	}
	if ((player.options.chart.updateRate <= 200 && player.options.chart.duration >= 30) && player.options.chart.warning === 0) {
		alert("Warning: setting the duration and update rate too high can cause performance issues.");
		player.options.chart.warning = 1;
	}
	if (player.options.chart.duration / player.options.chart.updateRate * 1000 >= 1000 && player.options.chart.warning !== 2) {
		alert("Warning: you have set the duration and update rate quite high, make sure you know what you're doing or have a good computer");
		player.options.chart.warning = 2;
	}
}


//Theme stuff
function setTheme(name) {
    document.querySelectorAll("link").forEach( function(e) {
        if (e.href.includes("theme")) e.remove();
    });

    player.options.theme=name
    if(name !== undefined && name.length < 3) giveAchievement("Shhh... It's a secret")
    var themeName=player.options.secretThemeKey
    if(name === undefined) {
        themeName="Normal"
    } else if(name === "S1") {
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if(name === "S2") {
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if(name === "S3") {
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if(name === "S4") {
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if(name === "S5") {
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if (name !== "S6") {
        themeName=name;
    }
    if (theme=="Dark"||theme=="Dark Metro"||name === "S6") {
        Chart.defaults.global.defaultFontColor = '#888';
        normalDimChart.data.datasets[0].borderColor = '#888'
    } else {
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    }
    document.getElementById("theme").innerHTML="<p style='font-size:15px'>Themes</p>Current theme: " + themeName;
    document.getElementById("chosenTheme").textContent="Current theme: " + themeName;

    if (name === undefined) return;
    if (name === "Aarex's Modifications") name = "Aarexs Modifications"
    if (name === "Aarex's Mods II") name = "Aarexs Mods II"

    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = "stylesheets/theme-" + name + ".css";

    head.appendChild(link);
}

document.getElementById("theme").onclick = function () {
	closeToolTip()
	document.getElementById('thememenu').style.display="flex"
}

function doWeakerPowerReductionSoftcapNumber(num,start,exp){
	if (num <start || num < 1) return num
	return start*(( (num/start)**exp -1)/exp+1)
}

function doWeakerPowerReductionSoftcapDecimal(num,start,exp){
	if (num.lt(start) || num.lt(1)) return num
	return start.times( num.div(start).pow(exp).minus(1).div(exp).plus(1) )
}

function doStrongerPowerReductionSoftcapNumber(num,start,exp){
	if (num <start || num < 1) return num
	return start*((num/start)**exp)
}

function doStrongerPowerReductionSoftcapDecimal(num,start,exp){
	if (num.lt(start) || num.lt(1)) return num
	return start.times(num.div(start).pow(exp))
}


let kongIPMult = 1
let kongDimMult = 1
let kongAllDimMult = 1
let kongEPMult = 1
let tmp = {
	nrm: new Decimal(1),
	rm: new Decimal(1),
	it: 1,
	rg4: false,
	pct: "",
	ns: 1,
	bru: {},
	be: false,
	beu: {},
	bm: [200,175,150,100,50,40,30,25,20,15,10,5,4,3,2,1],
	nb: [],
	nbc: [1,2,4,6,15,50,1e3,1e14,1e35,"1e900"],
	nu: [],
	nuc: [null,1e6,1e7,1e8,2e8,5e8,2e9,5e9,75e8,1e10,7e12,1e18,1e55,1e125,1e160,1e280],
	lt: [12800,16e4,48e4,16e5,6e6,5e7,24e7,125e7],
	lti: [2,4,1.5,10,4,1e3,2.5,3],
	ls: [0,0,0,0,0,0,0],
	le: [0,0,0,0,0,0,0],
	bEnLvl: {},
	bEn: {},
	blu: {}
}

function updateWZBosonsTemp(){
	for (var r=1;r<=bu.rows;r++) for (var c=1;c<6;c++) {
		var id=r*10+c
		if (bu.effects[id]!==undefined) tmp.blu[id]=bu.effects[id]()
	}
	for (var g2=2;g2<br.names.length;g2++) for (var g1=1;g1<g2;g1++) {
		var id=g1*10+g2
		tmp.bEnLvl[id]=tmp.bl.enchants[id]||new Decimal(0)
		if (bEn.effects[id]!==undefined) tmp.bEn[id]=getEnchantEffect(id)
	}
	var wpl=player.ghostify.wzb.wpb.add(1).log10()
	var wnl=player.ghostify.wzb.wnb.add(1).log10()
	tmp.wzbs=new Decimal(1) //W & Z Bosons speed
	
	var bosonsExp = wpl*(player.ghostify.wzb.wpb.sub(player.ghostify.wzb.wnb.min(player.ghostify.wzb.wpb))).div(player.ghostify.wzb.wpb.max(1)).toNumber()
	tmp.wbt=Decimal.pow(tmp.newNGP3E?5:3,Math.max(bosonsExp,0)) //W Bosons boost to extract time
	if (tmp.wbt.gt(1e8)) tmp.wbt = Decimal.pow(2+tmp.wbt.log10(),8)
	tmp.wbo=Decimal.pow(10,Math.max(bosonsExp,0)) //W Bosons boost to Z Neutrino oscillation requirement
	
	tmp.wbp=player.ghostify.wzb.wpb.add(player.ghostify.wzb.wnb).div(100).max(1).pow(1/3).sub(1) //W Bosons boost to Bosonic Antimatter production
	var zbslog = player.ghostify.wzb.zb.div(10).add(1).sqrt().log10()
	if (zbslog > 4) zbslog = 2+zbslog/2
	if (zbslog > 8) zbslog = 2*Math.log2(zbslog)+2
	tmp.zbs = Decimal.pow(10,zbslog)
	tmp.dppg=new Decimal(1)
	tmp.bEn[21]=getEnchantEffect(21) //BU21 recalculation
}

function updateRedLightBoostTemp(){
	var light0multiplier = tmp.newNGP3E?.155:.15
	var lighteffect0 = Math.pow(tmp.ls[0],1/4)*light0multiplier+1
	
	if (lighteffect0 > 1.5 && !tmp.newNGP3E) lighteffect0 = Math.log10(lighteffect0*20/3)*1.5
	tmp.le[0] = lighteffect0
}

function updateOrangeLightBoostTemp(){
	tmp.le[1] = tmp.ls[1] > 64 ? Math.log10(tmp.ls[1]/64)+14:tmp.ls[1]>8?Math.sqrt(tmp.ls[1])+6 : tmp.ls[1]+1 
	tmp.ppti /= tmp.le[1]
}

function updateYellowLightBoostTemp(){
	var lighteffect2 = 0 //changed later no matter what
	if (tmp.ls[2] > 60 && !tmp.newNGP3E){
		lighteffect2 = (Math.log10(tmp.ls[2]/6)+2)/3*Math.sqrt(1200)
	} else {
		lighteffect2 = tmp.ls[2]>20 ? Math.sqrt(tmp.ls[2]*20) : tmp.ls[2]
	}
	if (lighteffect2 > 70) lighteffect2 = 6+Math.pow(Math.log2(lighteffect2-6)+2 , 2)
	if (lighteffect2 > 100) lighteffect2 = 4 + 6 * Math.pow( Math.log10(lighteffect2) ,4)
	tmp.le[2] = Math.sqrt(lighteffect2) * 45e3 
}

function updateGreenLightBoostTemp(){
	tmp.le[3] = tmp.ngp3l?(tmp.ls[3]>8?Math.log10(tmp.ls[3]/8)+Math.sqrt(12)+1:Math.sqrt(tmp.ls[3]*1.5)+1):1 
}

function updateBlueLightBoostTemp(){
	var light4mult = tmp.newNGP3E?1.3:5/4
	var lighteffect4 = Math.log10(Math.sqrt(tmp.ls[4]*2)+1)*light4mult
	tmp.le[4] = lighteffect4
}

function updateIndigoLightBoostTemp(){
	var loglighteffect5 = tmp.ls[5] > 25 ? Math.sqrt(tmp.ls[5]*10+375) : tmp.ls[5]
	loglighteffect5 *= tmp.newNGP3E?20:10
	tmp.le[5] = Decimal.pow(10,loglighteffect5) 
}

function updateVioletLightBoostTemp(){
	var lightexp6 = tmp.newNGP3E?.36:1/3
	var loglighteffect6 = Math.pow(player.postC3Reward.log10()*tmp.ls[6],lightexp6)*2 
	if (loglighteffect6 > 15e3) loglighteffect6 = 15e3*Math.pow(loglighteffect6/15e3,.6)
	tmp.le[6] = Decimal.pow(10 , loglighteffect6)
}

function updateEffectiveLightAmountsTemp(){
	let lePower = getLightEmpowermentBoost()
	for (var c=6;c>-1;c--) {
		var x = player.ghostify.ghostlyPhotons.lights[c]
		if (c == 0) x = (player.ghostify.ghostlyPhotons.maxRed+x*2)/3
		tmp.ls[c] = x * ( Math.sqrt(c>5?1:tmp.ls[c+1]+1)+lePower )
	}
	tmp.ls[7] = player.ghostify.ghostlyPhotons.lights[0]*(Math.sqrt(tmp.ls[1]+1)+getLightEmpowermentBoost()) //Other red Light boosts than 0 LE
}

function updateLightEmpowermentBonus1Temp(){
	if (!player.ghostify.ghostlyPhotons.enpowerments > 0) return
	var le1exp = 1
	if (tmp.newNGP3E){
		le1exp += .2
		if (player.ghostify.ghostlyPhotons.unl) le1exp += .15
		if (player.ghostify.wzb.unl) le1exp += .15 
	}
	var le1mult = tmp.newNGP3E?600:300
	var eff = Math.pow(Math.log10(tmp.ls[3]+1),le1exp)*le1mult
	tmp.le[7] = {effect:eff} 
}

function updateLightEmpowermentBonus2Temp(){
	if (!player.ghostify.ghostlyPhotons.enpowerments > 1) return 
	var eff = Math.log10(tmp.ls[4]*10+1)/4+1
	tmp.le[8] = eff
}

function updateLightEmpowermentBonus3Temp(){
	if (!player.ghostify.ghostlyPhotons.enpowerments > 2) return 
	var eff = Math.pow(tmp.ls[7]+1,.1)*2-1
	tmp.le[9] = eff
}

function updateNU14Temp(){
	var base = player.ghostify.ghostParticles.add(1).log10()
	var colorsPortion = Math.pow(tmp.qu.colorPowers.r.add(tmp.qu.colorPowers.g).add(tmp.qu.colorPowers.b).add(1).log10(),1/3)
	tmp.nu[5] = Decimal.pow(base, colorsPortion*0.8+1).max(1) //NU14
}

function updateNU15Temp(){
	tmp.nu[6] = Decimal.pow(2,(tmp.qu.nanofield.rewards>90?Math.sqrt(90*tmp.qu.nanofield.rewards):tmp.qu.nanofield.rewards)/2.5) //NU15
}

function updateGPhTemp(){
	updateLightEmpowermentReq()
	updateEffectiveLightAmountsTemp()
	updateRedLightBoostTemp()
	updateOrangeLightBoostTemp()
	updateYellowLightBoostTemp()
	updateGreenLightBoostTemp()
	updateBlueLightBoostTemp()
	updateIndigoLightBoostTemp()
	updateVioletLightBoostTemp()
	updateLightEmpowermentBonus1Temp()
	updateLightEmpowermentBonus2Temp()
	updateLightEmpowermentBonus3Temp()
	updatePhotonsUnlockedBRUpgrades()
	updateNU14Temp()
	updateNU15Temp()
}

function updateNeutBoost1Temp(nt){
	let nb1mult = .75
	if (tmp.newNGP3E) nb1mult = .8
	let nb1neutrinos = nt[0].add(1).log10()+nt[1].add(1).log10()+nt[2].add(1).log10()
	tmp.nb[0] = Math.log10(1+nb1neutrinos)*nb1mult
}

function updateNeutBoost2Temp(nt){
	let nb2neutrinos = Math.pow(nt[0].add(1).log10(),2)+Math.pow(nt[1].add(1).log10(),2)+Math.pow(nt[2].add(1).log10(),2)
	let nb2 = Math.pow(nb2neutrinos, .25) * 1.5
	tmp.nb[1] = nb2 
}

function updateNeutBoost3Temp(nt){
	let nb3Neutrinos = Math.pow(Math.log10(Math.max(nt[0].max(1).log10()-5,1))/Math.log10(5),2)+Math.pow(Math.log10(Math.max(nt[1].max(1).log10()-5,1))/Math.log10(5),2)+Math.pow(Math.log10(Math.max(nt[2].max(1).log10()-5,1))/Math.log10(5),2)
	let nb3 = Math.pow(nb3Neutrinos / 3, .25) + 3
	if (!tmp.ngp3l && nb3 > 6) nb3 = 3 + Math.log2(nb3 + 2)
	tmp.nb[2] = nb3
}

function updateNeutBoost4Temp(nt){
	var nb4neutrinos = Math.pow(nt[0].add(1).log10(),2)+Math.pow(nt[1].add(1).log10(),2)+Math.pow(nt[2].add(1).log10(),2)
	var nb4 = Math.pow(nb4neutrinos, .25) * 0.07 + 1
	if (tmp.ngp3l && nb4 > 10) nb4 = 6 + Math.log2(nb4 + 6)
	tmp.nb[3] = nb4
}

function updateNeutBoost5Temp(nt){
	var nb5neutrinos = nt[0].max(1).log10()+nt[1].max(1).log10()+nt[2].max(1).log10()
	tmp.nb[4] = Math.min(nb5neutrinos / 33, 1)
}

function updateNeutBoost6Temp(nt){
	var nb6neutrinos = Math.pow(nt[0].add(1).log10(),2)+Math.pow(nt[1].add(1).log10(),2)+Math.pow(nt[2].add(1).log10(),2)
	var nb6exp1 = .25
	if (tmp.newNGP3E) nb6exp1 = .26
	let nb6 = Math.pow(Math.pow(nb6neutrinos, nb6exp1) * 0.525 + 1, tmp.be ? 0.5 : 1)
	tmp.nb[5] = nb6
}

function updateNeutBoost7Temp(nt){
	let nb7exp = .5
	if (tmp.newNGP3E) nb7exp = .6
	let nb7neutrinos = nt[0].add(1).log10()+nt[1].add(1).log10()+nt[2].add(1).log10()
	let nb7 = Math.pow(Math.log10(1 + nb7neutrinos), nb7exp)*2.35
	if (!tmp.ngp3l) {
		if (nb7 > 4) nb7 = 2 * Math.log2(nb7)
		if (nb7 > 5) nb7 = 2 + Math.log2(nb7 + 3)
	}
	tmp.nb[6] = nb7
}

function updateNeutBoost8Temp(nt){
	let nb8neutrinos = Math.pow(nt[0].add(1).log10(),2)+Math.pow(nt[1].add(1).log10(),2)+Math.pow(nt[2].add(1).log10(),2)
	let nb8exp = .25
	if (tmp.newNGP3E) nb8exp = .27
	var nb8 = Math.pow(nb8neutrinos, nb8exp) / 10 + 1
	if (nb8 > 11) nb8 = 7 + Math.log2(nb8 + 5)
	tmp.nb[7] = nb8
}

function updateNeutBoost9Temp(nt){
	var nb9 = (nt[0].add(1).log10()+nt[1].add(1).log10()+nt[2].add(1).log10())/10
	if (tmp.ngp3l && nb9 > 4096) nb9 = Math.pow(Math.log2(nb9) + 4, 3)
	tmp.nb[8] = nb9
}

function updateNeutBoost10Temp(nt){
	let nb10neutrinos = nt[0].add(1).log10()+nt[1].add(1).log10()+nt[2].add(1).log10()
	let nb10 = Math.max(nb10neutrinos - 3e3, 0) / 75e4
	if (!tmp.ngp3l && nb10 > 0.1) nb10 = Math.log10(nb10 * 100) / 10
	tmp.nb[9] = nb10
}

function updateNeutrinoBoostsTemp(){
	var nt = []
	for (var g = 0; g < 3; g++) nt[g] = player.ghostify.neutrinos[(["electron","mu","tau"])[g]]
	for (var nb = 1; nb <= player.ghostify.neutrinos.boosts; nb++) eval("updateNeutBoost" + nb + "Temp")(nt)
}

function updateNU1Temp(){
	tmp.nu[0] = Math.max(110-(tmp.qu.bigRip.active?0:player.meta.resets),0) 
}

function updateNU3Temp(){
	tmp.nu[1] = Math.pow(Math.max(tmp.qu.colorPowers.b.log10()/250+1,1),2) 
}

function updateNU4Temp(){
	let nu4base = 20
	if (tmp.newNGP3E) nu4base = 50
	tmp.nu[2] = Decimal.pow(nu4base,Math.pow(Math.max(-getTickspeed().div(1e3).log10()/4e13-4,0),1/4)) 
}

function updateNU7Temp(){
	var nu7 = tmp.qu.colorPowers.g.add(1).log10()/400
	if (nu7 > 40) nu7 = Math.sqrt(nu7*10)+20
	tmp.nu[3] = Decimal.pow(10,nu7) 
}

function updateNU12Temp(){
	tmp.nu[4] = { 
		normal: Math.sqrt(player.galaxies*.0035+1),
		free: player.dilation.freeGalaxies*.035+1,
		replicated: Math.sqrt(getTotalRG())*(tmp.ngp3l?.035:.0175)+1 //NU12 
	}
}

function updateNeutrinoUpgradesTemp(){
	updateNU1Temp()
	updateNU3Temp()
	updateNU4Temp()
	updateNU7Temp()
	updateNU12Temp()
}

function updateInfiniteTimeTemp(){
	var x = (3 - getTickspeed().log10()) * 0.000005
	if (!tmp.ngp3l && player.achievements.includes("ng3p56")) x *= 1.03
	if (ghostified && player.ghostify.neutrinos.boosts>3) x *= tmp.nb[3]
	if (tmp.be && !player.dilation.active && tmp.qu.breakEternity.upgrades.includes(8)) x *= getBreakUpgMult(8)
	x = softcap(x, "inf_time_log_1")
	if (player.aarexModifications.ngudpV) {
		if (x > 1e8) x = Math.pow(1e8 * x, .5)
		if (x > 1e9) x = Math.pow(1 + Math.log10(x), 9)
		if (tmp.be && x > 1e7) x = Math.pow(93 + Math.log10(x), 3.5)
		if (player.dilation.active && x > 1e5) x = Math.pow(1e20 * x, .2)
	}
	if (!tmp.ngp3l) x = softcap(x, "inf_time_log_2")
	tmp.it=Decimal.pow(10,x)
}

function updateIntergalacticTemp(){
	if (!tmp.ngp3) return
	x = player.galaxies
	if (!tmp.qu.bigRip.active && player.ghostify.ghostlyPhotons.enpowerments>2) x *= tmp.le[9]
	if (tmp.be && player.dilation.active && tmp.qu.breakEternity.upgrades.includes(10)) x *= getBreakUpgMult(10)
	if (!tmp.ngp3l) x += tmp.aeg
	tmp.igg = x

	var igLog = Math.pow(x, Math.min(Math.sqrt(Math.log10(Math.max(x, 1))) * 2, 2.5)) //Log10 of reward
	tmp.igs = 0 //Intergalactic Scaling ; used in the display text
	if (!tmp.ngp3l && tmp.qu.bigRip.active && igLog > 1e9) { //Distant
		igLog = Math.pow(igLog * 1e3, .75)
		tmp.igs = 1
	}
	if ((player.aarexModifications.ngudpV || !tmp.ngp3l) && igLog > 1e15) { //Further
		igLog = Math.pow(10 + 6 * Math.log10(igLog), 7.5)
		tmp.igs = 2
	}
	if (player.aarexModifications.ngudpV && igLog > 1e16) { //Remote
		igLog = Math.pow(84 + Math.log10(igLog), 8)
		tmp.igs = 3
	}

	if (!tmp.ngp3l && igLog > 1e20) { //Dark Matter / Ghostly / Ethereal
		igLog = softcap(igLog, "ig_log_high")
		tmp.igs = Math.min(Math.floor(Math.log10(igLog) - 16), 8)
		if (igLog > 1e24) igLog = Math.pow(Math.pow(Math.log10(igLog), 2) + 424, 8)
	}

	tmp.ig = Decimal.pow(10, igLog)
}

function updateAntiElectronGalaxiesTemp(){
	tmp.aeg = 0
	if (hasBosonicUpg(14) && !tmp.qu.bigRip.active) tmp.aeg = Math.max(tmp.blu[14] - tmp.qu.electrons.sacGals, 0)
}

function updateTS232Temp(){
	var exp = 0.2
	if (tmp.ngp3 && player.galaxies >= 1e4 && !tmp.be) exp *= Math.max(6-player.galaxies/2e3,0)
	tmp.ts232 = Math.pow(1+initialGalaxies()/1000,exp)
}

function updateTS431ExtraGalTemp(){
	tmp.eg431=tmp.aeg/10
	if (tmp.ngp3 && player.ghostify.ghostlyPhotons.enpowerments) {
		tmp.le[7].total=(colorBoosts.g+tmp.pe-1)*tmp.le[7].effect
		tmp.eg431+=tmp.le[7].total
	}
}

function updateMatterSpeed(){
	//mv: Matter speed
	tmp.mv = 1.03 + player.resets/200 + player.galaxies/100
	if (player.pSac !== undefined) {
		var exp = 10 / puMults[12](hasPU(12, true, true))
		tmp.mv = Decimal.pow(tmp.mv, exp)
	}
}

function updateReplicantiTemp() {
	var ts273Mult = getMTSMult(273)
	var data = {}
	tmp.rep = data

	data.ln = player.replicanti.amount.ln()
	data.chance = Decimal.pow(player.replicanti.chance, ts273Mult.toNumber())
	data.speeds = getReplSpeed()
	data.interval = getReplicantiFinalInterval()

	data.freq = 0
	if (data.chance.gte("1e9999998")) data.freq = ts273Mult.times(Math.log10(player.replicanti.chance + 1)/Math.log10(2))

	data.est = Decimal.div((data.freq ? data.freq.times(Math.log10(2) / Math.log10(Math.E) * 1e3) : Decimal.add(data.chance, 1).log(Math.E) * 1e3), data.interval)
	data.estLog = data.est.times(Math.log10(Math.E))
}

function updateTemp() {
	tmp.ri=player.money.gte(getLimit())&&((player.currentChallenge!=""&&player.money.gte(player.challengeTarget))||!onPostBreak())
	tmp.nrm=player.replicanti.amount.max(1)
	tmp.rg4=false
	if (tmp.ngp3) {
		tmp.apgw=tmp.qu.nanofield.apgWoke||getAntiPreonGhostWake()
		tmp.ppti=1
		if (player.ghostify.wzb.unl) updateWZBosonsTemp()
		if (player.ghostify.ghostlyPhotons.unl) updateGPhTemp()
		if (ghostified) {
			updateNeutrinoBoostsTemp()
			updateNeutrinoUpgradesTemp()
		}
		if (tmp.qu.breakEternity.unlocked) updateBreakEternityUpgradesTemp()
		if (player.masterystudies.includes("d14")) updateBigRipUpgradesTemp()
		if (tmp.qu.bigRip.active) {
			if (!player.dilation.active&&tmp.qu.bigRip.upgrades.includes(14)) tmp.nrm=tmp.nrm.pow(tmp.bru[14])
			if (tmp.nrm.log10() > 1e9) tmp.nrm = Decimal.pow(10,1e9*Math.pow(tmp.nrm.log10()/1e9,2/3))
		}
		if (player.masterystudies.includes("d13")) tmp.branchSpeed = getBranchSpeed()
		if (player.masterystudies.includes("d12")) tmp.ns = getNanofieldSpeed()
		if (player.masterystudies.includes("d10")) tmp.edgm = getEmperorDimensionGlobalMultiplier() //Update global multiplier of all Emperor Dimensions
		tmp.be=tmp.qu.bigRip.active&&tmp.qu.breakEternity.break
		tmp.twr=getTotalWorkers()
		tmp.tra=getTotalReplicants()
		tmp.rg4=tmp.qu.upgrades.includes("rg4")&&(tmp.qu.rg4||!tmp.ngp3l||inQC(1)||QCIntensity(1))
		tmp.tue=getTreeUpgradeEfficiency()
		tmp.mpte=getMPTExp()
	} else tmp.be=false
	tmp.sacPow = calcTotalSacrificeBoost()
	updateQCRewardsTemp()

	if (player.meta !== undefined) tmp.mdgm = getMetaDimensionGlobalMultiplier() //Update global multiplier of all Meta Dimensions
	tmp.mptb=getMPTBase()
	
	updateInfiniteTimeTemp()
	updateAntiElectronGalaxiesTemp()
	updateIntergalacticTemp() // starts with if (tmp.ngp3)

	tmp.rm=getReplMult()
	if (!player.timestudy.studies.includes(101)) tmp.nrm=1
	updateExtraReplGalaxies()
	
	updateTS232Temp()
	updateTS431ExtraGalTemp()
	updateMatterSpeed()

	tmp.tsReduce = getTickSpeedMultiplier()
	updateInfinityPowerEffects()
	if (player.replicanti.unl) updateReplicantiTemp()
}

function showTab(tabName, init) {
    	if (tabName == 'quantumtab' && !player.masterystudies) {
        	alert("Wait! The owner of NG++, dan-simon, have abandoned the development! However, this is not the end. You need to really reach Infinite antimatter to win! (it's impossible)")
        	return
    	}
    	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    	var tabs = document.getElementsByClassName("tab");
    	var tab;
    	var oldTab
    	for (var i = 0; i < tabs.length; i++) {
        	tab = tabs.item(i);
        	if (tab.style.display == 'block') oldTab = tab.id
        	if (tab.id === tabName) {
        		tab.style.display = 'block';
        	} else {
            		tab.style.display = 'none';
		}
	}
    	if (oldTab !== tabName) {
        	player.aarexModifications.tabsSave.tabMain = tabName
		if ((document.getElementById("antimatterdimensions").style.display != "none" || document.getElementById("metadimensions").style.display != "none") && player.aarexModifications.progressBar && tabName == "dimensions") document.getElementById("progress").style.display = "block";
		else document.getElementById("progress").style.display = "none"
		if ((document.getElementById("timestudies").style.display != "none" || document.getElementById("ers_timestudies").style.display != "none" || document.getElementById("masterystudies").style.display != "none") && tabName=="eternitystore") document.getElementById("TTbuttons").style.display = "block";
		else document.getElementById("TTbuttons").style.display = "none"
		if (tabName=="eternitystore") {
            		if (document.getElementById('timestudies') !== "none" || document.getElementById('masterystudies') !== "none" || document.getElementById('dilation') !== "none" || document.getElementById("blackhole") !== "none") resizeCanvas()
            		if (document.getElementById("dilation") !== "none") requestAnimationFrame(drawAnimations)
            		if (document.getElementById("blackhole") !== "none") requestAnimationFrame(drawBlackhole)
            		if (document.getElementById("autoEternity").style.display === "block") loadAP()
		}
        	if (tabName=="quantumtab") {
            		if (document.getElementById('uquarks') !== "none") resizeCanvas()
            		if (document.getElementById("uquarks") !== "none") requestAnimationFrame(drawQuarkAnimation)
		}
	}
    	if (!init) closeToolTip();
}


function updateMoney() {
	document.getElementById("coinAmount").textContent = shortenMoney(player.money)
	var element2 = document.getElementById("matter");
	if (player.currentChallenge == "postc6" || inQC(6)) element2.textContent = "There is " + formatValue(player.options.notation, Decimal.pow(player.matter,20), 2, 1) + " matter."; //TODO
	else if (inNC(12) || player.currentChallenge == "postc1" || player.pSac !== undefined) {
		var txt = "There is " + formatValue(player.options.notation, player.matter, 2, 1) + " matter."
		var extra = getExtraTime()
		if (player.pSac !== undefined && player.matter.gt(0)) txt += " (" + timeDisplayShort(Math.max(player.money.div(player.matter).log(tmp.mv) * getEC12Mult(),0)) + (extra ? " + " + timeDisplayShort((extra - player.pSac.dims.extraTime) * 10 * getEC12Mult()) : "") + " left until matter reset)"
		element2.innerHTML = txt
	}
	var element3 = document.getElementById("chall13Mult");
	if (isADSCRunning()) {
		var mult = getProductBoughtMult()
		element3.innerHTML = formatValue(player.options.notation, productAllTotalBought(), 2, 1) + 'x multiplier on all dimensions (product of '+(player.tickspeedBoosts!=undefined&&(inNC(13)||player.currentChallenge=="postc1")?"1+log10(amount)":"bought")+(mult==1?"":"*"+shorten(mult))+').'
	}
	if (inNC(14) && player.aarexModifications.ngmX > 3) document.getElementById("c14Resets").textContent = "You have "+getFullExpansion(10-getTotalResets())+" resets left."
	if (player.pSac !== undefined) document.getElementById("ec12Mult").textContent = "Time speed: 1 / " + shorten(getEC12Mult()) + "x"
}

function updateCoinPerSec() {
	var element = document.getElementById("coinsPerSec");
	var ret = getDimensionProductionPerSecond(1)
	if (player.pSac !== undefined) ret = ret.div(getEC12Mult())
	element.textContent = 'You are getting ' + shortenND(ret) + ' antimatter per second.'
}

var clickedAntimatter
function onAntimatterClick() {
	clickedAntimatter++
	if (!tmp.ngp3l && clickedAntimatter >= 10) giveAchievement("This is NOT a clicker game!")
}

function getInfinitiedStat(){
	return getInfinitied()
}

function getInfinitied() {
	return nMx(nA(player.infinitied,player.infinitiedBank),0)
}

function getInfinitiedGain() {
	let infGain=1
	if (player.thisInfinityTime > 50 && player.achievements.includes("r87")) infGain=250
	if (player.timestudy.studies.includes(32)) infGain*=tsMults[32]()
	if (player.achievements.includes("r133") && player.meta) infGain=nM(player.dilation.dilatedTime.pow(.25).max(1),infGain)
	return infGain
}

function getEternitied() {
	let banked = player.eternitiesBank
	let total = player.eternities
	if (banked !== undefined && (inQC(0) || hasNU(10))) total = nA(total, player.eternitiesBank)
	return total
}

function galaxyReset(bulk) {
    if (tmp.ri) return
    if (autoS) auto = false;
    autoS = true;
    if (player.sacrificed == 0 && bulk > 0) giveAchievement("I don't believe in Gods");
    if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
    player = {
        money: player.achievements.includes("r111") ? player.money : new Decimal(10),
        tickSpeedCost: new Decimal(1000),
        tickBoughtThisInf: updateTBTIonGalaxy(),
        firstCost: new Decimal(10),
        secondCost: new Decimal(100),
        thirdCost: new Decimal(10000),
        fourthCost: new Decimal(1000000),
        fifthCost: new Decimal(1e9),
        sixthCost: new Decimal(1e13),
        seventhCost: new Decimal(1e18),
        eightCost: new Decimal(1e24),
        firstAmount: new Decimal(0),
        secondAmount: new Decimal(0),
        thirdAmount: new Decimal(0),
        fourthAmount: new Decimal(0),
        firstBought: 0,
        secondBought: 0,
        thirdBought: 0,
        fourthBought: 0,
        fifthAmount: new Decimal(0),
        sixthAmount: new Decimal(0),
        seventhAmount: new Decimal(0),
        eightAmount: new Decimal(0),
        fifthBought: 0,
        sixthBought: 0,
        seventhBought: 0,
        eightBought: 0,
        boughtDims: player.boughtDims,
        totalBoughtDims: resetTotalBought(),
        firstPow: new Decimal(1),
        secondPow: new Decimal(1),
        thirdPow: new Decimal(1),
        fourthPow: new Decimal(1),
        fifthPow: new Decimal(1),
        sixthPow: new Decimal(1),
        seventhPow: new Decimal(1),
        eightPow: new Decimal(1),
        sacrificed: new Decimal(0),
        achievements: player.achievements,
        challenges: player.challenges,
        currentChallenge: player.currentChallenge,
        infinityUpgrades: player.infinityUpgrades,
        infinityUpgradesRespecced: player.infinityUpgradesRespecced,
        setsUnlocked: player.setsUnlocked,
        infinityPoints: player.infinityPoints,
        infinitied: player.infinitied,
        infinitiedBank: player.infinitiedBank,
        totalTimePlayed: player.totalTimePlayed,
        bestInfinityTime: player.bestInfinityTime,
        thisInfinityTime: player.thisInfinityTime,
        resets: player.achievements.includes("ng3p55") ? player.resets : 0,
        dbPower: player.dbPower,
        tdBoosts: resetTDBoosts(),
        tickspeedBoosts: player.tickspeedBoosts,
        galaxies: player.galaxies + bulk,
        pSac: player.pSac,
        galacticSacrifice: player.galacticSacrifice,
        totalmoney: player.totalmoney,
        interval: null,
        lastUpdate: player.lastUpdate,
        achPow: player.achPow,
        newsArray: player.newsArray,
        autobuyers: player.autobuyers,
        costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
        tickspeedMultiplier: new Decimal(10),
        chall2Pow: player.chall2Pow,
        chall3Pow: new Decimal(0.01),
        matter: new Decimal(0),
        chall11Pow: new Decimal(1),
        partInfinityPoint: player.partInfinityPoint,
        partInfinitied: player.partInfinitied,
        break: player.break,
        challengeTimes: player.challengeTimes,
        infchallengeTimes: player.infchallengeTimes,
        lastTenRuns: player.lastTenRuns,
        lastTenEternities: player.lastTenEternities,
        infMult: player.infMult,
        infMultCost: player.infMultCost,
        tickSpeedMultDecrease: player.tickSpeedMultDecrease,
        tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
        dimensionMultDecrease: player.dimensionMultDecrease,
        dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
        extraDimPowerIncrease: player.extraDimPowerIncrease,
        dimPowerIncreaseCost: player.dimPowerIncreaseCost,
        version: player.version,
        overXGalaxies: player.overXGalaxies,
        overXGalaxiesTickspeedBoost: player.overXGalaxiesTickspeedBoost,
        singularity: player.singularity,
        dimtechs: player.dimtechs,
        spreadingCancer: player.spreadingCancer,
        infDimensionsUnlocked: player.infDimensionsUnlocked,
        infinityPower: player.infinityPower,
        postChallUnlocked: player.postChallUnlocked,
        postC4Tier: 1,
        postC8Mult: new Decimal(1),
        infinityDimension1: player.infinityDimension1,
        infinityDimension2: player.infinityDimension2,
        infinityDimension3: player.infinityDimension3,
        infinityDimension4: player.infinityDimension4,
        infinityDimension5: player.infinityDimension5,
        infinityDimension6: player.infinityDimension6,
        infinityDimension7: player.infinityDimension7,
        infinityDimension8: player.infinityDimension8,
        infDimBuyers: player.infDimBuyers,
        timeShards: player.timeShards,
        tickThreshold: player.tickThreshold,
        timeDimension1: player.timeDimension1,
        timeDimension2: player.timeDimension2,
        timeDimension3: player.timeDimension3,
        timeDimension4: player.timeDimension4,
        timeDimension5: player.timeDimension5,
        timeDimension6: player.timeDimension6,
        timeDimension7: player.timeDimension7,
        timeDimension8: player.timeDimension8,
        eternityPoints: player.eternityPoints,
        eternities: player.eternities,
        eternitiesBank: player.eternitiesBank,
        thisEternity: player.thisEternity,
        bestEternity: player.bestEternity,
        eternityUpgrades: player.eternityUpgrades,
        epmult: player.epmult,
        epmultCost: player.epmultCost,
        totalTickGained: player.totalTickGained,
        offlineProd: player.offlineProd,
        offlineProdCost: player.offlineProdCost,
        challengeTarget: player.challengeTarget,
        autoSacrifice: player.autoSacrifice,
        replicanti: player.replicanti,
        timestudy: player.timestudy,
        eternityChalls: player.eternityChalls,
        eternityChallGoal: player.eternityChallGoal,
        currentEternityChall: player.currentEternityChall,
        eternityChallUnlocked: player.eternityChallUnlocked,
        etercreq: player.etercreq,
        autoIP: player.autoIP,
        autoTime: player.autoTime,
        infMultBuyer: player.infMultBuyer,
        autoCrunchMode: player.autoCrunchMode,
        autoEterMode: player.autoEterMode,
        peakSpent: player.peakSpent,
        respec: player.respec,
        respecMastery: player.respecMastery,
        eternityBuyer: player.eternityBuyer,
        eterc8ids: player.eterc8ids,
        eterc8repl: player.eterc8repl,
        dimlife: player.dimlife,
        dead: player.dead,
        dilation: player.dilation,
        exdilation: player.exdilation,
        blackhole: player.blackhole,
        blackholeDimension1: player.blackholeDimension1,
        blackholeDimension2: player.blackholeDimension2,
        blackholeDimension3: player.blackholeDimension3,
        blackholeDimension4: player.blackholeDimension4,
        blackholeDimension5: player.blackholeDimension5,
        blackholeDimension6: player.blackholeDimension6,
        blackholeDimension7: player.blackholeDimension7,
        blackholeDimension8: player.blackholeDimension8,
        why: player.why,
        shameLevel: player.shameLevel,
        options: player.options,
        meta: player.meta,
        masterystudies: player.masterystudies,
        autoEterOptions: player.autoEterOptions,
        galaxyMaxBulk: player.galaxyMaxBulk,
        quantum: tmp.qu,
        old: player.old,
        dontWant: player.dontWant,
        ghostify: player.ghostify,
        aarexModifications: player.aarexModifications
    };

    if (inNC(10) || player.currentChallenge == "postc1") {
        player.thirdCost = new Decimal(100)
        player.fourthCost = new Decimal(500)
        player.fifthCost = new Decimal(2500)
        player.sixthCost = new Decimal(2e4)
        player.seventhCost = new Decimal(2e5)
        player.eightCost = new Decimal(4e6)
    }
	if (player.pSac !== undefined) {
		resetInfDimensions()
		player.pSac.dims.extraTime=0
	}
    resetTDs()
    reduceDimCosts()
    skipResets()
    if (player.currentChallenge == "postc2") {
        player.eightAmount = new Decimal(1);
        player.eightBought = 1;
        player.resets = 4;
    }
	
    setInitialDimensionPower();


    if (player.options.notation == "Emojis") player.spreadingCancer+=bulk
    if (player.spreadingCancer >= 10) giveAchievement("Spreading Cancer")
    if (player.spreadingCancer >= 1000000) giveAchievement("Cancer = Spread")
    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));
    divideTickspeedIC5()

    if (player.infinitied < 1 && player.eternities == 0 && !quantumed) {
        document.getElementById("sacrifice").style.display = "none"
        document.getElementById("confirmation").style.display = "none"
        if (player.galacticSacrifice && (player.galaxies > 0 || (player.galacticSacrifice ? player.galacticSacrifice.times > 0 : false))) {
            document.getElementById("gSacrifice").style.display = "inline-block"
            document.getElementById("gConfirmation").style.display = "inline-block"
        }
    }
    if (player.galaxies >= 50) giveAchievement("YOU CAN GET 50 GALAXIES!??")
    if (player.galaxies >= 2) giveAchievement("Double Galaxy");
    if (player.galaxies >= 1) giveAchievement("You got past The Big Wall");
    if (!player.achievements.includes("r111")) setInitialMoney()
    if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.galaxies >= 540 && player.replicanti.galaxies == 0) giveAchievement("Unique snowflakes")
    if (!player.achievements.includes("ngpp18")) checkUniversalHarmony()
    if (tmp.ngp3 && bulk) {
        if (tmp.qu.autoOptions.sacrifice) sacrificeGalaxy(6, true)
        if (tmp.qu.bigRip.active) tmp.qu.bigRip.bestGals = Math.max(tmp.qu.bigRip.bestGals, player.galaxies)
	    if (ghostified && player.ghostify.neutrinos.boosts) gainNeutrinos(bulk, "gen")
    }
    hideDimensions()
    tmp.tickUpdate = true;
}

document.getElementById("secondSoftReset").onclick = function() {
	var bool = !inNC(11) && player.currentChallenge != "postc1" && (player.currentChallenge != "postc5" || player.tickspeedBoosts == undefined) && player.currentChallenge != "postc7" && !((player.currentEternityChall == "eterc6" || inQC(6)) && !tmp.be) && !tmp.ri && !cantReset()
	if (getAmount(inNC(4)||player.pSac!=undefined?6:8) >= getGalaxyRequirement() && bool) {
		if ((getEternitied() >= 7 || player.autobuyers[10].bulkBought) && !shiftDown && (!inNC(14) || !(player.aarexModifications.ngmX > 3))) maxBuyGalaxies(true);
		else galaxyReset(1)
	}
}

function getGalaxyRequirement(offset = 0, display) {
	tmp.grd = {} //Galaxy requirement data
	tmp.grd.galaxies = player.galaxies + offset
	let mult = getGalaxyReqMultiplier()
	let base = tmp.grd.galaxies * mult
	let amount = 80 + base
	let scaling = 0
	if (player.galacticSacrifice != undefined) amount -= (player.galacticSacrifice.upgrades.includes(22) && player.galaxies > 0) ? 80 : 60
	else if (inNC(6, 1) && player.aarexModifications.ngexV != undefined && tmp.grd.galaxies < 2) amount -= tmp.grd.galaxies == 1 ? 40 : 50
	if (player.aarexModifications.ngmX > 3) amount -= 10
	if (inNC(6, 1) && player.aarexModifications.ngexV != undefined && tmp.grd.galaxies >= 2) amount -= 2 * mult
	if (inNC(4) || player.pSac !== undefined) amount = player.tickspeedBoosts == undefined ? 99 + base : amount + (player.aarexModifications.ngmX > 3 ? 20 : -30)
	if (tmp.be) {
		amount *= 50
		if (tmp.qu.breakEternity.upgrades.includes(2)) amount /= getBreakUpgMult(2)
		if (player.currentEternityChall=="eterc10"&&tmp.qu.breakEternity.upgrades.includes(9)) amount /= getBreakUpgMult(9)
	}
	if (!player.boughtDims) {
		tmp.grd.speed = 1
		let ghostlySpeed = tmp.be ? 55 : 1
		let div = 1e4
		if (tmp.grd.galaxies >= 302500 / ghostlySpeed) {
			if (player.ghostify.ghostlyPhotons.enpowerments > 1 && tmp.be) div *= tmp.le[8]
			tmp.grd.speed = Math.pow(2, (tmp.grd.galaxies + 1 - 302500 / ghostlySpeed) * ghostlySpeed / div)
			scaling = 5
		}

		let distantStart = getDistantScalingStart()
		if (tmp.grd.galaxies >= distantStart) {
			let speed = tmp.grd.speed
			if (GUBought("rg6")) speed *= 0.867
			if (GUBought("gb6")) speed /= 1+Math.pow(player.infinityPower.max(1).log10(),0.25)/2810
			if (GUBought("br6")) speed /= 1+player.meta.resets/340
			if (ghostified) if (player.ghostify.neutrinos.boosts > 5) speed /= tmp.nb[5]
			amount += getDistantAdd(tmp.grd.galaxies-distantStart+1)*speed
			if (tmp.grd.galaxies>=distantStart*2.5&&player.galacticSacrifice!=undefined) {
				// 5 times worse scaling
				amount += 4*speed*getDistantAdd(tmp.grd.galaxies-distantStart*2.5+1)
				scaling = Math.max(scaling, 2)
			} else scaling = Math.max(scaling, 1)
		}

		let remoteStart = getRemoteScalingStart()
		if (tmp.grd.galaxies >= remoteStart && !tmp.be && !hasNU(6)) {
			let speed2 = tmp.grd.speed
			if (GUBought("rg7")) speed2 *= 0.9
			if (GUBought("gb7")) speed2 /= 1+Math.log10(1+player.infinityPoints.max(1).log10())/100
			if (GUBought("br7")) speed2 /= 1+Math.log10(1+player.eternityPoints.max(1).log10())/80
			amount *= Math.pow(1 + (GUBought("rg1") ? 1 : 2) / (player.aarexModifications.ngmX > 3 ? 10 : 1e3), (tmp.grd.galaxies - remoteStart + 1) * speed2)
			scaling = Math.max(scaling, 3)
		}

		if (tmp.grd.galaxies >= tmp.grd.darkStart) scaling = Math.max(scaling, 4)
	}
	amount = Math.ceil(amount)

	if (player.infinityUpgrades.includes("resetBoost")) amount -= 9
	if (player.challenges.includes("postc5")) amount -= 1
	if (player.infinityUpgradesRespecced != undefined) amount -= getInfUpgPow(6)
	if (display) return {amount: amount, scaling: scaling}
	return amount
}

function getGalaxyReqMultiplier() {
	if (inNC(6, 1) && player.aarexModifications.ngexV != undefined && tmp.grd.galaxies <= 2) return 0
	if (player.currentChallenge == "postcngmm_1") return 60
	let ret = 60
	if (player.galacticSacrifice !== undefined) {
		if (player.galacticSacrifice.upgrades.includes(22)) ret -= 30
	} else if (player.timestudy.studies.includes(42)) ret *= tsMults[42]()
	if (inNC(4)) ret = 90
	if (player.infinityUpgrades.includes("galCost")) ret -= 5
	if (player.infinityUpgrades.includes("postinfi52") && player.tickspeedBoosts == undefined) ret -= 3
	if (player.dilation.upgrades.includes("ngmm12")) ret -= 10
	if (player.galacticSacrifice !== undefined && player.timestudy.studies.includes(42)) ret *= tsMults[42]()
	return ret
}

function getDistantScalingStart() {
	if (player.currentEternityChall == "eterc5") return 0
	var n = 100+getECReward(5)
	if (player.timestudy.studies.includes(223)) n += 7
	if (player.timestudy.studies.includes(224)) n += Math.floor(player.resets/2000)
	if (tmp.ngp3) if (tmp.qu.bigRip.active && tmp.qu.bigRip.upgrades.includes(15)) n += tmp.bru[15]
	if (player.dilation.upgrades.includes("ngmm11")) n += 25

	if (tmp.grd.galaxies >= tmp.grd.darkStart) {
		let push = 5 / tmp.grd.speed
		if (GUBought("rg5")) push *= 1.13
		if (GUBought("gb5")) push *= 1+Math.sqrt(player.replicanti.galaxies)/550
		if (GUBought("br5")) push *= 1+Math.min(Math.sqrt(player.dilation.tachyonParticles.max(1).log10())*0.013,0.14)
		n -= Math.ceil((tmp.grd.galaxies - tmp.grd.darkStart + 1) / push)
	}

	if (tmp.grd.speed == 1) return Math.max(n, 0)
	return n
}

function getDistantAdd(x) {
	if (player.galacticSacrifice!==undefined&&player.tickspeedBoosts==undefined) return Math.pow(x,1.5)+x
	return (x+1)*x
}

function getRemoteScalingStart(galaxies) {
	var n = 800
	if (player.aarexModifications.ngmX > 3) n = 6
	else if (player.galacticSacrifice != undefined) n += 1e7
	if (tmp.ngp3) {
		for (var t=251;t<254;t++) if (player.masterystudies.includes("t"+t)) n += getMTSMult(t)
		if (player.masterystudies.includes("t301")) n += getMTSMult(301)
		if (player.masterystudies.includes("d12") && !hasBosonicUpg(22)) n += getNanofieldRewardEffect(7, "remote")
		if (galaxies > 1/0 && !tmp.be) n -= galaxies - 1/0
	}
	return n
}

var worstChallengeTime = 1
var worstChallengeBonus = 1

function updateWorstChallengeTime() {
    	worstChallengeTime = 1
    	for (var i=0; i<getTotalNormalChallenges(); i++) worstChallengeTime = Math.max(worstChallengeTime, player.challengeTimes[i])
}

function updateWorstChallengeBonus() {
	updateWorstChallengeTime()
	worstChallengeBonus=Decimal.max(Math.pow(3000/Math.max(33e-6,worstChallengeTime*0.1),player.galacticSacrifice?2:1),1)
}

function sacrificeConf() {
    	document.getElementById("confirmation").checked = player.options.sacrificeConfirmation
    	player.options.sacrificeConfirmation = !player.options.sacrificeConfirmation
    	document.getElementById("sacConfirmBtn").textContent = "Sacrifice confirmation: O" + (player.options.sacrificeConfirmation ? "N" : "FF")
}

function getDilPower() {
	var ret = Decimal.pow(getDil3Power(), getDilUpgPower(3))
	if (player.dilation.upgrades.includes("ngud1")) ret = getD18Bonus().times(ret)
	if (tmp.ngp3) {
		if (player.achievements.includes("ng3p11") && !tmp.ngp3l) ret = ret.times(Math.max(getTotalRG() / 125, 1))
		if (player.masterystudies.includes("t264")) ret = ret.times(getMTSMult(264))
		if (GUBought("br1")) ret = ret.times(getBR1Effect())
		if (player.masterystudies.includes("t341")) ret = ret.times(getMTSMult(341))
	}
	return ret
}

function getDilUpgPower(x) {
	let r=player.dilation.rebuyables[x]||0
	if (player.aarexModifications.nguspV) r+=exDilationUpgradeStrength(x)
	else if (player.exdilation!=undefined&&!player.aarexModifications.ngudpV) r*=exDilationUpgradeStrength(x)
	return r
}

function getDil3Power() {
	let ret = 3
	if (player.aarexModifications.nguspV) ret += getDilUpgPower(4) / 2
	return ret
}

function getDilationTPFormulaExp(disable){
	return getDilExp(disable)
}

function getDilExp(disable) {
	let ret = 1.5
	if (player.aarexModifications.newGameExpVersion) ret += .001
	if (player.meta !== undefined && !player.aarexModifications.nguspV) ret += getDilUpgPower(4) / 4
	if (tmp.ngp3) {
		if ((!tmp.qu.bigRip.active || tmp.qu.bigRip.upgrades.includes(11)) && player.masterystudies.includes("d13") && disable != "TU3") ret += getTreeUpgradeEffect(2)
		if (ghostified && player.ghostify.neutrinos.boosts && disable != "neutrinos") ret += tmp.nb[0]
	}
	return ret
}

function getTotalTPGain(){
	return getDilGain()
}

function getTotalTachyonParticleGain(){
	return getDilGain()
}

function getDilGain() {
	if (inQCModifier("ad")) return new Decimal(0)
	if (player.money.lt(10)) return new Decimal(0)
	var log = Math.log10(player.money.log10()/400)*getDilExp()+getDilPower().log10()
	return Decimal.pow(10,log).floor()
}

function getNGUDTGain(){
	var gain = new Decimal(1)
	gain = gain.times(getBlackholePowerEffect())
	if (player.eternityUpgrades.includes(7)) gain = gain.times(1 + Math.log10(Math.max(1, player.money.log(10))) / 40)
	if (player.eternityUpgrades.includes(8)) gain = gain.times(1 + Math.log10(Math.max(1, player.infinityPoints.log(10))) / 20)
	if (player.eternityUpgrades.includes(9)) gain = gain.times(1 + Math.log10(Math.max(1, player.eternityPoints.log(10))) / 10)
	return gain
}

function getDilatedTimeGainPerSecond(){
	return getDilTimeGainPerSecond()
}

function getEternityBoostToDT(){
	var gain = new Decimal(1)
	let eterExp = getEternitiesAndDTBoostExp()
	if (eterExp > 0) gain = gain.times(Decimal.max(getEternitied(), 1).pow(eterExp))
	if (player.dilation.upgrades.includes('ngpp2') && player.aarexModifications.newGameExpVersion) {
		let e = new Decimal(getEternitied())
		gain = gain.times(e.max(10).log10()).times(Math.pow(e.max(1e7).log10()-6,3))
		if (e.gt(5e14)) gain = gain.times(Math.sqrt(e.log10())) // this comes into play at the grind right before quantum
	}
	return gain
}

function getDilTimeGainPerSecond() {
	let tp = player.dilation.tachyonParticles
	let exp = GUBought("br3")?1.1:1
	if (ghostified && player.ghostify.ghostlyPhotons.unl) exp*=tmp.le[0]
	let gain = tp.pow(exp).times(Decimal.pow(2, getDilUpgPower(1)))
	
	if (player.exdilation != undefined) gain = gain.times(getNGUDTGain())
	gain = gain.times(getEternityBoostToDT())
	
	
	if (player.dilation.upgrades.includes('ngpp6')) gain = gain.times(getDil17Bonus())
	if (player.dilation.upgrades.includes('ngusp3')) gain = gain.times(getD22Bonus())
	if (tmp.ngp3 ? !tmp.qu.bigRip.active || tmp.qu.bigRip.upgrades.includes(11) : false) {
		if (player.achievements.includes("ng3p11") && !tmp.ngp3l) gain = gain.times(Math.max(player.galaxies / 600 + 0.5, 1))
		if (player.achievements.includes("ng3p41") && !tmp.ngp3l) gain = gain.times(Decimal.pow(4,Math.sqrt(player.quantum.nanofield.rewards)))
		if (player.masterystudies.includes("t263")) gain = gain.times(getMTSMult(263))
		if (player.masterystudies.includes("t281")) gain = gain.times(getMTSMult(281))
		gain = gain.times(tmp.qcRewards[1])
		if (player.masterystudies.includes("t322")) gain = gain.times(getMTSMult(322))
		if (player.masterystudies.includes("t341")) gain = gain.times(getMTSMult(341))
		gain = gain.times(getTreeUpgradeEffect(7))
		gain = gain.times(colorBoosts.b)
		if (GUBought("br2")) gain = gain.times(Decimal.pow(2.2, Math.pow(tmp.sacPow.max(1).log10()/1e6, 0.25)))
		if (!tmp.ngp3l) gain = gain.times(Math.max((player.replicanti.amount.log10()-2e4)/8e3+1,1))
	}
	if (hasBosonicUpg(15)) gain = gain.times(tmp.blu[15].dt)
	if (tmp.newNGP3E && player.achievements.includes("r138") && gain.lt(1e100)) gain = gain.times(3)
	if (!tmp.ngp3l && (tmp.ngp3 || tmp.newNGP3E) && player.achievements.includes("ngpp13")) gain = gain.times(2)
	
	var lgain = gain.log10()
	if (tmp.be && lgain > 4000){
		lgain = doWeakerPowerReductionSoftcapNumber(lgain, 4000, .6)
		lgain = doWeakerPowerReductionSoftcapNumber(lgain, 5000, .4)
		lgain = doWeakerPowerReductionSoftcapNumber(lgain, 6000, .2)
	}
	
	return Decimal.pow(10,lgain)
	
}

function getEternitiesAndDTBoostExp() {
	let exp = 0
	if (player.dilation.upgrades.includes('ngpp2')) exp += player.aarexModifications.ngudpV ? .2 : .1
	if (player.dilation.upgrades.includes('ngud2')) exp += .1
	if (player.dilation.upgrades.includes('ngmm3')) exp += .1
	return exp
}

//DISPLAY FUNCTIONS

function dimShiftDisplay(){
	var shiftRequirement = getShiftRequirement(0);
        var isShift = player.resets < (inNC(4) || player.currentChallenge == "postc1" || player.pSac !== undefined ? 2 : 4)
       	document.getElementById("resetLabel").textContent = 'Dimension ' + (isShift ? "Shift" : player.resets < getSupersonicStart() ? "Boost" : "Supersonic") + ' ('+ getFullExpansion(Math.ceil(player.resets)) +'): requires ' + getFullExpansion(Math.ceil(shiftRequirement.amount)) + " " + DISPLAY_NAMES[shiftRequirement.tier] + " Dimensions"
        document.getElementById("softReset").textContent = "Reset the game for a " + (isShift ? "new dimension" : "boost")
}

function tickspeedBoostDisplay(){
	if (isTickspeedBoostPossible()) {
		var tickReq = getTickspeedBoostRequirement()
		document.getElementById("tickReset").style.display = ""
		document.getElementById("tickResetLabel").textContent = "Tickspeed Boost ("+getFullExpansion(player.tickspeedBoosts)+"): requires "+getFullExpansion(tickReq.amount)+" "+DISPLAY_NAMES[tickReq.tier]+" Dimensions"
		document.getElementById("tickResetBtn").className = getAmount(tickReq.tier)<tickReq.amount ? "unavailablebtn" : "storebtn"
	} else document.getElementById("tickReset").style.display = "none"
}

function galaxyReqDisplay(){
	var nextGal = getGalaxyRequirement(0, true)
        var totalReplGalaxies = getTotalRG()
      	var totalTypes = tmp.aeg ? 4 : player.dilation.freeGalaxies ? 3 : totalReplGalaxies ? 2 : 1
        document.getElementById("secondResetLabel").innerHTML = getGalaxyScaleName(nextGal.scaling) + (nextGal.scaling <= 3 ? "Antimatter " : "") + ' Galaxies ('+ getFullExpansion(player.galaxies) + (totalTypes > 1 ? ' + ' + getFullExpansion(totalReplGalaxies) : '') + (totalTypes > 2 ? ' + ' + getFullExpansion(Math.round(player.dilation.freeGalaxies)) : '') + (totalTypes > 3 ? ' + ' + getFullExpansion(tmp.aeg) : '') +'): requires ' + getFullExpansion(nextGal.amount) + ' '+DISPLAY_NAMES[inNC(4) || player.pSac != undefined ? 6 : 8]+' Dimensions'
}

var galaxyScalings = ["", "Distant ", "Further ", "Remote ", "Dark Matter ", "Ghostly ", "Ethereal ", "Ethereal+ ", "Ethereal++ ", "Ethereal IV ", "Ethereal V "]
function getGalaxyScaleName(x) {
	return galaxyScalings[x]
}

function intergalacticDisplay(){
	var shiftRequirement = getShiftRequirement(0);
	if (player.achievements.includes("ng3p37") && shiftRequirement.tier > 7) {
		document.getElementById("intergalacticLabel").parentElement.style.display = ""
		document.getElementById("intergalacticLabel").innerHTML = getGalaxyScaleName(tmp.igs) + 'Intergalactic Boost ' + (player.dilation.active || player.galacticSacrifice != undefined ? " (estimated)" : "") + " (" + getFullExpansion(player.galaxies) + (Math.floor(tmp.igg - player.galaxies) > 0 ? " + " + getFullExpansion(Math.floor(tmp.igg - player.galaxies)) : "") + "): " + shorten(dilates(tmp.ig).pow(player.dilation.active?getNanofieldRewardEffect(5):1)) + 'x to Eighth Dimensions'
	} else document.getElementById("intergalacticLabel").parentElement.style.display = "none"
}

function dimensionTabDisplay(){
	var shown
        for (let tier = 8; tier > 0; tier--) {
		shown = shown || canBuyDimension(tier)
           	var name = TIER_NAMES[tier];
            	if (shown) {
			document.getElementById(tier+"Row").style.display = ""
               		document.getElementById("D"+tier).childNodes[0].nodeValue = DISPLAY_NAMES[tier] + " Dimension x" + formatValue(player.options.notation, getDimensionFinalMultiplier(tier), 2, 1)
               		document.getElementById("A"+tier).textContent = getDimensionDescription(tier)
            	}
       	}
	setAndMaybeShow("mp10d",player.aarexModifications.newGameMult,"'Multiplier per 10 dimensions: '+shorten(getDimensionPowerMultiplier(\"non-random\"))+'x'")
	dimShiftDisplay()
	tickspeedBoostDisplay()
	galaxyReqDisplay()
	intergalacticDisplay()
}

function tickspeedDisplay(){
	if (canBuyDimension(3) || player.currentEternityChall == "eterc9") {
		var tickmult = tmp.tsReduce
		var tickmultNum = tickmult.toNumber()
		var ticklabel
		var e = Math.floor(Math.log10(Math.round(1/tickmultNum)))
		if (isNaN(tickmultNum)) ticklabel = 'Break the tick interval by Infinite';
		else if (e >= 9) ticklabel = "Divide the tick interval by " + shortenDimensions(Decimal.recip(tickmult))
		else ticklabel = 'Reduce the tick interval by ' + ((1 - tickmultNum) * 100).toFixed(e) + '%'
		let ic3mult=getPostC3Mult()
		if (player.galacticSacrifice || player.currentChallenge == "postc3" || isIC3Trapped()) document.getElementById("tickLabel").innerHTML = ((isIC3Trapped() || player.currentChallenge == "postc3") && player.currentChallenge != "postcngmm_3" && !player.challenges.includes("postcngmm_3") && !tmp.be ? "M" : ticklabel + '<br>and m') + 'ultiply all dimensions by ' + (ic3mult>999.95?shorten(ic3mult):new Decimal(ic3mult).toNumber().toPrecision(4)) + '.'
		else document.getElementById("tickLabel").textContent = ticklabel + '.'

		document.getElementById("tickSpeed").style.visibility = "visible";
		document.getElementById("tickSpeedMax").style.visibility = "visible";
		document.getElementById("tickLabel").style.visibility = "visible";
		document.getElementById("tickSpeedAmount").style.visibility = "visible";
	} else {
		document.getElementById("tickSpeed").style.visibility = "hidden";
		document.getElementById("tickSpeedMax").style.visibility = "hidden";
		document.getElementById("tickLabel").style.visibility = "hidden";
		document.getElementById("tickSpeedAmount").style.visibility = "hidden";
	}
}

function paradoxDimDisplay(){
	document.getElementById("pPow").textContent = shortenMoney(player.pSac.dims.power)
	document.getElementById("pPowProduction").textContent = "You are getting " + shortenDimensions(getPDProduction(1).div(getEC12Mult())) + " Paradox Power per second."
	document.getElementById("pPowEffect").textContent = getFullExpansion(Math.floor(getExtraTime() * getEC12Mult()))
	var shown
	for (let t = 8; t > 0; t--) {
		shown = shown || isDimUnlocked(t)
		document.getElementById("pR"+t).style.display = shown ? "" : "none"
		if (shown) {
			document.getElementById("pD"+t).textContent = DISPLAY_NAMES[t] + " Paradox Dimension x" + shortenMoney(getPDPower(t))
			document.getElementById("pB"+t).textContent = "Cost: " + shortenDimensions(player.pSac.dims[t].cost) + " Px"
			document.getElementById("pB"+t).className = (player.pSac.px.gte(player.pSac.dims[t].cost) ? "stor" : "unavailabl") + "ebtn"
			document.getElementById("pA"+t).textContent = getPDDesc(t)
		}
	}
}

function mainStatsDisplay(){
	document.getElementById("totalmoney").textContent = 'You have made a total of ' + shortenMoney(player.totalmoney) + ' antimatter.'
        document.getElementById("totalresets").textContent = 'You have done ' + getFullExpansion(player.resets) + ' dimension boosts/shifts.'
        setAndMaybeShow("lostResets", player.pSac && player.pSac.lostResets, '"You have lost a total of "+getFullExpansion(player.pSac.lostResets)+" dimension boosts/shifts only after matter exceeded your antimatter."')
        document.getElementById("tdboosts").textContent = player.aarexModifications.ngmX>3?'You have done ' + getFullExpansion(player.tdBoosts) + ' time dimension boosts/shifts.':""
        var showBoosts=isTickspeedBoostPossible()
        document.getElementById("boosts").style.display = showBoosts?'':'none'
        if (showBoosts) document.getElementById("boosts").textContent = 'You have made '+getFullExpansion(player.tickspeedBoosts)+' tickspeed boosts.'
        document.getElementById("galaxies").textContent = 'You have ' + getFullExpansion(player.galaxies) + ' Antimatter Galaxies.'
        var showCancer=player.spreadingCancer>0&&player.galacticSacrifice
        document.getElementById("spreadingCancer").style.display = showCancer?'':'none'
        if (showCancer) document.getElementById("spreadingCancer").textContent = 'You have made '+getFullExpansion(player.spreadingCancer)+' total galaxies while using Cancer notation.'
        document.getElementById("totalTime").textContent = "You have played for " + timeDisplay(player.totalTimePlayed) + "."
}

function paradoxSacDisplay(){
	if (player.pSac !== undefined && player.pSac.times) {
		document.getElementById("psStatistics").style.display = ""
		document.getElementById("pSacrificedNormal").textContent = "You have Paradox Sacrificed "+getFullExpansion(player.pSac.normalTimes)+" times."
		document.getElementById("pSacrificedForced").textContent = "You have been forced to do a Paradox Sacrifice "+getFullExpansion(player.pSac.forcedTimes)+" times."
		document.getElementById("pSacrificed").textContent = "You have Paradox Sacrificed a total of "+getFullExpansion(player.pSac.times)+" times."
		document.getElementById("thisPSac").textContent = "You have spent "+timeDisplay(player.pSac.time)+" in this Paradox Sacrifice."
        } else document.getElementById("psStatistics").style.display = "none"
}

function galaxySacDisplay(){
	if (player.galacticSacrifice ? player.galacticSacrifice.times < 1 : true) document.getElementById("gsStatistics").style.display = "none"
        else {
            document.getElementById("gsStatistics").style.display = ""
            document.getElementById("sacrificed").textContent = "You have galactic sacrificed "+getFullExpansion(player.galacticSacrifice.times)+" times."
            document.getElementById("thisSacrifice").textContent = "You have spent "+timeDisplay(player.galacticSacrifice.time)+" in this galactic sacrifice."
        }
}

function bestInfinityDisplay(){
	document.getElementById("infinityStatistics").style.display = "none"
        if (player.bestInfinityTime==9999999999) {
            document.getElementById("bestInfinity").textContent = ""
            document.getElementById("thisInfinity").textContent = ""
            document.getElementById("infinitied").textContent = ""
        } else {
            document.getElementById("infinityStatistics").style.display = ""
            document.getElementById("bestInfinity").textContent = "Your fastest Infinity is in " + timeDisplay(player.bestInfinityTime) + "."
            document.getElementById("thisInfinity").textContent = "You have spent " + timeDisplay(player.thisInfinityTime) + " in this Infinity."
            document.getElementById("infinitied").textContent = "You have infinitied " + getFullExpansion(player.infinitied) + " time" + (player.infinitied == 1 ? "" : "s") + (player.eternities!==0||player.eternitiesBank>0 ? " this eternity." : ".")
        }
        if (player.infinitiedBank>0) document.getElementById("infinityStatistics").style.display = ""
}

function bestEternityDisplay(){
	document.getElementById("eternityStatistics").style.display = "none"
        if (player.eternities == 0) {
            document.getElementById("besteternity").textContent = ""
            document.getElementById("thiseternity").textContent = ""
            document.getElementById("eternitied").textContent = ""
        } else {
            document.getElementById("eternityStatistics").style.display = "inline-block"
            document.getElementById("eternitied").textContent = "You have Eternitied " + getFullExpansion(player.eternities) + " time" + (player.eternities == 1 ? "" : "s") + (quantumed ? " this quantum." : ".")
            document.getElementById("besteternity").textContent = "You have spent "+timeDisplay(player.thisEternity)+" in this Eternity."
            document.getElementById("thiseternity").textContent = "Your fastest Eternity is in "+timeDisplay(player.bestEternity)+"."
        }
        if (player.eternitiesBank>0) document.getElementById("eternityStatistics").style.display = ""
}

function bestQuantumDisplay(){
	if (!quantumed) document.getElementById("quantumStatistics").style.display = "none"
        else {
            document.getElementById("quantumStatistics").style.display = ""
            document.getElementById("quantumed").textContent = "You have gone quantum "+getFullExpansion(tmp.qu.times)+" times."
            document.getElementById("thisQuantum").textContent = "You have spent "+timeDisplay(tmp.qu.time)+" in this quantum."
            document.getElementById("bestQuantum").textContent = "Your fastest quantum is in "+timeDisplay(tmp.qu.best)+"."
        }
}

function bestGhostifyDisplay(){
	if (!ghostified) document.getElementById("ghostifyStatistics").style.display = "none"
        else {
            document.getElementById("ghostifyStatistics").style.display = ""
            document.getElementById("ghostified").textContent = "You have became a ghost and passed big ripped universes "+getFullExpansion(player.ghostify.times)+" times."
            document.getElementById("thisGhostify").textContent = "You have spent "+timeDisplay(player.ghostify.time)+" in this Ghostify."
            document.getElementById("bestGhostify").textContent = "Your fastest Ghostify is in "+timeDisplay(player.ghostify.best)+"."
        }
}

function ng3p51Display(){
	if (!player.achievements.includes("ng3p51"))  document.getElementById("bigRipStatistics").style.display = "none"
        else {
		document.getElementById("bigRipStatistics").style.display = ""
            	setAndMaybeShow("bigRipped", tmp.qu.bigRip.times, '"You have big ripped the universe "+getFullExpansion(tmp.qu.bigRip.times)+" times."')
		setAndMaybeShow("bestmoneythisrip", tmp.qu.bigRip.active, "'Your best antimatter for this big rip is ' + shortenMoney(tmp.qu.bigRip.bestThisRun) + '.'")
		document.getElementById("totalmoneybigrip").textContent = 'You have made a total of ' + shortenMoney(tmp.qu.bigRip.totalAntimatter) + ' antimatter in all big rips.'
		document.getElementById("bestgalsbigrip").textContent = 'Your best amount of normal galaxies for all Big Rips is ' + getFullExpansion(tmp.qu.bigRip.bestGals) + "."
	}
}

function dilationStatsDisplay(){
	if (player.dilation.times) document.getElementById("dilated").textContent = "You have succesfully dilated "+getFullExpansion(player.dilation.times)+" times."
        else document.getElementById("dilated").textContent = ""

        if (player.exdilation == undefined ? false : player.exdilation.times > 1) document.getElementById("exdilated").textContent = "You have reversed dilation "+getFullExpansion(player.exdilation.times)+" times."
        else document.getElementById("exdilated").textContent = ""
}

function scienceNumberDisplay(){
	var scale1 = [2.82e-45,1e-42,7.23e-30,5e-21,9e-17,6.2e-11,5e-8,3.555e-6,7.5e-4,1,2.5e3,2.6006e6,3.3e8,5e12,4.5e17,1.08e21,1.53e24,1.41e27,5e32,8e36,1.7e45,1.7e48,3.3e55,3.3e61,5e68,1e73,3.4e80,1e113,Number.MAX_VALUE,new Decimal("1e65000")];
        var scale2 = [" protons."," nucleui."," Hydrogen atoms."," viruses."," red blood cells."," grains of sand."," grains of rice."," teaspoons."," wine bottles."," fridge-freezers."," Olympic-sized swimming pools."," Great Pyramids of Giza."," Great Walls of China."," large asteroids.",
                        " dwarf planets."," Earths."," Jupiters."," Suns."," red giants."," hypergiant stars."," nebulas."," Oort clouds."," Local Bubbles."," galaxies."," Local Groups."," Sculptor Voids."," observable universes."," Dimensions.", " Infinity Dimensions.", " Time Dimensions."];
        var id = 0;
        if (player.money.times(4.22419e-105).gt(2.82e-45)) {
       		if (player.money.times(4.22419e-105).gt(scale1[scale1.length - 1])) id = scale1.length - 1;
                else {
                	while (player.money.times(4.22419e-105).gt(scale1[id])) id++;
                	if (id > 0) id--;
                }
                if (id >= 7 && id < 11) document.getElementById("infoScale").textContent = "If every antimatter were a planck volume, you would have enough to fill " + formatValue(player.options.notation, player.money * 4.22419e-105 / scale1[id], 2, 1) + scale2[id];
                else document.getElementById("infoScale").textContent = "If every antimatter were a planck volume, you would have enough to make " + formatValue(player.options.notation, player.money.times(4.22419e-105).dividedBy(scale1[id]), 2, 1) + scale2[id];
        } else { //does this part work correctly? i doubt it does
                if (player.money.times(1e-54) < 2.82e-45) document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-54 / player.money, 2, 1) + " attometers cubed, you would have enough to make a proton."
                else if (player.money * 1e-63 < 2.82e-45) document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-63 / player.money, 2, 1) + " zeptometers cubed, you would have enough to make a proton."
                else if (player.money * 1e-72 < 2.82e-45) document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-72 / player.money, 2, 1) + " yoctometers cubed, you would have enough to make a proton."
                else document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 4.22419e-105 / player.money, 2, 1) + " planck volumes, you would have enough to make a proton."
        }
}

function infinityRespecedInfinityDisplay(){
	if (setUnlocks.length > player.setsUnlocked) document.getElementById("nextset").textContent = "Next set unlocks at " + formatValue(player.options.notation, setUnlocks[player.setsUnlocked], 2, 0, true) + "."
        document.getElementById("infi1pow").textContent = getFullExpansion(player.infinityUpgradesRespecced[1] * 10)
        document.getElementById("infi1cost").textContent = shortenCosts(Decimal.pow(10, player.infinityUpgradesRespecced[1]))
        document.getElementById("infi1").className = player.infinityPoints.lt(Decimal.pow(10, player.infinityUpgradesRespecced[1])) ? "infinistorebtnlocked" : "infinimultbtn"
        document.getElementById("infi3pow").textContent = formatValue(player.options.notation, getLimit(), 2, 0, true)
        document.getElementById("infi3cost").textContent = shortenCosts(Decimal.pow(10, player.infinityUpgradesRespecced[3]))
       	document.getElementById("infi3").className = player.infinityPoints.lt(Decimal.pow(10, player.infinityUpgradesRespecced[3])) ? "infinistorebtnlocked" : "infinimultbtn"
}

function infinityUpgradesDisplay(){
	if (player.infinityUpgrades.includes("timeMult")) document.getElementById("infi11").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1)) document.getElementById("infi11").className = "infinistorebtn1"
        else document.getElementById("infi11").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("dimMult")) document.getElementById("infi21").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1)) document.getElementById("infi21").className = "infinistorebtn2"
        else document.getElementById("infi21").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("18Mult")) document.getElementById("infi12").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1)&&player.infinityUpgrades.includes("timeMult")) document.getElementById("infi12").className = "infinistorebtn1"
        else document.getElementById("infi12").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("27Mult")) document.getElementById("infi22").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1)&&player.infinityUpgrades.includes("dimMult")) document.getElementById("infi22").className = "infinistorebtn2"
        else document.getElementById("infi22").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("36Mult")) document.getElementById("infi13").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1)&&player.infinityUpgrades.includes("18Mult")) document.getElementById("infi13").className = "infinistorebtn1"
        else document.getElementById("infi13").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("45Mult")) document.getElementById("infi23").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1)&&player.infinityUpgrades.includes("27Mult")) document.getElementById("infi23").className = "infinistorebtn2"
        else document.getElementById("infi23").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("resetBoost")) document.getElementById("infi14").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1)&&player.infinityUpgrades.includes("36Mult")) document.getElementById("infi14").className = "infinistorebtn1"
        else document.getElementById("infi14").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("galaxyBoost")) document.getElementById("infi24").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(2)&&player.infinityUpgrades.includes("45Mult")) document.getElementById("infi24").className = "infinistorebtn2"
        else document.getElementById("infi24").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("timeMult2")) document.getElementById("infi31").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(3)) document.getElementById("infi31").className = "infinistorebtn3"
        else document.getElementById("infi31").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("unspentBonus")) document.getElementById("infi32").className = "infinistorebtnbought"
        else if (player.infinityUpgrades.includes("timeMult2") && player.infinityPoints.gte(5)) document.getElementById("infi32").className = "infinistorebtn3"
        else document.getElementById("infi32").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("resetMult")) document.getElementById("infi33").className = "infinistorebtnbought"
        else if (player.infinityUpgrades.includes("unspentBonus") && player.infinityPoints.gte(7)) document.getElementById("infi33").className = "infinistorebtn3"
        else document.getElementById("infi33").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("passiveGen")) document.getElementById("infi34").className = "infinistorebtnbought"
        else if (player.infinityUpgrades.includes("resetMult") && player.infinityPoints.gte(10)) document.getElementById("infi34").className = "infinistorebtn3"
        else document.getElementById("infi34").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset1")) document.getElementById("infi41").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(20)) document.getElementById("infi41").className = "infinistorebtn4"
        else document.getElementById("infi41").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset2")) document.getElementById("infi42").className = "infinistorebtnbought"
        else if (player.infinityUpgrades.includes("skipReset1") && player.infinityPoints.gte(40)) document.getElementById("infi42").className = "infinistorebtn4"
        else document.getElementById("infi42").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset3")) document.getElementById("infi43").className = "infinistorebtnbought"
        else if (player.infinityUpgrades.includes("skipReset2") && player.infinityPoints.gte(80)) document.getElementById("infi43").className = "infinistorebtn4"
        else document.getElementById("infi43").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipResetGalaxy")) document.getElementById("infi44").className = "infinistorebtnbought"
        else if (player.infinityUpgrades.includes("skipReset3") && player.infinityPoints.gte(500)) document.getElementById("infi44").className = "infinistorebtn4"
        else document.getElementById("infi44").className = "infinistorebtnlocked"
        document.getElementById("infi11").innerHTML = "Normal dimensions gain a multiplier based on time played <br>Currently: " + (infUpg11Pow()).toFixed(2) + "x<br>Cost: 1 IP"
        document.getElementById("infi12").innerHTML = "First and Eighth Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
       	document.getElementById("infi13").innerHTML = "Third and Sixth Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
        document.getElementById("infi22").innerHTML = "Second and Seventh Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
        document.getElementById("infi23").innerHTML = "Fourth and Fifth Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
        document.getElementById("infi31").innerHTML = "Normal dimensions gain a multiplier based on time spent in current infinity<br>Currently: " + shorten(infUpg13Pow()) + "x<br>Cost: 3 IP"
        document.getElementById("infi32").innerHTML = "Multiplier for unspent Infinity Points on 1st Dimension<br>Currently: " + formatValue(player.options.notation, getUnspentBonus(), 2, 2) + "x<br>Cost: 5 IP"
}

function preBreakUpgradeDisplay(){
	if (canBuyIPMult()) document.getElementById("infiMult").className = "infinimultbtn"
        else document.getElementById("infiMult").className = "infinistorebtnlocked"
        document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by "+(Math.round(getIPMultPower()*100)/100)+"<br>currently: "+shorten(getIPMult()) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
        document.getElementById("nextset").textContent = ""
        if (player.infinityUpgradesRespecced!=undefined) {
		infinityRespecedInfinityDisplay()
        } else {
           	infinityUpgradesDisplay()
                if (player.galacticSacrifice) {
                    	var base=player.tickspeedBoosts==undefined?2:1
                    	if (player.aarexModifications.newGameExpVersion) base*=10
                    	document.getElementById("infi21").innerHTML = "Increase the multiplier for buying 10 Dimensions based on infinitied stat<br>"+base+"x -> "+(infUpg12Pow()*base).toPrecision(4)+"x<br>Cost: 1 IP"
                    	document.getElementById("infi33").innerHTML = "Dimension boosts are stronger based on infinity points<br>Currently: " + (1.2 + 0.05 * player.infinityPoints.max(1).log(10)).toFixed(2) + "x<br>Cost: 7 IP"
                }
                document.getElementById("infi34").innerHTML = "Infinity Point generation based on fastest infinity <br>Currently: "+shortenDimensions(getIPMult())+" every " + timeDisplay(player.bestInfinityTime*10) + "<br>Cost: 10 IP"
	}
        document.getElementById("lockedset1").style.display = "none"
        if (player.setsUnlocked > 0) {
        	document.getElementById("lockedset1").style.display = ""
		for (u=4;u<7;u++) {
                    	document.getElementById("infi"+u+"pow").textContent = u == 5 ? getInfUpgPow(5).toFixed(2) : getFullExpansion(getInfUpgPow(u))
                    	document.getElementById("infi"+u+"cost").textContent = shortenCosts(Decimal.pow(10, player.infinityUpgradesRespecced[u] + powAdds[u]))
                    	document.getElementById("infi"+u).className = player.infinityPoints.lt(Decimal.pow(10, player.infinityUpgradesRespecced[u] + powAdds[u])) ? "infinistorebtnlocked" : "infinimultbtn"
                }	
	}
}

function infoScaleDisplay(){
	if (player.aarexModifications.hideRepresentation) document.getElementById("infoScale").textContent=""
        else if (player.money.gt(Decimal.pow(10, 3 * 86400 * 365.2425 * 79.3 / 10))) {
           	var years = player.money.log10() / 3 / 86400 / 365.2425
            	var todayYear = new Date().getFullYear() || 2020
            	if (years>=1e9) var message = "<br>If you end the non-stop writing of your full antimatter amount with 3 digits per second, you would start it "+(years/1e9).toFixed(2)+" GYA."
           	else if (years>=1e7) var message = "<br>If you end the non-stop writing of your full antimatter amount with 3 digits per second, you would start it "+(years/1e6).toFixed(2)+" MYA."
            	else if (years>=todayYear) { // bound to the  < } else { > line stuck btw two var message lines
                	var bc = years-todayYear+1
                	var since
                	var sinceYears
                	if (bc > 5332e3) {}
                	else if (bc > 35e5) {
                    		since = "start of Pliocene epoch"
                    		sinceYears = 5332e3 - bc
                	} else if (bc > 258e4) {
                    		since = "birthdate of Lucy (typical Australopithicus afarensis female)"
                    		sinceYears = 35e5 - bc
                	} else if (bc > 781e3) {
                    		since = "Quaternary period"
                    		sinceYears = 258e4 - bc
                	} else if (bc > 315e3) {
                    		since = "Calabrian age"
                    		sinceYears = 781e3 - bc
                	} else if (bc > 25e4) {
                    		since = "Homo sapiens"
                    		sinceYears = 315e3 - bc
                	} else if (bc > 195e3) {
                    		since = "Homo neanderthalensis"
                    		sinceYears = 25e4 - bc
                	} else if (bc > 16e4) {
                    		since = "emergence of anatomically modern humans"
                    		sinceYears = 195e3 - bc
                	} else if (bc > 125e3) {
                    		since = "Homo sapiens idaltu"
                    		sinceYears = 16e4 - bc
                	} else if (bc > 7e4) {
                    		since = "peak of Eemian interglacial period"
                    		sinceYears = 125e3 - bc
                	} else if (bc > 67e3) {
                    		since = "earliest abstract/symbolic art"
                    		sinceYears = 7e4 - bc
                	} else if (bc > 5e4) {
                    		since = "Upper Paleolithic"
                    		sinceYears = 67e3 - bc
                	} else if (bc > 45e3) {
                    		since = "Late Stone Age"
                    		sinceYears = 5e4 - bc
                	} else if (bc > 4e4) {
                    		since = "European early modern humans"
                    		sinceYears = 45e3 - bc
                	} else if (bc > 35e3) {
                    		since = "first human settlement"
                    		sinceYears = 4e4 - bc
                	} else if (bc > 33e3) {
                    		since = "oldest known figurative art"
                    		sinceYears = 35e3 - bc
                	} else if (bc > 31e3) {
                    		since = "oldest known domesticated dog"
                    		sinceYears = 33e3 - bc
                	} else if (bc > 29e3) {
                    		since = "Last Glacial Maximum"
                    		sinceYears = 31e3 - bc
                	} else if (bc > 28e3) {
                    		since = "oldest ovens"
                    		sinceYears = 29e3 - bc
                	} else if (bc > 25e3) {
                    		since = "oldest known twisted rope"
                    		sinceYears = 28e3 - bc
                	} else if (bc > 2e4) {
                    		since = "oldest human permanent settlement (hamlet considering built of rocks and of mammoth bones)"
                    		sinceYears = 25e3 - bc
                	} else if (bc > 16e3) {
                   		since = "rise of Kerberan culture"
                    		sinceYears = 2e4 - bc
                	} else if (bc > 15e3) {
                    		since = "colonization of North America"
                    		sinceYears = 16e3 - bc
                	} else if (bc > 14e3) {
                    		since = "domestication of the pig"
                    		sinceYears = 15e3 - bc
                	} else if (bc > 11600) {
                    		since = "prehistoric warfare"
                    		sinceYears = 14e3 - bc
                	} else if (bc > 1e4) {
                    		since = "Holocene"
                    		sinceYears = 11600 - bc
                	} else if (bc > 8e3) {
                    		since = "death of other human breeds"
                    		sinceYears = 1e4 - bc
                	} else if (bc > 6e3) {
                   		since = "agricultural revolution"
                    		sinceYears = 8e3 - bc
                	} else if (bc > 5e3) {
                    		since = "farmers arrived in Europe"
                    		sinceYears = 6e3 - bc
                	} else if (bc > 4e3) {
                    		since = "first metal tools"
                    		sinceYears = 5e3 - bc
                	} else if (bc > 3200) {
                    		since = "first horse"
                    		sinceYears = 4e3 - bc
                	} else if (bc > 3e3) {
                    		since = "Sumerian cuneiform writing system"
                    		sinceYears = 3200 - bc
                	} else if (bc > 2600) {
                    		since = "union of Egypt"
                    		sinceYears = 3e3 - bc
                	} else if (bc > 2500) {
                    		since = "rise of Maya"
                    		sinceYears = 2600 - bc
                	} else if (bc > 2300) {
                    		since = "extinct of mammoths"
                    		sinceYears = 2500 - bc
                	} else if (bc > 1800) {
                    		since = "rise of Akkadian Empire"
                    		sinceYears = 2300 - bc
                	} else if (bc > 1175) {
                    		since = "first alphabetic writing"
                    		sinceYears = 1800 - bc
                	} else if (bc > 1400) {
                    		since = "rise of Olmec civilization"
                    		sinceYears = 1400 - bc
                	} else if (bc > 800) {
                    		since = "end of bronze age"
                    		sinceYears = 1175 - bc
                	} else if (bc > 753) {
                    		since = "rise of Greek city-states"
                    		sinceYears = 800 - bc
                	} else if (bc > 653) {
                    		since = "rise of Rome"
                    		sinceYears = 753 - bc
                	} else if (bc > 539) {
                    		since = "rise of Persian Empire"
                    		sinceYears = 653 - bc
                	} else if (bc > 356) {
                    		since = "fall of Babylonian Empire"
                    		sinceYears = 539 - bc
                	} else if (bc > 200) {
                    		since = "birth of Alexander the Great"
                    		sinceYears = 356 - bc
                	} else if (bc > 4) {
                    		since = "the first paper"
                    		sinceYears = 200 - bc
                	} else {
                    		since = "birth of Jesus Christ"
                    		sinceYears = 4 - bc
                	}
                	var message = "<br>If you end the non-stop writing of your full antimatter amount with 3 digits per second, you would start it in "+getFullExpansion(Math.floor(bc))+" BC."+(since?"<br>(around "+getFullExpansion(Math.ceil(sinceYears))+" years since the "+since+")":"")
            } else {
                	var message = "<br>If you start writing 3 digits of your full antimatter amount a second down after you were born as American,<br> you would "
                	if (years>79.3) message+="become a ghost for "+((years-79.3) / years * 100).toFixed(3)+"% of this session."
                	else message+="waste "+(years / 0.793).toFixed(3)+"% of your average life."
	    }
            document.getElementById("infoScale").innerHTML = message
	}
	else if (player.money.gt(new Decimal("1e100000"))) document.getElementById("infoScale").innerHTML = "<br>If you wrote 3 numbers a second, it would take you <br>" + timeDisplay(player.money.log10()*10/3) + "<br> to write down your antimatter amount."
        else scienceNumberDisplay()
}

function STATSDisplay(){
	mainStatsDisplay()
        paradoxSacDisplay()
	galaxySacDisplay()
	bestInfinityDisplay()
	bestEternityDisplay()
	bestQuantumDisplay()
	bestGhostifyDisplay()
	ng3p51Display()
	dilationStatsDisplay()
	infoScaleDisplay()
}

function breakInfinityUpgradeDisplay(){
	if (player.infinityUpgrades.includes("totalMult")) document.getElementById("postinfi11").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(1e4)) document.getElementById("postinfi11").className = "infinistorebtn1"
        else document.getElementById("postinfi11").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("currentMult")) document.getElementById("postinfi21").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(5e4)) document.getElementById("postinfi21").className = "infinistorebtn1"
        else document.getElementById("postinfi21").className = "infinistorebtnlocked"
        if (player.tickSpeedMultDecrease <= 2) document.getElementById("postinfi31").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost)) document.getElementById("postinfi31").className = "infinimultbtn"
        else document.getElementById("postinfi31").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("achievementMult")) document.getElementById("postinfi22").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1e6)) document.getElementById("postinfi22").className = "infinistorebtn1"
        else document.getElementById("postinfi22").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("infinitiedMult")) document.getElementById("postinfi12").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1e5)) document.getElementById("postinfi12").className = "infinistorebtn1"
        else document.getElementById("postinfi12").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("postGalaxy")) document.getElementById("postinfi41").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(5e11)) document.getElementById("postinfi41").className = "infinistorebtn1"
        else document.getElementById("postinfi41").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("challengeMult")) document.getElementById("postinfi32").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1e7)) document.getElementById("postinfi32").className = "infinistorebtn1"
        else document.getElementById("postinfi32").className = "infinistorebtnlocked"
        if (player.dimensionMultDecrease <= 3) document.getElementById("postinfi42").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.dimensionMultDecreaseCost)) document.getElementById("postinfi42").className = "infinimultbtn"
        else document.getElementById("postinfi42").className = "infinistorebtnlocked"
        if (player.offlineProd == 50) document.getElementById("offlineProd").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.offlineProdCost)) document.getElementById("offlineProd").className = "infinimultbtn"
        else document.getElementById("offlineProd").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("infinitiedGeneration")) document.getElementById("postinfi13").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(20e6)) document.getElementById("postinfi13").className = "infinistorebtn1"
        else document.getElementById("postinfi13").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("bulkBoost")) document.getElementById("postinfi23").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.tickspeedBoosts!=undefined?2e4:player.galacticSacrifice?5e6:5e9)) document.getElementById("postinfi23").className = "infinistorebtn1"
        else document.getElementById("postinfi23").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("autoBuyerUpgrade")) document.getElementById("postinfi33").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1e15)) document.getElementById("postinfi33").className = "infinistorebtn1"
        else document.getElementById("postinfi33").className = "infinistorebtnlocked"
        document.getElementById("postinfi11").innerHTML = "Power up all dimensions based on total antimatter produced<br>Currently: "+shorten(Math.pow(player.totalmoney.e+1, player.galacticSacrifice?2:0.5))+"x<br>Cost: "+shortenCosts(1e4)+" IP"
        document.getElementById("postinfi21").innerHTML = "Power up all dimensions based on current antimatter<br>Currently: "+shorten(Math.pow(player.money.e+1, player.galacticSacrifice?2:0.5))+"x<br>Cost: "+shortenCosts(5e4)+" IP"
        if (player.tickSpeedMultDecrease > 2) document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenDimensions(player.tickSpeedMultDecreaseCost) +" IP"
        else document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase<br>"+player.tickSpeedMultDecrease.toFixed(player.tickSpeedMultDecrease<2?2:0)+"x"
        document.getElementById("postinfi22").innerHTML = "Power up all dimensions based on achievements completed <br>Currently: "+shorten(achievementMult)+"x<br>Cost: "+shortenCosts(1e6)+" IP"
        document.getElementById("postinfi12").innerHTML = "Power up all dimensions based on amount infinitied <br>Currently: "+shorten(getInfinitiedMult())+"x<br>Cost: "+shortenCosts(1e5)+" IP"
        if (player.timestudy.studies.includes(31)) document.getElementById("postinfi12").innerHTML = "Power up all dimensions based on amount infinitied <br>Currently: "+shortenMoney(getInfinitiedMult())+"x<br>Cost: "+shortenCosts(1e5)+" IP"
        document.getElementById("postinfi41").innerHTML = "Makes galaxies "+Math.round(getPostGalaxyEff()*100-100)+"% stronger <br>Cost: "+shortenCosts(5e11)+" IP"
        document.getElementById("postinfi32").innerHTML = "Power up all dimensions based on slowest normal challenge run<br>Currently: "+shorten(worstChallengeBonus)+"x<br>Cost: "+shortenCosts(1e7)+" IP"
        document.getElementById("postinfi13").innerHTML = "You passively generate Infinitied stat based on your fastest infinity.<br>1 Infinity every "+timeDisplay(player.bestInfinityTime*5)+ " <br>Cost: "+shortenCosts(20e6)+" IP"
        document.getElementById("postinfi23").innerHTML = "Option to bulk buy Dimension"+(player.tickspeedBoosts==undefined?"":" and Tickspeed")+" Boosts <br>Cost: "+shortenCosts(player.tickspeedBoosts!=undefined?2e4:player.galacticSacrifice?5e6:5e9)+" IP"
        document.getElementById("postinfi33").innerHTML = "Autobuyers work twice as fast <br>Cost:"+shortenCosts(1e15)+" IP"
        if (player.dimensionMultDecrease > 3) document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase<br>"+player.dimensionMultDecrease+"x -> "+(player.dimensionMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"
        else document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase<br>"+player.dimensionMultDecrease.toFixed(ECTimesCompleted("eterc6")%5>0?1:0)+"x"
        document.getElementById("offlineProd").innerHTML = "Generates "+player.offlineProd+"% > "+Math.max(Math.max(5, player.offlineProd + 5), Math.min(50, player.offlineProd + 5))+"% of your best IP/min from last 10 infinities, works offline<br>Currently: "+shortenMoney(bestRunIppm.times(player.offlineProd/100)) +"IP/min<br> Cost: "+shortenCosts(player.offlineProdCost)+" IP"
        if (player.offlineProd == 50) document.getElementById("offlineProd").innerHTML = "Generates "+player.offlineProd+"% of your best IP/min from last 10 infinities, works offline<br>Currently: "+shortenMoney(bestRunIppm.times(player.offlineProd/100)) +" IP/min"
}

function breakNGm2UpgradeColumnDisplay(){
	if (player.infinityUpgrades.includes("galPointMult")) document.getElementById("postinfi01").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.tickspeedBoosts==undefined?1e3:1e4)) document.getElementById("postinfi01").className = "infinistorebtn1"
        else document.getElementById("postinfi01").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("dimboostCost")) document.getElementById("postinfi02").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.tickspeedBoosts==undefined?2e4:1e5)) document.getElementById("postinfi02").className = "infinistorebtn1"
        else document.getElementById("postinfi02").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("galCost")) document.getElementById("postinfi03").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(5e5)) document.getElementById("postinfi03").className = "infinistorebtn1"
        else document.getElementById("postinfi03").className = "infinistorebtnlocked"
        if (player.extraDimPowerIncrease >= 40) document.getElementById("postinfi04").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.dimPowerIncreaseCost)) document.getElementById("postinfi04").className = "infinimultbtn"
        else document.getElementById("postinfi04").className = "infinistorebtnlocked"
        document.getElementById("postinfi01").innerHTML = "Multiplier to galaxy points based on infinities<br>Currently: "+shorten(getPost01Mult())+"x<br>Cost: "+shortenCosts(player.tickspeedBoosts==undefined?1e3:1e4)+" IP"
        document.getElementById("postinfi02").innerHTML = "Dimension boost cost increases by 1 less<br>Currently: "+getDimboostCostIncrease()+(player.infinityUpgrades.includes("dimboostCost")?"":" -> "+(getDimboostCostIncrease()-1))+"<br>Cost: "+shortenCosts(player.tickspeedBoosts==undefined?2e4:1e5)+" IP"
        document.getElementById("postinfi03").innerHTML = "Galaxy cost increases by 5 less<br>Currently: "+Math.round(getGalaxyReqMultiplier()*10)/10+(player.infinityUpgrades.includes("galCost")?"":" -> "+Math.round(getGalaxyReqMultiplier()*10-50)/10+"<br>Cost: "+shortenCosts(5e5)+" IP")
        document.getElementById("postinfi04").innerHTML = "Further increase all dimension multipliers<br>x^"+galMults.u31().toFixed(2)+(player.extraDimPowerIncrease<40?" -> x^"+((galMults.u31()+0.02).toFixed(2))+"<br>Cost: "+shorten(player.dimPowerIncreaseCost)+" IP":"")
}

function breakNGm2UpgradeRow5Display(){
	document.getElementById("postinfir5").style.display = ""
        if (player.infinityUpgrades.includes("postinfi50")) document.getElementById("postinfi50").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.tickspeedBoosts==undefined?1e25:1e18)) document.getElementById("postinfi50").className = "infinistorebtn1"
        else document.getElementById("postinfi50").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("postinfi51")) document.getElementById("postinfi51").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.tickspeedBoosts==undefined?1e29:1e20)) document.getElementById("postinfi51").className = "infinistorebtn1"
        else document.getElementById("postinfi51").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("postinfi52")) document.getElementById("postinfi52").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.tickspeedBoosts==undefined?1e33:1e25)) document.getElementById("postinfi52").className = "infinistorebtn1"
        else document.getElementById("postinfi52").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("postinfi53")) document.getElementById("postinfi53").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(player.tickspeedBoosts==undefined?1e37:1e29)) document.getElementById("postinfi53").className = "infinistorebtn1"
        else document.getElementById("postinfi53").className = "infinistorebtnlocked"
        document.getElementById("postinfi50").innerHTML = "Dimension boost cost increases by 0.5 less.<br>Currently: "+getDimboostCostIncrease()+(player.infinityUpgrades.includes("postinfi50")?"":" -> "+(getDimboostCostIncrease()-0.5))+"<br>Cost: "+shortenCosts(player.tickspeedBoosts==undefined?1e25:1e18)+" IP"
        document.getElementById("postinfi51").innerHTML = "Galaxies are "+(player.tickspeedBoosts!=undefined?15:20)+"% more stronger.<br>Cost: "+shortenCosts(player.tickspeedBoosts==undefined?1e29:1e20)+" IP"
	let inf52text = ''
	if (player.tickspeedBoosts == undefined){
		inf52text = "Galaxy cost increases by 3 less.<br>Currently: " + Math.round(getGalaxyReqMultiplier()*10)/10+  (player.infinityUpgrades.includes("postinfi52")?"":" -> "+Math.round(getGalaxyReqMultiplier()*10-30)/10 )+"<br>Cost: "+shortenCosts(1e33)+" IP"
	} else inf52text = "Decrease tickspeed boost cost multiplier to 3.<br>Cost: "+shortenCosts(1e25)+" IP"
        document.getElementById("postinfi52").innerHTML = inf52text
        document.getElementById("postinfi53").innerHTML = "Divide all Infinity Dimension cost multipliers by 50.<br>Cost: "+shortenCosts(player.tickspeedBoosts==undefined?1e37:1e29)+" IP"
}

function breakNGm2UpgradeRow6Display(){
	document.getElementById("postinfir6").style.display = ""
        if (player.infinityUpgrades.includes("postinfi60")) document.getElementById("postinfi60").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte(1e50)) document.getElementById("postinfi60").className = "infinistorebtn1"
        else document.getElementById("postinfi60").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("postinfi61")) document.getElementById("postinfi61").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte("1e450")) document.getElementById("postinfi61").className = "infinistorebtn1"
        else document.getElementById("postinfi61").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("postinfi62")) document.getElementById("postinfi62").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte("1e700")) document.getElementById("postinfi62").className = "infinistorebtn1"
        else document.getElementById("postinfi62").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("postinfi63")) document.getElementById("postinfi63").className = "infinistorebtnbought"
        else if (player.infinityPoints.gte("1e2000")) document.getElementById("postinfi63").className = "infinistorebtn1"
        else document.getElementById("postinfi63").className = "infinistorebtnlocked"
        document.getElementById("postinfi60").innerHTML = "You gain more " + (player.tickspeedBoosts != undefined ? "Galaxy Points" : "antimatter") + " based on your galaxies." + (player.tickspeedBoosts != undefined ? "" : "<br>Currently: " + shorten(getNewB60Mult()) + "x") + "<br>Cost: " + shortenCosts(1e50) + " IP"
        document.getElementById("postinfi61").innerHTML = "g11 formula is better.<br>Cost: "+shortenCosts(new Decimal("1e450"))+" IP"
        document.getElementById("postinfi62").innerHTML = "Dimension Boosts make g13 stronger.<br>Cost: "+shortenCosts(new Decimal("1e700"))+" IP"
        document.getElementById("postinfi63").innerHTML = "Unlock 2 new rows of Galaxy Points.<br>Cost: "+shortenCosts(new Decimal("1e2000"))+" IP"
}

function INFINITYUPGRADESDisplay(){
	if (document.getElementById("preinf").style.display == "block") {
        	preBreakUpgradeDisplay()
        } else if (document.getElementById("postinf").style.display == "block" && document.getElementById("breaktable").style.display == "inline-block") {
		breakInfinityUpgradeDisplay()
            	if (player.galacticSacrifice) breakNGm2UpgradeColumnDisplay()
		if (player.galacticSacrifice&&(player.infinityDimension3.amount.gt(0)||player.eternities>(player.aarexModifications.newGameMinusVersion?-20:0)||quantumed)) {
			breakNGm2UpgradeRow5Display()
		} else document.getElementById("postinfir5").style.display = "none"
		if (player.galacticSacrifice&&(player.infinityDimension4.amount.gt(0)||player.eternities>(player.aarexModifications.newGameMinusVersion?-20:0)||quantumed)) {
			breakNGm2UpgradeRow6Display()
		} else document.getElementById("postinfir6").style.display = "none"
	} else if (document.getElementById("singularity").style.display == "block" && document.getElementById("singularitydiv").style.display == "") {
            	document.getElementById("darkMatter").textContent = shortenMoney(player.singularity.darkMatter)
            	document.getElementById("darkMatterMult").textContent = shortenMoney(getDarkMatterMult())
        } else if (document.getElementById("dimtechs").style.display == "block" && document.getElementById("dimtechsdiv").style.display == "") {
            	document.getElementById("darkMatterDT").textContent = shortenMoney(player.singularity.darkMatter)
            	document.getElementById("nextDiscounts").textContent = shortenMoney(getNextDiscounts())
            	document.getElementById("discounts").textContent = "All of your dim-techs gained a total of " + getFullExpansion(player.dimtechs.discounts) + " discount upgrades."
	}
}

function eternityUpgradesDisplay(){
	var eu2formula="(x/200)^log4(2x)"
	if (player.boughtDims !== undefined) eu2formula = "x^log4(2x)"
	else if (player.achievements.includes("ngpp15")) eu2formula = "x^log10(x)^3.75"
	document.getElementById("eter1").innerHTML = "Infinity Dimensions multiplier based on unspent EP (x+1)<br>Currently: "+shortenMoney(player.eternityPoints.plus(1))+"x<br>Cost: 5 EP"
	document.getElementById("eter2").innerHTML = "Infinity Dimension multiplier based on eternities ("+eu2formula+")<br>Currently: "+shortenMoney(getEU2Mult())+"x<br>Cost: 10 EP"
	document.getElementById("eter3").innerHTML = "Infinity Dimensions multiplier based on "+(player.boughtDims?"time shards (x/"+shortenCosts(1e12)+"+1)":"sum of Infinity Challenge times")+"<br>Currently: "+shortenMoney(getEU3Mult())+"x<br>Cost: "+shortenCosts(50e3)+" EP"
	document.getElementById("eter4").innerHTML = "Your achievement bonus affects Time Dimensions"+"<br>Cost: "+shortenCosts(1e16)+" EP"
	document.getElementById("eter5").innerHTML = "Time Dimensions are multiplied by your unspent time theorems"+"<br>Cost: "+shortenCosts(1e40)+" EP"
	document.getElementById("eter6").innerHTML = "Time Dimensions are multiplied by days played"+"<br>Cost: "+shortenCosts(1e50)+" EP"
	if (player.exdilation != undefined && player.dilation.studies.includes(1)) {
		document.getElementById("eter7").innerHTML = "Dilated time gain is boosted by antimatter<br>Currently: "+(1 + Math.log10(Math.max(1, player.money.log(10))) / 40).toFixed(3)+"x<br>Cost: "+shortenCosts(new Decimal("1e1500"))+" EP"
		document.getElementById("eter8").innerHTML = "Dilated time gain is boosted by infinity points<br>Currently: "+(1 + Math.log10(Math.max(1, player.infinityPoints.log(10))) / 20).toFixed(3)+"x<br>Cost: "+shortenCosts(new Decimal("1e2000"))+" EP"
		document.getElementById("eter9").innerHTML = "Dilated time gain is boosted by eternity points<br>Currently: "+(1 + Math.log10(Math.max(1, player.eternityPoints.log(10))) / 10).toFixed(3)+"x<br>Cost: "+shortenCosts(new Decimal("1e3000"))+" EP"
	}
}

function uponDilationDisplay(){
	let gain = getDilGain()
        let msg = "Disable dilation"
        if (player.infinityPoints.lt(Number.MAX_VALUE)||inQCModifier("ad")) {}
        else if (player.dilation.totalTachyonParticles.gt(gain)) msg += ".<br>Reach " + shortenMoney(Decimal.pow(10, player.dilation.totalTachyonParticles.div(getDilPower()).pow(1/getDilExp()).    toNumber() * 400)) + " antimatter to gain more Tachyon particles"
        else msg += " for " + shortenMoney(gain.sub(player.dilation.totalTachyonParticles)) + " Tachyon particles"
        document.getElementById("enabledilation").innerHTML = msg + "."
}

function exdilationDisplay(){
	document.getElementById("reversedilationdiv").style.display = ""
                if (canReverseDilation()) {
                    document.getElementById("reversedilation").className = "dilationbtn"
                    document.getElementById("reversedilation").innerHTML = "Reverse dilation."+(player.exdilation.times>0||quantumed?"<br>Gain "+shortenDimensions(getExDilationGain())+" ex-dilation":"")
                } else {
                    let req=getExdilationReq()
                    document.getElementById("reversedilation").className = "eternityupbtnlocked"
                    document.getElementById("reversedilation").textContent = "Get "+(player.eternityPoints.lt(req.ep)?shortenCosts(new Decimal(req.ep))+" EP and ":"")+shortenCosts(req.dt)+" dilated time to reverse dilation."
                }
}

function mainDilationDisplay(){
	if (player.dilation.active) uponDilationDisplay()
        else document.getElementById("enabledilation").textContent = "Dilate time."+((player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode&&!player.eternityBuyer.slowStopped&&player.eternityBuyer.dilMode=="amount"?!isNaN(player.eternityBuyer.statBeforeDilation):false) ? " " + (player.eternityBuyer.dilationPerAmount - player.eternityBuyer.statBeforeDilation) + " left before dilation." : "")
        if (player.exdilation==undefined||player.aarexModifications.ngudpV?false:player.blackhole.unl) {
		exdilationDisplay()
	} else document.getElementById("reversedilationdiv").style.display = "none"
	var fgm=getFreeGalaxyGainMult()
	document.getElementById('freeGalaxyMult').textContent=fgm==1?"free galaxy":Math.round(fgm*10)/10+" free galaxies"
}

function breakEternityDisplay(){
	document.getElementById("eternalMatter").textContent = shortenDimensions(tmp.qu.breakEternity.eternalMatter)
        for (var u=1;u<(player.ghostify.ghostlyPhotons.unl?11:8);u++) {
		document.getElementById("breakUpg" + u).className = (tmp.qu.breakEternity.upgrades.includes(u) && u != 7) ? "eternityupbtnbought" : tmp.qu.breakEternity.eternalMatter.gte(getBreakUpgCost(u)) ? "eternityupbtn" : "eternityupbtnlocked"
		if (u==8) document.getElementById("breakUpg8Mult").textContent = (getBreakUpgMult(8)*100-100).toFixed(1)
		else if (u!=7) document.getElementById("breakUpg" + u + "Mult").textContent = shortenMoney(getBreakUpgMult(u))
	}
	if (tmp.qu.bigRip.active) {
		document.getElementById("eterShortcutEM").textContent=shortenDimensions(tmp.qu.breakEternity.eternalMatter)
		document.getElementById("eterShortcutEP").textContent=shortenDimensions(player.eternityPoints)
		document.getElementById("eterShortcutTP").textContent=shortenMoney(player.dilation.tachyonParticles)
	}
}

function ETERNITYSTOREDisplay(){
	if (document.getElementById("TTbuttons").style.display == "block") updateTheoremButtons()
        if (document.getElementById("timestudies").style.display == "block" || document.getElementById("ers_timestudies").style.display == "block") updateTimeStudyButtons()
        if (document.getElementById("masterystudies").style.display == "block") updateMasteryStudyButtons()
        if (document.getElementById("eternityupgrades").style.display == "block") eternityUpgradesDisplay()
        if (document.getElementById("dilation").style.display == "block") mainDilationDisplay()
        if (document.getElementById("blackhole").style.display == "block") {
		if (document.getElementById("blackholediv").style.display == "inline-block") updateBlackhole()
		if (document.getElementById("blackholeunlock").style.display == "inline-block") {
			document.getElementById("blackholeunlock").innerHTML = "Unlock the black hole<br>Cost: "+shortenCosts(new Decimal('1e4000'))+" EP"
			document.getElementById("blackholeunlock").className = (player.eternityPoints.gte("1e4000")) ? "storebtn" : "unavailablebtn"
		}
	}
	if (document.getElementById("breakEternity").style.display == "block") {
		breakEternityDisplay()
	}
}

function updateDimensions() {
	if (document.getElementById("dimensions").style.display == "block") {
		if (document.getElementById("antimatterdimensions").style.display == "block") dimensionTabDisplay()
		if (document.getElementById("infinitydimensions").style.display == "block") updateInfinityDimensions()
		if (document.getElementById("timedimensions").style.display == "block") updateTimeDimensions()
		if (document.getElementById("pdims").style.display == "block") paradoxDimDisplay()
    	if (document.getElementById("metadimensions").style.display == "block") updateMetaDimensions()
    	if (document.getElementById("emperordimensions").style.display == "block") updateEmperorDimensions()
	}
	tickspeedDisplay()
    if (document.getElementById("stats").style.display == "block" && document.getElementById("statistics").style.display == "block") STATSDisplay()
   	if (document.getElementById("infinity").style.display == "block") INFINITYUPGRADESDisplay()
	if (document.getElementById("eternitystore").style.display == "block") ETERNITYSTOREDisplay()
   	if (document.getElementById("quantumtab").style.display == "block") updateQuantumTabs()
   	if (document.getElementById("ghostify").style.display == "block") updateGhostifyTabs()
}

function hideDimensions() {
	for (var d=2;d<9;d++) if (!canBuyDimension(d)) document.getElementById(d+"Row").style.display="none"
}

function toggleLogRateChange() {
	player.aarexModifications.logRateChange=!player.aarexModifications.logRateChange
	document.getElementById("toggleLogRateChange").textContent = "Logarithm rate: O"+(player.aarexModifications.logRateChange?"N":"FF")
	dimDescEnd = (player.aarexModifications.logRateChange?" OoM":"%")+"/s)"
}

function toggleTabsSave() {
	player.aarexModifications.tabsSave.on=!player.aarexModifications.tabsSave.on
	document.getElementById("tabsSave").textContent = "Saved tabs: O"+(player.aarexModifications.tabsSave.on?"N":"FF")
}

function updatePerformanceTicks() {
	if (player.aarexModifications.performanceTicks) document.getElementById("updaterateslider").min=1
	else {
		slider.min=33
		if (player.options.updateRate<33) {
			clearInterval(gameLoopIntervalId)
			player.options.updateRate=33
			sliderText.textContent="Update rate: "+player.options.updateRate+"ms"
			startInterval()
		}
	}
	document.getElementById("performanceTicks").textContent = "Performance ticks: " + ["OFF", "LOW", "MEDIUM", "HIGH"][(player.aarexModifications.performanceTicks || 0) + 0]
}

function togglePerformanceTicks() {
	player.aarexModifications.performanceTicks = ((player.aarexModifications.performanceTicks || 0) + 1) % 4
	updatePerformanceTicks()
}

function updateCosts() {
	var costPart = quantumed ? '' : 'Cost: '
	if (document.getElementById("dimensions").style.display == "block" && document.getElementById("antimatterdimensions").style.display == "block") {
		var until10CostPart = quantumed ? '' : 'Until 10, Cost: '
		for (var i=1; i<9; i++) {
			var cost = player[TIER_NAMES[i] + "Cost"]
			var resource = getOrSubResource(i)
			document.getElementById('B'+i).className = cost.lte(resource) ? 'storebtn' : 'unavailablebtn'
			document.getElementById('B'+i).textContent = costPart + shortenPreInfCosts(cost)
			document.getElementById('M'+i).className = cost.times(10 - dimBought(i)).lte(resource) ? 'storebtn' : 'unavailablebtn'
			document.getElementById('M'+i).textContent = until10CostPart + shortenPreInfCosts(cost.times(10 - dimBought(i)));
		}
	}
	document.getElementById("tickSpeed").textContent = costPart + shortenPreInfCosts(player.tickSpeedCost);
}

function floatText(id, text, leftOffset = 150) {
	if (!player.options.animations.floatingText) return
	var el = $("#"+id)
	el.append("<div class='floatingText' style='left: "+leftOffset+"px'>"+text+"</div>")
	setTimeout(function() {
		el.children()[0].remove()
	}, 1000)
}

function updateChallenges() {
	var buttons = Array.from(document.getElementById("normalchallenges").getElementsByTagName("button")).concat(Array.from(document.getElementById("breakchallenges").getElementsByTagName("button")))
	for (var i=0; i < buttons.length; i++) {
		buttons[i].className = "challengesbtn";
		buttons[i].textContent = "Start"
	}

	tmp.cp=0
	infDimPow=1
	for (var i=0; i < player.challenges.length; i++) {
		document.getElementById(player.challenges[i]).className = "completedchallengesbtn";
		document.getElementById(player.challenges[i]).textContent = "Completed"
		if (player.challenges[i].search("postc")==0) tmp.cp++
		if (player.challenges.includes("postc1")) if (player.challenges[i].split("postc")[1]) infDimPow*=player.galacticSacrifice?2:1.3
	}
	
	var challengeRunning
	if (player.currentChallenge === "") {
		if (!player.challenges.includes("challenge1")) challengeRunning="challenge1"
	} else challengeRunning=player.currentChallenge
	if (challengeRunning!==undefined) {
		document.getElementById(challengeRunning).className = "onchallengebtn";
		document.getElementById(challengeRunning).textContent = "Running"
	}

	if (player.aarexModifications.ngmX>3) {
		var chall=player.galacticSacrifice.chall
		if (chall) {
			chall="challenge"+chall
			document.getElementById(chall).className = "onchallengebtn";
			document.getElementById(chall).textContent = "Running"
		}
	}

	document.getElementById("challenge7").parentElement.parentElement.style.display = player.infinitied < 1 && player.eternities < 1 && !quantumed ? "none" : ""
	if (inQC(4)) {
		document.getElementById("challenge7").className = "onchallengebtn";
		document.getElementById("challenge7").textContent = "Trapped in"
	}

	if (inQC(6)) for (i=2;i<9;i++) if (i<3||i>5) {
		document.getElementById("postc"+i).className = "onchallengebtn";
		document.getElementById("postc"+i).textContent = "Trapped in"
	}

	if (isIC3Trapped()) {
		document.getElementById("postc3").className = "onchallengebtn";
		document.getElementById("postc3").textContent = "Trapped in"
	}

	if (player.postChallUnlocked > 0 || Object.keys(player.eternityChalls).length > 0 || player.eternityChallUnlocked !== 0) document.getElementById("challTabButtons").style.display = "table"
	for (c=0;c<order.length;c++) document.getElementById(order[c]).parentElement.parentElement.style.display=player.postChallUnlocked<c+1?"none":""
}

function getNextAt(chall) {
	var ret = nextAt[chall]
	if (player.galacticSacrifice) {
		var retNGMM = nextAt[chall+"_ngmm"]
		if (retNGMM) ret = retNGMM
	}
	if (player.tickspeedBoosts!=undefined) {
		var retNGM3 = nextAt[chall+"_ngm3"]
		if (retNGM3) ret = retNGM3
	}
	return ret
}

function getGoal(chall) {
	var ret = goals[chall]
	if (player.galacticSacrifice) {
		var retNGMM = goals[chall+"_ngmm"]
		if (retNGMM) ret = retNGMM
	}
	if (player.tickspeedBoosts!=undefined) {
		var retNGM3 = goals[chall+"_ngm3"]
		if (retNGM3) ret = retNGM3
	}
	return ret
}

function checkICID(name) {
	if (player.galacticSacrifice) {
		var split=name.split("postcngm3_")
		if (split[1]!=undefined) return parseInt(split[1])+2
		var split=name.split("postcngmm_")
		if (split[1]!=undefined) {
			var num=parseInt(split[1])
			if (player.tickspeedBoosts!=undefined&&num>2) return 5
			return num
		}
		var split=name.split("postc")
		if (split[1]!=undefined) {
			var num=parseInt(split[1])
			var offset=player.tickspeedBoosts==undefined?3:5
			if (num>2) offset--
			return num+offset
		}
	} else {
		var split=name.split("postc")
		if (split[1]!=undefined) return parseInt(split[1])
	}
}

function updateEternityChallenges() {
	tmp.ec=0
	var locked = true
	for (ec=1;ec<15;ec++) {
		var property = "eterc"+ec 
		var ecdata = player.eternityChalls[property]
		if (ecdata) {
			tmp.ec+=ecdata
			locked=false
		}
		document.getElementById(property+"div").style.display=ecdata?"inline-block":"none"
		document.getElementById(property).textContent=ecdata>4?"Completed":"Locked"
		document.getElementById(property).className=ecdata>4?"completedchallengesbtn":"lockedchallengesbtn"
	}
	if (player.eternityChallUnlocked>0) {
		var property="eterc"+player.eternityChallUnlocked
		var onchallenge=player.currentEternityChall==property
		locked=false
		document.getElementById(property+"div").style.display="inline-block"
		document.getElementById(property).textContent=onchallenge?"Running":"Start"
		document.getElementById(property).className=onchallenge?"onchallengebtn":"challengesbtn"
	}
	document.getElementById("eterctabbtn").parentElement.style.display = locked?"none":""
	document.getElementById("autoEC").style.display=quantumed&&tmp.ngp3?"inline-block":"none"
	if (quantumed&&tmp.ngp3) document.getElementById("autoEC").className=tmp.qu.autoEC?"timestudybought":"storebtn"
}

function glowText(id) {
	var text = document.getElementById(id);
	text.style.setProperty("-webkit-animation", "glow 1s");
	text.style.setProperty("animation", "glow 1s");
}

function toggleChallengeRetry() {
	if (player.options.retryChallenge) {
		player.options.retryChallenge = false
		document.getElementById("retry").textContent = "Automatically retry challenges OFF"
	} else {
		player.options.retryChallenge = true
		document.getElementById("retry").textContent = "Automatically retry challenges ON"
	}
}

document.getElementById("news").onclick = function () {
	if (document.getElementById("news").textContent === "Click this to unlock a secret achievement.") giveAchievement("Real news")
	if (document.getElementById("news").textContent === "If you are a ghost, try to click me!" && ghostified && (player.options.secrets === undefined || player.options.secrets.ghostlyNews === undefined)) {
		if (player.options.secrets === undefined) {
			player.options.secrets = {}
			document.getElementById("secretoptionsbtn").style.display = ""
		}
		player.options.secrets.ghostlyNews = false
		document.getElementById("ghostlynewsbtn").style.display = ""
		$.notify("You unlocked ghostly news ticker option!", "success")
		giveAchievement("News for other species")
	}
	if (document.getElementById("news").textContent === "Don't click this news") {
		alert("I told you so.")
		clearInterval(gameLoopIntervalId)
		simulateTime(0, false, "lair")
		player.lastUpdate = new Date().getTime()
		startInterval()
		giveAchievement("Lie the news")
	}
};

document.getElementById("game").onclick = function () {
	if (tmp.blankedOut) giveAchievement("Blanked out")
}

document.getElementById("secretstudy").onclick = function () {
    document.getElementById("secretstudy").style.opacity = "1";
    document.getElementById("secretstudy").style.cursor = "default";
    giveAchievement("Go study in real life instead");
    setTimeout(drawStudyTree, 2000);
};

document.getElementById("The first one's always free").onclick = function () {
    giveAchievement("The first one's always free")
};

function glowText(id) {
	var text = document.getElementById(id);
	text.style.setProperty("-webkit-animation", "glow 1s");
	text.style.setProperty("animation", "glow 1s");
}

document.getElementById("maxall").onclick = function () {
	if (tmp.ri) return false
	if (player.currentChallenge !== 'challenge14') buyMaxTickSpeed()
	for (var tier=1; tier<9;tier++) buyBulkDimension(tier, 1/0)
	if (player.aarexModifications.ngmX>3) buyMaxTimeDimensions()
	if (player.pSac!=undefined) maxAllIDswithAM()
}

document.getElementById("challengeconfirmation").onclick = function () {
	player.options.challConf = !player.options.challConf
	document.getElementById("challengeconfirmation").textContent = "Challenge confirmation: O" + (player.options.challConf ? "N" : "FF")
}

function buyInfinityUpgrade(name, cost) {
	if (player.infinityPoints.gte(cost) && !player.infinityUpgrades.includes(name)) {
		player.infinityUpgrades.push(name)
		player.infinityPoints = player.infinityPoints.minus(cost)
		if (name == "postinfi53") for (tier=1;tier<9;tier++) {
			let dim = player["infinityDimension"+tier]
			dim.cost = Decimal.pow(getIDCostMult(tier),dim.baseAmount/10).times(infBaseCost[tier])
		}
	}
}

var ipMultPower=2
var ipMultCostIncrease=10
function getIPMultPower() {
	let ret = ipMultPower
	if (player.galacticSacrifice!==undefined&&player.galacticSacrifice.upgrades.includes(53)) ret += Math.pow(1.25,-15e4/player.galacticSacrifice.galaxyPoints.log10())
	return ret
}
function canBuyIPMult() {
	if (player.infinityUpgradesRespecced!=undefined) return player.infinityPoints.gte(player.infMultCost)
	return player.infinityUpgrades.includes("skipResetGalaxy") && player.infinityUpgrades.includes("passiveGen") && player.infinityUpgrades.includes("galaxyBoost") && player.infinityUpgrades.includes("resetBoost") && player.infinityPoints.gte(player.infMultCost)
}

document.getElementById("infiMult").onclick = function() {
	if (canBuyIPMult()) {
		player.infinityPoints = player.infinityPoints.minus(player.infMultCost)
        	player.infMult = player.infMult.times(getIPMultPower());
        	player.autoIP = player.autoIP.times(getIPMultPower());
        	player.infMultCost = player.infMultCost.times(ipMultCostIncrease)
        	if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autoCrunchMode == "amount") player.autobuyers[11].priority = Decimal.times(player.autobuyers[11].priority, 2);
        	if (player.autoCrunchMode == "amount") document.getElementById("priority12").value = formatValue("Scientific", player.autobuyers[11].priority, 2, 0);
	}
}


function updateEternityUpgrades() {
	document.getElementById("eter1").className = (player.eternityUpgrades.includes(1)) ? "eternityupbtnbought" : (player.eternityPoints.gte(5)) ? "eternityupbtn" : "eternityupbtnlocked"
	document.getElementById("eter2").className = (player.eternityUpgrades.includes(2)) ? "eternityupbtnbought" : (player.eternityPoints.gte(10)) ? "eternityupbtn" : "eternityupbtnlocked"
	document.getElementById("eter3").className = (player.eternityUpgrades.includes(3)) ? "eternityupbtnbought" : (player.eternityPoints.gte(50e3)) ? "eternityupbtn" : "eternityupbtnlocked"
	if (player.boughtDims) {
		document.getElementById("eterrow2").style.display="none"
		return
	} else document.getElementById("eterrow2").style.display=""
	document.getElementById("eter4").className = (player.eternityUpgrades.includes(4)) ? "eternityupbtnbought" : (player.eternityPoints.gte(1e16)) ? "eternityupbtn" : "eternityupbtnlocked"
	document.getElementById("eter5").className = (player.eternityUpgrades.includes(5)) ? "eternityupbtnbought" : (player.eternityPoints.gte(1e40)) ? "eternityupbtn" : "eternityupbtnlocked"
	document.getElementById("eter6").className = (player.eternityUpgrades.includes(6)) ? "eternityupbtnbought" : (player.eternityPoints.gte(1e50)) ? "eternityupbtn" : "eternityupbtnlocked"
	if (player.exdilation != undefined && player.dilation.studies.includes(1))  {
		document.getElementById("dilationeterupgrow").style.display=""
		document.getElementById("eter7").className = (player.eternityUpgrades.includes(7)) ? "eternityupbtnbought" : (player.eternityPoints.gte("1e1500")) ? "eternityupbtn" : "eternityupbtnlocked"
		document.getElementById("eter8").className = (player.eternityUpgrades.includes(8)) ? "eternityupbtnbought" : (player.eternityPoints.gte("1e2000")) ? "eternityupbtn" : "eternityupbtnlocked"
		document.getElementById("eter9").className = (player.eternityUpgrades.includes(9)) ? "eternityupbtnbought" : (player.eternityPoints.gte("1e3000")) ? "eternityupbtn" : "eternityupbtnlocked"
	} else {
		document.getElementById("dilationeterupgrow").style.display="none"
		return
	}
}


function buyEternityUpgrade(name, cost) {
    	if (player.eternityPoints.gte(cost) && !player.eternityUpgrades.includes(name)) {
        	player.eternityUpgrades.push(name)
        	player.eternityPoints = player.eternityPoints.minus(cost)
        	updateEternityUpgrades()
	}
}

function getEPCost(bought) {
	if (player.galacticSacrifice !== undefined) return Decimal.pow(50,bought).times(500)
	return Decimal.pow(bought>481?1e3:bought>153?500:bought>58?100:50, bought + Math.pow(Math.max(bought-1334, 0), 1.2)).times(500)	
}

function buyEPMult() {
    	if (player.eternityPoints.gte(player.epmultCost)) {
        	player.epmult = player.epmult.times(5)
        	if (player.autoEterMode === undefined || player.autoEterMode === 'amount') {
            		player.eternityBuyer.limit = Decimal.times(player.eternityBuyer.limit, 5);
            		document.getElementById("priority13").value = formatValue("Scientific", player.eternityBuyer.limit, 2, 0);
		}
        	player.eternityPoints = player.eternityPoints.minus(player.epmultCost)
        	player.epmultCost = getEPCost(Math.round(player.epmult.ln()/Math.log(5)))
        	document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
        	updateEternityUpgrades()
	}
}

function buyMaxEPMult() {
	if (player.eternityPoints.lt(player.epmultCost)) return
	var bought=Math.round(player.epmult.ln()/Math.log(5))
	var increment=1
	while (player.eternityPoints.gte(getEPCost(bought+increment*2-1))) {
		increment*=2
	}
	var toBuy=increment
	for (p=0;p<53;p++) {
		increment/=2
		if (increment<1) break
		if (player.eternityPoints.gte(getEPCost(bought+toBuy+increment-1))) toBuy+=increment
	}
	var num=toBuy
	var newEP=player.eternityPoints
	while (num>0) {
		var temp=newEP
		var cost=getEPCost(bought+num-1)
		if (newEP.lt(cost)) {
			newEP=player.eternityPoints.sub(cost)
			toBuy--
		} else newEP=newEP.sub(cost)
		if (newEP.eq(temp)||num>9007199254740992) break
		num--
	}
	player.eternityPoints=newEP
	if (isNaN(newEP.e)) player.eternityPoints=new Decimal(0)
	player.epmult=player.epmult.times(Decimal.pow(5, toBuy))
	player.epmultCost=getEPCost(bought+toBuy)
	document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
}





function playerInfinityUpgradesOnEternity() {
	if (getEternitied() > 19 || player.achievements.includes("ng3p51")) return
	else if (getEternitied() > 3) {
		var filter = ["timeMult", "dimMult", "timeMult2", "skipReset1", "skipReset2", "unspentBonus", "27Mult", "18Mult", "36Mult", "resetMult", "skipReset3", "passiveGen", "45Mult", "resetBoost", "galaxyBoost", "skipResetGalaxy"]
		var newUpgrades = []
		for (u=0;u<player.infinityUpgrades.length;u++) if (filter.includes(player.infinityUpgrades[u])) newUpgrades.push(player.infinityUpgrades[u])
		player.infinityUpgrades = newUpgrades
	} else player.infinityUpgrades = []
}

document.getElementById("postinfi11").onclick = function() {
    buyInfinityUpgrade("totalMult",1e4);
}

document.getElementById("postinfi21").onclick = function() {
    buyInfinityUpgrade("currentMult",5e4);
}

document.getElementById("postinfi31").onclick = function() {
    	if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost) && player.tickSpeedMultDecrease > 2) {
        	player.infinityPoints = player.infinityPoints.minus(player.tickSpeedMultDecreaseCost)
        	player.tickSpeedMultDecreaseCost *= 5
        	player.tickSpeedMultDecrease--;
        	if (player.tickSpeedMultDecrease > 2) document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenDimensions(player.tickSpeedMultDecreaseCost) +" IP"
        	else {
			for (c=0;c<ECTimesCompleted("eterc11");c++) player.tickSpeedMultDecrease-=0.07
			document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase<br>"+player.tickSpeedMultDecrease.toFixed(player.tickSpeedMultDecrease<2?2:0)+"x"
		}
	}
}

document.getElementById("postinfi41").onclick = function() {
    	buyInfinityUpgrade("postGalaxy",5e11);
}

document.getElementById("postinfi12").onclick = function() {
    	buyInfinityUpgrade("infinitiedMult",1e5);
}

document.getElementById("postinfi22").onclick = function() {
    	buyInfinityUpgrade("achievementMult",1e6);
}

document.getElementById("postinfi32").onclick = function() {
    	buyInfinityUpgrade("challengeMult",1e7);
}

document.getElementById("postinfi42").onclick = function() {
    	if (player.infinityPoints.gte(player.dimensionMultDecreaseCost) && player.dimensionMultDecrease > 3) {
        	player.infinityPoints = player.infinityPoints.minus(player.dimensionMultDecreaseCost)
        	player.dimensionMultDecreaseCost *= 5000
        	player.dimensionMultDecrease--;
        	if (player.dimensionMultDecrease > 3) document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x -> "+(player.dimensionMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"
        	else {
			for (c=0;c<ECTimesCompleted("eterc6");c++) player.dimensionMultDecrease-=0.2
			document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase<br>"+player.dimensionMultDecrease.toFixed(ECTimesCompleted("eterc6")%5>0?1:0)+"x"
		}
	}
}

document.getElementById("postinfi23").onclick = function() {
    	buyInfinityUpgrade("bulkBoost",player.tickspeedBoosts!=undefined?2e4:player.galacticSacrifice?5e6:5e9);
}

document.getElementById("offlineProd").onclick = function() {
    	if (player.infinityPoints.gte(player.offlineProdCost) && player.offlineProd < 50) {
        	player.infinityPoints = player.infinityPoints.minus(player.offlineProdCost)
        	player.offlineProdCost *= 10
        	player.offlineProd += 5
	}
}

//MORE DISPLAY STUFF

function replicantiDisplay() {
	if (player.replicanti.unl) {
		let replGalOver = getMaxRG() - player.replicanti.gal
		let chance = tmp.rep.chance.times(100)
		document.getElementById("replicantiamount").textContent = shortenDimensions(player.replicanti.amount)
		document.getElementById("replicantimult").textContent = shorten(getIDReplMult())

		document.getElementById("replicantichance").innerHTML = "Replicate "+(tmp.rep.freq?"amount: "+shorten(tmp.rep.freq)+"x":"chance: "+getFullExpansion(chance.gt(1e12)?chance:Math.round(chance.toNumber()))+"%") + (isChanceAffordable() ? "<br>+1% Cost: "+shortenCosts(player.replicanti.chanceCost)+" IP" : "")
		document.getElementById("replicantiinterval").innerHTML = "Interval: "+timeDisplayShort(Decimal.div(tmp.rep.interval, 100), true, 3) + (isIntervalAffordable() ? "<br>-> "+timeDisplayShort(Decimal.times(tmp.rep.interval, 9e-3), true, 3)+" Cost: "+shortenCosts(player.replicanti.intervalCost)+" IP" : "")
		document.getElementById("replicantimax").innerHTML = (player.replicanti.gal<3e3?"Max Replicanti galaxies":(player.replicanti.gal<58200?"Distant":"Further")+" Replicated Galaxies")+": "+getFullExpansion(player.replicanti.gal)+(replGalOver > 1 ? "+" + getFullExpansion(replGalOver) : "")+"<br>+1 Cost: "+shortenCosts(getRGCost())+" IP"
		document.getElementById("replicantireset").innerHTML = (!tmp.ngp3l && player.achievements.includes("ng3p67") ? "Get " : player.achievements.includes("ngpp16") ? "Divide replicanti amount by " + shorten(Number.MAX_VALUE) + ", but get " : "Reset replicanti amount, but get ")+"1 free galaxy.<br>" + getFullExpansion(player.replicanti.galaxies) + (extraReplGalaxies ? "+" + getFullExpansion(extraReplGalaxies) : "") + " replicated galax" + (getTotalRG() == 1 ? "y" : "ies") + " created."
		document.getElementById("replicantiapprox").innerHTML = tmp.ngp3 && player.dilation.upgrades.includes("ngpp1") && player.timestudy.studies.includes(192) && player.replicanti.amount.gte(Number.MAX_VALUE) && (!player.aarexModifications.nguspV || player.aarexModifications.nguepV) ? 
			"Replicanti increases by " + (tmp.rep.est < Math.log10(2) ? "x2.00 per " + timeDisplayShort(Math.log10(2) / tmp.rep.est * 10) : (tmp.rep.est.gte(1e4) ? shorten(tmp.rep.est) + " OoMs" : "x" + shorten(Decimal.pow(10, tmp.rep.est.toNumber()))) + " per second") + ".<br>" +
			"Replicate interval slows down by " + tmp.rep.speeds.inc.toFixed(3) + "x per " + getFullExpansion(Math.floor(tmp.rep.speeds.exp)) + " OoMs.<br>" +
			"(2x slower per " + getFullExpansion(Math.floor(tmp.rep.speeds.exp * Math.log10(2) / Math.log10(tmp.rep.speeds.inc))) + " OoMs)" :
			"Approximately "+ timeDisplay(Math.max((Math.log(Number.MAX_VALUE) - current) / est.toNumber(), 0)*10) + " Until Infinite Replicanti"

		document.getElementById("replicantichance").className = (player.infinityPoints.gte(player.replicanti.chanceCost) && isChanceAffordable()) ? "storebtn" : "unavailablebtn"
		document.getElementById("replicantiinterval").className = (player.infinityPoints.gte(player.replicanti.intervalCost) && isIntervalAffordable()) ? "storebtn" : "unavailablebtn"
		document.getElementById("replicantimax").className = (player.infinityPoints.gte(getRGCost())) ? "storebtn" : "unavailablebtn"
		document.getElementById("replicantireset").className = (canGetReplicatedGalaxy()) ? "storebtn" : "unavailablebtn"
		document.getElementById("replicantireset").style.height = (player.achievements.includes("ngpp16") && (tmp.ngp3l || !player.achievements.includes("ng3p67")) ? 90 : 70) + "px"
	} else {
		document.getElementById("replicantiunlock").innerHTML = "Unlock Replicantis<br>Cost: "+shortenCosts(player.galacticSacrifice!=undefined&&player.tickspeedBoosts==undefined?1e80:1e140)+" IP"
		document.getElementById("replicantiunlock").className = (player.infinityPoints.gte(player.galacticSacrifice!=undefined&&player.tickspeedBoosts==undefined?1e80:1e140)) ? "storebtn" : "unavailablebtn"
	}
}

function initialTimeStudyDisplay(){
	document.getElementById("11desc").textContent = "Currently: "+shortenMoney(tsMults[11]())+"x"
        document.getElementById("32desc").textContent = "You gain "+getFullExpansion(tsMults[32]())+"x more infinitied stat (based on dimension boosts)"
        document.getElementById("51desc").textContent = "You gain "+shortenCosts(player.aarexModifications.newGameExpVersion?1e30:1e15)+"x more IP"
        document.getElementById("71desc").textContent = "Currently: "+shortenMoney(tmp.sacPow.pow(0.25).max(1).min("1e210000"))+"x"
        document.getElementById("72desc").textContent = "Currently: "+shortenMoney(tmp.sacPow.pow(0.04).max(1).min("1e30000"))+"x"
        document.getElementById("73desc").textContent = "Currently: "+shortenMoney(tmp.sacPow.pow(0.005).max(1).min("1e1300"))+"x"
        document.getElementById("82desc").textContent = "Currently: "+shortenMoney(Decimal.pow(1.0000109, Decimal.pow(player.resets, 2)).min(player.meta==undefined?1/0:'1e80000'))+"x"
        document.getElementById("91desc").textContent = "Currently: "+shortenMoney(Decimal.pow(10, Math.min(player.thisEternity, 18000)/60))+"x"
        document.getElementById("92desc").textContent = "Currently: "+shortenMoney(Decimal.pow(2, 600/Math.max(player.bestEternity, 20)))+"x"
        document.getElementById("93desc").textContent = "Currently: "+shortenMoney(Decimal.pow(player.totalTickGained, 0.25).max(1))+"x"
        document.getElementById("121desc").textContent = "Currently: "+((253 - averageEp.dividedBy(player.epmult).dividedBy(10).min(248).max(3))/5).toFixed(1)+"x"
        document.getElementById("123desc").textContent = "Currently: "+Math.sqrt(1.39*player.thisEternity/10).toFixed(1)+"x"
        document.getElementById("141desc").textContent = "Currently: "+shortenMoney(new Decimal(1e45).dividedBy(Decimal.pow(15, Math.log(player.thisInfinityTime)*Math.pow(player.thisInfinityTime, 0.125))).max(1))+"x"
        document.getElementById("142desc").textContent = "You gain "+shortenCosts(1e25)+"x more IP"
        document.getElementById("143desc").textContent = "Currently: "+shortenMoney(Decimal.pow(15, Math.log(player.thisInfinityTime)*Math.pow(player.thisInfinityTime, 0.125)))+"x"
        document.getElementById("151desc").textContent = shortenCosts(1e4)+"x multiplier on all Time dimensions"
        document.getElementById("161desc").textContent = shortenCosts(Decimal.pow(10,(player.galacticSacrifice?6660:616)*(player.aarexModifications.newGameExpVersion?5:1)))+"x multiplier on all normal dimensions"
        document.getElementById("162desc").textContent = shortenCosts(Decimal.pow(10,(player.galacticSacrifice?234:11)*(player.aarexModifications.newGameExpVersion?5:1)))+"x multiplier on all Infinity dimensions"
        document.getElementById("192desc").textContent = "You can get beyond "+shortenMoney(Number.MAX_VALUE)+" replicantis, but the interval is increased the more you have"
        document.getElementById("193desc").textContent = "Currently: "+shortenMoney(Decimal.pow(1.03, getEternitied()).min("1e13000"))+"x"
        document.getElementById("212desc").textContent = "Currently: "+((tsMults[212]()-1)*100).toFixed(2)+"%"
        document.getElementById("214desc").textContent = "Currently: "+shortenMoney(((tmp.sacPow.pow(8)).min("1e46000").times(tmp.sacPow.pow(1.1)).div(tmp.sacPow)).max(1).min(new Decimal("1e125000")))+"x"
        document.getElementById("metaCost").textContent = shortenCosts(getMetaUnlCost());
}

function eternityChallengeUnlockDisplay(){
	var ec1Mult=player.aarexModifications.newGameExpVersion?1e3:2e4
        if (player.etercreq !== 1) document.getElementById("ec1unl").innerHTML = "Eternity Challenge 1<span>Requirement: "+(ECTimesCompleted("eterc1")+1)*ec1Mult+" Eternities<span>Cost: 30 Time Theorems"
        else document.getElementById("ec1unl").innerHTML = "Eternity Challenge 1<span>Cost: 30 Time Theorems"
        if (player.etercreq !== 2) document.getElementById("ec2unl").innerHTML = "Eternity Challenge 2<span>Requirement: "+(1300+(ECTimesCompleted("eterc2")*150))+" Tickspeed upgrades gained from time dimensions<span>Cost: 35 Time Theorems"
        else document.getElementById("ec2unl").innerHTML = "Eternity Challenge 2<span>Cost: 35 Time Theorems"
        if (player.etercreq !== 3) document.getElementById("ec3unl").innerHTML = "Eternity Challenge 3<span>Requirement: "+(17300+(ECTimesCompleted("eterc3")*1250))+" 8th dimensions<span>Cost: 40 Time Theorems"
        else document.getElementById("ec3unl").innerHTML = "Eternity Challenge 3<span>Cost: 40 Time Theorems"
        if (player.etercreq !== 4) document.getElementById("ec4unl").innerHTML = "Eternity Challenge 4<span>Requirement: "+(1e8 + (ECTimesCompleted("eterc4")*5e7)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" infinities<span>Cost: 70 Time Theorems"
        else document.getElementById("ec4unl").innerHTML = "Eternity Challenge 4<span>Cost: 70 Time Theorems"
        if (player.etercreq !== 5) document.getElementById("ec5unl").innerHTML = "Eternity Challenge 5<span>Requirement: "+(160+(ECTimesCompleted("eterc5")*14))+" galaxies<span>Cost: 130 Time Theorems"
        else document.getElementById("ec5unl").innerHTML = "Eternity Challenge 5<span>Cost: 130 Time Theorems"
        if (player.etercreq !== 6) document.getElementById("ec6unl").innerHTML = "Eternity Challenge 6<span>Requirement: "+(40+(ECTimesCompleted("eterc6")*5))+" replicanti galaxies<span>Cost: 85 Time Theorems"
        else document.getElementById("ec6unl").innerHTML = "Eternity Challenge 6<span>Cost: 85 Time Theorems"
        if (player.etercreq !== 7) document.getElementById("ec7unl").innerHTML = "Eternity Challenge 7<span>Requirement: "+shortenCosts(new Decimal("1e500000").times(new Decimal("1e300000").pow(ECTimesCompleted("eterc7"))))+" antimatter <span>Cost: 115 Time Theorems"
        else document.getElementById("ec7unl").innerHTML = "Eternity Challenge 7<span>Cost: 115 Time Theorems"
        if (player.etercreq !== 8) document.getElementById("ec8unl").innerHTML = "Eternity Challenge 8<span>Requirement: "+shortenCosts(new Decimal("1e4000").times(new Decimal("1e1000").pow(ECTimesCompleted("eterc8"))))+" IP <span>Cost: 115 Time Theorems"
        else document.getElementById("ec8unl").innerHTML = "Eternity Challenge 8<span>Cost: 115 Time Theorems"
        if (player.etercreq !== 9) document.getElementById("ec9unl").innerHTML = "Eternity Challenge 9<span>Requirement: "+shortenCosts(new Decimal("1e17500").times(new Decimal("1e2000").pow(ECTimesCompleted("eterc9"))))+" infinity power<span>Cost: 415 Time Theorems"
        else document.getElementById("ec9unl").innerHTML = "Eternity Challenge 9<span>Cost: 415 Time Theorems"
        if (player.etercreq !== 10) document.getElementById("ec10unl").innerHTML = "Eternity Challenge 10<span>Requirement: "+shortenCosts(new Decimal("1e100").times(new Decimal("1e20").pow(ECTimesCompleted("eterc10"))))+" EP<span>Cost: 550 Time Theorems"
        else document.getElementById("ec10unl").innerHTML = "Eternity Challenge 10<span>Cost: 550 Time Theorems"

        document.getElementById("ec11unl").innerHTML = "Eternity Challenge 11<span>Requirement: Use only the Normal Dimension path<span>Cost: 1 Time Theorem"
        document.getElementById("ec12unl").innerHTML = "Eternity Challenge 12<span>Requirement: Use only the Time Dimension path<span>Cost: 1 Time Theorem"
}

function mainTimeStudyDisplay(){
	initialTimeStudyDisplay()
	eternityChallengeUnlockDisplay()
	document.getElementById("dilstudy1").innerHTML = "Unlock time dilation"+(player.dilation.studies.includes(1)?"":"<span>Requirement: 5 EC11 and EC12 completions and "+getFullExpansion(getDilationTotalTTReq())+" total theorems")+"<span>Cost: "+getFullExpansion(5e3)+" Time Theorems"
	if (tmp.ngp3) {
		var ts232display = tmp.ts232*100-100
		document.getElementById("221desc").textContent = "Currently: "+shorten(Decimal.pow(1.0025, player.resets))+"x"
		document.getElementById("227desc").textContent = "Currently: "+shorten(Math.pow(tmp.sacPow.max(10).log10(), 10))+"x"
		document.getElementById("231desc").textContent = "Currently: "+shorten(Decimal.pow(Math.max(player.resets, 1), 0.3))+"x more power"
		document.getElementById("232desc").textContent = "Currently: "+(ts232display>=999.95?getFullExpansion(Math.floor(ts232display)):ts232display.toFixed(1))+"%"
	}
}

function updateInfCosts() {
	if (document.getElementById("replicantis").style.display == "block" && document.getElementById("infinity").style.display == "block") replicantiDisplay()
	if (document.getElementById("timestudies").style.display == "block" && document.getElementById("eternitystore").style.display == "block") mainTimeStudyDisplay()
	if (document.getElementById("ers_timestudies").style.display == "block" && document.getElementById("eternitystore").style.display == "block") updateERSTTDesc()
}

function toggleProductionTab() {
	// 0 == visible, 1 == not visible
	player.aarexModifications.hideProductionTab=!player.aarexModifications.hideProductionTab
	document.getElementById("hideProductionTab").textContent = (player.aarexModifications.hideProductionTab?"Show":"Hide")+" production tab"
	if (document.getElementById("production").style.display=="block") showDimTab("antimatterdimensions")
}

function toggleRepresentation() {
	// 0 == visible, 1 == not visible
	player.aarexModifications.hideRepresentation=!player.aarexModifications.hideRepresentation
	document.getElementById("hideRepresentation").textContent=(player.aarexModifications.hideRepresentation?"Show":"Hide")+" antimatter representation"
}

// Replicanti stuff
function unlockReplicantis() {
    if (player.infinityPoints.gte(player.galacticSacrifice!=undefined&&player.tickspeedBoosts==undefined?1e80:1e140)) {
        document.getElementById("replicantidiv").style.display="inline-block"
        document.getElementById("replicantiunlock").style.display="none"
        player.replicanti.unl = true
        player.replicanti.amount = new Decimal(1)
        player.infinityPoints = player.infinityPoints.minus(player.galacticSacrifice!=undefined&&player.tickspeedBoosts==undefined?1e80:1e140)
    }
}

function getReplMult(next) {
	let exp = 2
	if (player.galacticSacrifice !== undefined) exp = Math.pow(player.galaxies, .4)
	if (player.boughtDims) {
		exp += (player.timestudy.ers_studies[3] + (next ? 1 : 0)) / 2
		if (player.achievements.includes('r108')) exp *= 1.09;
	}
	let replmult = Decimal.max(player.replicanti.amount.log(2),1).pow(exp)
    	if (player.timestudy.studies.includes(21)) replmult = replmult.plus(Decimal.pow(player.replicanti.amount, 0.032))
    	if (player.timestudy.studies.includes(102)) replmult = replmult.times(Decimal.pow(5, player.replicanti.galaxies))
	return replmult;
}

function upgradeReplicantiChance() {
    	if (player.infinityPoints.gte(player.replicanti.chanceCost) && isChanceAffordable() && player.eterc8repl !== 0) {
		player.replicanti.chanceCost = player.replicanti.chanceCost.times(1e15)
		if (ghostified) {
			if (player.ghostify.milestones < 11) player.infinityPoints = player.infinityPoints.minus(player.replicanti.chanceCost)
		} else player.infinityPoints = player.infinityPoints.minus(player.replicanti.chanceCost)
        	player.replicanti.chance = Math.round(player.replicanti.chance*100+1)/100
        	if (player.currentEternityChall == "eterc8") player.eterc8repl-=1
        	document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
    	}
}

function isChanceAffordable() {
	return (tmp.ngp3 ? player.masterystudies.includes("t265") : false) || player.replicanti.chance < 1
}

function upgradeReplicantiInterval() {
    	if (player.infinityPoints.gte(player.replicanti.intervalCost) && isIntervalAffordable() && player.eterc8repl !== 0) {
        	player.infinityPoints = player.infinityPoints.minus(player.replicanti.intervalCost)
        	player.replicanti.interval *= 0.9
        	if (player.replicanti.interval < 1) player.replicanti.intervalCost = Decimal.pow("1e800",1/player.replicanti.interval)
        	else player.replicanti.intervalCost = player.replicanti.intervalCost.times(1e10)
        	if (!isIntervalAffordable()) player.replicanti.interval = (player.timestudy.studies.includes(22) || player.boughtDims ? 1 : 50)
        	if (player.currentEternityChall == "eterc8") player.eterc8repl-=1
        	document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
    	}
}

function getReplicantiLimit() {
	if (player.boughtDims) return player.replicanti.limit
	return Number.MAX_VALUE
}

function isIntervalAffordable() {
	if (tmp.ngp3) if (player.masterystudies.includes("t271")) return true
	return player.replicanti.interval > (player.timestudy.studies.includes(22) || player.boughtDims ? 1 : 50)
}

function getRGCost(offset=0, costChange) {
	let ret = player.replicanti.galCost
	if (offset > 0) {
		if (inQC(5)) return player.replicanti.galCost.pow(Math.pow(1.2, offset))
		else {
			let increase = 0
			if (player.currentEternityChall == "eterc6") increase = offset * ((offset + player.replicanti.gal * 2) + 3)
			else increase = offset * (2.5 * (offset + player.replicanti.gal * 2) + 22.5)
			if (player.replicanti.gal + offset > 99) increase += (offset - Math.max(99 - player.replicanti.gal, 0)) * (25 * (offset - Math.max(99 - player.replicanti.gal, 0) + Math.max(player.replicanti.gal, 99) * 2) - 4725)
			if (player.replicanti.gal + offset > 399) {
				if (player.exdilation != undefined) for (var g = Math.max(player.replicanti.gal, 399); g < player.replicanti.gal + offset; g++) increase += Math.pow(g - 389, 2)
				if (player.meta != undefined) {
					var isReduced = false
					if (player.masterystudies != undefined) if (player.masterystudies.includes("t266")) isReduced = true
					if (isReduced) {
						increase += (offset - Math.max(399 - player.replicanti.gal, 0)) * (1500 * (offset - Math.max(399 - player.replicanti.gal, 0) + Math.max(player.replicanti.gal, 399) * 2) - 1183500)
						if (player.replicanti.gal + offset > 2998) increase += (offset - Math.max(2998 - player.replicanti.gal, 0)) * (5e3 * (offset - Math.max(2998 - player.replicanti.gal, 0) + Math.max(player.replicanti.gal, 2998) * 2) - 29935e3)
						if (player.replicanti.gal + offset > 58198) increase += (offset - Math.max(58199 - player.replicanti.gal, 0)) * (1e6 * (offset - Math.max(58199 - player.replicanti.gal, 0) + Math.max(player.replicanti.gal, 58199) * 2) - 58199e6)
					} else for (var g = Math.max(player.replicanti.gal, 399); g < player.replicanti.gal + offset; g++) increase += 5 * Math.floor(Math.pow(1.2, g - 394))
				}
			}
			ret = ret.times(Decimal.pow(10, increase))
		}
	}
	if (player.timestudy.studies.includes(233) && !costChange) ret = ret.dividedBy(player.replicanti.amount.pow(0.3))
	return ret
}

function upgradeReplicantiGalaxy() {
	var cost = getRGCost()
	if (player.infinityPoints.gte(cost) && player.eterc8repl !== 0) {
		player.infinityPoints = player.infinityPoints.minus(cost)
		player.replicanti.galCost = getRGCost(1)
		player.replicanti.gal += 1
		if (player.currentEternityChall == "eterc8") player.eterc8repl -= 1
		document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
		return true
	}
	return false
}

var extraReplGalaxies = 0
function replicantiGalaxy() {
	var maxGal=getMaxRG()
	if (!canGetReplicatedGalaxy()) return
	if (player.galaxyMaxBulk) player.replicanti.galaxies=maxGal
	else player.replicanti.galaxies++
	if (tmp.ngp3l||!player.achievements.includes("ng3p67")) player.replicanti.amount=Decimal.div(player.achievements.includes("r126")?player.replicanti.amount:1,Number.MAX_VALUE).max(1)
	galaxyReset(0)
}

function canGetReplicatedGalaxy() {
	return player.replicanti.galaxies < getMaxRG() && player.replicanti.amount.gte(getReplicantiLimit())
}

function canAutoReplicatedGalaxy() {
	return speedrunMilestonesReached >= 20 || !player.timestudy.studies.includes(131)
}

function getMaxRG() {
	let ret=player.replicanti.gal
	if (player.timestudy.studies.includes(131)) ret+=Math.floor(ret*0.5)
	return ret
}

function autoBuyRG() {
	if (!player.infinityPoints.gte(getRGCost())) return
	let increment = 1
	while (player.infinityPoints.gte(getRGCost(increment - 1))) increment *= 2
	let toBuy = 0
	while (increment >= 1) {
		if (player.infinityPoints.gte(getRGCost(toBuy + increment - 1))) toBuy += increment
		increment /= 2
	}
	let newIP = player.infinityPoints
	let cost = getRGCost(toBuy - 1)
	let toBuy2 = toBuy
	while (toBuy > 0 && newIP.div(cost).lt(1e16)) {
		if (newIP.gte(cost)) newIP = newIP.sub(cost)
		else {
			newIP = player.infinityPoints.sub(cost)
			toBuy2--
		}
		toBuy--
		cost = getRGCost(toBuy - 1)
	}
	player.replicanti.infinityPoints = newIP
	player.replicanti.galCost = getRGCost(toBuy2, true)
	player.replicanti.gal += toBuy2
}

function updateExtraReplGalaxies() {
	let ts225Eff = 0
	let ts226Eff = 0
	let speed = tmp.qcRewards[8] * 2
	if (player.timestudy.studies.includes(225)) {
		ts225Eff = Math.floor(player.replicanti.amount.e / 1e3)
		if (ts225Eff > 99) ts225Eff = Math.floor(Math.sqrt(0.25 + (ts225Eff - 99) * speed) + 98.5)
	}
	if (player.timestudy.studies.includes(226)) {
		ts226Eff = Math.floor(player.replicanti.gal / 15)
		if (ts226Eff > 99) ts226Eff = Math.floor(Math.sqrt(0.25 + (ts226Eff - 99) * speed) + 98.5)
	}
	extraReplGalaxies = ts225Eff + ts226Eff
	if (extraReplGalaxies > 325) extraReplGalaxies = (Math.sqrt(0.9216+0.16*(extraReplGalaxies-324))-0.96)/0.08+324
	if (tmp.ngp3) {
		let expData={
			normal: 1/3,
			ts362: 0.4,
			legacy: 0.25,
			ts362legacy: 0.35
		}
		let expVarName=(player.masterystudies.includes("t362")?"ts362":"")+(tmp.ngp3l?"legacy":"")
		if (expVarName=="") expVarName="normal"
		let exp=expData[expVarName]
		if (!tmp.ngp3l&&player.masterystudies.includes("t412")) exp=.5

		tmp.pe=Math.pow(tmp.qu.replicants.quarks.add(1).log10(),exp)
		tmp.pe*=tmp.ngp3l?0.67*(player.masterystudies.includes("t412")?1.25:1):0.8
		if (player.ghostify.ghostlyPhotons.unl) tmp.pe*=tmp.le[3]
		extraReplGalaxies*=colorBoosts.g+tmp.pe
	}
	extraReplGalaxies = Math.floor(extraReplGalaxies)
}

function getTotalRG() {
	return player.replicanti.galaxies + extraReplGalaxies
}

function updateMilestones() {
    	var moreUnlocked = tmp.ngp3 && (player.dilation.upgrades.includes("ngpp3") || quantumed)
    	var milestoneRequirements = [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 25, 30, 40, 50, 60, 80, 100, 1e9, 2e10, 4e11, 1e13]
    	for (i=0; i<(moreUnlocked?28:24); i++) {
        	var name = "reward" + i;
        	if (i > 23) document.getElementById("milestone" + i).textContent = shortenMoney(milestoneRequirements[i]) + " Eternities:"
        	if (getEternitied() >= milestoneRequirements[i]) {
			document.getElementById(name).className = "milestonereward"
		} else {
			document.getElementById(name).className = "milestonerewardlocked"
        	}
	}
    	document.getElementById("mdmilestonesrow1a").style.display = moreUnlocked ? "" : "none"
    	document.getElementById("mdmilestonesrow1b").style.display = moreUnlocked ? "" : "none"
    	document.getElementById("mdmilestonesrow2a").style.display = moreUnlocked ? "" : "none"
    	document.getElementById("mdmilestonesrow2b").style.display = moreUnlocked ? "" : "none"
}

function replicantiGalaxyAutoToggle() {
	player.replicanti.galaxybuyer=!player.replicanti.galaxybuyer
	document.getElementById("replicantiresettoggle").textContent="Auto galaxy "+(player.replicanti.galaxybuyer?"ON":"OFF")+(!canAutoReplicatedGalaxy()?" (disabled)":"")
}

function infMultAutoToggle() {
	if (getEternitied()<1) {
		if (canBuyIPMult()) {
			var toBuy=Math.max(Math.floor(player.infinityPoints.div(player.infMultCost).times(ipMultCostIncrease-1).plus(1).log(ipMultCostIncrease)),1)
			var toSpend=Decimal.pow(ipMultCostIncrease,toBuy).sub(1).div(ipMultCostIncrease-1).times(player.infMultCost).round()
			if (toSpend.gt(player.infinityPoints)) player.infinityPoints=new Decimal(0)
			else player.infinityPoints=player.infinityPoints.sub(toSpend)
			player.infMult=player.infMult.times(Decimal.pow(getIPMultPower(),toBuy))
			player.infMultCost=player.infMultCost.times(Decimal.pow(ipMultCostIncrease,toBuy))
		}
	} else {
		player.infMultBuyer=!player.infMultBuyer
		document.getElementById("infmultbuyer").textContent = "Autobuy IP mult O"+(player.infMultBuyer?"N":"FF")
	}
}


function toggleCrunchMode(freeze) {
    	if (player.autoCrunchMode == "amount") {
        	player.autoCrunchMode = "time"
        	document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: time"
        	document.getElementById("limittext").textContent = "Seconds between crunches:"
    	} else if (player.autoCrunchMode == "time"){
        	player.autoCrunchMode = "relative"
        	document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: X times last crunch"
        	document.getElementById("limittext").textContent = "X times last crunch:"
    	} else if (player.autoCrunchMode == "relative" && player.boughtDims){
        	player.autoCrunchMode = "replicanti"
        	document.getElementById("togglecrunchmode").innerHTML = "Auto crunch mode: replicated galaxies"
        	document.getElementById("limittext").innerHTML = "Replicanti galaxies needed for crunch:"
        	document.getElementById("maxReplicantiCrunchSwitchDiv").style.display = 'inline'
    	} else {
        	player.autoCrunchMode = "amount"
        	document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: amount"
        	document.getElementById("limittext").textContent = "Amount of IP to wait until reset:"
        	document.getElementById("maxReplicantiCrunchSwitchDiv").style.display = 'none'
        	if (!freeze&&player.autobuyers[11].priority.toString().toLowerCase()=="max") {
			player.autobuyers[11].priority = new Decimal(1)
            		document.getElementById("priority12").value=1
		}
	}
}

function toggleEternityConf() {
    	player.options.eternityconfirm = !player.options.eternityconfirm
    	document.getElementById("eternityconf").textContent = "Eternity confirmation: O" + (player.options.eternityconfirm ? "N" : "FF")
}

function toggleDilaConf() {
    	player.aarexModifications.dilationConf = !player.aarexModifications.dilationConf
    	document.getElementById("dilationConfirmBtn").textContent = "Dilation confirmation: O" + (player.aarexModifications.dilationConf ? "N" : "FF")
}


function toggleReplAuto(i) {
    	if (i == "chance") {
        	if (player.replicanti.auto[0]) {
			player.replicanti.auto[0] = false
            		document.getElementById("replauto1").textContent = "Auto: OFF"
		} else {
            		player.replicanti.auto[0] = true
            		document.getElementById("replauto1").textContent = "Auto: ON"
		}
	} else if (i == "interval") {
		if (player.replicanti.auto[1]) {
            		player.replicanti.auto[1] = false
            		document.getElementById("replauto2").textContent = "Auto: OFF"
		} else {
			player.replicanti.auto[1] = true
			document.getElementById("replauto2").textContent = "Auto: ON"
		}
	} else if (i == "galaxy") {
		if (player.replicanti.auto[2]) {
			player.replicanti.auto[2] = false
			document.getElementById("replauto3").textContent = "Auto: OFF"
		} else {
			player.replicanti.auto[2] = true
			document.getElementById("replauto3").textContent = "Auto: ON"
		}
	}
}


buyAutobuyer = function(id) {
   	if (player.infinityUpgradesRespecced != undefined && player.autobuyers[id].interval == 100 && id > 8) {
        	if (player.autobuyers[id].bulkBought || player.infinityPoints.lt(1e4) || id > 10) return
        	player.infinityPoints = player.infinityPoints.sub(1e4)
        	player.autobuyers[id].bulkBought = true
        	updateAutobuyers()
        	return
	}
    	if ((player.aarexModifications.ngmX>3&&id!=11?player.galacticSacrifice.galaxyPoints:player.infinityPoints).lt(player.autobuyers[id].cost)) return false;
    	if (player.autobuyers[id].bulk >= 1e100) return false;
    	if (player.aarexModifications.ngmX>3&&id!=11) player.galacticSacrifice.galaxyPoints = player.galacticSacrifice.galaxyPoints.minus(player.autobuyers[id].cost)
    	else player.infinityPoints = player.infinityPoints.minus(player.autobuyers[id].cost)
    	if (player.autobuyers[id].interval <= 100) {
        	player.autobuyers[id].bulk = Math.min(player.autobuyers[id].bulk * 2, 1e100);
        	player.autobuyers[id].cost = Math.ceil(2.4*player.autobuyers[id].cost);
        	var b1 = true;
		for (let i=0;i<8;i++) {
			if (player.autobuyers[i].bulk < 512) b1 = false;
		}
		if (b1) giveAchievement("Bulked up");
	} else {
		player.autobuyers[id].interval = Math.max(player.autobuyers[id].interval*0.6, 100);
		if (player.autobuyers[id].interval > 120) player.autobuyers[id].cost *= 2; //if your last purchase wont be very strong, dont double the cost
	}
    	updateAutobuyers();
}

document.getElementById("buyerBtn1").onclick = function () {
    buyAutobuyer(0);
}

document.getElementById("buyerBtn2").onclick = function () {

    buyAutobuyer(1);
}

document.getElementById("buyerBtn3").onclick = function () {
    buyAutobuyer(2);
}

document.getElementById("buyerBtn4").onclick = function () {
    buyAutobuyer(3);
}

document.getElementById("buyerBtn5").onclick = function () {
    buyAutobuyer(4);
}

document.getElementById("buyerBtn6").onclick = function () {
    buyAutobuyer(5);
}

document.getElementById("buyerBtn7").onclick = function () {
    buyAutobuyer(6);
}

document.getElementById("buyerBtn8").onclick = function () {
    buyAutobuyer(7);
}

document.getElementById("buyerBtnTickSpeed").onclick = function () {
    buyAutobuyer(8);
}

document.getElementById("buyerBtnDimBoost").onclick = function () {
    buyAutobuyer(9);
}

document.getElementById("buyerBtnGalaxies").onclick = function () {
    buyAutobuyer(10);
}

document.getElementById("buyerBtnInf").onclick = function () {
    buyAutobuyer(11);
}

toggleAutobuyerTarget = function(id) {
    if (player.autobuyers[id-1].target == id) {
        player.autobuyers[id-1].target = 10 + id
        document.getElementById("toggleBtn" + id).textContent = "Buys until 10"
    } else {
        player.autobuyers[id-1].target = id
        document.getElementById("toggleBtn" + id).textContent = "Buys singles"
    }
}

document.getElementById("toggleBtn1").onclick = function () {
    toggleAutobuyerTarget(1)
}

document.getElementById("toggleBtn2").onclick = function () {
    toggleAutobuyerTarget(2)
}

document.getElementById("toggleBtn3").onclick = function () {
    toggleAutobuyerTarget(3)
}

document.getElementById("toggleBtn4").onclick = function () {
    toggleAutobuyerTarget(4)
}

document.getElementById("toggleBtn5").onclick = function () {
    toggleAutobuyerTarget(5)
}

document.getElementById("toggleBtn6").onclick = function () {
    toggleAutobuyerTarget(6)
}

document.getElementById("toggleBtn7").onclick = function () {
    toggleAutobuyerTarget(7)
}

document.getElementById("toggleBtn8").onclick = function () {
    toggleAutobuyerTarget(8)
}

document.getElementById("toggleBtnTickSpeed").onclick = function () {
    if (player.autobuyers[8].target == 1) {
        player.autobuyers[8].target = 10
        document.getElementById("toggleBtnTickSpeed").textContent = "Buys max"
    } else {
        player.autobuyers[8].target = 1
        document.getElementById("toggleBtnTickSpeed").textContent = "Buys singles"
    }
}

document.getElementById("save").onclick = function () {
    saved++
    if (saved > 99) giveAchievement("Just in case")
    save_game();
};

var loadedSaves=0
var onLoading=false
var latestRow
var loadSavesIntervalId
var occupied=false
function load_saves() {
	closeToolTip()
	document.getElementById("loadmenu").style.display = "block"
	changeSaveDesc(metaSave.current, savePlacement)
	clearInterval(loadSavesIntervalId)
	occupied=false
	loadSavesIntervalId=setInterval(function(){
		if (occupied) return
		else occupied=true
		if (loadedSaves==metaSave.saveOrder.length) {
			clearInterval(loadSavesIntervalId)
			return
		} else if (!onLoading) {
			latestRow=document.getElementById("saves").insertRow(loadedSaves)
			onLoading=true
		}
		try {
			var id=metaSave.saveOrder[loadedSaves]
			latestRow.innerHTML=getSaveLayout(id)
			changeSaveDesc(id, loadedSaves+1)
			loadedSaves++
			onLoading=false
		} catch (_) {}
		occupied=false
	}, 0)
}

function getSaveLayout(id) {
	return "<b id='save_"+id+"_title'>Save #"+(loadedSaves+1)+"</b><div id='save_"+id+"_desc'></div><button class='storebtn' onclick='overwrite_save("+id+")'>Save</button><button class='storebtn' onclick='change_save("+id+")'>Load</button><button class='storebtn' onclick='rename_save("+id+")'>Rename</button><button class='storebtn' onclick='export_save("+id+")'>Export</button><button class='storebtn' onclick='import_save("+id+")'>Import</button><button class='storebtn' onclick='move("+id+",-1)'>Move up</button><button class='storebtn' onclick='move("+id+",1)'>Move down</button><button class='storebtn' onclick='delete_save("+id+")'>Delete</button>"
}

function changeSaveDesc(saveId, placement) {
	var element=document.getElementById("save_"+saveId+"_desc")
	if (element==undefined) return
	try {
		var isSaveCurrent=metaSave.current==saveId
		var temp=isSaveCurrent?player:get_save(saveId)
		if (temp.aarexModifications==null) temp.aarexModifications={}
		var msg=""
		var exp=""
		if (temp.aarexModifications.newGameExpVersion) exp+="^"
		if (temp.aarexModifications.newGameMult) exp+="*"
		if (temp.exdilation) {
			msg+=(temp.meta||exp!=""||temp.aarexModifications.newGameMinusVersion||temp.galacticSacrifice)?"Ud":" Update"
			if (temp.aarexModifications.nguepV) msg+="^"
			if (temp.aarexModifications.ngumuV) msg+="*"
			if (temp.aarexModifications.nguspV) msg+="S'"
			else if (temp.aarexModifications.ngudpV) msg+="'"
			msg+=exp
			if (!temp.aarexModifications.nguspV&&!temp.aarexModifications.ngudpV&&temp.meta) msg+="+"
		} else if (temp.meta) msg+=exp+"++"+(temp.masterystudies?"+":"")
		else if (temp.aarexModifications.newGamePlusVersion) msg+=exp+"+"
		if (temp.masterystudies) {
			if (temp.aarexModifications.ngp4V) {
				msg+="+"
				if (!temp.exdilation) msg=exp+"+4"
			}
			if (temp.aarexModifications.ngp3lV) msg+="L"
		}
		if (temp.aarexModifications.ngmX>3) msg+="-"+temp.aarexModifications.ngmX
		else if (temp.galacticSacrifice) msg+="--"+(temp.tickspeedBoosts!=undefined?"-":"")
		else if (temp.aarexModifications.newGameMinusVersion) msg+="-"
		var ex=temp.aarexModifications.ngexV
		if (temp.boughtDims) msg=msg!=""||ex?"ER"+msg:"Eternity Respecced"
		else if (temp.singularity) msg=msg!=""||ex?"IR"+msg:"Infinity Respecced"
		else msg="NG"+msg
		if (ex) msg=msg=="NG"?"Expert Mode":msg+"Ex"
		if (temp.galacticSacrifice&&temp.aarexModifications.newGameMinusVersion) msg+=", NG-"
		if ((temp.exdilation||temp.meta)&&!temp.aarexModifications.newGamePlusVersion) msg+=", no NG+ features"
		msg=(msg=="NG"?"":msg+"<br>")+(isSaveCurrent?"Selected<br>":"Played for "+timeDisplayShort(temp.totalTimePlayed)+"<br>")
		var originalBreak=player.break
		var originalNotation=player.options.notation
		var originalCommas=player.options.commas
		if (!isSaveCurrent) {
			player.break=temp.achievements.includes("r51")
			player.options.notation=temp.options.notation
			player.options.commas=temp.options.commas
		}
		var isSaveGhostified=temp.ghostify?temp.ghostify.times>0:false
		var isSaveQuantumed=temp.quantum?temp.quantum.times>0:false
		if (isSaveGhostified) {
			if (temp.achievements.includes("ng3p81")) {
				var data=temp.ghostify.wzb
				msg+="Bosonic Antimatter: "+shorten(new Decimal(temp.ghostify.bl.am))+", W+ Bosons: "+shortenDimensions(new Decimal(data.wpb))+", W- Bosons: "+shortenDimensions(new Decimal(data.wnb))+", Z Bosons: "+shortenDimensions(new Decimal(data.zb))
			} else if (temp.achievements.includes("ng3p71")) {
				var data=temp.ghostify.ghostlyPhotons
				var lights=0
				for (var l=0;l<8;l++) lights+=data.lights[l]
				msg+="Ghostly Photons: "+shortenDimensions(new Decimal(data.amount))+", Dark Matter: "+shortenDimensions(new Decimal(data.darkMatter))+", Ghostly Rays: "+shortenDimensions(new Decimal(data.ghostlyRays))+", Lights: "+getFullExpansion(lights)+", Light Empowerments: "+getFullExpansion(data.enpowerments)
			} else msg+="Ghost Particles: "+shortenDimensions(new Decimal(temp.ghostify.ghostParticles))+", Neutrinos: "+shortenDimensions(Decimal.add(temp.ghostify.neutrinos.electron, temp.ghostify.neutrinos.mu).add(temp.ghostify.neutrinos.tau).round())
		} else if (isSaveQuantumed) {
			if (!temp.masterystudies) msg+="End-game of NG++"
			else if (temp.masterystudies.includes('d14')) msg+="Total antimatter in Big Rips: "+shortenDimensions(new Decimal(temp.quantum.bigRip.totalAntimatter))+", Space Shards: "+shortenDimensions(new Decimal(temp.quantum.bigRip.spaceShards))+(temp.achievements.includes("ng3p55")?", Eternal Matter: "+shortenDimensions(new Decimal(temp.quantum.breakEternity.eternalMatter)):"")
			else {
				msg+="Quarks: "+shortenDimensions(Decimal.add(temp.quantum.quarks,temp.quantum.usedQuarks.r).add(temp.quantum.usedQuarks.g).add(temp.quantum.usedQuarks.b))
				if (temp.quantum.gluons.rg) msg+=", Gluons: "+shortenDimensions(Decimal.add(temp.quantum.gluons.rg,temp.quantum.gluons.gb).add(temp.quantum.gluons.br))
				if (temp.masterystudies.includes('d13')) msg+=", Quark Spins: "+shortenDimensions(Decimal.add(temp.quantum.tod.r.spin, temp.quantum.tod.g.spin).add(temp.quantum.tod.b.spin))
				else if (temp.masterystudies.includes('d12')) msg+=", Preon charge: "+shortenDimensions(new Decimal(temp.quantum.nanofield.charge))+", Preon energy: "+shortenDimensions(new Decimal(temp.quantum.nanofield.energy))+", Preon anti-energy: "+shortenDimensions(new Decimal(temp.quantum.nanofield.antienergy))+", Nanofield Rewards: "+getFullExpansion(temp.quantum.nanofield.rewards)
				else if (temp.masterystudies.includes('d10')) msg+=", Replicants: "+shortenDimensions(getTotalReplicants(temp))+", Worker replicants: "+shortenDimensions(getTotalWorkers(temp))
				else if (temp.masterystudies.includes('d9')) msg+=", Paired challenges: "+temp.quantum.pairedChallenges.completed
				else if (temp.masterystudies.includes('d8')) {
					var completions=0
					if (typeof(temp.quantum.challenges)=="number") completions=temp.quantum.challenges
					else for (c=1;c<9;c++) if (temp.quantum.challenges[c]) completions++
					msg+=", Challenge completions: "+completions
				} else {
					msg+=", Best quantum: "+timeDisplayShort(temp.quantum.best)
					if (temp.masterystudies.includes('d7')) msg+=", Electrons: "+shortenDimensions(temp.quantum.electrons.amount)
				}
			}
		} else if (temp.exdilation==undefined?false:temp.blackhole.unl) {
			var tempstart="Eternity points: "+shortenDimensions(new Decimal(temp.eternityPoints))
			var tempend=", Black hole power: "+shortenMoney(new Decimal(temp.blackhole.power))
			if (temp.exdilation.times > 0) msg+=tempstart+tempend+", Ex-dilation: "+shortenDimensions(new Decimal(temp.exdilation.unspent))
			else msg+=tempstart+", Dilated time: "+shortenMoney(new Decimal(temp.dilation.dilatedTime))+", Banked infinities: "+getFullExpansion(temp.infinitiedBank)+", Replicanti: "+shortenMoney(new Decimal(temp.replicanti.amount))+tempend
		} else if (temp.dilation?temp.dilation.studies.includes(1):false) {
			var temp2="Tachyon particles: "+shortenMoney(new Decimal(temp.dilation.totalTachyonParticles))+", Dilated time: "+shortenMoney(new Decimal(temp.dilation.dilatedTime))
			if (temp.dilation.studies.includes(6)) temp2+=", Best meta-antimatter: "+shortenMoney(new Decimal(temp.meta.bestAntimatter))+", Meta-dimension shifts/boosts: "+temp.meta.resets
			else if (!temp.dilation.studies.includes(5)) temp2="Time Theorems: "+shortenMoney(getTotalTT(temp))+", "+temp2
			else if (!temp.dilation.upgrades.includes(10)) temp2="Eternity points: "+shortenDimensions(temp.eternityPoints)+", "+temp2
			msg+=temp2
		} else {
			var totalChallengeCompletions=(temp.aarexModifications.newGameMinusVersion?-6:0)
			for (ec=1;ec<13;ec++) totalChallengeCompletions+=(temp.eternityChalls['eterc'+ec]?temp.eternityChalls['eterc'+ec]:0)
			if (totalChallengeCompletions>0) {
				msg+="Time Theorems: "+getFullExpansion(getTotalTT(temp))+", Challenge completions: "+totalChallengeCompletions
			} else if (temp.eternities>(temp.aarexModifications.newGameMinusVersion?-20:0)) msg+="Eternity points: "+shortenDimensions(new Decimal(temp.eternityPoints))+", Eternities: "+temp.eternities.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+", Time Theorems: "+getTotalTT(temp)
			else if (temp.achievements.includes("r51")) {
				msg+="Antimatter: "+shortenMoney(new Decimal(temp.money))+", Infinity points: "+shortenDimensions(new Decimal(temp.infinityPoints))
				if (temp.postChallUnlocked>0&&!temp.replicanti.unlocked) {
					var totalChallengeCompletions=0
					for (ic=1;ic<13;ic++) totalChallengeCompletions+=temp.challenges.includes("postc"+ic)?1:0
					msg+=", Challenge completions: "+totalChallengeCompletions
				}
			} else if (temp.infinitied>(temp.aarexModifications.newGameMinusVersion?990:temp.aarexModifications.newGamePlusVersion?1:0)) msg+="Infinity points: "+shortenDimensions(new Decimal(temp.infinityPoints))+", Infinities: "+temp.infinitied.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+", Challenge completions: "+temp.challenges.length
			else if (temp.galacticSacrifice?temp.galacticSacrifice.times>0:false) msg+="Antimatter: "+shortenMoney(new Decimal(temp.money))+", Galaxy points: "+shortenDimensions(new Decimal(temp.galacticSacrifice.galaxyPoints))
			else msg+="Antimatter: "+shortenMoney(new Decimal(temp.money))+", Dimension shifts/boosts: "+temp.resets+((temp.tickspeedBoosts != undefined ? (temp.resets > 0 || temp.tickspeedBoosts > 0 || temp.galaxies > 0 || temp.infinitied > 0 || temp.eternities != 0 || isSaveQuantumed) : false)?", Tickspeed boosts: "+getFullExpansion(temp.tickspeedBoosts):"")+", Galaxies: "+temp.galaxies
		}
		player.break=originalBreak
		player.options.notation=originalNotation
		player.options.commas=originalCommas

		document.getElementById("save_"+saveId+"_title").textContent=temp.aarexModifications.save_name?temp.aarexModifications.save_name:"Save #"+placement
	} catch (_) {
		var msg="New game"
	}
	element.innerHTML=msg
}

var modsShown = false
var modFullNames = {
  rs: "Respecced",
  arrows: "NG↑",
  ngpp: "NG++",
  ngp: "NG+",
  ngmm: "NG--",
  ngm: "NG-",
  ngud: "NGUd",
  nguep: "NGUd↑'",
  ngmu: "NG*",
  ngumu: "NGUd*'",
  ngex: "Expert Mode",
  aau: "AAU",
  ngprw: "NG+ Reworked"
}
var modSubNames = {
  ngp: ["OFF", "ON", "NG++++"],
  ngpp: ["OFF", "ON", "NG+++", "NG+++ Legacy"],
  arrows: ["Linear (↑⁰)", "Exponential (↑)"/*, "Tetrational (↑↑)"*/],
  ngmm: ["OFF", "ON", "NG---", "NG-4", "NG-5"],
  rs: ["NONE", "Eternity", "Infinity"],
  ngud: ["OFF", "ON", "Prime (')", "Semiprime (S')"/*, "Semiprime.1 (S'.1)"*/],
  nguep: ["Linear' (↑⁰')", "Exponential' (↑')"/*, "Tetrational' (↑↑')"*/]/*,
  ngmu: ["OFF", "ON", "NG**", "NG***"],
  ngumu: ["OFF", "ON", "NGUd**'", "NGUd***'"],
  ngex: ["OFF", "ON", "DEATH MODE 💀"]*/
}
function toggle_mod(id) {
	hasSubMod = Object.keys(modSubNames).includes(id)
	// Change submod
	var subMode = ((modes[id] || 0) + 1) % ((hasSubMod && modSubNames[id].length) || 2)
	if (id == "ngp" && subMode == 2 && (!(modes.ngpp >= 2) || !metaSave.ngp4)) subMode = 0
	else if (id == "ngpp" && subMode == 1 && (modes.ngud || modes.ngex)) subMode = 2
	else if (id == "ngpp" && subMode == 3 && modes.ngex) subMode = 0
	else if (id == "arrows" && subMode == 2 && modes.rs) subMode = 0
	modes[id] = subMode
	// Update displays
	document.getElementById(id+"Btn").textContent=`${modFullNames[id]}: ${hasSubMod?modSubNames[id][subMode]:subMode?"ON":"OFF"}`
	if (id=="ngex"&&subMode) {
		modes.ngp=0
		modes.aau=0
		document.getElementById("ngpBtn").textContent="NG+: OFF"
		document.getElementById("aauBtn").textContent="AAU: OFF"
	}
	if ((id=="ngp"||id=="aau"||((id=="ngpp"||(id=="ngud"&&subMode>1))&&!metaSave.ngp3ex))&&subMode) {
		modes.ngex=0
		document.getElementById("ngexBtn").textContent="Expert Mode: OFF"
	}
	if ((id=="ngpp"||id=="ngud")&&subMode) {
		if (!modes.ngp&&!modes.ngex) toggle_mod("ngp")
		modes.rs=0
		document.getElementById("rsBtn").textContent="Respecced: NONE"
	}
	if (((id=="ngpp"&&!subMode)||(id=="rs"&&subMode))&&modes.ngp==2) {
		modes.ngp=1
		document.getElementById("ngpBtn").textContent="NG+: ON"
	}
	if (((id=="ngud"&&((subMode>1&&!modes.ngpp)||modes.ngpp==1))||(id=="ngex"&&(modes.ngpp==1||modes.ngpp==3)&&metaSave.ngp3ex))&&subMode) {
		modes.ngpp=2
		document.getElementById("ngppBtn").textContent="NG++: NG+++"
	}
	if (id=="ngex"&&!metaSave.ngp3ex&&subMode) {
		modes.ngpp=0
		document.getElementById("ngppBtn").textContent="NG++: OFF"
	}
	if (id=="rs"&&subMode) {
		modes.ngpp=0
		modes.ngud=0
		document.getElementById("ngppBtn").textContent="NG++: OFF"
		document.getElementById("ngudBtn").textContent="NGUd: OFF"
	}
	if (((id=="ngpp"||id=="ngud")&&!subMode)||((id=="rs"||(id=="ngex"&&!metaSave.ngp3ex))&&subMode)) {
		if (modes.ngud>1) {
			modes.ngud=1
			document.getElementById("ngudBtn").textContent="NGUd: ON"
		}
		if (id=="rs"&&modes.arrows>1) {
			modes.arrows=1
			document.getElementById("arrowsBtn").textContent="NG↑: Exponential (↑)"
		}
		modes.nguep=0
		modes.ngumu=0
		document.getElementById("nguepBtn").textContent="NGUd↑': Linear' (↑⁰')"
		document.getElementById("ngumuBtn").textContent="NGUd*': OFF"
	}
	if ((id=="ngumu"||id=="nguep")&&!(modes.ngud>1)&&subMode) {
		modes.ngud=1
		toggle_mod("ngud")
	}

	var ngp3ex=modes.ngex&&modes.ngpp
	if (modes.ngp3ex!=ngp3ex) {
		if (ngp3ex) $.notify("In the deep depths of all Big Rips, a space crystal is impending you with more challenges...")
		modes.ngp3ex=ngp3ex
	}
}
function show_mods() {
	modsShown=!modsShown
	document.getElementById("modsBtn").textContent=modsShown?"Saves":"Mods"
	document.getElementById("savesTab").style.display=modsShown?"none":""
	document.getElementById("modsTab").style.display=modsShown?"":"none"
}

function toggleOfflineProgress() {
	player.aarexModifications.offlineProgress = !player.aarexModifications.offlineProgress
	document.getElementById("offlineProgress").textContent = "Offline progress: O"+(player.aarexModifications.offlineProgress?"N":"FF")
};

document.getElementById("animationoptionsbtn").onclick = function () {
    closeToolTip();
    document.getElementById("animationoptions").style.display = "flex";
};

document.getElementById("confirmations").onclick = function () {
    closeToolTip();
    document.getElementById("confirmationoptions").style.display = "flex";
};

function showVisibilityMenu() {
    closeToolTip();
    document.getElementById("visibilityoptions").style.display = "flex";
};

function showNextModeMessage() {
	if (ngModeMessages.length>0) {
		document.getElementById("welcome").style.display = "flex"
		document.getElementById("welcomeMessage").innerHTML = ngModeMessages[ngModeMessages.length-1]
		ngModeMessages.pop()
	} else document.getElementById("welcome").style.display = "none"
}

function verify_save(obj) {
    if (typeof obj != 'object') return false;


    return true;
}

var onImport = false
function import_save(type) {
	if (type=="current") type=metaSave.current
	else if (type!="new") {
		var placement=1
		while (metaSave.saveOrder[placement-1]!=type) placement++
	}
	onImport = true
	var save_data = prompt("Input your save. "+(type=="new"?"":"("+(type==metaSave.current?"your current save file":"save #"+placement)+" will be overwritten!)"));
	onImport = false
	if (save_data.constructor !== String) save_data = "";
	if (sha512_256(save_data.replace(/\s/g, '').toUpperCase()) === "80b7fdc794f5dfc944da6a445a3f21a2d0f7c974d044f2ea25713037e96af9e3") {
		document.getElementById("body").style.animation = "barrelRoll 5s 1";
		giveAchievement("Do a barrel roll!")
		setTimeout(function(){ document.getElementById("body").style.animation = ""; }, 5000)
	}
	if (sha512_256(save_data.replace(/\s/g, '').toUpperCase()) === "857876556a230da15fe1bb6f410ca8dbc9274de47c1a847c2281a7103dd2c274") giveAchievement("So do I");
	if (sha512_256(save_data.replace(/\s/g, '').toUpperCase()) === "8aaff3cdcf68f6392b172ee9924a22918451e511c8e60b120f09e2c16d4e26ac" && !tmp.ngp3l) giveAchievement("The Forbidden Layer");
	if (sha512_256(save_data) === "de24687ee7ba1acd8f5dc8f71d41a3d4b7f14432fff53a4d4166e7eea48a88c0") {
		player.options.theme = "S1";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else if (sha512_256(save_data) === "76269d18c05c9ebec8a990a096cee046dea042a0421f8ab81d17f34dd1cdbdbf") {
		player.options.theme = "S2";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else if (sha512_256(save_data) === "d764e9a1d1e18081be19f3483b537ae1159ab40d10e096df1d9e857d68d6ba7a") {
		player.options.theme = "S3";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else if (sha512_256(save_data) === "ae0199482ecfa538a03eb37c67866e67a11f1832516c26c7939e971e514d40c5") {
		player.options.theme = "S4";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else if (sha512_256(save_data) === "7a668b64cdfe1bcdf7a38d3858429ee21290268de66b9784afba27dc5225ce28") {
		player.options.theme = "S5";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else if (sha512_256(save_data) === "4f82333af895f5c89e6b2082a7dab5a35b964614e74908961fe915cefca1c6d0") {
		player.options.theme = "S6";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else {
		var decoded_save_data = JSON.parse(atob(save_data, function(k, v) { return (v === Infinity) ? "Infinity" : v; }));
		if (!verify_save(decoded_save_data)) {
			forceHardReset = true
			reset_game()
			forceHardReset = false
			return
		} else if (!decoded_save_data||!save_data) {
			alert('could not load the save..')
			return
		}
		/*
		//Live-server only
		let ghostify_data=decoded_save_data.ghostify
		if (ghostify_data&&ghostify_data.wzb&&ghostify_data.wzb.unlReal!==undefined&&ghostify_data.wzb.unl!=ghostify_data.wzb.unlReal) {
			alert('You are not allowed to import this save.')
			return
		}
		*/
		if (type==metaSave.current) {
			clearInterval(gameLoopIntervalId)
			infiniteCheck2 = false
			player = decoded_save_data;
			if (detectInfinite()) infiniteDetected=true
			if (!game_loaded) {
				set_save(metaSave.current, player)
				document.location.reload(true)
				return
			}
			onLoad()
			if (infiniteDetected) {
				if (document.getElementById("welcome").style.display != "flex") document.getElementById("welcome").style.display = "flex"
				document.getElementById("welcomeMessage").innerHTML = "Because you imported a save that has an Infinite bug in it, saving is disabled. Some functions are disabled to prevent further damage to your save. It is highly recommended that you report this occurrence to the #bugs_and_glitches channel on the Discord server so the bug can be looked into and fixed. You shouldn't try to modify or do anything with the save as it may result in undesirable effects, and will be hard reset after you switch saves or refresh the game."
			}
			startInterval()
		} else if (type=="new") {
			var newSaveId=1
			while (metaSave.saveOrder.includes(newSaveId)) newSaveId++
			metaSave.saveOrder.push(newSaveId)
			localStorage.setItem(btoa(savePrefix+newSaveId),save_data)
			if (!game_loaded) {
				metaSave.current=newSaveId
				localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
				document.location.reload(true)
				return
			}
			latestRow=document.getElementById("saves").insertRow(loadedSaves)
			latestRow.innerHTML=getSaveLayout(newSaveId)
			loadedSaves++
			changeSaveDesc(newSaveId, loadedSaves)
			localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
		} else {
			set_save(type, decoded_save_data)
			if (!game_loaded) {
				metaSave.current=type
				localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
				document.location.reload(true)
				return
			}
			changeSaveDesc(type, placement)
			$.notify("Save #"+placement+" imported", "info")
		}
	}
}

function reset_game() {
	if (!forceHardReset) if (!confirm("Do you really want to erase all your progress?")) return
	clearInterval(gameLoopIntervalId)
	infiniteDetected = false
	updateNewPlayer(true)
	if (!game_loaded) {
		set_save(metaSave.current, player)
		document.location.reload(true)
		return
	}
	save_game(true)
	onLoad()
	startInterval()
};

function canBreakInfinity() {
	if (player.aarexModifications.ngexV) return player.challenges.length == getTotalNormalChallenges() + 1
	return player.autobuyers[11] % 1 != 0 && player.autobuyers[11].interval <= 100
}

function breakInfinity() {
	if (!canBreakInfinity()) return false
	if (player.break && !player.currentChallenge.includes("post")) {
		player.break = false
		document.getElementById("break").textContent = "BREAK INFINITY"
	} else {
		player.break = true
		document.getElementById("break").textContent = "FIX INFINITY"
		giveAchievement("Limit Break")
	}
	if (player.galacticSacrifice) if (player.eternities==0&&player.infinityPoints.lt(Number.MAX_VALUE)&&!quantumed) {
		document.getElementById("quantumBlock").style.display=player.break?"":"none"
		document.getElementById("sacpos").className=player.break?"quantumpos":"eterpos"
		document.getElementById("galaxyPoints2").className=player.break?"QK":"EP"
	}
}

function onPostBreak() {
	return (player.break && inNC(0)) || player.currentChallenge.includes("p")
}

function getIPGain(){
	return gainedInfinityPoints()
}

function getInfinityPointGain(){
	return gainedInfinityPoints()
}

function gainedInfinityPoints(next) {
	let div = 308;
	if (player.timestudy.studies.includes(111)) div = 285;
	else if (player.achievements.includes("r103")) div = 307.8;
	if (player.galacticSacrifice&&player.tickspeedBoosts==undefined) div -= galIP()

	if (player.infinityUpgradesRespecced == undefined) var ret = Decimal.pow(10, player.money.e/div -0.75).times(getIPMult())
	else var ret = player.money.div(Number.MAX_VALUE).pow(2*(1-Math.log10(2))/Decimal.log10(Number.MAX_VALUE)).times(getIPMult())
	if (player.timestudy.studies.includes(41)) ret = ret.times(Decimal.pow(tsMults[41](), player.galaxies + player.replicanti.galaxies))
	if (player.timestudy.studies.includes(51)) ret = ret.times(player.aarexModifications.newGameExpVersion?1e30:1e15)
	if (player.timestudy.studies.includes(141)) ret = ret.times(new Decimal(1e45).dividedBy(Decimal.pow(15, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.125))).max(1))
	if (player.timestudy.studies.includes(142)) ret = ret.times(1e25)
	if (player.timestudy.studies.includes(143)) ret = ret.times(Decimal.pow(15, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.125)))
	if (player.achievements.includes("r116")) ret = ret.times(Decimal.add(getInfinitied(), 1).pow(Math.log10(2)))
	if (player.achievements.includes("r125")) ret = ret.times(Decimal.pow(2, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.11)))
	if (player.dilation.upgrades.includes(7)) ret = ret.times(player.dilation.dilatedTime.max(1).pow(1000))
	if (player.boughtDims) {
		ret = ret.times(Decimal.pow(Math.max(1e4/player.thisInfinityTime),player.timestudy.ers_studies[5]+(next==5?1:0)))
		ret = ret.times(Decimal.pow(player.thisInfinityTime/10,player.timestudy.ers_studies[6]+(next==6?1:0)))
	}
	if (isBigRipUpgradeActive(4)) ret = ret.times(player.replicanti.amount.pow(0.34).max(1))
	return ret.floor()
}

function getIPMult() {
	let mult = player.infMult
	if (player.galacticSacrifice&&player.tickspeedBoosts==undefined) {
		if (player.achievements.includes("r85")) mult = mult.times(4)
		if (player.achievements.includes("r93")) mult = mult.times(4)
		if (player.achievements.includes("r43")) mult = mult.times(1.25)
		if (player.achievements.includes("r55")) mult = mult.times(Math.min(Math.log10(Math.max(6000/player.bestInfinityTime, 10)), 10))
		if (player.achievements.includes("r41")) mult = mult.times(Math.pow(Math.log10(Math.max(player.spreadingCancer, 10)), .05))
		if (player.achievements.includes("r51")) {
			let galaxies = player.galaxies + player.replicanti.galaxies + player.dilation.freeGalaxies
			if (galaxies < 5) mult = mult.times(Math.max(galaxies, 1))
			else if (galaxies < 50) mult = mult.times(Decimal.pow(galaxies+5,0.5).plus(2))
			else mult = mult.times(Decimal.pow(galaxies,0.3).plus(7))
		}
	}
	return mult;
}

function gainedEternityPoints() {
	var ret = Decimal.pow(5, player.infinityPoints.plus(gainedInfinityPoints()).e/(player.achievements.includes("ng3p23")?307.8:308) -0.7).times(player.epmult).times(kongEPMult)
	if (player.aarexModifications.newGameExpVersion) ret = ret.times(10)
	if (player.timestudy.studies.includes(61)) ret = ret.times(tsMults[61]())
	if (player.timestudy.studies.includes(121)) ret = ret.times(((253 - averageEp.dividedBy(player.epmult).dividedBy(10).min(248).max(3))/5)) //x300 if tryhard, ~x60 if not
	else if (player.timestudy.studies.includes(122)) ret = ret.times(35)
	else if (player.timestudy.studies.includes(123)) ret = ret.times(Math.sqrt(1.39*player.thisEternity/10))
	if (player.galacticSacrifice!==undefined&&player.galacticSacrifice.upgrades.includes(51)) ret = ret.times(galMults.u51())
	if (tmp.ngp3) {
		if (tmp.qu.bigRip.active) {
			if (isBigRipUpgradeActive(5)) ret = ret.times(tmp.qu.bigRip.spaceShards.max(1))
			if (isBigRipUpgradeActive(8)) ret = ret.times(tmp.bru[8])
		}
		if (tmp.be) ret = ret.times(getBreakUpgMult(7))
	}
	return ret.floor()
}


function setAchieveTooltip() {
    let alot = document.getElementById("100 antimatter is a lot")
    let ndial = document.getElementById("The 9th Dimension is a lie");
    let apocAchieve = document.getElementById("Antimatter Apocalypse");
    let gal = document.getElementById("You got past The Big Wall")
    let doubleGal = document.getElementById("Double Galaxy");
    let claustrophobic = document.getElementById("Claustrophobic");
    let noPointAchieve = document.getElementById("There's no point in doing that");
    let sanic = document.getElementById("Supersanic")
    let forgotAchieve = document.getElementById("I forgot to nerf that")
    let infinity = document.getElementById("To infinity!")
    let nerf = document.getElementById("I forgot to nerf that")
    let didnt = document.getElementById("You didn't need it anyway")
    let fast = document.getElementById("That's fast!");
    let lot = document.getElementById("That's a lot of infinites");
    let cancer = document.getElementById("Spreading Cancer");
    let zero = document.getElementById("Zero Deaths");
    let potato = document.getElementById("Faster than a potato")
    let potato2 = document.getElementById("Faster than a squared potato")
    let potato3 = document.getElementById("Faster than a potato^286078")
    let dimensional = document.getElementById("Multidimensional")
    let anti = document.getElementById("AntiChallenged")
    let forever = document.getElementById("Forever isn't that long")
    let many = document.getElementById("Many Deaths")
    let is = document.getElementById("Is this hell?")
    let limitBreak = document.getElementById("Limit Break")
    let oh = document.getElementById("Oh hey, you're still here")
    let mil = document.getElementById("1 million is a lot")
    let right = document.getElementById("You did this again just for the achievement right?")
    let not = document.getElementById("ERROR 909: Dimension not found")
    let IPBelongs = document.getElementById("All your IP are belong to us")
    let reference = document.getElementById("Yet another infinity reference")
    let infchall = document.getElementById("Infinitely Challenging")
    let blink = document.getElementById("Blink of an eye")
    let cant = document.getElementById("Can't hold all these infinities")
    let newDim = document.getElementById("NEW DIMENSIONS???")
    let tables = document.getElementById("How the antitables have turned")
    let spare = document.getElementById("I got a few to spare")
    let speed = document.getElementById("Ludicrous Speed")
    let speed2 = document.getElementById("I brake for nobody")
    let overdrive = document.getElementById("MAXIMUM OVERDRIVE")
    let minute = document.getElementById("Minute of infinity")
    let hell = document.getElementById("Yes. This is hell.")
    let zerodeg = document.getElementById("0 degrees from infinity")
    let costco = document.getElementById("Costco sells dimboosts now")
    let mile = document.getElementById("This mile took an Eternity")
    let inftime = document.getElementById("Infinite time")
    let swarm = document.getElementById("The swarm")
    let guide = document.getElementById("Do you really need a guide for this?")
    let nine = document.getElementById("We could afford 9")
    let infiniteIP = document.getElementById("Can you get infinite IP?")
    let fiveMore = document.getElementById("5 more eternities until the update")
    let over9000 = document.getElementById("IT'S OVER 9000")
    let dawg = document.getElementById("Yo dawg, I heard you liked infinities...")
    let eatass = document.getElementById("Like feasting on a behind")
    let newI = document.getElementById("Eternities are the new infinity")
    let layer = document.getElementById("But I wanted another prestige layer...")
    let fkoff = document.getElementById("What do I have to do to get rid of you")
    let minaj = document.getElementById("Popular music")
    let infstuff = document.getElementById("I never liked this infinity stuff anyway")
    let when = document.getElementById("When will it be enough?")
    let thinking = document.getElementById("Now you're thinking with dilation!")
    let thisis = document.getElementById("This is what I have to do to get rid of you.")
    let stillamil = document.getElementById("1 million is still a lot")
    let out = document.getElementById("Finally I'm out of that channel")
    let ridNGud = document.getElementById("I already got rid of you.")
    let onlywar = document.getElementById("In the grim darkness of the far endgame")
    let thecap = document.getElementById("The cap is a million, not a trillion")
    let neverenough = document.getElementById("It will never be enough")
    let harmony = document.getElementById("Universal harmony")
    let notenough = document.getElementById("I don't have enough fuel!")
    let hadron = document.getElementById("Hadronization")
    let old = document.getElementById("Old age")
    let rid = document.getElementById("I already got rid of you...")
    let tfms = document.getElementById("speedrunMilestone18")
    let tms = document.getElementById("speedrunMilestone19")
    let tfms2 = document.getElementById("speedrunMilestone22")
    let special = document.getElementById("Special Relativity")
    let memories = document.getElementById("Old memories come true")
    let squared = document.getElementById("We are not going squared.")
    let morals = document.getElementById("Infinity Morals")
    let seriously = document.getElementById("Seriously, I already got rid of you.")
    let internal = document.getElementById("ERROR 500: INTERNAL DIMENSION ERROR")
    let truth = document.getElementById("The truth of anti-challenged")
    let cantGet = document.getElementById("I can’t get my multipliers higher!")
    let noDil = document.getElementById("No dilation means no production.")
    let dontWant = document.getElementById("I don't want you to live anymore.")
    let notrelative = document.getElementById("Time is not relative")
    let error404 = document.getElementById("ERROR 404: DIMENSIONS NOT FOUND")
    let ie = document.getElementById("Impossible expectations")
    let wasted = document.getElementById("Studies are wasted")
    let stop = document.getElementById("Stop blocking me!")
    let dying = document.getElementById("Are you currently dying?")
    let gofast = document.getElementById("Gonna go fast")
    let immunity = document.getElementById("Time Immunity")
    let notSmart = document.getElementById("You're not really smart.")
    let soLife = document.getElementById("And so your life?")
    let really = document.getElementById("Really?")
    let finite = document.getElementById("Finite Time")
    let oppose = document.getElementById("I rather oppose the theory of everything")
    let willenough = document.getElementById("Will it be enough?")
    let pls = document.getElementById("Please answer me why you are dying.")
    let bm1 = document.getElementById("braveMilestone1")
    let bm10 = document.getElementById("braveMilestone10")
    let bm14 = document.getElementById("braveMilestone14")
    let mi = document.getElementById("Meta-Infinity confirmed?")
    let uc = document.getElementById("Underchallenged")
    let wd = document.getElementById("Weak Decay")
    let arent = document.getElementById("Aren't you already dead?")
    let ee = document.getElementById("Everlasting Eternities")
    let oc = document.getElementById("Overchallenged")
    let btco = document.getElementById("Back to Challenge One")
    let tdc = document.getElementById("The Deep Challenge")
    let igu = document.getElementById("I give up.")

	let thisisReward = []
	if (!tmp.ngp3l) {
		if (player.galacticSacrifice!==undefined) thisisReward.push("boost g23 upgrade based on your best IP in dilation")
		if (tmp.newNGP3E) thisisReward.push("DT production is 3x faster if under "+shortenCosts(1e100)+" DT/s")
	}
	thisisReward = wordizeList(thisisReward, true)

	let onlywarReward = []
	if (!tmp.ngp3l&&(tmp.ngp3||tmp.newNGP3E)) onlywarReward.push("DT production is 2x faster")
	if (player.aarexModifications.nguspV!==undefined) onlywarReward.push("you can auto-buy dilation upgrades every 1 second if you have at least "+shortenMoney(new Decimal('1e40000'))+" EP")
	onlywarReward = wordizeList(onlywarReward, true) 

	let willenoughReward = []
	if (!tmp.ngp3l) {
		willenoughReward.push("replicated galaxies doesn't divide replicantis")
		willenoughReward.push("you keep all your replicated galaxies on Infinity")
		willenoughReward.push("keep all your replicanti upgrades on Eternity only when you start a normal Eternity run")
	}
	if (player.aarexModifications.ngudpV&&!player.aarexModifications.ngumuV) willenoughReward.push("keep Black Hole Dimensions on Quantum")
	willenoughReward = wordizeList(willenoughReward, true)

	//ACHIEVEMENT ROW 1
	alot.setAttribute('ach-tooltip', "Buy a single Second Dimension."+(player.aarexModifications.ngmX>3?" Reward: You gain Time Shards 100x faster.":""))

	//ACHIEVEMENT ROW 2
	ndial.setAttribute('ach-tooltip', "Have exactly 99 Eighth Dimensions. Reward: Eighth Dimensions are 10% stronger"+(player.tickspeedBoosts==undefined?".":" and you gain more GP based on your Eighth Dimensions and your Tickspeed Boosts."));
	apocAchieve.setAttribute('ach-tooltip', "Get over " + formatValue(player.options.notation, 1e80, 0, 0) + " antimatter.");
	gal.setAttribute('ach-tooltip', 'Buy an Antimatter Galaxy. '+(player.aarexModifications.ngmX>3?"Reward: Upon a Time Dimension Boost, your Dimension Boosts don’t reset unless you have more Time Dimension Boosts than your Dimension Boosts.":''));
	doubleGal.setAttribute('ach-tooltip', 'Buy 2 Antimatter Galaxies. '+(player.tickspeedBoosts!==undefined?"Reward: Upon a Tickspeed Boost, your Dimension Boosts"+(player.aarexModifications.ngmX>3?" and Time Dimension Boosts":"")+" don’t reset unless you have more Tickspeed Boosts than five times your Antimatter Galaxies minus eight.":'')+(player.aarexModifications.ngmX>3?" You start with 3 Time Dimension Boosts.":""));
	noPointAchieve.setAttribute('ach-tooltip', "Buy a single First Dimension when you have over " + formatValue(player.options.notation, 1e150, 0, 0) + " of them. Reward: First Dimensions are 10% stronger"+(player.tickspeedBoosts==undefined?".":" and you can max buy Dimension and Tickspeed Boosts."));
	infinity.setAttribute('ach-tooltip', "Reach Infinite antimatter. Reward: Start with 100 antimatter"+(player.galacticSacrifice?" and always have at least 10x lower dimension costs.":"."));

	//ACHIEVEMENT ROW 3
	claustrophobic.setAttribute('ach-tooltip', "Go Infinite with just 1 Antimatter Galaxy. Reward: Reduces starting tick interval by 2%"+(player.galacticSacrifice&&player.tickspeedBoosts==undefined?" and keep galaxy upgrades on infinity.":"."));
	forgotAchieve.setAttribute('ach-tooltip', "Get any Dimension multiplier over " + formatValue(player.options.notation, 1e31, 0, 0)) + ". Reward: First Dimensions are 5% stronger.";
	//forgotAchieve is all broken and NOT IN USE, use nerf
	nerf.setAttribute('ach-tooltip',"Get any dimension multiplier over "+shortenCosts(1e31)+". Reward: First Dimensions are 5% stronger.")
	didnt.setAttribute('ach-tooltip',"Reach Infinite antimatter without having any 8th Dimensions. Reward: Dimensions 1-7 are 2"+(player.galacticSacrifice?"x":"%")+" stronger.")
	fast.setAttribute('ach-tooltip', "Go infinite in under 2 hours. Reward: Start with "+shortenCosts(1e3)+" antimatter"+(player.galacticSacrifice?" and get a multiplier to galaxy points based on fastest infinity (5 hours / x, 10x softcap).":"."));
	lot.setAttribute('ach-tooltip', "Reach Infinity 10 times."+(player.galacticSacrifice?" Reward: "+(player.tickspeedBoosts==undefined?"Start infinity with galaxy points based on your infinities (x^2/100).":" Keep galaxy upgrades on infinity."):""));

	//ACHIEVEMENT ROW 4
	sanic.setAttribute('ach-tooltip', "Have antimatter/sec exceed your current antimatter above " + formatValue(player.options.notation, 1e63, 0, 0));
	cancer.setAttribute('ach-tooltip', "Buy ten Galaxies in total while using cancer notation."+(player.galacticSacrifice&&player.tickspeedBoosts==undefined?" Reward: Multiplier of IP based on number of galaxies bought in cancer notation.":""))
	zero.setAttribute('ach-tooltip',"Get to Infinity without Dimension shifts, boosts or galaxies in a challenge. Reward: Dimensions 1-4 are 25% stronger"+(player.galacticSacrifice&&player.tickspeedBoosts==undefined?" and 1.25x to IP.":"."))
	potato.setAttribute('ach-tooltip', "Get more than " + formatValue(player.options.notation, 1e29, 0, 0) + " ticks per second. Reward: Reduces starting tick interval by 2%.");
	dimensional.setAttribute('ach-tooltip', "Reach " + formatValue(player.options.notation, 1e12, 0, 0) + " of all dimensions except 8th.");
	anti.setAttribute('ach-tooltip', "Complete all the challenges. Reward: All dimension are 10% stronger"+(player.galacticSacrifice&&player.tickspeedBoosts==undefined?" and tickspeed cost is also reduced based on dimension cost reduction.":"."))

	//ACHIEVEMENT ROW 5
	forever.setAttribute('ach-tooltip', "Infinity in 1 minute or less. Reward: Start with "+shortenCosts(1e10)+" antimatter"+(player.galacticSacrifice&&player.tickspeedBoosts==undefined?" and multiplier to IP based on your best infinity time.":"."))
	many.setAttribute('ach-tooltip', "Complete the Second Dimension Autobuyer challenge in 3 minutes or less. Reward: All dimensions are stronger in first 3 minutes of infinity"+(player.tickspeedBoosts==undefined?".":" and you will gain 1% of GP you will gain per second."));
	is.setAttribute('ach-tooltip', "Complete the Tickspeed Autobuyer challenge in 3 minutes or less.  Reward: Boost per 10 dimensions "+(player.tickspeedBoosts!=undefined?"is boosted based on your best time of Tickspeed Autobuyer challenge.":player.galacticSacrifice?"is x^(1.0666).":"+1%"))
	limitBreak.setAttribute('ach-tooltip', "Break Infinity."+(player.galacticSacrifice&&player.tickspeedBoosts==undefined?" Reward: Multiplier to IP gain based on galaxies.":""))

    //ACHIEVEMENT ROW 6
	potato2.setAttribute('ach-tooltip', "Get more than " + formatValue(player.options.notation, 1e58, 0, 0) + " ticks per second. Reward: Reduces starting tick interval by 2%.");
	oh.setAttribute('ach-tooltip', "Reach "+shortenCosts(1e8)+" IP per minute."+(player.galacticSacrifice&&player.tickspeedBoosts==undefined?" Reward: Multiplier to GP based on log(IP).":""))
	mil.setAttribute('ach-tooltip',"Reach "+shortenCosts(1e6)+" infinity power."+(player.galacticSacrifice?" Reward: First Dimensions are "+shortenCosts(1e6)+" times stronger.":""))
	right.setAttribute('ach-tooltip',"Complete the Third Dimension Autobuyer challenge in 10 seconds or less. Reward: First dimensions are 5"+(player.galacticSacrifice?"x":"0%")+" stronger.")
	infchall.setAttribute('ach-tooltip', "Complete an infinity challenge."+(player.galacticSacrifice?" Reward: Increase galaxy and "+(player.tickspeedBoosts===undefined?"g11":"Tickspeed Boost")+" effectiveness based on IC's completed.":""))

	//ACHIEVEMENT ROW 7
	not.setAttribute('ach-tooltip',"Get to infinity with only a single first Dimension without Dimension Boosts, Shifts or Galaxies while in Automatic Galaxies Challenge. Reward: First Dimensions are "+(player.galacticSacrifice?909:3)+" times stronger.")
	blink.setAttribute('ach-tooltip', "Get to Infinity in under 200 milliseconds. Reward: Start with " + formatValue(player.options.notation, 1e25, 0, 0) + " antimatter and all dimensions are stronger in first 300ms of Infinity.");
	cant.setAttribute('ach-tooltip', "Get all Dimension multipliers over "+shortenCosts(1e308)+". Reward: All dimensions 10"+(player.galacticSacrifice?"x":"%")+" stronger.")
	newDim.setAttribute('ach-tooltip', "Unlock the 4th Infinity Dimension."+(player.boughtDims?"":" Reward: Your achievement bonus affects Infinity Dimensions."))
	tables.setAttribute('ach-tooltip', "Get 8th Dimension multiplier to be highest, 7th Dimension multiplier second highest etc. Reward: Each dimension gains a boost proportional to tier (8th dimension gets 8"+(player.galacticSacrifice?"0":"")+"%, 7th gets 7"+(player.galacticSacrifice?"0":"")+"%, etc.)")

	//ACHIEVEMENT ROW 8
	IPBelongs.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e150)+" IP. Reward: Additional 4x multiplier to IP.")
	reference.setAttribute('ach-tooltip', "Get a x"+shortenDimensions(Number.MAX_VALUE)+" multiplier in a single sacrifice. Reward: Sacrifices are stronger.")
	spare.setAttribute('ach-tooltip', "Reach " +formatValue(player.options.notation, new Decimal("1e35000"), 0, 0)+" antimatter. Reward: Dimensions are more powerful the more unspent antimatter you have.");

	//ACHIEVEMENT ROW 9
	speed.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e200)+" IP in 2 seconds or less. Reward: All dimensions are significantly stronger in first 5 seconds of infinity.")
	speed2.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e250)+" IP in 20 seconds or less. Reward: All dimensions are significantly stronger in first 60 seconds of infinity.")
	overdrive.setAttribute('ach-tooltip', "Big Crunch with " + shortenCosts(1e300) + " IP/min. Reward: Additional 4x multiplier to IP.")
	minute.setAttribute('ach-tooltip', "Reach " + shortenCosts(1e260) + " infinity power. Reward: Double infinity power gain.")
	hell.setAttribute('ach-tooltip', "Get the sum of Infinity Challenge times under 5 seconds." + (player.boughtDims ? " Reward: Sacrifice is again slightly stronger." : ""))
	zerodeg.setAttribute('ach-tooltip', "Unlock the 8th Infinity Dimension."+(player.boughtDims?" Reward: Normal dimensions are multiplied by number of 8th Infinity Dimensions you have.":""))

	//ACHIEVEMENT ROW 10
	costco.setAttribute('ach-tooltip', "Bulk buy 750 dimension boosts at once. Reward: Dimension boosts are "+(player.boughtDims?"cheaper based on EP.":"1% more powerful (to normal dims)."))
	mile.setAttribute('ach-tooltip', "Get "+(tmp.ngp3?"100 eternities milestone.":"all eternity milestones."))
	swarm.setAttribute('ach-tooltip', "Get 10 replicanti galaxies in 15 seconds." + (player.boughtDims ? " Reward: Unlock replicanti galaxy power control." : ""))
	inftime.setAttribute('ach-tooltip', player.boughtDims ? "Eternity without buying dimensions 1-7. Reward: Time dimensions are multiplied by eighth root of eighth dimensions." : "Get 308 tickspeed upgrades (in one eternity) from time dimensions. Reward: Time dimensions are affected slightly more by tickspeed.")
	guide.setAttribute('ach-tooltip', player.boughtDims ? "Reach " + shortenCosts(new Decimal("1e1000000")) + " replicanti. Reward: Replicanti increase faster the more you have." : "Eternity with the infinitied stat under 10.")
	nine.setAttribute('ach-tooltip', "Eternity with exactly 9 replicanti." + (player.boughtDims ? " Reward: Replicanti multiplier to ID is 9% stronger (after time studies)." : ""))

	//ACHIEVEMENT ROW 11
	over9000.setAttribute('ach-tooltip', "Get a total sacrifice multiplier of "+shortenCosts(new Decimal("1e9000"))+". Reward: Sacrifice doesn't reset your dimensions.")
	dawg.setAttribute('ach-tooltip', "Have all your past 10 infinities be at least "+shortenMoney(Number.MAX_VALUE)+" times higher IP than the previous one. Reward: Your antimatter doesn't reset on dimboost/galaxy.")

	//ACHIEVEMENT ROW 12
	infiniteIP.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e30008"))+" IP." + (player.galacticSacrifice == undefined || player.tickspeedBoosts != undefined ? "" : " Reward: Your total galaxies boost Galaxy points gain more."))
	fiveMore.setAttribute('ach-tooltip', "Complete 50 unique eternity challenge tiers." + (player.galacticSacrifice !== undefined ? " Reward: Divide Infinity Dimension costs based on your g11 multiplier." : ""))
	newI.setAttribute('ach-tooltip', "Eternity in under 200ms." + (player.galacticSacrifice !== undefined ? " Reward: Dimension Boosts boost to Galaxy points gain is buffed." : ""))
	eatass.setAttribute('ach-tooltip', "Reach "+shortenCosts(1e100)+" IP without any infinities or first dimensions. Reward: IP multiplier based on time spent this infinity.")
	layer.setAttribute('ach-tooltip', "Reach "+shortenMoney(Number.MAX_VALUE)+" EP." + (player.galacticSacrifice !== undefined ? " Reward: Galaxy boost to Galaxy points gain is buffed." : ""))
	fkoff.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e22000"))+" IP without any time studies. Reward: Time dimensions are multiplied by the number of studies you have.")
	minaj.setAttribute('ach-tooltip', "Have 180 times more non-bonus replicanti galaxies than normal galaxies. Reward: Replicanti galaxies divide your replicanti by "+shortenMoney(Number.MAX_VALUE)+" instead of resetting them to 1.")

	//ACHIEVEMENT ROW 13
	potato3.setAttribute('ach-tooltip', "Get more than "+shortenCosts(new Decimal("1e8296262"))+" ticks per second." + (player.galacticSacrifice !== undefined ? " Reward: Galaxy boost to Galaxy points gain is buffed." : ""))
	infstuff.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e140000"))+" IP without buying IDs or IP multipliers. Reward: You start eternities with all Infinity Challenges unlocked and completed"+(player.meta?", and your infinity gain is multiplied by dilated time^(1/4).":"."))
	when.setAttribute('ach-tooltip', "Reach "+shortenCosts( new Decimal(tmp.ngex?"1e15000":"1e20000"))+" replicanti. Reward: You gain replicanti 2 times faster under "+shortenMoney(Number.MAX_VALUE)+" replicanti.")
	thinking.setAttribute('ach-tooltip', "Eternity for "+shortenCosts( new Decimal("1e600"))+" EP in 1 minute or less while dilated.")
	thisis.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal('1e20000'))+" IP without any time studies while dilated."+(thisisReward!=""?" Reward: "+thisisReward+".":""))

	//NGUD ACHIEVEMENT ROW (13.5)
	stillamil.setAttribute('ach-tooltip',"Reach "+shortenCosts(1e6)+" black hole power.")
	out.setAttribute('ach-tooltip',"Get more than "+shortenCosts(1e5)+" ex-dilation." + (player.aarexModifications.nguspV !== undefined ? " Reward: You can distribute ex-dilation from all dilation boosts." : ""))
	ridNGud.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e20000"))+" IP without any time studies or dilation upgrades while dilated.")

	//ACHIEVEMENT ROW 14
	onlywar.setAttribute('ach-tooltip', "Reach "+shortenMoney(new Decimal('1e40000'))+" EP."+(onlywarReward!=""?" Reward: "+onlywarReward+".":""))
	thecap.setAttribute('ach-tooltip', "Get "+shortenDimensions(1e12)+" eternities. Reward: Eternity upgrade 2 uses a better formula.")
	neverenough.setAttribute('ach-tooltip', "Reach "+shortenCosts( new Decimal("1e100000"))+" replicanti. Reward: You can buy max replicanti galaxies.")
	harmony.setAttribute('ach-tooltip', player.meta?"Have at least 700 normal, replicanti, and free dilated galaxies. Reward: Galaxies are 0.1% stronger.":"Get the same number (at least 300) of normal, replicanti, and free galaxies.")

	//ACHIEVEMENT ROW 15
	notenough.setAttribute('ach-tooltip', "Reach "+shorten(Number.MAX_VALUE)+" meta-antimatter."+(tmp.ngp3l?"":" Reward: You produce dilated time faster based on your normal galaxies. You gain more Tachyon particles based on your replicated galaxies."))
	hadron.setAttribute('ach-tooltip', "Have colored quarks but have no color charge."+(tmp.ngp3l?"":" Reward: Quantum worth boosts all Meta Dimensions."))
	old.setAttribute('ach-tooltip', "Reach "+shortenCosts(getOldAgeRequirement())+" antimatter."+(tmp.ngp3l?"":" Reward: Get a multiplier to MD1 based on total antimatter.") )
	rid.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e400000"))+" IP while dilated without having studies and electrons. Reward: Generate time theorems based on your best-ever tachyon particles.")

	//ACHIEVEMENT ROW 16
	special.setAttribute('ach-tooltip', "Quantum in under 5 seconds."+(tmp.ngp3l?"":" Reward: Start with all Infinity Dimensions unlocked if you have at least 25 eternities."))
	memories.setAttribute('ach-tooltip', "Reach " + shortenCosts(new Decimal("1e1700")) + " MA without ever buying Normal Dimensions 5-8 or more than 4 Dimension Boosts in this quantum."  + (tmp.ngp3l ? "" : " Reward: 4 RG upgrade is stronger based on your meta-Dimension Boosts."))
	squared.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e1500"))+" MA with exactly 8 meta-dimension boosts." + (tmp.ngp3l?"":" Reward: Get a multiplier to MD8 based on your MD1."))
	morals.setAttribute('ach-tooltip', "Quantum without any meta-dimension boosts." + (tmp.ngp3l ? "" : " Reward: Meta-Dimension Boosts boost itself at a reduced rate."))
	seriously.setAttribute('ach-tooltip', "Reach " + shortenCosts(new Decimal("1e354000")) + " IP without having time studies while dilated and running QC2." + (tmp.ngp3l ? "" : " Reward: Eternity Points boost to Quark gain is 1% stronger."))

	//QUANTUM SPEEDRUNS
	tfms.setAttribute('ach-tooltip', "Reward: Start with "+shortenCosts(1e13)+" eternities.")
	tms.setAttribute('ach-tooltip', "Reward: Start with "+shortenCosts(1e25)+" meta-antimatter on reset.")
	tfms2.setAttribute('ach-tooltip', "Reward: Start with "+shortenCosts(1e100)+" dilated time and dilated time only resets on quantum.")

	//ACHIEVEMENT ROW 17
	internal.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e333"))+" MA without having second meta dimensions and meta dimension boosts." + (tmp.ngp3l?"":" Reward: First meta dimensions are stronger based on meta antimatter") )
	truth.setAttribute('ach-tooltip', "Reach "+shortenCosts(Decimal.pow(10,788e11))+" antimatter without having completed paired challenges.")
	cantGet.setAttribute('ach-tooltip', "Reach "+shortenCosts(Decimal.pow(10,62e10))+" antimatter in Eternity Challenge 11.")
	noDil.setAttribute('ach-tooltip', "Reach "+shortenCosts(Decimal.pow(10,2e6))+" replicanti without having Tachyon particles. Reward: Start quantums with the same amount of Tachyon particles as square root of your best TP.")
	dontWant.setAttribute('ach-tooltip', "Reach "+shorten(Decimal.pow(Number.MAX_VALUE,1000))+" IP while dilated, in QC2, and without having studies and First Dimensions during your current Eternity.")

	//ACHIEVEMENT ROW 18
	notrelative.setAttribute('ach-tooltip', "Get "+shorten(Decimal.pow(10,411))+" dilated time without gaining tachyon particles." + (tmp.ngp3l?"":" Reward: Get a multiplier of DT based on nanofield reward."))
	error404.setAttribute('ach-tooltip', "Get "+shorten(Decimal.pow(10,16e11))+" antimatter without having all types of non-First Dimensions and at least 2 normal galaxies.")
	ie.setAttribute('ach-tooltip', "Get "+shorten(Decimal.pow(10,8e6))+" antimatter in a PC with QC6 & QC8 combination.")
	wasted.setAttribute('ach-tooltip', "Get "+shorten(11e6)+" TT without having generated TTs, gaining your TTs back, and respeccing studies. Reward: If you have less than 1 hour worth of TT production, you gain 10x as much TT.")
	stop.setAttribute('ach-tooltip', "Get the replicanti reset requirement to "+shorten(Decimal.pow(10,125e5))+". Reward: Getting a normal replicant manually doesn't reset your replicanti and can be autoed.")
	dying.setAttribute('ach-tooltip', "Reach "+shorten(Decimal.pow(10, 275e3))+" IP while dilated, in PC6+8, and without having studies." + (tmp.ngp3l ? "" : " Reward: Branches are faster based on your meta-Dimension Boosts."))

	//ACHIEVEMENT ROW 19
	gofast.setAttribute('ach-tooltip', "Get "+shorten(Decimal.pow(10, 1185))+" EP first and then square your EP by disabling dilation while big ripped.")
	immunity.setAttribute('ach-tooltip', "Get " + shorten(Decimal.pow(10, 8e7)) + " antimatter with one normal galaxy while in Eternity Challenge 7 and big ripped." + (tmp.ngp3l ? "" : " Reward: Infinite Time is 3% stronger."))
	notSmart.setAttribute('ach-tooltip', "Get "+shorten(1e215)+" Time Shards without having time study 11 while big ripped." + (tmp.ngp3l?"":" Reward: Meta Dimensions get a multiplier based on time shards."))
	soLife.setAttribute('ach-tooltip', "Reach "+shortenCosts(Decimal.pow(10, 35e4))+" IP in Big Rip while dilated, with no EP multiplier upgrades and time studies.")

	//ACHIEVEMENT ROW 20
	finite.setAttribute('ach-tooltip', "Get "+shortenCosts(1e33)+" Space Shards without Breaking Eternity."+(tmp.ngp3l?"":" Reward: Outside of Big Rips, add the efficiency of Tree upgrades by 10%. In Big Rips, gain an small exponent boost to 8th Time Dimensions based on your current Ghostify time."))
	really.setAttribute('ach-tooltip', "Undo the Big Rip with at least "+shortenCosts(Decimal.pow(10, 5000))+" matter." + (tmp.ngp3l?"":" Reward: Buying electron upgrades with meta dimension boosts don't spent meta dimension boosts anymore."))
	willenough.setAttribute('ach-tooltip', "Reach "+shortenCosts(Decimal.pow(10,player.aarexModifications.ngudpV?268435456:36000000))+" replicanti."+(willenoughReward!=""?" Reward: "+willenoughReward+".":""))
	oppose.setAttribute('ach-tooltip', "Become a ghost with at most 1x quantumed stat."+(tmp.ngp3l?"":" Reward: You gain more quarks based on your quantumed stat."))
	pls.setAttribute('ach-tooltip', "Reach "+shortenCosts(Decimal.pow(10, 95e4))+" IP in Big Rip while dilated, with no EP multiplier upgrades, time studies, and Break Eternity. Reward: Each time you become a ghost, you gain "+shortenDimensions(2e3)+" galaxies worth of all generations of neutrinos, multiplied by your best-ever galaxy amount in all Big Rips.")

	//BRAVE MILESTONES
	bm1.setAttribute('ach-tooltip', "Reward: Start Ghostifies with all Speedrun Milestones and all "+shorten(Number.MAX_VALUE)+" QK features unlocked, all Paired Challenges completed, all Big Rip upgrades bought, Nanofield is 2x faster until you reach 16 rewards, and you get quarks based on your best MA this quantum.")
	bm10.setAttribute('ach-tooltip', "Reward: Start Ghostifies with 10 of Fourth Emperor Dimensions"+(player.aarexModifications.ngudpV?" and start Big Rips with 3rd row of Eternity upgrades.":"."))
	bm14.setAttribute('ach-tooltip', "Reward: Start Ghostifies with "+shortenCosts(1e25)+" Quark Spins and Branches are faster based on spins (at least 10x).")

	//ACHIEVEMENT ROW 21
	uc.setAttribute('ach-tooltip', "Become a ghost with at least "+shortenCosts(Decimal.pow(10, 22e4))+" EP without starting Eternity Challenge 10 while Big Ripped.")
	mi.setAttribute('ach-tooltip', "Get "+shorten(Number.MAX_VALUE)+" infinitied stat. Reward: You gain banked infinites and eternities when you either go quantum or Big Rip the universe without having to gain infinitied and eternitied.")
	wd.setAttribute('ach-tooltip', "Get "+shortenCosts(Decimal.pow(10, 1e12))+" Infinity Unstable Quarks for each Branch without Big Ripping.")
	arent.setAttribute('ach-tooltip', "Reach " + shortenCosts(Decimal.pow(10, 18e5)) + " IP while dilated and big ripped and without having studies, EP mult upgrades, Tree Upgrades, and Break Eternity." + (tmp.ngp3l ? "" : " Reward: Your Tree Upgrade 8 level speeds up Nanofield."))

	//ACHIEVEMENT ROW 22
	document.getElementById("Even Ghostlier than before").setAttribute("ach-tooltip", "Unlock Bosonic Lab." + (tmp.ngp3l ? "" : " Reward: Meta-antimatter effect uses your best meta-antimatter in your current Ghostify instead of your current Quantum."))
	ee.setAttribute('ach-tooltip', "Get "+shorten(Number.MAX_VALUE)+" eternitied stat.")
	oc.setAttribute('ach-tooltip', "Become a ghost with at least "+shortenCosts(Decimal.pow(10, 375e3))+" EP while Big Ripped with Anti-Dilation modifier.")
	btco.setAttribute('ach-tooltip', "Get a Paired Challenge 1 reward after you get "+shortenCosts(Decimal.pow(10, 165e7))+" antimatter in Quantum Challenges 6 and 8.")
	tdc.setAttribute('ach-tooltip', "Complete Eternity Challenge 11 with "+shortenCosts(Decimal.pow(10, 15500))+" IP in a Paired Challenge with Quantum Challenges 6 and 8 combinations and Anti-Dilation modifier.")
	igu.setAttribute('ach-tooltip', "Reach " + shortenCosts(Decimal.pow(10, 22.5e3)) + " IP while dilated and big ripped with Anti-Dilation modifier and without having studies, EP mult upgrades, Tree Upgrades, and Break Eternity.")
}


//notation stuff
var notationArray = ["Scientific","Engineering","Logarithm","Mixed scientific","Mixed engineering","Mixed logarithm","Letters","Standard","Emojis","Brackets","Infinity","Greek","Game percentages","Hexadecimal","Tetration","Hyperscientific","Psi","Morse code","Spazzy","Country Codes","Iroha","Symbols","Lines","Simplified Written","Time","Base-64","AF2019","AAS","AF5LN"]

function updateNotationOption() {
	var notationMsg="Notation: "+(player.options.notation=="Emojis"?"Cancer":player.options.notation)
	var commasMsg=(player.options.commas=="Emojis"?"Cancer":player.options.commas) + " on exponents"
	document.getElementById("notation").innerHTML = "<p style='font-size:15px'>Notations</p>"+notationMsg+"<br>"+commasMsg
	document.getElementById("chosenNotation").textContent = player.options.notation=="AF5LN"?"Notation: Aarex's Funny 5-letter Notation":notationMsg
	document.getElementById("chosenCommas").textContent = player.options.commas=="AF5LN"?"Aarex's Funny 5-letter Notation on exponents":commasMsg
	
	let tooltip=""
	if (player.options.notation=="AAS") tooltip="Notation: Aarex's Abbreviation System"
	if (player.options.notation=="AF5LN") tooltip="Notation: Aarex's Funny 5-letter Notation"
	if (player.options.commas=="AAS") tooltip+=(tooltip==""?"":"\n")+"Aarex's Abbreviation System on exponents"
	if (player.options.commas=="AF5LN") tooltip+=(tooltip==""?"":"\n")+"Aarex's Funny 5-letter Notation on exponents"
	if (tooltip=="") document.getElementById("notation").removeAttribute('ach-tooltip')
	else document.getElementById("notation").setAttribute('ach-tooltip', tooltip)
}

function onNotationChange() {
    	document.getElementsByClassName("hideInMorse").display = player.options.notation == "Morse code" || player.options.notation == 'Spazzy' ? "none" : ""
	updateNotationOption()
	if (player.pSac !== undefined) updatePUCosts()
	updateLastTenRuns();
	updateLastTenEternities();
	updateLastTenQuantums();
	updateLastTenGhostifies()
	tmp.tickUpdate = true;
	setAchieveTooltip();
	updateSingularity()
	updateDimTechs()
	updateDilationUpgradeCosts()
	updateExdilation()
	updateMilestones()
	if (tmp.ngp3) {
		updateQuarksTabOnUpdate()
		updateGluonsTabOnUpdate("notation")
		updateQuantumWorth("notation")
		updateElectrons()
		updateBankedEter()
		updateQuantumChallenges()
		document.getElementById("bpc68").textContent = shortenMoney(tmp.qu.pairedChallenges.pc68best)
		updateMasteryStudyTextDisplay()
		updateReplicants("notation")
		updateTODStuff()
		updateBreakEternity()
		onNotationChangeNeutrinos()
		updateBosonicStuffCosts()
		document.getElementById("gphUnl").textContent="To unlock Ghostly Photons, you need to get "+shortenCosts(Decimal.pow(10,6e9))+" antimatter while your universe is Big Ripped first."
		document.getElementById("blUnl").textContent="To unlock Bosonic Lab, you need to get "+shortenCosts(Decimal.pow(10,1e10))+" ghostly unstable quarks first."
	}
	document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
	document.getElementById("achmultlabel").textContent = "Current achievement multiplier on each Dimension: " + shortenMoney(player.achPow) + "x"
	if (player.achievements.includes("ng3p18") || player.achievements.includes("ng3p37")) {
		document.getElementById('bestTP').textContent="Your best"+(ghostified ? "" : " ever")+" Tachyon particles"+(ghostified ? " in this Ghostify" : "")+" was "+shorten(player.dilation.bestTP)+"."
		setAndMaybeShow('bestTPOverGhostifies',ghostified,'"Your best-ever Tachyon particles was "+shorten(player.dilation.bestTPOverGhostifies)+"."')
	}
}

function switchNotation(id) {
	if (player.options.notation == notationArray[id]) return
	player.options.notation = notationArray[id]
	onNotationChange()
}

function switchCommas(id) {
	if (id>1) id = notationArray[id-2]
	else if (id>0) id = "Same notation"
	else id = "Commas"
	if (player.options.commas == id) return
	player.options.commas = id
	onNotationChange()
}

var notationMenuDone = false
document.getElementById("notation").onclick = function () {
	closeToolTip()
	if (!notationMenuDone) {
		notationMenuDone=true
		let notationsTable=document.getElementById("notationOptions")
		let commasTable=document.getElementById("commasOptions")
		let subTable=document.getElementById("subNotationOptions")
		let selectList=""
		
		var row=commasTable.insertRow(0)
		row.innerHTML="<button class='storebtn' style='width:160px; height: 40px' onclick='switchCommas(0)'>Commas on exponents</button>"
		row=commasTable.insertRow(1)
		row.innerHTML="<button class='storebtn' style='width:160px; height: 40px' onclick='switchCommas(1)'>Same notation on exponents</button>"
		
		for (n=0;n<notationArray.length;n++) {
			var name=notationArray[n]=="Emojis"?"Cancer":notationArray[n]
			row=notationsTable.insertRow(n)
			row.innerHTML="<button class='storebtn' id='select"+name+"' style='width:160px; height: 40px' onclick='switchNotation("+n+")'>Select "+name+"</button>"
			row=commasTable.insertRow(n+2)
			row.innerHTML="<button class='storebtn' id='selectCommas"+name+"' style='width:160px; height: 40px' onclick='switchCommas("+(n+2)+")'>"+name+" on exponents</button>"
			if (n>18) {
				row=subTable.insertRow(n-1)
				row.innerHTML="<button class='storebtn' id='selectSub"+name+"' style='width:160px; height: 40px' onclick='switchSubNotation("+n+")'>Select "+name+"</button>"
			} else if (n<18) {
				row=subTable.insertRow(n)
				row.innerHTML="<button class='storebtn' style='width:160px; height: 40px' onclick='switchSubNotation("+n+")'>Select "+name+"</button>"	
			}
		}
		document.getElementById("selectAAS").setAttribute("ach-tooltip","Select Aarex's Abbreviation System")
		document.getElementById("selectCommasAAS").setAttribute("ach-tooltip","Aarex's Abbreviation System on exponents")
		document.getElementById("selectAF5LN").setAttribute("ach-tooltip","Select Aarex's Funny 5-letter Notation")
		document.getElementById("selectCommasAF5LN").setAttribute("ach-tooltip","Aarex's Funny 5-letter Notation on exponents")
	}
	document.getElementById("notationmenu").style.display="block"
};

function openNotationOptions() {
	if (document.getElementById("mainnotationoptions1").style.display=="") {
		formatPsi(1,1)
		document.getElementById("openpsioptions").textContent="Go back"
		document.getElementById("mainnotationoptions1").style.display="none"
		document.getElementById("mainnotationoptions2").style.display="none"
		document.getElementById("notationoptions").style.display=""
		
		document.getElementById("significantDigits").value=player.options.scientific.significantDigits?player.options.scientific.significantDigits:0
		document.getElementById("logBase").value=player.options.logarithm.base
		document.getElementById("tetrationBase").value=player.options.tetration.base
		document.getElementById("maxLength").value=player.options.psi.chars
		document.getElementById("maxArguments").value=Math.min(player.options.psi.args,4)
		document.getElementById("maxLetters").value=player.options.psi.maxletters
		document.getElementById("psiSide").textContent="Non-first arguments on "+(player.options.psi.side=="r"?"right":"left")+" side"
		var letters=[null,'E','F','G','H']
		document.getElementById("psiLetter").textContent=(player.options.psi.letter[0]?"Force "+letters[player.options.psi.letter[0]]:"Automatically choose letter")
		document.getElementById("chosenSubNotation").textContent="Sub-notation: "+(player.options.spazzy.subNotation=="Emojis"?"Cancer":player.options.spazzy.subNotation)
		document.getElementById("useHyphens").checked=player.options.aas.useHyphens
		document.getElementById("useDe").checked=player.options.aas.useDe
	} else {
		document.getElementById("openpsioptions").textContent="Notation options"
		document.getElementById("mainnotationoptions1").style.display=""
		document.getElementById("mainnotationoptions2").style.display=""
		document.getElementById("notationoptions").style.display="none"
	}
}

function switchOption(notation,id) {
	if (notation=="scientific") {
		if (id=="significantDigits") {
			var value=parseFloat(document.getElementById(id).value)
			if (isNaN(value)) return
			if (value%1!=0) return
			if (value<0||value>10) return
			if (value==0) player.options.scientific.significantDigits=undefined
			else player.options.scientific.significantDigits=value
		}
	} else if (notation=="logarithm") {
		if (id=="base") {
			var value=parseFloat(document.getElementById("logBase").value)
		}
		if (isNaN(value)) return
		if (id=="base") {
			if (value<=1||value>Number.MAX_VALUE) return
			else player.options.logarithm.base=value
		}
	} else if (notation=="tetration") {
		if (id=="base") {
			var value=parseFloat(document.getElementById("tetrationBase").value)
		}
		if (isNaN(value)) return
		if (id=="base") {
			if (value<1.6||value>Number.MAX_VALUE) return
			else player.options.tetration.base=value
		}
	} else if (notation=="psi") {
		if (id.slice(0,7)=="psiSide") {
			player.options.psi.side=id.slice(7,8)
			document.getElementById("psiSide").textContent="Non-first arguments on "+(player.options.psi.side=="r"?"right":"left")+" side"
			return
		}
		if (id.slice(0,9)=="psiLetter") {
			var letters={None:[],E:[1],F:[2],G:[3],H:[4]}
			player.options.psi.letter=letters[id.slice(9,id.length)]
			document.getElementById("psiLetter").textContent=(player.options.psi.letter[0]?"Force "+id.slice(9,id.length):"Automatically choose letter")
			return
		}
		var value=parseFloat(document.getElementById(id).value)
		if (isNaN(value)) return
		if (value%1!=0) return
		if (id=="maxLength") {
			if (value<2||value>30) return
			player.options.psi.chars=value
		}
		if (id=="maxArguments") {
			if (value<1||value>6) return
			player.options.psi.args=value
		}
		if (id=="maxLetters") {
			if (value<1||value>4) return
			player.options.psi.maxletters=value
		}
	} else if (notation=="aas") player.options.aas[id]=document.getElementById(id).checked
	onNotationChange()
}

function switchSubNotation(id) {
	if (player.options.spazzy.subNotation == notationArray[id]) return
	player.options.spazzy.subNotation = notationArray[id]
	document.getElementById("chosenSubNotation").textContent="Sub-notation: "+(player.options.spazzy.subNotation=="Emojis"?"Cancer":player.options.spazzy.subNotation)
	onNotationChange()
}

function showHideFooter(toggle) {
	if (toggle) player.aarexModifications.noFooter=!player.aarexModifications.noFooter
	document.getElementById("footerBtn").textContent = (player.aarexModifications.noFooter?"Show":"Hide")+" footer"
	document.documentElement.style.setProperty('--footer', player.aarexModifications.noFooter?"none":"")
}

document.getElementById("newsbtn").onclick = function(force) {
	player.options.newsHidden=!player.options.newsHidden
	document.getElementById("newsbtn").textContent=(player.options.newsHidden?"Show":"Hide")+" news ticker"
	document.getElementById("game").style.display=player.options.newsHidden?"none":"block"
	if (!player.options.newsHidden) scrollNextMessage()
}


function resetDimensions() {
	var costs=[10,100,1e4,1e6,1e9,1e13,1e18,1e24]
	var costMults=[1e3,1e4,1e5,1e6,1e8,1e10,1e12,1e15]
	if (inNC(10)||player.currentChallenge == "postc1") costs=[10,100,100,500,2500,2e4,2e5,4e6]
	if (inNC(10)) costMults=[1e3,5e3,1e4,12e3,18e3,26e3,32e3,42e3]
	for (var d=1;d<9;d++) {
		var name=TIER_NAMES[d]
		player[name+"Amount"]=new Decimal(0)
		player[name+"Bought"]=0
		player[name+"Cost"]=new Decimal(costs[d-1])
	}
	player.eightPow = new Decimal(player.chall11Pow)
}

function getSacrificeBoost(){
	return calcSacrificeBoost()
}

function calcSacrificeBoost() {
	let ret
	let pow
	if (player.firstAmount == 0) return new Decimal(1);
	if (player.challenges.includes("postc2") || (player.tickspeedBoosts !== undefined && player.currentChallenge == "postc2")) {
		pow = 0.01
		if (player.timestudy.studies.includes(228)) pow = 0.013
		else if (player.achievements.includes("r97") && player.boughtDims) pow = 0.012
		else if (player.achievements.includes("r88")) pow = 0.011
		ret = player.firstAmount.div(player.sacrificed.max(1)).pow(pow).max(1)
	} else if (!inNC(11)) {
		pow = 2
		if (player.achievements.includes("r32")) pow += player.tickspeedBoosts != undefined ? 2 : 0.2
		if (player.achievements.includes("r57")) pow += player.boughtDims ? 0.3 : 0.2 //this upgrade was too OP lol
		if (player.infinityUpgradesRespecced != undefined) pow *= getInfUpgPow(5)
		ret = Decimal.pow(Math.max(player.firstAmount.e/10.0, 1) / Math.max(player.sacrificed.e/10.0, 1), pow).max(1)
	} else ret = player.firstAmount.pow(0.05).dividedBy(player.sacrificed.pow(player.aarexModifications.ngmX>3?0.05:0.04).max(1)).max(1)
	if (player.boughtDims) ret = ret.pow(1 + Math.log(1 + Math.log(1 + player.timestudy.ers_studies[1] / 5)))
	return ret
}

function getTotalSacrificeBoost(next){
	return calcTotalSacrificeBoost(next)
}

function calcTotalSacrificeBoost(next) {
	if (player.resets < 5) return new Decimal(1)
	let ret
	let pow
	if (player.challenges.includes("postc2") || (player.tickspeedBoosts !== undefined && player.currentChallenge == "postc2")) {
		pow = 0.01
		if (player.timestudy.studies.includes(228)) pow = 0.013
		else if (player.achievements.includes("r97") && player.boughtDims) pow = 0.012
		else if (player.achievements.includes("r88")) pow = 0.011
		ret = player.sacrificed.pow(pow).max(1)
	} else if (!inNC(11)) {
		pow = 2
		if (player.achievements.includes("r32")) pow += player.tickspeedBoosts != undefined ? 2 : 0.2
		if (player.achievements.includes("r57")) pow += player.boughtDims ? 0.3 : 0.2 //this upgrade was too OP lol
		if (player.infinityUpgradesRespecced != undefined) pow *= getInfUpgPow(5)
		ret = Decimal.pow(Math.max(player.sacrificed.e/10.0, 1), pow)
	} else ret = player.sacrificed.pow(0.05) //this is actually off but like im not sure how youd make it good. not that it matters.
	if (player.boughtDims) ret = ret.pow(1 + Math.log(1 + Math.log(1 + (player.timestudy.ers_studies[1] + (next ? 1 : 0))/ 5)))
	return ret
}


function sacrifice(auto = false) {
    	if (player.eightAmount == 0) return false;
    	if (player.resets < 5) return false
    	if (player.currentEternityChall == "eterc3") return false
		var sacGain = calcSacrificeBoost()
    	var maxPower = player.galacticSacrifice ? "1e8888" : Number.MAX_VALUE
    	if (inNC(11) && (tmp.sacPow.gte(maxPower) || player.chall11Pow.gte(maxPower))) return false
    	if (!auto) floatText("D8", "x" + shortenMoney(sacGain))
    	if (calcSacrificeBoost().gte(Number.MAX_VALUE)) giveAchievement("Yet another infinity reference");
    	player.eightPow = player.eightPow.times(sacGain)
    	player.sacrificed = player.sacrificed.plus(player.firstAmount);
    	if (!inNC(11)) {
       		if ((inNC(7) || player.currentChallenge == "postcngm3_3" || player.pSac !== undefined) && !player.achievements.includes("r118")) clearDimensions(6);
		else if (!player.achievements.includes("r118")) clearDimensions(7);
	} else {
        	player.chall11Pow = player.chall11Pow.times(calcSacrificeBoost())
        	if (!player.achievements.includes("r118")) resetDimensions();
        	player.money = new Decimal(100)
	}
	tmp.sacPow = tmp.sacPow.times(sacGain)
    if (tmp.sacPow >= 600) giveAchievement("The Gods are pleased");
	if (tmp.sacPow.gte("1e9000") && !inNC(11)) giveAchievement("IT'S OVER 9000");
}




document.getElementById("sacrifice").onclick = function () {
    	if (player.eightAmount.eq(0)) return false
    	if (!document.getElementById("confirmation").checked) {
        	if (!confirm("Dimensional Sacrifice will remove all of your first to seventh dimensions (with the cost and multiplier unchanged) for a boost to Eighth Dimension. It will take time to regain production.")) {
			return false;
		}
	}
    	auto = false;
	return sacrifice();
}



var ndAutobuyersUsed = 0
function updateAutobuyers() {
    	var autoBuyerDim1 = new Autobuyer (1)
    	var autoBuyerDim2 = new Autobuyer (2)
    	var autoBuyerDim3 = new Autobuyer (3)
    	var autoBuyerDim4 = new Autobuyer (4)
    	var autoBuyerDim5 = new Autobuyer (5)
    	var autoBuyerDim6 = new Autobuyer (6)
    	var autoBuyerDim7 = new Autobuyer (7)
    	var autoBuyerDim8 = new Autobuyer (8)
    	var autoBuyerDimBoost = new Autobuyer (9)
    	var autoBuyerGalaxy = new Autobuyer (document.getElementById("secondSoftReset"))
    	var autoBuyerTickspeed = new Autobuyer (document.getElementById("tickSpeed"))
    	var autoBuyerInf = new Autobuyer (document.getElementById("bigcrunch"))
    	var autoSacrifice = new Autobuyer(13)

    	if (player.aarexModifications.newGameExpVersion) {
        	autoBuyerDim1.interval = 1000
        	autoBuyerDim2.interval = 1000
        	autoBuyerDim3.interval = 1000
        	autoBuyerDim4.interval = 1000
        	autoBuyerDim5.interval = 1000
        	autoBuyerDim6.interval = 1000
        	autoBuyerDim7.interval = 1000
        	autoBuyerDim8.interval = 1000
    	} else {
        	autoBuyerDim1.interval = 1500
        	autoBuyerDim2.interval = 2000
        	autoBuyerDim3.interval = 2500
        	autoBuyerDim4.interval = 3000
        	autoBuyerDim5.interval = 4000
        	autoBuyerDim6.interval = 5000
        	autoBuyerDim7.interval = 6000
        	autoBuyerDim8.interval = 7500
    	}
    	autoBuyerDimBoost.interval = 8000
    	if (player.infinityUpgradesRespecced != undefined) autoBuyerDimBoost.bulkBought = false
    	autoBuyerGalaxy.interval = player.galacticSacrifice ? 6e4 : 15e4
    	if (player.infinityUpgradesRespecced != undefined) autoBuyerGalaxy.bulkBought = false
    	autoBuyerTickspeed.interval = 5000
    	autoBuyerInf.interval = player.galacticSacrifice ? 6e4 : 3e5
   	if (player.boughtDims) {
        	autoBuyerInf.requireMaxReplicanti = false
        	autoBuyerInf.requireIPPeak = false
    	}

    	autoSacrifice.interval = player.galacticSacrifice != undefined ? 15e3 : player.infinityUpgradesRespecced != undefined ? 3500 : 100
    	autoSacrifice.priority = 5

    	autoBuyerDim1.tier = 1
    	autoBuyerDim2.tier = 2
    	autoBuyerDim3.tier = 3
    	autoBuyerDim4.tier = 4
    	autoBuyerDim5.tier = 5
    	autoBuyerDim6.tier = 6
    	autoBuyerDim7.tier = 7
    	autoBuyerDim8.tier = 8
    	autoBuyerTickSpeed.tier = 9
	
    	if (player.galacticSacrifice) {
        	var autoGalSacrifice = new Autobuyer(14)
        	autoGalSacrifice.interval = 15e3
        	autoGalSacrifice.priority = 5
    	}
	
    	if (player.tickspeedBoosts != undefined) {
        	var autoTickspeedBoost = new Autobuyer(15)
        	autoTickspeedBoost.interval = 15e3
        	autoTickspeedBoost.priority = 5
    	}
	if (player.aarexModifications.ngmX>3) {
        	var autoTDBoost = new Autobuyer(16)
        	autoTDBoost.interval = 15e3
        	autoTDBoost.priority = 5
        	autoTDBoost.overXGals = 0
    	}

    	if (player.challenges.includes("challenge1") && player.autobuyers[0] == 1) {
        	player.autobuyers[0] = autoBuyerDim1
        	document.getElementById("autoBuyer1").style.display = "inline-block"
    	} else document.getElementById("autoBuyer1").style.display = "none"
    	if (player.challenges.includes("challenge2") && player.autobuyers[1] == 2) {
        	player.autobuyers[1] = autoBuyerDim2
        	document.getElementById("autoBuyer2").style.display = "inline-block"
    	} else document.getElementById("autoBuyer2").style.display = "none"
    	if (player.challenges.includes("challenge3") && player.autobuyers[2] == 3) {
        	player.autobuyers[2] = autoBuyerDim3
        	document.getElementById("autoBuyer3").style.display = "inline-block"
    	} else document.getElementById("autoBuyer3").style.display = "none"
    	if (player.challenges.includes("challenge4") && player.autobuyers[9] == 10) {
        	player.autobuyers[9] = autoBuyerDimBoost
        	document.getElementById("autoBuyerDimBoost").style.display = "inline-block"
    	} else {
        	document.getElementById("autoBuyerDimBoost").style.display = "none"
        	document.getElementById("buyerBtnDimBoost").style.display = ""
    	}
    	if (player.challenges.includes("challenge5") && player.autobuyers[8] == 9) {
        	player.autobuyers[8] = autoBuyerTickspeed
        	document.getElementById("autoBuyerTickSpeed").style.display = "inline-block"
	} else {
        	document.getElementById("autoBuyerTickSpeed").style.display = "none"
        	document.getElementById("buyerBtnTickSpeed").style.display = ""
    	}
    	if (player.challenges.includes("challenge6") && player.autobuyers[4] == 5) {
        	player.autobuyers[4] = autoBuyerDim5
        	document.getElementById("autoBuyer5").style.display = "inline-block"
    	} else document.getElementById("autoBuyer5").style.display = "none"
    	if (player.challenges.includes("challenge7") && player.autobuyers[11] == 12) {
        	player.autobuyers[11] = autoBuyerInf
        	document.getElementById("autoBuyerInf").style.display = "inline-block"
    	} else {
        	document.getElementById("autoBuyerInf").style.display = "none"
        	document.getElementById("buyerBtnInf").style.display = ""
    	}
    	if (player.challenges.includes("challenge8") && player.autobuyers[3] == 4) {
        	player.autobuyers[3] = autoBuyerDim4
        	document.getElementById("autoBuyer4").style.display = "inline-block"
    	} else document.getElementById("autoBuyer4").style.display = "none"
    	if (player.challenges.includes("challenge9") && player.autobuyers[6] == 7) {
        	player.autobuyers[6] = autoBuyerDim7
        	document.getElementById("autoBuyer7").style.display = "inline-block"
    	} else document.getElementById("autoBuyer7").style.display = "none"
    	if (player.challenges.includes("challenge10") && player.autobuyers[5] == 6) {
        	player.autobuyers[5] = autoBuyerDim6
        	document.getElementById("autoBuyer6").style.display = "inline-block"
    	} else document.getElementById("autoBuyer6").style.display = "none"
    	if (player.challenges.includes("challenge11") && player.autobuyers[7] == 8) {
        	player.autobuyers[7] = autoBuyerDim8
        	document.getElementById("autoBuyer8").style.display = "inline-block"
    	} else document.getElementById("autoBuyer8").style.display = "none"
    	if (player.challenges.includes("challenge12") && player.autobuyers[10] == 11) {
        	player.autobuyers[10] = autoBuyerGalaxy
        	document.getElementById("autoBuyerGalaxies").style.display = "inline-block"
        	document.getElementById("buyerBtnGalaxies").style.display = ""
    	} else document.getElementById("autoBuyerGalaxies").style.display = "none"
    	if ((player.challenges.includes("postc2") || player.challenges.includes("challenge13") || player.challenges.includes("challenge16")) && player.autoSacrifice == 1) {
        	player.autoSacrifice = autoSacrifice
        	document.getElementById("autoBuyerSac").style.display = "inline-block"
        	document.getElementById("buyerBtnSac").style.display = ""
    	} else document.getElementById("autoBuyerSac").style.display = "none"
    	if (player.challenges.includes("challenge14") && player.autobuyers[12] == 13) {
        	player.autobuyers[12] = autoGalSacrifice
        	document.getElementById("autoBuyerGalSac").style.display = "inline-block"
        	document.getElementById("buyerBtnGalSac").style.display = ""
    	} else document.getElementById("autoBuyerGalSac").style.display = "none"
   	if (player.challenges.includes("challenge15") && player.autobuyers[13] == 14) {
        	player.autobuyers[13] = autoTickspeedBoost
        	document.getElementById("autoBuyerTickspeedBoost").style.display = "inline-block"
        	document.getElementById("buyerBtnTickspeedBoost").style.display = ""
    	} else document.getElementById("autoBuyerTickspeedBoost").style.display = "none"
    	if (player.challenges.includes("challenge16") && player.autobuyers[14] == 15) {
        	player.autobuyers[14] = autoTDBoost
        	document.getElementById("autoTDBoost").style.display = "inline-block"
		document.getElementById("buyerBtnTDBoost").style.display = ""
    	} else document.getElementById("autoTDBoost").style.display = "none"

	if (getEternitied() >= 100) document.getElementById("autoBuyerEter").style.display = "inline-block"
    	else document.getElementById("autoBuyerEter").style.display = "none"

	var intervalUnits = player.infinityUpgrades.includes("autoBuyerUpgrade") ? 1/2000 : 1/1000
	for (var tier = 1; tier <= 8; ++tier) {
		document.getElementById("interval" + tier).textContent = "Current interval: " + (player.autobuyers[tier-1].interval * intervalUnits).toFixed(2) + " seconds"
	}
	document.getElementById("intervalTickSpeed").textContent = "Current interval: " + (player.autobuyers[8].interval * intervalUnits).toFixed(2) + " seconds"
	document.getElementById("intervalDimBoost").textContent = "Current interval: " + (player.autobuyers[9].interval * intervalUnits).toFixed(2) + " seconds"
	document.getElementById("intervalGalaxies").textContent = "Current interval: " + (player.autobuyers[10].interval * intervalUnits).toFixed(2) + " seconds"
	document.getElementById("intervalInf").textContent = "Current interval: " + (player.autobuyers[11].interval * intervalUnits).toFixed(2) + " seconds"
	document.getElementById("intervalSac").textContent = "Current interval: " + (player.autoSacrifice.interval * intervalUnits).toFixed(2) + " seconds"
	if (player.galacticSacrifice) document.getElementById("intervalGalSac").textContent = "Current interval: " + (player.autobuyers[12].interval * intervalUnits).toFixed(2) + " seconds"
	if (player.tickspeedBoosts != undefined) document.getElementById("intervalTickspeedBoost").textContent = "Current interval: " + (player.autobuyers[13].interval * intervalUnits).toFixed(2) + " seconds"
	if (player.aarexModifications.ngmX>3) document.getElementById("intervalTDBoost").textContent = "Current interval: " + (player.autobuyers[14].interval * intervalUnits).toFixed(2) + " seconds"

    	var maxedAutobuy = 0;
    	var e100autobuy = 0;
    	var currencyEnd = player.aarexModifications.ngmX > 3 ? " GP" : " IP"
    	for (let tier = 1; tier <= 8; ++tier) {
        	document.getElementById("toggleBtn" + tier).style.display = "inline-block";
        	if (player.autobuyers[tier-1].bulk >= 1e100) {
			player.autobuyers[tier-1].bulk = 1e100;
        		document.getElementById("buyerBtn" + tier).textContent = shortenDimensions(player.autobuyers[tier-1].bulk)+"x bulk purchase";
        		e100autobuy++;
		} else {
			if (player.autobuyers[tier-1].interval <= 100) {
				if (player.autobuyers[tier-1].bulk * 2 >= 1e100) {
					document.getElementById("buyerBtn" + tier).innerHTML = shortenDimensions(1e100)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + currencyEnd;
				} else {
					document.getElementById("buyerBtn" + tier).innerHTML = shortenDimensions(player.autobuyers[tier-1].bulk*2)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + currencyEnd;
				}
				maxedAutobuy++;
			}
			else document.getElementById("buyerBtn" + tier).innerHTML = "40% smaller interval <br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + currencyEnd
		}
	}

    	if (player.autobuyers[8].interval <= 100) {
        	document.getElementById("buyerBtnTickSpeed").style.display = "none"
        	document.getElementById("toggleBtnTickSpeed").style.display = "inline-block"
        	maxedAutobuy++;
	}

	if (player.autobuyers[11].interval <= 100) {
        	document.getElementById("buyerBtnInf").style.display = "none"
        	maxedAutobuy++
    	}

    	if (canBreakInfinity()) {
        	document.getElementById("postinftable").style.display = "inline-block"
        	document.getElementById("breaktable").style.display = "inline-block"
        	document.getElementById("abletobreak").style.display = "none"
		document.getElementById("break").style.display = "inline-block"
	} else {
        	document.getElementById("postinftable").style.display = "none"
        	document.getElementById("breaktable").style.display = "none"
		document.getElementById("abletobreak").textContent = "You need to " + (player.aarexModifications.ngexV ? "complete all Normal Challenges" : "get Automated Big Crunch interval to 0.1") + " to be able to break infinity"
		document.getElementById("abletobreak").style.display = "block"
		document.getElementById("break").style.display = "none"
		document.getElementById("break").textContent = "BREAK INFINITY"
    	}

    	if (player.autoSacrifice.interval <= 100) {
        	document.getElementById("buyerBtnSac").style.display = "none"
        	if (player.galacticSacrifice != undefined || player.infinityUpgradesRespecced != undefined) maxedAutobuy++;
    	}
    	if (player.galacticSacrifice) if (player.autobuyers[12].interval <= 100) {
        	document.getElementById("buyerBtnGalSac").style.display = "none"
        	maxedAutobuy++;
    	}
    	if (player.tickspeedBoosts!=undefined) if (player.autobuyers[13].interval <= 100) {
        	document.getElementById("buyerBtnTickspeedBoost").style.display = "none"
        	maxedAutobuy++;
    	}
    	if (player.aarexModifications.ngmX > 3) if (player.autobuyers[14].interval <= 100) {
        	document.getElementById("buyerBtnTDBoost").style.display = "none"
        	maxedAutobuy++;
    	}

    	document.getElementById("buyerBtnTickSpeed").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[8].cost + currencyEnd
	document.getElementById("buyerBtnDimBoost").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[9].cost + currencyEnd
    	document.getElementById("buyerBtnGalaxies").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[10].cost + currencyEnd
    	document.getElementById("buyerBtnInf").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[11].cost + " IP"
    	document.getElementById("buyerBtnSac").innerHTML = "40% smaller interval <br>Cost: " + player.autoSacrifice.cost + currencyEnd
    	if (player.autobuyers[9].interval <= 100) {
        	if (player.infinityUpgradesRespecced != undefined && !player.autobuyers[9].bulkBought) document.getElementById("buyerBtnDimBoost").innerHTML = "Buy bulk feature<br>Cost: "+shortenCosts(1e4)+currencyEnd
        	else document.getElementById("buyerBtnDimBoost").style.display = "none"
        	maxedAutobuy++;
	}
    	if (player.autobuyers[10].interval <= 100) {
        	if (player.infinityUpgradesRespecced != undefined && !player.autobuyers[10].bulkBought) document.getElementById("buyerBtnGalaxies").innerHTML = "Buy bulk feature<br>Cost: "+shortenCosts(1e4)+currencyEnd
        	else document.getElementById("buyerBtnGalaxies").style.display = "none"
        	maxedAutobuy++;
    	}
    	if (player.galacticSacrifice) document.getElementById("buyerBtnGalSac").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[12].cost + currencyEnd
	if (player.tickspeedBoosts != undefined) document.getElementById("buyerBtnTickspeedBoost").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[13].cost + currencyEnd
	if (player.aarexModifications.ngmX > 3) document.getElementById("buyerBtnTDBoost").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[14].cost + currencyEnd

	if (maxedAutobuy >= 9) giveAchievement("Age of Automation");
    	if (maxedAutobuy >= getTotalNormalChallenges() + 1) giveAchievement("Definitely not worth it");
    	if (e100autobuy >= 8) giveAchievement("Professional bodybuilder");

    	for (var i=0; i<8; i++) {
        	if (player.autobuyers[i]%1 !== 0) document.getElementById("autoBuyer"+(i+1)).style.display = "inline-block"
	}
    	if (player.autobuyers[8]%1 !== 0) document.getElementById("autoBuyerTickSpeed").style.display = "inline-block"
    	if (player.autobuyers[9]%1 !== 0) document.getElementById("autoBuyerDimBoost").style.display = "inline-block"
    	if (player.autobuyers[10]%1 !== 0) document.getElementById("autoBuyerGalaxies").style.display = "inline-block"
    	if (player.autobuyers[11]%1 !== 0) document.getElementById("autoBuyerInf").style.display = "inline-block"
    	if (player.autoSacrifice%1 !== 0) document.getElementById("autoBuyerSac").style.display = "inline-block"

    	for (var i=1; i<=12; i++) {
        	player.autobuyers[i-1].isOn = document.getElementById(i + "ison").checked;
    	}

    	player.autoSacrifice.isOn = document.getElementById("13ison").checked
    	if (player.galacticSacrifice) {
        	if (player.autobuyers[12]%1 !== 0) document.getElementById("autoBuyerGalSac").style.display = "inline-block"
        	player.autobuyers[12].isOn = document.getElementById("14ison").checked
    	}
    	if (player.tickspeedBoosts!=undefined) {
        	if (player.autobuyers[13]%1 !== 0) document.getElementById("autoBuyerTickspeedBoost").style.display = "inline-block"
        	player.autobuyers[13].isOn = document.getElementById("15ison").checked
    	}
    	if (player.aarexModifications.ngmX>3) {
        	if (player.autobuyers[14]%1 !== 0) document.getElementById("autoTDBoost").style.display = "inline-block"
        	player.autobuyers[14].isOn = document.getElementById("16ison").checked
    	}
    	player.eternityBuyer.isOn = document.getElementById("eternityison").checked
    	if (tmp.ngp3) {
		if (player.achievements.includes("ng3p52")) document.getElementById("autoEterToggle").textContent=player.eternityBuyer.isOn?"Disable":"Enable"
		player.eternityBuyer.dilationMode = document.getElementById("dilatedeternityison").checked
		if (player.achievements.includes("ng3p52")) document.getElementById("autoDilToggle").textContent=player.eternityBuyer.dilationMode?"Disable":"Enable"
        	player.eternityBuyer.dilationPerAmount = Math.max(parseInt(document.getElementById("prioritydil").value),2)
		if (player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode&&player.eternityBuyer.statBeforeDilation>=player.eternityBuyer.dilationPerAmount&&!player.eternityBuyer.slowStopped&&player.eternityBuyer.dilMode=="amount") {
			startDilatedEternity(true)
            		return
		}
		if (tmp.qu) if (tmp.qu.autobuyer) tmp.qu.autobuyer.enabled = document.getElementById("quantumison").checked
	}
    	priorityOrder()
    	ndAutobuyersUsed=0
    	for (i=0;i<9;i++) if (player.autobuyers[i]%1!==0&&player.autobuyers[i].isOn) ndAutobuyersUsed++
	document.getElementById("maxall").style.display=ndAutobuyersUsed>8&&player.challenges.includes("postc8")?"none":""
}

function autoBuyerArray() {
    	var tempArray = []
    	for (var i=0; i<player.autobuyers.length && i<9; i++) {
        	if (player.autobuyers[i]%1 !== 0 ) tempArray.push(player.autobuyers[i])
    	}
    	return tempArray;
}

var priority = []

function priorityOrder() {
    	var tempArray = []
    	var i = 1;
    	while(tempArray.length != autoBuyerArray().length) {
        	for (var x=0 ; x< autoBuyerArray().length; x++) {
			if (autoBuyerArray()[x].priority == i) tempArray.push(autoBuyerArray()[x])
		}
		i++;
	}
    	priority = tempArray;
}

function fromValue(value) {
	value = value.replace(/,/g, '')
    	let E=value.toUpperCase().split("E")
	if (E.length > 2 && value.split(" ")[0] !== value) {
		var temp = new Decimal(0)
		temp.mantissa = parseFloat(E[0])
		temp.exponent = parseFloat(E[1]+"e"+E[2])
	}
	if (value.includes(" ")) {
		const prefixes = [['', 'U', 'D', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'O', 'N'],
		['', 'Dc', 'Vg', 'Tg', 'Qd', 'Qi', 'Se', 'St', 'Og', 'Nn'],
		['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']]
		const prefixes2 = ['', 'MI', 'MC', 'NA', 'PC', 'FM', ' ']
		let e = 0;
		let m,k,l;
		if (value.split(" ")[1].length < 5) {
			for (l=101;l>0;l--) {
				if (value.includes(FormatList[l])) {
					e += l*3
					break
				}
			}
			return Decimal.fromMantissaExponent(parseInt(value.split(" ")[0]), e)
		}
		for (let i=1;i<5;i++) {
			if (value.includes(prefixes2[i])) {
				m = value.split(prefixes2[i])[1]
				for (k=0;k<3;k++) {
					for (l=1;l<10;l++) {
						if (m.includes(prefixes[k][l])) break;
					}
					if (l != 10) e += Math.pow(10,k)*l;
				}
				break;
			}
			return Decimal.fromMantissaExponent(value.split, e*3)
		}
		for (let i=1;i<=5;i++) {
			if (value.includes(prefixes2[i])) {
				for (let j=1;j+i<6;j++) {
					if (value.includes(prefixes2[i+j])) {
						m=value.split(prefixes2[i+j])[1].split(prefixes2[i])[0]
						if (m == "") e += Math.pow(1000,i);
						else {
							for (k=0;k<3;k++) {
								for (l=1;l<10;l++) {
									if (m.includes(prefixes[k][l])) break;
								}
								if (l != 10) e += Math.pow(10,k+i*3)*l;
							}
						}
						break;
					}
				}
			}
		}
		return Decimal.fromMantissaExponent(parseFloat(value), i*3+3)
	}
	if (!isFinite(parseFloat(value[value.length-1]))) { //needs testing
		const l = " abcdefghijklmnopqrstuvwxyz"
		const v = value.replace(parseFloat(value),"")
		let e = 0;
		for (let i=0;i<v.length;i++) {
			for (let j=1;j<27;j++) {
				if (v[i] == l[j]) e += Math.pow(26,v.length-i-1)*j
			}
		}
		return Decimal.fromMantissaExponent(parseFloat(value), e*3)
	}
	value = value.replace(',','')
	if (E[0] === "") return Decimal.fromMantissaExponent(Math.pow(10,parseFloat(E[1])%1), parseInt(E[1]))
	return Decimal.fromString(value)
}

function updatePriorities() {
    	auto = false;
    	for (var x=0 ; x < autoBuyerArray().length; x++) {
        	if (x < 9) autoBuyerArray()[x].priority = parseInt(document.getElementById("priority" + (x+1)).value)
    	}
	if (parseInt(document.getElementById("priority10").value) === 69
	    || parseInt(document.getElementById("priority11").value) === 69
	    || parseInt(fromValue(document.getElementById("priority12").value).toString()) === 69
	    || parseInt(document.getElementById("bulkDimboost").value) === 69
	    || parseInt(document.getElementById("overGalaxies").value) === 69
	    || parseInt(fromValue(document.getElementById("prioritySac").value).toString()) === 69
	    || parseInt(document.getElementById("bulkgalaxy").value) === 69
	    || parseInt(fromValue(document.getElementById("priority13").value).toString()) === 69
	    || parseInt(fromValue(document.getElementById("priority14").value).toString()) === 69
	    || parseInt(document.getElementById("overGalaxiesTickspeedBoost").value) === 69
	    || parseInt(document.getElementById("bulkTickBoost").value) === 69
	    || parseInt(fromValue(document.getElementById("priority15").value).toString()) === 69
	    || parseInt(document.getElementById("prioritydil").value) === 69
	    || parseInt(fromValue(document.getElementById("priorityquantum").value).toString()) === 69) giveAchievement("Nice.");
	player.autobuyers[9].priority = parseInt(document.getElementById("priority10").value)
    	player.autobuyers[10].priority = parseInt(document.getElementById("priority11").value)
    	const infValue = fromValue(document.getElementById("priority12").value)
    	if (!isNaN(break_infinity_js ? infValue : infValue.l)) player.autobuyers[11].priority = infValue
    	else if (player.autoCrunchMode=="replicanti"&&document.getElementById("priority12").value.toLowerCase()=="max") player.autobuyers[11].priority = document.getElementById("priority12").value
    	if (getEternitied() < 10 && !player.autobuyers[9].bulkBought) {
		var bulk = Math.floor(Math.max(parseFloat(document.getElementById("bulkDimboost").value), 1))
    	} else {
        	var bulk = Math.max(parseFloat(document.getElementById("bulkDimboost").value), 0.05)
    	}
    	player.autobuyers[9].bulk = (isNaN(bulk)) ? 1 : bulk
    	player.overXGalaxies = parseInt(document.getElementById("overGalaxies").value)
    	const sacValue = fromValue(document.getElementById("prioritySac").value)
    	if (!isNaN(break_infinity_js ? sacValue : sacValue.l)) player.autoSacrifice.priority = Decimal.max(sacValue, 1.01)
    	if (player.galacticSacrifice) {
        	const galSacValue = fromValue(document.getElementById("priority14").value)
        	if (!isNaN(break_infinity_js ? galSacValue : galSacValue.l)) player.autobuyers[12].priority = galSacValue
	}
    	if (player.autobuyers[13]!=undefined) {
        	player.autobuyers[13].priority = parseInt(document.getElementById("priority15").value)
        	player.overXGalaxiesTickspeedBoost = parseInt(document.getElementById("overGalaxiesTickspeedBoost").value)
        	player.autobuyers[13].bulk = Math.floor(Math.max(parseFloat(document.getElementById("bulkTickBoost").value), 1))
        	player.autobuyers[13].bulk = (isNaN(player.autobuyers[13].bulk)) ? 1 : player.autobuyers[13].bulk
	}
    	if (player.autobuyers[14]!=undefined) {
        	player.autobuyers[14].priority = parseInt(document.getElementById("priority16").value)
        	player.autobuyers[14].overXGals = parseInt(document.getElementById("overGalaxiesTDBoost").value)
    	}
    	player.autobuyers[10].bulk = parseFloat(document.getElementById("bulkgalaxy").value)
    	const eterValue = fromValue(document.getElementById("priority13").value)
    	if (!isNaN(break_infinity_js ? eterValue : eterValue.l)) {
        	player.eternityBuyer.limit = eterValue
        	if (player.achievements.includes("ng3p52")) document.getElementById("autoEterValue").value = document.getElementById("priority13").value
    	}
    	if (tmp.ngp3) {
        	const dilValue = parseFloat(document.getElementById("prioritydil").value)
        	if (dilValue == Math.round(dilValue) && dilValue > 1) {
            		player.eternityBuyer.dilationPerAmount = dilValue
			if (player.achievements.includes("ng3p52")) document.getElementById("autoDilValue").value = dilValue
		}
		const quantumValue = fromValue(document.getElementById("priorityquantum").value)
		if (!isNaN(break_infinity_js ? quantumValue : quantumValue.l) && tmp.qu.autobuyer) tmp.qu.autobuyer.limit = quantumValue
        	if (player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode&&player.eternityBuyer.statBeforeDilation>=player.eternityBuyer.dilationPerAmount&&!player.eternityBuyer.slowStopped&&player.eternityBuyer.dilMode=="amount") {
			startDilatedEternity(true)
			return
		}
	}
	priorityOrder()
}

function updateCheckBoxes() {
    	for (var i = 0; i < player.autobuyers.length; i++) {
        	if (player.autobuyers[i]%1 !== 0) {
            		var id = (i + (i > 11 ? 2 : 1)) + "ison"
			document.getElementById(id).checked = player.autobuyers[i].isOn ? "true" : ""
		}
    	}
    	if (player.autoSacrifice.isOn) document.getElementById("13ison").checked = "true"
    	else document.getElementById("13ison").checked = ""
    	document.getElementById("eternityison").checked = player.eternityBuyer.isOn
    	if (tmp.ngp3) {
		document.getElementById("dilatedeternityison").checked = player.eternityBuyer.dilationMode
		if (tmp.qu) if (tmp.qu.autobuyer) document.getElementById("quantumison").checked = tmp.qu.autobuyer.enabled
	} else document.getElementById("dilatedeternityison").checked = false
}


function toggleAutoBuyers() {
    	var bool = player.autobuyers[0].isOn
    	for (var i = 0; i<player.autobuyers.length; i++) {
        	if (player.autobuyers[i]%1 !== 0) {
            		player.autobuyers[i].isOn = !bool
		}
	}
    	player.autoSacrifice.isOn = !bool
    	player.eternityBuyer.isOn = !bool
    	if (tmp.ngp3) tmp.qu.autobuyer.enabled = !bool
    	updateCheckBoxes()
    	updateAutobuyers()
}

function toggleBulk() {
    	if (player.options.bulkOn) {
        	player.options.bulkOn = false
        	document.getElementById("togglebulk").textContent = "Enable bulk buy"
    	} else {
        	player.options.bulkOn = true
        	document.getElementById("togglebulk").textContent = "Disable bulk buy"
    	}
}

function toggleHotkeys() {
    	if (player.options.hotkeys) {
        	player.options.hotkeys = false
        	document.getElementById("hotkeys").textContent = "Enable hotkeys"
    	} else {
        	player.options.hotkeys = true
        	document.getElementById("hotkeys").textContent = "Disable hotkeys"
    	}
}

function updateHotkeys() {
	let html = "Hotkeys: 1-8 for buy 10 dimension, shift+1-8 for buy 1 dimension, T to buy max tickspeed, shift+T to buy one tickspeed, M for max all,<br>S for sacrifice"
	if (!player.achievements.includes("r136")) html += ", D for dimension boost"
	if (!player.achievements.includes("ng3p51")) {
		if (player.tickspeedBoosts !== undefined) html += ", B for tickspeed boost"
		html += ", G for galaxy"
	}
	html += ", C for crunch, A for toggle autobuyers, R for replicanti galaxies, E for eternity"
	if (player.achievements.includes("r136")) html += ", D to dilate time"
	if (player.achievements.includes("ngpp11")) html += ", shift+D to Meta-Dimension Boost"
	if (player.meta !== undefined) html += ", Q for quantum"
	if (player.masterystudies !== undefined) html += ", U for unstabilize all quarks"
	if (player.achievements.includes("ng3p51")) html += ", B for Big Rip, G to become a ghost"
	html += "."
	if (player.boughtDims === undefined) html += "<br>You can hold shift while buying time studies to buy all up until that point, see each study's number, and save study trees."
	html += "<br>Hotkeys do not work while holding control."
	document.getElementById("hotkeysDesc").innerHTML = html
}





var challNames = [null, null, "Second Dimension Autobuyer Challenge", "Third Dimension Autobuyer Challenge", "Fourth Dimension Autobuyer Challenge", "Fifth Dimension Autobuyer Challenge", "Sixth Dimension Autobuyer Challenge", "Seventh Dimension Autobuyer Challenge", "Eighth Dimension Autobuyer Challenge", "Tickspeed Autobuyer Challenge", "Automated Dimension Boosts Challenge", "Automated Galaxies Challenge", "Automated Big Crunches Challenge", "Automated Dimensional Sacrifice Challenge", "Automated Galactic Sacrifice Challenge", "Automated Tickspeed Boosts Challenge", "Automated Time Dimension Boosts Challenge"]
var challOrder = [null, 1, 2, 3, 8, 6, 10, 9, 11, 5, 4, 12, 7, 13, 14, 15, 16]
function updateChallengeTimes() {
	for (c=2;c<17;c++) setAndMaybeShow("challengetime"+c,player.challengeTimes[challOrder[c]-2]<600*60*24*31,'"'+challNames[c]+' time record: "+timeDisplayShort(player.challengeTimes['+(challOrder[c]-2)+'], false, 3)')
	var temp=0
	var tempcounter=0
	for (var i=0;i<player.challengeTimes.length;i++) if (player.challenges.includes("challenge"+(i+2))&&player.challengeTimes[i]<600*60*24*31) {
		temp+=player.challengeTimes[i]
		tempcounter++
	}
	setAndMaybeShow("challengetimesum",tempcounter>1,'"Sum of completed challenge time records is "+timeDisplayShort('+temp+', false, 3)')
	document.getElementById("challengetimesbtn").style.display = tempcounter>0 ? "inline-block" : "none"

	var temp=0
	var tempcounter=0
	for (var i=0;i<14;i++) {
		setAndMaybeShow("infchallengetime"+(i+1),player.infchallengeTimes[i]<600*60*24*31,'"Infinity Challenge '+(i+1)+' time record: "+timeDisplayShort(player.infchallengeTimes['+i+'], false, 3)')
		if (player.infchallengeTimes[i]<600*60*24*31) {
			temp+=player.infchallengeTimes[i]
			tempcounter++
		}
	}
	setAndMaybeShow("infchallengetimesum",tempcounter>1,'"Sum of completed infinity challenge time records is "+timeDisplayShort('+temp+', false, 3)')
	document.getElementById("infchallengesbtn").style.display = tempcounter>0 ? "inline-block" : "none"
	updateWorstChallengeBonus();
}

var bestRunIppm = new Decimal(0)
function updateLastTenRuns() {
    	var listed = 0
    	var tempBest = 0
    	var tempTime = new Decimal(0)
    	var tempIP = new Decimal(0)
    	bestRunIppm = new Decimal(0)
    	for (var i=0; i<10; i++) {
        	if (player.lastTenRuns[i][1].gt(0)) {
			var ippm = player.lastTenRuns[i][1].dividedBy(player.lastTenRuns[i][0]/600)
            		if (ippm.gt(tempBest)) tempBest = ippm
            		var tempstring = shorten(ippm) + " IP/min"
            		if (ippm<1) tempstring = shorten(ippm*60) + " IP/hour"
			var msg = "The infinity " + (i == 0 ? '1 infinity' : (i+1) + ' infinities') + " ago took " + timeDisplayShort(player.lastTenRuns[i][0], false, 3)
			if (player.lastTenRuns[i][2]) {
				var split=player.lastTenRuns[i][2].split("challenge")
                		if (split[1]==undefined) msg += " in Infinity Challenge " + checkICID(player.lastTenRuns[i][2])
                		else msg += " in " + challNames[parseInt(split[1])]
			}
           	 	msg += " and gave " + shortenDimensions(player.lastTenRuns[i][1]) +" IP. "+ tempstring
            		document.getElementById("run"+(i+1)).textContent = msg
            		tempTime = tempTime.plus(player.lastTenRuns[i][0])
            		tempIP = tempIP.plus(player.lastTenRuns[i][1])
			listed++
		} else document.getElementById("run"+(i+1)).textContent = ""
	}
    	if (listed > 1) {
        	tempTime = tempTime.dividedBy(listed)
        	tempIP = tempIP.dividedBy(listed)
        	var ippm = tempIP.dividedBy(tempTime/600)
		var tempstring = shorten(ippm) + " IP/min"
        	averageIP = tempIP
        	if (ippm<1) tempstring = shorten(ippm*60) + " IP/hour"
		document.getElementById("averagerun").textContent = "Last " + listed + " infinities average time: "+ timeDisplayShort(tempTime, false, 3)+" Average IP gain: "+shortenDimensions(tempIP)+" IP. "+tempstring

        	if (tempBest.gte(1e8)) giveAchievement("Oh hey, you're still here");
		if (tempBest.gte(1e300)) giveAchievement("MAXIMUM OVERDRIVE");
        	bestRunIppm = tempBest
	} else document.getElementById("averagerun").innerHTML = ""
}

var bestECTime
function updateEterChallengeTimes() {
	bestECTime=0
	var temp=0
	var tempcounter=0
	for (var i=1;i<15;i++) {
		setAndMaybeShow("eterchallengetime"+i,player.aarexModifications.eternityChallRecords[i],'"Eternity Challenge '+i+' time record: "+timeDisplayShort(player.aarexModifications.eternityChallRecords['+i+'], false, 3)')
		if (player.aarexModifications.eternityChallRecords[i]) {
			bestECTime=Math.max(bestECTime, player.aarexModifications.eternityChallRecords[i])
			temp+=player.aarexModifications.eternityChallRecords[i]
			tempcounter++
		}
	}
	document.getElementById("eterchallengesbtn").style.display = tempcounter > 0 ? "inline-block" : "none"
	setAndMaybeShow("eterchallengetimesum",tempcounter>1,'"Sum of completed eternity challenge time records is "+timeDisplayShort('+temp+', false, 3)')
}

var averageEp = new Decimal(0)
var bestEp
function updateLastTenEternities() {
    	var listed = 0
    	var tempTime = new Decimal(0)
    	var tempEP = new Decimal(0)
    	for (var i=0; i<10; i++) {
        	if (player.lastTenEternities[i][1].gt(0)) {
			var eppm = player.lastTenEternities[i][1].dividedBy(player.lastTenEternities[i][0]/600)
			var unit = player.lastTenEternities[i][2] ? player.lastTenEternities[i][2] == "b" ? "EM" : player.lastTenEternities[i][2] == "d2" ? "TP" : "EP" : "EP"
			var tempstring = shorten(eppm) + " " + unit + "/min"
            		if (eppm<1) tempstring = shorten(eppm*60) + " " + unit + "/hour"
            		msg = "The Eternity " + (i == 0 ? '1 eternity' : (i+1) + ' eternities') + " ago took " + timeDisplayShort(player.lastTenEternities[i][0], false, 3)
			if (player.lastTenEternities[i][2]) {
                		if (player.lastTenEternities[i][2] == "b") msg += " while it was broken"
				else if (player.lastTenEternities[i][2].toString().slice(0,1) == "d") msg += " while dilated"
				else msg += " in Eternity Challenge " + player.lastTenEternities[i][2]
			}
			msg += " and gave " + shortenDimensions(player.lastTenEternities[i][1]) + " " + unit + ". " + tempstring
            		document.getElementById("eternityrun"+(i+1)).textContent = msg
            		tempTime = tempTime.plus(player.lastTenEternities[i][0])
            		tempEP = tempEP.plus(player.lastTenEternities[i][1])
            		bestEp = player.lastTenEternities[i][1].max(bestEp)
			listed++
		} else document.getElementById("eternityrun"+(i+1)).textContent = ""
	}
    	if (listed > 1) {
        	tempTime = tempTime.dividedBy(listed)
        	tempEP = tempEP.dividedBy(listed)
        	var eppm = tempEP.dividedBy(tempTime/600)
        	var tempstring = shorten(eppm) + " EP/min"
        	averageEp = tempEP
		if (eppm<1) tempstring = shorten(eppm*60) + " EP/hour"
        	document.getElementById("averageEternityRun").textContent = "Last " + listed + " eternities average time: "+ timeDisplayShort(tempTime, false, 3)+" Average EP gain: "+shortenDimensions(tempEP)+" EP. "+tempstring
	} else document.getElementById("averageEternityRun").textContent = ""
}

function addEternityTime(array) {
    	for (var i=player.lastTenEternities.length-1; i>0; i--) {
        	player.lastTenEternities[i] = player.lastTenEternities[i-1]
    	}
	player.lastTenEternities[0] = array
}

function addTime(array) {
    	for (var i=player.lastTenRuns.length-1; i>0; i--) {
        	player.lastTenRuns[i] = player.lastTenRuns[i-1]
    	}
    	player.lastTenRuns[0] = array
}

var infchallengeTimes = 999999999

function checkForEndMe() {
    	var temp = 0
    	for (var i=0; i<getTotalNormalChallenges(); i++) {
        	temp += player.challengeTimes[i]
    	}
    	if (temp <= 1800) giveAchievement("Not-so-challenging")
    	if (temp <= 50) giveAchievement("End me")
    	var temp2 = 0
    	for (var i=0; i<order.length;i++) temp2 += player.infchallengeTimes[i]
    	infchallengeTimes = temp2
    	if (temp2 <= 66.6) giveAchievement("Yes. This is hell.")
}

function getLimit() {
	if (player.infinityUpgradesRespecced == undefined || player.currentChallenge != "") return Number.MAX_VALUE
	return Decimal.pow(Number.MAX_VALUE, 1 + player.infinityUpgradesRespecced[3] / 2)
}

var isEmptiness=false
function bigCrunch(autoed) {
    var challNumber
    var split=player.currentChallenge.split("challenge")
    if (split[1]!=undefined) challNumber=parseInt(split[1])
    var icID=checkICID(player.currentChallenge)
    if (icID) challNumber=icID
    if ((player.money.gte(Number.MAX_VALUE) && !player.currentChallenge.includes("post")) || (player.currentChallenge !== "" && player.money.gte(player.challengeTarget))) {
        if ((!player.achievements.includes("r55") || (player.options.animations.bigCrunch === "always" && !autoed)) && isEmptiness && implosionCheck === 0 && player.options.animations.bigCrunch) {
            implosionCheck = 1;
            document.getElementById("body").style.animation = "implode 2s 1";
            setTimeout(function(){ document.getElementById("body").style.animation = ""; }, 2000)
            setTimeout(bigCrunch, 1000)
            return
        }
        implosionCheck = 0;
        if (player.thisInfinityTime <= 72000) giveAchievement("That's fast!");
        if (player.thisInfinityTime <= 6000) giveAchievement("That's faster!")
        if (player.thisInfinityTime <= 600) giveAchievement("Forever isn't that long")
        if (player.thisInfinityTime <= 2) giveAchievement("Blink of an eye")
        if (player.eightAmount == 0) giveAchievement("You didn't need it anyway");
        if (player.galaxies == 1) giveAchievement("Claustrophobic");
        if (player.galaxies == 0 && player.resets == 0) giveAchievement("Zero Deaths")
        if (inNC(2) && player.thisInfinityTime <= 1800) giveAchievement("Many Deaths")
        if (inNC(11) && player.thisInfinityTime <= 1800) giveAchievement("Gift from the Gods")
        if (inNC(5) && player.thisInfinityTime <= 1800) giveAchievement("Is this hell?")
        if (inNC(3) && player.thisInfinityTime <= 100) giveAchievement("You did this again just for the achievement right?");
        if (player.firstAmount == 1 && player.resets == 0 && player.galaxies == 0 && inNC(12)) giveAchievement("ERROR 909: Dimension not found")
        if (player.currentChallenge != "" && player.challengeTimes[challNumber-2] > player.thisInfinityTime) player.challengeTimes[challNumber-2] = player.thisInfinityTime
        if (player.currentChallenge.includes("post") && player.infchallengeTimes[challNumber-1] > player.thisInfinityTime) player.infchallengeTimes[challNumber-1] = player.thisInfinityTime
        if (player.currentChallenge == "postc5" && player.thisInfinityTime <= 100) giveAchievement("Hevipelle did nothing wrong")
        if (isEmptiness) {
            showTab("dimensions")
            isEmptiness = false
            if (player.eternities > 0 || quantumed) document.getElementById("eternitystorebtn").style.display = "inline-block"
            if (quantumed) document.getElementById("quantumtabbtn").style.display = "inline-block"
            if (ghostified) document.getElementById("ghostifytabbtn").style.display = "inline-block"
        }
        if (player.currentChallenge != "" && !player.challenges.includes(player.currentChallenge)) {
            player.challenges.push(player.currentChallenge);
        }
        if (player.currentChallenge.includes("post")) giveAchievement("Infinitely Challenging");
        if (player.currentChallenge == "postc8") giveAchievement("Anti-antichallenged");
        add = getIPMult()
        if ((player.break && player.currentChallenge == "") || player.infinityUpgradesRespecced != undefined) add = gainedInfinityPoints()
        else if (player.timestudy.studies.includes(51)) add = add.times(1e15)
        player.infinityPoints = player.infinityPoints.plus(add)
        var array = [player.thisInfinityTime, add]
        if (player.currentChallenge != "") array.push(player.currentChallenge)
        addTime(array)
        if (gainedInfinityPoints().gte(1e150)) giveAchievement("All your IP are belong to us")
        if (gainedInfinityPoints().gte(1e200) && player.thisInfinityTime <= 20) giveAchievement("Ludicrous Speed")
        if (gainedInfinityPoints().gte(1e250) && player.thisInfinityTime <= 200) giveAchievement("I brake for nobody")
        if (!player.achievements.includes("r111") && player.lastTenRuns[9][1].neq(0)) {
            var n = 0;
            for (i=0; i<9; i++) {
                if (player.lastTenRuns[i][1].gte(player.lastTenRuns[i+1][1].times(Number.MAX_VALUE))) n++;
            }
            if (n == 9) giveAchievement("Yo dawg, I heard you liked infinities...")
        }
        let infGain
        if (player.currentEternityChall == "eterc4") {
            infGain = 1
            if (player.infinitied >= 16 - (ECTimesCompleted("eterc4")*4)) {
                setTimeout(exitChallenge, 500)
                onChallengeFail()
            }
        } else infGain=getInfinitiedGain()
        if (autoS && auto) {
          if (gainedInfinityPoints().dividedBy(player.thisInfinityTime).gt(player.autoIP) && !player.break) player.autoIP = gainedInfinityPoints().dividedBy(player.thisInfinityTime);
          if (player.thisInfinityTime<player.autoTime) player.autoTime = player.thisInfinityTime;
        }
        auto = autoS; //only allow autoing if prev crunch was autoed
        autoS = true;
        if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
        var g11MultShown=player.infinitied>0||player.eternities!==0||quantumed
        player = {
            money: new Decimal(10),
            tickSpeedCost: new Decimal(1000),
            tickBoughtThisInf: resetTickBoughtThisInf(),
            firstCost: new Decimal(10),
            secondCost: new Decimal(100),
            thirdCost: new Decimal(10000),
            fourthCost: new Decimal(1000000),
            fifthCost: new Decimal(1e9),
            sixthCost: new Decimal(1e13),
            seventhCost: new Decimal(1e18),
            eightCost: new Decimal(1e24),
            firstAmount: new Decimal(0),
            secondAmount: new Decimal(0),
            thirdAmount: new Decimal(0),
            fourthAmount: new Decimal(0),
            firstBought: 0,
            secondBought: 0,
            thirdBought: 0,
            fourthBought: 0,
            fifthAmount: new Decimal(0),
            sixthAmount: new Decimal(0),
            seventhAmount: new Decimal(0),
            eightAmount: new Decimal(0),
            fifthBought: 0,
            sixthBought: 0,
            seventhBought: 0,
            eightBought: 0,
            firstPow: new Decimal(1),
            secondPow: new Decimal(1),
            thirdPow: new Decimal(1),
            fourthPow: new Decimal(1),
            fifthPow: new Decimal(1),
            sixthPow: new Decimal(1),
            seventhPow: new Decimal(1),
            eightPow: new Decimal(1),
            boughtDims: player.boughtDims,
            totalBoughtDims: resetTotalBought(),
            sacrificed: new Decimal(0),
            achievements: player.achievements,
            challenges: player.challenges,
            currentChallenge: player.currentChallenge,
            infinityUpgrades: player.infinityUpgrades,
            infinityUpgradesRespecced: player.infinityUpgradesRespecced,
            setsUnlocked: player.setsUnlocked,
            infinityPoints: player.infinityPoints,
            infinitied: nA(player.infinitied, infGain),
            infinitiedBank: player.infinitiedBank,
            totalTimePlayed: player.totalTimePlayed,
            bestInfinityTime: (player.currentEternityChall !== "eterc12") ? Math.min(player.bestInfinityTime, player.thisInfinityTime) : player.bestInfinityTime,
            thisInfinityTime: 0,
            resets: 0,
            dbPower: player.dbPower,
            tdBoosts: player.tdBoosts,
            tickspeedBoosts: player.tickspeedBoosts,
            galaxies: 0,
            pSac: player.pSac,
            galacticSacrifice: newGalacticDataOnInfinity(),
            totalmoney: player.totalmoney,
            interval: null,
            lastUpdate: player.lastUpdate,
            achPow: player.achPow,
            autobuyers: player.autobuyers,
            costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
            tickspeedMultiplier: new Decimal(10),
            chall2Pow: 1,
            chall3Pow: new Decimal(0.01),
            newsArray: player.newsArray,
            matter: new Decimal(0),
            chall11Pow: new Decimal(1),
            partInfinityPoint: player.partInfinityPoint,
            partInfinitied: player.partInfinitied,
            break: player.break,
            challengeTimes: player.challengeTimes,
            infchallengeTimes: player.infchallengeTimes,
            lastTenRuns: player.lastTenRuns,
            lastTenEternities: player.lastTenEternities,
            infMult: player.infMult,
            infMultCost: player.infMultCost,
            tickSpeedMultDecrease: player.tickSpeedMultDecrease,
            tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
            dimensionMultDecrease: player.dimensionMultDecrease,
            dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
            extraDimPowerIncrease: player.extraDimPowerIncrease,
            dimPowerIncreaseCost: player.dimPowerIncreaseCost,
            version: player.version,
            postChallUnlocked: player.postChallUnlocked,
            postC4Tier: 1,
            postC8Mult: new Decimal(1),
            overXGalaxies: player.overXGalaxies,
            overXGalaxiesTickspeedBoost: player.overXGalaxiesTickspeedBoost,
            singularity: player.singularity,
            dimtechs: player.dimtechs,
            spreadingCancer: player.spreadingCancer,
            infDimensionsUnlocked: player.infDimensionsUnlocked,
            infinityPower: player.infinityPower,
            infinityDimension1: player.infinityDimension1,
            infinityDimension2: player.infinityDimension2,
            infinityDimension3: player.infinityDimension3,
            infinityDimension4: player.infinityDimension4,
            infinityDimension5: player.infinityDimension5,
            infinityDimension6: player.infinityDimension6,
            infinityDimension7: player.infinityDimension7,
            infinityDimension8: player.infinityDimension8,
            infDimBuyers: player.infDimBuyers,
            timeShards: player.timeShards,
            tickThreshold: player.tickThreshold,
            timeDimension1: player.timeDimension1,
            timeDimension2: player.timeDimension2,
            timeDimension3: player.timeDimension3,
            timeDimension4: player.timeDimension4,
            timeDimension5: player.timeDimension5,
            timeDimension6: player.timeDimension6,
            timeDimension7: player.timeDimension7,
            timeDimension8: player.timeDimension8,
            eternityPoints: player.eternityPoints,
            eternities: player.eternities,
            eternitiesBank: player.eternitiesBank,
            thisEternity: player.thisEternity,
            bestEternity: player.bestEternity,
            eternityUpgrades: player.eternityUpgrades,
            epmult: player.epmult,
            epmultCost: player.epmultCost,
            totalTickGained: player.totalTickGained,
            offlineProd: player.offlineProd,
            offlineProdCost: player.offlineProdCost,
            challengeTarget: player.challengeTarget,
            autoSacrifice: player.autoSacrifice,
            replicanti: player.replicanti,
            timestudy: player.timestudy,
            eternityChalls: player.eternityChalls,
            eternityChallGoal: player.eternityChallGoal,
            currentEternityChall: player.currentEternityChall,
            eternityChallUnlocked: player.eternityChallUnlocked,
            etercreq: player.etercreq,
            autoIP: player.autoIP,
            autoTime: player.autoTime,
            infMultBuyer: player.infMultBuyer,
            autoCrunchMode: player.autoCrunchMode,
            autoEterMode: player.autoEterMode,
            peakSpent: player.peakSpent,
            respec: player.respec,
            respecMastery: player.respecMastery,
            eternityBuyer: player.eternityBuyer,
            eterc8ids: player.eterc8ids,
            eterc8repl: player.eterc8repl,
            dimlife: player.dimlife,
            dead: player.dead,
            dilation: player.dilation,
            exdilation: player.exdilation,
            blackhole: player.blackhole,
            blackholeDimension1: player.blackholeDimension1,
            blackholeDimension2: player.blackholeDimension2,
            blackholeDimension3: player.blackholeDimension3,
            blackholeDimension4: player.blackholeDimension4,
            blackholeDimension5: player.blackholeDimension5,
            blackholeDimension6: player.blackholeDimension6,
            blackholeDimension7: player.blackholeDimension7,
            blackholeDimension8: player.blackholeDimension8,
            why: player.why,
            shameLevel: player.shameLevel,
            options: player.options,
            meta: player.meta,
            masterystudies: player.masterystudies,
            autoEterOptions: player.autoEterOptions,
            galaxyMaxBulk: player.galaxyMaxBulk,
            quantum: tmp.qu,
            old: player.old,
            dontWant: player.dontWant,
            ghostify: player.ghostify,
            aarexModifications: player.aarexModifications
        };
        if (player.bestInfinityTime <= 0.01) giveAchievement("Less than or equal to 0.001");

        document.getElementById("challengeconfirmation").style.display = "inline-block"
        if (!player.options.retryChallenge) player.currentChallenge = ""

        skipResets()

        if (player.infinityUpgradesRespecced != undefined) {
            player.singularity.darkMatter = new Decimal(0)
            player.dimtechs.discounts = 0
            if (player.dimtechs.respec) {
                var total = 0
                for (dim=1;dim<9;dim++) total += player.dimtechs["dim" + dim + "Upgrades"]
                total += player.dimtechs.tickUpgrades

                player.infinityPoints = player.infinityPoints.add(Decimal.pow(5, total).sub(1).div(4).round().times(1e95))
                player.dimtechs.tickUpgrades = 0
                for (dim=1;dim<9;dim++) player.dimtechs["dim"+dim+"Upgrades"] = 0
                player.dimtechs.respec = false
            }
        }
        updateSingularity()
        updateDimTechs()

        if (player.replicanti.unl && !player.achievements.includes("r95")) player.replicanti.amount = new Decimal(1)

        if (speedrunMilestonesReached < 28 && (tmp.ngp3l || !player.achievements.includes("ng3p67"))) player.replicanti.galaxies = (player.timestudy.studies.includes(33)) ? Math.floor(player.replicanti.galaxies/2) :0

        giveAchievement("To infinity!");
        player.tdBoosts = resetTDBoosts()
        resetPSac()
        resetTDs()
        reduceDimCosts()
        setInitialDimensionPower();

        if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));

        checkForEndMe()

        if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");
        if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");

        if (player.challenges.length > 1) giveAchievement("Daredevil")
        if (player.challenges.length == getTotalNormalChallenges() + 1) giveAchievement("AntiChallenged")
        if (player.challenges.length == getTotalNormalChallenges() + order.length + 1) giveAchievement("Anti-antichallenged")

        updateAutobuyers();
        setInitialMoney()
        resetInfDimensions();
        hideDimensions()
        tmp.tickUpdate = true;
        GPminpeak = new Decimal(0)
        IPminpeak = new Decimal(0)

        var showg11Mult=player.infinitied>0||player.eternities!==0||quantumed
        if (player.galacticSacrifice&&(showg11Mult!=g11MultShown)) {
            document.getElementById("galaxy11").innerHTML = "Normal"+(player.aarexModifications.ngmX>3?" and Time D":" d")+"imensions are "+(showg11Mult?"cheaper based on your infinitied stat.<br>Currently: <span id='galspan11'></span>x":"99% cheaper.")+"<br>Cost: 1 GP"
            document.getElementById("galaxy15").innerHTML = "Normal and Time Dimensions produce "+(showg11Mult?"faster based on your infinitied stat.<br>Currently: <span id='galspan15'></span>x":"100x faster")+".<br>Cost: 1 GP"
        }

        if (getEternitied() > 10 && player.currentEternityChall !== "eterc8" && player.currentEternityChall !== "eterc2" && player.currentEternityChall !== "eterc10") {
            for (var i=1;i<getEternitied()-9 && i < 9; i++) {
                if (player.infDimBuyers[i-1]) {
                    buyMaxInfDims(i)
                    buyManyInfinityDimension(i)
                }
            }
        }

        if (getEternitied() >= 40 && player.replicanti.auto[0] && player.currentEternityChall !== "eterc8" && isChanceAffordable()) {
            var bought = Math.min(Math.max(Math.floor(player.infinityPoints.div(player.replicanti.chanceCost).log(1e15) + 1), 0), tmp.ngp3&&player.masterystudies.includes("t265")?1/0:100-Math.round(player.replicanti.chance*100))
            player.replicanti.chance = Math.round(player.replicanti.chance*100+bought)/100
            player.replicanti.chanceCost = player.replicanti.chanceCost.times(Decimal.pow(1e15, bought))
        }

        if (getEternitied() >= 60 && player.replicanti.auto[1] && player.currentEternityChall !== "eterc8") {
            while (player.infinityPoints.gte(player.replicanti.intervalCost) && player.currentEternityChall !== "eterc8" && isIntervalAffordable()) upgradeReplicantiInterval()
        }

        if (getEternitied() >= 80 && player.replicanti.auto[2] && player.currentEternityChall !== "eterc8") autoBuyRG()

        Marathon2 = 0;
    }
  updateChallenges();
  updateNCVisuals()
  updateChallengeTimes()
  updateLastTenRuns()


}


function respecToggle() {
	player.respec=!player.respec
	updateRespecButtons()
}

function updateRespecButtons() {
	var className=player.respec?"timestudybought":"storebtn"
	document.getElementById("respec").className=className
	document.getElementById("respec2").className=className
	document.getElementById("respec3").className=className

	className=player.respecMastery?"timestudybought":"storebtn"
	document.getElementById("respecMastery").className=className
	document.getElementById("respecMastery2").className=className
}

function eternity(force, auto, presetLoad, dilated) {
    	var id7unlocked = player.infDimensionsUnlocked[7]
    	if (tmp.ngp3) if (tmp.qu.bigRip.active) id7unlocked = true
    	if (force || (player.infinityPoints.gte(Number.MAX_VALUE) && id7unlocked && (auto || !player.options.eternityconfirm || confirm("Eternity will reset everything except achievements and challenge records. You will also gain an Eternity point and unlock various upgrades.")))) {
		if (force) player.currentEternityChall = "";
        	if (player.currentEternityChall !== "" && player.infinityPoints.lt(player.eternityChallGoal)) return false
        	if (player.thisEternity<player.bestEternity && !force) {
            		player.bestEternity = player.thisEternity
            		if (player.bestEternity < 300) giveAchievement("That wasn't an eternity");
			if (player.bestEternity <= 0.01) giveAchievement("Less than or equal to 0.001");
		}
        	if (player.thisEternity < 2) giveAchievement("Eternities are the new infinity")
        	if (player.currentEternityChall == "eterc6" && ECTimesCompleted("eterc6") < 5 && player.dimensionMultDecrease < 4) player.dimensionMultDecrease = Math.max(parseFloat((player.dimensionMultDecrease - 0.2).toFixed(1)),2)
        	if (!GUBought("gb4")) if ((player.currentEternityChall == "eterc11" || (player.currentEternityChall == "eterc12" && ghostified)) && ECTimesCompleted("eterc11") < 5) player.tickSpeedMultDecrease = Math.max(parseFloat((player.tickSpeedMultDecrease - 0.07).toFixed(2)),1.65)
        	if (player.infinitied < 10 && !force && !player.boughtDims) giveAchievement("Do you really need a guide for this?");
        	if (Decimal.round(player.replicanti.amount) == 9) giveAchievement("We could afford 9");
        	if (player.dimlife && !force) giveAchievement("8 nobody got time for that")
        	if (player.dead && !force) giveAchievement("You're already dead.")
        	if (player.infinitied <= 1 && !force) giveAchievement("Do I really need to infinity")
        	if (gainedEternityPoints().gte("1e600") && player.thisEternity <= 600 && player.dilation.active && !force) giveAchievement("Now you're thinking with dilation!")
        	if (ghostified && player.currentEternityChall == "eterc11" && inQC(6) && inQC(8) && inQCModifier("ad") && player.infinityPoints.e >= 15500) giveAchievement("The Deep Challenge")
		if (isEmptiness) {
            		showTab("dimensions")
            		isEmptiness = false
            		if (quantumed) document.getElementById("quantumtabbtn").style.display = "inline-block"
            		if (ghostified) document.getElementById("ghostifytabbtn").style.display = "inline-block"
		}
        temp = []
        if (gainedEternityPoints().gte(player.eternityPoints) && player.eternityPoints.gte("1e1185") && (tmp.ngp3 ? player.dilation.active && tmp.qu.bigRip.active : false)) giveAchievement("Gonna go fast")
        var oldEP=player.eternityPoints
        player.eternityPoints = player.eternityPoints.plus(gainedEternityPoints())
        var array = [player.thisEternity, gainedEternityPoints()]
        if (player.dilation.active) array = [player.thisEternity, getDilGain().sub(player.dilation.totalTachyonParticles).max(0), "d2"]
        else if (player.currentEternityChall != "") array.push(player.eternityChallUnlocked)
        else if (tmp.be) {
            tmp.qu.breakEternity.eternalMatter = tmp.qu.breakEternity.eternalMatter.add(getEMGain())
            if (player.ghostify.milestones < 15) tmp.qu.breakEternity.eternalMatter = tmp.qu.breakEternity.eternalMatter.round()
            array = [player.thisEternity, getEMGain(), "b"]
            updateBreakEternity()
        }
        addEternityTime(array)
        var forceRespec = false
        if (player.currentEternityChall !== "") {
            if (player.eternityChalls[player.currentEternityChall] === undefined) {
                player.eternityChalls[player.currentEternityChall] = 1
            } else if (player.eternityChalls[player.currentEternityChall] < 5) {
                player.eternityChalls[player.currentEternityChall] += 1
            }
            else if (player.aarexModifications.eternityChallRecords[player.eternityChallUnlocked] === undefined) player.aarexModifications.eternityChallRecords[player.eternityChallUnlocked] = player.thisEternity
            else player.aarexModifications.eternityChallRecords[player.eternityChallUnlocked] = Math.min(player.thisEternity, player.aarexModifications.eternityChallRecords[player.eternityChallUnlocked])
            if (player.currentEternityChall === "eterc12" && player.achievements.includes("ng3p51")) {
                if (player.eternityChalls.eterc11 === undefined) player.eternityChalls.eterc11 = 1
                else if (player.eternityChalls.eterc11 < 5) player.eternityChalls.eterc11++
            }
            if (tmp.ngp3?tmp.qu.autoEC&&player.eternityChalls[player.currentEternityChall]<5:false) {
                if (player.etercreq>12) player.timestudy.theorem+=masterystudies.costs.ec[player.etercreq]
                else player.timestudy.theorem+=([0,30,35,40,70,130,85,115,115,415,550,1,1])[player.etercreq]
                player.eternityChallUnlocked=0
                tmp.qu.autoECN=player.etercreq
            } else if (ghostified&&player.ghostify.milestones>1) {
                if (player.etercreq>12) player.timestudy.theorem+=masterystudies.costs.ec[player.etercreq]
                else player.timestudy.theorem+=([0,30,35,40,70,130,85,115,115,415,550,1,1])[player.etercreq]
                player.eternityChallUnlocked=0
            } else forceRespec = true
            player.etercreq=0
            if (Object.keys(player.eternityChalls).length >= 10) {
                var eterchallscompletedtotal = 0;
                for (i=1; i<Object.keys(player.eternityChalls).length+1; i++) {
                    eterchallscompletedtotal += player.eternityChalls["eterc"+i]
                }
                if (eterchallscompletedtotal >= 50) {
                    giveAchievement("5 more eternities until the update");
                }
            }
        } else if (tmp.ngp3) delete tmp.qu.autoECN
        for (var i=0; i<player.challenges.length; i++) {
            if (!player.challenges[i].includes("post") && getEternitied() > 1) temp.push(player.challenges[i])
        }
        player.infinitiedBank = nA(player.infinitiedBank, gainBankedInf())
        if (player.infinitiedBank > 5000000000) giveAchievement("No ethical consumption");
        if (player.dilation.active && (!force || player.infinityPoints.gte(Number.MAX_VALUE))) {
			let gain = getDilGain()
			if (gain.gte(player.dilation.totalTachyonParticles)) {
				if (player.dilation.totalTachyonParticles.gt(0) && gain.div(player.dilation.totalTachyonParticles).lt(2)) player.eternityBuyer.slowStopped = true
				if (tmp.ngp3) player.dilation.times++
				player.dilation.totalTachyonParticles = gain
				setTachyonParticles(gain)
			}
		}
        player.challenges = temp
        if (tmp.ngp3 && player.dilation.studies.includes(1) && !force) if (player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode) {
            if (player.eternityBuyer.dilMode=="amount"&&!player.eternityBuyer.slowStopped) {
                player.eternityBuyer.statBeforeDilation++
                if (player.eternityBuyer.statBeforeDilation>=player.eternityBuyer.dilationPerAmount) {
                    startDilatedEternity(true)
                    return
                }
            }
            if (player.eternityBuyer.dilMode=="upgrades"&&player.eternityBuyer.tpUpgraded) {
                startDilatedEternity(true)
                return
            }
        }
        var oldStat = getEternitied()
        player.eternities = nA(player.eternities, gainEternitiedStat())
        updateBankedEter()
        if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
        if (player.achievements.includes("r104")) player.infinityPoints = new Decimal(2e25);
        else player.infinityPoints = new Decimal(0);
        player = {
            money: new Decimal(10),
            tickSpeedCost: new Decimal(1000),
            tickspeed: new Decimal(player.aarexModifications.newGameExpVersion?500:1000),
            tickBoughtThisInf: resetTickBoughtThisInf(),
            firstCost: new Decimal(10),
            secondCost: new Decimal(100),
            thirdCost: new Decimal(10000),
            fourthCost: new Decimal(1000000),
            fifthCost: new Decimal(1e9),
            sixthCost: new Decimal(1e13),
            seventhCost: new Decimal(1e18),
            eightCost: new Decimal(1e24),
            firstAmount: new Decimal(0),
            secondAmount: new Decimal(0),
            thirdAmount: new Decimal(0),
            fourthAmount: new Decimal(0),
            firstBought: 0,
            secondBought: 0,
            thirdBought: 0,
            fourthBought: 0,
            fifthAmount: new Decimal(0),
            sixthAmount: new Decimal(0),
            seventhAmount: new Decimal(0),
            eightAmount: new Decimal(0),
            fifthBought: 0,
            sixthBought: 0,
            seventhBought: 0,
            eightBought: 0,
            firstPow: new Decimal(1),
            secondPow: new Decimal(1),
            thirdPow: new Decimal(1),
            fourthPow: new Decimal(1),
            fifthPow: new Decimal(1),
            sixthPow: new Decimal(1),
            seventhPow: new Decimal(1),
            eightPow: new Decimal(1),
            boughtDims: player.boughtDims,
            totalBoughtDims: resetTotalBought(),
            sacrificed: new Decimal(0),
            achievements: player.achievements,
            challenges: challengesCompletedOnEternity(),
            currentChallenge: "",
            infinityUpgrades: player.infinityUpgrades,
            setsUnlocked: player.setsUnlocked,
            infinityPoints: player.infinityPoints,
            infinitied: 0,
            infinitiedBank: player.infinitiedBank,
            totalTimePlayed: player.totalTimePlayed,
            bestInfinityTime: 9999999999,
            thisInfinityTime: 0,
            resets: (getEternitied() > 3) ? 4 : 0,
            dbPower: player.dbPower,
            tdBoosts: player.tdBoosts,
            tickspeedBoosts: player.tickspeedBoosts,
            galaxies: (getEternitied() > 3) ? 1 : 0,
            pSac: player.pSac,
            galacticSacrifice: newGalacticDataOnInfinity(true),
            totalmoney: player.totalmoney,
            interval: null,
            lastUpdate: player.lastUpdate,
            achPow: player.achPow,
            autobuyers: (getEternitied() > 1) ? player.autobuyers : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            partInfinityPoint: 0,
            partInfinitied: 0,
            break: getEternitied() > 1 ? player.break : false,
            costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
            tickspeedMultiplier: new Decimal(10),
            chall2Pow: 1,
            chall3Pow: new Decimal(0.01),
            newsArray: player.newsArray,
            matter: new Decimal(0),
            chall11Pow: new Decimal(1),
            challengeTimes: player.challengeTimes,
            infchallengeTimes: player.infchallengeTimes,
            lastTenRuns: [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]],
            lastTenEternities: player.lastTenEternities,
            infMult: new Decimal(1),
            infMultCost: new Decimal(10),
            tickSpeedMultDecrease: getEternitied() > 19 ? player.tickSpeedMultDecrease : 10,
            tickSpeedMultDecreaseCost: getEternitied() > 19 ? player.tickSpeedMultDecreaseCost : 3e6,
            dimensionMultDecrease: getEternitied() > 19 ? player.dimensionMultDecrease : 10,
            dimensionMultDecreaseCost: getEternitied() > 19 ? player.dimensionMultDecreaseCost : 1e8,
            extraDimPowerIncrease: getEternitied() > 19 ? player.extraDimPowerIncrease : 0,
            dimPowerIncreaseCost: getEternitied() > 19 ? player.dimPowerIncreaseCost : 1e3,
            version: player.version,
            postChallUnlocked: player.achievements.includes("r133") ? order.length : 0,
            postC4Tier: 1,
            postC8Mult: new Decimal(1),
            overXGalaxies: player.overXGalaxies,
            overXGalaxiesTickspeedBoost: player.overXGalaxiesTickspeedBoost,
            spreadingCancer: player.spreadingCancer,
            infDimensionsUnlocked: resetInfDimUnlocked(),
            infinityPower: new Decimal(1),
            infinityDimension1 : {
                cost: new Decimal(1e8),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension2 : {
                cost: new Decimal(1e9),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension3 : {
                cost: new Decimal(1e10),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension4 : {
                cost: new Decimal(1e20),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension5 : {
                cost: new Decimal(1e140),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension6 : {
                cost: new Decimal(1e200),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension7 : {
                cost: new Decimal(1e250),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension8 : {
                cost: new Decimal(1e280),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infDimBuyers: player.infDimBuyers,
            timeShards: new Decimal(0),
            tickThreshold: new Decimal(1),
            totalTickGained: 0,
            timeDimension1: player.timeDimension1,
            timeDimension2: player.timeDimension2,
            timeDimension3: player.timeDimension3,
            timeDimension4: player.timeDimension4,
            timeDimension5: player.timeDimension5,
            timeDimension6: player.timeDimension6,
            timeDimension7: player.timeDimension7,
            timeDimension8: player.timeDimension8,
            eternityPoints: player.eternityPoints,
            eternities: player.eternities,
            eternitiesBank: player.eternitiesBank,
            thisEternity: 0,
            bestEternity: player.bestEternity,
            eternityUpgrades: player.eternityUpgrades,
            epmult: player.epmult,
            epmultCost: player.epmultCost,
            totalTickGained: 0,
            offlineProd: getEternitied() > 19 ? player.offlineProd : 0,
            offlineProdCost: getEternitied() > 19 ? player.offlineProdCost : 1e7,
            challengeTarget: 0,
            autoSacrifice: getEternitied() > 6 ? player.autoSacrifice : 1,
            replicanti: {
                amount: speedrunMilestonesReached > 23 ? player.replicanti.amount : new Decimal(getEternitied() > 49 ? 1 : 0),
                unl: getEternitied() > 49 ? true : false,
                chance: player.replicanti.chance,
                chanceCost: player.replicanti.chanceCost,
                interval: player.replicanti.interval,
                intervalCost: player.replicanti.intervalCost,
                gal: player.replicanti.gal,
                galCost: player.replicanti.galCost,
                galaxies: 0,
                galaxybuyer: (getEternitied() > 2) ? player.replicanti.galaxybuyer : undefined,
                auto: player.replicanti.auto,
                limit: player.replicanti.newLimit,
                newLimit: player.replicanti.newLimit
            },
            timestudy: player.timestudy,
            eternityChalls: player.eternityChalls,
            eternityChallGoal: new Decimal(Number.MAX_VALUE),
            currentEternityChall: "",
            eternityChallUnlocked: player.eternityChallUnlocked,
            etercreq: player.etercreq,
            autoIP: new Decimal(0),
            autoTime: 1e300,
            infMultBuyer: player.infMultBuyer,
            autoCrunchMode: player.autoCrunchMode,
            autoEterMode: player.autoEterMode,
            peakSpent: tmp.ngp3 ? 0 : undefined,
            respec: player.respec,
            respecMastery: player.respecMastery,
            eternityBuyer: player.eternityBuyer,
            eterc8ids: 50,
            eterc8repl: 40,
            dimlife: true,
            dead: true,
            dilation: player.dilation,
            exdilation: player.exdilation,
            blackhole: player.blackhole,
            blackholeDimension1: player.blackholeDimension1,
            blackholeDimension2: player.blackholeDimension2,
            blackholeDimension3: player.blackholeDimension3,
            blackholeDimension4: player.blackholeDimension4,
            blackholeDimension5: player.blackholeDimension5,
            blackholeDimension6: player.blackholeDimension6,
            blackholeDimension7: player.blackholeDimension7,
            blackholeDimension8: player.blackholeDimension8,
            why: player.why,
            shameLevel: player.shameLevel,
            options: player.options,
            meta: player.meta,
            masterystudies: player.masterystudies,
            autoEterOptions: player.autoEterOptions,
            galaxyMaxBulk: player.galaxyMaxBulk,
            quantum: tmp.qu,
            old: player.old,
            dontWant: tmp.ngp3 ? true : undefined,
            ghostify: player.ghostify,
            aarexModifications: player.aarexModifications
        };
        if (player.galacticSacrifice && getEternitied() < 2) player.autobuyers[12]=13
        if (player.tickspeedBoosts !== undefined && getEternitied() < 2) player.autobuyers[13]=14
        var dilated2 = player.dilation.active
        if (dilated2) {
            player.dilation.active = false
            if (tmp.ngp3 && quantumed) updateColorCharge()
        }
        if (presetLoad===undefined) {
            var pData=player.eternityBuyer.presets
            if (pData!==undefined?pData.on:false) {
                var dilActive=pData.dil!==undefined?pData.dil.on:false
                var grindActive=pData.grind!==undefined?pData.grind.on:false
                if (dilated&&dilActive) {
                    if (pData.selected>-1) {
                        pData.reselect=pData.selected
                        if (apLoaded&&loadedAPs>pData.selected) document.getElementById("apselected"+pData.selected).textContent=""
                    }
                    pData.selected="dil"
                    document.getElementById("apDilSelected").textContent=">>"
                    forceRespec=true
                    presetLoad=pData.dil.preset
                } else if (player.masterystudies.includes("t291")&&player.eternityPoints.log10()>=oldEP.log10()*1.01&&!dilated2&&grindActive) {
                    if (pData.selected>-1) {
                        pData.reselect=pData.selected
                        if (apLoaded&&loadedAPs>pData.selected) document.getElementById("apselected"+pData.selected).textContent=""
                    }
                    pData.selected="grind"
                    document.getElementById("apGrindSelected").textContent=">>"
                    forceRespec=true
                    presetLoad=pData.grind.preset
                } else {
                    if (pData.reselect!==undefined) {
                        pData.selected=pData.reselect
                        forceRespec=true
                        presetLoad=pData[pData.order[pData.selected]].preset
                        document.getElementById("apDilSelected").textContent=""
                        document.getElementById("apGrindSelected").textContent=""
                        if (apLoaded&&loadedAPs>pData.selected) document.getElementById("apselected"+pData.selected).textContent=">>"
                        delete pData.reselect
                    }
                    if (pData.selectNext>-1&&((pData.selected<0&&pData.order.length)||pData.reselect!==undefined||pData.order.length>1)) {
                        pData.left--
                        if (pData.left<1) {
                            if (apLoaded&&loadedAPs>pData.selected&&pData.selected>-1) document.getElementById("apselected"+pData.selected).textContent=""
                            pData.selected=pData.selectNext
                            for (var p=1;p<pData.order.length;p++) {
                                if (pData[pData.order[(pData.selectNext+p)%pData.order.length]].on) {
                                    pData.selectNext=(pData.selectNext+p)%pData.order.length
                                    if (apLoaded&&loadedAPs>pData.selectNext) document.getElementById("apselected"+pData.selectNext).textContent=">"
                                    break
                                } else if (p==pData.order.length-1) pData.selectNext=-1
                            }
                            pData.left=pData[pData.order[pData.selected]].length
                            forceRespec=true
                            presetLoad=pData[pData.order[pData.selected]].preset
                            if (apLoaded&&loadedAPs>pData.selected) document.getElementById("apselected"+pData.selected).textContent=">>"
                        }
                        document.getElementById("eternitiesLeft").textContent=getFullExpansion(pData.left)
                    }
                }
            }
        }
        if (player.respec || player.respecMastery || forceRespec) respecTimeStudies(forceRespec, presetLoad)
		if (typeof(presetLoad) == "string") importStudyTree(presetLoad)
        if (player.respec) respecToggle()
        if (player.respecMastery) respecMasteryToggle()
        giveAchievement("Time is relative")
        if (getEternitied() >= 100) giveAchievement("This mile took an Eternity");
        if (player.replicanti.unl && speedrunMilestonesReached < 22) player.replicanti.amount = new Decimal(1)
        player.replicanti.galaxies = 0
        extraReplGalaxies = 0
        if (dilated || tmp.ngp3l || !player.achievements.includes("ng3p67")) resetReplicantiUpgrades()
        player.tdBoosts = resetTDBoosts()
        resetPSac()
        resetTDs()
        reduceDimCosts()
        setInitialDimensionPower()
        if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");
        var autobuyers = document.getElementsByClassName('autoBuyerDiv')
        if (getEternitied() < 2) {
            for (var i=0; i<autobuyers.length;i++) autobuyers.item(i).style.display = "none"
            document.getElementById("buyerBtnDimBoost").style.display = "inline-block"
            document.getElementById("buyerBtnGalaxies").style.display = "inline-block"
            document.getElementById("buyerBtnInf").style.display = "inline-block"
            document.getElementById("buyerBtnTickSpeed").style.display = "inline-block"
            document.getElementById("buyerBtnSac").style.display = "inline-block"
        }
        updateAutobuyers();
        setInitialMoney()
        if (player.achievements.includes("r85")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r93")) player.infMult = player.infMult.times(4);
        resetInfDimensions();
        updateChallenges();
        updateNCVisuals()
        updateEterChallengeTimes()
        updateLastTenRuns()
        updateLastTenEternities()
        if (!player.achievements.includes("r133")) {
            var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
            for (var i = 0; i< 8; i++) infchalls[i].style.display = "none"
        }
        GPminpeak = new Decimal(0)
        IPminpeak = new Decimal(0)
        EPminpeakType = 'normal'
        EPminpeak = new Decimal(0)
        updateMilestones()
        resetTimeDimensions()
        document.getElementById("eternityconf").style.display = "inline-block"
        if (getEternitied() < 20) player.autobuyers[9].bulk = 1
        if (getEternitied() < 20) document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
        if (getEternitied() < 50) {
            document.getElementById("replicantidiv").style.display="none"
            document.getElementById("replicantiunlock").style.display="inline-block"
        } else if (document.getElementById("replicantidiv").style.display === "none" && getEternitied() >= 50) {
            document.getElementById("replicantidiv").style.display="inline-block"
            document.getElementById("replicantiunlock").style.display="none"
        }
        if (getEternitied() > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
        document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        if (getEternitied() > 0 && oldStat < 1) {
            document.getElementById("infmultbuyer").style.display = "inline-block"
            document.getElementById("infmultbuyer").textContent = "Autobuy IP mult O"+(player.infMultBuyer?"N":"FF")
        }
        hideMaxIDButton()
        document.getElementById("eternitybtn").style.display = player.infinityPoints.gte(player.eternityChallGoal) ? "inline-block" : "none"
        document.getElementById("eternityPoints2").style.display = "inline-block"
        document.getElementById("eternitystorebtn").style.display = "inline-block"
        updateEternityUpgrades()
        document.getElementById("totaltickgained").textContent = "You've gained "+getFullExpansion(player.totalTickGained)+" tickspeed upgrades."
        hideDimensions()
        tmp.tickUpdate = true;
        playerInfinityUpgradesOnEternity()
        document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
        updateEternityChallenges()
        if (player.eternities <= 1) {
            showTab("dimensions")
            showDimTab("timedimensions")
            loadAutoBuyerSettings()
        }
        Marathon2 = 0;
        doAutoEterTick()
        if (tmp.ngp3&&player.dilation.upgrades.includes("ngpp3")&&getEternitied()>=1e9) player.dbPower=new Decimal(1)
        if (tmp.ngp3) updateBreakEternity()
    }
}

function resetReplicantiUpgrades() {
	let keepPartial = tmp.ngp3 && player.dilation.upgrades.includes("ngpp3") && getEternitied() >= 2e10
	player.replicanti.chance = keepPartial ? Math.min(player.replicanti.chance, 1) : 0.01
	player.replicanti.interval = keepPartial ? Math.max(player.replicanti.interval, player.timestudy.studies.includes(22) ? 1 : 50) : 1000
	player.replicanti.gal = 0
	player.replicanti.chanceCost = Decimal.pow(1e15, player.replicanti.chance * 100).times(player.galacticSacrifice!==undefined?1e75:1e135)
	player.replicanti.intervalCost = Decimal.pow(1e10, Math.round(Math.log10(1000/player.replicanti.interval)/-Math.log10(0.9))).times(player.galacticSacrifice!==undefined?1e80:player.boughtDims?1e150:1e140)
	player.replicanti.galCost = new Decimal(player.galacticSacrifice!=undefined?1e110:1e170)	
}

function challengesCompletedOnEternity(bigRip) {
	var array = []
	if (getEternitied()>1||bigRip||player.achievements.includes("ng3p51")) for (i=1;i<(player.galacticSacrifice?15:13);i++) array.push("challenge"+i)
	if (player.achievements.includes("r133")) for (i=0;i<order.length;i++) array.push(order[i])
	return array
}

function gainEternitiedStat() {
	let ret = 1
	if (ghostified) {
		ret = Math.pow(10, 2 / (Math.log10(getEternitied() + 1) / 10 + 1))
		if (hasNU(9)) ret = nM(ret, tmp.qu.bigRip.spaceShards.max(1).pow(.1))
	}
	if (quantumed && player.eternities < 1e5) ret = Math.max(ret, 20)
	let exp = getEternitiesAndDTBoostExp()
	if (exp > 0) ret = nM(player.dilation.dilatedTime.max(1).pow(exp), ret)
	if (typeof(ret) == "number") ret = Math.floor(ret)
	return ret
}

function gainBankedInf() {
	let ret = 0 
	let numerator = player.infinitied
	if (speedrunMilestonesReached > 27 || player.achievements.includes("ng3p73")) numerator = nA(getInfinitiedGain(), player.infinitied)
	let frac = 0.05
	if (player.timestudy.studies.includes(191)) ret = nM(numerator, frac)
	if (player.achievements.includes("r131")) ret = nA(nM(numerator, frac), ret)
	if (player.exdilation != undefined) ret = nM(ret, getBlackholePowerEffect().pow(1/3))
	return ret
}

function exitChallenge() {
    	if (player.aarexModifications.ngmX>3&&player.galacticSacrifice.chall) {
		galacticSacrifice(false, true)
		showTab("dimensions")
    	} else if (player.currentChallenge !== "") {
        	startChallenge("");
        	updateChallenges();
		return
	} else if (player.currentEternityChall !== "") {
        	player.currentEternityChall = ""
        	player.eternityChallGoal = new Decimal(Number.MAX_VALUE)
        	eternity(true)
        	updateEternityChallenges();
        	return
	}
    	if (tmp.ngp3) if (!inQC(0)) quantum(false, true, 0)
}

function onChallengeFail() {
	document.getElementById("challfail").style.display = "block"
	giveAchievement("You're a mistake")
	failureCount++
	if (failureCount > 9) giveAchievement("You're a failure")
}

function startChallenge(name) {
    if (name == "postc3" && isIC3Trapped()) return
    if (name == "challenge7" && inQC(4)) return
    if ((name == "postc2" || name == "postc6" || name == "postc7" || name == "postc8") && inQC(6)) return
    if (name.includes("post")) {
        if (player.postChallUnlocked < checkICID(name)) return
        var target = getGoal(name)
    } else var target = new Decimal(Number.MAX_VALUE)
    if (player.options.challConf && name != "") if (!confirm("You will start over with just your infinity upgrades, and achievements. You need to reach " + (name.includes("post") ? "a set goal" : "infinity") + " with special conditions. NOTE: The rightmost infinity upgrade column doesn't work on challenges.")) return
    if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
    if (name == "postc1" && player.currentEternityChall != "" && inQC(4) && inQC(6)) giveAchievement("The Ultimate Challenge")
    player = {
        money: new Decimal(10),
        tickSpeedCost: new Decimal(1000),
        tickBoughtThisInf: resetTickBoughtThisInf(),
        firstCost: new Decimal(10),
        secondCost: new Decimal(100),
        thirdCost: new Decimal(10000),
        fourthCost: new Decimal(1000000),
        fifthCost: new Decimal(1e9),
        sixthCost: new Decimal(1e13),
        seventhCost: new Decimal(1e18),
        eightCost: new Decimal(1e24),
        firstAmount: new Decimal(0),
        secondAmount: new Decimal(0),
        thirdAmount: new Decimal(0),
        fourthAmount: new Decimal(0),
        firstBought: 0,
        secondBought: 0,
        thirdBought: 0,
        fourthBought: 0,
        fifthAmount: new Decimal(0),
        sixthAmount: new Decimal(0),
        seventhAmount: new Decimal(0),
        eightAmount: new Decimal(0),
        fifthBought: 0,
        sixthBought: 0,
        seventhBought: 0,
        eightBought: 0,
        firstPow: new Decimal(1),
        secondPow: new Decimal(1),
        thirdPow: new Decimal(1),
        fourthPow: new Decimal(1),
        fifthPow: new Decimal(1),
        sixthPow: new Decimal(1),
        seventhPow: new Decimal(1),
        eightPow: new Decimal(1),
        boughtDims: player.boughtDims,
        totalBoughtDims: resetTotalBought(),
        sacrificed: new Decimal(0),
      achievements: player.achievements,
      challenges: player.challenges,
      currentChallenge: name,
      infinityUpgrades: player.infinityUpgrades,
      infinityUpgradesRespecced: player.infinityUpgradesRespecced,
      setsUnlocked: player.setsUnlocked,
      infinityPoints: player.infinityPoints,
      infinitied: player.infinitied,
      infinitiedBank: player.infinitiedBank,
      totalTimePlayed: player.totalTimePlayed,
      bestInfinityTime: player.bestInfinityTime,
      thisInfinityTime: 0,
      resets: 0,
      dbPower: player.dbPower,
      tdBoosts: player.tdBoosts,
      tickspeedBoosts: player.tickspeedBoosts,
      galaxies: 0,
      pSac: player.pSac,
      galacticSacrifice: newGalacticDataOnInfinity(),
      totalmoney: player.totalmoney,
      interval: null,
      lastUpdate: player.lastUpdate,
      achPow: player.achPow,
      autobuyers: player.autobuyers,
      costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
      tickspeedMultiplier: new Decimal(10),
      chall2Pow: 1,
      chall3Pow: new Decimal(0.01),
      matter: new Decimal(0),
      newsArray: player.newsArray,
      chall11Pow: new Decimal(1),
      partInfinityPoint: player.partInfinityPoint,
      partInfinitied: player.partInfinitied,
      break: player.break,
      challengeTimes: player.challengeTimes,
      infchallengeTimes: player.infchallengeTimes,
      lastTenRuns: player.lastTenRuns,
      lastTenEternities: player.lastTenEternities,
      infMult: player.infMult,
      infMultCost: player.infMultCost,
      tickSpeedMultDecrease: player.tickSpeedMultDecrease,
      tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
      dimensionMultDecrease: player.dimensionMultDecrease,
      dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
      extraDimPowerIncrease: player.extraDimPowerIncrease,
      dimPowerIncreaseCost: player.dimPowerIncreaseCost,
      version: player.version,
      postChallUnlocked: player.postChallUnlocked,
      postC4Tier: 1,
      postC8Mult: new Decimal(1),
      overXGalaxies: player.overXGalaxies,
      overXGalaxiesTickspeedBoost: player.overXGalaxiesTickspeedBoost,
      singularity: player.singularity,
      dimtechs: player.dimtechs,
      spreadingCancer: player.spreadingCancer,
      infDimensionsUnlocked: player.infDimensionsUnlocked,
      infinityPower: player.infinityPower,
      infinityDimension1: player.infinityDimension1,
      infinityDimension2: player.infinityDimension2,
      infinityDimension3: player.infinityDimension3,
      infinityDimension4: player.infinityDimension4,
      infinityDimension5: player.infinityDimension5,
      infinityDimension6: player.infinityDimension6,
      infinityDimension7: player.infinityDimension7,
      infinityDimension8: player.infinityDimension8,
      infDimBuyers: player.infDimBuyers,
      timeShards: player.timeShards,
      tickThreshold: player.tickThreshold,
      timeDimension1: player.timeDimension1,
      timeDimension2: player.timeDimension2,
      timeDimension3: player.timeDimension3,
      timeDimension4: player.timeDimension4,
      timeDimension5: player.timeDimension5,
      timeDimension6: player.timeDimension6,
      timeDimension7: player.timeDimension7,
      timeDimension8: player.timeDimension8,
      eternityPoints: player.eternityPoints,
      eternities: player.eternities,
      eternitiesBank: player.eternitiesBank,
      thisEternity: player.thisEternity,
      bestEternity: player.bestEternity,
      eternityUpgrades: player.eternityUpgrades,
      epmult: player.epmult,
      epmultCost: player.epmultCost,
      totalTickGained: player.totalTickGained,
      offlineProd: player.offlineProd,
      offlineProdCost: player.offlineProdCost,
      challengeTarget: target,
      autoSacrifice: player.autoSacrifice,
      replicanti: player.replicanti,
      timestudy: player.timestudy,
      eternityChalls: player.eternityChalls,
      eternityChallGoal: player.eternityChallGoal,
      currentEternityChall: player.currentEternityChall,
      eternityChallUnlocked: player.eternityChallUnlocked,
      etercreq: player.etercreq,
      autoIP: player.autoIP,
      autoTime: player.autoTime,
      infMultBuyer: player.infMultBuyer,
      autoCrunchMode: player.autoCrunchMode,
      autoEterMode: player.autoEterMode,
      peakSpent: player.peakSpent,
      respec: player.respec,
      respecMastery: player.respecMastery,
      eternityBuyer: player.eternityBuyer,
      eterc8ids: player.eterc8ids,
      eterc8repl: player.eterc8repl,
      dimlife: player.dimlife,
      dead: player.dead,
      dilation: player.dilation,
      exdilation: player.exdilation,
      blackhole: player.blackhole,
      blackholeDimension1: player.blackholeDimension1,
      blackholeDimension2: player.blackholeDimension2,
      blackholeDimension3: player.blackholeDimension3,
      blackholeDimension4: player.blackholeDimension4,
      blackholeDimension5: player.blackholeDimension5,
      blackholeDimension6: player.blackholeDimension6,
      blackholeDimension7: player.blackholeDimension7,
      blackholeDimension8: player.blackholeDimension8,
      why: player.why,
      shameLevel: player.shameLevel,
      options: player.options,
      meta: player.meta,
      masterystudies: player.masterystudies,
      autoEterOptions: player.autoEterOptions,
      galaxyMaxBulk: player.galaxyMaxBulk,
      quantum: tmp.qu,
      old: player.old,
      dontWant: player.dontWant,
      ghostify: player.ghostify,
      aarexModifications: player.aarexModifications
    };
	if (inNC(10) || player.currentChallenge == "postc1") {
        player.thirdCost = new Decimal(100)
        player.fourthCost = new Decimal(500)
        player.fifthCost = new Decimal(2500)
        player.sixthCost = new Decimal(2e4)
        player.seventhCost = new Decimal(2e5)
        player.eightCost = new Decimal(4e6)
    }
    player.tdBoosts = resetTDBoosts()
    resetPSac()
    resetTDs()
    reduceDimCosts()
    if (player.currentChallenge == "postc1") player.costMultipliers = [new Decimal(1e3),new Decimal(5e3),new Decimal(1e4),new Decimal(1.2e4),new Decimal(1.8e4),new Decimal(2.6e4),new Decimal(3.2e4),new Decimal(4.2e4)];
    if (player.currentChallenge == "postc2") {
        player.eightAmount = new Decimal(1);
        player.eightBought = 1;
        player.resets = 4;
    }
    updateNCVisuals()

    if (player.infinityUpgradesRespecced != undefined) {
        player.singularity.darkMatter = new Decimal(0)
        player.dimtechs.discounts = 0
    }
    updateSingularity()
    updateDimTechs()
	
    if (player.replicanti.unl) player.replicanti.amount = new Decimal(1)
    player.replicanti.galaxies = 0

    // even if we're in a challenge, apparently if it's challenge 2 we might have four resets anyway.
    setInitialDimensionPower();


    GPminpeak = new Decimal(0)
    IPminpeak = new Decimal(0)
    if (player.currentChallenge.includes("post")) {
		player.break = true
		document.getElementById("break").innerHTML = "FIX INFINITY"
    }
    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));

    showTab('dimensions')
    updateChallenges()
	setInitialMoney()

    if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");

    resetInfDimensions();
    hideDimensions()
    tmp.tickUpdate = true;

    skipResets()
    if (player.currentChallenge.includes("post") && player.currentEternityChall !== "") giveAchievement("I wish I had gotten 7 eternities")
    Marathon2 = 0;
}

function startNormalChallenge(x) {
	if (x == 7) {
		if (player.infinitied < 1 && player.eternities < 1 && !quantumed) return
		startChallenge("challenge7", Number.MAX_VALUE)
	}
	if (player.aarexModifications.ngmX > 3) galacticSacrifice(false, true, x)
	else startChallenge("challenge"+x, Number.MAX_VALUE)
}

function inNC(x, n) {
	if (x == 6) {
		if (n == 1 && player.aarexModifications.ngexV && (player.currentChallenge == "" || player.currentChallenge.indexOf("postc") == 0) && player.currentChallenge != "postc1") return true
		if (n == 1 && player.aarexModifications.ngexV && player.currentChallenge == "challenge6") return false
		if (n == 2 && !player.aarexModifications.ngexV) return false
	}
	if (x == 0) return player.currentChallenge == "" && (!(player.aarexModifications.ngmX > 3) || !player.galacticSacrifice.chall) && inPxC(0)
	return player.currentChallenge == "challenge" + x || (player.aarexModifications.ngmX > 3 && player.galacticSacrifice.chall == x) || inPxC(x)
}

function getTotalNormalChallenges() {
	let x=11
	if (player.galacticSacrifice!==undefined) x+=2
	else if (player.infinityUpgradesRespecced!==undefined) x++
	if (player.tickspeedBoosts!==undefined) x++
	if (player.aarexModifications.ngmX>3) x++
	return x
}

function updateNCVisuals() {
	var chall = player.currentChallenge

   	 if (inNC(2) || chall == "postc1" || player.pSac !== undefined) document.getElementById("chall2Pow").style.display = "inline-block"
    	else document.getElementById("chall2Pow").style.display = "none"

    	if (inNC(3) || chall == "postc1") document.getElementById("chall3Pow").style.display = "inline-block"
    	else document.getElementById("chall3Pow").style.display = "none"

	if (inNC(12) || chall == "postc1" || chall == "postc6" || inQC(6) || player.pSac !== undefined) document.getElementById("matter").style.display = "block"
	else document.getElementById("matter").style.display = "none"

	if (isADSCRunning()) document.getElementById("chall13Mult").style.display = "block"
	else document.getElementById("chall13Mult").style.display = "none"

	if (inNC(14) && player.aarexModifications.ngmX > 3) document.getElementById("c14Resets").style.display = "block"
	else document.getElementById("c14Resets").style.display = "none"

	if (inNC(6, 2) || inNC(9) || inNC(12) || ((inNC(5) || inNC(14) || chall == "postc4" || chall == "postc5") && player.tickspeedBoosts == undefined) || player.pSac !== undefined || chall == "postc1" || chall == "postc6" || chall == "postc8") document.getElementById("quickReset").style.display = "inline-block"
	else document.getElementById("quickReset").style.display = "none"
}

function unlockEChall(idx) {
	if (player.eternityChallUnlocked == 0) {
		player.eternityChallUnlocked = idx
		document.getElementById("eterc"+player.eternityChallUnlocked+"div").style.display = "inline-block"
		if (!justImported) showTab("challenges")
		if (!justImported) showChallengesTab("eternitychallenges")
		if (idx !== 13 && idx !== 14) {
			updateTimeStudyButtons(true)
			player.etercreq = idx
		}
		if (tmp.ngp3) delete tmp.qu.autoECN
	}
	updateEternityChallenges()
}

function ECTimesCompleted(name) {
    return player.eternityChalls[name]||0
}

function canUnlockEC(idx, cost, study, study2) {
    study2 = (study2 !== undefined) ? study2 : 0;
    if (player.eternityChallUnlocked !== 0) return false
    if (!player.timestudy.studies.includes(study) && (player.study2 == 0 || !player.timestudy.studies.includes(study2))) return false
    if (player.timestudy.theorem < cost) return false
    if (player.etercreq == idx && idx !== 11 && idx !== 12) return true

    var ec1Mult=player.aarexModifications.newGameExpVersion?1e3:2e4
    switch(idx) {
        case 1:
        if (getEternitied() >= (ECTimesCompleted("eterc1")?ECTimesCompleted("eterc1")+1:1)*ec1Mult) return true
        break;

        case 2:
        if (player.totalTickGained >= 1300+(ECTimesCompleted("eterc2")*150)) return true
        break;

        case 3:
        if (player.eightAmount.gte(17300+(ECTimesCompleted("eterc3")*1250))) return true
        break;

        case 4:
        if (1e8 + (ECTimesCompleted("eterc4")*5e7) <= getInfinitied()) return true
        break;

        case 5:
        if (160 + (ECTimesCompleted("eterc5")*14) <= player.galaxies) return true
        break;

        case 6:
        if (40 + (ECTimesCompleted("eterc6")*5) <= player.replicanti.galaxies) return true
        break;

        case 7:
        if (player.money.gte(new Decimal("1e500000").times(new Decimal("1e300000").pow(ECTimesCompleted("eterc7"))))) return true
        break;

        case 8:
        if (player.infinityPoints.gte(new Decimal("1e4000").times(new Decimal("1e1000").pow(ECTimesCompleted("eterc8"))))) return true
        break;

        case 9:
        if (player.infinityPower.gte(new Decimal("1e17500").times(new Decimal("1e2000").pow(ECTimesCompleted("eterc9"))))) return true
        break;

        case 10:
        if (player.eternityPoints.gte(new Decimal("1e100").times(new Decimal("1e20").pow(ECTimesCompleted("eterc10"))))) return true
        break;

        case 11:
        if (player.timestudy.studies.includes(71) && !player.timestudy.studies.includes(72) && !player.timestudy.studies.includes(73)) return true
        break;

        case 12:
        if (player.timestudy.studies.includes(73) && !player.timestudy.studies.includes(71) && !player.timestudy.studies.includes(72)) return true
        break;
    }
}

function updateECUnlockButtons() {
    if (canUnlockEC(1, 30, 171)) {
        document.getElementById("ec1unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec1unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(2, 35, 171)) {
        document.getElementById("ec2unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec2unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(3, 40, 171)) {
        document.getElementById("ec3unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec3unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(4, 70, 143)) {
        document.getElementById("ec4unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec4unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(5, 130, 42)) {
        document.getElementById("ec5unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec5unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(6, 85, 121)) {
        document.getElementById("ec6unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec6unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(7, 115, 111)) {
        document.getElementById("ec7unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec7unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(8, 115, 123)) {
        document.getElementById("ec8unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec8unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(9, 415, 151)) {
        document.getElementById("ec9unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec9unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(10, 550, 181)) {
        document.getElementById("ec10unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec10unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(11, 1, 231, 232)) {
        document.getElementById("ec11unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec11unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(12, 1, 233, 234)) {
        document.getElementById("ec12unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec12unl").className = "eternitychallengestudylocked"
    }

    if (player.eternityChallUnlocked !== 0 )document.getElementById("ec"+player.eternityChallUnlocked+"unl").className = "eternitychallengestudybought"
}

document.getElementById("ec1unl").onclick = function() {
    if (canUnlockEC(1, 30, 171)) {
        unlockEChall(1)
        player.timestudy.theorem -= 30
        drawStudyTree()
    }
}

document.getElementById("ec2unl").onclick = function() {
    if (canUnlockEC(2, 35, 171)) {
        unlockEChall(2)
        player.timestudy.theorem -= 35
        drawStudyTree()
    }
}

document.getElementById("ec3unl").onclick = function() {
    if (canUnlockEC(3, 40, 171)) {
        unlockEChall(3)
        player.timestudy.theorem -= 40
        drawStudyTree()
    }
}

document.getElementById("ec4unl").onclick = function() {
    if (canUnlockEC(4, 70, 143)) {
        unlockEChall(4)
        player.timestudy.theorem -= 70
        drawStudyTree()
    }
}

document.getElementById("ec5unl").onclick = function() {
    if (canUnlockEC(5, 130, 42)) {
        unlockEChall(5)
        player.timestudy.theorem -= 130
        drawStudyTree()
    }
}

document.getElementById("ec6unl").onclick = function() {
    if (canUnlockEC(6, 85, 121)) {
        unlockEChall(6)
        player.timestudy.theorem -= 85
        drawStudyTree()
    }
}

document.getElementById("ec7unl").onclick = function() {
    if (canUnlockEC(7, 115, 111)) {
        unlockEChall(7)
        player.timestudy.theorem -= 115
        drawStudyTree()
    }
}

document.getElementById("ec8unl").onclick = function() {
    if (canUnlockEC(8, 115, 123)) {
        unlockEChall(8)
        player.timestudy.theorem -= 115
        drawStudyTree()
    }
}

document.getElementById("ec9unl").onclick = function() {
    if (canUnlockEC(9, 415, 151)) {
        unlockEChall(9)
        player.timestudy.theorem -= 415
        drawStudyTree()
    }
}

document.getElementById("ec10unl").onclick = function() {
    if (canUnlockEC(10, 550, 181)) {
        unlockEChall(10)
        player.timestudy.theorem -= 550
        drawStudyTree()
    }
}

document.getElementById("ec11unl").onclick = function() {
    if (canUnlockEC(11, 1, 231, 232)) {
        unlockEChall(11)
        player.timestudy.theorem -= 1
        drawStudyTree()
    }
}

document.getElementById("ec12unl").onclick = function() {
    if (canUnlockEC(12, 1, 233, 234)) {
        unlockEChall(12)
        player.timestudy.theorem -= 1
        drawStudyTree()
    }
}

function getEC12TimeLimit() {
	//In the multiple of 0.1 seconds
	let r=10-2*ECTimesCompleted("eterc12")
	if (tmp.ngex) r*=3.75
	return Math.max(r,1)
}

var ecExpData = {
	inits: {
		eterc1: 1800,
		eterc2: 975,
		eterc3: 600,
		eterc4: 2750,
		eterc5: 750,
		eterc6: 850,
		eterc7: 2000,
		eterc8: 1300,
		eterc9: 1750,
		eterc10: 3000,
		eterc11: 500,
		eterc12: 110000,
		eterc13: 38500000,
		eterc14: 1595000,
		eterc1_ngmm: 2675,
		eterc2_ngmm: 1125,
		eterc3_ngmm: 1025,
		eterc4_ngmm: 4000,
		eterc5_ngmm: 600,
		eterc6_ngmm: 850,
		eterc7_ngmm: 1450,
		eterc8_ngmm: 2100,
		eterc9_ngmm: 2250,
		eterc10_ngmm: 2500,
		eterc11_ngmm: 35000,
		eterc12_ngmm: 37500,
		eterc13_legacy: 38000000,
	},
	increases: {
		eterc1: 200,
		eterc2: 175,
		eterc3: 75,
		eterc4: 550,
		eterc5: 400,
		eterc6: 250,
		eterc7: 530,
		eterc8: 900,
		eterc9: 250,
		eterc10: 300,
		eterc11: 200,
		eterc12: 12000,
		eterc13: 1000000,
		eterc14: 800000,
		eterc1_ngmm: 400,
		eterc2_ngmm: 250,
		eterc3_ngmm: 100,
		eterc4_ngmm: 850,
		eterc5_ngmm: 300,
		eterc6_ngmm: 225,
		eterc8_ngmm: 500,
		eterc9_ngmm: 300,
		eterc10_ngmm: 250,
		eterc11_ngmm: 3250,
		eterc12_ngmm: 7500,
		eterc13_legacy: 1200000,
		eterc14_legacy: 250000
	}
}
function getECGoal(x) {
	let expInit=ecExpData.inits[x]
	let expIncrease=ecExpData.increases[x]
	let completions=ECTimesCompleted(x)
	if (player.galacticSacrifice!=undefined) {
		expInit=ecExpData.inits[x+"_ngmm"]||expInit
		expIncrease=ecExpData.increases[x+"_ngmm"]||expIncrease
	}
	if (tmp.ngp3l) {
		expInit=ecExpData.inits[x+"_legacy"]||expInit
		expIncrease=ecExpData.increases[x+"_legacy"]||expIncrease
	}
	let exp=expInit+expIncrease*completions
	if (x=="ec13"&&!tmp.ngp3l) exp+=600000*Math.max(completions-2,0)*(completions-3,0)
	return Decimal.pow(10,exp)
}

function getECReward(x) {
	let m2=player.galacticSacrifice!==undefined
	let c=ECTimesCompleted("eterc"+x)
	if (x==1) return Math.pow(Math.max(player.thisEternity*10,1),(0.3+c*0.05)*(m2?4:1))
	if (x==2) {
		let r=player.infinityPower.pow((m2?4.5:1.5)/(700-c*100)).add(1)
		if (m2) r=Decimal.pow(player.infinityPower.add(10).log10(),1000).times(r)
		else r=r.min(1e100)
		return r.max(1)
	}
	if (x==3) return c*0.8
	if (x==4) return player.infinityPoints.max(1).pow((m2?.4:0.003)+c*(m2?.2:0.002)).min(m2?1/0:1e200)
	if (x==5) return c*5
	if (x==8) {
		let x=Math.log10(player.infinityPower.plus(1).log10()+1)
		if (x>0) x=Math.pow(x,(m2?0.05:0.03)*c)
		return Math.max(x,1)
	}
	if (x==9) {
		let r=player.timeShards
		if (r.gt(0)) r=r.pow(c/(m2?1:10))
		if (m2) r=r.times(Decimal.pow(player.timeShards.max(10).log10(),500*c))
		if (m2) return r.plus(1).min("1e10000")
		if (!player.aarexModifications.newGameExpVersion) return r.plus(1).min("1e400")
		if (r.lt("1e400")) return r.plus(1)
		let log = Math.sqrt(r.log10()*400)
		return Decimal.pow(10,Math.min(50000,log))	
	}
	if (x==10) return Decimal.pow(getInfinitied(),m2?2:.9).times(c*(m2?0.02:0.000002)).add(1).pow(player.timestudy.studies.includes(31)?4:1)
	if (x==12) return 1-c*(m2?.06:0.008)
	if (x==13) {
		var data={
			main:[0,0.25,0.5,0.7,0.85,1],
			legacy:[0,0.2,0.4,0.6,0.8,1]
		}
		var dataUsed=data[tmp.ngp3l?"legacy":"main"]
		return dataUsed[c]
	}
	if (x==14) return getIC3EffFromFreeUpgs()
}

function startEternityChallenge(n) {
    if (player.currentEternityChall == "eterc"+n || parseInt(n) != player.eternityChallUnlocked) return
    if (player.options.challConf) if (!confirm("You will start over with just your time studies, eternity upgrades and achievements. You need to reach a set IP with special conditions.")) return
	if (ghostified && name == "eterc10") player.ghostify.under = false
    var oldStat = getEternitied()
    player.eternities = nA(player.eternities, gainEternitiedStat())
    updateBankedEter()
    if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
    if (player.achievements.includes("r104")) player.infinityPoints = new Decimal(2e25);
    else player.infinityPoints = new Decimal(0);
    player = {
        money: new Decimal(10),
        tickSpeedCost: new Decimal(1000),
        tickspeed: new Decimal(player.aarexModifications.newGameExpVersion?500:1000),
        tickBoughtThisInf: resetTickBoughtThisInf(),
        firstCost: new Decimal(10),
        secondCost: new Decimal(100),
        thirdCost: new Decimal(10000),
        fourthCost: new Decimal(1000000),
        fifthCost: new Decimal(1e9),
        sixthCost: new Decimal(1e13),
        seventhCost: new Decimal(1e18),
        eightCost: new Decimal(1e24),
        firstAmount: new Decimal(0),
        secondAmount: new Decimal(0),
        thirdAmount: new Decimal(0),
        fourthAmount: new Decimal(0),
        firstBought: 0,
        secondBought: 0,
        thirdBought: 0,
        fourthBought: 0,
        fifthAmount: new Decimal(0),
        sixthAmount: new Decimal(0),
        seventhAmount: new Decimal(0),
        eightAmount: new Decimal(0),
        fifthBought: 0,
        sixthBought: 0,
        seventhBought: 0,
        eightBought: 0,
        firstPow: new Decimal(1),
        secondPow: new Decimal(1),
        thirdPow: new Decimal(1),
        fourthPow: new Decimal(1),
        fifthPow: new Decimal(1),
        sixthPow: new Decimal(1),
        seventhPow: new Decimal(1),
        eightPow: new Decimal(1),
        boughtDims: player.boughtDims,
        totalBoughtDims: resetTotalBought(),
        sacrificed: new Decimal(0),
        achievements: player.achievements,
        challenges: challengesCompletedOnEternity(),
        currentChallenge: "",
        infinityUpgrades: player.infinityUpgrades,
        setsUnlocked: player.setsUnlocked,
        infinityPoints: player.infinityPoints,
        infinitied: 0,
        infinitiedBank: player.infinitiedBank,
        totalTimePlayed: player.totalTimePlayed,
        bestInfinityTime: 9999999999,
        thisInfinityTime: 0,
        resets: (getEternitied() > 3) ? 4 : 0,
        dbPower: player.dbPower,
        tdBoosts: player.tdBoosts,
        tickspeedBoosts: player.tickspeedBoosts,
        galaxies: (getEternitied() > 3) ? 1 : 0,
        pSac: player.pSac,
        galacticSacrifice: resetGalacticSacrifice(true),
        totalmoney: player.totalmoney,
        interval: null,
        lastUpdate: player.lastUpdate,
        achPow: player.achPow,
        autobuyers: getEternitied() > 1 ? player.autobuyers : [1,2,3,4,5,6,7,8,9,10,11,12],
        partInfinityPoint: 0,
        partInfinitied: 0,
        break: player.break,
        costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
        tickspeedMultiplier: new Decimal(10),
        chall2Pow: 1,
        chall3Pow: new Decimal(0.01),
        newsArray: player.newsArray,
        matter: new Decimal(0),
        chall11Pow: new Decimal(1),
        challengeTimes: player.challengeTimes,
        infchallengeTimes: player.infchallengeTimes,
        lastTenRuns: [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]],
        lastTenEternities: player.lastTenEternities,
        infMult: new Decimal(1),
        infMultCost: new Decimal(10),
        tickSpeedMultDecrease: getEternitied() > 19 ? player.tickSpeedMultDecrease : 10,
        tickSpeedMultDecreaseCost: getEternitied() > 19 ? player.tickSpeedMultDecreaseCost : 3e6,
        dimensionMultDecrease: getEternitied() > 19 ? player.dimensionMultDecrease : 10,
        dimensionMultDecreaseCost: getEternitied() > 19 ? player.dimensionMultDecreaseCost : 1e8,
        extraDimPowerIncrease: getEternitied() > 19 ? player.extraDimPowerIncrease : 0,
        dimPowerIncreaseCost: getEternitied() > 19 ? player.dimPowerIncreaseCost : 1e3,
        version: player.version,
        postChallUnlocked: player.achievements.includes("r133") ? order.length : 0,
        postC4Tier: 1,
        postC8Mult: new Decimal(1),
        overXGalaxies: player.overXGalaxies,
        overXGalaxiesTickspeedBoost: player.overXGalaxiesTickspeedBoost,
        spreadingCancer: player.spreadingCancer,
        infDimensionsUnlocked: resetInfDimUnlocked(),
        infinityPower: new Decimal(1),
        infinityDimension1 : {
            cost: new Decimal(1e8),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        },
        infinityDimension2 : {
            cost: new Decimal(1e9),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        },
        infinityDimension3 : {
            cost: new Decimal(1e10),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        },
        infinityDimension4 : {
            cost: new Decimal(1e20),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        },
        infinityDimension5 : {
            cost: new Decimal(1e140),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        },
        infinityDimension6 : {
            cost: new Decimal(1e200),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        },
        infinityDimension7 : {
            cost: new Decimal(1e250),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        },
        infinityDimension8 : {
            cost: new Decimal(1e280),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        },
        infDimBuyers: player.infDimBuyers,
        timeShards: new Decimal(0),
        tickThreshold: new Decimal(1),
        totalTickGained: 0,
        timeDimension1: player.timeDimension1,
        timeDimension2: player.timeDimension2,
        timeDimension3: player.timeDimension3,
        timeDimension4: player.timeDimension4,
        timeDimension5: player.timeDimension5,
        timeDimension6: player.timeDimension6,
        timeDimension7: player.timeDimension7,
        timeDimension8: player.timeDimension8,
        eternityPoints: player.eternityPoints,
        eternities: player.eternities,
        eternitiesBank: player.eternitiesBank,
        thisEternity: 0,
        bestEternity: player.bestEternity,
        eternityUpgrades: player.eternityUpgrades,
        epmult: player.epmult,
        epmultCost: player.epmultCost,
        totalTickGained: 0,
        offlineProd: getEternitied() > 19 ? player.offlineProd : 0,
        offlineProdCost: getEternitied() > 19 ? player.offlineProdCost : 1e7,
        challengeTarget: 0,
        autoSacrifice: getEternitied() > 6 ? player.autoSacrifice : 1,
        replicanti: {
            amount: speedrunMilestonesReached > 23 ? player.replicanti.amount : new Decimal(getEternitied() > 49 ? 1 : 0),
            unl: getEternitied() > 49 ? true : false,
            chance: player.replicanti.chance,
            chanceCost: player.replicanti.chanceCost,
            interval: player.replicanti.interval,
            intervalCost: player.replicanti.intervalCost,
            gal: player.replicanti.gal,
            galCost: player.replicanti.galCost,
            galaxies: 0,
            galaxybuyer: (getEternitied() > 2) ? player.replicanti.galaxybuyer : undefined,
            auto: player.replicanti.auto,
            limit: player.replicanti.newLimit,
            newLimit: player.replicanti.newLimit
        },
        timestudy: player.timestudy,
        eternityChalls: player.eternityChalls,
        eternityChallGoal: getECGoal("eterc"+n),
        currentEternityChall: "eterc"+n,
        eternityChallUnlocked: player.eternityChallUnlocked,
        etercreq: player.etercreq,
        autoIP: new Decimal(0),
        autoTime: 1e300,
        infMultBuyer: player.infMultBuyer,
        autoCrunchMode: player.autoCrunchMode,
        autoEterMode: player.autoEterMode,
        peakSpent: tmp.ngp3 ? 0 : undefined,
        respec: player.respec,
        respecMastery: player.respecMastery,
        eternityBuyer: player.eternityBuyer,
        eterc8ids: 50,
        eterc8repl: 40,
        dimlife: true,
        dead: true,
        dilation: player.dilation,
        exdilation: player.exdilation,
        blackhole: player.blackhole,
        blackholeDimension1: player.blackholeDimension1,
        blackholeDimension2: player.blackholeDimension2,
        blackholeDimension3: player.blackholeDimension3,
        blackholeDimension4: player.blackholeDimension4,
        blackholeDimension5: player.blackholeDimension5,
        blackholeDimension6: player.blackholeDimension6,
        blackholeDimension7: player.blackholeDimension7,
        blackholeDimension8: player.blackholeDimension8,
        why: player.why,
        shameLevel: player.shameLevel,
        options: player.options,
        meta: player.meta,
        masterystudies: player.masterystudies,
        autoEterOptions: player.autoEterOptions,
        galaxyMaxBulk: player.galaxyMaxBulk,
        quantum: tmp.qu,
        old: player.old,
        dontWant: tmp.ngp3 ? true : undefined,
        ghostify: player.ghostify,
        aarexModifications: player.aarexModifications
    };
    if (player.galacticSacrifice && getEternitied() < 2) player.autobuyers[12]=13
    if (player.tickspeedBoosts !== undefined && getEternitied() < 2) player.autobuyers[13]=14
    if (player.dilation.active) {
        player.dilation.active = false
        if (tmp.ngp3 && quantumed) updateColorCharge()
    }
    if (player.replicanti.unl && speedrunMilestonesReached < 22) player.replicanti.amount = new Decimal(1)
    player.replicanti.galaxies = 0
    extraReplGalaxies = 0
    resetReplicantiUpgrades()
    player.tdBoosts = resetTDBoosts()
    resetPSac()
    resetTDs()
    reduceDimCosts()
    setInitialDimensionPower()
    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    var autobuyers = document.getElementsByClassName('autoBuyerDiv')
    if (getEternitied() < 2) {
        for (var i=0; i<autobuyers.length;i++) autobuyers.item(i).style.display = "none"
        document.getElementById("buyerBtnDimBoost").style.display = "inline-block"
        document.getElementById("buyerBtnGalaxies").style.display = "inline-block"
        document.getElementById("buyerBtnInf").style.display = "inline-block"
        document.getElementById("buyerBtnTickSpeed").style.display = "inline-block"
        document.getElementById("buyerBtnSac").style.display = "inline-block"
    }
    updateAutobuyers();
    setInitialMoney()
    if (player.achievements.includes("r85")) player.infMult = player.infMult.times(4);
    if (player.achievements.includes("r93")) player.infMult = player.infMult.times(4);
    if (player.achievements.includes("r104")) player.infinityPoints = new Decimal(2e25);
    resetInfDimensions();
    updateChallenges();
    updateNCVisuals()
    updateLastTenRuns()
    updateLastTenEternities()
    if (!player.achievements.includes("r133")) {
        var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
        for (var i = 0; i< infchalls.length; i++) infchalls[i].style.display = "none"
    }
    GPminpeak = new Decimal(0)
    IPminpeak = new Decimal(0)
    EPminpeakType = 'normal'
    EPminpeak = new Decimal(0)
    updateMilestones()
    resetTimeDimensions()
    if (getEternitied() < 20) player.autobuyers[9].bulk = 1
    if (getEternitied() < 20) document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
    if (getEternitied() < 50) {
        document.getElementById("replicantidiv").style.display="none"
        document.getElementById("replicantiunlock").style.display="inline-block"
    }
    if (getEternitied() > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
    document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
    document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
    if (getEternitied() > 0 && oldStat < 1) {
        document.getElementById("infmultbuyer").style.display = "inline-block"
        document.getElementById("infmultbuyer").textContent = "Autobuy IP mult O"+(player.infMultBuyer?"N":"FF")
    }
    hideMaxIDButton()
    document.getElementById("eternitybtn").style.display = player.infinityPoints.gte(player.eternityChallGoal) ? "inline-block" : "none"
    document.getElementById("eternityPoints2").style.display = "inline-block"
    document.getElementById("eternitystorebtn").style.display = "inline-block"
    updateEternityUpgrades()
    document.getElementById("totaltickgained").textContent = "You've gained "+player.totalTickGained.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" tickspeed upgrades."
    hideDimensions()
    tmp.tickUpdate = true;
    playerInfinityUpgradesOnEternity()
    document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
    updateEternityChallenges()
    Marathon2 = 0;
    resetUP()
    doAutoEterTick()
    if (tmp.ngp3&&player.dilation.upgrades.includes("ngpp3")&&getEternitied()>=1e9) player.dbPower=getDimensionBoostPower()
}

function getEC12Mult() {
	let r = 1e3
	let p14 = hasPU(14, true)
	if (p14) r /= puMults[14](p14)
	return r
}

var failsafeDilateTime = false
function startDilatedEternity(auto, shortcut) {
	if (shortcut && player.dilation.active) return
	if (failsafeDilateTime) return
    	if (!player.dilation.studies.includes(1)) return
	failsafeDilateTime = true
    	var onActive = player.dilation.active
    	if (!onActive && player.aarexModifications.dilationConf && !auto) if (!confirm("Dilating time will start a new eternity, and all of your Dimension/Infinity Dimension/Time Dimension multiplier's exponents and tickspeed multiplier's exponent will be reduced to ^ 0.75. If you can eternity while dilated, you'll be rewarded with tachyon particles based on your antimatter and tachyon particles.")) return
	giveAchievement("I told you already, time is relative")
    	if (tmp.ngp3) {
        	if (onActive) player.eternityBuyer.statBeforeDilation++
        	else player.eternityBuyer.statBeforeDilation = 0
        	player.eternityBuyer.tpUpgraded = false
	}
    	eternity(true, true, undefined, true)
    	if (!onActive) player.dilation.active = true;
    	resetUP()
	if (tmp.ngp3 && quantumed) {
		updateColorCharge()
		updateColorDimPowers()
	}
}

function dilates(x, m) {
	let e=1
	let a=false
	if (player.dilation.active&&m!=2&&(m!="meta"||!player.achievements.includes("ng3p63")||!inQC(0))) {
		e*=dilationPowerStrength()
		if (player.aarexModifications.newGameMult) e=0.9+Math.min((player.dilation.dilatedTime.add(1).log10())/1000,0.05)
		if (player.exdilation!=undefined&&!player.aarexModifications.ngudpV&&!player.aarexModifications.nguspV) e+=exDilationBenefit()*(1-e)
		if (player.dilation.upgrades.includes(9)) e*=1.05
		if (player.dilation.rebuyables[5]) e+=0.0025*(1-1/Math.pow(player.dilation.rebuyables[5]+1,1/3))
		a=true
	}
	if (player.galacticSacrifice!==undefined&&m!=1) {
		e*=dilationPowerStrength()
		a=true
	}
	if (a) {
		if (m!="tick") x=x.max(1)
		else if (player.galacticSacrifice==undefined) x=x.times(1e3)
		if (x.gt(10)||!(player.aarexModifications.ngmX>3)) x=Decimal.pow(10, Math.pow(x.log10(),e))
		if (m=="tick"&&player.galacticSacrifice==undefined) x=x.div(1e3)
		if (m=="tick"&&x.lt(1)) x=Decimal.div(1,x)
	}
	return x.max(0)
}

function dilationPowerStrength() {
	let pow = 0.75
	if (player.aarexModifications.ngmX>3) pow = 0.7
	return pow;
}


/**
 *
 * @param {Name of the ugrade} id
 * @param {Cost of the upgrade} cost
 * @param {Cost increase for the upgrade, only for rebuyables} costInc
 *
 * id 1-3 are rebuyables
 *
 * id 2 resets your dilated time and free galaxies
 *
 */

const DIL_UPGS = []
const DIL_UPG_SIZES = [5, 7]
const DIL_UPG_COSTS = {
	  r1: [1e5, 10, 1/0],
	  r2: [1e6, 100, 1/0],
	  r3: [1e7, 20, 72],
	  r4: [1e8, 1e4, 24],
	  r4_ngmm: [1e30, 1e4, 18],
	  r5: [1e16, 10, 1/0],
	  4: 5e6,
	  5: 1e9,
	  6: 5e7,
	  7: 2e12,
	  8: 1e10,
	  9: 1e11,
	  10: 1e15,
	  ngud1: 1e20,
	  ngud2: 1e25,
	  ngpp1: 1e20,
	  ngpp2: 1e25,
	  ngpp3: 1e50,
	  ngpp4: 1e60,
	  ngpp5: 1e80,
	  ngpp6: 1e100,
	  ngpp3_usp: 1e79,
	  ngpp4_usp: 1e84,
	  ngpp5_usp: 1e89,
	  ngpp6_usp: 1e100,
	  ngmm1: 5e16,
	  ngmm2: 1e19,
	  ngmm3: 1e20,
	  ngmm4: 1e25,
	  ngmm5: 1/0,
	  ngmm6: 1/0,
	  ngmm7: 1/0,
	  ngmm8: 1/0,
	  ngmm9: 1/0,
	  ngmm10: 1/0,
	  ngmm11: 1/0,
	  ngmm12: 1/0,
	  ngusp1: 1e50,
	  ngusp2: 1e55,
	  ngusp3: 1e94
}
const DIL_UPG_OLD_POS_IDS = {
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	10: 10,
	12: "ngpp1",
	13: "ngpp2",
	14: "ngpp3",
	15: "ngpp4",
	16: "ngpp5",
	17: "ngpp6",
	18: "ngud1",
	19: "ngud2",
	20: "ngusp1",
	21: "ngusp2",
	22: "ngusp3"
}
const DIL_UPG_POS_IDS = {
	11: "r1",    12: "r2",    13: "r3",     15: "r5",     14: "r4",     
	21: 4,       22: 5,       23: 6,        25: "ngmm1",  24: "ngpp1",
	31: 7,       32: 8,       33: 9,        35: "ngmm2",  34: "ngpp2",
	51: "ngpp3", 52: "ngpp4", 53: "ngpp5",  55: "ngmm7",  54: "ngpp6",
	71: "ngmm8", 72: "ngmm9", 73: "ngmm10", 74: "ngmm11", 75: "ngmm12",
	41: 10,      42: "ngmm3", 43: "ngmm4",  44: "ngmm5",  45: "ngmm6",
	61: "ngud1", 62: "ngud2", 63: "ngusp1", 64: "ngusp2", 65: "ngusp3"
}
const DIL_UPG_ID_POS = {}
const DIL_UPG_UNLOCKED = {}

function setupDilationUpgradeList() {
	for (var x = 1; x <= DIL_UPG_SIZES[0]; x++) {
		for (var y = 1; y <= DIL_UPG_SIZES[1]; y++)	{
			let push = false
			let pos = y * 10 + x
			let id = DIL_UPG_POS_IDS[pos]
			if (id) push = true
			if (push) {
				DIL_UPGS.push(pos)
				DIL_UPG_ID_POS[id] = pos
			}
		}
	}
}

function getDilUpgId(x) {
	let r = DIL_UPG_POS_IDS[x]
	return r
}

function isDilUpgUnlocked(id) {
	id = toString(id)
	let ngpp = id.split("ngpp")[1]
	let ngmm = id.split("ngmm")[1]
	if (id == "r4") return player.meta !== undefined
	if (id == "r5") return player.galacticSacrifice !== undefined && !tmp.ngp3l
	if (ngmm) {
		let r = player.galacticSacrifice !== undefined && !tmp.ngp3l
		if (ngmm == 6) r = r && player.meta !== undefined
		if (ngmm >= 7) r = r && player.dilation.studies.includes(6)
		return r
	}
	if (ngpp) {
		ngpp = parseInt(ngpp)
		let r = player.meta !== undefined
		if (ngpp >= 3) r = r && player.dilation.studies.includes(6)
		return r
	}
	if (id.split("ngud")[1]) {
		let r = player.exdilation !== undefined
		if (id == "ngud2") r = r && player.aarexModifications.nguspV === undefined
		return r
	}
	if (id.split("ngusp")[1]) {
		let r = player.aarexModifications.nguspV !== undefined
		if (id != "ngusp1") r = r && player.dilation.studies.includes(6)
		return r
	}
	return true
}

function getDilUpgCost(id) {
	id = toString(id)
	if (id[0] == "r") return getRebuyableDilUpgCost(id[1])
	let cost = DIL_UPG_COSTS[id]
	let ngpp = id.split("ngpp")[1]
	if (ngpp) {
		ngpp = parseInt(ngpp)
		if (ngpp >= 3 && player.aarexModifications.nguspV !== undefined) cost = DIL_UPG_COSTS[id + "_usp"]
	}
	return cost
}

function getRebuyableDilUpgCost(id) {
	var costGroup = DIL_UPG_COSTS["r"+id]
	if (id == 4 && player.galacticSacrifice !== undefined && !tmp.ngp3l) costGroup = DIL_UPG_COSTS.r4_ngmm
	var amount = player.dilation.rebuyables[id]||0
	let cost = new Decimal(costGroup[0]).times(Decimal.pow(costGroup[1],amount))
	if (player.aarexModifications.nguspV) {
		if (id > 3) cost = cost.times(1e7)
		if (id > 2 && cost.gte(1e25)) cost = Decimal.pow(10, Math.pow(cost.log10()/2.5-5, 2))
	} else if (id > 2) {
		if (player.meta != undefined && amount >= costGroup[2]) return cost.times(Decimal.pow(costGroup[1], (amount - costGroup[2] + 1) * (amount - costGroup[2] + 2)/4))
		if (player.exdilation != undefined && !player.aarexModifications.ngudpV && cost.gt(1e30)) cost = cost.div(1e30).pow(cost.log(1e30)).times(1e30)
	}
	return cost
}

function buyDilationUpgrade(pos, max, isId) {
	let id = pos
	if (isId) pos = DIL_UPG_ID_POS[id]
	else id = getDilUpgId(id)
	let cost = getDilUpgCost(id)
	if (!player.dilation.dilatedTime.gte(cost)) return
	let rebuyable = toString(id)[0] == "r"
	if (rebuyable) {
		// Rebuyable
        if (cost.gt("1e100000")) return
		if (id[1] == 2 && !canBuyGalaxyThresholdUpg()) return

		player.dilation.dilatedTime = player.dilation.dilatedTime.sub(cost)
        player.dilation.rebuyables[id[1]] = (player.dilation.rebuyables[id[1]] || 0) + 1

        if (id[1] == 2) {
            if (speedrunMilestonesReached < 22) player.dilation.dilatedTime = new Decimal(0)
            resetDilationGalaxies()
        }
        if (id[1] >= 3) player.eternityBuyer.tpUpgraded = true
	} else {
		// Not rebuyable
		if (player.dilation.upgrades.includes(id)) return

		player.dilation.dilatedTime = player.dilation.dilatedTime.sub(cost)
		player.dilation.upgrades.push(id)
		if (player.aarexModifications.nguspV !== undefined && !player.dilation.autoUpgrades.includes(id)) player.dilation.autoUpgrades.push(id)
		if (id == 4 || id == "ngmm1") player.dilation.freeGalaxies *= 2 // Double the current galaxies
        	if (id == 10 && tmp.ngp3) tmp.qu.wasted = false
		if (id == "ngpp3" && tmp.ngp3) {
            		updateMilestones()
            		if (getEternitied() >= 1e9) player.dbPower = new Decimal(getDimensionBoostPower())
		}
		if (id == "ngpp6" && tmp.ngp3) {
            		document.getElementById("masterystudyunlock").style.display=""
            		document.getElementById("respecMastery").style.display = "block"
            		document.getElementById("respecMastery2").style.display = "block"
            		if (!quantumed) {
				$.notify("Congratulations for unlocking mastery studies! You can either click 'mastery studies' button\nor 'continue to mastery studies' button in time studies.")
				document.getElementById("welcomeMessage").innerHTML = "Congratulations for reaching the end-game of NG++. In NG+3, the game keeps going with a lot of new content starting at Mastery Studies. You can either click 'mastery studies' button or 'continue to mastery studies' button in time studies."
			}
		}
	}
	if (max) return true
    	if (rebuyable) updateDilationUpgradeCost(pos, id)
    	updateDilationUpgradeButtons()
}

function getPassiveTTGen() {
	if (player.dilation.tachyonParticles.gt(Decimal.pow(10,3300))) return 1e200
	let r=getTTGenPart(player.dilation.tachyonParticles)
	if (player.achievements.includes("ng3p18")&&!tmp.qu.bigRip.active) r+=getTTGenPart(player.dilation.bestTP)/50
	if (tmp.ngex) r*=.8
	r/=(ghostified?200:2e4)
	return r
}

function getTTGenPart(x) {
	x=x.max(1).log10()
	let y=player.aarexModifications.ngudpV&&!player.aarexModifications.nguepV?73:80
	if (x>y) x=Math.sqrt((x-y+5)*5)+y-5
	return Math.pow(10,x)
}

function updateDilationUpgradeButtons() {
	for (var i = 0; i < DIL_UPGS.length; i++) {
		var pos = DIL_UPGS[i]
		var id = getDilUpgId(pos)
		var unl = isDilUpgUnlocked(id)
		if (DIL_UPG_UNLOCKED[id] != unl) {
			if (unl) {
				DIL_UPG_UNLOCKED[id] = 1
				updateDilationUpgradeCost(pos, id)
			} else delete DIL_UPG_UNLOCKED[id]
			document.getElementById("dil" + pos).parentElement.style.display = unl ? "" : "none"
		}
		if (unl) document.getElementById("dil" + pos).className = player.dilation.upgrades.includes(id) || (id == "r2" && !canBuyGalaxyThresholdUpg()) ? "dilationupgbought" : player.dilation.dilatedTime.gte(getDilUpgCost(id)) ? "dilationupg" : "dilationupglocked"
	}
	var genSpeed = getPassiveTTGen()
	var power = getDil3Power()
	document.getElementById("dil13desc").textContent = power > 3 ? "Gain " + shorten(power) + "x more Tachyon Particles." : "Triple the amount of Tachyon Particles gained."
    	document.getElementById("dil31desc").textContent = "Currently: "+shortenMoney(player.dilation.dilatedTime.max(1).pow(1000).max(1))+"x"
    	document.getElementById("dil41desc").textContent = "Currently: "+shortenMoney(player.achievements.includes("ng3p44") && player.timestudy.theorem / genSpeed < 3600 ? genSpeed * 10 : genSpeed)+"/s"
    	if (player.dilation.studies.includes(6)) {
        	document.getElementById("dil51desc").textContent = "Currently: "+shortenMoney(getDil14Bonus()) + 'x';
        	document.getElementById("dil52desc").textContent = "Currently: "+shortenMoney(getDil15Bonus()) + 'x';
        	document.getElementById("dil54formula").textContent = "(log(x)^0.5"+(tmp.ngp3?")":"/2)")
        	document.getElementById("dil54desc").textContent = "Currently: "+shortenMoney(getDil17Bonus()) + 'x';
	}
    	if (player.exdilation != undefined) document.getElementById("dil61desc").textContent = "Currently: "+shortenMoney(getD18Bonus())+"x"
    	if (isDilUpgUnlocked("ngusp2")) {
		document.getElementById("dil64desc").textContent = "Currently: +"+shortenMoney(getD21Bonus())+" to exponent before softcap"
		document.getElementById("dil65desc").textContent = "Currently: "+shortenMoney(getD22Bonus())+"x"
	}
    	if (player.galacticSacrifice !== undefined) {
		document.getElementById("dil44desc").textContent = "Currently: +"+shortenMoney(getDil44Mult())
		document.getElementById("dil45desc").textContent = "Currently: "+shortenMoney(getDil45Mult())+"x"
		if (player.dilation.studies.includes(6)) {
			document.getElementById("dil71desc").textContent = "Currently: ^"+shortenMoney(getDil71Mult())
			document.getElementById("dil72desc").textContent = "Currently: "+shortenMoney(getDil72Mult())+"x"
		}
	}
}

function updateDilationUpgradeCost(pos, id) {
	if (id == "r2" && !canBuyGalaxyThresholdUpg()) document.getElementById("dil" + pos + "cost").textContent = "Maxed out"
	else {
		let r = getDilUpgCost(id)
		if (id == "r3") r = formatValue(player.options.notation, getRebuyableDilUpgCost(3), 1, 1)
		else r = shortenCosts(r)
		document.getElementById("dil" + pos + "cost").textContent = "Cost: " + r + " dilated time"
	}
	if (id == "ngud1") document.getElementById("dil61oom").textContent = shortenCosts(new Decimal("1e1000"))
}

function updateDilationUpgradeCosts() {
	for (var i = 0; i < DIL_UPGS.length; i++) {
		var pos = DIL_UPGS[i]
		var id = getDilUpgId(pos)
		if (DIL_UPG_UNLOCKED[id]) updateDilationUpgradeCost(pos, id)
	}
}

function gainDilationGalaxies() {
	if (player.dilation.dilatedTime.gte(player.dilation.nextThreshold)) {
		let thresholdMult = inQC(5) ? Math.pow(10, 2.8) : !canBuyGalaxyThresholdUpg() ? 1.35 : 1.35 + 3.65 * Math.pow(0.8, getDilUpgPower(2))
		if (hasBosonicUpg(12)) {
			thresholdMult -= tmp.blu[12]
			if (thresholdMult < 1.15) thresholdMult = 1.05 + 0.1 / (2.15 - thresholdMult)
		}
		if (player.exdilation != undefined) thresholdMult -= Math.min(.1 * exDilationUpgradeStrength(2), 0.2)
		if (thresholdMult < 1.15 && player.aarexModifications.nguspV !== undefined) thresholdMult = 1.05 + 0.1 / (2.15 - thresholdMult)
		let galaxyMult = getFreeGalaxyGainMult()
		let thresholdGalaxies = player.dilation.freeGalaxies / galaxyMult
		let timesGained = Math.floor(player.dilation.dilatedTime.div(player.dilation.nextThreshold).log(thresholdMult) + 1 + thresholdGalaxies)
		player.dilation.freeGalaxies = timesGained * galaxyMult
		player.dilation.nextThreshold = Decimal.pow(thresholdMult, timesGained - thresholdGalaxies).times(player.dilation.nextThreshold)
		checkUniversalHarmony()
	}
}

function getFreeGalaxyGainMult() {
	let galaxyMult = player.dilation.upgrades.includes(4) ? 2 : 1
	if (player.dilation.upgrades.includes("ngmm1")) galaxyMult *= 2
	if (player.aarexModifications.ngudpV&&!player.aarexModifications.nguepV) galaxyMult /= 1.5
	galaxyMult *= tmp.qcRewards[2]
	if (tmp.ngp3) if (player.masterystudies.includes("d12")) galaxyMult *= getNanofieldRewardEffect(3)
	return galaxyMult
}

function resetDilationGalaxies() {
	player.dilation.nextThreshold = new Decimal(1000)
	player.dilation.freeGalaxies = 0
	gainDilationGalaxies()
}

function quickReset() {
	if (inQC(6)) return
	if (inNC(14)) if (player.tickBoughtThisInf.pastResets.length < 1) return
	if (player.resets > 0 && !(player.galacticSacrifice && inNC(5))) player.resets--
	if (inNC(14)) {
		while (player.tickBoughtThisInf.pastResets.length > 0) {
			let entry = player.tickBoughtThisInf.pastResets.pop()
			if (entry.resets < player.resets) {
				// it has fewer resets than we do, put it back and we're done.
				player.tickBoughtThisInf.pastResets.push(entry);
				break;
			} else {
				// we will have at least this many resets, set our remaining tickspeed upgrades
				// and then throw the entry away
				player.tickBoughtThisInf.current = entry.bought;
			}
		}
	}
	softReset(0)
}


function updateInfPower() {
	document.getElementById("infPowAmount").textContent = shortenMoney(player.infinityPower)
	if (player.galacticSacrifice && player.pSac == undefined) document.getElementById("infPowEffectPower").textContent = tmp.infPowExp.toFixed(2)
	document.getElementById("infDimMultAmount").textContent = shortenMoney(tmp.infPow)
	if (player.currentEternityChall == "eterc7") document.getElementById("infPowPerSec").textContent = "You are getting " +shortenDimensions(DimensionProduction(1))+" Seventh Dimensions per second."
	else {
		let r=DimensionProduction(1)
		if (player.pSac!=undefined) r=r.div(getEC12Mult())
		document.getElementById("infPowPerSec").textContent = "You are getting " +shortenDimensions(r)+" Infinity Power per second."
	}
}

function getReplSpeed() {
	let inc=.2
	let exp=308
	if (player.dilation.upgrades.includes('ngpp1') && (!player.aarexModifications.nguspV || player.aarexModifications.nguepV)) {
		let expDiv=10
		if (tmp.ngp3 && !tmp.ngp3l) expDiv=9
		let x=1+player.dilation.dilatedTime.max(1).log10()/expDiv
		inc/=Math.min(x,200)
		if (x>200) exp+=x/10-20
	}
	if (player.dilation.upgrades.includes("ngmm10")) exp+=player.dilation.upgrades.length*0
	inc=inc+1
	if (GUBought("gb2")) exp*=2
	return {inc:inc,exp:exp}
}

function updateDilation() {
    	if (document.getElementById("dilation").style.display == "block" && document.getElementById("eternitystore").style.display == "block") {
        	document.getElementById("tachyonParticleAmount").textContent = shortenMoney(player.dilation.tachyonParticles)
        	document.getElementById("dilatedTimeAmount").textContent = shortenMoney(player.dilation.dilatedTime)
        	document.getElementById("dilatedTimePerSecond").textContent = "+" + shortenMoney(getDilTimeGainPerSecond()) + "/s"
        	document.getElementById("galaxyThreshold").textContent = shortenMoney(player.dilation.nextThreshold)
        	document.getElementById("dilatedGalaxies").textContent = getFullExpansion(Math.floor(player.dilation.freeGalaxies))
    	}
}


function getNewInfReq() {
	let reqs = [new Decimal("1e1100"), new Decimal("1e1900"), new Decimal("1e2400"), new Decimal("1e10500"), new Decimal("1e30000"), new Decimal("1e45000"), new Decimal("1e54000")]
	if (player.galacticSacrifice !== undefined) {
		if (player.tickspeedBoosts === undefined) {
			reqs[1] = new Decimal("1e1500")
			reqs[3] = new Decimal("1e9600")
		} else {
			reqs[0] = new Decimal("1e1800")
			reqs[1] = new Decimal("1e2400")
			reqs[2] = new Decimal("1e4000")
		}
	}
	for (var tier=0;tier<7;tier++) if (!player.infDimensionsUnlocked[tier]) return {money: reqs[tier], tier: tier+1}
	return {money: new Decimal("1e60000"), tier: 8}
}


function newDimension() {
	var req = getNewInfReq()
	if (player.money.lt(req.money)) return
	player.infDimensionsUnlocked[req.tier-1] = true
	if (req.tier == 4) giveAchievement("NEW DIMENSIONS???")
	if (req.tier == 8) giveAchievement("0 degrees from infinity")
}
var blink = true
var nextAt
var goals
var order

function setAndMaybeShow(elementName, condition, contents) {
	var elem = document.getElementById(elementName)
	if (condition) {
		elem.innerHTML = eval(contents)
		elem.style.display = ""
	} else {
		elem.innerHTML = ""
		elem.style.display = "none"
	}
}

function runAutoSave(){
	if (player.aarexModifications.autoSave) {
		autoSaveSeconds++
		if (autoSaveSeconds >= getAutoSaveInterval()) {
			save_game()
			autoSaveSeconds=0
		}
	}
}

function cantHoldInfinitiesCheck(){
	if (getDimensionFinalMultiplier(1).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(2).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(3).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(4).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(5).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(6).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(7).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(8).gte(new Decimal("1e308"))) giveAchievement("Can't hold all these infinities")
}

function antitablesHaveTurnedCheck(){
	if (getDimensionFinalMultiplier(1).lt(getDimensionFinalMultiplier(2)) &&
        getDimensionFinalMultiplier(2).lt(getDimensionFinalMultiplier(3)) &&
        getDimensionFinalMultiplier(3).lt(getDimensionFinalMultiplier(4)) &&
        getDimensionFinalMultiplier(4).lt(getDimensionFinalMultiplier(5)) &&
        getDimensionFinalMultiplier(5).lt(getDimensionFinalMultiplier(6)) &&
        getDimensionFinalMultiplier(6).lt(getDimensionFinalMultiplier(7)) &&
        getDimensionFinalMultiplier(7).lt(getDimensionFinalMultiplier(8))) giveAchievement("How the antitables have turned")
}

function updateBlinkOfAnEye(){
	if (blink && !player.achievements.includes("r78")) {
        	document.getElementById("Blink of an eye").style.display = "none"
        	blink = false
    	}
    	else {
        	document.getElementById("Blink of an eye").style.display = "block"
        	blink = true
    	}
}

function infPoints2Display(){
	if (player.infinitied > 0 || player.infinityPoints.gt(0) || player.infinityUpgrades.length > 0 || getEternitied() > 0 || quantumed) document.getElementById("infinityPoints2").style.display = "inline-block"
    	else document.getElementById("infinityPoints2").style.display = "none"
}

function updateChallTabDisplay(){
	if (player.postChallUnlocked > 0 || Object.keys(player.eternityChalls).length > 0 || player.eternityChallUnlocked !== 0 || quantumed) document.getElementById("challTabButtons").style.display = "table"
}

function eterPoints2Display(){
    	document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity points."
}

function canQuickBigRip() {
	var x = false
	if (tmp.ngp3 && player.masterystudies.includes("d14") && inQC(0) && tmp.qu.electrons.amount >= 62500) {
		if (player.ghostify.milestones >= 2) x = true
		else for (var p = 1; p < 5; p++) {
			var pcData = tmp.qu.pairedChallenges.order[p]
			if (pcData) {
				var pc1 = Math.min(pcData[0], pcData[1])
				var pc2 = Math.max(pcData[0], pcData[1])
				if (pc1 == 6 && pc2 == 8) {
					if (p - 1 > tmp.qu.pairedChallenges.completed) return
					x = true
				}
			}
		}
	}
	return x
}

function eternityBtnDisplayType(){
    	document.getElementById("eternitybtn").style.display = (player.infinityPoints.gte(player.eternityChallGoal) && (player.infDimensionsUnlocked[7] || getEternitied() > 24) && (!player.dilation.active || !inQCModifier("ad"))) ? "inline-block" : "none"
}

function ABTypeDisplay(){
	if (getEternitied() > 4) document.getElementById("togglecrunchmode").style.display = "inline-block"
    	else document.getElementById("togglecrunchmode").style.display = "none"
    	if (getEternitied() > 8 || player.autobuyers[10].bulkBought) document.getElementById("galaxybulk").style.display = "inline-block"
    	else document.getElementById("galaxybulk").style.display = "none"
    	if (getEternitied() > 99 && player.meta) document.getElementById("toggleautoetermode").style.display = "inline-block"
    	else document.getElementById("toggleautoetermode").style.display = "none"
    	if (getEternitied() > 99 && player.achievements.includes("ng3p52")) document.getElementById('aftereternity').style.display = "inline-block"
    	else document.getElementById('aftereternity').style.display = "none"
    	if (getEternitied() > 99 && player.achievements.includes("ng3p52")) document.getElementById('autoEternityTabbtn').style.display = ""
    	else document.getElementById('autoEternityTabbtn').style.display = "none"
}

function bendTimeCheck(){
    	if (tmp.tsReduce < 0.001) giveAchievement("Do you even bend time bro?")
}

function dimboostABTypeDisplay(){
	if (getEternitied() > 9 || player.autobuyers[9].bulkBought) document.getElementById("bulklabel").textContent = "Buy max dimboosts every X seconds:"
    	else document.getElementById("bulklabel").textContent = "Bulk DimBoost Amount:"
}

function IDABDisplayCorrection(){
	if (getEternitied() > 10) {
        	for (var i=1;i<getEternitied()-9 && i < 9; i++) {
			document.getElementById("infauto"+i).style.visibility = "visible"
		}
		document.getElementById("toggleallinfdims").style.visibility = "visible"
	} else {
		for (var i=1; i<9; i++) {
			document.getElementById("infauto"+i).style.visibility = "hidden"
		}
		document.getElementById("toggleallinfdims").style.visibility = "hidden"
	}
}

function replicantiShopABDisplay(){
	if (getEternitied() >= 40) document.getElementById("replauto1").style.visibility = "visible"
    	else document.getElementById("replauto1").style.visibility = "hidden"
    	if (getEternitied() >= 60) document.getElementById("replauto2").style.visibility = "visible"
    	else document.getElementById("replauto2").style.visibility = "hidden"
    	if (getEternitied() >= 80) document.getElementById("replauto3").style.visibility = "visible"
    	else document.getElementById("replauto3").style.visibility = "hidden"
}

function primaryStatsDisplayResetLayers(){
	if (getEternitied() == 0 && !quantumed) document.getElementById("pasteternities").style.display = "none"
    	else document.getElementById("pasteternities").style.display = "inline-block"
    	if (quantumed) document.getElementById("pastquantums").style.display = "inline-block"
    	else document.getElementById("pastquantums").style.display = "none"
    	if (ghostified) document.getElementById("pastghostifies").style.display = "inline-block"
    	else document.getElementById("pastghostifies").style.display = "none"
    	document.getElementById("pastinfs").style.display = player.infinitied > 0 || getEternitied() > 0 || quantumed ? "" : "none"
    	var showStats = player.challenges.length > 1 || player.infinitied > 0 || getEternitied() > 0 || quantumed ? "" : "none"
    	document.getElementById("brfilter").style.display = showStats
    	document.getElementById("statstabs").style.display = showStats
    	var display=player.aarexModifications.hideSecretAchs?"none":""
    	document.getElementById("achTabButtons").style.display=display
	document.getElementById("secretachsbtn").style.display=display
}

function runIDBuyersTick(){
	if (getEternitied() > 10 && player.currentEternityChall !== "eterc8") {
        	for (var i=1;i<getEternitied()-9 && i < 9; i++) {
            		if (player.infDimBuyers[i-1]) {
                		buyMaxInfDims(i)
                		buyManyInfinityDimension(i)
			}
		}
	}
}

function crunchAnimationBtn(){
	if (player.infinitied !== 0 || getEternitied() !== 0 || quantumed) document.getElementById("bigCrunchAnimBtn").style.display = "inline-block"
	else document.getElementById("bigCrunchAnimBtn").style.display = "none"
}

function TPAnimationBtn(){
    	if (!player.dilation.tachyonParticles.eq(0) || quantumed) document.getElementById("tachyonParticleAnimBtn").style.display = "inline-block"
    	else document.getElementById("tachyonParticleAnimBtn").style.display = "none"
}

function replicantiShopABRun(){
	if (getEternitied() >= 40 && player.replicanti.auto[0] && player.currentEternityChall !== "eterc8" && isChanceAffordable()) {
        	var maxCost = (tmp.ngp3 ? player.masterystudies.includes("t265") : false) ? 1/0 : new Decimal("1e1620")
        	var bought = Math.max(Math.floor(player.infinityPoints.min(maxCost).div(player.replicanti.chanceCost).log(1e15) + 1), 0)
        	player.replicanti.chance = Math.round(player.replicanti.chance*100+bought)/100
        	player.replicanti.chanceCost = player.replicanti.chanceCost.times(Decimal.pow(1e15, bought))
	}

	if (getEternitied() >= 60 && player.replicanti.auto[1] && player.currentEternityChall !== "eterc8") {
		while (player.infinityPoints.gte(player.replicanti.intervalCost) && player.currentEternityChall !== "eterc8" && isIntervalAffordable()) upgradeReplicantiInterval()
	}

    	if (getEternitied() >= 80 && player.replicanti.auto[2] && player.currentEternityChall !== "eterc8") autoBuyRG()
}

function ECCompletionsDisplay(){
	document.getElementById("eterc1completed").textContent = "Completed "+ECTimesCompleted("eterc1")+" times."
    	document.getElementById("eterc2completed").textContent = "Completed "+ECTimesCompleted("eterc2")+" times."
    	document.getElementById("eterc3completed").textContent = "Completed "+ECTimesCompleted("eterc3")+" times."
    	document.getElementById("eterc4completed").textContent = "Completed "+ECTimesCompleted("eterc4")+" times."
    	document.getElementById("eterc5completed").textContent = "Completed "+ECTimesCompleted("eterc5")+" times."
    	document.getElementById("eterc6completed").textContent = "Completed "+ECTimesCompleted("eterc6")+" times."
    	document.getElementById("eterc7completed").textContent = "Completed "+ECTimesCompleted("eterc7")+" times."
    	document.getElementById("eterc8completed").textContent = "Completed "+ECTimesCompleted("eterc8")+" times."
    	document.getElementById("eterc9completed").textContent = "Completed "+ECTimesCompleted("eterc9")+" times."
    	document.getElementById("eterc10completed").textContent = "Completed "+ECTimesCompleted("eterc10")+" times."
    	document.getElementById("eterc11completed").textContent = "Completed "+ECTimesCompleted("eterc11")+" times."
    	document.getElementById("eterc12completed").textContent = "Completed "+ECTimesCompleted("eterc12")+" times."
    	document.getElementById("eterc13completed").textContent = "Completed "+ECTimesCompleted("eterc13")+" times."
    	document.getElementById("eterc14completed").textContent = "Completed "+ECTimesCompleted("eterc14")+" times."
}

function ECchallengePortionDisplay(){
	let ec12TimeLimit = Math.round(getEC12TimeLimit() * 10) / 100
    	for (var c=1;c<15;c++) document.getElementById("eterc"+c+"goal").textContent = "Goal: "+shortenCosts(getECGoal("eterc"+c))+" IP"+(c==12?" in "+ec12TimeLimit+" second"+(ec12TimeLimit==1?"":"s")+" or less.":c==4?" in "+Math.max((16-(ECTimesCompleted("eterc4")*4)),0)+" infinities or less.":"")
}

function EC8PurchasesDisplay(){
	if (player.currentEternityChall == "eterc8") {
        	document.getElementById("eterc8repl").style.display = "block"
        	document.getElementById("eterc8ids").style.display = "block"
        	document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
        	document.getElementById("eterc8ids").textContent = "You have "+player.eterc8ids+" purchases left."
	} else {
        	document.getElementById("eterc8repl").style.display = "none"
        	document.getElementById("eterc8ids").style.display = "none"
	}
}

function failedEC12Check(){
	if (player.currentEternityChall == "eterc12" && player.thisEternity >= getEC12TimeLimit()) {
		setTimeout(exitChallenge, 500)
		onChallengeFail()
	}
}

function bankedInfinityDisplay(){
	document.getElementById("infinitiedBank").style.display = (player.infinitiedBank > 0) ? "block" : "none"
    	document.getElementById("infinitiedBank").textContent = "You have " + getFullExpansion(player.infinitiedBank) + " banked infinities."
	var bankedInfGain=gainBankedInf()
    	document.getElementById("bankedInfGain").style.display = bankedInfGain>0 ? "block" : "none"
    	document.getElementById("bankedInfGain").textContent = "You will gain " + getFullExpansion(bankedInfGain) + " banked infinities on next Eternity."
	if (player.achievements.includes("ng3p73")) updateBankedEter(true)
}

function checkEPReqAchieve(){
	if (player.eternityPoints.gte(Number.MAX_VALUE)) giveAchievement("But I wanted another prestige layer...")
	if (player.eternityPoints.gte("1e40000")) giveAchievement("In the grim darkness of the far endgame")
	if (player.eternityPoints.gte("9e99999999")) giveAchievement("This achievement doesn't exist 3")
}

function checkIPReqAchieve(){
	var checkEmpty = player.timestudy.studies.length < 1
	if (tmp.ngp3) for (id=0;id<player.masterystudies.length;id++) {
		if (player.masterystudies[id].split("t")[1]) checkEmpty = false
    	}
	var ableToGetRid2 = checkEmpty && player.dilation.active 
	
	if (player.infinityPoints.gte(new Decimal("1e22000")) && checkEmpty) giveAchievement("What do I have to do to get rid of you")
	if (player.infinityPoints.gte(1e100) && player.firstAmount.equals(0) && player.infinitied == 0 && player.resets <= 4 && player.galaxies <= 1 && player.replicanti.galaxies == 0) giveAchievement("Like feasting on a behind")
	if (player.infinityPoints.gte('9.99999e999')) giveAchievement("This achievement doesn't exist II");
	if (player.infinityPoints.gte('1e30008')) giveAchievement("Can you get infinite IP?");
	if (player.infinityDimension1.baseAmount == 0 &&
		player.infinityDimension2.baseAmount == 0 &&
		player.infinityDimension3.baseAmount == 0 &&
		player.infinityDimension4.baseAmount == 0 &&
		player.infinityDimension5.baseAmount == 0 &&
		player.infinityDimension6.baseAmount == 0 &&
		player.infinityDimension7.baseAmount == 0 &&
		player.infinityDimension8.baseAmount == 0 &&
		player.infMultCost.equals(10) &&
		player.infinityPoints.gt(new Decimal("1e140000"))) {
		giveAchievement("I never liked this infinity stuff anyway")
	}
	if (ableToGetRid2 && player.infinityPoints.log10() >= 20000) giveAchievement("This is what I have to do to get rid of you.")
}

function checkReplicantiBasedReqAchieve(){
	if (player.replicanti.amount.gte(Number.MAX_VALUE) && player.thisInfinityTime < 600*30) giveAchievement("Is this safe?");
	if (player.replicanti.galaxies >= 10 && player.thisInfinityTime < 150) giveAchievement("The swarm");
	if (player.replicanti.galaxies >= 180*player.galaxies && player.galaxies > 0) giveAchievement("Popular music")
	if (player.replicanti.amount.gt(new Decimal(tmp.ngex?"1e15000":"1e20000"))) giveAchievement("When will it be enough?")
	if (player.boughtDims && player.replicanti.amount.gt("1e1000000")) giveAchievement("Do you really need a guide for this?");
	if (player.replicanti.amount.gt(new Decimal("1e100000"))) giveAchievement("It will never be enough")
}

function checkResetCountReqAchieve(){
	if (getEternitied() >= 1e12) giveAchievement("The cap is a million, not a trillion")
	if (player.infinitied > 2e6) giveAchievement("2 Million Infinities")
}

function checkMatterAMNDReqAchieve(){
	if (player.money.gte("9.9999e9999")) giveAchievement("This achievement doesn't exist")
	if (player.money.gte("1e35000")) giveAchievement("I got a few to spare")
	if (player.money >= 1e80) giveAchievement("Antimatter Apocalypse")
	if (player.seventhAmount > 1e12) giveAchievement("Multidimensional");
	if ((player.matter.gte(2.586e15) && player.currentChallenge == "postc6") || player.matter.gte(Number.MAX_VALUE)) giveAchievement("It's not called matter dimensions is it?")
	if (dilates(player.firstPow, 2) >= 10e30) giveAchievement("I forgot to nerf that")
}

function checkInfPowerReqAchieve(){
	if (player.infinityPower.gt(1)) giveAchievement("A new beginning.");
	if (player.infinityPower.gt(1e6)) giveAchievement("1 million is a lot"); 
	if (player.infinityPower.gt(1e260)) giveAchievement("Minute of infinity"); 
}

function checkTickspeedReqAchieve(){
	if (player.tickspeed.lt(1e-26)) giveAchievement("Faster than a potato");
	if (player.tickspeed.lt(1e-55)) giveAchievement("Faster than a squared potato");
	if (player.tickspeed.e < -8296262) giveAchievement("Faster than a potato^286078")
	if (player.totalTickGained >= 308) giveAchievement("Infinite time");
	if (player.totalTickGained>=1e6) giveAchievement("GAS GAS GAS")
}

function checkOtherPreNGp3Achieve(){
	var ableToGetRid2 = player.timestudy.studies.length < 1 && player.dilation.active 
	if (tmp.ngp3) for (id=0;id<player.masterystudies.length;id++) {
		if (player.masterystudies[id].split("t")[1]) ableToGetRid2 = false
    	}
	if (player.why >= 1e6) giveAchievement("Should we tell them about buy max...")
	if (player.exdilation!==undefined) {
		let ableToGetRid3 = ableToGetRid2 && player.dilation.upgrades.length === 0 && player.dilation.rebuyables[1] === 0 && player.dilation.rebuyables[2] === 0 && player.dilation.rebuyables[3] === 0
		if (player.blackhole.power.gt(0)) giveAchievement("A newer beginning.")
		if (player.blackhole.power.gt(1e6)) giveAchievement("1 million is still a lot")
		if (player.exdilation.unspent.gt(1e5)) giveAchievement("Finally I'm out of that channel");
		if (ableToGetRid2 && player.infinityPoints.e >= 20000) giveAchievement("I already got rid of you.")
	}
	checkUniversalHarmony()
	if (infchallengeTimes < 7.5) giveAchievement("Never again")
	if (player.totalTimePlayed >= 10 * 60 * 60 * 24 * 8) giveAchievement("One for each dimension")
	if (Math.random() < 0.00001) giveAchievement("Do you feel lucky? Well do ya punk?")
}

function ngP3AchieveCheck(){
	let checkEmpty = player.timestudy.studies.length < 1
	if (tmp.ngp3) for (id=0;id<player.masterystudies.length;id++) {
		if (player.masterystudies[id].split("t")[1]) checkEmpty = false
    	}
	let ableToGetRid2 = checkEmpty && player.dilation.active
	let ableToGetRid3 = ableToGetRid2 && tmp.qu.electrons.amount == 0	
	let ableToGetRid4 = ableToGetRid2 && inQC(2)
	let ableToGetRid5 = ableToGetRid4 && player.dontWant
	let ableToGetRid6 = ableToGetRid2 && inQC(6) && inQC(8)
	let noTree = false
	let minUQ = getMinimumUnstableQuarks()
	for (var u=1;u<9;u++) {
		if (tmp.qu.tod.upgrades[u]) break
		else noTree = true
	}
	if (player.meta.antimatter.gte(Number.MAX_VALUE)) giveAchievement("I don't have enough fuel!")
	if (player.galaxies>899&&!player.dilation.studies.includes(1)) giveAchievement("No more tax fraud!")
	if (player.money.gte(getOldAgeRequirement())) giveAchievement("Old age")
	if (player.infinityPoints.e>=4e5&&ableToGetRid3) giveAchievement("I already got rid of you...")
	if (player.meta.resets == 8) if (player.meta.antimatter.e>1499) giveAchievement("We are not going squared.")
	if (player.eightBought>=4e6&&getTotalRG()+player.dilation.freeGalaxies<1) giveAchievement("Intergalactic")
	if (player.old&&player.meta.antimatter.e>1699) giveAchievement("Old memories come true")
	if (player.infinityPoints.e>=354e3&&ableToGetRid4) giveAchievement("Seriously, I already got rid of you.")
	if (player.meta.antimatter.e>332&&player.meta[2].amount.eq(0)&&player.meta.resets<1) giveAchievement("ERROR 500: INTERNAL DIMENSION ERROR")
	if (player.money.e>=788e11&&tmp.qu.pairedChallenges.completed<1) giveAchievement("The truth of anti-challenged")
	if (player.money.e>=62e10&&player.currentEternityChall=="eterc11") giveAchievement("I can’t get my multipliers higher!")
	if (player.replicanti.amount.e>=2e6&&player.dilation.tachyonParticles.eq(0)) giveAchievement("No dilation means no production.")
	if (player.infinityPoints.gte(Decimal.pow(Number.MAX_VALUE, 1000))&&ableToGetRid5) giveAchievement("I don't want you to live anymore.")
	if (player.dilation.dilatedTime.e>410&&tmp.qu.notrelative) giveAchievement("Time is not relative")
	if (!player.achievements.includes("ng3p42")) {
		for (d=2;d<9;d++) {
			if (player[TIER_NAMES[d]+"Amount"].gt(0) || player["infinityDimension"+d].amount.gt(0) || player["timeDimension"+d].amount.gt(0) || player.meta[d].amount.gt(0)) break
			else if (player.money.e>16e11&&d>7) giveAchievement("ERROR 404: DIMENSIONS NOT FOUND")
		}
	}
	if (player.money.e>=8e6&&inQC(6)&&inQC(8)) giveAchievement("Impossible expectations")
	if (player.timestudy.theorem>11e6&&tmp.qu.wasted) giveAchievement("Studies are wasted")
	if (tmp.qu.replicants.requirement.gte("1e12500000")) giveAchievement("Stop blocking me!")
	if (player.infinityPoints.gte(Decimal.pow(10, 275e3))&&ableToGetRid6) giveAchievement("Are you currently dying?")
	if (tmp.qu.nanofield.rewards>20&&noTree) giveAchievement("But I don't want to grind!")
	if (player.replicanti.amount.e >= (player.aarexModifications.ngudpV ? 268435456 : 36e6)) giveAchievement("Will it be enough?")
	if (tmp.qu.bigRip.active) {
		let ableToGetRid7 = ableToGetRid2 && player.epmult.eq(1)
		let ableToGetRid8 = ableToGetRid7 && !tmp.qu.breakEternity.did
		let ableToGetRid9 = ableToGetRid8 && noTree
		let ableToGetRid10 = ableToGetRid9 && inQCModifier("ad")
		if (player.currentEternityChall == "eterc7" && player.galaxies == 1 && player.money.e >= 8e7) giveAchievement("Time Immunity")
		if (!player.timestudy.studies.includes(11) && player.timeShards.e > 214) giveAchievement("You're not really smart.")
		if (ableToGetRid7 && player.infinityPoints.e >= 35e4) giveAchievement("And so your life?")
		if (tmp.qu.breakEternity.eternalMatter.gte(9.999999e99)) giveAchievement("This achievement doesn't exist 4")
		if (ableToGetRid8 && player.infinityPoints.e >= 95e4) giveAchievement("Please answer me why you are dying.")
		if (ableToGetRid9 && player.infinityPoints.e >= 18e5) giveAchievement("Aren't you already dead?")
		if (ableToGetRid10 && player.infinityPoints.e >= 22.5e3) giveAchievement("I give up.")
	}
	if (tmp.qu.bigRip.spaceShards.e>32&&!tmp.qu.breakEternity.did) giveAchievement("Finite Time")
	if (minUQ.quarks.e>=1e12&&minUQ.decays>=2&&!tmp.qu.bigRip.times) giveAchievement("Weak Decay")		
	if (nG(getInfinitied(), Number.MAX_VALUE)) giveAchievement("Meta-Infinity confirmed?")
	if (nG(getEternitied(), Number.MAX_VALUE)) giveAchievement("Everlasting Eternities")
	if (player.options.secrets && player.options.secrets.ghostlyNews && !player.options.newsHidden) giveAchievement("Two tickers")
}

function updateNGpp17Reward(){
	document.getElementById('epmultauto').style.display=player.achievements.includes("ngpp17")?"":"none"
	for (i=1;i<9;i++) document.getElementById("td"+i+'auto').style.visibility=player.achievements.includes("ngpp17")?"visible":"hidden"
	document.getElementById('togglealltimedims').style.visibility=player.achievements.includes("ngpp17")?"visible":"hidden"
}

function updateNGpp16Reward(){
	document.getElementById('replicantibulkmodetoggle').style.display=player.achievements.includes("ngpp16")?"inline-block":"none"
}

function notifyQuantumMilestones(){
	if (speedrunMilestonesReached>notifyId) {
		$.notify("You have unlocked "+timeDisplayShort(speedrunMilestones[notifyId]*36e3)+" speedrun milestone! "+(["You now start with 20,000 eternities when going quantum","You unlocked time theorem autobuyer","You now start with all Eternity Challenges completed and\neternity upgrades bought","You now start with dilation unlocked","You unlocked a new option for eternity autobuyer","You now start with all dilation studies and\nnon-rebuyable dilation upgrades before Meta Dimensions unlocked except passive TT gen upgrade","You unlocked first meta dimension autobuyer","You unlocked second meta dimension autobuyer","You unlocked third meta dimension autobuyer","You unlocked fourth meta dimension autobuyer","You unlocked fifth meta dimension autobuyer and you now keep time studies and passive TT gen upgrade","You unlocked sixth meta dimension autobuyer","You unlocked seventh meta dimension autobuyer","You unlocked eighth meta dimension autobuyer and\nall non-rebuyable dilation upgrades","You unlocked meta-dimension boost autobuyer","You now keep all time studies in mastery studies","You can now buy Meta Dimensions without buying the previous dimension","You now start with "+shortenCosts(1e13)+" eternities","You now start with "+shortenCosts(1e25)+" meta-antimatter on reset","You can now turn on automatic replicated galaxies anytime","You made rebuyable dilation upgrade and Meta Dimension autobuyers 3x faster","You now start with "+shortenCosts(1e100)+" dilated time on quantum and dilated time does not reset until quantum","You unlocked quantum autobuyer","You now keep replicanti on eternity","You unlocked manual mode for eternity autobuyer and sacrifice galaxy autobuyer","Your rebuyable dilation upgrade autobuyer now can buy max all upgrades","You now can buy max meta-dimension boosts and start with 4 meta-dimension boosts","For now on, you can gain banked infinities based on your post-crunch infinitied stat"])[notifyId]+".","success")
		notifyId++
    	}
}

function notifyGhostifyMilestones(){
	if (player.ghostify.milestones>notifyId2) {
		$.notify("You became a ghost in at most "+getFullExpansion(tmp.bm[notifyId2])+" quantumed stat! "+(["You now start with all Speedrun Milestones and all "+shorten(Number.MAX_VALUE)+" QK features unlocked, all Paired Challenges completed, all Big Rip upgrades bought, Nanofield is 2x faster until you reach 16 rewards, and you get quarks based on your best MA this quantum", "For now on, colored quarks do not cancel, you keep your gluon upgrades, you can quick Big Rip, and completing an Eternity Challenge doesn't respec your time studies.", "You now keep your Electron upgrades", "For now on, Quantuming doesn't reset your Tachyon particles unless you are in a QC, unstabilizing quarks doesn't lose your colored quarks, and you start with 5 of 1st upgrades of each Branch", "For now on, Quantuming doesn't reset your Meta-Dimension Boosts unless you are in a QC or you are going to undo Big Rip", "For now on, Quantuming doesn't reset your normal replicants unless you are in a QC or you are going to undo Big Rip", "You now start with 10 worker replicants and Ghostifying now doesn't reset Neutrinos.", "You are now gaining ^0.5 amount of quarks, ^0.5 amount of gluons, and 1% of Space Shards you will gain per second.", "You now start with 10 of Second Emperor Dimensions"+(player.aarexModifications.ngudpV?" and for now on, start Big Rips with 3rd row of Eternity upgrades":""), "You now start with 10 of Fourth Emperor Dimensions", "You now start with 10 of Sixth Emperor Dimensions and the IP multiplier no longer costs IP", "You now start with 10 of Eighth Emperor Dimensions", "You now start with first 16 Nanofield rewards", "You now start with "+shortenCosts(1e25)+" quark spins and Branches are 10x faster", "You now start with Break Eternity unlocked and all Break Eternity upgrades bought", "For now on, you gain 1% of quarks you will gain per second and you keep your Tachyon particles on Quantum and Ghostify if you didn't Big Rip."])[notifyId2]+".","success")
		notifyId2++
	}
}

function dilationStuffABTick(){
	var canAutoUpgs = canAutoDilUpgs()
	document.getElementById('dilUpgsauto').style.display = canAutoUpgs ? "" : "none"
	document.getElementById('distribEx').style.display = player.achievements.includes("ngud14") && player.aarexModifications.nguspV !== undefined ? "" : "none"
	if (canAutoUpgs && player.autoEterOptions.dilUpgs) autoBuyDilUpgs()

	document.getElementById("dilationTabbtn").style.display = (player.dilation.studies.includes(1)) ? "table-cell" : "none"
	document.getElementById("blackHoleTabbtn").style.display = player.dilation.studies.includes(1) && player.exdilation != undefined ? "table-cell" : "none"
	updateDilationUpgradeButtons()
}

function doBosonsUnlockStuff(){
	player.ghostify.wzb.unl=true
	$.notify("Congratulations! You have unlocked Bosonic Lab!", "success")
	giveAchievement("Even Ghostlier than before")
	updateTemp()
	updateNeutrinoBoosts()
	updateBLUnlocks()
}

function doPhotonsUnlockStuff(){
	player.ghostify.ghostlyPhotons.unl=true
	$.notify("Congratulations! You have unlocked Ghostly Photons!", "success")
	giveAchievement("Progressing as a Ghost")
	updateTemp()
	updateQuantumChallenges()
	updateBreakEternity()
	updateGPHUnlocks()
}

function ALLACHIEVECHECK(){
	//PRE NG+3 ACHIEVEMENTS ONLY!!!
	checkIPReqAchieve() //IP Req
	checkEPReqAchieve() //EP Req
	checkReplicantiBasedReqAchieve() //Replicanti based Req
	checkResetCountReqAchieve() //Reset Count Req
	checkMatterAMNDReqAchieve() //AM/ND/Matter Req
	checkInfPowerReqAchieve() //IPo Req
	checkTickspeedReqAchieve() //Tickspeed/tick upgs based
	checkOtherPreNGp3Achieve() //Other
	
	if (tmp.ngp3) ngP3AchieveCheck()
}

function inEasierMode() {
	return player.aarexModifications.newGameMult || player.aarexModifications.newGameExpVersion || player.aarexModifications.ngudpV || player.aarexModifications.ngumuV || player.aarexModifications.nguepV || player.aarexModifications.aau
}

function doBreakEternityUnlockStuff(){
	tmp.qu.breakEternity.unlocked = true
	$.notify("Congratulations! You have unlocked Break Eternity!", "success")
        updateBreakEternity()
}

function doNGP4UnlockStuff(){
	$.notify("Congratulations! You unlocked NG+4!", "success")
	metaSave.ngp4=true
	checkForExpertMode()
	localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
}

function doGhostifyUnlockStuff(){
	player.ghostify.reached = true
	if (document.getElementById("welcome").style.display != "flex") document.getElementById("welcome").style.display = "flex"
	else player.aarexModifications.popUpId = ""
	document.getElementById("welcomeMessage").innerHTML = "You are almost there for a supreme completion! However, completing this turns you to a ghost instead. This allows you to pass big rip universes and unlock new stuff! However, you need to lose everything too. Therefore, this is the sixth layer of NG+3."
}

function doReachAMGoalStuff(chall){
	if (document.getElementById("welcome").style.display != "flex") document.getElementById("welcome").style.display = "flex"
	else player.aarexModifications.popUpId = ""
	document.getElementById("welcomeMessage").innerHTML="You reached the antimatter goal ("+shorten(Decimal.pow(10, getQCGoal()))+"), but you didn't reach the meta-antimatter goal yet! Get "+shorten(Decimal.pow(Number.MAX_VALUE, 1.45))+" meta-antimatter"+(tmp.qu.bigRip.active?" and then you can become a ghost!":" and then go quantum to complete your challenge!")
	tmp.qu.nonMAGoalReached.push(chall)
}

function doQuantumUnlockStuff(){
	tmp.qu.reached = true
        if (document.getElementById("welcome").style.display != "flex") document.getElementById("welcome").style.display = "flex"
	else player.aarexModifications.popUpId = ""
	document.getElementById("welcomeMessage").innerHTML = "Congratulations! You reached " + shorten(getQuantumReq()) + " MA and then completed EC14 for the first time! You unlocked the fifth layer called Quantum! It comes after Dimension Boost, Antimatter Galaxy, Big Crunch, and Eternity. This allows you to get gigantic numbers!"
}

function doNGP3UnlockStuff(){
	var chall=getCurrentQCData()
	if (chall.length<2) chall=chall[0]
	else if (chall[0]>chall[1]) chall=chall[1]*10+chall[0]
	else chall=chall[0]*10+chall[1]
	if (!tmp.qu.reached && isQuantumReached()) doQuantumUnlockStuff()
	if (chall && player.money.gt(Decimal.pow(10, getQCGoal())) && player.meta.bestAntimatter.lt(Decimal.pow(Number.MAX_VALUE, 1.45)) && !tmp.qu.nonMAGoalReached.includes(chall)) {
		doReachAMGoalStuff(chall)
	}
	if (!player.ghostify.reached && tmp.qu.bigRip.active) if (tmp.qu.bigRip.bestThisRun.gte(Decimal.pow(10, getQCGoal()))) {
		doGhostifyUnlockStuff()
	}
	var inEasierModeCheck = !inEasierMode()
	if (player.masterystudies && (player.masterystudies.includes("d14")||player.achievements.includes("ng3p51")) && !metaSave.ngp4 && !inEasierModeCheck) doNGP4UnlockStuff()
	if (player.eternityPoints.gte("1e1200") && tmp.qu.bigRip.active && !tmp.qu.breakEternity.unlocked) doBreakEternityUnlockStuff()
	if (player.money.gte(Decimal.pow(10,6e9))&&tmp.qu.bigRip.active&&!player.ghostify.ghostlyPhotons.unl) doPhotonsUnlockStuff()
	let max = getMaximumUnstableQuarks()
	if (max.quarks.log10() > 1e10 && max.decays >= 5 && !player.ghostify.wzb.unl) doBosonsUnlockStuff()
}

function updateResetTierButtons(){
	var postBreak = getEternitied()!=0||(player.infinityPoints.gte(Number.MAX_VALUE)&&player.infDimensionsUnlocked[7])||player.break
    	var preQuantumEnd = quantumed
    	var canBigRip = canQuickBigRip()
	
    	if (!preQuantumEnd && player.meta !== undefined) preQuantumEnd = isQuantumReached()
    	var haveBlock = (player.galacticSacrifice!=undefined&&postBreak)||(player.pSac!=undefined&&player.infinitied>0)||preQuantumEnd
    	var haveBlock2 = player.pSac!==undefined&&(ghostified||player.achievements.includes("ng3p51")||canBigRip)

    	if (player.pSac!==undefined) {
        	document.getElementById("px").className = haveBlock2?"PX":postBreak?"GHP":player.infinitied>0?"QK":"IP"
	}
    	document.getElementById("px").style.display=pSacrificed()?"":"none"
    	document.getElementById("pSacPos").className = haveBlock2?"pSacPos":postBreak?"ghostifyPos":player.infinitied>0?"quantumpos":"infpos"

    	if (player.galacticSacrifice===undefined?false:(postBreak||player.infinitied>0||player.galacticSacrifice.times>0)&&!isEmptiness) {
        	document.getElementById("galaxyPoints2").style.display=""
        	document.getElementById("galaxyPoints2").className = preQuantumEnd?"GP":postBreak?"QK":"EP"
	} else document.getElementById("galaxyPoints2").style.display="none"
    	document.getElementById("sacpos").className = preQuantumEnd?"sacpos":postBreak?"quantumpos":"eterpos"

    	document.getElementById("bigcrunch").parentElement.style.top = haveBlock2 ? "259px" : haveBlock ? "139px" : "19px"
    	document.getElementById("quantumBlock").style.display = haveBlock ? "" : "none"
    	document.getElementById("quantumBlock").style.height = haveBlock2 ? "240px" : "120px"

    	var showQuantumBtn = false
    	var bigRipped = false
    	if (player.meta !== undefined && isQuantumReached()) showQuantumBtn = true
    	if (tmp.ngp3 && tmp.qu.bigRip.active) bigRipped = true
    	document.getElementById("quantumbtn").className = bigRipped ? "bigripbtn" : "quantumbtn"
    	document.getElementById("quantumbtn").style.display = showQuantumBtn || bigRipped ? "" : "none"
    	document.getElementById("bigripbtn").style.display = canBigRip ? "" : "none"

    	document.getElementById("ghostparticles").style.display = ghostified ? "" : "none"
    	if (ghostified) {
        	document.getElementById("GHPAmount").textContent = shortenDimensions(player.ghostify.ghostParticles)
        	var showQuantumed = player.ghostify.times > 0 && player.ghostify.milestones < 16
        	document.getElementById("quantumedBM").style.display = showQuantumed ? "" : "none"
        	if (showQuantumed) document.getElementById("quantumedBMAmount").textContent = getFullExpansion(tmp.qu.times)
    	}
	document.getElementById("ghostifybtn").style.display = showQuantumBtn && bigRipped ? "" : "none"
}

function updateOrderGoals(){
	if (order) for (var i=0; i<order.length; i++) document.getElementById(order[i]+"goal").textContent = "Goal: "+shortenCosts(getGoal(order[i]))
}

function updateReplicantiGalaxyToggels(){
	if (player.replicanti.galaxybuyer === undefined || player.boughtDims) document.getElementById("replicantiresettoggle").style.display = "none"
    	else document.getElementById("replicantiresettoggle").style.display = "inline-block"
}

function givePerSecondNeuts(){
	if (!player.achievements.includes("ng3p75")) return
	var mult = 1 //in case you want to buff in the future
	var n = getNeutrinoGain().times(mult)
	player.ghostify.neutrinos.electron = player.ghostify.neutrinos.electron.plus(n)
	player.ghostify.neutrinos.mu       = player.ghostify.neutrinos.mu.plus(n)
	player.ghostify.neutrinos.tau      = player.ghostify.neutrinos.tau.plus(n)
}


function doPerSecondNGP3Stuff(){
	if (!tmp.ngp3) return
	
	if (tmp.qu.autoECN!==undefined) {
		justImported=true
            	if (tmp.qu.autoECN>12) buyMasteryStudy("ec",tmp.qu.autoECN,true)
            	else document.getElementById("ec"+tmp.qu.autoECN+"unl").onclick()
		justImported=false
	}
	if (isAutoGhostActive(14)) maxBuyBEEPMult()
        if (isAutoGhostActive(4)&&player.ghostify.automatorGhosts[4].mode=="t") rotateAutoUnstable()
        if (isAutoGhostActive(10)) maxBuyLimit()
        if (isAutoGhostActive(9)&&tmp.qu.replicants.quantumFood>0) for (d=1;d<9;d++) if (canFeedReplicant(d)&&(d==tmp.qu.replicants.limitDim||(!tmp.eds[d+1].perm&&tmp.eds[d].workers.lt(11)))) {
		feedReplicant(d, true)
		break
	}
	if (isAutoGhostActive(8)) buyMaxQuantumFood()
	if (isAutoGhostActive(7)) maxQuarkMult()
	doNGP3UnlockStuff()
	notifyGhostifyMilestones()
	if (tmp.qu.autoOptions.assignQK && player.ghostify.milestones > 7) assignAll() 
	givePerSecondNeuts()
}

let autoSaveSeconds=0
setInterval(function() {
	updateTemp()
	runAutoSave()

	//Achieve:
	cantHoldInfinitiesCheck()
	antitablesHaveTurnedCheck()
	updateBlinkOfAnEye()
	ALLACHIEVECHECK()
	bendTimeCheck()

	// AB Stuff
	updateReplicantiGalaxyToggels()
	ABTypeDisplay()
	dimboostABTypeDisplay()
	IDABDisplayCorrection()
	replicantiShopABDisplay()
	replicantiShopABRun()
	runIDBuyersTick()
	doAutoEterTick()
	dilationStuffABTick()
	updateNGpp17Reward()
	updateNGpp16Reward()

	// Button Displays
	infPoints2Display()
	eterPoints2Display()
	updateResetTierButtons()
	eternityBtnDisplayType()
	updateQuarkDisplay()
	primaryStatsDisplayResetLayers()
	crunchAnimationBtn()
	TPAnimationBtn()

	// EC Stuff
	ECCompletionsDisplay()
	ECchallengePortionDisplay()
	updateECUnlockButtons()
	EC8PurchasesDisplay()
 	failedEC12Check()

	// Other 
	updateChallTabDisplay()
	updateOrderGoals()
	bankedInfinityDisplay()
	doPerSecondNGP3Stuff()
	notifyQuantumMilestones()
	updateColorCharge()
	updateQuantumWorth()
}, 1000)

var postC2Count = 0;
var IPminpeak = new Decimal(0)
var EPminpeakType = 'normal'
var EPminpeak = new Decimal(0)
var replicantiTicks = 0
var isSmartPeakActivated = false

function updateEPminpeak(diff, type) {
	if (type == "EP") {
		var gainedPoints = gainedEternityPoints()
		var oldPoints = player.eternityPoints
	} else if (type == "TP") {
		var gainedPoints = getDilGain().sub(player.dilation.totalTachyonParticles).max(0)
		var oldPoints = player.dilation.totalTachyonParticles
	} else {
		var gainedPoints = getEMGain()
		var oldPoints = tmp.qu.breakEternity.eternalMatter
	}
	var newPoints = oldPoints.plus(gainedPoints)
	var newLog = Math.max(newPoints.log10(),0)
	var minutes = player.thisEternity / 600
	if (newLog > 1000 && EPminpeakType == 'normal' && isSmartPeakActivated) {
		EPminpeakType = 'logarithm'
		EPminpeak = new Decimal(0)
	}
	// for logarithm, we measure the amount of exponents gained from current
	var currentEPmin = (EPminpeakType == 'logarithm' ? new Decimal(Math.max(0, newLog - Math.max(oldPoints.log10(), 0))) : gainedPoints).dividedBy(minutes)
    	if (currentEPmin.gt(EPminpeak) && player.infinityPoints.gte(Number.MAX_VALUE)) {
        	EPminpeak = currentEPmin
        	if (tmp.ngp3) player.peakSpent = 0
    	} else if (tmp.ngp3 && currentEPmin.gt(0)) {    	
        	player.peakSpent = diff + (player.peakSpent ? player.peakSpent : 0)
    	}
	return currentEPmin;
}

function checkMatter(diff){
	var haveET=haveExtraTime()
    	var pxGain
	if (haveET) {
		//Matter
		if (player.matter.lt(player.money)) {
            		player.matter=player.matter.times(Decimal.pow(tmp.mv, diff))
            		if (player.matter.gte(player.money)) player.pSac.dims.extraTime+=player.matter.div(player.money).log(tmp.mv)/10
			player.matter=player.matter.min(player.money)
		} else player.pSac.dims.extraTime+=diff/10
		if (player.pSac.dims.extraTime>getExtraTime()) {
			pxGain=getPxGain()
            		player.matter=new Decimal(1/0)
            		haveET=false
		}
	} else {
        	var newMatter=player.matter.times(Decimal.pow(tmp.mv,diff))
        	if (player.pSac!=undefined&&!haveET&&newMatter.gt(player.money)) pxGain=getPxGain()
        	player.matter=newMatter
	}
	if (player.matter.pow(20).gt(player.money) && (player.currentChallenge == "postc7" || (inQC(6) && !player.achievements.includes("ng3p34")))) {
		if (tmp.ngp3 ? tmp.qu.bigRip.active && tmp.ri : false) {}
		else if (inQC(6)) {
			quantum(false, true, 0)
            		onChallengeFail()
		} else quickReset()
	} else if (player.matter.gt(player.money) && (inNC(12) || player.currentChallenge == "postc1" || player.pSac !== undefined) && !haveET) {
		if (player.pSac!=undefined) player.pSac.lostResets++
		if (player.pSac!=undefined && !player.resets) pSacReset(true, undefined, pxGain)
		else quickReset()
	}
}

function passiveIPupdating(diff){
	if (player.infinityUpgrades.includes("passiveGen")) player.partInfinityPoint += diff / player.bestInfinityTime;
	if (player.partInfinityPoint >= 100) {
        	player.infinityPoints = player.infinityPoints.plus(player.infMult.times(kongIPMult * (player.partInfinityPoint/10)));
        	player.partInfinityPoint = 0;
	}

    	if (player.partInfinityPoint >= 10) {
        	player.partInfinityPoint -= 10;
        	player.infinityPoints = player.infinityPoints.plus(getIPMult());
	}
}

function passiveInfinitiesUpdating(diff){
	if (typeof(player.infinitied) == "number") {
		if (player.infinityUpgrades.includes("infinitiedGeneration") && player.currentEternityChall !== "eterc4") player.partInfinitied += diff / player.bestInfinityTime;
		if (player.partInfinitied >= 50) {
			player.infinitied += Math.floor(player.partInfinitied/5)
			player.partInfinitied = 0;
		}

        	if (player.partInfinitied >= 5) {
            		player.partInfinitied -= 5;
			player.infinitied ++;
		}
	}
}

function infinityRespeccedDMUpdating(diff){
	var prod = getDarkMatterPerSecond()
        player.singularity.darkMatter = player.singularity.darkMatter.add(getDarkMatterPerSecond().times(diff/10))
	if (prod.gt(0)) tmp.tickUpdate = true
	if (player.singularity.darkMatter.gte(getNextDiscounts())) {
		player.dimtechs.discounts++
		for (d=1;d<9;d++) {
			var name = TIER_NAMES[d]
			player[name+"Cost"] = player[name+"Cost"].div(getDiscountMultiplier("dim" + d))
		}
		player.tickSpeedCost = player.tickSpeedCost.div(getDiscountMultiplier("tick"))
	}
}

function changingDecimalSystemUpdating(){
	document.getElementById("decimalMode").style.visibility = "hidden"
	if (break_infinity_js) {
		player.totalmoney = Decimal.pow(10, 9e15-1)
		player.money = player.totalmoney
		clearInterval(gameLoopIntervalId)
		alert("You reached the limit of break_infinity.js. You need to switch to logarithmica_numerus.js now.")
		player.aarexModifications.breakInfinity = !player.aarexModifications.breakInfinity
		save_game(true)
		document.location.reload(true)
		return
	}
}

function incrementTimesUpdating(diffStat){
	player.totalTimePlayed += diffStat
    	if (tmp.ngp3) player.ghostify.time += diffStat
    	if (player.meta) tmp.qu.time += diffStat
    	if (player.currentEternityChall == "eterc12") diffStat /= 1e3
	player.thisEternity += diffStat
   	player.thisInfinityTime += diffStat
    	if (player.galacticSacrifice) player.galacticSacrifice.time += diffStat
    	if (player.pSac !== undefined) player.pSac.time += diffStat
    	failsafeDilateTime = false
}

function requiredInfinityUpdating(diff){
	if (!tmp.ri) {
        	if (player.infinityUpgradesRespecced != undefined) infinityRespeccedDMUpdating(diff)
		
		for (let tier = (inQC(1) ? 1 : player.currentEternityChall == "eterc3" ? 3 : (inNC(4) || player.currentChallenge == "postc1") ? 5 : 7) - (inNC(7) || player.currentChallenge == "postcngm3_3" || inQC(4) || player.pSac !== undefined ? 1 : 0); tier >= 1; --tier) {
			var name = TIER_NAMES[tier];
			player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + (inNC(7) || player.currentChallenge == "postcngm3_3" || inQC(4) || player.pSac !== undefined ? 2 : 1)).times(diff / 100));
		}
		if (player.masterystudies != undefined) if (player.firstAmount.gt(0)) player.dontWant = false

        	var tempa = getDimensionProductionPerSecond(1).times(diff/10)
        	player.money = player.money.plus(tempa)
        	player.totalmoney = player.totalmoney.plus(tempa)
        	if (isInfiniteDetected()) return
        	if (tmp.ngp3 && tmp.qu.bigRip.active) {
            		tmp.qu.bigRip.totalAntimatter = tmp.qu.bigRip.totalAntimatter.add(tempa)
            		tmp.qu.bigRip.bestThisRun = tmp.qu.bigRip.bestThisRun.max(player.money)
        	}
        	if (player.totalmoney.gt("1e9000000000000000")) changingDecimalSystemUpdating()
		tmp.ri=player.money.gte(getLimit()) && ((player.currentChallenge != "" && player.money.gte(player.challengeTarget)) || !onPostBreak())
	}
}

function chall2PowerUpdating(diff){
	var div = 1800 / puMults[11](hasPU(11, true, true))
    	player.chall2Pow = Math.min(player.chall2Pow + diff/div, 1);
    	if (player.currentChallenge == "postc2" || inQC(6)) {
        	postC2Count++;
        	if (postC2Count >= 8 || diff > 80) {
			sacrifice();
			postC2Count = 0;
		}
	}
}

function normalChallPowerUpdating(diff){
	if (player.currentChallenge == "postc8" || inQC(6)) player.postC8Mult = player.postC8Mult.times(Math.pow(0.000000046416, diff))

	if (inNC(3) || player.matter.gte(1)) player.chall3Pow = player.chall3Pow.times(Decimal.pow(1.00038, diff));
    	
	chall2PowerUpdating(diff)
}

function incrementParadoxUpdating(diff){
	if (player.pSac !== undefined) {
		//Paradox Power
		player.pSac.dims.power=player.pSac.dims.power.add(getPDProduction(1).times(diff/10))
		for (var t=1;t<7;t++) {
			if (!isDimUnlocked(t+2)) break
			player.pSac.dims[t].amount=player.pSac.dims[t].amount.add(getPDProduction(t+2).times(diff/10))
		}
	}
}

function dimensionButtonDisplayUpdating(){
	document.getElementById("pdtabbtn").style.display = pSacrificed() ? "" : "none"
    	document.getElementById("tdtabbtn").style.display = ((player.eternities > 0 || quantumed || player.aarexModifications.ngmX > 3) && (!inQC(8) || tmp.be)) ? "" : "none"
    	document.getElementById("mdtabbtn").style.display = player.dilation.studies.includes(6) ? "" : "none"
}

function ghostifyAutomationUpdating(){
	if (ghostified && isAutoGhostsSafe) {
        	var colorShorthands=["r","g","b"]
        	for (var c=1;c<4;c++) {
			var shorthand=colorShorthands[c-1]
            		if (isAutoGhostActive(c) && tmp.qu.usedQuarks[shorthand].gt(0) && tmp.qu.tod[shorthand].quarks.eq(0)) unstableQuarks(shorthand)
            		if (isAutoGhostActive(12) && getUnstableGain(shorthand).max(tmp.qu.tod[shorthand].quarks).gte(Decimal.pow(10, Math.pow(2, 50)))) {
				unstableQuarks(shorthand)
				radioactiveDecay(shorthand)
			}
			if (isAutoGhostActive(5)) maxBranchUpg(shorthand)
		}
		if (isAutoGhostActive(6)) maxTreeUpg()
		if (isAutoGhostActive(11)) {
			var ag=player.ghostify.automatorGhosts[11]
			var preonGenerate=tmp.qu.replicants.quarks.div(getGatherRate().total).gte(ag.pw)&&tmp.qu.replicants.quarks.div(getQuarkLossProduction()).gte(ag.lw)&&tmp.qu.nanofield.charge.div(ag.cw).lt(1)
			if (tmp.qu.nanofield.producingCharge!=preonGenerate) startProduceQuarkCharge()
		}
		if (isAutoGhostActive(13)) {
			if (tmp.qu.bigRip.active) {
				if (tmp.qu.time>=player.ghostify.automatorGhosts[13].u*10) quantumReset(true,true,0,false)
			} else if (tmp.qu.time>=player.ghostify.automatorGhosts[13].t*10) bigRip(true)
		}
		if (isAutoGhostActive(15)) if (tmp.qu.bigRip.active&&getGHPGain().gte(player.ghostify.automatorGhosts[15].a)) ghostify(true)
	}
	
}

function WZBosonsUpdating(diff){
	var data = tmp.bl
	var wattGained = Math.max(getBosonicWattGain(),data.watt)
	data.speed = Math.max(Math.min(wattGained+(data.watt-data.speed)*2,wattGained),data.speed)
	data.watt = wattGained
	if (data.speed > 0) {
		var limitDiff = Math.min(diff/10,data.speed*14400)
		bosonicTick((data.speed-limitDiff/28800)*limitDiff)
		data.speed = Math.max(data.speed-limitDiff/14400,0)
	}
}

function ghostlyPhotonsUpdating(diff){
	var data=player.ghostify.ghostlyPhotons
	var type=tmp.qu.bigRip.active?"amount":"darkMatter"
	data[type]=data[type].add(getGPHProduction().times(diff/10))
	data.ghostlyRays=data.ghostlyRays.add(getGHRProduction().times(diff/10)).min(getGHRCap())
	for (var c=0;c<8;c++) if (data.ghostlyRays.gte(getLightThreshold(c))) data.lights[c]+=Math.floor(data.ghostlyRays.div(getLightThreshold(c)).log(tmp.lti[c])+1)
	data.maxRed=Math.max(data.lights[0],data.maxRed)
}

function nanofieldProducingChargeUpdating(diff){
	var rate = getQuarkChargeProduction()
	var loss = getQuarkLossProduction()
	var toSub = loss.times(diff/10).min(tmp.qu.replicants.quarks)
	if (toSub.eq(0)) {
		tmp.qu.nanofield.producingCharge = false
		document.getElementById("produceQuarkCharge").innerHTML="Start production of preon charge.<br>(You will not get preons when you do this.)"
	} else {
		tmp.qu.replicants.quarks = tmp.qu.replicants.quarks.sub(toSub)
		tmp.qu.nanofield.charge = tmp.qu.nanofield.charge.add(toSub.div(loss).times(rate))
	}
}

function updateNextPreonEnergyThreshold(){
	if (tmp.qu.nanofield.energy.gte(tmp.qu.nanofield.powerThreshold) && tmp.qu.nanofield.power < 15) {
		var toAdd = Math.min(Math.floor(tmp.qu.nanofield.energy.div(tmp.qu.nanofield.powerThreshold).log(4) / tmp.ppti + 1), 15 - tmp.qu.nanofield.power)
		tmp.qu.nanofield.power += toAdd
		tmp.qu.nanofield.powerThreshold = tmp.qu.nanofield.powerThreshold.times(Decimal.pow(4, toAdd * tmp.ppti))
	}
	if (tmp.qu.nanofield.energy.gte(tmp.qu.nanofield.powerThreshold) && tmp.qu.nanofield.power > 14) {
		var b = tmp.qu.nanofield.power - 13.5
		var toAdd = Math.floor(Math.sqrt(b * b + 2 * tmp.qu.nanofield.energy.div(tmp.qu.nanofield.powerThreshold).log(4) / tmp.ppti) - b + 1)
		tmp.qu.nanofield.power += toAdd
		tmp.qu.nanofield.powerThreshold = tmp.qu.nanofield.powerThreshold.times(Decimal.pow(4, (0.5 * toAdd * toAdd + b * toAdd) * tmp.ppti))
		if (tmp.qu.nanofield.power > 124) tmp.qu.nanofield.powerThreshold = tmp.qu.nanofield.powerThreshold.times(Decimal.pow(4,tmp.qu.nanofield.power-124))
		if (tmp.qu.nanofield.power > 149) tmp.qu.nanofield.powerThreshold = tmp.qu.nanofield.powerThreshold.times( Decimal.pow(1.1, -100+Math.pow(tmp.qu.nanofield.power-140, 2) ) )
		//uhh this should be collapsed into a single function i.e. multiple rewards at once
	}
}

function nanofieldUpdating(diff){
	var AErate = getQuarkAntienergyProduction()
	var toAddAE = AErate.times(diff/10).min(getQuarkChargeProductionCap().sub(tmp.qu.nanofield.antienergy))
	if (tmp.qu.nanofield.producingCharge) nanofieldProducingChargeUpdating(diff)
	if (toAddAE.gt(0)) {
		tmp.qu.nanofield.antienergy = tmp.qu.nanofield.antienergy.add(toAddAE).min(getQuarkChargeProductionCap())
		tmp.qu.nanofield.energy = tmp.qu.nanofield.energy.add(toAddAE.div(AErate).times(getQuarkEnergyProduction()))
		updateNextPreonEnergyThreshold()
		tmp.qu.nanofield.rewards = Math.max(tmp.qu.nanofield.rewards, tmp.qu.nanofield.power)
		if (!tmp.qu.nanofield.apgWoke && tmp.qu.nanofield.rewards >= tmp.apgw) {
			tmp.qu.nanofield.apgWoke = tmp.apgw
			$.notify("You reached " + getFullExpansion(tmp.apgw) + " rewards... The Anti-Preontius has woken up and took over the Nanoverse! Be careful!")
			showTab("quantumtab")
			showQuantumTab("nanofield")
			showNFTab("antipreon")
		}
	}
}

function treeOfDecayUpdating(diff){
	var colorShorthands=["r","g","b"]
	for (var c=0;c<3;c++) {
		var shorthand=colorShorthands[c]
		var branch=tmp.qu.tod[shorthand]
		var decayRate=getDecayRate(shorthand)
		var decayPower=getRDPower(shorthand)
				
		var mult=Decimal.pow(2,decayPower)
		var power=Decimal.div(branch.quarks.gt(mult)?branch.quarks.div(mult).log(2)+1:branch.quarks.div(mult),decayRate)
		var decayed=power.min(diff/10)
		power=power.sub(decayed).times(decayRate)

		var sProd=getQuarkSpinProduction(shorthand)
		branch.quarks=power.gt(1)?Decimal.pow(2,power-1).times(mult):power.times(mult)	
		branch.spin=branch.spin.add(sProd.times(decayed))	
	}
}

function emperorDimUpdating(diff){
	for (dim=8;dim>1;dim--) {
		var promote = hasNU(2) ? 1/0 : getWorkerAmount(dim-2)
		if (canFeedReplicant(dim-1,true)) {
			if (dim>2) promote = tmp.eds[dim-2].workers.sub(10).round().min(promote)
			tmp.eds[dim-1].progress = tmp.eds[dim-1].progress.add(tmp.eds[dim].workers.times(getEmperorDimensionMultiplier(dim)).times(diff/200)).min(promote)
			var toAdd = tmp.eds[dim-1].progress.floor()
			if (toAdd.gt(0)) {
				if (!hasNU(2)) {
					if (dim>2 && toAdd.gt(getWorkerAmount(dim-2))) tmp.eds[dim-2].workers = new Decimal(0)
					else if (dim>2) tmp.eds[dim-2].workers = tmp.eds[dim-2].workers.sub(toAdd).round()
					else if (toAdd.gt(tmp.qu.replicants.amount)) tmp.qu.replicants.amount = new Decimal(0)
					else tmp.qu.replicants.amount = tmp.qu.replicants.amount.sub(toAdd).round()
				}
				if (toAdd.gt(tmp.eds[dim-1].progress)) tmp.eds[dim-1].progress = new Decimal(0)
				else tmp.eds[dim-1].progress = tmp.eds[dim-1].progress.sub(toAdd)
				tmp.eds[dim-1].workers = tmp.eds[dim-1].workers.add(toAdd).round()
			}
		}
		if (!canFeedReplicant(dim-1,true)) tmp.eds[dim-1].progress = new Decimal(0)
	}
}

function getSpinToReplicantiSpeed(){
	// log10(green spins) * log10(blue spins) *log10(red spins) 
	var r = player.quantum.tod.r.spin.plus(10).log10()
	var g = player.quantum.tod.g.spin.plus(10).log10()
	var b = player.quantum.tod.b.spin.plus(10).log10()
	return r*g*b
}

function replicantEggonUpdating(diff){
	var newBabies = tmp.twr.times(getEmperorDimensionMultiplier(1)).times(getSpinToReplicantiSpeed()).times(diff/200)
	if (player.achievements.includes("ng3p35")) newBabies = newBabies.times(10)
	tmp.qu.replicants.eggonProgress = tmp.qu.replicants.eggonProgress.add(newBabies)
	var toAdd = tmp.qu.replicants.eggonProgress.floor()
	if (toAdd.gt(0)) {
		if (toAdd.gt(tmp.qu.replicants.eggonProgress)) tmp.qu.replicants.eggonProgress = new Decimal(0)
		else tmp.qu.replicants.eggonProgress = tmp.qu.replicants.eggonProgress.sub(toAdd)
		tmp.qu.replicants.eggons = tmp.qu.replicants.eggons.add(toAdd).round()
	}
}

function replicantBabyHatchingUpdating(diff){
	if (tmp.qu.replicants.eggons.gt(0)) {
		tmp.qu.replicants.babyProgress = tmp.qu.replicants.babyProgress.add(diff/getHatchSpeed()/10)
		var toAdd = hasNU(2) ? tmp.qu.replicants.eggons : tmp.qu.replicants.babyProgress.floor().min(tmp.qu.replicants.eggons)
		if (toAdd.gt(0)) {
			if (toAdd.gt(tmp.qu.replicants.eggons)) tmp.qu.replicants.eggons = new Decimal(0)
			else tmp.qu.replicants.eggons = tmp.qu.replicants.eggons.sub(toAdd).round()
			if (toAdd.gt(tmp.qu.replicants.babyProgress)) tmp.qu.replicants.babyProgress = new Decimal(0)
			else tmp.qu.replicants.babyProgress = tmp.qu.replicants.babyProgress.sub(toAdd)
			tmp.qu.replicants.babies = tmp.qu.replicants.babies.add(toAdd).round()
		}
	}
}

function replicantBabiesGrowingUpUpdating(diff){
	if (tmp.qu.replicants.babies.gt(0)&&tmp.tra.gt(0)) {
		tmp.qu.replicants.ageProgress = tmp.qu.replicants.ageProgress.add(tmp.tra.times(diff/(player.achievements.includes("ng3p35")?400:4e3))).min(tmp.qu.replicants.babies)
		var toAdd = tmp.qu.replicants.ageProgress.floor()
		if (toAdd.gt(0)) {
			if (toAdd.gt(tmp.qu.replicants.babies)) tmp.qu.replicants.babies = new Decimal(0)
			else tmp.qu.replicants.babies = tmp.qu.replicants.babies.sub(toAdd).round()
			if (toAdd.gt(tmp.qu.replicants.ageProgress)) tmp.qu.replicants.ageProgress = new Decimal(0)
			else tmp.qu.replicants.ageProgress = tmp.qu.replicants.ageProgress.sub(toAdd)
			tmp.qu.replicants.amount = tmp.qu.replicants.amount.add(toAdd).round()
		}
	}
}

function replicantOverallUpdating(diff){
	replicantEggonUpdating(diff)
	replicantBabyHatchingUpdating(diff)
	if (tmp.qu.replicants.eggons.lt(1)) tmp.qu.replicants.babyProgress = new Decimal(0)
	replicantBabiesGrowingUpUpdating(diff)
	if (tmp.qu.replicants.babies.lt(1)) tmp.qu.replicants.ageProgress = new Decimal(0)
	if (!tmp.qu.nanofield.producingCharge) tmp.qu.replicants.quarks = tmp.qu.replicants.quarks.add(getGatherRate().total.max(0).times(diff/10))
}

function quantumOverallUpdating(diff){
	var colorShorthands=["r","g","b"]
	//Color Powers
	for (var c=0;c<3;c++) tmp.qu.colorPowers[colorShorthands[c]]=tmp.qu.colorPowers[colorShorthands[c]].add(getColorPowerProduction(colorShorthands[c]).times(diff/10))
	updateColorPowers()
	if (player.masterystudies.includes("d10")) replicantOverallUpdating(diff)
	if (player.masterystudies.includes("d11")) emperorDimUpdating(diff)
	if (player.masterystudies.includes("d12")) nanofieldUpdating(diff)
	if (player.masterystudies.includes("d13")) treeOfDecayUpdating(diff)
	
	if (speedrunMilestonesReached>5) {
		tmp.qu.metaAutobuyerWait+=diff
		var speed=speedrunMilestonesReached>20?10/3:10
		if (tmp.qu.metaAutobuyerWait>speed) {
			tmp.qu.metaAutobuyerWait=tmp.qu.metaAutobuyerWait%speed
			doAutoMetaTick()
		}
	}
}

function metaDimsUpdating(diff){
	player.meta.antimatter = player.meta.antimatter.plus(getMetaDimensionProduction(1).times(diff/10))
	if (inQC(4)) player.meta.antimatter = player.meta.antimatter.plus(getMetaDimensionProduction(1).times(diff/10))
	if (tmp.ngp3 && !tmp.ngp3l && inQC(0)) gainQuarkEnergy(player.meta.bestAntimatter, player.meta.antimatter)
	player.meta.bestAntimatter = player.meta.bestAntimatter.max(player.meta.antimatter)
	if (tmp.ngp3) {
		player.meta.bestOverQuantums = player.meta.bestOverQuantums.max(player.meta.antimatter)
		player.meta.bestOverGhostifies = player.meta.bestOverGhostifies.max(player.meta.antimatter)
	}
}

function infinityTimeMetaBlackHoleDimUpdating(diff){
	var step = inQC(4) || player.pSac!=undefined ? 2 : 1
	var stepT = inNC(7) && player.aarexModifications.ngmX > 3 ? 2 : step
	for (let tier = 1 ; tier < 9; tier++) {
		if (tier < 9 - step){
			player["infinityDimension"+tier].amount = player["infinityDimension"+tier].amount.plus(DimensionProduction(tier+step).times(diff/100))
			if (player.meta) player.meta[tier].amount = player.meta[tier].amount.plus(getMetaDimensionProduction(tier+step).times(diff/100))
		}
		if (tier < 9 - stepT) player["timeDimension"+tier].amount = player["timeDimension"+tier].amount.plus(getTimeDimensionProduction(tier+stepT).times(diff/100))
		if (player.exdilation != undefined) if (isBHDimUnlocked(tier+step)) player["blackholeDimension"+tier].amount = player["blackholeDimension"+tier].amount.plus(getBlackholeDimensionProduction(tier+step).times(diff/100))
	}
}

function dimensionPageTabsUpdating(){
	var showProdTab=false
	document.getElementById("dimTabButtons").style.display = "none"
	if (player.infinitied > 0 || player.eternities !== 0 || quantumed) {
		document.getElementById("hideProductionTab").style.display = ""
		showProdTab=!player.aarexModifications.hideProductionTab
	} else document.getElementById("hideProductionTab").style.display = "none"
	if (player.infDimensionsUnlocked[0] || player.eternities !== 0 || quantumed || showProdTab || player.aarexModifications.ngmX > 3) document.getElementById("dimTabButtons").style.display = "inline-block"
	document.getElementById("prodtabbtn").style.display=showProdTab?"inline-block":"none"
	if (!showProdTab) player.options.chart.on=false
}

function otherDimsUpdating(diff){
	if (player.currentEternityChall !== "eterc7") player.infinityPower = player.infinityPower.plus(DimensionProduction(1).times(diff/10))
   	else if (!inNC(4) && player.currentChallenge !== "postc1") player.seventhAmount = player.seventhAmount.plus(DimensionProduction(1).times(diff/10))

   	if (player.currentEternityChall == "eterc7") player.infinityDimension8.amount = player.infinityDimension8.amount.plus(getTimeDimensionProduction(1).times(diff/10))
   	else {
		if (ECTimesCompleted("eterc7") > 0) player.infinityDimension8.amount = player.infinityDimension8.amount.plus(DimensionProduction(9).times(diff/10))
		player.timeShards = player.timeShards.plus(getTimeDimensionProduction(1).times(diff/10)).max(getTimeDimensionProduction(1).times(0))
	}
}

function ERFreeTickUpdating(){
	var oldT = player.totalTickGained
	player.totalTickGained = getTotalTickGained()
	player.tickThreshold = tickCost(player.totalTickGained+1)
	player.tickspeed = player.tickspeed.times(Decimal.pow(tmp.tsReduce, player.totalTickGained - oldT))
}

function nonERFreeTickUpdating(){
	let gain;
	let thresholdMult=1.33
	if (player.galacticSacrifice!==undefined&&!(player.aarexModifications.ngmX>3)) thresholdMult=1.15
	if (player.timestudy.studies.includes(171)) {
		if (thresholdMult==1.15) thresholdMult=1.1
		else thresholdMult=1.25
		if (player.aarexModifications.newGameMult) thresholdMult-=0.08
	}
	if (QCIntensity(7)) thresholdMult*=tmp.qcRewards[7]
	if (ghostified&&player.ghostify.neutrinos.boosts>9) thresholdMult-=tmp.nb[9]
	if (thresholdMult<1.1) thresholdMult=1.05+0.05/(2.1-thresholdMult)
	gain = Math.ceil(new Decimal(player.timeShards).dividedBy(player.tickThreshold).log10()/Math.log10(thresholdMult))
	player.totalTickGained += gain
	player.tickspeed = player.tickspeed.times(Decimal.pow(tmp.tsReduce,gain))
	player.postC3Reward=Decimal.pow(getPostC3Mult(),gain*getIC3EffFromFreeUpgs()).times(player.postC3Reward)
	player.tickThreshold = Decimal.pow(thresholdMult,player.totalTickGained).times(player.aarexModifications.ngmX>3?0.01:1)
	document.getElementById("totaltickgained").textContent = "You've gained "+getFullExpansion(player.totalTickGained)+" tickspeed upgrades."
	tmp.tickUpdate = true
}

function bigCrunchButtonUpdating(){
	document.getElementById("bigcrunch").style.display = 'none'
    	document.getElementById("postInfinityButton").style.display = 'none'
    	if (tmp.ri) {
		document.getElementById("bigcrunch").style.display = 'inline-block';
		if ((player.currentChallenge == "" || player.options.retryChallenge) && (player.bestInfinityTime <= 600 || player.break)) {}
		else {
			isEmptiness = true
            		showTab('emptiness')
		}
	} else if ((player.break && player.currentChallenge == "") || player.infinityUpgradesRespecced != undefined) {
		if (player.money.gte(Number.MAX_VALUE)) {
            		document.getElementById("postInfinityButton").style.display = "inline-block"

            		var currentIPmin = gainedInfinityPoints().dividedBy(player.thisInfinityTime/600)
            		if (currentIPmin.gt(IPminpeak)) IPminpeak = currentIPmin
			if (IPminpeak.l > 1e9) document.getElementById("postInfinityButton").innerHTML = "Big Crunch"
			else {
				var notationPart = player.options.theme != "Aarex's Modifications" || player.options.notation=="Morse code" || player.options.notation=='Spazzy'
				var IPminpart = ""
				if (IPminpeak.l < 1e5 && notationPart) IPminpart = "<br>"+shortenDimensions(currentIPmin) + " IP/min"+"<br>Peaked at "+shortenDimensions(IPminpeak)+" IP/min"
			
				document.getElementById("postInfinityButton").innerHTML = "<b>"+(IPminpeak.l > 3e7 && notationPart ? "Gain " : "Big Crunch for ")+shortenDimensions(gainedInfinityPoints())+" Infinity points.</b>" + IPminpart
			}
		}
	}
}

function eternityButtonUpdating(){
	if ((player.eternities == 0 && !quantumed) || isEmptiness) {
        	document.getElementById("eternityPoints2").style.display = "none"
        	document.getElementById("eternitystorebtn").style.display = "none"
	} else {
		document.getElementById("eternityPoints2").style.display = "inline-block"
		document.getElementById("eternitystorebtn").style.display = "inline-block"
	}
}

function nextICUnlockUpdating(){
	var nextUnlock=getNextAt(order[player.postChallUnlocked])
	if (nextUnlock===undefined) document.getElementById("nextchall").textContent = " "
	else if (!player.achievements.includes("r133")) {
		document.getElementById("nextchall").textContent = "Next challenge unlocks at "+ shortenCosts(nextUnlock) + " antimatter."
		while (player.money.gte(nextUnlock)&&nextUnlock!==undefined) {
			if (getEternitied()>6) {
				player.challenges.push(order[player.postChallUnlocked])
				if (order[player.postChallUnlocked]=="postc1") for (var i=0;i<player.challenges.length;i++) if (player.challenges[i].split("postc")[1]) infDimPow *= player.galacticSacrifice ? 2 : 1.3
				tmp.cp++
			}
			player.postChallUnlocked++
			nextUnlock=getNextAt(order[player.postChallUnlocked])
			updateChallenges()
		}
		if (getEternitied()>6&&player.postChallUnlocked>7) {
			ndAutobuyersUsed=0
			for (i=0;i<9;i++) if (player.autobuyers[i]%1!==0&&player.autobuyers[i].isOn) ndAutobuyersUsed++
			document.getElementById("maxall").style.display=ndAutobuyersUsed>8&&player.challenges.includes("postc8")?"none":""
		}
	}
}

function getReplicantiInterval() {
	let interval = player.replicanti.interval
	if (player.aarexModifications.ngexV) interval *= .8
	if (player.timestudy.studies.includes(62)) interval /= tsMults[62]()
	if (player.replicanti.amount.gt(Number.MAX_VALUE)||player.timestudy.studies.includes(133)) interval *= 10
	if (player.timestudy.studies.includes(213)) interval /= tsMults[213]()
	if (GUBought("gb1")) interval /= getGB1Effect()
	if (player.replicanti.amount.lt(Number.MAX_VALUE) && player.achievements.includes("r134")) interval /= 2
	if (isBigRipUpgradeActive(4)) interval /= 10

	interval = new Decimal(interval)
	if (player.exdilation != undefined) interval = interval.div(getBlackholePowerEffect().pow(1/3))
	if (player.dilation.upgrades.includes('ngpp1') && player.aarexModifications.nguspV && !player.aarexModifications.nguepV) interval = interval.div(player.dilation.dilatedTime.max(1).pow(0.05))
	if (player.dilation.upgrades.includes("ngmm9")) interval = interval.div(getDil72Mult())
	if (tmp.ngp3) if (player.masterystudies.includes("t332")) interval = interval.div(getMTSMult(332))
	return interval
}

function getReplicantiFinalInterval() {
	let x = getReplicantiInterval()
	if (player.replicanti.amount.gt(Number.MAX_VALUE)) x = player.boughtDims ? Math.pow(player.achievements.includes("r107") ? Math.max(player.replicanti.amount.log(2)/1024,1) : 1, -.25) * x.toNumber() : Decimal.pow(tmp.rep.speeds.inc, Math.max(player.replicanti.amount.log10() - tmp.rep.speeds.exp, 0)/tmp.rep.speeds.exp).times(x)
	return x
}

function runRandomReplicanti(chance){
	if (chance.gt(1)) {
		player.replicanti.amount = player.replicanti.amount.times(2)
		return
	}
	var temp = player.replicanti.amount
	chance = chance.toNumber()
        for (var i=0; temp.gt(i); i++) {
		if (chance > Math.random()) player.replicanti.amount = player.replicanti.amount.plus(1)
	}
}

function notContinuousReplicantiUpdating() {
	var chance = tmp.rep.chance.toNumber()
	var interval = tmp.rep.interval

	if (interval <= replicantiTicks && player.replicanti.unl) {
		if (player.replicanti.amount.lte(100)) runRandomReplicanti(chance) //chance should be a decimal
		else if (player.replicanti.amount.lt(getReplicantiLimit())) {
			var temp = Decimal.round(player.replicanti.amount.dividedBy(100))
			if (chance > 0.99) {
				let counter = 0
				for (var i=0; i<100; i++) if (chance > Math.random()) counter++;
				player.replicanti.amount = temp.times(counter).plus(player.replicanti.amount)
				if (!player.timestudy.studies.includes(192)) player.replicanti.amount = player.replicanti.amount.min(getReplicantiLimit())
				counter = 0
			} else player.replicanti.amount = player.replicanti.amount.times(2)
			if (!player.timestudy.studies.includes(192)) player.replicanti.amount = player.replicanti.amount.min(getReplicantiLimit())
		}
		replicantiTicks -= interval
	}
}

function continuousReplicantiUpdating(diff){
	if (player.timestudy.studies.includes(192) && tmp.rep.est.toNumber() > 0 && tmp.rep.est.toNumber() < 1/0) player.replicanti.amount = Decimal.pow(Math.E, tmp.rep.ln +Math.log((diff*tmp.rep.est/10) * (Math.log10(tmp.rep.speeds.inc)/tmp.rep.speeds.exp)+1) / (Math.log10(tmp.rep.speeds.inc)/tmp.rep.speeds.exp))
	else if (player.timestudy.studies.includes(192)) player.replicanti.amount = Decimal.pow(Math.E, tmp.rep.ln + tmp.rep.est.times(diff * Math.log10(tmp.rep.speeds.inc) / tmp.rep.speeds.exp / 10).add(1).log(Math.E) / (Math.log10(tmp.rep.speeds.inc)/tmp.rep.speeds.exp))
	else player.replicanti.amount = Decimal.pow(Math.E, tmp.rep.ln +(diff*tmp.rep.est/10)).min(getReplicantiLimit())
	replicantiTicks = 0
}

function passiveIPperMUpdating(diff){
	player.infinityPoints = player.infinityPoints.plus(bestRunIppm.times(player.offlineProd/100).times(diff/600))
}

function giveBlackHolePowerUpdating(diff){
	if (player.exdilation != undefined) player.blackhole.power = player.blackhole.power.plus(getBlackholeDimensionProduction(1).times(diff/10))
}

function freeTickspeedUpdating(){
	if (player.boughtDims) ERFreeTickUpdating()
	if (player.timeShards.gt(player.tickThreshold) && !player.boughtDims) nonERFreeTickUpdating()
}

function IRsetsUnlockUpdating(){
    	if (player.infinityUpgradesRespecced != undefined) if (setUnlocks.length > player.setsUnlocked) if (player.money.gte(setUnlocks[player.setsUnlocked])) player.setsUnlocked++
}

function replicantiIncrease(diff) {
	if (!player.replicanti.unl) return
	if (diff > 5 || tmp.rep.chance.gt(1) || tmp.rep.interval < 50 || tmp.rep.est.gt(50) || player.timestudy.studies.includes(192)) continuousReplicantiUpdating(diff)
	else notContinuousReplicantiUpdating()
	if (player.replicanti.amount.gt(0)) replicantiTicks += diff

	if (tmp.ngp3 && player.masterystudies.includes("d10") && tmp.qu.autoOptions.replicantiReset && player.replicanti.amount.gt(tmp.qu.replicants.requirement)) replicantReset()
	if (player.replicanti.galaxybuyer && canGetReplicatedGalaxy() && canAutoReplicatedGalaxy()) replicantiGalaxy()
}

function IPMultBuyUpdating(){
	if (player.infMultBuyer && (!player.boughtDims || canBuyIPMult())) {
		var dif = Math.floor(player.infinityPoints.div(player.infMultCost).log(player.aarexModifications.newGameExpVersion?4:10)) + 1
		if (dif > 0) {
			player.infMult = player.infMult.times(Decimal.pow(getIPMultPower(), dif))
			player.infMultCost = player.infMultCost.times(Decimal.pow(ipMultCostIncrease, dif))
			if (tmp.ngp3l || player.infinityPoints.lte(Decimal.pow(10, 1e9))) {
				if (ghostified) {
					if (player.ghostify.milestones < 11) player.infinityPoints = player.infinityPoints.minus(player.infMultCost.dividedBy(player.aarexModifications.newGameExpVersion?4:10).min(player.infinityPoints))
				}
				else player.infinityPoints = player.infinityPoints.minus(player.infMultCost.dividedBy(player.aarexModifications.newGameExpVersion?4:10).min(player.infinityPoints))
			}
			if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autoCrunchMode == "amount") player.autobuyers[11].priority = Decimal.times(player.autobuyers[11].priority, Decimal.pow(getIPMultPower(), dif));
			if (player.autoCrunchMode == "amount") document.getElementById("priority12").value = formatValue("Scientific", player.autobuyers[11].priority, 2, 0);
		}
	}
}

function doEternityButtonDisplayUpdating(diff){
	var isSmartPeakActivated = tmp.ngp3 && getEternitied() >= 1e13 && player.dilation.upgrades.includes("ngpp6")
    	var EPminpeakUnits = isSmartPeakActivated ? (player.dilation.active ? 'TP' : tmp.be ? 'EM' : 'EP') : 'EP'
    	var currentEPmin = updateEPminpeak(diff, EPminpeakUnits)
    	EPminpeakUnits = (EPminpeakType == 'logarithm' ? ' log(' + EPminpeakUnits + ')' : ' ' + EPminpeakUnits) + '/min'
    	if (document.getElementById("eternitybtn").style.display == "inline-block") {
        	document.getElementById("eternitybtnFlavor").textContent = (((!player.dilation.active&&gainedEternityPoints().lt(1e6))||player.eternities<1||player.currentEternityChall!==""||(player.options.theme=="Aarex's Modifications"&&player.options.notation!="Morse code"))
									    ? ((player.currentEternityChall!=="" ? "Other challenges await..." : player.eternities>0 ? "" : "Other times await...") + " I need to become Eternal.") : "")
		if (player.dilation.active && player.dilation.totalTachyonParticles.gte(getDilGain())) document.getElementById("eternitybtnEPGain").innerHTML = "Reach " + shortenMoney(Decimal.pow(10, player.dilation.totalTachyonParticles.div(getDilPower()).pow(1/getDilExp()).toNumber() * 400)) + " antimatter to gain more Tachyon Particles."
		else {
			if ((EPminpeak.l < 9 && EPminpeakType == "logarithm") || (EPminpeakType == 'normal' && EPminpeak.l < 1e9)) {
            			document.getElementById("eternitybtnEPGain").innerHTML = ((player.eternities > 0 && (player.currentEternityChall==""||player.options.theme=="Aarex's Modifications"))
										  	? "Gain <b>"+(player.dilation.active?shortenMoney(getDilGain().sub(player.dilation.totalTachyonParticles)):shortenDimensions(gainedEternityPoints()))+"</b> "+(player.dilation.active?"Tachyon particles.":tmp.be?"EP and <b>"+shortenDimensions(getEMGain())+"</b> Eternal Matter.":"Eternity points.") : "")
			} else {
				document.getElementById("eternitybtnEPGain").innerHTML = "Go Eternal"
			}
		}
		var showEPmin=(player.currentEternityChall===""||player.options.theme=="Aarex's Modifications")&&EPminpeak>0&&player.eternities>0&&player.options.notation!='Morse code'&&player.options.notation!='Spazzy'&&(!(player.dilation.active||tmp.be)||isSmartPeakActivated)
		if (EPminpeak.l < 1e5) {
        		document.getElementById("eternitybtnRate").textContent = (showEPmin&&(EPminpeak.lt("1e30003")||player.options.theme=="Aarex's Modifications")
										  ? (EPminpeakType == "normal" ? shortenDimensions(currentEPmin) : shorten(currentEPmin))+EPminpeakUnits : "")
			document.getElementById("eternitybtnPeak").textContent = showEPmin ? "Peaked at "+(EPminpeakType == "normal" ? shortenDimensions(EPminpeak) : shorten(EPminpeak))+EPminpeakUnits : ""
		} else {
			document.getElementById("eternitybtnRate").textContent = ''
			document.getElementById("eternitybtnPeak").textContent = ''
		}
    	}
}

function doQuantumButtonDisplayUpdating(diff){
	var currentQKmin = new Decimal(0)
    	
    	if (quantumed && isQuantumReached()) {
        	var bigRipped = !tmp.ngp3 ? false : tmp.qu.bigRip.active
        	if (!bigRipped) {
            		currentQKmin = quarkGain().dividedBy(tmp.qu.time/600)
            		if (currentQKmin.gt(QKminpeak) && player.meta.antimatter.gte(Decimal.pow(Number.MAX_VALUE,tmp.ngp3?1.2:1))) {
				QKminpeak = currentQKmin
                		QKminpeakValue = quarkGain()
                		tmp.qu.autobuyer.peakTime = 0
			} else tmp.qu.autobuyer.peakTime += diff / 10
		}
	}
	
    	document.getElementById("quantumbtnFlavor").textContent = ((tmp.qu!==undefined?!tmp.qu.times&&(player.ghostify!==undefined?!player.ghostify.milestones:true):false)||!inQC(0)?((tmp.ngp3 ? tmp.qu.bigRip.active : false)?"I am":inQC(0)?"My computer is":tmp.qu.challenge.length>1?"Paired challenges are":"My challenging skills are")+" not powerful enough... ":"") + "I need to go quantum."
    	var showGain = ((quantumed && tmp.qu.times) || (ghostified && player.ghostify.milestones)) && (inQC(0)||player.options.theme=="Aarex's Modifications") ? "QK" : ""
    	if (tmp.ngp3) if (tmp.qu.bigRip.active) showGain = "SS"
    	document.getElementById("quantumbtnQKGain").textContent = showGain == "QK" ? "Gain "+shortenDimensions(quarkGain())+" quark"+(quarkGain().eq(1)?".":"s.") : ""
    	if (showGain == "SS") document.getElementById("quantumbtnQKGain").textContent = "Gain " + shortenDimensions(getSpaceShardsGain()) + " Space Shards."
	if (showGain == "QK" && currentQKmin.l > 1e5) {
		document.getElementById("quantumbtnRate").textContent = ''
		document.getElementById("quantumbtnPeak").textContent = ''
	} else {
    		document.getElementById("quantumbtnRate").textContent = showGain == "QK" ? shortenMoney(currentQKmin)+" QK/min" : ""
    		var showQKPeakValue = QKminpeakValue.lt(1e30)||player.options.theme=="Aarex's Modifications"
    		document.getElementById("quantumbtnPeak").textContent = showGain == "QK" ? (showQKPeakValue ? "" : "Peaked at ") + shortenMoney(QKminpeak)+" QK/min" + (showQKPeakValue ? " at " + shortenDimensions(QKminpeakValue) + " QK" : "") : ""
	}
}

function doGhostifyButtonDisplayUpdating(diff){
	var currentGHPmin = new Decimal(0)
	if (ghostified && bigRipped) {
            	currentGHPmin = getGHPGain().dividedBy(player.ghostify.time/600)
		if (currentGHPmin.gt(GHPminpeak)) {
			GHPminpeak = currentGHPmin
			GHPminpeakValue = getGHPGain()
		}
	}
	var ghostifyGains = []
    	if (ghostified) ghostifyGains.push(shortenDimensions(getGHPGain()) + " Ghost Particles")
    	if (ghostified && player.achievements.includes("ng3p78")) ghostifyGains.push(shortenDimensions(Decimal.times(6e3 * tmp.qu.bigRip.bestGals, getGhostifiedGain()).times(getNeutrinoGain())) + " Neutrinos")
    	if (hasBosonicUpg(15)) ghostifyGains.push(getFullExpansion(getGhostifiedGain()) + " Ghostifies")
    	document.getElementById("ghostifybtnFlavor").textContent = ghostifyGains.length > 1 ? "" : (ghostifyGains.length ? "" : "This broken universe will be done... ") + "I need to become a ghost."
    	document.getElementById("GHPGain").textContent = ghostifyGains.length ? "Gain " + ghostifyGains[0] + (ghostifyGains.length > 2 ? ", " + ghostifyGains[1] + "," : "") + (ghostifyGains.length > 1 ? " and " + ghostifyGains[ghostifyGains.length-1] : "") + "." : ""
    	var showGHPPeakValue = GHPminpeakValue.lt(1e6)||player.options.theme=="Aarex's Modifications"
    	document.getElementById("GHPRate").textContent = ghostifyGains.length == 1 && showGHPPeakValue ? getGHPRate(currentGHPmin) : ""
    	document.getElementById("GHPPeak").textContent = ghostifyGains.length == 1 ? (showGHPPeakValue?"":"Peaked at ")+getGHPRate(GHPminpeak)+(showGHPPeakValue?" at "+shortenDimensions(GHPminpeakValue)+" GhP":"") : ""
}

function checkMarathon(){
	if (getDimensionProductionPerSecond(1).gt(player.money) && !player.achievements.includes("r44")) {
        	Marathon+=player.options.updateRate/1000;
		if (Marathon >= 30) giveAchievement("Over in 30 seconds");
	} else {
		Marathon = 0;
	}
}

function checkMarathon2(){
	if (DimensionProduction(1).gt(player.infinityPower) && player.currentEternityChall != "eterc7" && !player.achievements.includes("r113")) {
		Marathon2+=player.options.updateRate/1000;
        	if (Marathon2 >= 60) giveAchievement("Long lasting relationship");
	} else {
		Marathon2 = 0;
    	}
}

function checkPain(){
	if (player.eternities >= 1 && (player.options.notation == "Standard" || player.options.notation == "Emojis" || player.options.notation == "Brackets")) {
        	painTimer += player.options.updateRate/1000;
        	if (painTimer >= 600) giveAchievement("Do you enjoy pain?");
	}
}

function checkSupersanic(){
	if(player.money.gt(Math.pow(10,63))) giveAchievement("Supersanic");
}

function tickspeedButtonDisplay(){
	if (player.tickSpeedCost.gt(player.money)) {
        	document.getElementById("tickSpeed").className = 'unavailablebtn';
        	document.getElementById("tickSpeedMax").className = 'unavailablebtn';
    	} else {
        	document.getElementById("tickSpeed").className = 'storebtn';
        	document.getElementById("tickSpeedMax").className = 'storebtn';
    	}
}

function passiveGPGen(diff){
	let passiveGPGen = false
	if (player.tickspeedBoosts !== undefined) passiveGPGen = player.achievements.includes("r56")
	else if (player.galacticSacrifice !== undefined) passiveGPGen = !tmp.ngp3l && player.timestudy.studies.includes(181)
	if (passiveGPGen) player.galacticSacrifice.galaxyPoints = player.galacticSacrifice.galaxyPoints.add(getGSAmount().times(diff / 1e3))
}

function paradoxSacDisplay(){
	if (pSacrificed()) {
        	document.getElementById("paradoxbtn").style.display = ""
        	document.getElementById("px").style.display = ""
        	document.getElementById("px").innerHTML = "You have <span class='pxAmount'>"+shortenDimensions(player.pSac.px)+"</span> Paradox"+(player.galacticSacrifice.galaxyPoints.eq(1)?".":"es.")
    	} else {
        	document.getElementById("paradoxbtn").style.display = "none"
        	document.getElementById("px").style.display = "none"
    	}
}

function normalSacDisplay(){
	if (player.eightBought > 0 && player.resets > 4 && player.currentEternityChall !== "eterc3") document.getElementById("sacrifice").className = "storebtn"
   	else document.getElementById("sacrifice").className = "unavailablebtn"
}

function galSacDisplay(){
	if ((player.galacticSacrifice ? (player.galacticSacrifice.times > 0 || player.infinitied > 0 || player.eternities != 0 || quantumed) : false) && !isEmptiness) {
        	document.getElementById("galaxybtn").style.display = "inline-block"
        	document.getElementById("galaxyPoints2").innerHTML = "You have <span class='GPAmount'>"+shortenDimensions(player.galacticSacrifice.galaxyPoints)+"</span> Galaxy point"+(player.galacticSacrifice.galaxyPoints.eq(1)?".":"s.")
    	} else document.getElementById("galaxybtn").style.display = "none";
    	document.getElementById("automationbtn").style.display = player.aarexModifications.ngmX > 3 && (player.challenges.includes("challenge1") || player.infinitied > 0 || player.eternities != 0 || quantumed) && !isEmptiness ? "inline-block" : "none"
    	if (document.getElementById("paradox").style.display=='block') updatePUMults()
	if (document.getElementById("galaxy").style.display=='block') {
        	galacticUpgradeSpanDisplay()
        	galacticUpgradeButtonTypeDisplay()
	}
}

function isEmptinessDisplayChanges(){
	if (isEmptiness) {
        	document.getElementById("dimensionsbtn").style.display = "none";
        	document.getElementById("optionsbtn").style.display = "none";
        	document.getElementById("statisticsbtn").style.display = "none";
        	document.getElementById("achievementsbtn").style.display = "none";
        	document.getElementById("tickSpeed").style.visibility = "hidden";
        	document.getElementById("tickSpeedMax").style.visibility = "hidden";
        	document.getElementById("tickLabel").style.visibility = "hidden";
        	document.getElementById("tickSpeedAmount").style.visibility = "hidden";
        	document.getElementById("quantumtabbtn").style.display = "none"
        	document.getElementById("ghostifytabbtn").style.display = "none"
    	} else {
        	document.getElementById("dimensionsbtn").style.display = "inline-block";
        	document.getElementById("optionsbtn").style.display = "inline-block";
        	document.getElementById("statisticsbtn").style.display = "inline-block";
        	document.getElementById("achievementsbtn").style.display = "inline-block";
    	}
}

function DimBoostBulkDisplay(){
	var bulkDisplay = player.infinityUpgrades.includes("bulkBoost") || player.autobuyers[9].bulkBought === true ? "inline" : "none"
    	document.getElementById("bulkdimboost").style.display = bulkDisplay
    	if (player.tickspeedBoosts != undefined) document.getElementById("bulkTickBoostDiv").style.display = bulkDisplay
}

function currentChallengeProgress(){
	var p = Math.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(player.challengeTarget) * 100), 100).toFixed(2) + "%"
	document.getElementById("progressbar").style.width = p
        document.getElementById("progresspercent").textContent = p
        document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to challenge goal")
}

function preBreakProgess(){
	var p = Math.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(getLimit()) * 100), 100).toFixed(2) + "%"
	document.getElementById("progressbar").style.width = p
	document.getElementById("progresspercent").textContent = p
        document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to Infinity")
}

function infDimProgress(){
	var p = Math.min(player.money.e / getNewInfReq().money.e * 100, 100).toFixed(2) + "%"
        document.getElementById("progressbar").style.width = p
	document.getElementById("progresspercent").textContent = p
	document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to next dimension unlock")
}

function currentEChallengeProgress(){
	var p = Math.min(Decimal.log10(player.infinityPoints.plus(1)) / player.eternityChallGoal.log10() * 100, 100).toFixed(2) + "%"
	document.getElementById("progressbar").style.width = p
	document.getElementById("progresspercent").textContent = p
	document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to Eternity Challenge goal")
}

function preEternityProgress(){
	var p = Math.min(Decimal.log10(player.infinityPoints.plus(1)) / Decimal.log10(Number.MAX_VALUE)  * 100, 100).toFixed(2) + "%"
        document.getElementById("progressbar").style.width = p
        document.getElementById("progresspercent").textContent = p
	document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to Eternity")
}

function r128Progress(){
	var p = (Decimal.log10(player.infinityPoints.plus(1)) / 220).toFixed(2) + "%"
        document.getElementById("progressbar").style.width = p
        document.getElementById("progresspercent").textContent = p
	document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to "What do I have to do to get rid of you"') 
}

function r138Progress(){
	var p = Math.min(Decimal.log10(player.infinityPoints.plus(1)) / 200, 100).toFixed(2) + "%"
        document.getElementById("progressbar").style.width = p
        document.getElementById("progresspercent").textContent = p
        document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to "That is what I have to do to get rid of you."')
}

function gainTPProgress(){
	var p = (getDilGain().log10() / player.dilation.totalTachyonParticles.log10()).toFixed(2) + "%"
	document.getElementById("progressbar").style.width = p
        document.getElementById("progresspercent").textContent = p
        document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to the requirement for tachyon particle gain')
}

function ngpp13Progress(){
	var gepLog = gainedEternityPoints().log2()
	var goal = Math.pow(2,Math.ceil(Math.log10(gepLog) / Math.log10(2)))
	goal = Decimal.sub("1e40000", player.eternityPoints).log2()
    	var percentage = Math.min(gepLog / goal * 100, 100).toFixed(2) + "%"
    	document.getElementById("progressbar").style.width = percentage
    	document.getElementById("progresspercent").textContent = percentage
    	document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to "In the grim darkness of the far endgame"')
}

function r127Progress(){
	var gepLog = gainedEternityPoints().log2()
	var goal = Math.pow(2,Math.ceil(Math.log10(gepLog) / Math.log10(2)))
	goal = Decimal.sub(Number.MAX_VALUE, player.eternityPoints).log2()
    	var percentage = Math.min(gepLog / goal * 100, 100).toFixed(2) + "%"
    	document.getElementById("progressbar").style.width = percentage
    	document.getElementById("progresspercent").textContent = percentage
    	document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to "But I wanted another prestige layer..."')
}

function preQuantumNormalProgress(){
	var gepLog = gainedEternityPoints().log2()
        var goal = Math.pow(2,Math.ceil(Math.log10(gepLog) / Math.log10(2)))
	if (goal > 131072 && player.meta && !player.achievements.includes('ngpp13')) {
		ngpp13Progress()
	} else if (goal > 512 && !player.achievements.includes('r127')) {
		r127Progress()
	} else {
		var percentage = Math.min(gepLog / goal * 100, 100).toFixed(2) + "%"
		document.getElementById("progressbar").style.width = percentage
		document.getElementById("progresspercent").textContent = percentage
		document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to "+shortenDimensions(Decimal.pow(2,goal))+" EP gain")
	}
}

function progressBarUpdating(){
	if (player.aarexModifications.progressBar) {
        	document.getElementById("progressbar").className=""
		if (document.getElementById("metadimensions").style.display == "block") doQuantumProgress() 
		else if (player.currentChallenge !== "") {
			currentChallengeProgress()
        	} else if (!player.break) {
            		preBreakProgess()
        	} else if (player.infDimensionsUnlocked.includes(false)) {
            		infDimProgress()
        	} else if (player.currentEternityChall !== '' && player.infinityPoints.lt(player.eternityChallGoal.pow(2))) {
            		currentEChallengeProgress()
        	} else if (player.infinityPoints.lt(Number.MAX_VALUE) || player.eternities == 0) {
            		preEternityProgress()
        	} else if (player.achievements.includes('r127') && !player.achievements.includes('r128') && player.timestudy.studies.length == 0) {
            		r128Progress()
        	} else if (player.dilation.studies.includes(5) && player.dilation.active && !player.achievements.includes('r138') && player.timestudy.studies.length == 0) {
            		r138Progress()
        	} else if (player.dilation.active && player.dilation.totalTachyonParticles.gte(getDilGain())) {
            		gainTPProgress()
        	} else if ((!inQC(0) || gainedEternityPoints().gte(Decimal.pow(2,1048576))) && player.meta) doQuantumProgress()
		else preQuantumNormalProgress()
	}
}

function ECRewardDisplayUpdating(){
	document.getElementById("ec1reward").textContent = "Reward: "+shortenMoney(getECReward(1))+"x on all Time Dimensions (based on time spent this Eternity)"
	document.getElementById("ec2reward").textContent = "Reward: Infinity power affects 1st Infinity Dimension with reduced effect, Currently: "+shortenMoney(getECReward(2))+"x"
	document.getElementById("ec3reward").textContent = "Reward: Increase the multiplier for buying 10 dimensions, Currently: "+shorten(getDimensionPowerMultiplier("no-QC5"))+"x"
	document.getElementById("ec4reward").textContent = "Reward: Infinity Dimension multiplier from unspent IP, Currently: "+shortenMoney(getECReward(4))+"x"
	document.getElementById("ec5reward").textContent = "Reward: Galaxy cost scaling starts "+getECReward(5)+" galaxies later."
	document.getElementById("ec6reward").textContent = "Reward: Further reduce the dimension cost multiplier increase, Currently: "+player.dimensionMultDecrease.toFixed(1)+"x "
	document.getElementById("ec7reward").textContent = "Reward: First Time dimension produces Eighth Infinity Dimensions, Currently: "+shortenMoney(DimensionProduction(9))+" per second. "
	document.getElementById("ec8reward").textContent = "Reward: Infinity power powers up replicanti galaxies, Currently: " + (getECReward(8) * 100 - 100).toFixed(2) + "%"
	document.getElementById("ec9reward").textContent = "Reward: Infinity Dimension multiplier based on time shards, Currently: "+shortenMoney(getECReward(9))+"x "
	document.getElementById("ec10reward").textContent = "Reward: Time dimensions gain a multiplier from infinitied stat, Currently: "+shortenMoney(getECReward(10))+"x "
	document.getElementById("ec11reward").textContent = "Reward: Further reduce the tickspeed cost multiplier increase, Currently: "+player.tickSpeedMultDecrease.toFixed(2)+"x "
	document.getElementById("ec12reward").textContent = "Reward: Infinity Dimension cost multipliers are reduced. (x^"+getECReward(12)+")"
	document.getElementById("ec13reward").textContent = "Reward: Increase the exponent of meta-antimatter effect. ("+(getECReward(13)+9)+"x)"
	document.getElementById("ec14reward").textContent = "Reward: Free tickspeed upgrades boost IC3 reward by "+getIC3EffFromFreeUpgs().toFixed(0)+"x strong as normal."

	document.getElementById("ec10span").textContent = shortenMoney(ec10bonus) + "x"
}

function bigRipUpgradeUpdating(){
	if (player.ghostify.milestones>7) {
		document.getElementById("spaceShards").textContent=shortenDimensions(tmp.qu.bigRip.spaceShards)
		for (var u=1;u<=getMaxBigRipUpgrades();u++) {
			document.getElementById("bigripupg"+u).className = tmp.qu.bigRip.upgrades.includes(u) ? "gluonupgradebought bigrip" + (isBigRipUpgradeActive(u, true) ? "" : "off") : tmp.qu.bigRip.spaceShards.lt(bigRipUpgCosts[u]) ? "gluonupgrade unavailablebtn" : "gluonupgrade bigrip"
			document.getElementById("bigripupg"+u+"cost").textContent = shortenDimensions(new Decimal(bigRipUpgCosts[u]))
		}
	}
	document.getElementById("bigripupg1current").textContent=shortenDimensions(tmp.bru[1])
	document.getElementById("bigripupg8current").textContent=shortenDimensions(tmp.bru[8])+(Decimal.gte(tmp.bru[8],Number.MAX_VALUE)&&!hasNU(11)?"x (cap)":"x")
	document.getElementById("bigripupg14current").textContent=tmp.bru[14].toFixed(2)
	var bru15effect = tmp.bru[15]
	document.getElementById("bigripupg15current").textContent=bru15effect < 999.995 ? bru15effect.toFixed(2) : getFullExpansion(Math.round(bru15effect))
	document.getElementById("bigripupg16current").textContent=shorten(tmp.bru[16])
	document.getElementById("bigripupg17current").textContent=tmp.bru[17]
	if (player.ghostify.ghostlyPhotons.unl) {
		document.getElementById("bigripupg18current").textContent=shorten(tmp.bru[18])
		document.getElementById("bigripupg19current").textContent=shorten(tmp.bru[19])
	}
}

function challengeOverallDisplayUpdating(){
	if (document.getElementById("challenges").style.display == "block") {
		if (document.getElementById("eternitychallenges").style.display == "block") ECRewardDisplayUpdating()
		if (document.getElementById("quantumchallenges").style.display == "block") {
		    if (tmp.qu.autoOptions.sacrifice) document.getElementById("electronsAmount2").textContent="You have " + getFullExpansion(Math.round(tmp.qu.electrons.amount)) + " electrons."
			for (var c=1;c<7;c++) {
				if (c==5) document.getElementById("qc5reward").textContent = getDimensionPowerMultiplier("linear").toFixed(2)
				else if (c!=2) document.getElementById("qc"+c+"reward").textContent = shorten(tmp.qcRewards[c])
			}
			if (player.masterystudies.includes("d14")) bigRipUpgradeUpdating() //big rip
		}
	}
}

function infDimTabUpdating(){
   	document.getElementById("idtabbtn").style.display = ((player.infDimensionsUnlocked[0] || player.eternities > 0 || quantumed) && !inQC(8)) ? "" : "none"
}

function chall23PowerUpdating(){
	document.getElementById("chall2Pow").textContent = (player.chall2Pow*100).toFixed(2) + "%"
    	document.getElementById("chall3Pow").textContent = shorten(player.chall3Pow*100) + "%"
}

function dimboostBtnUpdating(){
	var shiftRequirement = getShiftRequirement(0);

    	if (getAmount(shiftRequirement.tier) >= shiftRequirement.amount) {
        	document.getElementById("softReset").className = 'storebtn';
    	} else {
        	document.getElementById("softReset").className = 'unavailablebtn';
	}
}

function galaxyBtnUpdating(){
	if (getAmount(inNC(4)||player.pSac!=undefined?6:8) >= getGalaxyRequirement()) {
        	document.getElementById("secondSoftReset").className = 'storebtn';
    	} else {
        	document.getElementById("secondSoftReset").className = 'unavailablebtn';
    	}
}

function newIDDisplayUpdating(){
	document.getElementById("newDimensionButton").style.display = "none"
    	var req = getNewInfReq()
    	if (getEternitied() > 24) {
        	while (req.money.lt(player.money) && !player.infDimensionsUnlocked[7]) {
            		newDimension()
			if (player.infDimBuyers[req.tier-1] && player.currentEternityChall != "eterc8") buyMaxInfDims(req.tier)
			req = getNewInfReq()
		}
	} else if (player.break && player.currentChallenge == "" && !player.infDimensionsUnlocked[7]) {
        	document.getElementById("newDimensionButton").style.display = "inline-block"
        	document.getElementById("newDimensionButton").textContent = "Get " + shortenCosts(req.money) + " antimatter to unlock a new Dimension."
		if (player.money.gte(req.money)) document.getElementById("newDimensionButton").className = "newdim"
        	else document.getElementById("newDimensionButton").className = "newdimlocked"
	}
}

function d8SacDisplay(){
	document.getElementById("sacrifice").setAttribute('ach-tooltip', "Boosts 8th Dimension by " + formatValue(player.options.notation, calcSacrificeBoost(), 2, 2) + "x");
    	document.getElementById("sacrifice").textContent = "Dimensional Sacrifice ("+formatValue(player.options.notation, calcSacrificeBoost(), 2, 2)+"x)"
}

function pSacBtnUpdating(){
	if (canPSac()) {
        	let px = getPxGain()
        	document.getElementById("pSac").style.display = ""
        	document.getElementById("pSac").innerHTML = "Paradox Sacrifice for " + shortenDimensions(px) + " Paradox" + (px.eq(1) ? "." : "es.")
    	} else document.getElementById("pSac").style.display = "none"
}

function galSacBtnUpdating(){
	document.getElementById("sacrificebtn").style.display = "none"
    	if (document.getElementById("gSacrifice").style.display === "inline-block") {
        	document.getElementById("gSacrifice").innerHTML = "Galactic Sacrifice (" + formatValue(player.options.notation, getGSAmount(), 2, 0) + " GP)"
        	document.getElementById("gSacrifice").setAttribute('ach-tooltip', "Gain " + formatValue(player.options.notation, getGSAmount(), 2, 0) + " GP")
		if (getGSAmount().gt(0)) {
            		document.getElementById("gSacrifice").className = "storebtn"
            		document.getElementById("sacrificebtn").style.display = ""
            		var currentGPmin = getGSAmount().dividedBy(player.galacticSacrifice.time/600)
			if (currentGPmin.gt(GPminpeak)) GPminpeak = currentGPmin
			var notationOkay =  (GPminpeak.gt("1e300000")&&player.options.theme!="Aarex's Modifications")||player.options.notation=="Morse code"||player.options.notation=='Spazzy'
			var notation2okay = (GPminpeak.gt("1e3000"  )&&player.options.theme!="Aarex's Modifications")||player.options.notation=="Morse code"||player.options.notation=='Spazzy'
			document.getElementById("sacrificebtn").innerHTML = (notationOkay?"Gain ":"Galactic Sacrifice for ")+shortenDimensions(getGSAmount())+" Galaxy points."+
				(notation2okay?"":"<br>"+shortenMoney(currentGPmin)+" GP/min"+"<br>Peaked at "+shortenMoney(GPminpeak)+" GP/min")
		} else document.getElementById("gSacrifice").className = "unavailablebtn"
	}
}

function IPonCrunchPassiveGain(diff){
    	if (player.timestudy.studies.includes(181)) player.infinityPoints = player.infinityPoints.plus(gainedInfinityPoints().times(diff/1000))
}

function EPonEternityPassiveGain(diff){
	if (tmp.ngp3) {
		if (player.masterystudies.includes("t291")) {
            		player.eternityPoints = player.eternityPoints.plus(gainedEternityPoints().times(diff/1000))
            		document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity points."
		}
	}
}

function ngp3DilationUpdating(){
	let gain = getDilGain()
	if (player.galacticSacrifice !== undefined) player.dilation.bestIP = player.infinityPoints.max(player.dilation.bestIP)
	if (player.masterystudies.includes("t292") && player.dilation.tachyonParticles.lt(gain)) setTachyonParticles(gain)
}

function setTachyonParticles(x) {
	player.dilation.tachyonParticles = new Decimal(x)
	if (!player.dilation.active) player.dilation.totalTachyonParticles = player.dilation.tachyonParticles
	tmp.qu.notrelative = false
	if (player.achievements.includes("ng3p18") || player.achievements.includes("ng3p37")) {
		player.dilation.bestTP = player.dilation.bestTP.max(player.dilation.tachyonParticles)
		player.dilation.bestTPOverGhostifies = player.dilation.bestTPOverGhostifies.max(player.dilation.bestTP)
		document.getElementById('bestTP').textContent="Your best"+(ghostified ? "" : " ever")+" Tachyon particles"+(ghostified ? " in this Ghostify" : "")+" was "+shorten(player.dilation.bestTP)+"."
		setAndMaybeShow('bestTPOverGhostifies',ghostified,'"Your best-ever Tachyon particles was "+shorten(player.dilation.bestTPOverGhostifies)+"."')
	}
}

function passiveQuantumLevelStuff(diff){
	if (tmp.qu.bigRip.active||hasBosonicUpg(24)) tmp.qu.bigRip.spaceShards=tmp.qu.bigRip.spaceShards.add(getSpaceShardsGain().times(diff/1e3))
	if (!tmp.qu.bigRip.active) {
		tmp.qu.quarks=tmp.qu.quarks.add(quarkGain().sqrt().times(diff/10))
                var p=["rg","gb","br"]
                for (var i=0;i<3;i++) {
			var r=tmp.qu.usedQuarks[p[i][0]].min(tmp.qu.usedQuarks[p[i][1]])
			if (player.achievements.includes("ng3p71")) r=r.div(100)
                    	else r=r.sqrt()
			tmp.qu.gluons[p[i]]=tmp.qu.gluons[p[i]].add(r.times(diff/10))
		}
		if (player.ghostify.milestones>15) tmp.qu.quarks=tmp.qu.quarks.add(quarkGain().times(diff/1e3))
	}
	if (tmp.be&&player.ghostify.milestones>14) tmp.qu.breakEternity.eternalMatter=tmp.qu.breakEternity.eternalMatter.add(getEMGain().times(diff/1e3))
	updateQuarkDisplay()
	updateQuantumWorth("quick")
}

function TTpassiveGain(diff){
	if (player.dilation.upgrades.includes(10)) {
		var speed = getPassiveTTGen()
		player.timestudy.theorem += speed * (diff + Math.max(Math.min(player.achievements.includes("ng3p44") ? diff * 9 : 0, 3600 - player.timestudy.theorem / speed), 0)) / 10
    }
}

function thisQuantumTimeUpdating(){
	setAndMaybeShow("quantumClock", tmp.ngp3 ? (quantumed && tmp.qu.times > 1 && speedrunMilestonesReached < 28) : false, '"Quantum time: <b class=\'QKAmount\'>"+timeDisplayShort(tmp.qu.time)+"</b>"')
}

function updateInfinityTimes(){
	if (player.thisInfinityTime < -10) player.thisInfinityTime = Infinity
    	if (player.bestInfinityTime < -10) player.bestInfinityTime = Infinity
}

function infUpgPassiveIPGain(diff){
	if (diff > player.autoTime && !player.break) player.infinityPoints = player.infinityPoints.plus(player.autoIP.times(diff/player.autoTime))
}

function gameLoop(diff) {
	var thisUpdate = new Date().getTime();
	if (thisUpdate - player.lastUpdate >= 21600000) giveAchievement("Don't you dare to sleep")
		if (typeof diff === 'undefined') {
		if (player.options.secrets && player.options.secrets.ghostlyNews) nextGhostlyNewsTickerMsg()
		var diff = Math.min(thisUpdate - player.lastUpdate, 21600000);
	}

	diff = Math.max(diff / 100, 0)
	var diffStat = diff
	if (player.version === 12.2 && typeof player.shameLevel === 'number') diff *= Math.min(Math.pow(10, player.shameLevel), 1)
	if (player.currentEternityChall === "eterc12" || player.pSac !== undefined) diff /= getEC12Mult()

	updateInfinityTimes()
	updateTemp()
	infUpgPassiveIPGain(diff)

	incrementParadoxUpdating(diff)
	checkMatter(diff)
	passiveIPupdating(diff)
	passiveInfinitiesUpdating(diff)
	requiredInfinityUpdating(diff)
	normalChallPowerUpdating(diff)
	passiveIPperMUpdating(diff)
	incrementTimesUpdating(diffStat)
	dimensionButtonDisplayUpdating()
	ghostifyAutomationUpdating()

	if (player.meta) metaDimsUpdating(diff)
	infinityTimeMetaBlackHoleDimUpdating(diff) //production of those dims
	otherDimsUpdating(diff)
	giveBlackHolePowerUpdating(diff)
	freeTickspeedUpdating()
	IPonCrunchPassiveGain(diff)
	EPonEternityPassiveGain(diff)
	TTpassiveGain(diff)

	infDimTabUpdating()
	dimensionPageTabsUpdating()
	bigCrunchButtonUpdating()
	eternityButtonUpdating()
	IRsetsUnlockUpdating()
	nextICUnlockUpdating()

	if (player.break) document.getElementById("iplimit").style.display = "inline"
	else document.getElementById("iplimit").style.display = "none"
	document.getElementById("IPPeakDiv").style.display=(player.break&&player.boughtDims)?"":"none"

	if (tmp.tickUpdate) {
		updateTickspeed()
		tmp.tickUpdate = false
	}
	replicantiIncrease(diff)
	IPMultBuyUpdating()
	doEternityButtonDisplayUpdating(diff)
	doQuantumButtonDisplayUpdating(diff)	
	doGhostifyButtonDisplayUpdating(diff)
	
	updateMoney();
	updateCoinPerSec();

	updateDimensions()
	updateInfCosts()

	updateDilation()

	checkMarathon()
	checkMarathon2()
	checkPain()
	checkSupersanic()
	tickspeedButtonDisplay()
	updateCosts()

	if (player.dilation.studies.includes(1)) player.dilation.dilatedTime = player.dilation.dilatedTime.plus(getDilTimeGainPerSecond().times(diff/10))
	gainDilationGalaxies()

	passiveGPGen(diff)
	paradoxSacDisplay()
	normalSacDisplay()
	galSacDisplay()
	d8SacDisplay()

	document.getElementById("challengesbtn").style.display = player.challenges.includes("challenge1") && !isEmptiness ? "inline-block" : "none"
	document.getElementById("infinitybtn").style.display = (player.infinitied > 0 || player.infinityPoints.gt(0) || player.eternities !== 0 || quantumed) && !isEmptiness ? "inline-block" : "none"

	isEmptinessDisplayChanges()
	DimBoostBulkDisplay()
	document.getElementById("epmult").className = player.eternityPoints.gte(player.epmultCost) ? "eternityupbtn" : "eternityupbtnlocked"

	progressBarUpdating()
	challengeOverallDisplayUpdating()
	chall23PowerUpdating()
	
	pSacBtnUpdating()
	dimboostBtnUpdating()
	galaxyBtnUpdating()  
	newIDDisplayUpdating()
	galSacBtnUpdating()
	if (isNaN(player.totalmoney)) player.totalmoney = new Decimal(10)
	
	if (tmp.ngp3) {
		if (player.dilation.active) ngp3DilationUpdating()
		if (player.ghostify.milestones>7) passiveQuantumLevelStuff(diff)
		if (player.masterystudies.includes('t291')) updateEternityUpgrades() // to fix the 5ep upg display
		if (quantumed) quantumOverallUpdating(diff)
		if (ghostified) {
			if (player.ghostify.wzb.unl) WZBosonsUpdating(diff) //Bosonic Lab
			if (player.ghostify.ghostlyPhotons.unl) ghostlyPhotonsUpdating(diff)//Ghostly Photons
		}
	}

	thisQuantumTimeUpdating()
	var s = shortenDimensions(player.infinityPoints)
	document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+s+"</span> Infinity points."
	document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+s+"</span> Infinity points."

	if (document.getElementById("loadmenu").style.display == "block") changeSaveDesc(metaSave.current, savePlacement)

	player.lastUpdate = thisUpdate;
}

function simulateTime(seconds, real, id) {
    	//the game is simulated at a 50ms update rate, with a max of 1000 ticks
    	//warning: do not call this function with real unless you know what you're doing
    	var ticks = seconds * 20;
    	var bonusDiff = 0;
    	var playerStart = Object.assign({}, player);
    	var storage = {}
    	if (player.blackhole !== undefined) storage.bp = player.blackhole.power
    	if (player.meta !== undefined) storage.ma = player.meta.antimatter
    	if (tmp.ngp3) {
        	storage.dt = player.dilation.dilatedTime
        	storage.ec = tmp.qu.electrons.amount
        	storage.nr = tmp.qu.replicants.amount
        	storage.bAm = tmp.bl.am
    	}
    	if (ticks > 1000 && !real) {
        	bonusDiff = (ticks - 1000) / 20;
        	ticks = 1000;
    	}
    	let ticksDone = 0
    	for (ticksDone=0; ticksDone<ticks; ticksDone++) {
		gameLoop(50+bonusDiff)
        	autoBuyerTick();
	}
    	closeToolTip()
    	var popupString = "While you were away"
    	if (player.money.gt(playerStart.money)) popupString+= ",<br> your antimatter increased "+shortenMoney(player.money.log10() - (playerStart.money).log10())+" orders of magnitude"
    	if (player.infinityPower.gt(playerStart.infinityPower) && !quantumed) popupString+= ",<br> infinity power increased "+shortenMoney(player.infinityPower.log10() - (Decimal.max(playerStart.infinityPower, 1)).log10())+" orders of magnitude"
    	if (player.timeShards.gt(playerStart.timeShards) && !quantumed) popupString+= ",<br> time shards increased "+shortenMoney(player.timeShards.log10() - (Decimal.max(playerStart.timeShards, 1)).log10())+" orders of magnitude"
    	if (storage.dt) if (player.dilation.dilatedTime.gt(storage.dt)) popupString+= ",<br> dilated time increased "+shortenMoney(player.dilation.dilatedTime.log10() - (Decimal.max(storage.dt, 1)).log10())+" orders of magnitude"
    	if (storage.bp) if (player.blackhole.power.gt(storage.bp)) popupString+= ",<br> black hole power increased "+shortenMoney(player.blackhole.power.log10() - (Decimal.max(storage.bp, 1)).log10())+" orders of magnitude"
    	if (storage.ma) if (player.meta.antimatter.gt(storage.ma)) popupString+= ",<br> meta-antimatter increased "+shortenMoney(player.meta.antimatter.log10() - (Decimal.max(storage.ma, 1)).log10())+" orders of magnitude"
    	if (storage.dt) {
        	if (tmp.qu.electrons.amount>storage.ec) popupString+= ",<br> electrons increased by "+getFullExpansion(Math.round(tmp.qu.electrons.amount-storage.ec))
        	if (tmp.qu.replicants.amount.gt(storage.nr)) popupString+= ",<br> normal replicants increased "+shortenMoney(tmp.qu.replicants.amount.log10() - (Decimal.max(storage.nr, 1)).log10())+" orders of magnitude"
    	    if (tmp.bl.am.gt(storage.ma)) popupString+= ",<br> Bosonic Antimatter increased "+shortenMoney(tmp.bl.am.log10() - (Decimal.max(storage.bAm, 1)).log10())+" orders of magnitude"
    	}
    	if (player.infinitied > playerStart.infinitied || player.eternities > playerStart.eternities) popupString+= ","
    	else popupString+= "."
    	if (player.infinitied > playerStart.infinitied) popupString+= "<br>you infinitied "+getFullExpansion(player.infinitied-playerStart.infinitied)+" times."
    	if (player.eternities > playerStart.eternities) popupString+= " <br>you eternitied "+getFullExpansion(player.eternities-playerStart.eternities)+" times."
	if (popupString.length == 20) {
        	popupString = popupString.slice(0, -1);
        	popupString+= "... Nothing happened."
        	if (id == "lair") popupString+= "<br><br>I told you so."
        	giveAchievement("While you were away... Nothing happened.")
	}
    	document.getElementById("offlineprogress").style.display = "block"
    	document.getElementById("offlinePopup").innerHTML = popupString
}

var tickWait = 0
var tickWaitStart = 0
function startInterval() {
	gameLoopIntervalId = setInterval(function() {
		if (player.aarexModifications.performanceTicks && new Date().getTime() - tickWaitStart < tickWait) return
		tickWait = 1/0

		var tickStart = new Date().getTime()
		try {
			gameLoop()
		} catch (e) {
			console.error(e)
		}
		var tickEnd = new Date().getTime()
		var tickDiff = tickEnd - tickStart

		tickWait = tickDiff * (player.aarexModifications.performanceTicks * 2)
		tickWaitStart = tickEnd
	}, player.options.updateRate);
}

function enableChart() {
    	if (document.getElementById("chartOnOff").checked) {
        	player.options.chart.on = true;
        	if (player.options.chart.warning < 1) alert("Warning: the chart can cause performance issues. Please disable it if you're experiencing lag.")
    	} else {
        	player.options.chart.on = false;
    	}
}

function enableChartDips() {
    	if (document.getElementById("chartDipsOnOff").checked) {
        	player.options.chart.dips = true;
    	} else {
        	player.options.chart.dips = false;
    	}
}

function updateChart(first) {
	if (player.options.chart.on === true && first !== true) addData(normalDimChart, "0", getDimensionProductionPerSecond(1))
	setTimeout(updateChart, player.options.chart.updateRate || 1000)
}

var slider = document.getElementById("updaterateslider");
var sliderText = document.getElementById("updaterate");

slider.oninput = function() {
    	player.options.updateRate = parseInt(this.value);
    	sliderText.textContent = "Update rate: " + this.value + "ms"
    	if (player.options.updateRate === 200) giveAchievement("You should download some more RAM")
    	clearInterval(gameLoopIntervalId)
    	startInterval()
}

function dimBoolean() {
    	var req = getShiftRequirement(0)
    	var amount = getAmount(req.tier)
	if (inQC(6)) return false
    	if (!player.autobuyers[9].isOn) return false
    	if (player.autobuyers[9].ticks*100 < player.autobuyers[9].interval) return false
    	if (amount < req.amount) return false
	if (player.aarexModifications.ngmX > 3 && inNC(14)) return false
    	if (getEternitied() < 10 && !player.autobuyers[9].bulkBought && amount < getShiftRequirement(player.autobuyers[9].bulk-1).amount) return false
    	if (player.overXGalaxies <= player.galaxies) return true
    	if (player.autobuyers[9].priority < req.amount && req.tier == ((inNC(4) || player.currentChallenge == "postc1") ? 6 : 8)) return false
    	return true
}


function maxBuyGalaxies(manual) {
	if ((inNC(11) || player.currentEternityChall == "eterc6" || player.currentChallenge == "postc1" || (player.currentChallenge == "postc5" && player.tickspeedBoosts != undefined) || player.currentChallenge == "postc7" || inQC(6)) && !tmp.be) return
	if (player.autobuyers[10].priority > player.galaxies || manual) {
		let amount=getAmount(inNC(4)||player.pSac!=undefined?6:8)
		let increment=0.5
		let toSkip=0
		var check=0
		while (amount >= getGalaxyRequirement(increment*2) && (player.autobuyers[10].priority > player.galaxies + increment*2 || manual)) increment*=2
		while (increment>=1) {
			check=toSkip+increment
			if (amount >= getGalaxyRequirement(check) && (player.autobuyers[10].priority > player.galaxies + check || manual)) toSkip+=increment
			increment/=2
		}
		galaxyReset(toSkip+1)
	}
}

function autoQuantumABTick(){
	if (tmp.qu.autobuyer.mode == "amount") {
            	if (quarkGain().gte(Decimal.round(tmp.qu.autobuyer.limit))) quantum(true, false, 0)
	} else if (tmp.qu.autobuyer.mode == "relative") {
		if (quarkGain().gte(Decimal.round(tmp.qu.autobuyer.limit).times(tmp.qu.last10[0][1]))) quantum(true, false, 0)
        } else if (tmp.qu.autobuyer.mode == "time") {
            	if (tmp.qu.time / 10 >= new Decimal(tmp.qu.autobuyer.limit).toNumber()) quantum(true, false, 0)
        } else if (tmp.qu.autobuyer.mode == "peak") {
            	if (tmp.qu.autobuyer.peakTime >= new Decimal(tmp.qu.autobuyer.limit).toNumber()) quantum(true, false, 0)
        } else if (tmp.qu.autobuyer.mode == "dilation") {
            	if (player.dilation.times >= Math.round(new Decimal(tmp.qu.autobuyer.limit).toNumber())) quantum(true, false, 0)
	}
}

function autoEternityABTick(){
	if (player.autoEterMode === undefined || player.autoEterMode == "amount") {
            	if (gainedEternityPoints().gte(player.eternityBuyer.limit)) eternity(false, true)
        } else if (player.autoEterMode == "time") {
            	if (player.thisEternity / 10 >= new Decimal(player.eternityBuyer.limit).toNumber()) eternity(false, true)
        } else if (player.autoEterMode == "relative") {
            	if (gainedEternityPoints().gte(player.lastTenEternities[0][1].times(player.eternityBuyer.limit))) eternity(false, true)
        } else if (player.autoEterMode == "relativebest") {
            	if (gainedEternityPoints().gte(bestEp.times(player.eternityBuyer.limit))) eternity(false, true)
        } else if (player.autoEterMode == "replicanti") {
            	if (player.replicanti.amount.gte(player.eternityBuyer.limit)) eternity(false, true)
        } else if (player.autoEterMode == "peak") {
            	if (player.peakSpent >= new Decimal(player.eternityBuyer.limit).toNumber()*10 && EPminpeak.gt(0)) eternity(false, true)
        } else if (player.autoEterMode == "eternitied") {
            	var eternitied = getEternitied()
            	if (nG(nA(eternitied, gainEternitiedStat()), nM(eternitied, new Decimal(player.eternityBuyer.limit).toNumber()))) eternity(false, true)
	}
}

function galSacABTick(){
	if (player.autobuyers[12].ticks*100 >= player.autobuyers[12].interval && getGSAmount().gte(player.autobuyers[12].priority) && player.autobuyers[12].isOn) {
            	galacticSacrifice(true);
            	player.autobuyers[12].ticks=0
        }
	player.autobuyers[12].ticks++
}

function galaxyABTick(){
	if (player.autobuyers[10].ticks*100 >= player.autobuyers[10].interval && getAmount(inNC(4)||player.pSac != undefined?6:8) >= getGalaxyRequirement() && (!inNC(14) || !(player.aarexModifications.ngmX > 3))) {
            	if (getEternitied() < 9) {
               		if (player.autobuyers[10].isOn && player.autobuyers[10].priority > player.galaxies) {
				autoS = false;
                    		document.getElementById("secondSoftReset").click()
                    		player.autobuyers[10].ticks = 1;
			}
		} else if (player.autobuyers[10].isOn && (player.autobuyers[10].bulk == 0 || (Math.round(timer * 100))%(Math.round(player.autobuyers[10].bulk * 100)) == 0)){
			maxBuyGalaxies()
		}
	} else player.autobuyers[10].ticks += 1;
}

function TSBoostABTick(){
	if (autoTickspeedBoostBoolean()) {
		tickspeedBoost(player.autobuyers[13].bulk)
            	player.autobuyers[13].ticks = 0
        }
        player.autobuyers[13].ticks += 1;
}

function TDBoostABTick(){
	if (autoTDBoostBoolean()) {
            	tdBoost(1)
            	player.autobuyers[14].ticks = 0
        }
        player.autobuyers[14].ticks += 1;
}

function dimBoostABTick(){
	if (player.autobuyers[9].isOn && dimBoolean()) {
            	if (player.resets < 4) softReset(1)
            	else if (getEternitied() < 10 && !player.autobuyers[9].bulkBought) softReset(player.autobuyers[9].bulk)
            	else if ((Math.round(timer * 100))%(Math.round(player.autobuyers[9].bulk * 100)) == 0 && getAmount(8) >= getShiftRequirement(0).amount) maxBuyDimBoosts()
		player.autobuyers[9].ticks = 0
        }
        player.autobuyers[9].ticks += 1;
}

var timer = 0
function autoBuyerTick() {
	if (tmp.ngp3) if (speedrunMilestonesReached>22&&tmp.qu.autobuyer.enabled&&!tmp.qu.bigRip.active) autoQuantumABTick()

    	if (getEternitied() >= 100 && isEterBuyerOn()) autoEternityABTick()

	if (player.autobuyers[11]%1 !== 0) {
    		if (player.autobuyers[11].ticks*100 >= player.autobuyers[11].interval && player.money.gte(player.currentChallenge == "" ? getLimit() : player.challengeTarget)) {
			if (player.autobuyers[11].isOn) {
				if ((!player.autobuyers[11].requireIPPeak || IPminpeak.gt(gainedInfinityPoints().div(player.thisInfinityTime/600))) && player.autobuyers[11].priority) {
					if (player.autoCrunchMode == "amount") {
                    				if (!player.break || player.currentChallenge != "" || gainedInfinityPoints().gte(player.autobuyers[11].priority)) {
							autoS = false;
							bigCrunch(true)
						}
					} else if (player.autoCrunchMode == "time"){
						if (!player.break || player.currentChallenge != "" || player.thisInfinityTime / 10 >= new Decimal(player.autobuyers[11].priority).toNumber()) {
							autoS = false;
							bigCrunch(true)
						}
					} else if (player.autoCrunchMode == "replicanti"){
						if (!player.break || player.currentChallenge != "" || (player.replicanti.galaxies >= (player.autobuyers[11].priority.toString().toLowerCase()=="max"?player.replicanti.gal:Math.round(new Decimal(player.autobuyers[11].priority).toNumber())) && (!player.autobuyers[11].requireMaxReplicanti || player.replicanti.amount.gte(getReplicantiLimit())))) {
							autoS = false;
							bigCrunch(true)
						}
					} else {
						if (!player.break || player.currentChallenge != "" || gainedInfinityPoints().gte(player.lastTenRuns[0][1].times(player.autobuyers[11].priority))) {
							autoS = false;
							bigCrunch(true)
						}
					}
				}
				player.autobuyers[11].ticks = 1;
			}
		} else player.autobuyers[11].ticks += 1;
	}
	
    	if (player.autobuyers[9]%1 !== 0) dimBoostABTick()
    	if (player.autobuyers[10]%1 !== 0) galaxyABTick()
	if (player.galacticSacrifice) if (player.autobuyers[12]%1 !== 0) galSacABTick()
    	if (player.tickspeedBoosts!=undefined) if (player.autobuyers[13]%1 !== 0) TSBoostABTick()
    	if (player.aarexModifications.ngmX>3) if (player.autobuyers[14]%1 !== 0) TDBoostABTick()


    	if (player.autoSacrifice%1 !== 0) {
        	if ((player.galacticSacrifice!==undefined?player.autoSacrifice.ticks*100>=player.autoSacrifice.interval:true) && calcSacrificeBoost().gte(player.autoSacrifice.priority) && player.autoSacrifice.isOn) {
			sacrifice(true)
			if (player.galacticSacrifice!==undefined) player.autoSacrifice.ticks=0
        	}
        	if (player.galacticSacrifice!==undefined) player.autoSacrifice.ticks++
    	}

    	for (var i=0; i<priority.length; i++) {
        	if (priority[i].ticks*100 >= priority[i].interval || priority[i].interval == 100) {
            		if (priority[i].isOn) {
                		if (priority[i] == player.autobuyers[8]) {
					if (!inNC(14) | player.tickspeedBoosts != undefined) {
						if (priority[i].target == 10) buyMaxTickSpeed()
                        			else buyTickSpeed()
					}
				} else if (canBuyDimension(priority[i].tier)) {
					if (priority[i].target > 10) {
						if (player.options.bulkOn) buyBulkDimension(priority[i].target-10, priority[i].bulk, true)
						else buyBulkDimension(priority[i].target-10, 1, true)
					} else {
						buyOneDimension(priority[i].target)
					}
					if (player.aarexModifications.ngmX>3) buyMaxTimeDimension(priority[i].target%10, priority[i].bulk)
				}
				priority[i].ticks = 0;
			}
		} else priority[i].ticks += 1;
	}
}


setInterval(function() {
    	timer += 0.05
    	if (!player.infinityUpgrades.includes("autoBuyerUpgrade")) autoBuyerTick()
}, 100)

setInterval(function() {
    	if (player.infinityUpgrades.includes("autoBuyerUpgrade")) autoBuyerTick()
}, 50)

document.getElementById("challenge2").onclick = function () {
	startNormalChallenge(2)
}

document.getElementById("challenge3").onclick = function () {
	startNormalChallenge(3)
}

document.getElementById("challenge4").onclick = function () {
	startNormalChallenge(4)
}

document.getElementById("challenge5").onclick = function () {
	startNormalChallenge(5)
}

document.getElementById("challenge6").onclick = function () {
	startNormalChallenge(6)
}

document.getElementById("challenge7").onclick = function () {
	startNormalChallenge(7)
}

document.getElementById("challenge8").onclick = function () {
	startNormalChallenge(8)
}

document.getElementById("challenge9").onclick = function () {
	startNormalChallenge(9)
}

document.getElementById("challenge10").onclick = function () {
	startNormalChallenge(10)
}

document.getElementById("challenge11").onclick = function () {
	startNormalChallenge(11)
}

document.getElementById("challenge12").onclick = function () {
	startNormalChallenge(12)
}

function isEterBuyerOn() {
	if (!player.eternityBuyer.isOn) return
	if (!player.eternityBuyer.ifAD || player.dilation.active) return true
	if (!player.eternityBuyer.dilationMode) return false
	return (player.eternityBuyer.dilMode != "upgrades" && !player.eternityBuyer.slowStopped) || (player.eternityBuyer.dilMode == "upgrades" && player.eternityBuyer.tpUpgraded)
}

function showInfTab(tabName) {
    	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    	var tabs = document.getElementsByClassName('inftab');
    	var tab;
    	for (var i = 0; i < tabs.length; i++) {
       		tab = tabs.item(i);
        	if (tab.id === tabName) {
            		tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
    	player.aarexModifications.tabsSave.tabInfinity = tabName
}

function showStatsTab(tabName) {
    	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    	var tabs = document.getElementsByClassName('statstab');
    	var tab;
    	for (var i = 0; i < tabs.length; i++) {
        	tab = tabs.item(i);
        	if (tab.id === tabName) {
            		tab.style.display = 'block';
        	} else {
            		tab.style.display = 'none';
		}
	}
    	player.aarexModifications.tabsSave.tabStats = tabName
}

function showDimTab(tabName) {
    	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    	var tabs = document.getElementsByClassName('dimtab');
    	var tab;
    	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
    	player.aarexModifications.tabsSave.tabDims = tabName
    	if (document.getElementById("dimensions").style.display !== "none" && player.aarexModifications.progressBar && (tabName === 'antimatterdimensions' || tabName === 'metadimensions')) document.getElementById("progress").style.display = "block"
    	else document.getElementById("progress").style.display = "none"
}

function toggleProgressBar() {
	player.aarexModifications.progressBar=!player.aarexModifications.progressBar
	document.getElementById("progressBarBtn").textContent = (player.aarexModifications.progressBar?"Hide":"Show")+" progress bar"	
}

function showChallengesTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    	var tabs = document.getElementsByClassName('challengeTab');
    	var tab;
    	for (var i = 0; i < tabs.length; i++) {
        	tab = tabs.item(i);
        	if (tab.id === tabName) {
            		tab.style.display = 'block';
        	} else {
            		tab.style.display = 'none';
		}
	}
    	player.aarexModifications.tabsSave.tabChalls = tabName
}

function showEternityTab(tabName, init) {
    	if (tabName=="timestudies"&&player.boughtDims) tabName="ers_"+tabName
    	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    	var tabs = document.getElementsByClassName('eternitytab');
    	var tab;
    	var oldTab
    	for (var i = 0; i < tabs.length; i++) {
        	tab = tabs.item(i);
        	if (tab.style.display == 'block') oldTab = tab.id
        	if (tab.id === tabName) {
            		tab.style.display = 'block';
        	} else {
            		tab.style.display = 'none';
		}
	}
    	if ((tabName === 'timestudies' || tabName === 'ers_timestudies' || tabName === 'masterystudies') && !init) document.getElementById("TTbuttons").style.display = "block"
    	else document.getElementById("TTbuttons").style.display = "none"
    	if (tabName != oldTab) {
        	player.aarexModifications.tabsSave.tabEternity = tabName
        	if (tabName === 'timestudies' || tabName === 'masterystudies' || tabName === 'dilation' || tabName === 'blackhole') resizeCanvas()
        	if (tabName === "dilation") requestAnimationFrame(drawAnimations)
        	if (tabName === "blackhole") requestAnimationFrame(drawBlackhole)
        	if (tabName === "autoEternity" && document.getElementById("eternitystore").style.display === "block") loadAP()
	}
	closeToolTip()
}

function showAchTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    	var tabs = document.getElementsByClassName('achtab');
    	var tab;
    	for (var i = 0; i < tabs.length; i++) {
        	tab = tabs.item(i);
        	if (tab.id === tabName) {
        		tab.style.display = 'block';
        	} else {
            		tab.style.display = 'none';
        	}
    	}
    	player.aarexModifications.tabsSave.tabAchs = tabName
}

function showOptionTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    	var tabs = document.getElementsByClassName('optionstab');
    	var tab;
    	for (var i = 0; i < tabs.length; i++) {
        	tab = tabs.item(i);
        	if (tab.id === tabName) {
            		tab.style.display = 'block';
        	} else {
            		tab.style.display = 'none';
		}
	}
    	player.aarexModifications.tabsSave.tabOptions = tabName
    	closeToolTip()
}

function closeToolTip(showStuck) {
    	var elements = document.getElementsByClassName("popup")
    	for (var i=0; i<elements.length; i++) if (elements[i].id!='welcome') elements[i].style.display = "none"
	if (showStuck && !game_loaded) showStuckPopup()
}

var game_loaded
function initGame() {
	//Setup stuff.
	initiateMetaSave()
	migrateOldSaves()
	updateNewPlayer()
	setupHTMLAndData()
	localStorage.setItem(metaSaveId, btoa(JSON.stringify(metaSave)))

	//Load a save.
	load_game(false, true)
	game_loaded=true

	//show one tab during init or they'll all start hidden
	let tabsSaveData=player.aarexModifications.tabsSave
	let tabsSave=tabsSaveData&&tabsSaveData.on
	showTab((tabsSave&&tabsSaveData.tabMain)||"dimensions",true)
	showOptionTab((tabsSave&&tabsSaveData.tabOptions)||"saving")
	if (player.aarexModifications.progressBar&&document.getElementById("dimensions").style.display!="none") document.getElementById("progress").style.display = "block"
	else document.getElementById("progress").style.display = "none"
	tmp.tickUpdate = true
	updateAutobuyers()
	updateChallengeTimes()
	window.addEventListener("resize", resizeCanvas);

	//On load
	updateChart(true)
	setTimeout(function(){
		document.getElementById("container").style.display = "block"
		document.getElementById("loading").style.display = "none"
	},1000)
	clearInterval(stuckTimeout)

    //Check for Expert Mode
    checkForExpertMode()
}

window.addEventListener('keydown', function(event) {
    if (keySequence == 0 && event.keyCode == 38) {
        keySequence++
    } else if (keySequence == 1 && event.keyCode == 38) {
        keySequence++
    } else if (keySequence == 2 && event.keyCode == 40) {
        keySequence++
    } else if (keySequence == 3 && event.keyCode == 40) {
        keySequence++
    } else if (keySequence == 4 && event.keyCode == 37) {
        keySequence++
    } else if (keySequence == 5 && event.keyCode == 39) {
        keySequence++
    } else if (keySequence == 6 && event.keyCode == 37) {
        keySequence++
    } else if (keySequence == 7 && event.keyCode == 39) {
        keySequence++
    } else if (keySequence == 8 && event.keyCode == 66) {
        keySequence++
    } else if (keySequence == 9 && event.keyCode == 65) {
        giveAchievement("30 Lives")
    } else {
        keySequence = 0;
    }
    if (keySequence2 == 0 && event.keyCode == 49) {
        keySequence2++
    } else if (keySequence2 == 1 && event.keyCode == 55) {
        keySequence2++
    } else if (keySequence2 == 2 && event.keyCode == 55) {
        keySequence2++
    } else if (keySequence2 == 3 && event.keyCode == 54) {
        if (!tmp.ngp3l) giveAchievement("Revolution, when?")
    } else {
        keySequence2 = 0
    }
    if (event.keyCode == 17) controlDown = true;
    if (event.keyCode == 16) {
        shiftDown = true;
        drawStudyTree()
        drawMasteryTree()
    }
    if ((controlDown && shiftDown && (event.keyCode == 67 || event.keyCode == 73 || event.keyCode == 74)) || event.keyCode == 123) {
        giveAchievement("Stop right there criminal scum!")
    }
}, false);

window.addEventListener('keyup', function(event) {
    	if (event.keyCode == 17) controlDown = false;
    	if (event.keyCode == 16) {
        	shiftDown = false;
        	drawStudyTree()
        	drawMasteryTree()
    	}
}, false);

window.onfocus = function() {
    	controlDown = false;
    	shiftDown = false;
    	drawStudyTree()
    	drawMasteryTree()
}

window.addEventListener('keydown', function(event) {
	if (!player.options.hotkeys || controlDown === true || document.activeElement.type === "text" || document.activeElement.type === "number" || onImport) return false
	const key = event.keyCode;
	if (key >= 49 && key <= 56) {
		if (shiftDown) buyOneDimension(key-48)
		else buyManyDimension(key-48)
		return false;
	} else if (key >= 97 && key <= 104) {
		if (shiftDown) buyOneDimension(key-96)
		else buyManyDimension(key-96)
		return false;
	}
	switch (key) {
		case 65: // A
			toggleAutoBuyers();
		break;

		case 66: // B
			if (player.achievements.includes("ng3p51")) bigRip()
			else if (player.tickspeedBoosts != undefined) manualTickspeedBoost()
		break;

		case 68: // D
			if (shiftDown && player.achievements.includes("ngpp11")) metaBoost()
			else if (player.achievements.includes("r136")) startDilatedEternity(false, true)
			else document.getElementById("softReset").onclick()
		break;

		case 71: // G
			if (player.achievements.includes("ng3p51")) ghostify()
			else document.getElementById("secondSoftReset").onclick()
		break;

		case 77: // M
			if (ndAutobuyersUsed<9||!player.challenges.includes("postc8")) document.getElementById("maxall").onclick()
			if (player.dilation.studies.includes(6)) {
				var maxmeta=true
				for (d=1;d<9;d++) {
					if (player.autoEterOptions["meta"+d]) {
						if (d>7&&speedrunMilestonesReached<28) maxmeta=false
					} else break
				}
				if (maxmeta) document.getElementById("metaMaxAll").onclick()
			}
		break;

		case 83: // S
			document.getElementById("sacrifice").onclick()
		break;

		case 84: // T
			if (shiftDown) buyTickSpeed()
			else buyMaxTickSpeed()
		break;

		case 85: // U
			if (tmp.ngp3) unstableAll()
		break;

		case 82: //R
			replicantiGalaxy()
		break;
	}
}, false);

  window.addEventListener('keyup', function(event) {
    if (event.keyCode === 70) {
        $.notify("Paying respects", "info")
        giveAchievement("It pays to have respect")
    }
	if (!tmp.ngp3l && Math.random() <= 1e-6) giveAchievement("keyboard broke?")
    if (!player.options.hotkeys || controlDown === true || document.activeElement.type === "text") return false
    switch (event.keyCode) {
        case 67: // C
            bigCrunch()
        break;

        case 69: // E, also, nice.
        document.getElementById("eternitybtn").onclick();
        break;
	
        case 81: // Q, for quantum.
        if (player.meta) quantum(false,false,0)
        break;
    }
  }, false);


function getUnspentBonus() {
	x = player.infinityPoints
	if (player.galacticSacrifice) return x.pow(Math.max(Math.min(Math.pow(x.max(1).log(10), 1 / 3) * 3, 8), 1)).plus(1);
	else return x.dividedBy(2).pow(1.5).plus(1)
}

var totalMult = 1
var currentMult = 1
var infinitiedMult = 1
var achievementMult = 1
var unspentBonus = 1
var mult18 = 1
var ec10bonus = new Decimal(1)
var QC4Reward
function updatePowers() {
	totalMult = Math.pow(player.totalmoney.e+1, player.galacticSacrifice?2:0.5)
	currentMult = Math.pow(player.money.e+1, player.galacticSacrifice?2:0.5)
	infinitiedMult = getInfinitiedMult()
	achievementMult = Math.max(Math.pow((player.achievements.length-(player.galacticSacrifice?10:30)-getSecretAchAmount()), player.galacticSacrifice?5:3)/40,1)
	unspentBonus = getUnspentBonus()
	if (player.boughtDims) mult18 = getDimensionFinalMultiplier(1).max(1).times(getDimensionFinalMultiplier(8).max(1)).pow(0.02)
	else mult18 = getDimensionFinalMultiplier(1).times(getDimensionFinalMultiplier(8)).pow(0.02)
	if (player.currentEternityChall == "eterc10" || inQC(6)) {
		ec10bonus = Decimal.pow(getInfinitied(), 1e3).max(1)
		if (player.timestudy.studies.includes(31)) ec10bonus = ec10bonus.pow(4)
	} else {
		ec10bonus = new Decimal(1)
	}
}
var updatePowerInt
function resetUP() {
	clearInterval(updatePowerInt)
	updatePowers()
	updateTemp()
	mult18 = 1
	updatePowerInt = setInterval(updatePowers, 100)
}

function switchDecimalMode() {
	if (confirm('You will change this option to '+(player.aarexModifications.breakInfinity?'logarithmica_numerus_lite':'break_infinity.min')+'.js. This requires a game reload. Are you sure you want to do that?')) {
		player.aarexModifications.breakInfinity = !player.aarexModifications.breakInfinity
		if (player.aarexModifications.breakInfinity && !player.aarexModifications.performanceTicks && confirm("WARNING: This will probably make this game laggy without Performance Ticks! Do you want to turn on Performance Ticks?")) player.aarexModifications.performanceTicks = true
		save_game(true)
		document.location.reload(true)
	}
}

