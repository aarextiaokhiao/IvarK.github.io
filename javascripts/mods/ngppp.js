masterystudies={initialCosts:{time:{241: 1e71, 251: 2e71, 252: 2e71, 253: 2e71, 261: 5e71, 262: 5e71, 263: 5e71, 264: 5e71, 265: 5e71, 266: 5e71, 271: 2.7434842249657063e76, 272: 2.7434842249657063e76, 273: 2.7434842249657063e76, 281: 6.858710562414266e76, 282: 6.858710562414266e76, 291: 2.143347050754458e77, 292: 2.143347050754458e77, 301: 8.573388203017832e77, 302: 2.6791838134430725e78, 303: 8.573388203017832e77, 311: 8.573388203017832e77, 312: 8.573388203017832e77, 321: 2.6791838134430727e76, 322: 9.324815538194444e77, 323: 2.6791838134430727e76, 331: 1.0172526041666666e79, 332: 1.0172526041666666e79, 341: 9.5367431640625e78, 342: 1.0172526041666666e79, 343: 1.0172526041666666e79, 344: 9.5367431640625e78, 351: 2.1192762586805557e79, 361: 1.5894571940104167e79, 362: 1.5894571940104167e79, 371: 2.1192762586805557e79, 372: 6.622738308376736e79, 373: 2.1192762586805557e79, 381: 6.622738308376736e79, 382: 6.622738308376736e79, 383: 6.622738308376736e79, 391: 8.27842288547092e79, 392: 8.27842288547092e79, 393: 8.27842288547092e79, 401: 4.967053731282552e80, 411: 1.986821492513021e81, 412: 6.622738308376737e81, 421: 1.655684577094184e82, 422: 1.655684577094184e82, 423: 1.655684577094184e82},
		ec:{13:1e72, 14:1e72}},
	costs:{time:{},
		ec:{},
		dil:{7: 2e82, 8: 2e84, 9: 4e85, 10: 4e87, 11: 3e90, 12: 3e92},
		mc:{}},
	costmults:{241: 1, 251: 2.5, 252: 2.5, 253: 2.5, 261: 6, 262: 6, 263: 6, 264: 6, 265: 6, 266: 6, 271: 2, 272: 2, 273: 2, 281: 4, 282: 4, 291: 1, 292: 1, 301: 2, 302: 131072, 303: 2, 311: 64, 312: 64, 321: 2, 322: 2, 323: 2, 331: 2, 332: 2, 341: 1, 342: 1, 343: 1, 344: 1, 351: 4, 361: 1, 362: 1, 371: 2, 372: 2, 373: 2, 381: 1, 382: 1, 383: 2, 391: 1, 392: 1, 393: 1, 401: 1, 411: 1, 412: 1, 421: 1, 422: 1, 423: 1},
	costmult:1,
	allTimeStudies:[241, 251, 252, 253, 261, 262, 263, 264, 265, 266, 271, 272, 273, 281, 282, 291, 292, 301, 302, 303, 311, 312, 321, 322, 323, 331, 332, 341, 342, 343, 344, 351, 361, 362, 371, 372, 373, 381, 382, 383, 391, 392, 393, 401, 411, 412, 421, 422, 423],
	initialReqs:{13:728e3,14:255e5},
	incrementReqs:{13:6e3,14:9e5},
	reqs:{},
	latestBoughtRow:0}

function portal() {
	if (player.dilation.upgrades.includes("ngpp6")) showEternityTab("masterystudies")
}
	
function updateMasteryStudyButtons() {
	if (!player.masterystudies) return
	for (id=0;id<(quantumed?masterystudies.allTimeStudies.length:10);id++) {
		var name=masterystudies.allTimeStudies[id]
		var div=document.getElementById("timestudy"+name)
		if (player.masterystudies.includes("t"+name)) div.className="timestudybought"
		else if (canBuyMasteryStudy('t', name)) div.className="timestudy"
		else div.className="timestudylocked"
	}
	for (id=13;id<15;id++) {
		var element=document.getElementById("ec"+id+"unl")
		if (player.eternityChallUnlocked==id) element.className="eternitychallengestudybought"
		else if (canBuyMasteryStudy('ec', id)) element.className="eternitychallengestudy"
		else element.className="timestudylocked"
	}
	for (id=262;id<265;id++) document.getElementById("ts"+id+"Current").textContent="Currently: "+shorten(getMTSMult(id))+"x"
	if (quantumed) {
		for (id=281;id<283;id++) document.getElementById("ts"+id+"Current").textContent="Currently: "+shorten(getMTSMult(id))+"x"
		document.getElementById("ts303Current").textContent="Currently: "+shorten(getMTSMult(303))+"x"
		document.getElementById("ts322Current").textContent="Currently: "+shorten(getMTSMult(322))+"x"
		for (id=7;id<11;id++) {
			var div=document.getElementById("dilstudy"+id)
			if (player.masterystudies.includes("d"+id)) div.className="dilationupgbought"
			else if (canBuyMasteryStudy('d', id)) div.className="dilationupg"
			else div.className="timestudylocked"
		}
	}
	if (player.masterystudies.includes("d10")) {
		document.getElementById("ts341Current").textContent="Currently: "+shorten(getMTSMult(341))+"x"
		document.getElementById("ts344Current").textContent="Currently: "+(getMTSMult(344)*100-100).toFixed(2)+"%"
		document.getElementById("ts351Current").textContent="Currently: "+shorten(getMTSMult(351))+"x"
		
		var div=document.getElementById("dilstudy11")
		if (player.masterystudies.includes("d11")) div.className="dilationupgbought"
		else if (canBuyMasteryStudy('d', 11)) div.className="dilationupg"
		else div.className="timestudylocked"
	}
	if (player.masterystudies.includes("d11")) {
		document.getElementById("ts361Current").textContent="Currently: "+shorten(getMTSMult(361))+"x"
		for (r=37;r<40;r++) for (c=1;c<4;c++) document.getElementById("ts"+(r*10+c)+"Current").textContent="Currently: "+shorten(getMTSMult(r*10+c))+"x"
		
		var div=document.getElementById("dilstudy12")
		if (player.masterystudies.includes("d12")) div.className="dilationupgbought"
		else if (canBuyMasteryStudy('d', 12)) div.className="dilationupg"
		else div.className="timestudylocked"
	}
	if (player.masterystudies.includes("d12")) {
		document.getElementById("ts401Current").textContent="Currently: "+shorten(getMTSMult(401))+"x"
		document.getElementById("ts411Current").textContent="Currently: "+shorten(getMTSMult(411))+"x"
	}
}

function updateMasteryStudyCosts(quick=false) {
	masterystudies.latestBoughtRow=0
	masterystudies.costmult=1
	for (id=0;id<player.masterystudies.length;id++) {
		var t=player.masterystudies[id].split("t")[1]
		if (t) {
			masterystudies.costs.time[t]=masterystudies.initialCosts.time[t]*masterystudies.costmult
			masterystudies.costmult*=masterystudies.costmults[t]
			masterystudies.latestBoughtRow=Math.max(masterystudies.latestBoughtRow,Math.floor(t/10))
		}
	}
	for (id=0;id<masterystudies.allTimeStudies.length;id++) {
		var name=masterystudies.allTimeStudies[id]
		if (!player.masterystudies.includes("t"+name)) masterystudies.costs.time[name]=masterystudies.initialCosts.time[name]*masterystudies.costmult
	}
	for (id=13;id<15;id++) {
		masterystudies.costs.ec[id]=masterystudies.initialCosts.ec[id]*masterystudies.costmult
		masterystudies.reqs[id]=masterystudies.initialReqs[id]+masterystudies.incrementReqs[id]*ECTimesCompleted("eterc"+id)
		masterystudies.costs.ec[name]=masterystudies.initialCosts.ec[name]*masterystudies.costmult
	}
	if (!quick) updateMasteryStudyTextDisplay()
}

var types = {t:"time",ec:"ec",d:"dil"}
function buyMasteryStudy(type, id, quick=false) {
	if (canBuyMasteryStudy(type, id)) {
		player.timestudy.theorem-=masterystudies.costs[types[type]][id]
		if (type=='ec') {
			player.eternityChallUnlocked=id
			player.etercreq=id
			updateEternityChallenges()
		} else {
			player.masterystudies.push(type+id)
		}
		updateMasteryStudyCosts(quick)
		if (id==302) maybeShowFillAll()
		if (!quick) {
			if (id==302) fillAll()
			if (type=='ec') {
				showTab("challenges")
				showChallengesTab("eternitychallenges")
			} else drawMasteryTree()
			updateMasteryStudyButtons()
		}
		if (id==241&&!GUBought("gb3")) {
			ipMultPower=2.2
			document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by "+ipMultPower+"<br>currently: "+shorten(getIPMult()) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
		}
		if (id==383) updateColorCharge()
		if (id==7) {
			showTab("quantumtab")
			showQuantumTab("electrons")
			updateElectrons()
		}
		if (id>7&&id<10) {
			showTab("challenges")
			showChallengesTab("quantumchallenges")
			updateQuantumChallenges()
			if (id>8) updateGluons()
		}
		if (id==10) {
			showTab("quantumtab")
			showQuantumTab("replicants")
			document.getElementById("replicantsstudies").style.display=""
			document.getElementById("timestudy322").style.display=""
			updateReplicants()
		}
		if (id==11) {
			showTab("dimensions")
			showDimTab("emperordimensions")
			document.getElementById("empstudies").style.display=""
			document.getElementById("timestudy361").style.display=""
			document.getElementById("timestudy362").style.display=""
			document.getElementById("edtabbtn").style.display=""
			updateReplicants()
		}
		if (id==12) {
			showTab("quantumtab")
			showQuantumTab("nanofield")
			document.getElementById("nfstudies").style.display=""
			document.getElementById("nanofieldtabbtn").style.display = ""
		}
	}
}

