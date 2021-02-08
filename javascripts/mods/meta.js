//meta dimensions
function getMetaAntimatterStart(bigRip) {
	let x = 10
	if (speedrunMilestonesReached >= 19 && !bigRip) x = 1e25
	else if (hasAch("ngpp12")) x = 100
	return new Decimal(x)
}

function getDilationMetaDimensionMultiplier() {
	let pow = 0.1
	let div = 1e40
	if (isNanoEffectUsed("dt_to_ma_exp")) if (tmp.nf.effects.dt_to_ma_exp) pow = tmp.nf.effects.dt_to_ma_exp //this is a quick fix, but we need to fix this bug
	if (tmp.mod.nguspV !== undefined) div = 1e50
	if (tmp.mod.ngudpV && !tmp.mod.nguepV) {
		let l = tmp.qu.colorPowers.b.plus(10).log10()
		let x = 3 - Math.log10(l + 1)
		if (tmp.mod.ngumuV) {
			if (x < 2) x = 2 - 2 * (2 - x) / (5 - x)
		} else {
			x = Math.max(x, 2)
			if (l > 5000) x -= Math.min(Math.log10(l - 4900) - 2, 2) / 3
		}
		pow /= x
	}
	let ret = player.dilation.dilatedTime.div(div).pow(pow).plus(1)
	return ret
}

function getMetaDimensionMultiplier(tier) {
	if (player.currentEternityChall === "eterc11") return new Decimal(1)
	let ret = Decimal.pow(getPerTenMetaPower(), Math.floor(player.meta[tier].bought / 10))
	ret = ret.times(Decimal.pow(getMetaBoostPower(), Math.max(player.meta.resets + 1 - tier, 0)))
	ret = ret.times(tmp.mdgm) //Global multiplier of all Meta Dimensions
	//Quantum upgrades
	if (tier == 1 && GUActive("rg3")) ret = ret.times(getRG3Effect())

	//QC Rewards:
	if (isQCRewardActive(4) && tier % 2 > 0) ret = ret.times(tmp.qcRewards[4])

	//Achievements:
	if (tier == 8 && hasAch("ng3p22")) ret = ret.times(1 + Math.pow(player.meta[1].amount.plus(1).log10() / 10, 2))
	if (tier == 1 && hasAch("ng3p31")) ret = ret.times(player.meta.antimatter.plus(1).pow(.001))
	if (tier == 1 && hasAch("ng3p17")) ret = ret.times(Math.max(1,Math.log10(player.totalmoney.plus(10).log10())))

	if (hasDilationUpg("ngmm8")) ret = ret.pow(getDil71Mult())
	return ret
}

function getMetaDimensionGlobalMultiplier() {
	let ret = getDilationMetaDimensionMultiplier()
	if (hasDilationUpg("ngpp3")) ret = ret.times(getDil14Bonus())
	if (hasAch("ngpp12")) ret = ret.times(1.1)
	if (tmp.ngp3) {
		//Qunatum Upgrades
		if (GUActive("br4")) ret = ret.times(getBR4Effect())

		//Mastery Studies
		if (masteryStudies.has(262)) ret = ret.times(getMTSMult(262))
		if (masteryStudies.has(282)) ret = ret.times(getMTSMult(282))

		//QC Rewards
		if (isQCRewardActive(3)) ret = ret.times(tmp.qcRewards[3])
		if (isQCRewardActive(6)) ret = ret.times(tmp.qcRewards[6])

		//Achievement Rewards
		var ng3p13exp = Math.sqrt(Decimal.plus(quantumWorth, 1).log10())
		if (hasAch("ng3p13")) ret = ret.times(Decimal.pow(8, ng3p13exp))

		if (hasAch("ng3p57")) ret = ret.times(1 + player.timeShards.plus(1).log10())
	}
	return ret
}

function getPerTenMetaPower() {
	let r = 2
	let exp = 1
	if (hasDilationUpg("ngpp4")) r = getDil15Bonus()
	return Math.pow(r, exp)
}

function getMetaBoostPower() {
	if (inQC(8)) return 1
	let r = 2
	if (hasDilationUpg("ngpp4")) r = getDil15Bonus()
	if (hasAch("ngpp14") && !tmp.ngp3) r *= 1.01

	let exp = 1
	if (tmp.ngp3) exp = 1.05
	if (hasAch("ng3p26")) exp = 1.5 - 0.5 / Math.log2(player.meta.resets / 100 + 2)
	return Math.pow(r, exp)
}

