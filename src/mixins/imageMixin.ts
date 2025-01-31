export const imageMixin = {
  methods: {
    imageExists(imgUrl: string): boolean {
      const http = new XMLHttpRequest();
      http.open("HEAD", imgUrl, false);
      http.send();
      return http.status != 404;
    },
  },
};
