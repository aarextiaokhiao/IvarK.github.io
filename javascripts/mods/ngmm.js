function getGSAmount(offset=0) {
	if (isEmptiness) return new Decimal(0)
	let galaxies = getGSGalaxies() + offset
	let y = getGSGalaxyExp(galaxies)
	let z = getGSDimboostExp(galaxies)
	let resetMult = player.resets
	if (player.aarexModifications.ngmX>3) resetMult = resetMult+player.tdBoosts/2-1
	resetMult -= inNC(4)?2:4
	if (player.tickspeedBoosts!==undefined) resetMult = (resetMult+1)/2
	let exp = getD8Exp()
	let div2 = 50
	if (player.achievements.includes("r102")) div2 = 10
	if (player.totalmoney.log10() > 2e6) div2 /= Math.log(player.totalmoney.log10()) // Math.log(e) = 1
	
	let ret = Decimal.pow(galaxies, y).times(Decimal.pow(Math.max(0, resetMult), z)).max(0)
	ret = ret.times(Decimal.pow(1+getAmount(8)/div2,exp))
	
	if (!player.galacticSacrifice.chall) ret = ret.times(getGPMultipliers())
	return ret.floor()
}

function getGPMultipliers(){
	let ret = new Decimal(1)
	if (player.achievements.includes("r23") && player.tickspeedBoosts !== undefined) {
		let tbDiv=10
		if (player.aarexModifications.ngmX>3) tbDiv=5
		ret=ret.times(Decimal.pow(Math.max(player.tickspeedBoosts/tbDiv,1),Math.max(getAmount(8)/75,1)))
	}
	if (player.galacticSacrifice.upgrades.includes(32)) ret = ret.times(galMults.u32())
	if (player.infinityUpgrades.includes("galPointMult")) ret = ret.times(getPost01Mult())
	if (player.achievements.includes('r37')) {
		if (player.bestInfinityTime >= 18000) ret = ret.times(Math.max(180000/player.bestInfinityTime,1))
		else ret = ret.times(10*(1+Math.pow(Math.log10(18000/player.bestInfinityTime),2)))
	}
	if (player.achievements.includes("r62")&&player.tickspeedBoosts==undefined) ret = ret.times(player.infinityPoints.max(10).log10())
	return ret

}

function getGSGalaxies(){
	let galaxies = player.galaxies + player.dilation.freeGalaxies;
	let rg = player.replicanti.galaxies
	if (player.timestudy.studies.includes(133)) rg *= 1.5
	if (player.timestudy.studies.includes(132)) rg *= 1.4
	if (player.achievements.includes("r121")) galaxies += 30.008
	if (player.achievements.includes("r127")) galaxies += R127
	if (player.achievements.includes("r132")) rg *= 1+.540 // 54.0% boost becasue of the 540 in the achievement
	if (player.achievements.includes("r135")) galaxies += R135
	if (player.achievements.includes("r137")) galaxies += Math.max(200,player.dilation.freeGalaxies*4) + 2*player.dilation.freeGalaxies
	return galaxies+rg
}

function getGSGalaxyExp(galaxies){
	let y = 1.5 
	if (player.challenges.includes("postcngmm_1")) {
		y += Math.max(0, 0.05*(galaxies - 10)) + 0.005 * Math.pow(Math.max(0, galaxies-30) , 2)
		if (player.tickspeedBoosts == undefined || player.challenges.includes("postcngm3_4") || player.currentChallenge == "postcngm3_4") y += 0.0005 * Math.pow(Math.max(0, galaxies-50) , 3)
		if (player.achievements.includes("r121") && player.tickspeedBoosts == undefined) y += 1e-5 * Math.pow(Math.max(galaxies - 500, 0), 4) 
		y *= .08*(tmp.cp+14)
		if (player.infinityUpgrades.includes("postinfi60")&&player.tickspeedBoosts!=undefined) y *= Math.log10(Math.max(galaxies-50, 1))*2.5+1
	}
	if (player.achievements.includes("r121")) y *= Math.log(3+galaxies)
	if (player.galacticSacrifice.upgrades.includes(52) && player.tickspeedBoosts == undefined) {
		if (y > 100) y = Math.pow(1e4*y , 1/3)
	} else if (y > 100 && player.tickspeedBoosts == undefined) {
		y = Math.pow(316.22*y, 1/3)
	} else if (y > 10) {
		y = Math.pow(10*y, .5)
	}
	if (player.achievements.includes("r121")) y += 10
	return y
}