function getMetaDimensionDescription(tier) {
	if (tier > Math.min(7, player.meta.resets + 3) - (inQC(4) ? 1 : 0)) return getFullExpansion(player.meta[tier].bought) + ' (' + dimMetaBought(tier) + ')';
	else {
		let a = shortenDimensions(player.meta[tier].amount)
		if (player.meta.bestOverGhostifies.log10() > 1e4) return a
		let b = ' (' + dimMetaBought(tier) + ')  (+' + formatValue(player.options.notation, getMetaDimensionRateOfChange(tier), 2, 2) + dimDescEnd
		return a+b
	}
}

function getMetaDimensionRateOfChange(tier) {
	let toGain = getMetaDimensionProduction(tier + (inQC(4) ? 2 : 1));

	var current = player.meta[tier].amount.max(1);
	if (tmp.mod.logRateChange) {
		var change = current.add(toGain.div(10)).log10() - current.log10()
		if (change < 0 || isNaN(change)) change = 0
	} else var change  = toGain.times(10).dividedBy(current);

	return change;
}

function canBuyMetaDimension(tier) {
    if (tier > player.meta.resets + 4) return false;
    if (speedrunMilestonesReached < 17 && tier > 1 && player.meta[tier - 1].amount.eq(0)) return false;
    return true;
}

function clearMetaDimensions () { //Resets costs and amounts
	for (var i = 1; i <= 8; i++) {
		player.meta[i].amount = new Decimal(0);
		player.meta[i].bought = 0;
		player.meta[i].cost = new Decimal(initCost[i - 1]);
	}
}

function getMetaShiftRequirement() { 
	var mdb = player.meta.resets
	var data = {tier: Math.min(8, mdb + 4), amount: 20}
	var inQC4 = inQC(4)
	data.mult = inQC4 ? 5.5 : 15
	if (masteryStudies.has(312)) data.mult -= 1

	data.amount += data.mult * Math.max(mdb - 4, 0)
	if (isTreeUpgActive(1)) data.amount -= getTreeUpgradeEffect(1)
	if (hasNU(1)) data.amount -= tmp.nu[1]

	data.scalingStart = inQC4 ? 55 : 15
	if (player.meta.resets >= data.scalingStart) {
		var multAdded = inQC4 ? 14.5 : 5
		data.amount += multAdded * (mdb - data.scalingStart)
		data.mult += multAdded
	}
	
	return data
}

function getMetaDimensionBoostRequirement(){
	return getMetaShiftRequirement()
}

function metaBoost() {
	let req = getMetaShiftRequirement()
	let isNU1ReductionActive = hasNU(1) ? !tmp.qu.bigRip.active : false
	if (!(player.meta[req.tier].bought>=req.amount)) return
	if (isRewardEnabled(27) && req.tier > 7) {
		if (isNU1ReductionActive) {
			if (player.meta.resets < req.scalingStart) {
				player.meta.resets = Math.min(player.meta.resets + Math.floor((player.meta[8].bought - req.amount) / (req.mult + 1)) + 1, req.scalingStart)
				if (player.meta.resets == req.scalingStart) req = getMetaShiftRequirement()
			}
			if (player.meta.resets >= req.scalingStart && player.meta.resets < 110) {
				player.meta.resets=Math.min(player.meta.resets + Math.floor((player.meta[8].bought - req.amount) / (req.mult + 1)) + 1,110)
				if (player.meta.resets>109) req=getMetaShiftRequirement()
			}
			if (player.meta.resets > 109) player.meta.resets += Math.floor((player.meta[8].bought - req.amount) / req.mult) + 1
		} else {
			if (player.meta.resets < req.scalingStart) {
				player.meta.resets = Math.min(player.meta.resets + Math.floor((player.meta[8].bought - req.amount) / req.mult) + 1, req.scalingStart)
				if (player.meta.resets == req.scalingStart) req = getMetaShiftRequirement()
			}
			if (player.meta.resets >= req.scalingStart) player.meta.resets += Math.floor((player.meta[8].bought - req.amount) / req.mult) + 1
		}
		if (inQC(4)) if (player.meta[8].bought >= getMetaShiftRequirement().amount) player.meta.resets++
	} else player.meta.resets++
	if (hasAch("ng3p72")) return
	player.meta.antimatter = getMetaAntimatterStart()
	clearMetaDimensions()
	if (!tmp.ngp3 || !tmp.qu.bigRip.active) getEl("quantumbtn").style.display="none"
}


