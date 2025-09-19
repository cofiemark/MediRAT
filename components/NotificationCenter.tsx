import React from 'react';
import type { AppNotification } from '../types';
import { useAuth } from '../hooks/useAuth';

interface NotificationCenterProps {
  notifications: AppNotification[];
  onAcknowledge: (notificationId: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications, onAcknowledge }) => {
  const { hasPermission } = useAuth();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div role="region" aria-live="polite" className="fixed top-24 right-8 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Service Alerts</h3>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <li key={notification.id} className="p-4 space-y-3">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{notification.equipmentName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {notification.department} - {notification.location}
              </p>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
              Service due: {notification.nextServiceDate.toLocaleString()}
            </p>
            {hasPermission('acknowledge:notification') && (
                <button
                onClick={() => onAcknowledge(notification.id)}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                Acknowledge
                </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};