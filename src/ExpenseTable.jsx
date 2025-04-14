const ExpenseTable = ({ expenses, onDeleteExpense }) => {
    if (expenses.length === 0) {
      return <p>No expenses found.</p>;
    }
  
    return (
      <table className="expense-table">
        <thead>
          <tr>
            <th>Expense</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>Ksh.{expense.amount.toFixed(2)}</td>
              <td>{expense.date}</td>
              <td>
                <button 
                  onClick={() => onDeleteExpense(expense.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default ExpenseTable;