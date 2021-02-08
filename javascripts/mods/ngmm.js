function inNGM(x) {
	return tmp.ngmX >= x && tmp.mod.ngmX >= x
}

function getGSAmount(offset=0) { 
	if (isEmptiness) return new Decimal(0)
	let galaxies = getGSGalaxies() + offset
	let y = getGSGalaxyExp(galaxies)
	let z = getGSDimboostExp(galaxies)
	let resetMult = player.resets
	if (inNGM(4)) resetMult = resetMult + player.tdBoosts / 2 - 1
	resetMult -= inNC(4) ?  2 : 4
	if (player.tickspeedBoosts !== undefined) resetMult = (resetMult + 1) / 2
	let exp = getD8Exp()
	let div2 = 50
	if (hasAch("r102")) div2 = 10
	if (player.totalmoney.log10() > 2e6) div2 /= Math.log(player.totalmoney.log10()) 
	
	let ret = Decimal.pow(galaxies, y).times(Decimal.pow(Math.max(0, resetMult), z)).max(0)
	ret = ret.times(Decimal.pow(1 + getAmount(8) / div2, exp))
	
	if (!player.galacticSacrifice.chall) ret = ret.times(getGPMultipliers())
	if (hasGalUpg(16) && player.tdBoosts) ret = ret.times(Math.max(player.tdBoosts, 1))
	if (inNGM(4)) {
		var e = hasGalUpg(46) ? galMults["u46"]() : 1
		if (hasGalUpg(41)) ret = ret.times(Decimal.max(player.tickspeedBoosts, 1).pow(e))
		if (hasGalUpg(43)) ret = ret.times(Decimal.max(player.resets, 1).pow(e * (hasAch("r75") ? 2 : 1)))
		if (hasGalUpg(45)) ret = ret.times(player.eightAmount.max(1).pow(e))
		if (player.challenges.includes("postcngm3_1")) ret = ret.times(Decimal.pow(3, tmp.cp))
		let a = 0
		if (player.infinityUpgrades.includes("postinfi60")) a = galaxies * Math.max(galaxies, 20)
		ret = ret.times(Decimal.pow(1.1, a))
	}

	var rgs = player.replicanti.galaxies
	if (hasAch("r98")) rgs *= 2
	if (player.tickspeedBoosts != undefined && hasAch("r95")) ret = ret.times(Decimal.pow(Math.max(1, player.eightAmount), rgs))

	return ret.floor()
}

function getGPGain(offset = 0){
	return getGSAmount(offset)
}

function getGPMultipliers(){
	let ret = new Decimal(1)
	if (hasAch("r23") && player.tickspeedBoosts !== undefined) {
		let tbDiv = 10
		if (inNGM(4)) tbDiv = 5
		ret=ret.times(Decimal.pow(Math.max(player.tickspeedBoosts / tbDiv, 1),Math.max(getAmount(8) / 75, 1)))
	}
	if (hasGalUpg(32)) ret = ret.times(galMults.u32())
	if (player.infinityUpgrades.includes("galPointMult")) ret = ret.times(getPost01Mult())
	if (hasAch('r37')) {
		if (player.bestInfinityTime >= 18000) ret = ret.times(Math.max(180000 / player.bestInfinityTime, 1))
		else ret = ret.times(10 * (1 + Math.pow(Math.log10(18000 / player.bestInfinityTime), 2)))
	}
	if (hasAch("r62") && player.tickspeedBoosts == undefined) ret = ret.times(player.infinityPoints.max(10).log10())
	if (hasAch("r72")) ret = ret.times(player.achPow || 1)
	if (player.infinityUpgrades.includes("postinfi53")) ret = ret.times(player.totalTickGained + 1)
	return ret
}

function getGSGalaxies() {
	let galaxies = player.galaxies + player.dilation.freeGalaxies;
	let rg = player.replicanti.galaxies
	if (player.timestudy.studies.includes(133)) rg *= 1.5
	if (player.timestudy.studies.includes(132)) rg *= 1.4
	if (hasAch("r121")) galaxies += 30.008
	if (hasAch("r127")) galaxies += R127 // roughly 42 galaxies
	if (hasAch("r132")) rg *= 1 + .540 // 54.0% boost becasue of the 540 in the achievement
	if (hasAch("r135")) galaxies += R135 // roughly 663 galaxies
	if (hasAch("r137")) galaxies += Math.max(200, player.dilation.freeGalaxies * 4) + 2 * player.dilation.freeGalaxies
	return galaxies+rg
}

