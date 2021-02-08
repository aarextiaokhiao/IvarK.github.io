function dimShiftDisplay(){
	var shiftRequirement = getShiftRequirement(0);
	var isShift = getMaxUnlockableDimensions() < (haveSixDimensions() ? 6 : 8)
	getEl("resetLabel").textContent = 'Dimension ' + (isShift ? "Shift" : player.resets < getSupersonicStart() ? "Boost" : "Supersonic") + ' ('+ getFullExpansion(Math.ceil(player.resets)) +'): requires ' + getFullExpansion(Math.ceil(shiftRequirement.amount)) + " " + DISPLAY_NAMES[shiftRequirement.tier] + " Dimensions"
	getEl("softReset").textContent = "Reset the game for a " + (isShift ? "new Dimension" : "Boost")
}

function tickspeedBoostDisplay(){
	if (isTickspeedBoostPossible()) {
		var tickReq = getTickspeedBoostRequirement()
		getEl("tickReset").style.display = ""
		getEl("tickResetLabel").textContent = "Tickspeed Boost (" + getFullExpansion(player.tickspeedBoosts) + "): requires " + getFullExpansion(tickReq.amount) + " " + DISPLAY_NAMES[tickReq.tier] + " Dimensions"
		getEl("tickResetBtn").className = getAmount(tickReq.tier) < tickReq.amount ? "unavailablebtn" : "storebtn"
	} else getEl("tickReset").style.display = "none"
}

function galaxyReqDisplay(){
	var nextGal = getGalaxyRequirement(0, true)
	var totalReplGalaxies = getTotalRG()
	var totalTypes = tmp.aeg ? 4 : player.dilation.freeGalaxies ? 3 : totalReplGalaxies ? 2 : 1
	getEl("secondResetLabel").innerHTML = getGalaxyScaleName(nextGal.scaling) + (nextGal.scaling <= 3 ? "Antimatter " : "") + ' Galaxies ('+ getFullExpansion(player.galaxies) + (totalTypes > 1 ? ' + ' + getFullExpansion(totalReplGalaxies) : '') + (totalTypes > 2 ? ' + ' + getFullExpansion(Math.round(player.dilation.freeGalaxies)) : '') + (totalTypes > 3 ? ' + ' + getFullExpansion(tmp.aeg) : '') +'): requires ' + getFullExpansion(nextGal.amount) + ' '+DISPLAY_NAMES[inNC(4) || player.pSac != undefined ? 6 : 8]+' Dimensions'
}

var galaxyScalings = ["", "Distant ", "Further ", "Remote ", "Dark Matter ", "Ghostly ", "Ethereal ", "Ethereal+ ", "Ethereal++ ", "Ethereal IV ", "Ethereal V "]
function getGalaxyScaleName(x) {
	return galaxyScalings[x]
}

function intergalacticDisplay(){
	if (hasAch("ng3p27") && getShiftRequirement(0).tier == 8) {
		getEl("intergalacticLabel").parentElement.style.display = ""
		let extra = Decimal.sub(tmp.igg, player.galaxies)
		let nanopart = 1
		if (isNanoEffectUsed("dil_effect_exp")) nanopart = tmp.nf.effects["dil_effect_exp"] || 1
		getEl("intergalacticLabel").innerHTML = 
			getGalaxyScaleName(tmp.igs) + 'Intergalactic Boost ' + 
			(player.dilation.active || inNGM(2) ? " (estimated)" : "") +
			" (" + getFullExpansion(player.galaxies) + (extra.gt(0) ? " + " + 
			getFullExpansion(extra.lt(1e12) ? Math.floor(extra.round().toNumber()) : extra) : "") + "): " + 
			shorten(dilates(tmp.ig).pow(player.dilation.active ? nanopart : 1)) + 
			'x to Eighth Dimensions'
	} else getEl("intergalacticLabel").parentElement.style.display = "none"
}

function dimensionTabDisplay(){
	var shown
	for (let tier = 8; tier > 0; tier--) {
		shown = shown || canBuyDimension(tier)
		var name = TIER_NAMES[tier];
		if (shown) {
			getEl(tier + "Row").style.display = ""
			getEl("D" + tier).childNodes[0].nodeValue = DISPLAY_NAMES[tier] + " Dimension x" + formatValue(player.options.notation, getDimensionFinalMultiplier(tier), 2, 1)
			getEl("A" + tier).textContent = getDimensionDescription(tier)
		}
	}
	setAndMaybeShow("mp10d", tmp.mod.newGameMult, "'Multiplier per 10 Dimensions: '+shorten(getDimensionPowerMultiplier(\"non-random\"))+'x'")
	dimShiftDisplay()
	tickspeedBoostDisplay()
	galaxyReqDisplay()
	intergalacticDisplay()
}

function tickspeedDisplay(){
	if (canBuyDimension(3) || player.currentEternityChall == "eterc9") {
		let mult = tmp.tsReduce
		let multNum = mult.toNumber()
		let labels = []
		let e = Math.floor(Math.log10(Math.round(1/multNum)))

		var label
		if (isNaN(multNum)) label = 'break the tick interval by Infinite';
		else if (e >= 9) label = "divide the tick interval by " + shortenDimensions(Decimal.recip(mult))
		else if (multNum > .9) label = 'reduce the tick interval by ' + shorten((1 - multNum) * 100) + '%'
		else label = 'reduce the tick interval by ' + ((1 - multNum) * 100).toFixed(e) + '%'
		if (tmp.galRed < 1) label += " (Redshifted galaxies by " + (100 - 100 * tmp.galRed).toFixed(1) + "%)"
		if (tmp.galRed > 1) label += " (Blueshifted galaxies by " + (100 * tmp.galRed - 100).toFixed(1) + "%)"
		labels.push(label)

		if (inNGM(2) || player.currentChallenge == "postc3" || player.challenges.includes("postc3") || inQC(6)) {
			let ic3 = getPostC3Mult()
			labels.push("multiply all Dimensions by " + (ic3 > 999.95 ? shorten(ic3) : new Decimal(ic3).toNumber().toPrecision(4)) + "x")
		}

		getEl("tickLabel").innerHTML = wordizeList(labels, true) + "."

		getEl("tickSpeed").style.visibility = "visible";
		getEl("tickSpeedMax").style.visibility = "visible";
		getEl("tickLabel").style.visibility = "visible";
		getEl("tickSpeedAmount").style.visibility = "visible";
	} else {
		getEl("tickSpeed").style.visibility = "hidden";
		getEl("tickSpeedMax").style.visibility = "hidden";
		getEl("tickLabel").style.visibility = "hidden";
		getEl("tickSpeedAmount").style.visibility = "hidden";
	}
}

function paradoxDimDisplay(){
	getEl("pPow").textContent = shortenMoney(player.pSac.dims.power)
	getEl("pPowProduction").textContent = "You are getting " + shortenDimensions(getPDProduction(1).div(getEC12Mult()).times(getPDAcceleration())) + " Paradox Power per real-life second."
	getEl("pPowEffect").textContent = shorten(getPDAcceleration())
	var shown
	for (let t = 8; t > 0; t--) {
		shown = shown || isDimUnlocked(t)
		getEl("pR"+t).style.display = shown ? "" : "none"
		if (shown) {
			getEl("pD"+t).textContent = DISPLAY_NAMES[t] + " Paradox Dimension x" + shortenMoney(getPDPower(t))
			getEl("pB"+t).textContent = "Cost: " + shortenDimensions(player.pSac.dims[t].cost) + " Px"
			getEl("pB"+t).className = (player.pSac.px.gte(player.pSac.dims[t].cost) ? "stor" : "unavailabl") + "ebtn"
			getEl("pA"+t).textContent = getPDDesc(t)
		}
	}
}

function mainStatsDisplay(){
	getEl("totalmoney").textContent = 'You have made a total of ' + shortenMoney(player.totalmoney) + ' antimatter.'
	getEl("totalresets").textContent = 'You have performed ' + getFullExpansion(player.resets) + ' Dimension Boosts/Shifts.'
	setAndMaybeShow("lostResets", player.pSac && player.pSac.lostResets, '"You have lost a total of " + getFullExpansion(player.pSac.lostResets) + " Dimension Boosts/Shifts after matter resets."')
	getEl("tdboosts").textContent = tmp.mod.ngmX > 3 ? 'You have performed ' + getFullExpansion(player.tdBoosts) + ' Time Dimension Boosts/Shifts.':""
	var showBoosts=isTickspeedBoostPossible()
	getEl("boosts").style.display = showBoosts ? '' : 'none'
	if (showBoosts) getEl("boosts").textContent = 'You have performed '+getFullExpansion(player.tickspeedBoosts)+' Tickspeed Boosts.'
	getEl("galaxies").textContent = 'You have ' + getFullExpansion(player.galaxies) + ' Antimatter Galaxies.'
	var showCancer = player.spreadingCancer > 0 && inNGM(2)
	getEl("spreadingCancer").style.display = showCancer ? '' : 'none'
	if (showCancer) getEl("spreadingCancer").textContent = 'You have made '+getFullExpansion(player.spreadingCancer)+' total galaxies while using Cancer notation.'
	getEl("totalTime").textContent = "You have played for " + timeDisplay(player.totalTimePlayed) + "."
}

