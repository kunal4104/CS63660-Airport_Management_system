window.addEventListener('load', function () {
	function login() {
		console.log('login');
		var xhr = new XMLHttpRequest();
		xhr.open('post', '/api/v1/user/login', true);
		xhr.onload = function () {
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
					window.location.href = '/index';
				}
			}
		};
		xhr.send();
	}
	const tryLogin = document.getElementById('Login');
	console.log(tryLogin);
	tryLogin.addEventListener('click', login);
});