function getGSGalaxyExp(galaxies) {
	let y = 1.5 
	if (player.challenges.includes("postcngmm_1")) {
		y += Math.max(0, 0.05 * (galaxies - 10)) + 0.005 * Math.pow(Math.max(0, galaxies-30) , 2)
		if (player.tickspeedBoosts == undefined || player.challenges.includes("postcngm3_4") || player.currentChallenge == "postcngm3_4") y += 0.0005 * Math.pow(Math.max(0, galaxies - 50) , 3)
		if (hasAch("r121") && player.tickspeedBoosts == undefined) y += 1e-5 * Math.pow(Math.max(galaxies - 500, 0), 4) 
		y *= .08*(tmp.cp+14)
		if (player.infinityUpgrades.includes("postinfi60") && player.tickspeedBoosts != undefined) y *= Math.log10(Math.max(galaxies - 50, 1)) * 2.5 + 1
		if (inNGM(4)) y += .25 * Math.sqrt(y + (2.5 / 9 * galaxies))
	}
	if (hasAch("r121")) y *= Math.log(3+galaxies)
	if (hasGalUpg(52) && player.tickspeedBoosts == undefined) {
		if (y > 100) y = Math.pow(1e4 * y , 1/3)
	} else if (y > 100 && player.tickspeedBoosts == undefined) {
		y = Math.pow(316.22 * y, 1/3)
	} else if (y > 10) {
		y = Math.pow(10 * y, .5)
	}
	if (hasAch("r121")) y += 10
	return y
}

function getGSDimboostExp(galaxies){
	let z = 1
	if (tmp.cp > 3) {
		z = 0.06 * (tmp.cp + 14)
		z += galaxies / 100
		if (player.tickspeedBoosts == undefined) z *= Math.log(galaxies + 3)
	}
	return z
}

function getD8Exp(){
	let exp = 1
	let logBestAM = player.totalmoney.plus(10).log10()
	if (hasAch("r124")) {
		let div = 30
		if (player.currentEternityChall == "") div += 12
		else if (getNormalAchAmount() > 90) div -= .1 * (getNormalAchAmount() - 90)
		let amt = getAmount(8) / div
		if (amt > 1048576) amt = Math.pow(Math.log2(amt) / 5, 10) 
		// 1048576 = 2^20 = 4^10
		if (amt > 1024) amt = 24 + Math.pow(Math.log2(amt), 3)
		exp += amt
		if (logBestAM > 2.75e6) {
			let exp2 = Math.min(1.3, 1 + logBestAM / 1e8 + Math.sqrt(logBestAM / 275) / 3000)
			exp = Math.pow(exp, exp2)
		}
	}
	return exp
}

function galacticSacrifice(auto, force, chall) {
	if (getGSAmount().eq(0) && !force) return
	if (tmp.ri) return
	if (player.options.gSacrificeConfirmation && !auto && !force) if (!confirm("Galactic Sacrifice will act like a Galaxy reset, but will remove all your Galaxies in exchange for Galaxy Points to buy powerful upgrades. It will take a lot of time to recover initially. Are you sure you want to do this?")) return
	if (player.options.challConf && chall) if (!confirm("You will Galactic Sacrifice without gaining anything. You need to Galactic Sacrifice with special conditions to complete this challenge. Some Galaxy Points gain multipliers won't work in this challenge.")) return
	if (!force) {
		player.galacticSacrifice.galaxyPoints = player.galacticSacrifice.galaxyPoints.plus(getGSAmount())
		player.galacticSacrifice.times++
		ph.onPrestige("galaxy")
	}
	if (chall) {
		player.galacticSacrifice.chall = chall
		showTab("dimensions")
	}
	if (inNGM(4)) {
		if (!force) {
			if (!player.challenges.includes("challenge1")) player.challenges.push("challenge1")
			if (player.galacticSacrifice.chall) {
				if (!player.challenges.includes("challenge" + player.galacticSacrifice.chall)) player.challenges.push("challenge" + player.galacticSacrifice.chall)
				player.challengeTimes[player.galacticSacrifice.chall - 2] = Math.min(player.challengeTimes[player.galacticSacrifice.chall - 2], player.galacticSacrifice.time)
			}
			if (player.challenges.length > 1) giveAchievement("Daredevil")
			if (player.challenges.length == getTotalNormalChallenges() + 1) giveAchievement("AntiChallenged")
			if (player.challenges.length == getTotalNormalChallenges() + player.infchallengeTimes.length + 1) giveAchievement("Anti-antichallenged")
			if (inNC(2)  && player.galacticSacrifice.time <= 1800) giveAchievement("Many Deaths")
			if (inNC(11) && player.galacticSacrifice.time <= 1800) giveAchievement("Gift from the Gods")
			if (inNC(5)  && player.galacticSacrifice.time <= 1800) giveAchievement("Is this hell?")
			if (inNC(3)  && player.galacticSacrifice.time <= 100 ) giveAchievement("You did this again just for the achievement right?");
			if (player.firstAmount == 1 && player.resets == 0 && player.galaxies == 0 && inNC(12)) giveAchievement("ERROR 909: Dimension not found")
		}
		if (!chall && (force || !player.options.retryChallenge)) delete player.galacticSacrifice.chall
		getEl("challengeconfirmation").style.display = "inline-block"
		updateChallenges()
		updateNCVisuals()
		updateChallengeTimes()
		updateAutobuyers()
	}
	if (inNGM(5)) {
		unlockInfinNGm5(3)
		giveAchievement("The hardest of sacrifices")
		updateGalstones()
	}
	GPminpeak = new Decimal(0)
	player.galacticSacrifice.time = 0
	resetPSac()
	galaxyReset(-player.galaxies)
}

