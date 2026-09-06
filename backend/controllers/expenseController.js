import expenseModel from "../models/expenseModel";
import getDateRange from "../utils/dateFilter.js";

// add expense
export async function addExpense(req, res) {
  const userId = req.user._id;
  const { description, amount, category, date } = req.body;

  try {
    if (!description || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newExpense = new expenseModel({
      userId,
      description,
      amount,
      category,
      date: new Date(date),
    });

    await newExpense.save();
    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      //data: newExpense,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//get all expenses
export async function getAllExpense(req, res) {
  const userId = req.user._id;
  try {
    const expense = await expenseModel.find({ userId }).sort({ date: -1 });
    return res.json(expense);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching expenses",
      //error: error.message,
    });
  }
}

// update expense
export async function updateExpense(req, res) {
  const { id } = req.params;
  const userId = req.user._id;
  const { description, amount, category, date } = req.body;

  try {
    const updatedExpense = await expenseModel.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      { description, amount, category, date: Date(date) },
      { new: true },
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found or you are not authorized to update it",
      });
    }

    return res.json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating expense",
      //error: error.message,
    });
  }
}
