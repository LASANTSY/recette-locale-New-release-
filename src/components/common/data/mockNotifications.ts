import { NotificationItem } from './types';

export const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    message: 'Nouveau message reçu de Marie Dubois',
    time: 'Il y a 2 minutes',
    read: false,
    type: 'info'
  },
  {
    id: '2',
    message: 'Votre rapport mensuel est prêt',
    time: 'Il y a 1 heure',
    read: false,
    type: 'success'
  },
  {
    id: '3',
    message: 'Maintenance programmée ce soir',
    time: 'Il y a 3 heures',
    read: true,
    type: 'warning'
  },
  {
    id: '4',
    message: 'Audit programmé pour la semaine prochaine',
    time: 'Il y a 3 heures',
    read: false,
    type: 'warning'
  }
]; 