import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Typography, 
  Table, 
  Tag, 
  Progress, 
  List, 
  Avatar,
  Space,
  Button,
  DatePicker,
  Select
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  FileTextOutlined,
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data based on user role
      const mockData = {
        stats: {
          totalStudents: user?.role === 'admin' ? 1247 : 89,
          activeApplications: user?.role === 'admin' ? 324 : 23,
          universities: user?.role === 'admin' ? 156 : 45,
          successRate: user?.role === 'admin' ? 87 : 92,
        },
        recentStudents: [
          { id: 1, name: 'Arjun Patel', country: 'Canada', status: 'Applied', counselor: 'Sarah Johnson', avatar: 'A' },
          { id: 2, name: 'Priya Sharma', country: 'Australia', status: 'Visa Approved', counselor: 'Mike Chen', avatar: 'P' },
          { id: 3, name: 'Rahul Kumar', country: 'UK', status: 'Enrolled', counselor: 'Sarah Johnson', avatar: 'R' },
          { id: 4, name: 'Sneha Gupta', country: 'USA', status: 'Document Review', counselor: 'Lisa Wang', avatar: 'S' },
          { id: 5, name: 'Vikram Singh', country: 'Germany', status: 'Applied', counselor: 'John Smith', avatar: 'V' },
        ],
        applicationsByStatus: [
          { status: 'Inquiry', count: 45, color: '#1890ff' },
          { status: 'Document Collection', count: 32, color: '#faad14' },
          { status: 'Applied', count: 28, color: '#722ed1' },
          { status: 'Visa Processing', count: 15, color: '#fa8c16' },
          { status: 'Enrolled', count: 12, color: '#52c41a' },
        ],
        topPerformers: [
          { name: 'Sarah Johnson', applications: 45, successRate: 94, avatar: 'S' },
          { name: 'Mike Chen', applications: 38, successRate: 89, avatar: 'M' },
          { name: 'Lisa Wang', applications: 34, successRate: 91, avatar: 'L' },
          { name: 'John Smith', applications: 29, successRate: 86, avatar: 'J' },
        ],
        activities: [
          { action: 'New student inquiry', student: 'Amit Verma', time: '2 minutes ago', type: 'inquiry' },
          { action: 'Visa approved', student: 'Riya Patel', time: '15 minutes ago', type: 'success' },
          { action: 'Document uploaded', student: 'Karan Shah', time: '1 hour ago', type: 'document' },
          { action: 'Application submitted', student: 'Neha Gupta', time: '2 hours ago', type: 'application' },
          { action: 'Interview scheduled', student: 'Rohit Kumar', time: '3 hours ago', type: 'interview' },
        ]
      };
      
      setDashboardData(mockData);
      setLoading(false);
    };

    fetchDashboardData();
  }, [user]);

  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'blue',
      'Visa Approved': 'green',
      'Enrolled': 'success',
      'Document Review': 'orange',
      'Inquiry': 'default',
    };
    return colors[status] || 'default';
  };

  const getActivityIcon = (type) => {
    const icons = {
      inquiry: <UserOutlined style={{ color: '#1890ff' }} />,
      success: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      document: <FileTextOutlined style={{ color: '#faad14' }} />,
      application: <FileTextOutlined style={{ color: '#722ed1' }} />,
      interview: <ClockCircleOutlined style={{ color: '#fa8c16' }} />,
    };
    return icons[type] || <UserOutlined />;
  };

  const studentColumns = [
    {
      title: 'Student',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1976d2' }}>{record.avatar}</Avatar>
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Destination',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: 'Counselor',
      dataIndex: 'counselor',
      key: 'counselor',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Dashboard
          </Title>
          <Text type="secondary">
            Welcome back, {user?.name || user?.email}! Here's what's happening with your consultancy.
          </Text>
        </div>
        <Space>
          <RangePicker />
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">All Data</Option>
            <Option value="month">This Month</Option>
            <Option value="quarter">This Quarter</Option>
          </Select>
        </Space>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={dashboardData.stats?.totalStudents || 0}
              prefix={<UserOutlined style={{ color: '#1976d2' }} />}
              suffix={
                <span style={{ fontSize: '12px', color: '#52c41a' }}>
                  <RiseOutlined /> +12%
                </span>
              }
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Applications"
              value={dashboardData.stats?.activeApplications || 0}
              prefix={<FileTextOutlined style={{ color: '#722ed1' }} />}
              suffix={
                <span style={{ fontSize: '12px', color: '#52c41a' }}>
                  <RiseOutlined /> +8%
                </span>
              }
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Partner Universities"
              value={dashboardData.stats?.universities || 0}
              prefix={<BankOutlined style={{ color: '#fa8c16' }} />}
              suffix={
                <span style={{ fontSize: '12px', color: '#52c41a' }}>
                  <RiseOutlined /> +3%
                </span>
              }
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Success Rate"
              value={dashboardData.stats?.successRate || 0}
              suffix="%"
              prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Row */}
      <Row gutter={[16, 16]}>
        {/* Recent Students */}
        <Col xs={24} lg={16}>
          <Card 
            title="Recent Students" 
            extra={<Button type="link">View All</Button>}
            style={{ height: '100%' }}
          >
            <Table
              dataSource={dashboardData.recentStudents || []}
              columns={studentColumns}
              pagination={false}
              loading={loading}
              size="small"
            />
          </Card>
        </Col>

        {/* Application Status Overview */}
        <Col xs={24} lg={8}>
          <Card title="Application Status" style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(dashboardData.applicationsByStatus || []).map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>{item.status}</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Text strong>{item.count}</Text>
                    <div style={{ width: '60px' }}>
                      <Progress 
                        percent={(item.count / 45) * 100} 
                        size="small" 
                        strokeColor={item.color}
                        showInfo={false}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Performers (Admin only) */}
          {user?.role === 'admin' && (
            <Card title="Top Performers" size="small">
              <List
                dataSource={dashboardData.topPerformers || []}
                loading={loading}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar style={{ backgroundColor: '#1976d2' }}>{item.avatar}</Avatar>}
                      title={item.name}
                      description={
                        <Space>
                          <Text type="secondary">{item.applications} apps</Text>
                          <Text type="success">{item.successRate}% success</Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}
        </Col>
      </Row>

      {/* Recent Activities */}
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="Recent Activities" extra={<Button type="link">View All</Button>}>
            <List
              dataSource={dashboardData.activities || []}
              loading={loading}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={getActivityIcon(item.type)}
                    title={item.action}
                    description={
                      <Space>
                        <Text strong>{item.student}</Text>
                        <Text type="secondary">• {item.time}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
