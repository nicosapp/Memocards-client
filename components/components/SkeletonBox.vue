<template>
  <div class="skeleton bg-gray-300">
    <div class="opacity-0">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton{
  position: relative;
  overflow: hidden;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
        90deg,
        hsla(0,0%,100%,0),
        hsla(0,0%,100%,.3),
        hsla(0,0%,100%,0)
    );
    animation: shimmer 1.5s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
