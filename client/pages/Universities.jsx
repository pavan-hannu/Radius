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
  Form,
  Rate,
  Divider,
  List,
  Progress,
  Image,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  BankOutlined,
  GlobalOutlined,
  StarOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  TrophyOutlined,
  TeamOutlined,
  DollarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

const Universities = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock university data
      const mockUniversities = [
        {
          id: 1,
          name: "University of Toronto",
          country: "Canada",
          city: "Toronto",
          ranking: 21,
          worldRanking: 34,
          website: "www.utoronto.ca",
          type: "Public",
          establishedYear: 1827,
          rating: 4.8,
          tuitionFeeRange: "$45,000 - $65,000",
          applicationFee: "$125",
          logo: "https://via.placeholder.com/60x60/1976d2/white?text=UT",
          totalStudents: 91286,
          internationalStudents: 23000,
          acceptanceRate: 43,
          programs: [
            {
              name: "Computer Science",
              level: "Bachelor",
              duration: "4 years",
              fee: "$58,160",
            },
            {
              name: "Business Administration",
              level: "Master",
              duration: "2 years",
              fee: "$59,290",
            },
            {
              name: "Engineering",
              level: "Bachelor",
              duration: "4 years",
              fee: "$59,290",
            },
            {
              name: "Medicine",
              level: "Doctorate",
              duration: "4 years",
              fee: "$23,530",
            },
          ],
          requirements: {
            englishTests: ["IELTS: 6.5", "TOEFL: 89", "PTE: 65"],
            academicRequirements: [
              "High school diploma with 75%+ average",
              "SAT/ACT scores (for US students)",
            ],
            documents: [
              "Transcripts",
              "SOP",
              "LORs",
              "Resume",
              "Portfolio (for specific programs)",
            ],
          },
          applicationDeadlines: {
            fall: "January 15",
            winter: "September 1",
            summer: "February 1",
          },
          partnerships: "Direct Partnership",
          applicationsSent: 45,
          acceptances: 32,
          enrollments: 28,
        },
        {
          id: 2,
          name: "University of Melbourne",
          country: "Australia",
          city: "Melbourne",
          ranking: 14,
          worldRanking: 37,
          website: "www.unimelb.edu.au",
          type: "Public",
          establishedYear: 1853,
          rating: 4.7,
          tuitionFeeRange: "$32,000 - $48,000",
          applicationFee: "$100",
          logo: "https://via.placeholder.com/60x60/003f7f/white?text=UM",
          totalStudents: 51348,
          internationalStudents: 18500,
          acceptanceRate: 70,
          programs: [
            {
              name: "Data Science",
              level: "Master",
              duration: "2 years",
              fee: "$44,736",
            },
            {
              name: "Business Administration",
              level: "Bachelor",
              duration: "3 years",
              fee: "$43,008",
            },
            {
              name: "Engineering",
              level: "Master",
              duration: "2 years",
              fee: "$45,824",
            },
          ],
          requirements: {
            englishTests: ["IELTS: 6.5", "TOEFL: 79", "PTE: 58"],
            academicRequirements: ["Bachelor degree with 65%+ average"],
            documents: ["Transcripts", "SOP", "CV", "English test scores"],
          },
          applicationDeadlines: {
            semester1: "December 31",
            semester2: "May 31",
          },
          partnerships: "Preferred Partner",
          applicationsSent: 38,
          acceptances: 25,
          enrollments: 22,
        },
        {
          id: 3,
          name: "Imperial College London",
          country: "UK",
          city: "London",
          ranking: 3,
          worldRanking: 8,
          website: "www.imperial.ac.uk",
          type: "Public",
          establishedYear: 1907,
          rating: 4.9,
          tuitionFeeRange: "$35,000 - $55,000",
          applicationFee: "$75",
          logo: "https://via.placeholder.com/60x60/003e74/white?text=IC",
          totalStudents: 19945,
          internationalStudents: 12000,
          acceptanceRate: 11,
          programs: [
            {
              name: "Artificial Intelligence",
              level: "Master",
              duration: "1 year",
              fee: "$35,900",
            },
            {
              name: "Mechanical Engineering",
              level: "Bachelor",
              duration: "3 years",
              fee: "$35,100",
            },
            {
              name: "Finance",
              level: "Master",
              duration: "1 year",
              fee: "$32,000",
            },
          ],
          requirements: {
            englishTests: ["IELTS: 7.0", "TOEFL: 100", "PTE: 69"],
            academicRequirements: ["First class honors degree or equivalent"],
            documents: [
              "Transcripts",
              "Personal Statement",
              "2 References",
              "CV",
            ],
          },
          applicationDeadlines: {
            september: "July 1",
            january: "October 1",
          },
          partnerships: "Premium Partner",
          applicationsSent: 52,
          acceptances: 18,
          enrollments: 15,
        },
        {
          id: 4,
          name: "MIT",
          country: "USA",
          city: "Cambridge",
          ranking: 1,
          worldRanking: 1,
          website: "www.mit.edu",
          type: "Private",
          establishedYear: 1861,
          rating: 5.0,
          tuitionFeeRange: "$55,000 - $75,000",
          applicationFee: "$75",
          logo: "https://via.placeholder.com/60x60/8b0000/white?text=MIT",
          totalStudents: 11934,
          internationalStudents: 3500,
          acceptanceRate: 4,
          programs: [
            {
              name: "Computer Science",
              level: "Master",
              duration: "2 years",
              fee: "$57,590",
            },
            {
              name: "Electrical Engineering",
              level: "Bachelor",
              duration: "4 years",
              fee: "$57,590",
            },
            {
              name: "Business Analytics",
              level: "Master",
              duration: "1 year",
              fee: "$80,000",
            },
          ],
          requirements: {
            englishTests: ["IELTS: 7.5", "TOEFL: 110", "PTE: 75"],
            academicRequirements: [
              "Exceptional academic record",
              "GRE/GMAT scores",
            ],
            documents: ["Transcripts", "SOP", "3 LORs", "Resume", "Portfolio"],
          },
          applicationDeadlines: {
            fall: "December 15",
            spring: "October 1",
          },
          partnerships: "Direct Partnership",
          applicationsSent: 23,
          acceptances: 3,
          enrollments: 3,
        },
      ];

      setUniversities(mockUniversities);
      setFilteredUniversities(mockUniversities);
      setLoading(false);
    };

    fetchUniversities();
  }, []);

  useEffect(() => {
    let filtered = universities;

    if (searchText) {
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchText.toLowerCase()) ||
          uni.city.toLowerCase().includes(searchText.toLowerCase()) ||
          uni.country.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (countryFilter !== "all") {
      filtered = filtered.filter((uni) => uni.country === countryFilter);
    }

    setFilteredUniversities(filtered);
  }, [searchText, countryFilter, universities]);

  const handleViewDetails = (university) => {
    setSelectedUniversity(university);
    setIsDetailModalVisible(true);
  };

  const getPartnershipColor = (partnership) => {
    const colors = {
      "Direct Partnership": "green",
      "Premium Partner": "gold",
      "Preferred Partner": "blue",
      Standard: "default",
    };
    return colors[partnership] || "default";
  };

  const universityColumns = [
    {
      title: "University",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar
            size={50}
            src={record.logo}
            style={{ backgroundColor: "#1976d2" }}
          >
            {text.charAt(0)}
          </Avatar>
          <div>
            <Text strong style={{ fontSize: "14px" }}>
              {text}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              <GlobalOutlined /> {record.city}, {record.country}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: "11px" }}>
              World Rank: #{record.worldRanking}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Rating & Ranking",
      key: "rating",
      render: (_, record) => (
        <div>
          <Rate
            disabled
            defaultValue={record.rating}
            style={{ fontSize: "14px" }}
          />
          <br />
          <Text strong style={{ fontSize: "12px", color: "#1976d2" }}>
            #{record.ranking} in {record.country}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: "11px" }}>
            {record.type} • Est. {record.establishedYear}
          </Text>
        </div>
      ),
    },
    {
      title: "Students & Acceptance",
      key: "students",
      render: (_, record) => (
        <div>
          <Text style={{ fontSize: "12px", display: "block" }}>
            <TeamOutlined /> {record.totalStudents.toLocaleString()} total
          </Text>
          <Text
            style={{ fontSize: "12px", display: "block", color: "#52c41a" }}
          >
            {record.internationalStudents.toLocaleString()} international
          </Text>
          <Text
            style={{
              fontSize: "12px",
              display: "block",
              color: record.acceptanceRate < 20 ? "#ff4d4f" : "#1976d2",
            }}
          >
            {record.acceptanceRate}% acceptance rate
          </Text>
        </div>
      ),
    },
    {
      title: "Our Performance",
      key: "performance",
      render: (_, record) => (
        <div>
          <Text style={{ fontSize: "12px", display: "block" }}>
            Sent: {record.applicationsSent}
          </Text>
          <Text
            style={{ fontSize: "12px", display: "block", color: "#52c41a" }}
          >
            Accepted: {record.acceptances}
          </Text>
          <Text
            style={{ fontSize: "12px", display: "block", color: "#1976d2" }}
          >
            Enrolled: {record.enrollments}
          </Text>
          <Text style={{ fontSize: "11px", color: "#666" }}>
            Success:{" "}
            {Math.round((record.acceptances / record.applicationsSent) * 100)}%
          </Text>
        </div>
      ),
    },
    {
      title: "Partnership",
      dataIndex: "partnerships",
      key: "partnerships",
      render: (partnership) => (
        <Tag color={getPartnershipColor(partnership)}>{partnership}</Tag>
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
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const countries = [...new Set(universities.map((uni) => uni.country))];

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
            University Management
          </Title>
          <Text type="secondary">
            Manage partner universities, programs, and track application
            performance
          </Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalVisible(true)}
        >
          Add University
        </Button>
      </div>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Total Universities"
              value={filteredUniversities.length}
              prefix={<BankOutlined style={{ color: "#1976d2" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Countries"
              value={countries.length}
              prefix={<GlobalOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Total Applications"
              value={universities.reduce(
                (acc, uni) => acc + uni.applicationsSent,
                0,
              )}
              valueStyle={{ color: "#1976d2" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Success Rate"
              value={Math.round(
                (universities.reduce((acc, uni) => acc + uni.acceptances, 0) /
                  universities.reduce(
                    (acc, uni) => acc + uni.applicationsSent,
                    0,
                  )) *
                  100,
              )}
              suffix="%"
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ marginBottom: "16px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search universities..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: "100%" }}
              value={countryFilter}
              onChange={setCountryFilter}
              prefix={<FilterOutlined />}
            >
              <Option value="all">All Countries</Option>
              {countries.map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))}
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

      {/* Universities Table */}
      <Card>
        <Table
          columns={universityColumns}
          dataSource={filteredUniversities}
          loading={loading}
          rowKey="id"
          pagination={{
            total: filteredUniversities.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} universities`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* University Detail Modal */}
      <Modal
        title={selectedUniversity?.name}
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={1000}
      >
        {selectedUniversity && (
          <div>
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="World Ranking"
                    value={selectedUniversity.worldRanking}
                    prefix="#"
                    valueStyle={{ color: "#1976d2" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="Acceptance Rate"
                    value={selectedUniversity.acceptanceRate}
                    suffix="%"
                    valueStyle={{
                      color:
                        selectedUniversity.acceptanceRate < 20
                          ? "#ff4d4f"
                          : "#52c41a",
                    }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="Total Students"
                    value={selectedUniversity.totalStudents}
                    formatter={(value) => value.toLocaleString()}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card size="small">
                  <Statistic
                    title="International %"
                    value={Math.round(
                      (selectedUniversity.internationalStudents /
                        selectedUniversity.totalStudents) *
                        100,
                    )}
                    suffix="%"
                    valueStyle={{ color: "#722ed1" }}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Popular Programs" size="small">
                  <List
                    size="small"
                    dataSource={selectedUniversity.programs}
                    renderItem={(program) => (
                      <List.Item>
                        <List.Item.Meta
                          title={`${program.name} (${program.level})`}
                          description={
                            <Space>
                              <Text type="secondary">{program.duration}</Text>
                              <Text strong style={{ color: "#1976d2" }}>
                                {program.fee}
                              </Text>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Requirements" size="small">
                  <div style={{ marginBottom: "12px" }}>
                    <Text strong>English Tests:</Text>
                    <br />
                    {selectedUniversity.requirements.englishTests.map(
                      (test, index) => (
                        <Tag key={index} style={{ margin: "2px" }}>
                          {test}
                        </Tag>
                      ),
                    )}
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <Text strong>Academic:</Text>
                    <br />
                    {selectedUniversity.requirements.academicRequirements.map(
                      (req, index) => (
                        <Text
                          key={index}
                          type="secondary"
                          style={{ display: "block", fontSize: "12px" }}
                        >
                          • {req}
                        </Text>
                      ),
                    )}
                  </div>

                  <div>
                    <Text strong>Documents:</Text>
                    <br />
                    {selectedUniversity.requirements.documents.map(
                      (doc, index) => (
                        <Tag key={index} color="blue" style={{ margin: "2px" }}>
                          {doc}
                        </Tag>
                      ),
                    )}
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={12}>
                <Card title="Application Deadlines" size="small">
                  {Object.entries(selectedUniversity.applicationDeadlines).map(
                    ([term, deadline]) => (
                      <div key={term} style={{ marginBottom: "8px" }}>
                        <Text strong style={{ textTransform: "capitalize" }}>
                          {term}:
                        </Text>
                        <Text style={{ marginLeft: "8px", color: "#1976d2" }}>
                          {deadline}
                        </Text>
                      </div>
                    ),
                  )}
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Our Performance" size="small">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Statistic
                        title="Sent"
                        value={selectedUniversity.applicationsSent}
                        valueStyle={{ fontSize: "20px" }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Accepted"
                        value={selectedUniversity.acceptances}
                        valueStyle={{ fontSize: "20px", color: "#52c41a" }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Enrolled"
                        value={selectedUniversity.enrollments}
                        valueStyle={{ fontSize: "20px", color: "#1976d2" }}
                      />
                    </Col>
                  </Row>
                  <Progress
                    percent={Math.round(
                      (selectedUniversity.acceptances /
                        selectedUniversity.applicationsSent) *
                        100,
                    )}
                    status="active"
                    strokeColor="#52c41a"
                    style={{ marginTop: "16px" }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Universities;
