function getDimensionBoostPower(next, focusOn) {
	if (inNC(11) || inNC(15) || player.currentChallenge == "postc1" || player.currentChallenge == "postcngm3_1" || player.currentEternityChall == "eterc13") return new Decimal(1);

	var ret = 2
	if (!inNGM(2)) {
		if (player.infinityUpgrades.includes("resetMult")) ret = 2.5
		if (player.challenges.includes("postc7")) ret = 4
		if (player.currentChallenge == "postc7" || inQC(6) || hasTimeStudy(81)) ret = 10
	}
	if (player.boughtDims) ret += player.timestudy.ers_studies[4] + (next ? 1 : 0)
	if (hasGalUpg(23) && ((!inNC(14) && player.currentChallenge != "postcngm3_3") || player.tickspeedBoosts == undefined || inNGM(4)) && player.currentChallenge != "postcngm3_4") ret *= galMults.u23()
	if (hasPU(31)) ret *= puMults[31]()
	if (player.infinityUpgrades.includes("resetMult") && inNGM(2)) ret *= 1.2 + 0.05 * player.infinityPoints.max(1).log(10)
	if (!player.boughtDims && hasAch("r101")) ret = ret * 1.01
	if (hasTimeStudy(83)) ret = tsMults[83]().times(ret);
	if (hasTimeStudy(231)) ret = tsMults[231]().times(ret)
	if (inNGM(2)) {
		if (player.currentChallenge == "postc7" || inQC(6) || hasTimeStudy(81)) ret = Decimal.pow(ret, 3)
		else if (player.challenges.includes("postc7")) ret = Decimal.pow(ret, 2)
	}
	if (hasTS(152) && tmp.ngC) ret = Decimal.mul(ret, tsMults[152]())
	if (hasDilationStudy(6) && !inQC(3) && !inQC(7)) ret = getExtraDimensionBoostPower().times(ret)

	return new Decimal(ret)
}

function softReset(bulk, tier = 1) {
	if (tmp.ri) return;
	var oldResets = player.resets
	player.resets += bulk;
	if (player.masterystudies) if (player.resets > 4) player.old = false
	if (inNC(14) && player.tickspeedBoosts == undefined) player.tickBoughtThisInf.pastResets.push({resets: player.resets, bought: player.tickBoughtThisInf.current})
	if (moreEMsUnlocked() && getEternitied() >= 1e9 && tier == 1) {
		skipResets()
		if (!pl.on()) player.matter = new Decimal(0)
		player.postC8Mult = new Decimal(1)
		player.dbPower = getDimensionBoostPower()
		return
	}
	resetDimensions()
	player.totalBoughtDims = resetTotalBought()
	player.sacrificed = new Decimal(0)
	player.chall3Pow = new Decimal(0.01)
	player.matter = new Decimal(0)
	player.chall11Pow = new Decimal(1)
	player.postC4Tier = 1
	player.postC8Mult = new Decimal(1)
	if (inNGM(5)) resetIDsOnNGM5()
	resetTDsOnNGM4()
	reduceDimCosts()
	skipResets()
	if (player.currentChallenge == "postc2") {
		player.eightAmount = new Decimal(1);
		player.eightBought = 1;
	}
	setInitialResetPower()

	if (player.resets > 4 && tmp.ngmX < 5) {
		getEl("confirmation").style.display = "inline-block";
		getEl("sacrifice").style.display = "inline-block";
		getEl("confirmations").style.display = "inline-block";
		getEl("sacConfirmBtn").style.display = "inline-block";
	}
	if (inNGM(2) && player.galaxies > 0 && player.resets > (inNGM(5) ? 3 : 4)) {
		getEl("gSacrifice").style.display = "inline-block"
		getEl("gConfirmation").style.display = "inline-block"
	}

	hideDimensions()
	tmp.tickUpdate = true;
	if (!hasAch("r111")) setInitialMoney()
}

function setInitialMoney() {
	var x = 10
	if (player.challenges.includes("challenge1")) x = 100
	if (inNGM(4)) x = 200
	if (hasAch("ngm5p12")) x = 250
	if (hasAch("r37")) x = 1000
	if (hasAch("r54")) x = 2e5
	if (hasAch("r55")) x = 1e10
	if (hasAch("r78")) x = 2e25
	player.money = new Decimal(x)
}

function setInitialTickspeed() {
	resetTickspeed()

	//IC3 Multiplier
	ic3Power = getInitPostC3Power()
	player.postC3Reward = Decimal.pow(getPostC3Mult(), ic3Power)
}

function setInitialResetPower() {
	var dimensionBoostPower = getDimensionBoostPower()
	if (tmp.ngp3 && getEternitied() >= 1e9 && player.dilation.upgrades.includes("ngpp6")) player.dbPower = dimensionBoostPower

	setInitialTickspeed()
}

function maxBuyDimBoosts(manual) {
	let tier = player.pSac != undefined ? 6 : 8
	if (inQC(6)) return
	let maxamount = Math.min(getAmount(getShiftRequirement(0).tier), (player.galaxies >= player.overXGalaxies || manual) ? 1/0 : player.autobuyers[9].priority)
	
	if (player.autobuyers[9].priority >= getAmount(tier) || player.galaxies >= player.overXGalaxies || manual) {
		let x = 1
		let r = 0
		while (maxamount >= getFixedShiftReq(player.resets + x * 2 - 1)) x *= 2
		while (x >= 1) {
			if (maxamount >= getFixedShiftReq(player.resets + x + r - 1)) r += x
			x /= 2
		}

		if (r >= 750) giveAchievement("Costco sells dimboosts now")
		if (r >= 1) softReset(r)
	} else if (getShiftRequirement(0).tier < tier) {
		if (getShiftRequirement(0).amount <= maxamount) softReset(1)
	}
}

