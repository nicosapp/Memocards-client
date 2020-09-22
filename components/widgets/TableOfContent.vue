<template>
  <div class="w-full text-blue-500">
    <ol>
      <li>SomeText</li>
      <li>
        SomeText
        <ol>
          <li>SomeText</li>
          <li>SomeText</li>
          <li>SomeText</li>
          <li>SomeText</li>
        </ol>
      </li>
      <li>SomeText</li>
      <li>
        SomeText
        <ol>
          <li>SomeText</li>
          <li>SomeText</li>
        </ol>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  props: {
    postContent: {
      required: true,
      type: String
    }
  }
}
</script>
