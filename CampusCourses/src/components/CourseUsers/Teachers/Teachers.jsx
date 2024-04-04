import {Button, List, Space, Tag, Typography} from "antd";
import styles from "../Teachers/teachers.module.css";
import {useState} from "react";
import AddTeacherModal from "../../Modals/AddTeacherModal/AddTeacherModal.jsx";
import {connect} from "react-redux";

const {Text} = Typography
const Teachers = ({teachers, roles}) => {

    const [isModalOpen, setModalOpen] = useState(false)

    const  handleClick = () =>{
        setModalOpen(true)
    }

    return (
        <>
            {
                roles.isAdmin && (
                    <Space>
                        <Button type="primary" onClick={handleClick}>Добавить преподавателя</Button>
                    </Space>
                )
            }

            <div className={styles.container}>
                <List dataSource={teachers}
                      renderItem={(teacher) => (
                          <List.Item>
                              <Space direction={'vertical'} size={"small"}>
                                  <Space direction={'horizontal'} align={'baseline'}>
                                      <Text strong>{teacher.name}</Text> {teacher.isMain ?
                                      <Tag color={'rgba(46,157,56,0.98)'}>основной</Tag> : null}
                                  </Space>
                                  <Text type="secondary">{teacher.email}</Text>
                              </Space>
                          </List.Item>
                      )}/>
            </div>
            <AddTeacherModal setModalOpen={setModalOpen} isModalOpen={isModalOpen}/>
        </>
    )
}
const mapStateToProps = (state) => ({
    roles: state.roles.roles
});

export default connect(mapStateToProps) (Teachers)