function deleteUser(id){
    id && fetch(`http://localhost:8080/delete-user/${id}`, { method: 'DELETE' })
    .then((res)=>{
        alert("User Deleted");
        location.reload()
    })
    .catch(err => console.log(err));
}