function canBuyMasteryStudy(type, id) {
	if (type=='t') {
		if (player.timestudy.theorem<masterystudies.costs.time[id]||player.masterystudies.includes('t'+id)||player.eternityChallUnlocked>12) return false
		var row=Math.floor(id/10)
		if (masterystudies.latestBoughtRow>row) return false
		var col=id%10
		if (row>40) {
			if (col>1) return player.masterystudies.includes('t' + (row * 10 + col - 1))
			return player.masterystudies.includes('t' + (row * 11 - 50))
		}
		if (row>38) {
			if (col>2) return player.masterystudies.includes('t382')
			if (col>1) return player.masterystudies.includes('t391')||player.masterystudies.includes('t393')
			return player.masterystudies.includes('t381')
		}
		if (row>37) {
			if (col>2) return player.masterystudies.includes('t373')
			if (col>1) return player.masterystudies.includes('t383')
			return player.masterystudies.includes('t372')
		}
		if (row>36) {
			if (col>2) return player.masterystudies.includes('t362')
			if (col>1) return player.masterystudies.includes('t371')
			return player.masterystudies.includes('t361')
		}
		if (row>35) return player.masterystudies.includes('d11')&&player.masterystudies.includes('t351')
		if (row>34) return player.masterystudies.includes('t344')
		if (row>33) {
			if (col>3) return player.masterystudies.includes('t343')
			if (col>1) return player.masterystudies.includes('t33'+(col-1))
			return player.masterystudies.includes('t342')
		}
		if (row>32) return player.masterystudies.includes('t322')
		if (row>31) {
			if (col==2) return player.masterystudies.includes('t302')&&player.masterystudies.includes('d10')
			return player.masterystudies.includes('t31'+((col+1)/2))
		}
		if (row>30) return player.masterystudies.includes('t30'+(col*2-1))
		if (row>29) {
			if (col==2) return player.masterystudies.includes('t272')&&player.masterystudies.includes('d9')
			return player.masterystudies.includes('t29'+((col+1)/2))
		}
		if (row>28) return player.masterystudies.includes('t272')&&player.masterystudies.includes('d9')
		if (row>27) return player.masterystudies.includes('t27'+col)||player.masterystudies.includes('t27'+(col+1))
		if (row>26) return player.masterystudies.includes('t252')&&player.masterystudies.includes('d7')
		if (row>25) return player.masterystudies.includes('t25'+Math.ceil(col/2))
		if (row>24) return player.masterystudies.includes('t241')
	} else if (type=='d') {
		if (player.timestudy.theorem<masterystudies.costs.dil[id]||player.masterystudies.includes('d'+id)) return false
		if (id>11) return player.masterystudies.includes("t392")&&eds[8].workers.gt(9.9)
		if (id>10) return player.masterystudies.includes("t351")&&eds[1].workers.gt(9.9)
		if (id>9) return player.masterystudies.includes("t302")&&player.quantum.pairedChallenges.completed>3
		if (id>8) return player.masterystudies.includes("d8")&&QCIntensity(8)
		if (id>7) return player.masterystudies.includes("t272")&&player.quantum.electrons.amount.gte(16750)
		if (id>6) return player.masterystudies.includes("t252")
	} else {
		if (player.timestudy.theorem<masterystudies.costs.ec[id]||player.eternityChallUnlocked) return false
		if (id==13&&!(player.masterystudies.includes('t261')||player.masterystudies.includes('t262')||player.masterystudies.includes('t263'))) return false
		if (id==14&&!(player.masterystudies.includes('t264')||player.masterystudies.includes('t265')||player.masterystudies.includes('t266'))) return false
		if (player.etercreq==id) return true
		if (id==13) return player.resets>=masterystudies.reqs[13]
		return Math.round(player.replicanti.chance*100)>=masterystudies.reqs[14]
	}
	return true
}

function drawMasteryBranch(num1, num2) {
	var type=num2.split("ec")[1]?"ec":num2.split("di")[1]?"d":"t"
	var start=document.getElementById(num1).getBoundingClientRect();
	var end=document.getElementById(num2).getBoundingClientRect();
	var x1=start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
	var y1=start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
	var x2=end.left + (end.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
	var y2=end.top + (end.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
	msctx.lineWidth=15;
	msctx.beginPath();
	var drawBoughtLine=false
	if (type=="ec") {
		if (player.eternityChallUnlocked==num2.slice(2,4)) drawBoughtLine=player.masterystudies.includes('t'+num1.split("study")[1])
	} else drawBoughtLine=player.masterystudies.includes(type+num2.split("study")[1])
	if (drawBoughtLine) {
		if (type=="d" && player.options.theme == "Aarex's Modifications") {
			msctx.strokeStyle=parseInt(num2.split("study")[1])<8?"#D2E500":parseInt(num2.split("study")[1])>9?"#333333":"#009900";
		} else if (type=="ec") {
			msctx.strokeStyle="#490066";
		} else {
			msctx.strokeStyle="#000000";
		}
	} else if (type=="d" && player.options.theme == "Aarex's Modifications") {
		msctx.strokeStyle=parseInt(num2.split("study")[1])<8?"#697200":parseInt(num2.split("study")[1])>11?"#727272":parseInt(num2.split("study")[1])>9?"#262626":"#006600";
	} else msctx.strokeStyle="#444";
	msctx.moveTo(x1, y1);
	msctx.lineTo(x2, y2);
	msctx.stroke();
}

function drawMasteryTree() {
	msctx.clearRect(0, 0, msc.width, msc.height);
	if (player === undefined) return
	if (document.getElementById("eternitystore").style.display === "none" || document.getElementById("masterystudies").style.display === "none" || player.masterystudies === undefined) return
	drawMasteryBranch("back", "timestudy241")
	drawMasteryBranch("timestudy241", "timestudy251")
	drawMasteryBranch("timestudy241", "timestudy252")
	drawMasteryBranch("timestudy241", "timestudy253")
	drawMasteryBranch("timestudy251", "timestudy261")
	drawMasteryBranch("timestudy251", "timestudy262")
	drawMasteryBranch("timestudy252", "timestudy263")
	drawMasteryBranch("timestudy252", "timestudy264")
	drawMasteryBranch("timestudy253", "timestudy265")
	drawMasteryBranch("timestudy253", "timestudy266")
	drawMasteryBranch("timestudy261", "ec13unl")
	drawMasteryBranch("timestudy262", "ec13unl")
	drawMasteryBranch("timestudy263", "ec13unl")
	drawMasteryBranch("timestudy264", "ec14unl")
	drawMasteryBranch("timestudy265", "ec14unl")
	drawMasteryBranch("timestudy266", "ec14unl")
	if (quantumed) {
		drawMasteryBranch("timestudy252", "dilstudy7")
		drawMasteryBranch("dilstudy7", "timestudy271")
		drawMasteryBranch("dilstudy7", "timestudy272")
		drawMasteryBranch("dilstudy7", "timestudy273")
		drawMasteryBranch("timestudy271","timestudy281")
		drawMasteryBranch("timestudy272","timestudy281")
		drawMasteryBranch("timestudy272","timestudy282")
		drawMasteryBranch("timestudy273","timestudy282")
		drawMasteryBranch("timestudy272", "dilstudy8")
		drawMasteryBranch("dilstudy8", "dilstudy9")
		drawMasteryBranch("dilstudy9", "timestudy291")
		drawMasteryBranch("dilstudy9", "timestudy292")
		drawMasteryBranch("timestudy291", "timestudy301")
		drawMasteryBranch("dilstudy9", "timestudy302")
		drawMasteryBranch("timestudy292", "timestudy303")
		drawMasteryBranch("timestudy301", "timestudy311")
		drawMasteryBranch("timestudy303", "timestudy312")
		drawMasteryBranch("timestudy302", "dilstudy10")
		drawMasteryBranch("timestudy311", "timestudy321")
		drawMasteryBranch("timestudy312", "timestudy323")
	}
	if (player.masterystudies.includes("d10")) {
		drawMasteryBranch("dilstudy10", "timestudy322")
		drawMasteryBranch("timestudy322", "timestudy331")
		drawMasteryBranch("timestudy322", "timestudy332")
		drawMasteryBranch("timestudy331", "timestudy342")
		drawMasteryBranch("timestudy332", "timestudy343")
		drawMasteryBranch("timestudy342", "timestudy341")
		drawMasteryBranch("timestudy343", "timestudy344")
		drawMasteryBranch("timestudy344", "timestudy351")
		drawMasteryBranch("timestudy351", "dilstudy11")
	}
	if (player.masterystudies.includes("d11")) {
		drawMasteryBranch("dilstudy11", "timestudy361")
		drawMasteryBranch("dilstudy11", "timestudy362")
		drawMasteryBranch("timestudy361", "timestudy371")
		drawMasteryBranch("timestudy371", "timestudy372")
		drawMasteryBranch("timestudy362", "timestudy373")
		drawMasteryBranch("timestudy372", "timestudy381")
		drawMasteryBranch("timestudy383", "timestudy382")
		drawMasteryBranch("timestudy373", "timestudy383")
		drawMasteryBranch("timestudy373", "timestudy383")
		drawMasteryBranch("timestudy381", "timestudy391")
		drawMasteryBranch("timestudy391", "timestudy392")
		drawMasteryBranch("timestudy393", "timestudy392")
		drawMasteryBranch("timestudy382", "timestudy393")
		drawMasteryBranch("timestudy392", "dilstudy12")
	}
	if (player.masterystudies.includes("d12")) {
		drawMasteryBranch("dilstudy12", "timestudy401")
		drawMasteryBranch("timestudy401", "timestudy411")
		drawMasteryBranch("timestudy411", "timestudy412")
		drawMasteryBranch("timestudy412", "timestudy421")
		drawMasteryBranch("timestudy421", "timestudy422")
		drawMasteryBranch("timestudy422", "timestudy423")
		drawMasteryBranch("timestudy423", "dilstudy13")
	}
    if (shiftDown) {
        var all = masterystudies.allTimeStudies
    	for (i=0; i<all.length; i++) {
            var start = document.getElementById("timestudy" + all[i]).getBoundingClientRect();
            var x1 = start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
            var y1 = start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
            var msg = all[i] + " (" + masterystudies.costmults[all[i]] + "x)"
            msctx.fillStyle = 'white';
            msctx.strokeStyle = 'black';
            msctx.lineWidth = 3;
            msctx.font = "15px Typewriter";
            msctx.strokeText(msg, x1 - start.width / 2, y1 - start.height / 2 - 1);
            msctx.fillText(msg, x1 - start.width / 2, y1 - start.height / 2 - 1);
        }
    }
}

function setupText() {
	for (id=0;id<masterystudies.allTimeStudies.length;id++) {
		var name=masterystudies.allTimeStudies[id]
		var div=document.getElementById("timestudy"+name)
		div.innerHTML=div.innerHTML+"<br><span id='ts"+name+"Cost'></span>"
	}
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
				col.textContent = "QC" + r
				col.className = "pc1completed"
			} else col.id = "pc" + r + c
		}
	}
	var edsDiv = document.getElementById("empDimTable")
	for (d=1;d<9;d++) {
		var row=edsDiv.insertRow(d-1)
		row.id="empRow"+d
		row.style["font-size"]="16px"
		var html='<td id="empD'+d+'" width="41%">'+DISPLAY_NAMES[d]+' Emperor Dimension x1</td>'
		html+='<td><div id="empAmount'+d+'">0'+(d>7?'':' (+0.00%/s)')+'</div></td>'
		html+='<td><span class="empQuarks" id="empQuarks'+d+'">0</span> quarks/s</td>'
		html+='<td align="right" width="10%"><button id="empFeed'+d+'" style="color:black; width:195px; height:30px" class="storebtn" align="right" onclick="feedReplicant('+d+')">Feed (0%)</button></td>'
		row.innerHTML=html
	}
}