function dimMetaCostMult(tier) {
	return new Decimal(costMults[tier]);
}

function dimMetaBought(tier) {
	return player.meta[tier].bought % 10;
}

function metaBuyOneDimension(tier) {
	var cost = player.meta[tier].cost;
	if (!canBuyMetaDimension(tier)) return false;
	if (!canAffordMetaDimension(cost)) return false;
	player.meta.antimatter = player.meta.antimatter.minus(cost);
	player.meta[tier].amount = player.meta[tier].amount.plus(1);
	player.meta[tier].bought++;
	if (player.meta[tier].bought % 10 < 1) {
		player.meta[tier].cost = getMetaCost(tier, player.meta[tier].bought / 10)
	}
	if (tier > 7) giveAchievement("And still no ninth dimension...")
	return true;
}

function getMetaCost(tier, boughtTen) {
	let cost = Decimal.times(initCost[tier], dimMetaCostMult(tier).pow(boughtTen))
	let scalingStart = Math.ceil(Decimal.div(getMetaCostScalingStart(), initCost[tier]).log(dimMetaCostMult(tier)))
	if (boughtTen >= scalingStart) cost = cost.times(Decimal.pow(10, (boughtTen - scalingStart + 1) * (boughtTen - scalingStart + 2) / 2))
	return cost
}

function getMetaCostScalingStart() {
	return "1e1000"
}

function getMetaMaxCost(tier) {
	return player.meta[tier].cost.times(10 - dimMetaBought(tier));
}

function metaBuyManyDimension(tier) {
	var cost = getMetaMaxCost(tier);
	if (!canBuyMetaDimension(tier)) {
		return false;
	}
	if (!canAffordMetaDimension(cost)) {
		return false;
	}
	player.meta.antimatter = player.meta.antimatter.minus(cost);
	player.meta[tier].amount = player.meta[tier].amount.plus(10 - dimMetaBought(tier));
	player.meta[tier].bought += 10 - dimMetaBought(tier)
	player.meta[tier].cost = getMetaCost(tier, player.meta[tier].bought / 10)
	if (tier > 7) giveAchievement("And still no ninth dimension...")
	return true;
}

function buyMaxMetaDimension(tier) {
	if (!canBuyMetaDimension(tier)) return
	if (getMetaMaxCost(tier).gt(player.meta.antimatter)) return
	var currentBought = Math.floor(player.meta[tier].bought / 10)
	var bought = player.meta.antimatter.div(10).div(initCost[tier]).log(dimMetaCostMult(tier)) + 1
	var scalingStart = Math.ceil(Decimal.div(getMetaCostScalingStart(), initCost[tier]).log(dimMetaCostMult(tier)))
	if (bought >= scalingStart) {
		let b = dimMetaCostMult(tier).log10() + 0.5
		bought = Math.sqrt(b * b + 2 * (bought - scalingStart) * dimMetaCostMult(tier).log10()) - b + scalingStart
	}
	bought = Math.floor(bought) - currentBought
	var num = bought
	var tempMA = player.meta.antimatter
	if (num > 1) {
		while (num > 0) {
			var temp = tempMA
			var cost = getMetaCost(tier, currentBought + num - 1).times(num > 1 ? 10 : 10 - dimMetaBought(tier))
			if (cost.gt(tempMA)) {
				tempMA = player.meta.antimatter.sub(cost)
				bought--
			} else tempMA = tempMA.sub(cost)
			if (temp.eq(tempMA) || currentBought + num > 9007199254740991) break
			num--
		}
	} else {
		tempMA = tempMA.sub(getMetaCost(tier, currentBought).times(10 - dimMetaBought(tier)))
		bought = 1
	}
	player.meta.antimatter = tempMA
	player.meta[tier].amount = player.meta[tier].amount.add(bought * 10 - dimMetaBought(tier))
	player.meta[tier].bought += bought * 10 - dimMetaBought(tier)
	player.meta[tier].cost = getMetaCost(tier, currentBought + bought)
	if (tier >= 8) giveAchievement("And still no ninth dimension...")
}

function canAffordMetaDimension(cost) {
	return cost.lte(player.meta.antimatter);
}

