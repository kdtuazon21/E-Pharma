import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [merchantName, setMerchantName] = useState('');

  const stats = {
    totalSales: '₱45,230',
    totalOrders: 1234,
    activeMerchants: 89,
    activeDrivers: 156
  };

  const merchants = [
    { id: 1, name: 'City Pharmacy', sales: '₱12,450', orders: 234, rating: 4.8, status: 'Active' },
    { id: 2, name: 'Health Store', sales: '₱8,920', orders: 156, rating: 4.6, status: 'Active' },
    { id: 3, name: 'Medical Supplies', sales: '₱15,680', orders: 298, rating: 4.9, status: 'Pending' },
  ];

  const drivers = [
    { id: 1, name: 'Rider 1', deliveries: 145, rating: 4.7, earnings: '₱2,340', status: 'Online' },
    { id: 2, name: 'Rider 2', deliveries: 189, rating: 4.9, earnings: '₱3,120', status: 'Offline' },
    { id: 3, name: 'Rider 3', deliveries: 98, rating: 4.5, earnings: '₱1,890', status: 'Online' },
  ];

  const recentOrders = [
    { id: 1, customer: 'Juan Dela Cruz', merchant: 'City Pharmacy', driver: 'Rider 1', total: '₱25.99', status: 'Delivered' },
    { id: 2, customer: 'Pedro Penduko', merchant: 'Health Store', driver: 'Rider 2', total: '₱18.50', status: 'In Transit' },
  ];

  const tabs = [
    { id: 'overview', title: 'Overview', icon: '📊' },
    { id: 'merchants', title: 'Merchants', icon: '🏪' },
    { id: 'drivers', title: 'Drivers', icon: '🚚' },
    { id: 'orders', title: 'Orders', icon: '📦' },
  ];

  const renderOverview = () => (
    <View>
      <Text style={styles.sectionTitle}>Platform Overview</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalSales}</Text>
          <Text style={styles.statLabel}>Total Sales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalOrders}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.activeMerchants}</Text>
          <Text style={styles.statLabel}>Active Merchants</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.activeDrivers}</Text>
          <Text style={styles.statLabel}>Active Drivers</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Orders</Text>
      {recentOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderCustomer}>{order.customer}</Text>
            <Text style={styles.orderDetails}>{order.merchant} → {order.driver}</Text>
            <Text style={styles.orderTotal}>Total: {order.total}</Text>
          </View>
          <Text style={[styles.orderStatus, 
            order.status === 'Delivered' ? styles.deliveredStatus : styles.transitStatus]}>
            {order.status}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderMerchants = () => (
    <View>
      <View style={styles.addForm}>
        <Text style={styles.sectionTitle}>Add New Merchant</Text>
        <TextInput
          style={styles.input}
          placeholder="Merchant Name"
          value={merchantName}
          onChangeText={setMerchantName}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Merchant</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Merchant Management</Text>
      {merchants.map((merchant) => (
        <View key={merchant.id} style={styles.merchantCard}>
          <View style={styles.merchantInfo}>
            <Text style={styles.merchantName}>{merchant.name}</Text>
            <Text style={styles.merchantStats}>Sales: {merchant.sales} | Orders: {merchant.orders}</Text>
            <Text style={styles.merchantRating}>Rating: {merchant.rating}/5</Text>
          </View>
          <View style={styles.merchantActions}>
            <Text style={[styles.merchantStatus, 
              merchant.status === 'Active' ? styles.activeStatus : styles.pendingStatus]}>
              {merchant.status}
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderDrivers = () => (
    <View>
      <Text style={styles.sectionTitle}>Driver Management</Text>
      {drivers.map((driver) => (
        <View key={driver.id} style={styles.driverCard}>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.driverStats}>Deliveries: {driver.deliveries} | Rating: {driver.rating}/5</Text>
            <Text style={styles.driverEarnings}>Earnings: {driver.earnings}</Text>
          </View>
          <View style={styles.driverActions}>
            <Text style={[styles.driverStatus, 
              driver.status === 'Online' ? styles.onlineStatus : styles.offlineStatus]}>
              {driver.status}
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderOrders = () => (
    <View>
      <Text style={styles.sectionTitle}>Order Management</Text>
      {recentOrders.map((order) => (
        <View key={order.id} style={styles.orderDetailCard}>
          <Text style={styles.orderCustomer}>Customer: {order.customer}</Text>
          <Text style={styles.orderMerchant}>Merchant: {order.merchant}</Text>
          <Text style={styles.orderDriver}>Driver: {order.driver}</Text>
          <View style={styles.orderFooter}>
            <Text style={styles.orderTotal}>Total: {order.total}</Text>
            <Text style={[styles.orderStatus, 
              order.status === 'Delivered' ? styles.deliveredStatus : styles.transitStatus]}>
              {order.status}
            </Text>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'merchants': return renderMerchants();
      case 'drivers': return renderDrivers();
      case 'orders': return renderOrders();
      default: return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { fontSize: 24, fontWeight: 'bold', padding: 20, color: '#1E293B' },
  tabBar: { flexDirection: 'row', backgroundColor: 'white', paddingVertical: 8 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#7C2D12' },
  tabIcon: { fontSize: 16, marginBottom: 4 },
  tabText: { fontSize: 12, color: '#64748B' },
  activeTabText: { color: '#7C2D12', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#1E293B' },
  statsContainer: { flexDirection: 'row', marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 8, marginHorizontal: 4, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#7C2D12', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#64748B', textAlign: 'center' },
  orderCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row' },
  orderInfo: { flex: 1 },
  orderCustomer: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  orderDetails: { fontSize: 14, color: '#64748B', marginBottom: 2 },
  orderTotal: { fontSize: 14, fontWeight: 'bold', color: '#059669' },
  orderStatus: { fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  deliveredStatus: { backgroundColor: '#D1FAE5', color: '#065F46' },
  transitStatus: { backgroundColor: '#DBEAFE', color: '#1E40AF' },
  addForm: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 20 },
  input: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 6, marginBottom: 12 },
  addButton: { backgroundColor: '#7C2D12', padding: 12, borderRadius: 6, alignItems: 'center' },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  merchantCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row' },
  merchantInfo: { flex: 1 },
  merchantName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  merchantStats: { fontSize: 14, color: '#64748B', marginBottom: 2 },
  merchantRating: { fontSize: 12, color: '#059669' },
  merchantActions: { alignItems: 'flex-end' },
  merchantStatus: { fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 8 },
  activeStatus: { backgroundColor: '#D1FAE5', color: '#065F46' },
  pendingStatus: { backgroundColor: '#FEF3C7', color: '#92400E' },
  actionButton: { backgroundColor: '#4F46E5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  buttonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  driverCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row' },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  driverStats: { fontSize: 14, color: '#64748B', marginBottom: 2 },
  driverEarnings: { fontSize: 12, color: '#059669' },
  driverActions: { alignItems: 'flex-end' },
  driverStatus: { fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 8 },
  onlineStatus: { backgroundColor: '#D1FAE5', color: '#065F46' },
  offlineStatus: { backgroundColor: '#F3F4F6', color: '#6B7280' },
  orderDetailCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 },
  orderMerchant: { fontSize: 14, color: '#64748B', marginBottom: 2 },
  orderDriver: { fontSize: 14, color: '#64748B', marginBottom: 8 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
});