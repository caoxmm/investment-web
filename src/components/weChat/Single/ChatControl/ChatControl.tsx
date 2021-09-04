import cn from 'classnames';
import { Form, Input, Button, Select } from 'antd';

import styles from './ChatControl.less';
import { useCallback } from 'react';

interface ChatControlProps {
  className?: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IControlFormData {
  name: string;
}

export function ChatControl(props: ChatControlProps) {
  const { className } = props;
  const [form] = Form.useForm();

  const _change = useCallback((...args) => {
    console.log(args); //ccc-log
  }, []);

  return (
    <div className={cn(styles.ChatControl, className)}>
      <h3>单聊控制器</h3>

      <Form {...layout} form={form} onFieldsChange={_change}>
        <Form.Item name="name" label="对方名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
