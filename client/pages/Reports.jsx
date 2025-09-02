import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Space, 
  Typography, 
  Statistic,
  DatePicker,
  Select,
  Table,
  Progress,
  Tag,
  Tabs,
  List,
  Avatar
} from 'antd';
import {
  BarChartOutlined,
  TrophyOutlined,
  UserOutlined,
  BankOutlined,
  GlobalOutlined,
  RiseOutlined,
  FallOutlined,
  CalendarOutlined,
  DownloadOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  TeamOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

const Reports = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState({});
  const [dateRange, setDateRange] = useState('thisMonth');
  const [selectedCountry, setSelectedCountry] = useState('all');

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock report data
      const mockData = {
        overview: {
          totalStudents: 1247,
          activeApplications: 324,
          successfulPlacements: 289,
          revenue: 456789,
          averageProcessingTime: 45,
          conversionRate: 87
        },
        monthlyData: [
          { month: 'Jan', applications: 45, acceptances: 38, enrollments: 32 },
          { month: 'Feb', applications: 52, acceptances: 42, enrollments: 38 },
          { month: 'Mar', applications: 48, acceptances: 39, enrollments: 35 },
          { month: 'Apr', applications: 61, acceptances: 48, enrollments: 42 },
          { month: 'May', applications: 55, acceptances: 44, enrollments: 38 },
          { month: 'Jun', applications: 58, acceptances: 46, enrollments: 41 }
        ],
        countryWiseData: [
          { country: 'Canada', applications: 156, success: 92, revenue: 187500 },
          { country: 'Australia', applications: 98, success: 78, revenue: 156000 },
          { country: 'UK', applications: 87, success: 65, revenue: 162500 },
          { country: 'USA', applications: 45, success: 28, revenue: 140000 },
          { country: 'Germany', applications: 34, success: 26, revenue: 52000 }
        ],
        counselorPerformance: [
          { 
            name: 'Sarah Johnson', 
            students: 45, 
            applications: 123, 
            success: 94, 
            revenue: 156000,
            rating: 4.9
          },
          { 
            name: 'Mike Chen', 
            students: 38, 
            applications: 98, 
            success: 89, 
            revenue: 134000,
            rating: 4.7
          },
          { 
            name: 'Lisa Wang', 
            students: 34, 
            applications: 87, 
            success: 87, 
            revenue: 118000,
            rating: 4.6
          }
        ],
        universityPerformance: [
          { university: 'University of Toronto', sent: 45, accepted: 38, enrolled: 32, successRate: 84 },
          { university: 'University of Melbourne', sent: 38, accepted: 32, enrolled: 28, successRate: 84 },
          { university: 'Imperial College London', sent: 52, accepted: 18, enrolled: 15, successRate: 35 },
          { university: 'MIT', sent: 23, accepted: 3, enrolled: 3, successRate: 13 }
        ],
        recentActivities: [
          { action: 'New Enrollment', student: 'Amit Verma', university: 'University of Toronto', date: '2024-01-20', type: 'success' },
          { action: 'Visa Approved', student: 'Riya Patel', university: 'University of Melbourne', date: '2024-01-19', type: 'visa' },
          { action: 'Application Submitted', student: 'Karan Shah', university: 'Imperial College', date: '2024-01-18', type: 'application' },
          { action: 'Acceptance Received', student: 'Neha Gupta', university: 'University of Toronto', date: '2024-01-17', type: 'acceptance' }
        ],
        demographics: {
          ageGroups: [
            { range: '18-22', count: 345, percentage: 28 },
            { range: '23-27', count: 567, percentage: 45 },
            { range: '28-32', count: 234, percentage: 19 },
            { range: '33+', count: 101, percentage: 8 }
          ],
          programs: [
            { program: 'Computer Science', count: 234, percentage: 19 },
            { program: 'Business Administration', count: 198, percentage: 16 },
            { program: 'Engineering', count: 156, percentage: 13 },
            { program: 'Data Science', count: 134, percentage: 11 },
            { program: 'Medicine', count: 89, percentage: 7 },
            { program: 'Others', count: 436, percentage: 34 }
          ]
        }
      };
      
      setReportData(mockData);
      setLoading(false);
    };

    fetchReportData();
  }, [dateRange, selectedCountry]);

  const counselorColumns = [
    {
      title: 'Counselor',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1976d2' }}>{text.charAt(0)}</Avatar>
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
      render: (count) => <Text>{count}</Text>,
    },
    {
      title: 'Applications',
      dataIndex: 'applications',
      key: 'applications',
      render: (count) => <Text>{count}</Text>,
    },
    {
      title: 'Success Rate',
      dataIndex: 'success',
      key: 'success',
      render: (rate) => (
        <div>
          <Text strong style={{ color: rate >= 90 ? '#52c41a' : rate >= 85 ? '#1976d2' : '#faad14' }}>
            {rate}%
          </Text>
          <Progress 
            percent={rate} 
            size="small" 
            showInfo={false}
            strokeColor={rate >= 90 ? '#52c41a' : rate >= 85 ? '#1976d2' : '#faad14'}
          />
        </div>
      ),
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (amount) => <Text strong>${amount.toLocaleString()}</Text>,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Tag color={rating >= 4.8 ? 'green' : rating >= 4.5 ? 'blue' : 'orange'}>
          ⭐ {rating}
        </Tag>
      ),
    },
  ];

  const universityColumns = [
    {
      title: 'University',
      dataIndex: 'university',
      key: 'university',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Applications',
      key: 'applications',
      render: (_, record) => (
        <div>
          <Text>Sent: <strong>{record.sent}</strong></Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Accepted: {record.accepted} | Enrolled: {record.enrolled}
          </Text>
        </div>
      ),
    },
    {
      title: 'Success Rate',
      dataIndex: 'successRate',
      key: 'successRate',
      render: (rate) => (
        <div>
          <Text strong style={{ color: rate >= 70 ? '#52c41a' : rate >= 50 ? '#1976d2' : '#ff4d4f' }}>
            {rate}%
          </Text>
          <Progress 
            percent={rate} 
            size="small" 
            showInfo={false}
            strokeColor={rate >= 70 ? '#52c41a' : rate >= 50 ? '#1976d2' : '#ff4d4f'}
          />
        </div>
      ),
    },
  ];

  const getActivityIcon = (type) => {
    const icons = {
      success: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      visa: <GlobalOutlined style={{ color: '#1976d2' }} />,
      application: <ClockCircleOutlined style={{ color: '#faad14' }} />,
      acceptance: <TrophyOutlined style={{ color: '#722ed1' }} />
    };
    return icons[type] || <UserOutlined />;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Reports & Analytics
          </Title>
          <Text type="secondary">
            Comprehensive insights into your consultancy performance and metrics
          </Text>
        </div>
        <Space>
          <Button icon={<DownloadOutlined />}>Export PDF</Button>
          <Button icon={<PrinterOutlined />}>Print</Button>
          <Button type="primary" icon={<ShareAltOutlined />}>Share</Button>
        </Space>
      </div>

      {/* Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Space>
              <CalendarOutlined />
              <Text>Period:</Text>
              <Select 
                value={dateRange} 
                onChange={setDateRange}
                style={{ width: 150 }}
              >
                <Option value="thisWeek">This Week</Option>
                <Option value="thisMonth">This Month</Option>
                <Option value="lastMonth">Last Month</Option>
                <Option value="thisQuarter">This Quarter</Option>
                <Option value="thisYear">This Year</Option>
                <Option value="custom">Custom Range</Option>
              </Select>
            </Space>
          </Col>
          <Col xs={24} sm={8}>
            <Space>
              <GlobalOutlined />
              <Text>Country:</Text>
              <Select 
                value={selectedCountry} 
                onChange={setSelectedCountry}
                style={{ width: 150 }}
              >
                <Option value="all">All Countries</Option>
                <Option value="canada">Canada</Option>
                <Option value="australia">Australia</Option>
                <Option value="uk">UK</Option>
                <Option value="usa">USA</Option>
              </Select>
            </Space>
          </Col>
          <Col xs={24} sm={8}>
            <RangePicker style={{ width: '100%' }} />
          </Col>
        </Row>
      </Card>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic
              title="Total Students"
              value={reportData.overview?.totalStudents || 0}
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
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic
              title="Active Applications"
              value={reportData.overview?.activeApplications || 0}
              prefix={<BarChartOutlined style={{ color: '#722ed1' }} />}
              suffix={
                <span style={{ fontSize: '12px', color: '#52c41a' }}>
                  <RiseOutlined /> +8%
                </span>
              }
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic
              title="Successful Placements"
              value={reportData.overview?.successfulPlacements || 0}
              prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
              suffix={
                <span style={{ fontSize: '12px', color: '#52c41a' }}>
                  <RiseOutlined /> +15%
                </span>
              }
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic
              title="Revenue"
              value={reportData.overview?.revenue || 0}
              prefix={<DollarOutlined style={{ color: '#fa8c16' }} />}
              formatter={(value) => `$${value.toLocaleString()}`}
              suffix={
                <span style={{ fontSize: '12px', color: '#52c41a' }}>
                  <RiseOutlined /> +22%
                </span>
              }
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic
              title="Avg Processing Time"
              value={reportData.overview?.averageProcessingTime || 0}
              suffix="days"
              prefix={<ClockCircleOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={reportData.overview?.conversionRate || 0}
              suffix="%"
              prefix={<RiseOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      {/* Detailed Reports */}
      <Tabs defaultActiveKey="1">
        <TabPane tab="Performance Overview" key="1">
          <Row gutter={[16, 16]}>
            {/* Country-wise Performance */}
            <Col xs={24} lg={12}>
              <Card title="Country-wise Performance" loading={loading}>
                <List
                  dataSource={reportData.countryWiseData || []}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#1976d2' }}>{item.country.charAt(0)}</Avatar>}
                        title={item.country}
                        description={
                          <div>
                            <Text type="secondary">Applications: {item.applications}</Text>
                            <br />
                            <Text type="secondary">Success: {item.success} ({Math.round((item.success/item.applications)*100)}%)</Text>
                            <br />
                            <Text strong style={{ color: '#52c41a' }}>Revenue: ${item.revenue.toLocaleString()}</Text>
                          </div>
                        }
                      />
                      <Progress 
                        type="circle" 
                        percent={Math.round((item.success/item.applications)*100)} 
                        width={60}
                        strokeColor="#52c41a"
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Program Demographics */}
            <Col xs={24} lg={12}>
              <Card title="Popular Programs" loading={loading}>
                <List
                  dataSource={reportData.demographics?.programs || []}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.program}
                        description={
                          <div>
                            <Text>{item.count} students ({item.percentage}%)</Text>
                            <Progress 
                              percent={item.percentage} 
                              size="small" 
                              showInfo={false}
                              strokeColor="#1976d2"
                            />
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Team Performance" key="2">
          <Card title="Counselor Performance Metrics">
            <Table
              columns={counselorColumns}
              dataSource={reportData.counselorPerformance || []}
              loading={loading}
              pagination={false}
              size="middle"
            />
          </Card>
        </TabPane>

        <TabPane tab="University Analysis" key="3">
          <Card title="University Success Rates">
            <Table
              columns={universityColumns}
              dataSource={reportData.universityPerformance || []}
              loading={loading}
              pagination={false}
              size="middle"
            />
          </Card>
        </TabPane>

        <TabPane tab="Recent Activities" key="4">
          <Card title="Recent Activities & Milestones">
            <List
              dataSource={reportData.recentActivities || []}
              loading={loading}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={getActivityIcon(item.type)}
                    title={item.action}
                    description={
                      <Space>
                        <Text strong>{item.student}</Text>
                        <Text type="secondary">at {item.university}</Text>
                        <Text type="secondary">• {item.date}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        <TabPane tab="Demographics" key="5">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Age Demographics" loading={loading}>
                <List
                  dataSource={reportData.demographics?.ageGroups || []}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={`${item.range} years`}
                        description={
                          <div>
                            <Text>{item.count} students ({item.percentage}%)</Text>
                            <Progress 
                              percent={item.percentage} 
                              size="small" 
                              showInfo={false}
                              strokeColor="#722ed1"
                            />
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card title="Monthly Trends" loading={loading}>
                <List
                  dataSource={reportData.monthlyData || []}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.month}
                        description={
                          <Space direction="vertical" style={{ width: '100%' }}>
                            <Text type="secondary">Applications: {item.applications}</Text>
                            <Text type="secondary">Acceptances: {item.acceptances}</Text>
                            <Text type="secondary">Enrollments: {item.enrollments}</Text>
                            <Progress 
                              percent={Math.round((item.enrollments/item.applications)*100)} 
                              size="small"
                              strokeColor="#52c41a"
                            />
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Reports;
