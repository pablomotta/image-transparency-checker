<template>
  <div class="flex flex-col items-center">
    <div class="relative">
      <canvas ref="canvas" class="hidden"></canvas>
      <img
        :src="currentImage"
        :class="imageHasTransparency ? 'px-8' : 'px-0'"
        alt="current"
        class="transition-all"
      />
      <p class="text-center mt-2">
        {{ imageHasTransparency ? 'Image has transparent background' : 'Image has no transparent background' }}
      </p>
    </div>
    <button @click="showNextImage" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Next Image
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://example.com/image1.png',
        'https://example.com/image2.png',
        'https://example.com/image3.png'
      ],
      currentIndex: 0,
      imageHasTransparency: false
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    }
  },
  methods: {
    showNextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.checkImageTransparency(this.currentImage);
    },
    checkImageTransparency(imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let hasTransparency = false;
        for (let i = 3; i < pixels.length; i += 4) {
          if (pixels[i] < 255) {
            hasTransparency = true;
            break;
          }
        }

        this.imageHasTransparency = hasTransparency;
      };
    }
  },
  mounted() {
    this.checkImageTransparency(this.currentImage);
  }
};
</script>
