import React from 'react';
import { SchemaForm } from '@szzj/antd-form';

export default () => {
  return (
    <SchemaForm
      fields={[
        {
          fieldType: 'input',
          name: 'name',
          label: '姓名',
        },
        {
          fieldType: 'radio',
          name: 'sex',
          label: '性别',
          options: [
            {
              label: '男',
              value: 'male',
            },
            {
              label: '女',
              value: 'female',
            },
          ],
        },
        {
          fieldType: 'checkbox',
          name: 'fruit',
          label: '喜欢的水果',
          options: [
            {
              label: '苹果',
              value: 'apple',
            },
            {
              label: '橘子',
              value: 'orange',
            },
          ],
          dynamicProps: [
            (form) => {
              const sex = form.getFieldValue('sex');

              return {
                options: () => {
                  if (sex === 'male') {
                    console.log('sex', sex);
                    return Promise.resolve([
                      {
                        label: '苹果',
                        value: 'apple',
                      },
                      {
                        label: '橘子',
                        value: 'orange',
                      },
                    ]);
                  }

                  return Promise.resolve([{ label: '香蕉', value: 'banana' }]);
                },
              };
            },
            ['sex'],
          ],
        },
        {
          fieldType: 'radio',
          name: 'fruitRadio',
          label: '喜欢的水果单选',
          options: [
            {
              label: '苹果',
              value: 'apple',
            },
            {
              label: '橘子',
              value: 'orange',
            },
          ],
          dynamicProps: [
            (form) => {
              const sex = form.getFieldValue('sex');

              return {
                options: () => {
                  if (sex === 'male') {
                    console.log('sex', sex);
                    return Promise.resolve([
                      {
                        label: '苹果',
                        value: 'apple',
                      },
                      {
                        label: '橘子',
                        value: 'orange',
                      },
                    ]);
                  }

                  return Promise.resolve([{ label: '香蕉', value: 'banana' }]);
                },
              };
            },
            ['sex'],
          ],
        },
        {
          fieldType: 'select',
          name: 'fruitSelect',
          label: '喜欢的水果下拉',
          options: [
            {
              label: '苹果',
              value: 'apple',
            },
            {
              label: '橘子',
              value: 'orange',
            },
          ],
          dynamicProps: [
            (form) => {
              const sex = form.getFieldValue('sex');

              return {
                options: () => {
                  if (sex === 'male') {
                    console.log('sex', sex);
                    return Promise.resolve([
                      {
                        label: '苹果',
                        value: 'apple',
                      },
                      {
                        label: '橘子',
                        value: 'orange',
                      },
                    ]);
                  }

                  return Promise.resolve([{ label: '香蕉', value: 'banana' }]);
                },
              };
            },
            ['sex'],
          ],
        },
        {
          fieldType: 'select',
          name: 'fruitSelectLabelInValue',
          label: '喜欢的水果下拉 LabelInValue',
          labelInValue: true,
          options: [
            {
              label: '苹果',
              value: 'apple',
            },
            {
              label: '橘子',
              value: 'orange',
            },
          ],
          dynamicProps: [
            (form) => {
              const sex = form.getFieldValue('sex');

              return {
                options: () => {
                  if (sex === 'male') {
                    console.log('sex', sex);
                    return Promise.resolve([
                      {
                        label: '苹果',
                        value: 'apple',
                      },
                      {
                        label: '橘子',
                        value: 'orange',
                      },
                    ]);
                  }

                  return Promise.resolve([{ label: '香蕉', value: 'banana' }]);
                },
              };
            },
            ['sex'],
          ],
        },
        {
          fieldType: 'select',
          name: 'fruitSelectMultiple',
          label: '喜欢的水果下拉 Multiple',
          mode: 'multiple',
          options: [
            {
              label: '苹果',
              value: 'apple',
            },
            {
              label: '橘子',
              value: 'orange',
            },
          ],
          dynamicProps: [
            (form) => {
              const sex = form.getFieldValue('sex');

              return {
                options: () => {
                  if (sex === 'male') {
                    console.log('sex', sex);
                    return Promise.resolve([
                      {
                        label: '苹果',
                        value: 'apple',
                      },
                      {
                        label: '橘子',
                        value: 'orange',
                      },
                    ]);
                  }

                  return Promise.resolve([{ label: '香蕉', value: 'banana' }]);
                },
              };
            },
            ['sex'],
          ],
        },
        {
          fieldType: 'select',
          name: 'fruitSelectUseFirstOption',
          label: '喜欢的水果下拉',
          useFirstOption: true,
          options: [
            {
              label: '苹果',
              value: 'apple',
            },
            {
              label: '橘子',
              value: 'orange',
            },
          ],
          dynamicProps: [
            (form) => {
              const sex = form.getFieldValue('sex');

              return {
                options: () => {
                  if (sex === 'male') {
                    console.log('sex', sex);
                    return Promise.resolve([
                      {
                        label: '苹果',
                        value: 'apple',
                      },
                      {
                        label: '橘子',
                        value: 'orange',
                      },
                    ]);
                  }

                  return Promise.resolve([{ label: '香蕉', value: 'banana' }]);
                },
              };
            },
            ['sex'],
          ],
        },
        {
          fieldType: 'select',
          name: 'fruitSelectLabelInValueUseFirstOption',
          label: '喜欢的水果下拉 LabelInValue',
          useFirstOption: true,
          labelInValue: true,
          options: [
            {
              label: '苹果',
              value: 'apple',
            },
            {
              label: '橘子',
              value: 'orange',
            },
          ],
          dynamicProps: [
            (form) => {
              const sex = form.getFieldValue('sex');

              return {
                options: () => {
                  if (sex === 'male') {
                    console.log('sex', sex);
                    return Promise.resolve([
                      {
                        label: '苹果',
                        value: 'apple',
                      },
                      {
                        label: '橘子',
                        value: 'orange',
                      },
                    ]);
                  }

                  return Promise.resolve([{ label: '香蕉', value: 'banana' }]);
                },
              };
            },
            ['sex'],
          ],
        },
        {
          fieldType: 'select',
          name: 'fruitSelectMultipleUseFirstOption',
          label: '喜欢的水果下拉 Multiple',
          mode: 'multiple',
          useFirstOption: true,
          options: [
            {
              label: '苹果',
              value: 'apple',
            },
            {
              label: '橘子',
              value: 'orange',
            },
          ],
          dynamicProps: [
            (form) => {
              const sex = form.getFieldValue('sex');

              return {
                options: () => {
                  if (sex === 'male') {
                    console.log('sex', sex);
                    return Promise.resolve([
                      {
                        label: '苹果',
                        value: 'apple',
                      },
                      {
                        label: '橘子',
                        value: 'orange',
                      },
                    ]);
                  }

                  return Promise.resolve([{ label: '香蕉', value: 'banana' }]);
                },
              };
            },
            ['sex'],
          ],
        },
      ]}
    />
  );
};
