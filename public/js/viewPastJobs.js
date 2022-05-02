window.addEventListener('load', function () {
	pastJobs = [];
	faaTests = [];
	flightModels = [];
	aircarfts = [];
	jobStatus = {'2': 'Completed'};
    function getPastJobs() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'api/v1/user/pastJobs', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					console.log(rtrn.data);
					pastJobs = rtrn.data;
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
					console.log(rtrn.data);
					faaTests = rtrn.data;
					getAllAircraftModels();
				}
			}
		};
	}

	function getAllAircraftModels() {
        var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/admin/getAircraftModels', true);
        xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
                    flightModels = rtrn.data;
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
                    aircarfts = rtrn.data;
                    // saveVals(aircraftData);
                    // fillAircraftTable()
                    populate();
                    
				}
			}
		};
    }


	getPastJobs();

	function populate() {
		var table = document.getElementById("pastJobsTable");
		pastJobs.forEach((job) => {
			var test = faaTests.find(x => x.test_num == job.test_id);
			var flight = aircarfts.find(x => x.registration_no == job.flight_num);
			var model = flightModels.find(x => x.model_num == flight.model);
			var row = table.insertRow();
			var cell1 = row.insertCell();
			cell1.innerHTML = job.job_id;
			var cell2 = row.insertCell();
			cell2.innerHTML = job.flight_num; 
			var cell3 = row.insertCell();
			var d = new Date(job.date_assigned);
			dString = ('0' + (d.getMonth()+1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2)  + '/' + d.getFullYear();
			cell3.innerHTML = dString; 
			var cell4 = row.insertCell();
			cell4.innerHTML = test.name;
			var cell5 = row.insertCell();
			cell5.innerHTML = job.score + " / " + test.max_score;
			var cell6 = row.insertCell();
			cell6.innerHTML = job.hours_spent;
			var cell7 = row.insertCell();
			cell7.innerHTML = jobStatus[job.status]; 
			var cell8 = row.insertCell();
			d = new Date(job.date_finished);
			dString = ('0' + (d.getMonth()+1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2)  + '/' + d.getFullYear();
			cell8.innerHTML = dString;
			var row1 = table.insertRow();
			row1.style.display = 'none';
			var cell = row1.insertCell();
			cell.innerHTML = "<p> <b>Aircraft Model:  </b> " + model.model_num +"<br\>" + "<b>Weight:  </b>" + model.weight + "<br\>" + "<b>Capacity:  </b>" + model.capacity + "<\p>";
			row.addEventListener('click', function() {
				if (row1.style.display=='none') {
					row1.style.display = '';
				} else {
					row1.style.display = 'none';
				}
			})
		});
	}
});