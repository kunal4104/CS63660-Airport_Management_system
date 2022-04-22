window.addEventListener('load', function () {
    function getUnionDetails(event) {
        var unionId = document.getElementById('union_id').value;
        console.log(unionId);
        if (unionId == '') {
            alert('union Id is required!')
        }else{  
            event.preventDefault();
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `api/v1/user/union/${unionId}`, true);
            xhr.send();
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var rtrn = JSON.parse(xhr.responseText);
                    if (rtrn.status == 'success') {
                        console.log(rtrn.data);
                        populate(rtrn.data);
                    }
                }
            };

        }
        
    }
    tablediv = this.document.getElementById('union_members_table');
    function populate(data) {
        
        
        var table = document.getElementById("unionMembersTable");
        var rowCount = table.rows.length;
        for (var i = rowCount - 1; i >= 1; i--) {
            table.deleteRow(i);
        }
        data.forEach((member) => {
            tablediv.style.display = 'block';
            var row = table.insertRow();
            var cell1 = row.insertCell();
            cell1.innerHTML = member.name;
            var cell2 = row.insertCell();
            cell2.innerHTML = member.union_membership;
        });
    }
    var getMember = document.getElementById('get_union_members');
    console.log(getMember);
    getMember.addEventListener('click', getUnionDetails);
});
