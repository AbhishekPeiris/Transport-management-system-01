import React, { useEffect, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Input, Button, Space, Table, Drawer, Form, Row, Col, Select, message, Popconfirm } from 'antd';
import { Icon } from "@iconify/react";
import '../styles/table.css';
import axios from "axios";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const { Option } = Select;

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
  header: {
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0c883d'
  },
  logo: {
    width: 100,
    height: 50,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000'
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    backgroundColor: '#FFFFFF',
  },
  tableHeader: {
    backgroundColor: '#e7ffe7',
    color: '#FFFFFF',
  },
  tableCol: {
    width: "100px",
    borderStyle: "solid",
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    color: '#333333',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#888888',
    fontSize: 10,
  },
});

// Define the PDF Document component
const MyDocument = ({ employees }) => (
  <Document>
    <Page size="A3" style={styles.page}>
      <View style={styles.section}>
        <Text>Employee List</Text>
        <View style={styles.table}>
          {/* Table header */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>DOB</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Address</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Gender</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Contact</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Email</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Role</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Status</Text>
            </View>
          </View>
          {/* Table body */}
          {employees.map((employee) => (
            <View style={styles.tableRow} key={employee._id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{`${employee.firstname} ${employee.lastname}`}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{employee.dob}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{employee.address}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{employee.gender}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{employee.contact}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{employee.email}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{employee.role}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{employee.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

function Employee() {
  const [messageApi, contextHolder] = message.useMessage();
  
  // Read
  const [employees, setEmployees] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  
  // Create
  const [openAddEmployee, setOpenEmployee] = useState(false);
  const [form] = Form.useForm();

  // Read
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/employee/getemployee");
      const employeesWithKeys = response.data.employee.map(employee => ({
        ...employee,
        key: employee._id,
      }));
      setEmployees(employeesWithKeys);
    } catch (error) {
      console.error("Error fetching employees:", error);
      messageApi.error('Failed to fetch employees');
    }
  };

  // Create
  const addSuccess = () => {
    messageApi.success('Employee added successfully!');
    fetchEmployees();
  };

  const addError = () => {
    messageApi.error('Failed to add employee. Please try again.');
  };

  const showDrawer = () => {
    setOpenEmployee(true);
  };

  const onClose = () => {
    setOpenEmployee(false);
    form.resetFields();
  };

  async function addNewEmployee() {
    try {
      const values = await form.validateFields();
      const response = await axios.post('http://localhost:5000/api/employee/register', values);

      if (response.status === 200) {
        addSuccess();
        onClose();
      }
    } catch (error) {
      if (error.errorFields) {
        messageApi.warning('Please fill in all required fields correctly.');
      } else {
        console.error(error);
        addError();
      }
    }
  }


  // Delete
  async function deleteEmployee(id) {
    try {
      const response = await axios.delete(`http://localhost:5000/api/employee/deleteemloyee/${id}`);
      messageApi.success('Employee deleted successfully!');
      setEmployees((prevEmployees) => prevEmployees.filter(employees => employees._id !== id));
    } catch (error) {
      console.log(error);
      messageApi.error('Failed to delete employee. Please try again.');
    }
  }
  
// Table
  const columns = [
    {
      title: 'Employee ID',
      dataIndex: '_id',
      key: '_id',
      className: 'px-4',
    },
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      key: 'firstname',
      className: 'px-4',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
      className: 'px-4',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      className: 'px-4',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      className: 'px-4',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      className: 'px-4',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      className: 'px-4',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'px-4',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'px-4',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      className: 'px-4',
    },

    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size="large" className='bg-[#379237] text-white'>Update</Button>
          <Popconfirm
            title="Delete the crop"
            description="Are you sure to delete this crop?"
            onConfirm={() => deleteEmployee(record._id)}
            onCancel={() => messageApi.info('Cancelled')}
            okText="Yes"
            cancelText="No"
          >
            <Button size="large" className='text-white bg-red-600'>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="flex justify-between items-center h-[74px] bg-white rounded-[11px] m-[15px] px-[15px]">
        <div className="text-slate-900 text-xl font-semibold font-['Poppins']">Employees</div>
        <Space>

          {/* PDF */}
          <PDFDownloadLink
            document={<MyDocument employees={employees} />}
            fileName="employees.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                'Loading document...'
              ) : (
                <Button type="primary" icon={<DownloadOutlined />} className="bg-[#bfbfbf]" size="large">
                  Download PDF
                </Button>
              )
            }
          </PDFDownloadLink>

          {/* Create */}
          <Button
            type="primary"
            icon={<Icon icon="ic:baseline-plus" />}
            className="bg-[black] font-['Poppins']"
            onClick={showDrawer}
            size="large"
          >
            Add New Employee
          </Button>
        </Space>
      </div>

      <div className="p-4 m-4 bg-white rounded-xl">
        <Table
          columns={columns}
          dataSource={employees}
          scroll={{ x: 1000 }}
          pagination={{ pageSize: 10 }}
        />
      </div>

      {/* Create */}
      <Drawer
        title="Add Employee"
        width={720}
        onClose={onClose}
        open={openAddEmployee}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={addNewEmployee} type="primary" className='bg-[black]'>
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstname"
                label="First name"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastname"
                label="Last name"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Date of birth"
                rules={[{ required: true, message: 'Please enter date of birth' }]}
              >
                <Input placeholder="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select gender' }]}
              >
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter address" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contact"
                label="Contact"
                rules={[{ required: true, message: 'Please enter contact number' }]}
              >
                <Input placeholder="Enter contact number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter password' }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                  <Option value="Suspended">Suspended</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select role' }]}
          >
            <Select placeholder="Select role">
              <Option value="Driver">Driver</Option>
              <Option value="Admin">Admin</Option>
              <Option value="Supervisor">Supervisor</Option>
              <Option value="Mechanic">Mechanic</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default Employee;