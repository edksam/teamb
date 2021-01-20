import React from "react";
import { GraduateContext } from "../context/graduate-context";
import parse from "html-react-parser";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  Card,
  Space,
  Tag,
  Col,
  Row,
  Divider,
  Typography,
  PageHeader,
  Button,
  Descriptions,
} from "antd";

import {
  GithubOutlined,
  LinkedinOutlined,
  FilePdfOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const { useContext } = React;

const GraduateInfo = ({ graduate }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(GraduateContext);
  const { Meta } = Card;
  const { Title } = Typography;
  const pdfChange = () => {
    const { htmlToText } = require("html-to-text");
    const text = htmlToText(graduate.resume_text, {
      wordwrap: 130,
    });

    var doc = new jsPDF();
    doc.autoTable({ graduate });
    doc.autoTable({
      head: [[graduate.fullname]],
      columnStyles: {
        0: { halign: "center", fillColor: [230, 230, 250], font: "helvetica" },
      }, // Cells in first column centered and green
      margin: { top: 10 },
      body: [
        [graduate.headline],
        [graduate.region],
        ["Language Spoken:" + graduate.languages],
        [graduate.email],
        [graduate.mobile],
        // ["Resume"],
        // [graduate.resume_textarea]
        [
          {
            content: text,
            styles: { halign: "left" },
            font: "helvetica",
          },
        ],
      ],
    });
    doc.save(graduate.fullname);
  };

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          // style={{ width: 600 }}
          level={3}
          onBack={() => window.history.back()}
          title={graduate.fullname}
          subTitle={graduate.current_location}
          extra={[]}
        >
          <Descriptions size="small" column={3}></Descriptions>
        </PageHeader>
        {/* </div> */}
        <Row>
          <Col span={12} offset={6}>
            <Card
              hoverable
              title={<Title level={4}>{graduate.headline}</Title>}
              bordered={false}
              style={{ width: 800, marginTop: 20 }}
            >
              <Meta
                title={graduate.headline}
                description={graduate.current_location}
              />
              <hr />
              <p>{graduate.languages} </p>
              <Space>
                <p>{graduate.email}</p>

                <p>{graduate.githubId}</p>
              </Space>
              <Space>
                <Tag color={"green"}>
                  {graduate.full_time ? "Full Time" : null}
                </Tag>
                <Tag color={"green"}>
                  {graduate.part_time ? "Part Time" : null}
                </Tag>
              </Space>
              <Divider orientation="left"></Divider>
              <Row>
                <Space>
                  <a href={graduate.githubId}>
                    <GithubOutlined
                      style={{
                        FontSize: "60px",
                        color: "black",
                        width: "10rem",
                      }}
                    />
                  </a>

                  <LinkedinOutlined
                    style={{ FontSize: "60px", color: "black", width: "10rem" }}
                  />
                </Space>
              </Row>
              <br />
              <Row>
                <Space>
                  <FilePdfOutlined
                    label="CV"
                    style={{ fontSize: "40px", color: "black", width: "10rem" }}
                  />

                  <GlobalOutlined
                    label="Website"
                    style={{ fontSize: "40px", color: "black", width: "10rem" }}
                  />
                </Space>
              </Row>
              <br />
              <Row>
                <Space>
                  <p>{parse(graduate.resume_text)}</p>

                  <Button type="primary" onClick={pdfChange}>
                    Download CV Pdf
                  </Button>
                </Space>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default GraduateInfo;
