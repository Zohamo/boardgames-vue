export const welcomeToTheMoonMixins = {
  methods: {
    automaName(automaLevel: number | undefined): string {
      let name = automaLevel + "-";
      switch (automaLevel) {
        case 2:
          name += "Alexei";
          break;
        case 3:
          name += "Margaret";
          break;
        case 4:
          name += "Franklin";
          break;
        case 5:
          name += "Sergei";
          break;
        case 6:
          name += "Stéphanie";
          break;
        case 7:
          name += "Thomas";
          break;
        case 8:
          name += "Peggy";
          break;
        case 1:
        default:
          name += "Katherine";
      }
      return name + " (ASTRA)";
    },
  },
};
