function getDimensionBoostPower(next, focusOn) {
	if (inNC(11) || inNC(15) || player.currentChallenge == "postc1" || player.currentChallenge == "postcngm3_1") return Decimal.fromNumber(1);

	var ret = 2
	if (!player.galacticSacrifice) {
		if (player.infinityUpgrades.includes("resetMult")) ret = 2.5
		if (player.challenges.includes("postc7")) ret = 4
		if (player.currentChallenge == "postc7" || inQC(6) || player.timestudy.studies.includes(81)) ret = 10
	}
	if (player.boughtDims) ret += player.timestudy.ers_studies[4] + (next ? 1 : 0)
	if (player.galacticSacrifice && player.galacticSacrifice.upgrades.includes(23) && ((!inNC(14) && player.currentChallenge != "postcngm3_3") || player.tickspeedBoosts == undefined || player.aarexModifications.ngmX > 3) && player.currentChallenge != "postcngm3_4") ret *= galMults.u23()
	if (player.infinityUpgrades.includes("resetMult")&&player.galacticSacrifice) ret *= 1.2 + 0.05 * player.infinityPoints.max(1).log(10)
	if (!player.boughtDims&&player.achievements.includes("r101")) ret = ret*1.01
	if (player.timestudy.studies.includes(83)) ret = Decimal.pow(1.0004, player.totalTickGained).times(ret);
	if (player.timestudy.studies.includes(231)) ret = Decimal.pow(Math.max(player.resets, 1), 0.3).times(ret)
	if (player.galacticSacrifice) {
		if (player.currentChallenge == "postc7" || inQC(6) || player.timestudy.studies.includes(81)) ret = Math.pow(ret,3)
		else if (player.challenges.includes("postc7")) ret = Math.pow(ret,2)
	}
	if (player.dilation.studies.includes(6)&&player.currentEternityChall!="eterc14"&&!inQC(3)&&!inQC(7)) ret = getExtraDimensionBoostPower().times(ret)
	return new Decimal(ret)
}

function softReset(bulk, tier=1) {
	if (tmp.ri) return;
	var oldResets = player.resets
	player.resets+=bulk;
	if (player.masterystudies) if (player.resets > 4) player.old = false
	if (player.resets >= 10) {
		giveAchievement("Boosting to the max");
	}
	if (inNC(14)&&player.tickspeedBoosts==undefined) player.tickBoughtThisInf.pastResets.push({resets:player.resets,bought:player.tickBoughtThisInf.current})
	if (tmp.ngp3&&getEternitied()>=1e9&&player.dilation.upgrades.includes("ngpp6")&&tier<2) {
		skipResets()
		player.matter=new Decimal(0)
		player.postC8Mult=new Decimal(1)
		if (player.currentEternityChall=='eterc13') return
		var temp=getDimensionBoostPower()
		var temp2=getDimensionPowerMultiplier()
		if (player.dbPower!=undefined&&!isNaN(break_infinity_js?player.dbPower:player.dbPower.logarithm)) for (tier=1;tier<9;tier++) {
            var dimPow=player[TIER_NAMES[tier]+'Pow'].div(player.dbPower.pow(Math.max(oldResets+1-tier,0)))
            if (!inNC(9)&&player.currentChallenge!="postc1") dimPow=Decimal.pow(temp2,Math.floor(player[TIER_NAMES[tier]+'Bought']/10)).max(dimPow)
            player[TIER_NAMES[tier]+'Pow']=temp.pow(Math.max(player.resets+1-tier,0)).times(dimPow)
        }
		player.dbPower=temp
		return
	}
	var costs=[10,100,1e4,1e6,1e9,1e13,1e18,1e24]
	var costMults=[1e3,1e4,1e5,1e6,1e8,1e10,1e12,1e15]
	if (inNC(10)||player.currentChallenge == "postc1") costs=[10,100,100,500,2500,2e4,2e5,4e6]
	if (inNC(10)) costMults=[1e3,5e3,1e4,12e3,18e3,26e3,32e3,42e3]
	for (var d=1;d<9;d++) {
		var name=TIER_NAMES[d]
		player[name+"Amount"]=new Decimal(0)
		player[name+"Bought"]=0
		player[name+"Cost"]=new Decimal(costs[d-1])
		player.costMultipliers[d-1]=new Decimal(costMults[d-1])
	}
	player.totalBoughtDims=resetTotalBought()
	player.tickspeed=new Decimal(player.aarexModifications.newGameExpVersion?500:1000)
	player.tickSpeedCost=new Decimal(1e3)
	player.tickspeedMultiplier=new Decimal(10)
	player.sacrificed=new Decimal(0)
	player.chall3Pow=new Decimal(0.01)
	player.matter=new Decimal(0)
	player.chall11Pow=new Decimal(1)
	player.postC4Tier=1
	player.postC8Mult=new Decimal(1)
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
	}
	setInitialDimensionPower();

	if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
	if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
	if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
	if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));
	divideTickspeedIC5()

	if (player.resets > 4) {
		document.getElementById("confirmation").style.display = "inline-block";
		document.getElementById("sacrifice").style.display = "inline-block";
		document.getElementById("confirmations").style.display = "inline-block";
		document.getElementById("sacConfirmBtn").style.display = "inline-block";
		if (player.galacticSacrifice && player.galaxies > 0) {
			document.getElementById("gSacrifice").style.display = "inline-block"
			document.getElementById("gConfirmation").style.display = "inline-block"
		}
	}
	hideDimensions()
	updateTickSpeed()
	if (!player.achievements.includes("r111")) setInitialMoney()
}

