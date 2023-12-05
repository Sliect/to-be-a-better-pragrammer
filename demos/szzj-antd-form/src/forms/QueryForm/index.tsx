import React, { useMemo, useCallback, useState } from 'react';
import { Row, Col, Button } from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import Form from '../../Form';
import { ClsPrefix } from '../../consts';
import './index.less';
import type { FormInstance } from 'antd/es/form';

type QueryFormProps<T> = {
  form?: FormInstance;
  layout?: 'horizontal' | 'vertical';
  expandable: false | number;
  cols?: number | { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number };
  onSearch?: (vals?: T) => void;
  onReset?: () => void;
  formProps?: Parameters<typeof Form>[0];
  btns:
    | React.ReactNode
    | ((handlers: { search: (vals?: T) => void; reset: () => void }) => React.ReactNode);
  children: React.ReactNode[];
};

const QueryForm: React.FC<QueryFormProps<any>> = ({
  form: formProp,
  layout = 'horizontal',
  expandable = false,
  cols = { lg: 2, xl: 3, xxl: 4 },
  onSearch,
  onReset,
  formProps,
  btns,
  children,
}) => {
  const [innerForm] = Form.useForm();
  const form = useMemo(() => {
    return formProp || innerForm;
  }, [formProp, innerForm]);

  const [expanded, setExpanded] = useState<boolean>(false);
  const toggleExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const grids = useMemo(() => {
    const result: {
      span?: number;
      xs?: { span: number };
      sm?: { span: number };
      md?: { span: number };
      lg?: { span: number };
      xl?: { span: number };
      xxl?: { span: number };
    } = {};
    if (typeof cols === 'number') {
      result.span = 24 / cols;
      return result;
    }

    if (cols.xs) result.xs = { span: 24 / cols.xs };
    if (cols.sm) result.sm = { span: 24 / cols.sm };
    if (cols.md) result.md = { span: 24 / cols.md };
    if (cols.lg) result.lg = { span: 24 / cols.lg };
    if (cols.xl) result.xl = { span: 24 / cols.xl };
    if (cols.xxl) result.xxl = { span: 24 / cols.xxl };
    return result;
  }, [cols]);

  const handleSearch = useCallback(() => {
    const values = form.getFieldsValue();
    const result: Record<string, any> = {};
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined) result[key] = values[key];
    });

    if (onSearch) onSearch(result);
  }, [form, onSearch]);

  const handleReset = useCallback(() => {
    form.resetFields();
    if (onReset) onReset();
  }, [form, onReset]);

  const btnsNode = useMemo(() => {
    if (typeof btns === 'function') {
      return btns({
        search: handleSearch,
        reset: handleReset,
      });
    } else if (btns) {
      return btns;
    }
  }, [btns, handleSearch, handleReset]);

  const queryFormStyle = useMemo(() => {
    let style = {};
    if (expandable) style = { paddingRight: 205 };
    return style;
  }, [expandable]);

  const btnsStyle = useMemo(() => {
    let style = {};
    if (layout === 'vertical') style = { marginTop: '30px' };
    return style;
  }, [expandable]);

  const expandNode = useMemo(() => {
    if (!expandable) return null;

    return expandable ? (
      <a style={{ marginLeft: 10 }} onClick={toggleExpand}>
        展开
        {expanded ? <UpOutlined /> : <DownOutlined />}
      </a>
    ) : (
      <a style={{ marginLeft: 10 }} onClick={toggleExpand}>
        收起
      </a>
    );
  }, [expandable, expanded, toggleExpand]);

  return (
    <Form {...formProps} form={form} className={`${ClsPrefix}-query-form-wrapper`} layout={layout}>
      <div className={`${ClsPrefix}-query-form`} style={queryFormStyle}>
        <Row gutter={32} style={{ width: 'calc(100% + 32px)' }}>
          {React.Children.toArray(children)
            .filter((child) => !!child)
            .map((child, index) => {
              let visible = true;
              if (expandable) {
                if (!expanded && expandable <= index) visible = false;
              }

              return visible ? (
                // eslint-disable-next-line react/no-array-index-key
                <Col key={index} {...grids}>
                  {/* @ts-ignore */}
                  {child}
                </Col>
              ) : null;
            })}
        </Row>

        {btnsNode ? (
          btnsNode
        ) : (
          <div className={`${ClsPrefix}-query-form-btns`} style={btnsStyle}>
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button style={{ marginLeft: 10 }} onClick={handleReset}>
              重置
            </Button>

            {expandNode}
          </div>
        )}
      </div>
    </Form>
  );
};

export default QueryForm;
