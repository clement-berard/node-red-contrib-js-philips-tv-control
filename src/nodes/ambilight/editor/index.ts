import { createEditorNode, type NodeEditorProps } from '@keload/node-red-dxp/editor';
import { initSelect, watchInput } from '@keload/node-red-dxp/editor/dom-helper';
import { NODES_CATEGORY, NODES_COLOR, NODES_ICONS } from '../../../common/constants';
import { actionsDefinition, assumedValues } from '../node-config';
import type { NodeAmbilightProps } from '../types';

const Ambilight = createEditorNode<NodeEditorProps<NodeAmbilightProps>>({
  category: NODES_CATEGORY,
  color: NODES_COLOR,
  defaults: {
    name: { value: '' },
    action: { value: '' },
    value: { value: '' },
    returnInfo: { value: false },
    tv: { value: '', type: 'philips-tv-config', required: true },
  },
  inputs: 1,
  outputs: 1,
  icon: NODES_ICONS,
  paletteLabel: 'Ambilight',
  label: function () {
    return this.name || this.action || 'Ambilight';
  },
  oneditprepare: function () {
    initSelect('$action', actionsDefinition, {
      emptyValue: 'Select an action',
      selected: this.action,
    });

    const handleSelectActionChange = (currentAction: string) => {
      const options = (assumedValues[currentAction] || []).map((value: string) => ({ value, text: value }));
      initSelect('$value', options, {
        selected: this.value,
      });
    };

    handleSelectActionChange(this.action);

    watchInput(['$action'], ([actionValue]) => {
      handleSelectActionChange(actionValue);
    });
  },
});

export default Ambilight;
