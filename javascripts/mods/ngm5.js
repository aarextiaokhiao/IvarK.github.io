//Modified Infinity Dimensions
var idBaseCosts = [null, 10, 100, 1e10, 1e20, 1e140, 1e200, 1e250, 1e280]
var idCostMults = [null, 10, 100, 1e10, 1e20, 1e140, 1e200, 1e250, 1e280]

function buyIDwithAM(t, auto) { // t is the dimension number, auto is either true or false.
	let d=player["infinityDimension"+t]
	let c=d.costAM
	if (getAmount(1)<1 && !auto) {
		alert("You need to have at least 1 First Dimension to be able to buy Infinity Dimensions.")
		return
	}
	if (!player.infDimensionsUnlocked[t-1]) return
	if (!player.money.gte(c)) return
	player.money=player.money.sub(c)
	d.costAM=d.costAM.times(idCostMults[t])
	d.bought+=10
	d.amount=d.amount.add(10)
	d.power=d.power.times(3)
	player.chall2Pow=0
	reduceMatter(1)
}

function maxIDwithAM(t,bulk) {
	let d=player["infinityDimension"+t]
	let c=d.costAM
	let m=idCostMults[t]
	if (getAmount(1)<1) return
	if (!player.infDimensionsUnlocked[t-1]) return
	if (!player.money.gte(c)) return
	let tb=Math.floor(player.money.div(c).times(m-1).add(1).log(m))
	if (bulk) tb=Math.min(tb,bulk)
	let ts=Decimal.pow(m,tb).sub(1).div(m-1).times(c)
	player.money=player.money.sub(ts.min(player.money))
	d.costAM=d.costAM.times(Decimal.pow(m,tb))
	d.bought+=10*tb
	d.amount=d.amount.add(10*tb)
	d.power=d.power.times(Decimal.pow(3,tb))
	player.chall2Pow=0
	reduceMatter(tb)
}

function maxAllIDswithAM() {
	for (var d=1;d<9;d++) maxIDwithAM(d)
}

function resetIDs_ngm5() {
	if (player.pSac == undefined) return
	for (var t=1;t<9;t++) {
		var d=player["infinityDimension"+t]
		d.amount=new Decimal(d.baseAmount)
		d.power=Decimal.pow(getInfBuy10Mult(t),d.baseAmount)
		d.costAM=new Decimal(idBaseCosts[t])
		d.boughtAM=0
	}
	player.infinityPower = new Decimal(1)
}

//Global Dimension unlocks
function isDimUnlocked(d) {
	if (d<7) return true
	return false
}

//Paradox Sacrifices
function getPxGain() {
	let r=Decimal.sqrt(player.matter.max(player.money).max(1).log10()+1)
	for (var d=1;d<9;d++) r=r.times(Math.pow(player[TIER_NAMES[d]+"Amount"].max(10).log10(),1/3))
	return r.floor()
}

function canPSac() {
	return player.pSac!=undefined&&!tmp.ri&&player.matter.max(player.money).gte(1e3)&&player.totalTickGained
}

function pSac(chall) {
	if (!canPSac()) return
    if (player.options.challConf&&chall) if (!confirm("You will Paradox Sacrifice without gaining anything. You need to Paradox Sacrifice with special conditions to complete this challenge.")) return
	pSacReset(false, chall)
}

function pSacReset(force, chall, pxGain) {
	if (!chall) {
		player.pSac.px = player.pSac.px.add(force?pxGain:getPxGain()).round()
		player.pSac.times++
		player.pSac[force?"forcedTimes":"normalTimes"]++
		if (!force) player.infDimensionsUnlocked[1]=true
	}
	player.pSac.time = 0
	PXminpeak = new Decimal(0)
	resetPDs()
	updateParadoxUpgrades()
	galaxyReset(-player.galaxies)
}

function pSacrificed() {
	return player.pSac!=undefined&&!isEmptiness&&(player.pSac.times||player.galacticSacrifice.times||player.infinitied>0||getEternitied()>0||quantumed)
}

