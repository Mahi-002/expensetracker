function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    if (amount === "" || description === "" || category === "") {
        alert("Please fill in all fields.");
        return;
    }
    // Create a unique id for each expense using timestamp
    const expenseId = Date.now().toString();
    const expense = {
        id: expenseId,
        amount,
        description,
        category
    };
    // Save to local storage
    saveExpenseToLocalStorage(expense);
    // Display expense on the screen
    addExpenseToScreen(expense);
    // Clear form fields
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
}
// Save expense to local storage
function saveExpenseToLocalStorage(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
// Display an expense on the screen
function addExpenseToScreen(expense) {
    const expenseList = document.getElementById('expenseList');
    const li = document.createElement('li');
    li.id = expense.id;
    li.innerHTML = `
        Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}
        <button onclick="editExpense('${expense.id}')">Edit</button>
        <button onclick="deleteExpense('${expense.id}')">Delete</button>
    `;
    expenseList.appendChild(li);
}
// Delete expense from local storage and screen
function deleteExpense(expenseId) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.id !== expenseId);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    // Remove from screen
    document.getElementById(expenseId).remove();
}
// Edit an expense
function editExpense(expenseId) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseToEdit = expenses.find(expense => expense.id === expenseId);
    if (expenseToEdit) {
        // Populate form fields with existing expense details
        document.getElementById('amount').value = expenseToEdit.amount;
        document.getElementById('description').value = expenseToEdit.description;
        document.getElementById('category').value = expenseToEdit.category;
        // Remove the old expense from local storage and the screen
        deleteExpense(expenseId);
    }
};
