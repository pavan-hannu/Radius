import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Typography, 
  Avatar, 
  Statistic,
  Modal,
  Form,
  Input,
  Select,
  List,
  Divider,
  Tooltip,
  DatePicker,
  Badge,
  Tabs
} from 'antd';
import {
  PlusOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  EyeOutlined,
  CommentOutlined,
  CalendarOutlined,
  TeamOutlined,
  TrophyOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const Employees = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRemarkModalVisible, setIsRemarkModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock employee data with assigned students and contact history
      const mockEmployees = [
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@studyabroad.com',
          phone: '+1 234-567-8901',
          role: 'Senior Counselor',
          department: 'Counseling',
          joinDate: '2023-01-15',
          status: 'Active',
          assignedStudents: 23,
          completedApplications: 18,
          successRate: 94,
          avatar: 'S',
          students: [
            {
              id: 1,
              name: 'Arjun Patel',
              status: 'Applied',
              lastContact: '2024-01-20',
              nextFollowUp: '2024-01-22',
              priority: 'High',
              remarks: [
                { date: '2024-01-20', time: '10:30 AM', content: 'Discussed visa documentation requirements. Student is concerned about financial proof.', type: 'Call' },
                { date: '2024-01-18', time: '2:15 PM', content: 'Sent university admission requirements. Student will submit application by Friday.', type: 'Email' },
                { date: '2024-01-15', time: '11:00 AM', content: 'Initial consultation completed. Student interested in Computer Science programs in Canada.', type: 'Meeting' }
              ]
            },
            {
              id: 2,
              name: 'Rahul Kumar',
              status: 'Enrolled',
              lastContact: '2024-01-18',
              nextFollowUp: '2024-02-01',
              priority: 'Low',
              remarks: [
                { date: '2024-01-18', time: '3:45 PM', content: 'Congratulated on successful enrollment. Provided pre-departure checklist.', type: 'Call' },
                { date: '2024-01-10', time: '9:30 AM', content: 'Visa approved! Student very excited. Discussed accommodation options.', type: 'Call' }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Mike Chen',
          email: 'mike.chen@studyabroad.com',
          phone: '+1 234-567-8902',
          role: 'Counselor',
          department: 'Counseling',
          joinDate: '2023-03-10',
          status: 'Active',
          assignedStudents: 19,
          completedApplications: 15,
          successRate: 89,
          avatar: 'M',
          students: [
            {
              id: 3,
              name: 'Priya Sharma',
              status: 'Visa Approved',
              lastContact: '2024-01-19',
              nextFollowUp: '2024-01-25',
              priority: 'Medium',
              remarks: [
                { date: '2024-01-19', time: '1:20 PM', content: 'Visa interview went well. Student confident about approval.', type: 'Call' },
                { date: '2024-01-15', time: '4:00 PM', content: 'Helped prepare for visa interview. Reviewed all documents.', type: 'Meeting' }
              ]
            }
          ]
        },
        {
          id: 3,
          name: 'Lisa Wang',
          email: 'lisa.wang@studyabroad.com',
          phone: '+1 234-567-8903',
          role: 'Junior Counselor',
          department: 'Counseling',
          joinDate: '2023-08-20',
          status: 'Active',
          assignedStudents: 15,
          completedApplications: 10,
          successRate: 87,
          avatar: 'L',
          students: [
            {
              id: 4,
              name: 'Sneha Gupta',
              status: 'Document Review',
              lastContact: '2024-01-20',
              nextFollowUp: '2024-01-21',
              priority: 'High',
              remarks: [
                { date: '2024-01-20', time: '11:15 AM', content: 'Reviewed SOP draft. Suggested improvements for personal statement section.', type: 'Email' },
                { date: '2024-01-17', time: '2:30 PM', content: 'Student submitted transcripts. Missing one recommendation letter.', type: 'Call' }
              ]
            }
          ]
        }
      ];

      setEmployees(mockEmployees);
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailModalVisible(true);
  };

  const handleAddRemark = (student) => {
    setSelectedStudent(student);
    setIsRemarkModalVisible(true);
  };

  const handleSaveRemark = (values) => {
    // In real app, this would save to backend
    console.log('Saving remark:', values);
    setIsRemarkModalVisible(false);
    setSelectedStudent(null);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'red',
      'Medium': 'orange',
      'Low': 'green'
    };
    return colors[priority] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Inquiry': 'default',
      'Document Review': 'orange',
      'Applied': 'blue',
      'Visa Approved': 'green',
      'Enrolled': 'success',
    };
    return colors[status] || 'default';
  };

  const employeeColumns = [
    {
      title: 'Employee',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1976d2' }}>{record.avatar}</Avatar>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.role}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'email',
      key: 'contact',
      render: (email, record) => (
        <div>
          <div style={{ marginBottom: '4px' }}>
            <MailOutlined style={{ marginRight: '4px', color: '#1976d2' }} />
            <Text style={{ fontSize: '12px' }}>{email}</Text>
          </div>
          <div>
            <PhoneOutlined style={{ marginRight: '4px', color: '#52c41a' }} />
            <Text style={{ fontSize: '12px' }}>{record.phone}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Assigned Students',
      dataIndex: 'assignedStudents',
      key: 'assignedStudents',
      render: (count) => (
        <Statistic 
          value={count} 
          prefix={<UserOutlined style={{ color: '#1976d2' }} />}
          valueStyle={{ fontSize: '16px' }}
        />
      ),
    },
    {
      title: 'Success Rate',
      dataIndex: 'successRate',
      key: 'successRate',
      render: (rate) => (
        <div>
          <Text strong style={{ color: '#52c41a' }}>{rate}%</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '11px' }}>Success Rate</Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="link" 
              icon={<EyeOutlined />} 
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Employee">
            <Button type="link" icon={<EditOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Employee Management
          </Title>
          <Text type="secondary">
            Manage your team members, assign students, and track performance
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalVisible(true)}>
          Add Employee
        </Button>
      </div>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Total Employees"
              value={employees.length}
              prefix={<TeamOutlined style={{ color: '#1976d2' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Active Counselors"
              value={employees.filter(e => e.status === 'Active').length}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Avg Success Rate"
              value={Math.round(employees.reduce((acc, e) => acc + e.successRate, 0) / employees.length)}
              suffix="%"
              valueStyle={{ color: '#1976d2' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={employees.reduce((acc, e) => acc + e.assignedStudents, 0)}
              prefix={<UserOutlined style={{ color: '#722ed1' }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Employees Table */}
      <Card title="Employee List">
        <Table
          columns={employeeColumns}
          dataSource={employees}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>

      {/* Employee Detail Modal */}
      <Modal
        title={`${selectedEmployee?.name} - Student Assignments`}
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={900}
      >
        {selectedEmployee && (
          <div>
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col span={8}>
                <Card size="small">
                  <Statistic
                    title="Assigned Students"
                    value={selectedEmployee.assignedStudents}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic
                    title="Completed Applications"
                    value={selectedEmployee.completedApplications}
                    prefix={<TrophyOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small">
                  <Statistic
                    title="Success Rate"
                    value={selectedEmployee.successRate}
                    suffix="%"
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
            </Row>

            <Title level={4}>Assigned Students & Contact History</Title>
            
            {selectedEmployee.students?.map((student) => (
              <Card 
                key={student.id} 
                style={{ marginBottom: '16px' }}
                size="small"
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space>
                      <Avatar size="small">{student.name.charAt(0)}</Avatar>
                      <Text strong>{student.name}</Text>
                      <Tag color={getStatusColor(student.status)}>{student.status}</Tag>
                      <Tag color={getPriorityColor(student.priority)}>{student.priority} Priority</Tag>
                    </Space>
                    <Button 
                      type="primary" 
                      size="small" 
                      icon={<CommentOutlined />}
                      onClick={() => handleAddRemark(student)}
                    >
                      Add Remark
                    </Button>
                  </div>
                }
                extra={
                  <Space>
                    <Text type="secondary">
                      <ClockCircleOutlined /> Next: {student.nextFollowUp}
                    </Text>
                  </Space>
                }
              >
                <Tabs size="small">
                  <TabPane tab="Contact History" key="1">
                    <List
                      size="small"
                      dataSource={student.remarks}
                      renderItem={(remark) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Badge 
                                color={remark.type === 'Call' ? 'green' : remark.type === 'Email' ? 'blue' : 'orange'} 
                                text={remark.type}
                              />
                            }
                            title={
                              <Space>
                                <Text strong>{remark.date}</Text>
                                <Text type="secondary">{remark.time}</Text>
                              </Space>
                            }
                            description={remark.content}
                          />
                        </List.Item>
                      )}
                    />
                  </TabPane>
                  <TabPane tab="Follow-up Tasks" key="2">
                    <Text type="secondary">Next follow-up scheduled for {student.nextFollowUp}</Text>
                  </TabPane>
                </Tabs>
              </Card>
            ))}
          </div>
        )}
      </Modal>

      {/* Add Remark Modal */}
      <Modal
        title={`Add Remark for ${selectedStudent?.name}`}
        visible={isRemarkModalVisible}
        onCancel={() => setIsRemarkModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleSaveRemark} layout="vertical">
          <Form.Item
            name="type"
            label="Contact Type"
            rules={[{ required: true, message: 'Please select contact type' }]}
          >
            <Select placeholder="Select contact type">
              <Option value="Call">Phone Call</Option>
              <Option value="Email">Email</Option>
              <Option value="Meeting">In-Person Meeting</Option>
              <Option value="WhatsApp">WhatsApp</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="Remark/Notes"
            rules={[{ required: true, message: 'Please enter your remarks' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Enter what the student told you, concerns discussed, next steps, etc."
            />
          </Form.Item>

          <Form.Item
            name="nextFollowUp"
            label="Next Follow-up Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority Level"
          >
            <Select placeholder="Set priority level" defaultValue="Medium">
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save Remark
              </Button>
              <Button onClick={() => setIsRemarkModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Employee Modal */}
      <Modal
        title="Add New Employee"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter employee name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email', message: 'Please enter valid email' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select role' }]}
              >
                <Select>
                  <Option value="Senior Counselor">Senior Counselor</Option>
                  <Option value="Counselor">Counselor</Option>
                  <Option value="Junior Counselor">Junior Counselor</Option>
                  <Option value="Admin">Admin</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Employee
              </Button>
              <Button onClick={() => setIsAddModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employees;
