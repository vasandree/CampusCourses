import { Button, DatePicker, Form, Input, Modal, Radio, Select, Space } from "antd";
import { useEffect, useState } from "react";
import NumericInput from "../NumericInput/NumericInput.jsx";
import { getUsers } from "../../API/getUsers.js";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import {createCourse} from "../../API/createCourse.js";


const CreateCourseModal = ({id, isModalOpen, setIsModalOpen, updateCourses }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([])
    const [maximumStudentsCount, setMaximumStudentsCount] = useState(''); // State for maximumStudentsCount

    const handleMaximumStudentsCountChange = (value) => {
        setMaximumStudentsCount(value);
    };
    const onFinish =  async (values) => {
        values.startYear = values.startYear.$y
        console.log(values);
        setLoading(true);
        let response = await createCourse(id, values);
        setTimeout(() => {
            setLoading(false);
            if (response) {
                //notify
                setIsModalOpen(false);
                updateCourses();
            }
        }, 500);
    };

    const fetchUsers = async () => {
        const users = await getUsers();
        if (users) {
            const formattedUsers = users.map(user => ({
                value: user.id,
                label: `${user.fullName}`
            }));
            setUsers(formattedUsers);
        } else {
            //notify
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const footer = [
        <Button key="cancel" onClick={handleCancel}>
            Отменить
        </Button>,
        <Button key="create" htmlType="submit" type="primary" loading={loading} onClick={handleOk}>
            Создать курс
        </Button>
    ];

    return (
        <Modal width={750} open={isModalOpen} footer={footer} onCancel={handleCancel} title="Создание курса">
            <Form form={form} name="courseCreation" onFinish={onFinish} layout="vertical">
                <Form.Item name='name' label="Название курса">
                    <Input placeholder={'Название курса'}/>
                </Form.Item>
                <Space direction="horizontal" wrap={true} style={{justifyContent: 'space-between', display: "flex"}}>
                    <Form.Item name="startYear" label="Год начала курса">
                        <DatePicker picker="year" placeholder="Выберете год"/>
                    </Form.Item>
                    <Form.Item name="maximumStudentsCount" label="Общее кол-во мест">
                        <NumericInput value={maximumStudentsCount} onChange={handleMaximumStudentsCountChange} />
                    </Form.Item>
                    <Form.Item name="semester" label="Семестр">
                        <Radio.Group>
                            <Radio value={'Autumn'}>Осенний</Radio>
                            <Radio value={'Spring'}>Весенний</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Space>
                <Form.Item name="requirements" label="Требования">
                    <ReactQuill theme='snow' />
                </Form.Item>
                <Form.Item name="annotations" label="Аннотации">
                    <ReactQuill theme='snow' />
                </Form.Item>
                <Form.Item name="mainTeacherId" label="Оновной преподаватель курса">
                    <Select showSearch
                            placeholder="Найти преподавателя"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={users}/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateCourseModal;