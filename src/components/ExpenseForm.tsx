import { ChangeEvent, FormEvent, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

const ExpenseForm = () => {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0, 
        expenseName: '', 
        category: '', 
        date: new Date()
    });

    const [error, setError] = useState('')
    const { dispatch } = useBudget()

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense, 
            date: value
        })
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense, 
            [name] : isAmountField ? +value : value
        })
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validations 
        if(Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }

        // Save expense
        dispatch({ type: 'add-expense', payload: { expense } })

        // Restart state 
        setExpense({
            amount: 0, 
            expenseName: '', 
            category: '', 
            date: new Date()
        })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500"
            >Nuevo Gasto</legend>

            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
                <input 
                    type="text" 
                    id="expenseName" 
                    placeholder="Añade el nombre del gasto" 
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad:</label>
                <input 
                    type="number" 
                    id="amount" 
                    placeholder="Añade la cantidad del gasto" 
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoria:</label>
                <select onChange={handleChange} value={expense.category} name="category" id="category" className="bg-slate-100 p-2">
                    <option value="">Seleccione categoria</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amountName" className="text-xl">Fecha Gasto:</label>
                <DatePicker 
                    className={'bg-slate-100 p-2 border-none'}
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input type="submit" value="Registrar Gasto" className="bg-blue-600 cursor-pointer w-full p-2 uppercase text-white rounded-lg" />
        </form>
    )
}

export default ExpenseForm