function paradoxSacDisplay(){
	if (player.pSac && player.pSac.times) {
		getEl("psStatistics").style.display = ""
		getEl("pSacrificedNormal").textContent = "You have Paradox Sacrificed " + getFullExpansion(player.pSac.normalTimes) + " times."
		getEl("pSacrificedForced").textContent = "You have been forced to do a Paradox Sacrifice " + getFullExpansion(player.pSac.forcedTimes) + " times."
		getEl("pSacrificed").textContent = "You have Paradox Sacrificed a total of " + getFullExpansion(player.pSac.times) + " times."
		getEl("thisPSac").textContent = "You have spent " + timeDisplay(player.pSac.time) + " in this Paradox Sacrifice."
	} else getEl("psStatistics").style.display = "none"
}

function galaxySacDisplay(){
	if (inNGM(2) ? player.galacticSacrifice.times < 1 : true) getEl("gsStatistics").style.display = "none"
	else {
		getEl("gsStatistics").style.display = ""
		getEl("sacrificed").textContent = "You have Galactic Sacrificed "+getFullExpansion(player.galacticSacrifice.times) + " times."
		getEl("thisSacrifice").textContent = "You have spent " + timeDisplay(player.galacticSacrifice.time) + " in this Galactic Sacrifice."
	}
}

function bestInfinityDisplay(){
	getEl("infinityStatistics").style.display = "none"
	if (!ph.shown("infinity")) {
		getEl("bestInfinity").textContent = ""
		getEl("thisInfinity").textContent = ""
		getEl("infinitied").textContent = ""
	} else {
		getEl("infinityStatistics").style.display = ""
		getEl("bestInfinity").textContent = "Your fastest Infinity is in " + timeDisplay(player.bestInfinityTime) + "."
		getEl("thisInfinity").textContent = "You have spent " + timeDisplay(player.thisInfinityTime) + " in this Infinity."
		getEl("infinitied").textContent = "You have Infinitied " + getFullExpansion(player.infinitied) + " time" + (player.infinitied == 1 ? "" : "s") + (player.eternities!==0||player.eternitiesBank>0 ? " this Eternity." : ".")
	}
	if (ph.shown("infinity") && player.infinitiedBank > 0) getEl("infinityStatistics").style.display = ""
}

function bestEternityDisplay(){
	if (ph.shown("eternity")) {
		getEl("eternityStatistics").style.display = ""
		if (player.bestEternity >= 9999999999) {
			getEl("besteternity").textContent = ""
		} else getEl("besteternity").textContent = "Your fastest Eternity is in "+timeDisplay(player.bestEternity)+"."
		getEl("thiseternity").textContent = "You have spent " + timeDisplay(player.thisEternity) + " in this Eternity."
		getEl("eternitied").textContent = "You have Eternitied " + getFullExpansion(player.eternities) + " time" + (player.eternities == 1 ? "" : "s") + (ph.did("quantum") ? " this Quantum." : ".")
	} else getEl("eternityStatistics").style.display = "none"
}

function bestQuantumDisplay(){
	if (!ph.shown("quantum")) getEl("quantumStatistics").style.display = "none"
	else {
		getEl("quantumStatistics").style.display = ""
		getEl("quantumed").textContent = "You have gone Quantum " + getFullExpansion(tmp.qu.times) + " times."
		getEl("thisQuantum").textContent = "You have spent " + timeDisplay(tmp.qu.time) + " in this Quantum."
		getEl("bestQuantum").textContent = "Your fastest Quantum is in " + timeDisplay(tmp.qu.best) + "."
	}
}

function bestGhostifyDisplay(){
	if (!ph.shown("ghostify")) getEl("ghostifyStatistics").style.display = "none"
	else {
		getEl("ghostifyStatistics").style.display = ""
		getEl("ghostified").textContent = "You have became a ghost and passed Big Ripped universes " + getFullExpansion(player.ghostify.times) + " times."
		getEl("thisGhostify").textContent = "You have spent " + timeDisplay(player.ghostify.time) + (hasBosonicUpg(64) ? " (+" + timeDisplayShort(tmp.blu[64].gh) + ")" : "") + " in this Ghostify."
		getEl("bestGhostify").textContent = "Your fastest Ghostify is in " + timeDisplay(player.ghostify.best) + "."
	}
}

function ng3p51Display(){
	if (!hasAch("ng3p51"))  getEl("bigRipStatistics").style.display = "none"
	else {
		getEl("bigRipStatistics").style.display = ""
		setAndMaybeShow("bigRipped", tmp.qu.bigRip.times, '"You have big ripped the universe " + getFullExpansion(tmp.qu.bigRip.times) + " times."')
		setAndMaybeShow("bestmoneythisrip", tmp.qu.bigRip.active, "'Your best antimatter for this Big Rip is ' + shortenMoney(tmp.qu.bigRip.bestThisRun) + '.'")
		getEl("totalmoneybigrip").textContent = 'You have made a total of ' + shortenMoney(tmp.qu.bigRip.totalAntimatter) + ' antimatter in all big rips.'
		getEl("bestgalsbigrip").textContent = 'Your best amount of normal galaxies for all Big Rips is ' + getFullExpansion(tmp.qu.bigRip.bestGals) + "."
	}
}

function dilationStatsDisplay(){
	if (player.dilation.times) getEl("dilated").textContent = "You have succesfully dilated "+getFullExpansion(player.dilation.times)+" times."
	else getEl("dilated").textContent = ""

	if (player.exdilation == undefined ? false : player.exdilation.times > 1) getEl("exdilated").textContent = "You have reversed Dilation " + getFullExpansion(player.exdilation.times) + " times."
	else getEl("exdilated").textContent = ""
}

