<template>
  <div class="text-blue-500 border border-gray-400 rounded-lg p-4 m-3">
    <h2 class="font-medium text-2xl text-gray-700">
      Table of Content
    </h2>
    <div class="text-sm">
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
