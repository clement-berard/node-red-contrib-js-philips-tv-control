import { type NodeEditorProps, createEditorNode, domHelper } from '@keload/node-red-dxp/editor';
import nodeConfig from '../node-config';
import type { InfoNodeProps } from '../types';

const MenuItem = createEditorNode<NodeEditorProps<InfoNodeProps>>({
  category: 'my_cat',
  color: '#a6bbcf',
  defaults: {
    name: { value: '', required: true },
    tv: { value: '', type: 'philips-tv-config', required: true },
    kind: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-tower-broadcast',
  label: function () {
    return this.name || 'MenuItem';
  },
  oneditprepare: function () {
    const { initSelect } = domHelper<InfoNodeProps>(this);

    initSelect('$kind', nodeConfig.kinds);
  },
});

export default MenuItem;
