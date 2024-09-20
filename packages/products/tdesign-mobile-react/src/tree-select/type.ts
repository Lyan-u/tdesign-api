/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TreeOptionData, KeysType } from '../common';

export interface TdTreeSelectProps<DataOption extends TreeOptionData = TreeOptionData> {
  /**
   * 高度，默认单位为 px
   * @default 336
   */
  height?: string | number;
  /**
   * 用来定义 value / label 在 `options` 中对应的字段别名
   */
  keys?: KeysType;
  /**
   * 是否允许多选
   * @default false
   */
  multiple?: boolean;
  /**
   * 选项
   * @default []
   */
  options?: Array<DataOption>;
  /**
   * 选中值
   */
  value?: TreeSelectValue;
  /**
   * 选中值，非受控属性
   */
  defaultValue?: TreeSelectValue;
}

export type TreeSelectValue = string | number | Array<TreeSelectValue>;