function scienceNumberDisplay(){
	var scale1 = [2.82e-45,1e-42,7.23e-30,5e-21,9e-17,6.2e-11,5e-8,3.555e-6,7.5e-4,1,2.5e3,2.6006e6,3.3e8,5e12,4.5e17,1.08e21,1.53e24,1.41e27,5e32,8e36,1.7e45,1.7e48,3.3e55,3.3e61,5e68,1e73,3.4e80,1e113,Number.MAX_VALUE,new Decimal("1e65000")];
	var scale2 = [" protons."," nucleui."," Hydrogen atoms."," viruses."," red blood cells."," grains of sand."," grains of rice."," teaspoons."," wine bottles."," fridge-freezers."," Olympic-sized swimming pools."," Great Pyramids of Giza."," Great Walls of China."," large asteroids.",
		      " dwarf planets."," Earths."," Jupiters."," Suns."," red giants."," hypergiant stars."," nebulas."," Oort clouds."," Local Bubbles."," galaxies."," Local Groups."," Sculptor Voids."," observable universes."," Dimensions.", " Infinity Dimensions.", " Time Dimensions."];
	var id = 0;
	if (player.money.times(4.22419).gt(2.82e60)) {
		if (player.money.times(4.22419e-105).gt(scale1[scale1.length - 1])) id = scale1.length - 1;
		else {
			while (player.money.times(4.22419e-105).gt(scale1[id])) id++;
			if (id > 0) id--;
		}
		if (id >= 7 && id < 11) getEl("infoScale").textContent = "If every antimatter were a planck volume, you would have enough to fill " + formatValue(player.options.notation, player.money * 4.22419e-105 / scale1[id], 2, 1) + scale2[id];
		else getEl("infoScale").textContent = "If every antimatter were a planck volume, you would have enough to make " + formatValue(player.options.notation, player.money.times(4.22419e-105).dividedBy(scale1[id]), 2, 1) + scale2[id];
	} else { //does this part work correctly? i doubt it does
		if (player.money.lt(2.82e9)) getEl("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation, 2.82e9 / player.money, 2, 1) + " attometers cubed, you would have enough to make a proton."
		else if (player.money.lt(2.82e18)) getEl("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation, 2.82e18 / player.money, 2, 1) + " zeptometers cubed, you would have enough to make a proton."
		else if (player.money.lt(2.82e27)) getEl("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation, 2.82e27 / player.money, 2, 1) + " yoctometers cubed, you would have enough to make a proton."
		else getEl("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation, (2.82e-45 / 4.22419e-105 / player.money), 2, 1) + " planck volumes, you would have enough to make a proton."
	}
}

function infinityRespecedInfinityDisplay(){
	if (setUnlocks.length > player.setsUnlocked) getEl("nextset").textContent = "Next set unlocks at " + formatValue(player.options.notation, setUnlocks[player.setsUnlocked], 2, 0, true) + "."
	getEl("infi1pow").textContent = getFullExpansion(player.infinityUpgradesRespecced[1] * 10)
	getEl("infi1cost").textContent = shortenCosts(Decimal.pow(10, player.infinityUpgradesRespecced[1]))
	getEl("infi1").className = player.infinityPoints.lt(Decimal.pow(10, player.infinityUpgradesRespecced[1])) ? "infinistorebtnlocked" : "infinimultbtn"
	getEl("infi3pow").textContent = formatValue(player.options.notation, getLimit(), 2, 0, true)
	getEl("infi3cost").textContent = shortenCosts(Decimal.pow(10, player.infinityUpgradesRespecced[3]))
	getEl("infi3").className = player.infinityPoints.lt(Decimal.pow(10, player.infinityUpgradesRespecced[3])) ? "infinistorebtnlocked" : "infinimultbtn"
}

function infinityUpgradesDisplay(){
	for (let x = 1; x <= 4; x++) {
		for (let y = 1; y <= 4; y++) {
			let id = x * 10 + y
			let upgId = INF_UPGS.normal.ids[id]
			getEl("infi" + id).className = "infinistorebtn" + (player.infinityUpgrades.includes(upgId) ? "bought" : INF_UPGS.normal.can(id) ? y : "locked")
		}
	}
	
	let infiCol1And2Middle = tmp.ngC ? " and Tickspeed " : ""

	getEl("infi11desc").innerHTML = "Normal Dimensions gain a multiplier based on time played" + (tmp.ngC ? " and antimatter" : "") + "<br>Currently: " + shorten(infUpg11Pow()) + "x"
	getEl("infi12desc").innerHTML = "First and Eighth Dimensions" + infiCol1And2Middle + " gain a multiplier based on your Infinities<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x"
	getEl("infi13desc").innerHTML = "Third and Sixth Dimensions" + infiCol1And2Middle + " gain a multiplier based on your Infinities<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x"
	getEl("infi22desc").innerHTML = "Second and Seventh Dimensions" + infiCol1And2Middle + " gain a multiplier based on your Infinities<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x"
	getEl("infi23desc").innerHTML = "Fourth and Fifth Dimensions" + infiCol1And2Middle + " gain a multiplier based on your Infinities<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x"
	getEl("infi31desc").innerHTML = "Normal Dimensions gain a multiplier based on time spent in this Infinity" + (tmp.ngC ? " and total antimatter" : "") + "<br>Currently: " + shorten(infUpg13Pow()) + "x"
	var infi32middle = player.infinityPoints.lt(Decimal.pow(10, 1e10)) ? " <br> Currently: " + formatValue(player.options.notation, getUnspentBonus(), 2, 2) + "x" : ""
	getEl("infi32desc").innerHTML = "1st Dimension gets a multiplier based on unspent IP " + infi32middle
}

function preBreakUpgradeDisplay(){
	if (canBuyIPMult()) getEl("infiMult").className = "infinimultbtn"
	else getEl("infiMult").className = "infinistorebtnlocked"
	var infiMultEnding = player.infinityPoints.lt(Decimal.pow(10, 1e10)) ? "<br>Currently: " + shorten(getIPMult()) + "x<br>Cost: " + shortenCosts(player.infMultCost) + " IP" : ""
	getEl("infiMult").innerHTML = "You get " + (Math.round(getIPMultPower() * 100) / 100) + "x more IP." + infiMultEnding
	getEl("nextset").textContent = ""
	if (player.infinityUpgradesRespecced != undefined) {
		infinityRespecedInfinityDisplay()
	} else {
		infinityUpgradesDisplay()
		let based = []
		if (inNGM(2)) based.push("Infinities")
		if (tmp.ngC) based.push("your antimatter")
		if (based.length > 0) {
			var base = getMPTPreInfBase()
			getEl("infi21desc").innerHTML = "Increase the multiplier for buying 10 Dimensions based on " + wordizeList(based) + "<br>" + base + "x -> "+(infUpg12Pow() * base).toPrecision(4) + "x"
		}

		if (inNGM(2)) getEl("infi33desc").innerHTML = "Dimension Boosts are stronger based on Infinity Points<br>Currently: " + (1.2 + 0.05 * player.infinityPoints.max(1).log(10)).toFixed(2) + "x"

		var infi34Middle = player.infinityPoints.lt(Decimal.pow(10, 1e10)) ? "<br>Currently: " + shortenDimensions(getIPMult()) + " every " + timeDisplay(player.bestInfinityTime * 10) : ""
		getEl("infi34desc").innerHTML = "Generate IP based on your fastest Infinity " + infi34Middle
	}
	getEl("lockedset1").style.display = "none"
	if (player.setsUnlocked > 0) {
		getEl("lockedset1").style.display = ""
		for (let u = 4; u < 7; u++) {
			getEl("infi" + u + "pow").textContent = u == 5 ? getInfUpgPow(5).toFixed(2) : getFullExpansion(getInfUpgPow(u))
			getEl("infi" + u + "cost").textContent = shortenCosts(Decimal.pow(10, player.infinityUpgradesRespecced[u] + powAdds[u]))
			getEl("infi" + u).className = player.infinityPoints.lt(Decimal.pow(10, player.infinityUpgradesRespecced[u] + powAdds[u])) ? "infinistorebtnlocked" : "infinimultbtn"
		}	
	}
}

function eventsTimeDisplay(years, thisYear){
	var bc = years - thisYear + 1
	var since
	var sinceYears
	var dates = [5.332e6, 3.5e6,  2.58e6, 7.81e5, 3.15e5, 
		     2.5e5,   1.95e5, 1.6e5,  1.25e5, 7e4, 
		     6.7e4,   5e4,   4.5e4,  4e4,   3.5e4, 
		     3.3e4,   3.1e4,  2.9e4,  2.8e4,  2e4, 
		     1.6e4,   1.5e4,  1.4e4,  11600, 1e4,
		     8e3,    6e3,   5e3,   4e3,   3200,
		     3000,   2600,  2500,  2300,  1800,
		     1400,   1175,  800,   753,   653,
		     539,    356,   200,   4,     0]
	var events = ["start of Pliocene epoch", "birthdate of Lucy (typical Australopithicus afarensis female)", "Quaternary period", "Calabrian age", "Homo sapiens",
		      "Homo neanderthalensis", "emergence of anatomically modern humans", "Homo sapiens idaltu", "peak of Eemian interglacial period", "earliest abstract/symbolic art",
		      "Upper Paleolithic", "Late Stone Age", "European early modern humans", "first human settlement", "oldest known figurative art",
		      "oldest known domesticated dog", "Last Glacial Maximum", "oldest ovens", "oldest known twisted rope", "oldest human permanent settlement (hamlet considering built of rocks and of mammoth bones)",
		      "rise of Kerberan culture", "colonization of North America", "domestication of the pig", "prehistoric warfare", "Holocene",
		      "death of other human breeds", "agricultural revolution", "farmers arrived in Europe", "first metal tools", "first horse",
		      "Sumerian cuneiform writing system", "union of Egypt", "rise of Maya", "extinct of mammoths", "rise of Akkadian Empire",
		      "first alphabetic writing", "rise of Olmec civilization", "end of bronze age", "rise of Greek city-states", "rise of Rome",
		      "rise of Persian Empire", "fall of Babylonian Empire", "birth of Alexander the Great", "first paper", "birth of Jesus Christ"]
	/*
	"the homo sapiens" is weird, as is "the homo neanderthaliensis" and "the homo sapiens idaltu"
	*/
	var index = 0
	for (var i = 0; i < dates.length; i++){
		if (bc > dates[i]) {
			index = i
			break
		}
	} // dates[index] < bc <= dates[index-1] 
	if (index > 0) { //bc is less than or equal to 5.332e6 (5332e3)
		since = events[index - 1]
		sinceYears = bc - dates[index]
	}
	var message = "<br>If you wanted to finish writing out your full antimatter amount at a rate of 3 digits per second, you would need to start it in " 
	message += getFullExpansion(Math.floor(bc)) + " BC." + (since ? "<br>This is around " + getFullExpansion(Math.ceil(sinceYears)) + " years before the " + since + "." : "")
	getEl("infoScale").innerHTML = message
}

function universesTimeDisplay(years){
	var message = "<br>The time needed to finish writing your full antimatter amount at a rate of 3 digits per second would span "
	let unis = years / 13.78e9 
	// 13.78 Billion years as measured by the CMB (cosmic microwave background) and various models, feel free to change if more accurate data comes along
	let timebit 
	let end = "% of another."
	if (unis < 1) timebit = (unis * 100).toFixed(3) + "% of a universe."
	else if (unis < 2) timebit = "1 universe and " + (unis * 100 - 100).toFixed(3) + end
	else timebit = getFullExpansion(Math.floor(unis)) + " universes and " + (unis * 100 - 100 * Math.floor(unis)).toFixed(3) + end
	getEl("infoScale").innerHTML = message + timebit
}

function lifetimeTimeDisplay(years){
	var message = "<br>If you wrote 3 digits of your full antimatter amount every second since you were born as an American,<br> you would "
	if (years > 79.3) message += "be a ghost for " + ((years - 79.3) / years * 100).toFixed(3) + "% of the session."
	else message += "waste " + (years / 0.793).toFixed(3) + "% of your projected average lifespan."
	getEl("infoScale").innerHTML = message
}

function infoScaleDisplay(){
	if (tmp.mod.hideRepresentation) getEl("infoScale").textContent=""
	else if (player.money.gt(Decimal.pow(10, 3 * 86400 * 365.2425 * 79.3 / 10))) {
		var years = player.money.log10() / 3 / 86400 / 365.2425
		var thisYear = new Date().getFullYear() || 2020
		if (years >= 1e13){
			getEl("infoScale").innerHTML = "<br>The time needed to finish writing your full antimatter amount at a rate of 3 digits per second would span " + Decimal.div(years, 1e12).toFixed(2) + " trillion years."
		} else if (years >= 1e9) {
			universesTimeDisplay(years)
		} else if (years > 1e7) {
			getEl("infoScale").innerHTML = "<br>The time needed to finish writing your full antimatter amount at a rate of 3 digits per second would span " + Decimal.div(years, 1e6).toFixed(2) + " million years."
		} else if (years >= thisYear) { 
			eventsTimeDisplay(years, thisYear)
		} else {
			lifetimeTimeDisplay(years)
		}
	}
	else if (player.money.log10() > 1e5) getEl("infoScale").innerHTML = "<br>If you wrote 3 numbers a second, it would take you <br>" + timeDisplay(player.money.log10() * 10 / 3) + "<br> to write down your antimatter amount."
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
	if (player.infinityUpgrades.includes("totalMult")) getEl("postinfi11").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(1e4)) getEl("postinfi11").className = "infinistorebtn1"
	else getEl("postinfi11").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("currentMult")) getEl("postinfi21").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(5e4)) getEl("postinfi21").className = "infinistorebtn1"
	else getEl("postinfi21").className = "infinistorebtnlocked"
	if (player.tickSpeedMultDecrease <= 2) getEl("postinfi31").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost)) getEl("postinfi31").className = "infinimultbtn"
	else getEl("postinfi31").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("achievementMult")) getEl("postinfi22").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(1e6)) getEl("postinfi22").className = "infinistorebtn1"
	else getEl("postinfi22").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("infinitiedMult")) getEl("postinfi12").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(1e5)) getEl("postinfi12").className = "infinistorebtn1"
	else getEl("postinfi12").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("postGalaxy")) getEl("postinfi41").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(5e11)) getEl("postinfi41").className = "infinistorebtn1"
	else getEl("postinfi41").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("challengeMult")) getEl("postinfi32").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(1e7)) getEl("postinfi32").className = "infinistorebtn1"
	else getEl("postinfi32").className = "infinistorebtnlocked"
	if (player.dimensionMultDecrease <= 3) getEl("postinfi42").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.dimensionMultDecreaseCost)) getEl("postinfi42").className = "infinimultbtn"
	else getEl("postinfi42").className = "infinistorebtnlocked"
	if (player.offlineProd == 50) getEl("offlineProd").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.offlineProdCost)) getEl("offlineProd").className = "infinimultbtn"
	else getEl("offlineProd").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("infinitiedGeneration")) getEl("postinfi13").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(20e6)) getEl("postinfi13").className = "infinistorebtn1"
	else getEl("postinfi13").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("bulkBoost")) getEl("postinfi23").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.tickspeedBoosts!=undefined?2e4:inNGM(2)?5e6:5e9)) getEl("postinfi23").className = "infinistorebtn1"
	else getEl("postinfi23").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("autoBuyerUpgrade")) getEl("postinfi33").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(1e15)) getEl("postinfi33").className = "infinistorebtn1"
	else getEl("postinfi33").className = "infinistorebtnlocked"
	getEl("postinfi11").innerHTML = "Normal Dimensions gain a multiplier based on total antimatter produced<br>Currently: " + shorten(tmp.postinfi11) + "x<br>Cost: "+shortenCosts(1e4)+" IP"
	getEl("postinfi21").innerHTML = "Normal Dimensions gain a multiplier based on current antimatter<br>Currently: " + shorten(tmp.postinfi21) + "x<br>Cost: "+shortenCosts(5e4)+" IP"
	if (player.tickSpeedMultDecrease > 2) getEl("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>" + player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenDimensions(player.tickSpeedMultDecreaseCost) +" IP"
	else getEl("postinfi31").innerHTML = "Decrease the Tickspeed cost multiplier increase post-e308<br> " + player.tickSpeedMultDecrease.toFixed(player.tickSpeedMultDecrease < 2 ? 2 : 0)+"x"
	getEl("postinfi22").innerHTML = "Normal Dimensions gain a multiplier based on achievements " + (tmp.mod.ngmX >= 4 ? "and purchased GP upgrades " : "") + "<br>Currently: " + shorten(achievementMult) + "x<br>Cost: " + shortenCosts(1e6) + " IP"
	getEl("postinfi12").innerHTML = "Normal Dimensions gain a multiplier based on your Infinities <br>Currently: "+shorten(getInfinitiedMult())+"x<br>Cost: " + shortenCosts(1e5) + " IP"
	getEl("postinfi41").innerHTML = "Galaxies are " + Math.round(getPostGalaxyEff() * 100 - 100) + "% stronger <br>Cost: "+shortenCosts(5e11)+" IP"
	getEl("postinfi32").innerHTML = "Normal Dimensions gain a multiplier based on your slowest Normal Challenge time<br>Currently: "+shorten(worstChallengeBonus)+"x<br>Cost: " + shortenCosts(1e7) + " IP"
	getEl("postinfi13").innerHTML = "You generate Infinities based on your fastest Infinity.<br>1 Infinity every " + timeDisplay(player.bestInfinityTime * 5) + " <br>Cost: " + shortenCosts(2e7) + " IP"
	getEl("postinfi23").innerHTML = "Unlock the option to bulk buy Dimension" + (player.tickspeedBoosts == undefined ? "" : " and Tickspeed") + " Boosts <br>Cost: " + shortenCosts(player.tickspeedBoosts != undefined ? 2e4 : inNGM(2) ? 5e6 : 5e9) + " IP"
	getEl("postinfi33").innerHTML = "Autobuyers work twice as fast <br>Cost: " + shortenCosts(1e15) + " IP"
	if (player.dimensionMultDecrease > 3) getEl("postinfi42").innerHTML = "Decrease the Dimension cost multiplier increase post-e308<br>" + player.dimensionMultDecrease + "x -> " + (player.dimensionMultDecrease - 1) + "x<br>Cost: " + shorten(player.dimensionMultDecreaseCost) +" IP"
	else getEl("postinfi42").innerHTML = "Dimension cost multiplier increase<br>"+player.dimensionMultDecrease.toFixed(ECComps("eterc6") % 5 > 0 ? 1 : 0) + "x"
	getEl("offlineProd").innerHTML = "Generate " + player.offlineProd + "% > " + Math.max(Math.max(5, player.offlineProd + 5), Math.min(50, player.offlineProd + 5)) + "% of your best IP/min from the last 10 Infinities, works offline<br>Currently: " + shortenMoney(bestRunIppm.times(player.offlineProd / 100)) + "IP/min<br> Cost: " + shortenCosts(player.offlineProdCost) + " IP"
	if (player.offlineProd == 50) getEl("offlineProd").innerHTML = "Generate " + player.offlineProd + "% of your best IP/min from the last 10 Infinities, works offline<br>Currently: " + shortenMoney(bestRunIppm.times(player.offlineProd / 100)) + " IP/min"
}