for (let i = 1; i <= 8; i++) {
	getEl("meta" + i).onclick = function () {
		if (moreEMsUnlocked() && (ph.did("quantum") || getEternitied() >= 1e12)) player.autoEterOptions["md" + i] = !player.autoEterOptions["md" + i]
		else metaBuyOneDimension(i)

		if (speedrunMilestonesReached >= 28) {
			var removeMaxAll = false
			for (var d = 1; d <= 8; d++) {
				if (player.autoEterOptions["md" + d]) {
					if (d == 8) removeMaxAll = true
				} else break
			}
			getEl("metaMaxAllDiv").style.display = removeMaxAll ? "none" : ""
		}
	}
	getEl("metaMax" + i).onclick = function () {
		if (shiftDown && moreEMsUnlocked() && (ph.did("quantum") || getEternitied() >= 1e12)) metaBuyOneDimension(i)
		else metaBuyManyDimension(i);
	}
}

getEl("metaMaxAll").onclick = function () {
	for (let i = 1; i <= 8; i++) buyMaxMetaDimension(i)
}

getEl("metaSoftReset").onclick = function () {
	metaBoost();
}

function getMetaDimensionProduction(tier) {
	let ret = player.meta[tier].amount.floor()
	if (inQC(4)) {
		if (tier == 1) ret = ret.plus(player.meta[2].amount.floor().pow(1.3))
		else if (tier == 4) ret = ret.pow(1.5)
	}
	return ret.times(getMetaDimensionMultiplier(tier));
}

function getExtraDimensionBoostPower() {
	if (inQC(7) || inQC(9) || player.currentEternityChall == "eterc14") return new Decimal(1)
	let r = getExtraDimensionBoostPowerUse()
	r = Decimal.pow(r, getMADimBoostPowerExp(r)).max(1)
	if (!inQC(3)) r = r.add(1)
	if (tmp.mod.nguspV) {
		let l = r.log(2)
		if (l > 1024) r = Decimal.pow(2, Math.pow(l * 32, 2/3))
	}
	return r
}

function getExtraDimensionBoostPowerUse() {
	if (hasAch("ng3p71")) return player.meta.bestOverQuantums
	return player.meta.bestAntimatter
}

function getExtraDimensionBoostPowerExponent(ma = player.meta.antimatter){
	return getMADimBoostPowerExp(ma)
}

function getMADimBoostPowerExp(ma) {
	let power = 8
	if (inQC(3)) {
		power = Math.pow(ma.log10() / 8, 2)
		if (power > 1e8) power = Math.pow(power * 1e6, 4/7)
		return power
	}
	if (hasDilationUpg("ngpp5")) power++
	if (ECComps("eterc13")) power += getECReward(13)
	if (isNanoEffectUsed("ma_effect_exp")) power += tmp.nf.effects.ma_effect_exp
	return power
}

function getDil14Bonus() {
	return 1 + Math.log10(1 - Math.min(0, player.tickspeed.log(10)));
}

function getDil17Bonus() {
	let r = player.meta.bestAntimatter.max(1).log10()
	if (false && tmp.ngp3) r = Decimal.pow(1.01, r)
	else r = Math.sqrt(r)
	return r
}

function updateOverallMetaDimensionsStuff(){
	getEl("metaAntimatterAmount").textContent = shortenMoney(player.meta.antimatter)
	getEl("metaAntimatterBest").textContent = shortenMoney(player.meta.bestAntimatter)
	getEl("bestAntimatterQuantum").textContent = player.masterystudies && ph.did("quantum") ? "Your best" + (ph.did("ghostify") ? "" : "-ever") + " meta-antimatter" + (ph.did("ghostify") ? " in this Ghostify" : "") + " was " + shortenMoney(player.meta.bestOverQuantums) + "." : ""
	getEl("bestAntimatterTranslation").innerHTML = (tmp.ngp3 && tmp.mod.nguspV === undefined && (inQC(3) || tmp.qu.nanofield.rewards >= 2) && !inQC(7)) ? ', which is raised to the power of <span id="metaAntimatterPower" style="font-size:35px; color: black">'+formatValue(player.options.notation, getMADimBoostPowerExp(getExtraDimensionBoostPowerUse()), 2, 1)+'</span>, and then t' : "which is t"
	setAndMaybeShow("bestMAOverGhostifies", ph.did("ghostify"), '"Your best-ever meta-antimatter was " + shortenMoney(player.meta.bestOverGhostifies) + "."')
	getEl("metaAntimatterEffect").textContent = shortenMoney(getExtraDimensionBoostPower())
	getEl("metaAntimatterPerSec").textContent = 'You are getting ' + shortenDimensions(getMetaDimensionProduction(1)) + ' meta-antimatter per second.'
}

