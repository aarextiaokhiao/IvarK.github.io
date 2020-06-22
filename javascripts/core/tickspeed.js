function getTickSpeedMultiplier() {
	let ret = new Decimal(getGalaxyTickSpeedMultiplier())
	if (tmp.be && tmp.qu.breakEternity.upgrades.includes(5)) ret = ret.div(getBreakUpgMult(5))
	if (inNC(6, 2)) ret = ret.add(player.resets * 1e-3)
	return ret.min(1)
}

function initialGalaxies() {
	let g=player.galaxies
	if (tmp.ngp3&&!tmp.be) {
		g=Math.max(g-player.quantum.electrons.sacGals,0)
		g*=Math.max(Math.min(10-(player.quantum.electrons.amount+g*getELCMult())/16857,1),0)
		if (hasBosonicUpg(14)) g=Math.max(Math.min(player.galaxies,tmp.blu[14]),g)
	}
	if (tmp.rg4) g*=0.4
	if ((inNC(15)||player.currentChallenge=="postc1")&&player.aarexModifications.ngmX==3) g=0
	return g
}

function getGalaxyPower(ng, bi, noDil) {
	let replGalEff = 1
	if (player.boughtDims) replGalEff = Math.log10(player.replicanti.limit.log(2))/Math.log10(2)/10
	else if (ECTimesCompleted("eterc8") > 0) replGalEff = getECReward(8)
	if (player.masterystudies && player.masterystudies.includes("t344")) replGalEff *= getMTSMult(344)
	let extraReplGalPower = 0
	if (player.timestudy.studies.includes(133)) extraReplGalPower += player.replicanti.galaxies/2
	if (player.timestudy.studies.includes(132)) extraReplGalPower += player.replicanti.galaxies*0.4
	extraReplGalPower += extraReplGalaxies
	
	let otherGalPower = player.replicanti.galaxies
	if (player.masterystudies ? player.masterystudies.includes("t342") : false) otherGalPower = (otherGalPower + extraReplGalPower) * replGalEff
	else otherGalPower += Math.min(player.replicanti.galaxies, player.replicanti.gal) * (replGalEff - 1) + extraReplGalPower
	if (!noDil) otherGalPower += Math.floor(player.dilation.freeGalaxies) * ((player.masterystudies ? player.masterystudies.includes("t343") : false) ? replGalEff : 1)
	otherGalPower += tmp.aeg

	let galaxyPower = ng
	if (!tmp.be) galaxyPower = Math.max(ng-(bi?2:0),0)+otherGalPower
	if ((inNC(7)||inQC(4))&&player.galacticSacrifice) galaxyPower *= galaxyPower
	return galaxyPower
}

function getGalaxyEff(bi) {
	let eff = 1
	if (inNC(6, 2)) eff *= 1.5
	if (player.galacticSacrifice) if (player.galacticSacrifice.upgrades.includes(22)) eff *= player.aarexModifications.ngmX>3?2:5;
	if (player.infinityUpgrades.includes("galaxyBoost")) eff *= 2;
	if (player.infinityUpgrades.includes("postGalaxy")) eff *= getPostGalaxyEff();
	if (player.challenges.includes("postc5")) eff *= player.galacticSacrifice ? 1.15 : 1.1;
	if (player.achievements.includes("r86")) eff *= player.galacticSacrifice ? 1.05 : 1.01
	if (player.galacticSacrifice) {
		if (player.achievements.includes("r83")) eff *= 1.05
		if (player.achievements.includes("r45")) eff *= 1.02
		if (player.infinityUpgrades.includes("postinfi51")) eff *= player.tickspeedBoosts!=undefined? 1.15 : 1.2
		if (tmp.cp > 0 && player.achievements.includes("r67")) {
			let x=tmp.cp
			if (x>4&&player.tickspeedBoosts != undefined) x=Math.sqrt(x-1)+2
			eff *= .07*(x)
		}
	}
	if (player.tickspeedBoosts !== undefined && (inNC(5) || player.currentChallenge == "postcngm3_3")) eff *= 0.75
	if (player.achievements.includes("ngpp8") && player.meta != undefined) eff *= 1.001;
	if (player.timestudy.studies.includes(212)) eff *= Math.min(Math.pow(player.timeShards.max(2).log2(), 0.005), 1.1)
	if (player.timestudy.studies.includes(232)&&bi) eff*=tmp.ts232

	if (player.aarexModifications.nguspV !== undefined && player.dilation.active) eff *= exDilationBenefit() + 1
	if (tmp.ngp3) eff *= colorBoosts.r
	if (GUBought("rg2")) eff *= Math.pow(player.dilation.freeGalaxies/5e3+1,0.25)
	if (tmp.rg4) eff *= 1.5
	return eff
}