function roundedDBCostIncrease(a){
	return shorten(getDimboostCostIncrease() + a)
}

function breakNGm2UpgradeColumnDisplay(){
	if (player.infinityUpgrades.includes("galPointMult")) getEl("postinfi01").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.tickspeedBoosts == undefined ? 1e3 : 1e4)) getEl("postinfi01").className = "infinistorebtn1"
	else getEl("postinfi01").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("dimboostCost")) getEl("postinfi02").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.tickspeedBoosts == undefined ? 2e4 : 1e5)) getEl("postinfi02").className = "infinistorebtn1"
	else getEl("postinfi02").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("galCost")) getEl("postinfi03").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(5e5)) getEl("postinfi03").className = "infinistorebtn1"
	else getEl("postinfi03").className = "infinistorebtnlocked"
	if (player.extraDimPowerIncrease >= 40) getEl("postinfi04").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.dimPowerIncreaseCost)) getEl("postinfi04").className = "infinimultbtn"
	else getEl("postinfi04").className = "infinistorebtnlocked"
	getEl("postinfi01").innerHTML = "Multiplier to Galaxy points based on infinities<br>Currently: "+shorten(getPost01Mult())+"x<br>Cost: "+shortenCosts(player.tickspeedBoosts==undefined?1e3:1e4)+" IP"
	getEl("postinfi02").innerHTML = "Dimension Boost cost increases by 1 less<br>Currently: " + roundedDBCostIncrease(0) + (player.infinityUpgrades.includes("dimboostCost") ? "" : " -> " + (roundedDBCostIncrease(-1))) + "<br>Cost: " + shortenCosts(player.tickspeedBoosts == undefined ? 2e4 : 1e5) + " IP"
	getEl("postinfi03").innerHTML = "Galaxy cost increases by 5 less<br>Currently: " + Math.round(getGalaxyReqMultiplier() * 10) / 10 + (player.infinityUpgrades.includes("galCost") ? "" : " -> " + Math.round(getGalaxyReqMultiplier() * 10 - 50) / 10 + "<br>Cost: " + shortenCosts(5e5) + " IP")
	getEl("postinfi04").innerHTML = "Further increase all dimension multipliers<br>x^" + galMults.u31().toFixed(2) + (player.extraDimPowerIncrease < 40 ? " -> x^" + ((galMults.u31() + 0.02).toFixed(2)) + "<br>Cost: " + shorten(player.dimPowerIncreaseCost) + " IP" : "")
}

