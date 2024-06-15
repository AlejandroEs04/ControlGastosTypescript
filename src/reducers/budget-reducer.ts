import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions = 
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'hide-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } }

export type BudgetState = {
    budget: number, 
    modal: boolean, 
    expenses: Expense[]
}

export const initialState : BudgetState = {
    budget: 0, 
    modal: false, 
    expenses: []
}

const createExpense = (draftExpense : DraftExpense) : Expense => {
    return {
        ...draftExpense, 
        id: uuidv4()
    }
}

export const BudgetReducer = (
    state: BudgetState = initialState, 
    actions: BudgetActions
) => {
    if(actions.type === 'add-budget') {
        return {
            ...state, 
            budget: actions.payload.budget
        }
    }
    if(actions.type === 'show-modal') {
        return {
            ...state, 
            modal: true
        }
    }
    if(actions.type === 'hide-modal') {
        return {
            ...state, 
            modal: false
        }
    }
    if(actions.type === 'add-expense') {
        const expense = createExpense(actions.payload.expense)

        return {
            ...state, 
            expenses: [
                ...state.expenses, 
                expense
            ], 
            modal: false
        }
    }

    return state
}