function getGSDimboostExp(galaxies){
	let z = 1
	if (tmp.cp>3) {
		z = 0.06*(tmp.cp+14)
		z += galaxies/100
		if (player.tickspeedBoosts == undefined) z *= Math.log(galaxies+3)
	}
	return z
}

function getD8Exp(){
	let exp = 1
	if (player.achievements.includes("r124")) {
		let div = 30
		if (player.currentEternityChall == "") div += 12
		else if (player.achievements.length>90) div -= .1*(player.achievements.length-90)
		let amt = getAmount(8)/div
		if (amt>1048576) amt = Math.pow(Math.log2(amt)/5,10)
		if (amt>1024) amt = 24+Math.pow(Math.log2(amt),3)
		exp += amt
		if (player.totalmoney.log10() > 2.75e6) exp = Math.pow(exp,Math.min(1.3,1+player.totalmoney.log10()/1e8+Math.sqrt(player.totalmoney.log10()/275)/3e3))
	}
	return exp
}

function galacticSacrifice(auto, force, chall) {
	if (getGSAmount().eq(0)&&!force) return
	if (tmp.ri) return
	if (player.options.gSacrificeConfirmation&&!auto&&!force) if (!confirm("Galactic Sacrifice will perform a galaxy reset, but will remove everything up to this point including your galaxies in exchange for Galaxy Points. It may take a while to recover. Are you sure you want to do this?")) return
	if (player.options.challConf&&chall) if (!confirm("Entering this challenge will perform a Galactic Sacrifice without the rewards. You need to Galactic Sacrifice under special conditions to complete the challenge. Some Galaxy Point gain multipliers won't work in this challenge.")) return
	if (!force) {
		player.galacticSacrifice.galaxyPoints=player.galacticSacrifice.galaxyPoints.plus(getGSAmount())
		player.galacticSacrifice.times++
	}
	if (chall) {
		player.galacticSacrifice.chall=chall
		showTab("dimensions")
	}
	if (player.aarexModifications.ngmX > 3) {
		if (!force) {
			if (!player.challenges.includes("challenge1")) player.challenges.push("challenge1")
			if (player.galacticSacrifice.chall) {
				if (!player.challenges.includes("challenge"+player.galacticSacrifice.chall)) player.challenges.push("challenge"+player.galacticSacrifice.chall)
				player.challengeTimes[player.galacticSacrifice.chall-2]=Math.min(player.challengeTimes[player.galacticSacrifice.chall-2],player.galacticSacrifice.time)
			}
			if (player.challenges.length>1) giveAchievement("Daredevil")
			if (player.challenges.length==getTotalNormalChallenges()+1) giveAchievement("AntiChallenged")
			if (player.challenges.length==getTotalNormalChallenges()+player.infchallengeTimes.length+1) giveAchievement("Anti-antichallenged")
			if (inNC(2)&&player.galacticSacrifice.time<=1800) giveAchievement("Many Deaths")
			if (inNC(11)&&player.galacticSacrifice.time<=1800) giveAchievement("Gift from the Gods")
			if (inNC(5)&&player.galacticSacrifice.time<=1800) giveAchievement("Is this hell?")
			if (inNC(3)&&player.galacticSacrifice.time<=100) giveAchievement("You did this again just for the achievement right?");
			if (player.firstAmount==1&&player.resets==0&&player.galaxies==0&&inNC(12)) giveAchievement("ERROR 909: Dimension not found")
		}
		if (!chall&&(force||!player.options.retryChallenge)) delete player.galacticSacrifice.chall
		document.getElementById("challengeconfirmation").style.display = "inline-block"
		updateChallenges()
		updateNCVisuals()
		updateChallengeTimes()
		updateAutobuyers()
	}
	GPminpeak=new Decimal(0)
	player.galacticSacrifice.time=0
	resetPSac()
	galaxyReset(-player.galaxies)
}

