<template>
  <div class="error-boundary">
    <slot v-if="!error" />
    <div class="error-message" v-else>页面加载失败，请稍后重试</div>
  </div>
</template>
<script>
export default {
  props: {
    error: String,
  },
};
</script>
