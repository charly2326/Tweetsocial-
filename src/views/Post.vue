<template>
  <div>
    <h1>Detalles del Post</h1>
    <p>Contenido del post: {{ postId }}</p>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['postId'],
};
</script>