function resetGalacticSacrifice(eternity) {
	return inNGM(2) ? {
		galaxyPoints: hasAch("r33") && !eternity ? new Decimal(getInfinitied()).div(10).pow(2) : new Decimal(0),
		time: 0,
		times: 0,
		upgrades: []
	} : undefined
}

function newGalacticDataOnInfinity(eternity) {
	if (inNGM(2) && (eternity ? getEternitied() >= 7 : hasAch(inNGM(3) ? "r36" : "r33"))) {
		var data = player.galacticSacrifice
		data.galaxyPoints = player.tickspeedBoosts == undefined ? (eternity ? data.galaxyPoints : data.galaxyPoints.add(getGSAmount())) : new Decimal(0)
		if (player.tickspeedBoosts != undefined) data.times = 0
		data.time = 0
		return data
	} else return resetGalacticSacrifice()
}

function isIC3Trapped() {
	return inNGM(2) || inQC(6) || player.currentEternityChall == 'eterc14'
}

//v1.2

let galCosts = {
	11: 1,
	21: 1,
	41: "1e3800",
	51: "1e5500",
	22: 5,
	42: "1e4000",
	52: "1e8000",
	23: 100,
	43: "1e4200",
	53: "1e25000",
	14: 300,
	24: 1e3,
	34: 1e17,
	15: 1,
	25: 1e3,
	35: 2e3,
	16: 1e16,
	26: 1e18,
	36: 1e22,
	"41ngm4": 1e23,
	"42ngm4": 1e25,
	"43ngm4": 1e28,
	"44ngm4": 1e31,
	"45ngm4": 1e34,
	"46ngm4": 1e40 
}

function getGalaxyUpgradeCost(i) {
	if (inNGM(4) && galCosts[i + "ngm4"]) return new Decimal(galCosts[i + "ngm4"])
	return galCosts[i]
}

function buyGalaxyUpgrade(i) {
	var cost = getGalaxyUpgradeCost(i)
	if (hasGalUpg(i) || !(Math.floor(i/10) < 2 || hasGalUpg(i-10)) || player.galacticSacrifice.galaxyPoints.lt(cost)) return
	player.galacticSacrifice.upgrades.push(i)
	player.galacticSacrifice.galaxyPoints = player.galacticSacrifice.galaxyPoints.sub(cost)
	if (i == 11) {
		if (hasAch("r21")) {
			for (var d = 1; d < 9; d++) {
				var name = TIER_NAMES[d]
				player[name + "Cost"] = player[name + "Cost"].times(10)
				if (inNGM(4)) player["timeDimension" + d].cost = player["timeDimension" + d].cost.times(10) //do we want to make g11 affect infinity dimensions in NG-5? I doubt it, but something to consider.
			}
		}
		reduceDimCosts(true)
	}
	if (i == 41 && tmp.ngmX < 4) {
		for (var tier = 1; tier <= 8; tier++) {
			let dim = player["infinityDimension" + tier]
			dim.power = Decimal.pow(getInfBuy10Mult(tier), dim.baseAmount/10)
		}
	}
	if (i == 42 && tmp.ngmX < 4) {
		for (var tier = 1; tier <= 8; tier++) {
			let dim = player["infinityDimension" + tier]
			dim.cost = Decimal.pow(getIDCostMult(tier), dim.baseAmount / 10).times(infBaseCost[tier])
		}
	}
	if (i == 53) {
		player.infMult = new Decimal(1)
		player.infMultCost = new Decimal(10)
	}
}

function hasGalUpg(x) {
	return inNGM(2) && player.galacticSacrifice && player.galacticSacrifice.upgrades.includes(x)
}