function getPostGalaxyEff() {
	let ret = player.tickspeedBoosts!=undefined? 1.1 : player.galacticSacrifice ? 1.7 : 1.5
	if (player.aarexModifications.ngexV && !player.challenges.includes("postc5")) ret -= 0.05
	return ret
}

function getGalaxyTickSpeedMultiplier() {
	let g = initialGalaxies()
	if ((player.currentChallenge == "postc3" || isIC3Trapped()) && !tmp.be) {
		if (player.currentChallenge=="postcngmm_3" || player.challenges.includes("postcngmm_3")) return Decimal.pow(player.tickspeedBoosts != undefined ? 0.9995 : 0.998, getGalaxyPower(g) * getGalaxyEff(true))
		return 1
	}
	if (inQC(2)) return 0.89
	let inRS = player.boughtDims != undefined || player.infinityUpgradesRespecced != undefined
	let galaxies = getGalaxyPower(g, !inRS) * getGalaxyEff(true)
	let baseMultiplier = 0.8
	let linearGalaxies = 2
	if (inNC(6, 1) && player.aarexModifications.ngexV) linearGalaxies += 2
	let useLinear = g + player.replicanti.galaxies + player.dilation.freeGalaxies <= linearGalaxies
	if (inNC(6, 1) || player.currentChallenge == "postc1" || player.pSac != undefined) baseMultiplier = 0.83
	if (inRS) {
		linearGalaxies = Math.min(galaxies, linearGalaxies + 3)
		useLinear = true
	}
	if (useLinear) {
		baseMultiplier = 0.9;
		if (inRS && galaxies == 0) baseMultiplier = 0.89
		else if (g == 0) baseMultiplier = 0.89
		if (inNC(6, 1) || player.currentChallenge == "postc1" || player.pSac != undefined) baseMultiplier = 0.93
		if (inRS) {
			baseMultiplier -= linearGalaxies*0.02
		} else {
			let perGalaxy = 0.02 * getGalaxyEff()
			return Math.max(baseMultiplier-g*perGalaxy, 0.83)
		}
	}
	let perGalaxy = player.infinityUpgradesRespecced != undefined ? 0.98 : 0.965
	return Decimal.pow(perGalaxy, galaxies-linearGalaxies).times(baseMultiplier)
}

function getPostC3Mult() {
	let base = getPostC3Base()
	let exp = getPostC3Exp()
	if (exp>1) return Decimal.pow(base,exp)
	return base
}

function getPostC3Base() {
	if (player.currentChallenge=="postcngmm_3") return 1
	let perGalaxy = 0.005;
	if (player.tickspeedBoosts != undefined) perGalaxy = 0.002
	if (inQC(2)) perGalaxy = 0
	if (tmp.ngp3 ? tmp.qu.bigRip.active : false) {
		if (ghostified&&player.ghostify.neutrinos.boosts>8) perGalaxy*=tmp.nb[8]
		if (hasNU(12)) perGalaxy*=tmp.nu[4].free
	}
	if (!player.galacticSacrifice) return player.galaxies*perGalaxy+1.05
	if (tmp.cp>1) {
		if (player.tickspeedBoosts != undefined) perGalaxy *= tmp.cp/10+.9
		else perGalaxy *= tmp.cp/5+.8
	}
	var g=initialGalaxies()
	perGalaxy *= getGalaxyEff()
	let ret = getGalaxyPower(g)*perGalaxy+1.05
	if (inNC(6, 1) || player.currentChallenge == "postc1") ret -= player.aarexModifications.ngmX > 3 ? 0.02 : 0.05
	else if (player.aarexModifications.ngmX == 3) ret -= 0.03
	if (hasPU(33)) ret += puMults[33]()
	return ret
}

function getPostC3Exp() {
	let x=1
	if (player.galacticSacrifice!==undefined) {
		let g=getGalaxyPower(0,false,true)
		if (g<7) return 1+g/5
		let y=5
		let z=.5
		if (tmp.ec>29) {
			if (player.currentEternityChall=="" || player.currentEternityChall=="eterc12") {
				z=.9
				if (tmp.ec>53) y = 1.4-((tmp.ec-54)/15)
				else if (tmp.ec>42) y=2
				else if (tmp.ec>37) y=3.5
			} else z=.6
		}
		x=2+Math.pow(g-5,z)/y
	}
	return x
}

