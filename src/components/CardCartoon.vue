<script setup lang="ts">
import type { ICard } from '@/models';

defineProps<{
  cardInfo: ICard;
}>();
</script>

<template>
  <div class="blog-cartoon-container" :to="{ path: `/event/${cardInfo.id}` }">
    <img :src="cardInfo.image" class="blog-img" />
    <div class="avatar">
      <img :src="cardInfo.image" :alt="cardInfo.name" />
    </div>
    <div class="blog-info" :class="cardInfo.status ==='Alive' ? 'alive' : 'dead'">
      <div class="status">{{ cardInfo.status }} - {{ cardInfo.species }}</div>
      <div class="description">{{ cardInfo.location.name }}</div>
      <div class="fullName">{{ cardInfo.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  width: 126px;
  height: 126px;
  position: absolute;
  border: 5px solid white;
  z-index: 1;
  border-radius: 50%;
  overflow: hidden;
  top: -22px;
  left: -19px;
}

.avatar img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.title {
  font-size: 47px;
  font-weight: 700;
  line-height: 57.29px;
  text-align: left;
  color: #5466ed;
  margin-bottom: 23px;
}

.blog-section {
  padding: 62px 110px;
  text-align: center;
}

.blog-section h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

.blog-cartoon-container {
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 266px;
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.3s;
  margin: 10px;
}
.blog-cartoon-container:hover {
  transform: scale(1.03);
}

.blog-img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  z-index: -1;
  object-fit: cover;
  object-position: center;
  border-radius: 16px;
  filter: blur(10px);
}

.blog-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100%;
  color: white;
  padding: 10px 29px;
  border: 5px solid ;
  border-radius: 10px;
}

.alive{
  border-color: rgb(85, 204, 68)

}
.dead{
border-color: rgb(214, 61, 46)
}

.blog-info h3 {
  font-size: 20px;
}

.status {
  font-size: 15px;
  font-weight: 400;
  line-height: 13.41px;
  text-align: left;
  color: white;
}
.fullName {
  font-size: 32px;
  font-weight: 700;
  line-height: 39.01px;
  text-align: left;
  color: white;

  max-width: 1200px;
  text-align: left;
}
.description {
  font-size: 24px;
  font-weight: 400;
  line-height: 23.41px;
  text-align: left;
  color: white;
}
@media (max-width: 1199px) {
  .blog-cartoon-container {
    width: 100%;
    height: 350px;
  }
}
</style>
