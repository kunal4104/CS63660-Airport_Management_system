window.addEventListener('load', function () {
	//sends a post requrest to verify the user
	function login() {
		console.log('login');
		var xhr = new XMLHttpRequest();
		const user_id = document.getElementById('user_id').value;
		const password = document.getElementById('password').value;
		var params = {
			user_id: user_id,
			password: password,
		};
		console.log(params);
		xhr.open('post', '/api/v1/user/login', true);
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xhr.onload = function () {
			console.log(JSON.parse(xhr.responseText));
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					if (rtrn.data[0].type === "admin") {
						window.location.href = '/admin';
					}else {
						window.location.href = '/index';
					}
					
				}
			}
		};
		xhr.send(JSON.stringify(params));
	}

	//calls login function when login button is clicked
	const tryLogin = document.getElementById('Login');
	tryLogin.addEventListener('click', login);
});
