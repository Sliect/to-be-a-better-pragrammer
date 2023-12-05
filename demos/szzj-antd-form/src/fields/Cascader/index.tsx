import Cascader from './Cascader';
import LazyCascader from './LazyCascader';
import AuthedCascader from './AuthedCascader';

type CascaderType = typeof Cascader;

interface CascaderInterface extends CascaderType {
  /**
   * 远程逐级拉取数据的级联下拉框，约定了 value 值为 CascaderOptionType[] 形式
   */
  LazyCascader: typeof LazyCascader;
  /**
   * 带权限的级联下拉框
   */
  AuthedCascader: typeof AuthedCascader;
}

const FinalCascader = Cascader as CascaderInterface;
FinalCascader.LazyCascader = LazyCascader;
FinalCascader.AuthedCascader = AuthedCascader;

export default FinalCascader;