function canBuyTickSpeed() {
  if (player.currentEternityChall == "eterc9") return false
  if (player.galacticSacrifice&&player.tickspeedBoosts==undefined&&inNC(14)&&player.tickBoughtThisInf.current>307) return false
  return canBuyDimension(3);
}

function buyTickSpeed() {
	if (!canBuyTickSpeed()) return false
	if (player.tickSpeedCost.gt(player.money)) return false
	player.money = player.money.minus(player.tickSpeedCost)
	if ((!inNC(5) && player.currentChallenge != "postc5") || player.tickspeedBoosts != undefined) player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
	else multiplySameCosts(player.tickSpeedCost)
	if (costIncreaseActive(player.tickSpeedCost)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(getTickSpeedCostMultiplierIncrease())
	if (inNC(2) || player.currentChallenge == "postc1") player.chall2Pow = 0
	reduceMatter(1)
	if (!tmp.be) {
		player.tickspeed = player.tickspeed.times(getTickSpeedMultiplier())
		if (player.challenges.includes("postc3") || player.currentChallenge == "postc3" || isIC3Trapped()) player.postC3Reward = player.postC3Reward.times(getPostC3Mult())
	}
	player.postC8Mult = new Decimal(1)
	if (inNC(14) && player.tickspeedBoosts == undefined) player.tickBoughtThisInf.current++
	player.why = player.why + 1
	updateTickSpeed()
	return true
}

document.getElementById("tickSpeed").onclick = function () {
	buyTickSpeed()
};

function getTickSpeedCostMultiplierIncrease() {
	if (inQC(7)) return Number.MAX_VALUE
	let ret = player.tickSpeedMultDecrease;
	let exp = .9-.02*ECTimesCompleted("eterc11")
	if (player.currentChallenge === 'postcngmm_2') ret = Math.pow(ret, .5)
	else if (player.challenges.includes('postcngmm_2')) ret = Math.pow(ret, exp / (1 + Math.pow(player.galaxies, 0.7) / 10))
	return ret
}

function buyMaxPostInfTickSpeed (mult) {
	var mi = getTickSpeedCostMultiplierIncrease()
	var a = Math.log10(Math.sqrt(mi))
	var b = player.tickspeedMultiplier.dividedBy(Math.sqrt(mi)).log10()
	var c = player.tickSpeedCost.dividedBy(player.money).log10()
	var discriminant = Math.pow(b, 2) - (c *a* 4)
	if (discriminant < 0) return false
	var buying = Math.floor((Math.sqrt(Math.pow(b, 2) - (c *a *4))-b)/(2 * a))+1
	if (buying <= 0) return false
	if (inNC(2) || player.currentChallenge == "postc1") player.chall2Pow = 0
	reduceMatter(buying)
	if (!tmp.be || player.currentEternityChall == "eterc10") {
		player.tickspeed = player.tickspeed.times(Decimal.pow(mult, buying));
		if (player.challenges.includes("postc3") || player.currentChallenge == "postc3" || isIC3Trapped()) player.postC3Reward = player.postC3Reward.times(Decimal.pow(getPostC3Mult(), buying))
	}
	player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier.pow(buying-1)).times(Decimal.pow(mi, (buying-1)*(buying-2)/2))
	player.tickspeedMultiplier = player.tickspeedMultiplier.times(Decimal.pow(mi, buying-1))
	if (player.money.gte(player.tickSpeedCost)) player.money = player.money.minus(player.tickSpeedCost)
	else if (player.tickSpeedMultDecrease > 2) player.money = new Decimal(0)
	player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
	player.tickspeedMultiplier = player.tickspeedMultiplier.times(mi)
	player.postC8Mult = new Decimal(1)
}

function cannotUsePostInfTickSpeed () {
	return ((inNC(5) || player.currentChallenge == "postc5") && player.tickspeedBoosts == undefined) || !costIncreaseActive(player.tickSpeedCost) || (player.tickSpeedMultDecrease > 2 && player.tickspeedMultiplier.lt(Number.MAX_SAFE_INTEGER));
}

