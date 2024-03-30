import styles from "../stidentListItem.module.css";
import { Button, Space } from "antd";
import ResultTag from "./ResultTag/ResultTag.jsx";
import EditStudentMarkModal from "../../../../Modals/EditStudentMarkModal/EditStudentMarkModal.jsx";
import { useState } from "react";
import {MarkTypesRu} from "../../../../../consts/MarkTypesRu.js";
import {MarkTypes} from "../../../../../consts/MarkTypes.js";

const AcceptedStudent = ({ id, name, finalResult, midtermResult }) => {
    const [mark, setMark] = useState();
    const [isModalOpen, setModalOpen] = useState(false);
    const [attestation, setAttestation] = useState();

    const handleClick = (result, attestationValue) => {
        setMark(result);
        setAttestation(attestationValue);
        setModalOpen(true);
    };

    return (
        <>
            <Space className={styles.listItem}>
                <Space direction="horizontal" wrap>
                    <Button onClick={() => handleClick(midtermResult, MarkTypes.Mid())} type="link">
                        {MarkTypesRu.Mid()}
                    </Button>-
                    <ResultTag result={midtermResult} />
                </Space>
                <Space direction="horizontal" wrap>
                    <Button onClick={() => handleClick(finalResult, MarkTypes.Final())} type="link">
                        {MarkTypesRu.Final()}
                    </Button>-
                    <ResultTag result={finalResult} />
                </Space>
            </Space>
            <EditStudentMarkModal id={id} name={name} currentMark={mark} markType={attestation}
                setModalOpen={setModalOpen} isModalOpen={isModalOpen}/>
        </>
    );
};

export default AcceptedStudent;