function resetGalacticSacrifice(eternity) {
	return player.galacticSacrifice ? {
		galaxyPoints: player.achievements.includes("r33")&&!eternity?player.infinityPoints.div(10).pow(2):new Decimal(0),
		time: 0,
		times: 0,
		upgrades: []
	} : undefined
}

function newGalacticDataOnInfinity(eternity) {
	if (player.galacticSacrifice&&(eternity?getEternitied()>6:player.achievements.includes("r3"+(player.tickspeedBoosts==undefined?6:3)))) {
		var data=player.galacticSacrifice
		data.galaxyPoints=player.tickspeedBoosts==undefined?(eternity?data.galaxyPoints:data.galaxyPoints.add(getGSAmount())):new Decimal(0)
		if (player.tickspeedBoosts!=undefined) data.times=0
		data.time=0
		return data
	} else return resetGalacticSacrifice()
}

function isIC3Trapped() {
	return player.galacticSacrifice || player.currentEternityChall === "eterc14" || inQC(6)
}

//v1.2

let galCosts = {
	11: 1,
	21: 1,
	41: "1e1650",
	51: "1e5500",
	22: 5,
	42: "1e2300",
	52: "1e8000",
	23: 100,
	43: "1e3700",
	53: "1e25000",
	14: 300,
	24: 1e3,
	34: 1e17,
	15: 1,
	25: 1e3,
	35: 2e3
}

function buyGalaxyUpgrade(i) {
	if (player.galacticSacrifice.upgrades.includes(i) || !(Math.floor(i/10)<2 || player.galacticSacrifice.upgrades.includes(i-10)) || player.galacticSacrifice.galaxyPoints.lt(galCosts[i])) return
	player.galacticSacrifice.upgrades.push(i)
	player.galacticSacrifice.galaxyPoints = player.galacticSacrifice.galaxyPoints.sub(galCosts[i])
	if (i==11) {
		if (player.achievements.includes("r21")) {
			for (d=1;d<9;d++) {
				var name = TIER_NAMES[d]
				player[name+"Cost"] = player[name+"Cost"].times(10)
				if (player.aarexModifications.ngmX>3) player["timeDimension"+d].cost = player["timeDimension"+d].cost.times(10)
			}
		}
		reduceDimCosts(true)
	}
	if (i==41) for (tier=1;tier<9;tier++) {
		let dim = player["infinityDimension"+tier]
		dim.power = Decimal.pow(getInfBuy10Mult(tier), dim.baseAmount/10)
	}
	if (i==42) for (tier=1;tier<9;tier++) {
		let dim = player["infinityDimension"+tier]
		dim.cost = Decimal.pow(getIDCostMult(tier),dim.baseAmount/10).times(infBaseCost[tier])
	}
	if (i==53) {
		player.infMult = new Decimal(1)
		player.infMultCost = new Decimal(10)
	}
}

function reduceDimCosts(upg) {
	if (player.galacticSacrifice) {
		let div=1
		if (player.achievements.includes("r21")) div=10
		if (player.galacticSacrifice.upgrades.includes(11)) div=galMults.u11()
		for (d=1;d<9;d++) {
			var name = TIER_NAMES[d]
			if (player.aarexModifications.ngmX>3&&!upg) {
				player[name+"Cost"] = player[name+"Cost"].pow(1.25).times(10)
				player.costMultipliers[d-1] = player.costMultipliers[d-1].pow(1.25)
			}
			player[name+"Cost"] = player[name+"Cost"].div(div)
			if (player.aarexModifications.ngmX>3) player["timeDimension"+d].cost = player["timeDimension"+d].cost.div(div)
		}
		if (player.achievements.includes('r48') && player.tickspeedBoosts == undefined) player.tickSpeedCost = player.tickSpeedCost.div(div)
	}
	if (player.infinityUpgradesRespecced != undefined) {
		for (d=1;d<9;d++) {
			var name = TIER_NAMES[d]
			player[name+"Cost"] = player[name+"Cost"].div(Decimal.pow(getDiscountMultiplier("dim" + d), player.dimtechs.discounts))
		}
		player.tickSpeedCost = player.tickSpeedCost.div(Decimal.pow(getDiscountMultiplier("tick"), player.dimtechs.discounts))
	}
}