function buyMaxTickSpeed() {
	if (inNC(14) && player.tickspeedBoosts == undefined) return false
	if (!canBuyTickSpeed()) return false
	if (player.tickSpeedCost.gt(player.money)) return false
	let cost = player.tickSpeedCost
	if (((!inNC(5) && player.currentChallenge != "postc5") || player.tickspeedBoosts != undefined) && !inNC(9) && !costIncreaseActive(player.tickSpeedCost)) {
		let max = Number.POSITIVE_INFINITY
		if (!inNC(10) && player.currentChallenge != "postc1" && player.infinityUpgradesRespecced == undefined) max = Math.ceil(Decimal.div(Number.MAX_VALUE, cost).log(10))
		var toBuy = Math.min(Math.floor(player.money.div(cost).times(9).add(1).log(10)), max)
		getOrSubResource(1, Decimal.pow(10, toBuy).sub(1).div(9).times(cost))
		reduceMatter(toBuy)
		if (!tmp.be || player.currentEternityChall == "eterc10") {
			player.tickspeed = Decimal.pow(getTickSpeedMultiplier(), toBuy).times(player.tickspeed)
			if (player.challenges.includes("postc3") || player.currentChallenge == "postc3" || isIC3Trapped()) player.postC3Reward = player.postC3Reward.times(Decimal.pow(getPostC3Mult(), toBuy))
		}
		player.tickSpeedCost = player.tickSpeedCost.times(Decimal.pow(10, toBuy))
		player.postC8Mult = new Decimal(1)
		if (costIncreaseActive(player.tickSpeedCost)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(getTickSpeedCostMultiplierIncrease())
	}
	var mult = getTickSpeedMultiplier()
	if (inNC(2) || player.currentChallenge == "postc1" || player.pSac !== undefined) player.chall2Pow = 0
	if (cannotUsePostInfTickSpeed()) {
		while (player.money.gt(player.tickSpeedCost) && (player.tickSpeedCost.lt(Number.MAX_VALUE) || player.tickSpeedMultDecrease > 2 || (player.currentChallenge == "postc5" && player.tickspeedBoosts == undefined))) {
			player.money = player.money.minus(player.tickSpeedCost);
			if (!inNC(5) && player.currentChallenge != "postc5") player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier);
			else multiplySameCosts(player.tickSpeedCost)
			if (costIncreaseActive(player.tickSpeedCost)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(getTickSpeedCostMultiplierIncrease())
			reduceMatter(1)
			if (!tmp.be || player.currentEternityChall == "eterc10") {
				player.tickspeed = player.tickspeed.times(mult);
				if (player.challenges.includes("postc3") || player.currentChallenge == "postc3" || isIC3Trapped()) player.postC3Reward = player.postC3Reward.times(getPostC3Mult())
			}
			player.postC8Mult = new Decimal(1)
			if (!cannotUsePostInfTickSpeed()) buyMaxPostInfTickSpeed(mult);
		}
	} else {
		buyMaxPostInfTickSpeed(mult);
	}

	updateTickSpeed()
}

function getTickspeed() {
	if (player.infinityUpgradesRespecced != undefined) {
		var ret = Decimal.div(1000, player.tickspeed)
		if (ret.gt(1e25)) ret = Decimal.pow(10, Math.sqrt(ret.log10()) * 5)
		if (player.singularity != undefined) ret = ret.times(getDarkMatterMult())
		return Decimal.div(1000, ret)
	}
	return player.tickspeed
}

function updateTickSpeed() {
	var showTickspeed = player.tickspeed.lt(1e3) || (player.currentChallenge != "postc3" && !isIC3Trapped()) || player.currentChallenge == "postcngmm_3" || (player.challenges.includes("postcngmm_3") && player.tickspeedBoosts === undefined) || tmp.be
	var label = ""
	if (showTickspeed) {
		var tickspeed = getTickspeed()
		var exp = tickspeed.e;
		if (isNaN(exp)) label = 'Tickspeed: Infinite'
		else if (exp > 1) label = 'Tickspeed: ' + tickspeed.toFixed(0)
		else {
			var expExp = Math.max(Math.min(Math.ceil(15 - Math.log10(2 - exp)), 3), 0)
			if (expExp == 0) label = 'Tickspeed: ' + shortenCosts(Decimal.div(1000, tickspeed)) + "/s"
			else label = 'Tickspeed: ' + Math.min(tickspeed.m * Math.pow(10, expExp - 1), Math.pow(10, expExp) - 1).toFixed(0) + ' / ' + shortenCosts(Decimal.pow(10,2 - exp))
		}
	}
	if (player.galacticSacrifice || player.currentChallenge == "postc3" || isIC3Trapped()) label = (showTickspeed ? label + ", Tickspeed m" : "M") + "ultiplier: " + formatValue(player.options.notation, player.postC3Reward, 2, 3)
	if (player.galacticSacrifice && player.tickspeedBoosts == undefined && inNC(14)) {
		label += "<br>You have "+(308-player.tickBoughtThisInf.current)+" tickspeed purchases left."
		document.getElementById("tickSpeedAmount").innerHTML = label
	} else document.getElementById("tickSpeedAmount").textContent = label
}
