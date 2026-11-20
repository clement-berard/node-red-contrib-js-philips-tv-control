<script module lang="ts">
  import type { SvelteNodeConfig } from '@keload/node-red-dxp/editor/svelte';
  import { NODES_CATEGORY, NODES_COLOR, NODES_ICONS } from '../../common/constants';
  import { actionsDefinition, assumedValues } from './node-config';
  import type { NodeAmbilightProps } from './types';

  export const definition: SvelteNodeConfig<NodeAmbilightProps>['definition'] = {
    category: NODES_CATEGORY,
    color: NODES_COLOR,
    icon: NODES_ICONS,
    paletteLabel: 'Ambilight',
  };

  export const defaults: SvelteNodeConfig<NodeAmbilightProps>['defaults'] = {
    name: { value: '' },
    action: { value: '' },
    value: { value: '' },
    returnInfo: { value: false },
    tv: { value: '', type: 'philips-tv-config', required: true },
  };

  export function label(this: NodeAmbilightProps) {
    return this.name || this.action || 'Ambilight';
  }
</script>

<script lang="ts">
  import { Checkbox, Row, Select } from '@keload/node-red-dxp/ui';
  import TvHead from '../../common/TvHead.svelte';

  let { node }: { node: NodeAmbilightProps } = $props();

  const actionOptions = [{ value: '', text: 'Select an action' }, ...actionsDefinition];

  // the values of the current action, none when the action takes no value
  const valueOptions = $derived(assumedValues[node.action as keyof typeof assumedValues]);

  // a new action starts on the first of its values
  function resetValue() {
    node.value = String(valueOptions?.[0] ?? '');
  }
</script>

<TvHead {node} />
<Row label="Action" icon="bolt">
  <Select bind:value={node.action} options={actionOptions} onchange={resetValue} />
</Row>
{#if valueOptions}
  <Row label="Value" icon="cube"><Select bind:value={node.value} options={valueOptions} /></Row>
{/if}
<Row label="return info" icon="table">
  <Checkbox bind:checked={node.returnInfo} text="Return ambilight information after operation" />
</Row>
