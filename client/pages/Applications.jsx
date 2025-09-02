import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import PlaceholderPage from '../components/PlaceholderPage';

const Applications = () => {
  return (
    <PlaceholderPage
      title="Application Management"
      description="Track student applications, manage documents, monitor deadlines, and oversee the entire application workflow."
      icon={FileTextOutlined}
    />
  );
};

export default Applications;
