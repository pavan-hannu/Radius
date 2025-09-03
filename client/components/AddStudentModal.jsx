import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Row,
  Col,
  Upload,
  Steps,
  Typography,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useMessage } from "../contexts/MessageContext";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Step } = Steps;

const AddStudentModal = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const messageApi = useMessage();

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Student added successfully!");
      form.resetFields();
      setCurrentStep(0);
      onSave(values);
    } catch (error) {
      message.error("Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setCurrentStep(0);
    onCancel();
  };

  const steps = [
    {
      title: "Personal Info",
      content: (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter valid email" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="student@email.com"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="+91 9876543210" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please select date of birth" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Select DOB" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select Gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="address"
              label="Current Address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <TextArea rows={2} placeholder="Enter complete address" />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      title: "Academic Info",
      content: (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="currentEducation"
              label="Current Education Level"
              rules={[
                { required: true, message: "Please select education level" },
              ]}
            >
              <Select placeholder="Select Education Level">
                <Option value="12th">12th Grade</Option>
                <Option value="diploma">Diploma</Option>
                <Option value="bachelor">Bachelor's Degree</Option>
                <Option value="master">Master's Degree</Option>
                <Option value="phd">PhD</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="fieldOfStudy"
              label="Field of Study"
              rules={[
                { required: true, message: "Please enter field of study" },
              ]}
            >
              <Input placeholder="e.g., Computer Science, Engineering" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="institution"
              label="Current Institution"
              rules={[
                { required: true, message: "Please enter institution name" },
              ]}
            >
              <Input placeholder="School/College/University Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gpa"
              label="GPA/Percentage"
              rules={[
                { required: true, message: "Please enter GPA/Percentage" },
              ]}
            >
              <Input placeholder="e.g., 8.5 CGPA or 85%" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="graduationYear"
              label="Expected Graduation"
              rules={[
                { required: true, message: "Please select graduation year" },
              ]}
            >
              <DatePicker
                picker="year"
                style={{ width: "100%" }}
                placeholder="Select Year"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="englishProficiency" label="English Test Score">
              <Select placeholder="Select English Test">
                <Option value="ielts">IELTS</Option>
                <Option value="toefl">TOEFL</Option>
                <Option value="pte">PTE</Option>
                <Option value="duolingo">Duolingo</Option>
                <Option value="none">Not Taken Yet</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="testScore" label="Test Score (if applicable)">
              <Input placeholder="e.g., IELTS: 7.5, TOEFL: 95" />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      title: "Study Abroad Plans",
      content: (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="preferredCountry"
              label="Preferred Country"
              rules={[
                { required: true, message: "Please select preferred country" },
              ]}
            >
              <Select placeholder="Select Country">
                <Option value="canada">Canada</Option>
                <Option value="usa">United States</Option>
                <Option value="uk">United Kingdom</Option>
                <Option value="australia">Australia</Option>
                <Option value="germany">Germany</Option>
                <Option value="ireland">Ireland</Option>
                <Option value="newzealand">New Zealand</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="intendedProgram"
              label="Intended Program"
              rules={[
                { required: true, message: "Please select intended program" },
              ]}
            >
              <Select placeholder="Select Program Level">
                <Option value="bachelor">Bachelor's Degree</Option>
                <Option value="master">Master's Degree</Option>
                <Option value="phd">PhD</Option>
                <Option value="diploma">Diploma/Certificate</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="preferredField"
              label="Preferred Field of Study"
              rules={[
                { required: true, message: "Please enter preferred field" },
              ]}
            >
              <Input placeholder="e.g., Computer Science, Business" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="intakeYear"
              label="Intended Intake"
              rules={[{ required: true, message: "Please select intake year" }]}
            >
              <Select placeholder="Select Intake">
                <Option value="2024-fall">Fall 2024</Option>
                <Option value="2025-spring">Spring 2025</Option>
                <Option value="2025-fall">Fall 2025</Option>
                <Option value="2026-spring">Spring 2026</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="budget" label="Budget (Annual)">
              <Select placeholder="Select Budget Range">
                <Option value="10-20">$10,000 - $20,000</Option>
                <Option value="20-30">$20,000 - $30,000</Option>
                <Option value="30-50">$30,000 - $50,000</Option>
                <Option value="50+">$50,000+</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="assignedCounselor"
              label="Assign Counselor"
              rules={[{ required: true, message: "Please assign a counselor" }]}
            >
              <Select placeholder="Select Counselor">
                <Option value="sarah">Sarah Johnson</Option>
                <Option value="mike">Mike Chen</Option>
                <Option value="lisa">Lisa Wang</Option>
                <Option value="john">John Smith</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="additionalNotes" label="Additional Notes">
              <TextArea
                rows={3}
                placeholder="Any specific requirements, concerns, or additional information..."
              />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Modal
      title={
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={{ margin: 0, color: "#1976d2" }}>
            Add New Student
          </Title>
          <Text type="secondary">
            Complete the form to register a new student
          </Text>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
      <div style={{ marginBottom: "24px" }}>
        <Steps current={currentStep} size="small">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: "24px" }}
      >
        <div style={{ minHeight: "400px" }}>{steps[currentStep].content}</div>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Space>
            {currentStep > 0 && (
              <Button icon={<ArrowLeftOutlined />} onClick={handlePrevious}>
                Previous
              </Button>
            )}

            {currentStep < steps.length - 1 ? (
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
              >
                Add Student
              </Button>
            )}

            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default AddStudentModal;
