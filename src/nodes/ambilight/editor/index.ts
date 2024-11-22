import { type NodeEditorProps, createEditorNode, createReactiveField, domHelper } from '@keload/node-red-dxp/editor';
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
    const { initSelect, watchInput, jqSelector } = domHelper<NodeAmbilightProps>(this);

    initSelect('$action', actionsDefinition, {
      emptyValue: '-- From msg.payload --',
    });

    function handleSelectActionChange(currentAction: string) {
      const options = (assumedValues[currentAction] || []).map((value) => ({ value, text: value }));
      initSelect('$value', options);
    }

    handleSelectActionChange(this.action);

    watchInput(['$action'], ([actionValue]) => {
      console.log('actionValue', actionValue);
      handleSelectActionChange(actionValue);
    });
  },
});

export default Ambilight;