//v1.1
function getMTSMult(id) {
	if (id==262) return Math.max(player.resets/15e3-19,1)
	if (id==263) return player.meta.resets+1
	if (id==264) return Math.pow(player.galaxies+1,0.25)*2
	if (id>280) {
		var replmult = Decimal.pow(Decimal.log2(Decimal.max(player.replicanti.amount, 1)), 2)
		if (player.timestudy.studies.includes(21)) replmult = replmult.add(Decimal.pow(player.replicanti.amount, 0.032))
		if (player.timestudy.studies.includes(102)) replmult = replmult.times(Decimal.pow(5, player.replicanti.galaxies, 150))
	}
	if (id==281) return Decimal.pow(10,Math.pow(replmult.max(1).log10(),0.25)/10)
	if (id==282) return Decimal.pow(10,Math.pow(replmult.max(1).log10(),0.25)/15)
	if (id==303) return Decimal.pow(4.7,Math.pow(Math.log10(Math.max(player.galaxies,1)),1.5))
	if (id==322) {
		let log = Math.sqrt(-player.tickspeed.div(1000).log10())/20000
		if (log>110) log = Math.sqrt(log * 27.5) + 55
		return Decimal.pow(10, log)
	}
	if (id==341) return Decimal.pow(2,Math.sqrt(player.quantum.replicants.quarks.add(1).log10()))
	if (id==344) return Math.pow(player.quantum.replicants.quarks.div(1e7).add(1).log10(),0.25)*0.17+1
	if (id==351) return player.timeShards.max(1).pow(14e-7)
	if (id==361) return player.dilation.tachyonParticles.max(1).pow(0.01824033924212366)
	if (id==371) return Math.pow(extraReplGalaxies+1,0.3)
	if (id==372) return Math.sqrt(player.timeShards.add(1).log10())/20+1
	if (id==373) return Math.pow(player.galaxies+1,0.55)
	if (id==381) return Decimal.log10(getTickSpeedMultiplier())/-135+1
	if (id==382) return player.eightAmount.max(1).pow(Math.PI)
	if (id==383) return Decimal.pow(3200,Math.pow(player.quantum.colorPowers.b.add(1).log10(),0.25))
	if (id==391) return player.meta.antimatter.max(1).pow(8e-4)
	if (id==392) return Decimal.pow(1.6,Math.sqrt(player.quantum.replicants.quarks.add(1).log10()))
	if (id==393) return Decimal.pow(4e5,Math.sqrt(getTotalWorkers().add(1).log10()))
	if (id==401) return player.quantum.replicants.quarks.div(2e28).add(1).pow(0.2)
	if (id==411) return getTotalReplicants().div(4e24).add(1).pow(0.2)
}

//v1.3
function getEC14Power() {
	if (player.masterystudies == undefined) return 0
	if (player.currentEterChall=='eterc14') return 5
	let ret = ECTimesCompleted("eterc14") * 2
	return ret
}

//v1.5
function showQuantumTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('quantumtab');
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
	if (oldTab != tabName) {
		if (tabName == "uquarks" && document.getElementById("quantumtab").style.display !== "none") {
			resizeCanvas()
			requestAnimationFrame(drawQuarkAnimation)
		}
	}
	closeToolTip()
}

function updateQuantumTabs() {
	if (document.getElementById("uquarks").style.display=="block") {
		document.getElementById("redPower").textContent=shortenMoney(player.quantum.colorPowers.r)
		document.getElementById("greenPower").textContent=shortenMoney(player.quantum.colorPowers.g)
		document.getElementById("bluePower").textContent=shortenMoney(player.quantum.colorPowers.b)
		document.getElementById("redTranslation").textContent=((colorBoosts.r-1)*100).toFixed(1)
		var msg = getFullExpansion(Math.round((colorBoosts.g-1)*100))+(colorBoosts.mg>0?"+"+getFullExpansion(Math.round(colorBoosts.mg*100)):"")
		document.getElementById("greenTranslation").textContent=msg
		document.getElementById("blueTranslation").textContent=shortenMoney(colorBoosts.b)
		if (player.masterystudies.includes("t383")) document.getElementById("blueTranslationMD").textContent=shorten(getMTSMult(383))
	}
	if (document.getElementById("gluons").style.display=="block") {
		document.getElementById("brupg1current").textContent="Currently: "+shortenMoney(player.dilation.dilatedTime.add(1).log10()+1)+"x"
		document.getElementById("brupg2current").textContent="Currently: "+shortenMoney(Decimal.pow(2.2, Math.pow(calcTotalSacrificeBoost().log10()/1e6, 0.25)))+"x"
		document.getElementById("brupg4current").textContent="Currently: "+shortenMoney(Decimal.pow(getDimensionPowerMultiplier(), 0.0003))+"x"
		if (player.masterystudies.includes("d9")) {
			document.getElementById("gbupg5current").textContent="Currently: "+(Math.sqrt(player.replicanti.galaxies)/5.5).toFixed(1)+"%"
			document.getElementById("brupg5current").textContent="Currently: "+Math.min(Math.sqrt(player.dilation.tachyonParticles.max(1).log10())*1.3,14).toFixed(1)+"%"
			document.getElementById("gbupg6current").textContent="Currently: "+(100-100/(1+Math.pow(player.infinityPower.log10(),0.25)/2810)).toFixed(1)+"%"
			document.getElementById("brupg6current").textContent="Currently: "+(100-100/(1+player.meta.resets/340)).toFixed(1)+"%"
			document.getElementById("gbupg7current").textContent="Currently: "+(100-100/(1+Math.log10(1+player.infinityPoints.max(1).log10())/100)).toFixed(1)+"%"
			document.getElementById("brupg7current").textContent="Currently: "+(100-100/(1+Math.log10(1+player.eternityPoints.max(1).log10())/80)).toFixed(1)+"%"
		}
	}
	if (document.getElementById("electrons").style.display=="block") {
		for (i=1;i<7;i++) document.getElementById("sacrifice"+i).className=(Math.pow(10,i>4?0:i-1)>player.galaxies-player.quantum.electrons.sacGals||!inQC(0))?"unavailablebtn":"storebtn"
		for (u=1;u<5;u++) document.getElementById("electronupg"+u).className="gluonupgrade "+(canBuyElectronUpg(u)?"stor":"unavailabl")+"ebtn"
		document.getElementById("electronsEffect").textContent = shorten(getDimensionPowerMultiplier(true))
	}
	if (document.getElementById("replicants").style.display=="block") {
		document.getElementById("replicantiAmount2").textContent=shortenDimensions(player.replicanti.amount)
		document.getElementById("replicantReset").className=player.replicanti.amount.lt(player.quantum.replicants.requirement)?"unavailablebtn":"storebtn"
		document.getElementById("replicantAmount").textContent=shortenDimensions(player.quantum.replicants.amount)
		document.getElementById("workerReplAmount").textContent=shortenDimensions(getTotalWorkers())
		document.getElementById("babyReplAmount").textContent=shortenDimensions(player.quantum.replicants.babies)

		var gatherRateData=getGatherRate()
		document.getElementById("normalReplGatherRate").textContent=shortenDimensions(gatherRateData.normal)
		document.getElementById("workerReplGatherRate").textContent=shortenDimensions(gatherRateData.workersTotal)
		document.getElementById("babyReplGatherRate").textContent=shortenDimensions(gatherRateData.babies)
		document.getElementById("gatherRate").textContent='+'+shortenDimensions(gatherRateData.total)+'/s'

		document.getElementById("gatheredQuarks").textContent=shortenDimensions(player.quantum.replicants.quarks.floor())
		document.getElementById("quarkTranslation").textContent=shortenDimensions(gatheredQuarksBoost*100)

		var eggonRate = getTotalWorkers().times(3)
		if (eggonRate.lt(30)) {
			document.getElementById("eggonRate").textContent=shortenDimensions(eggonRate)
			document.getElementById("eggonRateTimeframe").textContent="minute"
		} else {
			document.getElementById("eggonRate").textContent=shortenMoney(eggonRate.div(60))
			document.getElementById("eggonRateTimeframe").textContent="second"
		}
		document.getElementById("feedNormal").className=(canFeedReplicant(1)?"stor":"unavailabl")+"ebtn"
		document.getElementById("workerProgress").textContent=Math.round(eds[1].progress.toNumber()*100)+"%"

		document.getElementById("eggonAmount").textContent=shortenDimensions(player.quantum.replicants.eggons)
		document.getElementById("hatchProgress").textContent=Math.round(player.quantum.replicants.babyProgress.toNumber()*100)+"%"
		document.getElementById("growupProgress").textContent=Math.round(player.quantum.replicants.ageProgress.toNumber()*100)+"%"
		document.getElementById("feedBaby").className=((player.quantum.replicants.quantumFood<1||player.quantum.replicants.babies.lt(1))?"unavailabl":"stor")+"ebtn"

		document.getElementById("reduceHatchSpeed").innerHTML="Hatch speed: "+hatchSpeedDisplay()+" -> "+hatchSpeedDisplay(true)+"<br>Cost: "+shortenDimensions(player.quantum.replicants.hatchSpeedCost)+" for all 3 gluons"
	}
	if (document.getElementById("nanofield").style.display == "block") {
		document.getElementById("quarksNanofield").textContent=shortenDimensions(player.quantum.replicants.quarks)
		document.getElementById("quarkCharge").textContent=shortenMoney(player.quantum.nanofield.charge)
		document.getElementById("quarkChargeRate").textContent=shortenDimensions(getQuarkChargeProduction())
		document.getElementById("quarkLoss").textContent=shortenDimensions(getQuarkLossProduction())
		document.getElementById("quarkEnergy").textContent=shortenMoney(player.quantum.nanofield.energy)
		document.getElementById("quarkEnergyRate").textContent=shortenMoney(getQuarkEnergyProduction())
		document.getElementById("quarkPower").textContent=getFullExpansion(player.quantum.nanofield.power)
		document.getElementById("quarkPowerThreshold").textContent=shortenMoney(player.quantum.nanofield.powerThreshold)
		document.getElementById("quarkAntienergy").textContent=shortenMoney(player.quantum.nanofield.antienergy)
		document.getElementById("quarkAntienergyRate").textContent=shortenMoney(getQuarkAntienergyProduction())
		document.getElementById("quarkChargeProductionCap").textContent=shortenMoney(getQuarkChargeProductionCap())
		document.getElementById("rewards").textContent=getFullExpansion(player.quantum.nanofield.rewards)

		for (var reward=1; reward<9; reward++) document.getElementById("nanofieldreward" + reward).className = reward > player.quantum.nanofield.rewards ? "nanofieldrewardlocked" : "nanofieldreward"
		document.getElementById("nanofieldreward1").textContent = "Hatch speed is " + shortenDimensions(getNanofieldRewardEffect(1)) + "x faster."
		document.getElementById("nanofieldreward2").textContent = "Meta-antimatter effect power is increased by " + getFullExpansion(getNanofieldRewardEffect(2)) + "x."
		document.getElementById("nanofieldreward3").textContent = "All Meta Dimensions are boosted by " + shortenDimensions(getNanofieldRewardEffect(3)) + "x."
		document.getElementById("nanofieldreward4").textContent = "Dilated time multiplier power on Meta Dimensions is " + getNanofieldRewardEffect(4).toFixed(3) + "x."
		document.getElementById("nanofieldreward5").textContent = "While dilated, Normal Dimension multipliers and tickspeed are raised to the power of " + getNanofieldRewardEffect(5).toFixed(1) + "."
		document.getElementById("nanofieldreward6").textContent = "Meta-dimension boost power is increased to " + getNanofieldRewardEffect(6).toFixed(1) + "x."
		document.getElementById("nanofieldreward7").textContent = "Remote galaxy cost scaling starts " + getFullExpansion(getNanofieldRewardEffect(7)) + " later and the production of quark charge is " + shortenDimensions(getNanofieldRewardEffect("7g")) + "x faster."
		document.getElementById("nanofieldreward8").textContent = "Add " + getNanofieldRewardEffect(8).toFixed(2) + "x to multiplier per ten dimensions before getting affected by electrons and the production of quark energy is " + shortenMoney(getNanofieldRewardEffect("8c")) + "x faster."
	}
}

