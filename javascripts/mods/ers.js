// to do: update eternity respecced

function updateERSTTDesc() {
	document.getElementById("ts1desc").textContent = shorten(calcTotalSacrificeBoost()) + "x -> " + shorten(calcTotalSacrificeBoost(true)) + "x"
	document.getElementById("ts2desc").textContent = getFullExpansion(getTotalTickGained()) + " -> " + getFullExpansion(getTotalTickGained(true))
	document.getElementById("ts3desc").textContent = shorten(getReplMult()) + "x -> " + shorten(getReplMult(true)) + "x"
	document.getElementById("ts4desc").textContent = shorten(getDimensionBoostPower()) + "x -> " + shorten(getDimensionBoostPower(true)) + "x"
	document.getElementById("ts5desc").textContent = shorten(gainedInfinityPoints()) + "x -> " + shorten(gainedInfinityPoints(5)) + "x"
	document.getElementById("ts6desc").textContent = shorten(gainedInfinityPoints()) + "x -> " + shorten(gainedInfinityPoints(6)) + "x"
}

function get_c(next) {
	return Math.pow(4 / 3, 1 / (1 + (player.timestudy.ers_studies[2] + (next ? 1 : 0)) / 10))
}

function getTickThreshold(timeshards, num) {
	return tickCost(getTotalTickGained(timeshards, num) + 1)
}

function tickCost(x) {
	return Decimal.pow(get_c(), x - 1).times(Decimal.pow(1.001, (x - 1) * (x - 2) / 2));
}

function getTotalTickGained(next) {
	var timeshards = player.timeShards
	if (timeshards.lt(1)) {
		return 0;
	}
	let timeshardLn = timeshards.ln();
	let c = get_c(next);
	// we know that ln(1.001) * (x - 1) * x / 2 + ln(c) * x <= timeshardLn
	// so ln(1.001) / 2 * x^2 + (ln(c) - ln(1.001) / 2) * x - timeshardLn <= 0
	let a = Math.log(1.001) / 2;
	let b = Math.log(c) - a;
	let solution = (-b + Math.sqrt(Math.pow(b, 2) + 4 * a * timeshardLn)) / (2 * a);
	let realSolution = Math.floor(solution) + 1
	return realSolution;
}

function updateGalaxyControl() {
	document.getElementById("galStrength").value=Math.log10(player.replicanti.newLimit.log(2))/Math.log10(2)/10
	document.getElementById("replLimit").value=formatValue("Scientific", player.replicanti.newLimit, 2, 0)
}

function setReplicantiNewGalaxyStrength() {
	player.replicanti.newLimit=Decimal.pow(2,Math.pow(2,parseFloat(document.getElementById("galStrength").value)*10))
	document.getElementById("replLimit").value=formatValue("Scientific", player.replicanti.newLimit, 2, 0)
}

function setReplicantiNewLimit() {
	var value=fromValue(document.getElementById("replLimit").value)
	if (!isNaN(break_infinity_js ? value : value.logarithm)) player.replicanti.newLimit=value
	document.getElementById("galStrength").value=Math.log10(new Decimal(player.replicanti.newLimit).log(2))/Math.log10(2)/10
}