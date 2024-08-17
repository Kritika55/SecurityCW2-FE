import React, { useState, useEffect } from 'react';
import { getLogsApi } from '../api/api';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getLogsApi();
        console.log('Logs data:', res.data); // Log the response to debug
        setLogs(res.data);
      } catch (err) {
        console.error('Error fetching logs:', err);
        setError('Failed to load logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">User Activity Logs</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">User</th>
              <th className="border border-gray-200 px-4 py-2">Action</th>
              <th className="border border-gray-200 px-4 py-2">Timestamp</th>
              <th className="border border-gray-200 px-4 py-2">Session ID</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, index) => {
                // Adjust based on actual data structure
                const username = log.userId || 'Unknown User'; // Adjust as needed
                const action = log.action || 'No Action';
                const sessionId = log.sessionId || 'No Session ID';

                return (
                  <tr key={index}> {/* Use index as fallback if _id is not available */}
                    <td className="border border-gray-200 px-4 py-2">
                      {username}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">{action}</td>
                    <td className="border border-gray-200 px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="border border-gray-200 px-4 py-2">{sessionId}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-200 px-4 py-2 text-center">
                  No logs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsPage;
