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
					// console.log('getFAAtest');
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
					// console.log('getEmployees');
					console.log(rtrn);
				}
			}
		};
	}
	getEmployees();

	function showUpdateInfo(state) {
		if (state === 'success') {
			addEmployeeError.classList.add('hideInfo');
			addEmployeeSuccess.classList.add('showInfo');
		} else {
			addEmployeeSuccess.classList.add('hideInfo');
			addEmployeeError.classList.add('showInfo');
		}

		var close = document.getElementsByClassName('closebtn');
		var i;

		for (i = 0; i < close.length; i++) {
			close[i].onclick = function () {
				var div = this.parentElement;
				div.style.opacity = '0';
				setTimeout(function () {
					div.style.display = 'none';
				}, 600);
			};
		}
	}

	var assign = document.getElementById('assign');
	assign.addEventListener('click', function () {
		var xhr = new XMLHttpRequest();
		var aircraft = document.getElementById('aircraft');
		var registration_no = aircraft.value;
		var test = document.getElementById('test');
		var test_num = test.value;
		var employee = document.getElementById('assign_to');
		var ssn = employee.value;
		if (registration_no != '' || test_num != '' || ssn != '') {
			var params = {
				flight_num: registration_no,
				test_id: test_num,
				technician_id: ssn,
			};
			console.log(params);
			xhr.open('post', '/api/v1/admin/assign', true);
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xhr.onload = function () {
				console.log(JSON.parse(xhr.responseText));
				if (xhr.status === 200) {
					var rtrn = JSON.parse(xhr.responseText);
					if (rtrn.status == 'success') {
						aircraft.value = '';
						test.value = '';
						employee.value = '';

						console.log(rtrn);
						showUpdateInfo('success');
						// if (rtrn.data.type === 'admin') {
						// 	window.location.href = '/admin';
						// } else {
						// 	window.location.href = '/index';
						// }
					} else {
						showUpdateInfo('error');
					}
				}
			};

			xhr.send(JSON.stringify(params));
		} else {
			showUpdateInfo('error');
		}
	});
});
