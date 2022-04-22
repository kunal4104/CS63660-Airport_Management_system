window.addEventListener('load', function () {
    var btnUpdatePassword = document.getElementById("btnUpdatePassword");
    btnUpdatePassword.addEventListener("click", updatePassword);
    var cancelBtn = document.getElementById("cancelUpdatePassword");
    cancelBtn.addEventListener("click", cancelUpdatePassword);
    function cancelUpdatePassword() {
        window.location.href="/profile";
    }

    function updatePassword(){
        var oldPassword = document.getElementById("oldPassword");
        var newPassword = document.getElementById("newPassword");
        var newPassword2 = document.getElementById("newPassword2");
        var http = new XMLHttpRequest();
        var url = '/api/v1/user/updatePassword';

        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        let postObj ={
            oldpass: oldPassword.value,
            newPass: newPassword.value,
        };
            let urlEncodedData = "", urlEncodedDataPairs = [], name;
            for( name in postObj ) {
                urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(postObj[name]));
            }
        urlEncodedData = urlEncodedDataPairs.join("&");
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                showUpdateInfo("success");
            }else if (http.readyState == 4 && http.status != 200){
                showUpdateInfo("error");
            }
        }
        http.send(urlEncodedData);
    }

    function showUpdateInfo(state) {
        var successDiv = document.getElementById("uSuccessDialog");
        var uErrorDialog = document.getElementById("uErrorDialog");
        if (state === "success") {
            uErrorDialog.classList.add("hideInfo")
            successDiv.classList.add("showInfo")
            logout();
        }else {
            successDiv.classList.add("hideInfo")
            uErrorDialog.classList.add("showInfo")
        }


        var close = document.getElementsByClassName("closebtn");
        var i;

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function(){
                var div = this.parentElement;
                div.style.opacity = "0";
                setTimeout(function(){ div.style.display = "none"; }, 600);
            }
        }
    }
    function logout() {
		console.log('logout');
        var xhr = new XMLHttpRequest();
		xhr.open('post', '/api/v1/user/logout', true);
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send();
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
});