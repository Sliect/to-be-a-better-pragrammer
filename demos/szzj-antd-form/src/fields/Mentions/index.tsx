import React from 'react';
import { Mentions as AntdMentions } from 'antd';
import useOptions, { Options } from '../../hooks/useOptions';
import createField from '../../createField';
import { MentionProps as AntdMentionProps } from 'antd/es/mentions';

type MentionsProps = AntdMentionProps & {
  options?: Options;
};

const Mentions: React.FC<MentionsProps> = ({ options: optionsProp, children, ...rest }) => {
  const { options } = useOptions(optionsProp || []);

  return (
    <AntdMentions {...rest}>
      {children
        ? children
        : options.map((option) => {
            return (
              <AntdMentions.Option key={option.value} value={option.value}>
                {option.label}
              </AntdMentions.Option>
            );
          })}
    </AntdMentions>
  );
};

type MentionsType = typeof Mentions;

interface MentionsInterface extends MentionsType {
  Option: typeof AntdMentions.Option;
}

const FinalMentions = createField<MentionsProps>(Mentions) as MentionsInterface;
FinalMentions.Option = AntdMentions.Option;

export default FinalMentions;
