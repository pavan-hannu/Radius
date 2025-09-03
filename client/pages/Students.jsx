import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Typography,
  Avatar,
  Tooltip,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import { useMessage } from "../contexts/MessageContext";
import AddStudentModal from "../components/AddStudentModal";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Students = () => {
  const { user, hasPermission } = useAuth();
  const messageApi = useMessage();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch students
    const fetchStudents = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock student data
      const mockStudents = [
        {
          id: 1,
          name: "Arjun Patel",
          email: "arjun.patel@email.com",
          phone: "+91 9876543210",
          status: "Applied",
          destination: "Canada",
          program: "Computer Science",
          university: "University of Toronto",
          counselor: "Sarah Johnson",
          joinDate: "2024-01-15",
          lastActivity: "2024-01-20",
        },
        {
          id: 2,
          name: "Priya Sharma",
          email: "priya.sharma@email.com",
          phone: "+91 9876543211",
          status: "Visa Approved",
          destination: "Australia",
          program: "Business Administration",
          university: "University of Melbourne",
          counselor: "Mike Chen",
          joinDate: "2024-01-10",
          lastActivity: "2024-01-19",
        },
        {
          id: 3,
          name: "Rahul Kumar",
          email: "rahul.kumar@email.com",
          phone: "+91 9876543212",
          status: "Enrolled",
          destination: "UK",
          program: "Data Science",
          university: "Imperial College London",
          counselor: "Sarah Johnson",
          joinDate: "2023-12-20",
          lastActivity: "2024-01-18",
        },
        {
          id: 4,
          name: "Sneha Gupta",
          email: "sneha.gupta@email.com",
          phone: "+91 9876543213",
          status: "Document Review",
          destination: "USA",
          program: "Engineering",
          university: "MIT",
          counselor: "Lisa Wang",
          joinDate: "2024-01-12",
          lastActivity: "2024-01-20",
        },
        {
          id: 5,
          name: "Vikram Singh",
          email: "vikram.singh@email.com",
          phone: "+91 9876543214",
          status: "Inquiry",
          destination: "Germany",
          program: "Medicine",
          university: "Charité Berlin",
          counselor: "John Smith",
          joinDate: "2024-01-18",
          lastActivity: "2024-01-20",
        },
      ];

      // Filter based on user role
      const filteredData =
        user?.role === "admin"
          ? mockStudents
          : mockStudents.filter((student) => student.counselor === user?.name);

      setStudents(filteredData);
      setFilteredStudents(filteredData);
      setLoading(false);
    };

    fetchStudents();
  }, [user]);

  useEffect(() => {
    // Filter students based on search and status
    let filtered = students;

    if (searchText) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchText.toLowerCase()) ||
          student.email.toLowerCase().includes(searchText.toLowerCase()) ||
          student.destination
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          student.program.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((student) => student.status === statusFilter);
    }

    setFilteredStudents(filtered);
  }, [searchText, statusFilter, students]);

  const getStatusColor = (status) => {
    const colors = {
      Inquiry: "default",
      "Document Review": "orange",
      Applied: "blue",
      "Visa Approved": "green",
      Enrolled: "success",
    };
    return colors[status] || "default";
  };

  const columns = [
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: "#1976d2" }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              <MailOutlined /> {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Contact",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => (
        <Space>
          <PhoneOutlined style={{ color: "#1976d2" }} />
          <Text>{phone}</Text>
        </Space>
      ),
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      render: (destination, record) => (
        <div>
          <Text strong>{destination}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {record.program}
          </Text>
        </div>
      ),
    },
    {
      title: "University",
      dataIndex: "university",
      key: "university",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Counselor",
      dataIndex: "counselor",
      key: "counselor",
      render: (counselor) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: "#52c41a" }}>
            {counselor.charAt(0)}
          </Avatar>
          <Text>{counselor}</Text>
        </Space>
      ),
    },
    {
      title: "Last Activity",
      dataIndex: "lastActivity",
      key: "lastActivity",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            View
          </Button>
          <Button type="link" size="small">
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const statusCounts = {
    total: filteredStudents.length,
    inquiry: filteredStudents.filter((s) => s.status === "Inquiry").length,
    applied: filteredStudents.filter((s) => s.status === "Applied").length,
    approved: filteredStudents.filter((s) => s.status === "Visa Approved")
      .length,
    enrolled: filteredStudents.filter((s) => s.status === "Enrolled").length,
  };

  const handleAddStudent = (studentData) => {
    // In real app, this would call API to save student
    console.log("Adding new student:", studentData);
    setIsAddModalVisible(false);
    // Refresh students list
    // fetchStudents();
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Student Management
          </Title>
          <Text type="secondary">
            Manage student profiles, track applications, and monitor progress
          </Text>
        </div>
        {hasPermission("edit_students") && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setIsAddModalVisible(true)}
          >
            Add New Student
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={statusCounts.total}
              prefix={<UserOutlined style={{ color: "#1976d2" }} />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="New Inquiries"
              value={statusCounts.inquiry}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Applications"
              value={statusCounts.applied}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Enrolled"
              value={statusCounts.enrolled}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card style={{ marginBottom: "16px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search students..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: "100%" }}
              value={statusFilter}
              onChange={setStatusFilter}
              prefix={<FilterOutlined />}
            >
              <Option value="all">All Status</Option>
              <Option value="Inquiry">Inquiry</Option>
              <Option value="Document Review">Document Review</Option>
              <Option value="Applied">Applied</Option>
              <Option value="Visa Approved">Visa Approved</Option>
              <Option value="Enrolled">Enrolled</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={10}>
            <Space style={{ float: "right" }}>
              <Button icon={<ExportOutlined />}>Export</Button>
              <Button icon={<FilterOutlined />}>More Filters</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Students Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredStudents}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredStudents.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} students`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Add Student Modal */}
      <AddStudentModal
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSave={handleAddStudent}
      />
    </div>
  );
};

export default Students;
