import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { HistoryOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoiceGen = ({ templateId }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [filteredInvoice, setFilteredInvoice] = useState([]);
  const [searchMobile, setSearchMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-all-candidate");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCandidates(data);
      console.log("get all candidates", data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    if (isTableVisible) {
      fetchCandidates();
    }
  }, [isTableVisible]);

  useEffect(() => {
    if (templateId) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/get-template-data/${templateId}`
          );
          if (response.ok) {
            const result = await response.json();
            setData(result); // Update data state with API response
          } else {
            console.error("Failed to fetch template data");
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
      fetchData();
    }
  }, [templateId]);

  const [payments, setPayments] = useState([
    { date: "", mode: "", amount: "" },
  ]);
  const [items, setItems] = useState([
    { name: "", quantity: "", rate: "", amount: "" },
  ]);
  const [invoiceDetails, setInvoiceDetails] = useState({
    billedByName: "",
    billedByAddress: "",
    billedToName: "",
    billedToAddress: "",
  });

  // Validate mobile number
  const isValidMobileNumber = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  // Handle input change with validation
  const handleInputSearchChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (value.length <= 10) {
      setSearchMobile(value);
    }
  };

  // Handle invoice search
  const handleInvoiceSearch = async (text) => {
    try {
      if (!text) {
        setFilteredInvoice([]);
        return;
      }
      setIsLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.append("mobileNumber", text);
      const url = `http://localhost:8080/search-invoice?${queryParams.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFilteredInvoice(data || []);
    } catch (error) {
      console.error("Error searching invoice:", error);
      setFilteredInvoice([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  const debouncedSearch = debounce((text) => handleInvoiceSearch(text), 300);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/all-invoices");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCandidates(data || []);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        // setError("Error loading data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Handle search effects
  useEffect(() => {
    if (searchMobile.length >= 3) {
      debouncedSearch(searchMobile);
    } else {
      setFilteredInvoice([]); // Clear filtered results
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchMobile]);

  // Determine which data to display
  const displayData = searchMobile.length >= 3 ? filteredInvoice : candidates;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  };

  const handlePaymentChange = (index, event) => {
    const { name, value } = event.target;
    const newPayments = [...payments];
    newPayments[index][name] = value;
    setPayments(newPayments);
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: "", rate: "", amount: "" }]);
  };

  const addPayment = () => {
    setPayments([...payments, { date: "", mode: "", amount: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const removePayment = (index) => {
    const newPayments = payments.filter((_, i) => i !== index);
    setPayments(newPayments);
  };

  const [imgData, setImgData] = useState("");

  // Convert local image to base64
  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch("/Admin-img/logo.png");
        // Update this path
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgData(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add PNG Image from base64
    if (imgData) {
      doc.addImage(imgData, "PNG", 150, 10, 40, 40); // Adjusted image position
    } else {
      console.error("Image data is not available.");
    }

    // Title with "PAID" Text
    doc.setFontSize(16);
    const title = "Invoice";
    const paidText = "PAID";

    // Title positioning
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(title, 20, 20);

    // Add "PAID" text with green background
    const paidTextWidth = doc.getTextWidth(paidText);
    const paidTextX = 20 + doc.getTextWidth(title) + 5; // Position "PAID" next to "Invoice"
    const titleY = 20;

    doc.setFillColor(0, 128, 0); // Green background for "PAID"
    doc.rect(paidTextX - 3, titleY - 4, paidTextWidth + 6, 10, "F"); // Background rectangle
    doc.setTextColor(255, 255, 255); // White text color
    doc.text(paidText, paidTextX, titleY + 3);

    // Font sizes
    const headingFontSize = 12;
    const valueFontSize = 10;

    // Helper function to wrap text within a given width
    const wrapText = (text, x, y, maxWidth) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line, index) => {
        doc.text(line, x, y + index * 5); // Adjust line spacing if needed
      });
      return lines.length * 5; // Return the total height used by the text
    };

    // Billed By Section
    const billedByX = 15;
    const billedByY = 50; // Adjusted to position below the title
    const width = 85;
    const radius = 5; // Radius for rounded corners

    // Calculate text height
    const billedByNameHeight = wrapText(
      invoiceDetails.billedByName,
      billedByX + 5,
      billedByY + 20,
      width - 10
    );
    const billedByAddressHeight = wrapText(
      invoiceDetails.billedByAddress,
      billedByX + 5,
      billedByY + 20 + billedByNameHeight,
      width - 10
    );

    // Adjust height of the rectangle dynamically
    const billedByHeight =
      billedByY + 20 + billedByNameHeight + billedByAddressHeight;
    drawRoundedRect(
      doc,
      billedByX,
      billedByY,
      width,
      billedByHeight - billedByY,
      radius
    );

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(headingFontSize);
    doc.text("Billed By:", billedByX + 5, billedByY + 10);
    doc.setFontSize(valueFontSize);
    wrapText(
      invoiceDetails.billedByName,
      billedByX + 5,
      billedByY + 20,
      width - 10
    );
    wrapText(
      invoiceDetails.billedByAddress,
      billedByX + 5,
      billedByY + 20 + billedByNameHeight,
      width - 10
    );

    // Billed To Section
    const billedToX = 110;
    const billedToY = billedByY; // Start at the same vertical position as "Billed By"

    // Calculate text height
    const billedToNameHeight = wrapText(
      invoiceDetails.billedToName,
      billedToX + 5,
      billedToY + 20,
      width - 10
    );
    const billedToAddressHeight = wrapText(
      invoiceDetails.billedToAddress,
      billedToX + 5,
      billedToY + 20 + billedToNameHeight,
      width - 10
    );

    // Adjust height of the rectangle dynamically
    const billedToHeight =
      billedToY + 20 + billedToNameHeight + billedToAddressHeight;
    drawRoundedRect(
      doc,
      billedToX,
      billedToY,
      width,
      billedToHeight - billedToY,
      radius
    );

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(headingFontSize);
    doc.text("Billed To:", billedToX + 5, billedToY + 10);
    doc.setFontSize(valueFontSize);
    wrapText(
      invoiceDetails.billedToName,
      billedToX + 5,
      billedToY + 20,
      width - 10
    );
    wrapText(
      invoiceDetails.billedToAddress,
      billedToX + 5,
      billedToY + 20 + billedToNameHeight,
      width - 10
    );

    // Table Headers and Rows
    const tableStartY = Math.max(billedByHeight, billedToHeight) + 20; // Position below the taller section
    doc.autoTable({
      startY: tableStartY,
      head: [["Item", "Quantity", "Rate", "Amount"]],
      body: items.map((item) => [
        item.name,
        item.quantity,
        item.rate,
        item.amount,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [128, 0, 128], // Purple
        textColor: [255, 255, 255], // White
      },
      styles: {
        fillColor: [240, 240, 255], // Light grey-purple
        textColor: [0, 0, 0], // Black
      },
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    // Payments Section
    const paymentsStartY = doc.autoTable.previous.finalY + 20; // Position below the table
    doc.text("Payments:", 16, paymentsStartY);
    doc.autoTable({
      startY: paymentsStartY + 10, // Start below the "Payments" label
      head: [["Date", "Mode", "Amount"]],
      body: payments.map((payment) => [
        payment.date,
        payment.mode,
        payment.amount,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [128, 0, 128], // Purple
        textColor: [255, 255, 255], // White
      },
      styles: {
        fillColor: [240, 240, 255], // Light grey-purple
        textColor: [0, 0, 0], // Black
      },
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    // Terms & Conditions Section
    const termsX = 15;
    const termsY = doc.autoTable.previous.finalY + 20; // Position below the payments section
    const termsWidth = 180; // Same width as other sections

    // Title and text positioning
    const termsTitleHeight = 20; // Height of title
    const termsText = [
      "1. Fees paid is not transferrable and non-refundable.",
      "2. Placement charges are applicable upon receipt of offer letter.",
      "3. Fees paid shall be applicable for the batch only for which admission is taken.",
      "4. Batch transfer charges (Rs. 5000) shall be applicable in case you want to change your current batch.",
      "5. If fees are paid in instalment, then the first instalment shall be paid at the time of admission and the next instalment shall be paid within 25 days of admission.",
    ];
    const termsTextHeight = termsText.reduce(
      (height, line) =>
        height +
        wrapText(
          line,
          termsX + 5,
          termsY + height + termsTitleHeight,
          termsWidth - 10
        ),
      0
    );

    // Adjust height of the rectangle dynamically
    drawRoundedRect(
      doc,
      termsX,
      termsY,
      termsWidth,
      termsTitleHeight + termsTextHeight,
      radius
    );

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(headingFontSize);
    doc.text("Terms & Conditions:", termsX + 5, termsY + 10); // Title above the rectangle
    doc.setFontSize(valueFontSize);
    termsText.forEach((line, index) => {
      wrapText(line, termsX + 5, termsY + 16 + index * 6, termsWidth - 10); // Adjust spacing between lines
    });

    //generate pdf
    // doc.save("invoice.pdf");
    return doc;
  };

  // Helper function to draw a rounded rectangle
  const drawRoundedRect = (doc, x, y, width, height, radius) => {
    doc.setFillColor(240, 240, 255); // Light grey-purple

    // Draw the rounded rectangle
    doc.setDrawColor(0, 0, 0); // Border color (black)
    doc.setLineWidth(0.5); // Border width

    doc.roundedRect(x, y, width, height, radius, radius, "F"); // 'F' for fill
    doc.roundedRect(x, y, width, height, radius, radius, "S"); // 'S' for stroke
  };

  // const [candidateName, setCandidateName] = useState("");
  const [candidateMobile, setCandidateMobile] = useState("");
  const [candidateMail, setCandidateMail] = useState("");
  // const [organizationName, setOrganizationName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //extracted from invoice-form using destructuring the form.
    const { billedByName, billedToName } = invoiceDetails;
    // Generate the PDF
    // const doc = new jsPDF(); // Assuming generatePDF is generating the doc here

    let doc;
    try {
      doc = generatePDF();
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating PDF");
      return;
    }

    // Get the PDF as a Blob
    const pdfBlob = doc.output("blob");

    // Log PDF Blob size and type
    console.log("PDF Blob Size:", pdfBlob.size);
    console.log("PDF Blob Type:", pdfBlob.type);

    // Prepare the form data
    const formData = new FormData();
    formData.append("billedToName", billedToName);
    formData.append("candidateMobile", candidateMobile);
    formData.append("candidateMail", candidateMail);
    formData.append("billedByName", billedByName);
    formData.append("invoicePdf", pdfBlob, "invoice.pdf"); // Attach the PDF blob

    setLoading(true);
    try {
      // Make the POST request to the backend
      const response = await axios.post(
        "http://localhost:8080/save-invoice",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Invoice Sended Successfully!!");
        console.log("Invoice uploaded successfully");
        // You can add toast notification or further success logic here
      } else {
        console.error("Error uploading the invoice");
      }
    } catch (error) {
      console.error("Error during invoice upload:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      toast.error("Invoice sending failed!");
    } finally {
      setLoading(false); // Hide the spinner
    }
  };

  // handling candidate info on select btn to fill billToSection  automatically.
  const handleCandidateSelection = (candidate) => {
    setInvoiceDetails((prevState) => ({
      ...prevState,
      billedToName: candidate.fieldsData["Full Name"],
      billedToAddress: candidate.fieldsData["Address"],
    }));
    setCandidateMobile(candidate.fieldsData["Mobile"]);
    setCandidateMail(candidate.fieldsData["Mail"]);
    setShowCandidateModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <ClipLoader color="#ffffff" loading={loading} size={100} />
        </div>
      )}
      
      <ToastContainer />
      
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Invoice</h1>
      
      <div id="invoice-gen-section" className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Billed By Section */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Billed By</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <label htmlFor="billedByName" className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                id="billedByName"
                name="billedByName"
                placeholder="Enter Organization Name"
                value={invoiceDetails.billedByName}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div className="space-y-4">
              <label htmlFor="billedByAddress" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="billedByAddress"
                name="billedByAddress"
                placeholder="Billed By Address"
                value={invoiceDetails.billedByAddress}
                required
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
          </div>
        </div>

        {/* Billed To Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Billed To</h3>
            <div className="flex space-x-2">
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300"
                onClick={() => setShowCandidateModal(true)}
              >
                Select Candidate
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-md transition duration-300"
                onClick={() => setIsTableVisible(!isTableVisible)}
              >
                <HistoryOutlined size={20} />
              </button>
            </div>
          </div>

          {showCandidateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Select a Candidate</h3>
                  <button
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={() => setShowCandidateModal(false)}
                  >
                    &times;
                  </button>
                </div>
                <div className="p-4 overflow-auto max-h-[70vh]">
                  {data.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees Paid</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.uid}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.fieldsData["Full Name"]}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fieldsData["Address"]}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fieldsData["mobile number"]}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fieldsData["Mail"]}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fieldsData["fees compeletion"]}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  className="text-purple-600 hover:text-purple-800"
                                  onClick={() => handleCandidateSelection(item)}
                                >
                                  Select
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">No Client Found 🙃</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isTableVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Invoice Status List</h2>
                  <button
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={() => setIsTableVisible(false)}
                  >
                    &times;
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex space-x-2 mb-4">
                    <input
                      placeholder="Search invoice by mobile number"
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      value={searchMobile}
                      onChange={handleInputSearchChange}
                      maxLength={10}
                    />
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300 disabled:bg-purple-300 disabled:cursor-not-allowed"
                      onClick={() => handleInvoiceSearch(searchMobile)}
                      disabled={!isValidMobileNumber(searchMobile) || isLoading}
                    >
                      {isLoading ? "Searching..." : "Search"}
                    </button>
                  </div>

                  {isLoading ? (
                    <div className="text-center p-4">Searching...</div>
                  ) : displayData.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {displayData.map((candidate) => (
                            <tr key={candidate.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.id || "N/A"}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{candidate.candidateName || "N/A"}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.candidateMobile || "N/A"}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.candidateMail || "N/A"}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.invoiceCreatedAt || "N/A"}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Done
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center p-10 text-gray-500">No Invoice Status 🙃</div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="billedToName" className="block text-sm font-medium text-gray-700">
                Candidate Name
              </label>
              <input
                type="text"
                id="billedToName"
                name="billedToName"
                placeholder="Enter Receiver Name"
                value={invoiceDetails.billedToName}
                required
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div className="space-y-2">
              <label htmlFor="billedToMobileNumber" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                id="billedToMobileNumber"
                name="billedToMobileNumber"
                placeholder="Enter mobile number"
                value={candidateMobile}
                required
                onChange={(e) => setCandidateMobile(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div className="space-y-2">
              <label htmlFor="billedToMail" className="block text-sm font-medium text-gray-700">
                Mail
              </label>
              <input
                type="text"
                id="billedToMail"
                name="billedToMail"
                placeholder="Enter mail id"
                value={candidateMail}
                required
                onChange={(e) => setCandidateMail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div className="space-y-2">
              <label htmlFor="billedToAddress" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="billedToAddress"
                name="billedToAddress"
                placeholder="Billed To Address"
                value={invoiceDetails.billedToAddress}
                required
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Items</h3>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
              <div className="space-y-2">
                <label htmlFor={`itemName-${index}`} className="block text-sm font-medium text-gray-700">
                  Item
                </label>
                <select
                  name="name"
                  id={`itemName-${index}`}
                  value={item.name}
                  required
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" disabled>
                    Select course type
                  </option>
                  <option value="Java fullStack development">
                    Java fullStack development
                  </option>
                  <option value="Automation Testing">Automation Testing</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="MERN Stack">MERN Stack</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor={`itemQuantity-${index}`} className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id={`itemQuantity-${index}`}
                  placeholder="Quantity"
                  value={item.quantity}
                  required
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={`itemRate-${index}`} className="block text-sm font-medium text-gray-700">
                  Rate
                </label>
                <input
                  type="number"
                  name="rate"
                  id={`itemRate-${index}`}
                  placeholder="Rate"
                  value={item.rate}
                  required
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={`itemAmount-${index}`} className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="amount"
                    id={`itemAmount-${index}`}
                    placeholder="Amount"
                    value={item.amount}
                    required
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  <button
                    className="mt-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-md transition duration-300"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button 
            className="mt-4 inline-flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>

        {/* Payments Section */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Payments</h3>
          {payments.map((payment, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
              <div className="space-y-2">
                <label htmlFor={`paymentDate-${index}`} className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id={`paymentDate-${index}`}
                  placeholder="Payment Date"
                  value={payment.date}
                  required
                  onChange={(e) => handlePaymentChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={`paymentMode-${index}`} className="block text-sm font-medium text-gray-700">
                  Mode
                </label>
                <input
                  type="text"
                  name="mode"
                  id={`paymentMode-${index}`}
                  placeholder="Payment Mode"
                  value={payment.mode}
                  required
                  onChange={(e) => handlePaymentChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={`paymentAmount-${index}`} className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="amount"
                    id={`paymentAmount-${index}`}
                    placeholder="Payment Amount"
                    value={payment.amount}
                    required
                    onChange={(e) => handlePaymentChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  <button
                    className="mt-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-md transition duration-300"
                    onClick={() => removePayment(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            className="mt-4 inline-flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300"
            onClick={addPayment}
          >
            Add Payment
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 flex justify-end">
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-md text-lg font-medium transition duration-300"
          onClick={handleSubmit}
        >
          Send Invoice
        </button>
      </div>
    </div>
  );

};

InvoiceGen.propTypes = {
  templateId: PropTypes.string.isRequired,
};

export default InvoiceGen;