function galacticUpgradeSpanDisplay () {
	document.getElementById("galaxyPoints").innerHTML = "You have <span class='GPAmount'>"+shortenDimensions(player.galacticSacrifice.galaxyPoints)+"</span> Galaxy point"+(player.galacticSacrifice.galaxyPoints.eq(1)?".":"s.")
	document.getElementById('galcost33').innerHTML = shortenCosts(galCosts[33])
	if (player.tickspeedBoosts!=undefined) {
		document.getElementById('galcost24').innerHTML = shortenCosts(1e3)
		document.getElementById('galcost34').innerHTML = shortenCosts(1e17)
	}
	if (player.aarexModifications.ngmX>3) {
		document.getElementById('galcost25').innerHTML = shortenCosts(1e3)
		document.getElementById('galcost35').innerHTML = shortenCosts(2e3)
	}
	if (player.infinityUpgrades.includes("postinfi63")) {
		document.getElementById("galcost41").innerHTML = shortenCosts(new Decimal("1e1650"))
		document.getElementById("galcost42").innerHTML = shortenCosts(new Decimal("1e2300"))
		document.getElementById("galcost43").innerHTML = shortenCosts(new Decimal("1e3700"))
		document.getElementById("galcost51").innerHTML = shortenCosts(new Decimal("1e5500"))
		document.getElementById("galcost52").innerHTML = shortenCosts(new Decimal("1e8000"))
		document.getElementById("galcost53").innerHTML = shortenCosts(new Decimal("1e25000"))
	}
}

function galacticUpgradeButtonTypeDisplay () {
	let t = document.getElementById("galTable")
	for (let i = 1; i < 6; i++) {
		var r = t.rows[i-1]
		if (!galConditions["r"+i] || galConditions["r"+i]()) {
			r.style.display = ""
			for (let j = 1; j < 6; j++) {
				var c = r.cells[j-1]
				if (!galConditions["c"+j] || galConditions["c"+j]()) {
					c.style.display = ""
					var e = document.getElementById('galaxy' + i + j);
					if (player.galacticSacrifice.upgrades.includes(+(i + '' + j))) {
						e.className = 'infinistorebtnbought'
					} else if (player.galacticSacrifice.galaxyPoints.gte(galCosts[i + '' + j]) && (i === 1 || player.galacticSacrifice.upgrades.includes(+((i - 1) + '' + j)))) {
						e.className = 'infinistorebtn' + ((j-1)%4+1);
					} else {
						e.className = 'infinistorebtnlocked'
					}
					if (galMults["u"+i+j] !== undefined) {
						if (i*10+j==11||i*10+j==15) {
							if (player.infinitied>0||player.eternities!==0||quantumed) document.getElementById('galspan'+i+j).textContent=shortenDimensions(galMults["u"+i+j]())
						} else if (i*10+j==31||i*10+j==25) document.getElementById("galspan"+i+j).textContent=galMults["u"+i+j]().toFixed(2)
						else document.getElementById("galspan"+i+j).textContent=shorten(galMults["u"+i+j]())
					}
				} else c.style.display = "none"
			}
		} else r.style.display = "none"
	}
}

//v1.295
function resetTotalBought() {
	if (player.galacticSacrifice) return {}
}

function productAllTotalBought () {
	var ret = 1;
	var mult = getProductBoughtMult()
	for (i = 1; i <= 8; i++) {
		if (inNC(13) && player.tickspeedBoosts != undefined) ret = Decimal.times(player[TIER_NAMES[i]+"Amount"].max(1).log10(),mult).add(1).times(ret);
		else if (player.totalBoughtDims[TIER_NAMES[i]]) ret = Decimal.times(ret,player.totalBoughtDims[TIER_NAMES[i]]?Decimal.times(player.totalBoughtDims[TIER_NAMES[i]],mult).max(1):1);
	}
	return ret;
}

function productAllTotalBought1 () {
	return Math.pow(Decimal.max(productAllTotalBought(),10).log10(),2);
}

function productAllDims1(){
	var ret = new Decimal(0)
	for (i = 1; i <= 8; i++) {
		ret = ret.add(Math.max((player[TIER_NAMES[1] + "Amount"].max(1)).log10(),0));
	}
	return ret.max(1)
}

document.getElementById("challenge13").onclick = function () {
	startNormalChallenge(13)
}