colorCharge={}
colorShorthands={r:'red',
	g:'green',
	b:'blue'}
colorBoosts={
	r:1,
	g:1,
	b:1
}
function updateColorCharge() {
	if (player.masterystudies) {
		var sorted=[]
		var colors=['r','g','b']
		for (s=1;s<4;s++) {
			var search=''
			for (i=0;i<3;i++) if (!sorted.includes(colors[i])&&(search==''||player.quantum.usedQuarks[colors[i]].gte(player.quantum.usedQuarks[search]))) search=colors[i]
			sorted.push(search)
		}
		colorCharge={color:sorted[0],charge:Decimal.sub(player.quantum.usedQuarks[sorted[0]]).sub(player.quantum.usedQuarks[sorted[1]])}
		if (player.quantum.usedQuarks[sorted[0]].gt(0)&&colorCharge.charge.eq(0)) giveAchievement("Hadronization")
	} else {
		colorCharge={color:'r',charge:new Decimal(0)}
		return
	}
	document.getElementById("powerRate").textContent=shortenDimensions(colorCharge.charge)
	if (colorCharge.charge.eq(0)) {
		document.getElementById("colorChargeAmount").style.display='none'
		document.getElementById("colorCharge").textContent='neutral'
		document.getElementById("powerRate").className=''
		document.getElementById("colorPower").textContent=''
	} else {
		var color=colorShorthands[colorCharge.color]
		document.getElementById("colorChargeAmount").style.display=''
		document.getElementById("colorChargeAmount").className=color
		document.getElementById("colorChargeAmount").textContent=shortenDimensions(colorCharge.charge)
		document.getElementById("colorCharge").textContent=' '+color
		document.getElementById("powerRate").className=color
		document.getElementById("colorPower").textContent=color+' power'
	}
	document.getElementById("redQuarks").textContent=shortenDimensions(player.quantum.usedQuarks.r)
	document.getElementById("greenQuarks").textContent=shortenDimensions(player.quantum.usedQuarks.g)
	document.getElementById("blueQuarks").textContent=shortenDimensions(player.quantum.usedQuarks.b)
	var canAssign=player.quantum.quarks.gt(0)
	document.getElementById("boost").style.display=player.dilation.active?"":"none"
	document.getElementById("redAssign").className=canAssign?"storebtn":"unavailablebtn"
	document.getElementById("greenAssign").className=canAssign?"storebtn":"unavailablebtn"
	document.getElementById("blueAssign").className=canAssign?"storebtn":"unavailablebtn"
	document.getElementById("assignAllButton").className=canAssign?"storebtn":"unavailablebtn"
	document.getElementById("bluePowerMDEffect").style.display=player.masterystudies.includes("t383")?"":"none"
}

function assignQuark(color) {
	player.quantum.usedQuarks[color]=player.quantum.usedQuarks[color].add(player.quantum.quarks)
	player.quantum.quarks=new Decimal(0)
	document.getElementById("quarks").innerHTML="You have <b class='QKAmount'>0</b> quarks."
	updateColorCharge()
	updateGluons()
}

//v1.75
GUCosts=[null, 1, 2, 4, 100, 7e15, 4e19, 3e28]

function updateGluons() {
	if (!player.masterystudies) return
	else if (!player.quantum.gluons.rg) {
		player.quantum.gluons = {
			rg: new Decimal(0),
			gb: new Decimal(0),
			br: new Decimal(0)
		}
	}
	document.getElementById("rg").textContent=shortenDimensions(player.quantum.gluons.rg)
	document.getElementById("gb").textContent=shortenDimensions(player.quantum.gluons.gb)
	document.getElementById("br").textContent=shortenDimensions(player.quantum.gluons.br)
	document.getElementById("rggain").textContent=shortenDimensions(player.quantum.usedQuarks.r.min(player.quantum.usedQuarks.g))
	document.getElementById("gbgain").textContent=shortenDimensions(player.quantum.usedQuarks.g.min(player.quantum.usedQuarks.b))
	document.getElementById("brgain").textContent=shortenDimensions(player.quantum.usedQuarks.b.min(player.quantum.usedQuarks.r))
	var names=["rg","gb","br"]
	var sevenUpgrades=player.masterystudies.includes("d9")
	for (r=3;r<5;r++) document.getElementById("gupgrow"+r).style.display=sevenUpgrades?"":"none"
	for (c=0;c<3;c++) {
		var name=names[c]
		for (u=1;u<=(sevenUpgrades?7:4);u++) {
			var upg=name+"upg"+u
			if (u>4) document.getElementById(upg+"cost").textContent=shortenMoney(GUCosts[u])
			if (player.quantum.upgrades.includes(name+u)) document.getElementById(upg).className="gluonupgradebought small "+name
			else if (player.quantum.gluons[name].lt(GUCosts[u])) document.getElementById(upg).className="gluonupgrade small unavailablebtn"
			else document.getElementById(upg).className="gluonupgrade small "+name
		}
		var upg=name+"qk"
		var cost=Decimal.pow(100,player.quantum.multPower[name]).times(500)
		document.getElementById(upg+"cost").textContent=shortenDimensions(cost)
		if (player.quantum.gluons[name].lt(cost)) document.getElementById(upg+"btn").className="gluonupgrade unavailablebtn"
		else document.getElementById(upg+"btn").className="gluonupgrade "+name
	}
	document.getElementById("qkmultcurrent").textContent=shortenDimensions(Decimal.pow(2, player.quantum.multPower.total))
}

function buyGluonUpg(color, id) {
	var name=color+id
	if (player.quantum.upgrades.includes(name)||player.quantum.gluons[color].lt(GUCosts[id])) return
	player.quantum.upgrades.push(name)
	player.quantum.gluons[color]=player.quantum.gluons[color].sub(GUCosts[id])
	updateGluons()
	if (name=="gb3") ipMultPower=2.3
	if (name=="gb4") player.tickSpeedMultDecrease=1.25
}

function GUBought(id) {
	if (!player.masterystudies) return false
	return player.quantum.upgrades.includes(id)
}

//v1.79
var speedrunMilestonesReached
var speedrunMilestones = [12,9,6,4.5,3,2,1,8/9,7/9,6/9,5/9,4/9,3/9,2/9,1/9,1/12,1/15,7/120,1/20,1/24,1/30,1/40,1/60,1/120,1/180,1/240,1/360,1/720]
function updateSpeedruns() {
	speedrunMilestonesReached = 0
	if (player.masterystudies) {
		for (i=0;i<28;i++) {
			if (player.quantum.best>speedrunMilestones[i]*36e3) break
			speedrunMilestonesReached++
		}
		document.getElementById('sacrificeAuto').style.display=speedrunMilestonesReached>24?"":"none"
		for (i=1;i<29;i++) document.getElementById("speedrunMilestone"+i).className="achievement achievement"+(speedrunMilestonesReached>=i?"un":"")+"locked"
		for (i=1;i<5;i++) document.getElementById("speedrunRow"+i).className=speedrunMilestonesReached<(i>3?28:i*8)?"":"completedrow"
	}
}

function toggleAutoTT() {
	if (speedrunMilestonesReached < 2) maxTheorems()
	else player.autoEterOptions.tt = !player.autoEterOptions.tt
	document.getElementById("theoremmax").innerHTML = speedrunMilestonesReached > 2 ? ("Auto max: O"+(player.autoEterOptions.tt?"N":"FF")) : "Buy max Theorems"
}

//v1.8
function doAutoMetaTick() {
	if (!player.masterystudies) return
	if (player.autoEterOptions.rebuyupg) {
		if (speedrunMilestonesReached > 25) maxAllDilUpgs()
		else {
			for (i=0;i<1;i++) {
				buyDilationUpgrade(11)
				buyDilationUpgrade(3)
				buyDilationUpgrade(1)
				buyDilationUpgrade(2)
			}
		}
	}
	for (dim=8;dim>0;dim--) if (player.autoEterOptions["md"+dim]) buyMaxMetaDimension(dim)
	if (player.autoEterOptions.metaboost) metaBoost()
}

function toggleAllMetaDims() {
	var turnOn
	var id=1
	var stop=Math.min(speedrunMilestonesReached-5,9)
	while (id<stop&&turnOn===undefined) {
		if (!player.autoEterOptions["md"+id]) turnOn=true
		else if (id>stop-2) turnOn=false
		id++
	}
	for (id=1;id<stop;id++) player.autoEterOptions["md"+id]=turnOn
	document.getElementById("metaMaxAllDiv").style.display=turnOn&&stop>7&&speedrunMilestonesReached>27?"none":""
}

function sacrificeGalaxy(id, auto=false) {
	if (player.galaxies-player.quantum.electrons.sacGals<1||!inQC(0)) return
	var amount=1
	if (id>5) amount=player.galaxies-player.quantum.electrons.sacGals
	else if (id>4) amount=Math.ceil((player.galaxies-player.quantum.electrons.sacGals)/2)
	else if (id>3) amount=1e3
	else if (id>2) amount=100
	else if (id>1) amount=10
	if (amount>player.galaxies-player.quantum.electrons.sacGals) return
	if (player.options.sacrificeConfirmation && !auto) if (!confirm("Sacrificing your galaxies reduces your tickspeed and so your tick interval. You will gain a boost for multiplier per ten dimensions. Are you sure you want to do that?")) return
	var old=new Decimal(getTickSpeedMultiplier()).log10()
	player.quantum.electrons.sacGals+=amount
	player.quantum.electrons.amount=player.quantum.electrons.amount.add(player.quantum.electrons.mult*amount)
	player.tickspeed=player.tickspeed.pow(old/new Decimal(getTickSpeedMultiplier()).log10())
	updateElectrons()
}

function getMPTPower() {
	if (!inQC(0)) return 1
	var a = player.quantum.electrons.amount
	if (a.gt(187300)) a = a.minus(149840).times(37460).sqrt().add(149840)
	if (GUBought("rg4")) a = a.times(0.7)
	return a.toNumber()+1
}

//v1.8
function isRewardEnabled(id) {
	if (!player.masterystudies) return false
	return speedrunMilestonesReached>=id&&!player.quantum.disabledRewards[id]
}