function reduceDimCosts(upg) {
	if (inNGM(2)) {
		let div = 1
		if (hasAch("r21")) div = 10
		if (hasGalUpg(11)) div = galMults.u11()
		for (var d = 1; d < 9; d++) {
			var name = TIER_NAMES[d]
			if (inNGM(4) && !upg) {
				player[name + "Cost"] = player[name + "Cost"].pow(1.25).times(10)
				player.costMultipliers[d - 1] = player.costMultipliers[d - 1].pow(1.25)
			}

			player[name + "Cost"] = player[name + "Cost"].div(div)
			if (inNGM(4)) player["timeDimension" + d].cost = Decimal.div(player["timeDimension" + d].cost, div)
		}
		if (hasAch('r48') && tmp.ngmX < 3) player.tickSpeedCost = player.tickSpeedCost.div(div)
	}
	if (player.infinityUpgradesRespecced != undefined) {
		for (var d = 1; d < 9; d++) {
			var name = TIER_NAMES[d]
			player[name + "Cost"] = player[name + "Cost"].div(Decimal.pow(getDiscountMultiplier("dim" + d), player.dimtechs.discounts))
		}
		player.tickSpeedCost = player.tickSpeedCost.div(Decimal.pow(getDiscountMultiplier("tick"), player.dimtechs.discounts))
	}
}

function galacticUpgradeSpanDisplay() {
	getEl('galcost33').innerHTML = shortenCosts(getGalaxyUpgradeCost(33))
	if (inNGM(3)) {
		getEl('galcost24').textContent = shortenCosts(1e3)
		getEl('galcost34').textContent = shortenCosts(1e17)
	}
	if (inNGM(4)) {
		getEl('galcost25').textContent = shortenCosts(1e3)
		getEl('galcost35').textContent = shortenCosts(2e3)
		getEl('galcost16').textContent = shortenCosts(1e16)
		getEl('galcost26').textContent = shortenCosts(1e18)
		getEl('galcost36').textContent = shortenCosts(1e22)
		getEl('galcost41').textContent = shortenCosts(1e23)
		getEl('galcost42').textContent = shortenCosts(1e25)
		getEl('galcost43').textContent = shortenCosts(1e28)
		getEl('galcost44').textContent = shortenCosts(1e31)
		getEl('galcost45').textContent = shortenCosts(1e34)
		getEl('galcost46').textContent = shortenCosts(1e40) 
	} else if (player.infinityUpgrades.includes("postinfi63")) {
		getEl("galcost41").textContent = shortenCosts(new Decimal("1e3800"))
		getEl("galcost42").textContent = shortenCosts(new Decimal("1e4000"))
		getEl("galcost43").textContent = shortenCosts(new Decimal("1e4200"))
	}
	if (player.infinityUpgrades.includes("postinfi63")) {
		getEl("galcost51").textContent = shortenCosts(new Decimal("1e5500"))
		getEl("galcost52").textContent = shortenCosts(new Decimal("1e8000"))
		getEl("galcost53").textContent = shortenCosts(new Decimal("1e25000"))
	}
}

function galacticUpgradeButtonTypeDisplay () {
	getEl("galaxyPoints").innerHTML = "You have <span class='GPAmount'>" + shortenDimensions(player.galacticSacrifice.galaxyPoints) + "</span> Galaxy point" + (player.galacticSacrifice.galaxyPoints.eq(1)? "." : "s.")

	let t = getEl("galTable")
	for (let i = 1; i <= 5; i++) { //5 rows
		var r = t.rows[i-1]
		if (!galConditions["r"+i] || galConditions["r"+i]()) {
			r.style.display = ""
			for (let j = 1; j <= 6; j++) { //6 columns
				var c = r.cells[j-1]
				if (!galConditions["c"+j] || galConditions["c"+j]()) {
					c.style.display = ""
					var e = getEl('galaxy' + i + j);
					if (hasGalUpg(+(i + '' + j))) {
						e.className = 'infinistorebtnbought'
					} else if (player.galacticSacrifice.galaxyPoints.gte(getGalaxyUpgradeCost(i + '' + j)) && (i === 1 || hasGalUpg(+((i - 1) + '' + j)))) {
						e.className = 'infinistorebtn' + ((j-1)%4+1);
					} else {
						e.className = 'infinistorebtnlocked'
					}
					let upgId = i * 10 + j
					let mult = galMults["u" + upgId]
					let elm = getEl('galspan' + upgId)

					if (mult && elm) {
						let display = galMultDisplays["u" + upgId]
						mult = mult()
						getEl('galspan' + upgId).textContent = display ? display(mult) : shorten(mult)
					}
				} else c.style.display = "none"
			}
		} else r.style.display = "none"
	}
}

//v1.295
function resetTotalBought() { //uhh what does this do?
	if (inNGM(2)) return {}
}