function setInitialMoney() {
	var x=10
	if (player.challenges.includes("challenge1")) x=100
	if (player.aarexModifications.ngmX>3) x=200
	if (player.achievements.includes("r37")) x=1000
	if (player.achievements.includes("r54")) x=2e5
	if (player.achievements.includes("r55")) x=1e10
	if (player.achievements.includes("r78")) x=2e25
	player.money=new Decimal(x)
}

function setInitialDimensionPower() {
	var dimensionBoostPower=getDimensionBoostPower()
	if (tmp.ngp3&&getEternitied()>=1e9&&player.dilation.upgrades.includes("ngpp6")) player.dbPower=dimensionBoostPower

	for (tier=1;tier<9;tier++) player[TIER_NAMES[tier]+'Pow']=dimensionBoostPower.pow(Math.max(player.resets+1-tier,0))

	var tickspeedPower=player.totalTickGained
	if (player.infinityUpgradesRespecced!=undefined) tickspeedPower+=player.infinityUpgradesRespecced[1]*10
	player.tickspeed=Decimal.pow(getTickSpeedMultiplier(), tickspeedPower).times(player.aarexModifications.newGameExpVersion?500:1e3)
	
	var ic3Power=player.totalTickGained*getECReward(14)
	if (player.tickspeedBoosts!=undefined&&player.currentChallenge!="postc5") {
		let mult = 30
		if ((inNC(14) && player.aarexModifications.ngmX == 3) || player.currentChallenge == "postcngm3_3") mult = 20
		else if (player.galacticSacrifice.upgrades.includes(14)) mult = 32
		if (inNC(6, 1)) mult *= Math.min(player.galaxies / 30, 1)
		let ic3PowerTB = player.tickspeedBoosts * mult
		let softCapStart = 1024
		let frac = 8
		if (player.currentChallenge=="postcngm3_1"||player.currentChallenge=="postc1") softCapStart = 0
		if (player.challenges.includes("postcngm3_1")) frac = 7
		if (ic3PowerTB > softCapStart) ic3PowerTB = Math.sqrt((ic3PowerTB - softCapStart) / frac + 1024) * 32 + softCapStart - 1024
		if (inNC(15) || player.currentChallenge == "postc1" || player.currentChallenge == "postcngm3_3") ic3PowerTB *= player.aarexModifications.ngmX>3?.2:Math.max(player.galacticSacrifice.galaxyPoints.div(1e3).add(1).log(8),1)
		else if (player.challenges.includes("postcngm3_3")) ic3PowerTB *= Math.max(Math.sqrt(player.galacticSacrifice.galaxyPoints.max(1).log10())/15+.6,1)
		if (player.achievements.includes("r67")) {
			let x=tmp.cp
			if (x>4) x=Math.sqrt(x-1)+2
			ic3PowerTB*=x*.15+1
		}
		ic3Power += ic3PowerTB
	}
	if ((inNC(15) || player.currentChallenge == "postc1" || player.currentChallenge == "postcngm3_3") && player.aarexModifications.ngmX > 3) ic3Power-=(player.resets+player.tdBoosts)*10
	player.postC3Reward=Decimal.pow(getPostC3Mult(),ic3Power)
}

function maxBuyDimBoosts(manual) {
	let tier = player.pSac != undefined ? 6 : 8
	if (inQC(6)) return
	if (player.autobuyers[9].priority >= getAmount(tier) || player.galaxies >= player.overXGalaxies || getShiftRequirement(0).tier < tier || manual) {
		var bought = Math.min(getAmount(getShiftRequirement(0).tier), (player.galaxies >= player.overXGalaxies || manual) ? 1/0 : player.autobuyers[9].priority)
		var r
		if (player.currentEternityChall == "eterc5") {
			r = 1
			while (bought >= getShiftRequirement(r).amount) r++
		} else {
			var scaling = 4
			if (player.galacticSacrifice && player.tickspeedBoosts === undefined && player.galacticSacrifice.upgrades.includes(21)) scaling = 6
			var firstReq = getShiftRequirement(scaling - player.resets)
			var supersonicStart = getSupersonicStart()
			r = (bought - firstReq.amount) / firstReq.mult + scaling + 1
			if (r > supersonicStart - 1) {
				var a = getSupersonicMultIncrease() / 2
				var b = firstReq.mult + a
				var skips = (Math.sqrt(b * b + 4 * a * (bought - getShiftRequirement(supersonicStart - player.resets - 1).amount) / 4e4) - b) / (2 * a)
				var setPoint = supersonicStart + Math.floor(skips) * 4e4
				var pointReq = getShiftRequirement(setPoint - player.resets)
				r = (bought - pointReq.amount) / pointReq.mult + setPoint + 1
			}
			r = Math.floor(r - player.resets) 
		}

		if (r > 749) giveAchievement("Costco sells dimboosts now")
		if (r > 0) softReset(r)
	}
}

