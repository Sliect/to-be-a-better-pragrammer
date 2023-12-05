import { renderHook, act } from '@testing-library/react-hooks';
// import React, { useMemo } from 'react';
// import { Form } from 'antd';
import useModal from '../';

// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation((query) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });

describe('useModal', () => {
  describe('show & hide modal', () => {
    it('show modal', () => {
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.show();
      });

      expect(result.current.visible).toBe(true);
      expect(result.current.dataSource).toEqual(undefined);
    });

    it('show modal with dataSource', () => {
      const { result } = renderHook(() => useModal());
      const dataSource = {
        test: 'test',
      };

      act(() => {
        result.current.show(dataSource);
      });

      expect(result.current.visible).toBe(true);
      expect(result.current.dataSource).toBe(dataSource);
    });

    it('hide modal', () => {
      const { result } = renderHook(() => useModal());
      const dataSource = {
        test: 'test',
      };

      act(() => {
        result.current.show(dataSource);
        result.current.hide();
      });

      expect(result.current.visible).toBe(false);
      expect(result.current.dataSource).toEqual(undefined);
    });
  });

  // describe('show & hide modal with form', () => {
  //   it('show modal', () => {
  //     const { result, rerender } = renderHook(() => {
  //       const [form] = Form.useForm();
  //       const formNode = useMemo(() => {
  //         <Form form={form}>
  //           <Form.Item name="test">
  //             <div />
  //           </Form.Item>
  //         </Form>;
  //       }, []);

  //       const modal = useModal<{ test: string }>({
  //         form,
  //         format: (dataSource) => {
  //           return {
  //             test: dataSource?.test + '111',
  //           };
  //         },
  //       });

  //       return {
  //         modal,
  //         formNode,
  //       };
  //     });

  //     act(() => {
  //       result.current.modal.show({
  //         test: 'test',
  //       });
  //     });

  //     expect(result.current.modal.visible).toEqual(true);
  //     expect(result.current.modal.form?.getFieldsValue()).toEqual({
  //       test: 'test111',
  //     });
  //   });
  // });
});
