<template>
  <notifications
    group="custom-template"
    position="bottom right"
  >
    <template slot="body" slot-scope="props">
      <div>
        <a class="title">
          {{ props.item.title }}
        </a>
        <a class="close" @click="props.close">
          <i class="fa fa-fw fa-close" />
        </a>
        <div v-html="props.item.text" />
      </div>
    </template>
  </notifications>
</template>