function disableReward(id) {
	player.quantum.disabledRewards[id]=!player.quantum.disabledRewards[id]
	document.getElementById("reward"+id+"disable").textContent=(id>4?"10 seconds":(id>3?4.5:6)+" hours")+" reward: O"+(player.quantum.disabledRewards[id]?"FF":"N")
}

function updateElectrons() {
	if (player.masterystudies ? !player.masterystudies.includes("d7") : true) {
		document.getElementById("electronstabbtn").style.display="none"
		return
	} else document.getElementById("electronstabbtn").style.display=""
	document.getElementById("electronsAmount").textContent=shortenDimensions(player.quantum.electrons.amount)
	document.getElementById("electronsAmount2").textContent="You have "+shortenDimensions(player.quantum.electrons.amount)+" electrons."
	document.getElementById("electronsTranslation").textContent=shortenDimensions(getMPTPower())
	document.getElementById("sacrificedGals").textContent=getFullExpansion(player.quantum.electrons.sacGals)
	document.getElementById("electronsGainMult").textContent=shorten(player.quantum.electrons.mult)
	for (u=1;u<5;u++) {
		var cost=getElectronUpgCost(u)
		document.getElementById("electronupg"+u).innerHTML="Upgrade multiplier using "+([null,"time theorems","dilated time","meta-antimatter","meta-dimension boosts"])[u]+".<br>Cost: "+(u>3?getFullExpansion(getElectronUpgCost(u)):shortenCosts(getElectronUpgCost(u)))+([null," TT"," DT"," MA"," MDB"])[u]
	}
}

//v1.9
function getElectronUpgCost(u) {
	var amount=player.quantum.electrons.rebuyables[u-1]
	var baseCost=([0,82,153,638,26])[u]+Math.pow(amount*Math.max(amount-1,1)+1,u<2?1:2)
	if (u>3) return baseCost
	if (u<2) return Math.pow(10,baseCost)
	return Decimal.pow(10,baseCost)
}

function buyElectronUpg(u) {
	if (!canBuyElectronUpg(u)) return
	var cost=getElectronUpgCost(u)
	if (u>3) {
		player.meta.resets-=cost
		player.meta.antimatter=new Decimal(100)
		clearMetaDimensions()
		for (let i = 2; i <= 8; i++) if (!canBuyMetaDimension(i)) document.getElementById(i + "MetaRow").style.display = "none"
	} else if (u>2) player.meta.antimatter=player.meta.antimatter.sub(cost)
	else if (u>1) player.dilation.dilatedTime=player.dilation.dilatedTime.sub(cost)
	else player.timestudy.theorem-=cost
	player.quantum.electrons.rebuyables[u-1]++
	player.quantum.electrons.mult+=0.25
	updateElectrons()
}

//v1.9
function buyQuarkMult(name) {
	var cost=Decimal.pow(100,player.quantum.multPower[name]).times(500)
	if (player.quantum.gluons[name].lt(cost)) return
	player.quantum.gluons[name]=player.quantum.gluons[name].sub(cost).round()
	player.quantum.multPower[name]++
	player.quantum.multPower.total++
	updateGluons()
}

var quantumChallenges={
	costs:[0,16750,19100,21500,24050,25900,28900,31900,33600],
	goals:[0,665e7,768e8,4525e7,5325e7,1344e7,561e6,6254e7,2925e7]
}

var assigned
var pcFocus=0
function updateQuantumChallenges() {
	if (player.masterystudies ? !player.masterystudies.includes("d8") : true) {
		document.getElementById("qctabbtn").style.display="none"
		return
	} else document.getElementById("qctabbtn").style.display=""
	assigned=[]
	var assignedNums={}
	document.getElementById("pairedchallenges").style.display = player.masterystudies.includes("d9") ? "" : "none"
	document.getElementById("respecPC").style.display = player.masterystudies.includes("d9") ? "" : "none"
	for (pc=1;pc<5;pc++) {
		var subChalls=player.quantum.pairedChallenges.order[pc]
		if (subChalls) for (sc=0;sc<2;sc++) {
			var subChall=subChalls[sc]
			if (subChall) {
				assigned.push(subChall)
				assignedNums[subChall]=pc
			}
		}
		if (player.masterystudies.includes("d9")) {
			var property="pc"+pc
			var sc1=player.quantum.pairedChallenges.order[pc]?player.quantum.pairedChallenges.order[pc][0]:0
			var sc2=(sc1?player.quantum.pairedChallenges.order[pc].length>1:false)?player.quantum.pairedChallenges.order[pc][1]:0
			document.getElementById(property+"desc").textContent="Paired Challenge "+pc+": Both Quantum Challenge "+(sc1?sc1:"?")+" and "+(sc2?sc2:"?")+" are applied."
			document.getElementById(property+"cost").textContent="Cost: "+(sc2?shorten(getQCCost(pc+8)):"???")+" electrons"
			document.getElementById(property+"goal").textContent="Goal: "+(sc2?shortenCosts(Decimal.pow(10,getQCGoal(pc+8))):"???")+" antimatter"
			document.getElementById(property).textContent=pcFocus==pc?"Cancel":(player.quantum.pairedChallenges.order[pc]?player.quantum.pairedChallenges.order[pc].length<2:true)?"Assign":player.quantum.pairedChallenges.completed>=pc?"Completed":player.quantum.pairedChallenges.completed+1<pc?"Locked":player.quantum.pairedChallenges.current==pc?"Running":"Start"
			document.getElementById(property).className=pcFocus==pc||(player.quantum.pairedChallenges.order[pc]?player.quantum.pairedChallenges.order[pc].length<2:true)?"challengesbtn":player.quantum.pairedChallenges.completed>=pc?"completedchallengesbtn":player.quantum.pairedChallenges.completed+1<pc?"lockedchallengesbtn":player.quantum.pairedChallenges.current==pc?"onchallengebtn":"challengesbtn"
		}
	}
	for (qc=1;qc<9;qc++) {
		var property="qc"+qc
		document.getElementById(property+"div").style.display=(qc<2||QCIntensity(qc-1))?"inline-block":"none"
		document.getElementById(property).textContent=((!assigned.includes(qc)&&pcFocus)?"Choose":inQC(qc)?"Running":QCIntensity(qc)?(assigned.includes(qc)?"Assigned":"Completed"):"Start")+(assigned.includes(qc)?" (PC"+assignedNums[qc]+")":"")
		document.getElementById(property).className=(!assigned.includes(qc)&&pcFocus)?"challengesbtn":inQC(qc)?"onchallengebtn":QCIntensity(qc)?"completedchallengesbtn":"challengesbtn"
		document.getElementById(property+"cost").textContent="Cost: "+shortenDimensions(quantumChallenges.costs[qc])+" electrons"
		document.getElementById(property+"goal").textContent="Goal: "+shortenCosts(Decimal.pow(10,getQCGoal(qc)))+" antimatter"
	}
	document.getElementById("qc2reward").textContent = Math.round(getQCReward(2)*100-100)
	document.getElementById("qc7desc").textContent="Dimension & tickspeed cost multiplier increases are "+shorten(Number.MAX_VALUE)+"x. Multiplier per ten dimensions and meta-antimatter's effect on dimension boosts are disabled. "
	document.getElementById("qc7reward").textContent = (100-getQCReward(7)*100).toFixed(2)
	document.getElementById("qc8reward").textContent = getQCReward(8)
}

function inQC(num) {
	var data=getCurrentQCData()
	if (num>0) return data.includes(num)
	return data.length<1
}

//v1.95?
function getQCGoal(num) {
	if (player.masterystudies==undefined) return 0
	var c1=0
	var c2=0
	if (num==undefined) {
		var data=getCurrentQCData()
		if (data[0]) c1=data[0]
		if (data[1]) c2=data[1]
	} else if (num<9) {
		c1=num
	} else if (player.quantum.pairedChallenges.order[num-8]) {
		c1=player.quantum.pairedChallenges.order[num-8][0]
		c2=player.quantum.pairedChallenges.order[num-8][1]
	}
	if (c1==0) return quantumChallenges.goals[0]
	if (c2==0) return quantumChallenges.goals[c1]
	var cs=[c1,c2]
	var mult=1
	if (cs.includes(1)&&cs.includes(3)) mult=1.6
	if (cs.includes(2)&&cs.includes(6)) mult=1.7
	if (cs.includes(3)&&cs.includes(7)) mult=2.68
	return quantumChallenges.goals[c1]*quantumChallenges.goals[c2]/1e11*mult
}

function QCIntensity(num) {
	if (player.masterystudies != undefined) if (player.quantum != undefined) if (player.quantum.challenges != undefined) if (player.quantum.challenges[num] != undefined) return player.quantum.challenges[num]
	return 0
}

//v1.997
function respecTogglePC() {
	player.quantum.pairedChallenges.respec=!player.quantum.pairedChallenges.respec
	document.getElementById("respecPC").className=player.quantum.pairedChallenges.respec?"quantumbtn":"storebtn"
}

function getQCCost(num) {
	if (num>8) return quantumChallenges.costs[player.quantum.pairedChallenges.order[num-8][0]]+quantumChallenges.costs[player.quantum.pairedChallenges.order[num-8][1]]
	return quantumChallenges.costs[num]
}

//v1.997895
function canBuyElectronUpg(id) {
	if (!inQC(0)) return false
	if (id>3) return player.meta.resets>=getElectronUpgCost(4)
	if (id>2) return player.meta.antimatter.gte(getElectronUpgCost(3))
	if (id>1) return player.dilation.dilatedTime.gte(getElectronUpgCost(2))
	return player.timestudy.theorem>=getElectronUpgCost(1)
}

//v1.99795
function updateMasteryStudyTextDisplay() {
	if (!player.masterystudies) return
	document.getElementById("costmult").textContent=shorten(masterystudies.costmult)
	for (id=0;id<(quantumed?masterystudies.allTimeStudies.length:10);id++) {
		var name=masterystudies.allTimeStudies[id]
		document.getElementById("ts"+name+"Cost").textContent="Cost: "+shorten(masterystudies.costs.time[name])+" Time Theorems"
	}
	for (id=13;id<15;id++) {
		document.getElementById("ec"+id+"Cost").textContent="Cost: "+shorten(masterystudies.costs.ec[id])+" Time Theorems"
		document.getElementById("ec"+id+"Req").style.display=player.etercreq==id?"none":"block"
	}
	document.getElementById("ec13Req").textContent="Requirement: "+getFullExpansion(masterystudies.reqs[13])+" dimension boosts"
	document.getElementById("ec14Req").textContent="Requirement: "+getFullExpansion(masterystudies.reqs[14])+"% replicate chance"
	if (quantumed) {
		for (id=7;id<11;id++) document.getElementById("ds"+id+"Cost").textContent="Cost: "+shorten(masterystudies.costs.dil[id])+" Time Theorems"
		document.getElementById("ds8Req").textContent="Requirement: "+shorten(16750)+" electrons"
		document.getElementById("321effect").textContent=shortenCosts(new Decimal("1e430"))
	}
	if (player.masterystudies.includes("d10")) {
		for (id=341;id<345;id++) document.getElementById("ts"+id+"Cost").textContent="Cost: "+shorten(masterystudies.costs.time[id])+" Time Theorems"
		document.getElementById("ds11Cost").textContent="Cost: "+shorten(3e90)+" Time Theorems"
	}
	if (player.masterystudies.includes("d11")) document.getElementById("ds12Cost").textContent="Cost: "+shorten(3e92)+" Time Theorems"
}

