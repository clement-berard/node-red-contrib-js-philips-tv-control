import { type NodeEditorProps, createEditorNode, domHelper } from '@keload/node-red-dxp/editor';
import isIP from 'validator/es/lib/isIP';

interface NodeProps {
  name: string;
  url: string;
  ip: string;
  digest_user: string;
  digest_password: string;
}

export default createEditorNode<NodeEditorProps<NodeProps>>({
  category: 'config',
  defaults: {
    name: { value: '', required: true },
    url: { value: '', required: true },
    ip: {
      value: '',
      required: true,
      validate: (v) => isIP(v),
    },
    digest_user: { value: '', required: true },
    digest_password: { value: '', required: true },
  },
  label: function () {
    return this.name || 'Philips TV Configuration';
  },
  oneditprepare: function () {
    const { watchInput, setInputValue } = domHelper<NodeProps>(this);
    watchInput(['$$ip'], ([ipValue]) => {
      setInputValue('$$url', `https://${ipValue}:1926/6`);
    });
  },
});
