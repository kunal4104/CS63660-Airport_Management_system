window.addEventListener('load', function () {
    var http = new XMLHttpRequest();
    var btnUnionLeave = document.getElementById("btnUnionLeave");
    var btnUnionJoin = document.getElementById("btnUnionJoin");
    btnUnionLeave.addEventListener('click', unionLeave);
    btnUnionJoin.addEventListener('click', unionJoin);
    function unionLeave(event) {
        var url = '/api/v1/user/updateUnion';
        console.log('In the onclick function');
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            let postObj ={
                union_id:0
            };
                let urlEncodedData = "", urlEncodedDataPairs = [], name;
                for( name in postObj ) {
                    urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(postObj[name]));
                }
                urlEncodedData = urlEncodedDataPairs.join("&");
                http.onreadystatechange = function() {//Call a function when the state changes.
                    if(http.readyState == 4 && http.status == 200) {
                        alert("You have left the union");
                    }else if (http.readyState == 4 && http.status != 200){
                        alert("You have not left the union");
                    }
                }
                http.send(urlEncodedData);
    }
    function unionJoin(event) {
        var url = '/api/v1/user/updateUnion';
        console.log('In the onclick function');
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            let postObj ={
                union_id:document.getElementById('union_id').value
            };
                let urlEncodedData = "", urlEncodedDataPairs = [], name;
                for( name in postObj ) {
                    urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(postObj[name]));
                }
                urlEncodedData = urlEncodedDataPairs.join("&");
                http.onreadystatechange = function() {//Call a function when the state changes.
                    if(http.readyState == 4 && http.status == 200) {
                        alert("You have joined the union");
                    }else if (http.readyState == 4 && http.status != 200){
                        alert("You have not joined the union");
                    }
                }
                http.send(urlEncodedData);
    }
});