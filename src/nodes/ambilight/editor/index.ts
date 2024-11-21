import { type NodeEditorProps, createEditorNode, createReactiveField, domHelper } from '@keload/node-red-dxp/editor';

import { actionsDefinition, assumedValues } from '../node-config';
import type { NodeAmbilightProps } from '../types';

const Ambilight = createEditorNode<NodeEditorProps<NodeAmbilightProps>>({
  category: 'my_cat',
  color: '#c4b256',
  defaults: {
    name: { value: '', required: true },
    action: { value: '', required: true },
    value: { value: '', required: true },
    returnInfo: { value: false },
    tv: { value: '', type: 'philips-tv-config', required: true },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-tower-broadcast',
  label: function () {
    return this.name || 'Ambilight';
  },
  oneditprepare: function () {
    const vm = this;

    const { initSelect, watchInput, jqSelector } = domHelper<NodeAmbilightProps>(vm);

    initSelect('$action', actionsDefinition, {
      emptyValue: '-- From msg.payload --',
    });

    function handleSelectActionChange(currentAction: string) {
      const options = (assumedValues[currentAction] || []).map((value) => ({ value, text: value }));
      initSelect('$value', options, {
        selected: Number.isNaN(Number(vm.value)) ? vm.value : Number(vm.value),
      });
    }

    handleSelectActionChange(this.action);

    watchInput(['$action'], ([actionValue]) => {
      console.log('actionValue', actionValue);
      handleSelectActionChange(actionValue);
    });
  },
});

export default Ambilight;
