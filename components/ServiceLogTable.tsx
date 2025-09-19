import React from 'react';
import type { MaintenanceLog } from '../types';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';

interface ServiceLogTableProps {
  maintenanceHistory: MaintenanceLog[];
}

export const ServiceLogTable: React.FC<ServiceLogTableProps> = ({ maintenanceHistory }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
        <WrenchScrewdriverIcon className="w-6 h-6 mr-2 text-gray-500" />
        Service History
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Technician</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Work Performed</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {maintenanceHistory.length > 0 ? maintenanceHistory.map(log => (
              <tr key={log.id}>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{log.date.toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{log.technician}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{log.workPerformed}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{log.notes}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">No service history available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
