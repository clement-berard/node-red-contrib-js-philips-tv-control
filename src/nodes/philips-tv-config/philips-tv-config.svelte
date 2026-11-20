<script module lang="ts">
  import type { SvelteNodeConfig } from '@keload/node-red-dxp/editor/svelte';
  import { isValidIP } from '@keload/node-red-dxp/utils';
  import type { TVConfig } from './types';

  export const definition: SvelteNodeConfig<TVConfig>['definition'] = {
    category: 'config',
    credentials: { digest_user: { type: 'text' }, digest_password: { type: 'password' } },
  };

  export const defaults: SvelteNodeConfig<TVConfig>['defaults'] = {
    name: { value: '', required: true },
    url: { value: '', required: true },
    ip: { value: '', required: true, validate: (v: string) => isValidIP(v) },
  };

  export function label(this: TVConfig) {
    return this.name || 'Philips TV Configuration';
  }
</script>

<script lang="ts">
  import { Button, Hint, Input, notifyError, Row, useT } from '@keload/node-red-dxp/ui';
  import type { ButtonState } from '@keload/node-red-dxp/ui/Button.svelte';

  let { node }: { node: TVConfig & { credentials: { digest_user: string; digest_password: string } } } = $props();

  const t = useT();
  const jq = (globalThis as any).jQuery;

  let startState = $state<ButtonState>('idle');
  let completeState = $state<ButtonState>('idle');
  let pairingReady = $state(false);
  let pin = $state('');
  let invalidPin = $state(false);

  const canPair = $derived(isValidIP(node.ip));

  // the API url follows the IP (port 1926, version 6)
  $effect(() => {
    if (node.ip) {
      node.url = `https://${node.ip}:1926/6`;
    }
  });

  function startPairing() {
    pairingReady = false;
    completeState = 'idle';
    startState = 'loading';
    jq.ajax({
      url: 'js-philips-tv-control/pairing',
      type: 'POST',
      data: { action: 'start', ip: node.ip },
      success: () => {
        pairingReady = true;
        startState = 'success';
      },
      error: (err: any) => {
        startState = 'error';
        notifyError(err.responseJSON?.message ?? err.statusText);
      },
    });
  }

  function completePairing() {
    invalidPin = !/^\d{4}$/.test(pin);
    if (invalidPin) {
      return;
    }
    completeState = 'loading';
    jq.ajax({
      url: 'js-philips-tv-control/pairing',
      type: 'POST',
      data: { action: 'complete', pin },
      success: (response: { user: string; password: string }) => {
        completeState = 'success';
        node.credentials.digest_user = response.user;
        node.credentials.digest_password = response.password;
      },
      error: (err: any) => {
        completeState = 'error';
        notifyError(err.responseJSON?.message ?? err.statusText);
      },
    });
  }
</script>

<Row label={t('name')} icon="tag" field="name"><Input bind:value={node.name} /></Row>
<Row label="TV IP" icon="link" field="ip"><Input bind:value={node.ip} placeholder="192.168.1.22" /></Row>
<Row label="API Url" icon="link">
  <Input bind:value={node.url} readonly />
  <Hint fullWidth>
    Port <span class="font-bold">1926</span> and version <span class="font-bold">6</span> is automatically added to
    the API Url.
  </Hint>
</Row>

<div class="alert alert-info text-center">
  <p>If you already have credentials, you can fill in the following fields</p>
  <p>Otherwise, you can try to pair the TV below.</p>
</div>

<Row label="Digest User" icon="user">
  <Input bind:value={node.credentials.digest_user} placeholder="Digest user name" />
</Row>
<Row label="digest Password" icon="lock">
  <Input type="password" bind:value={node.credentials.digest_password} placeholder="Digest password" />
</Row>

{#if canPair}
  <div class="form-row" style="display: flex; flex-direction: column; align-items: center; gap: 16px; margin-top: 20px">
    <Button icon="link" state={startState} onclick={startPairing}>Start Pairing</Button>
    {#if pairingReady}
      <div class="alert alert-success text-center" style="margin: 0; width: 100%">
        <p>Your TV is ready to pair. 🎉</p>
        <p>Please enter the pin code displayed on your TV.</p>
      </div>
      <input type="text" class="text-center" style="width: 140px; margin: 0" placeholder="Enter code" bind:value={pin} />
      {#if invalidPin}
        <div class="text-red-800">Pin must be 4 digits.</div>
      {/if}
      <Button icon="key" state={completeState} onclick={completePairing}>Complete Pairing</Button>
      {#if completeState === 'success'}
        <div class="alert alert-success text-center" style="margin: 0; width: 100%">
          Your TV is successfully paired. 🎉
        </div>
      {/if}
    {/if}
  </div>
{/if}
