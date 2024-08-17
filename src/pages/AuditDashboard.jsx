import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuditLogDashboard = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios.get('/admin/audit-logs')
            .then(res => setLogs(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">User Activity Logs</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Session ID</th>
                            <th>Action</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log._id}>
                                <td>{log.userId.username} ({log.userId.email})</td>
                                <td>{log.sessionId}</td>
                                <td>{log.action}</td>
                                <td>{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLogDashboard;
