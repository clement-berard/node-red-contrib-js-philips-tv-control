import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import { jqSelector, setInputValue, watchInput } from '@keload/node-red-dxp/editor/dom-helper';
import { validators } from '@keload/node-red-dxp/utils';

interface NodeProps {
  name: string;
  url: string;
  ip: string;
}

interface NodeCredentials {
  digest_user: string;
  digest_password: string;
}

export default createEditorNode<NodeEditorProps<NodeProps>, NodeCredentials>({
  category: 'config',
  defaults: {
    name: { value: '', required: true },
    url: { value: '', required: true },
    ip: {
      value: '',
      required: true,
      validate: (v) => validators.isIP(v),
    },
  },
  credentials: {
    digest_user: { type: 'text' },
    digest_password: { type: 'password' },
  },
  label: function () {
    return this.name || 'Philips TV Configuration';
  },
  oneditprepare: function () {
    const vm = this;
    const buildFullUrl = (ip: string) => `https://${ip}:1926/6`;

    const notifyError = (message: string) => {
      // @ts-ignore
      RED.notify(`Error : ${message}`, {
        type: 'error',
        timeout: 10_000,
      });
    };

    $('#trigger-action-start-pairing').on('click', () => {
      $.ajax({
        url: 'js-philips-tv-control/pairing',
        type: 'POST',
        data: { action: 'start', ip: vm.ip || jqSelector('$$ip').val() },
        beforeSend() {
          $('#pairing-ready').addClass('hidden');
        },
        success: (response) => {
          $('#pairing-ready').removeClass('hidden');
        },
        error: (err) => {
          notifyError(err.responseJSON.message);
        },
      });
    });

    $('#trigger-action-complete-pairing').on('click', () => {
      $.ajax({
        url: 'js-philips-tv-control/pairing',
        type: 'POST',
        data: { action: 'complete', pin: jqSelector('#pairing-pin-input').val() },
        beforeSend() {
          jqSelector('#invalid-pin').addClass('hidden');
          const inputNumber = jqSelector('#pairing-pin-input').val();
          const regex = /^\d{4}$/;
          const isValid = regex.test(inputNumber as string);

          if (!isValid) {
            jqSelector('#invalid-pin').removeClass('hidden');
            return false;
          }
        },
        success: (response) => {
          $('#paring-success').removeClass('hidden');
          jqSelector('$$digest_user').val(response.user);
          jqSelector('$$digest_password').val(response.password);
        },
        error: (err) => {
          notifyError(err.responseJSON.message);
        },
      });
    });

    if (vm.ip) {
      if (validators.isIP(vm.ip)) {
        $('#pairing-section').removeClass('hidden');
      }
    }

    watchInput(['$$ip'], ([ipValue]) => {
      const url = buildFullUrl(ipValue);
      setInputValue('$$url', url);
      if (validators.isIP(ipValue)) {
        $('#pairing-section').removeClass('hidden');
      } else {
        $('#pairing-section').addClass('hidden');
      }
    });
  },
});