function productAllTotalBought() {
	var ret = 1;
	var mult = getProductBoughtMult()
	for (var i = 1; i <= 8; i++) {
		if (inNC(13) && player.tickspeedBoosts != undefined) ret = Decimal.times(player[TIER_NAMES[i] + "Amount"].max(1).log10(), mult).add(1).times(ret);
		else if (player.totalBoughtDims[TIER_NAMES[i]]) ret = Decimal.times(ret, player.totalBoughtDims[TIER_NAMES[i]] ? Decimal.times(player.totalBoughtDims[TIER_NAMES[i]], mult).max(1) : 1);
	}
	return ret;
}

function productAllTotalBought1() {
	return Math.pow(Decimal.max(productAllTotalBought(), 10).log10() ,2);
}

function productAllDims1(){
	var ret = new Decimal(0)
	for (var i = 1; i <= 8; i++) {
		ret = ret.add(Math.max(player[TIER_NAMES[i] + "Amount"].max(1).log10(),0));
	}
	return ret.max(1)
}

getEl("challenge13").onclick = function () {
	startNormalChallenge(13)
}

//v1.3
function gSacrificeConf() {
	getEl("gConfirmation").checked = player.options.gSacrificeConfirmation
	player.options.gSacrificeConfirmation = !player.options.gSacrificeConfirmation
	getEl("gSacConfirmBtn").textContent = "Galactic Sacrifice confirmation: " + (player.options.gSacrificeConfirmation ? "ON" : "OFF")
}

getEl("challenge14").onclick = function () {
	startNormalChallenge(14)
}

function updateTBTIonGalaxy() {
	if (inNGM(2)) return {current: player.tickBoughtThisInf.current, pastResets: [{resets: 0, bought: player.tickBoughtThisInf.current}]}
}

function resetTickBoughtThisInf() {
	if (inNGM(2)) return {current: 0, pastResets: [{resets: 0, bought: 0}]}
}

function upgradeSacAutobuyer() {
	let cost = player.autoSacrifice.cost
	if ((inNGM(4) ? player.galacticSacrifice.galaxyPoints : player.infinityPoints).lt(cost)) return false
	if (inNGM(4)) player.galacticSacrifice.galaxyPoints=player.galacticSacrifice.galaxyPoints.sub(cost)
	else player.infinityPoints = player.infinityPoints.sub(cost)
	if (player.autoSacrifice.interval > 100) {
		player.autoSacrifice.interval = Math.max(player.autoSacrifice.interval * 0.6, 100);
		if (player.autoSacrifice.interval > 120) player.autoSacrifice.cost *= 2; // if your last purchase wont be very strong, dont double the cost
	}
	updateAutobuyers();
}

getEl("buyerBtnGalSac").onclick = function () {
	buyAutobuyer(12);
}

//v1.4
function getPost01Mult() {
	return Math.min(Math.pow(player.infinitied + 1, .3), Math.pow(Math.log(player.infinitied + 3), 3))
}

getEl("postinfi01").onclick = function() {
	buyInfinityUpgrade("galPointMult",player.tickspeedBoosts==undefined?1e3:1e4);
}

getEl("postinfi02").onclick = function() {
	buyInfinityUpgrade("dimboostCost",player.tickspeedBoosts==undefined?2e4:1e5);
}

getEl("postinfi03").onclick = function() {
	buyInfinityUpgrade("galCost",5e5);
}

getEl("postinfi04").onclick = function() {
	if (player.infinityPoints.gte(player.dimPowerIncreaseCost) && player.extraDimPowerIncrease < 40) {
		player.infinityPoints = player.infinityPoints.minus(player.dimPowerIncreaseCost)
		player.dimPowerIncreaseCost = new Decimal(player.tickspeedBoosts == undefined ? 1e3 : 3e5).times(Decimal.pow(4, Math.min(player.extraDimPowerIncrease, 15) + 1));
		player.extraDimPowerIncrease += 1;
		if (player.extraDimPowerIncrease > 15) player.dimPowerIncreaseCost = player.dimPowerIncreaseCost.times(Decimal.pow(Decimal.pow(4, 5), player.extraDimPowerIncrease - 15))
		getEl("postinfi04").innerHTML = "Further increase all Dimension multipliers<br>x^" + galMults.u31().toFixed(2) + (player.extraDimPowerIncrease < 40 ? " -> x^" + ((galMults.u31() + 0.02).toFixed(2)) + "<br>Cost: " + shorten(player.dimPowerIncreaseCost) + " IP" : "")
	}
}

//v1.41
function galIP(){
	let gal = player.galaxies
	let rg = player.replicanti.galaxies
	if (player.timestudy.studies.includes(132)) rg *= 1.4
	if (player.timestudy.studies.includes(133)) rg *= 1.5
	if (hasAch("r122")) gal += 100*rg 
	if (gal < 5) return gal
	if (gal < 50) return 2 + Math.pow(5 + gal,0.6)
	return Math.min(Math.pow(gal, .4) + 7, 155)
}

