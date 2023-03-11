import { Form, Input, Button, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/ReviewPage.css";

const { TextArea } = Input;

const ReviewPage = () => {
    const [error, setError] = useState();
    const [isSending, setIsSending] = useState(false);
    const [successfullMessage, setSuccessfulMessage] = useState();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function updateSize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    const onFinish = async (values) => {
        setError(null);
        setSuccessfulMessage();
        setIsSending(true);
        try {
            const resp = await axios.post('https://localhost:7018/mail/send', {
                to: values.to,
                subject: values.subject,
                message: values.message
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                validateStatus: () => true,
            });
            if (resp.status != 202) {
                throw Error("An error occured while trying to send email.");
            }
            setSuccessfulMessage("Your email was delivered!");
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSending(false);
        }
    };
    return (
        <div className="review-form">
            <Form
                name="review"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    width: "100%",
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name={'to'}
                    label="Email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please, fill this in.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={'subject'}
                    label="Subject"
                    rules={[
                        {
                            required: true,
                            message: 'Enter your message subject.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={'message'}
                    label="Messsage body"
                    rules={[
                        {
                            required: true,
                            message: 'Enter your message body.'
                        }
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: windowWidth < 575 ? 0 : 8,
                        span: windowWidth < 575 ? 0 : 16,
                    }}
                >
                    <Space>
                        <Button type="primary" htmlType="submit" loading={isSending}>
                            Send
                        </Button>
                        <Button
                            type="text"
                            style={{
                                color: error == null ? "#52c41a" : "red"
                            }}
                        >
                            {error == null ? successfullMessage : error}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ReviewPage;