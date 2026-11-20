<script module lang="ts">
  import type { SvelteNodeConfig } from '@keload/node-red-dxp/editor/svelte';
  import { NODES_CATEGORY, NODES_COLOR, NODES_ICONS } from '../../common/constants';
  import nodeConfig from './node-config';
  import type { InfoNodeProps } from './types';

  export const definition: SvelteNodeConfig<InfoNodeProps>['definition'] = {
    category: NODES_CATEGORY,
    color: NODES_COLOR,
    icon: NODES_ICONS,
    paletteLabel: 'Info',
  };

  export const defaults: SvelteNodeConfig<InfoNodeProps>['defaults'] = {
    name: { value: '' },
    tv: { value: '', type: 'philips-tv-config', required: true },
    kind: { value: '' },
  };

  export function label(this: InfoNodeProps) {
    return this.name || this.kind || 'Info';
  }
</script>

<script lang="ts">
  import { Row, Select } from '@keload/node-red-dxp/ui';
  import TvHead from '../../common/TvHead.svelte';

  let { node }: { node: InfoNodeProps } = $props();

  const options = [{ value: '', text: '-- from payload --' }, ...nodeConfig.kinds];
</script>

<TvHead {node} />
<Row label="Action" icon="bolt"><Select bind:value={node.kind} {options} /></Row>
