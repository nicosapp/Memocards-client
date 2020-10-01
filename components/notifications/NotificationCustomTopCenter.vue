<template>
  <notifications
    group="app"
    class="notification-custom-group"
    position="top center"
    :width="600"
  >
    <template slot="body" slot-scope="props">
      <div class="notification-custom relative" :class="[props.item.type]">
        <div class="close absolute cursor-pointer top-0 right-0 m-2 flex items-center justify-center h-6 w-6" @click="props.close">
          <IconTimes class="stroke-3 h-4 w-4" />
        </div>
        <div class="title">
          {{ props.item.title }}
        </div>
        <div class="content" v-html="props.item.text" />
      </div>
    </template>
  </notifications>
</template>

<style scoped lang="scss">
.notification-custom-group{
  @apply mt-6  w-6/12;
}
.notification-custom {
  border-left: 7px solid;
   @apply py-4  my-1 bg-blue-200 border-blue-300 text-blue-600 rounded;

  .title{
    @apply font-medium text-base;
  }
  .content{
    @apply text-sm;
  }
  .title, .content{
    @apply w-full px-3
  }
  &.warn {
     @apply bg-yellow-100 border-yellow-300 text-yellow-600;
  }

  &.error {
    @apply bg-red-100 border-red-300 text-red-600;
  }

  &.success {
    @apply bg-green-100 border-green-300 text-green-600;
  }
}
</style>