//v1.3
function gSacrificeConf() {
	document.getElementById("gConfirmation").checked = player.options.gSacrificeConfirmation
	player.options.gSacrificeConfirmation = !player.options.gSacrificeConfirmation
	document.getElementById("gSacConfirmBtn").textContent = "Galactic Sacrifice confirmation: O" + (player.options.gSacrificeConfirmation ? "N" : "FF")
}

document.getElementById("challenge14").onclick = function () {
	startNormalChallenge(14)
}

function updateTBTIonGalaxy() {
	if (player.galacticSacrifice) return {current:player.tickBoughtThisInf.current,pastResets:[{resets:0,bought:player.tickBoughtThisInf.current}]}
}

function resetTickBoughtThisInf() {
	if (player.galacticSacrifice) return {current:0,pastResets:[{resets:0,bought:0}]}
}

function upgradeSacAutobuyer() {
	let cost=player.autoSacrifice.cost
	if ((player.aarexModifications.ngmX>3?player.galacticSacrifice.galaxyPoints:player.infinityPoints).lt(cost)) return false
	if (player.aarexModifications.ngmX>3) player.galacticSacrifice.galaxyPoints=player.galacticSacrifice.galaxyPoints.sub(cost)
	else player.infinityPoints=player.infinityPoints.sub(cost)
	if (player.autoSacrifice.interval > 100) {
		player.autoSacrifice.interval = Math.max(player.autoSacrifice.interval*0.6, 100);
		if (player.autoSacrifice.interval > 120) player.autoSacrifice.cost *= 2; //if your last purchase wont be very strong, dont double the cost
	}
	updateAutobuyers();
}

document.getElementById("buyerBtnGalSac").onclick = function () {
	buyAutobuyer(12);
}

//v1.4
function getPost01Mult() {
	return Math.min(Math.pow(player.infinitied + 1, .3), Math.pow(Math.log(player.infinitied + 3), 3))
}

document.getElementById("postinfi01").onclick = function() {
	buyInfinityUpgrade("galPointMult",player.tickspeedBoosts==undefined?1e3:1e4);
}

document.getElementById("postinfi02").onclick = function() {
	buyInfinityUpgrade("dimboostCost",player.tickspeedBoosts==undefined?2e4:1e5);
}

document.getElementById("postinfi03").onclick = function() {
	buyInfinityUpgrade("galCost",5e5);
}

document.getElementById("postinfi04").onclick = function() {
	if (player.infinityPoints.gte(player.dimPowerIncreaseCost) && player.extraDimPowerIncrease < 40) {
		player.infinityPoints = player.infinityPoints.minus(player.dimPowerIncreaseCost)
		player.dimPowerIncreaseCost = new Decimal(player.tickspeedBoosts==undefined?1e3:3e5).times(Decimal.pow(4,Math.min(player.extraDimPowerIncrease,15)+1));
		player.extraDimPowerIncrease += 1;
		if (player.extraDimPowerIncrease > 15) player.dimPowerIncreaseCost = player.dimPowerIncreaseCost.times(Decimal.pow(Decimal.pow(4,5),player.extraDimPowerIncrease-15))
		document.getElementById("postinfi04").innerHTML = "Further increase all dimension multipliers<br>x^"+galMults.u31().toFixed(2)+(player.extraDimPowerIncrease<40?" -> x^"+((galMults.u31()+0.02).toFixed(2))+"<br>Cost: "+shorten(player.dimPowerIncreaseCost)+" IP":"")
	}
}

//v1.41
function galIP(){
    let gal = player.galaxies
    let rg = player.replicanti.galaxies
    if (player.timestudy.studies.includes(132)) rg *= 1.4
    if (player.timestudy.studies.includes(133)) rg *= 1.5
    if (player.achievements.includes("r122")) gal += 100*rg 
    if (gal<5) return gal
    if (gal<50) return 2+Math.pow(5+gal,0.6)
    return Math.min(Math.pow(gal,.4)+7,155)
}

//v1.5
function renameIC(id) {
	let split=id.split("postc")
	if (split[1]) id=order[parseInt(split[1])-1]
	return id
}

//v1.501
function isADSCRunning() {
	return inNC(13) || (player.currentChallenge === "postc1" && player.galacticSacrifice) || player.tickspeedBoosts !== undefined
}