function breakNGm2UpgradeRow5Display(){
	getEl("postinfir5").style.display = ""
	if (player.infinityUpgrades.includes("postinfi50")) getEl("postinfi50").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.tickspeedBoosts == undefined ? 1e25 : 1e18)) getEl("postinfi50").className = "infinistorebtn1"
	else getEl("postinfi50").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("postinfi51")) getEl("postinfi51").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.tickspeedBoosts == undefined ? 1e29 : 1e20)) getEl("postinfi51").className = "infinistorebtn1"
	else getEl("postinfi51").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("postinfi52")) getEl("postinfi52").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.tickspeedBoosts == undefined ? 1e33 : 1e25)) getEl("postinfi52").className = "infinistorebtn1"
	else getEl("postinfi52").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("postinfi53")) getEl("postinfi53").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(player.tickspeedBoosts == undefined ? 1e37 : 1e29)) getEl("postinfi53").className = "infinistorebtn1"
	else getEl("postinfi53").className = "infinistorebtnlocked"
	getEl("postinfi50").innerHTML = "Dimension Boost cost increases by 0.5 less.<br>Currently: " + new Decimal(getDimboostCostIncrease()).toFixed(2) + (player.infinityUpgrades.includes("postinfi50") ? "" : " -> " + (new Decimal(getDimboostCostIncrease() - .5).toFixed(2))) + "<br>Cost: " + shortenCosts(player.tickspeedBoosts==undefined ? 1e25 : 1e18) + " IP"
	getEl("postinfi51").innerHTML = "Galaxies are " + (player.tickspeedBoosts ? 15 : 20) + "% more stronger.<br>Cost: " + shortenCosts(player.tickspeedBoosts == undefined ? 1e29 : 1e20) + " IP"
	let inf52text = ''
	if (player.tickspeedBoosts == undefined){
		inf52text = "Galaxy cost increases by 3 less.<br>Currently: " + Math.round(getGalaxyReqMultiplier() * 10) / 10 + (player.infinityUpgrades.includes("postinfi52") ? "" : " -> " + Math.round(getGalaxyReqMultiplier() * 10 - 30) / 10) + "<br>Cost: " + shortenCosts(1e33) + " IP"
	} else inf52text = "Decrease tickspeed boost cost multiplier to 3.<br>Cost: " + shortenCosts(1e25) + " IP"
	getEl("postinfi52").innerHTML = inf52text
	getEl("postinfi53").innerHTML = "Divide all Infinity Dimension cost multipliers by 50" + (tmp.mod.ngmX >= 4 ? ", free tickspeed upgrades multiply GP gain and IC completions boost Time Dimension Cost limit" : "") + ".<br>Cost: "+shortenCosts(player.tickspeedBoosts == undefined ? 1e37 : 1e29) + " IP"
}

function breakNGm2UpgradeRow6Display(){
	getEl("postinfir6").style.display = ""
	if (player.infinityUpgrades.includes("postinfi60")) getEl("postinfi60").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte(1e50)) getEl("postinfi60").className = "infinistorebtn1"
	else getEl("postinfi60").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("postinfi61")) getEl("postinfi61").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte("1e450")) getEl("postinfi61").className = "infinistorebtn1"
	else getEl("postinfi61").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("postinfi62")) getEl("postinfi62").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte("1e700")) getEl("postinfi62").className = "infinistorebtn1"
	else getEl("postinfi62").className = "infinistorebtnlocked"
	if (player.infinityUpgrades.includes("postinfi63")) getEl("postinfi63").className = "infinistorebtnbought"
	else if (player.infinityPoints.gte("1e2000")) getEl("postinfi63").className = "infinistorebtn1"
	else getEl("postinfi63").className = "infinistorebtnlocked"
	getEl("postinfi60").innerHTML = "You gain more " + (player.tickspeedBoosts ? "Galaxy Points" : "antimatter") + " based on your galaxies." + (player.tickspeedBoosts ? "" : "<br>Currently: " + shorten(getNewB60Mult()) + "x") + "<br>Cost: " + shortenCosts(1e50) + " IP"
	getEl("postinfi61").innerHTML = "g11 formula is better.<br>Cost: " + shortenCosts(new Decimal("1e450")) + " IP"
	getEl("postinfi62").innerHTML = "Dimension Boosts make g13 stronger.<br>Cost: " + shortenCosts(new Decimal("1e700")) + " IP"
	getEl("postinfi63").innerHTML = "Unlock 2 new rows of Galaxy Point upgrades.<br>Cost: " + shortenCosts(new Decimal("1e2000")) + " IP"
}

function INFINITYUPGRADESDisplay(){
	if (getEl("preinf").style.display == "block") {
		preBreakUpgradeDisplay()
	} else if (getEl("postinf").style.display == "block" && getEl("breaktable").style.display == "inline-block") {
		breakInfinityUpgradeDisplay()
		if (inNGM(2)) breakNGm2UpgradeColumnDisplay()
		if (inNGM(2) && (player.infinityDimension3.amount.gt(0) || player.eternities > (tmp.mod.newGameMinusVersion? -20 : 0) || ph.did("quantum"))) {
			breakNGm2UpgradeRow5Display()
		} else getEl("postinfir5").style.display = "none"
		if (inNGM(2) && (player.infinityDimension4.amount.gt(0) || player.eternities > (tmp.mod.newGameMinusVersion ? -20 : 0) || ph.did("quantum"))) {
			breakNGm2UpgradeRow6Display()
		} else getEl("postinfir6").style.display = "none"
		if (tmp.ngC) ngC.breakInfUpgs.display()
	} else if (getEl("singularity").style.display == "block" && getEl("singularitydiv").style.display == "") {
		getEl("darkMatter").textContent = shortenMoney(player.singularity.darkMatter)
		getEl("darkMatterMult").textContent = shortenMoney(getDarkMatterMult())
	} else if (getEl("dimtechs").style.display == "block" && getEl("dimtechsdiv").style.display == "") {
		getEl("darkMatterDT").textContent = shortenMoney(player.singularity.darkMatter)
		getEl("nextDiscounts").textContent = shortenMoney(getNextDiscounts())
		getEl("discounts").textContent = "You have gained a total of " + getFullExpansion(player.dimtechs.discounts) + " discount upgrades."
	}
}

function getEU2FormulaText(){
	let eu2formula = "(x/200) ^ log4(2x)"
	if (tmp.ngC) eu2formula = "(x/100) ^ log2(4x)"
	if (player.boughtDims !== undefined) eu2formula = "x ^ log4(2x)"
	else if (hasAch("ngpp15")) eu2formula = tmp.ngC ? "x ^ log10(x) ^ 2" : "x ^ log10(x) ^ 3.75"
	return eu2formula
}

function eternityUpgradesDisplay(){
	ETER_UPGS.updateDisplayOnTick()
}

function uponDilationDisplay(){
	let gain = getDilGain()
	let msg = "Disable dilation"
	if (player.infinityPoints.lt(Number.MAX_VALUE)||inQCModifier("ad")) {}
	else if (player.dilation.totalTachyonParticles.gt(gain)) msg += ".<br>" + tmp.ngC ? "<br>Get more antimatter to gain more Tachyon Particles" : ("Reach " + shortenMoney(getReqForTPGain()) + " antimatter to gain more Tachyon particles")
	else msg += " for " + shortenMoney(gain.sub(player.dilation.totalTachyonParticles)) + " Tachyon particles"
	getEl("enabledilation").innerHTML = msg + "."
}

function exdilationDisplay(){
	getEl("reversedilationdiv").style.display = ""
	if (canReverseDilation()) {
		getEl("reversedilation").className = "dilationbtn"
		getEl("reversedilation").innerHTML = "Reverse dilation."+(player.exdilation.times>0||ph.did("quantum")?"<br>Gain "+shortenDimensions(getExDilationGain())+" ex-dilation":"")
	} else {
		let req = getExdilationReq()
		getEl("reversedilation").className = "eternityupbtnlocked"
		getEl("reversedilation").textContent = "Get "+(player.eternityPoints.lt(req.ep)?shortenCosts(new Decimal(req.ep))+" EP and ":"")+shortenCosts(req.dt)+" dilated time to reverse dilation."
	}
}

