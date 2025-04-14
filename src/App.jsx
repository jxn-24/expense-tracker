import { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm.jsx';
import ExpenseTable from './ExpenseTable.jsx';
import SearchBar from './SearchBar.jsx';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Groceries', description: 'Weekly shopping', category: 'Food', amount: 150, date: '2023-05-15' },
    { id: 2, name: 'Electricity', description: 'Monthly bill', category: 'Utilities', amount: 80, date: '2023-05-10' },
    { id: 3, name: 'Movie', description: 'Weekend entertainment', category: 'Entertainment', amount: 25, date: '2023-05-12' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedExpenses = () => {
    if (!sortConfig.key) return filteredExpenses;

    return [...filteredExpenses].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };
  const filteredExpenses = expenses.filter(expense => {
    return (
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const displayedExpenses = sortedExpenses();

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>
      <p>Start taking control of your finances and life.Record,categorize and analyze your spending.</p>
      
      <div className="form-section">
        <h2>Add New Expense</h2>
        <ExpenseForm onAddExpense={addExpense} />
      </div>
      <div className="controls-section">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        {/* <SortControls onSort={handleSort} sortConfig={sortConfig} /> */}
      </div>
      
      <div className="table-section">
        <h2>Expense List</h2>
        <ExpenseTable 
          expenses={displayedExpenses} 
          onDeleteExpense={deleteExpense} 
        />
      </div>
    </div>
  );
}

export default App

