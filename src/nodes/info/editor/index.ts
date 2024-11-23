import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import { initSelect } from '@keload/node-red-dxp/editor/dom-helper';
import { NODES_CATEGORY, NODES_COLOR, NODES_ICONS } from '../../../common/constants';
import nodeConfig from '../node-config';
import type { InfoNodeProps } from '../types';

const Info = createEditorNode<NodeEditorProps<InfoNodeProps>>({
  category: NODES_CATEGORY,
  color: NODES_COLOR,
  defaults: {
    name: { value: '' },
    tv: { value: '', type: 'philips-tv-config', required: true },
    kind: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: NODES_ICONS,
  label: function () {
    return this.name || this.kind || 'Info';
  },
  oneditprepare: () => {
    initSelect('$kind', nodeConfig.kinds);
  },
});

export default Info;
