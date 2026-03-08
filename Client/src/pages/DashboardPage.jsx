// src/pages/DashboardPage.jsx
import { useState, useEffect } from "react";
import { leadAPI } from "../services/api";
import LeadTable from "../components/LeadTable";
import LeadForm from "../components/LeadForm";
import styles from "../styles/App.module.css";

const DashboardPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0,
  });

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
    setShowForm(true);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await leadAPI.delete(id);
        await fetchLeads(); // Refresh the list
      } catch (error) {
        setError("Failed to delete lead");
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingLead) {
        await leadAPI.update(editingLead.id, formData);
      } else {
        await leadAPI.create(formData);
      }
      await fetchLeads(); // Refresh the list
      setShowForm(false);
      setEditingLead(null);
    } catch (error) {
      setError(error.response?.data?.message || "Operation failed");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const lead = leads.find((l) => l.id === id);
      await leadAPI.update(id, { ...lead, status: newStatus });
      await fetchLeads(); // Refresh the list
    } catch (error) {
      setError("Failed to update status");
    }
  };

  if (loading && leads.length === 0) {
    return <div className={styles.loading}>Loading dashboard...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Lead Dashboard</h1>
        <button onClick={handleAddLead} className={styles.addBtn}>
          + Add New Lead
        </button>
      </div>

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

      {/* Lead Form Modal */}
      {showForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{editingLead ? "Edit Lead" : "Add New Lead"}</h2>
            <LeadForm
              lead={editingLead}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
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
