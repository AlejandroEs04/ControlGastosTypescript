import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

const ExpenseList = () => {
    const { state } = useBudget()

    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <div className="mt-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>

                    <div className="shadow-lg rounded-lg">
                        {filteredExpenses.map(expense => (
                            <ExpenseDetail 
                                key={expense.expenseName}
                                expense={expense}

                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default ExpenseList