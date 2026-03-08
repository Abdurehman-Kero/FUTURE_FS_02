// src/pages/DashboardPage.jsx
import { useState, useEffect } from "react";
import { leadAPI } from "../services/api";
import LeadTable from "../components/LeadTable";
import LeadForm from "../components/LeadForm";
import AddAdmin from "../components/AddAdmin"; // NEW
import { useAuth } from "../context/AuthContext"; // NEW
import styles from "../styles/App.module.css";

const DashboardPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false); // NEW
  const [editingLead, setEditingLead] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // NEW
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0,
  });

  const { user } = useAuth(); // Get current user

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // Update stats when leads change
  useEffect(() => {
    calculateStats();
  }, [leads]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await leadAPI.getAll();
      setLeads(response.data.data);
      setError("");
    } catch (error) {
      setError("Failed to fetch leads");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const total = leads.length;
    const newLeads = leads.filter((lead) => lead.status === "new").length;
    const contacted = leads.filter(
      (lead) => lead.status === "contacted",
    ).length;
    const converted = leads.filter(
      (lead) => lead.status === "converted",
    ).length;

    setStats({ total, new: newLeads, contacted, converted });
  };

  const handleAddLead = () => {
    setEditingLead(null);
    setShowLeadForm(true);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setShowLeadForm(true);
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await leadAPI.delete(id);
        setSuccessMessage("Lead deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
        await fetchLeads();
      } catch (error) {
        setError("Failed to delete lead");
      }
    }
  };

  const handleLeadFormSubmit = async (formData) => {
    try {
      if (editingLead) {
        await leadAPI.update(editingLead.id, formData);
        setSuccessMessage("Lead updated successfully");
      } else {
        await leadAPI.create(formData);
        setSuccessMessage("Lead created successfully");
      }
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchLeads();
      setShowLeadForm(false);
      setEditingLead(null);
    } catch (error) {
      setError(error.response?.data?.message || "Operation failed");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const lead = leads.find((l) => l.id === id);
      await leadAPI.update(id, { ...lead, status: newStatus });
      setSuccessMessage("Status updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
      await fetchLeads();
    } catch (error) {
      setError("Failed to update status");
    }
  };

  // NEW: Handle successful admin creation
  const handleAdminCreated = (admin) => {
    setShowAdminForm(false);
    setSuccessMessage(`Admin ${admin.email} created successfully!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  if (loading && leads.length === 0) {
    return <div className={styles.loading}>Loading dashboard...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <div>
          <h1>Lead Dashboard</h1>
          <p className={styles.welcomeText}>
            Welcome, {user?.name || "Admin"}!
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            onClick={() => setShowAdminForm(true)}
            className={styles.adminBtn}
            title="Add New Admin"
          >
            👤 Add Admin
          </button>
          <button onClick={handleAddLead} className={styles.addBtn}>
            + Add New Lead
          </button>
        </div>
      </div>

      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
          <button onClick={() => setSuccessMessage("")}>✕</button>
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button onClick={() => setError("")}>✕</button>
        </div>
      )}

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Leads</h3>
          <p className={styles.statNumber}>{stats.total}</p>
        </div>
        <div className={styles.statCard}>
          <h3>New</h3>
          <p className={styles.statNumber}>{stats.new}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Contacted</h3>
          <p className={styles.statNumber}>{stats.contacted}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Converted</h3>
          <p className={styles.statNumber}>{stats.converted}</p>
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAdminForm && (
        <AddAdmin
          onSuccess={handleAdminCreated}
          onCancel={() => setShowAdminForm(false)}
        />
      )}

      {/* Lead Form Modal */}
      {showLeadForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editingLead ? "Edit Lead" : "Add New Lead"}</h2>
            <LeadForm
              lead={editingLead}
              onSubmit={handleLeadFormSubmit}
              onCancel={() => {
                setShowLeadForm(false);
                setEditingLead(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Leads Table */}
      <LeadTable
        leads={leads}
        onEdit={handleEditLead}
        onDelete={handleDeleteLead}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default DashboardPage;
