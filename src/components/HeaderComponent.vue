<template>
  <header class="header-container">
    <router-link to="/">
      <img class="logo" src="/public/logo.png" />
    </router-link>
  </header>
</template>

<style scoped>
.header-container {
  padding: 20px 0;
  margin-bottom: 50px;
}
.logo {
  width: 200px;
  border-radius: 80px;
  overflow: hidden;
  border: 1px solid white;
}
</style>
