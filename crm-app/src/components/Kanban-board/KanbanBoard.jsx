import { useState, useEffect, useRef } from "react";
import { X, Plus, Edit2, Trash2, MoreHorizontal } from "lucide-react";

const KanbanBoard = () => {
  // State for columns, cards, forms visibility, and currently edited items
  const [columns, setColumns] = useState([]);
  const [showCreateDashboardForm, setShowCreateDashboardForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showColumnForm, setShowColumnForm] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [dashboardName, setDashboardName] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [dashboardCreated, setDashboardCreated] = useState(false);

  // Form data states
  const [newDashboardData, setNewDashboardData] = useState({
    name: "",
    columns: [{ name: "", color: "#9333ea" }],
  });

  const [newColumnData, setNewColumnData] = useState({
    name: "",
    color: "#9333ea",
    description: "",
  });

  const [cardData, setCardData] = useState({
    title: "",
    description: "",
    contact: "",
    email: "",
    value: "",
    dueDate: "",
  });

  // Reference for click outside detection
  const formRef = useRef(null);

  // Handle click outside to close forms
  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeAllForms();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close all forms
  const closeAllForms = () => {
    setShowCreateDashboardForm(false);
    setShowCardForm(false);
    setShowColumnForm(false);
  };

  // Handle create dashboard form changes
  const handleDashboardFormChange = (e, index) => {
    if (e.target.name === "name") {
      setNewDashboardData({ ...newDashboardData, name: e.target.value });
    } else if (e.target.name.startsWith("column")) {
      const newColumns = [...newDashboardData.columns];
      if (e.target.name.includes("name")) {
        newColumns[index].name = e.target.value;
      } else if (e.target.name.includes("color")) {
        newColumns[index].color = e.target.value;
      }
      setNewDashboardData({ ...newDashboardData, columns: newColumns });
    }
  };

  // Add column field in dashboard creation form
  const addColumnField = () => {
    setNewDashboardData({
      ...newDashboardData,
      columns: [...newDashboardData.columns, { name: "", color: "#9333ea" }],
    });
  };

  // Remove column field in dashboard creation form
  const removeColumnField = (index) => {
    const newColumns = [...newDashboardData.columns];
    newColumns.splice(index, 1);
    setNewDashboardData({ ...newDashboardData, columns: newColumns });
  };

  // Create dashboard
  const createDashboard = (e) => {
    e.preventDefault();
    // Transform column data into the required format
    const formattedColumns = newDashboardData.columns.map((col) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: col.name,
      color: col.color,
      cards: [],
    }));

    setColumns(formattedColumns);
    setDashboardName(newDashboardData.name);
    setDashboardCreated(true);
    setShowCreateDashboardForm(false);

    // Reset form data
    setNewDashboardData({
      name: "",
      columns: [{ name: "", color: "#9333ea" }],
    });
  };

  // Add new column
  const addColumn = (e) => {
    e.preventDefault();
    const newColumn = {
      id: Math.random().toString(36).substr(2, 9),
      name: newColumnData.name,
      color: newColumnData.color,
      description: newColumnData.description,
      cards: [],
    };

    setColumns([...columns, newColumn]);
    setShowColumnForm(false);

    // Reset new column data
    setNewColumnData({
      name: "",
      color: "#9333ea",
      description: "",
    });
  };

  // Delete column
  const deleteColumn = (columnId) => {
    setColumns(columns.filter((col) => col.id !== columnId));
  };

  // Add or edit card
  const saveCard = (e) => {
    e.preventDefault();

    if (currentCard) {
      // Edit existing card
      const updatedColumns = columns.map((col) => {
        if (col.id === currentColumn) {
          const updatedCards = col.cards.map((card) =>
            card.id === currentCard.id ? { ...cardData, id: card.id } : card
          );
          return { ...col, cards: updatedCards };
        }
        return col;
      });
      setColumns(updatedColumns);
    } else {
      // Add new card
      const updatedColumns = columns.map((col) => {
        if (col.id === currentColumn) {
          return {
            ...col,
            cards: [
              ...col.cards,
              {
                id: Math.random().toString(36).substr(2, 9),
                ...cardData,
                columnId: currentColumn,
              },
            ],
          };
        }
        return col;
      });
      setColumns(updatedColumns);
    }

    setShowCardForm(false);
    setCurrentCard(null);

    // Reset card data
    setCardData({
      title: "",
      description: "",
      contact: "",
      email: "",
      value: "",
      dueDate: "",
    });
  };

  // Delete card
  const deleteCard = (columnId, cardId) => {
    const updatedColumns = columns.map((col) => {
      if (col.id === columnId) {
        return {
          ...col,
          cards: col.cards.filter((card) => card.id !== cardId),
        };
      }
      return col;
    });
    setColumns(updatedColumns);
  };

  // Open card form for adding new card
  const openAddCardForm = (columnId) => {
    setCurrentColumn(columnId);
    setCurrentCard(null);
    setCardData({
      title: "",
      description: "",
      contact: "",
      email: "",
      value: "",
      dueDate: "",
    });
    setShowCardForm(true);
  };

  // Open card form for editing existing card
  const openEditCardForm = (columnId, card) => {
    setCurrentColumn(columnId);
    setCurrentCard(card);
    setCardData({
      title: card.title,
      description: card.description,
      contact: card.contact,
      email: card.email,
      value: card.value,
      dueDate: card.dueDate,
    });
    setShowCardForm(true);
  };

  // Drag and drop handlers
  const handleDragStart = (card, columnId) => {
    setDraggedItem({ card, fromColumnId: columnId });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (columnId) => {
    if (draggedItem && draggedItem.fromColumnId !== columnId) {
      // Remove card from source column
      const updatedColumns = columns.map((col) => {
        if (col.id === draggedItem.fromColumnId) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== draggedItem.card.id),
          };
        }
        return col;
      });

      // Add card to target column
      const finalColumns = updatedColumns.map((col) => {
        if (col.id === columnId) {
          return {
            ...col,
            cards: [...col.cards, { ...draggedItem.card, columnId }],
          };
        }
        return col;
      });

      setColumns(finalColumns);
      setDraggedItem(null);
    }
  };

  // Create dashboard form
  const renderCreateDashboardForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={formRef}
        className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-700">
            Create Kanban Dashboard
          </h2>
          <button
            onClick={() => setShowCreateDashboardForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={createDashboard}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dashboard Name
            </label>
            <input
              type="text"
              name="name"
              value={newDashboardData.name}
              onChange={(e) => handleDashboardFormChange(e)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium text-gray-700">Columns</h3>
              <button
                type="button"
                onClick={addColumnField}
                className="text-purple-600 hover:text-purple-800 flex items-center text-sm"
              >
                <Plus size={16} className="mr-1" /> Add Column
              </button>
            </div>

            {newDashboardData.columns.map((column, index) => (
              <div key={index} className="flex items-center mb-2 gap-2">
                <input
                  type="text"
                  name={`column-name-${index}`}
                  value={column.name}
                  onChange={(e) => handleDashboardFormChange(e, index)}
                  placeholder="Column name"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="color"
                  name={`column-color-${index}`}
                  value={column.color}
                  onChange={(e) => handleDashboardFormChange(e, index)}
                  className="h-6 w-7 rounded cursor-pointer"
                />
                {newDashboardData.columns.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColumnField(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Create Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Column form
  const renderColumnForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={formRef} className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-700">Add New Column</h2>
          <button
            onClick={() => setShowColumnForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={addColumn}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Column Name
            </label>
            <input
              type="text"
              name="name"
              value={newColumnData.name}
              onChange={(e) =>
                setNewColumnData({ ...newColumnData, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Column Color
            </label>
            <input
              type="color"
              name="color"
              value={newColumnData.color}
              onChange={(e) =>
                setNewColumnData({ ...newColumnData, color: e.target.value })
              }
              className="h-10 w-10 rounded cursor-pointer"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={newColumnData.description}
              onChange={(e) =>
                setNewColumnData({
                  ...newColumnData,
                  description: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Add Column
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Card form
  const renderCardForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={formRef}
        className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-700">
            {currentCard ? "Edit Lead" : "Add New Lead"}
          </h2>
          <button
            onClick={() => setShowCardForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={saveCard}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={cardData.title}
              onChange={(e) =>
                setCardData({ ...cardData, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={cardData.description}
              onChange={(e) =>
                setCardData({ ...cardData, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Name
            </label>
            <input
              type="text"
              name="contact"
              value={cardData.contact}
              onChange={(e) =>
                setCardData({ ...cardData, contact: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={cardData.email}
              onChange={(e) =>
                setCardData({ ...cardData, email: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deal Value
            </label>
            <input
              type="text"
              name="value"
              value={cardData.value}
              onChange={(e) =>
                setCardData({ ...cardData, value: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={cardData.dueDate}
              onChange={(e) =>
                setCardData({ ...cardData, dueDate: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              {currentCard ? "Update Lead" : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Render card component
  const renderCard = (card, columnId) => (
    <div
      key={card.id}
      className="bg-white p-3 rounded-md shadow-sm mb-2 border-l-4"
      style={{
        borderLeftColor: columns.find((col) => col.id === columnId)?.color,
      }}
      draggable
      onDragStart={() => handleDragStart(card, columnId)}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-800">{card.title}</h4>
        <div className="flex space-x-1">
          <button
            onClick={() => openEditCardForm(columnId, card)}
            className="text-gray-500 hover:text-purple-600 p-1"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => deleteCard(columnId, card.id)}
            className="text-gray-500 hover:text-red-600 p-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {card.description && (
        <p className="text-sm text-gray-600 mb-2">{card.description}</p>
      )}

      {card.contact && (
        <div className="text-xs text-gray-500 mb-1">
          <span className="font-medium">Contact:</span> {card.contact}
        </div>
      )}

      {card.email && (
        <div className="text-xs text-gray-500 mb-1">
          <span className="font-medium">Email:</span> {card.email}
        </div>
      )}

      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        {card.value && (
          <div className="font-medium text-purple-600">{card.value}</div>
        )}
        {card.dueDate && (
          <div>{new Date(card.dueDate).toLocaleDateString()}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50">
      {/* Info description for new users */}
      {!dashboardCreated && (
        <div className="mb-8 bg-white rounded-lg p-6 border-l-4 border-purple-600 shadow-sm">
          <h2 className="text-xl font-bold text-purple-700 mb-3">
            Welcome to Custom Kanban Board
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              Create your own custom CRM kanban dashboard to track and manage
              your leads efficiently.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-purple-50 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                    1
                  </div>
                  <h3 className="font-medium text-purple-800">
                    Create Dashboard
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Click the "Create Kanban Dashboard" button to set up your
                  board with custom columns.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                    2
                  </div>
                  <h3 className="font-medium text-purple-800">Add Columns</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Create columns to represent different stages in your sales
                  process. Customize each with colors.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                    3
                  </div>
                  <h3 className="font-medium text-purple-800">Manage Leads</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Add lead cards to columns and drag them between stages as they
                  progress through your pipeline.
                </p>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 mt-4">
              <div className="flex items-center mr-4">
                <span className="inline-block w-3 h-3 bg-purple-600 rounded-full mr-1"></span>
                <span>Drag cards between columns</span>
              </div>
              <div className="flex items-center mr-4">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span>Edit card details anytime</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                <span>Add new columns as needed</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Dashboard header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          {dashboardCreated ? (
            <h1 className="text-2xl font-bold text-purple-700">
              {dashboardName}
            </h1>
          ) : (
            <h1 className="text-2xl font-bold text-gray-800">Kanban Board</h1>
          )}
        </div>

        {!dashboardCreated && (
          <button
            onClick={() => setShowCreateDashboardForm(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center"
          >
            <Plus size={18} className="mr-1" /> Create Kanban Dashboard
          </button>
        )}
      </div>

      {/* Dashboard content */}
      {dashboardCreated ? (
        <div className="flex space-x-4 overflow-x-auto pb-4 h-[calc(100vh-120px)]">
          {/* Column rendering */}
          {columns.map((column) => (
            <div
              key={column.id}
              className="bg-gray-100 rounded-lg min-w-64 w-64 h-full flex flex-col"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              {/* Column header */}
              <div
                className="p-3 rounded-t-lg flex justify-between items-center sticky top-0"
                style={{ backgroundColor: column.color + "20" }}
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: column.color }}
                  ></div>
                  <h3 className="font-medium text-gray-800">{column.name}</h3>
                </div>
                <div className="flex">
                  <button
                    onClick={() => deleteColumn(column.id)}
                    className="text-gray-500 hover:text-red-600 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Cards container */}
              <div className="flex-1 overflow-y-auto p-2">
                {column.cards &&
                  column.cards.map((card) => renderCard(card, column.id))}

                {/* Add card button */}
                <button
                  onClick={() => openAddCardForm(column.id)}
                  className="w-full p-2 text-gray-500 hover:text-purple-600 bg-white bg-opacity-80 rounded-md flex items-center justify-center border border-dashed border-gray-300 hover:border-purple-400 mt-2"
                >
                  <Plus size={16} className="mr-1" /> Add Lead
                </button>
              </div>
            </div>
          ))}

          {/* Add column button */}
          {dashboardCreated && (
            <div className="min-w-64 w-64 h-24 flex items-center justify-center">
              <button
                onClick={() => setShowColumnForm(true)}
                className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-400"
              >
                <Plus size={20} className="mr-1" /> Add Column
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border border-dashed border-gray-300 text-gray-500">
          <div className="mb-4">
            <Plus size={48} className="text-purple-300" />
          </div>
          <p className="text-lg">
            Create a new Kanban dashboard to get started
          </p>
          <button
            onClick={() => setShowCreateDashboardForm(true)}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center"
          >
            <Plus size={18} className="mr-1" /> Let's Start
          </button>
        </div>
      )}

      {/* Forms */}
      {showCreateDashboardForm && renderCreateDashboardForm()}
      {showColumnForm && renderColumnForm()}
      {showCardForm && renderCardForm()}
    </div>
  );
};

export default KanbanBoard;