//v1.6
document.getElementById("postinfi50").onclick = function() {
    buyInfinityUpgrade("postinfi50",player.tickspeedBoosts==undefined?1e25:2e18);
}

document.getElementById("postinfi51").onclick = function() {
    buyInfinityUpgrade("postinfi51",player.tickspeedBoosts==undefined?1e29:1e20);
}

document.getElementById("postinfi52").onclick = function() {
    buyInfinityUpgrade("postinfi52",player.tickspeedBoosts==undefined?1e33:1e25);
}

document.getElementById("postinfi53").onclick = function() {
    buyInfinityUpgrade("postinfi53",player.tickspeedBoosts==undefined?1e37:1e29);
}

//v1.9
document.getElementById("postinfi60").onclick = function() {
    buyInfinityUpgrade("postinfi60",1e50);
}

document.getElementById("postinfi61").onclick = function() {
    buyInfinityUpgrade("postinfi61",new Decimal("1e450"));
}

document.getElementById("postinfi62").onclick = function() {
    buyInfinityUpgrade("postinfi62",new Decimal("1e700"));
}

document.getElementById("postinfi63").onclick = function() {
    buyInfinityUpgrade("postinfi63",new Decimal("1e2000"));
}

function getB60Mult() {
	return Decimal.pow(getEternitied()>0?2.5:3,player.galaxies-95).max(1)
}

//v2.3
let R127 = Math.pow(0.5772156649+.5*Math.pow(Math.PI,.5)+3.35988+0.43828+0.95531,0.739085+1.30637) 
//.5772156649 is the E-M constant, .5*Math.pow(Math.PI,.5) is root(pi)/2, 0.739085 is the unique real solution to cos(x)=x, 
// 1.30637 is Mills constant, 3.35988 is an approximation of the sum of the recipricals of fibonacci numbers, 0.43828 is the real part of the infinite power tower of i 
// 0.95531 is artan(root2)
	
let R135 = Math.pow(Math.E+Math.PI+0.56714+4.81047+0.78343+1.75793+2.286078+1.20205,1.45136+.829626)
// obviously e and pi, .286078 + .8296262 are the values given in the achievement 
// 0.56714 is the infinite power towers of 1/e, 0.78343 integral from 0 to 1 of x^x, 4.81047 principal root of i^-i 
// 1.45136 is the root of li, 1.75793 = root(1+root(2+root(3+... , 1.20205 = sum of reciprocals of cubes

