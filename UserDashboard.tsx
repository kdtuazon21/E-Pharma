import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('browse');

  const products = [
    { id: 1, name: 'Paracetamol 500mg', price: '₱5.99', category: 'Medicine', merchant: 'City Pharmacy' },
    { id: 2, name: 'Vitamin D3', price: '₱12.99', category: 'Supplements', merchant: 'Health Store' },
    { id: 3, name: 'Blood Pressure Monitor', price: '₱89.99', category: 'Equipment', merchant: 'Medical Supplies' },
  ];

  const tabs = [
    { id: 'browse', title: 'Browse', icon: '🛍️' },
    { id: 'prescription', title: 'Prescription', icon: '📋' },
    { id: 'consultation', title: 'Consult', icon: '👨‍⚕️' },
    { id: 'orders', title: 'Orders', icon: '📦' },
  ];

  const renderBrowse = () => (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productMerchant}>{product.merchant}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
          </View>
          <View style={styles.productPrice}>
            <Text style={styles.priceText}>{product.price}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPrescription = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadText}>📷 Upload Prescription</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Recent Prescriptions</Text>
      <View style={styles.prescriptionItem}>
        <Text>Prescription #001 - 2024-01-15</Text>
      </View>
    </View>
  );

  const renderConsultation = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Available Doctors</Text>
      <View style={styles.doctorCard}>
        <Text style={styles.doctorName}>Dr. Kwak - General Medicine</Text>
        <TouchableOpacity style={styles.consultButton}>
          <Text style={styles.consultButtonText}>Consult Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrders = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Your Orders</Text>
      <View style={styles.orderCard}>
        <Text style={styles.orderTitle}>Order #12345</Text>
        <Text style={styles.orderStatus}>Status: In Transit</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'browse': return renderBrowse();
      case 'prescription': return renderPrescription();
      case 'consultation': return renderConsultation();
      case 'orders': return renderOrders();
      default: return renderBrowse();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer Dashboard</Text>
      
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
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#4F46E5' },
  tabIcon: { fontSize: 16, marginBottom: 4 },
  tabText: { fontSize: 12, color: '#64748B' },
  activeTabText: { color: '#4F46E5', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  searchInput: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginBottom: 16 },
  productCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row' },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  productMerchant: { fontSize: 14, color: '#64748B', marginBottom: 2 },
  productCategory: { fontSize: 12, color: '#059669' },
  productPrice: { alignItems: 'flex-end' },
  priceText: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  addButton: { backgroundColor: '#4F46E5', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 6 },
  addButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  tabContent: { padding: 16 },
  uploadButton: { backgroundColor: '#4F46E5', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  uploadText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#1E293B' },
  prescriptionItem: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginBottom: 8 },
  doctorCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 },
  doctorName: { fontSize: 16, marginBottom: 8 },
  consultButton: { backgroundColor: '#059669', padding: 8, borderRadius: 6, alignSelf: 'flex-start' },
  consultButtonText: { color: 'white', fontSize: 14 },
  orderCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12 },
  orderTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  orderStatus: { fontSize: 14, color: '#059669' },
});