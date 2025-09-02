import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import PlaceholderPage from '../components/PlaceholderPage';

const Employees = () => {
  return (
    <PlaceholderPage
      title="Employee Management"
      description="Manage your team members, assign roles and permissions, track performance, and handle HR operations."
      icon={TeamOutlined}
    />
  );
};

export default Employees;
