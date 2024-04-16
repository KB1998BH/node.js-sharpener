// function login(e){
//     e.preventDefault();
//     console.log(e.target.name);

//     const loginDetails = {
//         email:e.target.email.value,
//         password:e.target.password.value
//     }

//     console.log(loginDetails);

//     axios.post("http://localhost:5510/user/login", loginDetails).then(response => {
//         if (response.status === 200) {
//             alert("User login successful");
//         } else if (response.status === 401) {
//             throw new Error("User not authorized");
//         } else if (response.status === 404) {
//             throw new Error("User not found");
//         } else {
//             throw new Error("Unexpected error occurred");
//         }
//     }).catch(err => {
//         console.log(JSON.stringify(err));
//         document.body.innerHTML += `<div style= "color:red;">${err.message}</div>`
//     })

// }



function login(e){
    e.preventDefault();
    console.log(e.target.name);

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }

    console.log(loginDetails);

    axios.post("http://localhost:5510/user/loginDetails").then(response => {
       if(response.status === 200){
        alert(response.data.message)
       }else{
        throw new Error(response.data.message);
       }
    }).catch(err => {
        console.log(JSON.stringify(err));
        document.body.innerHTML += `<div style= "color:red;">${err.message}</div>`
    });
}