function getShiftRequirement(bulk) {
	let amount = 20
	let mult = getDimboostCostIncrease()
	var resetNum = player.resets + bulk
	var maxTier = inNC(4) || player.pSac != undefined ? 6 : 8
	tier = Math.min(resetNum + 4, maxTier)
	if (player.aarexModifications.ngmX > 3 && player.pSac == undefined) amount = 10
	if (tier == maxTier) amount += Math.max(resetNum + (player.galacticSacrifice && player.tickspeedBoosts === undefined && player.galacticSacrifice.upgrades.includes(21) ? 2 : 4) - maxTier, 0) * mult
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

	return { tier: tier, amount: amount, mult: mult };
}

function getDimboostCostIncrease () {
	let ret = 15
	if (player.aarexModifications.ngmX > 3) ret += 5
	if (player.currentChallenge=="postcngmm_1") return ret
	if (player.galacticSacrifice) {
		if (player.galacticSacrifice.upgrades.includes(21)) ret -= 10
		if (player.infinityUpgrades.includes('dimboostCost')) ret -= 1
		if (player.infinityUpgrades.includes("postinfi50")) ret -= 0.5
	} else {
		if (tmp.ngp3 && player.masterystudies.includes("t261")) ret -= 1
		if (inNC(4)) ret += 5
		if (player.boughtDims && player.achievements.includes('r101')) ret -= Math.min(8, Math.pow(player.eternityPoints.max(1).log(10), .25))
	}
	if (player.timestudy.studies.includes(211)) ret -= tsMults[211]()
	if (player.timestudy.studies.includes(222)) ret -= tsMults[222]()
	return ret;
}

function getSupersonicStart() {
	if (inQC(5)) return 0
	let r = 56e4
	if (player.aarexModifications.nguspV && !player.aarexModifications.nguepV) r = 1e5
	if (tmp.ngp3) {
		if (player.masterystudies.includes("t331")) r += 24e4
		if (player.masterystudies.includes("d12") && hasBosonicUpg(21)) r += getNanofieldRewardEffect(1, "supersonic")
	}
	return r
}

function getSupersonicMultIncrease() {
	if (inQC(5)) return 20
	let r=4
	if (player.masterystudies) if (player.masterystudies.includes("t331")) r=1
	return r
}

document.getElementById("softReset").onclick = function () {
	if (inQC(6)) return
	if (cantReset()) return
	var req = getShiftRequirement(0)
	if (tmp.ri || getAmount(req.tier) < req.amount) return;
	auto = false;
	var pastResets = player.resets
	if ((player.infinityUpgrades.includes("bulkBoost") || (player.achievements.includes("r28") && player.tickspeedBoosts !== undefined) || player.autobuyers[9].bulkBought) && player.resets > (inNC(4) || player.pSac != undefined ? 1 : 3) && (!inNC(14) || !(player.aarexModifications.ngmX > 3))) maxBuyDimBoosts(true);
	else softReset(1)
	if (player.resets <= pastResets) return
	if (player.currentEternityChall=='eterc13') return
	var dimensionBoostPower = getDimensionBoostPower()
	for (var tier = 1; tier < 9; tier++) if (player.resets >= tier) floatText("D"+tier, "x" + shortenDimensions(dimensionBoostPower.pow(player.resets + 1 - tier)))
};

function skipResets() {
	if (inNC(0)) {
		var upToWhat = 0
		for (s=1;s<4;s++) if (player.infinityUpgrades.includes("skipReset"+s)) upToWhat=s
		if (player.infinityUpgrades.includes("skipResetGalaxy")) {
			upToWhat=4
			if (player.galaxies<1) player.galaxies=1
		}
		if (player.resets<upToWhat) player.resets=upToWhat
		if (player.tickspeedBoosts<upToWhat*4) player.tickspeedBoosts=upToWhat*4
	}
}

function getTotalResets() {
	let r=player.resets+player.galaxies
	if (player.tickspeedBoosts) r+=player.tickspeedBoosts
	if (player.aarexModifications.ngmX>3) r+=player.tdBoosts
	return r
}