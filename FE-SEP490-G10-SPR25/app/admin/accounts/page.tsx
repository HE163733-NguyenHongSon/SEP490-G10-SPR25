"use client";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Space,
  message,
  Popconfirm,
  DatePicker,
  Tabs,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { adminService } from "@/common/services/adminService";
import { AdminDTO } from "@/common/types/admin";
import dayjs from "dayjs";
import Image from "next/image";
import "dayjs/locale/vi";

dayjs.locale("vi");

const { TabPane } = Tabs;

const AccountManagement = () => {
  const [staffAccounts, setStaffAccounts] = useState<IUser[]>([]);
  const [customerAccounts, setCustomerAccounts] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccountsByType();
    fetchRoles();
  }, []);

  const fetchAccountsByType = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAccountsByType();
      setStaffAccounts(data.staff || []);
      setCustomerAccounts(data.customers || []);
    } catch (error: any) {
      // Xử lý lỗi cụ thể
      if (error.response && error.response.data && error.response.data.error) {
        // Nếu có lỗi về cột SQL
        if (error.response.data.error.includes("Invalid column name")) {
          message.error("Lỗi cơ sở dữ liệu: Cột không hợp lệ");
        } else {
          message.error(
            `Lỗi: ${
              error.response.data.message || "Không thể tải danh sách tài khoản"
            }`
          );
        }
      } else {
        message.error("Không thể tải danh sách tài khoản");
      }

      // Đặt mặc định cho các state để tránh lỗi UI
      setStaffAccounts([]);
      setCustomerAccounts([]);

      console.error("Chi tiết lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await adminService.getAllRoles();
      setRoles(data);
    } catch (error) {
      message.error("Failed to fetch roles");
    }
  };

  const handleEdit = (record: IUser) => {
    setEditingUserId(Number(record.userId));

    // Xử lý giá trị ngày tháng đúng cách
    let dobValue = undefined;
    try {
      if (record.dob) {
        // Cố gắng phân tích chuỗi ngày tháng theo một số định dạng phổ biến
        const dateFormats = [
          "YYYY-MM-DD",
          "DD/MM/YYYY",
          "MM/DD/YYYY",
          "DD-MM-YYYY",
        ];
        for (const format of dateFormats) {
          const parsedDate = dayjs(record.dob, format);
          if (parsedDate.isValid()) {
            dobValue = parsedDate;
            break;
          }
        }

        // Nếu không thể phân tích theo định dạng cụ thể, sử dụng phân tích tự động
        if (!dobValue) {
          const autoDate = dayjs(record.dob);
          if (autoDate.isValid()) {
            dobValue = autoDate;
          }
        }
      }
    } catch (error) {
      console.error("Error parsing date:", error);
    }

    form.setFieldsValue({
      ...record,
      dob: dobValue,
    });

    setIsModalVisible(true);
  };

  const handleDelete = async (userId: number) => {
    try {
      await adminService.deleteAccount(userId);
      message.success("Xóa tài khoản thành công");
      fetchAccountsByType();
    } catch (error: any) {
      // Hiển thị thông báo lỗi thu gọn nếu có
      if (error.userMessage) {
        message.error(error.userMessage);
      } else if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else if (typeof error.response?.data === "string") {
        message.error(error.response.data);
      } else {
        message.error("Không thể xóa tài khoản");
      }
    }
  };

  const handleToggleStatus = async (userId: number, isActive: boolean) => {
    try {
      await adminService.toggleAccountStatus(userId, isActive);
      message.success(
        `Account ${isActive ? "activated" : "deactivated"} successfully`
      );
      fetchAccountsByType();
    } catch (error) {
      message.error("Failed to update account status");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      // Log initial form values
      console.log("Raw form values before processing:", values);

      // Validate ngày trước khi submit
      let dobValue = "";
      if (values.dob) {
        if (values.dob.isValid && values.dob.isValid()) {
          dobValue = values.dob.format("YYYY-MM-DD");
          console.log("Formatted DOB value:", dobValue);
        } else {
          console.error("Invalid date format in DOB field:", values.dob);
          message.error("Invalid date format. Please select a valid date.");
          return;
        }
      } else {
        console.warn("DOB value is missing in form submission");
      }

      const accountData: AdminDTO = {
        name: values.userName,
        userName: values.userName,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        dob: dobValue,
        address: values.address || "",
        citizenId: values.citizenId || 0,
        role: values.role,
      };

      if (values.avatarUrl) {
        accountData.avatarUrl = values.avatarUrl;
      }

      accountData.Password = values.password || "";

      const hasNewPassword = values.password && values.password.trim() !== "";
      console.log("Mật khẩu được gửi đi:", values.password);
      console.log("Mật khẩu có giá trị mới?", hasNewPassword);

      console.log("Form values after processing:", values);
      console.log("Submitting account data to API:", accountData);

      if (editingUserId) {
        console.log(`Updating account with ID: ${editingUserId}`);
        const response = await adminService.updateAccount(
          editingUserId,
          accountData
        );
        console.log("API update response:", response);

        if (hasNewPassword) {
          message.success(
            "Tài khoản đã được cập nhật thành công cùng với mật khẩu mới"
          );
        } else {
          message.success("Tài khoản đã được cập nhật thành công");
        }
      } else if (values.role === "Bác sĩ") {
        console.log("Creating new doctor account");
        const result = await adminService.createDoctorAccount(accountData);
        console.log("API create doctor response:", result);
        if (result) message.success("Doctor account created successfully");
      } else if (values.role === "Lễ tân") {
        console.log("Creating new receptionist account");
        const result = await adminService.createReceptionistAccount(
          accountData
        );
        console.log("API create receptionist response:", result);
        if (result)
          message.success("Receptionist account created successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
      fetchAccountsByType();
    } catch (error: any) {
      console.error("Error submitting form:", error);

      // Log the full error object
      console.error("Full error object:", JSON.stringify(error, null, 2));

      // Enhanced error logging
      let errorMessage = "Failed to save account";
      let errorDetails = "";

      if (error.response) {
        console.error("Response error status:", error.response.status);
        console.error("Response error headers:", error.response.headers);

        // Log the complete response data
        console.error("Complete API error response:", error.response);

        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
          console.error("Error response (string):", error.response.data);
        } else if (error.response.data) {
          console.error("Error response data (object):", error.response.data);

          if (error.response.data.message) {
            errorMessage = error.response.data.message;
            console.error("Error message:", error.response.data.message);
          } else if (error.response.data.title) {
            errorMessage = error.response.data.title;
            console.error("Error title:", error.response.data.title);
          } else if (error.response.data.errors) {
            // Xử lý validation errors từ API
            const validationErrors = error.response.data.errors;
            console.error("Validation errors:", validationErrors);

            const errorMessages = [];
            errorDetails = "Validation errors:\n";

            // Trích xuất tất cả các thông báo lỗi
            for (const field in validationErrors) {
              if (Array.isArray(validationErrors[field])) {
                errorMessages.push(...validationErrors[field]);

                // Build detailed error message for console
                errorDetails += `${field}: ${validationErrors[field].join(
                  ", "
                )}\n`;
              }
            }

            if (errorMessages.length > 0) {
              errorMessage = errorMessages.join("; ");
            } else {
              errorMessage = "Validation errors occurred";
            }

            console.error(errorDetails);
          } else {
            errorMessage = JSON.stringify(error.response.data);
          }
        }
      } else if (error.request) {
        console.error("Request was made but no response was received");
        console.error("Request details:", error.request);
        errorMessage = "No response received from server";
      } else {
        console.error("Error setting up request:", error.message);
        errorMessage = error.message;
      }

      console.error("Final error message to display:", errorMessage);
      message.error(errorMessage);
    }
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại ",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "roleNames",
      key: "roleNames",
      render: (roleNames: any) => {
        if (Array.isArray(roleNames)) {
          return roleNames.join(", ");
        } else if (typeof roleNames === "object" && roleNames !== null) {
          return JSON.stringify(roleNames);
        }
        return roleNames || "";
      },
    },
    {
      title: "Trạng thái",
      key: "isActive",
      render: (_: any, record: IUser) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) =>
            handleToggleStatus(Number(record.userId), checked)
          }
        />
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: IUser) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="primary"
          >
            Chỉnh sửa 
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa tài khoản này?"
            onConfirm={() => handleDelete(Number(record.userId))}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          <h1 className="text-2xl font-bold">Quản lý tài khoản</h1>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingUserId(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Thêm tài khoản
        </Button>
      </div>

      <Tabs defaultActiveKey="staff" className="mb-6">
        <TabPane tab="Nhân viên" key="staff">
          <Table
            columns={columns}
            dataSource={staffAccounts}
            rowKey="userId"
            loading={loading}
          />
        </TabPane>
        <TabPane tab="Khách hàng" key="customers">
          <Table
            columns={columns}
            dataSource={customerAccounts}
            rowKey="userId"
            loading={loading}
          />
        </TabPane>
      </Tabs>

      <Modal
        title={editingUserId ? "Edit Account" : "Create Account"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="userName"
            label="Username"
            rules={[{ required: true, message: "Please input username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email", message: "Please input a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: !editingUserId, message: "Please input password!" },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
            ]}
          >
            <Input.Password
              placeholder={
                editingUserId
                  ? "Để trống để giữ mật khẩu hiện tại"
                  : "Nhập mật khẩu (ít nhất 6 ký tự)"
              }
            />
          </Form.Item>

          <Form.Item
            name="avatarUrl"
            label="Avatar URL"
            tooltip="Nhập URL hình ảnh"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="Nhập URL avatar (tùy chọn)" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select>
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[
              { required: true, message: "Please select date of birth!" },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              allowClear={true}
              placeholder="Select date"
              popupStyle={{ zIndex: 1060 }}
              disabledDate={(current) => {
                // Không cho phép chọn ngày trong tương lai
                return current && current > dayjs().endOf("day");
              }}
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="citizenId"
            label="Citizen ID"
            rules={[
              { required: true, message: "Please input citizen ID!" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  const num = Number(value);
                  if (isNaN(num)) {
                    return Promise.reject("Citizen ID must be a number");
                  }
                  if (!Number.isInteger(num) || num <= 0) {
                    return Promise.reject(
                      "Citizen ID must be a positive integer"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input type="number" min={1} />
          </Form.Item>

          {!editingUserId && (
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select role!" }]}
            >
              <Select>
                <Select.Option value="Bác sĩ">Bác sĩ</Select.Option>
                <Select.Option value="Lễ tân">Lễ tân</Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-4">
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingUserId ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountManagement;
