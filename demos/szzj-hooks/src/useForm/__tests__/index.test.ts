import { renderHook, act } from '@testing-library/react-hooks';
import useForm from '../';

describe('useForm', () => {
  // 字段注册与销毁
  describe('register & unregister field', () => {
    // register 元数据设置
    it('metadata is setted when register', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {};

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.getFieldMeta(name)).toBe(meta);
      expect(result.current.getFieldValue(name)).toBe(undefined);
      expect(result.current.getFieldsValue()).toEqual({
        test: undefined,
      });
    });

    // register 初始值设置
    it('initialValue is setted when register', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        initialValue: 'test',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.getFieldMeta(name, 'initialValue')).toBe('test');
      expect(result.current.getFieldValue(name)).toBe('test');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'test',
      });
    });

    // getFieldDecorator 初始值设置
    it('initialValue is setted when getFieldDecorator', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        initialValue: 'test',
      };

      act(() => {
        result.current.getFieldDecorator(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.getFieldMeta(name, 'initialValue')).toBe('test');
      expect(result.current.getFieldValue(name)).toBe('test');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'test',
      });
    });

    // register 对象形式深层属性设置
    it('{} deepValue is setted when register', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test.field';
      const meta = {
        initialValue: 'a',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual({ field: 'a' });
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: 'a' },
      });
    });

    // register 数组形式深层属性设置
    it('string[] deepValue is setted when register', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0]';
      const meta = {
        initialValue: 'a',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual(['a']);
      expect(result.current.getFieldsValue()).toEqual({
        test: ['a'],
      });
    });

    // register 对象数组形式深层属性设置
    it('{}[] deepValue is setted when register', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0].field';
      const meta = {
        initialValue: 'a',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual([{ field: 'a' }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: 'a' });
      expect(result.current.getFieldValue('test[0].field')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: 'a' }],
      });
    });

    // unregister 元数据清除
    it('metadata is destoryed when unregister', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        initialValue: 'a',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.getFieldMeta(name)).toBe(meta);
      expect(result.current.getFieldValue(name)).toBe('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'a',
      });

      act(() => {
        result.current.unRegisterField(name);
      });

      expect(result.current.getFieldMeta(name)).toBe(undefined);
      expect(result.current.getFieldValue(name)).toBe(undefined);
      expect(result.current.getFieldsValue()).toEqual({});
    });
  });

  // 赋值与取值
  describe('set & get field value', () => {
    // setFieldValue 值为基础类型
    it('value is updated when setFieldsValue', () => {
      const { result } = renderHook(() => useForm());

      act(() => {
        result.current.registerField('a', {
          initialValue: 'a-1',
        });
        result.current.registerField('b', {
          initialValue: 'b-1',
        });
      });
      expect(result.current.isFieldTouched('a')).toBe(false);
      expect(result.current.isFieldTouched('b')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('a')).toBe('a-1');
      expect(result.current.getFieldValue('b')).toBe('b-1');
      expect(result.current.getFieldsValue()).toEqual({
        a: 'a-1',
        b: 'b-1',
      });

      act(() => {
        result.current.setFieldsValue({
          a: '1',
          b: '2',
        });
      });

      expect(result.current.isFieldTouched('a')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('a')).toBe('1');
      expect(result.current.getFieldValue('b')).toBe('2');
      expect(result.current.getFieldsValue()).toEqual({
        a: '1',
        b: '2',
      });

      act(() => {
        result.current.setFieldsValue({
          a: '3',
        });
      });

      expect(result.current.isFieldTouched('a')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('a')).toBe('3');
      expect(result.current.getFieldValue('b')).toBe('2');
      expect(result.current.getFieldsValue()).toEqual({
        a: '3',
        b: '2',
      });

      act(() => {
        result.current.setFieldsValue({
          a: undefined,
        });
      });

      expect(result.current.isFieldTouched('a')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('a')).toBe('a-1');
      expect(result.current.getFieldValue('b')).toBe('2');
      expect(result.current.getFieldsValue()).toEqual({
        a: 'a-1',
        b: '2',
      });

      act(() => {
        result.current.setFieldsValue({
          a: null,
        });
      });

      expect(result.current.isFieldTouched('a')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('a')).toBe(null);
      expect(result.current.getFieldValue('b')).toBe('2');
      expect(result.current.getFieldsValue()).toEqual({
        a: null,
        b: '2',
      });
    });

    // setFieldValue 值为对象
    it('{} deepValue is setted when set field value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test.field';
      const meta = {
        initialValue: 'a',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual({ field: 'a' });
      expect(result.current.getFieldValue('test.field')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: 'a' },
      });

      act(() => {
        result.current.setFieldValue(name, 'b');
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual({ field: 'b' });
      expect(result.current.getFieldValue('test.field')).toEqual('b');
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: 'b' },
      });

      act(() => {
        result.current.setFieldValue('test', { field: 'c' });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual({ field: 'c' });
      expect(result.current.getFieldValue('test.field')).toEqual('c');
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: 'c' },
      });

      act(() => {
        result.current.setFieldValue(name, undefined);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      // @FIXME 父属性 fieldTouched 情况清空
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual({ field: 'a' });
      expect(result.current.getFieldValue('test.field')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: 'a' },
      });

      act(() => {
        result.current.setFieldValue(name, null);
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual({ field: null });
      expect(result.current.getFieldValue('test.field')).toEqual(null);
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: null },
      });
    });

    // setFieldValue 值为数组
    it('string[] deepValue is setted when set field value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0]';
      const meta = {
        initialValue: 'a',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual(['a']);
      expect(result.current.getFieldValue('test[0]')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: ['a'],
      });

      act(() => {
        result.current.setFieldValue(name, 'b');
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual(['b']);
      expect(result.current.getFieldValue('test[0]')).toEqual('b');
      expect(result.current.getFieldsValue()).toEqual({
        test: ['b'],
      });

      act(() => {
        result.current.setFieldValue('test', ['c']);
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual(['c']);
      expect(result.current.getFieldValue('test[0]')).toEqual('c');
      expect(result.current.getFieldsValue()).toEqual({
        test: ['c'],
      });

      act(() => {
        result.current.setFieldValue(name, undefined);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      // @FIXME 父属性 fieldTouched 情况清空
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual(['a']);
      expect(result.current.getFieldValue('test[0]')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: ['a'],
      });

      act(() => {
        result.current.setFieldValue(name, null);
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual([null]);
      expect(result.current.getFieldValue('test[0]')).toEqual(null);
      expect(result.current.getFieldsValue()).toEqual({
        test: [null],
      });
    });

    // setFieldValue 值为数组对象
    it('{}[] deepValue is setted when set field value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0].field';
      const meta = {
        initialValue: 'a',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual([{ field: 'a' }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: 'a' });
      expect(result.current.getFieldValue('test[0].field')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: 'a' }],
      });

      act(() => {
        result.current.setFieldValue(name, 'b');
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual([{ field: 'b' }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: 'b' });
      expect(result.current.getFieldValue('test[0].field')).toEqual('b');
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: 'b' }],
      });

      act(() => {
        result.current.setFieldValue('test[0]', { field: 'c' });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual([{ field: 'c' }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: 'c' });
      expect(result.current.getFieldValue('test[0].field')).toEqual('c');
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: 'c' }],
      });

      act(() => {
        result.current.setFieldValue('test', [{ field: 'd' }]);
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual([{ field: 'd' }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: 'd' });
      expect(result.current.getFieldValue('test[0].field')).toEqual('d');
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: 'd' }],
      });

      act(() => {
        result.current.setFieldValue(name, undefined);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      // @FIXME 父属性 fieldTouched 情况清空
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual([{ field: 'a' }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: 'a' });
      expect(result.current.getFieldValue('test[0].field')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: 'a' }],
      });

      act(() => {
        result.current.setFieldValue(name, null);
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual([{ field: null }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: null });
      expect(result.current.getFieldValue('test[0].field')).toEqual(null);
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: null }],
      });
    });

    // setFieldsValue 值为基础类型
    it('value is updated when set fields value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        initialValue: 'test',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue(name)).toBe('test');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'test',
      });

      act(() => {
        result.current.setFieldsValue({
          [name]: 'setFieldsValue',
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue(name)).toBe('setFieldsValue');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'setFieldsValue',
      });

      act(() => {
        result.current.setFieldsValue({
          [name]: undefined,
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue(name)).toBe('test');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'test',
      });

      act(() => {
        result.current.setFieldsValue({
          [name]: null,
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue(name)).toBe(null);
      expect(result.current.getFieldsValue()).toEqual({
        test: null,
      });
    });

    // setFieldsValue 值为数组
    it('string[] deepValue is setted when set fields value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0]';
      const meta = {
        initialValue: 'a',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual(['a']);
      expect(result.current.getFieldValue('test[0]')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: ['a'],
      });

      act(() => {
        result.current.setFieldsValue({
          test: ['b'],
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual(['b']);
      expect(result.current.getFieldValue('test[0]')).toEqual('b');
      expect(result.current.getFieldsValue()).toEqual({
        test: ['b'],
      });

      act(() => {
        result.current.setFieldsValue({
          test: [undefined],
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual(['a']);
      expect(result.current.getFieldValue('test[0]')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: ['a'],
      });

      act(() => {
        result.current.setFieldsValue({
          test: [null],
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual([null]);
      expect(result.current.getFieldValue('test[0]')).toEqual(null);
      expect(result.current.getFieldsValue()).toEqual({
        test: [null],
      });
    });

    // setFieldsValue 值为对象
    it('string[] deepValue is setted when set fields value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test.field';
      const meta = {
        initialValue: 'a',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual({ field: 'a' });
      expect(result.current.getFieldValue('test.field')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: 'a' },
      });

      act(() => {
        result.current.setFieldsValue({
          test: { field: 'b' },
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual({ field: 'b' });
      expect(result.current.getFieldValue('test.field')).toEqual('b');
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: 'b' },
      });

      act(() => {
        result.current.setFieldsValue({
          test: { field: undefined },
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual({ field: 'a' });
      expect(result.current.getFieldValue('test.field')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: 'a' },
      });

      act(() => {
        result.current.setFieldsValue({
          test: { field: null },
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual({ field: null });
      expect(result.current.getFieldValue('test.field')).toEqual(null);
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: null },
      });
    });

    // setFieldsValue 值为对象数组
    it('string[] deepValue is setted when set fields value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0].field';
      const meta = {
        initialValue: 'a',
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldTouched('test[0]')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual([{ field: 'a' }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: 'a' });
      expect(result.current.getFieldValue('test[0].field')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: 'a' }],
      });

      act(() => {
        result.current.setFieldsValue({
          test: [{ field: 'b' }],
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldTouched('test[0]')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual([{ field: 'b' }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: 'b' });
      expect(result.current.getFieldValue('test[0].field')).toEqual('b');
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: 'b' }],
      });

      act(() => {
        result.current.setFieldsValue({
          test: [{ field: undefined }],
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(false);
      expect(result.current.isFieldTouched('test')).toBe(false);
      expect(result.current.isFieldTouched('test[0]')).toBe(false);
      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual([{ field: 'a' }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: 'a' });
      expect(result.current.getFieldValue('test[0].field')).toEqual('a');
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: 'a' }],
      });

      act(() => {
        result.current.setFieldsValue({
          test: [{ field: null }],
        });
      });

      expect(result.current.isFieldTouched(name)).toBe(true);
      expect(result.current.isFieldTouched('test')).toBe(true);
      expect(result.current.isFieldTouched('test[0]')).toBe(true);
      expect(result.current.isFieldsTouched()).toBe(true);
      expect(result.current.isFormChanged()).toBe(true);
      expect(result.current.getFieldValue('test')).toEqual([{ field: null }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: null });
      expect(result.current.getFieldValue('test[0].field')).toEqual(null);
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: null }],
      });
    });

    // resetFields 值为基础类型
    it('value is reseted when reset fields', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        initialValue: 'test',
      };

      act(() => {
        result.current.registerField(name, meta);
        result.current.setFieldsValue({
          [name]: 'setFieldsValue',
        });
        result.current.resetFields();
      });

      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue(name)).toBe('test');
      expect(result.current.getFieldsValue()).toEqual({
        test: 'test',
      });
    });

    // resetFields 值为对象
    it('value is reseted when reset fields', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test.field';
      const meta = {
        initialValue: 'test',
      };

      act(() => {
        result.current.registerField(name, meta);
        result.current.setFieldsValue({
          [name]: 'setFieldsValue',
        });
        result.current.resetFields();
      });

      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual({ field: 'test' });
      expect(result.current.getFieldValue(name)).toBe('test');
      expect(result.current.getFieldsValue()).toEqual({
        test: { field: 'test' },
      });
    });

    // resetFields 值为数组
    it('value is reseted when reset fields', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0]';
      const meta = {
        initialValue: 'test',
      };

      act(() => {
        result.current.registerField(name, meta);
        result.current.setFieldsValue({
          [name]: 'setFieldsValue',
        });
        result.current.resetFields();
      });

      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual(['test']);
      expect(result.current.getFieldValue(name)).toBe('test');
      expect(result.current.getFieldsValue()).toEqual({
        test: ['test'],
      });
    });

    // resetFields 值为数组对象
    it('value is reseted when reset fields', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test[0].field';
      const meta = {
        initialValue: 'test',
      };

      act(() => {
        result.current.registerField(name, meta);
        result.current.setFieldsValue({
          [name]: 'setFieldsValue',
        });
        result.current.resetFields();
      });

      expect(result.current.isFieldsTouched()).toBe(false);
      expect(result.current.isFormChanged()).toBe(false);
      expect(result.current.getFieldValue('test')).toEqual([{ field: 'test' }]);
      expect(result.current.getFieldValue('test[0]')).toEqual({ field: 'test' });
      expect(result.current.getFieldValue(name)).toBe('test');
      expect(result.current.getFieldsValue()).toEqual({
        test: [{ field: 'test' }],
      });
    });
  });

  describe('validate field', () => {
    it('validate initial value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        rules: [
          {
            required: true,
            message: 'test is required',
          },
        ],
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      act(() => {
        result.current.validateFields().catch(() => {});
      });
      expect(result.current.getFieldError(name)).toEqual(['test is required']);
    });

    it('validate field value', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        rules: [
          {
            required: true,
            message: 'test is required',
          },
        ],
      };

      act(() => {
        result.current.registerField(name, meta);
        result.current.setFieldValue(name, 'test');
      });

      expect(result.current.getFieldValue(name)).toBe('test');

      act(() => {
        result.current.validateFields().catch(() => {});
      });
      expect(result.current.getFieldError(name)).toBe(undefined);

      // act(() => {
      //   result.current.setFieldValue(name, undefined);
      //   result.current.validateFields();
      // });
      // expect(result.current.getFieldError(name)).toBe(['test is required']);
    });

    // 空值使用 null
    it('validate cleared field', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        initialValue: 'test',
        rules: [
          {
            required: true,
            message: 'test is required',
          },
        ],
      };

      act(() => {
        result.current.registerField(name, meta);
        result.current.setFieldValue(name, null);
      });

      expect(result.current.getFieldValue(name)).toBe(null);

      act(() => {
        result.current.validateFields().catch(() => {});
      });
      expect(result.current.getFieldError(name)).toEqual(['test is required']);
    });

    it('get value after validate', () => {
      const fn = jest.fn();
      const { result } = renderHook(() => useForm());
      const name = 'test';
      const meta = {
        initialValue: 'test',
        rules: [
          {
            required: true,
            message: 'test is required',
          },
        ],
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.getFieldValue(name)).toBe('test');

      act(() => {
        result.current
          .validateFields()
          .then((vals) => {
            fn(vals);

            expect(fn).toHaveBeenCalledWith({
              test: 'test',
            });
          })
          .catch(() => {});
      });
    });

    it('get deep value after validate', () => {
      const fn = jest.fn();
      const { result } = renderHook(() => useForm());
      const name = 'test[0].field';
      const meta = {
        initialValue: 'test',
        rules: [
          {
            required: true,
            message: 'test is required',
          },
        ],
      };

      act(() => {
        result.current.registerField(name, meta);
      });

      expect(result.current.getFieldValue(name)).toBe('test');

      act(() => {
        result.current
          .validateFields()
          .then((vals) => {
            fn(vals);

            expect(fn).toHaveBeenCalledWith({
              test: [{ field: 'test' }],
            });
          })
          .catch(() => {});
      });
    });
  });

  it('pure mode: can not setFieldsValue when not registered', () => {
    const { result } = renderHook(() => useForm({ pure: true }));
    const name = 'test';
    const meta = {
      initialValue: 'test',
    };

    act(() => {
      result.current.setFieldsValue({
        [name]: 'setFieldsValue',
      });
    });

    expect(result.current.getFieldValue(name)).toBe(undefined);
    expect(result.current.getFieldsValue()).toEqual({});

    act(() => {
      result.current.registerField(name, meta);
    });

    act(() => {
      result.current.setFieldsValue({
        [name]: 'setFieldsValue',
      });
    });

    expect(result.current.getFieldValue(name)).toBe('setFieldsValue');
    expect(result.current.getFieldsValue()).toEqual({
      [name]: 'setFieldsValue',
    });
  });

  describe('reset fields', () => {
    it('reset fields', () => {
      const { result } = renderHook(() => useForm());

      act(() => {
        result.current.registerField('field1', {
          initialValue: 0,
        });
        result.current.registerField('field2', {
          initialValue: 3,
        });
        result.current.setFieldsValue({
          field1: 1,
          field2: 2,
        });
      });
      expect(result.current.isFieldChanged('field1')).toEqual(true);
      expect(result.current.isFieldChanged('field2')).toEqual(true);

      act(() => {
        result.current.resetFields(['field1']);
      });

      expect(result.current.getFieldsValue()).toEqual({
        field1: 0,
        field2: 2,
      });
      expect(result.current.isFieldChanged('field1')).toEqual(false);
      expect(result.current.isFieldChanged('field2')).toEqual(true);
    });
  });

  describe('mutate deepValue', () => {
    it('setFieldsValue', () => {
      const { result } = renderHook(() => useForm());
      const name = 'test';

      act(() => {
        result.current.setFieldsValue({
          [name]: [
            {
              field: 'a',
            },
            {
              field: 'b',
            },
          ],
        });
      });

      expect(result.current.getFieldValue(`${name}[0]`)).toEqual({
        field: 'a',
      });
      expect(result.current.getFieldValue(`${name}[0].field`)).toEqual('a');
      expect(result.current.getFieldValue(`${name}[1]`)).toEqual({
        field: 'b',
      });
      expect(result.current.getFieldValue(`${name}[1].field`)).toEqual('b');
      expect(result.current.getFieldValue(name)).toEqual([
        {
          field: 'a',
        },
        {
          field: 'b',
        },
      ]);

      act(() => {
        result.current.setFieldsValue({
          [name]: [
            {
              field: 'b',
            },
          ],
        });
        // @FIXME 避免重新引起卸载、挂载，需要 key 键相等
        // result.current.unRegisterField(`${name}[0].field`);
        // result.current.registerField(`${name}[0].field`);
      });

      expect(result.current.getFieldValue(`${name}[0]`)).toEqual({
        field: 'b',
      });
      expect(result.current.getFieldValue(`${name}[0].field`)).toEqual('b');
      expect(result.current.getFieldValue(name)).toEqual([
        {
          field: 'b',
        },
      ]);
    });
  });
});