function getFixedShiftReq(n){
	return getShiftRequirement(n - player.resets).amount
}

function getShiftRequirement(bulk) {
	let amount = 20
	let mult = getDimboostCostIncrease()
	var resetNum = player.resets + bulk
	var maxTier = inNC(4) || player.pSac != undefined ? 6 : 8
	let tier = Math.min(resetNum + 4, maxTier)
	if (inNGM(4) && player.pSac == undefined) amount = 10
	if (tier == maxTier) amount += Math.max(resetNum + (inNGM(2) && player.tickspeedBoosts === undefined && hasGalUpg(21) ? 2 : 4) - maxTier, 0) * mult
	var costStart = getSupersonicStart()
	if (player.currentEternityChall == "eterc5") {
		amount += Math.pow(resetNum, 3) + resetNum
	} else if (resetNum >= costStart) {
		var multInc = getSupersonicMultIncrease()
		var increased = Math.ceil((resetNum - costStart + 1) / 4e4)
		var offset = (resetNum - costStart) % 4e4 + 1
		amount += (increased * (increased * 2e4 - 2e4 + offset)) * multInc
		mult += multInc * increased
	}

	if (player.infinityUpgrades.includes("resetBoost")) amount -= 9;
	if (player.challenges.includes("postc5")) amount -= 1
	if (player.infinityUpgradesRespecced != undefined) amount -= getInfUpgPow(4)

	return {tier: tier, amount: amount, mult: mult};
}

function getDimboostCostIncrease () {
	let ret = 15
	if (inNGM(4)) ret += 5
	if (player.currentChallenge=="postcngmm_1") return ret
	if (inNGM(2)) {
		if (hasGalUpg(21)) ret -= 10
		if (hasGalUpg(43) && tmp.mod.ngmX >= 4) {
			e = hasGalUpg(46) ? galMults["u46"]() : 1
			if (hasAch("r75")) e *= 2
			ret -= e
		}
		if (player.infinityUpgrades.includes('dimboostCost')) ret -= 1
		if (player.infinityUpgrades.includes("postinfi50")) ret -= 0.5
	} else {
		if (masteryStudies.has(261)) ret -= 1
		if (inNC(4)) ret += 5
		if (player.boughtDims && hasAch('r101')) ret -= Math.min(8, Math.pow(player.eternityPoints.max(1).log(10), .25))
	}
	if (hasTimeStudy(211)) ret -= tsMults[211]()
	if (hasTimeStudy(222)) ret -= tsMults[222]()
	return ret;
}

function getSupersonicStart() {
	if (inQC(5)) return 0
	if (inNGM(2)) return 1/0
	let r = 56e4
	if (tmp.ngC) r = 1
	else if (tmp.mod.nguspV && !tmp.mod.nguepV) r = 1e5
	if (tmp.ngp3) {
		if (masteryStudies.has(331)) r += 24e4
		if (isNanoEffectUsed("supersonic_start")) if (tmp.nf.effects.supersonic_start) r += tmp.nf.effects.supersonic_start 
	}
	return r
}

function getSupersonicMultIncrease() {
	if (inQC(5)) return 20
	let r = 4
	if (hasTS(194) && tmp.ngC) r = 2
	if (masteryStudies.has(331)) r = 1
	return r
}

getEl("softReset").onclick = function () {
	if (inQC(6)) return
	if (cantReset()) return
	var req = getShiftRequirement(0)
	if (tmp.ri || getAmount(req.tier) < req.amount) return;
	auto = false;
	var pastResets = player.resets
	if ((player.infinityUpgrades.includes("bulkBoost") || (hasAch("r28") && player.tickspeedBoosts !== undefined) || player.autobuyers[9].bulkBought) && player.resets > (inNC(4) || player.pSac != undefined ? 1 : 3) && (!inNC(14) || !(inNGM(4)))) maxBuyDimBoosts(true);
	else softReset(1)
	if (player.resets <= pastResets) return

	let pow = getDimensionBoostPower()
	if (pow.eq(1)) return
	for (var tier = 1; tier <= 8; tier++) if (player.resets >= tier) floatText("D" + tier, "x" + shortenDimensions(pow.pow(player.resets + 1 - tier)))
};

function skipResets() {
	if (inNC(0)) {
		var upToWhat = 0
		for (var s = 1;s < 4; s++) if (player.infinityUpgrades.includes("skipReset" + s)) upToWhat = s
		if (player.infinityUpgrades.includes("skipResetGalaxy")) {
			upToWhat = 4 
			if (player.galaxies < 1) player.galaxies = 1
		}
		if (player.resets < upToWhat) player.resets=upToWhat
		if (player.tickspeedBoosts<upToWhat * 4) player.tickspeedBoosts = upToWhat * 4
	}
}

function getTotalResets() {
	let r = player.resets + player.galaxies
	if (player.tickspeedBoosts) r += player.tickspeedBoosts
	if (inNGM(4)) r += player.tdBoosts
	return r
}