//v1.5
function renameIC(id) {
	let split=id.split("postc")
	if (split[1]) id=order[parseInt(split[1])-1]
	return id
}

//v1.501
function isADSCRunning() {
	return inNC(13) || (player.currentChallenge === "postc1" && inNGM(2)) || player.tickspeedBoosts !== undefined
}

//v1.6
getEl("postinfi50").onclick = function() {
    buyInfinityUpgrade("postinfi50", player.tickspeedBoosts==undefined?1e25:2e18);
}

getEl("postinfi51").onclick = function() {
    buyInfinityUpgrade("postinfi51", player.tickspeedBoosts==undefined?1e29:1e20);
}

getEl("postinfi52").onclick = function() {
    buyInfinityUpgrade("postinfi52", player.tickspeedBoosts==undefined?1e33:1e25);
}

getEl("postinfi53").onclick = function() {
    buyInfinityUpgrade("postinfi53", player.tickspeedBoosts==undefined?1e37:1e29);
}

//v1.9
getEl("postinfi60").onclick = function() {
    buyInfinityUpgrade("postinfi60", 1e50);
}

getEl("postinfi61").onclick = function() {
    buyInfinityUpgrade("postinfi61", new Decimal("1e450"));
}

getEl("postinfi62").onclick = function() {
    buyInfinityUpgrade("postinfi62", new Decimal("1e700"));
}

getEl("postinfi63").onclick = function() {
    buyInfinityUpgrade("postinfi63", new Decimal("1e2000"));
}

function getNewB60Mult(){
	let gal = player.galaxies-95
	return Decimal.pow(10, (120 * gal)).max(1)
}

function getB60Mult() {
	let gal = player.galaxies
	if (gal >= 295 && getEternitied() > 0) return Decimal.pow(3,200).times(Decimal.pow(2.5,gal-295))
	return Decimal.pow(3, gal - 95).max(1)
}

//v2.3
let R127 = Math.pow(0.5772156649 + .5 * Math.pow(Math.PI,.5) + 3.35988 + 0.43828 + 0.95531, 0.739085 + 1.30637) 
//.5772156649 is the E-M constant, .5*Math.pow(Math.PI,.5) is root(pi)/2, 0.739085 is the unique real solution to cos(x)=x, 
// 1.30637 is Mills constant, 3.35988 is an approximation of the sum of the recipricals of fibonacci numbers, 0.43828 is the real part of the infinite power tower of i 
// 0.95531 is artan(root2)
	
let R135 = Math.pow(Math.E + Math.PI + 0.56714 + 4.81047 + 0.78343 + 1.75793 + 2.286078 + 1.20205, 1.45136 + .829626)
// obviously e and pi, .286078 + .8296262 are the values given in the achievement 
// 0.56714 is the infinite power towers of 1/e, 0.78343 integral from 0 to 1 of x^x, 4.81047 principal root of i^-i 
// 1.45136 is the root of li, 1.75793 = root(1+root(2+root(3+... , 1.20205 = sum of reciprocals of cubes