var quarks={}
var centerX
var centerY
var maxDistance
var code

function drawQuarkAnimation(ts){
	centerX=canvas.width/2
	centerY=canvas.height/2
	maxDistance=Math.sqrt(Math.pow(centerX,2)+Math.pow(centerY,2))
	code=player.options.theme=="Aarex's Modifications"?"e5":"99"
	if (document.getElementById("quantumtab").style.display !== "none" && document.getElementById("uquarks").style.display !== "none" && player.options.animations.quarks) {
		qkctx.clearRect(0, 0, canvas.width, canvas.height);
		quarks.sum=player.quantum.colorPowers.r.max(1).log10()+player.quantum.colorPowers.g.max(1).log10()+player.quantum.colorPowers.b.max(1).log10()
		quarks.amount=Math.ceil(Math.min(quarks.sum,200))
		for (p=0;p<quarks.amount;p++) {
			var particle=quarks['p'+p]
			if (particle==undefined) {
				particle={}
				var random=Math.random()
				if (random<=player.quantum.colorPowers.r.max(1).log10()/quarks.sum) particle.type='r'
				else if (random>=1-player.quantum.colorPowers.b.max(1).log10()/quarks.sum) particle.type='b'
				else particle.type='g'
				particle.motion=Math.random()>0.5?'in':'out'
				particle.direction=Math.random()*Math.PI*2
				particle.distance=Math.random()
				quarks['p'+p]=particle
			} else {
				particle.distance+=0.01
				if (particle.distance>=1) {
					var random=Math.random()
					if (random<=player.quantum.colorPowers.r.max(1).log10()/quarks.sum) particle.type='r'
					else if (random>=1-player.quantum.colorPowers.b.max(1).log10()/quarks.sum) particle.type='b'
					else particle.type='g'
					particle.motion=Math.random()>0.5?'in':'out'
					particle.direction=Math.random()*Math.PI*2
					particle.distance=0
				}
				var actualDistance=particle.distance*maxDistance
				if (particle.motion=="in") actualDistance=maxDistance-actualDistance
				qkctx.fillStyle=particle.type=="r"?"#"+code+"0000":particle.type=="g"?"#00"+code+"00":"#0000"+code
				point(centerX+Math.sin(particle.direction)*actualDistance, centerY+Math.cos(particle.direction)*actualDistance, qkctx)
			}
		}
		delta = (ts - lastTs) / 1000;
		lastTs = ts;
		requestAnimationFrame(drawQuarkAnimation);
	}
}

//v1.99798
function maxQuarkMult() {
	var names=["rg","gb","br"]
	for (c=0;c<3;c++) {
		var name=names[c]
		var cost=Decimal.pow(100,player.quantum.multPower[name]).times(500)
		if (player.quantum.gluons[name].lt(cost)) continue
		var toBuy=Math.floor(player.quantum.gluons[name].div(cost).times(99).add(1).log(100))
		var toSpend=Decimal.pow(100,toBuy).sub(1).div(99).times(cost)
		if (toSpend.gt(player.quantum.gluons[name])) player.quantum.gluons[name]=new Decimal(0)
		else player.quantum.gluons[name]=player.quantum.gluons[name].sub(toSpend).round()
		player.quantum.multPower[name]+=toBuy
		player.quantum.multPower.total+=toBuy
	}
	updateGluons()
}

//v1.99799
function respecOptions() {
	closeToolTip()
	document.getElementById("respecoptions").style.display="flex"
}

//v1.998
function toggleAutoQuantumContent(id) {
	player.quantum.autoOptions[id]=!player.quantum.autoOptions[id]
	if (id=='sacrifice') {
		document.getElementById('sacrificeAuto').textContent="Auto: O"+(player.quantum.autoOptions.sacrifice?"N":"FF")
		if (player.quantum.autoOptions.sacrifice) sacrificeGalaxy(6)
	}
}

function updateReplicants() {
	if (player.masterystudies ? !player.masterystudies.includes("d10") : true) {
		document.getElementById("replicantstabbtn").style.display="none"
		return
	} else document.getElementById("replicantstabbtn").style.display=""
	document.getElementById("rgRepl").textContent=shortenDimensions(player.quantum.gluons.rg)
	document.getElementById("gbRepl").textContent=shortenDimensions(player.quantum.gluons.gb)
	document.getElementById("brRepl").textContent=shortenDimensions(player.quantum.gluons.br)

	var totalReplicants = getTotalReplicants()

	document.getElementById("replicantReset").innerHTML="Reset replicanti amount for a replicant.<br>(requires "+shortenCosts(player.quantum.replicants.requirement)+" replicanti)"
	document.getElementById("quantumFoodAmount").textContent=getFullExpansion(player.quantum.replicants.quantumFood)
	document.getElementById("buyQuantumFood").innerHTML="Buy 1 quantum food<br><br><br>Cost: "+shortenDimensions(player.quantum.replicants.quantumFoodCost)+" for all 3 gluons"
	document.getElementById("buyQuantumFood").className="gluonupgrade "+(player.quantum.gluons.rg.min(player.quantum.gluons.gb).min(player.quantum.gluons.br).lt(player.quantum.replicants.quantumFoodCost)?"unavailabl":"stor")+"ebtn"
	document.getElementById("breakLimit").innerHTML="Limit of workers: "+getLimitMsg()+(isLimitUpgAffordable()?" -> "+getNextLimitMsg()+"<br>Cost: "+shortenDimensions(player.quantum.replicants.limitCost)+" for all 3 gluons":"")
	document.getElementById("breakLimit").className=(player.quantum.gluons.rg.min(player.quantum.gluons.gb).min(player.quantum.gluons.br).lt(player.quantum.replicants.limitCost)||!isLimitUpgAffordable()?"unavailabl":"stor")+"ebtn"
	document.getElementById("reduceHatchSpeed").className=(player.quantum.gluons.rg.min(player.quantum.gluons.gb).min(player.quantum.gluons.br).lt(player.quantum.replicants.hatchSpeedCost)?"unavailabl":"stor")+"ebtn"
	if (player.masterystudies.includes('d11')) {
		document.getElementById("quantumFoodAmountED").textContent=getFullExpansion(player.quantum.replicants.quantumFood)
		document.getElementById("buyQuantumFoodED").innerHTML="Buy 1 quantum food<br><br><br>Cost: "+shortenDimensions(player.quantum.replicants.quantumFoodCost)+" for all 3 gluons"
		document.getElementById("buyQuantumFoodED").className="gluonupgrade "+(player.quantum.gluons.rg.min(player.quantum.gluons.gb).min(player.quantum.gluons.br).lt(player.quantum.replicants.quantumFoodCost)?"unavailabl":"stor")+"ebtn"
		document.getElementById("breakLimitED").innerHTML="Limit of workers: "+getLimitMsg()+(isLimitUpgAffordable()?" -> "+getNextLimitMsg()+"<br>Cost: "+shortenDimensions(player.quantum.replicants.limitCost)+" for all 3 gluons":"")
		document.getElementById("breakLimitED").className=(player.quantum.gluons.rg.min(player.quantum.gluons.gb).min(player.quantum.gluons.br).lt(player.quantum.replicants.limitCost)||!isLimitUpgAffordable()?"unavailabl":"stor")+"ebtn"
	}
}

function replicantReset() {
	if (player.replicanti.amount.lt(player.quantum.replicants.requirement)) return
	player.replicanti.amount=new Decimal(1)
	player.quantum.replicants.amount=player.quantum.replicants.amount.add(1)
	player.quantum.replicants.requirement=player.quantum.replicants.requirement.times("1e100000")
	updateReplicants()
}

function getGatherRate() {
	var mult = new Decimal(1)
	if (player.masterystudies.includes("t373")) mult = getMTSMult(373)
	var data = {
		normal: player.quantum.replicants.amount.times(mult),
		babies: player.quantum.replicants.babies.times(mult).div(20),
		workers : { }
	}
	data.total = data.normal.add(data.babies)
	data.workersTotal = new Decimal(0)
	for (var d=1; d<9; d++) {
		data.workers[d] = eds[d].workers.times(mult).times(Decimal.pow(20, d))
		data.workersTotal = data.workersTotal.add(data.workers[d])
	}
	data.total = data.total.add(data.workersTotal)
	return data
}

function buyQuantumFood() {
	if (player.quantum.gluons.rg.min(player.quantum.gluons.gb).min(player.quantum.gluons.br).gte(player.quantum.replicants.quantumFoodCost)) {
		player.quantum.gluons.rg=player.quantum.gluons.rg.sub(player.quantum.replicants.quantumFoodCost)
		player.quantum.gluons.gb=player.quantum.gluons.gb.sub(player.quantum.replicants.quantumFoodCost)
		player.quantum.gluons.br=player.quantum.gluons.br.sub(player.quantum.replicants.quantumFoodCost)
		player.quantum.replicants.quantumFood++
		player.quantum.replicants.quantumFoodCost=player.quantum.replicants.quantumFoodCost.times(5)
		updateGluons()
		updateReplicants()
	}
}

function feedBabyReplicant() {
	if (player.quantum.replicants.quantumFood<1||player.quantum.replicants.babies.lt(1)) return
	player.quantum.replicants.quantumFood--
	player.quantum.replicants.quantumFoodCost=player.quantum.replicants.quantumFoodCost.div(5)
	player.quantum.replicants.ageProgress=player.quantum.replicants.ageProgress.add(0.5)
	if (player.quantum.replicants.amount.lt(1)) player.quantum.replicants.ageProgress=player.quantum.replicants.ageProgress.times(2).round().div(2)
	if (player.quantum.replicants.ageProgress.gte(1)) {
		var toAdd=player.quantum.replicants.ageProgress.floor()
		player.quantum.replicants.babies=player.quantum.replicants.babies.sub(toAdd).round()
		player.quantum.replicants.ageProgress=player.quantum.replicants.ageProgress.sub(toAdd)
		player.quantum.replicants.amount=player.quantum.replicants.amount.add(toAdd)
	}
	updateReplicants()
}

function reduceHatchSpeed() {
	if (player.quantum.gluons.rg.min(player.quantum.gluons.gb).min(player.quantum.gluons.br).gte(player.quantum.replicants.hatchSpeedCost)) {
		player.quantum.gluons.rg=player.quantum.gluons.rg.sub(player.quantum.replicants.hatchSpeedCost)
		player.quantum.gluons.gb=player.quantum.gluons.gb.sub(player.quantum.replicants.hatchSpeedCost)
		player.quantum.gluons.br=player.quantum.gluons.br.sub(player.quantum.replicants.hatchSpeedCost)
		player.quantum.replicants.hatchSpeed=player.quantum.replicants.hatchSpeed/1.1
		player.quantum.replicants.hatchSpeedCost=player.quantum.replicants.hatchSpeedCost.times(10)
		updateGluons()
		updateReplicants()
	}
}

