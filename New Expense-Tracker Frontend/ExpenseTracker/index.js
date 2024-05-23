const token = localStorage.getItem('token');
function addNewExpense(e){
    e.preventDefault();
    const form = new FormData(e.target);

    const expenseDetails = {
        expenseamount: form.get("expenseamount"),
        description: form.get("description"),
        category: form.get("category")

    }
    console.log(expenseDetails)
    axios.post('http://localhost:5510/user/addexpense',expenseDetails, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 201){
        addNewExpensetoUI(response.data.expense);
    } else {
        throw new Error('Failed To create new expense');
    }

    }).catch(err => showError(err))

}


function showPremiumuserMessage(){
    document.getElementById('rzp-button1').style.visibility = "hidden"
    document.getElementById('message').innerHTML = "you are a premium user"
    showLeaderboard();
}


window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    const decodeToken = parseJwt(token);
    console.log(decodeToken);
    const ispremiumuser = decodeToken.ispremiumuser
    if(ispremiumuser){
        showPremiumuserMessage()
    }
    axios.get('http://localhost:5510/expense/getexpenses', { headers:{"Authorization": token}})
    .then((response) => {
        response.data.expenses.forEach(expense => {
            addNewExpense(expense);
        })
    })
    .catch((err) => {
        console.log("bad error");
    })
})

function showLeaderboard() {
    const leaderboardContainer = document.createElement("div");
     leaderboardContainer.id = "leaderboardContainer";

    const inputElement = document.createElement("input");
    inputElement.type = "button";
    inputElement.value = 'Show Leaderboard';
    inputElement.onclick = async () => {
        const token = localStorage.getItem('token');
        try {
            const userLeaderBoardArray = await axios.get('http://localhost:5510/premium/showleaderboard', { headers: { "Authorization": token } });
            console.log(userLeaderBoardArray);

           // var leaderboardContainer = document.getElementById('leaderboard');
            leaderboardContainer.innerHTML = '<h1> Leader Board </h1>'
            userLeaderBoardArray.data.forEach((userDetails) => {
                leaderboardContainer.innerHTML += `<li> Name - ${userDetails.name} Total Expense - ${userDetails.totalExpenses}</li>`;
            });

            // Append leaderboard container to the message div
            document.getElementById("message").appendChild(leaderboardContainer);
         } catch (error) {
            console.error("Error fetching leaderboard:", error);
         }
    };

    document.getElementById("message").appendChild(inputElement);
}


function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`
}

function deleteExpense(e, expenseid) {
    axios.delete(`http://localhost:5510/user/deleteexpense/${expenseid}`, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 204){
            removeExpensefromUI(expenseid);
        } else {
            throw new Error('Failed to delete');
        }
    }).catch((err => {
        showError(err);
    }))
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}



function download(){
    axios.get('http://localhost:5510/user/download', { headers: {"Authorization": token}})
    .then((response) => {
        if(response.status === 200){
            //the backend is essentially sending a download link
            //which if we open in browser, the file would downloaded
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        }else{
            throw new Error(response.data.message)
        }
    })
    .catch((err) => {
        showError(err)
    });
}



document.getElementById('rzp-button1').onclick = async function (e) {
    const response  = await axios.get('http://localhost:5510/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:5510/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}