function mainDilationDisplay(){
	if (player.dilation.active) uponDilationDisplay()
	else getEl("enabledilation").textContent = "Dilate time."+((player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode&&!player.eternityBuyer.slowStopped&&player.eternityBuyer.dilMode=="amount"?!isNaN(player.eternityBuyer.statBeforeDilation):false) ? " " + (player.eternityBuyer.dilationPerAmount - player.eternityBuyer.statBeforeDilation) + " left before dilation." : "")
	if (player.exdilation==undefined||tmp.mod.ngudpV?false:player.blackhole.unl) {
		exdilationDisplay()
	} else getEl("reversedilationdiv").style.display = "none"
	var fgm=getFreeGalaxyGainMult()
	getEl('freeGalaxyMult').textContent = fgm == 1 ? "Tachyonic Galaxy" : Math.round(fgm * 10) / 10 + " Tachyonic Galaxies"
}

function breakEternityDisplay(){
	getEl("eternalMatter").textContent = shortenDimensions(tmp.qu.breakEternity.eternalMatter)
	for (var u = 1; u <= (hasAch("ng3p101") ? 13 : player.ghostify.ghostlyPhotons.unl ? 10 : 7); u++) {
		getEl("breakUpg" + u).className = (tmp.qu.breakEternity.upgrades.includes(u) && u != 7) ? "eternityupbtnbought" : tmp.qu.breakEternity.eternalMatter.gte(getBreakUpgCost(u)) ? "eternityupbtn" : "eternityupbtnlocked"
		if (u == 8) getEl("breakUpg" + u + "Mult").textContent = (getBreakUpgMult(u) * 100 - 100).toFixed(1)
		else if (u != 7 && u <= 10) getEl("breakUpg" + u + "Mult").textContent = shortenMoney(getBreakUpgMult(u))
		else if (u == 12) getEl("breakUpg" + u + "Mult").textContent = shorten(getBreakUpgMult(u))
	}
	if (tmp.qu.bigRip.active) {
		getEl("eterShortcutEM").textContent=shortenDimensions(tmp.qu.breakEternity.eternalMatter)
		getEl("eterShortcutEP").textContent=shortenDimensions(player.eternityPoints)
		getEl("eterShortcutTP").textContent=shortenMoney(player.dilation.tachyonParticles)
	}
}

function ETERNITYSTOREDisplay(){
	if (getEl("TTbuttons").style.display == "block") updateTheoremButtons()
	if (getEl("timestudies").style.display == "block" || getEl("ers_timestudies").style.display == "block") updateTimeStudyButtons()
	if (getEl("masterystudies").style.display == "block") updateMasteryStudyButtons()
	if (getEl("eternityupgrades").style.display == "block") eternityUpgradesDisplay()
	if (getEl("dilation").style.display == "block") mainDilationDisplay()
	if (getEl("blackhole").style.display == "block") {
		if (getEl("blackholediv").style.display == "inline-block") updateBlackhole()
		if (getEl("blackholeunlock").style.display == "inline-block") {
			getEl("blackholeunlock").innerHTML = "Unlock the black hole<br>Cost: " + shortenCosts(new Decimal('1e4000')) + " EP"
			getEl("blackholeunlock").className = (player.eternityPoints.gte("1e4000")) ? "storebtn" : "unavailablebtn"
		}
	}
	if (getEl("breakEternity").style.display == "block") {
		breakEternityDisplay()
	}
}

function updateDimensionsDisplay() {
	if (getEl("dimensions").style.display == "block") {
		if (getEl("antimatterdimensions").style.display == "block") dimensionTabDisplay()
		if (getEl("infinitydimensions").style.display == "block") updateInfinityDimensions()
		if (getEl("timedimensions").style.display == "block") updateTimeDimensions()
		if (getEl("pdims").style.display == "block") paradoxDimDisplay()
		if (getEl("metadimensions").style.display == "block") updateMetaDimensions()
		if (getEl("emperordimensions").style.display == "block") updateEmperorDimensions()
		if (getEl("gdims").style.display == "block") GDs.updateDisplayOnTick()
	}
	tickspeedDisplay()
	if (getEl("stats").style.display == "block" && getEl("statistics").style.display == "block") STATSDisplay()
   	if (getEl("infinity").style.display == "block") INFINITYUPGRADESDisplay()
	if (getEl("eternitystore").style.display == "block") ETERNITYSTOREDisplay()
   	if (getEl("quantumtab").style.display == "block") updateQuantumTabs()
   	if (getEl("ghostify").style.display == "block") updateGhostifyTabs()
   	if (getEl("plTab").style.display == "block") pl.updateDisplayOnTick()
}

function replicantiDisplay() {
	if (player.replicanti.unl) {
		let replGalOver = getMaxRG() - player.replicanti.gal
		let chance = Decimal.times(tmp.rep.chance, 100)
		getEl("replicantiamount").textContent = shortenDimensions(player.replicanti.amount) + (tmp.ngC ? (" / ") + shortenDimensions(getReplicantiLimit()) : "")
		getEl("replicantimult").textContent = shorten(getIDReplMult())
		
		let chanceDisplayEnding = (isChanceAffordable() && player.infinityPoints.lt(Decimal.pow(10,1e10)) ? "<br>+1% Cost: " + shortenCosts(player.replicanti.chanceCost) + " IP" : "")
		getEl("replicantichance").innerHTML = "Replicate "+(tmp.rep.freq?"amount: "+shorten(tmp.rep.freq)+"x":"chance: "+getFullExpansion(chance.gt(1e12)?chance:Math.round(chance.toNumber()))+"%") + chanceDisplayEnding
		getEl("replicantiinterval").innerHTML = "Interval: "+timeDisplayShort(Decimal.div(tmp.rep.interval, 100), true, 3) + (isIntervalAffordable() ? "<br>-> "+timeDisplayShort(Decimal.div(tmp.rep.interval, 100 / 0.9), true, 3)+" Cost: "+shortenCosts(player.replicanti.intervalCost)+" IP" : "")
		let replGal = player.replicanti.gal
		let replGalScale = replGal >= (tmp.ngC ? 250 : 400) ? 2 : replGal >= 100 ? 1 : 0
		if (masteryStudies.has(266)) replGalScale += replGal > 12e4 ? 3 : replGal > 58198 ? 2 : replGal > 2998 ? 1 : 0
		let replGalName = (replGalScale ? getGalaxyScaleName(replGalScale) : "Max ") + "Replicated Galaxies"
		let replGalCostPortion = player.infinityPoints.lt(Decimal.pow(10, 1e10)) ? "<br>+1 Cost: " + shortenCosts(getRGCost()) + " IP" : ""
		getEl("replicantimax").innerHTML = replGalName + ": " + getFullExpansion(replGal) + (replGalOver > 1 ? "+" + getFullExpansion(replGalOver) : "") + replGalCostPortion
		getEl("replicantireset").innerHTML = (
			hasAch("ng3p67") ? "Get "
			: hasAch("ngpp16") || (tmp.mod.ngp3c && hasEternityUpg(6)) ? "Divide replicanti amount by " + shorten(Number.MAX_VALUE) + ", but get "
			: "Reset replicanti amount, but get "
		) + "1 free galaxy.<br>" +
			getFullExpansion(player.replicanti.galaxies) +
			(extraReplGalaxies ? " + " + (
				shiftDown ? shortenMoney(extraReplBase) + " x " + shortenMoney(extraReplMulti)
				: getFullExpansion(extraReplGalaxies)
			) + (extraReplBase > 325 ? " (softcapped)" : "") : "") +
			" replicated galax" + (getTotalRG() == 1 ? "y" : "ies") + " created."

		getEl("replicantiapprox").innerHTML = 
			tmp.ngp3 && player.dilation.upgrades.includes("ngpp1") && player.timestudy.studies.includes(192) && player.replicanti.amount.gte(Number.MAX_VALUE) && (!tmp.mod.nguspV || tmp.mod.nguepV) ? 
				"Replicanti increases by " + (tmp.rep.est < Math.log10(2) ? "x2.00 per " + timeDisplayShort(Math.log10(2) / tmp.rep.est * 10) : (tmp.rep.est.gte(1e4) ? shorten(tmp.rep.est) + " OoMs" : "x" + shorten(Decimal.pow(10, tmp.rep.est.toNumber()))) + " per second") + ".<br>" +
				"Replicate interval slows down by " + tmp.rep.speeds.inc.toFixed(3) + "x per " + getFullExpansion(Math.floor(tmp.rep.speeds.exp)) + " OoMs.<br>" +
				"(2x slower per " + getFullExpansion(Math.floor(tmp.rep.speeds.exp * Math.log10(2) / Math.log10(tmp.rep.speeds.inc))) + " OoMs)<br>" +
				"(The base interval was " + timeDisplayShort(Decimal.div(10, tmp.rep.baseEst), true, 2) + ")" :
			"Approximately "+ timeDisplay(Math.max((Math.log(Number.MAX_VALUE) - tmp.rep.ln) / tmp.rep.est.toNumber(), 0) * 10 * tmp.ec12Mult) + " until " + shorten(Number.MAX_VALUE) + " Replicantis."

		getEl("replicantichance").className = (player.infinityPoints.gte(player.replicanti.chanceCost) && isChanceAffordable()) ? "storebtn" : "unavailablebtn"
		getEl("replicantiinterval").className = (player.infinityPoints.gte(player.replicanti.intervalCost) && isIntervalAffordable()) ? "storebtn" : "unavailablebtn"
		getEl("replicantimax").className = (player.infinityPoints.gte(getRGCost())) ? "storebtn" : "unavailablebtn"
		getEl("replicantireset").className = (canGetReplicatedGalaxy()) ? "storebtn" : "unavailablebtn"
		getEl("replicantireset").style.height = (hasAch("ngpp16") && (!hasAch("ng3p67")) ? 90 : 70) + "px"
		getEl("replDesc").textContent = tmp.ngC ? "multiplier to IP gain (after softcaps) & all Normal Dimensions" : "multiplier on all infinity dimensions"
		if (tmp.ngC) ngC.condense.rep.update()
	} else {
		let cost = getReplUnlCost()
		getEl("replicantiunlock").innerHTML = "Unlock Replicantis<br>Cost: " + shortenCosts(cost) + " IP"
		getEl("replicantiunlock").className = player.infinityPoints.gte(cost) ? "storebtn" : "unavailablebtn"
	}
}

