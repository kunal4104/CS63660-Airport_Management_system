window.addEventListener('load', function () {
	function addOption(id, value, display, rtrn) {
		var select = document.getElementById(id);
		console.log(id);

		var data = rtrn.data;
		console.log(data);
		for (var i = 0; i < data.length; i++) {
			var opt = document.createElement('option');
			opt.value = data[i][value];
			console.log(opt.value);
			var text = [];
			for (var j = 0; j < display.length; j++) {
				text.push(data[i][display[j]]);
			}
			text = text.join('-');
			// opt.innerHTML = `${data[i].registration_no} - ${data[i].model}`;
			opt.innerHTML = text;
			select.appendChild(opt);
		}
	}

	function getAirplanes() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/airplane', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					// userProfile.name = rtrn.data[0].name

					console.log(rtrn);
					addOption(
						'aircraft',
						'registration_no',
						['registration_no', 'model'],
						rtrn
					);
					// userProfile.ssn = rtrn.data[0].SSN
					// userProfile = rtrn.data[0];
					// fillValues(rtrn.data[0]);
				}
			}
		};
	}
	getAirplanes();

	function getFAAtest() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/airplane/test', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					// userProfile.name = rtrn.data[0].name
					// userProfile.ssn = rtrn.data[0].SSN
					// userProfile = rtrn.data[0];
					// fillValues(rtrn.data[0]);
					console.log(rtrn);
					// addOption('FAA_test', rtrn);
					addOption('test', 'test_num', ['name'], rtrn);
					console.log('getFAAtest');
				}
			}
		};
	}
	getFAAtest();

	function getEmployees() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/v1/admin/technician', true);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					// userProfile.name = rtrn.data[0].name
					// userProfile.ssn = rtrn.data[0].SSN
					addOption('assign_to', 'SSN', ['name'], rtrn);
					console.log('getEmployees');
					console.log(rtrn);
				}
			}
		};
	}
	getEmployees();
});
