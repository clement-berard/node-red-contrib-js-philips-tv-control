import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import { initSelect } from '@keload/node-red-dxp/editor/dom-helper';
import { NODES_CATEGORY, NODES_COLOR, NODES_ICONS } from '../../../common/constants';
import { inputKeysSelect } from '../node-config';
import type { NodeSendKeyProps } from '../types';

const SendKey = createEditorNode<NodeEditorProps<NodeSendKeyProps>>({
  category: NODES_CATEGORY,
  color: NODES_COLOR,
  defaults: {
    name: { value: '' },
    tv: { value: '', type: 'philips-tv-config', required: true },
    key: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: NODES_ICONS,
  label: function () {
    return this.name || this.key || 'SendKey';
  },
  oneditprepare: () => {
    initSelect('$key', inputKeysSelect, {
      emptyValue: '-- From payload --',
    });
  },
});

export default SendKey;