//v2.31
let galMults = {
	u11: function() {
		if (player.tickspeedBoosts != undefined) {
			var e = hasGalUpg(46) ? galMults["u46"]() : 1
			var exp = (inNGM(4) && hasGalUpg(41)) ? 2 * e : 1
			var l = 0
			if (player.infinityUpgrades.includes("postinfi61")) l = Math.log10(getInfinitied() + 1)
			if (l > 2) return Decimal.pow(10, l * Math.min(l, 6) * Math.min(l, 4))
			var p = inNGM(5) ? 1 : 2
			return Decimal.pow(10, p + Math.min(4, getInfinitied())).pow(exp)
		}
		if (tmp.ec > 53) return Decimal.pow(10, 2e4)
		let x = getG11Infinities()
		let z = getG11Divider()
		
		//define y
		let y = 2 // it'll get overwritten no matter what
		if (x > 99) y = Math.pow(Math.log(x), Math.log(x) / z) + 14
		else if (x > 4) y = Math.sqrt(x + 5) + 4
		else y = x + 2
		if (hasAch("r82")) y += 30
		
		//softcap y
		if (y > 1000) y = Math.sqrt(1000 * y)
		if (y > 1e4) y = Math.pow(1e8 * y,1/3)
		return Decimal.pow(10, Math.min(y, 2e4));
	},
	u31: function() {
		let x = 1.1 + player.extraDimPowerIncrease * 0.02
		if (player.dilation.upgrades.includes("ngmm4")) x += 0.1
		return x
	},
	u51: function() {
		let x = player.galacticSacrifice.galaxyPoints.log10() / 1e3
		if (x > 200) x = Math.sqrt(x * 200)
		return Decimal.pow(10, x)
	},
	u12: function() {
		var r = 2 * Math.pow(1 + player.galacticSacrifice.time / 600, 0.5)
		if (inNGM(4) && hasGalUpg(42)) {
			m = hasGalUpg(46) ? 10 : 4
			r = Decimal.pow(r, Math.min(m, Math.pow(r, 1/3)))
			if (hasGalUpg(46)) r = Decimal.pow(r, Math.log10(10 + r)).plus(1e20)
		}
		r = Decimal.add(r, 0)
		if (r.gt(1e25)) r = r.div(1e25).pow(.5).times(1e25)
		if (r.gt(1e30)) r = r.div(1e30).pow(.4).times(1e30)
		if (r.gt(1e35)) r = r.div(1e35).pow(.3).times(1e35)
		return r
	},
	u32: function() {
		let x = player.totalmoney
		let exp = .003
		if (hasAch("r123")) exp = .005
		if (inNGM(4)){
			m = 1
			if (hasAch("r63")) m += .01 * player.galacticSacrifice.upgrades.length
			if (hasAch("r64")) m += .02 * tmp.cp
			exp *= m
		}
		let l = Math.max(player.galacticSacrifice.galaxyPoints.log10() - 5e4, 0)
		if (hasAch("r123")) exp += Math.min(.005, l / 2e8)
		if (!player.break) x = x.min(Number.MAX_VALUE)
		if (hasAch("r113")) exp += exp/60
		if (exp > .01) exp = Math.log10(10000 * exp)/200
		if (x.gt(1)){
			y = x.log10()
			if (y > 1e7) y = Math.pow(Math.log10(y) + 3, 7)
			x = Decimal.pow(10, y)
		}
		return x.pow(exp).add(1)
	},
	u13: function() {
		exp = calcG13Exp()
		x = player.galacticSacrifice.galaxyPoints.div(5)
		if (x.gt(1)){
			y = x.log10()
			if (y > 5e5) y = Math.sqrt(5e5*y)
			x = Decimal.pow(10, y)
		}
		return x.plus(1).pow(exp)
	},
	u23: function() {
		let x = player.galacticSacrifice.galaxyPoints.max(1).log10() * .75 + 1
		if (!tmp.ngp3l && hasAch("r138")) x *= Decimal.add(player.dilation.bestIP,10).log10()
		if (hasAch("r75") && inNGM(4)) x *= 2
		return x
	},
	u33: function() {
		if (player.tickspeedBoosts != undefined) return player.galacticSacrifice.galaxyPoints.div(1e10).add(1).log10()/5+1
		let x = player.galacticSacrifice.galaxyPoints.max(1).log10() / 4 + 1
		if (hasAch("r75") && inNGM(4)) x *= 2
		return x
	},
	u43: function() {
		return Decimal.pow(player.galacticSacrifice.galaxyPoints.log10(), 50)
	},
	u24: function() {
		return player.galacticSacrifice.galaxyPoints.pow(0.25).div(20).max(0.2)
	},
	u15: function() {
		return Decimal.pow(10, getInfinitied() + 2).max(1).min(1e6).pow(hasGalUpg(16) ? 2 : 1)
	},
	u25: function() {
		let r = Math.max(player.galacticSacrifice.galaxyPoints.log10() - 2, 1)
		if (r > 2.5) r = Math.pow(r * 6.25, 1/3)
		r =  Math.pow(r, hasGalUpg(26) ? 2 : 1)
		if (r > 10) r = 10 * Math.log10(r)
		return r
	},
	u35: function() {
		let r = new Decimal(1)
		let p = getProductBoughtMult()
		for (var d = 1; d < 9; d++) {
			r = Decimal.times(player["timeDimension" + d].bought / 6, p).max(1).times(r)
		}
		r = r.pow(hasGalUpg(36) ? 2 : 1)
		if (r.gt(1e100)) r = Decimal.pow(r.log10(), 50)
		return r
	},
	u46: function() {
		var r = Math.pow(player.galacticSacrifice.galaxyPoints.plus(10).log10(), .2) - 1
		if (r < 1) return 1
		if (r > 2) return 2
		return r
	}
}

let galMultDisplays = {
	u11: function(x) {
		return shortenDimensions(x)
	},
	u15: function(x) {
		return shortenDimensions(x)
	},
	u31: function(x) {
		return x.toFixed(2)
	},
	u25: function(x) {
		return x.toFixed(2)
	},
	u43: function(x) {
		return x.toFixed(2)
	},
	u46: function(x) {
		return (x * 100 - 100).toFixed(2)
	},
}

