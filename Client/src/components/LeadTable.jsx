// src/components/LeadTable.jsx
import styles from "../styles/App.module.css";

const LeadTable = ({ leads, onEdit, onDelete, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return styles.statusNew;
      case "contacted":
        return styles.statusContacted;
      case "qualified":
        return styles.statusQualified;
      case "converted":
        return styles.statusConverted;
      case "lost":
        return styles.statusLost;
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (leads.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No leads yet. Add your first lead!</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.leadTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Source</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.company || "-"}</td>
              <td>{lead.source}</td>
              <td>
                <select
                  value={lead.status}
                  onChange={(e) => onStatusChange(lead.id, e.target.value)}
                  className={`${styles.statusSelect} ${getStatusColor(lead.status)}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </td>
              <td>{formatDate(lead.created_at)}</td>
              <td>
                <button onClick={() => onEdit(lead)} className={styles.editBtn}>
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(lead.id)}
                  className={styles.deleteBtn}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