function breakLimit() {
	if (player.quantum.gluons.rg.min(player.quantum.gluons.gb).min(player.quantum.gluons.br).gte(player.quantum.replicants.limitCost)&&isLimitUpgAffordable()) {
		player.quantum.gluons.rg=player.quantum.gluons.rg.sub(player.quantum.replicants.limitCost)
		player.quantum.gluons.gb=player.quantum.gluons.gb.sub(player.quantum.replicants.limitCost)
		player.quantum.gluons.br=player.quantum.gluons.br.sub(player.quantum.replicants.limitCost)
		player.quantum.replicants.limit++
		if (player.quantum.replicants.limit>10&&player.quantum.replicants.limitDim<8) {
			player.quantum.replicants.limit=1
			player.quantum.replicants.limitDim++
		}
		if (player.quantum.replicants.limit%10>0) player.quantum.replicants.limitCost=player.quantum.replicants.limitCost.times(200)
		updateGluons()
		updateReplicants()
	}
}

//v1.9984
function maxAllID() {
	for (t=1;t<9;t++) {
		var dim=player["infinityDimension"+t]
		if (player.infDimensionsUnlocked[t-1]&&player.infinityPoints.gte(dim.cost)) {
			var costMult=infCostMults[t]
			if (ECTimesCompleted("eterc12")) costMult=Math.pow(costMult,1-ECTimesCompleted("eterc12")*0.008)
			var toBuy=Math.max(Math.floor(player.infinityPoints.div(9-t).div(dim.cost).times(costMult-1).add(1).log(costMult)),1)
			var toSpend=Decimal.pow(costMult,toBuy).sub(1).div(costMult-1).times(dim.cost).round()
			if (toSpend.gt(player.infinityPoints)) player.infinityPoints=new Decimal(0)
			else player.infinityPoints=player.infinityPoints.sub(toSpend)
			dim.amount=dim.amount.add(toBuy*10)
			dim.baseAmount+=toBuy*10
			dim.power=dim.power.times(Decimal.pow(infPowerMults[t],toBuy))
			dim.cost=dim.cost.times(Decimal.pow(costMult,toBuy))
		}
	}
}

function hideMaxIDButton(onLoad=false) {
	if (!onLoad) if (!player.masterystudies) return
	var hide=true
	if (player.masterystudies&&player.currentEterChall!="eterc8") {
		hide=false
		if (player.eternities>17) {
			for (d=0;d<8;d++) {
				if (player.infDimBuyers[d]) {
					if (d>6) hide=true
				} else break
			}
		}
	}
	document.getElementById("maxAllID").style.display=hide?"none":""
}

//v1.9986
function respecMasteryToggle() {
	player.respecMastery=!player.respecMastery
	updateRespecButtons()
}

//v1.99861
function getCurrentQCData() {
	if (player.masterystudies==undefined) return []
	if (player.quantum==undefined) return []
	if (player.quantum.challenge==undefined) return []
	if (typeof(player.quantum.challenge)=="number") return [player.quantum.challenge]
	return player.quantum.challenge
}

//v1.9987
var bankedEterGain
function updateBankedEter(updateHtml=true) {
	bankedEterGain=0
	if (player.achievements.includes("ng3p15")) bankedEterGain=player.eternities/5
	bankedEterGain=Math.floor(bankedEterGain)
	if (updateHtml) {
		setAndMaybeShow("bankedEterGain",bankedEterGain>0,'"You will gain "+getFullExpansion(bankedEterGain)+" banked eternities on next quantum."')
		setAndMaybeShow("eternitiedBank",player.eternitiesBank,'"You have "+getFullExpansion(player.eternitiesBank)+" banked eternities."')
	}
}

//v1.99871
function hatchSpeedDisplay(next) {
	var speed = getHatchSpeed()
	if (next) speed /= 1.1
	return timeDisplayShort(speed*10, true, 1)
}

function fillAll() {
	var oldLength = player.timestudy.studies.length
	for (t=0;t<all.length;t++) buyTimeStudy(all[t], 0, true)
	if (player.timestudy.studies.length > oldLength) {
		updateTheoremButtons()
		updateTimeStudyButtons()
		drawStudyTree()
		if (player.timestudy.studies.length > 56) $.notify("All studies in time study tab are now filled.")
	}
}

//v1.99872
function maxAllDilUpgs() {
	while (buyDilationUpgrade(11,true)) {}
	while (buyDilationUpgrade(3,true)) {}
	while (buyDilationUpgrade(1,true)) {}
	while (buyDilationUpgrade(2,true)) {}
	updateDilationUpgradeCosts()
	updateDilationUpgradeButtons()
	updateTimeStudyButtons()
}

function updateQCTimes() {
	document.getElementById("qcsbtn").style.display = "none"
	if (!player.masterystudies) return
	var temp=0
	var tempcounter=0
	for (var i=1;i<9;i++) {
		setAndMaybeShow("qctime"+i,player.quantum.challengeRecords[i],'"Quantum Challenge '+i+' time record: "+timeDisplayShort(player.quantum.challengeRecords['+i+'], false, 3)')
		if (player.quantum.challengeRecords[i]) {
			temp+=player.quantum.challengeRecords[i]
			tempcounter++
		}
	}
	if (tempcounter>0) document.getElementById("qcsbtn").style.display = "inline-block"
	setAndMaybeShow("qctimesum",tempcounter>1,'"Sum of completed quantum challenge time records is "+timeDisplayShort('+temp+', false, 3)')
}

//v1.99873
function updatePCCompletions() {
	document.getElementById("pccompletionsbtn").style.display = "none"
	if (!player.masterystudies) return
	var tempcounter=0
	var ranking=0
	for (var c1=2;c1<9;c1++) for (var c2=1;c2<c1;c2++) if (player.quantum.pairedChallenges.completions[c2*10+c1]) {
		tempcounter++
		ranking+=Math.sqrt(5-player.quantum.pairedChallenges.completions[c2*10+c1])
	}
	ranking=ranking/56*100
	if (tempcounter>0) document.getElementById("pccompletionsbtn").style.display = "inline-block"
	if (tempcounter>23) giveAchievement("The Challenging Day")
	document.getElementById("upcc").textContent = tempcounter
	document.getElementById("pccranking").textContent = ranking > 99.9 ? 100 : ranking.toFixed(1)
	for (r=1;r<9;r++) for (c=1;c<9;c++) if (r!=c) {
		var divid = "pc" + (r*10+c)
		var pcid = r*10+c
		if (r>c) pcid = c*10+r
		var comp = player.quantum.pairedChallenges.completions[pcid]
		if (comp !== undefined) {
			document.getElementById(divid).textContent = "PC" + comp
			document.getElementById(divid).className = "pc" + comp + "completed"
		} else {
			document.getElementById(divid).textContent = ""
			document.getElementById(divid).className = ""
		}
	}
}

//v1.99874
function getQCReward(num) {
	if (QCIntensity(num) < 1) return 1
	if (num == 1) return Decimal.pow(10, Math.pow(getDimensionFinalMultiplier(1).times(getDimensionFinalMultiplier(2)).log10(), QCIntensity(1)>1?0.275:0.25)/200)
	if (num == 2) return 1.2 + QCIntensity(2) * 0.2
	if (num == 3) return Decimal.pow(10, Math.sqrt(Math.max(player.infinityPower.log10(), 0)/(QCIntensity(3)>1?2e8:1e9)))
	if (num == 4) {
		let mult = player.meta[2].amount.times(player.meta[4].amount).times(player.meta[6].amount).times(player.meta[8].amount).max(1)
		if (QCIntensity(4) > 1) return mult.pow(1/75)
		return Decimal.pow(10, Math.sqrt(mult.log10())/10)
	}
	if (num == 5) return Math.log10(1 + player.resets) * Math.pow(QCIntensity(5), 0.4)
	if (num == 6) return player.achPow.pow(QCIntensity(6)>1?3:1)
	if (num == 7) return Math.pow(0.975, QCIntensity(7))
	if (num == 8) return QCIntensity(8)>1?4:3
}

function maybeShowFillAll() {
	var display = "none"
	if (player.masterystudies) if (player.masterystudies.includes("t302")) display = "block"
	document.getElementById("fillAll").style.display = display
	document.getElementById("fillAll2").style.display = display
}

//v1.999
function getTotalReplicants() {
	return getTotalWorkers().add(player.quantum.replicants.amount).round()
}

function feedReplicant(tier) {
	if (!canFeedReplicant(tier)) return
	if (tier<8&&eds[tier].perm>9) player.quantum.replicants.quantumFoodCost=player.quantum.replicants.quantumFoodCost.div(5)
	eds[tier].progress=eds[tier].progress.add(1/3)
	if (tier<8||getWorkerAmount(tier+1).eq(0)) eds[tier].progress=eds[tier].progress.times(3).round().div(3)
	if (eds[tier].progress.gte(1)) {
		var toAdd=eds[tier].progress.floor()
		if (tier>1) eds[tier-1].workers=eds[tier-1].workers.sub(toAdd).round()
		else player.quantum.replicants.amount=player.quantum.replicants.amount.sub(toAdd).round()
		eds[tier].progress=eds[tier].progress.sub(toAdd)
		eds[tier].workers=eds[tier].workers.add(toAdd).round()
		if (tier>7||eds[tier].perm<10) eds[tier].perm++
		if (tier==2) giveAchievement("An ant office?")
	}
	player.quantum.replicants.quantumFood--
	updateReplicants()
}

function getWorkerAmount(tier) {
	if (tier<1) return player.quantum.replicants.amount
	if (tier>8) return new Decimal(0)
	return eds[tier].workers
}

function getTotalWorkers() {
	var total = new Decimal(0)
	for (var d=1; d<9; d++) total = total.add(eds[d].workers)
	return total.round()
}

function buyMaxQuantumFood() {
	let minGluons = player.quantum.gluons.rg.min(player.quantum.gluons.gb).min(player.quantum.gluons.br)
	let toBuy = Math.floor(minGluons.div(player.quantum.replicants.quantumFoodCost).times(4).add(1).log(5))
	if (toBuy < 1) return
	let toSpend = Decimal.pow(5, toBuy).minus(1).div(4).times(player.quantum.replicants.quantumFoodCost)
	if (toSpend.gt(player.quantum.gluons.rg)) player.quantum.gluons.rg = new Decimal(0)
	else player.quantum.gluons.rg = player.quantum.gluons.rg.sub(toSpend)
	if (toSpend.gt(player.quantum.gluons.gb)) player.quantum.gluons.gb = new Decimal(0)
	else player.quantum.gluons.gb = player.quantum.gluons.gb.sub(toSpend)
	if (toSpend.gt(player.quantum.gluons.br)) player.quantum.gluons.br = new Decimal(0)
	else player.quantum.gluons.br = player.quantum.gluons.br.sub(toSpend)
	player.quantum.replicants.quantumFood += toBuy
	player.quantum.replicants.quantumFoodCost = player.quantum.replicants.quantumFoodCost.times(Decimal.pow(5, toBuy))
	updateGluons()
	updateReplicants()
}