//Paradox Upgrades
let puSizes = {x: 4, y: 3}
let puMults = {
	11: function(l) {
		//l - upgrade level
		return Math.pow(2,l)
	},
	12: function(l) {
		return l+1
	},
	13: function(l) {
		return 1+l/20
	},
	14: function(l) {
		return Math.min(Math.pow(2,l),1e3)
	},
	22: function() {
		return player.money.add(1).pow(0.2)
	},
	23: function() {
		return player.infinityPower.add(1).pow(0.15)
	},
	24: function() {
		return player.timeShards.add(1).pow(0.1)
	},
	31: function() {
		return Decimal.pow(10,player.galacticSacrifice.times+10).min(1e15)
	},
	32: function() {
		return getInfinityPowerEffect()
	},
	33: function() {
		return player.pSac.px.add(1).times(3).log10()/500
	},
	34: function() {
		return player.postC3Reward.log10()/3+1
	}
}
let puDescs = {
	11: "Double the dimension multiplier increase.",
	12: "Matter increases slower.",
	13: "The 2nd Dimension multiplier is exponentiated to a certain power.",
	14: "Time speed is 2x faster.",
	21: "Buying something reduces matter.",
	22: "Antimatter boosts Paradox Dimensions 1 & 4.",
	23: "Infinity power boosts Paradox Dimensions 2 & 5.",
	24: "Time Shards boost Paradox Dimensions 3 & 6.",
	31: function() {
		return "Gain a multiplier to Infinity Dimensions"+(player.galacticSacrifice.times>0||player.infinitied>0||player.eternities>0||quantumed?" based on your Galactic Sacrificed stat.":".")
	},
	32: "Infinity Power boosts Time Dimensions.",
	33: "Add Tickspeed Multiplier increase based on your Paradoxes.",
	34: "Infinity Power effect is stronger based on your Tickspeed Multiplier.",
	41: "Paradoxes add power to Dimension Boosts.",
	42: "Dimension Boosts boost Infinity Dimensions.",
	43: "Reduce Time Dimension Boost cost multiplier to 1.5.",
	44: "Time Dimension Boosts are stronger based on your Paradoxes.",
	51: "Tickspeed multiplier boost to Time Dimensions is stronger based on your Tickspeed Boosts.",
	52: "Tickspeed Boosts are 2x stronger.",
	53: "Galaxies boost Dimension Sacrifice.",
	54: "You get 1 extra galaxy for every 1 Tickspeed Boost.",
	61: "Paradoxes make you start with less matter.",
	62: "Paradoxes boost Normal Dimensions.",
	63: function() {
		return player.galacticSacrifice.times>0||player.infinitied>0||player.eternities>0||quantumed?"You gain more Galaxy points based on your Paradoxes.":"???"
	},
	64: function() {
		return player.galacticSacrifice.times>0||player.infinitied>0||player.eternities>0||quantumed?"Time Dimension Boosts multiply Dimension Boosts amount boost to Galaxy points gain.":"???"
	}
}
let puCosts = {
	11: function(l) {
		return Math.pow(4,l+1)
	},
	12: function(l) {
		return Math.pow(2,Math.pow(2,l))
	},
	13: function(l) {
		return Math.pow(4,l+4)
	},
	14: function(l) {
		return Decimal.pow(3,Math.pow(2,l)-1)
	},
	21: 256,
	22: 8,
	23: 32,
	24: 64,
	31: 1,
	32: 2,
	33: 8,
	34: 512
}
let puCaps = {
	11: 9,
	12: 9,
	13: 10,
	14: 10
}

function buyPU(x,r) {
	//x = upgrade id, r = is repeatable
	if (hasPU(x,r)==(!r||puCaps[x]||1/0)) return
	let c=getPUCost(x,r)||0
	if (!player.pSac.px.gte(c)) return
	player.pSac.px=player.pSac.px.sub(c).round()
	if (r) player.pSac.rebuyables[x]=(player.pSac.rebuyables[x]||0)+1
	else player.pSac.upgs.push(x)
	updateParadoxUpgrades()
	if (r) updatePUCosts()
}

function getPUCost(x,r,l) {
	//x = upgrade id, r = is repeatable, l = upgrade level
	if (l==undefined) l=hasPU(x,r)
	if (puCosts[x]==undefined) return 1/0
	if (r) return puCosts[x](l)
	return puCosts[x]
}

function hasPU(x,r,nq) {
	let e=player.pSac!=undefined&&!(nq&&player.aarexModifications.quickReset)
	if (r) return (e&&player.pSac.rebuyables[x])||0
	return e&&player.pSac.upgs.includes(x)
}

function updateParadoxUpgrades() {
	for (var r=1;r<=puSizes.y;r++) {
		for (var c=1;c<=puSizes.x;c++) {
			var id=r*10+c
			document.getElementById("pu"+id).className=hasPU(id,r<2)==(r>1||puCaps[id]||1/0)?"pubought":player.pSac.px.gte(getPUCost(id,r<2,hasPU(id,true)))?"pupg":"infinistorebtnlocked"
			document.getElementById("puc"+id).style.display=hasPU(id,true)>=puCaps[id]?"none":""
			if (typeof(puDescs[id])=="function") document.getElementById("pud"+id).textContent=puDescs[id]()
		}
	}
}

function updatePUMults() {
	for (var r=1;r<=puSizes.y;r++) {
		for (var c=1;c<=puSizes.x;c++) {
			var id=r*10+c
			if (puMults[id]) {
				if (id==13) document.getElementById("pue13").textContent="^"+puMults[13](hasPU(13,true,true)).toFixed(2)
				else if (id==33) document.getElementById("pue33").textContent="+"+puMults[33]().toFixed(4)
				else document.getElementById("pue"+id).textContent=shorten(puMults[id](hasPU(id,true,r<2)))+"x"
			}
		}
	}
}

