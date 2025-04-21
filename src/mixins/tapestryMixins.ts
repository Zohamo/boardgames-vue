export const tapestryMixins = {
  methods: {
    automaName(automaLevel: number | undefined): string {
      const name = automaLevel + "-Automa ";
      switch (automaLevel) {
        case 2:
          return name + "le Moyen";
        case 3:
          return name + "le Légèrement Intimidant";
        case 4:
          return name + "le Quelque Peu Impressionnant";
        case 5:
          return name + "le Définitivement Incroyable";
        case 6:
          return name + "le Briseur de Rêves";
        case 1:
        default:
          return name + "le Sous Performant";
      }
    },
  },
};
