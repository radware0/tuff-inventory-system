let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// SAVE TO LOCAL STORAGE
function saveData() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

// UI CONTROL
function showSection(id) {
    document.querySelectorAll(".card").forEach(c => c.classList.add("hidden"));
    document.getElementById("welcome").classList.remove("hidden");
    document.getElementById(id).classList.remove("hidden");
    output.innerHTML = "";
}

// ADD ITEM
function addItem() {
    let code = aCode.value.trim();
    let name = aName.value.trim();
    let price = Number(aPrice.value);
    let qty = Number(aQty.value);
    addMsg.innerHTML = "";

    if (!code || !name || price <= 0 || qty <= 0) {
        addMsg.innerHTML = "❌ Invalid input.";
        return;
    }

    if (inventory.find(i => i.code === code)) {
        addMsg.innerHTML = "❌ Duplicate item code.";
        return;
    }

    inventory.push({ code, name, price, qty });
    saveData();
    addMsg.innerHTML = "✅ Item added successfully.";
}

// VIEW ITEMS
function viewItems() {
    if (inventory.length === 0) {
        output.innerHTML = "<p>No items available.</p>";
        return;
    }

    let html = "<table><tr><th>Code</th><th>Name</th><th>Price</th><th>Qty</th></tr>";
    inventory.forEach(i => {
        html += `<tr>
            <td>${i.code}</td>
            <td>${i.name}</td>
            <td>${i.price}</td>
            <td>${i.qty}</td>
        </tr>`;
    });
    html += "</table>";

    output.innerHTML = html;
}

// UPDATE QTY
function updateQty() {
    let item = inventory.find(i => i.code === uCode.value);
    updateMsg.innerHTML = "";

    if (!item) {
        updateMsg.innerHTML = "❌ Item not found.";
        return;
    }

    item.qty = Number(uQty.value);
    saveData();
    updateMsg.innerHTML = "✅ Quantity updated.";
}

// DELETE ITEM
function deleteItem() {
    let index = inventory.findIndex(i => i.code === dCode.value);
    deleteMsg.innerHTML = "";

    if (index === -1) {
        deleteMsg.innerHTML = "❌ Item not found.";
        return;
    }

    inventory.splice(index, 1);
    saveData();
    deleteMsg.innerHTML = "✅ Item deleted.";
}

// SEARCH
function searchItem() {
    let item = inventory.find(i => i.code === sCode.value);
    searchResult.innerHTML = "";

    if (!item) {
        searchResult.innerHTML = "<p>❌ Item not found.</p>";
        return;
    }

    searchResult.innerHTML = `
        <table>
            <tr><th>Code</th><td>${item.code}</td></tr>
            <tr><th>Name</th><td>${item.name}</td></tr>
            <tr><th>Price</th><td>${item.price}</td></tr>
            <tr><th>Qty</th><td>${item.qty}</td></tr>
        </table>
    `;
}

// TOTAL VALUE
function showValue() {
    let total = 0;
    inventory.forEach(i => total += i.price * i.qty);
    output.innerHTML = `<h3>Total Inventory Value: ₱${total}</h3>`;
}

// EXIT
function exitSystem() {
    document.querySelectorAll(".card").forEach(c => c.classList.add("hidden"));
    document.getElementById("exitMsg").classList.remove("hidden");
    document.getElementById("output").innerHTML = "";
}