function updatePUCosts() {
	for (var r=1;r<=puSizes.y;r++) {
		for (var c=1;c<=puSizes.x;c++) {
			var id=r*10+c
			document.getElementById("puc"+id).textContent="Cost: "+shortenDimensions(getPUCost(id,r<2,hasPU(id,true)))+" Px"
		}
	}
}

//p21
function reduceMatter(x) {
	if (hasPU(21, false, true)) player.matter=player.matter.div(Decimal.pow(1.01,x))
}

//Paradox Challenges
function inPxC(x) {
	if (x==0) return player.pSac==undefined||!player.pSac.chall
	return player.pSac!=undefined&&player.pSac.chall==x
}

//Paradox Dimensions
var pdBaseCosts = [null, 1, 2, 4, 16, 1/0, 1/0, 1e250, 1e280]
var pdCostMults = [null, 3, 16, 64, 4096, 1/0, 1/0, 1e250, 1e280]

function buyPD(d) {
	let ps=player.pSac
	let c=ps.dims[d].cost
	if (!ps.px.gte(c)) return
	ps.px=ps.px.sub(c.min(ps.px)).round()
	ps.dims[d].bought++
	ps.dims[d].amount=ps.dims[d].amount.add(1)
	ps.dims[d].cost=ps.dims[d].cost.times(pdCostMults[d])
	ps.dims[d].power=ps.dims[d].power.times(2)
	updateParadoxUpgrades()
}

function maxPDs() {
	let ps=player.pSac
	let upd=false
	for (var d=1;d<9;d++) {
		var c=player.pSac.dims[d].cost
		if (ps.px.gte(c)) {
			var m=pdCostMults[d]
			var tb=Math.floor(ps.px.div(c).times(m-1).add(1).log(m))
			var ts=Decimal.pow(m,tb).sub(1).div(m-1).times(c)
			ps.px=ps.px.sub(ts.min(ps.px)).round()
			ps.dims[d].bought+=tb
			ps.dims[d].amount=ps.dims[d].amount.add(tb)
			ps.dims[d].cost=ps.dims[d].cost.times(Decimal.pow(m,tb))
			ps.dims[d].power=ps.dims[d].power.times(Decimal.pow(2,tb))
			upd=true
		}
	}
	if (upd) updateParadoxUpgrades()
}

function getPDPower(d) {
	let r=player.pSac.dims[d].power
	if (d<8) {
		var pu=((d-1)%3)+22
		if (hasPU(pu)) r=r.times(puMults[pu]())
	}
	if (d==2) r=r.pow(puMults[13](hasPU(13, true)))
	return dilates(r)
}

function getPDProduction(d) {
	let r=player.pSac.dims[d].amount
	r=r.times(getPDPower(d))
	if (d<2) r=r.add(getPDProduction(2))
	r=r.times(100)
	return r
}

function getPDDesc(d) {
	let txt=shortenDimensions(player.pSac.dims[d].amount)
	if (isDimUnlocked(d+2)) txt+=' (+'+shorten(getPDRate(d))+dimDescEnd
	return txt
}

function getPDRate(d) {
	let toGain = getPDProduction(d+2).div(getEC12Mult())
	var current = player.pSac.dims[d].amount.max(1)
	if (player.aarexModifications.logRateChange) {
		var change = current.add(toGain.div(10)).log10()-current.log10()
		if (change<0||isNaN(change)) change = 0
	} else var change = toGain.times(10).dividedBy(current)
	return change
}

function resetPDs(full) {
	if (full) player.pSac.dims={}
	player.pSac.dims.power=new Decimal(0)
	player.pSac.dims.extraTime=0
	if (full) for (var d=1;d<9;d++) player.pSac.dims[d]={cost:new Decimal(pdBaseCosts[d]),bought:0,power:new Decimal(1)}
	for (var d=1;d<9;d++) player.pSac.dims[d].amount=new Decimal(player.pSac.dims[d].bought)
}

function getExtraTime() {
	if (!haveExtraTime()) return 0
	return Math.log10(player.pSac.dims.power.add(1).log10()+1)*4
}

//Paradox Layer Reset
function resetPSac() {
	if (player.aarexModifications.ngmX>4) {
		PXminpeak = new Decimal(0)
		let keepPU
		player.pSac = {
			time: 0,
			times: 0,
			normalTimes: 0,
			forcedTimes: 0,
			lostResets: (player.pSac && player.pSac.lostResets) || 0,
			px: new Decimal(0),
			upgs: keepPU ? player.pSac.upgs : [],
			rebuyables: keepPU ? player.pSac.rebuyables : {}
		}
		resetPDs(true)
		updateParadoxUpgrades()
		updatePUCosts()
	}
}

//v0.51
function haveExtraTime() {
	return player.pSac !== undefined && !player.aarexModifications.quickReset
}

function quickMReset() {
	player.aarexModifications.quickReset=!player.aarexModifications.quickReset
	document.getElementById("quickMReset").textContent = "Quick matter reset: O"+(player.aarexModifications.quickReset?"N":"FF")
}
