<template>
  <MicroApp onHistoryInit="historyInitHandler"></MicroApp>
</template>

<script>
export default {
  props: {
    url: undefined,
  },
  created() {
    this.$refs.history = undefined;
    // url 的变更不会透传给下游，组件内自己会处理掉，所以这里直接用 ref 来存
    this.$refs.historyOpts = {
      type: 'abstract',
      initialEntries: [this.url],
      initialIndex: 1,
    };
  },
  watch: {
    url(curr) {
      if (this.$refs.history && curr) {
        this.$refs.history.push(curr);
      }
    },
    name() {
      this.$refs.historyOpts = {
        type: 'abstract',
        initialEntries: [this.url],
        initialIndex: 1,
      };
    },
  },
  methods: {
    historyInitHandler(h) {
      this.$refs.history = h;
    },
  },
};
</script>
