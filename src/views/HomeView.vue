<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useCharacterStore } from "@/stores/character";
import CardCartoon from "../components/CardCartoon.vue";
import type { ICard, ILocation } from "@/models";

const cartoonList = ref<ICard[]>([]);
const loading = ref(false);
const showLoading = ref(false);
const searchQuery = ref("");
const selectedLocation = ref("");
const page = ref(1);
const charactersPerPage = 20;
const locations = ref<ILocation[]>([]);
const residentsIds = ref<number[]>([]);
const characterStore = useCharacterStore();

const getLocations = async () => {
  try {
    const sendData = {
      url: "location",
      params: {},
    };
    const response = await characterStore.list(sendData);
    locations.value = response.data.results.map((location: any) => ({
      id: location.id,
      name: location.name,
      residents: location.residents,
    }));
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
};

const getListByName = async (reset = false) => {
  if (loading.value) return;
  loading.value = true;
  showLoading.value = true;
  const sendData = {
    url: "character",
    params: { page: page.value, name: searchQuery.value },
  };
  try {
    const response = await characterStore.list(sendData);
    const results = response.data.results || [];
    cartoonList.value = reset ? results : [...cartoonList.value, ...results];
  } catch (error) {
    console.error("Error fetching characters by name:", error);
  } finally {
    loading.value = false;
    showLoading.value = false;
  }
};

const getListByLocation = async (reset = false) => {
  if (loading.value || residentsIds.value.length === 0) return;
  loading.value = true;
  showLoading.value = true;
  try {
    const startIndex = (page.value - 1) * charactersPerPage;
    const endIndex = page.value * charactersPerPage;
    const currentResidentIds = residentsIds.value.slice(startIndex, endIndex);
    if (currentResidentIds.length === 0) return;
    const sendData = {
      url: `character/${currentResidentIds.join(",")}`,
      params: {},
    };
    const response = await characterStore.list(sendData);
    const results = Array.isArray(response.data) ? response.data : [response.data];
    cartoonList.value = reset ? results : [...cartoonList.value, ...results];
  } catch (error) {
    console.error("Error fetching characters by location:", error);
  } finally {
    loading.value = false;
    showLoading.value = false;
  }
};

const setResidentsFromLocation = () => {
  const location = locations.value.find(
    (loc: any) => loc.id === Number(selectedLocation.value)
  );
  residentsIds.value = location
    ? location.residents
        .map((url: string) => {
          const match = url.match(/\/(\d+)$/);
          return match ? Number(match[1]) : null;
        })
        .filter(Boolean)
    : [];
};

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const bottomPosition = document.documentElement.scrollHeight;
  if (scrollPosition >= bottomPosition - 100 && !loading.value) {
    page.value++;
    if (searchQuery.value) {
      getListByName();
    } else if (selectedLocation.value) {
      getListByLocation();
    } else {
      getListByName();
    }
  }
};

watch([searchQuery, selectedLocation], async () => {
  cartoonList.value = [];
  page.value = 1;
  if (searchQuery.value) {
    getListByName(true);
  } else if (selectedLocation.value) {
    setResidentsFromLocation();
    getListByLocation(true);
  } else {
    getListByName();
  }
});

onMounted(() => {
  getListByName();
  getLocations();
  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <main>
    <div class="search">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by character name"
        class="search-input"
      />
      <select v-model="selectedLocation" class="location-select">
        <option value="">Select a location</option>
        <option v-for="location in locations" :key="location.id" :value="location.id">
          {{ location.name }}
        </option>
      </select>
    </div>

    <section class="blog-list">
      <CardCartoon
        v-for="cardInfo in cartoonList"
        :key="cardInfo.id"
        :cardInfo="cardInfo"
      />

      <div v-if="showLoading" class="loading">Loading...</div>
    </section>
  </main>
</template>

<style scoped>
.blog-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  transition: all 0.03s;
}

.loading {
  text-align: center;
  font-size: 30px;
  padding: 20px;
  font-weight: bold;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: opacity 0.3s ease;
}

.search {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 40px 0;
}

.search-input,
.location-select {
  padding: 10px;
  width: 48%;
  border-radius: 8px;
  color: black;
  font-size: 18px;
  outline: none;
}

@media (max-width: 1199px) {
  .blog-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 50px;
  }
}

@media (max-width: 500px) {
  .blog-list {
    display: flex;
    transition: all 0.03s;
    flex-direction: column;
  }
  .blog-cartoon-containe {
    margin: 0px !important;
  }
  #app {
    padding: 10px !important;
  }
  .search {
    flex-direction: column;
  }
  .search-input,
  .location-select {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
