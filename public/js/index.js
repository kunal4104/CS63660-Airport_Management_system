

window.addEventListener('load', function () {
	assignedJobs = [];
	faaTests = [];
	jobStatus = {'0': 'New', '1': 'In Progress'};
	function getAssignedJobs() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'api/v1/user/assignedJobs', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					console.log(rtrn.data);
					assignedJobs = rtrn.data;
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

	getAssignedJobs();

	function populate() {
		var table = document.getElementById("assignedJobsTable");
		assignedJobs.forEach((job) => {
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
			cell5.append(selectTagStatus(job.job_id, jobStatus[job.status])); 
		});
	}

	function selectTagStatus(id, value) {
		var selectList = document.createElement("select");
		var option1 = document.createElement("option");
		option1.text = "New";
		selectList.add(option1);
		var option2 = document.createElement("option");
		option2.text = "In Progress";
		selectList.add(option2);
		selectList.id = id;
		selectList.value = value;
		selectList.style.width = "50%";
		selectList.addEventListener("change", setStatus);
		return selectList;
	}

	function setStatus(event) {
		let status = event.target.value;
		let job = assignedJobs.find(x => x.job_id == event.target.id);
		let postObj = {
            jobId: job.job_id,
            status: getKeyByValue(jobStatus, status),
        }

		var http = new XMLHttpRequest();
        var url = 'api/v1/user/assignedJobs';

        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        let urlEncodedData = "", urlEncodedDataPairs = [], name;
        for( name in postObj ) {
            urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(postObj[name]));
        }
        urlEncodedData = urlEncodedDataPairs.join("&");
        http.send(urlEncodedData);
	}

	function getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value);
	}
});
