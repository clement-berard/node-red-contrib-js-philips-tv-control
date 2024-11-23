import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import { initSelect, watchInput } from '@keload/node-red-dxp/editor/dom-helper';
import { NODES_CATEGORY, NODES_COLOR, NODES_ICONS } from '../../../common/constants';
import { actionsDefinition, assumedValues } from '../node-config';
import type { NodeAmbilightProps } from '../types';

const Ambilight = createEditorNode<NodeEditorProps<NodeAmbilightProps>>({
  category: NODES_CATEGORY,
  color: NODES_COLOR,
  defaults: {
    name: { value: '' },
    action: { value: '', required: true },
    value: { value: '', required: true },
    returnInfo: { value: false },
    tv: { value: '', type: 'philips-tv-config', required: true },
  },
  inputs: 1,
  outputs: 1,
  icon: NODES_ICONS,
  label: function () {
    return this.name || this.action || 'Ambilight';
  },
  oneditprepare: function () {
    initSelect('$action', actionsDefinition, {
      emptyValue: '-- From msg.payload --',
      selected: this.action,
    });

    function handleSelectActionChange(currentAction: string) {
      const options = (assumedValues[currentAction] || []).map((value) => ({ value, text: value }));
      initSelect('$value', options);
    }

    handleSelectActionChange(this.action);

    watchInput(['$action'], ([actionValue]) => {
      handleSelectActionChange(actionValue);
    });
  },
});

export default Ambilight;
