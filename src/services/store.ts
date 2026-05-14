import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc,
  serverTimestamp,
  orderBy,
  limit,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {}, // In a real app we'd get this from auth service
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const StoreService = {
  // Products
  async getProducts() {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'products');
    }
  },

  // Orders
  async createOrder(orderData: any) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        createdAt: serverTimestamp(),
        status: 'Pending',
        paymentStatus: 'Pending'
      });

      // Reduce stock for each item
      for (const item of orderData.items) {
        const productRef = doc(db, 'products', item.id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const currentStock = productSnap.data().stock || 0;
          await updateDoc(productRef, {
            stock: Math.max(0, currentStock - item.quantity)
          });
        }
      }

      return docRef.id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'orders');
    }
  },

  async getOrders() {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'orders');
    }
  },

  async updateOrderStatus(orderId: string, status: string) {
    try {
      const docRef = doc(db, 'orders', orderId);
      await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${orderId}`);
    }
  },

  // Inquiries
  async submitInquiry(inquiryData: any) {
    try {
      const docRef = await addDoc(collection(db, 'contactInquiries'), {
        ...inquiryData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'contactInquiries');
    }
  },

  async getInquiries() {
    try {
      const q = query(collection(db, 'contactInquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'contactInquiries');
    }
  },

  async updateInquiryStatus(inquiryId: string, status: string) {
    try {
      const docRef = doc(db, 'contactInquiries', inquiryId);
      await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `contactInquiries/${inquiryId}`);
    }
  },

  // Settings
  async getSettings() {
    try {
      const docRef = doc(db, 'settings', 'global');
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data();
      }
      return null;
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, 'settings/global');
    }
  },

  async updateSettings(settings: any) {
    try {
      const docRef = doc(db, 'settings', 'global');
      await updateDoc(docRef, { ...settings, updatedAt: serverTimestamp() });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'settings/global');
    }
  },

  async getDashboardStats() {
    try {
      // In a real app, these would be calculated via cloud functions or complex queries
      // For now we'll fetch recently completed orders to calculate revenue
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const orders = ordersSnapshot.docs.map(doc => doc.data());
      
      const totalRevenue = orders
        .filter(o => o.paymentStatus === 'Paid')
        .reduce((sum, o) => sum + (o.total || 0), 0);
        
      const dailyOrders = orders.filter(o => {
        if (!o.createdAt) return false;
        const d = (o.createdAt as Timestamp).toDate();
        return d.toDateString() === new Date().toDateString();
      }).length;

      const customersSnapshot = await getDocs(collection(db, 'users'));
      const newCustomers = customersSnapshot.docs.length;

      const productsSnapshot = await getDocs(collection(db, 'products'));
      const lowStockItems = productsSnapshot.docs.filter(d => d.data().stock < 10).length;

      return {
        totalRevenue,
        dailyOrders,
        newCustomers,
        lowStockItems
      };
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, 'stats');
    }
  }
};
