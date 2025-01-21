import React, { useState } from "react";
import { Plus, Trash2, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Invoice = () => {
  const [billBy, setBillBy] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [billTo, setBillTo] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);

  const [payments, setPayments] = useState([]);

  const [paymentSummary, setPaymentSummary] = useState({
    subtotal: 0,
    tax: 0,
    total: 0,
    totalPaid: 0,
    balance: 0,
  });

  const paymentMethods = ["PhonePe", "GPay", "UPI", "AmazonPay"];

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculateTotals(newItems);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    calculateTotals(newItems);
  };

  const addPayment = () => {
    setPayments([...payments, { amount: 0, date: "", method: "PhonePe" }]);
    calculatePaymentTotals([
      ...payments,
      { amount: 0, date: "", method: "PhonePe" },
    ]);
  };

  const removePayment = (index) => {
    const newPayments = payments.filter((_, i) => i !== index);
    setPayments(newPayments);
    calculatePaymentTotals(newPayments);
  };

  const updatePayment = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index] = { ...newPayments[index], [field]: value };
    setPayments(newPayments);
    calculatePaymentTotals(newPayments);
  };

  const calculateTotals = (currentItems) => {
    const subtotal = currentItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    const totalPaid = payments.reduce(
      (acc, payment) => acc + (parseFloat(payment.amount) || 0),
      0
    );

    setPaymentSummary({
      subtotal,
      tax,
      total,
      totalPaid,
      balance: total - totalPaid,
    });
  };

  const calculatePaymentTotals = (currentPayments) => {
    const totalPaid = currentPayments.reduce(
      (acc, payment) => acc + (parseFloat(payment.amount) || 0),
      0
    );
    setPaymentSummary((prev) => ({
      ...prev,
      totalPaid,
      balance: prev.total - totalPaid,
    }));
  };

  //   const generatePDF = async () => {
  //     try {
  //       // Create form data
  //       const formData = {
  //         billBy,
  //         billTo,
  //         items,
  //         payments,
  //         paymentSummary
  //       };

  //       // Create Blob
  //       const blob = new Blob([JSON.stringify(formData)], { type: 'application/json' });

  //       // Create Object URL
  //       const url = URL.createObjectURL(blob);

  //       // Create download link
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.download = `invoice_${new Date().toISOString().slice(0,10)}.pdf`;

  //       // Trigger download
  //       document.body.appendChild(link);
  //       link.click();

  //       // Cleanup
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(url);
  //     } catch (error) {
  //       console.error('Error generating PDF:', error);
  //     }
  //   };

  const generatePDF = async () => {
    try {
      const doc = new jsPDF();

      // Set default font size and color
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      // Add logo/header section
      doc.setFontSize(20);
      doc.setTextColor(59, 130, 246); // blue-500
      doc.text("INVOICE", 20, 20);

      // Add invoice details
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 20);

      // Bill From section
      doc.setFontSize(12);
      doc.setTextColor(59, 130, 246);
      doc.text("Bill From:", 20, 40);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      const fromLines = [
        billBy.name,
        billBy.address,
        billBy.email,
        billBy.phone,
      ].filter(Boolean);
      fromLines.forEach((line, i) => {
        doc.text(line, 20, 50 + i * 7);
      });

      // Bill To section
      doc.setFontSize(12);
      doc.setTextColor(59, 130, 246);
      doc.text("Bill To:", 120, 40);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      const toLines = [
        billTo.name,
        billTo.address,
        billTo.email,
        billTo.phone,
      ].filter(Boolean);
      toLines.forEach((line, i) => {
        doc.text(line, 120, 50 + i * 7);
      });

      // Items table
      doc.autoTable({
        startY: 90,
        head: [["Description", "Quantity", "Price", "Total"]],
        body: items.map((item) => [
          item.description,
          item.quantity.toString(),
          `$${item.price.toFixed(2)}`,
          `$${(item.quantity * item.price).toFixed(2)}`,
        ]),
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 30, halign: "right" },
          2: { cellWidth: 30, halign: "right" },
          3: { cellWidth: 30, halign: "right" },
        },
      });

      // Get Y position after items table
      let finalY = doc.lastAutoTable.finalY + 20;

      // Payments table
      doc.setFontSize(12);
      doc.setTextColor(59, 130, 246);
      doc.text("Payment Details:", 20, finalY);
      doc.autoTable({
        startY: finalY + 10,
        head: [["Date", "Payment Method", "Amount"]],
        body: payments.map((payment) => [
          payment.date,
          payment.method,
          `$${parseFloat(payment.amount).toFixed(2)}`,
        ]),
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 60 },
          2: { cellWidth: 40, halign: "right" },
        },
      });

      // Payment Summary section
      finalY = doc.lastAutoTable.finalY + 20;

      // Add summary details
      const summaryStartX = 120;
      const summaryData = [
        { label: "Subtotal:", value: paymentSummary.subtotal },
        { label: "Tax (18%):", value: paymentSummary.tax },
        { label: "Total:", value: paymentSummary.total },
        { label: "Total Paid:", value: paymentSummary.totalPaid },
        { label: "Balance Due:", value: paymentSummary.balance },
      ];

      summaryData.forEach((item, index) => {
        const y = finalY + index * 7;
        doc.setFontSize(10);

        // Set special styling for Total and Balance Due
        if (item.label === "Total:" || item.label === "Balance Due:") {
          doc.setFont(undefined, "bold");
          if (item.label === "Balance Due:") {
            doc.setTextColor(59, 130, 246);
          }
        } else {
          doc.setFont(undefined, "normal");
          doc.setTextColor(0, 0, 0);
        }

        doc.text(item.label, summaryStartX, y);
        doc.text(`$${item.value.toFixed(2)}`, 170, y, { align: "right" });
      });

      // Add footer
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        "Thank you for your business!",
        doc.internal.pageSize.width / 2,
        pageHeight - 10,
        { align: "center" }
      );

      // Save the PDF
      doc.save(`Invoice_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-8">Create Invoice</h1>

      {/* Bill By Section */}
      <div className="bg-white rounded-md p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-blue-500 mb-4">Bill By</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={billBy.name}
            onChange={(e) => setBillBy({ ...billBy, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={billBy.email}
            onChange={(e) => setBillBy({ ...billBy, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

            value={billBy.phone}
            onChange={(e) => setBillBy({ ...billBy, phone: e.target.value })}
          />
          <textarea
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={billBy.address}
            onChange={(e) => setBillBy({ ...billBy, address: e.target.value })}
          />
        </div>
      </div>

      {/* Bill To Section */}
      <div className="bg-white rounded-md p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-blue-500 mb-4">Bill To</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Client Name"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={billTo.name}
            onChange={(e) => setBillTo({ ...billTo, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={billTo.email}
            onChange={(e) => setBillTo({ ...billTo, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={billTo.phone}
            onChange={(e) => setBillTo({ ...billTo, phone: e.target.value })}
          />
          <textarea
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={billTo.address}
            onChange={(e) => setBillTo({ ...billTo, address: e.target.value })}
          />
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-white rounded-md p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-blue-500 mb-4">Items</h2>
        <div className="grid grid-cols-12 gap-4 mb-2 px-2">
          <div className="col-span-5">
            <p className="text-sm font-semibold text-gray-600">
              Product Description
            </p>
          </div>
          <div className="col-span-3 text-center">
            <p className="text-sm font-semibold text-gray-600">Quantity</p>
          </div>
          <div className="col-span-3 text-center">
            <p className="text-sm font-semibold text-gray-600">Price</p>
          </div>
          <div className="col-span-1"></div>
        </div>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5">
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

                  value={item.description}
                  required
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

                  value={item.quantity}
                  required
                  onChange={(e) =>
                    updateItem(index, "quantity", parseInt(e.target.value) || 0)
                  }
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

                  value={item.price}
                  required
                  onChange={(e) =>
                    updateItem(index, "price", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => removeItem(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addItem}
            className="flex items-center gap-2 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-md"
          >
            <Plus size={20} />
            Add Item
          </button>
        </div>
      </div>

      <div className="bg-white rounded-md p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-blue-500 mb-4">Payments</h2>
        <div className="grid grid-cols-12 gap-4 mb-2 px-2">
          <div className="col-span-3">
            <p className="text-sm font-semibold text-gray-600">Amount</p>
          </div>
          <div className="col-span-4">
            <p className="text-sm font-semibold text-gray-600">Date</p>
          </div>
          <div className="col-span-4">
            <p className="text-sm font-semibold text-gray-600">
              Payment Method
            </p>
          </div>
          <div className="col-span-1"></div>
        </div>
        <div className="space-y-4">
          {payments.map((payment, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3">
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

                  required
                  value={payment.amount}
                  onChange={(e) =>
                    updatePayment(
                      index,
                      "amount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div className="col-span-4">
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

                  value={payment.date}
                  required
                  onChange={(e) => updatePayment(index, "date", e.target.value)}
                />
              </div>
              <div className="col-span-4">
                <select
                                 className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

                  value={payment.method}
                  required
                  onChange={(e) =>
                    updatePayment(index, "method", e.target.value)
                  }
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => removePayment(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addPayment}
            className="flex items-center gap-2 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-md"
          >
            <Plus size={20} />
            Add Payment
          </button>
        </div>
      </div>

      {/* Payment Summary Section */}
      <div className="bg-white rounded-md p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-blue-500 mb-4">
          Payment Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Subtotal:</span>
            <span>${paymentSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Tax (18%):</span>
            <span>${paymentSummary.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>${paymentSummary.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-blue-500">
            <span className="font-medium">Total Paid:</span>
            <span>${paymentSummary.totalPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold text-blue-500">
            <span>Balance Due:</span>
            <span>${paymentSummary.balance.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Generate PDF Button */}
      <button
        onClick={generatePDF}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
      >
        <Download size={20} />
        Generate PDF
      </button>
    </div>
  );
};

export default Invoice;
