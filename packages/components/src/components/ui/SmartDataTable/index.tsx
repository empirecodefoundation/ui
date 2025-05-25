import React, { useState } from "react";

export interface SmartDataTableProps {
  openAIApiKey: string;
  data: any[];
  columns: string[];
  onQuery?: (query: string, result: any[]) => void;
  onError?: (error: string) => void;
  className?: string;
  theme?: "light" | "dark";
}

export const SmartDataTable: React.FC<SmartDataTableProps> = ({
  openAIApiKey,
  data,
  columns,
  onQuery,
  onError,
  className = "",
  theme = "light",
}) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<any[]>(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const styles = {
    card: {
      border: `1px solid ${theme === "light" ? "#e5e7eb" : "#374151"}`,
      borderRadius: 12,
      padding: 24,
      maxWidth: 720,
      margin: "40px auto",
      background: theme === "light" ? "#fff" : "#1f2937",
      color: theme === "light" ? "#1f2937" : "#f3f4f6",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    },
    input: {
      width: "100%",
      marginBottom: 12,
      padding: "8px 12px",
      borderRadius: 6,
      border: `1px solid ${theme === "light" ? "#e5e7eb" : "#374151"}`,
      background: theme === "light" ? "#fff" : "#374151",
      color: theme === "light" ? "#1f2937" : "#f3f4f6",
    },
    button: {
      background: "#6366f1",
      color: "#fff",
      border: 0,
      borderRadius: 6,
      padding: "8px 20px",
      fontWeight: 600,
      cursor: "pointer",
      marginBottom: 16,
      transition: "all 0.2s ease",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      marginTop: 12,
    },
    th: {
      background: theme === "light" ? "#f3f4f6" : "#374151",
      color: theme === "light" ? "#1f2937" : "#f3f4f6",
      padding: 8,
      border: `1px solid ${theme === "light" ? "#e5e7eb" : "#374151"}`,
    },
    td: {
      padding: 8,
      border: `1px solid ${theme === "light" ? "#e5e7eb" : "#374151"}`,
    },
    error: {
      color: "#dc2626",
      marginBottom: 8,
    },
  };

  const handleQuery = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAIApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a data analyst. Given a table and a user query, return the filtered rows as JSON array. Table columns: ${columns.join(
                ", "
              )}`,
            },
            {
              role: "user",
              content: `Table data: ${JSON.stringify(data)}\nQuery: ${query}`,
            },
          ],
          max_tokens: 1024,
          temperature: 0,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || "OpenAI API error");
      }
      const result = await res.json();
      const text = result.choices?.[0]?.message?.content || "[]";
      const rows = JSON.parse(text);
      setFiltered(rows);
      onQuery?.(query, rows);
    } catch (err: any) {
      setError(err.message || "Failed to query data.");
      onError?.(err.message || "Failed to query data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className} style={styles.card}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        Smart Data Table
      </h2>
      <input
        style={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question about the data..."
        disabled={loading}
      />
      <button
        style={styles.button}
        onClick={handleQuery}
        disabled={loading || !query.trim()}
      >
        {loading ? "Querying..." : "Query"}
      </button>
      {error && <div style={styles.error}>{error}</div>}
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} style={styles.th}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col} style={styles.td}>
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SmartDataTable;
