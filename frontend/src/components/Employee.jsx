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
  const [selectedCropFactors, setSelectedCropFactors] = useState(null); // State to hold the selected crop's data
  const [size, setSize] = useState('large');
  const [factors, setFactors] = useState([]);

  const [filterFactors, setFilterFactors] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);



  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [soiltype, setSoiltype] = useState('');
  const [soilph, setSoilph] = useState('');
  const [nutrientcontent, setNutrientcontent] = useState('');
  const [temperature, setTemperature] = useState('');
  const [rainfall, setrainfall] = useState('');
  const [humidity, setHumidity] = useState('');
  const [altitude, setAltitude] = useState('');
  const [topography, setTopography] = useState('');
  const [irrigationsystems, setIrrigationsystems] = useState('');
  const [waterquality, setWaterquality] = useState('');
  const [varietyselection, setVarietyselection] = useState('');
  const [growthcycle, setGrowthcycle] = useState('');
  const [pestpressure, setPestpressure] = useState('');
  const [diseaseincidence, setDiseaseincidence] = useState('');
  const [croprotation, setCroprotation] = useState('');
  const [fertilizeruse, setFertilizeruse] = useState('');
  const [demandandpricetrends, setDemandandpricetrends] = useState('');
  const [supplychainefficiency, setsupplychainefficiencyion] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  const [updatOpen, setUpdateOpen] = useState(false);

  const [updateForm] = Form.useForm();



  const updateShowDrawer = (factors) => {
    setSelectedCropFactors(factors);
    setUpdateOpen(true);

    // Update the form fields with the selected crop's data
    updateForm.setFieldsValue({
      province: factors.province,
      district: factors.district,
      soiltype: factors.soiltype,
      soilph: factors.soilph,
      nutrientcontent: factors.nutrientcontent,
      temperature: factors.temperature,
      rainfall: factors.rainfall,
      humidity: factors.humidity,
      altitude: factors.altitude,
      topography: factors.topography,
      irrigationsystems: factors.irrigationsystems,
      waterquality: factors.waterquality,
      varietyselection: factors.varietyselection,
      growthcycle: factors.growthcycle,
      pestpressure: factors.pestpressure,
      diseaseincidence: factors.diseaseincidence,
      croprotation: factors.croprotation,
      fertilizeruse: factors.fertilizeruse,
      demandandpricetrends: factors.demandandpricetrends,
      supplychainefficiency: factors.supplychainefficiency,
    });

  };

  const handleUpdateCropFactors = async () => {

    try {
      // Validate and get the form values
      const values = await updateForm.validateFields();

      // Check if all required fields are filled
      if (Object.values(values).some(value => value === undefined || value === '')) {
        addWarning('Please fill in all required fields.');
        return;
      }

      // Validation for numeric fields
      if (isNaN(values.soilph) || values.soilph === '') {
        addWarning('Please enter a valid number for Soil PH.');
        return;
      }

      const updatedFactors = {
        ...selectedCropFactors,
        province: values.province,
        district: values.district,
        soiltype: values.soiltype,
        soilph: parseFloat(values.soilph),
        nutrientcontent: values.nutrientcontent,
        temperature: values.temperature,
        rainfall: values.rainfall,
        humidity: values.humidity,
        altitude: values.altitude,
        topography: values.topography,
        irrigationsystems: values.irrigationsystems,
        waterquality: values.waterquality,
        varietyselection: values.varietyselection,
        growthcycle: values.growthcycle,
        pestpressure: values.pestpressure,
        diseaseincidence: values.diseaseincidence,
        croprotation: values.croprotation,
        fertilizeruse: values.fertilizeruse,
        demandandpricetrends: values.demandandpricetrends,
        supplychainefficiency: values.supplychainefficiency,
      };

      // Send update request to your API
      const response = await axios.put(`http://localhost:5000/api/cropfactors/editcropfactor/${selectedCropFactors._id}`, updatedFactors);
      messageApi.success('Crop factors updated successfully!').then(() => {
        window.location.reload();
      });;
      setUpdateOpen(false);
    } catch (error) {
      console.error(error);
      messageApi.error('Failed to update crop factors. Please try again.');
    }
  };


  const updateOnClose = () => {
    setUpdateOpen(false);
  };

  const addWarning = (warningMessage) => {
    messageApi.warning(warningMessage);
  };

  const columns = [
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

  useEffect(() => {
    async function fetchCropsfactors() {
      try {
        const response = await axios.post("http://localhost:5000/api/cropfactors/getcropfactors");
        console.log("Crops factors:", response.data.cropfactors);

        const factorsWithKeys = response.data.cropfactors.map((factor, index) => ({
          ...factor,
          key: factor._id || index,
        }));
        setFactors(factorsWithKeys);
        setFilterFactors(factorsWithKeys);

      } catch (error) {
        console.log("Error fetching crops:", error);
      }
    }
    fetchCropsfactors();
  }, []);

  useEffect(() => {
    filterCropFactors();
  }, [selectedProvince, selectedDistrict, factors]);

  const filterCropFactors = () => {
    let filtered = [...factors];

    if (selectedProvince && selectedProvince !== 'All') {
      filtered = filtered.filter(factors => factors.province === selectedProvince);
    }

    if (selectedDistrict && selectedDistrict !== 'All') {
      filtered = filtered.filter(factors => factors.district === selectedDistrict);
    }


    setFilterFactors(filtered);
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
  };



  return (
    <>
      {contextHolder}
      <div className="flex justify-start gap-[25px] items-center h-[74px] bg-white rounded-[11px] m-[15px] px-[15px]">
        <div className="w-[250px] h-[29px] text-slate-900 text-xl font-semibold font-['Poppins']">Crop Prediction Factors</div>
        <Select
          placeholder="Select planting season"
          style={{
            width: '200px',
            height: '40px',
          }}
          size='large'
          onChange={handleProvinceChange}
          defaultValue="All"
        >
          <Option value="All">Province -- All</Option>
          <Option value="Western">Western</Option>
          <Option value="Central">Central</Option>
          <Option value="Southern">Southern</Option>
          <Option value="Northern">Northern</Option>
          <Option value="Eastern">Eastern</Option>
          <Option value="North Western">North Western</Option>
          <Option value="North Central">North Central</Option>
          <Option value="Uva">Uva</Option>
          <Option value="Sabaragamuwa">Sabaragamuwa</Option>
        </Select>
        <Select
          placeholder="Select water requirements"
          style={{
            width: '250px',
            height: '40px',
          }}
          size='large'
          onChange={handleDistrictChange}
          defaultValue="All"
        >
          <Option value="All">District -- All</Option>
          <Option value="Colombo">Colombo</Option>
          <Option value="Gampaha">Gampaha</Option>
          <Option value="Kalutara">Kalutara</Option>
          <Option value="Kandy">Kandy</Option>
          <Option value="Matale">Matale</Option>
          <Option value="Nuwara Eliya">Nuwara Eliya</Option>
          <Option value="Galle">Galle</Option>
          <Option value="Matara">Matara</Option>
          <Option value="Hambantota">Hambantota</Option>
          <Option value="Jaffna">Jaffna</Option>
          <Option value="Kilinochchi">Kilinochchi</Option>
          <Option value="Mannar">Mannar</Option>
          <Option value="Vavuniya">Vavuniya</Option>
          <Option value="Mullaitivu">Mullaitivu</Option>
          <Option value="Trincomalee">LTrincomaleeow</Option>
          <Option value="Batticaloa">Batticaloa</Option>
          <Option value="Ampara">Ampara</Option>
          <Option value="Kurunegala">Kurunegala</Option>
          <Option value="Puttalam">Puttalam</Option>
          <Option value="Anuradhapura">Anuradhapura</Option>
          <Option value="Polonnaruwa">Polonnaruwa</Option>
          <Option value="Badulla">Badulla</Option>
          <Option value="Monaragala">Monaragala</Option>
          <Option value="Ratnapura">Ratnapura</Option>
          <Option value="Kegalle">Kegalle</Option>
        </Select>


        <PDFDownloadLink
          document={<MyDocument factors={filterFactors} />}
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
      </div>
      <div className="m-4 bg-white rounded-xl p-4">
        <Table
          columns={columns}
          dataSource={filterFactors} // Use filteredCrops instead of crops
          scroll={{ x: 1500 }}
          pagination={{ pageSize: 10 }}
        />
      </div>

      {/* Update drawer */}
      <Drawer
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


      </Drawer>
    </>
  );
}

export default Employee;
