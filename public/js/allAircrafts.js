window.addEventListener('load', function () {
	aircraftData = {};
	airCraftModel = {};
	faaTestData = {};
	jobsData = {};
	function getUserProfile() {
		getAllJobs();
	}

	getUserProfile();

	function getAllJobs() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/admin/getAllJobs', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					// createJobChart(rtrn.data);
					jobsData = rtrn.data;
					getAllAircraftModels();
				}
			}
		};
	}

	function createJobChart(jobData) {
		// oSaveALLJobs.data = jobData;
		// console.log(jobData);

		let newCount = 0;
		let inProgressCount = 0;
		let completedCount = 0;
		for (i in jobData) {
			if (jobData[i].status == 0) {
				newCount++;
			} else if (jobData[i].status == 1) {
				inProgressCount++;
			} else if (jobData[i].status == 2) {
				completedCount++;
			}
		}

		var xValues = ['New', 'In Progress', 'Completed'];
		var yValues = [newCount, inProgressCount, completedCount];
		var barColors = ['#b91d47', '#00aba9', '#2b5797'];

		new Chart('jobsChart', {
			type: 'pie',
			data: {
				labels: xValues,
				datasets: [
					{
						backgroundColor: barColors,
						data: yValues,
					},
				],
			},
			options: {
				title: {
					display: true,
					text: 'All Jobs',
				},
			},
		});
	}

	function getAllAircraftModels() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/admin/getAircraftModels', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					airCraftModel = rtrn.data;
					// console.log(airCraftModel);
					getAllAircrafts();
				}
			}
		};
	}

	function getAllAircrafts() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/admin/getAllAircrafts', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					aircraftData = rtrn.data;
					// console.log(aircraftData);
					// saveVals(aircraftData);
					// fillAircraftTable()
					getAllFaaTest();
				}
			}
		};
	}

	function getAllFaaTest() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/airplane/test', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					faaTestData = rtrn.data;
					createAircraftChart();
				}
			}
		};
	}
	var aircraftTest = {};
	var airCraftModelMap = {};
	function createAircraftChart() {
		aircraftData.forEach((airCraft) => {
			aircraftTest[airCraft.registration_no] = [];
			airCraftModelMap[airCraft.registration_no] = airCraft.model;
			jobsData.forEach((job) => {
				if (job.flight_num == airCraft.registration_no) {
					aircraftTest[airCraft.registration_no].push(job);
				}
			});
		});
		createFaaTestMap();
		getAirCraftTestScore();
		// console.log(aircraftTest)
	}
	testScoreMap = {};
	function createFaaTestMap() {
		faaTestData.forEach((test) => {
			testScoreMap[test['test_num']] = test.max_score;
		});
	}
	passAircraft = [];
	failAircrafts = [];
	function getAirCraftTestScore() {
		for (k in aircraftTest) {
			var modelInfo = getModelInfo(k);
			var obj = {};

			obj.reg_num = k;
			obj.modelNum = modelInfo.model_num;
			obj.name = modelInfo.name;
			obj.weight = modelInfo.weight;
			obj.capacity = modelInfo.capacity;

			if (aircraftTest[k].length > 0) {
				pass = 0;
				aircraftTest[k].forEach((report) => {
					if (report.score >= testScoreMap[report.test_id] * 0.8) {
						pass++;
					}
				});

				if (pass == aircraftTest[k].length) {
					passAircraft.push(obj);
				} else {
					failAircrafts.push(obj);
				}
			} else {
				passAircraft.push(obj);
			}
		}
		// console.log(passAircraft);
		// console.log(failAircrafts);
		populateTables();
	}

	function getModelInfo(reg_num) {
		let modelNum = airCraftModelMap[reg_num];
		for (let i = 0; i < airCraftModel.length; i++) {
			if (airCraftModel[i].model_num == modelNum) {
				return airCraftModel[i];
			}
		}
	}

	function populateTables() {
		var workingTable = document.getElementById('allWorkingAircrafts');
		var nonWorkingTable = document.getElementById('allNonWorkingAircrafts');

		passAircraft.forEach((aircraft) => {
			let row = workingTable.insertRow();
			let cell1 = row.insertCell();
			// const link = document.createElement('a');
			// link.href = '#';
			// link.addEventListener(
			// 	'click',
			// 	function () {
			// 		navJobDetails(aircraft.reg_num);
			// 	},
			// 	false
			// );
			// link.textContent = aircraft.reg_num; // dont use innerHTML when inserting data into the DOM. It's not safe
			// cell1.appendChild(link);

			cell1.textContent = aircraft.reg_num;
			let cell2 = row.insertCell();
			cell2.innerHTML = aircraft.modelNum;
			// cell1.innerHTML = aircraft.reg_num;
			let cell3 = row.insertCell();
			cell3.innerHTML = aircraft.name;
			let cell4 = row.insertCell();
			cell4.innerHTML = aircraft.weight;
			let cell5 = row.insertCell();
			cell5.innerHTML = aircraft.capacity;
		});

		failAircrafts.forEach((aircraft) => {
			let row = nonWorkingTable.insertRow();
			let cell1 = row.insertCell();
			const link = document.createElement('a');
			// link.href = '#';
			// link.addEventListener('click', navJobDetails);
			// link.textContent = aircraft.reg_num; // dont use innerHTML when inserting data into the DOM. It's not safe
			cell1.textContent = aircraft.reg_num;
			// cell1.innerHTML = aircraft.reg_num;
			let cell2 = row.insertCell();
			cell2.innerHTML = aircraft.modelNum;
			// cell1.innerHTML = aircraft.reg_num;
			let cell3 = row.insertCell();
			cell3.innerHTML = aircraft.name;
			let cell4 = row.insertCell();
			cell4.innerHTML = aircraft.weight;
			let cell5 = row.insertCell();
			cell5.innerHTML = aircraft.capacity;
		});
	}

	function navJobDetails(event) {
		console.log(event);
	}
});
