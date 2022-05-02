window.addEventListener('load', function () {
	pastJobs = [];
	faaTests = [];
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
			cell5.innerHTML = jobStatus[job.status]; 
		});
	}
});