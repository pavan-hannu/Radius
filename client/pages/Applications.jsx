import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Typography,
  Avatar,
  Tooltip,
  Statistic,
  Modal,
  Steps,
  Timeline,
  Progress,
  Upload,
  Tabs,
  List,
  Badge,
  DatePicker,
  Form,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  FileTextOutlined,
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  DownloadOutlined,
  CalendarOutlined,
  UserOutlined,
  BankOutlined,
  GlobalOutlined,
  TrophyOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import { useMessage } from "../contexts/MessageContext";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { Step } = Steps;
const { TabPane } = Tabs;
const { TextArea } = Input;

const Applications = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock application data
      const mockApplications = [
        {
          id: "APP001",
          studentName: "Arjun Patel",
          studentEmail: "arjun.patel@email.com",
          university: "University of Toronto",
          program: "Computer Science",
          level: "Master",
          country: "Canada",
          intake: "Fall 2024",
          applicationDate: "2024-01-15",
          status: "Document Review",
          priority: "High",
          counselor: "Sarah Johnson",
          currentStep: 2,
          totalSteps: 8,
          lastUpdate: "2024-01-20",
          estimatedDecision: "2024-03-15",
          applicationFee: "$125",
          timeline: [
            {
              date: "2024-01-15",
              status: "Inquiry Received",
              completed: true,
              description: "Initial consultation completed",
            },
            {
              date: "2024-01-18",
              status: "Documents Collected",
              completed: true,
              description: "All academic documents received",
            },
            {
              date: "2024-01-20",
              status: "Document Review",
              completed: false,
              description: "SOP needs revision, LOR pending",
              current: true,
            },
            {
              date: null,
              status: "Application Submission",
              completed: false,
              description: "Submit to university portal",
            },
            {
              date: null,
              status: "University Review",
              completed: false,
              description: "University processing",
            },
            {
              date: null,
              status: "Decision Received",
              completed: false,
              description: "Admission decision",
            },
            {
              date: null,
              status: "Visa Application",
              completed: false,
              description: "Apply for student visa",
            },
            {
              date: null,
              status: "Enrollment",
              completed: false,
              description: "Final enrollment confirmation",
            },
          ],
          documents: [
            {
              name: "Transcripts",
              status: "Approved",
              uploadDate: "2024-01-16",
              type: "Academic",
            },
            {
              name: "SOP",
              status: "Revision Required",
              uploadDate: "2024-01-18",
              type: "Essay",
              comments: "Needs stronger conclusion",
            },
            {
              name: "LOR 1",
              status: "Approved",
              uploadDate: "2024-01-17",
              type: "Reference",
            },
            {
              name: "LOR 2",
              status: "Pending",
              uploadDate: null,
              type: "Reference",
            },
            {
              name: "IELTS Score",
              status: "Approved",
              uploadDate: "2024-01-16",
              type: "Test Score",
            },
            {
              name: "Resume",
              status: "Approved",
              uploadDate: "2024-01-16",
              type: "Personal",
            },
          ],
          requirements: {
            gpa: "3.5/4.0",
            englishTest: "IELTS 6.5",
            workExperience: "2 years preferred",
            additionalTests: "GRE (Optional)",
          },
        },
        {
          id: "APP002",
          studentName: "Priya Sharma",
          studentEmail: "priya.sharma@email.com",
          university: "University of Melbourne",
          program: "Business Administration",
          level: "Master",
          country: "Australia",
          intake: "Semester 1 2024",
          applicationDate: "2024-01-10",
          status: "Visa Processing",
          priority: "Medium",
          counselor: "Mike Chen",
          currentStep: 6,
          totalSteps: 8,
          lastUpdate: "2024-01-19",
          estimatedDecision: "2024-02-01",
          applicationFee: "$100",
          timeline: [
            {
              date: "2024-01-10",
              status: "Inquiry Received",
              completed: true,
              description: "Initial consultation completed",
            },
            {
              date: "2024-01-12",
              status: "Documents Collected",
              completed: true,
              description: "All documents received and verified",
            },
            {
              date: "2024-01-14",
              status: "Application Submitted",
              completed: true,
              description: "Application successfully submitted",
            },
            {
              date: "2024-01-16",
              status: "University Review",
              completed: true,
              description: "Under review by admissions committee",
            },
            {
              date: "2024-01-18",
              status: "Decision Received",
              completed: true,
              description: "Conditional offer received",
            },
            {
              date: "2024-01-19",
              status: "Visa Application",
              completed: false,
              description: "Student visa application submitted",
              current: true,
            },
            {
              date: null,
              status: "Visa Approval",
              completed: false,
              description: "Awaiting visa decision",
            },
            {
              date: null,
              status: "Enrollment",
              completed: false,
              description: "Final enrollment confirmation",
            },
          ],
          documents: [
            {
              name: "All Documents",
              status: "Approved",
              uploadDate: "2024-01-12",
              type: "Complete",
            },
          ],
          requirements: {
            gpa: "3.0/4.0",
            englishTest: "IELTS 6.5",
            workExperience: "1 year minimum",
            additionalTests: "GMAT (Required)",
          },
        },
        {
          id: "APP003",
          studentName: "Rahul Kumar",
          studentEmail: "rahul.kumar@email.com",
          university: "Imperial College London",
          program: "Data Science",
          level: "Master",
          country: "UK",
          intake: "September 2024",
          applicationDate: "2023-12-20",
          status: "Enrolled",
          priority: "Low",
          counselor: "Sarah Johnson",
          currentStep: 8,
          totalSteps: 8,
          lastUpdate: "2024-01-18",
          estimatedDecision: "Completed",
          applicationFee: "$75",
          timeline: [
            {
              date: "2023-12-20",
              status: "Inquiry Received",
              completed: true,
              description: "Initial consultation completed",
            },
            {
              date: "2023-12-22",
              status: "Documents Collected",
              completed: true,
              description: "All documents collected",
            },
            {
              date: "2023-12-28",
              status: "Application Submitted",
              completed: true,
              description: "Application submitted successfully",
            },
            {
              date: "2024-01-05",
              status: "University Review",
              completed: true,
              description: "Reviewed by admissions",
            },
            {
              date: "2024-01-10",
              status: "Decision Received",
              completed: true,
              description: "Unconditional offer received",
            },
            {
              date: "2024-01-12",
              status: "Visa Application",
              completed: true,
              description: "Visa application submitted",
            },
            {
              date: "2024-01-16",
              status: "Visa Approval",
              completed: true,
              description: "Student visa approved",
            },
            {
              date: "2024-01-18",
              status: "Enrollment",
              completed: true,
              description: "Successfully enrolled",
              current: true,
            },
          ],
          documents: [
            {
              name: "All Documents",
              status: "Approved",
              uploadDate: "2023-12-22",
              type: "Complete",
            },
          ],
          requirements: {
            gpa: "3.7/4.0",
            englishTest: "IELTS 7.0",
            workExperience: "Not required",
            additionalTests: "GRE (Recommended)",
          },
        },
      ];

      // Filter based on user role
      const filteredData =
        user?.role === "admin"
          ? mockApplications
          : mockApplications.filter((app) => app.counselor === user?.name);

      setApplications(filteredData);
      setFilteredApplications(filteredData);
      setLoading(false);
    };

    fetchApplications();
  }, [user]);

  useEffect(() => {
    let filtered = applications;

    if (searchText) {
      filtered = filtered.filter(
        (app) =>
          app.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
          app.university.toLowerCase().includes(searchText.toLowerCase()) ||
          app.program.toLowerCase().includes(searchText.toLowerCase()) ||
          app.id.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [searchText, statusFilter, applications]);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsDetailModalVisible(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      "Inquiry Received": "default",
      "Document Review": "orange",
      "Application Submitted": "blue",
      "University Review": "purple",
      "Decision Received": "cyan",
      "Visa Processing": "gold",
      "Visa Approved": "green",
      Enrolled: "success",
      Rejected: "red",
      Withdrawn: "default",
    };
    return colors[status] || "default";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: "red",
      Medium: "orange",
      Low: "green",
    };
    return colors[priority] || "default";
  };

  const getDocumentStatusIcon = (status) => {
    const icons = {
      Approved: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      "Revision Required": (
        <ExclamationCircleOutlined style={{ color: "#faad14" }} />
      ),
      Pending: <ClockCircleOutlined style={{ color: "#1890ff" }} />,
      Rejected: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
    };
    return icons[status] || <ClockCircleOutlined />;
  };

  const applicationColumns = [
    {
      title: "Application ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <div>
          <Text strong style={{ color: "#1976d2" }}>
            {text}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: "11px" }}>
            {record.applicationDate}
          </Text>
        </div>
      ),
    },
    {
      title: "Student",
      dataIndex: "studentName",
      key: "student",
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: "#1976d2" }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.counselor}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "University & Program",
      key: "program",
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: "13px" }}>
            {record.university}
          </Text>
          <br />
          <Text style={{ fontSize: "12px" }}>{record.program}</Text>
          <br />
          <Space>
            <Tag color="blue" style={{ fontSize: "10px" }}>
              {record.level}
            </Tag>
            <Tag color="green" style={{ fontSize: "10px" }}>
              {record.country}
            </Tag>
          </Space>
        </div>
      ),
    },
    {
      title: "Status & Progress",
      key: "status",
      render: (_, record) => (
        <div>
          <Tag
            color={getStatusColor(record.status)}
            style={{ marginBottom: "4px" }}
          >
            {record.status}
          </Tag>
          <Progress
            percent={(record.currentStep / record.totalSteps) * 100}
            size="small"
            showInfo={false}
            strokeColor="#1976d2"
          />
          <Text type="secondary" style={{ fontSize: "11px" }}>
            Step {record.currentStep}/{record.totalSteps}
          </Text>
        </div>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>{priority}</Tag>
      ),
    },
    {
      title: "Intake",
      dataIndex: "intake",
      key: "intake",
      render: (intake, record) => (
        <div>
          <Text strong style={{ fontSize: "12px" }}>
            {intake}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: "11px" }}>
            Decision: {record.estimatedDecision}
          </Text>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
            size="small"
          >
            View Details
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small">
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const statusCounts = {
    total: filteredApplications.length,
    inProgress: filteredApplications.filter(
      (app) => !["Enrolled", "Rejected", "Withdrawn"].includes(app.status),
    ).length,
    completed: filteredApplications.filter((app) => app.status === "Enrolled")
      .length,
    pending: filteredApplications.filter((app) =>
      ["Document Review", "University Review"].includes(app.status),
    ).length,
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
            Application Tracking
          </Title>
          <Text type="secondary">
            Monitor student applications, documents, and track progress through
            the admission process
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          New Application
        </Button>
      </div>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Total Applications"
              value={statusCounts.total}
              prefix={<FileTextOutlined style={{ color: "#1976d2" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="In Progress"
              value={statusCounts.inProgress}
              valueStyle={{ color: "#faad14" }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Completed"
              value={statusCounts.completed}
              valueStyle={{ color: "#52c41a" }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Pending Review"
              value={statusCounts.pending}
              valueStyle={{ color: "#ff4d4f" }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ marginBottom: "16px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search applications..."
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
              <Option value="Document Review">Document Review</Option>
              <Option value="Application Submitted">
                Application Submitted
              </Option>
              <Option value="University Review">University Review</Option>
              <Option value="Decision Received">Decision Received</Option>
              <Option value="Visa Processing">Visa Processing</Option>
              <Option value="Enrolled">Enrolled</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={10}>
            <Space style={{ float: "right" }}>
              <Button icon={<DownloadOutlined />}>Export</Button>
              <Button icon={<CalendarOutlined />}>Schedule</Button>
              <Button icon={<FilterOutlined />}>Advanced Filters</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Applications Table */}
      <Card>
        <Table
          columns={applicationColumns}
          dataSource={filteredApplications}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredApplications.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} applications`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Application Detail Modal */}
      <Modal
        title={`Application Details - ${selectedApplication?.id}`}
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={1000}
        destroyOnClose
      >
        {selectedApplication && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Progress Timeline" key="1">
              <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                <Col span={8}>
                  <Card size="small">
                    <Statistic
                      title="Current Step"
                      value={`${selectedApplication.currentStep}/${selectedApplication.totalSteps}`}
                      prefix={<ClockCircleOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small">
                    <Statistic
                      title="Progress"
                      value={Math.round(
                        (selectedApplication.currentStep /
                          selectedApplication.totalSteps) *
                          100,
                      )}
                      suffix="%"
                      valueStyle={{ color: "#1976d2" }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small">
                    <Statistic
                      title="Days Since Application"
                      value={Math.floor(
                        (new Date() -
                          new Date(selectedApplication.applicationDate)) /
                          (1000 * 60 * 60 * 24),
                      )}
                      suffix="days"
                    />
                  </Card>
                </Col>
              </Row>

              <Timeline>
                {selectedApplication.timeline.map((step, index) => (
                  <Timeline.Item
                    key={index}
                    color={
                      step.completed ? "green" : step.current ? "blue" : "gray"
                    }
                    dot={
                      step.completed ? (
                        <CheckCircleOutlined />
                      ) : step.current ? (
                        <ClockCircleOutlined />
                      ) : null
                    }
                  >
                    <div>
                      <Text strong>{step.status}</Text>
                      {step.date && (
                        <Text type="secondary" style={{ marginLeft: "8px" }}>
                          ({step.date})
                        </Text>
                      )}
                      <br />
                      <Text type="secondary">{step.description}</Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>

            <TabPane tab="Documents" key="2">
              <List
                dataSource={selectedApplication.documents}
                renderItem={(doc) => (
                  <List.Item
                    actions={[
                      <Button type="link" icon={<DownloadOutlined />}>
                        Download
                      </Button>,
                      <Button type="link" icon={<UploadOutlined />}>
                        Replace
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={getDocumentStatusIcon(doc.status)}
                      title={
                        <Space>
                          <Text>{doc.name}</Text>
                          <Tag
                            color={
                              doc.status === "Approved"
                                ? "green"
                                : doc.status === "Revision Required"
                                  ? "orange"
                                  : "blue"
                            }
                          >
                            {doc.status}
                          </Tag>
                          <Tag color="default">{doc.type}</Tag>
                        </Space>
                      }
                      description={
                        <div>
                          {doc.uploadDate && (
                            <Text type="secondary">
                              Uploaded: {doc.uploadDate}
                            </Text>
                          )}
                          {doc.comments && (
                            <div style={{ marginTop: "4px" }}>
                              <Text type="secondary">
                                Comments: {doc.comments}
                              </Text>
                            </div>
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </TabPane>

            <TabPane tab="Requirements" key="3">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="Academic Requirements" size="small">
                    {Object.entries(selectedApplication.requirements).map(
                      ([key, value]) => (
                        <div key={key} style={{ marginBottom: "8px" }}>
                          <Text strong style={{ textTransform: "capitalize" }}>
                            {key.replace(/([A-Z])/g, " $1")}:
                          </Text>
                          <br />
                          <Text>{value}</Text>
                        </div>
                      ),
                    )}
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Application Info" size="small">
                    <Space direction="vertical">
                      <div>
                        <Text strong>University:</Text>{" "}
                        {selectedApplication.university}
                      </div>
                      <div>
                        <Text strong>Program:</Text>{" "}
                        {selectedApplication.program}
                      </div>
                      <div>
                        <Text strong>Level:</Text> {selectedApplication.level}
                      </div>
                      <div>
                        <Text strong>Intake:</Text> {selectedApplication.intake}
                      </div>
                      <div>
                        <Text strong>Application Fee:</Text>{" "}
                        {selectedApplication.applicationFee}
                      </div>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Communication Log" key="4">
              <Card size="small">
                <Text type="secondary">
                  Communication history will be shown here...
                </Text>
                <br />
                <Button type="primary" style={{ marginTop: "16px" }}>
                  Add Note
                </Button>
              </Card>
            </TabPane>
          </Tabs>
        )}
      </Modal>
    </div>
  );
};

export default Applications;
