import {
  Table, Space, message, PageHeader, Button,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import request from '../../../utils/request';
import { formatDate } from '../../../utils/timeUtils';
import { IMyFund } from '../types';

import styles from './MyFundList.less';

interface MyFundListProps {
  className?: string;
}

export function MyFundList(props: MyFundListProps) {
  const { className } = props;
  const [list, setList] = useState<IMyFund[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const _init = useCallback(() => {
    setLoading(true);
    request
      .get('/my-fund')
      .then((list: IMyFund[]) => {
        setList(list);
      })
      .catch((e) => {
        message.error(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    _init();
  }, [_init]);

  const history = useHistory();
  const _add = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    history.push('/my-fund-manage/new');
  }, [history]);

  const _edit = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(`/my-fund-manage/${id}`);
  }, [history]);

  const _remove = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    request
      .delete(`/my-fund/${id}`)
      .then(() => {
        _init();
      })
      .catch((e) => {
        message.error(e.message);
        setLoading(false);
      });
  }, [_init]);

  const columns: ColumnsType<IMyFund> = [
    {
      title: '代码',
      dataIndex: 'fundId',
      key: 'fundId',
    },
    {
      title: '名称',
      dataIndex: 'fundNm',
      key: 'fundNm',
    },
    {
      title: '份额',
      align: 'right',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '日期',
      align: 'center',
      dataIndex: 'applyDate',
      key: 'applyDate',
      render: (text: string) => formatDate(text),
    },
    {
      title: '操作',
      align: 'center',
      key: '_id',
      render: (record: IMyFund) => (
        <Space size="middle">
          <a onClick={(e) => _edit(e, record._id)}>编辑</a>
          <a onClick={(e) => _remove(e, record._id)}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div className={cn(styles.MyFundList, className)}>
      <PageHeader className="site-page-header" title="LOF底仓列表" />
      <div style={{ textAlign: 'right' }}>
        <Space>
          <Button onClick={_add} type="primary" style={{ marginBottom: 16 }}>
            新增
          </Button>
        </Space>
      </div>

      <Table columns={columns} dataSource={list} loading={loading} key="_id" />
    </div>
  );
}
