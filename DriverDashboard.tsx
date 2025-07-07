import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function DriverDashboard() {
  const [activeTab, setActiveTab] = useState('deliveries');
  const [isOnline, setIsOnline] = useState(true);

  const deliveries = [
    { id: 1, customer: 'Juan Dela Cruz', address: '123 Main St', items: 'Paracetamol x2', payment: '₱11.98', status: 'Assigned', distance: '2.5 km' },
    { id: 2, customer: 'Pedro Penduko', address: '456 Main Ave', items: 'Vitamin D3 x1', payment: '₱12.99', status: 'Picked Up', distance: '1.8 km' },
  ];

  const completedDeliveries = [
    { id: 3, customer: 'Bob Ong', earnings: '₱15.50', date: '2024-01-15', rating: 5 },
    { id: 4, customer: 'Bago Ong', earnings: '₱22.30', date: '2024-01-14', rating: 4 },
  ];

  const tabs = [
    { id: 'deliveries', title: 'Deliveries', icon: '🚚' },
    { id: 'history', title: 'History', icon: '📋' },
    { id: 'earnings', title: 'Earnings', icon: '💰' },
    { id: 'profile', title: 'Profile', icon: '👤' },
  ];

  const renderDeliveries = () => (
    <View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <TouchableOpacity 
          style={[styles.statusButton, isOnline ? styles.onlineButton : styles.offlineButton]}
          onPress={() => setIsOnline(!isOnline)}
        >
          <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Available Deliveries</Text>
      {deliveries.map((delivery) => (
        <View key={delivery.id} style={styles.deliveryCard}>
          <View style={styles.deliveryHeader}>
            <Text style={styles.customerName}>{delivery.customer}</Text>
            <Text style={[styles.deliveryStatus, 
              delivery.status === 'Assigned' ? styles.assignedStatus : styles.pickedUpStatus]}>
              {delivery.status}
            </Text>
          </View>
          <Text style={styles.deliveryAddress}>{delivery.address}</Text>
          <Text style={styles.deliveryItems}>{delivery.items}</Text>
          <View style={styles.deliveryFooter}>
            <Text style={styles.deliveryDistance}>{delivery.distance}</Text>
            <Text style={styles.deliveryPayment}>{delivery.payment}</Text>
          </View>
          <View style={styles.deliveryActions}>
            {delivery.status === 'Assigned' ? (
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.buttonText}>Accept Delivery</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.completeButton}>
                <Text style={styles.buttonText}>Mark Delivered</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.navigateButton}>
              <Text style={styles.buttonText}>Navigate</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderHistory = () => (
    <View>
      <Text style={styles.sectionTitle}>Delivery History</Text>
      {completedDeliveries.map((delivery) => (
        <View key={delivery.id} style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.customerName}>{delivery.customer}</Text>
            <Text style={styles.deliveryDate}>{delivery.date}</Text>
          </View>
          <View style={styles.historyFooter}>
            <Text style={styles.earnings}>Earned: {delivery.earnings}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{'⭐'.repeat(delivery.rating)}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderEarnings = () => (
    <View>
      <Text style={styles.sectionTitle}>Earnings Overview</Text>
      <View style={styles.earningsContainer}>
        <View style={styles.earningsCard}>
          <Text style={styles.earningsAmount}>₱245.80</Text>
          <Text style={styles.earningsLabel}>Today's Earnings</Text>
        </View>
        <View style={styles.earningsCard}>
          <Text style={styles.earningsAmount}>₱1,234.50</Text>
          <Text style={styles.earningsLabel}>This Week</Text>
        </View>
      </View>
      <View style={styles.earningsContainer}>
        <View style={styles.earningsCard}>
          <Text style={styles.earningsAmount}>₱4,567.20</Text>
          <Text style={styles.earningsLabel}>This Month</Text>
        </View>
        <View style={styles.earningsCard}>
          <Text style={styles.earningsAmount}>156</Text>
          <Text style={styles.earningsLabel}>Deliveries</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.withdrawButton}>
        <Text style={styles.withdrawText}>Withdraw Earnings</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfile = () => (
    <View>
      <Text style={styles.sectionTitle}>Driver Profile</Text>
      <View style={styles.profileCard}>
        <Text style={styles.profileName}>Driver 1</Text>
        <Text style={styles.profileInfo}>Vehicle: Honda Civic - ABC123</Text>
        <Text style={styles.profileInfo}>Rating: 4.8/5 (245 reviews)</Text>
        <Text style={styles.profileInfo}>Deliveries Completed: 1,234</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'deliveries': return renderDeliveries();
      case 'history': return renderHistory();
      case 'earnings': return renderEarnings();
      case 'profile': return renderProfile();
      default: return renderDeliveries();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Driver Dashboard</Text>
      
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
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#DC2626' },
  tabIcon: { fontSize: 16, marginBottom: 4 },
  tabText: { fontSize: 12, color: '#64748B' },
  activeTabText: { color: '#DC2626', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#1E293B' },
  statusContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: 'white', padding: 16, borderRadius: 8 },
  statusLabel: { fontSize: 16, marginRight: 12 },
  statusButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  onlineButton: { backgroundColor: '#10B981' },
  offlineButton: { backgroundColor: '#6B7280' },
  statusText: { color: 'white', fontWeight: 'bold' },
  deliveryCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 },
  deliveryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  customerName: { fontSize: 16, fontWeight: 'bold' },
  deliveryStatus: { fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  assignedStatus: { backgroundColor: '#FEF3C7', color: '#92400E' },
  pickedUpStatus: { backgroundColor: '#DBEAFE', color: '#1E40AF' },
  deliveryAddress: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  deliveryItems: { fontSize: 14, marginBottom: 8 },
  deliveryFooter: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  deliveryDistance: { fontSize: 14, color: '#6B7280' },
  deliveryPayment: { fontSize: 14, fontWeight: 'bold', color: '#10B981' },
  deliveryActions: { flexDirection: 'row', justifyContent: 'space-between' },
  acceptButton: { backgroundColor: '#10B981', flex: 1, padding: 8, borderRadius: 6, marginRight: 8, alignItems: 'center' },
  completeButton: { backgroundColor: '#DC2626', flex: 1, padding: 8, borderRadius: 6, marginRight: 8, alignItems: 'center' },
  navigateButton: { backgroundColor: '#4F46E5', flex: 1, padding: 8, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  historyCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  deliveryDate: { fontSize: 14, color: '#64748B' },
  historyFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  earnings: { fontSize: 14, fontWeight: 'bold', color: '#10B981' },
  ratingContainer: { flexDirection: 'row' },
  ratingText: { fontSize: 14 },
  earningsContainer: { flexDirection: 'row', marginBottom: 16 },
  earningsCard: { flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 8, marginHorizontal: 4, alignItems: 'center' },
  earningsAmount: { fontSize: 24, fontWeight: 'bold', color: '#DC2626', marginBottom: 4 },
  earningsLabel: { fontSize: 12, color: '#64748B', textAlign: 'center' },
  withdrawButton: { backgroundColor: '#DC2626', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  withdrawText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  profileCard: { backgroundColor: 'white', padding: 16, borderRadius: 8 },
  profileName: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  profileInfo: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  editProfileButton: { backgroundColor: '#4F46E5', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 16 },
});