/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdAvatarProps } from './type';
import { PropType } from 'vue';

export default {
  /** 头像替换文本，仅当图片加载失败时有效 */
  alt: {
    type: String,
    default: '',
  },
  /** 子元素内容 */
  content: {
    type: [String, Function] as PropType<TdAvatarProps['content']>,
  },
  /** 子元素内容，同 content */
  default: {
    type: [String, Function] as PropType<TdAvatarProps['default']>,
  },
  /** 加载失败时隐藏图片 */
  hideOnLoadFailed: Boolean,
  /** 图标 */
  icon: {
    type: Function as PropType<TdAvatarProps['icon']>,
  },
  /** 图片地址 */
  image: {
    type: String,
    default: '',
  },
  /** 透传至 Image 组件 */
  imageProps: {
    type: Object as PropType<TdAvatarProps['imageProps']>,
  },
  /** 形状。优先级高于 AvatarGroup.shape 。Avatar 单独存在时，默认值为 circle。如果父组件 AvatarGroup 存在，默认值便由 AvatarGroup.shape 决定 */
  shape: {
    type: String as PropType<TdAvatarProps['shape']>,
    validator(val: TdAvatarProps['shape']): boolean {
      if (!val) return true;
      return ['circle', 'round'].includes(val);
    },
  },
  /** 尺寸，示例值：small/medium/large/24px/38px 等。优先级高于 AvatarGroup.size 。Avatar 单独存在时，默认值为 medium。如果父组件 AvatarGroup 存在，默认值便由 AvatarGroup.size 决定 */
  size: {
    type: String,
    default: '',
  },
  /** 点击时触发 */
  onClick: Function as PropType<TdAvatarProps['onClick']>,
  /** 右键点击时触发 */
  onContextmenu: Function as PropType<TdAvatarProps['onContextmenu']>,
  /** 图片加载失败时触发 */
  onError: Function as PropType<TdAvatarProps['onError']>,
  /** 鼠标移入时触发 */
  onHover: Function as PropType<TdAvatarProps['onHover']>,
};