function initialTimeStudyDisplay(){
	getEl("11desc").textContent = "Currently: " + shortenMoney(tsMults[11]()) + "x"
	getEl("32desc").textContent = "You gain " + getFullExpansion(tsMults[32]()) + "x more Infinities (based on Dimension Boosts)"
	getEl("51desc").textContent = "You gain " + shortenCosts(tmp.mod.newGameExpVersion ? 1e30 : 1e15) + "x more IP"
	getEl("71desc").textContent = "Currently: " + shortenMoney(tmp.sacPow.pow(0.25).max(1).min("1e210000")) + "x"
	getEl("72desc").textContent = "Currently: " + shortenMoney(tmp.sacPow.pow(0.04).max(1).min("1e30000")) + "x"
	getEl("73desc").textContent = "Currently: " + shortenMoney(tmp.sacPow.pow(0.005).max(1).min("1e1300")) + "x"
	getEl("82desc").textContent = "Currently: " + shortenMoney(Decimal.pow(1.0000109, Decimal.pow(player.resets, 2)).min(player.meta==undefined?1/0:'1e80000')) + "x"
	getEl("83desc").textContent = "Currently: " + shorten(tsMults[83]()) + "x"
	getEl("91desc").textContent = "Currently: " + shortenMoney(Decimal.pow(10, Math.min(player.thisEternity, 18000)/60)) + "x"
	getEl("92desc").textContent = "Currently: " + shortenMoney(Decimal.pow(2, 600/Math.max(player.bestEternity, 20))) + "x"
	getEl("93desc").textContent = "Currently: " +  shortenMoney(Decimal.pow(player.totalTickGained, 0.25).max(1)) + "x"
	getEl("121desc").textContent = "Currently: " + (hasAch("ngpp11") ? 50 : (253 - averageEp.dividedBy(player.epmult).dividedBy(10).min(248).max(3))/5).toFixed(1) + "x"
	getEl("122desc").textContent = "You gain " +  (hasAch("ngpp11") ? 50 : 35) + "x more EP"
	getEl("123desc").textContent = "Currently: " + Math.sqrt(1.39*player.thisEternity/10).toFixed(1) + "x"
	getEl("141desc").textContent = "Currently: " + shortenMoney(new Decimal(1e45).dividedBy(Decimal.pow(15, Math.log(player.thisInfinityTime)*Math.pow(player.thisInfinityTime, 0.125))).max(1)) + "x"
	getEl("142desc").textContent = "You gain " + shortenCosts(1e25) + "x more IP"
	getEl("143desc").textContent = "Currently: " + shortenMoney(Decimal.pow(15, Math.log(player.thisInfinityTime)*Math.pow(player.thisInfinityTime, 0.125))) + "x"
	getEl("151desc").textContent = shortenCosts(1e4) + "x multiplier on all Time Dimensions"
	getEl("161desc").textContent = shortenCosts(Decimal.pow(10, (inNGM(2) ? 6660 : 616) *  ( tmp.mod.newGameExpVersion ? 5 : 1))) + "x multiplier on all normal dimensions"
	getEl("162desc").textContent = shortenCosts(Decimal.pow(10, (inNGM(2) ? 234 : 11) * (tmp.mod.newGameExpVersion ? 5 : 1))) + "x multiplier on all Infinity dimensions"
	getEl("192desc").textContent = tmp.mod.ngp3c ? "The Replicanti limit is multiplied by your Time Shards." : "You can get beyond " + shortenMoney(Number.MAX_VALUE) + " replicantis, but the interval is increased the more you have"
	getEl("193desc").textContent = "Currently: " + shortenMoney(Decimal.pow(1.03, Decimal.min(1e7, Decimal.div(getEternitied(), tmp.ngC ? 1e6 : 1))).min("1e13000")) + "x"
	getEl("212desc").textContent = "Currently: " + ((tsMults[212]() - 1) * 100).toFixed(2) + "%"
	getEl("214desc").textContent = "Currently: " + shortenMoney(((tmp.sacPow.pow(8)).min("1e46000").times(tmp.sacPow.pow(1.1)).div(tmp.sacPow)).max(1).min(new Decimal("1e125000"))) + "x"
	getEl("221desc").textContent = "Currently: " + shorten(tsMults[221]()) + "x"

	let ts225 = tsMults[225]()
	getEl("225desc").textContent = "Currently: +" + getFullExpansion(ts225) + " extra RGs" + (ts225 > 100 ? " (softcapped)" : "")

	getEl("226desc").textContent = "Currently: +" + getFullExpansion(tsMults[226]()) + " extra RGs"
	getEl("227desc").textContent = "Currently: " + shorten(tsMults[227]()) + "x"
	getEl("231desc").textContent = "Currently: " + shorten(tsMults[231]()) + "x power"
	getEl("232desc").textContent = "Currently: " + formatPercentage(tsMults[232]() - 1) + "%"

	getEl("metaCost").textContent = shortenCosts(getMetaUnlCost());
}

