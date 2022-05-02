window.addEventListener('load', function () {
	let success = document.getElementById('success');
	let fail = document.getElementById('error');
	success.style.display = 'none';
	fail.style.display = 'none';

	function showUpdateInfo(state) {
		console.log('here');
		if (state === 'success') {
			success.style.display = 'block';
			fail.style.display = 'none';
		} else {
			fail.style.display = 'block';
			success.style.display = 'none';
		}

		var close = document.getElementsByClassName('closebtn');
		var i;

		for (i = 0; i < close.length; i++) {
			close[i].onclick = function () {
				var div = this.parentElement;
				// div.style.opacity = '0';
				div.style.display = 'none';
			};
		}
	}

	//sends a post requrest to verify the user
	function login(e) {
		e.preventDefault();
		var xhr = new XMLHttpRequest();
		const user_id = document.getElementById('user_id').value;
		const password = document.getElementById('password').value;
		if (user_id != '' && password != '') {
			var params = {
				user_id: user_id,
				password: password,
			};
			xhr.open('post', '/api/v1/user/login', true);
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xhr.onload = function () {
				if (xhr.status === 200) {
					var rtrn = JSON.parse(xhr.responseText);
					if (rtrn.status == 'success') {
						showUpdateInfo('success');
						if (rtrn.data.type === 'admin') {
							window.location.href = '/admin';
						} else {
							window.location.href = '/index';
						}
					} else {
						showUpdateInfo('error');
					}
				} else {
					showUpdateInfo('error');
				}
			};
			xhr.send(JSON.stringify(params));
		} else {
			showUpdateInfo('error');
		}
	}

	//calls login function when login button is clicked
	const tryLogin = document.getElementById('Login');
	tryLogin.addEventListener('click', login);
});