function canFeedReplicant(tier, auto) {
	if (player.quantum.replicants.quantumFood<1 && !auto) return false
	if (tier>1) {
		if (eds[tier].workers.gte(eds[tier-1].workers)) return false
		if (eds[tier-1].workers.lte(10)) return false
	} else {
		if (eds[1].workers.gte(player.quantum.replicants.amount)) return false
		if (player.quantum.replicants.amount.eq(0)) return false
	}
	if (tier>player.quantum.replicants.limitDim) return false
	if (tier==player.quantum.replicants.limitDim) return getWorkerAmount(tier).lt(player.quantum.replicants.limit)
	return true
}

function isLimitUpgAffordable() {
	if (!player.masterystudies.includes("d11")) return player.quantum.replicants.limit < 10
	return true
}

function getLimitMsg() {
	if (!player.masterystudies.includes("d11")) return player.quantum.replicants.limit
	return player.quantum.replicants.limit+" D"+player.quantum.replicants.limitDim+"s"
}

function getNextLimitMsg() {
	if (!player.masterystudies.includes("d11")) return player.quantum.replicants.limit+1
	if (player.quantum.replicants.limit > 9 && player.quantum.replicants.limitDim < 8) return "1 D"+(player.quantum.replicants.limitDim+1)+"s"
	return (player.quantum.replicants.limit+1)+" D"+player.quantum.replicants.limitDim+"s"
}

function getHatchSpeed() {
	var speed = player.quantum.replicants.hatchSpeed
	if (player.masterystudies.includes("t361")) speed /= getMTSMult(361)
	if (player.masterystudies.includes("t371")) speed /= getMTSMult(371)
	if (player.masterystudies.includes("t372")) speed /= getMTSMult(372)
	if (player.masterystudies.includes("t381")) speed /= getMTSMult(381)
	if (player.masterystudies.includes("t391")) speed /= getMTSMult(391)
	if (player.masterystudies.includes("d12")) speed /= getNanofieldRewardEffect(1)
	return speed
}

var eds
function updateEmperorDimensions() {
	let production = getGatherRate()
	document.getElementById("replicantAmountED").textContent=shortenDimensions(player.quantum.replicants.amount)
	for (d=1;d<9;d++) {
		document.getElementById("empD"+d).textContent = DISPLAY_NAMES[d] + " Emperor Dimension x" + formatValue(player.options.notation, getEDMultiplier(d), 2, 1)
		
		var desc = shortenDimensions(eds[d].workers)
		if (d<8) desc += " (+" + shorten(getEDRateOfChange(d)) + dimDescEnd
		document.getElementById("empAmount"+d).textContent = desc
		document.getElementById("empFeed"+d).className=(canFeedReplicant(d)?"stor":"unavailabl")+"ebtn"
		document.getElementById("empFeed"+d).textContent="Feed ("+Math.round(eds[d].progress.toNumber()*100)+"%, "+eds[d].perm+" kept)"

		document.getElementById("empQuarks"+d).textContent = shorten(production.workers[d])
	}
	document.getElementById("totalWorkers").textContent = shortenDimensions(getTotalWorkers())
	document.getElementById("totalQuarkProduction").textContent = shorten(production.workersTotal)
}

function getEDMultiplier(dim) {
	let mult = new Decimal(1)
	if (player.masterystudies.includes("t392")) mult = getMTSMult(392)
	if (player.dilation.active || player.galacticSacrifice) {
		mult = Decimal.pow(10, Math.pow(mult.log10(), 0.75))
		if (player.dilation.upgrades.includes(11)) {
			mult = Decimal.pow(10, Math.pow(mult.log10(), 1.05))
		}
	}
	return mult
}

function getEDRateOfChange(dim) {
	if (!canFeedReplicant(dim, true)) return 0
	let toGain = getEDMultiplier(dim+1).times(eds[dim+1].workers).div(20)

	var current = eds[dim].workers.add(eds[dim].progress).max(1)
	if (player.aarexModifications.logRateChange) {
		var change = current.add(toGain).log10()-current.log10()
		if (change<0||isNaN(change)) change = 0
	} else var change = toGain.times(10).dividedBy(current)

	return change
}

//v1.9995
function maxReduceHatchSpeed() {
	let minGluons = player.quantum.gluons.rg.min(player.quantum.gluons.gb).min(player.quantum.gluons.br)
	let toBuy = Math.floor(minGluons.div(player.quantum.replicants.hatchSpeedCost).times(9).add(1).log10())
	if (toBuy < 1) return
	let toSpend = Decimal.pow(10, toBuy).minus(1).div(9).times(player.quantum.replicants.hatchSpeedCost)
	if (toSpend.gt(player.quantum.gluons.rg)) player.quantum.gluons.rg = new Decimal(0)
	else player.quantum.gluons.rg = player.quantum.gluons.rg.sub(toSpend)
	if (toSpend.gt(player.quantum.gluons.gb)) player.quantum.gluons.gb = new Decimal(0)
	else player.quantum.gluons.gb = player.quantum.gluons.gb.sub(toSpend)
	if (toSpend.gt(player.quantum.gluons.br)) player.quantum.gluons.br = new Decimal(0)
	else player.quantum.gluons.br = player.quantum.gluons.br.sub(toSpend)
	player.quantum.replicants.hatchSpeed /= Math.pow(1.1, toBuy)
	player.quantum.replicants.hatchSpeedCost = player.quantum.replicants.hatchSpeedCost.times(Decimal.pow(10, toBuy))
	updateGluons()
	updateReplicants()
}

function getQuarkChargeProduction() {
	return getNanofieldRewardEffect("7g")
}

function startProduceQuarkCharge() {
	player.quantum.nanofield.producingCharge = !player.quantum.nanofield.producingCharge
	document.getElementById("produceQuarkCharge").innerHTML="S" + (player.quantum.nanofield.producingCharge ? "top" : "tart") + " production of quark charge." + (player.quantum.nanofield.producingCharge ? "" : "<br>(All of your replicants don't gather quarks while producing quark charge.)")
}

function getQuarkLossProduction() {
	return getQuarkChargeProduction().pow(4).times(4e25)
}

function getQuarkEnergyProduction() {
	let ret = player.quantum.nanofield.charge.sqrt()
	if (player.masterystudies.includes("t411")) ret = ret.times(getMTSMult(411))
	ret = ret.times(getNanofieldRewardEffect("8c"))
	return ret
}

function getQuarkAntienergyProduction() {
	let ret = player.quantum.nanofield.charge.sqrt()
	if (player.masterystudies.includes("t401")) ret = ret.div(getMTSMult(401))
	return ret
}

function getQuarkChargeProductionCap() {
	return player.quantum.nanofield.charge.times(2500).sqrt()
}

function getNanofieldRewardEffect(id) {
	var stacks = Math.ceil((player.quantum.nanofield.rewards - id + 1) / 8)
	if (id == 1) return Decimal.pow(100, stacks)
	if (id == 2) return stacks * 7
	if (id == 3) return Decimal.pow(1, stacks)
	if (id == 4) return 0.1 + Math.sqrt(stacks) * 0.015
	if (id == 5) return 1 + stacks * 1.5
	if (id == 6) return 3 + stacks * 0.4
	if (id == 7) return stacks * 2100
	if (id == "7g") return Decimal.pow(5,Math.ceil((player.quantum.nanofield.rewards-6)/8))
	if (id == 8) return stacks * 0.75
	if (id == "8c") return Decimal.pow(2.5,Math.ceil((player.quantum.nanofield.rewards-7)/8))
}

function updateAutoQuantumMode() {
	if (player.quantum.autobuyer.mode == "amount") {
		document.getElementById("toggleautoquantummode").textContent = "Auto quantum mode: amount"
		document.getElementById("autoquantumtext").textContent = "Amount of QK to wait until reset:"
	} else if (player.quantum.autobuyer.mode == "relative") {
		document.getElementById("toggleautoquantummode").textContent = "Auto quantum mode: X times last quantum"
		document.getElementById("autoquantumtext").textContent = "X times last quantum:"
	} else if (player.quantum.autobuyer.mode == "time") {
		document.getElementById("toggleautoquantummode").textContent = "Auto quantum mode: time"
		document.getElementById("autoquantumtext").textContent = "Seconds between quantums:"
	} else if (player.quantum.autobuyer.mode == "peak") {
		document.getElementById("toggleautoquantummode").textContent = "Auto quantum mode: peak"
		document.getElementById("autoquantumtext").textContent = "Seconds to wait after latest peak gain:"
	}
}

function toggleAutoQuantumMode() {
	if (player.quantum.autobuyer.mode == "amount") player.quantum.autobuyer.mode = "relative"
	else if (player.quantum.autobuyer.mode == "relative") player.quantum.autobuyer.mode = "time"
	else if (player.quantum.autobuyer.mode == "time") player.quantum.autobuyer.mode = "peak"
	else player.quantum.autobuyer.mode = "amount"
	updateAutoQuantumMode()
}

function assignAll() {
	var ratios =  player.quantum.assignAllRatios
	var sum = ratios.r+ratios.g+ratios.b
	var oldQuarks = player.quantum.quarks
	var colors = ['r','g','b']
	for (c=0;c<3;c++) {
		var toAssign = oldQuarks.times(ratios[colors[c]]/sum).round()
		player.quantum.usedQuarks[colors[c]] = player.quantum.usedQuarks[colors[c]].add(toAssign).round()
		if (toAssign.gt(player.quantum.quarks)) player.quantum.quarks = new Decimal(0)
		else player.quantum.quarks = player.quantum.quarks.sub(toAssign).round()
	}
	updateColorCharge()
}

function changeRatio(color) {
	var value = parseFloat(document.getElementById("ratio_" + color).value)
	if (value < 0 || isNaN(value)) {
		document.getElementById("ratio_" + color).value = player.quantum.assignAllRatios[color]
		return
	}
	var sum = 0
	var colors = ['r','g','b']
	for (c=0;c<3;c++) sum += colors[c] == color ? value : player.quantum.assignAllRatios[colors[c]]
	if (sum == 0 || sum == 1/0) {
		document.getElementById("ratio_" + color).value = player.quantum.assignAllRatios[color]
		return
	}
	player.quantum.assignAllRatios[color] = value
}

function toggleAutoAssign() {
	player.quantum.autoOptions.assignQK = !player.quantum.autoOptions.assignQK
	document.getElementById('autoAssign').textContent="Auto: O"+(player.quantum.autoOptions.assignQK?"N":"FF")
	if (player.quantum.autoOptions.assignQK) assignAll()
}
