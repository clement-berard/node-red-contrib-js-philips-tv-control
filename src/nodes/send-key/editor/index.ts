import { type NodeEditorProps, createEditorNode, domHelper } from '@keload/node-red-dxp/editor';
import { inputKeysSelect } from '../node-config';
import type { NodeSendKeyProps } from '../types';

const SendKey = createEditorNode<NodeEditorProps<NodeSendKeyProps>>({
  category: 'my_cat',
  color: '#a6bbcf',
  defaults: {
    name: { value: '' },
    tv: { value: '', type: 'philips-tv-config', required: true },
    key: { value: '' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-tower-broadcast',
  label: function () {
    return this.name || this.key || 'SendKey';
  },
  oneditprepare: function () {
    const { initSelect } = domHelper<NodeSendKeyProps>(this);
    initSelect('$key', inputKeysSelect, {
      emptyValue: '-- From payload --',
    });
  },
});

export default SendKey;