let galConditions = {
	r4: function() {
		var unl = player.challenges.includes("postcngmm_1") || player.eternities > 0
		return player.infinityUpgrades.includes("postinfi63") || (inNGM(4) && unl)
	},
	r5: function() {
		return player.infinityUpgrades.includes("postinfi63")
	},
	c4: function() {
		return player.tickspeedBoosts !== undefined
	},
	c5: function() {
		return inNGM(4)
	},
	c6: function(){
		return inNGM(4) && player.totalmoney.log10() >= 666
	}
}

//v2.4
function getGSoffset(offset=0) {
	return getGSAmount(offset)
}

function getG11Infinities() {
	let x = getInfinitied()
	let e = getEternitied()
	if (e == 0 && x > 1e6) x = Math.min(Math.pow(x * 1e12, 1/3), 1e7)
	if (e > 0 && x < 1e8 && tmp.cp > 0) x += 2e6
	if (player.infinityUpgrades.includes("postinfi61")) x += 1e7
	if (player.infinityUpgrades.includes("postinfi61") && player.galacticSacrifice.upgrades.length > 9) x += player.galacticSacrifice.upgrades.length * 1e7
	x += tmp.ec * 1e10
	if (x > 1e8) x = Math.sqrt(x * 1e8)
	return x
}

function getG11Divider(){
	let z = 10
	let c = tmp.cp // challenges completed
	if (c > 0 && player.challenges.includes("postcngmm_1")) z -= (c + 6) / 4
	if (c > 6) z += 0.085 * tmp.cp - 0.31
	if (player.infinityUpgrades.includes("postinfi61")) z -= .1
	z -= Math.pow(tmp.ec, 0.3)/10
	if (getEternitied() > 0) z -= 0.5
	if (z < 6) z = Math.pow(1296 * z, .2)
	return z
}

//v3
function getDil44Mult() {
	return player.dilation.freeGalaxies * 0
}

function getDil45Mult() {
	return player.replicanti.amount.max(1).log10() * 0+1
}

function getDil71Mult() {
	return player.meta.bestAntimatter.max(1).log10() * 0+1
}

function getDil72Mult() {
	return player.meta.bestAntimatter.max(1).log10() * 0+1
}

function getNewB60Mult(){
	let gal = player.galaxies - 95
	if (gal < 0) gal = 0
	return Decimal.pow(10, 120 * gal)
}

function calcG13Exp(){
	let exp = 3
	if (hasAch("r75") && inNGM(4)) exp *= 2
	if (player.infinityUpgrades.includes("postinfi62") && hasAch("r117") && player.tickspeedBoosts == undefined) {
		if (player.currentEternityChall === "") exp *= Math.pow(.8 + Math.log(player.resets + 3), 2.08)
		else if (player.currentEternityChall == "eterc9" || player.currentEternityChall == "eterc7" || player.currentEternityChall == "eterc6") {
			exp *= Math.pow(.8 + Math.log(player.resets + 3) * (hasAch("r124") ? (8 - player.bestEternity || 6) : 1), 0.5 + hasAch("r124") ? 0.5 : 0)
		}
		else exp *= Math.pow(.8 + Math.log(player.resets+3), 0.5 + hasAch("r124") ? 0.1 : 0)
	} else if (player.infinityUpgrades.includes("postinfi62")){
		if (player.currentEternityChall === "") exp *= Math.pow(Math.log(player.resets + 3), 2)
		else exp *= Math.pow(Math.log(player.resets + 3), 0.5)
	}
	if (player.tickspeedBoosts != undefined && hasAch("r101")) exp *= Math.pow(Math.max(1, 2*player.galaxies), 1/3)
	if (hasAch("r81") && player.currentEternityChall === "") exp += 7
	if (player.tickspeedBoosts != undefined && exp > 100) exp = Math.sqrt(exp) * 10
	if (player.tickspeedBoosts != undefined && hasAch("r117")) exp += Math.sqrt(exp)
	return exp
}

function calcNGMX(data) {
	if (data === undefined) data = player
	return data.aarexModifications.ngmX ||
		(data.pSac !== undefined ? 5 :
		data.tdBoosts !== undefined ? 4 :
		data.tickspeedBoosts !== undefined ? 3 :
		data.galacticSacrifice !== undefined ? 2 :
		data.aarexModifications.newGameMinusVersion ? 1 :
		0)
}

function exitNGMM() {
	delete tmp.mod.ngmX
	delete player.galacticSacrifice
	delete player.tickspeedBoosts
	delete player.tdBoosts
	delete player.pSac

	tmp.ngmX = calcNGMX()
	tmp.mod.ngmX = tmp.ngmX
	getEl("gSacrifice").style.display = "none"
	ph.reset()
}