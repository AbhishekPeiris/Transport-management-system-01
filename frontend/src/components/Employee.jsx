import React, { useEffect, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Input, Button, Space, Table, Modal, Col, Drawer, Form, Row, Select, Checkbox, message, Popconfirm } from 'antd';
import { Icon } from "@iconify/react";
import '../styles/table.css';
import axios from "axios";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';


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
    width: "87px",
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
const MyDocument = ({ factors }) => (
  <Document>
    <Page size="A1" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Govi mithura</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Crop Factors</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>

            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Province</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>District</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Soil Type</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Soil PH</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Nutrient Content</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Temperature (°C)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Rainfall (mm)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Humidity (%)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Topography</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Irrigation Systems</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Water Quality</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Variety Selection</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Growth Cycle</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Pest Pressure</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Disease Incidence</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Crop Rotation</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fertilizer Use</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Demand and Price Trends</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Supply Chain Efficiency</Text>
            </View>
          </View>
          {factors.map((factor, index) => (
            <View style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#F9F9F9' : '#FFFFFF' }]} key={factor._id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.province}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.district}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.soiltype}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.soilph}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.nutrientcontent}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.temperature}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.rainfall}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.humidity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.altitude}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.topography}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.irrigationsystems}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.waterquality}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.varietyselection}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.growthcycle}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.pestpressure}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.diseaseincidence}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.croprotation}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.fertilizeruse}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.demandandpricetrends}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{factor.supplychainefficiency}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.footer}>Generated on {new Date().toLocaleDateString()}</Text>
    </Page>
  </Document>
);

function Employee() {

  const [size, setSize] = useState('large');
  const [messageApi, contextHolder] = message.useMessage();

// read
  const [employees, setEmployees] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([])

// create update
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');

  const [openAddEmployee, setOpenEmployee] = useState(false);


// table
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
          <Icon icon="uil:setting"
            onClick={() => updateShowDrawer(record)}
            style={{
              fontSize: '20px',
              color: "#bfbfbf"
            }}
          />
        </Space>
      ),
    },
  ];

  // read
  useEffect(() => {
    async function fetchEployees() {
      try {
        const response = await axios.post("http://localhost:5000/api/employee/getemployee");

        const emloyeesWithKeys = response.data.employee.map((employee, index) => ({
          ...employee,
          key: employee._id || index,
        }));
        setEmployees(emloyeesWithKeys);
        setFilterEmployees(emloyeesWithKeys);

      } catch (error) {
        console.log("Error fetching eployee:", error);
      }
    }
    fetchEployees();
  }, []);


// create
  const addSuccess = () => {
    messageApi.success('Employee added successfully!').then(() => {
      window.location.reload();
    });
  };

  const addError = () => {
    messageApi.error('Failed to add employee. Please try again.');
  };

  const addWarning = (warningMessage) => {
    messageApi.warning(warningMessage);
  };

  async function addNewEmployee(e) {
    e.preventDefault();

    if (firstname === '' || lastname === '' || dob === '' || address === '' || gender === '' || contact === '' ||
      email === '' || password === '' || status === '' || role === '') {
      addWarning('Please fill in all required fields.');
      return;
    }

    const newemployee = {
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      address: address,
      gender: gender,
      contact: contact,
      email: email,
      password: password,
      status: status,
      role: role
    }

    try {
      const response = await axios.post('http://localhost:5000/api/employee/register', newemployee);
      console.log(response.data);
      addSuccess();
      setFirstname('');
      setLastname('');
      setDob('');
      setAddress('');
      setGender('');
      setContact('');
      setEmail('');
      setPassword('');
      setStatus('');
      setRole('');


    } catch (error) {
      console.log(error);
      addError();
    }
  }

  const showDrawer = () => {
    setOpenEmployee(true);
  };

  const onClose = () => {
    setOpenEmployee(false);
  };

  // update
  function updateShowDrawer(we) {
    
  }


  return (
    <>
      {contextHolder}
      <div className="flex justify-start gap-[25px] items-center h-[74px] bg-white rounded-[11px] m-[15px] px-[15px]">
        <div className="w-[250px] h-[29px] text-slate-900 text-xl font-semibold font-['Poppins']">Employees</div>
      

        {/* PDF */}
        <PDFDownloadLink
          document={<MyDocument factors={filterEmployees} />}
          fileName="crop_factors.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              'Loading document...'
            ) : (
              <Button type="primary" icon={<DownloadOutlined />} size={size} className="bg-[#bfbfbf]">
                Download PDF
              </Button>
            )
          }
        </PDFDownloadLink>

        {/* Create */}
        <Button type="primary" icon={<Icon icon="ic:baseline-plus" />} className="bg-[black] ml-auto font-['Poppins'] w-[180px] h-[40px]" onClick={showDrawer} >
          Add New Employee
        </Button>

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
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstname"
                  label="First name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter first name',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter first name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastname"
                  label="Last name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter last name',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="dob"
                  label="Date of birth"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter date of birth',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter date of birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter gender',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="contact"
                  label="Conatct"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter contact',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter contact"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter email',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter password',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="Satatus"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter status',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter role',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: 'please enter address',
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter address"
                    defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>

      </div>

      


      {/* Table */}
      <div className="m-4 bg-white rounded-xl p-4">
        <Table
          columns={columns}
          dataSource={filterEmployees} // Use filteredCrops instead of crops
          scroll={{ x: 1500 }}
          pagination={{ pageSize: 10 }}
        />
      </div>

      {/* Update drawer */}
      {/* <Drawer
        title="Update Crop Factors"
        width={720}
        onClose={updateOnClose}
        open={updatOpen}
        extra={
          <Space>
            <Button onClick={updateOnClose}>Cancel</Button>
            <Button onClick={handleUpdateCropFactors} type="primary" className='bg-[#0c6c41]'>
              Update
            </Button>
          </Space>
        }
      >

        <Form form={updateForm} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="province"
                label="Province"
                rules={[
                  {
                    required: true,
                    message: 'Please enter province',
                  },
                ]}
              >
                <Input
                  placeholder="Enter province"
                  defaultValue={province}
                  onChange={(e) => setProvince(e.target.value)}
                  readOnly={true}
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="district"
                label="District"
                rules={[
                  {
                    required: true,
                    message: 'Please enter district',
                  },
                ]}
              >
                <Input
                  placeholder="Enter district"
                  defaultValue={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  readOnly={true}
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="soiltype"
                label="Soil Type"
                rules={[
                  {
                    required: true,
                    message: 'Please select soil type',
                  },
                ]}
              >
                <Select
                  placeholder="Select soil type"
                  value={soiltype}
                  onChange={(value) => setSoiltype(value)}
                >
                  <Option value="Alluvial">Alluvial</Option>
                  <Option value="Red Loam">Red Loam</Option>
                  <Option value="Sandy Loam">Sandy Loam</Option>
                  <Option value="Laterite">Laterite</Option>
                  <Option value="Clay Loam">Clay Loam</Option>
                  <Option value="Red Earth">Red Earth</Option>
                  <Option value="Reddish Brown Earth">Reddish Brown Earth</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="soilph"
                label="Soil PH"
                rules={[
                  {
                    required: true,
                    message: 'Please enter soil ph',
                  },
                ]}
              >
                <Input
                  placeholder="Enter soil ph"
                  defaultValue={soilph}
                  onChange={(e) => setSoilph(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nutrientcontent"
                label="Nutrient Content"
                rules={[
                  {
                    required: true,
                    message: 'Please enter nutrient content',
                  },
                ]}
              >
                <Select
                  placeholder="Select nutrientcontent"
                  value={nutrientcontent}
                  onChange={(value) => setNutrientcontent(value)}
                >
                  <Option value="Low">Low</Option>
                  <Option value="Moderate">Moderate</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="temperature"
                label="Temperature (°C)"
                rules={[
                  {
                    required: true,
                    message: 'Please enter temperature',
                  },
                ]}
              >
                <Input
                  placeholder="Enter temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rainfall"
                label="Rainfall (mm)"
                rules={[
                  {
                    required: true,
                    message: 'Please enter rainfall',
                  },
                ]}
              >
                <Input
                  placeholder="Enter average rainfall"
                  defaultValue={rainfall}
                  onChange={(e) => setrainfall(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="humidity"
                label="Humidity (%)"
                rules={[
                  {
                    required: true,
                    message: 'Please select water humidity',
                  },
                ]}
              >
                <Input
                  placeholder="Enter average humidity"
                  defaultValue={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="humidity"
                label="Humidity (%)"
                rules={[
                  {
                    required: true,
                    message: 'Please select water humidity',
                  },
                ]}
              >
                <Input
                  placeholder="Enter average humidity"
                  defaultValue={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="altitude"
                label="Altitude"
                rules={[
                  {
                    required: true,
                    message: 'please enter altitude',
                  },
                ]}
              >
                <Input
                  placeholder="Enter altitude"
                  defaultValue={altitude}
                  onChange={(e) => setAltitude(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="topography"
                label="Topography"
                rules={[
                  {
                    required: true,
                    message: 'please enter topography',
                  },
                ]}
              >
                <Select
                  placeholder="Select topography"
                  value={topography}
                  onChange={(value) => setTopography(value)}
                >
                  <Option value="Flat">Flat</Option>
                  <Option value="Flat to Slightly Undulating">Flat to Slightly Undulating</Option>
                  <Option value="Hilly">Hilly</Option>
                  <Option value="Mountainous">Mountainous</Option>
                  <Option value="Slightly Undulating">Slightly Undulating</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="irrigationsystems"
                label="Irrigation Systems"
                rules={[
                  {
                    required: true,
                    message: 'please enter irrigation systems',
                  },
                ]}
              >
                <Input
                  placeholder="Enter irrigation systems"
                  defaultValue={irrigationsystems}
                  onChange={(e) => setIrrigationsystems(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="waterquality"
                label="Water Quality"
                rules={[
                  {
                    required: true,
                    message: 'please enter water quality',
                  },
                ]}
              >
                <Select
                  placeholder="Select water quality"
                  value={waterquality}
                  onChange={(value) => setWaterquality(value)}
                >
                  <Option value="Excellent">Excellent</Option>
                  <Option value="Good">Good</Option>
                  <Option value="Moderate">Moderate</Option>
                  <Option value="Low">Low</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="varietyselection"
                label="Variety Selection"
                rules={[
                  {
                    required: true,
                    message: 'please enter varietyselection',
                  },
                ]}
              >
                <Input
                  placeholder="Enter varietyselection"
                  defaultValue={varietyselection}
                  onChange={(e) => setVarietyselection(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="growthcycle"
                label="Growth Cycle"
                rules={[
                  {
                    required: true,
                    message: 'please enter growthcycle',
                  },
                ]}
              >
                <Select
                  placeholder="Select growthcycle"
                  value={growthcycle}
                  onChange={(value) => setGrowthcycle(value)}
                >
                  <Option value="Short">Short</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Long">Long</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="pestpressure"
                label="Pest Pressure"
                rules={[
                  {
                    required: true,
                    message: 'please enter pest pressure',
                  },
                ]}
              >
                <Select
                  placeholder="Select pest pressure"
                  value={pestpressure}
                  onChange={(value) => setPestpressure(value)}
                >
                  <Option value="Low">Low</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="diseaseincidence"
                label="Disease Incidence"
                rules={[
                  {
                    required: true,
                    message: 'please enter disease incidence',
                  },
                ]}
              >
                <Select
                  placeholder="Select disease incidence"
                  value={diseaseincidence}
                  onChange={(value) => setDiseaseincidence(value)}
                >
                  <Option value="Low">Low</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="croprotation"
                label="Crop Rotation"
                rules={[
                  {
                    required: true,
                    message: 'please enter crop rotation',
                  },
                ]}
              >
                <Select
                  placeholder="Select crop rotation"
                  value={croprotation}
                  onChange={(value) => setCroprotation(value)}
                >
                  <Option value="Limited">Limited</Option>
                  <Option value="Continuous">Continuous</Option>
                  <Option value="Alternate">Alternate</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fertilizeruse"
                label="Fertilizer Use"
                rules={[
                  {
                    required: true,
                    message: 'please enter fertilizer use',
                  },
                ]}
              >
                <Select
                  placeholder="Select fertilizer use"
                  value={fertilizeruse}
                  onChange={(value) => setFertilizeruse(value)}
                >
                  <Option value="Low">Low</Option>
                  <Option value="Moderate">Moderate</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="demandandpricetrends"
                label="Demand and Price Trends"
                rules={[
                  {
                    required: true,
                    message: 'please enter demand and price trends',
                  },
                ]}
              >
                <Select
                  placeholder="Select pest demand and price trends"
                  value={demandandpricetrends}
                  onChange={(value) => setDemandandpricetrends(value)}
                >
                  <Option value="Stable">Stable</Option>
                  <Option value="Variable">Variable</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="supplychainefficiency"
                label="Supply Chain Efficiencyion"
                rules={[
                  {
                    required: true,
                    message: 'please enter supply chain efficiencyion',
                  },
                ]}
              >
                <Select
                  placeholder="Select supply chain efficiencyion"
                  value={supplychainefficiency}
                  onChange={(value) => setsupplychainefficiencyion(value)}
                >
                  <Option value="Low">Low</Option>
                  <Option value="Moderate">Moderate</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>


      </Drawer> */}
    </>
  );
}

export default Employee;
