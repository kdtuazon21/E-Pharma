import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RoleSelector from '../components/RoleSelector';
import UserDashboard from '../components/UserDashboard';
import MerchantDashboard from '../components/MerchantDashboard';
import DriverDashboard from '../components/DriverDashboard';
import AdminDashboard from '../components/AdminDashboard';

export default function Index() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const renderDashboard = () => {
    switch (selectedRole) {
      case 'user':
        return <UserDashboard />;
      case 'merchant':
        return <MerchantDashboard />;
      case 'driver':
        return <DriverDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <RoleSelector onRoleSelect={handleRoleSelect} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderDashboard()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});