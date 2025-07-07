import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const products = [
    { id: 1, name: 'Paracetamol 500mg', price: '₱5.99', stock: 150, sales: 45 },
    { id: 2, name: 'Vitamin D3', price: '₱12.99', stock: 80, sales: 23 },
    { id: 3, name: 'Cough Syrup', price: '₱8.50', stock: 25, sales: 12 },
  ];

  const orders = [
    { id: 1, customer: 'Juan Dela Cruz', items: 'Paracetamol x2', total: '₱11.98', status: 'Pending' },
    { id: 2, customer: 'Pedro Penduko', items: 'Vitamin D3 x1', total: '₱12.99', status: 'Processing' },
  ];

  const tabs = [
    { id: 'products', title: 'Products', icon: '💊' },
    { id: 'orders', title: 'Orders', icon: '📋' },
    { id: 'analytics', title: 'Analytics', icon: '📊' },
    { id: 'inventory', title: 'Inventory', icon: '📦' },
  ];

  const renderProducts = () => (
    <View>
      <View style={styles.addProductForm}>
        <Text style={styles.sectionTitle}>Add New Product</Text>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={productPrice}
          onChangeText={setProductPrice}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Your Products</Text>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDetails}>Price: {product.price} | Stock: {product.stock}</Text>
            <Text style={styles.salesInfo}>Sales: {product.sales} units</Text>
          </View>
          <View style={styles.productActions}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderOrders = () => (
    <View>
      <Text style={styles.sectionTitle}>Incoming Orders</Text>
      {orders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderCustomer}>{order.customer}</Text>
            <Text style={styles.orderItems}>{order.items}</Text>
            <Text style={styles.orderTotal}>Total: {order.total}</Text>
          </View>
          <View style={styles.orderActions}>
            <Text style={[styles.orderStatus, 
              order.status === 'Pending' ? styles.pendingStatus : styles.processingStatus]}>
              {order.status}
            </Text>
            <TouchableOpacity style={styles.processButton}>
              <Text style={styles.buttonText}>Process</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAnalytics = () => (
    <View>
      <Text style={styles.sectionTitle}>Sales Analytics</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₱2,450</Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Orders Completed</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Average Rating</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statLabel}>Products Listed</Text>
        </View>
      </View>
    </View>
  );

  const renderInventory = () => (
    <View>
      <Text style={styles.sectionTitle}>Inventory Management</Text>
      <View style={styles.alertCard}>
        <Text style={styles.alertText}>⚠️ Low Stock Alert</Text>
        <Text>Cough Syrup - Only 25 units left</Text>
      </View>
      {products.map((product) => (
        <View key={product.id} style={styles.inventoryCard}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.stockLevel}>Stock: {product.stock} units</Text>
          <TouchableOpacity style={styles.restockButton}>
            <Text style={styles.buttonText}>Restock</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'products': return renderProducts();
      case 'orders': return renderOrders();
      case 'analytics': return renderAnalytics();
      case 'inventory': return renderInventory();
      default: return renderProducts();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Merchant Dashboard</Text>
      
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
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#059669' },
  tabIcon: { fontSize: 16, marginBottom: 4 },
  tabText: { fontSize: 12, color: '#64748B' },
  activeTabText: { color: '#059669', fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#1E293B' },
  addProductForm: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 20 },
  input: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 6, marginBottom: 12 },
  addButton: { backgroundColor: '#059669', padding: 12, borderRadius: 6, alignItems: 'center' },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  productCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row' },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  productDetails: { fontSize: 14, color: '#64748B', marginBottom: 2 },
  salesInfo: { fontSize: 12, color: '#059669' },
  productActions: { justifyContent: 'center' },
  editButton: { backgroundColor: '#4F46E5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  buttonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  orderCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row' },
  orderInfo: { flex: 1 },
  orderCustomer: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  orderItems: { fontSize: 14, color: '#64748B', marginBottom: 2 },
  orderTotal: { fontSize: 14, fontWeight: 'bold', color: '#059669' },
  orderActions: { alignItems: 'flex-end' },
  orderStatus: { fontSize: 12, marginBottom: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  pendingStatus: { backgroundColor: '#FEF3C7', color: '#92400E' },
  processingStatus: { backgroundColor: '#DBEAFE', color: '#1E40AF' },
  processButton: { backgroundColor: '#059669', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  statsContainer: { flexDirection: 'row', marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 8, marginHorizontal: 4, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#059669', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#64748B', textAlign: 'center' },
  alertCard: { backgroundColor: '#FEF2F2', padding: 12, borderRadius: 8, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#DC2626' },
  alertText: { fontSize: 14, fontWeight: 'bold', color: '#DC2626', marginBottom: 4 },
  inventoryCard: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  stockLevel: { flex: 1, fontSize: 14, color: '#64748B', marginLeft: 12 },
  restockButton: { backgroundColor: '#4F46E5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
});