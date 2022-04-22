window.addEventListener('load', function () {
	//sends a post requrest to verify the user
	function logout() {
		console.log('logout');
        var xhr = new XMLHttpRequest();
		xhr.open('post', '/api/v1/user/logout', true);
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xhr.onload = function () {
			console.log(JSON.parse(xhr.responseText));
			if (xhr.status === 200) {
				var rtrn = JSON.parse(xhr.responseText);
				if (rtrn.status == 'success') {
                    console.log("logout success");
                    window.location.href = '/';
				}
			}
		};
	}

	//calls login function when login button is clicked
	const logoutbtn = document.getElementById('logout');
	logoutbtn.addEventListener('click', logout);
});
