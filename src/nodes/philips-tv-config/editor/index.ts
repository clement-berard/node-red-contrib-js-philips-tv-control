import { type NodeEditorProps, createEditorNode } from '@keload/node-red-dxp/editor';
import { setInputValue, watchInput } from '@keload/node-red-dxp/editor/dom-helper';
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
  oneditprepare: () => {
    watchInput(['$$ip'], ([ipValue]) => {
      setInputValue('$$url', `https://${ipValue}:1926/6`);
    });
  },
});
