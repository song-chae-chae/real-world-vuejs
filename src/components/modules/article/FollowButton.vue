<template>
  <button
    class="btn btn-sm btn-outline-secondary action-btn"
    :class="{'not-follow': !isFollowed}"
    @click="followUser"
  >
    <i :class="[isFollowed ? 'ion-minus-round' : 'ion-plus-round']"></i>
    {{ isFollowed ? "Unfollow" : "Follow" }}
  </button>
</template>

<script>
import {followUser, unfollowUser} from "@/api/profile";
export default {
  props: {
    value: {
      type: Boolean,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isFollowed: false,
    };
  },
  methods: {
    followUser() {
      this.isFollowed = !this.isFollowed;

      if (this.isFollowed) {
        followUser({id: this.id});
      } else {
        unfollowUser(this.id);
      }
    },
  },
  created() {
    this.isFollowed = this.value;
  },
};
</script>

<style lang="scss" scoped>
.not-follow {
  color: white !important;
  background-color: #5cb85c;
  border: 1px solid #5cb85c !important;
}
</style>
