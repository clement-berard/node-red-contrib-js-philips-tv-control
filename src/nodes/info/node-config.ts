export default {
  kinds: [
    { value: 'tv_structure', text: 'TV Structure' },
    { value: 'tv_ambilight_info', text: 'Ambilight Info' },
    { value: 'tv_system', text: 'System Info' },
  ],
  getAvailableKinds() {
    return this.kinds.map((kind) => kind.value);
  },
};
