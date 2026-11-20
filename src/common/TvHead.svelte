<script lang="ts">
  import { ConfigSelect, Input, Row, useT } from '@keload/node-red-dxp/ui';

  let { node }: { node: { tv: string; name: string } } = $props();

  const t = useT();
</script>

<Row label={t('tv', 'TV')} icon="tv">
  <ConfigSelect bind:value={node.tv} type="philips-tv-config" property="tv" />
</Row>
<Row label={t('name')} icon="tag"><Input bind:value={node.name} /></Row>