function updateMetaDimensions () {
	updateOverallMetaDimensionsStuff()
	let showDim = false
	let useTwo = player.options.notation == "Logarithm" ? 2 : 0
	let autod = moreEMsUnlocked() && (ph.did("quantum") || getEternitied() >= 1e12)
	for (let tier = 8; tier > 0; tier--) {
		showDim = showDim || canBuyMetaDimension(tier)
		getEl(tier + "MetaRow").style.display = showDim ? "" : "none"
		if (showDim) {
			getEl(tier + "MetaD").textContent = DISPLAY_NAMES[tier] + " Meta Dimension x" + formatValue(player.options.notation, getMetaDimensionMultiplier(tier), 2, 1)
			getEl("meta" + tier + "Amount").textContent = getMetaDimensionDescription(tier)
			getEl("meta" + tier).textContent = autod ? "Auto: " + (player.autoEterOptions["md" + tier] ? "ON" : "OFF") : "Cost: " + formatValue(player.options.notation, player.meta[tier].cost, useTwo, 0) + " MA"
			getEl('meta' + tier).className = autod ? "storebtn" : canAffordMetaDimension(player.meta[tier].cost) ? 'storebtn' : 'unavailablebtn'
			getEl("metaMax"+tier).textContent = (autod ? (shiftDown ? "Singles: " : ph.did("ghostify") ? "" : "Cost: ") : "Until 10: ") + formatValue(player.options.notation, ((shiftDown && autod) ? player.meta[tier].cost : getMetaMaxCost(tier)), useTwo, 0) + " MA"
			getEl('metaMax' + tier).className = canAffordMetaDimension((shiftDown && autod) ? player.meta[tier].cost : getMetaMaxCost(tier)) ? 'storebtn' : 'unavailablebtn'
		}
	}
	var isMetaShift = player.meta.resets < 4
	var metaShiftRequirement = getMetaShiftRequirement()
		getEl("metaResetLabel").textContent = 'Meta-Dimension ' + (isMetaShift ? "Shift" : "Boost") + ' ('+ getFullExpansion(player.meta.resets) +'): requires ' + getFullExpansion(Math.floor(metaShiftRequirement.amount)) + " " + DISPLAY_NAMES[metaShiftRequirement.tier] + " Meta Dimensions"
		getEl("metaSoftReset").textContent = "Reset meta-dimensions for a " + (isMetaShift ? "new dimension" : "boost")
	if (player.meta[metaShiftRequirement.tier].bought >= metaShiftRequirement.amount) {
		getEl("metaSoftReset").className = 'storebtn'
	} else {
		getEl("metaSoftReset").className = 'unavailablebtn'
	}
	var bigRipped = tmp.ngp3 && tmp.qu.bigRip.active
	var req = getQuantumReq()
	var reqGotten = isQuantumReached()
	var newClassName = reqGotten ? (bigRipped && player.options.theme == "Aarex's Modifications" ? "" : "storebtn ") + (bigRipped ? "aarexmodsghostifybtn" : "") : 'unavailablebtn'
	var message = 'Lose all your previous progress, but '
	getEl("quantumResetLabel").textContent = (bigRipped ? 'Ghostify' : 'Quantum') + ': requires ' + shorten(req) + ' meta-antimatter ' + (!inQC(0) ? "and " + shortenCosts(Decimal.pow(10, getQCGoalLog())) + " antimatter" : player.masterystudies ? "and an EC14 completion" : "")
	if (reqGotten && bigRipped && ph.did("ghostify")) {
		var GS = getGHPGain()
		message += "gain " + shortenDimensions(GS) + " Ghost Particle" + (GS.lt(2) ? "" : "s")
	} else if (reqGotten && !bigRipped && (tmp.qu.times || player.ghostify.milestones)) {
		var QS = quarkGain()
		message += "gain " + shortenDimensions(QS) + " quark" + (QS.lt(2) ? "" : "s") + " for boosts"
	} else message += "get a boost"
	getEl("quantum").textContent = message
	if (getEl("quantum").className !== newClassName) getEl("quantum").className = newClassName
}

function getDil15Bonus() {
	let x = 1
	let max = 3

	if (tmp.mod.nguspV !== undefined) x = Math.min(Math.max(player.dilation.dilatedTime.max(1).log10() / 10 - 6.25, 2), max)
	else x = Math.min(Math.log10(player.dilation.dilatedTime.max(1e10).log(10)) + 1, max)

	return x
}

function getMetaUnlCost() {
	if (tmp.mod.nguspV) return 1e21
	return 1e24
}