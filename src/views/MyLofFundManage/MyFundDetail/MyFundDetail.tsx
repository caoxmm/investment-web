/* eslint-disable max-params */

import {
  Form, Input, Button, Card, DatePicker, Space, message,
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import cn from 'classnames';
import request from '../../../utils/request';
import styles from './MyFundDetail.less';

const layout = {
  labelCol: {
    xs: { span: 24, align: 'left' },
    sm: { span: 24, align: 'left' },
    md: { span: 4, align: 'right' },
    lg: { span: 3, align: 'right' },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 14 },
    lg: { span: 10 },
  },
};

interface MyFundDetailProps {
  className?: string;
}

export interface IMyFundForm {
  fundId: string;
  fundNm: string;
  price: string; // 成交单价
  amount: string; // 份额
  total: string; // 总价格
  applyFee: string; // 申购费
  applyDate: any; // 买入日期
}
export function MyFundDetail(props: MyFundDetailProps) {
  const { className } = props;

  const [form] = useForm<IMyFundForm>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id !== 'new') {
      request
        .get(`/my-fund/${id}`)
        .then(([detail]) => {
          console.log({ detail }); // ccc-log
          form.setFieldsValue({
            ...detail,
            applyDate: moment(detail.applyDate),
          });
        })
        .catch(() => {})
        .finally(() => {});
    }
  }, [form, id]);

  const title = useMemo(() => {
    if (id === 'new') {
      return '新增';
    }
    return '修改';
  }, [id]);

  const history = useHistory();
  const _goBack = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    history.goBack();
  }, [history]);

  const [submitting, setSubmitting] = useState(false);

  const onFinish = (values: IMyFundForm) => {
    if (id === 'new') {
      newMyFund(setSubmitting, values, history);
    } else {
      updateMyFund(setSubmitting, values, id, history);
    }
  };

  return (
    <div className={cn(styles.MyFundDetail, className)}>
      <Card title={title}>
        <Form form={form} name="nest-messages" onFinish={onFinish}>
          <Form.Item name="fundId" label="基金代码" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fundNm" label="基金名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="成交单价" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="份额" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="total" label="总价格" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="applyFee" label="申购费" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="applyDate" label="买入日期" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Space size="middle">
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting}
                disabled={submitting}
              >
                提交
              </Button>
              <Button type="default" htmlType="reset">
                重置
              </Button>
              <Button type="default" onClick={_goBack}>
                返回
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
function newMyFund(
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  values: IMyFundForm,
  history: any,
) {
  setSubmitting(true);
  const applyDate = new Date(values.applyDate._d);
  request
    .post('/my-fund', {
      requestType: 'form',
      data: {
        ...values,
        applyDate,
      },
    })
    .then(() => {
      history.goBack();
    })
    .catch((e) => {
      message.error(e.massage);
    })
    .finally(() => {
      setSubmitting(false);
    });
}

function updateMyFund(
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  values: IMyFundForm,
  id: string,
  history: any,
) {
  setSubmitting(true);
  const applyDate = new Date(values.applyDate._d);
  request
    .patch(`/my-fund/${id}`, {
      requestType: 'form',
      data: {
        ...values,
        applyDate,
      },
    })
    .then(() => {
      history.goBack();
    })
    .catch((e) => {
      message.error(e.massage);
    })
    .finally(() => {
      setSubmitting(false);
    });
}