//v2.31
let galMults = {
	u11: function() {
		if (player.tickspeedBoosts!=undefined) return Decimal.pow(10,2+Math.min(4,getInfinitied()))
		if (tmp.ec > 53) return Decimal.pow(10,2e4)
		let x=getG11Infinities()
		let z=getG11Divider()
		//define y
		if (x>99) y=Math.pow(Math.log(x),Math.log(x)/z)+14
		else if (x>4) y=Math.sqrt(x+5)+4
		else y=x+2
		//softcap y
		if (y>1000) y=Math.sqrt(1000*y)
		if (y>1e4) y=Math.pow(1e8*y,1/3)
		return Decimal.pow(10, Math.min(y, 2e4));
	},
	u31: function() {
		let x = 1.1 + player.extraDimPowerIncrease * 0.02
		if (player.dilation.upgrades.includes("ngmm4")) x += 0.1
		return x
	},
	u51: function() {
		let x=player.galacticSacrifice.galaxyPoints.log10()/1e3
		if (x>200) x=Math.sqrt(x*200)
		return Decimal.pow(10,x)
	},
	u12: function() {
		return 2 * Math.pow(1 + player.galacticSacrifice.time / 600, 0.5)
	},
	u32: function() {
		let x = player.totalmoney
		let exp = .003
		if (player.achievements.includes("r123")) exp = .005
		let l = Math.max(player.galacticSacrifice.galaxyPoints.l-5e4,0)
		if (player.achievements.includes("r123")) exp += Math.min(.005,l/2e8)
		if (!player.break) x = x.min(Number.MAX_VALUE)
		if (player.achievements.includes("r113")) exp += exp/60
		return x.pow(exp).add(1)
	},
	u13: function() {
		let exp = 3
		if (player.infinityUpgrades.includes("postinfi62") && player.achievements.includes("r117")) {
			if (player.currentEternityChall === "") exp *= Math.pow(.8+Math.log(player.resets+3), 2.08)
			else exp *= Math.pow(.8+Math.log(player.resets+3), 0.5)
		} else if (player.infinityUpgrades.includes("postinfi62")){
			if (player.currentEternityChall === "") exp *= Math.pow(Math.log(player.resets+3), 2)
			else exp *= Math.pow(Math.log(player.resets+3), 0.5)
		}
		return player.galacticSacrifice.galaxyPoints.div(5).plus(1).pow(exp)
	},
	u23: function() {
		let x=player.galacticSacrifice.galaxyPoints.max(1).log10()*3/4+1
<<<<<<< Updated upstream
		if (!tmp.ngp3l&&player.achievements.includes("r138")) x*=player.dilation.bestIP.add(10).log10()
=======
		if (!tmp.ngp3l&&player.achievements.includes("r138")) x*=Decimal.add(player.dilation.bestIP,10).log10()
>>>>>>> Stashed changes
		return x
	},
	u33: function() {
		if (player.tickspeedBoosts != undefined) return player.galacticSacrifice.galaxyPoints.div(1e10).add(1).log10()/5+1
		return player.galacticSacrifice.galaxyPoints.max(1).log10()/4+1
	},
	u43: function() {
		return Decimal.pow(player.galacticSacrifice.galaxyPoints.log10(),50)
	},
	u24: function() {
		return player.galacticSacrifice.galaxyPoints.pow(0.25).div(20).max(0.2)
	},
	u15: function() {
		return Decimal.pow(10,getInfinitied()+2).max(1).min(1e6)
	},
	u25: function() {
		let r=Math.max(player.galacticSacrifice.galaxyPoints.log10()-2,1)
		if (r>2.5) r=Math.pow(r*6.25,1/3)
		return r
	},
	u35: function() {
		let r=1
		let p=getProductBoughtMult()
		for (var d=1;d<9;d++) {
			r=Decimal.times(player["timeDimension"+d].bought/6,p).max(1).times(r)
		}
		return r
	}
}

let galConditions = {
	r4: function() {
		return player.infinityUpgrades.includes("postinfi63")
	},
	r5: function() {
		return player.infinityUpgrades.includes("postinfi63")
	},
	c4: function() {
		return player.tickspeedBoosts !== undefined
	},
	c5: function() {
		return player.aarexModifications.ngmX > 3
	}
}

//v2.4
function getGSoffset(offset=0) {
	return getGSAmount(offset)
}

function getG11Infinities() {
	let x = getInfinitied()
	let e = getEternitied()
	if (e == 0 && x > 1e6) x = tmp.ngp3l ? 1e6 : Math.min(Math.pow(x * 1e12, 1/3), 1e7)
	if (e > 0 && x < 1e8 && tmp.cp > 0) x += 2e6
	if (player.infinityUpgrades.includes("postinfi61")) x += 1e7
	if (player.infinityUpgrades.includes("postinfi61") && player.galacticSacrifice.upgrades.length > 9) x += player.galacticSacrifice.upgrades.length * 1e7
	x += tmp.ec * 1e10
	if (x > 1e8) x = Math.sqrt(x * 1e8)
	return x
}

function getG11Divider(){
	let z = 10
	if (tmp.cp>0&&player.challenges.includes("postcngmm_1")) z-=(tmp.cp+6)/4
	if (tmp.cp>6) z+=0.085*tmp.cp-0.31
	if (player.infinityUpgrades.includes("postinfi61")) z -= .1
	z-=Math.pow(tmp.ec,0.3)/10
	if (getEternitied()>0) z-=0.5
	if (z<6) z=Math.pow(1296*z,.2)
	return z
}

//v3
function getDil44Mult() {
	return player.dilation.freeGalaxies*0
}

function getDil45Mult() {
	return player.replicanti.amount.max(1).log10()*0+1
}

function getDil71Mult() {
	return player.meta.bestAntimatter.max(1).log10()*0+1
}

function getDil72Mult() {
	return player.meta.bestAntimatter.max(1).log10()*0+1
}