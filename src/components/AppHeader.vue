<template>
  <header>
    <div class="nav">
      <router-link
        class="brand-logo"
        to="/"
      >
        <img
          alt="logo"
          height="26"
          src="../assets/icons/logo.svg"
          width="161"
        >
      </router-link>
      <ul>
        <li>
          <img
            alt="Organization"
            height="20"
            src="../assets/icons/icon-org.svg"
            width="20"
          ><span>Organization</span>
        </li>
        <li>
          <img
            alt="Settings"
            height="20"
            src="../assets/icons/icon-settings.svg"
            width="20"
          >
          <span>Settings</span>
        </li>
        <li class="profile">
          <img
            alt="Profile"
            height="30"
            src="../assets/icons/icon-profile.svg"
            width="30"
          >
          <span>Katherine Ellis</span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppHeader',
})
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  z-index: 998;
}
.nav {
  align-items: center;
  background: linear-gradient(180deg, #09224f 0%, #073382 100%);
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;

  ul {
    color: #ffffff;
    display: inline-flex;
    flex-wrap: wrap;
    gap: 38px;
    list-style: none;
    li {
      align-items: center;
      cursor: pointer;
      display: flex;
      gap: 12px;
      padding: 20px 16px;
    }
    .profile {
      background: #072863;
    }
  }

  .brand-logo {
    img {
      vertical-align: middle;
    }
  }
}
@media (max-width: 768px) {
  .nav {
    ul {
      gap: 10px;
      li {
        span {
          display: none;
        }
      }
    }
  }
}
</style>
