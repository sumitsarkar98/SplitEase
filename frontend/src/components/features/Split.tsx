import { useState, useEffect } from "react";
import { LuTrendingUp } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

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
  balance: number;
};

const Split = () => {
  const [items, setItems] = useState<Item[]>([{ name: "", amount: 0 }]);
  const [members, setMembers] = useState<Member[]>([{ name: "", paid: 0 }]);
  const [results, setResults] = useState<Result[]>([]);
  const [settlements, setSettlements] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [perPerson, setPerPerson] = useState(0);

  // ====== RESET RESULTS WHEN DATA CHANGES ======
  useEffect(() => {
    setResults([]);
    setSettlements([]);
  }, [items, members]);

  // ======= ITEM HANDLERS =======
  const addItem = () => {
    setItems((prev) => [...prev, { name: "", amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof Item, value: string) => {
    const updated = [...items];

    if (field === "amount") {
      updated[index].amount = Number(value) || 0;
    } else {
      updated[index].name = value;
    }

    setItems(updated);
  };

  // ======= MEMBER HANDLERS =======
  const addMember = () => {
    setMembers((prev) => [...prev, { name: "", paid: 0 }]);
  };

  const removeMember = (index: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof Member, value: string) => {
    const updated = [...members];

    if (field === "paid") {
      updated[index].paid = Number(value) || 0;
    } else {
      updated[index].name = value;
    }

    setMembers(updated);
  };

  // ========= CALCULATE =========
  const handleCalculate = () => {
    const validItems = items.filter((i) => i.amount > 0);
    const validMembers = members.filter((m) => m.name.trim());

    if (validMembers.length < 2) {
      alert("Add at least 2 members");
      return;
    }

    const totalExpense = validItems.reduce((sum, item) => sum + item.amount, 0);
    const splitAmount = totalExpense / validMembers.length;

    const balances = validMembers.map((m) => ({
      name: m.name,
      paid: m.paid,
      balance: m.paid - splitAmount,
    }));

    // ========== SETTLEMENT LOGIC ==========
    const creditors = balances
      .filter((b) => b.balance > 0)
      .map((b) => ({ ...b }));

    const debtors = balances
      .filter((b) => b.balance < 0)
      .map((b) => ({ ...b }));

    const settlementList: string[] = [];

    let i = 0,
      j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debt = Math.abs(debtors[i].balance);
      const credit = creditors[j].balance;

      const amount = Math.min(debt, credit);

      settlementList.push(
        `${debtors[i].name} pays ₹${amount.toFixed(2)} to ${creditors[j].name}`,
      );

      debtors[i].balance += amount;
      creditors[j].balance -= amount;

      if (Math.abs(debtors[i].balance) < 0.01) i++;
      if (Math.abs(creditors[j].balance) < 0.01) j++;
    }

    // ========= SET STATE =========
    setTotal(totalExpense);
    setPerPerson(splitAmount);
    setResults(balances);
    setSettlements(settlementList);
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
          <div key={i} className="flex gap-2 items-center">
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

            {items.length > 1 && (
              <button onClick={() => removeItem(i)}>
                <MdDeleteOutline className="text-red-500 cursor-pointer" />
              </button>
            )}
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
          <div key={i} className="flex gap-2 items-center">
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

            {members.length > 1 && (
              <button onClick={() => removeMember(i)}>
                <MdDeleteOutline className="text-red-500 cursor-pointer" />
              </button>
            )}
          </div>
        ))}

        <button onClick={addMember} className="text-green-600 text-sm">
          + Add Member
        </button>
      </div>

      {/* CALCULATE */}
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

      {/* SETTLEMENTS */}
      {settlements.length > 0 && (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <h3 className="font-semibold text-slate-700">Settlements</h3>

          {settlements.map((s, i) => (
            <p key={i} className="text-sm text-slate-600">
              {s}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Split;
