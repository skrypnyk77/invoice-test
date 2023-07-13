import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoiceData: [
      {
        id: "a0181d46-ba9b-42e5-9fc9-1df88ea744bd",
        userId: "b4d69da2-3985-4ae2-a240-69795731524d",
        currency: "USD",
        amount: 900,
        type: "Deposit",
        paymentMethod: "Credit Card",
        comment: "Done!",
      },
      {
        id: "795f3b06-bca1-4cab-86b3-fcd4b594b094",
        userId: "20c199fb-663f-45ef-a4f1-dbe9c301a637",
        currency: "EUR",
        amount: 1000,
        type: "Withdrawal",
        paymentMethod: "Wallet",
        comment: "Done2!",
      },
      {
        id: "784530035395f3b06-bca1-4cab-8694b094",
        userId: "20c199fb-663f-45ef-a4f1-dbe9c301a637",
        currency: "UAH",
        amount: 600,
        type: "Withdrawal",
        paymentMethod: "Wallet",
        comment: "Done3!",
      },
    ],
  },
  reducers: {
    addInvoice(state, action) {
      state.invoiceData.push({
        ...action.payload,
        id: uuidv4(),
      });
    },
    removeInvoice(state, action) {
      state.invoiceData = state.invoiceData.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const { addInvoice, removeInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
