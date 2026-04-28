import { useState } from "react";
import { LuTrendingUp } from "react-icons/lu";

type Item = {
  name: string;
  amount: number;
};

type Member = {
  name: string;
  paid: number;
};

type Result = {
  name: string;
  paid: number;
  owes?: number;
  balance?: number;
};

const Split = () => {
  const [items, setItems] = useState<Item[]>([{ name: "", amount: 0 }]);
  const [members, setMembers] = useState<Member[]>([{ name: "", paid: 0 }]);
  const [results, setResults] = useState<Result[]>([]);
  const [total, setTotal] = useState(0);
  const [perPerson, setPerPerson] = useState(0);

  // =========================
  // ITEM HANDLERS
  // =========================
  const addItem = () => {
    setItems([...items, { name: "", amount: 0 }]);
  };

  const updateItem = (index: number, field: keyof Item, value: string) => {
    const updated = [...items];
    updated[index][field] = field === "amount" ? Number(value) : value;
    setItems(updated);
  };

  // =========================
  // MEMBER HANDLERS
  // =========================
  const addMember = () => {
    setMembers([...members, { name: "", paid: 0 }]);
  };

  const updateMember = (index: number, field: keyof Member, value: string) => {
    const updated = [...members];
    updated[index][field] = field === "paid" ? Number(value) : value;
    setMembers(updated);
  };

  // =========================
  // CALCULATE
  // =========================
  const handleCalculate = () => {
    const totalExpense = items.reduce((sum, item) => sum + item.amount, 0);

    const splitAmount = members.length > 0 ? totalExpense / members.length : 0;

    const output: Result[] = members.map((m) => {
      const balance = m.paid - splitAmount;

      return {
        name: m.name || "Unnamed",
        paid: m.paid,
        owes: splitAmount,
        balance,
      };
    });

    setTotal(totalExpense);
    setPerPerson(splitAmount);
    setResults(output);
  };

  return (
    <div className="p-4 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-1">
          Split Expenses
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Add items, members and calculate equal split
        </p>
      </div>

      {/* ITEMS */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold">Expense Items</h2>

        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              placeholder="Item name"
              value={item.name}
              onChange={(e) => updateItem(i, "name", e.target.value)}
              className="border p-2 rounded w-1/2"
            />
            <input
              type="number"
              placeholder="Amount"
              value={item.amount}
              onChange={(e) => updateItem(i, "amount", e.target.value)}
              className="border p-2 rounded w-1/2"
            />
          </div>
        ))}

        <button onClick={addItem} className="text-green-600 text-sm">
          + Add Item
        </button>
      </div>

      {/* MEMBERS */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold">Members</h2>

        {members.map((m, i) => (
          <div key={i} className="flex gap-2">
            <input
              placeholder="Name"
              value={m.name}
              onChange={(e) => updateMember(i, "name", e.target.value)}
              className="border p-2 rounded w-1/2"
            />
            <input
              type="number"
              placeholder="Paid amount"
              value={m.paid}
              onChange={(e) => updateMember(i, "paid", e.target.value)}
              className="border p-2 rounded w-1/2"
            />
          </div>
        ))}

        <button onClick={addMember} className="text-green-600 text-sm">
          + Add Member
        </button>
      </div>

      {/* CALCULATE BUTTON */}
      <button
        onClick={handleCalculate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="bg-green-50 p-4 rounded space-y-3">
          <h2 className="font-semibold text-green-700 flex items-center gap-2">
            <LuTrendingUp /> Result
          </h2>

          <p>Total Expense: ₹{total}</p>
          <p>Per Person: ₹{perPerson.toFixed(2)}</p>

          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex justify-between border-b pb-1">
                <span>{r.name}</span>
                <span
                  className={r.balance > 0 ? "text-green-600" : "text-red-500"}
                >
                  {r.balance > 0
                    ? `Gets ₹${r.balance.toFixed(2)}`
                    : `Owes ₹${Math.abs(r.balance).toFixed(2)}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Split;
