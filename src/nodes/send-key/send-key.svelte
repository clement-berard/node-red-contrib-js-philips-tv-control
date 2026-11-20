<script module lang="ts">
  import type { SvelteNodeConfig } from '@keload/node-red-dxp/editor/svelte';
  import { NODES_CATEGORY, NODES_COLOR, NODES_ICONS } from '../../common/constants';
  import { inputKeysSelect } from './node-config';
  import type { NodeSendKeyProps } from './types';

  export const definition: SvelteNodeConfig<NodeSendKeyProps>['definition'] = {
    category: NODES_CATEGORY,
    color: NODES_COLOR,
    icon: NODES_ICONS,
    paletteLabel: 'Send Key',
  };

  export const defaults: SvelteNodeConfig<NodeSendKeyProps>['defaults'] = {
    name: { value: '' },
    tv: { value: '', type: 'philips-tv-config', required: true },
    key: { value: '' },
  };

  export function label(this: NodeSendKeyProps) {
    return this.name || this.key || 'Send Key';
  }
</script>

<script lang="ts">
  import { Row, Select } from '@keload/node-red-dxp/ui';
  import TvHead from '../../common/TvHead.svelte';

  let { node }: { node: NodeSendKeyProps } = $props();

  const options = [{ value: '', text: '-- from payload --' }, ...inputKeysSelect];
</script>

<TvHead {node} />
<Row label="Key" icon="keyboard-o"><Select bind:value={node.key} {options} /></Row>