function eternityChallengeUnlockDisplay(){
	var ec1Mult=tmp.mod.newGameExpVersion?1e3:2e4
	if (player.etercreq !== 1) getEl("ec1unl").innerHTML = "Eternity Challenge 1<span>Requirement: "+(ECComps("eterc1")+1)*ec1Mult+" Eternities<span>Cost: 30 Time Theorems"
	else getEl("ec1unl").innerHTML = "Eternity Challenge 1<span>Cost: 30 Time Theorems"
	if (player.etercreq !== 2) getEl("ec2unl").innerHTML = "Eternity Challenge 2<span>Requirement: "+(1300+(ECComps("eterc2")*150))+" Tickspeed upgrades gained from time dimensions<span>Cost: 35 Time Theorems"
	else getEl("ec2unl").innerHTML = "Eternity Challenge 2<span>Cost: 35 Time Theorems"
	if (player.etercreq !== 3) getEl("ec3unl").innerHTML = "Eternity Challenge 3<span>Requirement: "+(17300+(ECComps("eterc3")*1250))+" 8th dimensions<span>Cost: 40 Time Theorems"
	else getEl("ec3unl").innerHTML = "Eternity Challenge 3<span>Cost: 40 Time Theorems"
	if (player.etercreq !== 4) getEl("ec4unl").innerHTML = "Eternity Challenge 4<span>Requirement: "+(1e8 + (ECComps("eterc4")*5e7)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" infinities<span>Cost: 70 Time Theorems"
	else getEl("ec4unl").innerHTML = "Eternity Challenge 4<span>Cost: 70 Time Theorems"
	if (player.etercreq !== 5) getEl("ec5unl").innerHTML = "Eternity Challenge 5<span>Requirement: "+(160+(ECComps("eterc5")*14))+" galaxies<span>Cost: 130 Time Theorems"
	else getEl("ec5unl").innerHTML = "Eternity Challenge 5<span>Cost: 130 Time Theorems"
	if (player.etercreq !== 6) getEl("ec6unl").innerHTML = "Eternity Challenge 6<span>Requirement: "+(40+(ECComps("eterc6")*5))+" replicanti galaxies<span>Cost: 85 Time Theorems"
	else getEl("ec6unl").innerHTML = "Eternity Challenge 6<span>Cost: 85 Time Theorems"
	if (player.etercreq !== 7) getEl("ec7unl").innerHTML = "Eternity Challenge 7<span>Requirement: "+shortenCosts(new Decimal("1e500000").times(new Decimal("1e300000").pow(ECComps("eterc7"))))+" antimatter <span>Cost: 115 Time Theorems"
	else getEl("ec7unl").innerHTML = "Eternity Challenge 7<span>Cost: 115 Time Theorems"
	if (player.etercreq !== 8) getEl("ec8unl").innerHTML = "Eternity Challenge 8<span>Requirement: "+shortenCosts(new Decimal("1e4000").times(new Decimal("1e1000").pow(ECComps("eterc8"))))+" IP <span>Cost: 115 Time Theorems"
	else getEl("ec8unl").innerHTML = "Eternity Challenge 8<span>Cost: 115 Time Theorems"
	if (player.etercreq !== 9) getEl("ec9unl").innerHTML = "Eternity Challenge 9<span>Requirement: "+shortenCosts(new Decimal("1e17500").times(new Decimal("1e2000").pow(ECComps("eterc9"))))+" infinity power<span>Cost: 415 Time Theorems"
	else getEl("ec9unl").innerHTML = "Eternity Challenge 9<span>Cost: 415 Time Theorems"
	if (player.etercreq !== 10) getEl("ec10unl").innerHTML = "Eternity Challenge 10<span>Requirement: "+shortenCosts(new Decimal("1e100").times(new Decimal("1e20").pow(ECComps("eterc10"))))+" EP<span>Cost: 550 Time Theorems"
	else getEl("ec10unl").innerHTML = "Eternity Challenge 10<span>Cost: 550 Time Theorems"

	getEl("ec11unl").innerHTML = "Eternity Challenge 11<span>Requirement: Use only the Normal Dimension path<span>Cost: 1 Time Theorem"
	getEl("ec12unl").innerHTML = "Eternity Challenge 12<span>Requirement: Use only the Time Dimension path<span>Cost: 1 Time Theorem"
}

function mainTimeStudyDisplay(){
	initialTimeStudyDisplay()
	eternityChallengeUnlockDisplay()
	getEl("dilstudy1").innerHTML = "Unlock time dilation" + (player.dilation.studies.includes(1) ? "" : "<span>Requirement: 5 EC11 and EC12 completions and " + getFullExpansion(getDilationTotalTTReq()) + " total theorems")+"<span>Cost: " + getFullExpansion(5e3) + " Time Theorems"
}

function ABTypeDisplay(){
	if (getEternitied() > 4) getEl("togglecrunchmode").style.display = "inline-block"
	else getEl("togglecrunchmode").style.display = "none"
	if (getEternitied() > 8 || player.autobuyers[10].bulkBought) getEl("galaxybulk").style.display = "inline-block"
	else getEl("galaxybulk").style.display = "none"
	if (getEternitied() >= 100 && player.meta) getEl("toggleautoetermode").style.display = "inline-block"
	else getEl("toggleautoetermode").style.display = "none"
}

function infPoints2Display(){
	if (ph.did("infinity")) getEl("infinityPoints2").style.display = "inline-block"
	else getEl("infinityPoints2").style.display = "none"
}

function updateChallTabDisplay(){
	if (player.postChallUnlocked > 0 || Object.keys(player.eternityChalls).length > 0 || player.eternityChallUnlocked !== 0 || ph.did("quantum")) getEl("challTabButtons").style.display = "table"
}

function eterPoints2Display(){
	getEl("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity points."
}

function dimboostABTypeDisplay(){
	if (getEternitied() > 9 || player.autobuyers[9].bulkBought) getEl("bulklabel").textContent = "Buy max dimboosts every X seconds:"
	else getEl("bulklabel").textContent = "Bulk DimBoost Amount:"
}

function IDABDisplayCorrection(){
	if (getEternitied() > 10) {
		for (var i=1;i<getEternitied()-9 && i < 9; i++) {
			getEl("infauto"+i).style.visibility = "visible"
		}
		getEl("toggleallinfdims").style.visibility = "visible"
	} else {
		for (var i=1; i<9; i++) {
			getEl("infauto"+i).style.visibility = "hidden"
		}
		getEl("toggleallinfdims").style.visibility = "hidden"
	}
}

function replicantiShopABDisplay(){
	if (getEternitied() >= 40) getEl("replauto1").style.visibility = "visible"
	else getEl("replauto1").style.visibility = "hidden"
	if (getEternitied() >= 60) getEl("replauto2").style.visibility = "visible"
	else getEl("replauto2").style.visibility = "hidden"
	if (getEternitied() >= 80) getEl("replauto3").style.visibility = "visible"
	else getEl("replauto3").style.visibility = "hidden"
}

function setStatsDisplay(toggle) {
	if (toggle) tmp.mod.hideStats = !tmp.mod.hideStats
	getEl("showStats").textContent = (tmp.mod.hideStats ? "Show" : "Hide") + " statistics"
}

function setAchsDisplay(toggle) {
	if (toggle) tmp.mod.hideAchs = !tmp.mod.hideAchs
	getEl("showAchs").textContent = (tmp.mod.hideAchs ? "Show" : "Hide") + " achievements"
}

function primaryStatsDisplayResetLayers(){
	if (!ph.shown("eternity")) getEl("pasteternities").style.display = "none"
	else getEl("pasteternities").style.display = "inline-block"
	if (ph.shown("quantum")) getEl("pastquantums").style.display = "inline-block"
	else getEl("pastquantums").style.display = "none"
	if (ph.shown("ghostify")) getEl("pastghostifies").style.display = "inline-block"
	else getEl("pastghostifies").style.display = "none"
	getEl("pastinfs").style.display = ph.shown("infinity") ? "" : "none"
	var showStats = (ph.shown("infinity") && player.challenges.length >= 2) || ph.shown("eternity") || ph.shown("quantum") || ph.shown("ghostify") ? "" : "none"
	getEl("brfilter").style.display = showStats
	getEl("statstabs").style.display = showStats

	var display = tmp.mod.hideSecretAchs ? "none " : ""
	getEl("achTabButtons").style.display=display
	getEl("secretachsbtn").style.display=display
}

function ECCompletionsDisplay(){
	for (let x = 1; x <= 14; x++) getEl("eterc" + x + "completed").textContent = "Completed " + ECComps("eterc" + x) + " times."
}

function ECchallengePortionDisplay(){
	let ec12TimeLimit = Math.round(getEC12TimeLimit() * 10) / 100
	for (var c=1;c<15;c++) getEl("eterc"+c+"goal").textContent = "Goal: "+shortenCosts(getECGoal("eterc"+c))+" IP"+(c==12?" in "+ec12TimeLimit+" second"+(ec12TimeLimit==1?"":"s")+" or less.":c==4?" in "+Math.max((16-(ECComps("eterc4")*4)),0)+" infinities or less.":"")
}

function EC8PurchasesDisplay(){
	if (player.currentEternityChall == "eterc8") {
		getEl("eterc8repl").style.display = "block"
		getEl("eterc8ids").style.display = "block"
		getEl("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
		getEl("eterc8ids").textContent = "You have "+player.eterc8ids+" purchases left."
	} else {
		getEl("eterc8repl").style.display = "none"
		getEl("eterc8ids").style.display = "none"
	}
}

function bankedInfinityDisplay(){
	getEl("infinitiedBank").style.display = (player.infinitiedBank > 0) ? "block" : "none"
	getEl("infinitiedBank").textContent = "You have " + getFullExpansion(player.infinitiedBank) + " banked infinities."
	var bankedInfGain=gainBankedInf()
	getEl("bankedInfGain").style.display = bankedInfGain>0 ? "block" : "none"
	getEl("bankedInfGain").textContent = "You will gain " + getFullExpansion(bankedInfGain) + " banked infinities on next Eternity."
	if (hasAch("ng3p73")) updateBankedEter(true)
}

function updateNGM2RewardDisplay(){
	getEl("postcngmm_1reward").innerHTML = "Reward: Infinity upgrades based on time " + (tmp.mod.ngmX >= 4 ? "" : "or Infinities ") + "are applied post-dilation, and make the GP formula better based on galaxies."
	getEl("postcngm3_1description").innerHTML = "Multiplier per ten Dimensions is 1x, Dimension Boosts have no effect," + (tmp.mod.ngmX >= 4 ? " have a much lower time dimension cost limit," : "") + " and Tickspeed Boost effect softcap starts immediately."
	getEl("postcngm3_1reward").innerHTML = "Reward: Tickspeed boost effect softcap is softer" + (tmp.mod.ngmX >= 4 ? ", remote galaxy scaling starts .5 later and triple GP per IC completion" : "") + "."
}

function updateGalaxyUpgradesDisplay(){
	var text41 = tmp.mod.ngmX >= 4 ? "Square g11, and tickspeed boosts multiply GP gain." : "Galaxy points boost per-10 bought Infinity Dimensions multiplier."
	getEl("galaxy41").innerHTML = text41 + "<br>Cost: <span id='galcost41'></span> GP"
	var text42 = tmp.mod.ngmX >= 4 ? "Buff g12 and make it post dilation." : "Eternity points reduce Infinity Dimension cost multipliers."
	getEl("galaxy42").innerHTML = text42 + "<br>Cost: <span id='galcost42'></span> GP"
	var text43 = tmp.mod.ngmX >= 4 ? "Reduce Dimension Boost cost multiplier by 1, and Dimension Boosts multiply GP gain." : "Galaxy points boost Time Dimensions."
	var curr43 = tmp.mod.ngmX >= 4 ? "" : "<br>Currently: <span id='galspan43'>?</span>x"
	getEl("galaxy43").innerHTML = text43 + curr43 + "<br>Cost: <span id='galcost43'></span> GP"
}
